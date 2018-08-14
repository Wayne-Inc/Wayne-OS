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
    chrome.networkingPrivate.getVisibleNetworks('All', function(networks) {
      for (var i = 0; i < networks.length; ++i) {
        chrome.networkingPrivate.getManagedProperties(networks[i].GUID,
                                                      function(i)
                                                      {console.log(i);});
      }
    });

    // Test dns.
    chrome.dns.resolve('example.com', function(i) {console.log(i);});

    // Test diagnostics.
    chrome.diagnostics.sendPacket({'ip': '127.0.0.1'}, function(r) {
      console.log(r);
    });

    // Test socket.
    chrome.socket.create('udp', {}, function(i) {
      chrome.socket.bind(i.socketId, '127.0.0.1', 28475, function(r) {
        console.log(r);
      });
    });

    // Test metricsPrivate.
    chrome.metricsPrivate.recordUserAction('Test Action');
    chrome.metricsPrivate.recordSmallCount('Test Small Count', 5);
    chrome.metricsPrivate.recordValue({
      'metricName': 'Test Value', 'type': 'histogram-log',
      'min': 0, 'max': 50, 'buckets': 10
    }, 42);
    chrome.metricsPrivate.recordMediumTime('Test Medium Time', 60);
  } catch (e) {
    return {'success': false, 'error': e};
  }
  return {'success': true};
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
