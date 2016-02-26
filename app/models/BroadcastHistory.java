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
 * 群发记录表
 * @author 夏黎
 *
 */
public class BroadcastHistory extends BaseModel{
	public String openid;	//用户的openId
	@ManyToOne public ImgStock imgStock;//图片
	@ManyToOne public Customerinfo customerinfo;	//浏览人
	@ManyToOne public Newsinfo newsinfo;//图文
	public String content;//文本内容
	public Integer type;//群发的类型。0：文本 1：图片 2：图文

	public static void findPage(PagedList<BroadcastHistory> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(BroadcastHistory.class.getName(), "['openid','newsinfo','customerinfo','imgStock','content','type']", search, searchField, condition,where);
		List<BroadcastHistory> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), BroadcastHistory.class.getName(), "['openid','newsinfo','customerinfo','imgStock','content','type']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}