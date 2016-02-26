//CheckBox全选
function selectAll(formName, cbName) {
	var o = document.forms(formName).item(cbName);
	if (o.length) {//判断是否只有一项
		for (i=0; i<o.length; i++) {
			document.forms(formName).item(cbName)[i].checked = true;
		}
	} else {
		o.checked = true;
	}
}
//CheckBox取消全选
function unSelectAll(formName, cbName) {
	var o = document.forms(formName).item(cbName);
	if (o.length) {//判断是否只有一项
		for (i=0; i<o.length; i++) {
			document.forms(formName).item(cbName)[i].checked = false;
		}
	} else {
		o.checked = false;
	}
}


/* 表单验证相关脚本 */
function getStringLength(str) {
	var endvalue=0;
	var sourcestr=new String(str);
	var tempstr;
	for (var strposition = 0; strposition < sourcestr.length; strposition ++) {
		tempstr=sourcestr.charAt(strposition);
		if (tempstr.charCodeAt(0)>255 || tempstr.charCodeAt(0)<0) {
			endvalue=endvalue+2;
		} else {
			endvalue=endvalue+1;
		}
	}
	return(endvalue);
}
function trim(str) {
	if(str==null) return "";
	if(str.length==0) return "";
	var i=0,j=str.length-1,c;
	for(;i<str.length;i++) {
		c=str.charAt(i);
		if(c!=' ') break;
	}
	for(;j>-1;j--) {
		c=str.charAt(j);
		if(c!=' ') break;
	}
	if(i>j) return "";
	return str.substring(i,j+1); 
}
function isNumber(input) {
	var isNumber = /^[\d]+$/;
	if(isNumber.test(input)){
		return true;
	}
	return false;
}

// 匹配任何空白字符 
function isNotChinese(input) {
	var isNotChinese = /^[\sa-zA-Z\d]*$/;
	if(isNotChinese.test(input)){
		return true;
	}
	return false;
}

function isNullOrNumber(input) {
	var isNumber = /^[\d]*$/;
	if(isNumber.test(input)){
		return true;
	}
	return false;
}

function validateDate(date,format,alt) {
	var time=trim(date.value);
	if(time=="") return;
	var reg=format;
	var reg=reg.replace(/yyyy/,"[0-9]{4}");
	var reg=reg.replace(/yy/,"[0-9]{2}");
	var reg=reg.replace(/MM/,"((0[1-9])|1[0-2])");
	var reg=reg.replace(/M/,"(([1-9])|1[0-2])");
	var reg=reg.replace(/dd/,"((0[1-9])|([1-2][0-9])|30|31)");
	var reg=reg.replace(/d/,"([1-9]|[1-2][0-9]|30|31))");
	var reg=reg.replace(/HH/,"(([0-1][0-9])|20|21|22|23)");
	var reg=reg.replace(/H/,"([0-9]|1[0-9]|20|21|22|23)");
	var reg=reg.replace(/mm/,"([0-5][0-9])");
	var reg=reg.replace(/m/,"([0-9]|([1-5][0-9]))");
	var reg=reg.replace(/ss/,"([0-5][0-9])");
	var reg=reg.replace(/s/,"([0-9]|([1-5][0-9]))");
	reg=new RegExp("^"+reg+"$");
	if(reg.test(time)==false) {//验证格式是否合法
		alert(alt);
		date.focus();
		return false;
	}
	return true;
}
function validateDateGroup(year,month,day,alt) {
	var array=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var y=parseInt(year.value,10);
	var m=parseInt(month.value,10);
	var d=parseInt(day.value,10);
	var maxday=array[m-1];
	if(m==2) {
		if((y%4==0&&y%100!=0)||y%400==0) {
			maxday=29;
		}
	}
	if(d>maxday) {
		alert(alt);
		return false;
	}
	return true;
}
function validateCheckbox(obj,alt) {
	var rs=false;
	if(obj!=null) {
		if(obj.length==null) {
			return obj.checked;
		}
		for(i=0;i<obj.length;i++) {
			if(obj[i].checked==true) {
				return true;
			}
		}
	}
	alert(alt);
	return rs;
}
function validateRadio(obj,alt) {
	var rs=false;
	if(obj!=null) {
		if(obj.length==null) {
			return obj.checked;
		}
		for(i=0;i<obj.length;i++) {
			if(obj[i].checked==true) {
				return true;
			}
		}
	}
	alert(alt);
	return rs;
}
function validateSelect(obj,alt) {
	var rs=false;
	if(obj!=null) {
		for(i=0;i<obj.options.length;i++) {
			if(obj.options[i].selected==true) {
				return true;
			}
		}
	}
	alert(alt);
	return rs;
}



function validateEmails(email,alt,separator) {
	var mail=trim(email.value);
	alert("mail");
	alert(mail);
	if(mail=="") return;
	var em;
	//var myReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
	//  var myReg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{2,3}$/;  原始验证 新增验证两个. licen
	 var myReg =/^[a-zA-Z0-9\._\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{2,3}$/;
	if(separator==null) {
		if(myReg.test(email.value)==false) {
			alert(alt);
			email.focus();
			return false;
		}
	} else {
		em=email.value.split(separator);
		for(i=0;i<em.length;i++) {
			em[i]=em[i].trim();
			if(em[i].length>0&&myReg.test(em[i])==false) {
				alert(alt);
				email.focus();
				return false;
			}
		}
	}
	return true;
}

//验证Email
function validateEmail(input){
	var myReg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{2,3}$/;
	if(myReg.test(input)){
		return true;
	}
	return false;
}

//验证手机号码
function validateMobile(input){
	var myReg = /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/;
	if(myReg.test(input)){
		return true;
	}
	return false;
}

//验证传真号码
function validateFax(input){
	var myReg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	if(myReg.test(input)){
		return true;
	}
	return false;
}

//验证电话号码
function validateTel(input){
	var myReg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	if(myReg.test(input)){
		return true;
	}
	return false;
}

//验证邮编
function validatePost(input){
	var myReg  =/^[0-9]{6}$/;
	if(myReg.test(input)){
		return true;
	}
	return false;
}

// 验证身份证号
function  checkIDCard(str){
	//身份证正则表达式(15位)   
	isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{2}[\0-9xX]{1}$/; 
	//身份证17位
	isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9xX]{1}$/;
	
	if((isIDCard1.test(str)||isIDCard2.test(str))){
		return true;
	}
	return false;
  } 


/* 验证表单，若通过则返回true */
function validateForm(theForm) {
	
//	var disableList=new Array();
	var field = theForm.elements;//将表单中的所有元素放入数组
	for(var i = 0; i < field.length; i++) {

//		var vali=theForm.validate;
//		if(vali!=null) {
//			if(vali.value=="0") {
//				var fun=vali.functionName;
//				if(fun!=null) {
//					return eval(fun+"()");
//				} else {
//					return true;
//				}
//			}
//		}

		var empty=false;
		var value=trim(field[i].value);
		if(value.length==0) {//是否空值
			empty=true;
		}
		var notFocus=$(field[i]).attr("notFocus");//不置焦点
		if (notFocus!=null) {
			notFocus = true;
		}
		var emptyInfo=$(field[i]).attr("emptyInfo");//空值验证
		if(emptyInfo!=null&&empty==true) {
			alert(emptyInfo);
			if (!notFocus){
				field[i].focus();
			}
			return false;
		}
		var nfEmptyInfo=field[i].emptyInfo;//不focus的空值验证
		if(nfEmptyInfo!=null&&empty==true) {
			alert(nfEmptyInfo);
			return false;
		}
		var lengthInfo=$(field[i]).attr("lengthInfo");//最大长度验证
		if(lengthInfo!=null&&getStringLength(value)>$(field[i]).attr("maxLen")) {
			alert(lengthInfo);
			field[i].focus();
			return false;
		}
		var lengthMinInfo=$(field[i]).attr("lengthMinInfo");//最小长度验证
		if(lengthMinInfo!=null&&getStringLength(value)<$(field[i]).attr("minLen")) {
			alert(lengthMinInfo);
			field[i].focus();
			return false;
		}
		var numberInfo=$(field[i]).attr("numberInfo");//是否是正整数
		if (numberInfo!=null) {
			if (!isNumber(value)) {
				alert(numberInfo);
				field[i].select();
				return false;
			}
		}

		var notChineseInfo=field[i].notChineseInfo;//匹配包括下划线的任何单词字符 
		if (notChineseInfo!=null) {
			if (!isNotChinese(value)) {
				alert(notChineseInfo);
				field[i].select();
				return false;
			}
		}
		
		var noChineseInfo=field[i].noChineseInfo;//是否为汉字
		if (noChineseInfo!=null) {
			if (!isNotChinese(value)) {
				alert(noChineseInfo);
				field[i].focus();
				return false;
			}
		}
		
		var numberOrNullInfo = $(field[i]).attr('numberOrNullInfo');//是否是空或者正整数
		if (numberOrNullInfo!=null) {
			alert(!isNullOrNumber(value));
			if (!isNullOrNumber(value)) {
				alert(numberOrNullInfo);
				field[i].select();
				return false;
			}
		}
		
		var telValidatorInfo = field[i].telValidatorInfo; //验证普通电话号码
		if(telValidatorInfo != null){
			if(!validateTel(value)&&value.length!=0){
				alert(telValidatorInfo);
				field[i].focus();
				return false;
			}
		}

		var mobileValidatorInfo = field[i].mobileValidatorInfo; //验证手机号码
		if(mobileValidatorInfo != null){
			if(!validateMobile(value)&&value.length!=0){
				alert(mobileValidatorInfo);
				field[i].focus();
				return false;
			}
		}

		var faxValidatorInfo = field[i].faxValidatorInfo; //验证传真号码
		if(faxValidatorInfo != null){
			if(!validateFax(value)&&value.length!=0){
				alert(faxValidatorInfo);
				field[i].focus();
				return false;
			}
		}

		var emailValidatorInfo = $(field[i]).attr("emailValidatorInfo"); //验证Email
		if(emailValidatorInfo != null){
			if(!validateEmail(value) && value.length != 0){
				alert(emailValidatorInfo);
				field[i].focus();
				return false;
			}
		}

		var postValidatorInfo = field[i].postValidatorInfo; //验证邮编
		if(postValidatorInfo != null){
			if(!validatePost(value) && value.length != 0){
				alert(postValidatorInfo);
				field[i].focus();
				return false;
			}
		}

		var IDCardtValidatorInfo = $(field[i]).attr('IDCardtValidatorInfo'); //验证身份证号
		if(IDCardtValidatorInfo != null){
			if(!checkIDCard(value) && value.length != 0){
				alert(IDCardtValidatorInfo);
				field[i].focus();
				return false;
			}
		}

//		var validatorType=$(field[i]).attr("validatorType");
//		if(validatorType!=null) {//其它javascript
//			var rs=true;
//			if(validatorType=="javascript") {
//				eval("rs="+field[i].functionName+"()");
//				if(rs==false) {
//					return false;
//				} else {
//					continue;
//				}
//			} else if (validatorType=="disable") {//提交表单前disable的按钮
//				disableList.length++;
//				disableList[disableList.length-1]=field[i];
//				continue;
//			} else if (validatorType=="date") {
//				rs=validateDate(theForm.elements(field[i].fieldName),field[i].format,field[i].errorInfo);
//			} else if (validatorType=="dateGroup") {
//				rs=validateDateGroup(theForm.elements(field[i].year),theForm.elements(field[i].month),theForm.elements(field[i].day),field[i].errorInfo);
//			} else if(validatorType=="timeCmp") {
//			    rs=comparetime3(theForm.elements(field[i].startdate).value,theForm.elements(field[i].enddate).value,field[i].errorInfo);
//		    } else if (validatorType=="checkbox") {
//				rs=validateCheckbox(theForm.elements(field[i].fieldName),field[i].errorInfo);
//			} else if (validatorType=="radio") {
//				rs=validateRadio(theForm.elements(field[i].fieldName),field[i].errorInfo);
//			} else if (validatorType=="select") {
//				rs=validateSelect(theForm.elements(field[i].fieldName),field[i].errorInfo);
//			} else if (validatorType=="email") {
//				rs=validateEmails(theForm.elements(field[i].fieldName),field[i].EmailErrorInfo);
//			}else {
//				alert("验证类型不被支持, fieldName: "+field[i].name);
//				return false;
//			}
//			
//			if(rs==false) {
//				return false;
//			}
//		} else {//一般验证
			if(empty==false) {
				var v = field[i].validator; // 获取其validator属性
				if(!v) continue;            // 如果该属性不存在,忽略当前元素
				var reg=new RegExp(v);
				if(reg.test(field[i].value)==false) {
					alert(field[i].errorInfo);
					field[i].focus();
					return false;
				}
			}
//		}
	}
//	for(i=0;i<disableList.length;i++) {
//		disableList[i].disabled=true;
//	}
	return true;
}
/* 验证表单，若通过则返回true  */
function validateForm2(theForm) {
	var field = theForm.elements;//将表单中的所有元素放入数组
	for(var i = 0; i < field.length; i++) {
		var empty=false;
		var value=trim(field[i].value);
		if(value.length==0) {//是否空值
			empty=true;
		}
		var notFocus=$(field[i]).attr("notFocus");//不置焦点
		if (notFocus!=null) {
			notFocus = true;
		}
		var emptyInfo=$(field[i]).attr("emptyInfo");//空值验证
		if(emptyInfo!=null&&empty==true) {
			$(field[i]).parent().find('[name=errText]').text(emptyInfo);
			$(field[i]).parent().find(".form-error-message").show();
			if (!notFocus){
				field[i].focus();
			}
			return false;
		}
		
		var nfEmptyInfo=$(field[i]).attr('emptyInfo');//不focus的空值验证
		if(nfEmptyInfo!=null&&empty==true) {
			alert(nfEmptyInfo);
			return false;
		}
		var lengthInfo=$(field[i]).attr("lengthInfo");//最大长度验证
		if(lengthInfo!=null&&getStringLength(value)>$(field[i]).attr("maxLen")) {
			$(field[i]).parent().find('[name=errText]').text(lengthInfo);
			$(field[i]).parent().find(".form-error-message").show();
			field[i].focus();
			return false;
		}
		
		var lengthMinInfo=$(field[i]).attr("lengthMinInfo");//最小长度验证
		if(lengthMinInfo!=null&&getStringLength(value)<$(field[i]).attr("minLen")) {
			$(field[i]).parent().find('[name=errText]').text(lengthMinInfo);
			$(field[i]).parent().find(".form-error-message").show();
			field[i].focus();
			return false;
		}
		var numberInfo=$(field[i]).attr("numberInfo");//是否是正整数
		if (numberInfo!=null) {
			if (!isNumber(value)) {
				$(field[i]).parent().find('[name=errText]').text(numberInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].select();
				return false;
			}
		}
		

		var notChineseInfo=$(field[i]).attr('notChineseInfo');//匹配包括下划线的任何单词字符 
		if (notChineseInfo!=null) {
			if (!isNotChinese(value)) {
				$(field[i]).parent().find('[name=errText]').text(notChineseInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].select();
				return false;
			}
		}
		
		var noChineseInfo = $(field[i]).attr('noChineseInfo');//是否为汉字
		if (noChineseInfo!=null) {
			if (!isNotChinese(value)) {
				$(field[i]).parent().find('[name=errText]').text(noChineseInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}
		
		var numberOrNullInfo = $(field[i]).attr('numberOrNullInfo');//是否是空或者正整数
		if (numberOrNullInfo!=null) {
			if (!isNullOrNumber(value)) {
				$(field[i]).parent().find('[name=errText]').text(numberOrNullInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].select();
				return false;
			}
		}
		
		var telValidatorInfo =  $(field[i]).attr('telValidatorInfo'); //验证普通电话号码
		if(telValidatorInfo != null){
			if(!validateTel(value)&&value.length!=0){
				$(field[i]).parent().find('[name=errText]').text(telValidatorInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}

		var mobileValidatorInfo = $(field[i]).attr('mobileValidatorInfo'); //验证手机号码
		if(mobileValidatorInfo != null){
			if(!validateMobile(value)&&value.length!=0){
				$(field[i]).parent().find('[name=errText]').text(mobileValidatorInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}

		var faxValidatorInfo = $(field[i]).attr('faxValidatorInfo'); //验证传真号码
		if(faxValidatorInfo != null){
			if(!validateFax(value)&&value.length!=0){
								$(field[i]).parent().find('[name=errText]').text(mobileValidatorInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}

		var emailValidatorInfo = $(field[i]).attr("emailValidatorInfo"); //验证Email
		if(emailValidatorInfo != null){
			if(!validateEmail(value) && value.length != 0){
				$(field[i]).parent().find('[name=errText]').text(emailValidatorInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}

		var postValidatorInfo =  $(field[i]).attr('postValidatorInfo'); //验证邮编
		if(postValidatorInfo != null){
			if(!validatePost(value) && value.length != 0){
				$(field[i]).parent().find('[name=errText]').text(postValidatorInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}

		var IDCardtValidatorInfo = $(field[i]).attr('IDCardtValidatorInfo'); //验证身份证号
		
		if(IDCardtValidatorInfo != null){
			if(!checkIDCard(value) && value.length != 0){
				$(field[i]).parent().find('[name=errText]').text(IDCardtValidatorInfo);
				$(field[i]).parent().find(".form-error-message").show();
				field[i].focus();
				return false;
			}
		}
		$(field[i]).parent().find(".form-error-message").hide();
			if(empty==false) {
				var v = $(field[i]).attr('validator'); // 获取其validator属性
				if(!v) continue;            // 如果该属性不存在,忽略当前元素
				var reg=new RegExp(v);
				if(reg.test(field[i].value)==false) {
					$(field[i]).parent().find('[name=errText]').text($(field[i]).attr('errorInfo'));
					$(field[i]).parent().find(".form-error-message").show();
					field[i].focus();
					return false;
				}
			}
		$(field[i]).parent().find(".form-error-message").hide();
	}
	return true;
}
/* iframe 高度自适应 */
var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
var FFextraHeight=getFFVersion>=0.1? 16 : 0 

function dyniframesize(iframename) {
  var pTar = null;
  if (document.getElementById){
    pTar = document.getElementById(iframename);
  }
  else{
    eval('pTar = ' + iframename + ';');
  }
  if (pTar && !window.opera){
    //begin resizing iframe
    pTar.style.display="block"
    
    if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){
      //ns6 syntax
      pTar.height = pTar.contentDocument.body.offsetHeight+FFextraHeight; 
    }
    else if (pTar.Document && pTar.Document.body.scrollHeight){
      //ie5+ syntax
      pTar.height = pTar.Document.body.scrollHeight;
    }
  }
}
//CheckBox删除
function del(formname,cbname){
	
	var a = document.getElementsByName(cbname);
	var sum=0;
	var c=false;
	for(i=0;i< a.length; i++)
	{
		if(a[i].checked){
		sum++;
		}
	}
	if(sum>0)
	{
	c=window.confirm('确定删除？')
		if(c)
		{
		document.forms(formname).submit();
		}
	}
	else
	{
	alert('您还没有选择');
	}	
}
//CheckBox操作
function docheck(formname,cbname){
	
	var a = document.getElementsByName(cbname);
	var c=false;
	for(i=0;i< a.length; i++)
	{
		if(a[i].checked){
		sum++;
		}
	}
	if(sum>0)
	{
	document.forms(formname).submit();
	}
	else
	{
	alert('您还没有选择');
	}	
}
//判断页面上输入的两个值是否相同,相同提示错误,不同执行操作
function unequal(formname,inputname0,inputname2)
{
	var a = trim(inputname0.value);
	var b = trim(inputname2.value);
	if(a==b)
	{
	alert('不可以重复');	
	}
	else
	{
	document.forms(formname).submit();
	}
}
//判断时间先后顺序,a为前面的时间,b为后面的时间,错误则提示
function comparetime(a,b)
{
	var time1 = a.substring(0,4).concat(a.substring(5,7)).concat(a.substring(8,10));
	var time2 = b.substring(0,4).concat(b.substring(5,7)).concat(b.substring(8,10));
	if((time1)>time2)
	{
		alert('时间顺序错误');
		return false;
	}
	else
	{	
		return true;
	}
}

//,a,b,
function comparetime3(a,b,alt)
{
	var time1 = a.substring(0,2).concat(a.substring(3,5)).concat(a.substring(6,10));
	var time2 = b.substring(0,2).concat(b.substring(3,5)).concat(b.substring(6,10));
	
	if(time2 == null || time2 == "")
	{
		return true;
	}
	else if((time1)>time2)
	{
		alert(alt);
		return false;
	}
	else
	{	
		return true;
	}
}



//Cookie操作

function Setcookie (name, value) { //设置名称为name,值为value的Cookie 
	document.cookie = name + "=" + value + "";
} 

function Deletecookie (name) { //删除名称为name的Cookie 
	var exp = new Date(); 
	exp.setTime (exp.getTime() - 1); 
	var cval = GetCookie (name); 
	document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString(); 
} 

function getCookieVal (offset) { //取得项名称为offset的cookie值 
	var endstr = document.cookie.indexOf (";", offset); 
	if (endstr == -1) 
	endstr = document.cookie.length; 
	return unescape(document.cookie.substring(offset, endstr)); 
} 

function GetCookie (name) { //取得名称为name的cookie值 
	var arg = name + "="; 
	var alen = arg.length; 
	var clen = document.cookie.length; 
	var i = 0; 
	while (i < clen) { 
		var j = i + alen; 
		if (document.cookie.substring(i, j) == arg) 
		return getCookieVal (j); 
		i = document.cookie.indexOf(" ", i) + 1; 
		if (i == 0) break; 
	} 
	return null; 
} 

function comparetime2(a,a2,a3,b,b2,b3){ // 比较时间顺序，精确到分钟
	var time1 = a.substring(0,4).concat(a.substring(5,7)).concat(a.substring(8,10)).concat(a2).concat(a3);
	var time2 = b.substring(0,4).concat(b.substring(5,7)).concat(b.substring(8,10)).concat(b2).concat(b3);

	if((time1)>time2)
	{
		alert('时间顺序错误');
		return false;
	}
	else
	{	
		return true;
	}
}

/* 判断选项中重复项 */
function checkOptionSame(formSrc, optNum, optPre) {
	var z=0;
	var a=new Array(optNum);
	for (var i=0; i<optNum; i++) {
		var index = i+1;
		a[i] = formSrc[optPre + index].value;
		if (a[i]=="") {
			z = i;
			break;
		}
	}
	for(var i=0; i<z; i++) {
		for (var j=i+1; j<=z; j++) {
			if(a[i]==a[j]) {
				alert("选项中有重复的内容！");
				return false;
			}
		}
	}
	return true;
}

/* div 显示隐藏相关脚本 */
function changediv(divid) {
	clearalldiv();
	showdiv(divid);
}
function cleardiv(divid) {
	document.getElementById(divid).style.display="none";
}
function showdiv(divid) {
	document.getElementById(divid).style.display="";
}

/* @施夏雨    验证表单非空 ,主表上class引入emptyInfo，子表上class引入emptyInfo1,如果后边有其他标签的话，在其他标签前添加<span></span>*/
$(function(){
	$(".emptyInfo").each(function(){
		$(this).after('<span style="color:red;">&nbsp;*</span>')
	});
});
function checkEmptyInfo(){
	var isFull = true;
	$(".emptyInfo").each(function(){
		if($(this).val()==null||$(this).val()==""){
			$(this).next().remove();
			$(this).after('<span style="color:red;">&nbsp;*&nbsp;&nbsp;必填!</span>');
			isFull = false;
		}
		else if($(this).val()==0){
			$(this).next().remove();
			$(this).after('<span style="color:red;">&nbsp;*&nbsp;&nbsp;不为零!</span>');
			isFull = false;
		}
		else $(this).next().html("&nbsp;*");
	});
	$(".emptyInfo1").each(function(){
		if($(this).val()==null||$(this).val()==""){
			$(this).next().remove();
			$(this).after('<span style="color:red;">必填!</span>');
			isFull = false;
		}
		else if($(this).val()==0){
			$(this).next().remove();
			$(this).after('<span style="color:red;">不为零!</span>');
			isFull = false;
		}
		else $(this).next().html("");
	});
	return isFull;
}

//验证正负小数(2位)
function checkDecimals(obj){
	var num = $(obj).val();
	if(num==null||num==""){
		$(obj).val("0.00");
	}
	if(num!=0&&num!=""){
		if(!(!isNaN(num)||/^[+,-][0-9]*[1-9][0-9]*$/.test(num))){
			alert("请输入正确的数字");
			$(obj).val("0.00");
			$(obj).focus();
			return;
		}
	}
}
//验证正负小数(1位)
function checkDecimals1(obj){
	var num = $(obj).val();
	if(num==null||num==""){
		$(obj).val("0.0");
	}
	if(num!=0&&num!=""){
		if(!(!isNaN(num)||/^[+,-][0-9]*[1-9][0-9]*$/.test(num))){
			alert("请输入正确的数字");
			$(obj).val("0.0");
			$(obj).focus();
			return;
		}
	}
}
//验证正负小数(0位)
function checkDecimals2(obj){
	var num = $(obj).val();
	if(num==null||num==""){
		$(obj).val("0");
	}
	if(num!=0&&num!=""){
		if(!(!isNaN(num)||/^[+,-][0-9]*[1-9][0-9]*$/.test(num))){
			alert("请输入正确的数字");
			$(obj).val("0");
			$(obj).focus();
			return;
		}
	}
}
$(function(){
	$(".emptyInfo").live("blur",function(){
		if(($(this).val()!=null&&$(this).val()!="")||$(this).val()!=0){
			$(this).next().html("&nbsp;*");
		}
	});
	$(".emptyInfo1").live("blur",function(){
		if(($(this).val()!=null&&$(this).val()!="")||$(this).val()!=0){
			$(this).next().html("");
		}
	});
})
