package controllers;

import java.io.*;
import java.util.List;

import models.AuthUser;
import play.data.validation.Valid;
import utils.PagedList;


public class AuthUsers extends Application{


	public static void list(String orderBy,String order) {
		PagedList<AuthUser> pagedList = new PagedList<AuthUser>();
		AuthUser.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}

	
	public static void blank() {
		AuthUser authUser= new AuthUser();
		render(authUser);
	}
	
	public static void create() {
		AuthUser authUser= new AuthUser();
		validation.valid(authUser.edit("authUser", params.all()));
		if(validation.hasErrors()){
			render("@blank",authUser);
		}
		authUser.save();
		result("保存授权用户成功","保存授权用户成功!","/authUsers/blank",true);
	}
	
	public static void show(Long id) {
		AuthUser authUser= AuthUser.findById(id);
		notFoundIfNull(authUser);
		render(authUser);
	}
	
	public static void detail(Long id) {
		AuthUser authUser= AuthUser.findById(id);
		notFoundIfNull(authUser);
		render(authUser);
	}
	
	public static void save(Long id) {
		AuthUser authUser= AuthUser.findById(id);
		notFoundIfNull(authUser);
		validation.valid(authUser.edit("authUser", params.all()));
		if(validation.hasErrors()){
			render("@show",authUser);
		}
		authUser.save();
		result("保存授权用户成功","保存授权用户成功!","/authUsers/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				AuthUser authUser = AuthUser.findById(_id);
				if(authUser!=null) authUser.delete();
			}
		}else if(id!=null){
			AuthUser authUser = AuthUser.findById(id);
			if(authUser==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			authUser.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}

}