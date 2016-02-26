package controllers;

import java.io.*;
import java.util.List;

import models.TokenRecord;
import play.data.validation.Valid;
import utils.PagedList;


public class TokenRecords extends Application{


	public static void list(String orderBy,String order) {
		PagedList<TokenRecord> pagedList = new PagedList<TokenRecord>();
		TokenRecord.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}

	
	public static void blank() {
		TokenRecord tokenRecord= new TokenRecord();
		render(tokenRecord);
	}
	
	public static void create() {
		TokenRecord tokenRecord= new TokenRecord();
		validation.valid(tokenRecord.edit("tokenRecord", params.all()));
		if(validation.hasErrors()){
			render("@blank",tokenRecord);
		}
		tokenRecord.save();
		result("保存token记录成功","保存token记录成功!","/tokenRecords/blank",true);
	}
	
	public static void show(Long id) {
		TokenRecord tokenRecord= TokenRecord.findById(id);
		notFoundIfNull(tokenRecord);
		render(tokenRecord);
	}
	
	public static void detail(Long id) {
		TokenRecord tokenRecord= TokenRecord.findById(id);
		notFoundIfNull(tokenRecord);
		render(tokenRecord);
	}
	
	public static void save(Long id) {
		TokenRecord tokenRecord= TokenRecord.findById(id);
		notFoundIfNull(tokenRecord);
		validation.valid(tokenRecord.edit("tokenRecord", params.all()));
		if(validation.hasErrors()){
			render("@show",tokenRecord);
		}
		tokenRecord.save();
		result("保存token记录成功","保存token记录成功!","/tokenRecords/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				TokenRecord tokenRecord = TokenRecord.findById(_id);
				if(tokenRecord!=null) tokenRecord.delete();
			}
		}else if(id!=null){
			TokenRecord tokenRecord = TokenRecord.findById(id);
			if(tokenRecord==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			tokenRecord.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}

}