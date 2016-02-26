package controllers;


import java.util.List;

import models.Menu;
import models.User;
import utils.PagedList;

public class Menus extends Application{

	/**
	 * @author 施夏雨
	 * 显示一级菜单
	 */
	public static void listAll(String orderBy,String order){
		PagedList<Menu> pagedList = new PagedList<Menu>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Menu.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),"pid=0");
		render("@list",pagedList,orderBy,order);
	}
	
	public static void load() {
		if(session.get("menuNum")==null||"".equals(session.get("menuNum"))||"null".equals(session.get("menuNum"))) session.put("menuNum", 15);
		User user = connect();
		List<Menu> menu_p = Menu.find("pid = '0' and flag = 1 and id in("+user.role.menu+") order by sort").fetch();
		List<Menu> menu_c = Menu.find("pid <> '0' and flag = 1 and id in("+user.role.menu+") order by sort").fetch();
		render(menu_p,menu_c,user);
	}
	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<Menu> list = Menu.find("order by sort").fetch();
		render(list);
	}
	
	public static void list_pid(String orderBy,String order,String pid){
		PagedList<Menu> pagedList = new PagedList<Menu>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Menu.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),"pid='"+pid+"'");
		render("@list",pagedList,orderBy,order);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<Menu> pagedList = new PagedList<Menu>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Menu.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		List<Menu> list = Menu.find("pid='0' order by sort").fetch();
		Menu menu = new Menu();
		render(menu,list);
	}
	
	public static void create() {
		Menu menu = new Menu();
		menu.edit(params.getRootParamNode(), "menu");
		menu.save();
		result("保存菜单成功","保存菜单成功!","/menus/blank",true);
	}
	
	public static void save(Long id) {
		Menu menu = Menu.findById(id);
		String pid= params.get("menu.pid");
		menu.edit(params.getRootParamNode(), "menu");
		menu.pid=pid;
		menu.save();
		result("保存菜单成功","保存菜单成功!","/menus/show",false);
	}
	
	public static void show(long id) {
		Menu menu = Menu.findById(id);
		List<Menu> list = Menu.find("pid=0 order by sort").fetch();
		render(menu,list);
	}
	
	public static void detail(long id) {
		Menu menu = Menu.findById(id);
		Menu parent = Menu.find("cid=?", menu.pid).first();
		if(parent==null) parent = new Menu();
		render(menu,parent);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Menu menu = Menu.findById(_id);
				if(menu!=null) menu.delete();
			}
		}else if(id!=null){
			Menu menu = Menu.findById(id);
			if(menu==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			menu.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
}
