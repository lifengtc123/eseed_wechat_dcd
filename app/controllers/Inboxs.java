package controllers;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import models.Inbox;
import models.User;
import play.data.validation.Valid;
import utils.PagedList;

public class Inboxs extends Application{

	public static void list() {
		PagedList<Inbox> pagedList = new PagedList<Inbox>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		String where = "flag !=3 and user.id=" + connect().id;
		String orderBy = "flag,created";
		String order = "DESC";
		Inbox.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),where);
		if (!pagedList.getList().isEmpty()) {
			for(int i=0; i<pagedList.getList().size(); i++) {
				if (pagedList.getList().get(i).attachment != null && !pagedList.getList().get(i).attachment.trim().equals("")) {
					String[] paths = pagedList.getList().get(i).attachment.split(",");
					pagedList.getList().get(i).attachment = Integer.toString(paths.length);
				} else {
					pagedList.getList().get(i).attachment = "0";
				}
				if(pagedList.getList().get(i).content.length() > 15) { //如果内容的长度大于15就取前面14个。
					pagedList.getList().get(i).content = pagedList.getList().get(i).content.substring(0, 14);
				}
			}
		}
		render(pagedList,orderBy,order);
	}
	
	public static void detail(Long id) {
		Inbox object = Inbox.findById(id);
		notFoundIfNull(object);
		if (object.user.id != connect().id){
			result("警告！","你无权查看别人的消息!!!","/outboxs/blank",false);
		}
		object.reader_count += 1;
		object.last_time = new Date();
		object.flag=2;
		object.save();
		if (object.attachment != null && !object.attachment.trim().equals("")) {
			String[] paths = object.attachment.trim().split(",");
			for (String s:paths) {
			}
		}
	}
	
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Inbox inbox = Inbox.findById(_id);
				if(inbox!=null) inbox.delete();
			}
		}else if(id!=null){
			Inbox inbox = Inbox.findById(id);
			if(inbox==null){ flash.error("记录不存在，删除数据失败!"); list();}
			inbox.delete();
		}
		flash.success("删除数据成功!");
		list();
	}
	
	//获取消息的数量
	public static void getmessage() {
		List<Inbox> inboxs = Inbox.find("user.id=? and flag=1", connect().id).fetch();
		if (!inboxs.isEmpty()) {
			renderText(inboxs.size());
		} else {
			renderText("null");
		}
		
	}

}