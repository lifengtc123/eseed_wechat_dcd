package models;

import java.util.*;
import java.math.*;
import javax.persistence.*;
import play.data.validation.*;

import play.db.jpa.Model;
import utils.ModelUtils;
import utils.PagedList;
import validation.*;

//屏幕设置
@Entity
public class ScreenSet extends BaseModel{

	public Double widthSize=0d;		//宽
	public Double heightSize=0d;		//高
	public Double tableHeight=0d;		//列表高度
	public Integer pageSize=15;		//每页显示条数
	public Integer menuNum=15;		//默认菜单数
	@ManyToOne
	public User user;//用户自定义
	
}