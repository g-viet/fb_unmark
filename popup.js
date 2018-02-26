document.getElementById('offline_settings').addEventListener('change', function(e){
	if (e.target.checked){
		chrome.storage.local.set({ "offline": true }, function(){});
		console.log("is offline");
		chrome.storage.local.get(["offline"], function(items){
	        console.log(items);
	      });
	}else {
		chrome.storage.local.set({ "offline": false }, function(){});
		console.log("is not offline");
		chrome.storage.local.get(["offline"], function(items){
	        console.log(items);
	      });
	}
})
