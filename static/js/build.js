
document.addEventListener("DOMContentLoaded", function(event) { 
var urlParams = new URLSearchParams(window.location.search.replace(/\+/g,'%2B'));
	if(!urlParams.get('uri')){
	document.body.style.backgroundColor='#160921';
	document.body.innerHTML='<div class="container">'+
	'<div class="mt-1 mw720 center text-left borbox ">'+
	'<h1 class="mw720 center text-left " style="color: #6450a5;"> Welcome to vidAPI<img src="static/img/app-ico.png" style="max-width: 38px; vertical-align: bottom;"></h1>'+
		'<p>We create the api for your streaming video with the secured and url protected for your link. Let\'s find out all about it.</p>'+
		'<ul>'+
			'<li>AES-256 encryption with your custom password for your link. This help you keep your privacy out of unwanted allegations.</li>'+
			'<li>Multiple params allow your control your videos such as: <code>autoplay</code>, <code>ssl/https</code>, <code>subtitle</code>, <code>cover</code>, <code>referrer-policy</code>, <code>crossorigin</code>...</li>'+
			'<li>Support for simple usage with most of popular media file host, such as: <code>Gdrive</code>, <code>Gofile</code>...</li>'+
			'<li>using pure Javascript with GET/POST method.</li>'+
		'</ul>'+
		'<h2>How to use</h2>'+
		'<p>This project is under development and still have several bugs, therefore is not ready for release yet but the day is coming closer and closer.. If you would like to contribute for this project or join beta testing, please contact us.</p>'+
		'<p align="right"> fap@comic.com</p>'+
	'</div>'+
	'</div>';
	} else{
	document.body.innerHTML='<div class="container">'+
			'<video controls playsinline preload="auto" poster="static/app-preload.png" id="player" >'+
                '<source id="sourcevidapi" size="1080" src="static/preload.mp4"/>'+
               '<!--<source id="sourcevidapi720" size="720" src="static/preload.mp4"> --!>'+
            '</video>'+
			'</div>';
	
	
	
	var app= document.createElement('script');
		app.src='static/js/app.js';
		document.body.append(app);
	}

})
