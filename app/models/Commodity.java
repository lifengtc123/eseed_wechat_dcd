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
 * 商品信息
 * @author Administrator
 *
 */
public class Commodity extends BaseModel{

	public String namecommodity;	//商品名称
	public String commodityprices;	//商品价格
	public String freight;	//运费
	public String inventory;	//库存
	public String quantitysold;	//已售数量
	public String statusgoods;	//商品状态
	public String descriptionsp;	//描述
	public String picturesp;	//图片

	
	public static void findPage(PagedList<Commodity> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(Commodity.class.getName(), "['namecommodity','commodityprices','freight','inventory','quantitysold','statusgoods','descriptionsp','picturesp']", search, searchField, condition,where);
		List<Commodity> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), Commodity.class.getName(), "['namecommodity','commodityprices','freight','inventory','quantitysold','statusgoods','descriptionsp','picturesp']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}