//防alert() 窗口 
//txt 提示内容
function loading(){
	var eSrc=(document.all)?window.event.srcElement:arguments[1];
	var shield = document.createElement("DIV");
	shield.id = "loadings";
	shield.style.position = "absolute";
	shield.style.left = "0px";
	shield.style.top = "0px";
	shield.style.width = "100%";
	shield.style.height ="100%"; 
	shield.style.height = ((document.documentElement.clientHeight>document.documentElement.scrollHeight)?document.documentElement.clientHeight:document.documentElement.scrollHeight)+"px";
	shield.style.background='rgba(0, 0, 0, 0.4)';
	shield.style.textAlign = "center";
	shield.style.zIndex = "12000";
	shield.style.filter = "alpha(opacity=0)";
	shield.style.opacity = 1000;
	strHtml  = "<div style=\"list-style:none;margin:0px;padding:0px;width:100%;height:100%;\" algin='center'><image src='/public/weiwang/images/loading.gif' width='80px' height='80px' style='margin-top:130px'><div>正在处理中，请稍候...</div></div>";
	shield.innerHTML = strHtml;
	var first=document.body.firstChild;//得到页面的第一个元素
	//document.body.insertBefore(shield,first);//在得到的第一个元素之前插入
	document.body.appendChild(shield);
}