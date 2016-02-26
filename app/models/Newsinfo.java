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
/**
 * 新闻资讯
 * @author Administrator
 *
 */
public class Newsinfo extends BaseModel{

	public String name;	//名称
	public Integer state=0;	//状态
	public Integer type;//类型   0单 1多
	@OneToMany(mappedBy="newsinfo",cascade=CascadeType.ALL) public List<Imagetext> imagetext;	//图文信息
	
	public String media_id;//
	
	public Integer classic=0;//分类 0 系统的  1：欢迎内容
	
	public static void findPage(PagedList<Newsinfo> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(Newsinfo.class.getName(), "['name','imagetext.title','imagetext.author','imagetext.summary']", search, searchField, "like",where);
		List<Newsinfo> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), Newsinfo.class.getName(), "['name','imagetext.title','imagetext.author','imagetext.summary']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}