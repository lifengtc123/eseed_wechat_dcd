//防alert() 窗口 
//txt 提示内容
function eAlert(txt){
	
	var eSrc=(document.all)?window.event.srcElement:arguments[1];
	var shield = document.createElement("DIV");
	shield.id = "shield";
	shield.style.position = "absolute";
	shield.style.left = "0px";
	shield.style.top = "0px";
	shield.style.width = "100%";
	shield.style.height = ((document.documentElement.clientHeight>document.documentElement.scrollHeight)?document.documentElement.clientHeight:document.documentElement.scrollHeight)+"px";
	shield.style.background;
	shield.style.textAlign = "center";
	shield.style.zIndex = "10000";
	shield.style.filter = "alpha(opacity=0)";
	shield.style.opacity = 0;
	var alertFram = document.createElement("DIV");
	alertFram.id="alertFram";
	alertFram.style.position = "absolute";
	alertFram.style.left = "73%";
	alertFram.style.top = "50%";
	alertFram.style.marginLeft = "-225px" ;
	alertFram.style.marginTop = -75+document.documentElement.scrollTop+"px";
	alertFram.style.width = "300px";
	alertFram.style.height = "150px";
	alertFram.style.background = "#ccc";
	alertFram.style.textAlign = "center";
	alertFram.style.lineHeight = "20px";
	alertFram.style.zIndex = "10001";
	strHtml  = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%;\">\n";
	strHtml += "	<li style=\"background:#f2f2f2;text-align:left;padding-left:5px;font-size:14px;font-weight:bold;height:50px;line-height:45px;border-left:2px solid #fff;border-right:2px solid #fff;border-top:2px solid #fff;color:#000000;font-weight:bold;font-size:18px;\">提示</li>\n";
	strHtml += "	<li style=\"background:#f2f2f2;text-align:left;padding-left:5px;font-size:12px;height:61px;line-height:20px;border-left:2px solid #fff;border-right:2px solid #fff;border-top:1px solid #fff;color:#000000;font-weight:bold;word-break:break-all;font-size:14px\">　　"+txt+"</li>\n";
	strHtml += "	<li style=\"background:#fff;text-align:center;font-weight:bold;height:50px;line-height:50px; border:2px solid #fff;\"><span style=\"padding:10px 55px 10px 55px;background:#fe802c\" id=\"do_OK\" onmouseover=\"$(this).css('background','#FF9224')\" onmouseout=\"$(this).css('background','#FCFCFC')\" onclick=\"doOk()\"/>确 定</span></li>\n";
	strHtml += "</ul>\n";
	alertFram.innerHTML = strHtml;
	document.body.appendChild(alertFram);
	document.body.appendChild(shield);
	this.setOpacity = function(obj,opacity){
		if(opacity>=1)opacity=opacity/100;
		try{ obj.style.opacity=opacity; }catch(e){}
		try{ 
			if(obj.filters.length>0&&obj.filters("alpha")){
				obj.filters("alpha").opacity=opacity*100;
			}else{
				obj.style.filter="alpha(opacity=\""+(opacity*100)+"\")";
			}
		}catch(e){}
	}
	var c = 0;
	this.doAlpha = function(){
		if (++c > 20){clearInterval(ad);return 0;}
		setOpacity(shield,c);
	}
	var ad = setInterval("doAlpha()",1);
	this.doOk = function(){
		//alertFram.style.display = "none";
		//shield.style.display = "none";
		document.body.removeChild(alertFram);
		document.body.removeChild(shield);
		document.body.onselectstart = function(){return true;}
		document.body.oncontextmenu = function(){return true;}
	}
	document.getElementById("do_OK").focus();
	document.body.onselectstart = function(){return false;}
	document.body.oncontextmenu = function(){return false;}
}