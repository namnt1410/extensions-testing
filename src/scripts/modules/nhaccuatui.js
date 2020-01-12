var utils = require('./utils');
var Item = require('./item').Item;

function NctItem(title, quality, ext, url) {
  filename = title + " " + quality + "." + ext;

  Item.call(this, filename, quality, ext, url);
}

exports.getMediaLinks = function (url, result, callback) {
  utils.makeAJAXPromise(url, "GET")
      .then(function() {
        var matches = this.responseText.match(/"(http(s)?:\/\/(www|v).nhaccuatui.com\/flash\/xml?.*)"/);
        if (matches != null) {
          return utils.makeAJAXPromise(matches[1], "GET");
        }
      })
      .then(function() {
        if (this.responseText == undefined)
          return;

        domParser = new DOMParser();
        xmlDoc = domParser.parseFromString(this.responseText, "text/xml");

        type = xmlDoc.getElementsByTagName("type");

        if (xmlDoc.getElementsByTagName("type").length == 0) {
          ext = "mp4";
          title = xmlDoc.getElementsByTagName("title")[0].textContent.trim();

          result.push(new NctItem(title, "480p", ext, 
              xmlDoc.getElementsByTagName("location")[0].textContent.trim()));
          result.push(new NctItem(title, "360p", ext,
              xmlDoc.getElementsByTagName("lowquality")[0].textContent.trim()));
        } else {
          type = xmlDoc.getElementsByTagName("type")[0].textContent.trim();
          if (type == "song" || type == "playlist") {
            tracklist = xmlDoc.getElementsByTagName("track");
            titles = xmlDoc.getElementsByTagName("title");
            urls = xmlDoc.getElementsByTagName("location");
            for (i = 0; i < tracklist.length; i++) {
              result.push(new NctItem(titles[i].textContent.trim(), "128kbps", 
                  "mp3", urls[i].textContent.trim()));
            }
          }
        }
        callback(result);
      });
}