/**
 *  页面加载等待页面
 *
 *
 */
 var height = window.screen.height-250;
 var width = window.screen.width;
 var leftW = 300;
 if(width>1200){
 	leftW = 500;
 }else if(width>1000){
 	leftW = 350;
 }else {
 	leftW = 100;
 }
 
 var _html = "<div id='loading' style='z-index: 99999;position	:absolute;left:0;width:100%;height:110em;top:0;background:#E0ECFF;opacity:0.5;filter:alpha(opacity=80);'>\
 <div style='position:absolute;	cursor1:wait;left:"+leftW+"px;top:200px;width:auto;height:20px;padding:12px 5px 10px 45px;\
 background:#fff url(/public/images/spinner.gif) no-repeat scroll 5px 8px;border:2px solid #ccc;color:#000;'>\
 正在读取，请等待...\
 </div></div>";
 
 $( function(){
 	var _mask = document.getElementById('loading');
 	_mask.parentNode.removeChild(_mask);
 		
 });
 
 function loadingcontent(){
	  $("body").append(_html);
 }
 

	 
 document.write(_html);
 