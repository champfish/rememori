
function sitePopup(){
		var html =
	'<div id="popup1" class="overlay">'+
		'<div class="popup">'+
			'<h2>Add site</h2>'+
			'<h3>URL</h3>'+
'<input type="text" id="urlID" name="url" value="'+window.location.href+'">'+
'<h3>Name</h3>'+
'<input type="text" id="nameID" name ="name" value="'+'d'+document.title+'" autofocus">'+	
			'</div>'+
		'</div>'+
	'</div>'
	var dom = htmlToElement(html);
	document.body.appendChild(dom);
	window.location.href = '#popup1';
	var n = document.getElementById('nameID');
	n.select();
	n.focus();
}


//document.addEventListener('add', function (e) { 
//	alert('boop');
//}, false);