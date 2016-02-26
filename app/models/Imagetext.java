package models;

import java.util.*;
import java.math.*;

import javax.persistence.*;
import com.google.gson.annotations.Until;
import play.data.validation.*;
import play.db.jpa.Model;
import utils.ModelUtils;
import utils.PagedList;
import validation.*;

@Entity
/**
 * 新闻资讯-图文模块
 * @author Administrator
 *
 */
public class Imagetext extends BaseModel{

	public String title;	//标题
	public String author;	//作者
	//public String coverimg;	//封面
	@ManyToOne public ImgStock imgStock;	//封面
	public Integer isshow;	//显示    0显示  1不显示
	@Lob public String content;	//正文
	@Lob public String summary;	//摘要
	public Integer type;	//类别
	@Until(1.1)@ManyToOne public Newsinfo newsinfo;	//新闻资讯
	public Integer browseNumber=0;//总浏览数
	public Integer shareNumber=0;//总分享数
	public Integer isexternal=1;	//是否使用外部链接    0是 1否
	public String externalurl;	//外部地址
	@Transient public Long imgStock_id;	//封面
	@Transient public String path;	//封面
	
	public Integer status=0;//统计的状态。0：统计  1：不统计
	public Integer classic=0;//分类 0 系统的  1：欢迎内容
	
	
	public static void findPage(PagedList<Imagetext> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(Imagetext.class.getName(), "['title','author','summary']", search, searchField, condition,where);
		List<Imagetext> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), Imagetext.class.getName(), "['title','author','summary']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}