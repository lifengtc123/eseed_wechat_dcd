package models;

import java.util.List;

import javax.persistence.*;

import com.google.gson.annotations.Until;

import play.data.validation.*;
import utils.ModelUtils;
import utils.PagedList;

@Entity
/**
 * 图片库分组
 * @author Administrator
 *
 */
public class Imggroups extends TreeModel{

	public Integer sort;
	public Integer flag;
	public String notice;
	@Until(1.1) @OneToMany(mappedBy="imggroups",cascade=CascadeType.ALL) public List<ImgStock> imgStocks;	//图文信息
	@Transient public Integer counts;  //临时变量总计数
	public Imggroups(String name) {
		this.name=name;
	}
	
	public Imggroups(){
		
	}

	public static void findPage(PagedList<Imggroups> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(Imggroups.class.getName(), "['name','sort','flag','notice']", search, searchField, condition,where);
		List<Imggroups> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), Imggroups.class.getName(), "['name','sort','flag','notice']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}

	@Override
	public String toString() {
		return name;
	}
}