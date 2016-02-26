package controllers;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import models.ImgStock;
import models.Imggroups;
import play.data.validation.Valid;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;

public class Imggroupss extends Application{

	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
		render(list);
	}
	
	public static void list_pid(String orderBy,String order,String pid){
		PagedList<Imggroups> pagedList = new PagedList<Imggroups>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Imggroups.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),"pid='"+pid+"'");
		render("@list",pagedList,orderBy,order);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<Imggroups> pagedList = new PagedList<Imggroups>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Imggroups.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		Imggroups object = new Imggroups();
		render(trees,object);
	}
	
	public static void create() {
		Imggroups object = new Imggroups();
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@blank",trees,object);
		}
		object.save();
		result("保存图片分组成功","保存图片分组单成功!","/imggroupss/blank",true);
	}
	
	public static void show(long id) {
		Imggroups object = Imggroups.findById(id);
		notFoundIfNull(object);
		List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void detail(long id) {
		Imggroups object = Imggroups.findById(id);
		notFoundIfNull(object);
		List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
		List<SelectTree> trees = SelectTreeUtils.setTree(list);
		render(object,trees);
	}
	
	public static void save(Long id) {
		Imggroups object = Imggroups.findById(id);
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			List<Imggroups> list = Imggroups.find("1=1 order by sort").fetch();
			List<SelectTree> trees = SelectTreeUtils.setTree(list);
			render("@show",trees,object);
		}
		object.save();
		result("保存菜单成功","保存菜单成功!","/imggroupss/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Imggroups imggroups= Imggroups.findById(_id);
				if(imggroups!=null) imggroups.delete();
			}
		}else if(id!=null){
			Imggroups imggroups= Imggroups.findById(id);
			if(imggroups==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			imggroups.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	
}