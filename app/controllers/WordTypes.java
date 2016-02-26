package controllers;

import java.util.List;

import play.libs.WS;
import play.libs.WS.HttpResponse;
import models.WXConfig;
import models.WordType;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;

public class WordTypes extends Application{

	public static void index() {
		render();
	}
	
	public static void left(){
		List<WordType> list = WordType.find("1=1 order by sort").fetch();
		render(list);
	}
	
	public static void list_pid(String orderBy,String order,String pid){
		PagedList<WordType> pagedList = new PagedList<WordType>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		WordType.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),"pid='"+pid+"'");
		render("@list",pagedList,orderBy,order);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<WordType> pagedList = new PagedList<WordType>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		WordType.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		List<WordType> list = WordType.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		WordType object = new WordType();
		render(trees,object);
	}
	
	public static void create() {
		WordType object = new WordType();
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<WordType> list = WordType.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@blank",trees,object);
		}
		object.save();
		result("保存字典类别成功","保存字典类别单成功!","/wordTypes/blank",true);
	}
	
	public static void show(long id) {
		WordType object = WordType.findById(id);
		notFoundIfNull(object);
		List<WordType> list = WordType.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void detail(long id) {
		WordType object = WordType.findById(id);
		notFoundIfNull(object);
		List<WordType> list = WordType.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void save(Long id) {
		WordType object = WordType.findById(id);
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<WordType> list = WordType.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@show",trees,object);
		}
		object.save();
		result("保存菜单成功","保存菜单成功!","/wordTypes/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				WordType wordType= WordType.findById(_id);
				if(wordType!=null) wordType.delete();
			}
		}else if(id!=null){
			WordType wordType= WordType.findById(id);
			if(wordType==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			wordType.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	public static void getconfig() {
		WXConfig config = WXConfig.find("").first();
		HttpResponse token=WS.url("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+config.appid+"&secret="+config.secret).get();
    	String access_token=token.getJson().getAsJsonObject().get("access_token").getAsString();
    	config.access_token = access_token;
    	//System.out.println(access_token);
    	config.save();
    	list(null,null);
	}
}