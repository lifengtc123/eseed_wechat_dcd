package controllers;

import java.util.List;

import models.Depart;
import models.Menu;
import models.RoleControl;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;

public class RoleControls extends Application{

	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<Menu> list = Menu.find("order by sort").fetch();
		render(list);
	}

	public static void list(String orderBy,String order) {
		Long id=params.get("id",Long.class);
		PagedList<RoleControl> pagedList = new PagedList<RoleControl>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		String where="1=1 ";
		if(id!=null)
			where=" menu.id = "+id;
		RoleControl.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),where);
		render(pagedList,orderBy,order,id);
	}
	
	public static void blank(Long id) {
		List<Menu> list = Menu.find("order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		Menu menu =Menu.find("id=?", id).first();
		RoleControl object = new RoleControl();
		object.menu = menu;
		render(trees, object);
	}
	
	public static void create() {
		RoleControl object = new RoleControl();
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<Menu> list = Menu.find("order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@blank",trees,object);
		}
		object.value=RoleControl.getNextValue(object.controller);
		object.save();
		result("添加权限控制成功","添加权限控制成功!","/RoleControls/blank",true);
	}
	
	public static void show(long id) {
		RoleControl object = RoleControl.findById(id);
		notFoundIfNull(object);
		List<Menu> list = Menu.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void detail(long id) {
		RoleControl object = RoleControl.findById(id);
		notFoundIfNull(object);
		List<Menu> list = Menu.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void save(Long id) {
		RoleControl object = RoleControl.findById(id);
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<Menu> list = Menu.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@show",trees,object);
		}
		object.save();
		result("保存权限成功","保存权限成功!","/departs/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				RoleControl depart= RoleControl.findById(_id);
				if(depart!=null) depart.delete();
			}
		}else if(id!=null){
			RoleControl depart= RoleControl.findById(id);
			if(depart==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			depart.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
}
