package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.PrePersist;

import utils.ModelUtils;
import utils.PagedList;

@Entity
public class Menu extends TreeModel{
	
	public String url;
	public String icon;
	public String target;
	public Integer sort;
	public Integer flag; 
	
	public static void findPage(PagedList<Menu> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count("Menu", "['name','url']", search, searchField, condition, where);
		List<Menu> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), "Menu", "['name','url']", search, searchField, orderBy, order, condition, where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}

}
