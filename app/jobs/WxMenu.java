package jobs;

import java.util.Date;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import controllers.weixin.WXUtils;
import models.MenuWx;
import models.WXConfig;
import play.Play;
import play.cache.Cache;
import play.jobs.Every;
import play.jobs.Job;
import play.jobs.OnApplicationStart;
import play.libs.WS;
import play.libs.WS.HttpResponse;

/*推送微信菜单
 */
//@OnApplicationStart
public class WxMenu extends Job {
	   //推送微信菜单
	@Override
	public void doJob(){
		WXConfig config = WXConfig.find("").first();
			config=WXUtils.getAccess_token(config,"job.WxMenu.doJob()");  //刷新token
	    	if(config.appid!=null&&config.secret!=null){
	    		String json = MenuWx.toJson();
				HttpResponse resCreated = WS.url("https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+ config.access_token).body(json).post();			  
				System.out.println("创建菜单："+resCreated.getString()+"-----"+json);
	    	}
		
	}
}
