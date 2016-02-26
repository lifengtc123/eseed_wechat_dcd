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
 * 客户表
 * @author Administrator
 *
 */
public class Customerinfo extends BaseModel{

	public String number;	//客户编号
	public String name;	//真实姓名
	public String nikename;	//微信昵称
	public String telephone;	//手机号码
	public Integer type=0;	//用户类型  0普通客户  1分享客户
	@ManyToOne public Customerinfo customerinfo;	//上级客户
	public Double bonusMoney;	//红利金额
	public Integer integral;	//浏览积分
	public String province;	//省
	public String city;	//市
	public String area;	//区
	public String address;	//详细地址
	public Double higherMoney;	//上级红利
	public String openid;	//openid
	public Date subscribedate;	//关注时间
	public Integer subscribeState=1;	//0未关注 1已关注 2已取消
	public Date unsubscribedate;	//取消关注时间
	
	public Integer buildType=2;//用户单位类型	0是企业帐号，1是监管帐号,2是未绑定
	public String companyName;//单位名称
	public String userNo;//单位用户登录帐号

	
	public static void findPage(PagedList<Customerinfo> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(Customerinfo.class.getName(), "['number','telephone','customerinfo.name','customerinfo.nikename','customerinfo.number','province','city','area','address','openid']", search, searchField, condition,where);
		List<Customerinfo> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), Customerinfo.class.getName(), "['number','telephone','customerinfo.name','customerinfo.nikename','customerinfo.number','province','city','area','address','openid']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}


	public String getstr() {
		String str="";
		if(name!=null&&!"".equals(name.trim())){
			str= name;
		}else if(nikename!=null&&!"".equals(nikename.trim())){
			str= nikename;
		}else{
			str= number;
		}
		return str;
	}
	
}