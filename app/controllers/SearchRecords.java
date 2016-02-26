package controllers;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import models.Depart;
import models.SearchRecord;
import models.User;
import models.Word;
import play.data.validation.Valid;
import utils.ChangeDate;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;


public class SearchRecords extends Application{


	public static void list(String orderBy,String order) {
		PagedList<SearchRecord> pagedList = new PagedList<SearchRecord>();
		SearchRecord.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}

	
	public static void blank() {
		SearchRecord searchRecord= new SearchRecord();
		render(searchRecord);
	}
	
	public static void create() {
		SearchRecord searchRecord= new SearchRecord();
		validation.valid(searchRecord.edit("searchRecord", params.all()));
		if(validation.hasErrors()){
			render("@blank",searchRecord);
		}
		searchRecord.save();
		result("保存查询记录成功","保存查询记录成功!","/searchRecords/blank",true);
	}
	
	public static void show(Long id) {
		SearchRecord searchRecord= SearchRecord.findById(id);
		notFoundIfNull(searchRecord);
		render(searchRecord);
	}
	
	public static void detail(Long id) {
		SearchRecord searchRecord= SearchRecord.findById(id);
		notFoundIfNull(searchRecord);
		render(searchRecord);
	}
	
	public static void save(Long id) {
		SearchRecord searchRecord= SearchRecord.findById(id);
		notFoundIfNull(searchRecord);
		validation.valid(searchRecord.edit("searchRecord", params.all()));
		if(validation.hasErrors()){
			render("@show",searchRecord);
		}
		searchRecord.save();
		result("保存查询记录成功","保存查询记录成功!","/searchRecords/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				SearchRecord searchRecord = SearchRecord.findById(_id);
				if(searchRecord!=null) searchRecord.delete();
			}
		}else if(id!=null){
			SearchRecord searchRecord = SearchRecord.findById(id);
			if(searchRecord==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			searchRecord.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}

	//查询记录报表
			public static void searchReport(String btn,String sdate,String edate,Integer buildType,
					String companyName,Integer year,Integer month) {
				if(sdate == null) {
					sdate = "";
				}
				if(edate == null) {
					edate = "";
				}
				DateTime now = null;
				//判断点击的月份
				if (!"thisTime".equals(btn)) {
					if ("prev".equals(btn)) {//上一月
						now = ChangeDate.getPrevMonth(year, month);
					} else if ("next".equals(btn)) {//下一月
						now = ChangeDate.getNextMonth(year, month);
					} else {
						now = ChangeDate.getThisMonth();//当月
					}
					year = now.getYear();
					month = now.getMonthOfYear();
				}
				if(!"".equals(sdate)){
					year = Integer.parseInt(sdate.split("-")[0]);//年月后加一个字符串"-"
					month = Integer.parseInt(sdate.split("-")[1]);
				}
				String m="";
				if(month.toString().length() == 1){
					m = "0"+month;
				}else{
					m=month.toString();
				}
				
				List<SearchRecord> pagedList = new ArrayList<SearchRecord>();
						String where = " 1=1 ";
						if(sdate!=null&&!"".equals(sdate)){
							where+=" and stime >='"+sdate+" 00:00:00' ";
						}
						if(edate!=null&&!"".equals(edate)){
							where+=" and stime <= '"+edate+" 23:59:59' ";
						}
						if(buildType!=null&&!"".equals(buildType)){
							where+=" and buildType="+buildType+" ";
						}
						if(companyName!=null&&!"".equals(companyName)){
							where+=" and companyName='"+companyName+"' ";
						}
						if((sdate==null || ("").equals(sdate)) && (edate==null || ("").equals(edate))){
							where+=" and stime like '"+year+"-"+m+"%'";
						}
					pagedList=SearchRecord.find(where).fetch();
				render(pagedList,year,m,sdate,edate,buildType,companyName);
			}
}