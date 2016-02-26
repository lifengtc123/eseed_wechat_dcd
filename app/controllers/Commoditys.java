package controllers;

import java.io.*;
import java.util.List;

import models.Commodity;
import play.data.validation.Valid;
import utils.PagedList;


public class Commoditys extends Application{


	public static void list(String orderBy,String order) {
		PagedList<Commodity> pagedList = new PagedList<Commodity>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Commodity.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}

	
	public static void blank() {
		Commodity commodity= new Commodity();
		render(commodity);
	}
	
	public static void create() {
		Commodity commodity= new Commodity();
		validation.valid(commodity.edit("commodity", params.all()));
		if(validation.hasErrors()){
			render("@blank",commodity);
		}
		commodity.save();
		result("保存商品信息成功","保存商品信息成功!","/commoditys/blank",true);
	}
	
	public static void show(Long id) {
		Commodity commodity= Commodity.findById(id);
		notFoundIfNull(commodity);
		render(commodity);
	}
	
	public static void detail(Long id) {
		Commodity commodity= Commodity.findById(id);
		notFoundIfNull(commodity);
		render(commodity);
	}
	
	public static void save(Long id) {
		Commodity commodity= Commodity.findById(id);
		notFoundIfNull(commodity);
		validation.valid(commodity.edit("commodity", params.all()));
		if(validation.hasErrors()){
			render("@show",commodity);
		}
		commodity.save();
		result("保存商品信息成功","保存商品信息成功!","/commoditys/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Commodity commodity = Commodity.findById(_id);
				if(commodity!=null) commodity.delete();
			}
		}else if(id!=null){
			Commodity commodity = Commodity.findById(id);
			if(commodity==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			commodity.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}

}