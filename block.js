
var filterFbRequestCallback = function (details) {
  if(details.url.includes("ajax/mercury/mark_seen") ||
    details.url.includes("ajax/notifications/mark_read") ||
    details.url.includes("ajax/gigaboxx/endpoint/UpdateLastSeenTime") ||
    details.url.includes("reconnect") ||
    details.url.includes("friendjewel/friendconfirmednotifications") ||
    details.url.includes("active_ping") ||
    details.url.includes("mercury/change_read_status.php")
    )
  {
    return {cancel: true}
  } else if (details.url.includes(".com/pull")) {
    var replaceUrl = details.url.replace(/active/i, 'offline');
    return {redirectUrl: replaceUrl};
  }
};

var filter = {urls: ["*://*.facebook.com/*", "*://*.messenger.com/*"]};

var opt_extraInfoSpec = ["blocking"];

chrome.storage.onChanged.addListener(function(changes, areaName){
  if (areaName == "local") {
    if (changes.offline.newValue) {
      chrome.webRequest.onBeforeRequest.addListener(
        filterFbRequestCallback,
        filter,
        opt_extraInfoSpec
      );
    } else {
      chrome.webRequest.onBeforeRequest.removeListener(
        filterFbRequestCallback,
        filter,
        opt_extraInfoSpec
      );
    }
  }
});

chrome.storage.local.get(["offline"], function(items){
  if (items.offline) {
    chrome.webRequest.onBeforeRequest.addListener(
      filterFbRequestCallback,
      filter,
      opt_extraInfoSpec
    );
  } else {
    chrome.webRequest.onBeforeRequest.removeListener(
      filterFbRequestCallback,
      filter,
      opt_extraInfoSpec
    );
  }
});