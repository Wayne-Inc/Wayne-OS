// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Chrome v2 packaged app background script.
 * @author ebeach@google.com (Eric Beach)
 */


/**
 * Launch the Chrome Connectivity Debugger as v2 packaged app.
 * @param {string=} opt_querystringFlags Parameters/flags to pass in.
 */
function launchChromeConnectivityDebuggerApp(opt_querystringFlags) {
  var width = 676;
  var height = 600;
  var url = 'index.html?INIT_APP_WIDTH=' + width + '&INIT_APP_HEIGHT=' + height;
  if (opt_querystringFlags) {
    url += '&' + opt_querystringFlags;
  }
  chrome.app.window.create(url,
      {
        frame: 'none',
        width: width,
        height: height,
        minWidth: width,
        minHeight: height
      }
  );
}


/**
 * Launch the Chrome Connectivity Debugger as v2 packaged app.
 * @param {string=} opt_querystringFlags Parameters/flags to pass in.
 * @return {boolean} true on success, false on failure
 */
function runChromeConnectivityDebuggerTests(opt_querystringFlags) {
  try {
    // Test networkingPrivate.
    chrome.networkingPrivate.getManagedProperties();
    chrome.networkingPrivate.getVisibleNetworks();

    // Test dns.
    chrome.dns.resolve();

    // Test diagnostics.
    chrome.diagnostics.sendPacket();

    // Test socket.
    chrome.socket.read();
    chrome.socket.connect();
    chrome.socket.create();

    // Test metricsPrivate.
    chrome.metricsPrivate.recordUserAction();
    chrome.metricsPrivate.recordSmallCount();
    chrome.metricsPrivate.recordValue();
    chrome.metricsPrivate.recordMediumTime();
  } catch (e) {
    return false;
  }
  return true;
}


/**
 * Listens for the app launching then creates the window.
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  launchChromeConnectivityDebuggerApp('LAUNCH_SOURCE=Webstore');
});


/**
 * Listens for a signal from the extension asking us to launch the app.
 */
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
      if (request) {
        if (request['command'] == 'launch') {
          launchChromeConnectivityDebuggerApp('LAUNCH_SOURCE=OfflineCrOS');
          sendResponse({'status': 'launched'});
        } else if (request['command'] == 'test') {
          sendResponse(runChromeConnectivityDebuggerTests());
        }
      }
    }
);
