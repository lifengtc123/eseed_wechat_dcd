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
public class AuthUser extends BaseModel{

	public String number;	//客户编号
	public String authorizer_appid;	//appid
	public String authorizer_access_token;	//授权方令牌
	public String authorizer_refresh_token;	//刷新令牌
	public String func_info;	//授权权限集

	
	public static void findPage(PagedList<AuthUser> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(AuthUser.class.getName(), "['number','authorizer_appid','authorizer_access_token','authorizer_refresh_token','func_info']", search, searchField, condition,where);
		List<AuthUser> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), AuthUser.class.getName(), "['number','authorizer_appid','authorizer_access_token','authorizer_refresh_token','func_info']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}