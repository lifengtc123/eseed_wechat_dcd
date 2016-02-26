package controllers.phone;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.util.Date;

import models.MenuWx;
import models.WXConfig;
import play.Play;
import play.cache.Cache;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import play.mvc.Controller;
import utils.CacheUtils;
import utils.SHA1;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import controllers.MenuWxs;
import controllers.weixin.WXUtils;

public class Application extends Controller{
	//获取企业code，oauth2验证接口地址
	public	static  String wxUrl="https://open.weixin.qq.com";
	//获取token,推送菜单接口地址
	//public	static  String qyUrl="https://qyapi.weixin.qq.com"; //企业号
	public	static  String qyUrl="https://api.weixin.qq.com";  //公众号
	
	/**
	 * 
	 * @param num
	 * @param show
	 */
	public static    void  payables(Integer num,Integer show,String activitie,Integer status){
		//redirect(getrequestAddress("www.baidu.com",num,show));
		if(status==0){//帐号绑定
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/accountBind?showwxpaytitle=1",num,show));
		}else if(status==1){//帐号解绑
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/deleteBind?showwxpaytitle=1",num,show));
		}else if(status==2){//原始考勤记录
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/yslist?showwxpaytitle=1",num,show));
		}else if(status==3){//日考勤记录
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/daylist?showwxpaytitle=1",num,show));
		}else if(status==4){//人员到岗统计
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/rylist?showwxpaytitle=1",num,show));
		}else if(status==5){//项目到岗统计
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/xmlist?showwxpaytitle=1",num,show));
		}else if(status==6){//企业到岗统计
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/qylist?showwxpaytitle=1",num,show));
		}else{
			redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/wechat/accountBind?showwxpaytitle=1",num,show));
		}
	}
	
	
	/**
	 * 
	 * @param num
	 * @param show
	 */
	public static  void  payablesdetail(Integer num,Integer show,String id){
		try {
			if(id!=null){
			id=URLEncoder.encode(id,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			notFound();
		}
		redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/Wechat/detailNewsinfo?id_hightopenid="+id,num,show));
	}
	
	
	/**
	 * 
	 * @param num
	 * @param show
	 */
	public static  void  payablesshowCustomerinfo(Integer num,Integer show,String id){
		try {
			if(id!=null){
			id=URLEncoder.encode(id,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			notFound();
		}
		redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/Wechat/showCustomerinfo",num,show));
	}
	public static  void  getreport(Integer num,Integer show,String activitie){
		try {
			activitie=URLEncoder.encode(activitie,"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/jiuTest/getreport?activitie="+activitie,num,show));
	}
	
	
	/**
	 * 有卫星安全支付的
	 * @param num
	 * @param show
	 */
	public static  void  payablestwo(Integer num,Integer show,String openid,Long selectViolationrecordid){
		//System.out.println(openid+"--"+selectViolationrecordid);
		//System.out.println(getrequestAddress(Play.configuration.get("project.url")+"/phone/weiwang/index?showwxpaytitle=1",num,show));
		//System.out.println(getrequestAddresstwo(Play.configuration.get("project.url")+"/phone/weiwang/result3?showwxpaytitle=1",openid,selectViolationrecordid.toString()));
		//redirect(getrequestAddress(Play.configuration.get("project.url")+"/phone/weiwang/index?showwxpaytitle=1",num,show));
		redirect(getrequestAddresstwo(Play.configuration.get("project.url")+"/phone/weiwang/result3?showwxpaytitle=1",openid,selectViolationrecordid.toString()));
	}
	
	
	/**
	 * 请求服务地址
	 * @param path 需要跳转执行的方法
	 * @param num 
	 * @param show
	 * @return
	 */
	public static String getrequestAddress(String path, Integer num, Integer show){
		WXConfig wXConfig=CacheUtils.getWXConfig();
		//String to="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
		String to=wxUrl+"/connect/oauth2/authorize?appid="+wXConfig.appid+"&redirect_uri="+path+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
//		System.out.println(to);
		//https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
		return to;
	}
	
	
	/**
	 * 请求服务地址
	 * @param path 需要跳转执行的方法
	 * @param num 
	 * @param show
	 * @return
	 */
	public static String getrequestAddresstwo(String path, String openid, String selectViolationrecordid){
		WXConfig wXConfig=CacheUtils.getWXConfig();
		//String to="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wXConfig.appid+"&redirect_uri="+path+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
		//String to=wxUrl+"/connect/oauth2/authorize?appid="+wXConfig.appid+"&redirect_uri="+path+"&response_type=code&scope=snsapi_base&state="+openid+"_"+selectViolationrecordid+"#wechat_redirect";
		String to=wxUrl+"/connect/oauth2/authorize?appid="+wXConfig.appid+"&redirect_uri="+path+"&response_type=code&scope=snsapi_base&state="+openid+"_0128_"+selectViolationrecordid+"#wechat_redirect";
		//https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
		return to;
	}
	
	//获取腾讯返回code 获取openid
	public static String getCode(String code){
		String openid="";
		try {
		//加超时处理
		WXConfig config=CacheUtils.getWXConfig();
		if(config==null){
			config=WXUtils.getAccess_token(config,"phone.Application.getnickname()");  //刷新token
		}
		String url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.appid+"&secret="+config.secret+"&code="+code+"&grant_type=authorization_code";
		//String url=qyUrl+"/cgi-bin/user/getuserinfo?access_token="+config.access_token+"&code="+code;
		HttpResponse responsews =WS.url(url).get();
	//	System.out.println(responsews.getString());
		JsonElement xml = responsews.getJson();
		JsonObject jsonObj = xml.getAsJsonObject();//转换成Json对象
		JsonElement  status=jsonObj.get("errcode");//status节点
		int i=0;
		if(status!=null){//access_token过期，重新获取
//			//过期就刷新	
//			if(status.equals("42001")||status.equals("42002")){
//				config=WXConfig.find("").first();
//				config=WXUtils.getAccess_token(config,"phone.Application.getCode()");  //刷新token
//			}
			//连续获取10次直到获取到为止
				for (i = 0; i < 10; i++) {
			    	//String url2=qyUrl+"/cgi-bin/user/getuserinfo?access_token="+config.access_token+"&code="+code;
					HttpResponse responsews2 =WS.url(url).get();
					//System.out.println(responsews2.getJson());
					openid= responsews2.getJson().getAsJsonObject().get("openid").getAsString();//获取open_id
					// System.out.println("第"+i+"次");
					if(openid!=null&&!"".equals(openid)){
						System.out.println("第"+i+"次成功");
						return openid;  //h获取到了直接返回
					}
				}
		    }else{
		    	 openid=jsonObj.get("openid").getAsString();//获取open_id
		    	 System.out.println("获取openid：循环"+i+"次成功");
		    }
		
		//无超时处理
		//String openid= responsews.getJson().getAsJsonObject().get("openid").getAsString();
		} catch (Exception e) {
			e.printStackTrace();
			//notFound();
		}
		return openid;
	}
	
	
		/**
		 * 获取腾讯返回code 获取nickname(昵称)
		 * @param openid 
		 * @return
		 */
		public static String getnickname(String openid){
			String nickname="";
			try {
			WXConfig config=CacheUtils.getWXConfig();
			if(config==null){
				config=WXUtils.getAccess_token(config,"phone.Application.getnickname()");  //刷新token
			}
			String url="https://api.weixin.qq.com/cgi-bin/user/info?access_token="+config.access_token+"&openid="+openid+"&lang=zh_CN";
			//System.out.println(url);
			HttpResponse responsews =WS.url(url).get();
			//System.out.println(responsews.getString());
			//加超时处理
			JsonElement xml = responsews.getJson();
			JsonObject jsonObj = xml.getAsJsonObject();//转换成Json对象
			JsonElement  status=jsonObj.get("errcode");//status节点
			int i = 0;
			if(status!=null){//access_token过期，重新获取
				//过期就刷新
				if(status.equals("42001")||status.equals("42002")){
					config=WXConfig.find("").first();
					config=WXUtils.getAccess_token(config,"phone.Application.getCode()");  //刷新token
				}
				//连续获取10次直到获取到为止
				for (i = 0; i < 10; i++) {
			    	String url2="https://api.weixin.qq.com/cgi-bin/user/info?access_token="+config.access_token+"&openid="+openid+"&lang=zh_CN";
					HttpResponse responsews2 =WS.url(url2).get();
					nickname= responsews2.getJson().getAsJsonObject().get("nickname").getAsString();//获取open_id
					if(nickname!=null&&!"".equals(nickname)){
						return nickname;  //h获取到了直接返回
					}
				}
			    }else{
			    	nickname=jsonObj.get("nickname").getAsString();//获取nickname
			    	System.out.println("获取nickname：循环"+i+"次成功");
			    }
			} catch (Exception e) {
				e.printStackTrace();
				//notFound();
			}
			//无超时处理
			//String openid= responsews.getJson().getAsJsonObject().get("openid").getAsString();
			return nickname;
		}
		
		

		
		
		/**
		 * 获得配置文件里的参数
		 * @param conf 配置文件名字
		 * @return
		 */
		public static String getconf(String conf){
			return Play.configuration.getProperty(conf);
		} 
}
