package controllers;

import java.util.List;

import models.ScreenSet;

public class ScreenSets extends Application{

	/**
	 * @author shixy
	 */
	public static void list() {
		List<ScreenSet> list = ScreenSet.find("1=1 order by widthSize desc,heightSize desc").fetch();
		render(list);
	}
	
	public static void blank() {
		ScreenSet screenSet= new ScreenSet();
		render(screenSet);
	}
	
	public static void create() {
		ScreenSet screenSet= new ScreenSet();
		screenSet.edit(params.getRootParamNode(), "screenSet");
		screenSet.save();
		result("保存显示设置成功","保存显示设置成功!","/ScreenSets/blank",true);
	}
	
	public static void show(Long id) {
		ScreenSet screenSet= ScreenSet.findById(id);
		render(screenSet);
	}
	
	public static void detail(Long id) {
		ScreenSet screenSet= ScreenSet.findById(id);
		render(screenSet);
	}
	
	public static void save(Long id) {
		ScreenSet screenSet= ScreenSet.findById(id);
		screenSet.edit(params.getRootParamNode(), "screenSet");
		screenSet.save();
		result("保存显示设置成功","保存显示设置成功!","/ScreenSets/show",false);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				ScreenSet screenSet = ScreenSet.findById(_id);
				if(screenSet!=null) screenSet.delete();
			}
		}else if(id!=null){
			ScreenSet screenSet = ScreenSet.findById(id);
			if(screenSet==null){ flash.error("记录不存在，删除数据失败!"); list();}
			screenSet.delete();
		}
		flash.success("删除数据成功!");
		list();
	}
	
}