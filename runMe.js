console.log('neggd');

var res = document.getElementById("rso");
var srg = res.firstChild.firstChild;
var htmlCode = getCode('http://howtogeek.com','Buy Viagra','Keeps you hard for 24 hrs');
var htmlElement = htmlToElement(htmlCode);
srg.insertBefore(htmlElement, srg.firstChild);

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

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}