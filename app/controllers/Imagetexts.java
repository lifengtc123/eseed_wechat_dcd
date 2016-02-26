package controllers;

import java.io.*;
import java.util.List;

import controllers.weixin.WXUtils;
import models.Imagetext;
import play.data.validation.Valid;
import utils.PagedList;

public class Imagetexts extends Application{


	public static void list(String orderBy,String order) {
		PagedList<Imagetext> pagedList = new PagedList<Imagetext>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Imagetext.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	public static void list1(String orderBy,String order) {
		PagedList<Imagetext> pagedList = new PagedList<Imagetext>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Imagetext.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),"classic=1");
		render(pagedList,orderBy,order);
	}

	
	public static void blank() {
		Imagetext imagetext= new Imagetext();
		render(imagetext);
	}
	
	public static void create() {
		Imagetext imagetext= new Imagetext();
		validation.valid(imagetext.edit("imagetext", params.all()));
		if(validation.hasErrors()){
			render("@blank",imagetext);
		}
		imagetext.save();
		result("保存客户信息成功","保存客户信息成功!","/imagetext/blank",true);
	}
	
	public static void show(Long id) {
		Imagetext imagetext= Imagetext.findById(id);
		notFoundIfNull(imagetext);
		render(imagetext);
	}
	
	public static void detail(Long id) {
		Imagetext imagetext= Imagetext.findById(id);
		notFoundIfNull(imagetext);
		render(imagetext);
	}
	public static void save(Long id) {
		Imagetext imagetext= Imagetext.findById(id);
		notFoundIfNull(imagetext);
		validation.valid(imagetext.edit("imagetext", params.all()));
		if(validation.hasErrors()){
			render("@show",imagetext);
		}
		imagetext.save();
		result("保存客户信息成功","保存客户信息成功!","/imagetexts/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		Integer clasic = 0;
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Imagetext imagetext = Imagetext.findById(_id);
				clasic = imagetext.classic;
				if(imagetext!=null) imagetext.delete();
			}
		}else if(id!=null){
			Imagetext imagetext = Imagetext.findById(id);
			clasic = imagetext.classic;
			if(imagetext==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			imagetext.delete();
		}
		flash.success("删除数据成功!");
		if(clasic==1){
			list1(null,null);
		}
		list(null,null);
	}
/*	*//**
	 * 获取所有nickname
	 *//*
	public static void getNikenameAll(){
		try {
		List<imagetext> imagetext=imagetext.find("nickname is null").fetch();
		for (imagetext imagetext2 : imagetext) {
			String nickname=controllers.phone.Application.getnickname(imagetext2.openid.trim());
			if(nickname!=null&&!"".equals(nickname.trim())){
				imagetext2.nikename=WXUtils.filterOffUtf8Mb4(nickname.trim());
				imagetext2.save();
			}
		}
		flash.success("获取成功!");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flash.error("获取失败!");
		}
		list(null,null);
	}*/
	
	/**
	 * 开启统计
	 * @param id 图文ID
	 */
	public static void open(Long id) {
		if(id!=null){
			Imagetext imagetext = Imagetext.findById(id);
			if(imagetext==null){ 
				flash.error("记录不存在操作失败!"); 
				list(null,null);
			}
			imagetext.status=0;
			imagetext.save();
		}
		flash.success("操作成功!");
		list(null,null);
	}
	
	/**
	 * 关闭统计
	 * @param id 图文ID
	 */
	public static void close(Long id) {
		if(id!=null){
			Imagetext imagetext = Imagetext.findById(id);
			if(imagetext==null){ 
				flash.error("记录不存在操作失败!"); 
				list(null,null);
			}
			imagetext.status=1;
			imagetext.save();
		}
		flash.success("操作成功!");
		list(null,null);
	}
}