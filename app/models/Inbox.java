package models;

import java.util.*;
import java.math.*;
import javax.persistence.*;
import play.data.validation.*;

import play.db.jpa.Model;
import utils.ModelUtils;
import utils.PagedList;
import validation.*;
/**
 * 弹窗消息
 * @author Administrator
 *
 */
@Entity
public class Inbox extends BaseModel{

	@ManyToOne public User user; //收件人
	public String title;	//标题
	public String content;	//内容
	public String sender;	//发送人
	public String attachment;	//附件
	public Long sender_id;	//发送人ID
	public Integer reader_count=0;	//阅读次数
	public Date last_time;	//最后阅读时间
	public Integer flag; //状态 1:未读 2:已读

	
	public static void findPage(PagedList<Inbox> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(Inbox.class.getName(), "['title','content','sender','attachment','sender_id','reader_count']", search, searchField, condition,where);
		List<Inbox> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), Inbox.class.getName(), "['title','content','sender','attachment','sender_id','reader_count']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}