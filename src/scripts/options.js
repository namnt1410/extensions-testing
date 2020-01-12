document.addEventListener('DOMContentLoaded', function() {
  var txtArea = document.getElementById('txt-proxy-log');
  var clearBtn = document.getElementById('btn-clear');
  var downloadBtn = document.getElementById('btn-download');

  clearBtn.addEventListener("click", function() {
    txtArea.value = '';
    chrome.storage.local.set({proxy_log: ''}, function() {});
  });

  downloadBtn.addEventListener("click", function() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtArea.value));
    element.setAttribute('download', 'proxy.log');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  });

  chrome.storage.local.get(['proxy_log'], function(result) {
    if (result.proxy_log !== undefined) 
      txtArea.value = result.proxy_log;
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace == 'local' && changes['proxy_log'] != undefined) {
      var storageChange = changes['proxy_log'];
      txtArea.value = storageChange.newValue;
    }
  });
});