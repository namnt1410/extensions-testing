chrome.proxy.onProxyError.addListener(function(details) {
	var proxy_log_str = '';
	chrome.storage.local.get(['proxy_log'], function(result) {
        if (result.proxy_log !== undefined) proxy_log_str = result.proxy_log;
	    proxy_log_str += (new Date()).toISOString() + " " + JSON.stringify(details) + "\n";
	    chrome.storage.local.set({proxy_log: proxy_log_str}, function() {});
    });
});


