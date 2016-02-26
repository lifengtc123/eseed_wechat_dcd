package controllers.weixin;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import models.Customerinfo;
import models.MenuWx;
import models.Newsinfo;
import models.User;
import models.WXConfig;
import play.cache.Cache;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import play.mvc.Controller;
import utils.CacheUtils;
import utils.DateUtils;
import utils.Dom4jUtils;
import utils.SHA1;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import controllers.MenuWxs;

public class Application extends Controller{
	public	static  String qyUrl="https://api.weixin.qq.com";  //公众号
	/**
	 * 微信接口方法
	 *
	 */
	public static void checkInfo(String signature, String timestamp,String nonce) {
		WXConfig config = CacheUtils.getWXConfig();
		if ("GET".equals(request.method)) {
			SHA1 sha1 = new SHA1();
			//判断请求消息是否合法
			if (sha1.checkSignature(config.token, signature, timestamp, nonce)) {
				renderText(params.get("echostr"));
			}
		} else {
			
			
			/*
			 * body请求参数
			 */
			String bodyXml = request.params.get("body");
			//从body请求数据中获取事件的类型
			String eventType = Dom4jUtils.readStringXml(bodyXml, "Event");
			
			//从body请求数据中获取事件的值
			String eventKey = Dom4jUtils.readStringXml(bodyXml, "EventKey");
			// 发送方帐号（一个OpenID）
			
			//从body请求数据中获取消息的类型
			String msgType = Dom4jUtils.readStringXml(bodyXml, "MsgType");

			String fromUserName = Dom4jUtils.readStringXml(bodyXml,"FromUserName");
			// 开发者微信号
			String toUserName = Dom4jUtils.readStringXml(bodyXml, "ToUserName");
//			System.out.println(bodyXml);

			//click事件
			if ("click".equalsIgnoreCase(eventType)) {//click：点击推事件
				String content="";
//				System.out.println(eventKey);
				MenuWx menu = MenuWx.find("menu_key=?", eventKey).first();
				if(menu==null){
					content= WXUtils.responseCommonText(fromUserName,toUserName,null,"");
//					System.out.println(content+"1");
					renderText(content);
				}
				if(eventKey.matches("^multiPic_.*$")){//多图文 eventKey.matches("^002click.*$")&&!"002click".equals(eventKey.trim())
						content=  WXUtils.responseCommonimgNews(fromUserName, toUserName, menu.newsinfo,"");
						renderText(content);
				}
				else if(eventKey.matches("^txt_.*$")){//文本 
					content= WXUtils.responseCommonText(fromUserName,toUserName,null,menu.content);
//					System.out.println(content+"3");
					renderText(content);
				}
				else if(eventKey.matches("^pic_.*$")){
					content=WXUtils.responseCommonImg(fromUserName, toUserName, menu,"");
//					System.out.println(content+"4");
					renderText(content);
				}
				
			}else if ("view".equals(eventType)) {//view：跳转URL
				
			}else if ("scancode_push".equals(eventType)) {//scancode_waitmsg：扫码推事件
				
			}else if ("scancode_waitmsg".equals(eventType)) {//scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
				
			}else if ("pic_sysphoto".equals(eventType)) {//pic_sysphoto：弹出系统拍照发图
				
			}else if ("pic_photo_or_album".equals(eventType)) {//pic_photo_or_album：弹出拍照或者相册发图
				
			}else if ("pic_weixin".equals(eventType)) {//pic_weixin：弹出微信相册发图器
				
			}else if ("location_select".equals(eventType)) {//location_select：弹出地理位置选择器
				
			}else if ("media_id".equals(eventType)) {//media_id：下发消息（除文本消息）
				
			}else if ("view_limited".equals(eventType)) {//view_limited：跳转图文消息URL
				
			}else if ("subscribe".equals(eventType)) {//关注事件
//				String json = MenuWx.toJson();
//				String access_token = config.access_token;
//				HttpResponse res = WS.url("https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+ access_token).body(json).post();			  
//				JsonElement xml = res.getJson();
//			
//			    JsonObject jsonObj = xml.getAsJsonObject();//转换成Json对象
//			    String status=jsonObj.get("errcode").getAsString();//status节点
//
//			    if("42001".equals(status)){//access_token过期，重新获取
//			    	config=WXConfig.find("").first();
//			    	HttpResponse token=WS.url("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
//			    	access_token=token.getJson().getAsJsonObject().get("access_token").getAsString();
//			    	config.access_token = access_token;
//
//			    	config.save();
//			    	
//			    	res = WS.url("https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+ access_token).body(json).post();			  
//					xml = res.getJson();
//			    }
				//当自身没有客户信息时新建
			Customerinfo customerinfo=Customerinfo.find("openid=?", fromUserName).first();
			if(customerinfo==null){
				//当自身没有客户信息时新建
				customerinfo=new Customerinfo();
				customerinfo.openid=fromUserName;
				customerinfo.save();//先保存防止空数据情况
				customerinfo.number=CacheUtils.getCustomerNumber();
				customerinfo.type=0;//分享客户
				customerinfo.save();
				
			}
			customerinfo.subscribedate=new Date();
			customerinfo.subscribeState=1;
			customerinfo.nikename=getnickname(fromUserName);
			customerinfo.save();
			
			//关注之后发送一个图文信息
			Newsinfo newsinfo = Newsinfo.find("classic=1").first();
			
			renderText(WXUtils.responseCommonimgNews(fromUserName, toUserName, newsinfo,""));
			//菜单生成的状态
			}else if ("unsubscribe".equalsIgnoreCase(eventType)) {//取消关注
				Customerinfo customerinfo=Customerinfo.find("openid=?", fromUserName).first();
				if(customerinfo!=null){
					//当自身没有客户信息时新建
					customerinfo.openid=fromUserName;
					customerinfo.unsubscribedate=new Date();
					customerinfo.subscribeState=2;
					customerinfo.save();
				}
			}else{
				//普通文本消息
				if("text".equalsIgnoreCase(msgType)){
					String content ="欢迎关注宁海住建局！";
					String msg = Dom4jUtils.readStringXml(bodyXml, "Content");
					msg="欢迎关注宁海住建局！";
					//System.out.println(msg);
					content= WXUtils.responseCommonText(fromUserName,toUserName,null,msg);
					renderText(content);
					//User object=User.findById(10l);
					//Weixinunit.requestNewtext(object.openid, object.remark);
				}
			}
		}
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
			//连续获取10次直到获取到为止
			//过期就刷新	
			if(status.equals("42001")||status.equals("42002")){
				config=WXConfig.find("").first();
				config=WXUtils.getAccess_token(config,"phone.Application.getCode()");  //刷新token
			}
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
		return nickname;
	}
}
