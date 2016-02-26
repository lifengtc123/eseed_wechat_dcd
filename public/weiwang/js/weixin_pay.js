//body:商品描述（128字节一下） ，partner：注册时分配的财付通商户号 partnerId，total_fee：订单总金额， 单位为分；
//notify_url：在支付完成后，接收微信通知支付结果的 URL，需 给 绝 对 路 径 ， 255 字 符 内 , 格 式 如:http://wap.tenpay.com/tenpay.asp；
//spbill_create_ip：指用户浏览器端 IP，丌是商户服务器 IP，格式为IPV4，
function getpackage(body,partner,total_fee,notify_url,spbill_create_ip,paternerKey){
	var initpackage= 'bank_type=WX&body='+body+'&partner='+partner+'&out_trade_no='+getnonceStr()+'&total_fee='+total_fee+'&fee_type=1&notify_url='+notify_url+'&spbill_create_ip='+spbill_create_ip+'&input_charset=UTF-8';
	var initpackage2= 'bank_type=WX&body='+encodeURIComponent(body)+'&partner='+encodeURIComponent(partner)+'&out_trade_no='+encodeURIComponent(getnonceStr())+'&total_fee='+encodeURIComponent(total_fee)+'&fee_type=1&notify_url='+encodeURIComponent(notify_url)+'&spbill_create_ip='+encodeURIComponent(spbill_create_ip)+'&input_charset=UTF-8';
	var sign=$.md5(initpackage+'&key='+paternerKey).toUpperCase();
	return initpackage2+'&sign='+sign;
}
//调用支付窗口签名
function getpaySign(appId,currTime,nonceStr,getpackage,key){
	var initpaySign= 'appId='+appId+'&nonceStr='+nonceStr+'&package='+getpackage+'&signType=MD5'+'&timeStamp='+currTime;
	return $.md5(initpaySign+'&key='+key).toUpperCase();
}
//获得订单号签名
function getpaySigntwo(body,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,key,total_fee){
	//var initpaySign='appid=wx68b779ee1d32b13b&body=违章代付&mch_id=1226277702&nonce_str=JSAPI2313435431&notify_url=http://www.baidu.com/&openid=o7dfojofgGlDxO2gBVuG9ymezcOc&out_trade_no=13135453413135&spbill_create_ip=127.0.0.1&total_fee=1&trade_type=JSAPI';
	var initpaySign='appid=wx68b779ee1d32b13b&body='+body+'&mch_id=1226277702&nonce_str='+nonce_str+'&notify_url='+notify_url+'&openid='+openid+'&out_trade_no='+out_trade_no+'&spbill_create_ip='+spbill_create_ip+'&total_fee='+total_fee+'&trade_type=JSAPI';
	return  $.md5(initpaySign+'&key='+key).toUpperCase();
}
