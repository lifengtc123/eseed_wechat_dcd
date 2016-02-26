package controllers;


import java.util.Date;
import java.util.List;
import java.util.Map;

import models.ScreenSet;
import models.User;
import models.WXConfig;
import models.Word;
import play.cache.Cache;
import play.libs.Crypto;
import play.mvc.Controller;
import play.mvc.Http;
import utils.MD5;
import utils.OpenPlatformutils;

public class Secure extends Controller {

	public static void login() {
		//记住操作
		Http.Cookie remember = request.cookies.get("rememberme");
        if(remember != null && remember.value.indexOf("-") > 0) {
            String sign = remember.value.substring(0, remember.value.indexOf("-"));
            String username = remember.value.substring(remember.value.indexOf("-") + 1);
            if(Crypto.sign(username).equals(sign)) {
            	User user = User.find("username =?",username).first();
            	if(user!=null){
            		if(user.status==2){
        				flash.error("Account is locked.");
        				login();
        			}
            		user.login = user.login +1;
                	user.save();
	            	session.put("userid",user.id);
	                session.put("username", user.username);
	                session.put("truename", user.truename);
	                String height = params.get("screen.height");
	                String width = params.get("screen.width");
	                ScreenSet screenSet = null;
	                if(height!=null&&!"".equals(height)&&width!=null&&!"".equals(width)){
	                	Double heightSize = Double.parseDouble(params.get("screen.height"));
	 	                Double widthSize = Double.parseDouble(params.get("screen.width"));
	 	                //先找自己的配置
	 	                screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id=?",widthSize,heightSize,user.id).first();
	 	                //系统的
	 	                if(screenSet==null) screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id is null",widthSize,heightSize).first();
	                }
	                if(screenSet!=null){
	                	session.put("pageSize", screenSet.pageSize);
	                	session.put("tableHeight", screenSet.tableHeight);
	                	session.put("menuNum", screenSet.menuNum);
	                }else{
	                	session.put("pageSize", 15);
	                	session.put("tableHeight", 400);
	                	session.put("menuNum", 15);
	                } 
	                Application.index();
            	}
            }
        }
        List<Word> words = Word.find("wordType.name='无验证码IP'").fetch();
    	for (Word word : words) {
			if(request.remoteAddress.equals(word.name)) render("@login_");
		}
    	render();
	}
	
	
	public static void authenticate(String username, String password,boolean remember,String usbId,String randomID,String captcha) {
		validation.required(username);
		validation.required(password);
		if (validation.hasErrors()) {
			params.flash();
			flash.error("用户名或者密码不能为空.");
			login();
		}
		User user = User.find("username =? and password =? ",username,MD5.hash(password)).first();
		
		if (user!=null) {
			
			if (Cache.get(randomID)!=null) {
				String random=Cache.get(randomID).toString();
				if(random!=null&&captcha!=null&&!random.equalsIgnoreCase(captcha)){
					params.flash();
					flash.error("验证码错误！");
					login();
				}
			}
			Cache.delete(randomID);
			
			if(user.status==2){
				flash.error("用户名被锁，不能登录.");
				login();
			}
			
			Map<String, Http.Header> headers = request.headers;
			Http.Header header = headers.get("x-forwarded-for");
			String ip = "";
			if(header != null){
				ip = header.value();
			}else{
				ip = request.remoteAddress;
			}
		
			// 检测是否绑定了IP, 并进行验证。
			if(user.useIp == true) {
				if (user.ip_address != null && !user.ip_address.trim().equals("")) {
					boolean b = false;
					String[] ips = user.ip_address.split(",");
					for(String s : ips) {
						if(s.equals(ip)) {
							b = true;
						}
					}
					if(!b) {
						flash.error("IP地址验证错误！");
						login();
					}
				} else {
					flash.error("IP地址验证错误！");
					login();
				}
			}
			user.login = user.login +1;
        	user.save();
			session.put("userid", user.id);
			session.put("username", user.username);
			session.put("truename", user.truename);
			String height = params.get("screen.height");
            String width = params.get("screen.width");
            ScreenSet screenSet = null;
            if(height!=null&&!"".equals(height)&&width!=null&&!"".equals(width)){
            	Double heightSize = Double.parseDouble(params.get("screen.height"));
	                Double widthSize = Double.parseDouble(params.get("screen.width"));
	                //先找自己的配置
	                screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id=?",widthSize,heightSize,user.id).first();
	                //系统的
	                if(screenSet==null) screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id is null",widthSize,heightSize).first();
            }
            //如果有
            if(screenSet!=null){
            	session.put("pageSize", screenSet.pageSize);
            	session.put("tableHeight", screenSet.tableHeight);
            	session.put("menuNum", screenSet.menuNum);
            }else{
            	session.put("pageSize", 15);
            	session.put("tableHeight", 400);
            	session.put("menuNum", 15);
            } 
			if (remember) {
				response.setCookie("rememberme", Crypto.sign(username) + "-"+ username, "30d");
			}
			Application.index();
		} else {
			params.flash();
			flash.error("登录失败，用户名或者密码错误.");
			login();
		}
	}

	public static void logout() {
		session.clear();
		response.setCookie("rememberme", "");
		flash.success("secure.logout");
		login();
	}
}
