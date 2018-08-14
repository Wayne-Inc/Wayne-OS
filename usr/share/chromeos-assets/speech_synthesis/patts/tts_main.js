// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Event listener for the Google text-to-speech extension.
 *
 * This class implements the Chrome TTS engine extnesion API and dispatches
 * speech requests to an instance of TtsController, defined in
 * tts_controller.js.
 */

'use strict';

/**
 * @constructor
 *
 * Simple structure to hold a pending request, this is used when we
 * get a request to speak before the engine is initialized.
 *
 * @param {string} utterance The utterance to speak.
 * @param {object} options A map of strings to values, options like
 * pitch, volume, etc.
 * @param {callback} callback The callback to call to report progress,
 * finalization, cancellation.
 */
var PendingRequest = function(utterance, options, callback) {
  this.utterance = utterance;
  this.options = options;
  this.callback = callback;
};

var TtsMain = function() {
  this.callback_ = null;
  this.utteranceId_ = 0;
  this.voice_ = null;
  this.lang_ = '';
  this.voiceName_ = '';
  this.pendingSpeechRequest_ = null;
  this.offset_ = 0;
};

/**
 * Function called on startup.
 */
TtsMain.prototype.run = function() {
  document.addEventListener('unload', this.unload, false);
  this.getVoiceNamesFromManifest_();
  this.currentController_ = new TtsController('lstm', this, navigator.language);
  chrome.ttsEngine.onSpeak.addListener(this.onSpeak.bind(this));
  chrome.ttsEngine.onStop.addListener(this.onStop.bind(this));
};

/**
 * Gets the voice list from the extension manifest and updates
 * window.voices accordingly.
 * Matching is done by language plus gender.
 *
 * @private
 */
TtsMain.prototype.getVoiceNamesFromManifest_ = function() {
  var manifestVoices = chrome.runtime.getManifest().tts_engine.voices;
  var langGenderMap = {};
  for (var i = 0, voice; voice = manifestVoices[i]; i++) {
    langGenderMap[voice.lang + '-' + voice.gender] = voice.voice_name;
  }
  for (var i = 0, voice; voice = window.voices[i]; i++) {
    voice.voiceName = langGenderMap[voice.lang + '-' + voice.gender];
  }
};

/**
 * Called by one of the TTS controllers when it finishes its initialization.
 */
TtsMain.prototype.onInitialized = function() {
  this.speakPendingRequest_();
};

/**
 * Called by one of the TTS controllers when we have a message coming from
 * the engine, to send to the client.
 *
 * @param {string} utteranceId The Identifier for the utterance this message
 *     is about.
 * @param {object} response The message coming from the engine, to be sent
 *     to the callback function provided by the client.
 */
TtsMain.prototype.onResponse = function(utteranceId, response) {
  if (utteranceId != this.utteranceId_ || this.callback_ == null) {
    return;
  }

  console.log('onResponse type=' + response.type +
              ' utteranceId=' + utteranceId);

  // We asked TTS to speak the original string trimmed of any whitespace
  // at the beginning. This addresses part of b/70898596, but we must add
  // back the number of trimmed whitespace characters to give the caller
  // a charIndex into their original, untrimmed string.
  response.charIndex += this.offset_;

  this.callback_(response);
  var type = response.type;
  if (type == 'end' || type == 'interrupted' ||
      type == 'cancelled' || type == 'error') {
    this.callback_ = null;
  }
};

/**
 * Called by the client to stop speech.
 */
TtsMain.prototype.onStop = function() {
  this.pendingSpeechRequest_ = null;
  this.offset_ = 0;
  this.callback_ = null;
  this.currentController_.onStop();
};

/**
 * Called by the client to start speech synthesis.
 *
 * @param {string} utterance The utterance to say.
 * @param {object} options The options affecting the speech, like language,
 *     pitch, rate, etc.
 * @param {function} callback The function to recieve messages from the engine.
 */
TtsMain.prototype.onSpeak = function(utterance, options, callback) {
  console.log('Will speak: "' + utterance + '" lang="' + options.lang + '"');

  this.currentController_.switchVoiceIfNeeded(
      options.voiceName, options.lang, options.gender);
  if (!this.currentController_.isInitialized()) {
    this.currentController_.ensureInitialized();
    console.log('No text-to-speech controller is initialized yet.');
    if (this.pendingSpeechRequest_) {
      // Chrome takes care of queueing. The extension only needs to handle one
      // utterance at a time. If a new speak request is received that always
      // means to interrupt / throw away the previous one.
      var response = {type: 'cancelled', charIndex: 0};
      var pendingCallback = this.pendingSpeechRequest_.callback;
      pendingCallback(response);
      this.pendingSpeechRequest_ = null;
      this.offset_ = 0;
    }

    this.pendingSpeechRequest_ = new PendingRequest(utterance, options,
                                                    callback);
    return;
  }

  this.currentController_.onStop();

  this.utteranceId_++;
  this.callback_ = callback;
  console.log('SETTING CALLBACK, id=' + this.utteranceId_);

  // We will ask the TTS engine to speak the utterance without any
  // whitespace at the beginning, because it can cause the word
  // callbacks to be incorrect. See b/70898596.
  let original = utterance;
  utterance = utterance.trimLeft();
  // Keep track of the difference in length between the original
  // string from the user and the string we are asking TTS to
  // speak.
  this.offset_ = original.length - utterance.length;

  this.currentController_.onSpeak(utterance, options, this.utteranceId_);
};

/**
 * If we were required to synthesize some speech before any engine was
 * initialized, the last request was saved and this function is called
 * to start synthesis when the first engine is ready.
 * @private
 */
TtsMain.prototype.speakPendingRequest_ = function() {
  if (!this.pendingSpeechRequest_)
    return;

  var utterance = this.pendingSpeechRequest_.utterance;
  var options = this.pendingSpeechRequest_.options;
  var callback = this.pendingSpeechRequest_.callback;
  this.pendingSpeechRequest_ = null;
  this.onSpeak(utterance, options, callback);
};

/**
 * Method called when the window is closed to do the clean up
 * @private
 */
TtsMain.prototype.unload_ = function() {
  this.currentController_.unload();
};

var ttsMain = new TtsMain();
ttsMain.run();
