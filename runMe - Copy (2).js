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
		console.log(22222);
		console.log(saved);
		saved.push(save);
		console.log(33333);
		console.log(saved);
		chrome.storage.local.set({'vic':saved}, function(){
			console.log('saved!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		});
	});
}

document.onkeypress = KeyPress;

console.log('neggi');
getGoogleSearch();
function getGoogleSearch(){
	var bar = document.getElementById("lst-ib");
	if(bar!=null){
		var value = bar.value;
		inject(value);
	}
}

function inject(search){
	getClosestMatch(search,function(save){
		console.log(save);
		var url = save.url;
		var title = save.title;
		var text = "Rememori Link";
		injectGoogle(url, title, text);
	});
}

function getClosestMatch(search, callback){
	console.log('CLOSEEST MATCH');
	getSaved(function(saved){
		console.log(saved);
		//callback(saved[0]); //delete
		for(i = 0; i< saved.length; i++){
			if(saved[i].title==search){
				callback(saved[i]);
			}
		}	
	});
}

function injectGoogle(url, title, text){
	var rso = document.getElementById("rso");
	var srg = rso.firstChild.firstChild;
	var htmlCode = getCode(url,title,text);
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

function getCode(url, title, text){
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

//Cammi was here haha hahahaha hahahaha
function injectViagra(){
	injectGoogle("https://www.youtube.com/watch?v=dQw4w9WgXcQ","Buy Viagra Cheap","Keeps you hard forever");
	injectGoogle("https://www.youtube.com/watch?v=dQw4w9WgXcQ","Buy Viagra Cheap","Keeps you hard for up to 48 hrs");
	injectGoogle("https://www.youtube.com/watch?v=dQw4w9WgXcQ","Buy Viagra Cheap","Keeps you hard for 24 hrs");
}
