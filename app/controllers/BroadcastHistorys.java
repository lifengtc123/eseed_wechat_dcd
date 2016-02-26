package controllers;

import java.io.*;
import java.util.List;

import models.BroadcastHistory;
import play.data.validation.Valid;
import utils.PagedList;

public class BroadcastHistorys extends Application{


	public static void list(String orderBy,String order) {
		PagedList<BroadcastHistory> pagedList = new PagedList<BroadcastHistory>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		BroadcastHistory.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				BroadcastHistory broadcastHistory = BroadcastHistory.findById(_id);
				if(broadcastHistory!=null) broadcastHistory.delete();
			}
		}else if(id!=null){
			BroadcastHistory broadcastHistory = BroadcastHistory.findById(id);
			if(broadcastHistory==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			broadcastHistory.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
}