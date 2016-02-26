var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;	
var allElements=document.getElementsByTagName("*");

var del_option_message = "确定把这条记录删除掉？";
var moren_option_message = "确定设为默认？";

$(function(){
	$(".option_back").live("click",function(){
		history.back();
	});
	$(".option_close").live("click",function(){
		window.close();
	});
	$(".option_delete").live("click",function(){
		var url = $(this).attr("url");
		var message = $(this).attr("message");
		if( typeof(message) == "undefined"){
			message = del_option_message;
		}
		if(!confirm(message)) return false;
		window.location.href = url;
	});
		$(".option_moren").live("click",function(){
		var url = $(this).attr("url");
		var message = $(this).attr("message");
		if( typeof(message) == "undefined"){
			message = moren_option_message;
		}
		if(!confirm(message)) return false;
		window.location.href = url;
	});
	$("select[class=jumpableSelect]").change(function(){
		var url=this.options[this.selectedIndex].value;
		location.href=url;
	});
	$("#chkall").live("click",function(){
		 $("input:checkbox[name='arrayid']").attr("checked",this.checked); 
	});
	if($("#message").length==1){
		timer=setTimeout("close_message()",2000);
	}
//	$("form").submit(function() {  
//  		$(":submit").attr("disabled","disabled");
//	}); 
	var pass_option_message = "确定执行操作？";
	$(".option_pass").live("click",function(){
		var url = $(this).attr("url");
		var message = $(this).attr("message");
		if( typeof(message) == "undefined"){
			message = pass_option_message;
		}
		if(!confirm(message)) return false;
		window.location.href = url;
	});
	
})

function delete_form(url,id){
	if(id<1) return false;
	$.getJSON(url,{id:id,t:Math.random()},function(data){
		if(data=="success") return true;
		return false;
	});
}

function close_message(){
	$("#message").fadeOut("slow");
}

function close_dialog_realod(){
	window.returnValue = "refresh";
	window.close();
}

function open_window(url){
	if(url.indexOf("?")!=-1){ 
		url=url+"&rand=" + Math.random();
	}else{ 
		url = url + "?rand=" + Math.random();
	}
	url=encodeURI(url);
	window.open(url);
}
function open_dialog(url,width,height){
	if(url.indexOf("?")!=-1){ 
		url=url+"&rand=" + Math.random();
	}else{ 
		url = url + "?rand=" + Math.random();
	}
	url=encodeURI(url);
    var result ;
    	if (window.showModalDialog){
  		   result = window.showModalDialog(url, window, "edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:" + width + "px;dialogHeight:" + height + "px;;location=no;", true);
       }else{ 
  		   result = window.open(url, window, 'height='+height+'px,width='+width+'px,top=40px,left=300px,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
       }
	if(result=="refresh"){
		//刷新左边框架
		try{
		window.parent.frames['leftframe'].location.reload(); 
		}catch(e){}
		window.location.reload();
	}
}

function open_dialog_window(URL, parent, loc_x, loc_y, width, height){
  if(is_ie)
     window.showModalDialog(URL,parent,"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:"+width+"px;dialogHeight:"+height+"px;dialogTop:"+loc_y+"px;dialogLeft:"+loc_x+"px",true);
  else
     window.open(URL,parent,"height="+height+",width="+width+",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top="+loc_y+",left="+loc_x+",resizable=yes,modal=yes,dependent=yes,dialog=yes,minimizable=no",true);
}

function chk_arrayid(){
	var i = 0;
	$("input[name=arrayid]").each(function(){
		if($(this).attr("checked")){
			i = i + 1;
		}
	});
	if(i==0) { alert("请选择要操作的数据!"); return false; }
	if(!confirm("确定执行操作?")) return false;
	return true;
}

function func_table_sort(obj){
	var $obj = $("#"+obj);
	var trs = $obj.find("tr");
	for(i=0;i< trs.length;i=i+1){
		var $tr = $(trs[i]);
		$($tr.find("td")[0]).html(i+1);
	}
}

function user_select(TO_ID,TO_NAME,TYPE,LX,LY){
  if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
  URL="/users/select?to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  if(isChrome){
  	     window.open(URL,"","height=500,width=680,status=yes,toolbar=no,top=200,left=200,menubar=no,location=no");
	 }else{
  		open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
	 }
}

function user_select1(TO_ID,TO_NAME,TYPE,LX,LY){
  if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
  URL="/users/select1?to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
}
function assessors_select(professionid,TO_ID,TO_NAME,TYPE,LX,LY){
  if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
  URL="/assessors/select?professionid="+professionid+"&to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
}
function img_select(TO_ID,TO_NAME,LX,LY){
  URL="/Mercpanel/Commodity/merchant_pic?to_id="+TO_ID+"&to_name="+TO_NAME;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  //open_url_custom(URL,650,'auto');
  open_url_custom(URL,765,655);
}

function vipInfo_select(TO_ID,TO_NAME,TYPE,LX,LY){
  if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
  URL="/Outboxs/vipSelect?to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
}

//商铺邮件选择
function merchant_select(TO_ID,TO_NAME,TYPE,LX,LY){
	if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
	URL="/Outboxs/merchantSelect?to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
	loc_y=loc_x=200;
	if(is_ie){
		loc_x=document.body.scrollLeft+event.clientX-LX;
		loc_y=document.body.scrollTop+event.clientY+LY;
	}
	open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
}

function clear_user(id,name){
	$("#"+id).val("");
	$("#"+name).val("");
}
String.prototype.endWith=function(str){
  if(str==null||str==""||this.length==0||str.length>this.length)
     return false;
  if(this.substring(this.length-str.length)==str)
     return true;
  else
     return false;
  return true;
}
String.prototype.startWith=function(str){
  if(str==null||str==""||this.length==0||str.length>this.length)
   return false;
  if(this.substr(0,str.length)==str)
     return true;
  else
     return false;
  return true;
}

function chage(obj) {
	var objec = "ch"+obj;
	if(confirm("确定要删除附件吗?")) {
		
		$("#"+objec+"").hide();
		$.get('/Announcements/deletePhoto',{id:obj},function(date) {
			alert(date);
		});
	}
}

function delAttachment(id,url) {
	var atid = "files_info_"+id;
	if(confirm("确定要删除附件吗?")) {
		$("#"+atid+"").hide();
		$.ajax({
		   type: "POST",
		   url: url,
		   data: "id="+id,
		   success: function(msg){
		     alert(msg);
		   }
		});
	}
}

function closeWidRealod(){
	window.returnValue = "refresh";
	window.close();
}
function open_window1(url){
	if(url.indexOf("?")!=-1){ 
		url=url+"&rand=" + Math.random();
	}else{ 
		url = url + "?rand=" + Math.random();
	}
	url=encodeURI(url);
	window.parent.open(url);
}

function open_url(url){
	if(url.indexOf("?")!=-1){ 
		url=url+"&rand=" + Math.random();
	}else{ 
		url = url + "?rand=" + Math.random();
	}
	url=encodeURI(url);
	window.open(url);
	// window.location.href=url;
}
//章本军 推荐分类勾选  2014-03-31
function newclass_select(TO_ID,TO_NAME,TYPE,LX,LY){
  if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
  URL="/NewClassificationtjs/select?to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
}
function clear_newclass(TO_ID,TO_NAME){
  if(TO_ID=="" || TO_ID=="undefined" || TO_ID== null){
     TO_ID="TO_ID";
     TO_NAME="TO_NAME";
  }
  document.getElementsByName(TO_ID)[0].value="";
  document.getElementsByName(TO_NAME)[0].value="";
}
function freight_select(TO_ID,TO_NAME,TYPE,LX,LY){
  if(TYPE=="" || typeof(TYPE)=="undefined"){TYPE="only";}
  URL="/Freights/select?to_id="+TO_ID+"&to_name="+TO_NAME+"&flag="+TYPE;
  loc_y=loc_x=200;
  if(is_ie){
     loc_x=document.body.scrollLeft+event.clientX-LX;
     loc_y=document.body.scrollTop+event.clientY+LY;
  }
  open_dialog(URL,650, 500);//这里设置了选人窗口的宽度和高度
}
function open_url_custom(url,width,height){
    $.fancybox.open({
        href: url,
		type: 'iframe',
		fitToView	: true,
		width		: width,
		height		: height,
		autoSize	: false,
		closeClick	: false,
		closeBtn    : true,
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers:  {
	        overlay : {
				closeClick : false
	    	}
    	},
    	 padding : 1,
    	 tpl:{
    	 	closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;" id="fancyCloseBtn"></a>'
    	 }
    });
}
//去空格 licen str.trim()
String.prototype.trim=function(){ return this.replace(/(^\s*)|(\s*$)/g, "");}  