chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
        	var header = details.requestHeaders[i];
            if (header.name.toLowerCase() === 'content-type') {
              	var content_type = header.value;

                if (content_type === 'application/x-www-form-urlencoded') {
                    header.value += '; charset=utf-8' 
                }
            }
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["*://*/Inventory_Bonus_New/commContractFeesAction!searchCOMM.do*"]},
    ["blocking", "requestHeaders"]);