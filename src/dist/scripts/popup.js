/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/constants/popup.js":
/*!****************************************!*\
  !*** ./src/scripts/constants/popup.js ***!
  \****************************************/
/*! exports provided: kBtnSelectAllId, kBtnDownloadSelectedId, kBtnCloseId, kDownloadItemsId, kFileNameClassName, kFileSizeClassName, kRowItemClassName, kDownloadBtnClassName, kDataUrlAttrName, kDataOutputFilenameAttrName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kBtnSelectAllId", function() { return kBtnSelectAllId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kBtnDownloadSelectedId", function() { return kBtnDownloadSelectedId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kBtnCloseId", function() { return kBtnCloseId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kDownloadItemsId", function() { return kDownloadItemsId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kFileNameClassName", function() { return kFileNameClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kFileSizeClassName", function() { return kFileSizeClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kRowItemClassName", function() { return kRowItemClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kDownloadBtnClassName", function() { return kDownloadBtnClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kDataUrlAttrName", function() { return kDataUrlAttrName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kDataOutputFilenameAttrName", function() { return kDataOutputFilenameAttrName; });
var kBtnSelectAllId = 'btn-select-all';
var kBtnDownloadSelectedId = 'btn-download-selected';
var kBtnCloseId = 'btn-close';
var kDownloadItemsId = 'download-items';
var kFileNameClassName = 'file-name';
var kFileSizeClassName = 'file-size';
var kRowItemClassName = 'row-item';
var kDownloadBtnClassName = 'button download-button';
var kDataUrlAttrName = 'data-url';
var kDataOutputFilenameAttrName = 'data-output-filename';

/***/ }),

/***/ "./src/scripts/modules/item.js":
/*!*************************************!*\
  !*** ./src/scripts/modules/item.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.Item = function (filename, quality, ext, url) {
  this.filename = filename;
  this.quality = quality;
  this.ext = ext;
  this.url = url;
};

/***/ }),

/***/ "./src/scripts/modules/nhaccuatui.js":
/*!*******************************************!*\
  !*** ./src/scripts/modules/nhaccuatui.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(/*! ./utils */ "./src/scripts/modules/utils.js");

var Item = __webpack_require__(/*! ./item */ "./src/scripts/modules/item.js").Item;

function NctItem(title, quality, ext, url) {
  filename = title + " " + quality + "." + ext;
  Item.call(this, filename, quality, ext, url);
}

exports.getMediaLinks = function (url, result, callback) {
  utils.makeAJAXPromise(url, "GET").then(function () {
    var matches = this.responseText.match(/"(http(s)?:\/\/(www|v).nhaccuatui.com\/flash\/xml?.*)"/);

    if (matches != null) {
      return utils.makeAJAXPromise(matches[1], "GET");
    }
  }).then(function () {
    if (this.responseText == undefined) return;
    domParser = new DOMParser();
    xmlDoc = domParser.parseFromString(this.responseText, "text/xml");
    type = xmlDoc.getElementsByTagName("type");

    if (xmlDoc.getElementsByTagName("type").length == 0) {
      ext = "mp4";
      title = xmlDoc.getElementsByTagName("title")[0].textContent.trim();
      result.push(new NctItem(title, "480p", ext, xmlDoc.getElementsByTagName("location")[0].textContent.trim()));
      result.push(new NctItem(title, "360p", ext, xmlDoc.getElementsByTagName("lowquality")[0].textContent.trim()));
    } else {
      type = xmlDoc.getElementsByTagName("type")[0].textContent.trim();

      if (type == "song" || type == "playlist") {
        tracklist = xmlDoc.getElementsByTagName("track");
        titles = xmlDoc.getElementsByTagName("title");
        urls = xmlDoc.getElementsByTagName("location");

        for (i = 0; i < tracklist.length; i++) {
          result.push(new NctItem(titles[i].textContent.trim(), "128kbps", "mp3", urls[i].textContent.trim()));
        }
      }
    }

    callback(result);
  });
};

/***/ }),

/***/ "./src/scripts/modules/utils.js":
/*!**************************************!*\
  !*** ./src/scripts/modules/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Format bytes
exports.formatBytes = function (bytes, decimals) {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}; // function zip arrays


exports.zip = function (arrays) {
  return arrays.reduce(function (acc, arr, i) {
    while (acc.length < arr.length) {
      acc.push([]);
    }

    for (var j = 0; j < arr.length; ++j) {
      acc[j][i] = arr[j];
    }

    return acc;
  }, []);
}; // function query string to json


exports.qsToJson = function (qs) {
  var decode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var res = {};
  var pars = qs.split('&');
  var k, v, sep;

  for (var i in pars) {
    sep = pars[i].indexOf('=');
    k = pars[i].substring(0, sep);
    v = pars[i].substring(sep + 1);
    res[k] = decode == true ? decodeURIComponent(v) : v;
  }

  return res;
}; // function query string to json undecode


exports.qsToJsonNew = function (qs) {
  var decode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var res = {};
  var pars = qs.split('&');
  var k, v, sep;

  for (var i in pars) {
    sep = pars[i].indexOf('=');
    k = pars[i].substring(0, sep);
    v = pars[i].substring(sep + 1);
    res[k] = decode == true ? decodeURIComponent(v) : v;
  }

  return res;
}; // function mimetype2ext


var mimeType2Ext = function mimeType2Ext(mt) {
  if (mt == null) return null;
  ext = {
    'audio/mp4': 'm4a',
    'audio/mpeg': 'mp3'
  }[mt];

  if (ext != null) {
    return ext;
  }

  var res = mt.substring(mt.indexOf('/') + 1);
  res = res.split(';')[0].trim().toLowerCase();
  return {
    '3gpp': '3gp',
    'smptett+xml': 'tt',
    'ttaf+xml': 'dfxp',
    'ttml+xml': 'ttml',
    'x-flv': 'flv',
    'x-mp4-fragmented': 'mp4',
    'x-ms-wmv': 'wmv',
    'mpegurl': 'm3u8',
    'x-mpegurl': 'm3u8',
    'vnd.apple.mpegurl': 'm3u8',
    'dash+xml': 'mpd',
    'f4m+xml': 'f4m',
    'hds+xml': 'f4m',
    'vnd.ms-sstr+xml': 'ism',
    'quicktime': 'mov',
    'mp2t': 'ts'
  }[res] || res;
};

exports.extractExtFromContentTypeHeader = function (type) {
  var mt = type.split(';')[0];
  return mt.split('/').length == 2 ? mimeType2Ext(mt) : "";
};

exports.sendXHTTPRequest = function (url, method, callback) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      callback(request.responseText); // Another callback here
    }
  };

  request.open(method, url, true);
  request.send();
};

exports.makeAJAXPromise = function (url, method) {
  var promise = new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          resolve(request.responseText);
        } else {
          reject();
        }
      }
    };

    request.open(method, url, true);
    request.send();
  });
  return promise;
};

exports.getHostName = function (url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  } else {
    return null;
  }
};

exports.loadLocaleMessages = function () {
  document.querySelectorAll("[i18n-content]").forEach(function (element) {
    element.innerHTML = chrome.i18n.getMessage(element.getAttribute("i18n-content"));
  });
};

exports.removeChildren = function (element) {
  var children = element.children;

  while (children.length > 0) {
    element.removeChild(children[children.length - 1]);
  }
};

var replaceProblematicCharacterFilename = function replaceProblematicCharacterFilename(filename) {
  return filename.replace(/[:\"\?\~\<\>\*\|\/\\]/g, '-');
}; // Download file


exports.downloadFile = function (url, filename) {
  if (filename != '') {
    chrome.downloads.download({
      url: url,
      filename: replaceProblematicCharacterFilename(filename)
    });
  } else {
    chrome.downloads.download({
      url: url
    });
  }
};

/***/ }),

/***/ "./src/scripts/modules/youtube.js":
/*!****************************************!*\
  !*** ./src/scripts/modules/youtube.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(/*! ./utils */ "./src/scripts/modules/utils.js");

var Item = __webpack_require__(/*! ./item */ "./src/scripts/modules/item.js").Item;

function parseId(url) {
  // http://stackoverflow.com/a/14701040
  var match = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/.exec(url);

  if (match instanceof Array && match[2] !== undefined) {
    return match[2];
  } else {
    return false;
  }
}

function parseAudioVideoFileType(type) {
  var res = [];
  var arr = type.split(';');
  var arr2 = arr[0].split('/');
  if (arr2.length == 1) return res;
  res[0] = arr2[0].toUpperCase();
  if (arr.length == 1 || res[0] == "AUDIO") return res;

  if (res[0] == "VIDEO" && arr.length == 2) {
    var arr3 = arr[1].split('=');

    if (arr3.length == 2 && arr3[0] == "+codecs") {
      var arr4 = arr3[1].split(",");
      if (arr4.length == 2) res[1] = "AUDIO";
    }
  }

  return res;
}

function fixRegExpString(regExpStr) {
  regExpStr = regExpStr.replace(new RegExp("\\$", 'g'), "\\$");
  return regExpStr;
}

function YoutubeItem(prefix, quality, type, url, signature) {
  var ext = utils.extractExtFromContentTypeHeader(type);
  var filename = prefix.replace(/\\/g, "");
  if (quality !== undefined) filename = filename + " " + quality;
  if (ext != "") filename = filename + "." + ext;
  var av = parseAudioVideoFileType(type);
  if (av.length > 0) filename = "[" + av.join('+') + "] " + filename;
  Item.call(this, filename, quality, ext, url);
  if (signature !== undefined) this.url = this.url + "&sig=" + signature;
}

function YoutubeHTMLWatchParser(watch_html) {
  this.watch_html = watch_html;

  this.getTitle = function () {
    match = /"title":"([^"]+)"/.exec(watch_html);
    return match instanceof Array ? match[1].replace(/\\u0026/g, '&') : "";
  };

  this.getYtplayerUrl = function () {
    ytplayer_url_json = this.watch_html.match(/"assets":.+?"js":\s*"([^"]+)"/)[1];
    return "https://www.youtube.com" + ytplayer_url_json.replace(/\\/g, "");
  };

  this.getSts = function () {
    match = /"sts":(\d+),/.exec(this.watch_html);
    return match instanceof Array ? match[1] : "";
  };
}

function YoutubePlayerJSCodeParser(player_jscode) {
  this.player_jscode = player_jscode;

  this.evalDecryptJSFunction = function () {
    var regExpList = [/\b[a-zA-Z0-9]+\s*&&\s*[a-zA-Z0-9]+\.set\([^,]+\s*,\s*encodeURIComponent\s*\(\s*([a-zA-Z0-9$]+)\(/, /([a-zA-Z0-9$]+)\s*=\s*function\(\s*a\s*\)\s*{\s*a\s*=\s*a\.split\(\s*""\s*\)/];

    for (var i in regExpList) {
      var res = this.player_jscode.match(regExpList[i]);

      if (res !== null) {
        funcname = res[1];
        break;
      }
    }

    matchArray = this.player_jscode.match(new RegExp(funcname + "=function\\([a-z]\\){[^;]+;([^.]+)[^}]+}"));
    funcDefStr = matchArray[0];
    subObjName = matchArray[1];
    subObjDefStr = this.player_jscode.match(new RegExp(fixRegExpString("var " + subObjName + "=[^\\n]+\\n[^\\n]+\\n[^}]+}}")))[0];
    eval(subObjDefStr);
    eval(funcDefStr);
    return funcname;
  };
}

var getYtbMediaLinksOld = function getYtbMediaLinksOld(url, result, title, callback) {
  var filename_prefix = "";
  var stream_map = [];
  utils.makeAJAXPromise(url, "GET").then(function (responseText) {
    var parser = new YoutubeHTMLWatchParser(responseText);
    var matches = responseText.match(/"url_encoded_fmt_stream_map":"([^"]+)"/);

    if (matches != null) {
      filename_prefix = parser.getTitle() || title;
      stream_map = matches[1].split(",");

      for (var i in stream_map) {
        stream_map[i] = utils.qsToJson(stream_map[i].replace(/\\u0026/g, '&'));

        if (stream_map[i].s == null) {
          result.push(new YoutubeItem(filename_prefix, stream_map[i].quality, stream_map[i].type, stream_map[i].url));
        }
      }

      callback(result);

      if (stream_map[0].s != null) {
        return utils.makeAJAXPromise(parser.getYtplayerUrl(), "GET");
      }
    }
  }).then(function (responseText2) {
    if (responseText2 == undefined) return;
    var parser2 = new YoutubePlayerJSCodeParser(responseText2);
    var funcname = parser2.evalDecryptJSFunction();

    for (var i in stream_map) {
      var signature = eval(funcname + "(\"" + stream_map[i].s + "\")");
      result.push(new YoutubeItem(filename_prefix, stream_map[i].quality, stream_map[i].type, stream_map[i].url, signature));
    }

    callback(result);
  });
};

var getYtbMediaLinksNew = function getYtbMediaLinksNew(url, result, title, callback) {
  var video_id = parseId(url);
  if (!video_id) return;
  var youtube_url = "https://www.youtube.com/watch?v=" + video_id;
  var filename_prefix = "";
  var adaptive_fmts = [];
  var ytplayerUrl = "";
  utils.makeAJAXPromise(youtube_url, "GET").then(function (responseText) {
    var parser = new YoutubeHTMLWatchParser(responseText);
    var sts = parser.getSts();
    ytplayerUrl = parser.getYtplayerUrl();
    filename_prefix = parser.getTitle() || title;
    var get_video_info_params = ["video_id=" + video_id, "ps=default", "gl=US", "hl=en"];

    if (sts !== "") {
      get_video_info_params = get_video_info_params.concat(["eurl=https://youtube.googleapis.com/v/" + video_id, "sts=" + sts]);
    }

    var get_video_info_url = "https://www.youtube.com/get_video_info?" + get_video_info_params.join('&');
    return utils.makeAJAXPromise(get_video_info_url, "GET");
  }).then(function (responseText1) {
    if (responseText1 == undefined) return;
    /*var match2 = /&adaptive_fmts=([^\&]+)/.exec(responseText1);
    if (match2 instanceof Array && match2[1] !== undefined) {
      adaptive_fmts = unescape(match2[1]).split(",");
      for (var i in adaptive_fmts) {
        adaptive_fmts[i] = utils.qsToJson(adaptive_fmts[i].replace(/\\u0026/g, '&'));
        if (adaptive_fmts[i].s == null) {
          result.push(new YoutubeItem(filename_prefix, 
              adaptive_fmts[i].quality_label || adaptive_fmts[i].quality, 
              adaptive_fmts[i].type, adaptive_fmts[i].url));
        }
      }
        callback(result);
        if (adaptive_fmts[0].s != null) {
        return utils.makeAJAXPromise(ytplayerUrl, "GET");
      }
    }*/

    return utils.makeAJAXPromise(ytplayerUrl, "GET");
  }).then(function (responseText2) {
    if (responseText2 == undefined) return;
    var parser2 = new YoutubePlayerJSCodeParser(responseText2);
    var funcname = parser2.evalDecryptJSFunction();
    var signature = eval(funcname + "(\"" + "c===AewRcbfzG=jYoUWTgb6CrFdUN9etaUI9czmv0Zx2mVQAiAJYnPvftXlnMPZiX-eDPMUrRgTN-bHW3oCuFMb_gng2KAhIQRww2IxgLA" + "\")");
    console.log(signature);
    /*for (var i in adaptive_fmts) {
      var signature = eval(funcname + "(\"" + adaptive_fmts[i].s + "\")");
      result.push(new YoutubeItem(filename_prefix, 
          adaptive_fmts[i].quality_label || adaptive_fmts[i].quality, 
          adaptive_fmts[i].type, adaptive_fmts[i].url, signature));
    }*/
    //callback(result);
  });
};

var getYtbMediaLinksNew2 = function getYtbMediaLinksNew2(url, result, title, callback) {
  var video_id = parseId(url);
  if (!video_id) return;
  var youtube_url = "https://www.youtube.com/watch?v=" + video_id;
  var filename_prefix = "";
  var adaptive_fmts = [];
  var ytplayerUrl = "";
  var formats = [];
  var adaptiveFormats = [];
  var allFormats = [];
  utils.makeAJAXPromise(youtube_url, "GET").then(function (responseText) {
    var parser = new YoutubeHTMLWatchParser(responseText);
    var sts = parser.getSts();
    ytplayerUrl = parser.getYtplayerUrl();
    filename_prefix = title || parser.getTitle();
    var get_video_info_params = ["video_id=" + video_id, "ps=default", "gl=US", "hl=en", "eurl=https://youtube.googleapis.com/v/" + video_id, "sts=" + sts];
    var get_video_info_url = "https://www.youtube.com/get_video_info?" + get_video_info_params.join('&');
    console.log(get_video_info_url);
    return utils.makeAJAXPromise(get_video_info_url, "GET");
  }).then(function (responseText1) {
    if (responseText1 == undefined) return;
    var unquoteVideoInfo = unescape(responseText1);
    var playerResponseStr = utils.qsToJsonNew(unquoteVideoInfo, false)['player_response'];
    var playerResponseObj = JSON.parse(playerResponseStr);
    var streamingData = playerResponseObj['streamingData'];
    if (streamingData == undefined) return;
    var must_decrypt = false;
    formats = streamingData['formats'] != undefined ? streamingData['formats'] : [];
    adaptiveFormats = streamingData['adaptiveFormats'] != undefined ? streamingData['adaptiveFormats'] : [];
    allFormats = formats.concat(adaptiveFormats); // handle uncrypted link

    for (var i in allFormats) {
      if (allFormats[i]['cipher'] == undefined) {
        result.push(new YoutubeItem(filename_prefix, allFormats[i]['qualityLabel'] || allFormats[i]['quality'], allFormats[i]['mimeType'], allFormats[i]['url']));
      } else {
        must_decrypt = true;
      }
    }

    callback(result);

    if (must_decrypt) {
      return utils.makeAJAXPromise(ytplayerUrl, "GET");
    }
  }).then(function (responseText2) {
    if (responseText2 == undefined) return;
    var parser2 = new YoutubePlayerJSCodeParser(responseText2);
    var funcname = parser2.evalDecryptJSFunction(); // handle crypted signature link

    for (var i in allFormats) {
      var cipherObj = utils.qsToJsonNew(allFormats[i]['cipher']);
      var signature = eval(funcname + "(\"" + cipherObj['s'] + "\")");
      result.push(new YoutubeItem(filename_prefix, allFormats[i]['qualityLabel'] || allFormats[i]['quality'], allFormats[i]['mimeType'], cipherObj['url'], signature));
    }

    callback(result);
  });
};

exports.getMediaLinks = function (url, result, title, callback) {
  //getYtbMediaLinksOld(url, result, title, callback);
  //getYtbMediaLinksNew(url, result, title, callback);
  getYtbMediaLinksNew2(url, result, title, callback);
};

/***/ }),

/***/ "./src/scripts/popup.js":
/*!******************************!*\
  !*** ./src/scripts/popup.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/popup */ "./src/scripts/constants/popup.js");
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// This extension demonstrates using chrome.downloads.download() to
// download URLs.


var utils = __webpack_require__(/*! ./modules/utils */ "./src/scripts/modules/utils.js");

var nhaccuatui = __webpack_require__(/*! ./modules/nhaccuatui */ "./src/scripts/modules/nhaccuatui.js");

var youtube = __webpack_require__(/*! ./modules/youtube */ "./src/scripts/modules/youtube.js");

var Item = __webpack_require__(/*! ./modules/item */ "./src/scripts/modules/item.js").Item;

var downloadItems = [];
var currentTabURL = "";
var currentTabHostname = "";
var currentTabTitle = ""; // Load size span inner html

function getDownloadItemHeader(id, url) {
  var xhr = new XMLHttpRequest();
  xhr._id = id;

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var content_type = this.getResponseHeader('Content-Type') ? utils.extractExtFromContentTypeHeader(this.getResponseHeader('Content-Type')) : "";
      var content_length = this.getResponseHeader('Content-Length') ? utils.formatBytes(this.getResponseHeader('Content-Length')) : "";
      var fileSizeDiv = document.getElementById(this._id);
      var extSpan = fileSizeDiv.getElementsByClassName('ext')[0];
      if (extSpan.innerHTML == "") extSpan.innerHTML = content_type + ' ';
      fileSizeDiv.getElementsByClassName('length')[0].innerText = content_length;
    }
  };

  xhr.open("HEAD", url, true);
  xhr.send();
} // Attach events to download button


function attachEventsToDownloadButton(button) {
  button.addEventListener("click", function () {
    var url = this.getAttribute(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDataUrlAttrName"]);
    var filename = this.getAttribute(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDataOutputFilenameAttrName"]);
    utils.downloadFile(url, filename);
  }); // Google Analytics tracking download button click 

  button.addEventListener('click', trackDownloadButtonClick);
} // Display all visible links.


function showDownloadItems() {
  utils.removeChildren(document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDownloadItemsId"]));

  for (var i = 0; i < downloadItems.length; ++i) {
    var downloadItem = downloadItems[i];
    var row = document.createElement('div');
    row.className = _constants_popup__WEBPACK_IMPORTED_MODULE_0__["kRowItemClassName"];
    if (i % 2 == 0) row.classList.add("odd");else row.classList.add("even");
    var filename = document.createElement("div");
    filename.className = _constants_popup__WEBPACK_IMPORTED_MODULE_0__["kFileNameClassName"];
    var checkbox = document.createElement('input');
    checkbox.checked = false;
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + i;
    filename.appendChild(checkbox);
    var label = document.createElement('label');
    label["for"] = 'check' + i;
    label.innerText = downloadItem.filename != null ? downloadItem.filename : downloadItem.url;

    label.onclick = function () {
      var e = document.getElementById(this["for"]);
      e.checked = !e.checked;
    };

    filename.appendChild(label);
    row.appendChild(filename);
    var filesize = document.createElement('div');
    filesize.className = _constants_popup__WEBPACK_IMPORTED_MODULE_0__["kFileSizeClassName"];
    filesize.id = 'size' + i;
    var props = ['ext', 'quality', 'length'];
    var spans = {};
    props.forEach(function (prop) {
      spans[prop] = document.createElement('span');
      spans[prop].className = prop;
      filesize.appendChild(spans[prop]);
    });
    if (downloadItem.ext) spans['ext'].innerHTML = downloadItem.ext + ' ';
    if (downloadItem.quality) spans['quality'].innerHTML = downloadItem.quality + ' ';
    row.appendChild(filesize);
    getDownloadItemHeader(filesize.id, downloadItem.url);
    var action = document.createElement('div');
    action.className = 'action';
    var button = document.createElement('button');
    button.type = "button";
    button.className = _constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDownloadBtnClassName"];
    button.innerText = chrome.i18n.getMessage("popup_download");
    button.setAttribute(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDataUrlAttrName"], downloadItem.url);
    button.setAttribute(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDataOutputFilenameAttrName"], downloadItem.filename ? downloadItem.filename : '');
    attachEventsToDownloadButton(button);
    action.appendChild(button);
    row.appendChild(action);
    document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kDownloadItemsId"]).appendChild(row);
  }
} // Select all visible links.


function selectAll() {
  for (var i = 0; i < downloadItems.length; ++i) {
    document.getElementById('check' + i).checked = true;
  }
} // Download all visible checked links.


function downloadCheckedLinks() {
  for (var i = 0; i < downloadItems.length; ++i) {
    if (document.getElementById('check' + i).checked) {
      var url = downloadItems[i].url;
      var filename = downloadItems[i].filename ? downloadItems[i].filename : '';
      utils.downloadFile(url, filename);
    }
  }
} // Close window


function closeWindow() {
  window.close();
}

function initEvents() {
  document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kBtnSelectAllId"]).onclick = selectAll;
  document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kBtnDownloadSelectedId"]).onclick = downloadCheckedLinks;
  document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kBtnCloseId"]).onclick = closeWindow;
}

function attachTrackEvents() {
  // Google Analytics tracking select all and download selected click 
  document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kBtnSelectAllId"]).addEventListener('click', trackButtonClick);
  document.getElementById(_constants_popup__WEBPACK_IMPORTED_MODULE_0__["kBtnDownloadSelectedId"]).addEventListener('click', trackButtonClick);
}

function executeScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: 'dist/scripts/send_links.js',
    allFrames: true
  });
}

function executeZingMp3ContentScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: 'dist/scripts/zmp3_content_script.js',
    allFrames: false
  });
} // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var _AnalyticsCode = 'UA-109609614-1';

var _gaq = _gaq || [];

_gaq.push(['_setAccount', _AnalyticsCode]);

_gaq.push(['_trackPageview']);

(function () {
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
} // Set up event handlers and inject send_links.js into all frames in the active
// tab.


window.onload = function () {
  utils.loadLocaleMessages();
  initEvents();
  showDownloadItems();
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({
      active: true,
      windowId: currentWindow.id
    }, function (activeTabs) {
      var tabId = activeTabs[0].id;
      currentTabURL = activeTabs[0].url;
      currentTabTitle = activeTabs[0].title;
      currentTabHostname = utils.getHostName(currentTabURL);

      if (currentTabHostname.indexOf('nhaccuatui.com') != -1) {
        nhaccuatui.getMediaLinks(currentTabURL, downloadItems, showDownloadItems);
      } else if (currentTabHostname.indexOf('youtube.com') != -1) {
        youtube.getMediaLinks(currentTabURL, downloadItems, currentTabTitle, showDownloadItems);
      } else if (currentTabHostname.indexOf('zingmp3.vn') != -1) {
        executeZingMp3ContentScript(tabId);
      } else {
        executeScript(tabId);
      }

      attachTrackEvents();
    });
  });
}; // Add links to allLinks and visibleLinks, sort and show them.  send_links.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "send_links") {
    handleSendLinksRequest(request);
  } else if (request.action == "zmp3_content_script") {
    handleZmp3ContentScriptRequest(request);
  }
});

function handleSendLinksRequest(request) {
  var links = request.links;
  if (links.length == 0) return;
  var title = request.title;
  var hostname = request.hostname;

  for (var index in links) {
    var parser = document.createElement('a');
    parser.href = links[index];
    var pathname = parser.pathname;
    var filename = unescape(pathname.substring(pathname.lastIndexOf('/') + 1));

    if (['phimbathu.com', 'vophim.com', 'bilutv.com', 'xemphimso.com'].indexOf(hostname) > -1 && ['play.php', 'referer.php'].indexOf(filename) > -1) {
      downloadItems.push(new Item(currentTabTitle + '.mp4', null, 'mp4', links[index]));
    } else if (['openload.co', 'oload.download'].indexOf(hostname) > -1) {
      downloadItems.push(new Item(filename + '.mp4', null, "mp4", links[index]));
    } else if (['www.phimmoi.net'].indexOf(hostname) > -1) {
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
    var queueSongMap = zmp3_mini_player["queueSongMap"];

    for (var songId in queueSongMap) {
      if (queueSongMap.hasOwnProperty(songId)) {
        // Do things here
        var song = queueSongMap[songId];
        var title = song["title"];
        var streaming = song["streaming"];
        if (streaming == undefined) continue;

        for (var quality in streaming["default"]) {
          if (streaming["default"].hasOwnProperty(quality) && streaming["default"][quality]) {
            var display_quality = quality + 'kbps';
            downloadItems.push(new Item(title + ' ' + display_quality + '.mp3', display_quality, "mp3", "https:" + streaming["default"][quality]));
          }
        }
      }
    }

    showDownloadItems(downloadItems);
  }
}

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./src/scripts/popup.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/namnt/extensions/src/scripts/popup.js */"./src/scripts/popup.js");


/***/ })

/******/ });