chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (details.method == "GET" || 
			details.method == "HEAD" ||
			details.method == "OPTIONS") {
			return;
		}

		if (details.type == "ping") return;

		var params = {
			v: 1,
			rt: details.type,
			mt: details.method,
			ts: details.timeStamp,
			uu: details.url
		};

		var parser = document.createElement('a');
  		parser.href = details.url;
  		params.ud = parser.hostname;

  		// console.log(details.url);
  		// console.log(details.requestHeaders);

  		var has_content_type_header = false;

		for (var i = 0; i < details.requestHeaders.length; ++i) {
			var header = details.requestHeaders[i];
			if (header.name.toLowerCase() === 'content-type') {
				has_content_type_header = true;
				// console.log(header);
				var value = header.value;
				params.ct = value;
				params.mct = value.split(';')[0];

				if (params.mct == "application/x-www-form-urlencoded" ||
					params.mct == "application/json" ||
					params.mct == "application/soap+xml" ||
					params.mct == "application/javascript" ||
					params.mct == "text/ping" ||
					params.mct == "application/x-fcs") { 					// RTMP protocol
					return;
				}
			} else if (header.name.toLowerCase() === 'referer') {
				// console.log(header);
				params.ru = header.value;
				parser.href = header.value;
				params.rd = parser.hostname;
			}
        }

        if (!has_content_type_header) return;

        var send_url = "http://sfive.vn/extensions/collect/upload" +
        			   "?v=" + params.v +
        			   "&rt=" + encodeURIComponent(params.rt) +
        			   "&mt=" + params.mt +
        			   "&ts=" + params.ts +
        			   "&uu=" + encodeURIComponent(params.uu) +
        			   "&ud=" + encodeURIComponent(params.ud) +
        			   "&ct=" + encodeURIComponent(params.ct || "") +
        			   "&mct=" + encodeURIComponent(params.mct || "") +
        			   "&ru=" + encodeURIComponent(params.ru || "") +
        			   "&rd=" + encodeURIComponent(params.rd || "");

        var request = new XMLHttpRequest();
		request.open("GET", send_url, true);
		request.send();
	},
	{urls: ["http://*/*", "https://*/*"]},
	["requestHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
        	var header = details.requestHeaders[i];
            if (header.name.toLowerCase() === 'referer' && 
            	header.value.startsWith("http://sfive.vn/")) {
              	details.requestHeaders.splice(i, 1);
              	break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["*://cdn-vod.vgcloud.vn/*"]},
    ["blocking", "requestHeaders"]);

