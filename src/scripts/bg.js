// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var translatorTabId = 0;

chrome.contextMenus.create({"id": "contextmenu_main_item", "title": chrome.i18n.getMessage('contextmenu_translate'), "contexts": ["selection"]});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "contextmenu_main_item") {
    var translateURL = 'https://translate.google.com/#auto/vi/'+encodeURIComponent(info.selectionText);
    if (translatorTabId) {
      chrome.tabs.update(translatorTabId, {'url': translateURL}, function(tab) {
        chrome.tabs.highlight({'windowId': tab.windowId, 'tabs': tab.index}, function() {
          chrome.windows.update(tab.windowId, {focused: true}, function() {});
        });
      });
    } else {
      chrome.tabs.create({'url': translateURL}, function(tab) {
        translatorTabId = tab.id;
      });
    }
  }
});

chrome.tabs.onRemoved.addListener(function (tabId, info) {
  if (translatorTabId && tabId == translatorTabId) {
    translatorTabId = 0;
  }
});

// handle request from content script
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  if (request.action == "xhttp") {
    var xhttp = new XMLHttpRequest();
    var method = request.method ? request.method.toUpperCase() : 'GET';

    xhttp.onload = function() {
      callback(xhttp.responseText);
    };
    xhttp.onerror = function() {
      callback();
    };
    xhttp.open(method, request.url, true);
    if (method == 'POST') {
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhttp.send(request.data);
    return true; 
  }
});
