var utils = require('./utils');
var Item = require('./item').Item;

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
  if (av.length > 0)
    filename = "[" + av.join('+') + "] " + filename;

  Item.call(this, filename, quality, ext, url);

  if (signature !== undefined)
    this.url = this.url + "&sig=" + signature;
}

function YoutubeHTMLWatchParser(watch_html) {
  this.watch_html = watch_html;
  this.getTitle = function() {
    match = /"title":"([^"]+)"/.exec(watch_html);
    return match instanceof Array ? match[1].replace(/\\u0026/g, '&') : "";
  }

  this.getYtplayerUrl = function() {
    ytplayer_url_json = this.watch_html.match(/"assets":.+?"js":\s*"([^"]+)"/)[1];
    return "https://www.youtube.com" + ytplayer_url_json.replace(/\\/g, "");
  }

  this.getSts = function() {
    match = /"sts":(\d+),/.exec(this.watch_html);
    return match instanceof Array ? match[1] : "";
  }
}

function YoutubePlayerJSCodeParser(player_jscode) {
  this.player_jscode = player_jscode;

  this.evalDecryptJSFunction = function() {
    var regExpList = [
      /\b[a-zA-Z0-9]+\s*&&\s*[a-zA-Z0-9]+\.set\([^,]+\s*,\s*encodeURIComponent\s*\(\s*([a-zA-Z0-9$]+)\(/,
      /([a-zA-Z0-9$]+)\s*=\s*function\(\s*a\s*\)\s*{\s*a\s*=\s*a\.split\(\s*""\s*\)/
    ];
    for (var i in regExpList) {
      let res = this.player_jscode.match(regExpList[i]);
      if (res !== null) {
        funcname = res[1];
        break;
      }
    }
    
    matchArray = this.player_jscode.match(
        new RegExp(funcname + "=function\\([a-z]\\){[^;]+;([^.]+)[^}]+}"));

    funcDefStr = matchArray[0];
    subObjName = matchArray[1];

    subObjDefStr = this.player_jscode.match(
        new RegExp(fixRegExpString("var " + subObjName + "=[^\\n]+\\n[^\\n]+\\n[^}]+}}")))[0];

    eval(subObjDefStr);
    eval(funcDefStr);

    return funcname;
  }
} 

var getYtbMediaLinksOld = function(url, result, title, callback) {
  var filename_prefix = "";
  var stream_map = [];
  utils.makeAJAXPromise(url, "GET")
      .then(function(responseText) {
        var parser = new YoutubeHTMLWatchParser(responseText);
        var matches = responseText.match(/"url_encoded_fmt_stream_map":"([^"]+)"/);

        if (matches != null) {
          filename_prefix = parser.getTitle() || title;
          stream_map = matches[1].split(",");
          for (var i in stream_map) {
            stream_map[i] = utils.qsToJson(stream_map[i].replace(/\\u0026/g, '&'));
            if (stream_map[i].s == null) {
              result.push(new YoutubeItem(filename_prefix, stream_map[i].quality,
                  stream_map[i].type, stream_map[i].url));
            }
          }

          callback(result);

          if (stream_map[0].s != null) {
            return utils.makeAJAXPromise(parser.getYtplayerUrl(), "GET");
          }
        }
      })
      .then(function(responseText2) {
        if (responseText2 == undefined) 
          return;

        var parser2 = new YoutubePlayerJSCodeParser(responseText2);
        var funcname = parser2.evalDecryptJSFunction();

        for (var i in stream_map) {
          var signature = eval(funcname + "(\"" + stream_map[i].s + "\")");
          result.push(new YoutubeItem(filename_prefix, stream_map[i].quality,
              stream_map[i].type, stream_map[i].url, signature));
        }
        callback(result);
      });
}

var getYtbMediaLinksNew = function(url, result, title, callback) {
  var video_id = parseId(url);
  if (!video_id) return;

  var youtube_url = "https://www.youtube.com/watch?v=" + video_id;

  var filename_prefix = "";
  var adaptive_fmts = [];
  var ytplayerUrl = "";

  utils.makeAJAXPromise(youtube_url, "GET") 
      .then(function(responseText) {
        var parser = new YoutubeHTMLWatchParser(responseText);
        var sts = parser.getSts();
        ytplayerUrl = parser.getYtplayerUrl();
        filename_prefix = parser.getTitle() || title;

        var get_video_info_params = [
          "video_id=" + video_id,
          "ps=default",
          "gl=US",
          "hl=en"
        ];

        if (sts !== "") {
          get_video_info_params = get_video_info_params.concat([
            "eurl=https://youtube.googleapis.com/v/" + video_id,
            "sts=" + sts   
          ]);
        }

        var get_video_info_url = "https://www.youtube.com/get_video_info?" + get_video_info_params.join('&'); 

        return utils.makeAJAXPromise(get_video_info_url, "GET");
      })
      .then(function(responseText1) {
        if (responseText1 == undefined)
          return;

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
      })
      .then(function(responseText2) {
        if (responseText2 == undefined)
          return;

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
}



var getYtbMediaLinksNew2 = function(url, result, title, callback) {
  var video_id = parseId(url);
  if (!video_id) return;

  var youtube_url = "https://www.youtube.com/watch?v=" + video_id;

  var filename_prefix = "";
  var adaptive_fmts = [];
  var ytplayerUrl = "";

  var formats = [];
  var adaptiveFormats = [];
  var allFormats = [];

  utils.makeAJAXPromise(youtube_url, "GET") 
      .then(function(responseText) {
        var parser = new YoutubeHTMLWatchParser(responseText);
        var sts = parser.getSts();
        ytplayerUrl = parser.getYtplayerUrl();
        filename_prefix = title || parser.getTitle();

        var get_video_info_params = [
          "video_id=" + video_id,
          "ps=default",
          "gl=US",
          "hl=en",
          "eurl=https://youtube.googleapis.com/v/" + video_id,
          "sts=" + sts
        ];

        var get_video_info_url = "https://www.youtube.com/get_video_info?" + get_video_info_params.join('&'); 

        console.log(get_video_info_url);

        return utils.makeAJAXPromise(get_video_info_url, "GET");
      })
      .then(function(responseText1) {
        if (responseText1 == undefined)
          return;

        var unquoteVideoInfo = unescape(responseText1);

        var playerResponseStr = utils.qsToJsonNew(unquoteVideoInfo, false)['player_response'];

        var playerResponseObj = JSON.parse(playerResponseStr);
        var streamingData = playerResponseObj['streamingData'];

        if (streamingData == undefined) return;

        var must_decrypt = false;

        formats = streamingData['formats'] != undefined ? 
            streamingData['formats'] : [];
        adaptiveFormats = streamingData['adaptiveFormats'] != undefined ? 
            streamingData['adaptiveFormats'] : [];

        allFormats = formats.concat(adaptiveFormats);

        // handle uncrypted link
        for (var i in allFormats) {
          if (allFormats[i]['cipher'] == undefined) {
            result.push(new YoutubeItem(filename_prefix, 
                allFormats[i]['qualityLabel'] || allFormats[i]['quality'], 
                allFormats[i]['mimeType'], allFormats[i]['url']));
          } else {
            must_decrypt = true;
          }
        }

        callback(result);

        if (must_decrypt) {
          return utils.makeAJAXPromise(ytplayerUrl, "GET");
        }
      })
      .then(function(responseText2) {
        if (responseText2 == undefined)
          return;

        var parser2 = new YoutubePlayerJSCodeParser(responseText2);
        var funcname = parser2.evalDecryptJSFunction();

        // handle crypted signature link
        for (var i in allFormats) {
          var cipherObj = utils.qsToJsonNew(allFormats[i]['cipher']);
          var signature = eval(funcname + "(\"" + cipherObj['s'] + "\")");
          result.push(new YoutubeItem(filename_prefix, 
              allFormats[i]['qualityLabel'] || allFormats[i]['quality'], 
              allFormats[i]['mimeType'], cipherObj['url'], signature));
        }
        callback(result);
      });
}

exports.getMediaLinks = function (url, result, title, callback) {
  //getYtbMediaLinksOld(url, result, title, callback);
  //getYtbMediaLinksNew(url, result, title, callback);
  getYtbMediaLinksNew2(url, result, title, callback);
}



        