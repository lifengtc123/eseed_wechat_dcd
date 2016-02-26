package utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.hp.hpl.sparta.Sparta.Cache;

import play.libs.WS;
import play.libs.WS.HttpResponse;
import models.Configs;
import models.WXConfig;
import utils.PagedList;

/**
 * 开放平台辅助类
 * @author lcien
 *
 */
public class OpenPlatformutils { 
	/**
	 * 获取预授权码 时效为20分钟
	 */
	public static  String getPre_auth_code() {
		Object pre_auth_code=play.cache.Cache.get("pre_auth_code");
		if(pre_auth_code!=null){
			return pre_auth_code.toString();
		}
		WXConfig wxconfig=WXConfig.find("").first();
		//获取预授权码
		String json="{\"component_appid\":\""+wxconfig.appid+"\"}";
		String access_token = wxconfig.access_token;
		HttpResponse res = WS.url("https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token="+ access_token).body(json).post();			  
		JsonElement xml = res.getJson();
	    JsonObject jsonObj = xml.getAsJsonObject();//转换成Json对象
	    String status=jsonObj.get("errcode").getAsString();//status节点
	    if(status!=null){
	    	System.out.println("错误"+status);
	    	 System.out.println(xml);
	    }
	    String pre_auth_code2=jsonObj.get("pre_auth_code").getAsString();//pre_auth_code预授权码
	    play.cache.Cache.set("pre_auth_code", pre_auth_code2,"1100s");
		return pre_auth_code2;
	}
}
