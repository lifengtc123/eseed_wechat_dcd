package models;

import java.util.*;
import java.math.*;
import javax.persistence.*;
import play.data.validation.*;

import play.db.jpa.Model;
import utils.ModelUtils;
import utils.PagedList;
import validation.*;

@Entity
public class SearchRecord extends BaseModel{

	public Integer buildType;	//用户类型
	public String companyName;	//单位名称
	public String userNo;	//用户帐号
	public String name;	//查询模块
	public Date stime;	//查询时间

	
	public static void findPage(PagedList<SearchRecord> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(SearchRecord.class.getName(), "['companyName','userNo','name']", search, searchField, condition,where);
		List<SearchRecord> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), SearchRecord.class.getName(), "['companyName','userNo','name']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}