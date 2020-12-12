//_____________________________________________________
//_____________________________________________________


//_____________________________________________________
var Aes={cipher:function(c,e){for(var a=e.length/4-1,d=[[],[],[],[]],b=0;16>b;b++)d[b%4][Math.floor(b/4)]=c[b];d=Aes.addRoundKey(d,e,0,4);for(b=1;b<a;b++)d=Aes.subBytes(d,4),d=Aes.shiftRows(d,4),d=Aes.mixColumns(d,4),d=Aes.addRoundKey(d,e,b,4);d=Aes.subBytes(d,4);d=Aes.shiftRows(d,4);d=Aes.addRoundKey(d,e,a,4);a=Array(16);for(b=0;16>b;b++)a[b]=d[b%4][Math.floor(b/4)];return a},keyExpansion:function(c){for(var e=c.length/4,a=e+6,d=Array(4*(a+1)),b=Array(4),f=0;f<e;f++)d[f]=[c[4*f],c[4*f+1],c[4*f+2],
c[4*f+3]];for(f=e;f<4*(a+1);f++){d[f]=Array(4);for(c=0;4>c;c++)b[c]=d[f-1][c];if(0==f%e)for(b=Aes.subWord(Aes.rotWord(b)),c=0;4>c;c++)b[c]^=Aes.rCon[f/e][c];else 6<e&&4==f%e&&(b=Aes.subWord(b));for(c=0;4>c;c++)d[f][c]=d[f-e][c]^b[c]}return d},subBytes:function(c,e){for(var a=0;4>a;a++)for(var d=0;d<e;d++)c[a][d]=Aes.sBox[c[a][d]];return c},shiftRows:function(c,e){for(var a=Array(4),d=1;4>d;d++){for(var b=0;4>b;b++)a[b]=c[d][(b+d)%e];for(b=0;4>b;b++)c[d][b]=a[b]}return c},mixColumns:function(c,e){for(var a=
0;4>a;a++){for(var d=Array(4),b=Array(4),f=0;4>f;f++)d[f]=c[f][a],b[f]=c[f][a]&128?c[f][a]<<1^283:c[f][a]<<1;c[0][a]=b[0]^d[1]^b[1]^d[2]^d[3];c[1][a]=d[0]^b[1]^d[2]^b[2]^d[3];c[2][a]=d[0]^d[1]^b[2]^d[3]^b[3];c[3][a]=d[0]^b[0]^d[1]^d[2]^b[3]}return c},addRoundKey:function(c,e,a,d){for(var b=0;4>b;b++)for(var f=0;f<d;f++)c[b][f]^=e[4*a+f][b];return c},subWord:function(c){for(var e=0;4>e;e++)c[e]=Aes.sBox[c[e]];return c},rotWord:function(c){for(var e=c[0],a=0;3>a;a++)c[a]=c[a+1];c[3]=e;return c},sBox:[99,
124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,
25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],rCon:[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,
0,0,0],[27,0,0,0],[54,0,0,0]]};"undefined"!=typeof module&&module.exports&&(module.exports=Aes);"function"==typeof define&&define.amd&&define([],function(){return Aes});"use strict";"undefined"!=typeof module&&module.exports&&(Aes=require("./aes"));Aes.Ctr={};
Aes.Ctr.encrypt=function(c,e,a){if(128!=a&&192!=a&&256!=a)return"";c=String(c).utf8Encode();e=String(e).utf8Encode();var d=a/8,b=Array(d);for(a=0;a<d;a++)b[a]=isNaN(e.charCodeAt(a))?0:e.charCodeAt(a);b=Aes.cipher(b,Aes.keyExpansion(b));b=b.concat(b.slice(0,d-16));e=Array(16);a=(new Date).getTime();d=a%1E3;var f=Math.floor(a/1E3),g=Math.floor(65535*Math.random());for(a=0;2>a;a++)e[a]=d>>>8*a&255;for(a=0;2>a;a++)e[a+2]=g>>>8*a&255;for(a=0;4>a;a++)e[a+4]=f>>>8*a&255;d="";for(a=0;8>a;a++)d+=String.fromCharCode(e[a]);
b=Aes.keyExpansion(b);f=Math.ceil(c.length/16);g=Array(f);for(var h=0;h<f;h++){for(a=0;4>a;a++)e[15-a]=h>>>8*a&255;for(a=0;4>a;a++)e[15-a-4]=h/4294967296>>>8*a;var k=Aes.cipher(e,b),m=h<f-1?16:(c.length-1)%16+1,l=Array(m);for(a=0;a<m;a++)l[a]=k[a]^c.charCodeAt(16*h+a),l[a]=String.fromCharCode(l[a]);g[h]=l.join("")}c=d+g.join("");return c.base64Encode()};
Aes.Ctr.decrypt=function(c,e,a){if(128!=a&&192!=a&&256!=a)return"";c=String(c).base64Decode();e=String(e).utf8Encode();var d=a/8,b=Array(d);for(a=0;a<d;a++)b[a]=isNaN(e.charCodeAt(a))?0:e.charCodeAt(a);b=Aes.cipher(b,Aes.keyExpansion(b));b=b.concat(b.slice(0,d-16));e=Array(8);d=c.slice(0,8);for(a=0;8>a;a++)e[a]=d.charCodeAt(a);d=Aes.keyExpansion(b);b=Math.ceil((c.length-8)/16);a=Array(b);for(var f=0;f<b;f++)a[f]=c.slice(8+16*f,16*f+24);c=a;var g=Array(c.length);for(f=0;f<b;f++){for(a=0;4>a;a++)e[15-
a]=f>>>8*a&255;for(a=0;4>a;a++)e[15-a-4]=(f+1)/4294967296-1>>>8*a&255;var h=Aes.cipher(e,d),k=Array(c[f].length);for(a=0;a<c[f].length;a++)k[a]=h[a]^c[f].charCodeAt(a),k[a]=String.fromCharCode(k[a]);g[f]=k.join("")}c=g.join("");return c.utf8Decode()};"undefined"==typeof String.prototype.utf8Encode&&(String.prototype.utf8Encode=function(){return unescape(encodeURIComponent(this))});"undefined"==typeof String.prototype.utf8Decode&&(String.prototype.utf8Decode=function(){try{return decodeURIComponent(escape(this))}catch(c){return this}});
"undefined"==typeof String.prototype.base64Encode&&(String.prototype.base64Encode=function(){if("undefined"!=typeof btoa)return btoa(this);if("undefined"!=typeof Buffer)return(new Buffer(this,"utf8")).toString("base64");throw Error("No Base64 Encode");});
"undefined"==typeof String.prototype.base64Decode&&(String.prototype.base64Decode=function(){if("undefined"!=typeof atob)return atob(this);if("undefined"!=typeof Buffer)return(new Buffer(this,"base64")).toString("utf8");throw Error("No Base64 Decode");});"undefined"!=typeof module&&module.exports&&(module.exports=Aes.Ctr);"function"==typeof define&&define.amd&&define(["Aes"],function(){return Aes.Ctr});
function encryptFile(c){var e=new FileReader;e.readAsArrayBuffer(c);e.onload=function(a){$("body").css({cursor:"wait"});a=new Uint8Array(e.result);for(var d="",b=0;b<a.length;b++)d+=String.fromCharCode(a[b]);b=$("#password-file").val();a=new Date;b=Aes.Ctr.encrypt(d,b,256);d=new Date;b=new Blob([b],{type:"text/plain"});saveAs(b,c.name+".encrypted");$("#encrypt-file-time").html((d-a)/1E3+"s");$("body").css({cursor:"default"})}}
function decryptFile(c){var e=new FileReader;e.readAsText(c);e.onload=function(a){$("body").css({cursor:"wait"});var d=e.result,b=$("#password-file").val();a=new Date;b=Aes.Ctr.decrypt(d,b,256);d=new Date;for(var f=new Uint8Array(b.length),g=0;g<b.length;g++)f[g]=b.charCodeAt(g);b=new Blob([f],{type:"application/octet-stream"});f=c.name.replace(/\.encrypted$/,"")+".decrypted";saveAs(b,f);$("#decrypt-file-time").html((d-a)/1E3+"s");$("body").css({cursor:"default"})}}
function hencrypt(c,e){return Aes.Ctr.encrypt(c,e,256)}function hdecrypt(c,e){return Aes.Ctr.decrypt(c,e,256)};
//_____________________________________________________
  var popupWindow;
  function centeredPopup(url, winName, w, h, scroll) {
   var LeftPosition =0;
   var TopPosition = screen.height;
   var  settings = 'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',location=no,scrollbars=' + scroll + ',resizable'
    popupWindow = window.open(url, winName, settings);
	  popupWindow.blur();
	  try{self.focus();}catch(e){window.focus();}

} 
//_____________________________________________________

var urlParams = new URLSearchParams(window.location.search.replace(/\+/g,'%2B'));
var vquality={default: urlParams.get('size')?parseInt(urlParams.get('size')):1080};
var vdownload=false;
var vidalowciw=false;
var pickurl;
if(urlParams.get('referrer')=='no'){document.getElementById('referrer').remove();}
//_____________________________________________________

function lfjhls(cjsl){
  var video = document.querySelector('#player');

  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(cjsl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
    });
  }
  
	document.getElementById('player').setAttribute('autoplay',true);
	document.getElementById('player').load();
}
//_____________________________________________________

function gofile(){
if(urlParams.get('local')=='gf'){
fetch("https://apiv2.gofile.io/getServer?c="+suveid, {"headers":{"accept":"*/*"},"referrer":"https://gofile.io/d/"+suveid,"method":"GET"}).then(response => response.json()).then((data) => {
fetch("https://"+data.data.server+".gofile.io/getUpload?c="+suveid, {"headers":{"accept":"*/*"},"referrer":"https://gofile.io/d/"+suveid,"method":"GET"}).then(response => response.json()).then((dat2) => {
document.getElementById('sourcevidapi').src=dat2.data.files[0].link;
document.getElementById('player').removeAttribute('src');

filename = dat2.data.files[0].link.split('\\').pop().split('/').pop();
document.getElementById('titlenaid').innerText=filename;
setTimeout(function(){document.getElementById('player').load();

 if(!urlParams.get('ur2')){setTimeout(function(){document.getElementById('sourcevidapi').src=''; }, 1500);}}, 500);});
});}
}

try{

var uri = (urlParams.get('ssl') ? 'http://': '//')+hdecrypt(urlParams.get('uri'),'');
var filename = hdecrypt(urlParams.get('uri'),'').split('\\').pop().split('/').pop();
var suveid = (hdecrypt(urlParams.get('uri'),'').split('/'))[2] ? (hdecrypt(urlParams.get('uri'),'').split('/'))[2] : hdecrypt(urlParams.get('uri'),'');
gofile();

} catch(e){
var uri = (urlParams.get('ssl') ? 'http://': '//')+urlParams.get('uri');
var filename = urlParams.get('uri').split('\\').pop().split('/').pop();
var suveid = (urlParams.get('uri').split('/'))[2] ? (urlParams.get('uri').split('/'))[2] : urlParams.get('uri');
gofile();

}

document.getElementById('titlenaid').innerText=filename;
document.getElementById('sourcevidapi').src=uri;
document.getElementById('sourcevidapi').setAttribute('size',urlParams.get('size') ? urlParams.get('size') : '720');
if(urlParams.get('autoplay')=='true'){
document.getElementById('player').setAttribute('autoplay',true);
} 
if(urlParams.get('crossorigin')=='anonymous'){document.getElementById('player').setAttribute('crossorigin','anonymous');}
if(urlParams.get('crossorigin')=='0'){document.getElementById('player').setAttribute('crossorigin','');}


if(urlParams.get('local')=="" || !urlParams.get('local')){
document.getElementById('sourcevidapi').src=uri;
setTimeout(function(){document.getElementById('player').load(); 
		      if(!urlParams.get('ur2')){setTimeout(function(){document.getElementById('sourcevidapi').src=''; }, 1500);}
		     
		     }, 500);
}
if(urlParams.get('cc1')){
	var cc1= document.createElement('track');
		cc1.setAttribute('kind','captions');
		cc1.setAttribute('label',urlParams.get('cc1lable')?urlParams.get('cc1lable'):'English');
		cc1.setAttribute('srclang','en');
		cc1.src='//'+urlParams.get('cc1');
	document.getElementById('player').append(cc1);
}
if(urlParams.get('cc2')){
	var cc2= document.createElement('track');
		cc2.setAttribute('kind','captions');
		cc2.setAttribute('label',urlParams.get('cc2lable')?urlParams.get('cc2lable'):'Vietnamse');
		cc2.setAttribute('default','');
		cc2.setAttribute('srclang','vi');
		cc2.src='//'+urlParams.get('cc2');
	document.getElementById('player').append(cc2);

}
if(urlParams.get('ur2') ){
vdownload=true;
try{var ur2 = (urlParams.get('ssl') ? 'http://': '//')+hdecrypt(urlParams.get('ur2'),'');} catch(e){var ur2 = (urlParams.get('ssl') ? 'http://': '//')+urlParams.get('ur2');}
	
	var ui2= document.createElement('source');
		ui2.setAttribute('src',ur2);
		ui2.setAttribute('type','video/mp4');
		ui2.setAttribute('label',urlParams.get('uz2')?urlParams.get('uz2'):'Lower qualaty');
		ui2.setAttribute('size',urlParams.get('uz2')?parseInt(urlParams.get('uz2')):720);
	document.getElementById('player').append(ui2);
	if(urlParams.get('ur3')){
	try{var ur3 = (urlParams.get('ssl') ? 'http://': '//')+hdecrypt(urlParams.get('ur3'),'');} catch(e){var ur3 = (urlParams.get('ssl') ? 'http://': '//')+urlParams.get('ur3');}

	var ui3= document.createElement('source');
		ui3.setAttribute('src',ur3);
		ui3.setAttribute('type','video/mp4');
		ui3.setAttribute('label',urlParams.get('uz3')?urlParams.get('uz3'):'Lower qualaty');
		ui3.setAttribute('size',urlParams.get('uz3')?parseInt(urlParams.get('uz3')):480);
	document.getElementById('player').append(ui3);
	vquality.options=[urlParams.get('size')?parseInt(urlParams.get('size')):1080,urlParams.get('uz2')?parseInt(urlParams.get('uz2')):720,urlParams.get('uz3')?parseInt(urlParams.get('uz3')):480];

	
	} else{
	vquality.options=[urlParams.get('size')?parseInt(urlParams.get('size')):1080,urlParams.get('uz2')?parseInt(urlParams.get('uz2')):720];

	}
	
	document.getElementById('sourcevidapi').setAttribute('label',urlParams.get('size')?urlParams.get('size'):'Current qualaty');

}


if(!urlParams.get('local')){
document.getElementById('sourcevidapi').src=uri;
document.getElementById('player').removeAttribute('src');
document.getElementById('player').load();
 if(!urlParams.get('ur2')){setTimeout(function(){document.getElementById('sourcevidapi').src=''; }, 1500);}
 } else{
 document.getElementById('player').removeAttribute('src');
 document.getElementById('player').load();

 }

  const player = new Plyr('#player', {
				  controls:['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
				  settings:['captions', 'quality', 'speed', 'loop'],
				  quality:vquality,
				  urls: {download: uri},
				  download:vdownload,
				  ratio:urlParams.get('ratio') ? '\''+urlParams.get('ratio')+'\'' : '16:9',
				  title: filename,
				  resetOnEnd:true,
				  hideControls:false,
});
  
  // Expose
if(urlParams.get('local')==='hls'){lfjhls(uri);}
  window.player = player;
  function on(selector, type, callback) {
    document.querySelector(selector).addEventListener(type, callback, false);
  }

function downloadvideo(){
	if(vidalowciw == false && vdownload==true){
	vidalowciw=true;
	var uid3= document.createElement('button');
		uid3.innerHTML='<span id="lfjdownloadspan">Download video in '+urlParams.get('size')+'p</span>';
		uid3.setAttribute('data-plyr','settings');
		uid3.setAttribute('type','button');
		uid3.setAttribute('class','plyr__control');
		uid3.setAttribute('role','menuitem');
		uid3.setAttribute('aria-haspopup','true');
		uid3.setAttribute('onclick','window.location.href="'+player.download+'"');
		document.querySelector('.plyr__menu__container div div[role=menu]').append(uid3);
	
	}

}

if(player.download.match(/premiumvideo\-([a-z0-9]+)\.xvideos\-cdn\.com/ig)){
vdownload=true;downloadvideo();
document.querySelector('#lfjdownloadspan').innerText='Download video';
document.querySelector('#lfjdownloadspan').parentElement.removeAttribute('onclick');

var newirl =player.download.replace(player.download.split('/').pop(),'');
var locklink = false;
var lfiv=[];
var segments; fetch(player.download)
    .then(response => {
        response.text().then(text => {
           var frt= text.replace(/(\#(.+)\n)/ig,''); frt=frt.replace(/\n+/ig,"\n");
           
           segments = frt.split("\n").filter(Boolean); 
           
           for (var i=0; i < segments.length; i++) {
           	   if(segments[i].match(/720p/ig)){lfiv[720] = newirl+segments[i];}
           	   if(segments[i].match(/640p/ig)){lfiv[640] = newirl+segments[i];}
           	   if(segments[i].match(/1080p/ig)){lfiv[1080] = newirl+segments[i];}
           	   if(segments[i].match(/1440p/ig)){lfiv[1440] = newirl+segments[i];}
           	   if(segments[i].match(/2160p/ig)){lfiv[2160] = newirl+segments[i];}
           	
           	
           };
          if (lfiv[2160]){pickurl = lfiv[2160];}
         	else if(lfiv[1440]){pickurl = lfiv[1440];}
         	else if(lfiv[1440]){pickurl = lfiv[1440];}
         	else if(lfiv[1080]){pickurl = lfiv[1080];}
         	else if(lfiv[720]){pickurl = lfiv[720];}
         	else if(lfiv[640]){pickurl = lfiv[640];}
           
          document.querySelector('#lfjdownloadspan').setAttribute('onclick',"document.querySelector('#lfjdownloadspan').setAttribute('id','lfjdownloadspon');lfjdownload(pickurl,true,'#lfjdownloadspon')");
 
        })})




};
//document.querySelector("body").setAttribute('onclick','centeredPopup("//thewolds.github.io/video/ads.html?ckapop=true&od="+Math.random(), "pornhuvads", 14,14, "yes");document.querySelector("body").setAttribute("onclick","")');
/*
if(document.referrer !==""){
var durul=document.referrer;
if(!document.referrer.match(/https/)){durul =document.referrer.replace('http','https');}
var ifrm = document.createElement('iframe');
    ifrm.setAttribute('style','position: absolute; top: 0; left: 0; height: 100%; width: 100%; opacity: 0%; border: 0; z-index: -1;');
    ifrm.setAttribute('sandbox','allow-popups allow-scripts allow-same-origin');
    ifrm.src=durul;
    document.body.appendChild(ifrm);
}
*/
//setTimeout(function(){ if(window.top.location.host !== 'thewolds.github.io'){window.top.location.href=window.self.location.href;}}, 2000);

player.on('ready', event => {downloadvideo();})

player.on('playing', event => {if(urlParams.get('size') && urlParams.get('size')=='360' && screen.width>1000){document.querySelector('div.plyr__video-wrapper--fixed-ratio').style.setProperty('padding-bottom','40%','important');}; document.getElementById('titlenaid').innerText='🔊 '+filename;})
player.on('pause', event => {document.getElementById('titlenaid').innerText=''+filename;})


;(function() {
    var configuration = {
    "token": "6dc86481d460f59b0132e17cb68fc17b",
    "entryScript": {
        "type": "timeout",
        "timeout": 3000,
        "capping": {
            "limit": 20,
            "timeout": 1
        }
    },
    "exitScript": {
        "enabled": true
    },
    "popUnder": {
        "enabled": true
    }
};
    var script = document.createElement('script');
    script.async = true;
    script.src = '//cdn.shorte.st/link-converter.min.js';
    script.onload = script.onreadystatechange = function () {var rs = this.readyState; if (rs && rs != 'complete' && rs != 'loaded') return; shortestMonetization(configuration);};
    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);
})();


