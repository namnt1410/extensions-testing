// Format bytes
exports.formatBytes = function (bytes,decimals) {
  if(bytes == 0) return '0 Bytes';
  var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// function zip arrays
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
}

// function query string to json
exports.qsToJson = function (qs, decode=true) {
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
}

// function query string to json undecode
exports.qsToJsonNew = function (qs, decode=true) {
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
}

// function mimetype2ext
var mimeType2Ext = function (mt) {
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
    'mp2t': 'ts',
  }[res] || res;
}

exports.extractExtFromContentTypeHeader = function (type) {
  var mt = type.split(';')[0];
  return mt.split('/').length == 2 ? mimeType2Ext(mt) : "";
}

exports.sendXHTTPRequest = function (url, method, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if (request.readyState == 4 && request.status == 200)
    {
      callback(request.responseText); // Another callback here
    }
  }; 
  request.open(method, url, true);
  request.send();
}

exports.makeAJAXPromise = function (url, method) {
  var promise = new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
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
  })
  return promise;
}

exports.getHostName = function (url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }
  else {
    return null;
  }
}

exports.loadLocaleMessages = function () {
  document.querySelectorAll("[i18n-content]").forEach(function (element) {
    element.innerHTML = chrome.i18n.getMessage(element.getAttribute("i18n-content"));
  });
}

exports.removeChildren = function (element) {
  var children = element.children;
  while (children.length > 0) {
    element.removeChild(children[children.length - 1])
  }
}

var replaceProblematicCharacterFilename = function (filename) {
  return filename.replace(/[:\"\?\~\<\>\*\|\/\\]/g,'-');
}

// Download file
exports.downloadFile = function (url, filename) {
  if (filename != '') {
    chrome.downloads.download({
      url: url, 
      filename: replaceProblematicCharacterFilename(filename)
    });
  }
  else {
    chrome.downloads.download({url: url});
  }
}