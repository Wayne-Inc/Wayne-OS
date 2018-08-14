(function(){var $jscomp = {scope:{}}, goog = goog || {};
goog.global = this;
goog.isDef = function $goog$isDef$(val) {
  return void 0 !== val;
};
goog.exportPath_ = function $goog$exportPath_$(name, opt_object, opt_objectToExportTo) {
  var parts = name.split("."), cur = opt_objectToExportTo || goog.global;
  parts[0] in cur || !cur.execScript || cur.execScript("var " + parts[0]);
  for (var part;parts.length && (part = parts.shift());) {
    !parts.length && goog.isDef(opt_object) ? cur[part] = opt_object : cur = cur[part] ? cur[part] : cur[part] = {};
  }
};
goog.define = function $goog$define$(name, defaultValue) {
  var value = defaultValue;
  goog.exportPath_(name, value);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.provide = function $goog$provide$(name) {
  goog.exportPath_(name);
};
goog.setTestOnly = function $goog$setTestOnly$(opt_message) {
  if (!goog.DEBUG) {
    throw opt_message = opt_message || "", Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function $goog$forwardDeclare$() {
};
goog.getObjectByName = function $goog$getObjectByName$(name, opt_obj) {
  for (var parts = name.split("."), cur = opt_obj || goog.global, part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function $goog$globalize$(obj, opt_global) {
  var global = opt_global || goog.global, x;
  for (x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function $goog$addDependency$(relPath, provides, requires) {
  if (goog.DEPENDENCIES_ENABLED) {
    for (var provide, require, path = relPath.replace(/\\/g, "/"), deps = goog.dependencies_, i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path, path in deps.pathToNames || (deps.pathToNames[path] = {}), deps.pathToNames[path][provide] = !0;
    }
    for (var j = 0;require = requires[j];j++) {
      path in deps.requires || (deps.requires[path] = {}), deps.requires[path][require] = !0;
    }
  }
};
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$() {
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$(opt_returnValue) {
  return opt_returnValue;
};
goog.abstractMethod = function $goog$abstractMethod$() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$(ctor) {
  ctor.getInstance = function $ctor$getInstance$() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor);
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
goog.DEPENDENCIES_ENABLED = !1;
goog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
  var doc = goog.global.document;
  return "undefined" != typeof doc && "write" in doc;
}, goog.findBasePath_ = function $goog$findBasePath_$() {
  if (goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var doc = goog.global.document, scripts = doc.getElementsByTagName("script"), i = scripts.length - 1;0 <= i;--i) {
        var src = scripts[i].src, qmark = src.lastIndexOf("?"), l = -1 == qmark ? src.length : qmark;
        if ("base.js" == src.substr(l - 7, 7)) {
          goog.basePath = src.substr(0, l - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function $goog$importScript_$(src) {
  var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[src] && importScript(src) && (goog.dependencies_.written[src] = !0);
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$(src) {
  if (goog.inHtmlDocument_()) {
    var doc = goog.global.document;
    if ("complete" == doc.readyState) {
      var isDeps = /\bdeps.js$/.test(src);
      if (isDeps) {
        return!1;
      }
      throw Error('Cannot write "' + src + '" after document load');
    }
    doc.write('<script type="text/javascript" src="' + src + '">\x3c/script>');
    return!0;
  }
  return!1;
}, goog.writeScripts_ = function $goog$writeScripts_$() {
  function visitNode(path) {
    if (!(path in deps.written)) {
      if (!(path in deps.visited) && (deps.visited[path] = !0, path in deps.requires)) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      path in seenScript || (seenScript[path] = !0, scripts.push(path));
    }
  }
  var scripts = [], seenScript = {}, deps = goog.dependencies_, path$$0;
  for (path$$0 in goog.included_) {
    deps.written[path$$0] || visitNode(path$$0);
  }
  for (var i = 0;i < scripts.length;i++) {
    if (scripts[i]) {
      goog.importScript_(goog.basePath + scripts[i]);
    } else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$(rule) {
  return rule in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[rule] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$(value) {
  var s = typeof value;
  if ("object" == s) {
    if (value) {
      if (value instanceof Array) {
        return "array";
      }
      if (value instanceof Object) {
        return s;
      }
      var className = Object.prototype.toString.call(value);
      if ("[object Window]" == className) {
        return "object";
      }
      if ("[object Array]" == className || "number" == typeof value.length && "undefined" != typeof value.splice && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == className || "undefined" != typeof value.call && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == s && "undefined" == typeof value.call) {
      return "object";
    }
  }
  return s;
};
goog.isNull = function $goog$isNull$(val) {
  return null === val;
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$(val) {
  return null != val;
};
goog.isArray = function $goog$isArray$(val) {
  return "array" == goog.typeOf(val);
};
goog.isArrayLike = function $goog$isArrayLike$(val) {
  var type = goog.typeOf(val);
  return "array" == type || "object" == type && "number" == typeof val.length;
};
goog.isDateLike = function $goog$isDateLike$(val) {
  return goog.isObject(val) && "function" == typeof val.getFullYear;
};
goog.isString = function $goog$isString$(val) {
  return "string" == typeof val;
};
goog.isBoolean = function $goog$isBoolean$(val) {
  return "boolean" == typeof val;
};
goog.isNumber = function $goog$isNumber$(val) {
  return "number" == typeof val;
};
goog.isFunction = function $goog$isFunction$(val) {
  return "function" == goog.typeOf(val);
};
goog.isObject = function $goog$isObject$(val) {
  var type = typeof val;
  return "object" == type && null != val || "function" == type;
};
goog.getUid = function $goog$getUid$(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function $goog$hasUid$(obj) {
  return!!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function $goog$removeUid$(obj) {
  "removeAttribute" in obj && obj.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$(obj) {
  var type = goog.typeOf(obj);
  if ("object" == type || "array" == type) {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = "array" == type ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function $goog$bindNative_$(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments);
};
goog.bindJs_ = function $goog$bindJs_$(fn, selfObj, var_args) {
  if (!fn) {
    throw Error();
  }
  if (2 < arguments.length) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  }
  return function() {
    return fn.apply(selfObj, arguments);
  };
};
goog.bind = function $goog$bind$(fn, selfObj, var_args) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function $goog$partial$(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function $goog$mixin$(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date;
};
goog.globalEval = function $goog$globalEval$(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document, scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = !1;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$(className, opt_modifier) {
  var getMapping = function $getMapping$(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  }, renameByParts = function $renameByParts$(cssName) {
    for (var parts = cssName.split("-"), mapped = [], i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  }, rename;
  rename = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? getMapping : renameByParts : function(a) {
    return a;
  };
  return opt_modifier ? className + "-" + rename(opt_modifier) : rename(className);
};
goog.setCssNameMapping = function $goog$setCssNameMapping$(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.getMsg = function $goog$getMsg$(str, opt_values) {
  opt_values && (str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
    return key in opt_values ? opt_values[key] : match;
  }));
  return str;
};
goog.getMsgWithFallback = function $goog$getMsgWithFallback$(a) {
  return a;
};
goog.exportSymbol = function $goog$exportSymbol$(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function $goog$exportProperty$(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function $goog$inherits$(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function $childCtor$base$(me, methodName, var_args) {
    var args = Array.prototype.slice.call(arguments, 2);
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.base = function $goog$base$(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
  }
  for (var args = Array.prototype.slice.call(arguments, 2), foundCaller = !1, ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = !0;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function $goog$scope$(fn) {
  fn.call(goog.global);
};
goog.MODIFY_FUNCTION_PROTOTYPES = !0;
goog.MODIFY_FUNCTION_PROTOTYPES && (Function.prototype.bind = Function.prototype.bind || function(selfObj, var_args) {
  if (1 < arguments.length) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.unshift(this, selfObj);
    return goog.bind.apply(null, args);
  }
  return goog.bind(this, selfObj);
}, Function.prototype.partial = function $Function$$partial$(var_args) {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(this, null);
  return goog.bind.apply(null, args);
}, Function.prototype.inherits = function $Function$$inherits$(parentCtor) {
  goog.inherits(this, parentCtor);
}, Function.prototype.mixin = function $Function$$mixin$(source) {
  goog.mixin(this.prototype, source);
});
goog.defineClass = function $goog$defineClass$(superClass, def) {
  var constructor = def.constructor, statics = def.statics;
  constructor && constructor != Object.prototype.constructor || (constructor = function $constructor$() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  var cls = goog.defineClass.createSealingConstructor_(constructor, superClass);
  superClass && goog.inherits(cls, superClass);
  delete def.constructor;
  delete def.statics;
  goog.defineClass.applyProperties_(cls.prototype, def);
  null != statics && (statics instanceof Function ? statics(cls) : goog.defineClass.applyProperties_(cls, statics));
  return cls;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function $goog$defineClass$createSealingConstructor_$(ctr, superClass) {
  if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
    if (superClass && superClass.prototype && superClass.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) {
      return ctr;
    }
    var wrappedCtr = function $wrappedCtr$() {
      var instance = ctr.apply(this, arguments) || this;
      this.constructor === wrappedCtr && Object.seal(instance);
      return instance;
    };
    return wrappedCtr;
  }
  return ctr;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function $goog$defineClass$applyProperties_$(target, source) {
  for (var key in source) {
    Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
  }
  for (var i = 0;i < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;i++) {
    key = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[i], Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
  }
};
goog.tagUnsealableClass = function $goog$tagUnsealableClass$() {
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
var i18n = {input:{}};
i18n.input.chrome = {};
i18n.input.chrome.message = {};
i18n.input.chrome.message.Name = {ALT_KEY:"altKey", CANDIDATE:"candidate", CANDIDATES:"candidates", CANDIDATE_ID:"candidateID", CODE:"code", CONTEXT_ID:"contextID", CONTEXT_TYPE:"contextType", CURSOR_VISIBLE:"cursorVisible", CTRL_KEY:"ctrlKey", CURSOR:"cursor", ENGINE_ID:"engineID", HEIGHT:"height", ID:"id", KEY:"key", KEYCODE:"keyCode", KEYSET:"keyset", KEY_DATA:"keyData", LANGUAGE:"language", MATCHED_LENGTHS:"matchedLengths", MSG:"msg", MSG_TYPE:"type", PAGE_SIZE:"pageSize", POSSIBILITIES:"possibilities", 
PROPERTIES:"properties", REQUEST_ID:"requestId", SHIFT_KEY:"shiftKey", SOURCE:"source", SOURCES:"sources", SPATIAL_DATA:"spatialData", STROKES:"strokes", TEXT:"text", VERTICAL:"vertical", VISIBLE:"visible", VISIBILITY:"visibility", WIDTH:"width"};
i18n.input.chrome.message.Type = {CANDIDATES_BACK:"candidates_back", COMMIT_TEXT:"commit_text", COMPLETION:"completion", CONNECT:"connect", CONTEXT_BLUR:"context_blur", CONTEXT_FOCUS:"context_focus", DATASOURCE_READY:"datasource_ready", DISCONNECT:"disconnect", EXEC_ALL:"exec_all", HWT_NETWORK_ERROR:"hwt_network_error", HWT_PRIVACY_GOT_IT:"hwt_privacy_got_it", HWT_PRIVACY_INFO:"hwt_privacy_info", HWT_REQUEST:"hwt_request", HWT_SET_INPUTTOOL:"hwt_set_inputtool", HWT_UNSET_INPUTTOOL:"hwt_unset_inputtool", 
KEY_CLICK:"key_click", KEY_EVENT:"key_event", PREDICTION:"prediction", SELECT_CANDIDATE:"select_candidate", SEND_KEY_EVENT:"send_key_event", SET_COMPOSITION:"set_composition", SET_LANGUAGE:"set_language", SURROUNDING_TEXT_CHANGED:"surrounding_text_changed", UPDATE_SETTINGS:"update_settings", VISIBILITY_CHANGE:"visibility_change"};
i18n.input.chrome.inputview = {};
i18n.input.chrome.inputview.events = {};
i18n.input.chrome.inputview.events.KeyCodes = {UNIDENTIFIED:"Unidentified", BACK_QUOTE:"Backquote", KEY_A:"KeyA", KEY_B:"KeyB", KEY_C:"KeyC", KEY_D:"KeyD", KEY_E:"KeyE", KEY_F:"KeyF", KEY_G:"KeyG", KEY_H:"KeyH", KEY_I:"KeyI", KEY_J:"KeyJ", KEY_K:"KeyK", KEY_L:"KeyL", KEY_M:"KeyM", KEY_N:"KeyN", KEY_O:"KeyO", KEY_P:"KeyP", KEY_Q:"KeyQ", KEY_R:"KeyR", KEY_S:"KeyS", KEY_T:"KeyT", KEY_U:"KeyU", KEY_V:"KeyV", KEY_W:"KeyW", KEY_X:"KeyX", KEY_Y:"KeyY", KEY_Z:"KeyZ", DIGIT_0:"Digit0", DIGIT_1:"Digit1", DIGIT_2:"Digit2", 
DIGIT_3:"Digit3", DIGIT_4:"Digit4", DIGIT_5:"Digit5", DIGIT_6:"Digit6", DIGIT_7:"Digit7", DIGIT_8:"Digit8", DIGIT_9:"Digit9", ALT:"Alt", ALT_GRAPH:"AltGraph", ALT_LEFT:"AltLeft", ALT_RIGHT:"AltRight", CAPS_LOCK:"CapsLock", CONTROL:"Control", FN:"Fn", FN_LOCK:"FnLock", HYPER:"Hyper", META:"Meta", NUM_LOCK:"NumLock", O_S:"OS", SHIFT:"Shift", SUPER:"Super", SYMBOL:"Symbol", SYMBOL_LOCK:"SymbolLock", ENTER:"Enter", SEPARATOR:"Separator", TAB:"Tab", SPACE:"Space", ARROW_DOWN:"ArrowDown", ARROW_LEFT:"ArrowLeft", 
ARROW_RIGHT:"ArrowRight", ARROW_UP:"ArrowUp", END:"End", HOME:"Home", PAGE_DOWN:"PageDown", PAGE_UP:"PageUp", BACKSPACE:"Backspace", CLEAR:"Clear", COPY:"Copy", CR_SEL:"CrSel", CUT:"Cut", DELETE:"Delete", ERASE_EOF:"EraseEof", EX_SEL:"ExSel", INSERT:"Insert", PASTE:"Paste", REDO:"Redo", UNDO:"Undo", ACCEPT:"Accept", AGAIN:"Again", ATTN:"Attn", CANCEL:"Cancel", CONTEXT_MENU:"ContextMenu", ESCAPE:"Escape", EXECUTE:"Execute", FIND:"Find", HELP:"Help", PAUSE:"Pause", PLAY:"Play", PROPS:"Props", SCROLL_LOCK:"ScrollLock", 
ZOOM_IN:"ZoomIn", ZOOM_OUT:"ZoomOut", BRIGHTNESS_DOWN:"BrightnessDown", BRIGHTNESS_UP:"BrightnessUp", CAMERA:"Camera", EJECT:"Eject", LOG_OFF:"LogOff", POWER:"Power", POWER_OFF:"PowerOff", PRINT_SCREEN:"PrintScreen", HIBERNATE:"Hibernate", STANDBY:"Standby", WAKE_UP:"WakeUp", ALL_CANDIDATES:"AllCandidates", ALPHANUMERIC:"Alphanumeric", CODE_INPUT:"CodeInput", COMPOSE:"Compose", CONVERT:"Convert", FINAL_MODE:"FinalMode", GROUP_FIRST:"GroupFirst", GROUP_LAST:"GroupLast", GROUP_NEXT:"GroupNext", GROUP_PREVIOUS:"GroupPrevious", 
MODE_CHANGE:"ModeChange", NEXT_CANDIDATE:"NextCandidate", NON_CONVERT:"NonConvert", PREVIOUS_CANDIDATE:"PreviousCandidate", PROCESS:"Process", SINGLE_CANDIDATE:"SingleCandidate", ROMAN_CHARACTERS:"RomanCharacters", HANGUL_MODE:"HangulMode", HANJA_MODE:"HanjaMode", JUNJA_MODE:"JunjaMode", ZENKAKU:"Zenkaku", HANKAKU:"Hankaku", ZENKAKU_HANKAKU:"ZenkakuHankaku", KANA_MODE:"KanaMode", KANJI_MODE:"KanjiMode", HIRAGANA:"Hiragana", KATAKANA:"Katakana", HIRAGANA_KATAKANA:"HiraganaKatakana", EISU:"Eisu", F1:"F1", 
F2:"F2", F3:"F3", F4:"F4", F5:"F5", F6:"F6", F7:"F7", F8:"F8", F9:"F9", F10:"F10", F11:"F11", F12:"F12", SOFT1:"Soft1", SOFT2:"Soft2", SOFT3:"Soft3", SOFT4:"Soft4", CLOSE:"Close", MAIL_FORWARD:"MailForward", MAIL_REPLY:"MailReply", MAIL_SEND:"MailSend", MEDIA_PLAY_PAUSE:"MediaPlayPause", MEDIA_SELECT:"MediaSelect", MEDIA_STOP:"MediaStop", MEDIA_TRACK_NEXT:"MediaTrackNext", MEDIA_TRACK_PREVIOUS:"MediaTrackPrevious", NEW:"New", OPEN:"Open", PRINT:"Print", SAVE:"Save", SPELL_CHECK:"SpellCheck", VOLUME_DOWN:"VolumeDown", 
VOLUME_UP:"VolumeUp", VOLUME_MUTE:"VolumeMute", LAUNCH_CALCULATOR:"LaunchCalculator", LAUNCH_CALENDAR:"LaunchCalendar", LAUNCH_MAIL:"LaunchMail", LAUNCH_MEDIA_PLAYER:"LaunchMediaPlayer", LAUNCH_MUSIC_PLAYER:"LaunchMusicPlayer", LAUNCH_MY_COMPUTER:"LaunchMyComputer", LAUNCH_SCREEN_SAVER:"LaunchScreenSaver", LAUNCH_SPREADSHEET:"LaunchSpreadsheet", LAUNCH_WEB_BROWSER:"LaunchWebBrowser", LAUNCH_WEB_CAM:"LaunchWebCam", LAUNCH_WORD_PROCESSOR:"LaunchWordProcessor", BROWSER_BACK:"BrowserBack", BROWSER_FAVORITES:"BrowserFavorites", 
BROWSER_FORWARD:"BrowserForward", BROWSER_HOME:"BrowserHome", BROWSER_REFRESH:"BrowserRefresh", BROWSER_SEARCH:"BrowserSearch", BROWSER_STOP:"BrowserStop", AUDIO_BALANCE_LEFT:"AudioBalanceLeft", AUDIO_BALANCE_RIGHT:"AudioBalanceRight", AUDIO_BASS_BOOST_DOWN:"AudioBassBoostDown", AUDIO_BASS_BOOST_UP:"AudioBassBoostUp", AUDIO_FADER_FRONT:"AudioFaderFront", AUDIO_FADER_REAR:"AudioFaderRear", AUDIO_SURROUND_MODE_NEXT:"AudioSurroundModeNext", CHANNEL_DOWN:"ChannelDown", CHANNEL_UP:"ChannelUp", COLORF0_RED:"ColorF0Red", 
COLORF1_GREEN:"ColorF1Green", COLORF2_YELLOW:"ColorF2Yellow", COLORF3_BLUE:"ColorF3Blue", COLORF4_GREY:"ColorF4Grey", COLORF5_BROWN:"ColorF5Brown", CLOSED_CAPTION_TOGGLE:"ClosedCaptionToggle", DIMMER:"Dimmer", DISPLAY_SWAP:"DisplaySwap", EXIT:"Exit", FAVORITE_CLEAR0:"FavoriteClear0", FAVORITE_CLEAR1:"FavoriteClear1", FAVORITE_CLEAR2:"FavoriteClear2", FAVORITE_CLEAR3:"FavoriteClear3", FAVORITE_RECALL0:"FavoriteRecall0", FAVORITE_RECALL1:"FavoriteRecall1", FAVORITE_RECALL2:"FavoriteRecall2", FAVORITE_RECALL3:"FavoriteRecall3", 
FAVORITE_STORE0:"FavoriteStore0", FAVORITE_STORE1:"FavoriteStore1", FAVORITE_STORE2:"FavoriteStore2", FAVORITE_STORE3:"FavoriteStore3", GUIDE:"Guide", GUIDE_NEXT_DAY:"GuideNextDay", GUIDE_PREVIOUS_DAY:"GuidePreviousDay", INFO:"Info", INSTANT_REPLAY:"InstantReplay", LINK:"Link", LIST_PROGRAM:"ListProgram", LIVE_CONTENT:"LiveContent", LOCK:"Lock", MEDIA_APPS:"MediaApps", MEDIA_FAST_FORWARD:"MediaFastForward", MEDIA_LAST:"MediaLast", MEDIA_PAUSE:"MediaPause", MEDIA_PLAY:"MediaPlay", MEDIA_RECORD:"MediaRecord", 
MEDIA_REWIND:"MediaRewind", MEDIA_SKIP:"MediaSkip", NEXT_FAVORITE_CHANNEL:"NextFavoriteChannel", NEXT_USER_PROFILE:"NextUserProfile", ON_DEMAND:"OnDemand", PIN_P_DOWN:"PinPDown", PIN_P_MOVE:"PinPMove", PIN_P_TOGGLE:"PinPToggle", PIN_P_UP:"PinPUp", PLAY_SPEED_DOWN:"PlaySpeedDown", PLAY_SPEED_RESET:"PlaySpeedReset", PLAY_SPEED_UP:"PlaySpeedUp", RANDOM_TOGGLE:"RandomToggle", RC_LOW_BATTERY:"RcLowBattery", RECORD_SPEED_NEXT:"RecordSpeedNext", RF_BYPASS:"RfBypass", SCAN_CHANNELS_TOGGLE:"ScanChannelsToggle ", 
SCREEN_MODE_NEXT:"ScreenModeNext", SETTINGS:"Settings", SPLIT_SCREEN_TOGGLE:"SplitScreenToggle", SUBTITLE:"Subtitle", TELETEXT:"Teletext", VIDEO_MODE_NEXT:"VideoModeNext", WINK:"Wink", ZOOM_TOGGLE:"ZoomToggle"};
i18n.input.chrome.inputview.Statistics = function $i18n$input$chrome$inputview$Statistics$() {
};
goog.addSingletonGetter(i18n.input.chrome.inputview.Statistics);
i18n.input.chrome.inputview.Statistics.prototype.layoutCode_ = "";
i18n.input.chrome.inputview.Statistics.prototype.getTargetType = function $i18n$input$chrome$inputview$Statistics$$getTargetType$(source, target) {
  return source == target ? 0 : source ? target.length > source.length ? 2 : 1 : 3;
};
i18n.input.chrome.inputview.Statistics.prototype.recordCommit = function $i18n$input$chrome$inputview$Statistics$$recordCommit$(sourceLen, targetLen, targetIndex, targetType, triggerType) {
  this.layoutCode_ && (this.recordCount_("Commit.SourceLength", sourceLen), this.recordCount_("Commit.TargetLength", targetLen), this.recordCount_("Commit.TargetIndex", targetIndex + 1), this.recordCount_("Commit.TargetType", targetType), this.recordCount_("Commit.TriggerType", triggerType));
};
i18n.input.chrome.inputview.Statistics.prototype.recordSpecialKey = function $i18n$input$chrome$inputview$Statistics$$recordSpecialKey$(keyCode, isComposing) {
  var name = "Key." + isComposing ? "Composing." : "" + keyCode;
  this.recordCount_(name, 1);
};
i18n.input.chrome.inputview.Statistics.prototype.recordCount_ = function $i18n$input$chrome$inputview$Statistics$$recordCount_$(name, count) {
  this.layoutCode_ && chrome.metricsPrivate && chrome.metricsPrivate.recordCount && (name = "InputView." + name + "." + this.layoutCode_, chrome.metricsPrivate.recordCount(name, count));
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function $goog$string$startsWith$(str, prefix) {
  return 0 == str.lastIndexOf(prefix, 0);
};
goog.string.endsWith = function $goog$string$endsWith$(str, suffix) {
  var l = str.length - suffix.length;
  return 0 <= l && str.indexOf(suffix, l) == l;
};
goog.string.caseInsensitiveStartsWith = function $goog$string$caseInsensitiveStartsWith$(str, prefix) {
  return 0 == goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length));
};
goog.string.caseInsensitiveEndsWith = function $goog$string$caseInsensitiveEndsWith$(str, suffix) {
  return 0 == goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length));
};
goog.string.caseInsensitiveEquals = function $goog$string$caseInsensitiveEquals$(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.subs = function $goog$string$subs$(str, var_args) {
  for (var splitParts = str.split("%s"), returnString = "", subsArguments = Array.prototype.slice.call(arguments, 1);subsArguments.length && 1 < splitParts.length;) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function $goog$string$collapseWhitespace$(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmpty = function $goog$string$isEmpty$(str) {
  return/^[\s\xa0]*$/.test(str);
};
goog.string.isEmptySafe = function $goog$string$isEmptySafe$(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str));
};
goog.string.isBreakingWhitespace = function $goog$string$isBreakingWhitespace$(str) {
  return!/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function $goog$string$isAlpha$(str) {
  return!/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function $goog$string$isNumeric$(str) {
  return!/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function $goog$string$isAlphaNumeric$(str) {
  return!/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function $goog$string$isSpace$(ch) {
  return " " == ch;
};
goog.string.isUnicodeChar = function $goog$string$isUnicodeChar$(ch) {
  return 1 == ch.length && " " <= ch && "~" >= ch || "\u0080" <= ch && "\ufffd" >= ch;
};
goog.string.stripNewlines = function $goog$string$stripNewlines$(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function $goog$string$canonicalizeNewlines$(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function $goog$string$normalizeWhitespace$(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function $goog$string$normalizeSpaces$(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function $goog$string$collapseBreakingSpaces$(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = function $goog$string$trim$(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function $goog$string$trimLeft$(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function $goog$string$trimRight$(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function $goog$string$caseInsensitiveCompare$(str1, str2) {
  var test1 = String(str1).toLowerCase(), test2 = String(str2).toLowerCase();
  return test1 < test2 ? -1 : test1 == test2 ? 0 : 1;
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function $goog$string$numerateCompare$(str1, str2) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return-1;
  }
  if (!str2) {
    return 1;
  }
  for (var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_), tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_), count = Math.min(tokens1.length, tokens2.length), i = 0;i < count;i++) {
    var a = tokens1[i], b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  return tokens1.length != tokens2.length ? tokens1.length - tokens2.length : str1 < str2 ? -1 : 1;
};
goog.string.urlEncode = function $goog$string$urlEncode$(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function $goog$string$urlDecode$(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = function $goog$string$newLineToBr$(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
};
goog.string.htmlEscape = function $goog$string$htmlEscape$(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (str = str.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(str)) {
      return str;
    }
    -1 != str.indexOf("&") && (str = str.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != str.indexOf("<") && (str = str.replace(goog.string.LT_RE_, "&lt;"));
    -1 != str.indexOf(">") && (str = str.replace(goog.string.GT_RE_, "&gt;"));
    -1 != str.indexOf('"') && (str = str.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != str.indexOf("'") && (str = str.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != str.indexOf("\x00") && (str = str.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != str.indexOf("e") && (str = str.replace(goog.string.E_RE_, "&#101;"));
  }
  return str;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function $goog$string$unescapeEntities$(str) {
  return goog.string.contains(str, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(str) : goog.string.unescapePureXmlEntities_(str) : str;
};
goog.string.unescapeEntitiesWithDocument = function $goog$string$unescapeEntitiesWithDocument$(str, document) {
  return goog.string.contains(str, "&") ? goog.string.unescapeEntitiesUsingDom_(str, document) : str;
};
goog.string.unescapeEntitiesUsingDom_ = function $goog$string$unescapeEntitiesUsingDom_$(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, div;
  div = opt_document ? opt_document.createElement("div") : goog.global.document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if ("#" == entity.charAt(0)) {
      var n = Number("0" + entity.substr(1));
      isNaN(n) || (value = String.fromCharCode(n));
    }
    value || (div.innerHTML = s + " ", value = div.firstChild.nodeValue.slice(0, -1));
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function $goog$string$unescapePureXmlEntities_$(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return'"';
      default:
        if ("#" == entity.charAt(0)) {
          var n = Number("0" + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function $goog$string$whitespaceEscape$(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.preserveSpaces = function $goog$string$preserveSpaces$(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function $goog$string$stripQuotes$(str, quoteChars) {
  for (var length = quoteChars.length, i = 0;i < length;i++) {
    var quoteChar = 1 == length ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function $goog$string$truncate$(str, chars, opt_protectEscapedCharacters) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  str.length > chars && (str = str.substring(0, chars - 3) + "...");
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.truncateMiddle = function $goog$string$truncateMiddle$(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  if (opt_trailingChars && str.length > chars) {
    opt_trailingChars > chars && (opt_trailingChars = chars);
    var endPoint = str.length - opt_trailingChars, startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else {
    if (str.length > chars) {
      var half = Math.floor(chars / 2), endPos = str.length - half, half = half + chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos);
    }
  }
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function $goog$string$quote$(s) {
  s = String(s);
  if (s.quote) {
    return s.quote();
  }
  for (var sb = ['"'], i = 0;i < s.length;i++) {
    var ch = s.charAt(i), cc = ch.charCodeAt(0);
    sb[i + 1] = goog.string.specialEscapeChars_[ch] || (31 < cc && 127 > cc ? ch : goog.string.escapeChar(ch));
  }
  sb.push('"');
  return sb.join("");
};
goog.string.escapeString = function $goog$string$escapeString$(str) {
  for (var sb = [], i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function $goog$string$escapeChar$(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var rv = c, cc = c.charCodeAt(0);
  if (31 < cc && 127 > cc) {
    rv = c;
  } else {
    if (256 > cc) {
      if (rv = "\\x", 16 > cc || 256 < cc) {
        rv += "0";
      }
    } else {
      rv = "\\u", 4096 > cc && (rv += "0");
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.toMap = function $goog$string$toMap$(s) {
  for (var rv = {}, i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = !0;
  }
  return rv;
};
goog.string.contains = function $goog$string$contains$(str, subString) {
  return-1 != str.indexOf(subString);
};
goog.string.caseInsensitiveContains = function $goog$string$caseInsensitiveContains$(str, subString) {
  return goog.string.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.countOf = function $goog$string$countOf$(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function $goog$string$removeAt$(s, index, stringLength) {
  var resultStr = s;
  0 <= index && index < s.length && 0 < stringLength && (resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength));
  return resultStr;
};
goog.string.remove = function $goog$string$remove$(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "");
};
goog.string.removeAll = function $goog$string$removeAll$(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.regExpEscape = function $goog$string$regExpEscape$(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function $goog$string$repeat$(string, length) {
  return Array(length + 1).join(string);
};
goog.string.padNumber = function $goog$string$padNumber$(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num), index = s.indexOf(".");
  -1 == index && (index = s.length);
  return goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function $goog$string$makeSafe$(obj) {
  return null == obj ? "" : String(obj);
};
goog.string.buildString = function $goog$string$buildString$(var_args) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function $goog$string$getRandomString$() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function $goog$string$compareVersions$(version1, version2) {
  for (var order = 0, v1Subs = goog.string.trim(String(version1)).split("."), v2Subs = goog.string.trim(String(version2)).split("."), subCount = Math.max(v1Subs.length, v2Subs.length), subIdx = 0;0 == order && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "", v2Sub = v2Subs[subIdx] || "", v1CompParser = RegExp("(\\d*)(\\D*)", "g"), v2CompParser = RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""], v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if (0 == v1Comp[0].length && 0 == v2Comp[0].length) {
        break;
      }
      var v1CompNum = 0 == v1Comp[1].length ? 0 : parseInt(v1Comp[1], 10), v2CompNum = 0 == v2Comp[1].length ? 0 : parseInt(v2Comp[1], 10), order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(0 == v1Comp[2].length, 0 == v2Comp[2].length) || goog.string.compareElements_(v1Comp[2], v2Comp[2]);
    } while (0 == order);
  }
  return order;
};
goog.string.compareElements_ = function $goog$string$compareElements_$(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function $goog$string$hashCode$(str) {
  for (var result = 0, i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i), result %= goog.string.HASHCODE_MAX_;
  }
  return result;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function $goog$string$createUniqueString$() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function $goog$string$toNumber$(str) {
  var num = Number(str);
  return 0 == num && goog.string.isEmpty(str) ? NaN : num;
};
goog.string.isLowerCamelCase = function $goog$string$isLowerCamelCase$(str) {
  return/^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function $goog$string$isUpperCamelCase$(str) {
  return/^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function $goog$string$toCamelCase$(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function $goog$string$toSelectorCase$(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function $goog$string$toTitleCase$(str, opt_delimiters) {
  var delimiters = goog.isString(opt_delimiters) ? goog.string.regExpEscape(opt_delimiters) : "\\s", delimiters = delimiters ? "|[" + delimiters + "]+" : "", regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.parseInt = function $goog$string$parseInt$(value) {
  isFinite(value) && (value = String(value));
  return goog.isString(value) ? /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10) : NaN;
};
goog.string.splitLimit = function $goog$string$splitLimit$(str, separator, limit) {
  for (var parts = str.split(separator), returnVal = [];0 < limit && parts.length;) {
    returnVal.push(parts.shift()), limit--;
  }
  parts.length && returnVal.push(parts.join(separator));
  return returnVal;
};
goog.debug = {};
goog.debug.Error = function $goog$debug$Error$(opt_msg) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = Error().stack;
    stack && (this.stack = stack);
  }
  opt_msg && (this.message = String(opt_msg));
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function $goog$asserts$AssertionError$(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function $goog$asserts$DEFAULT_ERROR_HANDLER$(e) {
  throw e;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function $goog$asserts$doAssertFailure_$(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    var message = message + (": " + givenMessage), args = givenArgs
  } else {
    defaultMessage && (message += ": " + defaultMessage, args = defaultArgs);
  }
  var e = new goog.asserts.AssertionError("" + message, args || []);
  goog.asserts.errorHandler_(e);
};
goog.asserts.setErrorHandler = function $goog$asserts$setErrorHandler$(errorHandler) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = errorHandler);
};
goog.asserts.assert = function $goog$asserts$assert$(condition, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !condition && goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  return condition;
};
goog.asserts.fail = function $goog$asserts$fail$(opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function $goog$asserts$assertNumber$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertString = function $goog$asserts$assertString$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(value) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertFunction = function $goog$asserts$assertFunction$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertObject = function $goog$asserts$assertObject$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(value) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertArray = function $goog$asserts$assertArray$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(value) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertBoolean = function $goog$asserts$assertBoolean$(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertElement = function $goog$asserts$assertElement$(value, opt_message, var_args) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(value) && value.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertInstanceof = function $goog$asserts$assertInstanceof$(value, type, opt_message, var_args) {
  !goog.asserts.ENABLE_ASSERTS || value instanceof type || goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3));
  return value;
};
goog.asserts.assertObjectPrototypeIsIntact = function $goog$asserts$assertObjectPrototypeIsIntact$() {
  for (var key in Object.prototype) {
    goog.asserts.fail(key + " should not be enumerable in Object.prototype.");
  }
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function $goog$array$peek$(array) {
  return array[array.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = null == opt_fromIndex ? 0 : 0 > opt_fromIndex ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (goog.isString(arr)) {
    return goog.isString(obj) && 1 == obj.length ? arr.indexOf(obj, fromIndex) : -1;
  }
  for (var i = fromIndex;i < arr.length;i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return-1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(null != arr.length);
  var fromIndex = null == opt_fromIndex ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = null == opt_fromIndex ? arr.length - 1 : opt_fromIndex;
  0 > fromIndex && (fromIndex = Math.max(0, arr.length + fromIndex));
  if (goog.isString(arr)) {
    return goog.isString(obj) && 1 == obj.length ? arr.lastIndexOf(obj, fromIndex) : -1;
  }
  for (var i = fromIndex;0 <= i;i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return-1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.forEachRight = function $goog$array$forEachRight$(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;0 <= i;--i) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = [], resLength = 0, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2) {
      var val = arr2[i];
      f.call(opt_obj, val, i, arr) && (res[resLength++] = val);
    }
  }
  return res;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = Array(l), arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    i in arr2 && (res[i] = f.call(opt_obj, arr2[i], i, arr));
  }
  return res;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(null != arr.length);
  opt_obj && (f = goog.bind(f, opt_obj));
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(arr, f, val);
} : function(arr, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(null != arr.length);
  opt_obj && (f = goog.bind(f, opt_obj));
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(arr, f, val);
} : function(arr, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return!0;
    }
  }
  return!1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return!1;
    }
  }
  return!0;
};
goog.array.count = function $goog$array$count$(arr$$0, f, opt_obj) {
  var count = 0;
  goog.array.forEach(arr$$0, function(element, index, arr) {
    f.call(opt_obj, element, index, arr) && ++count;
  }, opt_obj);
  return count;
};
goog.array.find = function $goog$array$find$(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return 0 > i ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndex = function $goog$array$findIndex$(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return-1;
};
goog.array.findRight = function $goog$array$findRight$(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return 0 > i ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndexRight = function $goog$array$findIndexRight$(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;0 <= i;i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return-1;
};
goog.array.contains = function $goog$array$contains$(arr, obj) {
  return 0 <= goog.array.indexOf(arr, obj);
};
goog.array.isEmpty = function $goog$array$isEmpty$(arr) {
  return 0 == arr.length;
};
goog.array.clear = function $goog$array$clear$(arr) {
  if (!goog.isArray(arr)) {
    for (var i = arr.length - 1;0 <= i;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};
goog.array.insert = function $goog$array$insert$(arr, obj) {
  goog.array.contains(arr, obj) || arr.push(obj);
};
goog.array.insertAt = function $goog$array$insertAt$(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj);
};
goog.array.insertArrayAt = function $goog$array$insertArrayAt$(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd);
};
goog.array.insertBefore = function $goog$array$insertBefore$(arr, obj, opt_obj2) {
  var i;
  2 == arguments.length || 0 > (i = goog.array.indexOf(arr, opt_obj2)) ? arr.push(obj) : goog.array.insertAt(arr, obj, i);
};
goog.array.remove = function $goog$array$remove$(arr, obj) {
  var i = goog.array.indexOf(arr, obj), rv;
  (rv = 0 <= i) && goog.array.removeAt(arr, i);
  return rv;
};
goog.array.removeAt = function $goog$array$removeAt$(arr, i) {
  goog.asserts.assert(null != arr.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length;
};
goog.array.removeIf = function $goog$array$removeIf$(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return 0 <= i ? (goog.array.removeAt(arr, i), !0) : !1;
};
goog.array.concat = function $goog$array$concat$(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function $goog$array$join$(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function $goog$array$toArray$(object) {
  var length = object.length;
  if (0 < length) {
    for (var rv = Array(length), i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return[];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function $goog$array$extend$(arr1, var_args) {
  for (var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i], isArrayLike;
    if (goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && Object.prototype.hasOwnProperty.call(arr2, "callee")) {
      arr1.push.apply(arr1, arr2);
    } else {
      if (isArrayLike) {
        for (var len1 = arr1.length, len2 = arr2.length, j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j];
        }
      } else {
        arr1.push(arr2);
      }
    }
  }
};
goog.array.splice = function $goog$array$splice$(arr, index, howMany, var_args) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1));
};
goog.array.slice = function $goog$array$slice$(arr, start, opt_end) {
  goog.asserts.assert(null != arr.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start) : goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
};
goog.array.removeDuplicates = function $goog$array$removeDuplicates$(arr, opt_rv, opt_hashFn) {
  for (var returnArray = opt_rv || arr, defaultHashFn = function $defaultHashFn$() {
    return goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
  }, hashFn = opt_hashFn || defaultHashFn, seen = {}, cursorInsert = 0, cursorRead = 0;cursorRead < arr.length;) {
    var current = arr[cursorRead++], key = hashFn(current);
    Object.prototype.hasOwnProperty.call(seen, key) || (seen[key] = !0, returnArray[cursorInsert++] = current);
  }
  returnArray.length = cursorInsert;
};
goog.array.binarySearch = function $goog$array$binarySearch$(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, !1, target);
};
goog.array.binarySelect = function $goog$array$binarySelect$(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, !0, void 0, opt_obj);
};
goog.array.binarySearch_ = function $goog$array$binarySearch_$(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  for (var left = 0, right = arr.length, found;left < right;) {
    var middle = left + right >> 1, compareResult;
    compareResult = isEvaluator ? compareFn.call(opt_selfObj, arr[middle], middle, arr) : compareFn(opt_target, arr[middle]);
    0 < compareResult ? left = middle + 1 : (right = middle, found = !compareResult);
  }
  return found ? left : ~left;
};
goog.array.sort = function $goog$array$sort$(arr, opt_compareFn) {
  arr.sort(opt_compareFn || goog.array.defaultCompare);
};
goog.array.stableSort = function $goog$array$stableSort$(arr, opt_compareFn) {
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  for (var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, stableCompareFn);
  for (i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value;
  }
};
goog.array.sortObjectsByKey = function $goog$array$sortObjectsByKey$(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key]);
  });
};
goog.array.isSorted = function $goog$array$isSorted$(arr, opt_compareFn, opt_strict) {
  for (var compare = opt_compareFn || goog.array.defaultCompare, i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (0 < compareResult || 0 == compareResult && opt_strict) {
      return!1;
    }
  }
  return!0;
};
goog.array.equals = function $goog$array$equals$(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return!1;
  }
  for (var l = arr1.length, equalsFn = opt_equalsFn || goog.array.defaultCompareEquality, i = 0;i < l;i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return!1;
    }
  }
  return!0;
};
goog.array.compare3 = function $goog$array$compare3$(arr1, arr2, opt_compareFn) {
  for (var compare = opt_compareFn || goog.array.defaultCompare, l = Math.min(arr1.length, arr2.length), i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if (0 != result) {
      return result;
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length);
};
goog.array.defaultCompare = function $goog$array$defaultCompare$(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.defaultCompareEquality = function $goog$array$defaultCompareEquality$(a, b) {
  return a === b;
};
goog.array.binaryInsert = function $goog$array$binaryInsert$(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return 0 > index ? (goog.array.insertAt(array, value, -(index + 1)), !0) : !1;
};
goog.array.binaryRemove = function $goog$array$binaryRemove$(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return 0 <= index ? goog.array.removeAt(array, index) : !1;
};
goog.array.bucket = function $goog$array$bucket$(array, sorter, opt_obj) {
  for (var buckets = {}, i = 0;i < array.length;i++) {
    var value = array[i], key = sorter.call(opt_obj, value, i, array);
    if (goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
};
goog.array.toObject = function $goog$array$toObject$(arr, keyFunc, opt_obj) {
  var ret = {};
  goog.array.forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
};
goog.array.range = function $goog$array$range$(startOrEnd, opt_end, opt_step) {
  var array = [], start = 0, end = startOrEnd, step = opt_step || 1;
  void 0 !== opt_end && (start = startOrEnd, end = opt_end);
  if (0 > step * (end - start)) {
    return[];
  }
  if (0 < step) {
    for (var i = start;i < end;i += step) {
      array.push(i);
    }
  } else {
    for (i = start;i > end;i += step) {
      array.push(i);
    }
  }
  return array;
};
goog.array.repeat = function $goog$array$repeat$(value, n) {
  for (var array = [], i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};
goog.array.flatten = function $goog$array$flatten$(var_args) {
  for (var result = [], i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    goog.isArray(element) ? result.push.apply(result, goog.array.flatten.apply(null, element)) : result.push(element);
  }
  return result;
};
goog.array.rotate = function $goog$array$rotate$(array, n) {
  goog.asserts.assert(null != array.length);
  array.length && (n %= array.length, 0 < n ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n)) : 0 > n && goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n)));
  return array;
};
goog.array.moveItem = function $goog$array$moveItem$(arr, fromIndex, toIndex) {
  goog.asserts.assert(0 <= fromIndex && fromIndex < arr.length);
  goog.asserts.assert(0 <= toIndex && toIndex < arr.length);
  var removedItems = goog.array.ARRAY_PROTOTYPE_.splice.call(arr, fromIndex, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(arr, toIndex, 0, removedItems[0]);
};
goog.array.zip = function $goog$array$zip$(var_args) {
  if (!arguments.length) {
    return[];
  }
  for (var result = [], i = 0;;i++) {
    for (var value = [], j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if (i >= arr.length) {
        return result;
      }
      value.push(arr[i]);
    }
    result.push(value);
  }
};
goog.array.shuffle = function $goog$array$shuffle$(arr, opt_randFn) {
  for (var randFn = opt_randFn || Math.random, i = arr.length - 1;0 < i;i--) {
    var j = Math.floor(randFn() * (i + 1)), tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
goog.functions = {};
goog.functions.constant = function $goog$functions$constant$(retValue) {
  return function() {
    return retValue;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function $goog$functions$identity$(opt_returnValue) {
  return opt_returnValue;
};
goog.functions.error = function $goog$functions$error$(message) {
  return function() {
    throw Error(message);
  };
};
goog.functions.fail = function $goog$functions$fail$(err) {
  return function() {
    throw err;
  };
};
goog.functions.lock = function $goog$functions$lock$(f, opt_numArgs) {
  opt_numArgs = opt_numArgs || 0;
  return function() {
    return f.apply(this, Array.prototype.slice.call(arguments, 0, opt_numArgs));
  };
};
goog.functions.nth = function $goog$functions$nth$(n) {
  return function() {
    return arguments[n];
  };
};
goog.functions.withReturnValue = function $goog$functions$withReturnValue$(f, retValue) {
  return goog.functions.sequence(f, goog.functions.constant(retValue));
};
goog.functions.compose = function $goog$functions$compose$(fn, var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    var result;
    length && (result = functions[length - 1].apply(this, arguments));
    for (var i = length - 2;0 <= i;i--) {
      result = functions[i].call(this, result);
    }
    return result;
  };
};
goog.functions.sequence = function $goog$functions$sequence$(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var result, i = 0;i < length;i++) {
      result = functions[i].apply(this, arguments);
    }
    return result;
  };
};
goog.functions.and = function $goog$functions$and$(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (!functions[i].apply(this, arguments)) {
        return!1;
      }
    }
    return!0;
  };
};
goog.functions.or = function $goog$functions$or$(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (functions[i].apply(this, arguments)) {
        return!0;
      }
    }
    return!1;
  };
};
goog.functions.not = function $goog$functions$not$(f) {
  return function() {
    return!f.apply(this, arguments);
  };
};
goog.functions.create = function $goog$functions$create$(constructor, var_args) {
  var temp = function $temp$() {
  };
  temp.prototype = constructor.prototype;
  var obj = new temp;
  constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function $goog$functions$cacheReturnValue$(fn) {
  var called = !1, value;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return fn();
    }
    called || (value = fn(), called = !0);
    return value;
  };
};
goog.math = {};
goog.math.randomInt = function $goog$math$randomInt$(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function $goog$math$uniformRandom$(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function $goog$math$clamp$(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function $goog$math$modulo$(a, b) {
  var r = a % b;
  return 0 > r * b ? r + b : r;
};
goog.math.lerp = function $goog$math$lerp$(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function $goog$math$nearlyEquals$(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 1E-6);
};
goog.math.standardAngle = function $goog$math$standardAngle$(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function $goog$math$standardAngleInRadians$(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function $goog$math$toRadians$(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function $goog$math$toDegrees$(angleRadians) {
  return 180 * angleRadians / Math.PI;
};
goog.math.angleDx = function $goog$math$angleDx$(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function $goog$math$angleDy$(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function $goog$math$angle$(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function $goog$math$angleDifference$(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  180 < d ? d -= 360 : -180 >= d && (d = 360 + d);
  return d;
};
goog.math.sign = function $goog$math$sign$(x) {
  return 0 == x ? 0 : 0 > x ? -1 : 1;
};
goog.math.longestCommonSubsequence = function $goog$math$longestCommonSubsequence$(array1, array2, opt_compareFn, opt_collectorFn) {
  for (var compare = opt_compareFn || function(a, b) {
    return a == b;
  }, collect = opt_collectorFn || function(i1) {
    return array1[i1];
  }, length1 = array1.length, length2 = array2.length, arr = [], i = 0;i < length1 + 1;i++) {
    arr[i] = [], arr[i][0] = 0;
  }
  for (var j = 0;j < length2 + 1;j++) {
    arr[0][j] = 0;
  }
  for (i = 1;i <= length1;i++) {
    for (j = 1;j <= length2;j++) {
      compare(array1[i - 1], array2[j - 1]) ? arr[i][j] = arr[i - 1][j - 1] + 1 : arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
    }
  }
  for (var result = [], i = length1, j = length2;0 < i && 0 < j;) {
    compare(array1[i - 1], array2[j - 1]) ? (result.unshift(collect(i - 1, j - 1)), i--, j--) : arr[i - 1][j] > arr[i][j - 1] ? i-- : j--;
  }
  return result;
};
goog.math.sum = function $goog$math$sum$(var_args) {
  return goog.array.reduce(arguments, function(sum, value) {
    return sum + value;
  }, 0);
};
goog.math.average = function $goog$math$average$(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function $goog$math$sampleVariance$(var_args) {
  var sampleSize = arguments.length;
  if (2 > sampleSize) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments), variance = goog.math.sum.apply(null, goog.array.map(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function $goog$math$standardDeviation$(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function $goog$math$isInt$(num) {
  return isFinite(num) && 0 == num % 1;
};
goog.math.isFiniteNumber = function $goog$math$isFiniteNumber$(num) {
  return isFinite(num) && !isNaN(num);
};
goog.math.log10Floor = function $goog$math$log10Floor$(num) {
  if (0 < num) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num);
  }
  return 0 == num ? -Infinity : NaN;
};
goog.math.safeFloor = function $goog$math$safeFloor$(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || 0 < opt_epsilon);
  return Math.floor(num + (opt_epsilon || 2E-15));
};
goog.math.safeCeil = function $goog$math$safeCeil$(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || 0 < opt_epsilon);
  return Math.ceil(num - (opt_epsilon || 2E-15));
};
goog.math.Coordinate = function $goog$math$Coordinate$(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0;
};
goog.math.Coordinate.prototype.clone = function $goog$math$Coordinate$$clone$() {
  return new goog.math.Coordinate(this.x, this.y);
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function $goog$math$Coordinate$$toString$() {
  return "(" + this.x + ", " + this.y + ")";
});
goog.math.Coordinate.equals = function $goog$math$Coordinate$equals$(a, b) {
  return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1;
};
goog.math.Coordinate.distance = function $goog$math$Coordinate$distance$(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};
goog.math.Coordinate.magnitude = function $goog$math$Coordinate$magnitude$(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function $goog$math$Coordinate$azimuth$(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function $goog$math$Coordinate$squaredDistance$(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
};
goog.math.Coordinate.difference = function $goog$math$Coordinate$difference$(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function $goog$math$Coordinate$sum$(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function $goog$math$Coordinate$$ceil$() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function $goog$math$Coordinate$$floor$() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function $goog$math$Coordinate$$round$() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Size = function $goog$math$Size$(width, height) {
  this.width = width;
  this.height = height;
};
goog.math.Size.equals = function $goog$math$Size$equals$(a, b) {
  return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1;
};
goog.math.Size.prototype.clone = function $goog$math$Size$$clone$() {
  return new goog.math.Size(this.width, this.height);
};
goog.DEBUG && (goog.math.Size.prototype.toString = function $goog$math$Size$$toString$() {
  return "(" + this.width + " x " + this.height + ")";
});
goog.math.Size.prototype.area = function $goog$math$Size$$area$() {
  return this.width * this.height;
};
goog.math.Size.prototype.isEmpty = function $goog$math$Size$$isEmpty$() {
  return!this.area();
};
goog.math.Size.prototype.ceil = function $goog$math$Size$$ceil$() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.floor = function $goog$math$Size$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function $goog$math$Size$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.object = {};
goog.object.forEach = function $goog$object$forEach$(obj, f, opt_obj) {
  for (var key in obj) {
    f.call(opt_obj, obj[key], key, obj);
  }
};
goog.object.filter = function $goog$object$filter$(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    f.call(opt_obj, obj[key], key, obj) && (res[key] = obj[key]);
  }
  return res;
};
goog.object.map = function $goog$object$map$(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj);
  }
  return res;
};
goog.object.some = function $goog$object$some$(obj, f, opt_obj) {
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      return!0;
    }
  }
  return!1;
};
goog.object.every = function $goog$object$every$(obj, f, opt_obj) {
  for (var key in obj) {
    if (!f.call(opt_obj, obj[key], key, obj)) {
      return!1;
    }
  }
  return!0;
};
goog.object.getCount = function $goog$object$getCount$(obj) {
  var rv = 0, key;
  for (key in obj) {
    rv++;
  }
  return rv;
};
goog.object.getAnyKey = function $goog$object$getAnyKey$(obj) {
  for (var key in obj) {
    return key;
  }
};
goog.object.getAnyValue = function $goog$object$getAnyValue$(obj) {
  for (var key in obj) {
    return obj[key];
  }
};
goog.object.contains = function $goog$object$contains$(obj, val) {
  return goog.object.containsValue(obj, val);
};
goog.object.getValues = function $goog$object$getValues$(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = obj[key];
  }
  return res;
};
goog.object.getKeys = function $goog$object$getKeys$(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = key;
  }
  return res;
};
goog.object.getValueByKeys = function $goog$object$getValueByKeys$(obj, var_args) {
  for (var isArrayLike = goog.isArrayLike(var_args), keys = isArrayLike ? var_args : arguments, i = isArrayLike ? 0 : 1;i < keys.length && (obj = obj[keys[i]], goog.isDef(obj));i++) {
  }
  return obj;
};
goog.object.containsKey = function $goog$object$containsKey$(obj, key) {
  return key in obj;
};
goog.object.containsValue = function $goog$object$containsValue$(obj, val) {
  for (var key in obj) {
    if (obj[key] == val) {
      return!0;
    }
  }
  return!1;
};
goog.object.findKey = function $goog$object$findKey$(obj, f, opt_this) {
  for (var key in obj) {
    if (f.call(opt_this, obj[key], key, obj)) {
      return key;
    }
  }
};
goog.object.findValue = function $goog$object$findValue$(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key];
};
goog.object.isEmpty = function $goog$object$isEmpty$(obj) {
  for (var key in obj) {
    return!1;
  }
  return!0;
};
goog.object.clear = function $goog$object$clear$(obj) {
  for (var i in obj) {
    delete obj[i];
  }
};
goog.object.remove = function $goog$object$remove$(obj, key) {
  var rv;
  (rv = key in obj) && delete obj[key];
  return rv;
};
goog.object.add = function $goog$object$add$(obj, key, val) {
  if (key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val);
};
goog.object.get = function $goog$object$get$(obj, key, opt_val) {
  return key in obj ? obj[key] : opt_val;
};
goog.object.set = function $goog$object$set$(obj, key, value) {
  obj[key] = value;
};
goog.object.setIfUndefined = function $goog$object$setIfUndefined$(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value;
};
goog.object.clone = function $goog$object$clone$(obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = obj[key];
  }
  return res;
};
goog.object.unsafeClone = function $goog$object$unsafeClone$(obj) {
  var type = goog.typeOf(obj);
  if ("object" == type || "array" == type) {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = "array" == type ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.object.transpose = function $goog$object$transpose$(obj) {
  var transposed = {}, key;
  for (key in obj) {
    transposed[obj[key]] = key;
  }
  return transposed;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function $goog$object$extend$(target, var_args) {
  for (var key, source, i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for (key in source) {
      target[key] = source[key];
    }
    for (var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j], Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
  }
};
goog.object.create = function $goog$object$create$(var_args) {
  var argLength = arguments.length;
  if (1 == argLength && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var rv = {}, i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1];
  }
  return rv;
};
goog.object.createSet = function $goog$object$createSet$(var_args) {
  var argLength = arguments.length;
  if (1 == argLength && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var rv = {}, i = 0;i < argLength;i++) {
    rv[arguments[i]] = !0;
  }
  return rv;
};
goog.object.createImmutableView = function $goog$object$createImmutableView$(obj) {
  var result = obj;
  Object.isFrozen && !Object.isFrozen(obj) && (result = Object.create(obj), Object.freeze(result));
  return result;
};
goog.object.isImmutableView = function $goog$object$isImmutableView$(obj) {
  return!!Object.isFrozen && Object.isFrozen(obj);
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function $goog$labs$userAgent$util$getNativeUserAgentString_$() {
  var navigator = goog.labs.userAgent.util.getNavigator_();
  if (navigator) {
    var userAgent = navigator.userAgent;
    if (userAgent) {
      return userAgent;
    }
  }
  return "";
};
goog.labs.userAgent.util.getNavigator_ = function $goog$labs$userAgent$util$getNavigator_$() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function $goog$labs$userAgent$util$setUserAgent$(opt_userAgent) {
  goog.labs.userAgent.util.userAgent_ = opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function $goog$labs$userAgent$util$getUserAgent$() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function $goog$labs$userAgent$util$matchUserAgent$(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(userAgent, str);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function $goog$labs$userAgent$util$matchUserAgentIgnoreCase$(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(userAgent, str);
};
goog.labs.userAgent.util.extractVersionTuples = function $goog$labs$userAgent$util$extractVersionTuples$(userAgent) {
  for (var versionRegExp = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), data = [], match;match = versionRegExp.exec(userAgent);) {
    data.push([match[1], match[2], match[3] || void 0]);
  }
  return data;
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function $goog$labs$userAgent$browser$matchOpera_$() {
  return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function $goog$labs$userAgent$browser$matchIE_$() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchFirefox_ = function $goog$labs$userAgent$browser$matchFirefox_$() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function $goog$labs$userAgent$browser$matchSafari_$() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !goog.labs.userAgent.util.matchUserAgent("Chrome") && !goog.labs.userAgent.util.matchUserAgent("CriOS") && !goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.browser.matchChrome_ = function $goog$labs$userAgent$browser$matchChrome_$() {
  return goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS");
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function $goog$labs$userAgent$browser$matchAndroidBrowser_$() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !goog.labs.userAgent.util.matchUserAgent("Chrome") && !goog.labs.userAgent.util.matchUserAgent("CriOS");
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function $goog$labs$userAgent$browser$isSilk$() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function $goog$labs$userAgent$browser$getVersion$() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(userAgentString);
  }
  if (goog.labs.userAgent.browser.isOpera()) {
    return goog.labs.userAgent.browser.getOperaVersion_(userAgentString);
  }
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);
  return goog.labs.userAgent.browser.getVersionFromTuples_(versionTuples);
};
goog.labs.userAgent.browser.isVersionOrHigher = function $goog$labs$userAgent$browser$isVersionOrHigher$(version) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), version);
};
goog.labs.userAgent.browser.getIEVersion_ = function $goog$labs$userAgent$browser$getIEVersion_$(userAgent) {
  var rv = /rv: *([\d\.]*)/.exec(userAgent);
  if (rv && rv[1]) {
    return rv[1];
  }
  var version = "", msie = /MSIE +([\d\.]+)/.exec(userAgent);
  if (msie && msie[1]) {
    var tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
    if ("7.0" == msie[1]) {
      if (tridentVersion && tridentVersion[1]) {
        switch(tridentVersion[1]) {
          case "4.0":
            version = "8.0";
            break;
          case "5.0":
            version = "9.0";
            break;
          case "6.0":
            version = "10.0";
            break;
          case "7.0":
            version = "11.0";
        }
      } else {
        version = "7.0";
      }
    } else {
      version = msie[1];
    }
  }
  return version;
};
goog.labs.userAgent.browser.getOperaVersion_ = function $goog$labs$userAgent$browser$getOperaVersion_$(userAgent) {
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgent), lastTuple = goog.array.peek(versionTuples);
  return "OPR" == lastTuple[0] && lastTuple[1] ? lastTuple[1] : goog.labs.userAgent.browser.getVersionFromTuples_(versionTuples);
};
goog.labs.userAgent.browser.getVersionFromTuples_ = function $goog$labs$userAgent$browser$getVersionFromTuples_$(versionTuples) {
  goog.asserts.assert(2 < versionTuples.length, "Couldn't extract version tuple from user agent string");
  return versionTuples[2] && versionTuples[2][1] ? versionTuples[2][1] : "";
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function $goog$labs$userAgent$engine$isPresto$() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function $goog$labs$userAgent$engine$isTrident$() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isWebKit = function $goog$labs$userAgent$engine$isWebKit$() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit");
};
goog.labs.userAgent.engine.isGecko = function $goog$labs$userAgent$engine$isGecko$() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident();
};
goog.labs.userAgent.engine.getVersion = function $goog$labs$userAgent$engine$getVersion$() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (userAgentString) {
    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString), engineTuple = tuples[1];
    if (engineTuple) {
      return "Gecko" == engineTuple[0] ? goog.labs.userAgent.engine.getVersionForKey_(tuples, "Firefox") : engineTuple[1];
    }
    var browserTuple = tuples[0], info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return "";
};
goog.labs.userAgent.engine.isVersionOrHigher = function $goog$labs$userAgent$engine$isVersionOrHigher$(version) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), version);
};
goog.labs.userAgent.engine.getVersionForKey_ = function $goog$labs$userAgent$engine$getVersionForKey_$(tuples, key) {
  var pair = goog.array.find(tuples, function(pair) {
    return key == pair[0];
  });
  return pair && pair[1] || "";
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function $goog$userAgent$getUserAgentString$() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function $goog$userAgent$getNavigator$() {
  return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function $goog$userAgent$isMobile_$() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function $goog$userAgent$determinePlatform_$() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.initPlatform_ = function $goog$userAgent$initPlatform_$() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11");
  var ua = goog.userAgent.getUserAgentString();
  goog.userAgent.detectedAndroid_ = !!ua && goog.string.contains(ua, "Android");
  goog.userAgent.detectedIPhone_ = !!ua && goog.string.contains(ua, "iPhone");
  goog.userAgent.detectedIPad_ = !!ua && goog.string.contains(ua, "iPad");
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.userAgent.detectedAndroid_;
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.userAgent.detectedIPhone_;
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.userAgent.detectedIPad_;
goog.userAgent.determineVersion_ = function $goog$userAgent$determineVersion_$() {
  var version = "", re;
  if (goog.userAgent.OPERA && goog.global.opera) {
    var operaVersion = goog.global.opera.version;
    return goog.isFunction(operaVersion) ? operaVersion() : operaVersion;
  }
  goog.userAgent.GECKO ? re = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? re = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (re = /WebKit\/(\S+)/);
  if (re) {
    var arr = re.exec(goog.userAgent.getUserAgentString()), version = arr ? arr[1] : ""
  }
  if (goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if (docMode > parseFloat(version)) {
      return String(docMode);
    }
  }
  return version;
};
goog.userAgent.getDocumentMode_ = function $goog$userAgent$getDocumentMode_$() {
  var doc = goog.global.document;
  return doc ? doc.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function $goog$userAgent$compare$(v1, v2) {
  return goog.string.compareVersions(v1, v2);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function $goog$userAgent$isVersionOrHigher$(version) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[version] || (goog.userAgent.isVersionOrHigherCache_[version] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, version));
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function $goog$userAgent$isDocumentModeOrHigher$(documentMode) {
  return goog.userAgent.IE && goog.userAgent.DOCUMENT_MODE >= documentMode;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
var JSCompiler_inline_result$$0;
var doc$$inline_1 = goog.global.document;
if (doc$$inline_1 && goog.userAgent.IE) {
  var mode$$inline_2 = goog.userAgent.getDocumentMode_();
  JSCompiler_inline_result$$0 = mode$$inline_2 || ("CSS1Compat" == doc$$inline_1.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5);
} else {
  JSCompiler_inline_result$$0 = void 0;
}
goog.userAgent.DOCUMENT_MODE = JSCompiler_inline_result$$0;
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, 
INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE, LEGACY_IE_RANGES:goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function $goog$dom$getDomHelper$(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper);
};
goog.dom.getDocument = function $goog$dom$getDocument$() {
  return document;
};
goog.dom.getElement = function $goog$dom$getElement$(element) {
  return goog.dom.getElementHelper_(document, element);
};
goog.dom.getElementHelper_ = function $goog$dom$getElementHelper_$(doc, element) {
  return goog.isString(element) ? doc.getElementById(element) : element;
};
goog.dom.getRequiredElement = function $goog$dom$getRequiredElement$(id) {
  return goog.dom.getRequiredElementHelper_(document, id);
};
goog.dom.getRequiredElementHelper_ = function $goog$dom$getRequiredElementHelper_$(doc, id) {
  goog.asserts.assertString(id);
  var element = goog.dom.getElementHelper_(doc, id);
  return element = goog.asserts.assertElement(element, "No element found with id: " + id);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function $goog$dom$getElementsByTagNameAndClass$(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el);
};
goog.dom.getElementsByClass = function $goog$dom$getElementsByClass$(className, opt_el) {
  var parent = opt_el || document;
  return goog.dom.canUseQuerySelector_(parent) ? parent.querySelectorAll("." + className) : goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el);
};
goog.dom.getElementByClass = function $goog$dom$getElementByClass$(className, opt_el) {
  var parent = opt_el || document, retVal = null;
  return(retVal = goog.dom.canUseQuerySelector_(parent) ? parent.querySelector("." + className) : goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el)[0]) || null;
};
goog.dom.getRequiredElementByClass = function $goog$dom$getRequiredElementByClass$(className, opt_root) {
  var retValue = goog.dom.getElementByClass(className, opt_root);
  return goog.asserts.assert(retValue, "No element found with className: " + className);
};
goog.dom.canUseQuerySelector_ = function $goog$dom$canUseQuerySelector_$(parent) {
  return!(!parent.querySelectorAll || !parent.querySelector);
};
goog.dom.getElementsByTagNameAndClass_ = function $goog$dom$getElementsByTagNameAndClass_$(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc, tagName = opt_tag && "*" != opt_tag ? opt_tag.toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(parent) && (tagName || opt_class)) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query);
  }
  if (opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if (tagName) {
      for (var arrayLike = {}, len = 0, i = 0, el;el = els[i];i++) {
        tagName == el.nodeName && (arrayLike[len++] = el);
      }
      arrayLike.length = len;
      return arrayLike;
    }
    return els;
  }
  els = parent.getElementsByTagName(tagName || "*");
  if (opt_class) {
    arrayLike = {};
    for (i = len = 0;el = els[i];i++) {
      var className = el.className;
      "function" == typeof className.split && goog.array.contains(className.split(/\s+/), opt_class) && (arrayLike[len++] = el);
    }
    arrayLike.length = len;
    return arrayLike;
  }
  return els;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function $goog$dom$setProperties$(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    "style" == key ? element.style.cssText = val : "class" == key ? element.className = val : "for" == key ? element.htmlFor = val : key in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val) : goog.string.startsWith(key, "aria-") || goog.string.startsWith(key, "data-") ? element.setAttribute(key, val) : element[key] = val;
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function $goog$dom$getViewportSize$(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window);
};
goog.dom.getViewportSize_ = function $goog$dom$getViewportSize_$(win) {
  var doc = win.document, el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight);
};
goog.dom.getDocumentHeight = function $goog$dom$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeight_ = function $goog$dom$getDocumentHeight_$(win) {
  var doc = win.document, height = 0;
  if (doc) {
    var body = doc.body, docEl = doc.documentElement;
    if (!docEl || !body) {
      return 0;
    }
    var vh = goog.dom.getViewportSize_(win).height;
    if (goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight;
    } else {
      var sh = docEl.scrollHeight, oh = docEl.offsetHeight;
      docEl.clientHeight != oh && (sh = body.scrollHeight, oh = body.offsetHeight);
      height = sh > vh ? sh > oh ? sh : oh : sh < oh ? sh : oh;
    }
  }
  return height;
};
goog.dom.getPageScroll = function $goog$dom$getPageScroll$(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function $goog$dom$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function $goog$dom$getDocumentScroll_$(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc), win = goog.dom.getWindow_(doc);
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && win.pageYOffset != el.scrollTop ? new goog.math.Coordinate(el.scrollLeft, el.scrollTop) : new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop);
};
goog.dom.getDocumentScrollElement = function $goog$dom$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function $goog$dom$getDocumentScrollElement_$(doc) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body || doc.documentElement;
};
goog.dom.getWindow = function $goog$dom$getWindow$(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window;
};
goog.dom.getWindow_ = function $goog$dom$getWindow_$(doc) {
  return doc.parentWindow || doc.defaultView;
};
goog.dom.createDom = function $goog$dom$createDom$(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function $goog$dom$createDom_$(doc, args) {
  var tagName = args[0], attributes = args[1];
  if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && attributes && (attributes.name || attributes.type)) {
    var tagNameArr = ["<", tagName];
    attributes.name && tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"');
    if (attributes.type) {
      tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
      var clone = {};
      goog.object.extend(clone, attributes);
      delete clone.type;
      attributes = clone;
    }
    tagNameArr.push(">");
    tagName = tagNameArr.join("");
  }
  var element = doc.createElement(tagName);
  attributes && (goog.isString(attributes) ? element.className = attributes : goog.isArray(attributes) ? element.className = attributes.join(" ") : goog.dom.setProperties(element, attributes));
  2 < args.length && goog.dom.append_(doc, element, args, 2);
  return element;
};
goog.dom.append_ = function $goog$dom$append_$(doc, parent, args, startIndex) {
  function childHandler(child) {
    child && parent.appendChild(goog.isString(child) ? doc.createTextNode(child) : child);
  }
  for (var i = startIndex;i < args.length;i++) {
    var arg = args[i];
    goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg) ? goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.toArray(arg) : arg, childHandler) : childHandler(arg);
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function $goog$dom$createElement$(name) {
  return document.createElement(name);
};
goog.dom.createTextNode = function $goog$dom$createTextNode$(content) {
  return document.createTextNode(String(content));
};
goog.dom.createTable = function $goog$dom$createTable$(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.createTable_ = function $goog$dom$createTable_$(doc, rows, columns, fillWithNbsp) {
  for (var rowHtml = ["<tr>"], i = 0;i < columns;i++) {
    rowHtml.push(fillWithNbsp ? "<td>&nbsp;</td>" : "<td></td>");
  }
  rowHtml.push("</tr>");
  for (var rowHtml = rowHtml.join(""), totalHtml = ["<table>"], i = 0;i < rows;i++) {
    totalHtml.push(rowHtml);
  }
  totalHtml.push("</table>");
  var elem = doc.createElement(goog.dom.TagName.DIV);
  elem.innerHTML = totalHtml.join("");
  return elem.removeChild(elem.firstChild);
};
goog.dom.htmlToDocumentFragment = function $goog$dom$htmlToDocumentFragment$(htmlString) {
  return goog.dom.htmlToDocumentFragment_(document, htmlString);
};
goog.dom.htmlToDocumentFragment_ = function $goog$dom$htmlToDocumentFragment_$(doc, htmlString) {
  var tempDiv = doc.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (tempDiv.innerHTML = "<br>" + htmlString, tempDiv.removeChild(tempDiv.firstChild)) : tempDiv.innerHTML = htmlString;
  if (1 == tempDiv.childNodes.length) {
    return tempDiv.removeChild(tempDiv.firstChild);
  }
  for (var fragment = doc.createDocumentFragment();tempDiv.firstChild;) {
    fragment.appendChild(tempDiv.firstChild);
  }
  return fragment;
};
goog.dom.isCss1CompatMode = function $goog$dom$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function $goog$dom$isCss1CompatMode_$(doc) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == doc.compatMode;
};
goog.dom.canHaveChildren = function $goog$dom$canHaveChildren$(node) {
  if (node.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1;
  }
  switch(node.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.COMMAND:
    ;
    case goog.dom.TagName.EMBED:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.KEYGEN:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.SOURCE:
    ;
    case goog.dom.TagName.STYLE:
    ;
    case goog.dom.TagName.TRACK:
    ;
    case goog.dom.TagName.WBR:
      return!1;
  }
  return!0;
};
goog.dom.appendChild = function $goog$dom$appendChild$(parent, child) {
  parent.appendChild(child);
};
goog.dom.append = function $goog$dom$append$(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1);
};
goog.dom.removeChildren = function $goog$dom$removeChildren$(node) {
  for (var child;child = node.firstChild;) {
    node.removeChild(child);
  }
};
goog.dom.insertSiblingBefore = function $goog$dom$insertSiblingBefore$(newNode, refNode) {
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
};
goog.dom.insertSiblingAfter = function $goog$dom$insertSiblingAfter$(newNode, refNode) {
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
};
goog.dom.insertChildAt = function $goog$dom$insertChildAt$(parent, child, index) {
  parent.insertBefore(child, parent.childNodes[index] || null);
};
goog.dom.removeNode = function $goog$dom$removeNode$(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};
goog.dom.replaceNode = function $goog$dom$replaceNode$(newNode, oldNode) {
  var parent = oldNode.parentNode;
  parent && parent.replaceChild(newNode, oldNode);
};
goog.dom.flattenElement = function $goog$dom$flattenElement$(element) {
  var child, parent = element.parentNode;
  if (parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (element.removeNode) {
      return element.removeNode(!1);
    }
    for (;child = element.firstChild;) {
      parent.insertBefore(child, element);
    }
    return goog.dom.removeNode(element);
  }
};
goog.dom.getChildren = function $goog$dom$getChildren$(element) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != element.children ? element.children : goog.array.filter(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function $goog$dom$getFirstElementChild$(node) {
  return void 0 != node.firstElementChild ? node.firstElementChild : goog.dom.getNextElementNode_(node.firstChild, !0);
};
goog.dom.getLastElementChild = function $goog$dom$getLastElementChild$(node) {
  return void 0 != node.lastElementChild ? node.lastElementChild : goog.dom.getNextElementNode_(node.lastChild, !1);
};
goog.dom.getNextElementSibling = function $goog$dom$getNextElementSibling$(node) {
  return void 0 != node.nextElementSibling ? node.nextElementSibling : goog.dom.getNextElementNode_(node.nextSibling, !0);
};
goog.dom.getPreviousElementSibling = function $goog$dom$getPreviousElementSibling$(node) {
  return void 0 != node.previousElementSibling ? node.previousElementSibling : goog.dom.getNextElementNode_(node.previousSibling, !1);
};
goog.dom.getNextElementNode_ = function $goog$dom$getNextElementNode_$(node, forward) {
  for (;node && node.nodeType != goog.dom.NodeType.ELEMENT;) {
    node = forward ? node.nextSibling : node.previousSibling;
  }
  return node;
};
goog.dom.getNextNode = function $goog$dom$getNextNode$(node) {
  if (!node) {
    return null;
  }
  if (node.firstChild) {
    return node.firstChild;
  }
  for (;node && !node.nextSibling;) {
    node = node.parentNode;
  }
  return node ? node.nextSibling : null;
};
goog.dom.getPreviousNode = function $goog$dom$getPreviousNode$(node) {
  if (!node) {
    return null;
  }
  if (!node.previousSibling) {
    return node.parentNode;
  }
  for (node = node.previousSibling;node && node.lastChild;) {
    node = node.lastChild;
  }
  return node;
};
goog.dom.isNodeLike = function $goog$dom$isNodeLike$(obj) {
  return goog.isObject(obj) && 0 < obj.nodeType;
};
goog.dom.isElement = function $goog$dom$isElement$(obj) {
  return goog.isObject(obj) && obj.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function $goog$dom$isWindow$(obj) {
  return goog.isObject(obj) && obj.window == obj;
};
goog.dom.getParentElement = function $goog$dom$getParentElement$(element) {
  var parent;
  if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) {
    var isIe9 = goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10");
    if (!(isIe9 && goog.global.SVGElement && element instanceof goog.global.SVGElement) && (parent = element.parentElement)) {
      return parent;
    }
  }
  parent = element.parentNode;
  return goog.dom.isElement(parent) ? parent : null;
};
goog.dom.contains = function $goog$dom$contains$(parent, descendant) {
  if (parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant);
  }
  if ("undefined" != typeof parent.compareDocumentPosition) {
    return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16);
  }
  for (;descendant && parent != descendant;) {
    descendant = descendant.parentNode;
  }
  return descendant == parent;
};
goog.dom.compareNodeOrder = function $goog$dom$compareNodeOrder$(node1, node2) {
  if (node1 == node2) {
    return 0;
  }
  if (node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1;
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    if (node1.nodeType == goog.dom.NodeType.DOCUMENT) {
      return-1;
    }
    if (node2.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1;
    }
  }
  if ("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT, isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if (isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex;
    }
    var parent1 = node1.parentNode, parent2 = node2.parentNode;
    return parent1 == parent2 ? goog.dom.compareSiblingOrder_(node1, node2) : !isElement1 && goog.dom.contains(parent1, node2) ? -1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2) : !isElement2 && goog.dom.contains(parent2, node1) ? goog.dom.compareParentsDescendantNodeIe_(node2, node1) : (isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex);
  }
  var doc = goog.dom.getOwnerDocument(node1), range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(!0);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(!0);
  return range1.compareBoundaryPoints(goog.global.Range.START_TO_END, range2);
};
goog.dom.compareParentsDescendantNodeIe_ = function $goog$dom$compareParentsDescendantNodeIe_$(textNode, node) {
  var parent = textNode.parentNode;
  if (parent == node) {
    return-1;
  }
  for (var sibling = node;sibling.parentNode != parent;) {
    sibling = sibling.parentNode;
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode);
};
goog.dom.compareSiblingOrder_ = function $goog$dom$compareSiblingOrder_$(node1, node2) {
  for (var s = node2;s = s.previousSibling;) {
    if (s == node1) {
      return-1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function $goog$dom$findCommonAncestor$(var_args) {
  var i, count = arguments.length;
  if (!count) {
    return null;
  }
  if (1 == count) {
    return arguments[0];
  }
  var paths = [], minLength = Infinity;
  for (i = 0;i < count;i++) {
    for (var ancestors = [], node = arguments[i];node;) {
      ancestors.unshift(node), node = node.parentNode;
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length);
  }
  var output = null;
  for (i = 0;i < minLength;i++) {
    for (var first = paths[0][i], j = 1;j < count;j++) {
      if (first != paths[j][i]) {
        return output;
      }
    }
    output = first;
  }
  return output;
};
goog.dom.getOwnerDocument = function $goog$dom$getOwnerDocument$(node) {
  goog.asserts.assert(node, "Node cannot be null or undefined.");
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document;
};
goog.dom.getFrameContentDocument = function $goog$dom$getFrameContentDocument$(frame) {
  var doc = frame.contentDocument || frame.contentWindow.document;
  return doc;
};
goog.dom.getFrameContentWindow = function $goog$dom$getFrameContentWindow$(frame) {
  return frame.contentWindow || goog.dom.getWindow(goog.dom.getFrameContentDocument(frame));
};
goog.dom.setTextContent = function $goog$dom$setTextContent$(node, text) {
  goog.asserts.assert(null != node, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in node) {
    node.textContent = text;
  } else {
    if (node.nodeType == goog.dom.NodeType.TEXT) {
      node.data = text;
    } else {
      if (node.firstChild && node.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (;node.lastChild != node.firstChild;) {
          node.removeChild(node.lastChild);
        }
        node.firstChild.data = text;
      } else {
        goog.dom.removeChildren(node);
        var doc = goog.dom.getOwnerDocument(node);
        node.appendChild(doc.createTextNode(String(text)));
      }
    }
  }
};
goog.dom.getOuterHtml = function $goog$dom$getOuterHtml$(element) {
  if ("outerHTML" in element) {
    return element.outerHTML;
  }
  var doc = goog.dom.getOwnerDocument(element), div = doc.createElement("div");
  div.appendChild(element.cloneNode(!0));
  return div.innerHTML;
};
goog.dom.findNode = function $goog$dom$findNode$(root, p) {
  var rv = [], found = goog.dom.findNodes_(root, p, rv, !0);
  return found ? rv[0] : void 0;
};
goog.dom.findNodes = function $goog$dom$findNodes$(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, !1);
  return rv;
};
goog.dom.findNodes_ = function $goog$dom$findNodes_$(root, p, rv, findOne) {
  if (null != root) {
    for (var child = root.firstChild;child;) {
      if (p(child) && (rv.push(child), findOne) || goog.dom.findNodes_(child, p, rv, findOne)) {
        return!0;
      }
      child = child.nextSibling;
    }
  }
  return!1;
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function $goog$dom$isFocusableTabIndex$(element) {
  return goog.dom.hasSpecifiedTabIndex_(element) && goog.dom.isTabIndexFocusable_(element);
};
goog.dom.setFocusableTabIndex = function $goog$dom$setFocusableTabIndex$(element, enable) {
  enable ? element.tabIndex = 0 : (element.tabIndex = -1, element.removeAttribute("tabIndex"));
};
goog.dom.isFocusable = function $goog$dom$isFocusable$(element) {
  var focusable;
  return(focusable = goog.dom.nativelySupportsFocus_(element) ? !element.disabled && (!goog.dom.hasSpecifiedTabIndex_(element) || goog.dom.isTabIndexFocusable_(element)) : goog.dom.isFocusableTabIndex(element)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(element) : focusable;
};
goog.dom.hasSpecifiedTabIndex_ = function $goog$dom$hasSpecifiedTabIndex_$(element) {
  var attrNode = element.getAttributeNode("tabindex");
  return goog.isDefAndNotNull(attrNode) && attrNode.specified;
};
goog.dom.isTabIndexFocusable_ = function $goog$dom$isTabIndexFocusable_$(element) {
  var index = element.tabIndex;
  return goog.isNumber(index) && 0 <= index && 32768 > index;
};
goog.dom.nativelySupportsFocus_ = function $goog$dom$nativelySupportsFocus_$(element) {
  return element.tagName == goog.dom.TagName.A || element.tagName == goog.dom.TagName.INPUT || element.tagName == goog.dom.TagName.TEXTAREA || element.tagName == goog.dom.TagName.SELECT || element.tagName == goog.dom.TagName.BUTTON;
};
goog.dom.hasNonZeroBoundingRect_ = function $goog$dom$hasNonZeroBoundingRect_$(element) {
  var rect = goog.isFunction(element.getBoundingClientRect) ? element.getBoundingClientRect() : {height:element.offsetHeight, width:element.offsetWidth};
  return goog.isDefAndNotNull(rect) && 0 < rect.height && 0 < rect.width;
};
goog.dom.getTextContent = function $goog$dom$getTextContent$(node) {
  var textContent;
  if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in node) {
    textContent = goog.string.canonicalizeNewlines(node.innerText);
  } else {
    var buf = [];
    goog.dom.getTextContent_(node, buf, !0);
    textContent = buf.join("");
  }
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (textContent = textContent.replace(/ +/g, " "));
  " " != textContent && (textContent = textContent.replace(/^\s*/, ""));
  return textContent;
};
goog.dom.getRawTextContent = function $goog$dom$getRawTextContent$(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, !1);
  return buf.join("");
};
goog.dom.getTextContent_ = function $goog$dom$getTextContent_$(node, buf, normalizeWhitespace) {
  if (!(node.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if (node.nodeType == goog.dom.NodeType.TEXT) {
      normalizeWhitespace ? buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : buf.push(node.nodeValue);
    } else {
      if (node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName]);
      } else {
        for (var child = node.firstChild;child;) {
          goog.dom.getTextContent_(child, buf, normalizeWhitespace), child = child.nextSibling;
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function $goog$dom$getNodeTextLength$(node) {
  return goog.dom.getTextContent(node).length;
};
goog.dom.getNodeTextOffset = function $goog$dom$getNodeTextOffset$(node, opt_offsetParent) {
  for (var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body, buf = [];node && node != root;) {
    for (var cur = node;cur = cur.previousSibling;) {
      buf.unshift(goog.dom.getTextContent(cur));
    }
    node = node.parentNode;
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function $goog$dom$getNodeAtOffset$(parent, offset, opt_result) {
  for (var stack = [parent], pos = 0, cur = null;0 < stack.length && pos < offset;) {
    if (cur = stack.pop(), !(cur.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if (cur.nodeType == goog.dom.NodeType.TEXT) {
        var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), pos = pos + text.length
      } else {
        if (cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length;
        } else {
          for (var i = cur.childNodes.length - 1;0 <= i;i--) {
            stack.push(cur.childNodes[i]);
          }
        }
      }
    }
  }
  goog.isObject(opt_result) && (opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0, opt_result.node = cur);
  return cur;
};
goog.dom.isNodeList = function $goog$dom$isNodeList$(val) {
  if (val && "number" == typeof val.length) {
    if (goog.isObject(val)) {
      return "function" == typeof val.item || "string" == typeof val.item;
    }
    if (goog.isFunction(val)) {
      return "function" == typeof val.item;
    }
  }
  return!1;
};
goog.dom.getAncestorByTagNameAndClass = function $goog$dom$getAncestorByTagNameAndClass$(element, opt_tag, opt_class) {
  if (!opt_tag && !opt_class) {
    return null;
  }
  var tagName = opt_tag ? opt_tag.toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return(!tagName || node.nodeName == tagName) && (!opt_class || goog.isString(node.className) && goog.array.contains(node.className.split(/\s+/), opt_class));
  }, !0);
};
goog.dom.getAncestorByClass = function $goog$dom$getAncestorByClass$(element, className) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, className);
};
goog.dom.getAncestor = function $goog$dom$getAncestor$(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  opt_includeNode || (element = element.parentNode);
  for (var ignoreSearchSteps = null == opt_maxSearchSteps, steps = 0;element && (ignoreSearchSteps || steps <= opt_maxSearchSteps);) {
    if (matcher(element)) {
      return element;
    }
    element = element.parentNode;
    steps++;
  }
  return null;
};
goog.dom.getActiveElement = function $goog$dom$getActiveElement$(doc) {
  try {
    return doc && doc.activeElement;
  } catch (e) {
  }
  return null;
};
goog.dom.getPixelRatio = goog.functions.cacheReturnValue(function() {
  var win = goog.dom.getWindow(), isFirefoxMobile = goog.userAgent.GECKO && goog.userAgent.MOBILE;
  return goog.isDef(win.devicePixelRatio) && !isFirefoxMobile ? win.devicePixelRatio : win.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1;
});
goog.dom.matchesPixelRatio_ = function $goog$dom$matchesPixelRatio_$(pixelRatio) {
  var win = goog.dom.getWindow(), query = "(-webkit-min-device-pixel-ratio: " + pixelRatio + "),(min--moz-device-pixel-ratio: " + pixelRatio + "),(min-resolution: " + pixelRatio + "dppx)";
  return win.matchMedia(query).matches ? pixelRatio : 0;
};
goog.dom.DomHelper = function $goog$dom$DomHelper$(opt_document) {
  this.document_ = opt_document || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.getDocument = function $goog$dom$DomHelper$$getDocument$() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function $goog$dom$DomHelper$$getElement$(element) {
  return goog.dom.getElementHelper_(this.document_, element);
};
goog.dom.DomHelper.prototype.getRequiredElement = function $goog$dom$DomHelper$$getRequiredElement$(id) {
  return goog.dom.getRequiredElementHelper_(this.document_, id);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function $goog$dom$DomHelper$$getElementsByTagNameAndClass$(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el);
};
goog.dom.DomHelper.prototype.getElementsByClass = function $goog$dom$DomHelper$$getElementsByClass$(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc);
};
goog.dom.DomHelper.prototype.getElementByClass = function $goog$dom$DomHelper$$getElementByClass$(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function $goog$dom$DomHelper$$getRequiredElementByClass$(className, opt_root) {
  var root = opt_root || this.document_;
  return goog.dom.getRequiredElementByClass(className, root);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function $goog$dom$DomHelper$$getViewportSize$(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function $goog$dom$DomHelper$$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.DomHelper.prototype.createDom = function $goog$dom$DomHelper$$createDom$(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function $goog$dom$DomHelper$$createElement$(name) {
  return this.document_.createElement(name);
};
goog.dom.DomHelper.prototype.createTextNode = function $goog$dom$DomHelper$$createTextNode$(content) {
  return this.document_.createTextNode(String(content));
};
goog.dom.DomHelper.prototype.createTable = function $goog$dom$DomHelper$$createTable$(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function $goog$dom$DomHelper$$htmlToDocumentFragment$(htmlString) {
  return goog.dom.htmlToDocumentFragment_(this.document_, htmlString);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function $goog$dom$DomHelper$$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function $goog$dom$DomHelper$$getWindow$() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function $goog$dom$DomHelper$$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function $goog$dom$DomHelper$$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function $goog$dom$DomHelper$$getActiveElement$(opt_doc) {
  return goog.dom.getActiveElement(opt_doc || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function $goog$dom$vendor$getVendorJsPrefix$() {
  return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null;
};
goog.dom.vendor.getVendorPrefix = function $goog$dom$vendor$getVendorPrefix$() {
  return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null;
};
goog.dom.vendor.getPrefixedPropertyName = function $goog$dom$vendor$getPrefixedPropertyName$(propertyName, opt_object) {
  if (opt_object && propertyName in opt_object) {
    return propertyName;
  }
  var prefix = goog.dom.vendor.getVendorJsPrefix();
  if (prefix) {
    var prefix = prefix.toLowerCase(), prefixedPropertyName = prefix + goog.string.toTitleCase(propertyName);
    return!goog.isDef(opt_object) || prefixedPropertyName in opt_object ? prefixedPropertyName : null;
  }
  return null;
};
goog.dom.vendor.getPrefixedEventType = function $goog$dom$vendor$getPrefixedEventType$(eventType) {
  var prefix = goog.dom.vendor.getVendorJsPrefix() || "";
  return(prefix + eventType).toLowerCase();
};
goog.math.Box = function $goog$math$Box$(top, right, bottom, left) {
  this.top = top;
  this.right = right;
  this.bottom = bottom;
  this.left = left;
};
goog.math.Box.boundingBox = function $goog$math$Box$boundingBox$(var_args) {
  for (var box = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), i = 1;i < arguments.length;i++) {
    var coord = arguments[i];
    box.top = Math.min(box.top, coord.y);
    box.right = Math.max(box.right, coord.x);
    box.bottom = Math.max(box.bottom, coord.y);
    box.left = Math.min(box.left, coord.x);
  }
  return box;
};
goog.math.Box.prototype.clone = function $goog$math$Box$$clone$() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left);
};
goog.DEBUG && (goog.math.Box.prototype.toString = function $goog$math$Box$$toString$() {
  return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
});
goog.math.Box.prototype.contains = function $goog$math$Box$$contains$(other) {
  return goog.math.Box.contains(this, other);
};
goog.math.Box.equals = function $goog$math$Box$equals$(a, b) {
  return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1;
};
goog.math.Box.contains = function $goog$math$Box$contains$(box, other) {
  return box && other ? other instanceof goog.math.Box ? other.left >= box.left && other.right <= box.right && other.top >= box.top && other.bottom <= box.bottom : other.x >= box.left && other.x <= box.right && other.y >= box.top && other.y <= box.bottom : !1;
};
goog.math.Box.relativePositionX = function $goog$math$Box$relativePositionX$(box, coord) {
  return coord.x < box.left ? coord.x - box.left : coord.x > box.right ? coord.x - box.right : 0;
};
goog.math.Box.relativePositionY = function $goog$math$Box$relativePositionY$(box, coord) {
  return coord.y < box.top ? coord.y - box.top : coord.y > box.bottom ? coord.y - box.bottom : 0;
};
goog.math.Box.distance = function $goog$math$Box$distance$(box, coord) {
  var x = goog.math.Box.relativePositionX(box, coord), y = goog.math.Box.relativePositionY(box, coord);
  return Math.sqrt(x * x + y * y);
};
goog.math.Box.intersects = function $goog$math$Box$intersects$(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
};
goog.math.Box.intersectsWithPadding = function $goog$math$Box$intersectsWithPadding$(a, b, padding) {
  return a.left <= b.right + padding && b.left <= a.right + padding && a.top <= b.bottom + padding && b.top <= a.bottom + padding;
};
goog.math.Box.prototype.ceil = function $goog$math$Box$$ceil$() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
goog.math.Box.prototype.floor = function $goog$math$Box$$floor$() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
goog.math.Box.prototype.round = function $goog$math$Box$$round$() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
goog.math.Rect = function $goog$math$Rect$(x, y, w, h) {
  this.left = x;
  this.top = y;
  this.width = w;
  this.height = h;
};
goog.math.Rect.prototype.clone = function $goog$math$Rect$$clone$() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height);
};
goog.math.Rect.createFromBox = function $goog$math$Rect$createFromBox$(box) {
  return new goog.math.Rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function $goog$math$Rect$$toString$() {
  return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
});
goog.math.Rect.equals = function $goog$math$Rect$equals$(a, b) {
  return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1;
};
goog.math.Rect.prototype.intersection = function $goog$math$Rect$$intersection$(rect) {
  var x0 = Math.max(this.left, rect.left), x1 = Math.min(this.left + this.width, rect.left + rect.width);
  if (x0 <= x1) {
    var y0 = Math.max(this.top, rect.top), y1 = Math.min(this.top + this.height, rect.top + rect.height);
    if (y0 <= y1) {
      return this.left = x0, this.top = y0, this.width = x1 - x0, this.height = y1 - y0, !0;
    }
  }
  return!1;
};
goog.math.Rect.intersection = function $goog$math$Rect$intersection$(a, b) {
  var x0 = Math.max(a.left, b.left), x1 = Math.min(a.left + a.width, b.left + b.width);
  if (x0 <= x1) {
    var y0 = Math.max(a.top, b.top), y1 = Math.min(a.top + a.height, b.top + b.height);
    if (y0 <= y1) {
      return new goog.math.Rect(x0, y0, x1 - x0, y1 - y0);
    }
  }
  return null;
};
goog.math.Rect.intersects = function $goog$math$Rect$intersects$(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
};
goog.math.Rect.prototype.intersects = function $goog$math$Rect$$intersects$(rect) {
  return goog.math.Rect.intersects(this, rect);
};
goog.math.Rect.difference = function $goog$math$Rect$difference$(a, b) {
  var intersection = goog.math.Rect.intersection(a, b);
  if (!intersection || !intersection.height || !intersection.width) {
    return[a.clone()];
  }
  var result = [], top = a.top, height = a.height, ar = a.left + a.width, ab = a.top + a.height, br = b.left + b.width, bb = b.top + b.height;
  b.top > a.top && (result.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), top = b.top, height -= b.top - a.top);
  bb < ab && (result.push(new goog.math.Rect(a.left, bb, a.width, ab - bb)), height = bb - top);
  b.left > a.left && result.push(new goog.math.Rect(a.left, top, b.left - a.left, height));
  br < ar && result.push(new goog.math.Rect(br, top, ar - br, height));
  return result;
};
goog.math.Rect.prototype.difference = function $goog$math$Rect$$difference$(rect) {
  return goog.math.Rect.difference(this, rect);
};
goog.math.Rect.prototype.boundingRect = function $goog$math$Rect$$boundingRect$(rect) {
  var right = Math.max(this.left + this.width, rect.left + rect.width), bottom = Math.max(this.top + this.height, rect.top + rect.height);
  this.left = Math.min(this.left, rect.left);
  this.top = Math.min(this.top, rect.top);
  this.width = right - this.left;
  this.height = bottom - this.top;
};
goog.math.Rect.boundingRect = function $goog$math$Rect$boundingRect$(a, b) {
  if (!a || !b) {
    return null;
  }
  var clone = a.clone();
  clone.boundingRect(b);
  return clone;
};
goog.math.Rect.prototype.contains = function $goog$math$Rect$$contains$(another) {
  return another instanceof goog.math.Rect ? this.left <= another.left && this.left + this.width >= another.left + another.width && this.top <= another.top && this.top + this.height >= another.top + another.height : another.x >= this.left && another.x <= this.left + this.width && another.y >= this.top && another.y <= this.top + this.height;
};
goog.math.Rect.prototype.squaredDistance = function $goog$math$Rect$$squaredDistance$(point) {
  var dx = point.x < this.left ? this.left - point.x : Math.max(point.x - (this.left + this.width), 0), dy = point.y < this.top ? this.top - point.y : Math.max(point.y - (this.top + this.height), 0);
  return dx * dx + dy * dy;
};
goog.math.Rect.prototype.distance = function $goog$math$Rect$$distance$(point) {
  return Math.sqrt(this.squaredDistance(point));
};
goog.math.Rect.prototype.getSize = function $goog$math$Rect$$getSize$() {
  return new goog.math.Size(this.width, this.height);
};
goog.math.Rect.prototype.ceil = function $goog$math$Rect$$ceil$() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Rect.prototype.floor = function $goog$math$Rect$$floor$() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Rect.prototype.round = function $goog$math$Rect$$round$() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.style = {};
goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS = !1;
goog.style.setStyle = function $goog$style$setStyle$(element, style, opt_value) {
  goog.isString(style) ? goog.style.setStyle_(element, opt_value, style) : goog.object.forEach(style, goog.partial(goog.style.setStyle_, element));
};
goog.style.setStyle_ = function $goog$style$setStyle_$(element, value, style) {
  var propertyName = goog.style.getVendorJsStyleName_(element, style);
  propertyName && (element.style[propertyName] = value);
};
goog.style.getVendorJsStyleName_ = function $goog$style$getVendorJsStyleName_$(element, style) {
  var camelStyle = goog.string.toCamelCase(style);
  if (void 0 === element.style[camelStyle]) {
    var prefixedStyle = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(camelStyle);
    if (void 0 !== element.style[prefixedStyle]) {
      return prefixedStyle;
    }
  }
  return camelStyle;
};
goog.style.getVendorStyleName_ = function $goog$style$getVendorStyleName_$(element, style) {
  var camelStyle = goog.string.toCamelCase(style);
  if (void 0 === element.style[camelStyle]) {
    var prefixedStyle = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(camelStyle);
    if (void 0 !== element.style[prefixedStyle]) {
      return goog.dom.vendor.getVendorPrefix() + "-" + style;
    }
  }
  return style;
};
goog.style.getStyle = function $goog$style$getStyle$(element, property) {
  var styleValue = element.style[goog.string.toCamelCase(property)];
  return "undefined" !== typeof styleValue ? styleValue : element.style[goog.style.getVendorJsStyleName_(element, property)] || "";
};
goog.style.getComputedStyle = function $goog$style$getComputedStyle$(element, property) {
  var doc = goog.dom.getOwnerDocument(element);
  if (doc.defaultView && doc.defaultView.getComputedStyle) {
    var styles = doc.defaultView.getComputedStyle(element, null);
    if (styles) {
      return styles[property] || styles.getPropertyValue(property) || "";
    }
  }
  return "";
};
goog.style.getCascadedStyle = function $goog$style$getCascadedStyle$(element, style) {
  return element.currentStyle ? element.currentStyle[style] : null;
};
goog.style.getStyle_ = function $goog$style$getStyle_$(element, style) {
  return goog.style.getComputedStyle(element, style) || goog.style.getCascadedStyle(element, style) || element.style && element.style[style];
};
goog.style.getComputedBoxSizing = function $goog$style$getComputedBoxSizing$(element) {
  return goog.style.getStyle_(element, "boxSizing") || goog.style.getStyle_(element, "MozBoxSizing") || goog.style.getStyle_(element, "WebkitBoxSizing") || null;
};
goog.style.getComputedPosition = function $goog$style$getComputedPosition$(element) {
  return goog.style.getStyle_(element, "position");
};
goog.style.getBackgroundColor = function $goog$style$getBackgroundColor$(element) {
  return goog.style.getStyle_(element, "backgroundColor");
};
goog.style.getComputedOverflowX = function $goog$style$getComputedOverflowX$(element) {
  return goog.style.getStyle_(element, "overflowX");
};
goog.style.getComputedOverflowY = function $goog$style$getComputedOverflowY$(element) {
  return goog.style.getStyle_(element, "overflowY");
};
goog.style.getComputedZIndex = function $goog$style$getComputedZIndex$(element) {
  return goog.style.getStyle_(element, "zIndex");
};
goog.style.getComputedTextAlign = function $goog$style$getComputedTextAlign$(element) {
  return goog.style.getStyle_(element, "textAlign");
};
goog.style.getComputedCursor = function $goog$style$getComputedCursor$(element) {
  return goog.style.getStyle_(element, "cursor");
};
goog.style.getComputedTransform = function $goog$style$getComputedTransform$(element) {
  var property = goog.style.getVendorStyleName_(element, "transform");
  return goog.style.getStyle_(element, property) || goog.style.getStyle_(element, "transform");
};
goog.style.setPosition = function $goog$style$setPosition$(el, arg1, opt_arg2) {
  var x, y, buggyGeckoSubPixelPos = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersionOrHigher("1.9");
  arg1 instanceof goog.math.Coordinate ? (x = arg1.x, y = arg1.y) : (x = arg1, y = opt_arg2);
  el.style.left = goog.style.getPixelStyleValue_(x, buggyGeckoSubPixelPos);
  el.style.top = goog.style.getPixelStyleValue_(y, buggyGeckoSubPixelPos);
};
goog.style.getPosition = function $goog$style$getPosition$(element) {
  return new goog.math.Coordinate(element.offsetLeft, element.offsetTop);
};
goog.style.getClientViewportElement = function $goog$style$getClientViewportElement$(opt_node) {
  var doc;
  doc = opt_node ? goog.dom.getOwnerDocument(opt_node) : goog.dom.getDocument();
  return!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(doc).isCss1CompatMode() ? doc.documentElement : doc.body;
};
goog.style.getViewportPageOffset = function $goog$style$getViewportPageOffset$(doc) {
  var body = doc.body, documentElement = doc.documentElement, scrollLeft = body.scrollLeft || documentElement.scrollLeft, scrollTop = body.scrollTop || documentElement.scrollTop;
  return new goog.math.Coordinate(scrollLeft, scrollTop);
};
goog.style.getBoundingClientRect_ = function $goog$style$getBoundingClientRect_$(el) {
  var rect;
  try {
    rect = el.getBoundingClientRect();
  } catch (e) {
    return{left:0, top:0, right:0, bottom:0};
  }
  if (goog.userAgent.IE && el.ownerDocument.body) {
    var doc = el.ownerDocument;
    rect.left -= doc.documentElement.clientLeft + doc.body.clientLeft;
    rect.top -= doc.documentElement.clientTop + doc.body.clientTop;
  }
  return rect;
};
goog.style.getOffsetParent = function $goog$style$getOffsetParent$(element) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) {
    return element.offsetParent;
  }
  for (var doc = goog.dom.getOwnerDocument(element), positionStyle = goog.style.getStyle_(element, "position"), skipStatic = "fixed" == positionStyle || "absolute" == positionStyle, parent = element.parentNode;parent && parent != doc;parent = parent.parentNode) {
    if (positionStyle = goog.style.getStyle_(parent, "position"), skipStatic = skipStatic && "static" == positionStyle && parent != doc.documentElement && parent != doc.body, !skipStatic && (parent.scrollWidth > parent.clientWidth || parent.scrollHeight > parent.clientHeight || "fixed" == positionStyle || "absolute" == positionStyle || "relative" == positionStyle)) {
      return parent;
    }
  }
  return null;
};
goog.style.getVisibleRectForElement = function $goog$style$getVisibleRectForElement$(element) {
  for (var visibleRect = new goog.math.Box(0, Infinity, Infinity, 0), dom = goog.dom.getDomHelper(element), body = dom.getDocument().body, documentElement = dom.getDocument().documentElement, scrollEl = dom.getDocumentScrollElement(), el = element;el = goog.style.getOffsetParent(el);) {
    if (!(goog.userAgent.IE && 0 == el.clientWidth || goog.userAgent.WEBKIT && 0 == el.clientHeight && el == body) && el != body && el != documentElement && "visible" != goog.style.getStyle_(el, "overflow")) {
      var pos = goog.style.getPageOffset(el), client = goog.style.getClientLeftTop(el);
      pos.x += client.x;
      pos.y += client.y;
      visibleRect.top = Math.max(visibleRect.top, pos.y);
      visibleRect.right = Math.min(visibleRect.right, pos.x + el.clientWidth);
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.y + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.x);
    }
  }
  var scrollX = scrollEl.scrollLeft, scrollY = scrollEl.scrollTop;
  visibleRect.left = Math.max(visibleRect.left, scrollX);
  visibleRect.top = Math.max(visibleRect.top, scrollY);
  var winSize = dom.getViewportSize();
  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
  return 0 <= visibleRect.top && 0 <= visibleRect.left && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
};
goog.style.getContainerOffsetToScrollInto = function $goog$style$getContainerOffsetToScrollInto$(element, container, opt_center) {
  var elementPos = goog.style.getPageOffset(element), containerPos = goog.style.getPageOffset(container), containerBorder = goog.style.getBorderBox(container), relX = elementPos.x - containerPos.x - containerBorder.left, relY = elementPos.y - containerPos.y - containerBorder.top, spaceX = container.clientWidth - element.offsetWidth, spaceY = container.clientHeight - element.offsetHeight, scrollLeft = container.scrollLeft, scrollTop = container.scrollTop;
  opt_center ? (scrollLeft += relX - spaceX / 2, scrollTop += relY - spaceY / 2) : (scrollLeft += Math.min(relX, Math.max(relX - spaceX, 0)), scrollTop += Math.min(relY, Math.max(relY - spaceY, 0)));
  return new goog.math.Coordinate(scrollLeft, scrollTop);
};
goog.style.scrollIntoContainerView = function $goog$style$scrollIntoContainerView$(element, container, opt_center) {
  var offset = goog.style.getContainerOffsetToScrollInto(element, container, opt_center);
  container.scrollLeft = offset.x;
  container.scrollTop = offset.y;
};
goog.style.getClientLeftTop = function $goog$style$getClientLeftTop$(el) {
  if (goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("1.9")) {
    var left = parseFloat(goog.style.getComputedStyle(el, "borderLeftWidth"));
    if (goog.style.isRightToLeft(el)) {
      var scrollbarWidth = el.offsetWidth - el.clientWidth - left - parseFloat(goog.style.getComputedStyle(el, "borderRightWidth")), left = left + scrollbarWidth
    }
    return new goog.math.Coordinate(left, parseFloat(goog.style.getComputedStyle(el, "borderTopWidth")));
  }
  return new goog.math.Coordinate(el.clientLeft, el.clientTop);
};
goog.style.getPageOffset = function $goog$style$getPageOffset$(el) {
  var box, doc = goog.dom.getOwnerDocument(el), positionStyle = goog.style.getStyle_(el, "position");
  goog.asserts.assertObject(el, "Parameter is required");
  var BUGGY_GECKO_BOX_OBJECT = !goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS && goog.userAgent.GECKO && doc.getBoxObjectFor && !el.getBoundingClientRect && "absolute" == positionStyle && (box = doc.getBoxObjectFor(el)) && (0 > box.screenX || 0 > box.screenY), pos = new goog.math.Coordinate(0, 0), viewportElement = goog.style.getClientViewportElement(doc);
  if (el == viewportElement) {
    return pos;
  }
  if (goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS || el.getBoundingClientRect) {
    box = goog.style.getBoundingClientRect_(el);
    var scrollCoord = goog.dom.getDomHelper(doc).getDocumentScroll();
    pos.x = box.left + scrollCoord.x;
    pos.y = box.top + scrollCoord.y;
  } else {
    if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
      box = doc.getBoxObjectFor(el);
      var vpBox = doc.getBoxObjectFor(viewportElement);
      pos.x = box.screenX - vpBox.screenX;
      pos.y = box.screenY - vpBox.screenY;
    } else {
      var parent = el;
      do {
        pos.x += parent.offsetLeft;
        pos.y += parent.offsetTop;
        parent != el && (pos.x += parent.clientLeft || 0, pos.y += parent.clientTop || 0);
        if (goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition(parent)) {
          pos.x += doc.body.scrollLeft;
          pos.y += doc.body.scrollTop;
          break;
        }
        parent = parent.offsetParent;
      } while (parent && parent != el);
      if (goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == positionStyle) {
        pos.y -= doc.body.offsetTop;
      }
      for (parent = el;(parent = goog.style.getOffsetParent(parent)) && parent != doc.body && parent != viewportElement;) {
        pos.x -= parent.scrollLeft, goog.userAgent.OPERA && "TR" == parent.tagName || (pos.y -= parent.scrollTop);
      }
    }
  }
  return pos;
};
goog.style.getPageOffsetLeft = function $goog$style$getPageOffsetLeft$(el) {
  return goog.style.getPageOffset(el).x;
};
goog.style.getPageOffsetTop = function $goog$style$getPageOffsetTop$(el) {
  return goog.style.getPageOffset(el).y;
};
goog.style.getFramedPageOffset = function $goog$style$getFramedPageOffset$(el, relativeWin) {
  var position = new goog.math.Coordinate(0, 0), currentWin = goog.dom.getWindow(goog.dom.getOwnerDocument(el)), currentEl = el;
  do {
    var offset = currentWin == relativeWin ? goog.style.getPageOffset(currentEl) : goog.style.getClientPositionForElement_(goog.asserts.assert(currentEl));
    position.x += offset.x;
    position.y += offset.y;
  } while (currentWin && currentWin != relativeWin && (currentEl = currentWin.frameElement) && (currentWin = currentWin.parent));
  return position;
};
goog.style.translateRectForAnotherFrame = function $goog$style$translateRectForAnotherFrame$(rect, origBase, newBase) {
  if (origBase.getDocument() != newBase.getDocument()) {
    var body = origBase.getDocument().body, pos = goog.style.getFramedPageOffset(body, newBase.getWindow()), pos = goog.math.Coordinate.difference(pos, goog.style.getPageOffset(body));
    goog.userAgent.IE && !origBase.isCss1CompatMode() && (pos = goog.math.Coordinate.difference(pos, origBase.getDocumentScroll()));
    rect.left += pos.x;
    rect.top += pos.y;
  }
};
goog.style.getRelativePosition = function $goog$style$getRelativePosition$(a, b) {
  var ap = goog.style.getClientPosition(a), bp = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(ap.x - bp.x, ap.y - bp.y);
};
goog.style.getClientPositionForElement_ = function $goog$style$getClientPositionForElement_$(el) {
  var pos;
  if (goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS || el.getBoundingClientRect) {
    var box = goog.style.getBoundingClientRect_(el);
    pos = new goog.math.Coordinate(box.left, box.top);
  } else {
    var scrollCoord = goog.dom.getDomHelper(el).getDocumentScroll(), pageCoord = goog.style.getPageOffset(el);
    pos = new goog.math.Coordinate(pageCoord.x - scrollCoord.x, pageCoord.y - scrollCoord.y);
  }
  return goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher(12) ? goog.math.Coordinate.sum(pos, goog.style.getCssTranslation(el)) : pos;
};
goog.style.getClientPosition = function $goog$style$getClientPosition$(el) {
  goog.asserts.assert(el);
  if (el.nodeType == goog.dom.NodeType.ELEMENT) {
    return goog.style.getClientPositionForElement_(el);
  }
  var isAbstractedEvent = goog.isFunction(el.getBrowserEvent), be = el, targetEvent = el;
  el.targetTouches ? targetEvent = el.targetTouches[0] : isAbstractedEvent && be.getBrowserEvent().targetTouches && (targetEvent = be.getBrowserEvent().targetTouches[0]);
  return new goog.math.Coordinate(targetEvent.clientX, targetEvent.clientY);
};
goog.style.setPageOffset = function $goog$style$setPageOffset$(el, x, opt_y) {
  var cur = goog.style.getPageOffset(el);
  x instanceof goog.math.Coordinate && (opt_y = x.y, x = x.x);
  var dx = x - cur.x, dy = opt_y - cur.y;
  goog.style.setPosition(el, el.offsetLeft + dx, el.offsetTop + dy);
};
goog.style.setSize = function $goog$style$setSize$(element, w, opt_h) {
  var h;
  if (w instanceof goog.math.Size) {
    h = w.height, w = w.width;
  } else {
    if (void 0 == opt_h) {
      throw Error("missing height argument");
    }
    h = opt_h;
  }
  goog.style.setWidth(element, w);
  goog.style.setHeight(element, h);
};
goog.style.getPixelStyleValue_ = function $goog$style$getPixelStyleValue_$(value, round) {
  "number" == typeof value && (value = (round ? Math.round(value) : value) + "px");
  return value;
};
goog.style.setHeight = function $goog$style$setHeight$(element, height) {
  element.style.height = goog.style.getPixelStyleValue_(height, !0);
};
goog.style.setWidth = function $goog$style$setWidth$(element, width) {
  element.style.width = goog.style.getPixelStyleValue_(width, !0);
};
goog.style.getSize = function $goog$style$getSize$(element) {
  return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, element);
};
goog.style.evaluateWithTemporaryDisplay_ = function $goog$style$evaluateWithTemporaryDisplay_$(fn, element) {
  if ("none" != goog.style.getStyle_(element, "display")) {
    return fn(element);
  }
  var style = element.style, originalDisplay = style.display, originalVisibility = style.visibility, originalPosition = style.position;
  style.visibility = "hidden";
  style.position = "absolute";
  style.display = "inline";
  var retVal = fn(element);
  style.display = originalDisplay;
  style.position = originalPosition;
  style.visibility = originalVisibility;
  return retVal;
};
goog.style.getSizeWithDisplay_ = function $goog$style$getSizeWithDisplay_$(element) {
  var offsetWidth = element.offsetWidth, offsetHeight = element.offsetHeight, webkitOffsetsZero = goog.userAgent.WEBKIT && !offsetWidth && !offsetHeight;
  if ((!goog.isDef(offsetWidth) || webkitOffsetsZero) && element.getBoundingClientRect) {
    var clientRect = goog.style.getBoundingClientRect_(element);
    return new goog.math.Size(clientRect.right - clientRect.left, clientRect.bottom - clientRect.top);
  }
  return new goog.math.Size(offsetWidth, offsetHeight);
};
goog.style.getTransformedSize = function $goog$style$getTransformedSize$(element) {
  if (!element.getBoundingClientRect) {
    return null;
  }
  var clientRect = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, element);
  return new goog.math.Size(clientRect.right - clientRect.left, clientRect.bottom - clientRect.top);
};
goog.style.getBounds = function $goog$style$getBounds$(element) {
  var o = goog.style.getPageOffset(element), s = goog.style.getSize(element);
  return new goog.math.Rect(o.x, o.y, s.width, s.height);
};
goog.style.toCamelCase = function $goog$style$toCamelCase$(selector) {
  return goog.string.toCamelCase(String(selector));
};
goog.style.toSelectorCase = function $goog$style$toSelectorCase$(selector) {
  return goog.string.toSelectorCase(selector);
};
goog.style.getOpacity = function $goog$style$getOpacity$(el) {
  var style = el.style, result = "";
  if ("opacity" in style) {
    result = style.opacity;
  } else {
    if ("MozOpacity" in style) {
      result = style.MozOpacity;
    } else {
      if ("filter" in style) {
        var match = style.filter.match(/alpha\(opacity=([\d.]+)\)/);
        match && (result = String(match[1] / 100));
      }
    }
  }
  return "" == result ? result : Number(result);
};
goog.style.setOpacity = function $goog$style$setOpacity$(el, alpha) {
  var style = el.style;
  "opacity" in style ? style.opacity = alpha : "MozOpacity" in style ? style.MozOpacity = alpha : "filter" in style && (style.filter = "" === alpha ? "" : "alpha(opacity=" + 100 * alpha + ")");
};
goog.style.setTransparentBackgroundImage = function $goog$style$setTransparentBackgroundImage$(el, src) {
  var style = el.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '", sizingMethod="crop")' : (style.backgroundImage = "url(" + src + ")", style.backgroundPosition = "top left", style.backgroundRepeat = "no-repeat");
};
goog.style.clearTransparentBackgroundImage = function $goog$style$clearTransparentBackgroundImage$(el) {
  var style = el.style;
  "filter" in style ? style.filter = "" : style.backgroundImage = "none";
};
goog.style.showElement = function $goog$style$showElement$(el, display) {
  goog.style.setElementShown(el, display);
};
goog.style.setElementShown = function $goog$style$setElementShown$(el, isShown) {
  el.style.display = isShown ? "" : "none";
};
goog.style.isElementShown = function $goog$style$isElementShown$(el) {
  return "none" != el.style.display;
};
goog.style.installStyles = function $goog$style$installStyles$(stylesString, opt_node) {
  var dh = goog.dom.getDomHelper(opt_node), styleSheet = null, doc = dh.getDocument();
  if (goog.userAgent.IE && doc.createStyleSheet) {
    styleSheet = doc.createStyleSheet(), goog.style.setStyles(styleSheet, stylesString);
  } else {
    var head = dh.getElementsByTagNameAndClass("head")[0];
    if (!head) {
      var body = dh.getElementsByTagNameAndClass("body")[0], head = dh.createDom("head");
      body.parentNode.insertBefore(head, body);
    }
    styleSheet = dh.createDom("style");
    goog.style.setStyles(styleSheet, stylesString);
    dh.appendChild(head, styleSheet);
  }
  return styleSheet;
};
goog.style.uninstallStyles = function $goog$style$uninstallStyles$(styleSheet) {
  var node = styleSheet.ownerNode || styleSheet.owningElement || styleSheet;
  goog.dom.removeNode(node);
};
goog.style.setStyles = function $goog$style$setStyles$(element, stylesString) {
  goog.userAgent.IE && goog.isDef(element.cssText) ? element.cssText = stylesString : element.innerHTML = stylesString;
};
goog.style.setPreWrap = function $goog$style$setPreWrap$(el) {
  var style = el.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (style.whiteSpace = "pre", style.wordWrap = "break-word") : style.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap";
};
goog.style.setInlineBlock = function $goog$style$setInlineBlock$(el) {
  var style = el.style;
  style.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (style.zoom = "1", style.display = "inline") : style.display = goog.userAgent.GECKO ? goog.userAgent.isVersionOrHigher("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block";
};
goog.style.isRightToLeft = function $goog$style$isRightToLeft$(el) {
  return "rtl" == goog.style.getStyle_(el, "direction");
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function $goog$style$isUnselectable$(el) {
  return goog.style.unselectableStyle_ ? "none" == el.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == el.getAttribute("unselectable") : !1;
};
goog.style.setUnselectable = function $goog$style$setUnselectable$(el, unselectable, opt_noRecurse) {
  var descendants = opt_noRecurse ? null : el.getElementsByTagName("*"), name = goog.style.unselectableStyle_;
  if (name) {
    var value = unselectable ? "none" : "";
    el.style[name] = value;
    if (descendants) {
      for (var i = 0, descendant;descendant = descendants[i];i++) {
        descendant.style[name] = value;
      }
    }
  } else {
    if (goog.userAgent.IE || goog.userAgent.OPERA) {
      if (value = unselectable ? "on" : "", el.setAttribute("unselectable", value), descendants) {
        for (i = 0;descendant = descendants[i];i++) {
          descendant.setAttribute("unselectable", value);
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function $goog$style$getBorderBoxSize$(element) {
  return new goog.math.Size(element.offsetWidth, element.offsetHeight);
};
goog.style.setBorderBoxSize = function $goog$style$setBorderBoxSize$(element, size) {
  var doc = goog.dom.getOwnerDocument(element), isCss1CompatMode = goog.dom.getDomHelper(doc).isCss1CompatMode();
  if (!goog.userAgent.IE || isCss1CompatMode && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(element, size, "border-box");
  } else {
    var style = element.style;
    if (isCss1CompatMode) {
      var paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
      style.pixelWidth = size.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right;
      style.pixelHeight = size.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom;
    } else {
      style.pixelWidth = size.width, style.pixelHeight = size.height;
    }
  }
};
goog.style.getContentBoxSize = function $goog$style$getContentBoxSize$(element) {
  var doc = goog.dom.getOwnerDocument(element), ieCurrentStyle = goog.userAgent.IE && element.currentStyle;
  if (ieCurrentStyle && goog.dom.getDomHelper(doc).isCss1CompatMode() && "auto" != ieCurrentStyle.width && "auto" != ieCurrentStyle.height && !ieCurrentStyle.boxSizing) {
    var width = goog.style.getIePixelValue_(element, ieCurrentStyle.width, "width", "pixelWidth"), height = goog.style.getIePixelValue_(element, ieCurrentStyle.height, "height", "pixelHeight");
    return new goog.math.Size(width, height);
  }
  var borderBoxSize = goog.style.getBorderBoxSize(element), paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
  return new goog.math.Size(borderBoxSize.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right, borderBoxSize.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom);
};
goog.style.setContentBoxSize = function $goog$style$setContentBoxSize$(element, size) {
  var doc = goog.dom.getOwnerDocument(element), isCss1CompatMode = goog.dom.getDomHelper(doc).isCss1CompatMode();
  if (!goog.userAgent.IE || isCss1CompatMode && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(element, size, "content-box");
  } else {
    var style = element.style;
    if (isCss1CompatMode) {
      style.pixelWidth = size.width, style.pixelHeight = size.height;
    } else {
      var paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
      style.pixelWidth = size.width + borderBox.left + paddingBox.left + paddingBox.right + borderBox.right;
      style.pixelHeight = size.height + borderBox.top + paddingBox.top + paddingBox.bottom + borderBox.bottom;
    }
  }
};
goog.style.setBoxSizingSize_ = function $goog$style$setBoxSizingSize_$(element, size, boxSizing) {
  var style = element.style;
  goog.userAgent.GECKO ? style.MozBoxSizing = boxSizing : goog.userAgent.WEBKIT ? style.WebkitBoxSizing = boxSizing : style.boxSizing = boxSizing;
  style.width = Math.max(size.width, 0) + "px";
  style.height = Math.max(size.height, 0) + "px";
};
goog.style.getIePixelValue_ = function $goog$style$getIePixelValue_$(element, value, name, pixelName) {
  if (/^\d+px?$/.test(value)) {
    return parseInt(value, 10);
  }
  var oldStyleValue = element.style[name], oldRuntimeValue = element.runtimeStyle[name];
  element.runtimeStyle[name] = element.currentStyle[name];
  element.style[name] = value;
  var pixelValue = element.style[pixelName];
  element.style[name] = oldStyleValue;
  element.runtimeStyle[name] = oldRuntimeValue;
  return pixelValue;
};
goog.style.getIePixelDistance_ = function $goog$style$getIePixelDistance_$(element, propName) {
  var value = goog.style.getCascadedStyle(element, propName);
  return value ? goog.style.getIePixelValue_(element, value, "left", "pixelLeft") : 0;
};
goog.style.getBox_ = function $goog$style$getBox_$(element, stylePrefix) {
  if (goog.userAgent.IE) {
    var left = goog.style.getIePixelDistance_(element, stylePrefix + "Left"), right = goog.style.getIePixelDistance_(element, stylePrefix + "Right"), top = goog.style.getIePixelDistance_(element, stylePrefix + "Top"), bottom = goog.style.getIePixelDistance_(element, stylePrefix + "Bottom");
    return new goog.math.Box(top, right, bottom, left);
  }
  left = goog.style.getComputedStyle(element, stylePrefix + "Left");
  right = goog.style.getComputedStyle(element, stylePrefix + "Right");
  top = goog.style.getComputedStyle(element, stylePrefix + "Top");
  bottom = goog.style.getComputedStyle(element, stylePrefix + "Bottom");
  return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left));
};
goog.style.getPaddingBox = function $goog$style$getPaddingBox$(element) {
  return goog.style.getBox_(element, "padding");
};
goog.style.getMarginBox = function $goog$style$getMarginBox$(element) {
  return goog.style.getBox_(element, "margin");
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function $goog$style$getIePixelBorder_$(element, prop) {
  if ("none" == goog.style.getCascadedStyle(element, prop + "Style")) {
    return 0;
  }
  var width = goog.style.getCascadedStyle(element, prop + "Width");
  return width in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[width] : goog.style.getIePixelValue_(element, width, "left", "pixelLeft");
};
goog.style.getBorderBox = function $goog$style$getBorderBox$(element) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    var left = goog.style.getIePixelBorder_(element, "borderLeft"), right = goog.style.getIePixelBorder_(element, "borderRight"), top = goog.style.getIePixelBorder_(element, "borderTop"), bottom = goog.style.getIePixelBorder_(element, "borderBottom");
    return new goog.math.Box(top, right, bottom, left);
  }
  left = goog.style.getComputedStyle(element, "borderLeftWidth");
  right = goog.style.getComputedStyle(element, "borderRightWidth");
  top = goog.style.getComputedStyle(element, "borderTopWidth");
  bottom = goog.style.getComputedStyle(element, "borderBottomWidth");
  return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left));
};
goog.style.getFontFamily = function $goog$style$getFontFamily$(el) {
  var doc = goog.dom.getOwnerDocument(el), font = "";
  if (doc.body.createTextRange && goog.dom.contains(doc, el)) {
    var range = doc.body.createTextRange();
    range.moveToElementText(el);
    try {
      font = range.queryCommandValue("FontName");
    } catch (e) {
      font = "";
    }
  }
  font || (font = goog.style.getStyle_(el, "fontFamily"));
  var fontsArray = font.split(",");
  1 < fontsArray.length && (font = fontsArray[0]);
  return goog.string.stripQuotes(font, "\"'");
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function $goog$style$getLengthUnits$(value) {
  var units = value.match(goog.style.lengthUnitRegex_);
  return units && units[0] || null;
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function $goog$style$getFontSize$(el) {
  var fontSize = goog.style.getStyle_(el, "fontSize"), sizeUnits = goog.style.getLengthUnits(fontSize);
  if (fontSize && "px" == sizeUnits) {
    return parseInt(fontSize, 10);
  }
  if (goog.userAgent.IE) {
    if (sizeUnits in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(el, fontSize, "left", "pixelLeft");
    }
    if (el.parentNode && el.parentNode.nodeType == goog.dom.NodeType.ELEMENT && sizeUnits in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      var parentElement = el.parentNode, parentSize = goog.style.getStyle_(parentElement, "fontSize");
      return goog.style.getIePixelValue_(parentElement, fontSize == parentSize ? "1em" : fontSize, "left", "pixelLeft");
    }
  }
  var sizeElement = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(el, sizeElement);
  fontSize = sizeElement.offsetHeight;
  goog.dom.removeNode(sizeElement);
  return fontSize;
};
goog.style.parseStyleAttribute = function $goog$style$parseStyleAttribute$(value) {
  var result = {};
  goog.array.forEach(value.split(/\s*;\s*/), function(pair) {
    var keyValue = pair.split(/\s*:\s*/);
    2 == keyValue.length && (result[goog.string.toCamelCase(keyValue[0].toLowerCase())] = keyValue[1]);
  });
  return result;
};
goog.style.toStyleAttribute = function $goog$style$toStyleAttribute$(obj) {
  var buffer = [];
  goog.object.forEach(obj, function(value, key) {
    buffer.push(goog.string.toSelectorCase(key), ":", value, ";");
  });
  return buffer.join("");
};
goog.style.setFloat = function $goog$style$setFloat$(el, value) {
  el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = value;
};
goog.style.getFloat = function $goog$style$getFloat$(el) {
  return el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || "";
};
goog.style.getScrollbarWidth = function $goog$style$getScrollbarWidth$(opt_className) {
  var outerDiv = goog.dom.createElement("div");
  opt_className && (outerDiv.className = opt_className);
  outerDiv.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  var innerDiv = goog.dom.createElement("div");
  goog.style.setSize(innerDiv, "200px", "200px");
  outerDiv.appendChild(innerDiv);
  goog.dom.appendChild(goog.dom.getDocument().body, outerDiv);
  var width = outerDiv.offsetWidth - outerDiv.clientWidth;
  goog.dom.removeNode(outerDiv);
  return width;
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function $goog$style$getCssTranslation$(element) {
  var transform = goog.style.getComputedTransform(element);
  if (!transform) {
    return new goog.math.Coordinate(0, 0);
  }
  var matches = transform.match(goog.style.MATRIX_TRANSLATION_REGEX_);
  return matches ? new goog.math.Coordinate(parseFloat(matches[1]), parseFloat(matches[2])) : new goog.math.Coordinate(0, 0);
};
i18n.input.chrome.inputview.util = {};
i18n.input.chrome.inputview.util.DISPLAY_MAPPING = {"\u0300":"`", "\u0301":"\u00b4", "\u0302":"\u02c6", "\u0303":"\u02dc", "\u0304":"\u02c9", "\u0305":"\u00af", "\u0306":"\u02d8", "\u0307":"\u02d9", "\u0308":"\u00a8", "\u0309":"\u02c0", "\u030a":"\u02da", "\u030b":"\u02dd", "\u030c":"\u02c7", "\u030d":"\u02c8", "\u030e":'"', "\u0327":"\u00b8", "\u0328":"\u02db", "\u0345":"\u037a", "\u030f":"\u030f ", "\u031b":"\u031b ", "\u0323":"\u0323 "};
i18n.input.chrome.inputview.util.END_SENTENCE_REGEX_ = /[\.\?!] +$/;
i18n.input.chrome.inputview.util.REGEX_CHARACTER_SUPPORT_DEADKEY_ = /^[a-zA-Z\u00e6\u00c6\u0153\u0152]+$/;
i18n.input.chrome.inputview.util.REGEX_LANGUAGE_MODEL_CHARACTERS = /^[a-zA-Z\u00e6\u00c6\u0153\u0152\'-]$/;
i18n.input.chrome.inputview.util.splitValue = function $i18n$input$chrome$inputview$util$splitValue$(weightArray, totalValue) {
  if (0 == weightArray.length) {
    return[];
  }
  if (1 == weightArray.length) {
    return[totalValue];
  }
  for (var totalWeight = 0, i = 0;i < weightArray.length;i++) {
    totalWeight += weightArray[i];
  }
  for (var tmp = totalValue / totalWeight, values = [], totalFlooredValue = 0, diffs = [], i = 0;i < weightArray.length;i++) {
    var result = weightArray[i] * tmp;
    values.push(result);
    diffs.push(result - Math.floor(result));
    totalFlooredValue += Math.floor(result);
  }
  for (var diff = totalValue - totalFlooredValue, i = 0;i < diff;i++) {
    for (var max = 0, index = 0, j = 0;j < diffs.length;j++) {
      diffs[j] > max && (max = diffs[j], index = j);
    }
    values[index] += 1;
    diffs[index] = 0;
  }
  for (i = 0;i < values.length;i++) {
    values[i] = Math.floor(values[i]);
  }
  return values;
};
i18n.input.chrome.inputview.util.getPropertyValue = function $i18n$input$chrome$inputview$util$getPropertyValue$(elem, property) {
  var value = goog.style.getComputedStyle(elem, property);
  return value ? parseInt(value.replace("px", ""), 10) : 0;
};
i18n.input.chrome.inputview.util.toUpper = function $i18n$input$chrome$inputview$util$toUpper$(character) {
  return "\u00b5" == character ? "[5" : character.toUpperCase();
};
i18n.input.chrome.inputview.util.toLower = function $i18n$input$chrome$inputview$util$toLower$(character) {
  return "I" == character ? "\u0131" : character.toLowerCase();
};
i18n.input.chrome.inputview.util.isCommitCharacter = function $i18n$input$chrome$inputview$util$isCommitCharacter$(character) {
  return i18n.input.chrome.inputview.util.DISPLAY_MAPPING[character] || i18n.input.chrome.inputview.util.REGEX_LANGUAGE_MODEL_CHARACTERS.test(character) ? !1 : character.toUpperCase() == character && character.toLowerCase() == character;
};
i18n.input.chrome.inputview.util.getVisibleCharacter = function $i18n$input$chrome$inputview$util$getVisibleCharacter$(invisibleCharacter) {
  var map = i18n.input.chrome.inputview.util.DISPLAY_MAPPING;
  return map[invisibleCharacter] ? map[invisibleCharacter] : invisibleCharacter;
};
i18n.input.chrome.inputview.util.isLetterKey = function $i18n$input$chrome$inputview$util$isLetterKey$(characters) {
  return characters[1] == i18n.input.chrome.inputview.util.toUpper(characters[0]) || characters[1] == i18n.input.chrome.inputview.util.toLower(characters[0]) ? !0 : !1;
};
i18n.input.chrome.inputview.util.supportDeadKey = function $i18n$input$chrome$inputview$util$supportDeadKey$(character) {
  return i18n.input.chrome.inputview.util.REGEX_CHARACTER_SUPPORT_DEADKEY_.test(character);
};
i18n.input.chrome.inputview.util.needAutoCap = function $i18n$input$chrome$inputview$util$needAutoCap$(text) {
  return goog.string.isEmpty(text) ? !0 : i18n.input.chrome.inputview.util.END_SENTENCE_REGEX_.test(text);
};
i18n.input.chrome.inputview.util.getConfigName = function $i18n$input$chrome$inputview$util$getConfigName$(keyboardCode) {
  return keyboardCode.replace(/\..*$/, "");
};
goog.disposable = {};
goog.disposable.IDisposable = function $goog$disposable$IDisposable$() {
};
goog.Disposable = function $goog$Disposable$() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.instances_[goog.getUid(this)] = this);
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function $goog$Disposable$getUndisposedObjects$() {
  var ret = [], id;
  for (id in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(id) && ret.push(goog.Disposable.instances_[Number(id)]);
  }
  return ret;
};
goog.Disposable.clearUndisposedObjects = function $goog$Disposable$clearUndisposedObjects$() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function $goog$Disposable$$isDisposed$() {
  return this.disposed_;
};
goog.Disposable.prototype.dispose = function $goog$Disposable$$dispose$() {
  if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var uid = goog.getUid(this);
    if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(uid)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[uid];
  }
};
goog.Disposable.prototype.registerDisposable = function $goog$Disposable$$registerDisposable$(disposable) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, disposable));
};
goog.Disposable.prototype.addOnDisposeCallback = function $goog$Disposable$$addOnDisposeCallback$(callback, opt_scope) {
  this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []);
  this.onDisposeCallbacks_.push(goog.isDef(opt_scope) ? goog.bind(callback, opt_scope) : callback);
};
goog.Disposable.prototype.disposeInternal = function $goog$Disposable$$disposeInternal$() {
  if (this.onDisposeCallbacks_) {
    for (;this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function $goog$Disposable$isDisposed$(obj) {
  return obj && "function" == typeof obj.isDisposed ? obj.isDisposed() : !1;
};
goog.dispose = function $goog$dispose$(obj) {
  obj && "function" == typeof obj.dispose && obj.dispose();
};
goog.disposeAll = function $goog$disposeAll$(var_args) {
  for (var i = 0, len = arguments.length;i < len;++i) {
    var disposable = arguments[i];
    goog.isArrayLike(disposable) ? goog.disposeAll.apply(null, disposable) : goog.dispose(disposable);
  }
};
goog.events = {};
goog.events.getVendorPrefixedName_ = function $goog$events$getVendorPrefixedName_$(eventName) {
  return goog.userAgent.WEBKIT ? "webkit" + eventName : goog.userAgent.OPERA ? "o" + eventName.toLowerCase() : eventName.toLowerCase();
};
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", 
SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", 
ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"), ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"), 
ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"), TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"), POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", 
MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXTINPUT:"textinput", 
COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", COMPOSITIONEND:"compositionend", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", 
DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified"};
i18n.input.chrome.AbstractController = function $i18n$input$chrome$AbstractController$() {
  goog.Disposable.call(this);
};
goog.inherits(i18n.input.chrome.AbstractController, goog.Disposable);
i18n.input.chrome.AbstractController.prototype.requestId = 0;
i18n.input.chrome.AbstractController.FUNCTIONAL_KEYS = [i18n.input.chrome.inputview.events.KeyCodes.ARROW_DOWN, i18n.input.chrome.inputview.events.KeyCodes.ARROW_LEFT, i18n.input.chrome.inputview.events.KeyCodes.ARROW_RIGHT, i18n.input.chrome.inputview.events.KeyCodes.ARROW_UP, i18n.input.chrome.inputview.events.KeyCodes.BACKSPACE, i18n.input.chrome.inputview.events.KeyCodes.CONVERT, i18n.input.chrome.inputview.events.KeyCodes.ENTER, i18n.input.chrome.inputview.events.KeyCodes.NON_CONVERT, i18n.input.chrome.inputview.events.KeyCodes.TAB];
i18n.input.chrome.AbstractController.prototype.context = null;
i18n.input.chrome.AbstractController.prototype.activate = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.deactivate = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.onInputContextUpdate = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.register = function $i18n$input$chrome$AbstractController$$register$(context) {
  this.context = context;
};
i18n.input.chrome.AbstractController.prototype.unregister = function $i18n$input$chrome$AbstractController$$unregister$() {
  this.context = null;
};
i18n.input.chrome.AbstractController.prototype.reset = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.onSurroundingTextChanged = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.handleEvent = function $i18n$input$chrome$AbstractController$$handleEvent$() {
  return!1;
};
i18n.input.chrome.AbstractController.prototype.isNonCharacterKeyEvent = function $i18n$input$chrome$AbstractController$$isNonCharacterKeyEvent$(keyData) {
  var code = keyData[i18n.input.chrome.message.Name.CODE], ctrlKey = keyData[i18n.input.chrome.message.Name.CTRL_KEY], altKey = keyData[i18n.input.chrome.message.Name.ALT_KEY];
  return goog.array.contains(i18n.input.chrome.AbstractController.FUNCTIONAL_KEYS, code) || ctrlKey || altKey;
};
i18n.input.chrome.AbstractController.prototype.handleSendKeyEventMessage_ = function $i18n$input$chrome$AbstractController$$handleSendKeyEventMessage_$(keyData) {
  if (goog.isArrayLike(keyData)) {
    for (var i = 0;i < keyData.length;i++) {
      this.handleSendKeyEventMessage_(keyData[i]);
    }
  } else {
    var kData = keyData;
    this.isNonCharacterKeyEvent(kData) ? this.handleNonCharacterKeyEvent(kData) : this.handleCharacterKeyEvent(kData);
  }
};
i18n.input.chrome.AbstractController.prototype.handleCharacterKeyEvent = function $i18n$input$chrome$AbstractController$$handleCharacterKeyEvent$(keyData) {
  var ret = this.handleEvent(keyData);
  !1 === ret && keyData[i18n.input.chrome.message.Name.MSG_TYPE] == goog.events.EventType.KEYDOWN && this.commitText(keyData[i18n.input.chrome.message.Name.KEY]);
};
i18n.input.chrome.AbstractController.prototype.handleNonCharacterKeyEvent = function $i18n$input$chrome$AbstractController$$handleNonCharacterKeyEvent$(keyData) {
  keyData[i18n.input.chrome.message.Name.CODE] == i18n.input.chrome.inputview.events.KeyCodes.NON_CONVERT ? keyData[i18n.input.chrome.message.Name.KEYCODE] = 29 : keyData[i18n.input.chrome.message.Name.CODE] == i18n.input.chrome.inputview.events.KeyCodes.CONVERT && (keyData[i18n.input.chrome.message.Name.KEYCODE] = 28);
  this.sendKeyEvent(keyData);
};
i18n.input.chrome.AbstractController.prototype.sendKeyEvent = function $i18n$input$chrome$AbstractController$$sendKeyEvent$(keyData) {
  var kData = {}, properties = "type requestId extensionId key code keyCode altKey ctrlKey shiftKey capsLock".split(" ");
  goog.array.forEach(properties, function(property) {
    goog.isDef(keyData[property]) && (kData[property] = keyData[property]);
  });
  kData[i18n.input.chrome.message.Name.REQUEST_ID] = String(this.requestId++);
  chrome.input.ime.sendKeyEvents(goog.object.create(i18n.input.chrome.message.Name.CONTEXT_ID, 0, i18n.input.chrome.message.Name.KEY_DATA, [kData]));
};
i18n.input.chrome.AbstractController.prototype.selectCandidate = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.switchInputToolState = goog.functions.NULL;
i18n.input.chrome.AbstractController.prototype.processMessage = function $i18n$input$chrome$AbstractController$$processMessage$(message) {
  var msgType = message[i18n.input.chrome.message.Name.MSG_TYPE];
  switch(msgType) {
    case i18n.input.chrome.message.Type.SEND_KEY_EVENT:
      this.handleSendKeyEventMessage_(message[i18n.input.chrome.message.Name.KEY_DATA]);
      break;
    case i18n.input.chrome.message.Type.SELECT_CANDIDATE:
      var candidate = message[i18n.input.chrome.message.Name.CANDIDATE];
      this.selectCandidate(candidate[i18n.input.chrome.message.Name.ID]);
      break;
    case i18n.input.chrome.message.Type.COMMIT_TEXT:
      var text = message[i18n.input.chrome.message.Name.TEXT];
      this.commitText(text);
  }
};
i18n.input.chrome.AbstractController.prototype.commitText = function $i18n$input$chrome$AbstractController$$commitText$(text) {
  this.context && chrome.input.ime.commitText(goog.object.create(i18n.input.chrome.message.Name.CONTEXT_ID, this.context.contextID, i18n.input.chrome.message.Name.TEXT, text));
};
i18n.input.chrome.AbstractController.prototype.updateSettings = function $i18n$input$chrome$AbstractController$$updateSettings$(settings) {
  chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.UPDATE_SETTINGS, i18n.input.chrome.message.Name.MSG, settings));
};
i18n.input.common = {};
i18n.input.common.CommandType = {CHANGE_STATE:"changeState", CHANGE_FOCUS:"cfx", CHANGE_DIRECTION:"cd", TOGGLE_ITA:"tita", HIDE_EDITOR:"he", TOGGLE_SBC:"tsbc", TOGGLE_LANGUAGE:"tlang", PUNCTUATION:"pun", LOAD_CONFIG:"lc", SHOW_KEYBOARD:"sk", MINIMIZE_KEYBOARD:"mk", LOAD_LAYOUT:"ll", REPOSITION_ELEMENT:"re", COMMIT:"cm", SHOW_STATUSBAR:"ss"};
i18n.input.common.Metrics = {};
i18n.input.common.Metrics.Param = {ACTION:"act", SHOW_TIME:"st", BAR_LANG_KEY_COUNT:"ltkc", BAR_LANG_CLICK_COUNT:"ltcc", BAR_BC_KEY_COUNT:"bckc", BAR_BC_CLICK_COUNT:"bccc", BAR_PUNC_KEY_COUNT:"ptkc", BAR_PUNC_CLICK_COUNT:"ptcc", BAR_DRAG_COUNT:"bdc", PPE_CANDIDATE_INDEX:"ci", PPE_SOURCE_LENGTH:"slen", PPE_TARGET_LENGTH:"tlen", PPE_SELECT_DURATION:"dur", PPE_BACKSPACE_COUNT:"bsc", PPE_COMMIT_KEY:"key", SGM_CANDIDATE_INDEX:"ci", SGM_CANDIDATE_CLICK_COUNT:"ccc", VK_LAYOUT:"lay", VK_KEY_CLICK_COUNT:"kcc", 
VK_KEY_KEY_COUNT:"kkc", VK_WORD_COUNT:"wc", VK_DRAG_COUNT:"kdc", VK_MINIMIZED_TIME:"mt", QUERY_LATENCY:"ql", PREDICTION:"pre", OFFLINE_DECODER:"od"};
i18n.input.common.Metrics.Type = {POPUP_EDITOR:"ppe", STATUS_BAR:"bar", SUGGEST_MENU:"sgm", VIRTUAL_KEYBOARD:"vk", HANDWRITING:"hwt"};
i18n.input.common.Metrics.Action = {PAGE_UNLOAD:"ul", CLOSE:"cl", SWITCH:"sw", PPE_COMMIT_SOURCE:"cmts", PPE_COMMIT_TARGET:"cmtt", PPE_COMMIT_DELAY:"cmtd"};
i18n.input.common.Metrics.STATUSBAR_MAP = goog.object.create(i18n.input.common.CommandType.TOGGLE_LANGUAGE, [i18n.input.common.Metrics.Param.BAR_LANG_KEY_COUNT, i18n.input.common.Metrics.Param.BAR_LANG_CLICK_COUNT], i18n.input.common.CommandType.TOGGLE_SBC, [i18n.input.common.Metrics.Param.BAR_BC_KEY_COUNT, i18n.input.common.Metrics.Param.BAR_BC_CLICK_COUNT], i18n.input.common.CommandType.PUNCTUATION, [i18n.input.common.Metrics.Param.BAR_PUNC_KEY_COUNT, i18n.input.common.Metrics.Param.BAR_PUNC_CLICK_COUNT]);
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function $goog$debug$EntryPointMonitor$() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function $goog$debug$entryPointRegistry$register$(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var monitors = goog.debug.entryPointRegistry.monitors_, i = 0;i < monitors.length;i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function $goog$debug$entryPointRegistry$monitorAll$(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var transformer = goog.bind(monitor.wrap, monitor), i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function $goog$debug$entryPointRegistry$unmonitorAllIfPossible$(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  for (var transformer = goog.bind(monitor.unwrap, monitor), i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  monitors.length--;
};
goog.reflect = {};
goog.reflect.object = function $goog$reflect$object$(type, object) {
  return object;
};
goog.reflect.sinkValue = function $goog$reflect$sinkValue$(x) {
  goog.reflect.sinkValue[" "](x);
  return x;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function $goog$reflect$canAccessProperty$(obj, prop) {
  try {
    return goog.reflect.sinkValue(obj[prop]), !0;
  } catch (e) {
  }
  return!1;
};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && 
goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || 
!goog.global.navigator.msMaxTouchPoints)};
goog.events.EventId = function $goog$events$EventId$(eventId) {
  this.id = eventId;
};
goog.events.EventId.prototype.toString = function $goog$events$EventId$$toString$() {
  return this.id;
};
goog.events.Event = function $goog$events$Event$(type, opt_target) {
  this.type = type instanceof goog.events.EventId ? String(type) : type;
  this.currentTarget = this.target = opt_target;
  this.defaultPrevented = this.propagationStopped_ = !1;
  this.returnValue_ = !0;
};
goog.events.Event.prototype.disposeInternal = function $goog$events$Event$$disposeInternal$() {
};
goog.events.Event.prototype.dispose = function $goog$events$Event$$dispose$() {
};
goog.events.Event.prototype.stopPropagation = function $goog$events$Event$$stopPropagation$() {
  this.propagationStopped_ = !0;
};
goog.events.Event.prototype.preventDefault = function $goog$events$Event$$preventDefault$() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1;
};
goog.events.Event.stopPropagation = function $goog$events$Event$stopPropagation$(e) {
  e.stopPropagation();
};
goog.events.Event.preventDefault = function $goog$events$Event$preventDefault$(e) {
  e.preventDefault();
};
goog.events.BrowserEvent = function $goog$events$BrowserEvent$(opt_e, opt_currentTarget) {
  goog.events.Event.call(this, opt_e ? opt_e.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.event_ = this.state = null;
  opt_e && this.init(opt_e, opt_currentTarget);
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function $goog$events$BrowserEvent$$init$(e, opt_currentTarget) {
  var type = this.type = e.type;
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  relatedTarget ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(relatedTarget, "nodeName") || (relatedTarget = null)) : type == goog.events.EventType.MOUSEOVER ? relatedTarget = e.fromElement : type == goog.events.EventType.MOUSEOUT && (relatedTarget = e.toElement);
  this.relatedTarget = relatedTarget;
  this.offsetX = goog.userAgent.WEBKIT || void 0 !== e.offsetX ? e.offsetX : e.layerX;
  this.offsetY = goog.userAgent.WEBKIT || void 0 !== e.offsetY ? e.offsetY : e.layerY;
  this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX;
  this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY;
  this.screenX = e.screenX || 0;
  this.screenY = e.screenY || 0;
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.charCode = e.charCode || ("keypress" == type ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.state = e.state;
  this.event_ = e;
  e.defaultPrevented && this.preventDefault();
};
goog.events.BrowserEvent.prototype.stopPropagation = function $goog$events$BrowserEvent$$stopPropagation$() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0;
};
goog.events.BrowserEvent.prototype.preventDefault = function $goog$events$BrowserEvent$$preventDefault$() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  if (be.preventDefault) {
    be.preventDefault();
  } else {
    if (be.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if (be.ctrlKey || 112 <= be.keyCode && 123 >= be.keyCode) {
          be.keyCode = -1;
        }
      } catch (ex) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function $goog$events$BrowserEvent$$getBrowserEvent$() {
  return this.event_;
};
goog.events.BrowserEvent.prototype.disposeInternal = function $goog$events$BrowserEvent$$disposeInternal$() {
};
goog.events.Listenable = function $goog$events$Listenable$() {
};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function $goog$events$Listenable$addImplementation$(cls) {
  cls.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.events.Listenable.isImplementedBy = function $goog$events$Listenable$isImplementedBy$(obj) {
  return!(!obj || !obj[goog.events.Listenable.IMPLEMENTED_BY_PROP]);
};
goog.events.ListenableKey = function $goog$events$ListenableKey$() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function $goog$events$ListenableKey$reserveKey$() {
  return++goog.events.ListenableKey.counter_;
};
goog.events.Listener = function $goog$events$Listener$(listener, proxy, src, type, capture, opt_handler) {
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.key = goog.events.ListenableKey.reserveKey();
  this.removed = this.callOnce = !1;
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function $goog$events$Listener$$markAsRemoved$() {
  this.removed = !0;
  this.handler = this.src = this.proxy = this.listener = null;
};
goog.events.ListenerMap = function $goog$events$ListenerMap$(src) {
  this.src = src;
  this.listeners = {};
  this.typeCount_ = 0;
};
goog.events.ListenerMap.prototype.getTypeCount = function $goog$events$ListenerMap$$getTypeCount$() {
  return this.typeCount_;
};
goog.events.ListenerMap.prototype.add = function $goog$events$ListenerMap$$add$(type, listener, callOnce, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString(), listenerArray = this.listeners[typeStr];
  listenerArray || (listenerArray = this.listeners[typeStr] = [], this.typeCount_++);
  var listenerObj, index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  -1 < index ? (listenerObj = listenerArray[index], callOnce || (listenerObj.callOnce = !1)) : (listenerObj = new goog.events.Listener(listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope), listenerObj.callOnce = callOnce, listenerArray.push(listenerObj));
  return listenerObj;
};
goog.events.ListenerMap.prototype.remove = function $goog$events$ListenerMap$$remove$(type, listener, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString();
  if (!(typeStr in this.listeners)) {
    return!1;
  }
  var listenerArray = this.listeners[typeStr], index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (-1 < index) {
    var listenerObj = listenerArray[index];
    listenerObj.markAsRemoved();
    goog.array.removeAt(listenerArray, index);
    0 == listenerArray.length && (delete this.listeners[typeStr], this.typeCount_--);
    return!0;
  }
  return!1;
};
goog.events.ListenerMap.prototype.removeByKey = function $goog$events$ListenerMap$$removeByKey$(listener) {
  var type = listener.type;
  if (!(type in this.listeners)) {
    return!1;
  }
  var removed = goog.array.remove(this.listeners[type], listener);
  removed && (listener.markAsRemoved(), 0 == this.listeners[type].length && (delete this.listeners[type], this.typeCount_--));
  return removed;
};
goog.events.ListenerMap.prototype.removeAll = function $goog$events$ListenerMap$$removeAll$(opt_type) {
  var typeStr = opt_type && opt_type.toString(), count = 0, type;
  for (type in this.listeners) {
    if (!typeStr || type == typeStr) {
      for (var listenerArray = this.listeners[type], i = 0;i < listenerArray.length;i++) {
        ++count, listenerArray[i].markAsRemoved();
      }
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return count;
};
goog.events.ListenerMap.prototype.getListeners = function $goog$events$ListenerMap$$getListeners$(type, capture) {
  var listenerArray = this.listeners[type.toString()], rv = [];
  if (listenerArray) {
    for (var i = 0;i < listenerArray.length;++i) {
      var listenerObj = listenerArray[i];
      listenerObj.capture == capture && rv.push(listenerObj);
    }
  }
  return rv;
};
goog.events.ListenerMap.prototype.getListener = function $goog$events$ListenerMap$$getListener$(type, listener, capture, opt_listenerScope) {
  var listenerArray = this.listeners[type.toString()], i = -1;
  listenerArray && (i = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, capture, opt_listenerScope));
  return-1 < i ? listenerArray[i] : null;
};
goog.events.ListenerMap.prototype.hasListener = function $goog$events$ListenerMap$$hasListener$(opt_type, opt_capture) {
  var hasType = goog.isDef(opt_type), typeStr = hasType ? opt_type.toString() : "", hasCapture = goog.isDef(opt_capture);
  return goog.object.some(this.listeners, function(listenerArray) {
    for (var i = 0;i < listenerArray.length;++i) {
      if (!(hasType && listenerArray[i].type != typeStr || hasCapture && listenerArray[i].capture != opt_capture)) {
        return!0;
      }
    }
    return!1;
  });
};
goog.events.ListenerMap.findListenerIndex_ = function $goog$events$ListenerMap$findListenerIndex_$(listenerArray, listener, opt_useCapture, opt_listenerScope) {
  for (var i = 0;i < listenerArray.length;++i) {
    var listenerObj = listenerArray[i];
    if (!listenerObj.removed && listenerObj.listener == listener && listenerObj.capture == !!opt_useCapture && listenerObj.handler == opt_listenerScope) {
      return i;
    }
  }
  return-1;
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {OFF_AND_FAIL:0, OFF_AND_SILENT:1, ON:2};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function $goog$events$listen$(src, type, listener, opt_capt, opt_handler) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      goog.events.listen(src, type[i], listener, opt_capt, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  return goog.events.Listenable.isImplementedBy(src) ? src.listen(type, listener, opt_capt, opt_handler) : goog.events.listen_(src, type, listener, !1, opt_capt, opt_handler);
};
goog.events.listen_ = function $goog$events$listen_$(src, type, listener, callOnce, opt_capt, opt_handler) {
  if (!type) {
    throw Error("Invalid event type");
  }
  var capture = !!opt_capt;
  if (capture && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) {
      return goog.asserts.fail("Can not register capture listener in IE8-."), null;
    }
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) {
      return null;
    }
  }
  var listenerMap = goog.events.getListenerMap_(src);
  listenerMap || (src[goog.events.LISTENER_MAP_PROP_] = listenerMap = new goog.events.ListenerMap(src));
  var listenerObj = listenerMap.add(type, listener, callOnce, opt_capt, opt_handler);
  if (listenerObj.proxy) {
    return listenerObj;
  }
  var proxy = goog.events.getProxy();
  listenerObj.proxy = proxy;
  proxy.src = src;
  proxy.listener = listenerObj;
  src.addEventListener ? src.addEventListener(type.toString(), proxy, capture) : src.attachEvent(goog.events.getOnString_(type.toString()), proxy);
  goog.events.listenerCountEstimate_++;
  return listenerObj;
};
goog.events.getProxy = function $goog$events$getProxy$() {
  var proxyCallbackFunction = goog.events.handleBrowserEvent_, f = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(eventObject) {
    return proxyCallbackFunction.call(f.src, f.listener, eventObject);
  } : function(eventObject) {
    var v = proxyCallbackFunction.call(f.src, f.listener, eventObject);
    if (!v) {
      return v;
    }
  };
  return f;
};
goog.events.listenOnce = function $goog$events$listenOnce$(src, type, listener, opt_capt, opt_handler) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      goog.events.listenOnce(src, type[i], listener, opt_capt, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  return goog.events.Listenable.isImplementedBy(src) ? src.listenOnce(type, listener, opt_capt, opt_handler) : goog.events.listen_(src, type, listener, !0, opt_capt, opt_handler);
};
goog.events.listenWithWrapper = function $goog$events$listenWithWrapper$(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler);
};
goog.events.unlisten = function $goog$events$unlisten$(src, type, listener, opt_capt, opt_handler) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      goog.events.unlisten(src, type[i], listener, opt_capt, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlisten(type, listener, opt_capt, opt_handler);
  }
  if (!src) {
    return!1;
  }
  var capture = !!opt_capt, listenerMap = goog.events.getListenerMap_(src);
  if (listenerMap) {
    var listenerObj = listenerMap.getListener(type, listener, capture, opt_handler);
    if (listenerObj) {
      return goog.events.unlistenByKey(listenerObj);
    }
  }
  return!1;
};
goog.events.unlistenByKey = function $goog$events$unlistenByKey$(key) {
  if (goog.isNumber(key)) {
    return!1;
  }
  var listener = key;
  if (!listener || listener.removed) {
    return!1;
  }
  var src = listener.src;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlistenByKey(listener);
  }
  var type = listener.type, proxy = listener.proxy;
  src.removeEventListener ? src.removeEventListener(type, proxy, listener.capture) : src.detachEvent && src.detachEvent(goog.events.getOnString_(type), proxy);
  goog.events.listenerCountEstimate_--;
  var listenerMap = goog.events.getListenerMap_(src);
  listenerMap ? (listenerMap.removeByKey(listener), 0 == listenerMap.getTypeCount() && (listenerMap.src = null, src[goog.events.LISTENER_MAP_PROP_] = null)) : listener.markAsRemoved();
  return!0;
};
goog.events.unlistenWithWrapper = function $goog$events$unlistenWithWrapper$(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler);
};
goog.events.removeAll = function $goog$events$removeAll$(obj, opt_type) {
  if (!obj) {
    return 0;
  }
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.removeAllListeners(opt_type);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  if (!listenerMap) {
    return 0;
  }
  var count = 0, typeStr = opt_type && opt_type.toString(), type;
  for (type in listenerMap.listeners) {
    if (!typeStr || type == typeStr) {
      for (var listeners = listenerMap.listeners[type].concat(), i = 0;i < listeners.length;++i) {
        goog.events.unlistenByKey(listeners[i]) && ++count;
      }
    }
  }
  return count;
};
goog.events.removeAllNativeListeners = function $goog$events$removeAllNativeListeners$() {
  return goog.events.listenerCountEstimate_ = 0;
};
goog.events.getListeners = function $goog$events$getListeners$(obj, type, capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.getListeners(type, capture);
  }
  if (!obj) {
    return[];
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return listenerMap ? listenerMap.getListeners(type, capture) : [];
};
goog.events.getListener = function $goog$events$getListener$(src, type, listener, opt_capt, opt_handler) {
  listener = goog.events.wrapListener(listener);
  var capture = !!opt_capt;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.getListener(type, listener, capture, opt_handler);
  }
  if (!src) {
    return null;
  }
  var listenerMap = goog.events.getListenerMap_(src);
  return listenerMap ? listenerMap.getListener(type, listener, capture, opt_handler) : null;
};
goog.events.hasListener = function $goog$events$hasListener$(obj, opt_type, opt_capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.hasListener(opt_type, opt_capture);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return!!listenerMap && listenerMap.hasListener(opt_type, opt_capture);
};
goog.events.expose = function $goog$events$expose$(e) {
  var str = [], key;
  for (key in e) {
    e[key] && e[key].id ? str.push(key + " = " + e[key] + " (" + e[key].id + ")") : str.push(key + " = " + e[key]);
  }
  return str.join("\n");
};
goog.events.getOnString_ = function $goog$events$getOnString_$(type) {
  return type in goog.events.onStringMap_ ? goog.events.onStringMap_[type] : goog.events.onStringMap_[type] = goog.events.onString_ + type;
};
goog.events.fireListeners = function $goog$events$fireListeners$(obj, type, capture, eventObject) {
  return goog.events.Listenable.isImplementedBy(obj) ? obj.fireListeners(type, capture, eventObject) : goog.events.fireListeners_(obj, type, capture, eventObject);
};
goog.events.fireListeners_ = function $goog$events$fireListeners_$(obj, type, capture, eventObject) {
  var retval = 1, listenerMap = goog.events.getListenerMap_(obj);
  if (listenerMap) {
    var listenerArray = listenerMap.listeners[type.toString()];
    if (listenerArray) {
      for (var listenerArray = listenerArray.concat(), i = 0;i < listenerArray.length;i++) {
        var listener = listenerArray[i];
        listener && listener.capture == capture && !listener.removed && (retval &= !1 !== goog.events.fireListener(listener, eventObject));
      }
    }
  }
  return Boolean(retval);
};
goog.events.fireListener = function $goog$events$fireListener$(listener, eventObject) {
  var listenerFn = listener.listener, listenerHandler = listener.handler || listener.src;
  listener.callOnce && goog.events.unlistenByKey(listener);
  return listenerFn.call(listenerHandler, eventObject);
};
goog.events.getTotalListenerCount = function $goog$events$getTotalListenerCount$() {
  return goog.events.listenerCountEstimate_;
};
goog.events.dispatchEvent = function $goog$events$dispatchEvent$(src, e) {
  goog.asserts.assert(goog.events.Listenable.isImplementedBy(src), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
  return src.dispatchEvent(e);
};
goog.events.protectBrowserEventEntryPoint = function $goog$events$protectBrowserEventEntryPoint$(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_);
};
goog.events.handleBrowserEvent_ = function $goog$events$handleBrowserEvent_$(listener, opt_evt) {
  if (listener.removed) {
    return!0;
  }
  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    var ieEvent = opt_evt || goog.getObjectByName("window.event"), evt = new goog.events.BrowserEvent(ieEvent, this), retval = !0;
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
      if (!goog.events.isMarkedIeEvent_(ieEvent)) {
        goog.events.markIeEvent_(ieEvent);
        for (var ancestors = [], parent = evt.currentTarget;parent;parent = parent.parentNode) {
          ancestors.push(parent);
        }
        for (var type = listener.type, i = ancestors.length - 1;!evt.propagationStopped_ && 0 <= i;i--) {
          evt.currentTarget = ancestors[i], retval &= goog.events.fireListeners_(ancestors[i], type, !0, evt);
        }
        for (i = 0;!evt.propagationStopped_ && i < ancestors.length;i++) {
          evt.currentTarget = ancestors[i], retval &= goog.events.fireListeners_(ancestors[i], type, !1, evt);
        }
      }
    } else {
      retval = goog.events.fireListener(listener, evt);
    }
    return retval;
  }
  return goog.events.fireListener(listener, new goog.events.BrowserEvent(opt_evt, this));
};
goog.events.markIeEvent_ = function $goog$events$markIeEvent_$(e) {
  var useReturnValue = !1;
  if (0 == e.keyCode) {
    try {
      e.keyCode = -1;
      return;
    } catch (ex) {
      useReturnValue = !0;
    }
  }
  if (useReturnValue || void 0 == e.returnValue) {
    e.returnValue = !0;
  }
};
goog.events.isMarkedIeEvent_ = function $goog$events$isMarkedIeEvent_$(e) {
  return 0 > e.keyCode || void 0 != e.returnValue;
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function $goog$events$getUniqueId$(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++;
};
goog.events.getListenerMap_ = function $goog$events$getListenerMap_$(src) {
  var listenerMap = src[goog.events.LISTENER_MAP_PROP_];
  return listenerMap instanceof goog.events.ListenerMap ? listenerMap : null;
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function $goog$events$wrapListener$(listener) {
  goog.asserts.assert(listener, "Listener can not be null.");
  if (goog.isFunction(listener)) {
    return listener;
  }
  goog.asserts.assert(listener.handleEvent, "An object listener must have handleEvent method.");
  listener[goog.events.LISTENER_WRAPPER_PROP_] || (listener[goog.events.LISTENER_WRAPPER_PROP_] = function $listener$goog$events$LISTENER_WRAPPER_PROP_$(e) {
    return listener.handleEvent(e);
  });
  return listener[goog.events.LISTENER_WRAPPER_PROP_];
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_);
});
goog.events.EventHandler = function $goog$events$EventHandler$(opt_scope) {
  goog.Disposable.call(this);
  this.handler_ = opt_scope;
  this.keys_ = {};
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function $goog$events$EventHandler$$listen$(src, type, opt_fn, opt_capture) {
  return this.listen_(src, type, opt_fn, opt_capture);
};
goog.events.EventHandler.prototype.listen_ = function $goog$events$EventHandler$$listen_$(src, type, opt_fn, opt_capture, opt_scope) {
  goog.isArray(type) || (type && (goog.events.EventHandler.typeArray_[0] = type.toString()), type = goog.events.EventHandler.typeArray_);
  for (var i = 0;i < type.length;i++) {
    var listenerObj = goog.events.listen(src, type[i], opt_fn || this.handleEvent, opt_capture || !1, opt_scope || this.handler_ || this);
    if (!listenerObj) {
      break;
    }
    var key = listenerObj.key;
    this.keys_[key] = listenerObj;
  }
  return this;
};
goog.events.EventHandler.prototype.listenOnce = function $goog$events$EventHandler$$listenOnce$(src, type, opt_fn, opt_capture) {
  return this.listenOnce_(src, type, opt_fn, opt_capture);
};
goog.events.EventHandler.prototype.listenOnce_ = function $goog$events$EventHandler$$listenOnce_$(src, type, opt_fn, opt_capture, opt_scope) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      this.listenOnce_(src, type[i], opt_fn, opt_capture, opt_scope);
    }
  } else {
    var listenerObj = goog.events.listenOnce(src, type, opt_fn || this.handleEvent, opt_capture, opt_scope || this.handler_ || this);
    if (!listenerObj) {
      return this;
    }
    var key = listenerObj.key;
    this.keys_[key] = listenerObj;
  }
  return this;
};
goog.events.EventHandler.prototype.listenWithWrapper = function $goog$events$EventHandler$$listenWithWrapper$(src, wrapper, listener, opt_capt) {
  return this.listenWithWrapper_(src, wrapper, listener, opt_capt);
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function $goog$events$EventHandler$$listenWithWrapper_$(src, wrapper, listener, opt_capt, opt_scope) {
  wrapper.listen(src, listener, opt_capt, opt_scope || this.handler_ || this, this);
  return this;
};
goog.events.EventHandler.prototype.unlisten = function $goog$events$EventHandler$$unlisten$(src, type, opt_fn, opt_capture, opt_scope) {
  if (goog.isArray(type)) {
    for (var i = 0;i < type.length;i++) {
      this.unlisten(src, type[i], opt_fn, opt_capture, opt_scope);
    }
  } else {
    var listener = goog.events.getListener(src, type, opt_fn || this.handleEvent, opt_capture, opt_scope || this.handler_ || this);
    listener && (goog.events.unlistenByKey(listener), delete this.keys_[listener.key]);
  }
  return this;
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function $goog$events$EventHandler$$unlistenWithWrapper$(src, wrapper, listener, opt_capt, opt_scope) {
  wrapper.unlisten(src, listener, opt_capt, opt_scope || this.handler_ || this, this);
  return this;
};
goog.events.EventHandler.prototype.removeAll = function $goog$events$EventHandler$$removeAll$() {
  goog.object.forEach(this.keys_, goog.events.unlistenByKey);
  this.keys_ = {};
};
goog.events.EventHandler.prototype.disposeInternal = function $goog$events$EventHandler$$disposeInternal$() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll();
};
goog.events.EventHandler.prototype.handleEvent = function $goog$events$EventHandler$$handleEvent$() {
  throw Error("EventHandler.handleEvent not implemented");
};
i18n.input.common.AbstractStatSession = function $i18n$input$common$AbstractStatSession$() {
};
goog.inherits(i18n.input.common.AbstractStatSession, goog.Disposable);
i18n.input.common.AbstractStatSession.nullFunction_ = function $i18n$input$common$AbstractStatSession$nullFunction_$() {
};
i18n.input.common.AbstractStatSession.prototype.get = goog.nullFunction;
i18n.input.common.AbstractStatSession.prototype.set = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.push = goog.functions.NULL;
i18n.input.common.AbstractStatSession.prototype.pop = goog.functions.withReturnValue(goog.nullFunction, "");
i18n.input.common.Statistics = function $i18n$input$common$Statistics$() {
  this.sessions_ = {};
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.eventHandler_.listen(window, [goog.events.EventType.BEFOREUNLOAD, goog.events.EventType.UNLOAD], this.handleUnload_);
};
goog.inherits(i18n.input.common.Statistics, goog.Disposable);
goog.addSingletonGetter(i18n.input.common.Statistics);
i18n.input.common.Statistics.prototype.getSession = function $i18n$input$common$Statistics$$getSession$(type) {
  return this.sessions_[type] || new i18n.input.common.AbstractStatSession(type);
};
i18n.input.common.Statistics.prototype.handleUnload_ = function $i18n$input$common$Statistics$$handleUnload_$() {
  this.dispose();
};
i18n.input.common.Statistics.prototype.disposeInternal = function $i18n$input$common$Statistics$$disposeInternal$() {
  goog.dispose(this.eventHandler_);
  for (var type in this.sessions_) {
    goog.dispose(this.sessions_[type]), delete this.sessions_[type];
  }
  i18n.input.common.Statistics.superClass_.disposeInternal.call(this);
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function $goog$iter$Iterator$() {
};
goog.iter.Iterator.prototype.next = function $goog$iter$Iterator$$next$() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function $goog$iter$Iterator$$__iterator__$() {
  return this;
};
goog.iter.toIterator = function $goog$iter$toIterator$(iterable) {
  if (iterable instanceof goog.iter.Iterator) {
    return iterable;
  }
  if ("function" == typeof iterable.__iterator__) {
    return iterable.__iterator__(!1);
  }
  if (goog.isArrayLike(iterable)) {
    var i = 0, newIter = new goog.iter.Iterator;
    newIter.next = function $newIter$next$() {
      for (;;) {
        if (i >= iterable.length) {
          throw goog.iter.StopIteration;
        }
        if (i in iterable) {
          return iterable[i++];
        }
        i++;
      }
    };
    return newIter;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function $goog$iter$forEach$(iterable, f, opt_obj) {
  if (goog.isArrayLike(iterable)) {
    try {
      goog.array.forEach(iterable, f, opt_obj);
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  } else {
    iterable = goog.iter.toIterator(iterable);
    try {
      for (;;) {
        f.call(opt_obj, iterable.next(), void 0, iterable);
      }
    } catch (ex$$0) {
      if (ex$$0 !== goog.iter.StopIteration) {
        throw ex$$0;
      }
    }
  }
};
goog.iter.filter = function $goog$iter$filter$(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator;
  newIter.next = function $newIter$next$() {
    for (;;) {
      var val = iterator.next();
      if (f.call(opt_obj, val, void 0, iterator)) {
        return val;
      }
    }
  };
  return newIter;
};
goog.iter.filterFalse = function $goog$iter$filterFalse$(iterable, f, opt_obj) {
  return goog.iter.filter(iterable, goog.functions.not(f), opt_obj);
};
goog.iter.range = function $goog$iter$range$(startOrStop, opt_stop, opt_step) {
  var start = 0, stop = startOrStop, step = opt_step || 1;
  1 < arguments.length && (start = startOrStop, stop = opt_stop);
  if (0 == step) {
    throw Error("Range step argument must not be zero");
  }
  var newIter = new goog.iter.Iterator;
  newIter.next = function $newIter$next$() {
    if (0 < step && start >= stop || 0 > step && start <= stop) {
      throw goog.iter.StopIteration;
    }
    var rv = start;
    start += step;
    return rv;
  };
  return newIter;
};
goog.iter.join = function $goog$iter$join$(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator);
};
goog.iter.map = function $goog$iter$map$(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator;
  newIter.next = function $newIter$next$() {
    var val = iterator.next();
    return f.call(opt_obj, val, void 0, iterator);
  };
  return newIter;
};
goog.iter.reduce = function $goog$iter$reduce$(iterable, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val);
  });
  return rval;
};
goog.iter.some = function $goog$iter$some$(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    for (;;) {
      if (f.call(opt_obj, iterable.next(), void 0, iterable)) {
        return!0;
      }
    }
  } catch (ex) {
    if (ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return!1;
};
goog.iter.every = function $goog$iter$every$(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    for (;;) {
      if (!f.call(opt_obj, iterable.next(), void 0, iterable)) {
        return!1;
      }
    }
  } catch (ex) {
    if (ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return!0;
};
goog.iter.chain = function $goog$iter$chain$(var_args) {
  var iterator = goog.iter.toIterator(arguments), iter = new goog.iter.Iterator, current = null;
  iter.next = function $iter$next$() {
    for (;;) {
      if (null == current) {
        var it = iterator.next();
        current = goog.iter.toIterator(it);
      }
      try {
        return current.next();
      } catch (ex) {
        if (ex !== goog.iter.StopIteration) {
          throw ex;
        }
        current = null;
      }
    }
  };
  return iter;
};
goog.iter.chainFromIterable = function $goog$iter$chainFromIterable$(iterable) {
  return goog.iter.chain.apply(void 0, iterable);
};
goog.iter.dropWhile = function $goog$iter$dropWhile$(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator, dropping = !0;
  newIter.next = function $newIter$next$() {
    for (;;) {
      var val = iterator.next();
      if (!dropping || !f.call(opt_obj, val, void 0, iterator)) {
        return dropping = !1, val;
      }
    }
  };
  return newIter;
};
goog.iter.takeWhile = function $goog$iter$takeWhile$(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator, taking = !0;
  newIter.next = function $newIter$next$() {
    for (;;) {
      if (taking) {
        var val = iterator.next();
        if (f.call(opt_obj, val, void 0, iterator)) {
          return val;
        }
        taking = !1;
      } else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return newIter;
};
goog.iter.toArray = function $goog$iter$toArray$(iterable) {
  if (goog.isArrayLike(iterable)) {
    return goog.array.toArray(iterable);
  }
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val);
  });
  return array;
};
goog.iter.equals = function $goog$iter$equals$(iterable1, iterable2) {
  var fillValue = {}, pairs = goog.iter.zipLongest(fillValue, iterable1, iterable2);
  return goog.iter.every(pairs, function(pair) {
    return pair[0] == pair[1];
  });
};
goog.iter.nextOrValue = function $goog$iter$nextOrValue$(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next();
  } catch (e) {
    if (e != goog.iter.StopIteration) {
      throw e;
    }
    return defaultValue;
  }
};
goog.iter.product = function $goog$iter$product$(var_args) {
  var someArrayEmpty = goog.array.some(arguments, function(arr) {
    return!arr.length;
  });
  if (someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var iter = new goog.iter.Iterator, arrays = arguments, indicies = goog.array.repeat(0, arrays.length);
  iter.next = function $iter$next$() {
    if (indicies) {
      for (var retVal = goog.array.map(indicies, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex];
      }), i = indicies.length - 1;0 <= i;i--) {
        goog.asserts.assert(indicies);
        if (indicies[i] < arrays[i].length - 1) {
          indicies[i]++;
          break;
        }
        if (0 == i) {
          indicies = null;
          break;
        }
        indicies[i] = 0;
      }
      return retVal;
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.cycle = function $goog$iter$cycle$(iterable) {
  var baseIterator = goog.iter.toIterator(iterable), cache = [], cacheIndex = 0, iter = new goog.iter.Iterator, useCache = !1;
  iter.next = function $iter$next$() {
    var returnElement = null;
    if (!useCache) {
      try {
        return returnElement = baseIterator.next(), cache.push(returnElement), returnElement;
      } catch (e) {
        if (e != goog.iter.StopIteration || goog.array.isEmpty(cache)) {
          throw e;
        }
        useCache = !0;
      }
    }
    returnElement = cache[cacheIndex];
    cacheIndex = (cacheIndex + 1) % cache.length;
    return returnElement;
  };
  return iter;
};
goog.iter.count = function $goog$iter$count$(opt_start, opt_step) {
  var counter = opt_start || 0, step = goog.isDef(opt_step) ? opt_step : 1, iter = new goog.iter.Iterator;
  iter.next = function $iter$next$() {
    var returnValue = counter;
    counter += step;
    return returnValue;
  };
  return iter;
};
goog.iter.repeat = function $goog$iter$repeat$(value) {
  var iter = new goog.iter.Iterator;
  iter.next = goog.functions.constant(value);
  return iter;
};
goog.iter.accumulate = function $goog$iter$accumulate$(iterable) {
  var iterator = goog.iter.toIterator(iterable), total = 0, iter = new goog.iter.Iterator;
  iter.next = function $iter$next$() {
    return total += iterator.next();
  };
  return iter;
};
goog.iter.zip = function $goog$iter$zip$(var_args) {
  var args = arguments, iter = new goog.iter.Iterator;
  if (0 < args.length) {
    var iterators = goog.array.map(args, goog.iter.toIterator);
    iter.next = function $iter$next$() {
      var arr = goog.array.map(iterators, function(it) {
        return it.next();
      });
      return arr;
    };
  }
  return iter;
};
goog.iter.zipLongest = function $goog$iter$zipLongest$(fillValue, var_args) {
  var args = goog.array.slice(arguments, 1), iter = new goog.iter.Iterator;
  if (0 < args.length) {
    var iterators = goog.array.map(args, goog.iter.toIterator);
    iter.next = function $iter$next$() {
      var iteratorsHaveValues = !1, arr = goog.array.map(iterators, function(it) {
        var returnValue;
        try {
          returnValue = it.next(), iteratorsHaveValues = !0;
        } catch (ex) {
          if (ex !== goog.iter.StopIteration) {
            throw ex;
          }
          returnValue = fillValue;
        }
        return returnValue;
      });
      if (!iteratorsHaveValues) {
        throw goog.iter.StopIteration;
      }
      return arr;
    };
  }
  return iter;
};
goog.iter.compress = function $goog$iter$compress$(iterable, selectors) {
  var selectorIterator = goog.iter.toIterator(selectors);
  return goog.iter.filter(iterable, function() {
    return!!selectorIterator.next();
  });
};
goog.iter.GroupByIterator_ = function $goog$iter$GroupByIterator_$(iterable, opt_keyFunc) {
  this.iterator = goog.iter.toIterator(iterable);
  this.keyFunc = opt_keyFunc || goog.functions.identity;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function $goog$iter$GroupByIterator_$$next$() {
  for (;this.currentKey == this.targetKey;) {
    this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return[this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function $goog$iter$GroupByIterator_$$groupItems_$(targetKey) {
  for (var arr = [];this.currentKey == targetKey;) {
    arr.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return arr;
};
goog.iter.groupBy = function $goog$iter$groupBy$(iterable, opt_keyFunc) {
  return new goog.iter.GroupByIterator_(iterable, opt_keyFunc);
};
goog.iter.starMap = function $goog$iter$starMap$(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), iter = new goog.iter.Iterator;
  iter.next = function $iter$next$() {
    var args = goog.iter.toArray(iterator.next());
    return f.apply(opt_obj, goog.array.concat(args, void 0, iterator));
  };
  return iter;
};
goog.iter.tee = function $goog$iter$tee$(iterable, opt_num) {
  var iterator = goog.iter.toIterator(iterable), num = goog.isNumber(opt_num) ? opt_num : 2, buffers = goog.array.map(goog.array.range(num), function() {
    return[];
  }), addNextIteratorValueToBuffers = function $addNextIteratorValueToBuffers$() {
    var val = iterator.next();
    goog.array.forEach(buffers, function(buffer) {
      buffer.push(val);
    });
  }, createIterator = function $createIterator$(buffer) {
    var iter = new goog.iter.Iterator;
    iter.next = function $iter$next$() {
      goog.array.isEmpty(buffer) && addNextIteratorValueToBuffers();
      goog.asserts.assert(!goog.array.isEmpty(buffer));
      return buffer.shift();
    };
    return iter;
  };
  return goog.array.map(buffers, createIterator);
};
goog.iter.enumerate = function $goog$iter$enumerate$(iterable, opt_start) {
  return goog.iter.zip(goog.iter.count(opt_start), iterable);
};
goog.iter.limit = function $goog$iter$limit$(iterable, limitSize) {
  goog.asserts.assert(goog.math.isInt(limitSize) && 0 <= limitSize);
  var iterator = goog.iter.toIterator(iterable), iter = new goog.iter.Iterator, remaining = limitSize;
  iter.next = function $iter$next$() {
    if (0 < remaining--) {
      return iterator.next();
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.consume = function $goog$iter$consume$(iterable, count) {
  goog.asserts.assert(goog.math.isInt(count) && 0 <= count);
  for (var iterator = goog.iter.toIterator(iterable);0 < count--;) {
    goog.iter.nextOrValue(iterator, null);
  }
  return iterator;
};
goog.iter.slice = function $goog$iter$slice$(iterable, start, opt_end) {
  goog.asserts.assert(goog.math.isInt(start) && 0 <= start);
  var iterator = goog.iter.consume(iterable, start);
  goog.isNumber(opt_end) && (goog.asserts.assert(goog.math.isInt(opt_end) && opt_end >= start), iterator = goog.iter.limit(iterator, opt_end - start));
  return iterator;
};
goog.iter.hasDuplicates_ = function $goog$iter$hasDuplicates_$(arr) {
  var deduped = [];
  goog.array.removeDuplicates(arr, deduped);
  return arr.length != deduped.length;
};
goog.iter.permutations = function $goog$iter$permutations$(iterable, opt_length) {
  var elements = goog.iter.toArray(iterable), length = goog.isNumber(opt_length) ? opt_length : elements.length, sets = goog.array.repeat(elements, length), product = goog.iter.product.apply(void 0, sets);
  return goog.iter.filter(product, function(arr) {
    return!goog.iter.hasDuplicates_(arr);
  });
};
goog.iter.combinations = function $goog$iter$combinations$(iterable, length) {
  function getIndexFromElements(index) {
    return elements[index];
  }
  var elements = goog.iter.toArray(iterable), indexes = goog.iter.range(elements.length), indexIterator = goog.iter.permutations(indexes, length), sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  }), iter = new goog.iter.Iterator;
  iter.next = function $iter$next$() {
    return goog.array.map(sortedIndexIterator.next(), getIndexFromElements);
  };
  return iter;
};
goog.iter.combinationsWithReplacement = function $goog$iter$combinationsWithReplacement$(iterable, length) {
  function getIndexFromElements(index) {
    return elements[index];
  }
  var elements = goog.iter.toArray(iterable), indexes = goog.array.range(elements.length), sets = goog.array.repeat(indexes, length), indexIterator = goog.iter.product.apply(void 0, sets), sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  }), iter = new goog.iter.Iterator;
  iter.next = function $iter$next$() {
    return goog.array.map(sortedIndexIterator.next(), getIndexFromElements);
  };
  return iter;
};
goog.structs = {};
goog.structs.Map = function $goog$structs$Map$(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  this.version_ = this.count_ = 0;
  var argLength = arguments.length;
  if (1 < argLength) {
    if (argLength % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var i = 0;i < argLength;i += 2) {
      this.set(arguments[i], arguments[i + 1]);
    }
  } else {
    opt_map && this.addAll(opt_map);
  }
};
goog.structs.Map.prototype.getCount = function $goog$structs$Map$$getCount$() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function $goog$structs$Map$$getValues$() {
  this.cleanupKeysArray_();
  for (var rv = [], i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key]);
  }
  return rv;
};
goog.structs.Map.prototype.getKeys = function $goog$structs$Map$$getKeys$() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function $goog$structs$Map$$containsKey$(key) {
  return goog.structs.Map.hasKey_(this.map_, key);
};
goog.structs.Map.prototype.containsValue = function $goog$structs$Map$$containsValue$(val) {
  for (var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if (goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return!0;
    }
  }
  return!1;
};
goog.structs.Map.prototype.equals = function $goog$structs$Map$$equals$(otherMap, opt_equalityFn) {
  if (this === otherMap) {
    return!0;
  }
  if (this.count_ != otherMap.getCount()) {
    return!1;
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var key, i = 0;key = this.keys_[i];i++) {
    if (!equalityFn(this.get(key), otherMap.get(key))) {
      return!1;
    }
  }
  return!0;
};
goog.structs.Map.defaultEquals = function $goog$structs$Map$defaultEquals$(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function $goog$structs$Map$$isEmpty$() {
  return 0 == this.count_;
};
goog.structs.Map.prototype.clear = function $goog$structs$Map$$clear$() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0;
};
goog.structs.Map.prototype.remove = function $goog$structs$Map$$remove$(key) {
  return goog.structs.Map.hasKey_(this.map_, key) ? (delete this.map_[key], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function $goog$structs$Map$$cleanupKeysArray_$() {
  if (this.count_ != this.keys_.length) {
    for (var srcIndex = 0, destIndex = 0;srcIndex < this.keys_.length;) {
      var key = this.keys_[srcIndex];
      goog.structs.Map.hasKey_(this.map_, key) && (this.keys_[destIndex++] = key);
      srcIndex++;
    }
    this.keys_.length = destIndex;
  }
  if (this.count_ != this.keys_.length) {
    for (var seen = {}, destIndex = srcIndex = 0;srcIndex < this.keys_.length;) {
      key = this.keys_[srcIndex], goog.structs.Map.hasKey_(seen, key) || (this.keys_[destIndex++] = key, seen[key] = 1), srcIndex++;
    }
    this.keys_.length = destIndex;
  }
};
goog.structs.Map.prototype.get = function $goog$structs$Map$$get$(key, opt_val) {
  return goog.structs.Map.hasKey_(this.map_, key) ? this.map_[key] : opt_val;
};
goog.structs.Map.prototype.set = function $goog$structs$Map$$set$(key, value) {
  goog.structs.Map.hasKey_(this.map_, key) || (this.count_++, this.keys_.push(key), this.version_++);
  this.map_[key] = value;
};
goog.structs.Map.prototype.addAll = function $goog$structs$Map$$addAll$(map) {
  var keys, values;
  map instanceof goog.structs.Map ? (keys = map.getKeys(), values = map.getValues()) : (keys = goog.object.getKeys(map), values = goog.object.getValues(map));
  for (var i = 0;i < keys.length;i++) {
    this.set(keys[i], values[i]);
  }
};
goog.structs.Map.prototype.forEach = function $goog$structs$Map$$forEach$(f, opt_obj) {
  for (var keys = this.getKeys(), i = 0;i < keys.length;i++) {
    var key = keys[i], value = this.get(key);
    f.call(opt_obj, value, key, this);
  }
};
goog.structs.Map.prototype.clone = function $goog$structs$Map$$clone$() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function $goog$structs$Map$$transpose$() {
  for (var transposed = new goog.structs.Map, i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i], value = this.map_[key];
    transposed.set(value, key);
  }
  return transposed;
};
goog.structs.Map.prototype.toObject = function $goog$structs$Map$$toObject$() {
  this.cleanupKeysArray_();
  for (var obj = {}, i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key];
  }
  return obj;
};
goog.structs.Map.prototype.__iterator__ = function $goog$structs$Map$$__iterator__$(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0, keys = this.keys_, map = this.map_, version = this.version_, selfObj = this, newIter = new goog.iter.Iterator;
  newIter.next = function $newIter$next$() {
    for (;;) {
      if (version != selfObj.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if (i >= keys.length) {
        throw goog.iter.StopIteration;
      }
      var key = keys[i++];
      return opt_keys ? key : map[key];
    }
  };
  return newIter;
};
goog.structs.Map.hasKey_ = function $goog$structs$Map$hasKey_$(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
goog.structs.getCount = function $goog$structs$getCount$(col) {
  return "function" == typeof col.getCount ? col.getCount() : goog.isArrayLike(col) || goog.isString(col) ? col.length : goog.object.getCount(col);
};
goog.structs.getValues = function $goog$structs$getValues$(col) {
  if ("function" == typeof col.getValues) {
    return col.getValues();
  }
  if (goog.isString(col)) {
    return col.split("");
  }
  if (goog.isArrayLike(col)) {
    for (var rv = [], l = col.length, i = 0;i < l;i++) {
      rv.push(col[i]);
    }
    return rv;
  }
  return goog.object.getValues(col);
};
goog.structs.getKeys = function $goog$structs$getKeys$(col) {
  if ("function" == typeof col.getKeys) {
    return col.getKeys();
  }
  if ("function" != typeof col.getValues) {
    if (goog.isArrayLike(col) || goog.isString(col)) {
      for (var rv = [], l = col.length, i = 0;i < l;i++) {
        rv.push(i);
      }
      return rv;
    }
    return goog.object.getKeys(col);
  }
};
goog.structs.contains = function $goog$structs$contains$(col, val) {
  return "function" == typeof col.contains ? col.contains(val) : "function" == typeof col.containsValue ? col.containsValue(val) : goog.isArrayLike(col) || goog.isString(col) ? goog.array.contains(col, val) : goog.object.containsValue(col, val);
};
goog.structs.isEmpty = function $goog$structs$isEmpty$(col) {
  return "function" == typeof col.isEmpty ? col.isEmpty() : goog.isArrayLike(col) || goog.isString(col) ? goog.array.isEmpty(col) : goog.object.isEmpty(col);
};
goog.structs.clear = function $goog$structs$clear$(col) {
  "function" == typeof col.clear ? col.clear() : goog.isArrayLike(col) ? goog.array.clear(col) : goog.object.clear(col);
};
goog.structs.forEach = function $goog$structs$forEach$(col, f, opt_obj) {
  if ("function" == typeof col.forEach) {
    col.forEach(f, opt_obj);
  } else {
    if (goog.isArrayLike(col) || goog.isString(col)) {
      goog.array.forEach(col, f, opt_obj);
    } else {
      for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
        f.call(opt_obj, values[i], keys && keys[i], col);
      }
    }
  }
};
goog.structs.filter = function $goog$structs$filter$(col, f, opt_obj) {
  if ("function" == typeof col.filter) {
    return col.filter(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.filter(col, f, opt_obj);
  }
  var rv, keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0;i < l;i++) {
      f.call(opt_obj, values[i], keys[i], col) && (rv[keys[i]] = values[i]);
    }
  } else {
    for (rv = [], i = 0;i < l;i++) {
      f.call(opt_obj, values[i], void 0, col) && rv.push(values[i]);
    }
  }
  return rv;
};
goog.structs.map = function $goog$structs$map$(col, f, opt_obj) {
  if ("function" == typeof col.map) {
    return col.map(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.map(col, f, opt_obj);
  }
  var rv, keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0;i < l;i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col);
    }
  } else {
    for (rv = [], i = 0;i < l;i++) {
      rv[i] = f.call(opt_obj, values[i], void 0, col);
    }
  }
  return rv;
};
goog.structs.some = function $goog$structs$some$(col, f, opt_obj) {
  if ("function" == typeof col.some) {
    return col.some(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.some(col, f, opt_obj);
  }
  for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    if (f.call(opt_obj, values[i], keys && keys[i], col)) {
      return!0;
    }
  }
  return!1;
};
goog.structs.every = function $goog$structs$every$(col, f, opt_obj) {
  if ("function" == typeof col.every) {
    return col.every(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.every(col, f, opt_obj);
  }
  for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    if (!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return!1;
    }
  }
  return!0;
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function $goog$uri$utils$buildFromEncodedParts$(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = "";
  opt_scheme && (out += opt_scheme + ":");
  opt_domain && (out += "//", opt_userInfo && (out += opt_userInfo + "@"), out += opt_domain, opt_port && (out += ":" + opt_port));
  opt_path && (out += opt_path);
  opt_queryData && (out += "?" + opt_queryData);
  opt_fragment && (out += "#" + opt_fragment);
  return out;
};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function $goog$uri$utils$split$(uri) {
  goog.uri.utils.phishingProtection_();
  return uri.match(goog.uri.utils.splitRe_);
};
goog.uri.utils.needsPhishingProtection_ = goog.userAgent.WEBKIT;
goog.uri.utils.phishingProtection_ = function $goog$uri$utils$phishingProtection_$() {
  if (goog.uri.utils.needsPhishingProtection_) {
    goog.uri.utils.needsPhishingProtection_ = !1;
    var location = goog.global.location;
    if (location) {
      var href = location.href;
      if (href) {
        var domain = goog.uri.utils.getDomain(href);
        if (domain && domain != location.hostname) {
          throw goog.uri.utils.needsPhishingProtection_ = !0, Error();
        }
      }
    }
  }
};
goog.uri.utils.decodeIfPossible_ = function $goog$uri$utils$decodeIfPossible_$(uri) {
  return uri && decodeURIComponent(uri);
};
goog.uri.utils.getComponentByIndex_ = function $goog$uri$utils$getComponentByIndex_$(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null;
};
goog.uri.utils.getScheme = function $goog$uri$utils$getScheme$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri);
};
goog.uri.utils.getEffectiveScheme = function $goog$uri$utils$getEffectiveScheme$(uri) {
  var scheme = goog.uri.utils.getScheme(uri);
  if (!scheme && self.location) {
    var protocol = self.location.protocol, scheme = protocol.substr(0, protocol.length - 1)
  }
  return scheme ? scheme.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function $goog$uri$utils$getUserInfoEncoded$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri);
};
goog.uri.utils.getUserInfo = function $goog$uri$utils$getUserInfo$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri));
};
goog.uri.utils.getDomainEncoded = function $goog$uri$utils$getDomainEncoded$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri);
};
goog.uri.utils.getDomain = function $goog$uri$utils$getDomain$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri));
};
goog.uri.utils.getPort = function $goog$uri$utils$getPort$(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null;
};
goog.uri.utils.getPathEncoded = function $goog$uri$utils$getPathEncoded$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri);
};
goog.uri.utils.getPath = function $goog$uri$utils$getPath$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri));
};
goog.uri.utils.getQueryData = function $goog$uri$utils$getQueryData$(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri);
};
goog.uri.utils.getFragmentEncoded = function $goog$uri$utils$getFragmentEncoded$(uri) {
  var hashIndex = uri.indexOf("#");
  return 0 > hashIndex ? null : uri.substr(hashIndex + 1);
};
goog.uri.utils.setFragmentEncoded = function $goog$uri$utils$setFragmentEncoded$(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "");
};
goog.uri.utils.getFragment = function $goog$uri$utils$getFragment$(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri));
};
goog.uri.utils.getHost = function $goog$uri$utils$getHost$(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function $goog$uri$utils$getPathAndAfter$(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function $goog$uri$utils$removeFragment$(uri) {
  var hashIndex = uri.indexOf("#");
  return 0 > hashIndex ? uri : uri.substr(0, hashIndex);
};
goog.uri.utils.haveSameDomain = function $goog$uri$utils$haveSameDomain$(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1), pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function $goog$uri$utils$assertNoFragmentsOrQueries_$(uri) {
  if (goog.DEBUG && (0 <= uri.indexOf("#") || 0 <= uri.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + uri + "]");
  }
};
goog.uri.utils.appendQueryData_ = function $goog$uri$utils$appendQueryData_$(buffer) {
  if (buffer[1]) {
    var baseUri = buffer[0], hashIndex = baseUri.indexOf("#");
    0 <= hashIndex && (buffer.push(baseUri.substr(hashIndex)), buffer[0] = baseUri = baseUri.substr(0, hashIndex));
    var questionIndex = baseUri.indexOf("?");
    0 > questionIndex ? buffer[1] = "?" : questionIndex == baseUri.length - 1 && (buffer[1] = void 0);
  }
  return buffer.join("");
};
goog.uri.utils.appendKeyValuePairs_ = function $goog$uri$utils$appendKeyValuePairs_$(key, value, pairs) {
  if (goog.isArray(value)) {
    goog.asserts.assertArray(value);
    for (var j = 0;j < value.length;j++) {
      goog.uri.utils.appendKeyValuePairs_(key, String(value[j]), pairs);
    }
  } else {
    null != value && pairs.push("&", key, "" === value ? "" : "=", goog.string.urlEncode(value));
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function $goog$uri$utils$buildQueryDataBuffer_$(buffer, keysAndValues, opt_startIndex) {
  goog.asserts.assert(0 == Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for (var i = opt_startIndex || 0;i < keysAndValues.length;i += 2) {
    goog.uri.utils.appendKeyValuePairs_(keysAndValues[i], keysAndValues[i + 1], buffer);
  }
  return buffer;
};
goog.uri.utils.buildQueryData = function $goog$uri$utils$buildQueryData$(keysAndValues, opt_startIndex) {
  var buffer = goog.uri.utils.buildQueryDataBuffer_([], keysAndValues, opt_startIndex);
  buffer[0] = "";
  return buffer.join("");
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function $goog$uri$utils$buildQueryDataBufferFromMap_$(buffer, map) {
  for (var key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], buffer);
  }
  return buffer;
};
goog.uri.utils.buildQueryDataFromMap = function $goog$uri$utils$buildQueryDataFromMap$(map) {
  var buffer = goog.uri.utils.buildQueryDataBufferFromMap_([], map);
  buffer[0] = "";
  return buffer.join("");
};
goog.uri.utils.appendParams = function $goog$uri$utils$appendParams$(uri, var_args) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([uri], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([uri], arguments, 1));
};
goog.uri.utils.appendParamsFromMap = function $goog$uri$utils$appendParamsFromMap$(uri, map) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([uri], map));
};
goog.uri.utils.appendParam = function $goog$uri$utils$appendParam$(uri, key, opt_value) {
  var paramArr = [uri, "&", key];
  goog.isDefAndNotNull(opt_value) && paramArr.push("=", goog.string.urlEncode(opt_value));
  return goog.uri.utils.appendQueryData_(paramArr);
};
goog.uri.utils.findParam_ = function $goog$uri$utils$findParam_$(uri, startIndex, keyEncoded, hashOrEndIndex) {
  for (var index = startIndex, keyLength = keyEncoded.length;0 <= (index = uri.indexOf(keyEncoded, index)) && index < hashOrEndIndex;) {
    var precedingChar = uri.charCodeAt(index - 1);
    if (precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if (!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index;
      }
    }
    index += keyLength + 1;
  }
  return-1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function $goog$uri$utils$hasParam$(uri, keyEncoded) {
  return 0 <= goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_));
};
goog.uri.utils.getParamValue = function $goog$uri$utils$getParamValue$(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if (0 > foundIndex) {
    return null;
  }
  var endPosition = uri.indexOf("&", foundIndex);
  if (0 > endPosition || endPosition > hashOrEndIndex) {
    endPosition = hashOrEndIndex;
  }
  foundIndex += keyEncoded.length + 1;
  return goog.string.urlDecode(uri.substr(foundIndex, endPosition - foundIndex));
};
goog.uri.utils.getParamValues = function $goog$uri$utils$getParamValues$(uri, keyEncoded) {
  for (var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), position = 0, foundIndex, result = [];0 <= (foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex));) {
    position = uri.indexOf("&", foundIndex);
    if (0 > position || position > hashOrEndIndex) {
      position = hashOrEndIndex;
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.substr(foundIndex, position - foundIndex)));
  }
  return result;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function $goog$uri$utils$removeParam$(uri, keyEncoded) {
  for (var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), position = 0, foundIndex, buffer = [];0 <= (foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex));) {
    buffer.push(uri.substring(position, foundIndex)), position = Math.min(uri.indexOf("&", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex);
  }
  buffer.push(uri.substr(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function $goog$uri$utils$setParam$(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value);
};
goog.uri.utils.appendPath = function $goog$uri$utils$appendPath$(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  goog.string.endsWith(baseUri, "/") && (baseUri = baseUri.substr(0, baseUri.length - 1));
  goog.string.startsWith(path, "/") && (path = path.substr(1));
  return goog.string.buildString(baseUri, "/", path);
};
goog.uri.utils.setPath = function $goog$uri$utils$setPath$(uri, path) {
  goog.string.startsWith(path, "/") || (path = "/" + path);
  var parts = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(parts[goog.uri.utils.ComponentIndex.SCHEME], parts[goog.uri.utils.ComponentIndex.USER_INFO], parts[goog.uri.utils.ComponentIndex.DOMAIN], parts[goog.uri.utils.ComponentIndex.PORT], path, parts[goog.uri.utils.ComponentIndex.QUERY_DATA], parts[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function $goog$uri$utils$makeUnique$(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.Uri = function $goog$Uri$(opt_uri, opt_ignoreCase) {
  var m;
  opt_uri instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(opt_ignoreCase) ? opt_ignoreCase : opt_uri.getIgnoreCase(), this.setScheme(opt_uri.getScheme()), this.setUserInfo(opt_uri.getUserInfo()), this.setDomain(opt_uri.getDomain()), this.setPort(opt_uri.getPort()), this.setPath(opt_uri.getPath()), this.setQueryData(opt_uri.getQueryData().clone()), this.setFragment(opt_uri.getFragment())) : opt_uri && (m = goog.uri.utils.split(String(opt_uri))) ? (this.ignoreCase_ = !!opt_ignoreCase, this.setScheme(m[goog.uri.utils.ComponentIndex.SCHEME] || 
  "", !0), this.setUserInfo(m[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain(m[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(m[goog.uri.utils.ComponentIndex.PORT]), this.setPath(m[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(m[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(m[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!opt_ignoreCase, this.queryData_ = new goog.Uri.QueryData(null, null, 
  this.ignoreCase_));
};
goog.Uri.preserveParameterTypesCompatibilityFlag = !1;
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = !1;
goog.Uri.prototype.ignoreCase_ = !1;
goog.Uri.prototype.toString = function $goog$Uri$$toString$() {
  var out = [], scheme = this.getScheme();
  scheme && out.push(goog.Uri.encodeSpecialChars_(scheme, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":");
  var domain = this.getDomain();
  if (domain) {
    out.push("//");
    var userInfo = this.getUserInfo();
    userInfo && out.push(goog.Uri.encodeSpecialChars_(userInfo, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@");
    out.push(goog.string.urlEncode(domain));
    var port = this.getPort();
    null != port && out.push(":", String(port));
  }
  var path = this.getPath();
  path && (this.hasDomain() && "/" != path.charAt(0) && out.push("/"), out.push(goog.Uri.encodeSpecialChars_(path, "/" == path.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_)));
  var query = this.getEncodedQuery();
  query && out.push("?", query);
  var fragment = this.getFragment();
  fragment && out.push("#", goog.Uri.encodeSpecialChars_(fragment, goog.Uri.reDisallowedInFragment_));
  return out.join("");
};
goog.Uri.prototype.resolve = function $goog$Uri$$resolve$(relativeUri) {
  var absoluteUri = this.clone(), overridden = relativeUri.hasScheme();
  overridden ? absoluteUri.setScheme(relativeUri.getScheme()) : overridden = relativeUri.hasUserInfo();
  overridden ? absoluteUri.setUserInfo(relativeUri.getUserInfo()) : overridden = relativeUri.hasDomain();
  overridden ? absoluteUri.setDomain(relativeUri.getDomain()) : overridden = relativeUri.hasPort();
  var path = relativeUri.getPath();
  if (overridden) {
    absoluteUri.setPort(relativeUri.getPort());
  } else {
    if (overridden = relativeUri.hasPath()) {
      if ("/" != path.charAt(0)) {
        if (this.hasDomain() && !this.hasPath()) {
          path = "/" + path;
        } else {
          var lastSlashIndex = absoluteUri.getPath().lastIndexOf("/");
          -1 != lastSlashIndex && (path = absoluteUri.getPath().substr(0, lastSlashIndex + 1) + path);
        }
      }
      path = goog.Uri.removeDotSegments(path);
    }
  }
  overridden ? absoluteUri.setPath(path) : overridden = relativeUri.hasQuery();
  overridden ? absoluteUri.setQueryData(relativeUri.getDecodedQuery()) : overridden = relativeUri.hasFragment();
  overridden && absoluteUri.setFragment(relativeUri.getFragment());
  return absoluteUri;
};
goog.Uri.prototype.clone = function $goog$Uri$$clone$() {
  return new goog.Uri(this);
};
goog.Uri.prototype.getScheme = function $goog$Uri$$getScheme$() {
  return this.scheme_;
};
goog.Uri.prototype.setScheme = function $goog$Uri$$setScheme$(newScheme, opt_decode) {
  this.enforceReadOnly();
  if (this.scheme_ = opt_decode ? goog.Uri.decodeOrEmpty_(newScheme) : newScheme) {
    this.scheme_ = this.scheme_.replace(/:$/, "");
  }
  return this;
};
goog.Uri.prototype.hasScheme = function $goog$Uri$$hasScheme$() {
  return!!this.scheme_;
};
goog.Uri.prototype.getUserInfo = function $goog$Uri$$getUserInfo$() {
  return this.userInfo_;
};
goog.Uri.prototype.setUserInfo = function $goog$Uri$$setUserInfo$(newUserInfo, opt_decode) {
  this.enforceReadOnly();
  this.userInfo_ = opt_decode ? goog.Uri.decodeOrEmpty_(newUserInfo) : newUserInfo;
  return this;
};
goog.Uri.prototype.hasUserInfo = function $goog$Uri$$hasUserInfo$() {
  return!!this.userInfo_;
};
goog.Uri.prototype.getDomain = function $goog$Uri$$getDomain$() {
  return this.domain_;
};
goog.Uri.prototype.setDomain = function $goog$Uri$$setDomain$(newDomain, opt_decode) {
  this.enforceReadOnly();
  this.domain_ = opt_decode ? goog.Uri.decodeOrEmpty_(newDomain) : newDomain;
  return this;
};
goog.Uri.prototype.hasDomain = function $goog$Uri$$hasDomain$() {
  return!!this.domain_;
};
goog.Uri.prototype.getPort = function $goog$Uri$$getPort$() {
  return this.port_;
};
goog.Uri.prototype.setPort = function $goog$Uri$$setPort$(newPort) {
  this.enforceReadOnly();
  if (newPort) {
    newPort = Number(newPort);
    if (isNaN(newPort) || 0 > newPort) {
      throw Error("Bad port number " + newPort);
    }
    this.port_ = newPort;
  } else {
    this.port_ = null;
  }
  return this;
};
goog.Uri.prototype.hasPort = function $goog$Uri$$hasPort$() {
  return null != this.port_;
};
goog.Uri.prototype.getPath = function $goog$Uri$$getPath$() {
  return this.path_;
};
goog.Uri.prototype.setPath = function $goog$Uri$$setPath$(newPath, opt_decode) {
  this.enforceReadOnly();
  this.path_ = opt_decode ? goog.Uri.decodeOrEmpty_(newPath) : newPath;
  return this;
};
goog.Uri.prototype.hasPath = function $goog$Uri$$hasPath$() {
  return!!this.path_;
};
goog.Uri.prototype.hasQuery = function $goog$Uri$$hasQuery$() {
  return "" !== this.queryData_.toString();
};
goog.Uri.prototype.setQueryData = function $goog$Uri$$setQueryData$(queryData, opt_decode) {
  this.enforceReadOnly();
  queryData instanceof goog.Uri.QueryData ? (this.queryData_ = queryData, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (opt_decode || (queryData = goog.Uri.encodeSpecialChars_(queryData, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(queryData, null, this.ignoreCase_));
  return this;
};
goog.Uri.prototype.getEncodedQuery = function $goog$Uri$$getEncodedQuery$() {
  return this.queryData_.toString();
};
goog.Uri.prototype.getDecodedQuery = function $goog$Uri$$getDecodedQuery$() {
  return this.queryData_.toDecodedString();
};
goog.Uri.prototype.getQueryData = function $goog$Uri$$getQueryData$() {
  return this.queryData_;
};
goog.Uri.prototype.setParameterValue = function $goog$Uri$$setParameterValue$(key, value) {
  this.enforceReadOnly();
  this.queryData_.set(key, value);
  return this;
};
goog.Uri.prototype.setParameterValues = function $goog$Uri$$setParameterValues$(key, values) {
  this.enforceReadOnly();
  goog.isArray(values) || (values = [String(values)]);
  this.queryData_.setValues(key, values);
  return this;
};
goog.Uri.prototype.getFragment = function $goog$Uri$$getFragment$() {
  return this.fragment_;
};
goog.Uri.prototype.setFragment = function $goog$Uri$$setFragment$(newFragment, opt_decode) {
  this.enforceReadOnly();
  this.fragment_ = opt_decode ? goog.Uri.decodeOrEmpty_(newFragment) : newFragment;
  return this;
};
goog.Uri.prototype.hasFragment = function $goog$Uri$$hasFragment$() {
  return!!this.fragment_;
};
goog.Uri.prototype.makeUnique = function $goog$Uri$$makeUnique$() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this;
};
goog.Uri.prototype.enforceReadOnly = function $goog$Uri$$enforceReadOnly$() {
  if (this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function $goog$Uri$$setIgnoreCase$(ignoreCase) {
  this.ignoreCase_ = ignoreCase;
  this.queryData_ && this.queryData_.setIgnoreCase(ignoreCase);
  return this;
};
goog.Uri.prototype.getIgnoreCase = function $goog$Uri$$getIgnoreCase$() {
  return this.ignoreCase_;
};
goog.Uri.parse = function $goog$Uri$parse$(uri, opt_ignoreCase) {
  return uri instanceof goog.Uri ? uri.clone() : new goog.Uri(uri, opt_ignoreCase);
};
goog.Uri.create = function $goog$Uri$create$(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_query, opt_fragment, opt_ignoreCase) {
  var uri = new goog.Uri(null, opt_ignoreCase);
  opt_scheme && uri.setScheme(opt_scheme);
  opt_userInfo && uri.setUserInfo(opt_userInfo);
  opt_domain && uri.setDomain(opt_domain);
  opt_port && uri.setPort(opt_port);
  opt_path && uri.setPath(opt_path);
  opt_query && uri.setQueryData(opt_query);
  opt_fragment && uri.setFragment(opt_fragment);
  return uri;
};
goog.Uri.resolve = function $goog$Uri$resolve$(base, rel) {
  base instanceof goog.Uri || (base = goog.Uri.parse(base));
  rel instanceof goog.Uri || (rel = goog.Uri.parse(rel));
  return base.resolve(rel);
};
goog.Uri.removeDotSegments = function $goog$Uri$removeDotSegments$(path) {
  if (".." == path || "." == path) {
    return "";
  }
  if (goog.string.contains(path, "./") || goog.string.contains(path, "/.")) {
    for (var leadingSlash = goog.string.startsWith(path, "/"), segments = path.split("/"), out = [], pos = 0;pos < segments.length;) {
      var segment = segments[pos++];
      "." == segment ? leadingSlash && pos == segments.length && out.push("") : ".." == segment ? ((1 < out.length || 1 == out.length && "" != out[0]) && out.pop(), leadingSlash && pos == segments.length && out.push("")) : (out.push(segment), leadingSlash = !0);
    }
    return out.join("/");
  }
  return path;
};
goog.Uri.decodeOrEmpty_ = function $goog$Uri$decodeOrEmpty_$(val) {
  return val ? decodeURIComponent(val) : "";
};
goog.Uri.encodeSpecialChars_ = function $goog$Uri$encodeSpecialChars_$(unescapedPart, extra) {
  return goog.isString(unescapedPart) ? encodeURI(unescapedPart).replace(extra, goog.Uri.encodeChar_) : null;
};
goog.Uri.encodeChar_ = function $goog$Uri$encodeChar_$(ch) {
  var n = ch.charCodeAt(0);
  return "%" + (n >> 4 & 15).toString(16) + (n & 15).toString(16);
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function $goog$Uri$haveSameDomain$(uri1String, uri2String) {
  var pieces1 = goog.uri.utils.split(uri1String), pieces2 = goog.uri.utils.split(uri2String);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.Uri.QueryData = function $goog$Uri$QueryData$(opt_query, opt_uri, opt_ignoreCase) {
  this.encodedQuery_ = opt_query || null;
  this.ignoreCase_ = !!opt_ignoreCase;
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function $goog$Uri$QueryData$$ensureKeyMapInitialized_$() {
  if (!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
    for (var pairs = this.encodedQuery_.split("&"), i = 0;i < pairs.length;i++) {
      var indexOfEquals = pairs[i].indexOf("="), name = null, value = null;
      0 <= indexOfEquals ? (name = pairs[i].substring(0, indexOfEquals), value = pairs[i].substring(indexOfEquals + 1)) : name = pairs[i];
      name = goog.string.urlDecode(name);
      name = this.getKeyName_(name);
      this.add(name, value ? goog.string.urlDecode(value) : "");
    }
  }
};
goog.Uri.QueryData.createFromMap = function $goog$Uri$QueryData$createFromMap$(map, opt_uri, opt_ignoreCase) {
  var keys = goog.structs.getKeys(map);
  if ("undefined" == typeof keys) {
    throw Error("Keys are undefined");
  }
  for (var queryData = new goog.Uri.QueryData(null, null, opt_ignoreCase), values = goog.structs.getValues(map), i = 0;i < keys.length;i++) {
    var key = keys[i], value = values[i];
    goog.isArray(value) ? queryData.setValues(key, value) : queryData.add(key, value);
  }
  return queryData;
};
goog.Uri.QueryData.createFromKeysValues = function $goog$Uri$QueryData$createFromKeysValues$(keys, values, opt_uri, opt_ignoreCase) {
  if (keys.length != values.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  for (var queryData = new goog.Uri.QueryData(null, null, opt_ignoreCase), i = 0;i < keys.length;i++) {
    queryData.add(keys[i], values[i]);
  }
  return queryData;
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.prototype.getCount = function $goog$Uri$QueryData$$getCount$() {
  this.ensureKeyMapInitialized_();
  return this.count_;
};
goog.Uri.QueryData.prototype.add = function $goog$Uri$QueryData$$add$(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  var values = this.keyMap_.get(key);
  values || this.keyMap_.set(key, values = []);
  values.push(value);
  this.count_++;
  return this;
};
goog.Uri.QueryData.prototype.remove = function $goog$Uri$QueryData$$remove$(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.containsKey(key) ? (this.invalidateCache_(), this.count_ -= this.keyMap_.get(key).length, this.keyMap_.remove(key)) : !1;
};
goog.Uri.QueryData.prototype.clear = function $goog$Uri$QueryData$$clear$() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0;
};
goog.Uri.QueryData.prototype.isEmpty = function $goog$Uri$QueryData$$isEmpty$() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_;
};
goog.Uri.QueryData.prototype.containsKey = function $goog$Uri$QueryData$$containsKey$(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.containsKey(key);
};
goog.Uri.QueryData.prototype.containsValue = function $goog$Uri$QueryData$$containsValue$(value) {
  var vals = this.getValues();
  return goog.array.contains(vals, value);
};
goog.Uri.QueryData.prototype.getKeys = function $goog$Uri$QueryData$$getKeys$() {
  this.ensureKeyMapInitialized_();
  for (var vals = this.keyMap_.getValues(), keys = this.keyMap_.getKeys(), rv = [], i = 0;i < keys.length;i++) {
    for (var val = vals[i], j = 0;j < val.length;j++) {
      rv.push(keys[i]);
    }
  }
  return rv;
};
goog.Uri.QueryData.prototype.getValues = function $goog$Uri$QueryData$$getValues$(opt_key) {
  this.ensureKeyMapInitialized_();
  var rv = [];
  if (goog.isString(opt_key)) {
    this.containsKey(opt_key) && (rv = goog.array.concat(rv, this.keyMap_.get(this.getKeyName_(opt_key))));
  } else {
    for (var values = this.keyMap_.getValues(), i = 0;i < values.length;i++) {
      rv = goog.array.concat(rv, values[i]);
    }
  }
  return rv;
};
goog.Uri.QueryData.prototype.set = function $goog$Uri$QueryData$$set$(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  this.containsKey(key) && (this.count_ -= this.keyMap_.get(key).length);
  this.keyMap_.set(key, [value]);
  this.count_++;
  return this;
};
goog.Uri.QueryData.prototype.get = function $goog$Uri$QueryData$$get$(key, opt_default) {
  var values = key ? this.getValues(key) : [];
  return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < values.length ? values[0] : opt_default : 0 < values.length ? String(values[0]) : opt_default;
};
goog.Uri.QueryData.prototype.setValues = function $goog$Uri$QueryData$$setValues$(key, values) {
  this.remove(key);
  0 < values.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(key), goog.array.clone(values)), this.count_ += values.length);
};
goog.Uri.QueryData.prototype.toString = function $goog$Uri$QueryData$$toString$() {
  if (this.encodedQuery_) {
    return this.encodedQuery_;
  }
  if (!this.keyMap_) {
    return "";
  }
  for (var sb = [], keys = this.keyMap_.getKeys(), i = 0;i < keys.length;i++) {
    for (var key = keys[i], encodedKey = goog.string.urlEncode(key), val = this.getValues(key), j = 0;j < val.length;j++) {
      var param = encodedKey;
      "" !== val[j] && (param += "=" + goog.string.urlEncode(val[j]));
      sb.push(param);
    }
  }
  return this.encodedQuery_ = sb.join("&");
};
goog.Uri.QueryData.prototype.toDecodedString = function $goog$Uri$QueryData$$toDecodedString$() {
  return goog.Uri.decodeOrEmpty_(this.toString());
};
goog.Uri.QueryData.prototype.invalidateCache_ = function $goog$Uri$QueryData$$invalidateCache_$() {
  this.encodedQuery_ = null;
};
goog.Uri.QueryData.prototype.clone = function $goog$Uri$QueryData$$clone$() {
  var rv = new goog.Uri.QueryData;
  rv.encodedQuery_ = this.encodedQuery_;
  this.keyMap_ && (rv.keyMap_ = this.keyMap_.clone(), rv.count_ = this.count_);
  return rv;
};
goog.Uri.QueryData.prototype.getKeyName_ = function $goog$Uri$QueryData$$getKeyName_$(arg) {
  var keyName = String(arg);
  this.ignoreCase_ && (keyName = keyName.toLowerCase());
  return keyName;
};
goog.Uri.QueryData.prototype.setIgnoreCase = function $goog$Uri$QueryData$$setIgnoreCase$(ignoreCase) {
  var resetKeys = ignoreCase && !this.ignoreCase_;
  resetKeys && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function(value, key) {
    var lowerCase = key.toLowerCase();
    key != lowerCase && (this.remove(key), this.setValues(lowerCase, value));
  }, this));
  this.ignoreCase_ = ignoreCase;
};
goog.Uri.QueryData.prototype.extend = function $goog$Uri$QueryData$$extend$(var_args) {
  for (var i = 0;i < arguments.length;i++) {
    var data = arguments[i];
    goog.structs.forEach(data, function(value, key) {
      this.add(key, value);
    }, this);
  }
};
goog.async = {};
goog.async.throwException = function $goog$async$throwException$(exception) {
  goog.global.setTimeout(function() {
    throw exception;
  }, 0);
};
goog.async.nextTick = function $goog$async$nextTick$(callback, opt_context) {
  var cb = callback;
  opt_context && (cb = goog.bind(callback, opt_context));
  cb = goog.async.nextTick.wrapCallback_(cb);
  goog.isFunction(goog.global.setImmediate) ? goog.global.setImmediate(cb) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(cb));
};
goog.async.nextTick.getSetImmediateEmulator_ = function $goog$async$nextTick$getSetImmediateEmulator_$() {
  var Channel = goog.global.MessageChannel;
  "undefined" === typeof Channel && "undefined" !== typeof window && window.postMessage && window.addEventListener && (Channel = function $Channel$() {
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "";
    document.documentElement.appendChild(iframe);
    var win = iframe.contentWindow, doc = win.document;
    doc.open();
    doc.write("");
    doc.close();
    var message = "callImmediate" + Math.random(), origin = "file:" == win.location.protocol ? "*" : win.location.protocol + "//" + win.location.host, onmessage = goog.bind(function(e) {
      if (e.origin == origin || e.data == message) {
        this.port1.onmessage();
      }
    }, this);
    win.addEventListener("message", onmessage, !1);
    this.port1 = {};
    this.port2 = {postMessage:function $this$port2$postMessage$() {
      win.postMessage(message, origin);
    }};
  });
  if ("undefined" !== typeof Channel) {
    var channel = new Channel, head = {}, tail = head;
    channel.port1.onmessage = function $channel$port1$onmessage$() {
      head = head.next;
      var cb = head.cb;
      head.cb = null;
      cb();
    };
    return function(cb) {
      tail.next = {cb:cb};
      tail = tail.next;
      channel.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(cb) {
    var script = document.createElement("script");
    script.onreadystatechange = function $script$onreadystatechange$() {
      script.onreadystatechange = null;
      script.parentNode.removeChild(script);
      script = null;
      cb();
      cb = null;
    };
    document.documentElement.appendChild(script);
  } : function(cb) {
    goog.global.setTimeout(cb, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.async.nextTick.wrapCallback_ = transformer;
});
goog.testing = {};
goog.testing.watchers = {};
goog.testing.watchers.resetWatchers_ = [];
goog.testing.watchers.signalClockReset = function $goog$testing$watchers$signalClockReset$() {
  for (var watchers = goog.testing.watchers.resetWatchers_, i = 0;i < watchers.length;i++) {
    goog.testing.watchers.resetWatchers_[i]();
  }
};
goog.testing.watchers.watchClockReset = function $goog$testing$watchers$watchClockReset$(fn) {
  goog.testing.watchers.resetWatchers_.push(fn);
};
goog.async.run = function $goog$async$run$(callback, opt_context) {
  goog.async.run.schedule_ || goog.async.run.initializeRunner_();
  goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
  goog.async.run.workQueue_.push(new goog.async.run.WorkItem_(callback, opt_context));
};
goog.async.run.initializeRunner_ = function $goog$async$run$initializeRunner_$() {
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var promise = goog.global.Promise.resolve();
    goog.async.run.schedule_ = function $goog$async$run$schedule_$() {
      promise.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function $goog$async$run$schedule_$() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};
goog.async.run.forceNextTick = function $goog$async$run$forceNextTick$() {
  goog.async.run.schedule_ = function $goog$async$run$schedule_$() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
  };
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = [];
goog.DEBUG && (goog.async.run.resetQueue_ = function $goog$async$run$resetQueue_$() {
  goog.async.run.workQueueScheduled_ = !1;
  goog.async.run.workQueue_ = [];
}, goog.testing.watchers.watchClockReset(goog.async.run.resetQueue_));
goog.async.run.processWorkQueue = function $goog$async$run$processWorkQueue$() {
  for (;goog.async.run.workQueue_.length;) {
    var workItems = goog.async.run.workQueue_;
    goog.async.run.workQueue_ = [];
    for (var i = 0;i < workItems.length;i++) {
      var workItem = workItems[i];
      try {
        workItem.fn.call(workItem.scope);
      } catch (e) {
        goog.async.throwException(e);
      }
    }
  }
  goog.async.run.workQueueScheduled_ = !1;
};
goog.async.run.WorkItem_ = function $goog$async$run$WorkItem_$(fn, scope) {
  this.fn = fn;
  this.scope = scope;
};
goog.promise = {};
goog.promise.Resolver = function $goog$promise$Resolver$() {
};
goog.Thenable = function $goog$Thenable$() {
};
goog.Thenable.prototype.then = function $goog$Thenable$$then$() {
};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function $goog$Thenable$addImplementation$(ctor) {
  goog.exportProperty(ctor.prototype, "then", ctor.prototype.then);
  ctor.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.Thenable.isImplementedBy = function $goog$Thenable$isImplementedBy$(object) {
  if (!object) {
    return!1;
  }
  try {
    return!!object[goog.Thenable.IMPLEMENTED_BY_PROP];
  } catch (e) {
    return!1;
  }
};
goog.Promise = function $goog$Promise$(resolver, opt_context) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = void 0;
  this.callbackEntries_ = this.parent_ = null;
  this.executing_ = !1;
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
  goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
  try {
    var self = this;
    resolver.call(opt_context, function(value) {
      self.resolve_(goog.Promise.State_.FULFILLED, value);
    }, function(reason) {
      self.resolve_(goog.Promise.State_.REJECTED, reason);
    });
  } catch (e) {
    this.resolve_(goog.Promise.State_.REJECTED, e);
  }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.resolve = function $goog$Promise$resolve$(opt_value) {
  return new goog.Promise(function(resolve) {
    resolve(opt_value);
  });
};
goog.Promise.reject = function $goog$Promise$reject$(opt_reason) {
  return new goog.Promise(function(resolve, reject) {
    reject(opt_reason);
  });
};
goog.Promise.race = function $goog$Promise$race$(promises) {
  return new goog.Promise(function(resolve, reject) {
    promises.length || resolve(void 0);
    for (var i = 0, promise;promise = promises[i];i++) {
      promise.then(resolve, reject);
    }
  });
};
goog.Promise.all = function $goog$Promise$all$(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toFulfill = promises.length, values = [];
    if (toFulfill) {
      for (var onFulfill = function $onFulfill$(index, value) {
        toFulfill--;
        values[index] = value;
        0 == toFulfill && resolve(values);
      }, onReject = function $onReject$(reason) {
        reject(reason);
      }, i = 0, promise;promise = promises[i];i++) {
        promise.then(goog.partial(onFulfill, i), onReject);
      }
    } else {
      resolve(values);
    }
  });
};
goog.Promise.firstFulfilled = function $goog$Promise$firstFulfilled$(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toReject = promises.length, reasons = [];
    if (toReject) {
      for (var onFulfill = function $onFulfill$(value) {
        resolve(value);
      }, onReject = function $onReject$(index, reason) {
        toReject--;
        reasons[index] = reason;
        0 == toReject && reject(reasons);
      }, i = 0, promise;promise = promises[i];i++) {
        promise.then(onFulfill, goog.partial(onReject, i));
      }
    } else {
      resolve(void 0);
    }
  });
};
goog.Promise.withResolver = function $goog$Promise$withResolver$() {
  var resolve, reject, promise = new goog.Promise(function(rs, rj) {
    resolve = rs;
    reject = rj;
  });
  return new goog.Promise.Resolver_(promise, resolve, reject);
};
goog.Promise.prototype.then = function $goog$Promise$$then$(opt_onFulfilled, opt_onRejected, opt_context) {
  null != opt_onFulfilled && goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  null != opt_onRejected && goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  return this.addChildPromise_(goog.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, goog.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.cancel = function $goog$Promise$$cancel$(opt_message) {
  this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
    var err = new goog.Promise.CancellationError(opt_message);
    this.cancelInternal_(err);
  }, this);
};
goog.Promise.prototype.cancelInternal_ = function $goog$Promise$$cancelInternal_$(err) {
  this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? this.parent_.cancelChild_(this, err) : this.resolve_(goog.Promise.State_.REJECTED, err));
};
goog.Promise.prototype.cancelChild_ = function $goog$Promise$$cancelChild_$(childPromise, err) {
  if (this.callbackEntries_) {
    for (var childCount = 0, childIndex = -1, i = 0, entry;entry = this.callbackEntries_[i];i++) {
      var child = entry.child;
      if (child && (childCount++, child == childPromise && (childIndex = i), 0 <= childIndex && 1 < childCount)) {
        break;
      }
    }
    if (0 <= childIndex) {
      if (this.state_ == goog.Promise.State_.PENDING && 1 == childCount) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, goog.Promise.State_.REJECTED, err);
      }
    }
  }
};
goog.Promise.prototype.addCallbackEntry_ = function $goog$Promise$$addCallbackEntry_$(callbackEntry) {
  this.callbackEntries_ && this.callbackEntries_.length || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
  this.callbackEntries_ || (this.callbackEntries_ = []);
  this.callbackEntries_.push(callbackEntry);
};
goog.Promise.prototype.addChildPromise_ = function $goog$Promise$$addChildPromise_$(onFulfilled, onRejected, opt_context) {
  var callbackEntry = {child:null, onFulfilled:null, onRejected:null};
  callbackEntry.child = new goog.Promise(function(resolve, reject) {
    callbackEntry.onFulfilled = onFulfilled ? function(value) {
      try {
        var result = onFulfilled.call(opt_context, value);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } : resolve;
    callbackEntry.onRejected = onRejected ? function(reason) {
      try {
        var result = onRejected.call(opt_context, reason);
        !goog.isDef(result) && reason instanceof goog.Promise.CancellationError ? reject(reason) : resolve(result);
      } catch (err) {
        reject(err);
      }
    } : reject;
  });
  callbackEntry.child.parent_ = this;
  this.addCallbackEntry_(callbackEntry);
  return callbackEntry.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function $goog$Promise$$unblockAndFulfill_$(value) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, value);
};
goog.Promise.prototype.unblockAndReject_ = function $goog$Promise$$unblockAndReject_$(reason) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, reason);
};
goog.Promise.prototype.resolve_ = function $goog$Promise$$resolve_$(state, x) {
  if (this.state_ == goog.Promise.State_.PENDING) {
    if (this == x) {
      state = goog.Promise.State_.REJECTED, x = new TypeError("Promise cannot resolve to itself");
    } else {
      if (goog.Thenable.isImplementedBy(x)) {
        this.state_ = goog.Promise.State_.BLOCKED;
        x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
        return;
      }
      if (goog.isObject(x)) {
        try {
          var then = x.then;
          if (goog.isFunction(then)) {
            this.tryThen_(x, then);
            return;
          }
        } catch (e) {
          state = goog.Promise.State_.REJECTED, x = e;
        }
      }
    }
    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();
    state != goog.Promise.State_.REJECTED || x instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, x);
  }
};
goog.Promise.prototype.tryThen_ = function $goog$Promise$$tryThen_$(thenable, then) {
  this.state_ = goog.Promise.State_.BLOCKED;
  var promise = this, called = !1, resolve = function $resolve$(value) {
    called || (called = !0, promise.unblockAndFulfill_(value));
  }, reject = function $reject$(reason) {
    called || (called = !0, promise.unblockAndReject_(reason));
  };
  try {
    then.call(thenable, resolve, reject);
  } catch (e) {
    reject(e);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function $goog$Promise$$scheduleCallbacks_$() {
  this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this));
};
goog.Promise.prototype.executeCallbacks_ = function $goog$Promise$$executeCallbacks_$() {
  for (;this.callbackEntries_ && this.callbackEntries_.length;) {
    var entries = this.callbackEntries_;
    this.callbackEntries_ = [];
    for (var i = 0;i < entries.length;i++) {
      goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(entries[i], this.state_, this.result_);
    }
  }
  this.executing_ = !1;
};
goog.Promise.prototype.executeCallback_ = function $goog$Promise$$executeCallback_$(callbackEntry, state, result) {
  if (state == goog.Promise.State_.FULFILLED) {
    callbackEntry.onFulfilled(result);
  } else {
    this.removeUnhandledRejection_(), callbackEntry.onRejected(result);
  }
};
goog.Promise.prototype.addStackTrace_ = function $goog$Promise$$addStackTrace_$(err) {
  if (goog.Promise.LONG_STACK_TRACES && goog.isString(err.stack)) {
    var trace = err.stack.split("\n", 4)[3], message = err.message, message = message + Array(11 - message.length).join(" ");
    this.stack_.push(message + trace);
  }
};
goog.Promise.prototype.appendLongStack_ = function $goog$Promise$$appendLongStack_$(err) {
  if (goog.Promise.LONG_STACK_TRACES && err && goog.isString(err.stack) && this.stack_.length) {
    for (var longTrace = ["Promise trace:"], promise = this;promise;promise = promise.parent_) {
      for (var i = this.currentStep_;0 <= i;i--) {
        longTrace.push(promise.stack_[i]);
      }
      longTrace.push("Value: [" + (promise.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(promise.result_) + ">");
    }
    err.stack += "\n\n" + longTrace.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function $goog$Promise$$removeUnhandledRejection_$() {
  if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY) {
    for (var p = this;p && p.unhandledRejectionId_;p = p.parent_) {
      goog.global.clearTimeout(p.unhandledRejectionId_), p.unhandledRejectionId_ = 0;
    }
  } else {
    if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY) {
      for (p = this;p && p.hadUnhandledRejection_;p = p.parent_) {
        p.hadUnhandledRejection_ = !1;
      }
    }
  }
};
goog.Promise.addUnhandledRejection_ = function $goog$Promise$addUnhandledRejection_$(promise, reason) {
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? promise.unhandledRejectionId_ = goog.global.setTimeout(function() {
    promise.appendLongStack_(reason);
    goog.Promise.handleRejection_.call(null, reason);
  }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (promise.hadUnhandledRejection_ = !0, goog.async.run(function() {
    promise.hadUnhandledRejection_ && (promise.appendLongStack_(reason), goog.Promise.handleRejection_.call(null, reason));
  }));
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function $goog$Promise$setUnhandledRejectionHandler$(handler) {
  goog.Promise.handleRejection_ = handler;
};
goog.Promise.CancellationError = function $goog$Promise$CancellationError$(opt_message) {
  goog.debug.Error.call(this, opt_message);
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function $goog$Promise$Resolver_$(promise, resolve, reject) {
  this.promise = promise;
  this.resolve = resolve;
  this.reject = reject;
};
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
goog.async.Deferred = function $goog$async$Deferred$(opt_onCancelFunction, opt_defaultScope) {
  this.sequence_ = [];
  this.onCancelFunction_ = opt_onCancelFunction;
  this.defaultScope_ = opt_defaultScope || null;
  this.hadError_ = this.fired_ = !1;
  this.result_ = void 0;
  this.silentlyCanceled_ = this.blocking_ = this.blocked_ = !1;
  this.unhandledErrorId_ = 0;
  this.parent_ = null;
  this.branches_ = 0;
  if (goog.async.Deferred.LONG_STACK_TRACES && (this.constructorStack_ = null, Error.captureStackTrace)) {
    var target = {stack:""};
    Error.captureStackTrace(target, goog.async.Deferred);
    "string" == typeof target.stack && (this.constructorStack_ = target.stack.replace(/^[^\n]*\n/, ""));
  }
};
goog.async.Deferred.STRICT_ERRORS = !1;
goog.async.Deferred.LONG_STACK_TRACES = !1;
goog.async.Deferred.prototype.cancel = function $goog$async$Deferred$$cancel$(opt_deepCancel) {
  if (this.hasFired()) {
    this.result_ instanceof goog.async.Deferred && this.result_.cancel();
  } else {
    if (this.parent_) {
      var parent = this.parent_;
      delete this.parent_;
      opt_deepCancel ? parent.cancel(opt_deepCancel) : parent.branchCancel_();
    }
    this.onCancelFunction_ ? this.onCancelFunction_.call(this.defaultScope_, this) : this.silentlyCanceled_ = !0;
    this.hasFired() || this.errback(new goog.async.Deferred.CanceledError(this));
  }
};
goog.async.Deferred.prototype.branchCancel_ = function $goog$async$Deferred$$branchCancel_$() {
  this.branches_--;
  0 >= this.branches_ && this.cancel();
};
goog.async.Deferred.prototype.continue_ = function $goog$async$Deferred$$continue_$(isSuccess, res) {
  this.blocked_ = !1;
  this.updateResult_(isSuccess, res);
};
goog.async.Deferred.prototype.updateResult_ = function $goog$async$Deferred$$updateResult_$(isSuccess, res) {
  this.fired_ = !0;
  this.result_ = res;
  this.hadError_ = !isSuccess;
  this.fire_();
};
goog.async.Deferred.prototype.check_ = function $goog$async$Deferred$$check_$() {
  if (this.hasFired()) {
    if (!this.silentlyCanceled_) {
      throw new goog.async.Deferred.AlreadyCalledError(this);
    }
    this.silentlyCanceled_ = !1;
  }
};
goog.async.Deferred.prototype.callback = function $goog$async$Deferred$$callback$(opt_result) {
  this.check_();
  this.assertNotDeferred_(opt_result);
  this.updateResult_(!0, opt_result);
};
goog.async.Deferred.prototype.errback = function $goog$async$Deferred$$errback$(opt_result) {
  this.check_();
  this.assertNotDeferred_(opt_result);
  this.makeStackTraceLong_(opt_result);
  this.updateResult_(!1, opt_result);
};
goog.async.Deferred.prototype.makeStackTraceLong_ = function $goog$async$Deferred$$makeStackTraceLong_$(error) {
  goog.async.Deferred.LONG_STACK_TRACES && this.constructorStack_ && goog.isObject(error) && error.stack && /^[^\n]+(\n   [^\n]+)+/.test(error.stack) && (error.stack = error.stack + "\nDEFERRED OPERATION:\n" + this.constructorStack_);
};
goog.async.Deferred.prototype.assertNotDeferred_ = function $goog$async$Deferred$$assertNotDeferred_$(obj) {
  goog.asserts.assert(!(obj instanceof goog.async.Deferred), "An execution sequence may not be initiated with a blocking Deferred.");
};
goog.async.Deferred.prototype.addCallback = function $goog$async$Deferred$$addCallback$(cb, opt_scope) {
  return this.addCallbacks(cb, null, opt_scope);
};
goog.async.Deferred.prototype.addErrback = function $goog$async$Deferred$$addErrback$(eb, opt_scope) {
  return this.addCallbacks(null, eb, opt_scope);
};
goog.async.Deferred.prototype.addBoth = function $goog$async$Deferred$$addBoth$(f, opt_scope) {
  return this.addCallbacks(f, f, opt_scope);
};
goog.async.Deferred.prototype.addCallbacks = function $goog$async$Deferred$$addCallbacks$(cb, eb, opt_scope) {
  goog.asserts.assert(!this.blocking_, "Blocking Deferreds can not be re-used");
  this.sequence_.push([cb, eb, opt_scope]);
  this.hasFired() && this.fire_();
  return this;
};
goog.async.Deferred.prototype.then = function $goog$async$Deferred$$then$(opt_onFulfilled, opt_onRejected, opt_context) {
  var resolve, reject, promise = new goog.Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });
  this.addCallbacks(resolve, function(reason) {
    reason instanceof goog.async.Deferred.CanceledError ? promise.cancel() : reject(reason);
  });
  return promise.then(opt_onFulfilled, opt_onRejected, opt_context);
};
goog.Thenable.addImplementation(goog.async.Deferred);
goog.async.Deferred.prototype.chainDeferred = function $goog$async$Deferred$$chainDeferred$(otherDeferred) {
  this.addCallbacks(otherDeferred.callback, otherDeferred.errback, otherDeferred);
  return this;
};
goog.async.Deferred.prototype.branch = function $goog$async$Deferred$$branch$(opt_propagateCancel) {
  var d = new goog.async.Deferred;
  this.chainDeferred(d);
  opt_propagateCancel && (d.parent_ = this, this.branches_++);
  return d;
};
goog.async.Deferred.prototype.hasFired = function $goog$async$Deferred$$hasFired$() {
  return this.fired_;
};
goog.async.Deferred.prototype.isError = function $goog$async$Deferred$$isError$(res) {
  return res instanceof Error;
};
goog.async.Deferred.prototype.hasErrback_ = function $goog$async$Deferred$$hasErrback_$() {
  return goog.array.some(this.sequence_, function(sequenceRow) {
    return goog.isFunction(sequenceRow[1]);
  });
};
goog.async.Deferred.prototype.fire_ = function $goog$async$Deferred$$fire_$() {
  this.unhandledErrorId_ && this.hasFired() && this.hasErrback_() && (goog.async.Deferred.unscheduleError_(this.unhandledErrorId_), this.unhandledErrorId_ = 0);
  this.parent_ && (this.parent_.branches_--, delete this.parent_);
  for (var res = this.result_, unhandledException = !1, isNewlyBlocked = !1;this.sequence_.length && !this.blocked_;) {
    var sequenceEntry = this.sequence_.shift(), callback = sequenceEntry[0], errback = sequenceEntry[1], scope = sequenceEntry[2], f = this.hadError_ ? errback : callback;
    if (f) {
      try {
        var ret = f.call(scope || this.defaultScope_, res);
        goog.isDef(ret) && (this.hadError_ = this.hadError_ && (ret == res || this.isError(ret)), this.result_ = res = ret);
        goog.Thenable.isImplementedBy(res) && (this.blocked_ = isNewlyBlocked = !0);
      } catch (ex) {
        res = ex, this.hadError_ = !0, this.makeStackTraceLong_(res), this.hasErrback_() || (unhandledException = !0);
      }
    }
  }
  this.result_ = res;
  if (isNewlyBlocked) {
    var onCallback = goog.bind(this.continue_, this, !0), onErrback = goog.bind(this.continue_, this, !1);
    res instanceof goog.async.Deferred ? (res.addCallbacks(onCallback, onErrback), res.blocking_ = !0) : res.then(onCallback, onErrback);
  } else {
    !goog.async.Deferred.STRICT_ERRORS || !this.isError(res) || res instanceof goog.async.Deferred.CanceledError || (unhandledException = this.hadError_ = !0);
  }
  unhandledException && (this.unhandledErrorId_ = goog.async.Deferred.scheduleError_(res));
};
goog.async.Deferred.succeed = function $goog$async$Deferred$succeed$(opt_result) {
  var d = new goog.async.Deferred;
  d.callback(opt_result);
  return d;
};
goog.async.Deferred.fromPromise = function $goog$async$Deferred$fromPromise$(promise) {
  var d = new goog.async.Deferred;
  d.callback();
  d.addCallback(function() {
    return promise;
  });
  return d;
};
goog.async.Deferred.fail = function $goog$async$Deferred$fail$(res) {
  var d = new goog.async.Deferred;
  d.errback(res);
  return d;
};
goog.async.Deferred.canceled = function $goog$async$Deferred$canceled$() {
  var d = new goog.async.Deferred;
  d.cancel();
  return d;
};
goog.async.Deferred.when = function $goog$async$Deferred$when$(value, callback, opt_scope) {
  return value instanceof goog.async.Deferred ? value.branch(!0).addCallback(callback, opt_scope) : goog.async.Deferred.succeed(value).addCallback(callback, opt_scope);
};
goog.async.Deferred.AlreadyCalledError = function $goog$async$Deferred$AlreadyCalledError$() {
  goog.debug.Error.call(this);
};
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error);
goog.async.Deferred.AlreadyCalledError.prototype.message = "Deferred has already fired";
goog.async.Deferred.AlreadyCalledError.prototype.name = "AlreadyCalledError";
goog.async.Deferred.CanceledError = function $goog$async$Deferred$CanceledError$() {
  goog.debug.Error.call(this);
};
goog.inherits(goog.async.Deferred.CanceledError, goog.debug.Error);
goog.async.Deferred.CanceledError.prototype.message = "Deferred was canceled";
goog.async.Deferred.CanceledError.prototype.name = "CanceledError";
goog.async.Deferred.Error_ = function $goog$async$Deferred$Error_$(error) {
  this.id_ = goog.global.setTimeout(goog.bind(this.throwError, this), 0);
  this.error_ = error;
};
goog.async.Deferred.Error_.prototype.throwError = function $goog$async$Deferred$Error_$$throwError$() {
  goog.asserts.assert(goog.async.Deferred.errorMap_[this.id_], "Cannot throw an error that is not scheduled.");
  delete goog.async.Deferred.errorMap_[this.id_];
  throw this.error_;
};
goog.async.Deferred.Error_.prototype.resetTimer = function $goog$async$Deferred$Error_$$resetTimer$() {
  goog.global.clearTimeout(this.id_);
};
goog.async.Deferred.errorMap_ = {};
goog.async.Deferred.scheduleError_ = function $goog$async$Deferred$scheduleError_$(error) {
  var deferredError = new goog.async.Deferred.Error_(error);
  goog.async.Deferred.errorMap_[deferredError.id_] = deferredError;
  return deferredError.id_;
};
goog.async.Deferred.unscheduleError_ = function $goog$async$Deferred$unscheduleError_$(id) {
  var error = goog.async.Deferred.errorMap_[id];
  error && (error.resetTimer(), delete goog.async.Deferred.errorMap_[id]);
};
goog.async.Deferred.assertNoErrors = function $goog$async$Deferred$assertNoErrors$() {
  var map = goog.async.Deferred.errorMap_, key;
  for (key in map) {
    var error = map[key];
    error.resetTimer();
    error.throwError();
  }
};
goog.net = {};
goog.net.jsloader = {};
goog.net.jsloader.GLOBAL_VERIFY_OBJS_ = "closure_verification";
goog.net.jsloader.DEFAULT_TIMEOUT = 5E3;
goog.net.jsloader.scriptsToLoad_ = [];
goog.net.jsloader.loadMany = function $goog$net$jsloader$loadMany$(uris, opt_options) {
  if (uris.length) {
    var isAnotherModuleLoading = goog.net.jsloader.scriptsToLoad_.length;
    goog.array.extend(goog.net.jsloader.scriptsToLoad_, uris);
    if (!isAnotherModuleLoading) {
      uris = goog.net.jsloader.scriptsToLoad_;
      var popAndLoadNextScript = function $popAndLoadNextScript$() {
        var uri = uris.shift(), deferred = goog.net.jsloader.load(uri, opt_options);
        uris.length && deferred.addBoth(popAndLoadNextScript);
      };
      popAndLoadNextScript();
    }
  }
};
goog.net.jsloader.load = function $goog$net$jsloader$load$(uri, opt_options) {
  var options = opt_options || {}, doc = options.document || document, script = goog.dom.createElement(goog.dom.TagName.SCRIPT), request = {script_:script, timeout_:void 0}, deferred = new goog.async.Deferred(goog.net.jsloader.cancel_, request), timeout = null, timeoutDuration = goog.isDefAndNotNull(options.timeout) ? options.timeout : goog.net.jsloader.DEFAULT_TIMEOUT;
  0 < timeoutDuration && (timeout = window.setTimeout(function() {
    goog.net.jsloader.cleanup_(script, !0);
    deferred.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.TIMEOUT, "Timeout reached for loading script " + uri));
  }, timeoutDuration), request.timeout_ = timeout);
  script.onload = script.onreadystatechange = function $script$onreadystatechange$() {
    if (!script.readyState || "loaded" == script.readyState || "complete" == script.readyState) {
      var removeScriptNode = options.cleanupWhenDone || !1;
      goog.net.jsloader.cleanup_(script, removeScriptNode, timeout);
      deferred.callback(null);
    }
  };
  script.onerror = function $script$onerror$() {
    goog.net.jsloader.cleanup_(script, !0, timeout);
    deferred.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.LOAD_ERROR, "Error while loading script " + uri));
  };
  goog.dom.setProperties(script, {type:"text/javascript", charset:"UTF-8", src:uri});
  var scriptParent = goog.net.jsloader.getScriptParentElement_(doc);
  scriptParent.appendChild(script);
  return deferred;
};
goog.net.jsloader.loadAndVerify = function $goog$net$jsloader$loadAndVerify$(uri, verificationObjName, options) {
  goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] || (goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] = {});
  var verifyObjs = goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_];
  if (goog.isDef(verifyObjs[verificationObjName])) {
    return goog.async.Deferred.fail(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_OBJECT_ALREADY_EXISTS, "Verification object " + verificationObjName + " already defined."));
  }
  var sendDeferred = goog.net.jsloader.load(uri, options), deferred = new goog.async.Deferred(goog.bind(sendDeferred.cancel, sendDeferred));
  sendDeferred.addCallback(function() {
    var result = verifyObjs[verificationObjName];
    goog.isDef(result) ? (deferred.callback(result), delete verifyObjs[verificationObjName]) : deferred.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_ERROR, "Script " + uri + " loaded, but verification object " + verificationObjName + " was not defined."));
  });
  sendDeferred.addErrback(function(error) {
    goog.isDef(verifyObjs[verificationObjName]) && delete verifyObjs[verificationObjName];
    deferred.errback(error);
  });
  return deferred;
};
goog.net.jsloader.getScriptParentElement_ = function $goog$net$jsloader$getScriptParentElement_$(doc) {
  var headElements = doc.getElementsByTagName(goog.dom.TagName.HEAD);
  return!headElements || goog.array.isEmpty(headElements) ? doc.documentElement : headElements[0];
};
goog.net.jsloader.cancel_ = function $goog$net$jsloader$cancel_$() {
  var request = this;
  if (request && request.script_) {
    var scriptNode = request.script_;
    scriptNode && "SCRIPT" == scriptNode.tagName && goog.net.jsloader.cleanup_(scriptNode, !0, request.timeout_);
  }
};
goog.net.jsloader.cleanup_ = function $goog$net$jsloader$cleanup_$(scriptNode, removeScriptNode, opt_timeout) {
  goog.isDefAndNotNull(opt_timeout) && goog.global.clearTimeout(opt_timeout);
  scriptNode.onload = goog.nullFunction;
  scriptNode.onerror = goog.nullFunction;
  scriptNode.onreadystatechange = goog.nullFunction;
  removeScriptNode && window.setTimeout(function() {
    goog.dom.removeNode(scriptNode);
  }, 0);
};
goog.net.jsloader.ErrorCode = {LOAD_ERROR:0, TIMEOUT:1, VERIFY_ERROR:2, VERIFY_OBJECT_ALREADY_EXISTS:3};
goog.net.jsloader.Error = function $goog$net$jsloader$Error$(code, opt_message) {
  var msg = "Jsloader error (code #" + code + ")";
  opt_message && (msg += ": " + opt_message);
  goog.debug.Error.call(this, msg);
  this.code = code;
};
goog.inherits(goog.net.jsloader.Error, goog.debug.Error);
goog.net.Jsonp = function $goog$net$Jsonp$(uri, opt_callbackParamName) {
  this.uri_ = new goog.Uri(uri);
  this.callbackParamName_ = opt_callbackParamName ? opt_callbackParamName : "callback";
  this.timeout_ = 5E3;
};
goog.net.Jsonp.CALLBACKS = "_callbacks_";
goog.net.Jsonp.scriptCounter_ = 0;
goog.net.Jsonp.prototype.send = function $goog$net$Jsonp$$send$(opt_payload, opt_replyCallback, opt_errorCallback, opt_callbackParamValue) {
  var payload = opt_payload || null, id = opt_callbackParamValue || "_" + (goog.net.Jsonp.scriptCounter_++).toString(36) + goog.now().toString(36);
  goog.global[goog.net.Jsonp.CALLBACKS] || (goog.global[goog.net.Jsonp.CALLBACKS] = {});
  var uri = this.uri_.clone();
  payload && goog.net.Jsonp.addPayloadToUri_(payload, uri);
  if (opt_replyCallback) {
    var reply = goog.net.Jsonp.newReplyHandler_(id, opt_replyCallback);
    goog.global[goog.net.Jsonp.CALLBACKS][id] = reply;
    uri.setParameterValues(this.callbackParamName_, goog.net.Jsonp.CALLBACKS + "." + id);
  }
  var deferred = goog.net.jsloader.load(uri.toString(), {timeout:this.timeout_, cleanupWhenDone:!0}), error = goog.net.Jsonp.newErrorHandler_(id, payload, opt_errorCallback);
  deferred.addErrback(error);
  return{id_:id, deferred_:deferred};
};
goog.net.Jsonp.prototype.cancel = function $goog$net$Jsonp$$cancel$(request) {
  request && (request.deferred_ && request.deferred_.cancel(), request.id_ && goog.net.Jsonp.cleanup_(request.id_, !1));
};
goog.net.Jsonp.newErrorHandler_ = function $goog$net$Jsonp$newErrorHandler_$(id, payload, opt_errorCallback) {
  return function() {
    goog.net.Jsonp.cleanup_(id, !1);
    opt_errorCallback && opt_errorCallback(payload);
  };
};
goog.net.Jsonp.newReplyHandler_ = function $goog$net$Jsonp$newReplyHandler_$(id, replyCallback) {
  return function(var_args) {
    goog.net.Jsonp.cleanup_(id, !0);
    replyCallback.apply(void 0, arguments);
  };
};
goog.net.Jsonp.cleanup_ = function $goog$net$Jsonp$cleanup_$(id, deleteReplyHandler) {
  goog.global[goog.net.Jsonp.CALLBACKS][id] && (deleteReplyHandler ? delete goog.global[goog.net.Jsonp.CALLBACKS][id] : goog.global[goog.net.Jsonp.CALLBACKS][id] = goog.nullFunction);
};
goog.net.Jsonp.addPayloadToUri_ = function $goog$net$Jsonp$addPayloadToUri_$(payload, uri) {
  for (var name in payload) {
    payload.hasOwnProperty && !payload.hasOwnProperty(name) || uri.setParameterValues(name, payload[name]);
  }
  return uri;
};
goog.events.EventTarget = function $goog$events$EventTarget$() {
  goog.Disposable.call(this);
  this.eventTargetListeners_ = new goog.events.ListenerMap(this);
  this.actualEventTarget_ = this;
  this.parentEventTarget_ = null;
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function $goog$events$EventTarget$$getParentEventTarget$() {
  return this.parentEventTarget_;
};
goog.events.EventTarget.prototype.addEventListener = function $goog$events$EventTarget$$addEventListener$(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.removeEventListener = function $goog$events$EventTarget$$removeEventListener$(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.dispatchEvent = function $goog$events$EventTarget$$dispatchEvent$(e) {
  this.assertInitialized_();
  var ancestorsTree, ancestor = this.getParentEventTarget();
  if (ancestor) {
    ancestorsTree = [];
    for (var ancestorCount = 1;ancestor;ancestor = ancestor.getParentEventTarget()) {
      ancestorsTree.push(ancestor), goog.asserts.assert(++ancestorCount < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    }
  }
  return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, e, ancestorsTree);
};
goog.events.EventTarget.prototype.disposeInternal = function $goog$events$EventTarget$$disposeInternal$() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  this.removeAllListeners();
  this.parentEventTarget_ = null;
};
goog.events.EventTarget.prototype.listen = function $goog$events$EventTarget$$listen$(type, listener, opt_useCapture, opt_listenerScope) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(String(type), listener, !1, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.listenOnce = function $goog$events$EventTarget$$listenOnce$(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.add(String(type), listener, !0, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlisten = function $goog$events$EventTarget$$unlisten$(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.remove(String(type), listener, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlistenByKey = function $goog$events$EventTarget$$unlistenByKey$(key) {
  return this.eventTargetListeners_.removeByKey(key);
};
goog.events.EventTarget.prototype.removeAllListeners = function $goog$events$EventTarget$$removeAllListeners$(opt_type) {
  return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(opt_type) : 0;
};
goog.events.EventTarget.prototype.fireListeners = function $goog$events$EventTarget$$fireListeners$(type, capture, eventObject) {
  var listenerArray = this.eventTargetListeners_.listeners[String(type)];
  if (!listenerArray) {
    return!0;
  }
  for (var listenerArray = listenerArray.concat(), rv = !0, i = 0;i < listenerArray.length;++i) {
    var listener = listenerArray[i];
    if (listener && !listener.removed && listener.capture == capture) {
      var listenerFn = listener.listener, listenerHandler = listener.handler || listener.src;
      listener.callOnce && this.unlistenByKey(listener);
      rv = !1 !== listenerFn.call(listenerHandler, eventObject) && rv;
    }
  }
  return rv && !1 != eventObject.returnValue_;
};
goog.events.EventTarget.prototype.getListeners = function $goog$events$EventTarget$$getListeners$(type, capture) {
  return this.eventTargetListeners_.getListeners(String(type), capture);
};
goog.events.EventTarget.prototype.getListener = function $goog$events$EventTarget$$getListener$(type, listener, capture, opt_listenerScope) {
  return this.eventTargetListeners_.getListener(String(type), listener, capture, opt_listenerScope);
};
goog.events.EventTarget.prototype.hasListener = function $goog$events$EventTarget$$hasListener$(opt_type, opt_capture) {
  var id = goog.isDef(opt_type) ? String(opt_type) : void 0;
  return this.eventTargetListeners_.hasListener(id, opt_capture);
};
goog.events.EventTarget.prototype.assertInitialized_ = function $goog$events$EventTarget$$assertInitialized_$() {
  goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?");
};
goog.events.EventTarget.dispatchEventInternal_ = function $goog$events$EventTarget$dispatchEventInternal_$(target, e, opt_ancestorsTree) {
  var type = e.type || e;
  if (goog.isString(e)) {
    e = new goog.events.Event(e, target);
  } else {
    if (e instanceof goog.events.Event) {
      e.target = e.target || target;
    } else {
      var oldEvent = e;
      e = new goog.events.Event(type, target);
      goog.object.extend(e, oldEvent);
    }
  }
  var rv = !0, currentTarget;
  if (opt_ancestorsTree) {
    for (var i = opt_ancestorsTree.length - 1;!e.propagationStopped_ && 0 <= i;i--) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i], rv = currentTarget.fireListeners(type, !0, e) && rv;
    }
  }
  e.propagationStopped_ || (currentTarget = e.currentTarget = target, rv = currentTarget.fireListeners(type, !0, e) && rv, e.propagationStopped_ || (rv = currentTarget.fireListeners(type, !1, e) && rv));
  if (opt_ancestorsTree) {
    for (i = 0;!e.propagationStopped_ && i < opt_ancestorsTree.length;i++) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i], rv = currentTarget.fireListeners(type, !1, e) && rv;
    }
  }
  return rv;
};
goog.json = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.isValid = function $goog$json$isValid$(s) {
  if (/^\s*$/.test(s)) {
    return!1;
  }
  var backslashesRe = /\\["\\\/bfnrtu]/g, simpleValuesRe = /"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""));
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(s) {
  var o = String(s);
  if (goog.json.isValid(o)) {
    try {
      return eval("(" + o + ")");
    } catch (ex) {
    }
  }
  throw Error("Invalid JSON string: " + o);
};
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(s) {
  return eval("(" + s + ")");
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(object, opt_replacer) {
  return(new goog.json.Serializer(opt_replacer)).serialize(object);
};
goog.json.Serializer = function $goog$json$Serializer$(opt_replacer) {
  this.replacer_ = opt_replacer;
};
goog.json.Serializer.prototype.serialize = function $goog$json$Serializer$$serialize$(object) {
  var sb = [];
  this.serializeInternal(object, sb);
  return sb.join("");
};
goog.json.Serializer.prototype.serializeInternal = function $goog$json$Serializer$$serializeInternal$(object, sb) {
  switch(typeof object) {
    case "string":
      this.serializeString_(object, sb);
      break;
    case "number":
      this.serializeNumber_(object, sb);
      break;
    case "boolean":
      sb.push(object);
      break;
    case "undefined":
      sb.push("null");
      break;
    case "object":
      if (null == object) {
        sb.push("null");
        break;
      }
      if (goog.isArray(object)) {
        this.serializeArray(object, sb);
        break;
      }
      this.serializeObject_(object, sb);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof object);;
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function $goog$json$Serializer$$serializeString_$(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    if (c in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[c];
    }
    var cc = c.charCodeAt(0), rv = "\\u";
    16 > cc ? rv += "000" : 256 > cc ? rv += "00" : 4096 > cc && (rv += "0");
    return goog.json.Serializer.charToJsonCharCache_[c] = rv + cc.toString(16);
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function $goog$json$Serializer$$serializeNumber_$(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? n : "null");
};
goog.json.Serializer.prototype.serializeArray = function $goog$json$Serializer$$serializeArray$(arr, sb) {
  var l = arr.length;
  sb.push("[");
  for (var sep = "", i = 0;i < l;i++) {
    sb.push(sep);
    var value = arr[i];
    this.serializeInternal(this.replacer_ ? this.replacer_.call(arr, String(i), value) : value, sb);
    sep = ",";
  }
  sb.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function $goog$json$Serializer$$serializeObject_$(obj, sb) {
  sb.push("{");
  var sep = "", key;
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];
      "function" != typeof value && (sb.push(sep), this.serializeString_(key, sb), sb.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(obj, key, value) : value, sb), sep = ",");
    }
  }
  sb.push("}");
};
goog.structs.Collection = function $goog$structs$Collection$() {
};
goog.structs.Set = function $goog$structs$Set$(opt_values) {
  this.map_ = new goog.structs.Map;
  opt_values && this.addAll(opt_values);
};
goog.structs.Set.getKey_ = function $goog$structs$Set$getKey_$(val) {
  var type = typeof val;
  return "object" == type && val || "function" == type ? "o" + goog.getUid(val) : type.substr(0, 1) + val;
};
goog.structs.Set.prototype.getCount = function $goog$structs$Set$$getCount$() {
  return this.map_.getCount();
};
goog.structs.Set.prototype.add = function $goog$structs$Set$$add$(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element);
};
goog.structs.Set.prototype.addAll = function $goog$structs$Set$$addAll$(col) {
  for (var values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    this.add(values[i]);
  }
};
goog.structs.Set.prototype.removeAll = function $goog$structs$Set$$removeAll$(col) {
  for (var values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    this.remove(values[i]);
  }
};
goog.structs.Set.prototype.remove = function $goog$structs$Set$$remove$(element) {
  return this.map_.remove(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.clear = function $goog$structs$Set$$clear$() {
  this.map_.clear();
};
goog.structs.Set.prototype.isEmpty = function $goog$structs$Set$$isEmpty$() {
  return this.map_.isEmpty();
};
goog.structs.Set.prototype.contains = function $goog$structs$Set$$contains$(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.intersection = function $goog$structs$Set$$intersection$(col) {
  for (var result = new goog.structs.Set, values = goog.structs.getValues(col), i = 0;i < values.length;i++) {
    var value = values[i];
    this.contains(value) && result.add(value);
  }
  return result;
};
goog.structs.Set.prototype.difference = function $goog$structs$Set$$difference$(col) {
  var result = this.clone();
  result.removeAll(col);
  return result;
};
goog.structs.Set.prototype.getValues = function $goog$structs$Set$$getValues$() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.clone = function $goog$structs$Set$$clone$() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function $goog$structs$Set$$equals$(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col);
};
goog.structs.Set.prototype.isSubsetOf = function $goog$structs$Set$$isSubsetOf$(col) {
  var colCount = goog.structs.getCount(col);
  if (this.getCount() > colCount) {
    return!1;
  }
  !(col instanceof goog.structs.Set) && 5 < colCount && (col = new goog.structs.Set(col));
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value);
  });
};
goog.structs.Set.prototype.__iterator__ = function $goog$structs$Set$$__iterator__$() {
  return this.map_.__iterator__(!1);
};
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.catchErrors = function $goog$debug$catchErrors$(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global, oldErrorHandler = target.onerror, retVal = !!opt_cancel;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (retVal = !retVal);
  target.onerror = function $target$onerror$(message, url, line, opt_col, opt_error) {
    oldErrorHandler && oldErrorHandler(message, url, line, opt_col, opt_error);
    logFunc({message:message, fileName:url, line:line, col:opt_col, error:opt_error});
    return retVal;
  };
};
goog.debug.expose = function $goog$debug$expose$(obj, opt_showFn) {
  if ("undefined" == typeof obj) {
    return "undefined";
  }
  if (null == obj) {
    return "NULL";
  }
  var str = [], x;
  for (x in obj) {
    if (opt_showFn || !goog.isFunction(obj[x])) {
      var s = x + " = ";
      try {
        s += obj[x];
      } catch (e) {
        s += "*** " + e + " ***";
      }
      str.push(s);
    }
  }
  return str.join("\n");
};
goog.debug.deepExpose = function $goog$debug$deepExpose$(obj$$0, opt_showFn) {
  var str = [], helper = function $helper$(obj, space, parentSeen) {
    var nestspace = space + "  ", seen = new goog.structs.Set(parentSeen);
    try {
      if (goog.isDef(obj)) {
        if (goog.isNull(obj)) {
          str.push("NULL");
        } else {
          if (goog.isString(obj)) {
            str.push('"' + obj.replace(/\n/g, "\n" + space) + '"');
          } else {
            if (goog.isFunction(obj)) {
              str.push(String(obj).replace(/\n/g, "\n" + space));
            } else {
              if (goog.isObject(obj)) {
                if (seen.contains(obj)) {
                  str.push("*** reference loop detected ***");
                } else {
                  seen.add(obj);
                  str.push("{");
                  for (var x in obj) {
                    if (opt_showFn || !goog.isFunction(obj[x])) {
                      str.push("\n"), str.push(nestspace), str.push(x + " = "), helper(obj[x], nestspace, seen);
                    }
                  }
                  str.push("\n" + space + "}");
                }
              } else {
                str.push(obj);
              }
            }
          }
        }
      } else {
        str.push("undefined");
      }
    } catch (e) {
      str.push("*** " + e + " ***");
    }
  };
  helper(obj$$0, "", new goog.structs.Set);
  return str.join("");
};
goog.debug.exposeArray = function $goog$debug$exposeArray$(arr) {
  for (var str = [], i = 0;i < arr.length;i++) {
    goog.isArray(arr[i]) ? str.push(goog.debug.exposeArray(arr[i])) : str.push(arr[i]);
  }
  return "[ " + str.join(", ") + " ]";
};
goog.debug.exposeException = function $goog$debug$exposeException$(err, opt_fn) {
  try {
    var e = goog.debug.normalizeErrorObject(err), error = "Message: " + goog.string.htmlEscape(e.message) + '\nUrl: <a href="view-source:' + e.fileName + '" target="_new">' + e.fileName + "</a>\nLine: " + e.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(e.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(opt_fn) + "-> ");
    return error;
  } catch (e2) {
    return "Exception trying to expose exception! You win, we lose. " + e2;
  }
};
goog.debug.normalizeErrorObject = function $goog$debug$normalizeErrorObject$(err) {
  var href = goog.getObjectByName("window.location.href");
  if (goog.isString(err)) {
    return{message:err, name:"Unknown error", lineNumber:"Not available", fileName:href, stack:"Not available"};
  }
  var lineNumber, fileName, threwError = !1;
  try {
    lineNumber = err.lineNumber || err.line || "Not available";
  } catch (e) {
    lineNumber = "Not available", threwError = !0;
  }
  try {
    fileName = err.fileName || err.filename || err.sourceURL || goog.global.$googDebugFname || href;
  } catch (e$$0) {
    fileName = "Not available", threwError = !0;
  }
  return!threwError && err.lineNumber && err.fileName && err.stack && err.message && err.name ? err : {message:err.message || "Not available", name:err.name || "UnknownError", lineNumber:lineNumber, fileName:fileName, stack:err.stack || "Not available"};
};
goog.debug.enhanceError = function $goog$debug$enhanceError$(err, opt_message) {
  var error;
  "string" == typeof err ? (error = Error(err), Error.captureStackTrace && Error.captureStackTrace(error, goog.debug.enhanceError)) : error = err;
  error.stack || (error.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
  if (opt_message) {
    for (var x = 0;error["message" + x];) {
      ++x;
    }
    error["message" + x] = String(opt_message);
  }
  return error;
};
goog.debug.getStacktraceSimple = function $goog$debug$getStacktraceSimple$(opt_depth) {
  if (goog.STRICT_MODE_COMPATIBLE) {
    var stack = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
    if (stack) {
      return stack;
    }
  }
  for (var sb = [], fn = arguments.callee.caller, depth = 0;fn && (!opt_depth || depth < opt_depth);) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller;
    } catch (e) {
      sb.push("[exception trying to get caller]\n");
      break;
    }
    depth++;
    if (depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break;
    }
  }
  opt_depth && depth >= opt_depth ? sb.push("[...reached max depth limit...]") : sb.push("[end]");
  return sb.join("");
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function $goog$debug$getNativeStackTrace_$(fn) {
  var tempErr = Error();
  if (Error.captureStackTrace) {
    return Error.captureStackTrace(tempErr, fn), String(tempErr.stack);
  }
  try {
    throw tempErr;
  } catch (e) {
    tempErr = e;
  }
  var stack = tempErr.stack;
  return stack ? String(stack) : null;
};
goog.debug.getStacktrace = function $goog$debug$getStacktrace$(opt_fn) {
  var stack;
  if (goog.STRICT_MODE_COMPATIBLE) {
    var contextFn = opt_fn || goog.debug.getStacktrace;
    stack = goog.debug.getNativeStackTrace_(contextFn);
  }
  stack || (stack = goog.debug.getStacktraceHelper_(opt_fn || arguments.callee.caller, []));
  return stack;
};
goog.debug.getStacktraceHelper_ = function $goog$debug$getStacktraceHelper_$(fn, visited) {
  var sb = [];
  if (goog.array.contains(visited, fn)) {
    sb.push("[...circular reference...]");
  } else {
    if (fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
      sb.push(goog.debug.getFunctionName(fn) + "(");
      for (var args = fn.arguments, i = 0;args && i < args.length;i++) {
        0 < i && sb.push(", ");
        var argDesc, arg = args[i];
        switch(typeof arg) {
          case "object":
            argDesc = arg ? "object" : "null";
            break;
          case "string":
            argDesc = arg;
            break;
          case "number":
            argDesc = String(arg);
            break;
          case "boolean":
            argDesc = arg ? "true" : "false";
            break;
          case "function":
            argDesc = (argDesc = goog.debug.getFunctionName(arg)) ? argDesc : "[fn]";
            break;
          default:
            argDesc = typeof arg;
        }
        40 < argDesc.length && (argDesc = argDesc.substr(0, 40) + "...");
        sb.push(argDesc);
      }
      visited.push(fn);
      sb.push(")\n");
      try {
        sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited));
      } catch (e) {
        sb.push("[exception trying to get caller]\n");
      }
    } else {
      fn ? sb.push("[...long stack...]") : sb.push("[end]");
    }
  }
  return sb.join("");
};
goog.debug.setFunctionResolver = function $goog$debug$setFunctionResolver$(resolver) {
  goog.debug.fnNameResolver_ = resolver;
};
goog.debug.getFunctionName = function $goog$debug$getFunctionName$(fn) {
  if (goog.debug.fnNameCache_[fn]) {
    return goog.debug.fnNameCache_[fn];
  }
  if (goog.debug.fnNameResolver_) {
    var name = goog.debug.fnNameResolver_(fn);
    if (name) {
      return goog.debug.fnNameCache_[fn] = name;
    }
  }
  var functionSource = String(fn);
  if (!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function ([^\(]+)/.exec(functionSource);
    if (matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method;
    } else {
      goog.debug.fnNameCache_[functionSource] = "[Anonymous]";
    }
  }
  return goog.debug.fnNameCache_[functionSource];
};
goog.debug.makeWhitespaceVisible = function $goog$debug$makeWhitespaceVisible$(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function $goog$debug$LogRecord$(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  this.reset(level, msg, loggerName, opt_time, opt_sequenceNumber);
};
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function $goog$debug$LogRecord$$reset$(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && ("number" == typeof opt_sequenceNumber || goog.debug.LogRecord.nextSequenceNumber_++);
  opt_time || goog.now();
  this.level_ = level;
  this.msg_ = msg;
  delete this.exception_;
  delete this.exceptionText_;
};
goog.debug.LogRecord.prototype.setException = function $goog$debug$LogRecord$$setException$(exception) {
  this.exception_ = exception;
};
goog.debug.LogRecord.prototype.setExceptionText = function $goog$debug$LogRecord$$setExceptionText$(text) {
  this.exceptionText_ = text;
};
goog.debug.LogRecord.prototype.setLevel = function $goog$debug$LogRecord$$setLevel$(level) {
  this.level_ = level;
};
goog.debug.LogRecord.prototype.getMessage = function $goog$debug$LogRecord$$getMessage$() {
  return this.msg_;
};
goog.debug.LogBuffer = function $goog$debug$LogBuffer$() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear();
};
goog.debug.LogBuffer.getInstance = function $goog$debug$LogBuffer$getInstance$() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_;
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function $goog$debug$LogBuffer$$addRecord$(level, msg, loggerName) {
  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = curIndex;
  if (this.isFull_) {
    var ret = this.buffer_[curIndex];
    ret.reset(level, msg, loggerName);
    return ret;
  }
  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[curIndex] = new goog.debug.LogRecord(level, msg, loggerName);
};
goog.debug.LogBuffer.isBufferingEnabled = function $goog$debug$LogBuffer$isBufferingEnabled$() {
  return 0 < goog.debug.LogBuffer.CAPACITY;
};
goog.debug.LogBuffer.prototype.clear = function $goog$debug$LogBuffer$$clear$() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1;
};
goog.debug.Logger = function $goog$debug$Logger$(name) {
  this.name_ = name;
  this.handlers_ = this.children_ = this.level_ = this.parent_ = null;
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function $goog$debug$Logger$Level$(name, value) {
  this.name = name;
  this.value = value;
};
goog.debug.Logger.Level.prototype.toString = function $goog$debug$Logger$Level$$toString$() {
  return this.name;
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function $goog$debug$Logger$Level$createPredefinedLevelsCache_$() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for (var i = 0, level;level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];i++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[level.value] = level, goog.debug.Logger.Level.predefinedLevelsCache_[level.name] = level;
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function $goog$debug$Logger$Level$getPredefinedLevel$(name) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[name] || null;
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function $goog$debug$Logger$Level$getPredefinedLevelByValue$(value) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if (value in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[value];
  }
  for (var i = 0;i < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++i) {
    var level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];
    if (level.value <= value) {
      return level;
    }
  }
  return null;
};
goog.debug.Logger.getLogger = function $goog$debug$Logger$getLogger$(name) {
  return goog.debug.LogManager.getLogger(name);
};
goog.debug.Logger.logToProfilers = function $goog$debug$Logger$logToProfilers$(msg) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(msg) : goog.global.console.markTimeline && goog.global.console.markTimeline(msg));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(msg);
};
goog.debug.Logger.prototype.addHandler = function $goog$debug$Logger$$addHandler$(handler) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(handler)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(handler)));
};
goog.debug.Logger.prototype.removeHandler = function $goog$debug$Logger$$removeHandler$(handler) {
  if (goog.debug.LOGGING_ENABLED) {
    var handlers = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
    return!!handlers && goog.array.remove(handlers, handler);
  }
  return!1;
};
goog.debug.Logger.prototype.getParent = function $goog$debug$Logger$$getParent$() {
  return this.parent_;
};
goog.debug.Logger.prototype.getChildren = function $goog$debug$Logger$$getChildren$() {
  this.children_ || (this.children_ = {});
  return this.children_;
};
goog.debug.Logger.prototype.setLevel = function $goog$debug$Logger$$setLevel$(level) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = level : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = level));
};
goog.debug.Logger.prototype.getEffectiveLevel = function $goog$debug$Logger$$getEffectiveLevel$() {
  if (!goog.debug.LOGGING_ENABLED) {
    return goog.debug.Logger.Level.OFF;
  }
  if (!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_;
  }
  if (this.level_) {
    return this.level_;
  }
  if (this.parent_) {
    return this.parent_.getEffectiveLevel();
  }
  goog.asserts.fail("Root logger has no level set.");
  return null;
};
goog.debug.Logger.prototype.isLoggable = function $goog$debug$Logger$$isLoggable$(level) {
  return goog.debug.LOGGING_ENABLED && level.value >= this.getEffectiveLevel().value;
};
goog.debug.Logger.prototype.log = function $goog$debug$Logger$$log$(level, msg, opt_exception) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(level) && (goog.isFunction(msg) && (msg = msg()), this.doLogRecord_(this.getLogRecord(level, msg, opt_exception, goog.debug.Logger.prototype.log)));
};
goog.debug.Logger.prototype.getLogRecord = function $goog$debug$Logger$$getLogRecord$(level, msg, opt_exception, opt_fnStackContext) {
  var logRecord = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(level, msg, this.name_) : new goog.debug.LogRecord(level, String(msg), this.name_);
  opt_exception && (logRecord.setException(opt_exception), logRecord.setExceptionText(goog.debug.exposeException(opt_exception, opt_fnStackContext || goog.debug.Logger.prototype.getLogRecord)));
  return logRecord;
};
goog.debug.Logger.prototype.severe = function $goog$debug$Logger$$severe$(msg, opt_exception) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, msg, opt_exception);
};
goog.debug.Logger.prototype.warning = function $goog$debug$Logger$$warning$(msg, opt_exception) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, msg, opt_exception);
};
goog.debug.Logger.prototype.info = function $goog$debug$Logger$$info$(msg, opt_exception) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, msg, opt_exception);
};
goog.debug.Logger.prototype.fine = function $goog$debug$Logger$$fine$(msg, opt_exception) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, msg, opt_exception);
};
goog.debug.Logger.prototype.doLogRecord_ = function $goog$debug$Logger$$doLogRecord_$(logRecord) {
  goog.debug.Logger.logToProfilers("log:" + logRecord.getMessage());
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    for (var target = this;target;) {
      target.callPublish_(logRecord), target = target.getParent();
    }
  } else {
    for (var i = 0, handler;handler = goog.debug.Logger.rootHandlers_[i++];) {
      handler(logRecord);
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function $goog$debug$Logger$$callPublish_$(logRecord) {
  if (this.handlers_) {
    for (var i = 0, handler;handler = this.handlers_[i];i++) {
      handler(logRecord);
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function $goog$debug$Logger$$setParent_$(parent) {
  this.parent_ = parent;
};
goog.debug.Logger.prototype.addChild_ = function $goog$debug$Logger$$addChild_$(name, logger) {
  this.getChildren()[name] = logger;
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function $goog$debug$LogManager$initialize$() {
  goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG));
};
goog.debug.LogManager.getLoggers = function $goog$debug$LogManager$getLoggers$() {
  return goog.debug.LogManager.loggers_;
};
goog.debug.LogManager.getRoot = function $goog$debug$LogManager$getRoot$() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_;
};
goog.debug.LogManager.getLogger = function $goog$debug$LogManager$getLogger$(name) {
  goog.debug.LogManager.initialize();
  var ret = goog.debug.LogManager.loggers_[name];
  return ret || goog.debug.LogManager.createLogger_(name);
};
goog.debug.LogManager.createFunctionForCatchErrors = function $goog$debug$LogManager$createFunctionForCatchErrors$(opt_logger) {
  return function(info) {
    var logger = opt_logger || goog.debug.LogManager.getRoot();
    logger.severe("Error: " + info.message + " (" + info.fileName + " @ Line: " + info.line + ")");
  };
};
goog.debug.LogManager.createLogger_ = function $goog$debug$LogManager$createLogger_$(name) {
  var logger = new goog.debug.Logger(name);
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    var lastDotIndex = name.lastIndexOf("."), parentName = name.substr(0, lastDotIndex), leafName = name.substr(lastDotIndex + 1), parentLogger = goog.debug.LogManager.getLogger(parentName);
    parentLogger.addChild_(leafName, logger);
    logger.setParent_(parentLogger);
  }
  return goog.debug.LogManager.loggers_[name] = logger;
};
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function $goog$log$getLogger$(name, opt_level) {
  if (goog.log.ENABLED) {
    var logger = goog.debug.LogManager.getLogger(name);
    opt_level && logger && logger.setLevel(opt_level);
    return logger;
  }
  return null;
};
goog.log.addHandler = function $goog$log$addHandler$(logger, handler) {
  goog.log.ENABLED && logger && logger.addHandler(handler);
};
goog.log.removeHandler = function $goog$log$removeHandler$(logger, handler) {
  return goog.log.ENABLED && logger ? logger.removeHandler(handler) : !1;
};
goog.log.log = function $goog$log$log$(logger, level, msg, opt_exception) {
  goog.log.ENABLED && logger && logger.log(level, msg, opt_exception);
};
goog.log.error = function $goog$log$error$(logger, msg, opt_exception) {
  goog.log.ENABLED && logger && logger.severe(msg, opt_exception);
};
goog.log.warning = function $goog$log$warning$(logger, msg, opt_exception) {
  goog.log.ENABLED && logger && logger.warning(msg, opt_exception);
};
goog.log.info = function $goog$log$info$(logger, msg, opt_exception) {
  goog.log.ENABLED && logger && logger.info(msg, opt_exception);
};
goog.log.fine = function $goog$log$fine$(logger, msg, opt_exception) {
  goog.log.ENABLED && logger && logger.fine(msg, opt_exception);
};
goog.Timer = function $goog$Timer$(opt_interval, opt_timerObject) {
  goog.events.EventTarget.call(this);
  this.interval_ = opt_interval || 1;
  this.timerObject_ = opt_timerObject || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now();
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = .8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.tick_ = function $goog$Timer$$tick_$() {
  if (this.enabled) {
    var elapsed = goog.now() - this.last_;
    0 < elapsed && elapsed < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - elapsed) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()));
  }
};
goog.Timer.prototype.dispatchTick = function $goog$Timer$$dispatchTick$() {
  this.dispatchEvent(goog.Timer.TICK);
};
goog.Timer.prototype.stop = function $goog$Timer$$stop$() {
  this.enabled = !1;
  this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null);
};
goog.Timer.prototype.disposeInternal = function $goog$Timer$$disposeInternal$() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_;
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function $goog$Timer$callOnce$(listener, opt_delay, opt_handler) {
  if (goog.isFunction(listener)) {
    opt_handler && (listener = goog.bind(listener, opt_handler));
  } else {
    if (listener && "function" == typeof listener.handleEvent) {
      listener = goog.bind(listener.handleEvent, listener);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return opt_delay > goog.Timer.MAX_TIMEOUT_ ? -1 : goog.Timer.defaultTimerObject.setTimeout(listener, opt_delay || 0);
};
goog.Timer.clear = function $goog$Timer$clear$(timerId) {
  goog.Timer.defaultTimerObject.clearTimeout(timerId);
};
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function $goog$net$ErrorCode$getDebugMessage$(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return "No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return "Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return "File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return "Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return "Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return "An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return "Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return "Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return "Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return "The resource is not available offline";
    default:
      return "Unrecognized error code";
  }
};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress"};
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505, QUIRK_IE_NO_CONTENT:1223};
goog.net.HttpStatus.isSuccess = function $goog$net$HttpStatus$isSuccess$(status) {
  switch(status) {
    case goog.net.HttpStatus.OK:
    ;
    case goog.net.HttpStatus.CREATED:
    ;
    case goog.net.HttpStatus.ACCEPTED:
    ;
    case goog.net.HttpStatus.NO_CONTENT:
    ;
    case goog.net.HttpStatus.PARTIAL_CONTENT:
    ;
    case goog.net.HttpStatus.NOT_MODIFIED:
    ;
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return!0;
    default:
      return!1;
  }
};
goog.net.XhrLike = function $goog$net$XhrLike$() {
};
goog.net.XhrLike.prototype.open = function $goog$net$XhrLike$$open$() {
};
goog.net.XhrLike.prototype.send = function $goog$net$XhrLike$$send$() {
};
goog.net.XhrLike.prototype.abort = function $goog$net$XhrLike$$abort$() {
};
goog.net.XhrLike.prototype.setRequestHeader = function $goog$net$XhrLike$$setRequestHeader$() {
};
goog.net.XmlHttpFactory = function $goog$net$XmlHttpFactory$() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.getOptions = function $goog$net$XmlHttpFactory$$getOptions$() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions());
};
goog.net.WrapperXmlHttpFactory = function $goog$net$WrapperXmlHttpFactory$(xhrFactory, optionsFactory) {
  this.xhrFactory_ = xhrFactory;
  this.optionsFactory_ = optionsFactory;
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function $goog$net$WrapperXmlHttpFactory$$createInstance$() {
  return this.xhrFactory_();
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function $goog$net$WrapperXmlHttpFactory$$getOptions$() {
  return this.optionsFactory_();
};
goog.net.XmlHttp = function $goog$net$XmlHttp$() {
  return goog.net.XmlHttp.factory_.createInstance();
};
goog.net.XmlHttp.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttpDefines = {};
goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttp.getOptions = function $goog$net$XmlHttp$getOptions$() {
  return goog.net.XmlHttp.factory_.getOptions();
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.setFactory = function $goog$net$XmlHttp$setFactory$(factory, optionsFactory) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(factory), goog.asserts.assert(optionsFactory)));
};
goog.net.XmlHttp.setGlobalFactory = function $goog$net$XmlHttp$setGlobalFactory$(factory) {
  goog.net.XmlHttp.factory_ = factory;
};
goog.net.DefaultXmlHttpFactory = function $goog$net$DefaultXmlHttpFactory$() {
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function $goog$net$DefaultXmlHttpFactory$$createInstance$() {
  var progId = this.getProgId_();
  return progId ? new ActiveXObject(progId) : new XMLHttpRequest;
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function $goog$net$DefaultXmlHttpFactory$$internalGetOptions$() {
  var progId = this.getProgId_(), options = {};
  progId && (options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0, options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0);
  return options;
};
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function $goog$net$DefaultXmlHttpFactory$$getProgId_$() {
  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {
    return "";
  }
  if (!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], i = 0;i < ACTIVE_X_IDENTS.length;i++) {
      var candidate = ACTIVE_X_IDENTS[i];
      try {
        return new ActiveXObject(candidate), this.ieProgId_ = candidate;
      } catch (e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return this.ieProgId_;
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.net.XhrIo = function $goog$net$XhrIo$(opt_xmlHttpFactory) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = opt_xmlHttpFactory || null;
  this.active_ = !1;
  this.xhrOptions_ = this.xhr_ = null;
  this.lastError_ = this.lastMethod_ = this.lastUri_ = "";
  this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
  this.timeoutInterval_ = 0;
  this.timeoutId_ = null;
  this.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
  this.useXhr2Timeout_ = this.withCredentials_ = !1;
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"];
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.XHR2_TIMEOUT_ = "timeout";
goog.net.XhrIo.XHR2_ON_TIMEOUT_ = "ontimeout";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function $goog$net$XhrIo$send$(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval, opt_withCredentials) {
  var x = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(x);
  opt_callback && x.listen(goog.net.EventType.COMPLETE, opt_callback);
  x.listenOnce(goog.net.EventType.READY, x.cleanupSend_);
  opt_timeoutInterval && x.setTimeoutInterval(opt_timeoutInterval);
  opt_withCredentials && x.setWithCredentials(opt_withCredentials);
  x.send(url, opt_method, opt_content, opt_headers);
  return x;
};
goog.net.XhrIo.cleanup = function $goog$net$XhrIo$cleanup$() {
  for (var instances = goog.net.XhrIo.sendInstances_;instances.length;) {
    instances.pop().dispose();
  }
};
goog.net.XhrIo.protectEntryPoints = function $goog$net$XhrIo$protectEntryPoints$(errorHandler) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
};
goog.net.XhrIo.prototype.cleanupSend_ = function $goog$net$XhrIo$$cleanupSend_$() {
  this.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, this);
};
goog.net.XhrIo.prototype.setTimeoutInterval = function $goog$net$XhrIo$$setTimeoutInterval$(ms) {
  this.timeoutInterval_ = Math.max(0, ms);
};
goog.net.XhrIo.prototype.setWithCredentials = function $goog$net$XhrIo$$setWithCredentials$(withCredentials) {
  this.withCredentials_ = withCredentials;
};
goog.net.XhrIo.prototype.send = function $goog$net$XhrIo$$send$(url, opt_method, opt_content, opt_headers) {
  if (this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + url);
  }
  var method = opt_method ? opt_method.toUpperCase() : "GET";
  this.lastUri_ = url;
  this.lastError_ = "";
  this.lastMethod_ = method;
  this.errorDispatched_ = !1;
  this.active_ = !0;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(method, String(url), !0), this.inOpen_ = !1;
  } catch (err) {
    goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err);
    return;
  }
  var content = opt_content || "", headers = this.headers.clone();
  opt_headers && goog.structs.forEach(opt_headers, function(value, key) {
    headers.set(key, value);
  });
  var contentTypeKey = goog.array.find(headers.getKeys(), goog.net.XhrIo.isContentTypeHeader_), contentIsFormData = goog.global.FormData && content instanceof goog.global.FormData;
  !goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, method) || contentTypeKey || contentIsFormData || headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  headers.forEach(function(value, key) {
    this.xhr_.setRequestHeader(key, value);
  }, this);
  this.responseType_ && (this.xhr_.responseType = this.responseType_);
  goog.object.containsKey(this.xhr_, "withCredentials") && (this.xhr_.withCredentials = this.withCredentials_);
  try {
    this.cleanUpTimeoutTimer_(), 0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_), goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)), this.useXhr2Timeout_ ? (this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_, this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = goog.bind(this.timeout_, this)) : this.timeoutId_ = goog.Timer.callOnce(this.timeout_, this.timeoutInterval_, 
    this)), goog.log.fine(this.logger_, this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send(content), this.inSend_ = !1;
  } catch (err$$0) {
    goog.log.fine(this.logger_, this.formatMsg_("Send error: " + err$$0.message)), this.error_(goog.net.ErrorCode.EXCEPTION, err$$0);
  }
};
goog.net.XhrIo.shouldUseXhr2Timeout_ = function $goog$net$XhrIo$shouldUseXhr2Timeout_$(xhr) {
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher(9) && goog.isNumber(xhr[goog.net.XhrIo.XHR2_TIMEOUT_]) && goog.isDef(xhr[goog.net.XhrIo.XHR2_ON_TIMEOUT_]);
};
goog.net.XhrIo.isContentTypeHeader_ = function $goog$net$XhrIo$isContentTypeHeader_$(header) {
  return goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, header);
};
goog.net.XhrIo.prototype.createXhr = function $goog$net$XhrIo$$createXhr$() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp();
};
goog.net.XhrIo.prototype.timeout_ = function $goog$net$XhrIo$$timeout_$() {
  "undefined" != typeof goog && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", goog.log.fine(this.logger_, this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT));
};
goog.net.XhrIo.prototype.error_ = function $goog$net$XhrIo$$error_$(errorCode, err) {
  this.active_ = !1;
  this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
  this.lastError_ = err;
  this.dispatchErrors_();
  this.cleanUpXhr_();
};
goog.net.XhrIo.prototype.dispatchErrors_ = function $goog$net$XhrIo$$dispatchErrors_$() {
  this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR));
};
goog.net.XhrIo.prototype.abort = function $goog$net$XhrIo$$abort$() {
  this.xhr_ && this.active_ && (goog.log.fine(this.logger_, this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_());
};
goog.net.XhrIo.prototype.disposeInternal = function $goog$net$XhrIo$$disposeInternal$() {
  this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
  goog.net.XhrIo.superClass_.disposeInternal.call(this);
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function $goog$net$XhrIo$$onReadyStateChange_$() {
  if (!this.isDisposed()) {
    if (this.inOpen_ || this.inSend_ || this.inAbort_) {
      this.onReadyStateChangeHelper_();
    } else {
      this.onReadyStateChangeEntryPoint_();
    }
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function $goog$net$XhrIo$$onReadyStateChangeEntryPoint_$() {
  this.onReadyStateChangeHelper_();
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function $goog$net$XhrIo$$onReadyStateChangeHelper_$() {
  if (this.active_ && "undefined" != typeof goog) {
    if (this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus()) {
      goog.log.fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
    } else {
      if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.callOnce(this.onReadyStateChange_, 0, this);
      } else {
        if (this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE), this.isComplete()) {
          goog.log.fine(this.logger_, this.formatMsg_("Request complete"));
          this.active_ = !1;
          try {
            this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_());
          } finally {
            this.cleanUpXhr_();
          }
        }
      }
    }
  }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function $goog$net$XhrIo$$cleanUpXhr_$(opt_fromDispose) {
  if (this.xhr_) {
    this.cleanUpTimeoutTimer_();
    var xhr = this.xhr_, clearedOnReadyStateChange = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhrOptions_ = this.xhr_ = null;
    opt_fromDispose || this.dispatchEvent(goog.net.EventType.READY);
    try {
      xhr.onreadystatechange = clearedOnReadyStateChange;
    } catch (e) {
      goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + e.message);
    }
  }
};
goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function $goog$net$XhrIo$$cleanUpTimeoutTimer_$() {
  this.xhr_ && this.useXhr2Timeout_ && (this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = null);
  goog.isNumber(this.timeoutId_) && (goog.Timer.clear(this.timeoutId_), this.timeoutId_ = null);
};
goog.net.XhrIo.prototype.isComplete = function $goog$net$XhrIo$$isComplete$() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE;
};
goog.net.XhrIo.prototype.isSuccess = function $goog$net$XhrIo$$isSuccess$() {
  var status = this.getStatus();
  return goog.net.HttpStatus.isSuccess(status) || 0 === status && !this.isLastUriEffectiveSchemeHttp_();
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function $goog$net$XhrIo$$isLastUriEffectiveSchemeHttp_$() {
  var scheme = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
  return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(scheme);
};
goog.net.XhrIo.prototype.getReadyState = function $goog$net$XhrIo$$getReadyState$() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED;
};
goog.net.XhrIo.prototype.getStatus = function $goog$net$XhrIo$$getStatus$() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1;
  } catch (e) {
    return-1;
  }
};
goog.net.XhrIo.prototype.getStatusText = function $goog$net$XhrIo$$getStatusText$() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : "";
  } catch (e) {
    return goog.log.fine(this.logger_, "Can not get status: " + e.message), "";
  }
};
goog.net.XhrIo.prototype.formatMsg_ = function $goog$net$XhrIo$$formatMsg_$(msg) {
  return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]";
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = transformer(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
});
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_CAMINO = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_CAMINO || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_ = function $goog$userAgent$product$init_$() {
  goog.userAgent.product.detectedFirefox_ = !1;
  goog.userAgent.product.detectedCamino_ = !1;
  goog.userAgent.product.detectedIphone_ = !1;
  goog.userAgent.product.detectedIpad_ = !1;
  goog.userAgent.product.detectedAndroid_ = !1;
  goog.userAgent.product.detectedChrome_ = !1;
  goog.userAgent.product.detectedSafari_ = !1;
  var ua = goog.userAgent.getUserAgentString();
  ua && (-1 != ua.indexOf("Firefox") ? goog.userAgent.product.detectedFirefox_ = !0 : -1 != ua.indexOf("Camino") ? goog.userAgent.product.detectedCamino_ = !0 : -1 != ua.indexOf("iPhone") || -1 != ua.indexOf("iPod") ? goog.userAgent.product.detectedIphone_ = !0 : -1 != ua.indexOf("iPad") ? goog.userAgent.product.detectedIpad_ = !0 : -1 != ua.indexOf("Chrome") ? goog.userAgent.product.detectedChrome_ = !0 : -1 != ua.indexOf("Android") ? goog.userAgent.product.detectedAndroid_ = !0 : -1 != ua.indexOf("Safari") && 
  (goog.userAgent.product.detectedSafari_ = !0));
};
goog.userAgent.product.PRODUCT_KNOWN_ || goog.userAgent.product.init_();
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.userAgent.product.detectedFirefox_;
goog.userAgent.product.CAMINO = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CAMINO : goog.userAgent.product.detectedCamino_;
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.detectedIphone_;
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.userAgent.product.detectedIpad_;
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.userAgent.product.detectedAndroid_;
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.detectedSafari_;
goog.userAgent.product.determineVersion_ = function $goog$userAgent$product$determineVersion_$() {
  if (goog.userAgent.product.FIREFOX) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Firefox\/([0-9.]+)/);
  }
  if (goog.userAgent.product.IE || goog.userAgent.product.OPERA) {
    return goog.userAgent.VERSION;
  }
  if (goog.userAgent.product.CHROME) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Chrome\/([0-9.]+)/);
  }
  if (goog.userAgent.product.SAFARI) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Version\/([0-9.]+)/);
  }
  if (goog.userAgent.product.IPHONE || goog.userAgent.product.IPAD) {
    var arr = goog.userAgent.product.execRegExp_(/Version\/(\S+).*Mobile\/(\S+)/);
    if (arr) {
      return arr[1] + "." + arr[2];
    }
  } else {
    if (goog.userAgent.product.ANDROID) {
      var version = goog.userAgent.product.getFirstRegExpGroup_(/Android\s+([0-9.]+)/);
      return version ? version : goog.userAgent.product.getFirstRegExpGroup_(/Version\/([0-9.]+)/);
    }
    if (goog.userAgent.product.CAMINO) {
      return goog.userAgent.product.getFirstRegExpGroup_(/Camino\/([0-9.]+)/);
    }
  }
  return "";
};
goog.userAgent.product.getFirstRegExpGroup_ = function $goog$userAgent$product$getFirstRegExpGroup_$(re) {
  var arr = goog.userAgent.product.execRegExp_(re);
  return arr ? arr[1] : "";
};
goog.userAgent.product.execRegExp_ = function $goog$userAgent$product$execRegExp_$(re) {
  return re.exec(goog.userAgent.getUserAgentString());
};
goog.userAgent.product.VERSION = goog.userAgent.product.determineVersion_();
goog.userAgent.product.isVersion = function $goog$userAgent$product$isVersion$(version) {
  return 0 <= goog.string.compareVersions(goog.userAgent.product.VERSION, version);
};
i18n.input.net = {};
i18n.input.net.AsyncHttpRequest = function $i18n$input$net$AsyncHttpRequest$(url, payload, opt_data) {
  this.url = url;
  this.payload = payload;
  this.data = opt_data ? opt_data : null;
};
i18n.input.net.AsyncHttpService = function $i18n$input$net$AsyncHttpService$() {
};
i18n.input.net.AsyncHttpService.DEFAULT_SERVER_URL = "https://inputtools.google.com";
i18n.input.net.AsyncHttpRequest.JSON_HEADER = goog.object.create(goog.net.XhrIo.CONTENT_TYPE_HEADER, "application/json; charset=UTF-8");
i18n.input.net.AsyncHttpService.isCORSSupported = function $i18n$input$net$AsyncHttpService$isCORSSupported$() {
  return goog.userAgent.product.CHROME && goog.userAgent.product.isVersion(25) || goog.userAgent.product.IE && goog.userAgent.product.isVersion(8) || goog.userAgent.product.FIREFOX && goog.userAgent.product.isVersion(19) || goog.userAgent.product.OPERA && goog.userAgent.product.isVersion(12.1) || goog.userAgent.product.SAFARI && goog.userAgent.product.isVersion(5.1) || goog.userAgent.product.IPAD && goog.userAgent.product.isVersion(3.2) || goog.userAgent.product.ANDROID && goog.userAgent.product.isVersion(2.1);
};
i18n.input.net.AsyncHttpService.isHandwritingSupported = function $i18n$input$net$AsyncHttpService$isHandwritingSupported$() {
  return goog.userAgent.product.IE ? goog.userAgent.product.isVersion(9) : i18n.input.net.AsyncHttpService.isCORSSupported();
};
i18n.input.net.JsonpService = function $i18n$input$net$JsonpService$(opt_server, opt_callbackParam) {
  goog.Disposable.call(this);
  this.server_ = opt_server || i18n.input.net.AsyncHttpService.DEFAULT_SERVER_URL;
  this.callbackParam_ = opt_callbackParam || i18n.input.net.JsonpService.CALLBACK_PARAM;
  this.statSession_ = i18n.input.common.Statistics.getInstance().getSession(i18n.input.common.Metrics.Type.POPUP_EDITOR);
};
goog.inherits(i18n.input.net.JsonpService, goog.Disposable);
i18n.input.net.JsonpService.CALLBACK_PARAM = "cb";
i18n.input.net.JsonpService.prototype.timeStamp_ = 0;
i18n.input.net.JsonpService.prototype.disposeInternal = function $i18n$input$net$JsonpService$$disposeInternal$() {
  this.jsonp_ && this.abort(this.pendingRequestId_);
  this.jsonp_ = null;
};
i18n.input.net.JsonpService.prototype.send = function $i18n$input$net$JsonpService$$send$(url, payload, callback, opt_handler) {
  this.pendingRequestId_ && this.abort(this.pendingRequestId_);
  url = this.server_ + url;
  var jsonpId = url + "&" + this.callbackParam_;
  jsonpId != this.jsonpId_ && (this.jsonp_ = new goog.net.Jsonp(url, this.callbackParam_), this.jsonpId_ = jsonpId);
  payload && goog.Uri.QueryData.createFromMap(payload);
  var handlerCallback = goog.bind(callback, opt_handler), requestId = this.jsonp_.send(payload, goog.bind(this.responseHandler_, this, handlerCallback, !0), goog.bind(this.responseHandler_, this, handlerCallback, !1));
  this.pendingRequestId_ = {reqId:requestId, key:this.jsonpId_};
  this.timeStamp_ = goog.now();
  return this.pendingRequestId_;
};
i18n.input.net.JsonpService.prototype.abort = function $i18n$input$net$JsonpService$$abort$(id) {
  id.key == this.jsonpId_ && this.jsonp_.cancel(id.reqId);
};
i18n.input.net.JsonpService.prototype.responseHandler_ = function $i18n$input$net$JsonpService$$responseHandler_$(callback, isSuccess, responseJson) {
  isSuccess && this.statSession_.push(i18n.input.common.Metrics.Param.QUERY_LATENCY, goog.now() - this.timeStamp_);
  callback(isSuccess, isSuccess ? responseJson : null);
  this.pendingRequestId_ = null;
};
i18n.input.chrome.DataSource = function $i18n$input$chrome$DataSource$(numOfCanddiate, callback) {
  goog.events.EventTarget.call(this);
  this.callback = callback;
};
goog.inherits(i18n.input.chrome.DataSource, goog.events.EventTarget);
i18n.input.chrome.DataSource.prototype.ready = !1;
i18n.input.chrome.DataSource.prototype.correctionLevel = 0;
i18n.input.chrome.DataSource.prototype.setLanguage = function $i18n$input$chrome$DataSource$$setLanguage$(language) {
  this.language = language;
};
i18n.input.chrome.DataSource.prototype.isReady = function $i18n$input$chrome$DataSource$$isReady$() {
  return this.ready;
};
i18n.input.chrome.DataSource.prototype.sendCompletionRequest = goog.functions.NULL;
i18n.input.chrome.DataSource.prototype.sendPredictionRequest = goog.functions.NULL;
i18n.input.chrome.DataSource.prototype.setCorrectionLevel = function $i18n$input$chrome$DataSource$$setCorrectionLevel$(level) {
  this.correctionLevel = level;
};
i18n.input.chrome.DataSource.EventType = {CANDIDATES_BACK:"cb$0", READY:"r$1"};
i18n.input.chrome.DataSource.CandidatesBackEvent = function $i18n$input$chrome$DataSource$CandidatesBackEvent$(source, candidates) {
  goog.events.Event.call(this, i18n.input.chrome.DataSource.EventType.CANDIDATES_BACK);
  this.source = source;
  this.candidates = candidates;
};
goog.inherits(i18n.input.chrome.DataSource.CandidatesBackEvent, goog.events.Event);
i18n.input.chrome.xkb = {};
i18n.input.chrome.xkb.Correction = function $i18n$input$chrome$xkb$Correction$(source, target) {
  this.source = source;
  this.target = target;
};
$jscomp.scope.REGEX_DOUBLE_SPACE_PERIOD_CHARACTERS = /[a-z0-9\u00E0-\u00F6\u00F8-\u017F'"%\)\]\}\>\+]\s\s$/i;
i18n.input.chrome.xkb.Controller = function $i18n$input$chrome$xkb$Controller$() {
  this.handler_ = new goog.events.EventHandler(this);
  window.xkb && xkb.DataSource && (this.dataSource_ = new xkb.DataSource(5, this.onCandidatesBack_.bind(this)), this.dataSource_.setCorrectionLevel(this.correctionLevel));
  this.statistics_ = i18n.input.chrome.inputview.Statistics.getInstance();
  this.enableDoubleSpacePeriod_ = !0;
  this.candidates_ = [];
};
goog.inherits(i18n.input.chrome.xkb.Controller, i18n.input.chrome.AbstractController);
i18n.input.chrome.xkb.Controller.prototype.correctionLevel = 1;
i18n.input.chrome.xkb.Controller.prototype.lastCorrection_ = null;
i18n.input.chrome.xkb.Controller.prototype.dataSource_ = null;
i18n.input.chrome.xkb.Controller.prototype.compositionText_ = "";
i18n.input.chrome.xkb.Controller.prototype.deadKey_ = "";
i18n.input.chrome.xkb.Controller.prototype.lastCommitType_ = -1;
i18n.input.chrome.xkb.Controller.prototype.onSurroundingTextChanged = function $i18n$input$chrome$xkb$Controller$$onSurroundingTextChanged$(engineID, surroundingInfo) {
  var text = surroundingInfo.text.slice(0, Math.min(surroundingInfo.anchor, surroundingInfo.focus));
  this.compositionText_ || (this.lastCorrection_ && !goog.string.endsWith(text, this.lastCorrection_.target) && (this.lastCorrection_ = null), this.enableDoubleSpacePeriod_ && $jscomp.scope.REGEX_DOUBLE_SPACE_PERIOD_CHARACTERS.test(text) ? this.deleteSurroudingText_(-2, 2, function() {
    this.commitText_(". ", !1, 4);
    this.lastCorrection_ = new i18n.input.chrome.xkb.Correction(" ", ". ");
  }.bind(this)) : chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.SURROUNDING_TEXT_CHANGED, i18n.input.chrome.message.Name.TEXT, text)));
};
i18n.input.chrome.xkb.Controller.prototype.deleteSurroudingText_ = function $i18n$input$chrome$xkb$Controller$$deleteSurroudingText_$(offset, length, callback) {
  var parameters = {};
  parameters.engineID = this.engineID_;
  parameters.contextID = this.context.contextID;
  parameters.offset = offset;
  parameters.length = length;
  chrome.input.ime.deleteSurroundingText(parameters, callback);
};
i18n.input.chrome.xkb.Controller.prototype.activate = function $i18n$input$chrome$xkb$Controller$$activate$(inputToolCode) {
  this.engineID_ = inputToolCode;
};
i18n.input.chrome.xkb.Controller.prototype.unregister = function $i18n$input$chrome$xkb$Controller$$unregister$() {
  i18n.input.chrome.xkb.Controller.superClass_.unregister.call(this);
  this.compositionText_ = "";
  this.lastCommitType_ = -1;
  this.deadKey_ = "";
  chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.CONTEXT_BLUR));
};
i18n.input.chrome.xkb.Controller.prototype.reset = function $i18n$input$chrome$xkb$Controller$$reset$() {
  i18n.input.chrome.xkb.Controller.superClass_.reset.call(this);
  this.commitText_("", !1, 1);
  this.compositionText_ = "";
};
i18n.input.chrome.xkb.Controller.prototype.register = function $i18n$input$chrome$xkb$Controller$$register$(context) {
  i18n.input.chrome.xkb.Controller.superClass_.register.call(this, context);
  this.sendContextFocusEvent_();
};
i18n.input.chrome.xkb.Controller.prototype.sendContextFocusEvent_ = function $i18n$input$chrome$xkb$Controller$$sendContextFocusEvent_$() {
  if (this.context) {
    var contextType = this.context.type;
    this.isPasswdBox_() && (contextType = "password");
    chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.CONTEXT_FOCUS, i18n.input.chrome.message.Name.CONTEXT_TYPE, contextType));
  }
};
i18n.input.chrome.xkb.Controller.prototype.commitText_ = function $i18n$input$chrome$xkb$Controller$$commitText_$(text, append, triggerType) {
  var textToCommit;
  if (this.context && (this.lastCommitType_ = triggerType, textToCommit = text && append ? this.compositionText_ + text : text && !append ? text : this.compositionText_, 0 != this.context.contextID && textToCommit)) {
    var contextID = this.context.contextID;
    chrome.input.ime.commitText(goog.object.create(i18n.input.chrome.message.Name.CONTEXT_ID, contextID, i18n.input.chrome.message.Name.TEXT, textToCommit));
    this.dataSource_ && this.supportPrediction_() && this.dataSource_.sendPredictionRequest(textToCommit);
    var source = this.compositionText_, target = textToCommit.trim();
    this.statistics_.recordCommit(source.length, target.length, goog.array.indexOf(this.candidates_, target), this.statistics_.getTargetType(source, target), triggerType);
    this.compositionText_ = "";
  }
};
i18n.input.chrome.xkb.Controller.prototype.setComposition_ = function $i18n$input$chrome$xkb$Controller$$setComposition_$(text, append, normalizable, opt_spatialData) {
  if (this.context) {
    var deadKey = this.deadKey_;
    this.deadKey_ = "";
    if (i18n.input.chrome.inputview.util.DISPLAY_MAPPING[text]) {
      deadKey == text ? text = i18n.input.chrome.inputview.util.DISPLAY_MAPPING[text] : this.deadKey_ = text;
    } else {
      if (normalizable && deadKey) {
        if (!i18n.input.chrome.inputview.util.supportDeadKey(text)) {
          return;
        }
        text = (text + deadKey).normalize();
      }
    }
    append && (text = this.compositionText_ + text);
    this.compositionText_ = text;
    chrome.input.ime.setComposition(goog.object.create(i18n.input.chrome.message.Name.CONTEXT_ID, this.context.contextID, i18n.input.chrome.message.Name.TEXT, text, i18n.input.chrome.message.Name.CURSOR, text.length));
    text ? (this.statistics_.recordCommit(text.length, text.length, -1, 0, 1), this.dataSource_ && this.dataSource_.sendCompletionRequest(text, opt_spatialData)) : chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.CANDIDATES_BACK, i18n.input.chrome.message.Name.MSG, goog.object.create(i18n.input.chrome.message.Name.SOURCE, [], i18n.input.chrome.message.Name.CANDIDATES, [], i18n.input.chrome.message.Name.MATCHED_LENGTHS, [])));
  }
};
i18n.input.chrome.xkb.Controller.prototype.processSetLanguage_ = function $i18n$input$chrome$xkb$Controller$$processSetLanguage_$(msg) {
  this.dataSource_ && this.dataSource_.setLanguage(msg[i18n.input.chrome.message.Name.LANGUAGE]);
};
i18n.input.chrome.xkb.Controller.prototype.onCandidatesBack_ = function $i18n$input$chrome$xkb$Controller$$onCandidatesBack_$(source, candidates, matchedLengths) {
  this.candidates_ = [];
  if (source == this.compositionText_) {
    for (var i$$0 = 0;i$$0 < candidates.length;i$$0++) {
      this.candidates_.push(goog.object.create(i18n.input.chrome.message.Name.CANDIDATE, candidates[i$$0], i18n.input.chrome.message.Name.ID, i$$0));
    }
  }
  source && (this.candidates_ = goog.array.filter(this.candidates_, function(c, i) {
    return void 0 == matchedLengths[i] || matchedLengths[i] == source.length;
  }), this.candidates_ = goog.array.map(this.candidates_, function(candidate) {
    var c = candidate[i18n.input.chrome.message.Name.CANDIDATE];
    if (0 == c.toLowerCase().indexOf(source.toLowerCase())) {
      candidate[i18n.input.chrome.message.Name.CANDIDATE] = source + c.slice(source.length);
    } else {
      if (source.toUpperCase() == source) {
        candidate[i18n.input.chrome.message.Name.CANDIDATE] = c.toUpperCase();
      } else {
        var ch = source.charAt(0);
        ch.toUpperCase() == ch && (candidate[i18n.input.chrome.message.Name.CANDIDATE] = c.charAt(0).toUpperCase() + c.slice(1));
      }
    }
    return candidate;
  }));
  chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.CANDIDATES_BACK, i18n.input.chrome.message.Name.MSG, goog.object.create(i18n.input.chrome.message.Name.SOURCE, source, i18n.input.chrome.message.Name.CANDIDATES, this.candidates_, i18n.input.chrome.message.Name.MATCHED_LENGTHS, matchedLengths)));
};
i18n.input.chrome.xkb.Controller.prototype.isUrlBox_ = function $i18n$input$chrome$xkb$Controller$$isUrlBox_$() {
  return!!this.context && !!this.context.type && "url" == this.context.type;
};
i18n.input.chrome.xkb.Controller.prototype.isPasswdBox_ = function $i18n$input$chrome$xkb$Controller$$isPasswdBox_$() {
  return!!this.context && (!this.context.type || "password" == this.context.type);
};
i18n.input.chrome.xkb.Controller.prototype.supportPrediction_ = function $i18n$input$chrome$xkb$Controller$$supportPrediction_$() {
  return!this.isUrlBox_() && !this.isPasswdBox_();
};
i18n.input.chrome.xkb.Controller.prototype.maybeAutoSpace_ = function $i18n$input$chrome$xkb$Controller$$maybeAutoSpace_$() {
  this.compositionText_ || 2 != this.lastCommitType_ || this.commitText_(" ", !1, 0);
};
i18n.input.chrome.xkb.Controller.prototype.handleNonCharacterKeyEvent = function $i18n$input$chrome$xkb$Controller$$handleNonCharacterKeyEvent$(keyData) {
  var code = keyData[i18n.input.chrome.message.Name.CODE], type = keyData[i18n.input.chrome.message.Name.MSG_TYPE];
  if (code == i18n.input.chrome.inputview.events.KeyCodes.BACKSPACE && type == goog.events.EventType.KEYDOWN) {
    if (this.compositionText_) {
      this.compositionText_ = this.compositionText_.substring(0, this.compositionText_.length - 1);
      this.setComposition_(this.compositionText_, !1, !1);
      return;
    }
    if (this.lastCorrection_) {
      var offset = this.lastCorrection_.target.length;
      this.deleteSurroudingText_(offset, offset, function() {
        this.commitText_(this.lastCorrection_.source, !1, 1);
        this.lastCorrection_ = null;
      }.bind(this));
      return;
    }
    chrome.runtime.sendMessage(goog.object.create(i18n.input.chrome.message.Name.MSG_TYPE, i18n.input.chrome.message.Type.CANDIDATES_BACK, i18n.input.chrome.message.Name.MSG, goog.object.create(i18n.input.chrome.message.Name.SOURCE, [], i18n.input.chrome.message.Name.CANDIDATES, [], i18n.input.chrome.message.Name.MATCHED_LENGTHS, [])));
  }
  code != i18n.input.chrome.inputview.events.KeyCodes.BACKSPACE && this.commitText_("", !1, 1);
  goog.array.contains(i18n.input.chrome.AbstractController.FUNCTIONAL_KEYS, code) && this.statistics_.recordSpecialKey(code, !!this.compositionText_);
  this.lastCommitType_ = -1;
  i18n.input.chrome.xkb.Controller.superClass_.handleNonCharacterKeyEvent.call(this, keyData);
};
i18n.input.chrome.xkb.Controller.prototype.handleCharacterKeyEvent = function $i18n$input$chrome$xkb$Controller$$handleCharacterKeyEvent$(keyData) {
  if (keyData[i18n.input.chrome.message.Name.MSG_TYPE] == goog.events.EventType.KEYUP) {
    var ch = keyData[i18n.input.chrome.message.Name.KEY], isSpaceKey = keyData[i18n.input.chrome.message.Name.CODE] == i18n.input.chrome.inputview.events.KeyCodes.SPACE;
    if (isSpaceKey) {
      var firstCandidate = 0 < this.candidates_.length ? this.candidates_[0][i18n.input.chrome.message.Name.CANDIDATE] : "";
      firstCandidate && this.compositionText_ && firstCandidate != this.compositionText_ ? (this.lastCorrection_ = new i18n.input.chrome.xkb.Correction(this.compositionText_ + " ", firstCandidate + " "), this.commitText_(firstCandidate + " ", !1, 0)) : this.commitText_(" ", !0, 0);
    } else {
      var commit = i18n.input.chrome.inputview.util.isCommitCharacter(ch);
      commit || !this.dataSource_ || !this.dataSource_.isReady() || this.isPasswdBox_() || this.isUrlBox_() ? this.commitText_(ch, !0, commit ? 3 : 1) : (this.maybeAutoSpace_(), this.setComposition_(ch, !0, !0, keyData[i18n.input.chrome.message.Name.SPATIAL_DATA] || {}));
    }
  }
};
i18n.input.chrome.xkb.Controller.prototype.processMessage = function $i18n$input$chrome$xkb$Controller$$processMessage$(message, sender, sendResponse) {
  var type = message[i18n.input.chrome.message.Name.MSG_TYPE];
  switch(type) {
    case i18n.input.chrome.message.Type.SELECT_CANDIDATE:
      var candidate = message[i18n.input.chrome.message.Name.CANDIDATE];
      this.maybeAutoSpace_();
      this.commitText_(candidate[i18n.input.chrome.message.Name.CANDIDATE], !1, 2);
      return;
    case i18n.input.chrome.message.Type.SET_LANGUAGE:
      this.processSetLanguage_(message);
      return;
    case i18n.input.chrome.message.Type.CONNECT:
      var contextType = "";
      this.context && (contextType = this.context.type, this.isPasswdBox_() && (contextType = "password"));
      this.updateSettings({autoSpace:!0, autoCapital:!0, supportCompact:!0, contextType:contextType});
      return;
    case i18n.input.chrome.message.Type.SEND_KEY_EVENT:
      var keyData = message[i18n.input.chrome.message.Name.KEY_DATA];
      if (2 <= keyData.length && "Toggle" == keyData[0][i18n.input.chrome.message.Name.CODE]) {
        keyData[0][i18n.input.chrome.message.Name.CODE] = keyData[1][i18n.input.chrome.message.Name.CODE] = "Backquote";
        keyData[0][i18n.input.chrome.message.Name.REQUEST_ID] = String(this.requestId++);
        keyData[0][i18n.input.chrome.message.Name.KEYCODE] = 28;
        keyData[1][i18n.input.chrome.message.Name.REQUEST_ID] = String(this.requestId++);
        keyData[1][i18n.input.chrome.message.Name.KEYCODE] = 28;
        chrome.input.ime.sendKeyEvents(goog.object.create(i18n.input.chrome.message.Name.CONTEXT_ID, 0, i18n.input.chrome.message.Name.KEY_DATA, keyData));
        return;
      }
      if (window.xkb && xkb.handleSendKeyEvent) {
        xkb.handleSendKeyEvent(keyData);
        return;
      }
    ;
  }
  i18n.input.chrome.xkb.Controller.superClass_.processMessage.call(this, message, sender, sendResponse);
};
i18n.input.lang = {};
i18n.input.lang.InputToolCode = {INPUTMETHOD_ARRAY92_CHINESE_TRADITIONAL:"zh-hant-t-i0-array-1992", INPUTMETHOD_CANGJIE82_CHINESE_SIMPLIFIED:"zh-hans-t-i0-cangjie-1982", INPUTMETHOD_CANGJIE82_CHINESE_TRADITIONAL:"zh-hant-t-i0-cangjie-1982", INPUTMETHOD_CANGJIE87_CHINESE_SIMPLIFIED:"zh-hans-t-i0-cangjie-1987", INPUTMETHOD_CANGJIE87_CHINESE_TRADITIONAL:"zh-hant-t-i0-cangjie-1987", INPUTMETHOD_CANGJIE87_QUICK_CHINESE_TRADITIONAL:"zh-hant-t-i0-cangjie-1987-x-m0-simplified", INPUTMETHOD_CANTONESE_TRADITIONAL:"yue-hant-t-i0-und", 
INPUTMETHOD_DAYI88_CHINESE_TRADITIONAL:"zh-hant-t-i0-dayi-1988", INPUTMETHOD_PINYIN_CHINESE_SIMPLIFIED:"zh-t-i0-pinyin", INPUTMETHOD_PINYIN_CHINESE_TRADITIONAL:"zh-hant-t-i0-pinyin", INPUTMETHOD_TRANSLITERATION_AMHARIC:"am-t-i0-und", INPUTMETHOD_TRANSLITERATION_ARABIC:"ar-t-i0-und", INPUTMETHOD_TRANSLITERATION_BELARUSIAN:"be-t-i0-und", INPUTMETHOD_TRANSLITERATION_BENGALI:"bn-t-i0-und", INPUTMETHOD_TRANSLITERATION_BULGARIAN:"bg-t-i0-und", INPUTMETHOD_TRANSLITERATION_DUTCH:"nl-t-i0-und", INPUTMETHOD_TRANSLITERATION_ENGLISH:"en-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_FRENCH:"fr-t-i0-und", INPUTMETHOD_TRANSLITERATION_GERMAN:"de-t-i0-und", INPUTMETHOD_TRANSLITERATION_GREEK:"el-t-i0-und", INPUTMETHOD_TRANSLITERATION_GUJARATI:"gu-t-i0-und", INPUTMETHOD_TRANSLITERATION_HEBREW:"he-t-i0-und", INPUTMETHOD_TRANSLITERATION_HINDI:"hi-t-i0-und", INPUTMETHOD_TRANSLITERATION_HIRAGANA:"ja-hira-t-i0-und", INPUTMETHOD_TRANSLITERATION_ITALIAN:"it-t-i0-und", INPUTMETHOD_TRANSLITERATION_JAPANESE:"ja-t-ja-hira-i0-und", INPUTMETHOD_TRANSLITERATION_KANNADA:"kn-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_MALAYALAM:"ml-t-i0-und", INPUTMETHOD_TRANSLITERATION_MARATHI:"mr-t-i0-und", INPUTMETHOD_TRANSLITERATION_NEPALI:"ne-t-i0-und", INPUTMETHOD_TRANSLITERATION_ORIYA:"or-t-i0-und", INPUTMETHOD_TRANSLITERATION_PERSIAN:"fa-t-i0-und", INPUTMETHOD_TRANSLITERATION_POLISH:"pl-t-i0-und", INPUTMETHOD_TRANSLITERATION_PORTUGUESE:"pt-t-i0-und", INPUTMETHOD_TRANSLITERATION_PORTUGUESE_BRRAZIL:"pt-br-t-i0-und", INPUTMETHOD_TRANSLITERATION_PORTUGUESE_PORTUGAL:"pt-pt-t-i0-und", INPUTMETHOD_TRANSLITERATION_PUNJABI:"pa-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_RUSSIAN:"ru-t-i0-und", INPUTMETHOD_TRANSLITERATION_SANSKRIT:"sa-t-i0-und", INPUTMETHOD_TRANSLITERATION_SERBIAN:"sr-t-i0-und", INPUTMETHOD_TRANSLITERATION_SINHALESE:"si-t-i0-und", INPUTMETHOD_TRANSLITERATION_SPANISH:"es-t-i0-und", INPUTMETHOD_TRANSLITERATION_TAMIL:"ta-t-i0-und", INPUTMETHOD_TRANSLITERATION_TELUGU:"te-t-i0-und", INPUTMETHOD_TRANSLITERATION_TIGRINYA:"ti-t-i0-und", INPUTMETHOD_TRANSLITERATION_TURKISH:"tr-t-i0-und", INPUTMETHOD_TRANSLITERATION_UKRAINE:"uk-t-i0-und", 
INPUTMETHOD_TRANSLITERATION_URDU:"ur-t-i0-und", INPUTMETHOD_TRANSLITERATION_VIETNAMESE:"vi-t-i0-und", INPUTMETHOD_WUBI_CHINESE_SIMPLIFIED:"zh-t-i0-wubi-1986", INPUTMETHOD_ZHUYIN_CHINESE_TRADITIONAL:"zh-hant-t-i0-und", KEYBOARD_ALBANIAN:"sq-t-k0-und", KEYBOARD_ARABIC:"ar-t-k0-und", KEYBOARD_ARMENIAN_EASTERN:"hy-hyr-t-k0-und", KEYBOARD_ARMENIAN_WESTERN:"hy-hyt-t-k0-und", KEYBOARD_BASQUE:"eu-t-k0-und", KEYBOARD_BELARUSIAN:"be-t-k0-und", KEYBOARD_BENGALI_INSCRIPT:"bn-t-k0-und", KEYBOARD_BENGALI_PHONETIC:"bn-t-und-latn-k0-und", 
KEYBOARD_BOSNIAN:"bs-t-k0-und", KEYBOARD_BRAZILIAN_PORTUGUESE:"pt-br-t-k0-und", KEYBOARD_BULGARIAN:"bg-t-k0-und", KEYBOARD_BULGARIAN_PHONETIC:"bg-t-k0-qwerty", KEYBOARD_CATALAN:"ca-t-k0-und", KEYBOARD_CHEROKEE:"chr-t-k0-und", KEYBOARD_CHEROKEE_PHONETIC:"chr-t-und-latn-k0-und", KEYBOARD_CROATIAN:"hr-t-k0-und", KEYBOARD_CZECH:"cs-t-k0-und", KEYBOARD_CZECH_QWERTZ:"cs-t-k0-qwertz", KEYBOARD_DANISH:"da-t-k0-und", KEYBOARD_DARI:"prs-t-k0-und", KEYBOARD_DEVANAGARI_PHONETIC:"hi-t-k0-qwerty", KEYBOARD_DUTCH:"nl-t-k0-und", 
KEYBOARD_DUTCH_INTL:"nl-t-k0-intl", KEYBOARD_DZONGKHA:"dz-t-k0-und", KEYBOARD_ENGLISH:"en-t-k0-und", KEYBOARD_ENGLISH_DVORAK:"en-t-k0-dvorak", KEYBOARD_ESTONIAN:"et-t-k0-und", KEYBOARD_ETHIOPIC:"und-ethi-t-k0-und", KEYBOARD_TIGRINYA_ETHIOPIC:"ti-ethi-t-k0-und", KEYBOARD_FINNISH:"fi-t-k0-und", KEYBOARD_FRENCH:"fr-t-k0-und", KEYBOARD_FRENCH_INTL:"fr-t-k0-intl", KEYBOARD_GALICIAN:"gl-t-k0-und", KEYBOARD_GEORGIAN_QWERTY:"ka-t-k0-und", KEYBOARD_GEORGIAN_TYPEWRITER:"ka-t-k0-legacy", KEYBOARD_GERMAN:"de-t-k0-und", 
KEYBOARD_GERMAN_INTL:"de-t-k0-intl", KEYBOARD_GREEK:"el-t-k0-und", KEYBOARD_GUJARATI_INSCRIPT:"gu-t-k0-und", KEYBOARD_GUJARATI_PHONETIC:"gu-t-und-latn-k0-qwerty", KEYBOARD_GURMUKHI_INSCRIPT:"pa-guru-t-k0-und", KEYBOARD_GURMUKHI_PHONETIC:"pa-guru-t-und-latn-k0-und", KEYBOARD_HAITIAN:"ht-t-k0-und", KEYBOARD_HEBREW:"he-t-k0-und", KEYBOARD_HINDI:"hi-t-k0-und", KEYBOARD_HUNGARIAN_101:"hu-t-k0-101key", KEYBOARD_ICELANDIC:"is-t-k0-und", KEYBOARD_INDONESIAN:"id-t-k0-und", KEYBOARD_INUKTITUT_NUNAVIK:"iu-t-k0-nunavik", 
KEYBOARD_INUKTITUT_NUNAVUT:"iu-t-k0-nunavut", KEYBOARD_IRISH:"ga-t-k0-und", KEYBOARD_ITALIAN:"it-t-k0-und", KEYBOARD_ITALIAN_INTL:"it-t-k0-intl", KEYBOARD_JAVANESE:"jw-t-k0-und", KEYBOARD_KANNADA_INSCRIPT:"kn-t-k0-und", KEYBOARD_KANNADA_PHONETIC:"kn-t-und-latn-k0-und", KEYBOARD_KAZAKH:"kk-t-k0-und", KEYBOARD_KHMER:"km-t-k0-und", KEYBOARD_KOREAN:"ko-t-k0-und", KEYBOARD_KYRGYZ:"ky-cyrl-t-k0-und", KEYBOARD_LAO:"lo-t-k0-und", KEYBOARD_LATVIAN:"lv-t-k0-und", KEYBOARD_LITHUANIAN:"lt-t-k0-und", KEYBOARD_MACEDONIAN:"mk-t-k0-und", 
KEYBOARD_MALAY:"ms-t-k0-und", KEYBOARD_MALAYALAM_INSCRIPT:"ml-t-k0-und", KEYBOARD_MALAYALAM_PHONETIC:"ml-t-und-latn-k0-und", KEYBOARD_MALTESE:"mt-t-k0-und", KEYBOARD_MAORI:"mi-t-k0-und", KEYBOARD_MARATHI:"mr-t-k0-und", KEYBOARD_MONGOLIAN_CYRILLIC:"mn-cyrl-t-k0-und", KEYBOARD_MONTENEGRIN:"srp-t-k0-und", KEYBOARD_MYANMAR:"my-t-k0-und", KEYBOARD_MYANMAR_MYANSAN:"my-t-k0-myansan", KEYBOARD_NAVAJO:"nv-t-k0-und", KEYBOARD_NAVAJO_STANDARD:"nv-t-k0-std", KEYBOARD_NEPALI_INSCRIPT:"ne-t-k0-und", KEYBOARD_NEPALI_PHONETIC:"ne-t-und-latn-k0-und", 
KEYBOARD_NORWEGIAN:"no-t-k0-und", KEYBOARD_ORIYA_INSCRIPT:"or-t-k0-und", KEYBOARD_ORIYA_PHONETIC:"or-t-und-latn-k0-und", KEYBOARD_PAN_AFRICA_LATIN:"latn-002-t-k0-und", KEYBOARD_PASHTO:"ps-t-k0-und", KEYBOARD_PERSIAN:"fa-t-k0-und", KEYBOARD_POLISH:"pl-t-k0-und", KEYBOARD_PORTUGUESE:"pt-pt-t-k0-und", KEYBOARD_PORTUGUESE_BRAZIL_INTL:"pt-br-t-k0-intl", KEYBOARD_PORTUGUESE_PORTUGAL_INTL:"pt-pt-t-k0-intl", KEYBOARD_ROMANI:"rom-t-k0-und", KEYBOARD_ROMANIAN:"ro-t-k0-und", KEYBOARD_ROMANIAN_SR13392_PRIMARY:"ro-t-k0-legacy", 
KEYBOARD_ROMANIAN_SR13392_SECONDARY:"ro-t-k0-extended", KEYBOARD_RUSSIAN:"ru-t-k0-und", KEYBOARD_RUSSIAN_PHONETIC:"ru-t-k0-qwerty", KEYBOARD_SANSKRIT_PHONETIC:"sa-t-und-latn-k0-und", KEYBOARD_SERBIAN_CYRILLIC:"sr-cyrl-t-k0-und", KEYBOARD_SERBIAN_LATIN:"sr-latn-t-k0-und", KEYBOARD_SINHALA:"si-t-k0-und", KEYBOARD_SLOVAK:"sk-t-k0-und", KEYBOARD_SLOVAK_QWERTY:"sk-t-k0-qwerty", KEYBOARD_SLOVENIAN:"sl-t-k0-und", KEYBOARD_SORANI_KURDISH_AR:"ckb-t-k0-ar", KEYBOARD_SORANI_KURDISH_EN:"ckb-t-k0-en", KEYBOARD_SOUTHERN_UZBEK:"uzs-t-k0-und", 
KEYBOARD_SPANISH:"es-t-k0-und", KEYBOARD_SPANISH_INTL:"es-t-k0-intl", KEYBOARD_SWAHILI:"sw-t-k0-und", KEYBOARD_SWEDISH:"sv-t-k0-und", KEYBOARD_SWISS_GERMAN:"de-ch-t-k0-und", KEYBOARD_TAGALOG:"tl-t-k0-und", KEYBOARD_TAMIL_99:"ta-t-k0-ta99", KEYBOARD_TAMIL_INSCRIPT:"ta-t-k0-und", KEYBOARD_TAMIL_ITRANS:"ta-t-k0-itrans", KEYBOARD_TAMIL_PHONETIC:"ta-t-und-latn-k0-und", KEYBOARD_TAMIL_TYPEWRITER:"ta-t-k0-typewriter", KEYBOARD_TATAR:"tt-t-k0-und", KEYBOARD_TELUGU_INSCRIPT:"te-t-k0-und", KEYBOARD_TELUGU_PHONETIC:"te-t-und-latn-k0-und", 
KEYBOARD_THAI:"th-t-k0-und", KEYBOARD_THAI_PATTAJOTI:"th-t-k0-pattajoti", KEYBOARD_THAI_TIS:"th-t-k0-tis", KEYBOARD_TIGRINYA:"ti-t-k0-und", KEYBOARD_TURKISH_F:"tr-t-k0-legacy", KEYBOARD_TURKISH_Q:"tr-t-k0-und", KEYBOARD_UIGHUR:"ug-t-k0-und", KEYBOARD_UKRAINIAN_101:"uk-t-k0-101key", KEYBOARD_URDU:"ur-t-k0-und", KEYBOARD_US_INTERNATIONAL:"en-us-t-k0-intl", KEYBOARD_UZBEK_CYRILLIC_PHONETIC:"uz-cyrl-t-k0-und", KEYBOARD_UZBEK_CYRILLIC_TYPEWRITTER:"uz-cyrl-t-k0-legacy", KEYBOARD_UZBEK_LATIN:"uz-latn-t-k0-und", 
KEYBOARD_VIETNAMESE_TCVN:"vi-t-k0-und", KEYBOARD_VIETNAMESE_TELEX:"vi-t-k0-legacy", KEYBOARD_VIETNAMESE_VIQR:"vi-t-k0-viqr", KEYBOARD_VIETNAMESE_VNI:"vi-t-k0-vni", KEYBOARD_WELSH:"cy-t-k0-und", KEYBOARD_YIDDISH:"yi-t-k0-und", HANDWRIT_AFRIKAANS:"af-t-i0-handwrit", HANDWRIT_ALBANIAN:"sq-t-i0-handwrit", HANDWRIT_ARABIC:"ar-t-i0-handwrit", HANDWRIT_BASQUE:"eu-t-i0-handwrit", HANDWRIT_BELARUSIAN:"be-t-i0-handwrit", HANDWRIT_BOSNIAN:"bs-t-i0-handwrit", HANDWRIT_BULGARIAN:"bg-t-i0-handwrit", HANDWRIT_CANTONESE:"zh-yue-t-i0-handwrit", 
HANDWRIT_CATALAN:"ca-t-i0-handwrit", HANDWRIT_CEBUANO:"ceb-t-i0-handwrit", HANDWRIT_CHINESE:"zh-t-i0-handwrit", HANDWRIT_CHINESE_SIMPLIFIED:"zh-hans-t-i0-handwrit", HANDWRIT_CHINESE_TRADITIONAL:"zh-hant-t-i0-handwrit", HANDWRIT_CROATIAN:"hr-t-i0-handwrit", HANDWRIT_CZECH:"cs-t-i0-handwrit", HANDWRIT_DANISH:"da-t-i0-handwrit", HANDWRIT_DUTCH:"nl-t-i0-handwrit", HANDWRIT_ENGLISH:"en-t-i0-handwrit", HANDWRIT_ESPERANTO:"eo-t-i0-handwrit", HANDWRIT_ESTONIAN:"et-t-i0-handwrit", HANDWRIT_FILIPINO:"fil-t-i0-handwrit", 
HANDWRIT_FINNISH:"fi-t-i0-handwrit", HANDWRIT_FRENCH:"fr-t-i0-handwrit", HANDWRIT_GALICIAN:"gl-t-i0-handwrit", HANDWRIT_GERMAN:"de-t-i0-handwrit", HANDWRIT_GREEK:"el-t-i0-handwrit", HANDWRIT_GUJARATI:"gu-t-i0-handwrit", HANDWRIT_HAITIAN:"ht-t-i0-handwrit", HANDWRIT_HEBREW:"he-t-i0-handwrit", HANDWRIT_HINDI:"hi-t-i0-handwrit", HANDWRIT_HMONG:"hmn-t-i0-handwrit", HANDWRIT_HUNGARIAN:"hu-t-i0-handwrit", HANDWRIT_ICELANDIC:"is-t-i0-handwrit", HANDWRIT_INDONESIAN:"id-t-i0-handwrit", HANDWRIT_IRISH:"ga-t-i0-handwrit", 
HANDWRIT_ITALIAN:"it-t-i0-handwrit", HANDWRIT_JAPANESE:"ja-t-i0-handwrit", HANDWRIT_JAVANESE:"jv-t-i0-handwrit", HANDWRIT_KANNADA:"kn-t-i0-handwrit", HANDWRIT_KOREAN:"ko-t-i0-handwrit", HANDWRIT_LATIN:"la-t-i0-handwrit", HANDWRIT_LATVIAN:"lv-t-i0-handwrit", HANDWRIT_LITHUANIAN:"lt-t-i0-handwrit", HANDWRIT_MACEDONIAN:"mk-t-i0-handwrit", HANDWRIT_MALAY:"ms-t-i0-handwrit", HANDWRIT_MALTESE:"mt-t-i0-handwrit", HANDWRIT_MAORI:"mi-t-i0-handwrit", HANDWRIT_MARATHI:"mr-t-i0-handwrit", HANDWRIT_MONGOLIAN:"mn-t-i0-handwrit", 
HANDWRIT_NORWEGIAN:"no-t-i0-handwrit", HANDWRIT_NORWEGIAN_BOKMAL:"nb-t-i0-handwrit", HANDWRIT_NORWEGIAN_NYNORSK:"nn-t-i0-handwrit", HANDWRIT_ORIYA:"or-t-i0-handwrit", HANDWRIT_PERSIAN:"fa-t-i0-handwrit", HANDWRIT_POLISH:"pl-t-i0-handwrit", HANDWRIT_PORTUGUESE:"pt-t-i0-handwrit", HANDWRIT_PORTUGUESE_BRAZIL:"pt-br-t-i0-handwrit", HANDWRIT_PORTUGUESE_PORTUGAL:"pt-pt-t-i0-handwrit", HANDWRIT_PUNJABI:"pa-t-i0-handwrit", HANDWRIT_ROMANIAN:"ro-t-i0-handwrit", HANDWRIT_RUSSIAN:"ru-t-i0-handwrit", HANDWRIT_SERBIAN:"sr-t-i0-handwrit", 
HANDWRIT_SLOVAK:"sk-t-i0-handwrit", HANDWRIT_SLOVENIAN:"sl-t-i0-handwrit", HANDWRIT_SOMALI:"so-t-i0-handwrit", HANDWRIT_SPANISH:"es-t-i0-handwrit", HANDWRIT_SWAHILI:"sw-t-i0-handwrit", HANDWRIT_SWEDISH:"sv-t-i0-handwrit", HANDWRIT_TAMIL:"ta-t-i0-handwrit", HANDWRIT_TELUGU:"te-t-i0-handwrit", HANDWRIT_THAI:"th-t-i0-handwrit", HANDWRIT_TURKISH:"tr-t-i0-handwrit", HANDWRIT_UKRAINIAN:"uk-t-i0-handwrit", HANDWRIT_VIETNAMESE:"vi-t-i0-handwrit", HANDWRIT_WELSH:"cy-t-i0-handwrit", HANDWRIT_ZULU:"zu-t-i0-handwrit"};
i18n.input.chrome.EventType = {EXECUTE_WAITING_EVENT:"ewe"};
i18n.input.chrome.Background = function $i18n$input$chrome$Background$() {
  goog.Disposable.call(this);
  this.isHandlingEvent_ = !1;
  this.waitingEventHandlers = [];
  this.controllers = {};
  this.eventTarget = new goog.events.EventTarget;
  this.registerDisposable(this.eventTarget);
  this.activateFn_ = this.onActivate.bind(this);
  this.deactivateFn_ = this.wrapAsyncHandler_(this.onDeactivate_);
  this.focusFn_ = this.wrapAsyncHandler_(this.onFocus_);
  this.blurFn_ = this.wrapAsyncHandler_(this.onBlur_);
  this.onKeyEventFn_ = this.wrapAsyncHandler_(this.onKeyEventAsync_);
  this.onCandidateClickFn_ = this.wrapAsyncHandler_(this.onCandidateClicked_);
  this.onMenuItemFn_ = this.wrapAsyncHandler_(this.onMenuItemActivated_);
  this.onInputContextUpdateFn_ = this.wrapAsyncHandler_(this.onInputContextUpdate_);
  this.onSurroundingTextFn_ = this.wrapAsyncHandler_(this.onSurroundingTextChanged_);
  this.onResetFn_ = this.wrapAsyncHandler_(this.onReset_);
  i18n.input.chrome.Background.IS_XKB && (this.activeController = new i18n.input.chrome.xkb.Controller, this.controllers[i18n.input.chrome.Background.ControllerType.XKB] = this.activeController);
  this.eventHandler_ = new goog.events.EventHandler(this);
  chrome.runtime.onMessage.addListener(this.wrapAsyncHandler_(this.onMessage));
  this.eventHandler_.listen(this.eventTarget, i18n.input.chrome.EventType.EXECUTE_WAITING_EVENT, this.executeWaitingEventHandlers_);
  i18n.input.chrome.Background.IS_XKB || this.init_();
};
goog.inherits(i18n.input.chrome.Background, goog.Disposable);
i18n.input.chrome.Background.IS_XKB = !1;
i18n.input.chrome.Background.prototype.initialized_ = !1;
i18n.input.chrome.Background.ControllerType = {HMM:0, T13N:1, ZHUYIN:2, LATIN:3, JA:4, HWT:5, XKB:6, VKD:7};
i18n.input.chrome.Background.MAX_QUEUE_LEN_ = 255;
i18n.input.chrome.Background.prototype.activeController = null;
i18n.input.chrome.Background.prototype.context = null;
i18n.input.chrome.Background.prototype.uninit_ = function $i18n$input$chrome$Background$$uninit_$() {
  this.initialized_ && (chrome.input.ime.onActivate.removeListener(this.activateFn_), chrome.input.ime.onDeactivated.removeListener(this.deactivateFn_), chrome.input.ime.onFocus.removeListener(this.focusFn_), chrome.input.ime.onBlur.removeListener(this.blurFn_), chrome.input.ime.onKeyEvent.removeListener(this.onKeyEventFn_), chrome.input.ime.onCandidateClicked.removeListener(this.onCandidateClickFn_), chrome.input.ime.onMenuItemActivated.removeListener(this.onMenuItemFn_), chrome.input.ime.onInputContextUpdate.removeListener(this.onInputContextUpdateFn_), 
  chrome.input.ime.onSurroundingTextChanged && chrome.input.ime.onSurroundingTextChanged.removeListener(this.onSurroundingTextFn_), chrome.input.ime.onReset && chrome.input.ime.onReset.removeListener(this.onResetFn_), this.initialized_ = !1);
};
i18n.input.chrome.Background.prototype.init_ = function $i18n$input$chrome$Background$$init_$() {
  this.initialized_ || (chrome.input.ime.onActivate.addListener(this.activateFn_), chrome.input.ime.onDeactivated.addListener(this.deactivateFn_), chrome.input.ime.onFocus.addListener(this.focusFn_), chrome.input.ime.onBlur.addListener(this.blurFn_), chrome.input.ime.onKeyEvent.addListener(this.onKeyEventFn_, ["async"]), chrome.input.ime.onCandidateClicked.addListener(this.onCandidateClickFn_), chrome.input.ime.onMenuItemActivated.addListener(this.onMenuItemFn_), chrome.input.ime.onInputContextUpdate.addListener(this.onInputContextUpdateFn_), 
  chrome.input.ime.onSurroundingTextChanged && chrome.input.ime.onSurroundingTextChanged.addListener(this.onSurroundingTextFn_), chrome.input.ime.onReset && chrome.input.ime.onReset.addListener(this.onResetFn_), this.initialized_ = !0, window.setContext = this.onFocus_.bind(this));
};
i18n.input.chrome.Background.prototype.wrapAsyncHandler_ = function $i18n$input$chrome$Background$$wrapAsyncHandler_$(handler$$0) {
  return function(handler) {
    this.waitingEventHandlers.length < i18n.input.chrome.Background.MAX_QUEUE_LEN_ && this.waitingEventHandlers.push(Function.prototype.apply.bind(handler, this, Array.prototype.slice.call(arguments, 1)));
    this.executeWaitingEventHandlers_();
  }.bind(this, handler$$0);
};
i18n.input.chrome.Background.prototype.executeWaitingEventHandlers_ = function $i18n$input$chrome$Background$$executeWaitingEventHandlers_$() {
  for (;!(this.activeController && this.activeController.isNaclReady && !this.activeController.isNaclReady() || this.isHandlingEvent_) && 0 != this.waitingEventHandlers.length;) {
    this.isHandlingEvent_ = !0;
    try {
      this.waitingEventHandlers.shift()();
    } catch (e) {
      console.log(e.stack);
    }
    this.isHandlingEvent_ = !1;
  }
};
i18n.input.chrome.Background.prototype.onMessage = function $i18n$input$chrome$Background$$onMessage$(message, sender, sendResponse) {
  this.activeController && this.activeController.processMessage(message, sender, sendResponse);
  if (i18n.input.chrome.Background.IS_XKB) {
    var msgType = message[i18n.input.chrome.message.Name.MSG_TYPE];
    msgType == i18n.input.chrome.message.Type.CONNECT ? this.init_() : msgType == i18n.input.chrome.message.Type.DISCONNECT && this.uninit_();
  }
  return!1;
};
i18n.input.chrome.Background.prototype.onActivate = function $i18n$input$chrome$Background$$onActivate$(engineId) {
  this.waitingEventHandlers = [];
  this.activeController && this.activeController.reset();
  this.activeController = this.controllers[i18n.input.chrome.Background.ControllerType.XKB];
  this.activeController || (this.activeController = new i18n.input.chrome.xkb.Controller, this.controllers[i18n.input.chrome.Background.ControllerType.XKB] = this.activeController);
  this.activeController.activate(engineId);
  this.context && this.activeController.register(this.context);
};
i18n.input.chrome.Background.prototype.onDeactivate_ = function $i18n$input$chrome$Background$$onDeactivate_$() {
  this.activeController && this.activeController.deactivate();
};
i18n.input.chrome.Background.prototype.onFocus_ = function $i18n$input$chrome$Background$$onFocus_$(context) {
  this.context = context;
  this.activeController && this.activeController.register(context);
};
i18n.input.chrome.Background.prototype.onBlur_ = function $i18n$input$chrome$Background$$onBlur_$() {
  this.context = null;
  this.activeController && this.activeController.unregister();
};
i18n.input.chrome.Background.prototype.onReset_ = function $i18n$input$chrome$Background$$onReset_$() {
  this.activeController && this.activeController.reset();
};
i18n.input.chrome.Background.prototype.onKeyEventAsync_ = function $i18n$input$chrome$Background$$onKeyEventAsync_$(engineID, keyData) {
  if (this.activeController) {
    this.activeController.requestId = Number(keyData.requestId) + 1;
    var ret;
    try {
      ret = this.activeController.handleEvent(keyData);
    } catch (e) {
      chrome.input.ime.keyEventHandled(keyData.requestId, !1), console.log(e.stack);
    }
    goog.isDef(ret) && chrome.input.ime.keyEventHandled(keyData.requestId, ret);
  }
};
i18n.input.chrome.Background.prototype.onCandidateClicked_ = function $i18n$input$chrome$Background$$onCandidateClicked_$(engineID, candidateID) {
  this.activeController && this.activeController.selectCandidate(candidateID);
};
i18n.input.chrome.Background.prototype.onMenuItemActivated_ = function $i18n$input$chrome$Background$$onMenuItemActivated_$(engineID, name) {
  this.activeController && this.activeController.switchInputToolState(name);
};
i18n.input.chrome.Background.prototype.onInputContextUpdate_ = function $i18n$input$chrome$Background$$onInputContextUpdate_$(context) {
  this.activeController && this.activeController.onInputContextUpdate && this.activeController.onInputContextUpdate(context);
};
i18n.input.chrome.Background.prototype.onSurroundingTextChanged_ = function $i18n$input$chrome$Background$$onSurroundingTextChanged_$(engineID, info) {
  this.activeController && this.activeController.onSurroundingTextChanged(engineID, info);
};
i18n.input.chrome.Background.prototype.disposeInternal = function $i18n$input$chrome$Background$$disposeInternal$() {
  goog.dispose(this.eventHandler_);
  i18n.input.chrome.Background.superClass_.disposeInternal.call(this);
};
window.background = new i18n.input.chrome.Background;
})();
