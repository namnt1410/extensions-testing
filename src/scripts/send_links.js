// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Send back to the popup a sorted deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.

var links = [];

links = [].slice.apply(document.querySelectorAll('audio, video, audio > source, video > source'));
links = links.map(function(element) {
  return element.src;
});

// fix download link for vccorp page anf thanhnien
var elements = [].slice.apply(document.querySelectorAll('.VCSortableInPreviewMode, .ThanhNienPlayer-pc'));
elements.map(function(element) {
  var data_vid = element.getAttribute("data-vid");
  if (data_vid == null) return;

  if (location.hostname == 'tuoitre.vn') {
    links.push("https://hls.tuoitre.vn/" + data_vid)
  } else {
    links.push("https://hls.mediacdn.vn/" + data_vid); 
  }
});

// Remove duplicates and invalid URLs.
var kBadPrefix = 'blob:';
links = links.filter(function(link, index, self) {
  return index == self.indexOf(link) && 
      link != '' && 
      (link.toLowerCase().startsWith("http://") || 
       link.toLowerCase().startsWith("https://"));
});

var request = {
  action: "send_links",
  links: links,
  url: document.URL,
  hostname: location.hostname,
  title: document.title,
};

chrome.runtime.sendMessage(request);

//console.log(JSON.parse(window.localStorage.getItem('zmp3_mini_player'))["queueSongMap"]);
