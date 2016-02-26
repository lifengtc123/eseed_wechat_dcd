package models;

import java.util.List;

import javax.persistence.Entity;

import play.db.jpa.Model;
import utils.ModelUtils;
import utils.PagedList;

@Entity
public class Role extends BaseModel{

	public String name;
	public Integer sort;
	public String menu;
	public String value;
	public String ipad;
	
	public static void findPage(PagedList<Role> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count("Role", "['name']", search, searchField, condition,where);
		List<Role> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), "Role", "['name']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
	
	public String toString(){
		return name;
	}
}