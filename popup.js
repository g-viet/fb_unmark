chrome.storage.local.get(["offline"], function(items){
  document.getElementById('offline_settings').checked =	items.offline || false;
});

document.getElementById('offline_settings').addEventListener('change', function(e){
  chrome.storage.local.set({ "offline": e.target.checked }, function(){});
})
