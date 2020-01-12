// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import {
  kHttpURLPrefix,
  kHttpsURLPrefix,
  kDefaultInactiveIconPath,
  kDefaultActiveIconPath,
  kActiveMusicIconPath,
  kActiveVideoIconPath
} from './constants/browser_actions';

var nhaccuatui = require('./modules/nhaccuatui');
var youtube = require('./modules/youtube');

var getHostName = require('./modules/utils').getHostName;

function extractLinksFromURL(tabId, url, title) {
  var hostname = getHostName(url);

  if (hostname == null) return false;

  var downloadItems = [];

  if (hostname.indexOf('nhaccuatui.com') != -1) {
    nhaccuatui.getMediaLinks(url, downloadItems, function(downloadItems) {
      chrome.tabs.get(tabId, function(tab2) {
        if (tab2.url == url && downloadItems.length > 0) {
          if (downloadItems[0].ext == "mp3") {
            updateBrowserActionParts(tabId, kActiveMusicIconPath, 'popup.html', downloadItems.length.toString());
          } else if (downloadItems[0].ext == "mp4") {
            updateBrowserActionParts(tabId, kActiveVideoIconPath, 'popup.html', downloadItems.length.toString());
          }
        }
      });
    });
    return true;
  } 
  else if (hostname.indexOf('youtube.com') != -1) {
    youtube.getMediaLinks(url, downloadItems, title, function(downloadItems) {
      chrome.tabs.get(tabId, function(tab2) {
        if (tab2.url == url && downloadItems.length > 0) {
          updateBrowserActionParts(tabId, kActiveVideoIconPath, 'popup.html', '');
        }
      });
    });
    return true;
  }
  else if (hostname.indexOf('zingmp3.vn') != -1) {
    chrome.tabs.get(tabId, function(tab) {
      updateBrowserActionParts(tabId, kActiveVideoIconPath, 'popup.html', '');
    });
    return true;
  }

  return false;
}

function updateBrowserActionParts(tabId, icon_path, popup_url, badge_text) {
  chrome.browserAction.setIcon({path: icon_path, tabId: tabId});
  chrome.browserAction.setPopup({popup: popup_url, tabId: tabId});
  chrome.browserAction.setBadgeText({text: badge_text, tabId: tabId});
}

chrome.tabs.onUpdated.addListener(function(tabId, props, tab) {
  if (kHttpURLPrefix !== tab.url.toLowerCase().substr(0, kHttpURLPrefix.length) &&
      kHttpsURLPrefix !== tab.url.toLowerCase().substr(0, kHttpsURLPrefix.length))
    return;

  if (props.status == "complete") {
    updateBrowserActionParts(tabId, kDefaultActiveIconPath, 'popup.html', '');
    extractLinksFromURL(tabId, tab.url, tab.title);
  } else if (props.url !== 'undefined' && props.status == "loading") {
    // update inactive browser action
    updateBrowserActionParts(tabId, kDefaultInactiveIconPath, '', '');
  }
});