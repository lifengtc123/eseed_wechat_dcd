package controllers;

import java.io.*;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import controllers.weixin.WXUtils;
import models.Customerinfo;
import play.data.validation.Valid;
import utils.PagedList;

public class Customerinfos extends Application{

	//未绑定客户
	public static void list(String orderBy,String order) {
		PagedList<Customerinfo> pagedList = new PagedList<Customerinfo>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Customerinfo.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition")," buildType=2");
		render(pagedList,orderBy,order);
	}
	//已绑定客户
	public static void list2(String orderBy,String order) {
		PagedList<Customerinfo> pagedList = new PagedList<Customerinfo>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Customerinfo.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition")," buildType=0 or buildType=1");
		render(pagedList,orderBy,order);
	}

	
	public static void blank() {
		Customerinfo customerinfo= new Customerinfo();
		render(customerinfo);
	}
	
	public static void create() {
		Customerinfo customerinfo= new Customerinfo();
		validation.valid(customerinfo.edit("customerinfo", params.all()));
		if(validation.hasErrors()){
			render("@blank",customerinfo);
		}
		customerinfo.save();
		result("保存客户信息成功","保存客户信息成功!","/customerinfos/blank",true);
	}
	
	public static void show(Long id) {
		Customerinfo customerinfo= Customerinfo.findById(id);
		notFoundIfNull(customerinfo);
		render(customerinfo);
	}
	
	public static void detail(Long id) {
		Customerinfo customerinfo= Customerinfo.findById(id);
		notFoundIfNull(customerinfo);
		render(customerinfo);
	}
	public static void save(Long id) {
		Customerinfo customerinfo= Customerinfo.findById(id);
		notFoundIfNull(customerinfo);
		validation.valid(customerinfo.edit("customerinfo", params.all()));
		if(validation.hasErrors()){
			render("@show",customerinfo);
		}
		customerinfo.save();
		result("保存客户信息成功","保存客户信息成功!","/customerinfos/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Customerinfo customerinfo = Customerinfo.findById(_id);
				if(customerinfo!=null) customerinfo.delete();
			}
		}else if(id!=null){
			Customerinfo customerinfo = Customerinfo.findById(id);
			if(customerinfo==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			customerinfo.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	public static void delete2(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Customerinfo customerinfo = Customerinfo.findById(_id);
				if(customerinfo!=null) customerinfo.delete();
			}
		}else if(id!=null){
			Customerinfo customerinfo = Customerinfo.findById(id);
			if(customerinfo==null){ flash.error("记录不存在，删除数据失败!"); list2(null,null);}
			customerinfo.delete();
		}
		flash.success("删除数据成功!");
		list2(null,null);
	}
	/**
	 * 获取所有nickname
	 */
	public static void getNikenameAll(){
		try {
		List<Customerinfo> customerinfo=Customerinfo.find("nickname is null").fetch();
		for (Customerinfo customerinfo2 : customerinfo) {
			String nickname=controllers.phone.Application.getnickname(customerinfo2.openid.trim());
			if(nickname!=null&&!"".equals(nickname.trim())){
				customerinfo2.nikename=WXUtils.filterOffUtf8Mb4(nickname.trim());
				if(customerinfo2.nikename!=null){
					if(customerinfo2.subscribedate==null){
						customerinfo2.subscribedate=new Date();
					}
					customerinfo2.subscribeState=1;  //拿到nikename  说明已经关注了
				}
				customerinfo2.save();
			}
		}
		flash.success("获取成功!");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flash.error("获取失败!");
		}
		list(null,null);
	}
	
	/**
	 * 获取所有nickname
	 */
	public static void getNikenameAll2(){
		try {
		List<Customerinfo> customerinfo=Customerinfo.find("nickname is null").fetch();
		for (Customerinfo customerinfo2 : customerinfo) {
			String nickname=controllers.phone.Application.getnickname(customerinfo2.openid.trim());
			if(nickname!=null&&!"".equals(nickname.trim())){
				customerinfo2.nikename=WXUtils.filterOffUtf8Mb4(nickname.trim());
				if(customerinfo2.nikename!=null){
					if(customerinfo2.subscribedate==null){
						customerinfo2.subscribedate=new Date();
					}
					customerinfo2.subscribeState=1;  //拿到nikename  说明已经关注了
				}
				customerinfo2.save();
			}
		}
		flash.success("获取成功!");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flash.error("获取失败!");
		}
		list2(null,null);
	}
	
	
	/**
	 * 根据输入来的用户名来获取openId
	 * @param wxAccount
	 */
	public static void checkCustomer(String wxAccount){
		Customerinfo customerinfo = Customerinfo.find("nikename=?", wxAccount).first();
		Gson gson = new GsonBuilder().setVersion(1.1).create();
		if(customerinfo!=null){
			String json = gson.toJson(customerinfo.openid);
			renderJSON(json);
		}else{
			String json = gson.toJson("-1");
			renderJSON(json);
		}
		
	}
}