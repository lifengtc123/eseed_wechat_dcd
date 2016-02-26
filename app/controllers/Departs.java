package controllers;

import java.util.List;

import models.Depart;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;

public class Departs extends Application{

	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<Depart> list = Depart.find("1=1 order by sort asc").fetch();
		render(list);
	}
	
	public static void list_pid(String orderBy,String order,String pid){
		PagedList<Depart> pagedList = new PagedList<Depart>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Depart.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),"pid='"+pid+"'");
		render("@list",pagedList,orderBy,order);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<Depart> pagedList = new PagedList<Depart>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Depart.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		List<Depart> list = Depart.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		Depart object = new Depart();
		render(trees,object);
	}
	
	public static void create() {
		Depart object = new Depart();
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<Depart> list = Depart.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@blank",trees,object);
		}
		object.save();
		result("保存部门成功","保存部门单成功!","/departs/blank",true);
	}

	public static void show(long id) {
		Depart object = Depart.findById(id);
		notFoundIfNull(object);
		List<Depart> list = Depart.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void detail(long id) {
		Depart object = Depart.findById(id);
		notFoundIfNull(object);
		List<Depart> list = Depart.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void save(Long id) {
		Depart object = Depart.findById(id);
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<Depart> list = Depart.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@show",trees,object);
		}
		object.save();
		result("保存菜单成功","保存菜单成功!","/departs/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Depart depart= Depart.findById(_id);
				if(depart!=null) depart.delete();
			}
		}else if(id!=null){
			Depart depart= Depart.findById(id);
			if(depart==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			depart.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
}
