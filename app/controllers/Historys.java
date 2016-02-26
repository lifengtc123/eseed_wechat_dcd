package controllers;


import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.History;
import models.User;

import org.joda.time.DateTime;

import play.db.DB;
import utils.DateUtils;
import utils.PagedList;

public class Historys extends Application{
	
	public static void index(){
		render();
	}
	
	public static void list(String datetime,Long uid) {
		if(datetime == null || datetime.equals("")) datetime = DateUtils.format(new Date(), "yyyy-MM-dd");
		DateTime now = new DateTime(DateUtils.format(datetime, "yyyy-MM-dd"));
		now = now.withTime(0, 0, 0, 0);
		long start = now.toDate().getTime();
		now = now.withTime(23,59,59,999);
		long end = now.toDate().getTime();
		PagedList<History> pagedList = new PagedList<History>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		User user = User.findById(uid);
		List<History> list =  History.find(" datetime > ? and datetime < ? and username = ?", start,end,user.truename).fetch();
		pagedList.setList(list);
		render(pagedList);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				History history= History.findById(_id);
				if(history!=null) history.delete();
			}
		}else if(id!=null){
			History history= History.findById(id);
			if(history==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			history.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	
	public static void getItems(String datetime){
		//System.out.println("date:"+datetime);
		if(datetime == null || datetime.equals("")) datetime = DateUtils.format(new Date(), "yyyy-MM-dd");
		List<Map<String,Object>> rows = History.report(datetime);
		renderJSON(rows);
	}
	
	public static void user(String datetime){
		if(datetime == null || datetime.equals("")) datetime = DateUtils.format(new Date(), "yyyy-MM-dd");
		List<Map<String,Object>> rows = History.report(datetime);
		render(rows);
	}
}

