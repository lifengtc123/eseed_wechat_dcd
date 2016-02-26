
//验证手机号码
function validateMobile(input){
	var myReg = /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/;
	if(myReg.test(input)){
		return true;
	}
	return false;
}
//验证Email
function validateEmail(input){
	//  var myReg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{2,3}$/;  原始验证 新增验证两个.
	var myReg =/^[a-zA-Z0-9\._\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{2,3}$/;
	if(myReg.test(input)){
		return true;
	}
	//验证   两个.号的邮箱
	//var myRegtwo=/^[a-zA-Z0-9_\-]{0,}\.[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{2,3}$/;
	//if(myRegtwo.test(input)){
	//	alert(1);
	//	return true;
	//}
	return false;
}