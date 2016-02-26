package models;

import java.util.*;
import java.math.*;

import javax.persistence.*;

import play.data.validation.*;
import play.db.jpa.Model;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import utils.ModelUtils;
import utils.PagedList;
import validation.*;

@Entity
public class WXConfig extends BaseModel{

	public String wXName;	//服务号名称
	public String token;	//token
	public String appid;	//appid
	public String secret;	//secret
	public String toUserName;	//类似openid 发信息用
	
	@Lob
	public String access_token;	//access_token

	
	public static void findPage(PagedList<WXConfig> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(WXConfig.class.getName(), "['WXName','token','appid','secret','access_token']", search, searchField, condition,where);
		List<WXConfig> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), WXConfig.class.getName(), "['WXName','token','appid','secret','access_token']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}