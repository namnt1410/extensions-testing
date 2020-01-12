// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This extension demonstrates using chrome.downloads.download() to
// download URLs.
import {
  kBtnSelectAllId,
  kBtnDownloadSelectedId,
  kBtnCloseId,
  kDownloadItemsId,
  kRowItemClassName,
  kFileNameClassName,
  kFileSizeClassName,
  kDownloadBtnClassName,
  kDataUrlAttrName,
  kDataOutputFilenameAttrName
} from './constants/popup';

var utils = require('./modules/utils');
var nhaccuatui = require('./modules/nhaccuatui');
var youtube = require('./modules/youtube');

var Item = require('./modules/item').Item;

var downloadItems = [];

var currentTabURL = "";
var currentTabHostname = "";
var currentTabTitle = "";

// Load size span inner html
function getDownloadItemHeader (id, url) {
  var xhr = new XMLHttpRequest();
  xhr._id = id;
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var content_type = this.getResponseHeader('Content-Type') ? 
           utils.extractExtFromContentTypeHeader(this.getResponseHeader('Content-Type')) : "";
      var content_length = this.getResponseHeader('Content-Length') ? 
          utils.formatBytes(this.getResponseHeader('Content-Length')) : "";

      var fileSizeDiv = document.getElementById(this._id);
      var extSpan = fileSizeDiv.getElementsByClassName('ext')[0];
      if (extSpan.innerHTML == "") 
        extSpan.innerHTML = content_type + ' ';

      fileSizeDiv.getElementsByClassName('length')[0].innerText = content_length;
    }
  };
  xhr.open("HEAD", url, true);
  xhr.send();
}

// Attach events to download button
function attachEventsToDownloadButton (button) {
  button.addEventListener("click", function() {
    var url = this.getAttribute(kDataUrlAttrName);
    var filename = this.getAttribute(kDataOutputFilenameAttrName);
    utils.downloadFile(url, filename);
  });
  
  // Google Analytics tracking download button click 
  button.addEventListener('click', trackDownloadButtonClick);
}

// Display all visible links.
function showDownloadItems() {
  utils.removeChildren(document.getElementById(kDownloadItemsId));

  for (var i = 0; i < downloadItems.length; ++i) {
    var downloadItem = downloadItems[i];

    var row = document.createElement('div');
    row.className = kRowItemClassName;
    if (i%2 == 0) row.classList.add("odd");
    else row.classList.add("even");

    var filename = document.createElement("div");
    filename.className = kFileNameClassName;

    var checkbox = document.createElement('input');

    checkbox.checked = false;
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + i;

    filename.appendChild(checkbox);

    var label = document.createElement('label');
    label.for = 'check' + i;
    label.innerText = downloadItem.filename != null ? downloadItem.filename : downloadItem.url;

    label.onclick = function() {
      var e = document.getElementById(this.for);
      e.checked = !e.checked;
    }

    filename.appendChild(label);

    row.appendChild(filename);

    var filesize = document.createElement('div');
    filesize.className = kFileSizeClassName;
    filesize.id = 'size' + i;

    var props = ['ext', 'quality', 'length'];
    var spans = {};

    props.forEach(function (prop) {
      spans[prop] = document.createElement('span');
      spans[prop].className = prop;
      filesize.appendChild(spans[prop]);
    });
    
    if (downloadItem.ext) 
      spans['ext'].innerHTML = downloadItem.ext + ' ';
    if (downloadItem.quality)
      spans['quality'].innerHTML = downloadItem.quality + ' ';

    row.appendChild(filesize);

    getDownloadItemHeader(filesize.id, downloadItem.url);

    var action = document.createElement('div');
    action.className = 'action';

    var button = document.createElement('button');
    button.type = "button";
    button.className = kDownloadBtnClassName;
    button.innerText = chrome.i18n.getMessage("popup_download");
    button.setAttribute(kDataUrlAttrName, downloadItem.url);
    button.setAttribute(kDataOutputFilenameAttrName, 
                        downloadItem.filename ? downloadItem.filename : '');

    attachEventsToDownloadButton(button);

    action.appendChild(button);

    row.appendChild(action);

    document.getElementById(kDownloadItemsId).appendChild(row);
  }
}

// Select all visible links.
function selectAll() {
  for (var i = 0; i < downloadItems.length; ++i) {
    document.getElementById('check' + i).checked = true;
  }
}

// Download all visible checked links.
function downloadCheckedLinks() {
  for (var i = 0; i < downloadItems.length; ++i) {
    if (document.getElementById('check' + i).checked) {
	    var url = downloadItems[i].url;
      var filename = downloadItems[i].filename ? downloadItems[i].filename : '';
      utils.downloadFile(url, filename);
    }
  }
}

// Close window
function closeWindow() {
  window.close();
}

function initEvents () {
  document.getElementById(kBtnSelectAllId).onclick = selectAll;
  document.getElementById(kBtnDownloadSelectedId).onclick = downloadCheckedLinks;
  document.getElementById(kBtnCloseId).onclick = closeWindow;
}

function attachTrackEvents () {
  // Google Analytics tracking select all and download selected click 
  document.getElementById(kBtnSelectAllId).addEventListener('click', trackButtonClick);
  document.getElementById(kBtnDownloadSelectedId).addEventListener('click', trackButtonClick);
}

function executeScript(tabId) {
  chrome.tabs.executeScript(
    tabId, {file: 'dist/scripts/send_links.js', allFrames: true});
}

function executeZingMp3ContentScript(tabId) {
  chrome.tabs.executeScript(
    tabId, {file: 'dist/scripts/zmp3_content_script.js', allFrames: false});
}

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _AnalyticsCode = 'UA-109609614-1';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked', currentTabHostname]);
}

function trackDownloadButtonClick(e) {
  _gaq.push(['_trackEvent', 'btn-download-link', 'clicked', currentTabHostname]);
}

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {
  utils.loadLocaleMessages();

  initEvents();
  
  showDownloadItems();

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id}, function (activeTabs) {
      var tabId = activeTabs[0].id;
      currentTabURL = activeTabs[0].url;
      currentTabTitle = activeTabs[0].title;
      currentTabHostname = utils.getHostName(currentTabURL);

      if (currentTabHostname.indexOf('nhaccuatui.com') != -1) {
        nhaccuatui.getMediaLinks(currentTabURL, downloadItems, showDownloadItems);
      }
      else if (currentTabHostname.indexOf('youtube.com') != -1) {
        youtube.getMediaLinks(currentTabURL, downloadItems, currentTabTitle, showDownloadItems);
      }
      else if (currentTabHostname.indexOf('zingmp3.vn') != -1) {
        executeZingMp3ContentScript(tabId);
      }
      else {
        executeScript(tabId);
      }
      
      attachTrackEvents();
    });
  });
};

// Add links to allLinks and visibleLinks, sort and show them.  send_links.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "send_links") {
    handleSendLinksRequest(request);
  }
  else if (request.action == "zmp3_content_script") {
    handleZmp3ContentScriptRequest(request);
  }
});

function handleSendLinksRequest(request) {
  var links = request.links;

  if (links.length == 0)
    return;

  var title = request.title;
  var hostname = request.hostname; 

  for (var index in links) {
    var parser = document.createElement('a');
    parser.href = links[index];

    var pathname = parser.pathname;
    var filename = unescape(pathname.substring(pathname.lastIndexOf('/') + 1));

    if (['phimbathu.com', 'vophim.com', 'bilutv.com', 'xemphimso.com'].indexOf(hostname) > -1 && 
        ['play.php', 'referer.php'].indexOf(filename) > -1) {
      downloadItems.push(new Item(currentTabTitle + '.mp4', null, 'mp4', links[index]));
    } 
    else if (['openload.co', 'oload.download'].indexOf(hostname) > -1) {
      downloadItems.push(new Item(filename + '.mp4', null, "mp4", links[index]));
    } 
    else if (['www.phimmoi.net'].indexOf(hostname) > -1) {
      if (['blank.mp4', 'blank2.mp4'].indexOf(filename) > -1) continue;
      downloadItems.push(new Item(currentTabTitle + '.mp4', null, "mp4", links[index]));
    } else {
      downloadItems.push(new Item(filename, null, null, links[index]));
    }
  }
  showDownloadItems();
} 

function handleZmp3ContentScriptRequest(request) {
  var zmp3_mini_player = request.zmp3_mini_player;

  console.log(zmp3_mini_player);

  if (zmp3_mini_player["queueSongMap"] != undefined) {
    let queueSongMap = zmp3_mini_player["queueSongMap"];
    for (var songId in queueSongMap) {
      if (queueSongMap.hasOwnProperty(songId)) {
        // Do things here
        let song = queueSongMap[songId];
        let title = song["title"];
        let streaming = song["streaming"];

        if (streaming == undefined) continue;

        for (var quality in streaming["default"]) {
          if (streaming["default"].hasOwnProperty(quality) &&
              streaming["default"][quality]) {
            let display_quality = quality + 'kbps';
            downloadItems.push(new Item(title + ' ' + display_quality + '.mp3', 
                                        display_quality, 
                                        "mp3", 
                                        "https:" + streaming["default"][quality]));
          }
        }
      }
    }
    showDownloadItems(downloadItems);
  }
} 