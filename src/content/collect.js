// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Constants
var SEND_MESSAGE_TIMEOUT = 2000;

(function() {
  setTimeout(function() {
    // field list add to gen_204 request
    var dl = encodeURIComponent(window.location.href),
    	client = "s5-cb-ext",
  		v = 1,
  		type = 1,
  		ie = encodeURIComponent(document.inputEncoding),
  		sr = encodeURIComponent(screen.width + "x" + screen.height),
  		dm = encodeURIComponent(window.location.hostname),
  		tl = encodeURIComponent(document.title);

  	// send request to background call gen_204 request
  	chrome.runtime.sendMessage({
		  method: 'GET',
		  action: 'xhttp',
		  url: 'http://sfive.vn/extensions/gen_204?client=' + client + '&v=' + v + '&type=' + type + 
		 	    '&ie=' + ie + '&sr=' + sr + '&dm=' + dm + '&dl=' + dl + '&tl=' + tl},
		  function(responseText) {}
  	);
  }, SEND_MESSAGE_TIMEOUT);
})();