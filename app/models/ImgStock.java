package models;

import java.util.*;

import javax.persistence.*;
import play.data.validation.*;

import play.db.jpa.Model;

import utils.ModelUtils;
import utils.PagedList;
import validation.*;

@Entity
/**
 * 图片库
 * @author Administrator
 *
 */
public class ImgStock extends BaseModel{
	public String name;	//名称
	public String path;	//地址
	@ManyToOne public Imggroups imggroups;	//图片分组
	public String uploador;	//上传人
	public Date uploaddate;	//上传时间
	@Transient public Integer count;	//临时统计未知的数量
	
	public String media_id;//微信服务器上对应的media_id
	
	public static void findPage(PagedList<ImgStock> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(ImgStock.class.getName(), "['name','path','imggroups','uploador','uploaddate']", search, searchField, condition,where);
		List<ImgStock> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), ImgStock.class.getName(), "['name','path','imggroups','uploador','uploaddate']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}