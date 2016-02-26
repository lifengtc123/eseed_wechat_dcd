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
 
 var _html = "<div id='loading' style='z-index: 99999;position	:absolute;left:0;width:100%;height:100%;top:0%;background:#E0ECFF;opacity:0.5;filter:alpha(opacity=80);'>\
 <div style='margin-top: 35%;margin-left: 35%;'><image src='/public/images/loading.gif' width='80px' height='80px'   ></div></div>";
 
 $( function(){
 	var _mask = document.getElementById('loading');
 	_mask.parentNode.removeChild(_mask);
 		
 });
 
 function loadingcontent(){
	  $("body").append(_html);
 }
 

	 
 document.write(_html);
 