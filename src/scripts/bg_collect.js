// Constants 
var MIN_NEXT_EXECUTE_DURATION = 5000;

var lastExecutedScript = [];

var shouldExecuteCollectScript = function(tabId, url) {
	if (typeof lastExecutedScript[tabId] == "undefined") return true;

	if (Date.now() - lastExecutedScript[tabId].timestamp > MIN_NEXT_EXECUTE_DURATION) 
		return true;

	return lastExecutedScript[tabId].url !== url;
}

var executeCollectScript = function(tabId, url) {
	if (!shouldExecuteCollectScript(tabId, url)) return;

	lastExecutedScript[tabId] = {
		timestamp: Date.now(),
		url: url
	};

	chrome.tabs.executeScript(
      	tabId, {file: 'content/collect.js', allFrames: false});
} 

chrome.tabs.onUpdated.addListener(function(tabId, props, tab) {
  	if (props.status !== "loading") return;

  	if (typeof props.url == "undefined") return;

  	var parser = document.createElement('a');
    parser.href = props.url;
	var hostname = parser.hostname;

	if (hostname.indexOf('.zing.vn') > -1)
		return;

  	executeCollectScript(tabId, props.url);
});

 chrome.webNavigation.onCompleted.addListener(function(e) {
 	if (e.frameId !== 0) return;

    executeCollectScript(e.tabId, e.url);
 }, {url: [{hostSuffix: '.zing.vn'}]});