var SendReport = function(res) {
  res.policy_data = JSON.parse(res.policy_data);
  console.log("SendReport");
  console.log(res);
  var request = new XMLHttpRequest();
  request.open("POST", "http://news.sfive.vn/browser/pc/report/send", true);
  request.setRequestHeader("Content-Type", "application/json");
  if (typeof chrome.sfiveReportingPrivate == 'object' && typeof chrome.sfiveReportingPrivate.getPrivateIPv4Address == 'function') {
    chrome.sfiveReportingPrivate.getPrivateIPv4Address(function(ipv4_address) {
      res.ipv4_address = ipv4_address;
      request.send(JSON.stringify(res));
    });
  } else {
    request.send(JSON.stringify(res));
  }
}

var sfiveReportingPrivateExist = (typeof chrome.sfiveReportingPrivate == 'object'); 
var getReportExist = 
    sfiveReportingPrivateExist && (typeof chrome.sfiveReportingPrivate.getReport == 'function'); 

chrome.runtime.onStartup.addListener(function() {
  if (getReportExist) {
    chrome.sfiveReportingPrivate.getReport(SendReport);
  }
});