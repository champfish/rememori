function getSaved(callback){
	chrome.storage.local.get({'vic': [{url:'http://howtogeek.com',title:'HowToGeek'}]}, function(saved){
		console.log('direct output');
		console.log(saved.vic);
		if(true){
			console.log('GET SAVED');
			console.log(saved.vic);
			callback(saved.vic);
		}
	});
}

function postSaved(save){
	console.log('post saved');
	getSaved(function(saved){
		saved.push(save);
		chrome.storage.local.set({'vic':saved}, function(){
		});
	});
}

document.onkeypress = KeyPress;

getGoogleSearch();
getBingSearch();
function getGoogleSearch(){
	var bar = document.getElementById("lst-ib");
	if(bar!=null){
		var value = bar.value;
		inject(value,'google');
	}
}

function getBingSearch(){
	var bar = document.getElementById("sb_form_q");
	if(bar!=null){
		var value = bar.value;
		inject(value,'bing');
	}
}

function inject(search, site){
	getClosestMatch(search,function(save){
		var url = save.url;
		var title = save.title;
		var text = "Rememori Link";
		switch(site){
			case "google":
			injectGoogle(url,title,text);
			break;
			case "bing":
			injectBing(url,title,text);
			break;
		}
	});
}

function getClosestMatch(search, callback){
	search = search.toLowerCase();

	var bestMatch = '';
	var bestScore = -1;
	getSaved(function(saved){
		for(i = 0; i< saved.length; i++){
			var matchingScore = matchingScore(search, saved[i].title.toLowerCase);
			if(matchingScore>bestScore){
				bestScore = matchingScore;
				bestMatch = saved[i];
			}
		}	
		if(bestScore>1){
			callback(bestMatch);
		}
	});
}

function matchingScore(search,saved){
	var wordArr = saved.split(" ");
	var matchingCount = 0;
	for(var i = 0; i< wordArr.length; i++){
		if(search.contains(wordArr[i])){
			matchingCount++;
		}
	}
	if(matchingCount>wordArr.length/2){
		return matchingCount;
	}else{
		return -1;
	}
}

function injectBing(url, title, text){
	var b_results = document.getElementById("b_results");
	var b_algo = b_results.firstChild;
	var htmlCode = getBingCode(url,title,text);
	var htmlElement = htmlToElement(htmlCode);
	b_results.insertBefore(htmlElement, b_results.firstChild);
}

function injectGoogle(url, title, text){
	var rso = document.getElementById("rso");
	var srg = rso.firstChild.firstChild;
	var htmlCode = getGoogleCode(url,title,text);
	var htmlElement = htmlToElement(htmlCode);
	srg.insertBefore(htmlElement, srg.firstChild);
}


function save(url, title){
	var save = {url: url, title: title}; 
	postSaved(save);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function KeyPress(e){
	console.log(e.keyCode+ " "+ e.ctrlKey);
     // Ensure event is not null
     e = e || window.event;
     var key = 17; // 'control-q'
     if(e.keyCode==13){
     	//submit();
     }
     if ((e.which == key || e.keyCode == key) && e.ctrlKey) {
         var name = prompt("Site Name", document.title);
         if(name!=null){
         	save(document.location.href,name);
         }
     }
     if ((e.which == 2 || e.keyCode == 2) && e.ctrlKey) {
         injectViagra();
     }
}

function getGoogleCode(url, title, text){ 
	var item = '<div class="g"><!--m--><div data-hveid="40" data-ved="0ahUKEwifjqrb4q3ZAhUF04MKHWJUDBkQFQgoKAAwAA"><div class="rc"><h3 class="r">'+
	'<a href="'+
	url+
	'">'+
	title+
	'</a>'+
	'</h3><div class="s"><div><div class="f kv _SWb" style="white-space:nowrap">'+
	'<cite class="_Rm">'+
	title+
	'</cite>'+
	'</div><span class="st">'+
	text +
	'</span></div></div></div></div><!--n--></div>'
	return item;
}

function getBingCode(url, title, text){ 
	var item = '<li class="b_algo" data-bm="6"><h2><a href="'+url+
	'"><strong>'+title+
	'</strong></a></h2><div class="b_caption"><div class="b_attribution"><cite>'+url+
	'</cite></div><p>'+text+
	'</p></div></li>';
	return item;
}

//Cammi was here haha hahahaha hahahaha
function injectViagra(){
	injectGoogle("https://www.youtube.com/watch?v=dQw4w9WgXcQ","Buy Viagra Cheap","Keeps you hard forever");
	injectGoogle("https://www.youtube.com/watch?v=dQw4w9WgXcQ","Buy Viagra Cheap","Keeps you hard for up to 48 hrs");
	injectGoogle("https://www.youtube.com/watch?v=dQw4w9WgXcQ","Buy Viagra Cheap","Keeps you hard for 24 hrs");
}
