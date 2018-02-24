// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.tabs.onUpdated.addListener(injectionScript);

function injectionScript(tabId, info, tab){
	if (info.status === 'complete'){
		console.log('hesdfy');
		chrome.tabs.executeScript(tabId, {
			file: "jquery-3.3.1.min.js",
			runAt: "document_end"
		}, function(){
			chrome.tabs.executeScript({
				file: "runMe.js"
			});
		});
	}
}

