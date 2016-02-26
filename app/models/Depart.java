package models;

import java.util.List;

import javax.persistence.*;

import utils.ModelUtils;
import utils.PagedList;

@Entity
public class Depart extends TreeModel{

	public Integer sort;
	public Integer flag;
	public String notice;
	
	public static void findPage(PagedList<Depart> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count("Depart", "['name','sort','flag','notice']", search, searchField, condition,where);
		List<Depart> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), "Depart", "['name','sort','flag','notice']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}

	@Override
	public String toString() {
		return name;
	}
}