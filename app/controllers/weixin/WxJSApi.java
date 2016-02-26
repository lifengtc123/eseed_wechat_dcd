package controllers.weixin;

import java.util.Date;

import models.WXConfig;
import play.cache.Cache;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import utils.CacheUtils;

import com.google.gson.JsonElement;

public class WxJSApi {
	
	public WxJSApi(String url){
		jsapi_ticket=getjsapi_ticket();
		this.url=url;
		Double nonce=Math.random();
		nonceStr=nonce.toString().substring(2);
		timestamp=new Date().getTime()/1000+"";
		signature=getsignature(jsapi_ticket, nonceStr, timestamp, url);
	}
	
	public String getJsapi_ticket() {
		return jsapi_ticket;
	}


	public void setJsapi_ticket(String jsapi_ticket) {
		this.jsapi_ticket = jsapi_ticket;
	}


	public String getNonceStr() {
		return nonceStr;
	}


	public void setNonceStr(String nonceStr) {
		this.nonceStr = nonceStr;
	}


	public String getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}



	private String jsapi_ticket;
	private String nonceStr;
	private String timestamp;
	private String url;
	private String signature;
	private String appId;
	
	/*
	 * 调用微信Js—SDK需使用jsapi_ticket
	 */
	public String getjsapi_ticket(){
		String jsapi_ticket="";  //返回的jsapi_ticket
		if(Cache.get("jsapi_ticket")!=null&&!"".equals(Cache.get("jsapi_ticket"))){
			jsapi_ticket=Cache.get("jsapi_ticket").toString();
			return jsapi_ticket;
		}
		WXConfig config = CacheUtils.getWXConfig();
		if(config==null){
			config=WXUtils.getAccess_token(config,"phone.Application.getnickname()");  //刷新token
		}
		System.out.println("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+config.access_token+"&type=jsapi");
    	HttpResponse token=WS.url("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+config.access_token+"&type=jsapi").get();
    	//加超时处理
		JsonElement xml = token.getJson();
		JsonElement  status=xml.getAsJsonObject().get("errcode");//status节点
    	jsapi_ticket=token.getJson().getAsJsonObject().get("ticket").getAsString();
    	if(jsapi_ticket==null||(status!=null&&!"0".equals(status.toString()))){
				config=WXUtils.getAccess_token(config,"phone.Application.getnickname()");  //刷新token
		    	HttpResponse token2=WS.url("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+config.access_token+"&type=jsapi").get();
		    	jsapi_ticket=token2.getJson().getAsJsonObject().get("ticket").getAsString();
    	}
    	Cache.set("jsapi_ticket", jsapi_ticket,"7000s");//过期设置缓存
    	System.out.println("重新获取jssdk凭据时间："+new Date()+"----"+jsapi_ticket);
		return jsapi_ticket;
	}

	
	/**
	 * 使用JS-SDK时需要用的签名
	 * 
	 * @return
	 */
	public String getsignature(String jsapi_ticket, String nonce_str, String timestamp, String url) {
		String initpaySign = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce_str + "&timestamp=" + timestamp + "&url=" + url;
		return new controllers.phone.SHA1().getDigestOfString(initpaySign.getBytes());
	}

}
