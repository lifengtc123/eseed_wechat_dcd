package controllers.weixin;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.util.Date;
import java.util.List;
import java.util.Random;

import models.BroadcastHistory;
import models.Configs;
import models.Customerinfo;
import models.Imagetext;
import models.ImgStock;
import models.MenuWx;
import models.Newsinfo;
import models.TokenRecord;
import models.WXConfig;
import models.WXInterface;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;

import play.Play;
import play.cache.Cache;
import play.libs.OAuth.Response;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import utils.CacheUtils;
import utils.DESUtils;
import utils.MD5;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * 操作date
 * 
 * @author zhujl
 */
public class WXUtils {
	// 获取企业code，oauth2验证接口地址
	public static String wxUrl = "https://open.weixin.qq.com";
	// 获取token,推送菜单接口地址
	// public static String qyUrl="https://qyapi.weixin.qq.com"; //企业号
	public static String qyUrl = "https://api.weixin.qq.com"; // 公众号
	/**
	 * 获取调用支付窗口时需使用的签名
	 * 
	 * @param appId
	 * @param currTime
	 * @param nonceStr
	 * @param getpackage
	 * @param key
	 * @return
	 */
	public static final String getpaySign(String appId, String currTime, String nonceStr, String getpackage, String key) {
		String initpaySign = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=" + getpackage + "&signType=MD5" + "&timeStamp='" + currTime + "'";
		return MD5.hash(initpaySign + "&key=" + key).toUpperCase();
	}
	/**
	 * 获取prepay_id时需要用的签名
	 * 
	 * @param body
	 * @param nonce_str
	 * @param notify_url
	 * @param openid
	 * @param out_trade_no
	 * @param spbill_create_ip
	 * @param key
	 * @param total_fee
	 * @param mch_id
	 * @return
	 */
	public static final String getpaySigntwo(String body, String nonce_str, String notify_url, String openid, String out_trade_no, String spbill_create_ip, String key, String total_fee, String mch_id) {
		Configs config = new Configs();
		// var
		// initpaySign="appid=wx68b779ee1d32b13b&body=违章代付&mch_id=1226277702&nonce_str=JSAPI2313435431&notify_url=http://www.baidu.com/&openid=o7dfojofgGlDxO2gBVuG9ymezcOc&out_trade_no=13135453413135&spbill_create_ip=127.0.0.1&total_fee=1&trade_type=JSAPI";
		String initpaySign = "appid=" + config.getAppId() + "&body=" + body + "&mch_id=" + mch_id + "&nonce_str=" + nonce_str + "&notify_url=" + notify_url + "&openid=" + openid + "&out_trade_no=" + out_trade_no + "&spbill_create_ip=" + spbill_create_ip + "&total_fee=" + total_fee + "&trade_type=JSAPI";
		return MD5.hash(initpaySign + "&key=" + key).toUpperCase();
	}

	/**
	 * 获得随机字符串
	 * 
	 * @param length
	 *            位数
	 * @return
	 */
	public static String getRandomString(int length) {
		StringBuffer buffer = new StringBuffer("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
		StringBuffer sb = new StringBuffer();
		Random random = new Random();
		int range = buffer.length();
		for (int i = 0; i < length; i++) {
			sb.append(buffer.charAt(random.nextInt(range)));
		}
		return sb.toString();
	}


	/**
	 * 菜单触发返回消息 文本消息
	 * 
	 * @param fromUserName
	 *            发送消息的账号
	 * @param toUserName
	 *            接受消息的账号
	 * @param menu
	 *            菜单
	 * @param msg
	 *            返回给客户的信息
	 * @return
	 */
	public static String responseCommonText(String fromUserName, String toUserName, MenuWx menu, String msg) {
		String content = "<xml>" + "<ToUserName><![CDATA[toUser]]></ToUserName>" + "<FromUserName><![CDATA[fromUser]]></FromUserName>" + "<CreateTime>createTime</CreateTime>" + "<MsgType><![CDATA[text]]></MsgType>" + "<Content><![CDATA[content]]></Content>" + "</xml>";
		content = content.replace("toUser", fromUserName);
		content = content.replace("fromUser", toUserName);
		content = content.replace("createTime", new Date().getTime() + "");
		if (msg != null) {
			content = content.replace("content", msg);
		} else {
			content = content.replace("content", "");
		}
		return content;
	}

	/**
	 * 新闻菜单触发返回消息 图文信息
	 * 
	 * @param fromUserName
	 *            发送消息的账号
	 * @param toUserName
	 *            接受消息的账号
	 * @param menu
	 *            菜单
	 * @param msg
	 *            返回给客户的信息
	 * @return
	 */
	public static String responseCommonimgNews(String fromUserName, String toUserName, Newsinfo newsinfo, String msg) {
		// 获取域名配置项
		String url = Play.configuration.get("project.url").toString();
		String content = "";
		if (newsinfo != null && !newsinfo.imagetext.isEmpty()) {
			content = "<xml>" + "<ToUserName><![CDATA[toUser]]></ToUserName>" + "<FromUserName><![CDATA[fromUser]]></FromUserName>String content" + "<CreateTime>12345678</CreateTime>" + "<MsgType><![CDATA[news]]></MsgType>" + "<ArticleCount>" + newsinfo.imagetext.size() + "</ArticleCount>" + "<Articles>";
			content = content.replace("toUser", fromUserName);
			content = content.replace("fromUser", toUserName);
			content = content.replace("createTime", new Date().getTime() + "");
			for (Imagetext imagetexts : newsinfo.imagetext) {
				content += "<item>";
				content += "<Title><![CDATA[" + imagetexts.title + "]]></Title>";
				content += "<Description><![" + imagetexts.summary + "]></Description>";
				content += "<PicUrl><![CDATA[" + url + imagetexts.imgStock.path + "]]></PicUrl>";
				
				if(imagetexts.isexternal==null||imagetexts.isexternal==0){
					content += "<Url><![CDATA[" +imagetexts.externalurl+"]]></Url>";
				}else{
					content += "<Url><![CDATA[" + url + "/detailNewsinfo?id=" + DESUtils.getPas(imagetexts.id.toString(), "eseed_wechat") + "]]></Url>";
				}
				
				content += "</item>";
			}
		} else {
			content = content.replace("content", msg);
		}
		content += "</Articles>";
		content += "</xml> ";
		return content;

	}

	/**
	 * 菜单触发返回消息 图片消息
	 * 
	 * @param fromUserName
	 *            发送消息的账号
	 * @param toUserName
	 *            接受消息的账号
	 * @param menu
	 *            菜单
	 * @param msg
	 *            返回给客户的信息
	 * @return
	 */
	public static String responseCommonImg(String fromUserName, String toUserName, MenuWx menu, String msg) {
		String content = "<xml>" + 
					"<ToUserName><![CDATA[toUser]]></ToUserName>" + 
					"<FromUserName><![CDATA[fromUser]]></FromUserName>" + 
					"<CreateTime>createTime</CreateTime>" + 
					"<MsgType><![CDATA[image]]></MsgType>" + 
					"<Image><MediaId><![CDATA[media_id]]></Image></Image>" + 
				"</xml>";
		content = content.replace("toUser", fromUserName);
		content = content.replace("fromUser", toUserName);
		content = content.replace("createTime", new Date().getTime() + "");
		if (menu != null && menu.imgStock != null) {
			content = content.replace("media_id", menu.imgStock.media_id);
		} else {
			content = responseCommonText(fromUserName, toUserName, null, "");
		}
		return content;
	}

	/**
	 * 发送被动响应文本消息
	 * 
	 * @param openids
	 *            用户微信号 openid 不能为空 ，可指定发多人，可用"|"分割 如 "user1|user2|user3"
	 * @param content
	 *            内容 为空 需传""
	 * @return
	 */
	public static Boolean requestNewtext(String openids, String content) {
		WXConfig config=CacheUtils.getWXConfig();
		if(config==null){
			config=WXUtils.getAccess_token(config,"weixin.WXUtils.requestNewtext()");  //刷新token
		}
		String json = "{" + "\"touser\":\"" + openids + "\"," + "\"msgtype\": \"text\"," + "\"text\":{\"content\":\"" + content + "\"}" + "}";

		if (openids != null && !"".equals(openids)) {
			HttpResponse res = WS.url(qyUrl + "/cgi-bin/message/custom/send?access_token=" + config.access_token).body(json).post();
			JsonElement xml = res.getJson();
			JsonObject jsonObj = xml.getAsJsonObject();// 转换成Json对象
			String status = jsonObj.get("errcode").getAsString();// status节点
			// System.out.println(status);
			if ("42001".equals(status)) {// access_token过期，重新获取
				Cache.delete("WXConfig");
				config = WXConfig.find("").first();
				HttpResponse token = WS.url(qyUrl + "/cgi-bin/gettoken?corpid=" + config.appid + "&corpsecret=" + config.secret).get();
				String access_token = token.getJson().getAsJsonObject().get("access_token").getAsString();
				config.access_token = access_token;
				config.save();
				HttpResponse res1 = WS.url(qyUrl + "/cgi-bin/message/custom/send?access_token=" + config.access_token).body(json).post();
				xml = res.getJson();
				// System.out.println(xml);
			}
		}
		return true;
	}
	/**
	 * 推送菜单
	 */
	public void sendmenu() {
		WXConfig config=CacheUtils.getWXConfig();
		if(config==null){
			config=WXUtils.getAccess_token(config,"weixin.WXUtils.sendmenu()");  //刷新token
		}
		if (config.appid != null && config.secret != null) {
			String json = MenuWx.toJson();
			HttpResponse resCreated = WS.url("https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + config.access_token).body(json).post();
			// System.out.println("创建菜单："+resCreated.getString()+"-----"+json);
			// HttpResponse resDelete =
			// WS.url("https://api.weixin.qq.com/cgi-bin/menu/delete?access_token="+
			// access_token).get();
			// System.out.println("删除菜单："+resDelete.getString());
		}
	}
	/**
	 * 获得微信昵称时表情会乱码保存数据库报错 需转换下
	 * 
	 * @param text
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String filterOffUtf8Mb4(String text) throws UnsupportedEncodingException {
		byte[] bytes = text.getBytes("UTF-8");
		ByteBuffer buffer = ByteBuffer.allocate(bytes.length);
		int i = 0;
		while (i < bytes.length) {
			short b = bytes[i];
			if (b > 0) {
				buffer.put(bytes[i++]);
				continue;
			}
			b += 256;
			if ((b ^ 0xC0) >> 4 == 0) {
				buffer.put(bytes, i, 2);
				i += 2;
			} else if ((b ^ 0xE0) >> 4 == 0) {
				buffer.put(bytes, i, 3);
				i += 3;
			} else if ((b ^ 0xF0) >> 4 == 0) {
				i += 4;
			}
		}
		buffer.flip();
		return new String(buffer.array(), "utf-8");
	}

	
	/**
	 * 向微信服务器上传文件
	 * @param path 文件的路径
	 * @param fileType 文件的类型
	 * @param type 保存的类型。如果是1：表明保存时永久的，如果是0：保存临时的
	 * @return
	 */
	public static String uploadFile(String path, String fileType, Integer type) {
		
		
		WXConfig config=CacheUtils.getWXConfig();
		if(config==null){
			config=WXUtils.getAccess_token(config,"weixin.WXUtils.uploadFile()");  //刷新token
		}
		
		config = WXConfig.find("").first();
		HttpResponse token1=WS.url(qyUrl+"/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
		config.access_token = token1.getJson().getAsJsonObject().get("access_token").getAsString();
    	config.save();
	

		String url = WXInterface.UPLOAD_MEDIA_URL1;
		
		String uploadurl = String.format("%s?access_token=%s&type=%s", url,config.access_token, fileType);
		
		if(type==0){
			url = WXInterface.UPLOAD_MEDIA_URL0;
			uploadurl = WXInterface.UPLOAD_MEDIA_URL0.replace("ACCESS_TOKEN", config.access_token).replace("TYPE", fileType);
		}
		HttpClient client = new HttpClient();
		
		
		PostMethod post = new PostMethod(uploadurl);
		post.setRequestHeader("User-Agent", "Mozilla/. (Macintosh; Intel Mac OS X.; rv:.) Gecko/ Firefox/.");
		post.setRequestHeader("Host", "file.api.weixin.qq.com");
		post.setRequestHeader("Connection", "Keep-Alive");
		post.setRequestHeader("Cache-Control", "no-cache");
		String result = null;
		try {
			
			File file = new File(Play.applicationPath.getAbsolutePath().replaceAll("\\\\", "/") + path);
//			if (!file.exists() || !file.isFile()) {
//				throw new IOException("上传的文件不存在");
//			}
			
			if (file != null && file.exists()) {
				FilePart filepart = new FilePart("media", file, "image/jpeg","UTF-8");
				Part[] parts = new Part[] { filepart };
				MultipartRequestEntity entity = new MultipartRequestEntity(parts, post.getParams());
				post.setRequestEntity(entity);
				int status = client.executeMethod(post);
				if (status == HttpStatus.SC_OK) {
					String responseContent = post.getResponseBodyAsString();
					JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
					JsonObject json = jsonparer.parse(responseContent).getAsJsonObject();
					if (json.get("errcode") == null)// {"errcode":,"errmsg":"invalid media type"}
					{ // 上传成功
						// {"type":"TYPE","media_id":"MEDIA_ID","created_at":}
						result = json.get("media_id").getAsString();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}
		return result;
	}
	
	public static WXConfig flushAccess_token(HttpResponse responsews,WXConfig config){
		
		JsonElement xml = responsews.getJson();
		JsonObject jsonObj = xml.getAsJsonObject();//转换成Json对象
		JsonElement  status=jsonObj.get("errcode");//status节点
		int i=0;
		if(status!=null){//access_token过期，重新获取
			//过期就刷新	
			if(status.equals("42001")||status.equals("42002")){
				config=WXConfig.find("").first();
				config=getAccess_token(config,"phone.Application.getCode()");  //刷新token
			}
		}
		return null;
		
	}
	
	
	/**
	 * 重新获取access_token
	 * @param config
	 * @param action 方法名 包名+类名+方法名
	 * @return
	 */
	public static WXConfig getAccess_token(WXConfig config,String action){
		
		//WXConfig config1 = WXConfig.find("").first();
		HttpResponse token=WS.url("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
		//增加记录
		TokenRecord tokenrecord=new TokenRecord();
		tokenrecord.dates=new Date();
		if(config!=null&&config.access_token!=null){
			tokenrecord.beforetoken=config.access_token;
		}
		tokenrecord.actionString=action;
		String access_token=token.getJson().getAsJsonObject().get("access_token").getAsString();
    	config.access_token = access_token;
    	config.save();
    	if(config!=null&&config.access_token!=null){
			tokenrecord.token=config.access_token;
		}
		JsonElement  status=token.getJson().getAsJsonObject().get("errcode");//status节点
		tokenrecord.xmlstring=token.getJson().toString();
		tokenrecord.save();
		if(status!=null){
//			System.out.println(status);
			//过期就刷新	
			if(status.equals("42001")||status.equals("42002")){
			HttpResponse token1=WS.url(qyUrl+"/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
			//增加记录
			TokenRecord tokenrecord1=new TokenRecord();
			tokenrecord1.dates=new Date();
			if(config!=null&&config.access_token!=null){
				tokenrecord1.beforetoken=config.access_token;
			}
	    	config.access_token = token1.getJson().getAsJsonObject().get("access_token").getAsString();
	    	config.save();
			tokenrecord1.actionString=action+"_"+"getAccess_token";
			if(config!=null&&config.access_token!=null){
				tokenrecord.token=config.access_token;
			}
			tokenrecord.xmlstring=token1.getJson().toString();
			tokenrecord.save();
			}
		}
    	Cache.set("WXConfig", config,"7000s");
//    	System.out.println("token现取时间"+new Date()+"--"+config.access_token);
		return config;
	}
	
	/**
	 * 群发文本消息
	 * @param customerinfos 用户列表
	 * @param content 文本消息的内容
	 */
	public static String sendText(List<Customerinfo> customerinfos, String content) {
		String openId = "";
		for (Customerinfo customerinfo : customerinfos) {
			BroadcastHistory broadcastHistory = new BroadcastHistory();
			broadcastHistory.customerinfo=customerinfo;
			broadcastHistory.type=0;
			broadcastHistory.content=content;
			broadcastHistory.save();

			if(customerinfo.openid!=null){
				broadcastHistory.openid=customerinfo.openid;
				openId = openId+"\""+customerinfo.openid+"\""+",";
			}
			broadcastHistory.save();
		}
		openId = openId.substring(0,openId.length()-1);
		
		String text = "{ \"touser\":[ openId],\"msgtype\": \"text\",\"text\": { \"content\": \"msgContent\"}}";
		text = text.replace("msgContent", content);
		text = text.replace("openId", openId);
		
		
		return text;
	}
	public static String sendImage(List<Customerinfo> customerinfos,ImgStock imgStock) {
		
		if(imgStock==null){
			return sendText(customerinfos, "图片文件不存在");
		}
		
		imgStock.media_id = uploadFile(imgStock.path, "image",0);
		imgStock.save();
		
		
		String openId = "";
		for (Customerinfo customerinfo : customerinfos) {
			BroadcastHistory broadcastHistory = new BroadcastHistory();
			broadcastHistory.customerinfo=customerinfo;
			broadcastHistory.type=1;
			broadcastHistory.imgStock=imgStock;
			broadcastHistory.save();

			if(customerinfo.openid!=null){
				broadcastHistory.openid=customerinfo.openid;
				openId = openId+"\""+customerinfo.openid+"\""+",";
			}
			broadcastHistory.save();
		}
		openId = openId.substring(0,openId.length()-1);
		
		String text = "{\"touser\":[  openId], \"image\":{\"media_id\":\"media_id1\"},\"msgtype\":\"image\"}";
		text = text.replace("media_id1", imgStock.media_id);
		text = text.replace("openId", openId);
		
		return text;
	}
	
	/**
	 * 发送图文消息
	 * @param customerinfos
	 * @param newsinfo
	 * @param type 0:发送  1：预览
	 * @return
	 */
	public static String sendNewsinfo(List<Customerinfo> customerinfos,Newsinfo newsinfo,Integer type) {
		if(newsinfo==null){
			return sendText(customerinfos, "图文信息不存在");
		}
		
		newsinfo.media_id = uploadNewsinfo(newsinfo);
		
		
		String openId = "";
		for (Customerinfo customerinfo : customerinfos) {
//			System.out.println(customerinfo.openid+"===openId");
			BroadcastHistory broadcastHistory = new BroadcastHistory();
			broadcastHistory.customerinfo=customerinfo;
			broadcastHistory.type=2;
			broadcastHistory.newsinfo=newsinfo;
			
			if(customerinfo.openid!=null){
				broadcastHistory.openid=customerinfo.openid;
				openId = openId+"\""+customerinfo.openid+"\""+",";
			}
			broadcastHistory.save();
		}
		openId = openId.substring(0,openId.length()-1);
		
		String text = "{\"touser\":[openId], \"mpnews\":{ \"media_id\":\"media_id1\"},\"msgtype\":\"mpnews\"}";
		
		if(type==1){//预览
			text = "{\"touser\":openId, \"mpnews\":{ \"media_id\":\"media_id1\"},\"msgtype\":\"mpnews\"}";
		}
		
		text = text.replace("media_id1", newsinfo.media_id);
		text = text.replace("openId", openId);
		System.out.println(text);		
		return text;
	}
	
	/**
	 * 图文信息的上传
	 * @return
	 */
	public static String uploadNewsinfo(Newsinfo newsinfo) {
		
			
		String result=null;
		// 获取域名配置项
		String url = Play.configuration.get("project.url").toString();
		String text=" {\"articles\": [ newsinfo ]}";
		String newsinfos="";
		String newsinfo1="{"
				+"\"thumb_media_id\":\"img_media_id\","
				+"\"author\":\"author_\","
				+"\"title\":\"title_\","
				+"\"content_source_url\":\"url_\","
				+"\"content\":\"content_1\","
				+"\"digest\":\"description\","
				+"\"show_cover_pic\":\"show_cover_pic_\""
				+"},";
		List<Imagetext> list = newsinfo.imagetext;
		
		for (Imagetext imagetext : list) {
			if(imagetext.imgStock!=null){
				System.out.println(imagetext.imgStock.path);
				System.out.println("imagetext.imgStock.path:"+imagetext.imgStock.path);
				imagetext.imgStock.media_id = uploadFile(imagetext.imgStock.path, "image",1);
			}
			
			if(imagetext.imgStock.media_id!=null){
				newsinfo1 = newsinfo1.replace("img_media_id", imagetext.imgStock.media_id);
			}
			
			newsinfo1 = newsinfo1.replace("author_", imagetext.author);
			newsinfo1 = newsinfo1.replace("title_", imagetext.title);
			if(imagetext.isexternal==0){
				newsinfo1 = newsinfo1.replace("url_", imagetext.externalurl);
			}else{
				newsinfo1 = newsinfo1.replace("url_", url + "/detailNewsinfo?id=" + DESUtils.getPas(imagetext.id.toString(), "eseed_wechat"));
			}
			
			newsinfo1 = newsinfo1.replace("content_1", imagetext.content);
			newsinfo1 = newsinfo1.replace("description", imagetext.summary+"abc");
			newsinfo1 = newsinfo1.replace("show_cover_pic_", "1");
			
			newsinfos = newsinfos+newsinfo1;
		}
		newsinfos = newsinfos.substring(0,newsinfos.length()-1);
		
		text = text.replace("newsinfo", newsinfos);	
		url=WXInterface.URL_ADDNEWS;
		
    	
		String resCreated = WXUtils.dealPOST(url, text, "WXUtils.uploadNewsinfo");
		JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
		JsonObject json = jsonparer.parse(resCreated).getAsJsonObject();
		if (json.get("errcode") == null){ // 上传成功
			result = json.get("media_id").getAsString();
		}else{
			
		}
		return result;
	}
	
	
	public static String dealPOST(String url,String json,String method){
		String result = "";
		//拿缓存的token
		WXConfig config=CacheUtils.getWXConfig();
		if(config==null){
			config=WXUtils.getAccess_token(config,method);  //刷新token
		}
		System.out.println("config.access_token:"+config.access_token);
		String url1 = url.replace("ACCESS_TOKEN", config.access_token);
		System.out.println("json"+json);
		HttpResponse responsews =WS.url(url1).body(json).post();
		
		//加超时处理
		JsonElement xml = responsews.getJson();
		System.out.println("xml:"+xml);
		JsonObject jsonObj = xml.getAsJsonObject();//转换成Json对象
		JsonElement  status=jsonObj.get("errcode");//status节点
		result = responsews.getString();
		String errorCode = "";
		if(status!=null){
			errorCode=status.toString();
			//过期就刷新
			if(errorCode.equals("40001")||errorCode.equals("40002")){
				config=WXConfig.find("").first();
				config=WXUtils.getAccess_token(config,method);  //刷新token
			}
			url1 = url.replace("ACCESS_TOKEN", config.access_token);
			System.out.println(url1);
			HttpResponse resCreated = WS.url(url1).body(json).post();
			result = resCreated.getString();
		}
		return result;
	}
	
	
}
