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
public class TokenRecord extends Model{

	public Date dates;	//更新时间
	public String beforetoken;	//更新前token
	public String token;	//实时token
	public String xmlstring;	//返回xml
	public String actionString;	//调用方法

	
	public static void findPage(PagedList<TokenRecord> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(TokenRecord.class.getName(), "['date','beforetoken','token','xmlstring','actionString']", search, searchField, condition,where);
		List<TokenRecord> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), TokenRecord.class.getName(), "['date','beforetoken','token','xmlstring','actionString']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}