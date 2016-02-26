package controllers;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

import models.History;
import models.Menu;
import models.MenuWx;
import models.Result;
import models.RoleControl;
import models.User;
import models.WXConfig;
import monitor.Monitor;
import play.cache.Cache;
import play.libs.Codec;
import play.libs.Images;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import play.mvc.Before;
import play.mvc.Controller;
import utils.DateUtils;
import utils.Dom4jUtils;
import utils.Result1;
import utils.SHA1;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Application extends Controller {

	protected static void renderBack() {
		String referer = request.headers.get("referer").value();
		if (referer != null && referer.length() > 0) {
			redirect(referer);
		}
	}

	@Before(unless = { "Application.captcha", "Application.genRandomId","Orderinfos.saveExcle"})
	static void gloabl() {
		Monitor.doing(request);
	}

	@Before(unless = { "Application.captcha", "Application.genRandomId","Orderinfos.saveExcle"})
	static void checkAccess() {
		if (!session.contains("username")) {
			Secure.login();
		}
	}

	@Before(unless = { "Application.captcha", "Application.genRandomId","Orderinfos.saveExcle"})
	public static void checkRole(){
		if(!"/".equals(request.url)){
			Menu menu = Menu.find("url=?", request.url).first();
			if(menu!=null) session.put("menu_id", menu.id);
			String controller=request.controller;
			String action=request.actionMethod;
			String value= connect().role.value;
			if(value!=null){
				long userPurview = 0;
				String[] roles = value.split("\\|");
				Map<String,Integer> map = new HashMap<String,Integer>();
				for(String _role : roles){
					if(_role.length()==1){
						break;
					}
					String[] purview =_role.split(":");
					if(purview[0].equalsIgnoreCase(controller)){
						userPurview = Long.parseLong(purview[1]);
						break;
					}
				}
				List<RoleControl> list = null;
				//当前的menu_id
				String menu_id = session.get("menu_id");
				if(menu_id!=null&&!"".equals(menu_id))  list=RoleControl.find("controller = ? and menu.id=?",controller,Long.parseLong(menu_id)).fetch();
				else list=RoleControl.find("controller = ?",controller).fetch();
				for (RoleControl role : list) {
					if(RoleControl.checkPower(userPurview,(long)role.value)){
						map.put(role.action, 1);
					}else{
						if(action.equalsIgnoreCase(role.action))//忽略大小写
							results2("错误","对不起，您没有权限!","/departs/blank",false);
						map.put(role.action, 0);
					}
				}
				renderArgs.put("roleMap", map);
			}
		}
	}

	@Before(unless = { "Application.captcha", "Application.genRandomId","Orderinfos.saveExcle"})
	public static void global() {
		User user = connect();
		if (user != null && !request.isAjax()) {
			Map<String, String[]> keys = params.all();
			StringBuffer postText = new StringBuffer();
			Iterator<String> key = keys.keySet().iterator();
			while (key.hasNext()) {
				String k = key.next();
				if (!k.equals("authenticityToken") && !k.equals("body")
						&& !k.equals("controller") && !k.equals("action")) {
					String b = params.get(k);
					postText.append("{[key:" + k + "] [value:" + b + "]}\r\n");
				}
			}
			History history = new History(user.truename, postText.toString());
			history.save();
		}
	}

	protected static User connect() {
		return User.findById(Long.parseLong(session.get("userid")));
	}

	public static void index() {
		render();
	}

	public static void iframe_blank() {
		render();
	}

	protected static String getJSON(String jsonString) {
		return new Gson().toJson(jsonString);
	}

	public static void result(String title, String message, String url,
			boolean flag) {
		set_default_result(title, message, url, flag);
		render("@result");
	}

	public static void result2(String title, String message, String url,
			boolean flag) {
		set_default_result2(title, message, url, flag);
		render("@result2");
	}
	public static void result3(String title, String message, String url,
			boolean flag) {
		set_default_result3(title, message, url, flag);
		render("@result");
	}
	protected static void renderCloseResult(String msg) {
		// String title = "安排班级成功！";
		Result1 result = new Result1(msg);
		result.setMessage(msg);
		result.addLink("关闭窗口", "javascript:closeWidRealod();");
		renderTemplate("result.html", result);
	}

	protected static void set_default_result(String title, String message,
			String url, boolean flag) {
		Result result = new Result(title, message);
		if (flag) {
			result.addLink("继续添加", url);
		}
		result.addLink("关闭窗口", "javascript:close_dialog_realod();");
		renderArgs.put("result", result);
	}

	protected static void set_default_result2(String title, String message,
			String url, boolean flag) {
		Result result = new Result(title, message);
		if (flag) {
			result.addLink("返回设置", url);
		}
		result.addLink("关闭窗口", "javascript:close_dialog_realod();");
		renderArgs.put("result", result);
	}
	/**
	 * 
	 * @param title
	 * @param message
	 * @param url
	 * @param flag
	 */
	protected static void set_default_result3(String title, String message,
			String url, boolean flag) {
		Result result = new Result(title, message);
		if (flag) {
			result.addLink("重新绑定", url);
		}
		result.addLink("关闭窗口", "javascript:close_dialog_realod();");
		renderArgs.put("result", result);
	}

	public static void results(String title, String message, String url,
			boolean flag) {
		set_default_results(title, message, url, flag);
		render("@result");
	}

	protected static void set_default_results(String title, String message,
			String url, boolean flag) {
		Result result = new Result(title, message);
		result.addLink("关闭窗口", "javascript:close_dialog_realod();");
		renderArgs.put("result", result);
	}

	public static void results2(String title, String message, String url,
			boolean flag) {
		set_default_results2(title, message, url, flag);
		render("@result2");
	}

	protected static void set_default_results2(String title, String message,
			String url, boolean flag) {
		Result result = new Result(title, message);
		result.addLink("返回", "javascript:history.go(-1);");
		renderArgs.put("result", result);
	}

	protected static void set_tab(int tab) {
		if (renderArgs.get("tab_index") == null)
			renderArgs.put("tab_index", tab);
	}

	public static void new_result(String title, String message, String url,
			boolean flag) {
		set_new_result(title, message, url, flag);
		render("@result");
	}

	protected static void set_new_result(String title, String message,
			String url, boolean flag) {
		Result result = new Result(title, message);
		if (flag) {
			result.addLink("返回", url);
		}
		renderArgs.put("result", result);
	}

	public static String getURLDecoder(String str) {
		try {
			if (str == null)
				return "";
			str = URLEncoder.encode(str, "iso8859-1");
			str = URLDecoder.decode(str, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			str = "";
		}
		return str;
	}

	/**
	 * 验证码
	 * 
	 * @param id
	 */
	public static void captcha(String randomID) {
		Images.Captcha captcha = Images.captcha(145, 45);
		String code = captcha.getText("#49B07F", 4);
		Cache.set(randomID, code, "30mn");
		renderBinary(captcha);
	}

	/**
	 * 验证码相关
	 * 
	 * @return 一个不重复的id
	 */
	public static String genRandomId() {
		return Codec.UUID();
	}
	//推送微信菜单
		public static void propelling(){
			WXConfig config = WXConfig.find("").first();
			HttpResponse token=WS.url("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
	    	String access_token=token.getJson().getAsJsonObject().get("access_token").getAsString();
	    	config.access_token = access_token;
	    	config.save();
		    	if(config.appid!=null&&config.secret!=null){
		    		String json = MenuWx.toJson();
					HttpResponse res = WS.url("https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+ access_token).body(json).post();			  
				//	System.out.println(res.getString()+"-----"+json);
		    	}
		}
}