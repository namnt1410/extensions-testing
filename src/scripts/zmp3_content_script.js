// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Send back to the popup a sorted deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.

var request = {
  action: "zmp3_content_script",
  zmp3_mini_player: JSON.parse(window.localStorage.getItem('zmp3_mini_player')),
};

chrome.runtime.sendMessage(request);
