package models;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import utils.ModelUtils;
import utils.PagedList;
@Entity
/**
 * 附件表
 * @author Administrator
 *
 */
public class AddingAttachment extends BaseModel{
	
	public String name; //附件名称
	public String path; //附件路径
	public Date upload;	//上传时间
	public Long fid; //Id
	public Integer type; //附件类型    1图片附件 2excel导入附件
	public Integer state=0;//异常状态   0正常   1异常没找到  2异常已有报告  3已确认  4订单找到但是模板没找到（Excel上传独有）5订单、模板都没找到（Excel上传独有）
	public String remark;//备注
	public String uploaduser;	//上传人
	@Transient public String templateInfo_num; //处理结果模板
	public AddingAttachment() {
		
	}
	
	public AddingAttachment(String name,String path,Long fid) {
		this.name = name;		
		this.path = path;
		this.fid = fid;
		this.upload = new Date();
	}
	
	public static List<AddingAttachment> findAttachments(Long fid){
		return find("fid = ?",fid).fetch();
	}
	
	public static void findPage(PagedList<AddingAttachment> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(AddingAttachment.class.getName(), "['orderinfo.number','orderinfo.barcode']", search, searchField, condition,where);
		List<AddingAttachment> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), AddingAttachment.class.getName(), "['orderinfo.number','orderinfo.barcode']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}
}

