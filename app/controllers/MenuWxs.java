package controllers;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import models.Customerinfo;
import models.Imagetext;
import models.ImgStock;
import models.Imggroups;
import models.MenuWx;
import models.Newsinfo;
import models.WXConfig;
import play.Play;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import utils.CacheUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import controllers.weixin.WXUtils;

public class MenuWxs extends Application {

	//进入菜单页面
	public static void list(String orderBy, String order) {
		// 获取微信菜单的一级菜单
		List<MenuWx> roots = MenuWx.find("parent is NULL order by sort").fetch();
		for (MenuWx root : roots) {
			root.children = MenuWx.find("parent is not NULL and parent.id=? order by sort", root.id).fetch();
		}
		render(roots);
	}

	/**
	 * 菜单的添加
	 * 这里的添加只是添加菜单的名字，其他属性不做调整
	 * @param paretnId 上一级菜单的id，如果是0 表明添加的就是一级菜单
	 * @param name 菜单的名字
	 */
	public static void add(Long parentId, String name) {
		MenuWx menuWx = new MenuWx();
		menuWx.name = name;
		MenuWx parent = MenuWx.findById(parentId);
		menuWx.parent = parent;
		menuWx.save();
		list(null, null);
	}

	/**
	 * 菜单名字的更新
	 * 
	 * @param id  菜单的id
	 * @param name 修改之后的名字
	 */
	public static void update(Long id, String name) {
		MenuWx menuWx = MenuWx.findById(id);
		menuWx.name = name;
		menuWx.save();
		list(null, null);
	}
	
	/**
	 * 菜单页面加载的时候调用的ajax
	 */
	public static void load() {

		render();
	}

	/**
	 * 点击某个菜单的时候 ajax事件
	 * @param id
	 * @param type
	 */
	public static void editLoad1(Long id, Integer type) {
		MenuWx menuWx = MenuWx.findById(id);//找到当前的菜单对象
		if (type != null && type == 0) {//如果type未0或者是null 表明是需要重置该菜单的事件
			menuWx.menuType = null;
		}
		
		if (menuWx.menuType == null) {// 只是新增加了菜单 没有添加事件
			render(menuWx);//跳转到增加事件页面
		} else if (menuWx.menuType == 1) {// click事件
			if (menuWx.menu_key.startsWith("multiPic_")) {// 图文消息
				render("@load3", menuWx);
			} else if (menuWx.menu_key.startsWith("pic_")) {// 图片
				render("@load4", menuWx);
			} else if (menuWx.menu_key.startsWith("txt_")) {// 文本消息
				render("@load5", menuWx);
			}
		} else if (menuWx.menuType == 2) {// view事件
			render("@load2_", menuWx);
		}
	}

	/**
	 * 一级菜单点击的时候调用的ajax
	 * 
	 * @param id
	 *            一级菜单的id
	 */
	public static void editLoad2(Long id) {
		MenuWx menuWx = MenuWx.findById(id);
		if (menuWx.menuType == null) {// 只是新增加了菜单 没有添加事件
			render(menuWx);
		} else if (menuWx.menuType == 1) {// click事件
			if (menuWx.menu_key.startsWith("multiPic_")) {// 图文消息
				render("@load3", menuWx);
			} else if (menuWx.menu_key.startsWith("pic_")) {// 图片
				render("@load4", menuWx);
			} else if (menuWx.menu_key.startsWith("txt_")) {// 文本消息
				render("@load5", menuWx);
			}
		} else if (menuWx.menuType == 2) {// view事件
			render("@load2", menuWx);
		}
	}

	/**
	 * 菜单的修改
	 * 
	 * @param id
	 *            菜单id
	 */
	public static void edit1(Long id) {
		MenuWx menuWx = MenuWx.findById(id);
		Gson gson = new GsonBuilder().setVersion(1.1).create();
		String json = gson.toJson(menuWx);
		renderJSON(json);
	}

	// 菜单的删除
	public static void delete(Long id) {
		System.out.println(id);
		if (id != null) {
			MenuWx menuWx = MenuWx.findById(id);
			if (menuWx == null) {

			}
			menuWx.delete();
		}
		list(null, null);
	}

	// 为菜单添加响应事件
	public static void sendMsg(Long id, Integer menuType) {

		MenuWx menuWx = MenuWx.findById(id);
		System.out.println(menuWx.menu_key);
		menuWx.menuType = menuType;
		if (menuWx.menuType == 1) {// click事件
			render("@sendMsg", menuWx);
		} else if (menuWx.menuType == 2) {
			render("@sendUrl", menuWx);
		}

	}

	/**
	 * 菜单事件的更新
	 * 
	 * @param info
	 */
	public static void update1(Long id, String content, String menu_key, Integer menuType, Long imgStockId, Long newsinfoId) {
		MenuWx menuWx = MenuWx.findById(id);
		if (menuType == 1) {// click事件
			if (menu_key.startsWith("txt")) {// 发送文本

			} else if (menu_key.startsWith("pic")) {// 图片
				ImgStock imgStock = ImgStock.findById(imgStockId);
				menuWx.imgStock = imgStock;
				menuWx.newsinfo=null;
			} else if (menu_key.startsWith("multiPic")) {// 图片
				Newsinfo newsinfo = Newsinfo.findById(newsinfoId);
				menuWx.newsinfo = newsinfo;
				menuWx.imgStock=null;
			}

			menuWx.content = content;
			menuWx.menu_key = menu_key;
		} else if (menuType == 2) {// view事件
			menuWx.url = content;
		}

		menuWx.menuType = menuType;
		menuWx.save();
		list(null, null);
	}

	// 图片组
	public static void selectImgGoupgs() {
		List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
		for (Imggroups imggroups : list) {
			imggroups.imgStocks = ImgStock.find("imggroups.id=?", imggroups.id).fetch();
		}

		List<ImgStock> imgStocks = ImgStock.find("imggroups is NULL").fetch();

		render(list, imgStocks);
	}

	public static void selectImgStock(Long id) {
		ImgStock img = ImgStock.findById(id);
		render(img);
	}

	// 图片组
	public static void selectNewsInfos(String condition) {
		if (condition == null) {
			List<Newsinfo> list = Newsinfo.find("1=1 and state=0 order by updated DESC").fetch();
			render(list);
		} else if ("".equals(condition)) {
			List<Newsinfo> list = Newsinfo.find("1=1 and state=0 order by updated DESC").fetch();
			render("@selectNewsInfoResult", list);
		} else {
			String search = condition;
			List<Newsinfo> list = new ArrayList<Newsinfo>();
			if (search != null && !"".equals(search.trim())) {
				String hql = "1=1 and newsinfo.state=0 and (title like '" + search + "%' or author like '" + search + "%' or summary  like '" + search + "%') group by newsinfo_id order by newsinfo.updated desc";
				List<Imagetext> imagetext = Imagetext.find(hql).fetch();
				for (Imagetext imagetext2 : imagetext) {
					list.add(imagetext2.newsinfo);
				}
			}
			render("@selectNewsInfoResult", list);
		}

	}

	/**
	 * 微信菜单的手动推送
	 */
	public static void pushMenuWx() {
		
		//用来判断菜单推送有没有成功
		String result = "0";//-1：没有成功 0：推送成功
		String json = MenuWx.toJson();	
		if ("-1".equals(json)) {//菜单存在没有响应的事件
			System.out.println("111");
			result="0";
		}else{
			System.out.println("222");
			String url="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";
			WXUtils.dealPOST(url, json, "MenuWxs.pushMenuWx");
			
			result="0";
		}
		
		renderJSON(result);
	}

	/**
	 * 二级菜单的拖动排序
	 * @param ids 排序之后的菜单id组成的字符串
	 */
	public static void sortMenu(String ids) {
		String[] idArray = ids.split(";");
		for (String idsStr : idArray) {
			String[] id = idsStr.split(",");

			MenuWx menu = MenuWx.findById(Long.parseLong(id[0]));
			if (menu != null) {
				menu.sort = Integer.parseInt(id[1]);
				menu.save();
			}

		}

		renderJSON(1);
	}
	
	public static void list2(){
		
		render();
	}
	
	/**
	 * 群发页面加载的时候调用的ajax
	 */
	public static void editLoad3() {

		render();
	}
	
	// 群发图片，文本，图文
		public static void sendMsg1(Integer menuType) {
			render("@sendMsg1");
			/*if (menuType == 1) {// click事件
				render("@sendMsg1");
			} else if (menuType == 2) {
				render("@sendUrl1");
			}*/

		}
		
		
		public static void sendAll(String content,Long imgStockId,Long newsinfoId,Integer type ){
			WXConfig config=CacheUtils.getWXConfig();
			if(config==null){
				config=WXUtils.getAccess_token(config,"MenuWxs.sendAll()");  //刷新token
			}
			
			String url="https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=" + config.access_token;
			
			//获取所有的用户
			List<Customerinfo> customerinfos = Customerinfo.find("subscribeState=1").fetch();
			
			String text="";
			if(type==0){//发送文本
				text = WXUtils.sendText(customerinfos,content);
			}else if(type==1){//发送图片
				ImgStock imgStock = ImgStock.findById(imgStockId);
				text = WXUtils.sendImage(customerinfos,imgStock);
			}else if(type==2){//发送图文
				Newsinfo newsinfo = Newsinfo.findById(newsinfoId);
				text = WXUtils.sendNewsinfo(customerinfos,newsinfo,0);
			}
			
			WXUtils.dealPOST(url, text, "MenuWxs.sendAll");
			
			BroadcastHistorys.list(null,null);
		}
}