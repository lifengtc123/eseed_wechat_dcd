package controllers;

import java.io.*;
import java.util.List;

import models.*;
import play.cache.Cache;
import play.data.validation.Valid;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import utils.*;

public class WXConfigs extends Application{
	
	public static void list(String orderBy,String order) {
		PagedList<WXConfig> pagedList = new PagedList<WXConfig>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		WXConfig.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		WXConfig wXConfig = new WXConfig();
		render(wXConfig);
	}
	
	public static void create() {
		WXConfig object = new WXConfig();
		object = object.edit("wXConfig", params.all());
		object.save();
		
		result("添加成功","添加成功!","/wXConfigs/blank",true);
	}
	
	public static void show(long id) {
		WXConfig wXConfig= WXConfig.findById(id);
		notFoundIfNull(wXConfig);
		render(wXConfig);
	}
	
	public static void detail(long id) {
		WXConfig wXConfig= WXConfig.findById(id);
		notFoundIfNull(wXConfig);
		render(wXConfig);
	}
	
	public static void save(Long id) {
		WXConfig object = WXConfig.findById(id);
		object = object.edit("wXConfig", params.all());
		object.save();
		Cache.delete("WXConfig");
		CacheUtils.getWXConfig();
		result("保存微信配置成功","保存微信配置成功!","/wXConfigs/blank",false);
	}
	public static void getToken() {
		WXConfig config = WXConfig.find("").first();
		HttpResponse token=WS.url("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
		String access_token=token.getJson().getAsJsonObject().get("access_token").getAsString();
    	config.access_token = access_token;
    	//System.out.println(access_token);
    	config.save();
    	Cache.delete("WXConfig");
		CacheUtils.getWXConfig();
    	list(null,null);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				WXConfig wXConfig= WXConfig.findById(_id);
				if(wXConfig!=null) wXConfig.delete();
			}
		}else if(id!=null){
			WXConfig wXConfig= WXConfig.findById(id);
			if(wXConfig==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			wXConfig.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	
	

}