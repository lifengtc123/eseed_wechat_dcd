package models;

import java.util.List;

import javax.persistence.*;

import utils.ModelUtils;
import utils.PagedList;

@Entity
public class WordType extends TreeModel{

	public Integer sort;
	public Integer flag;
	public String notice;
	
	public static void findPage(PagedList<WordType> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(WordType.class.getName(), "['name']", search, searchField, condition,where);
		List<WordType> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), WordType.class.getName(), "['name']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}

	@Override
	public String toString() {
		return name;
	}
	
	public WordType parent() {
		return find("cid = ?",pid).first();
	}
}