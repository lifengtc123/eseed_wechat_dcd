package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import utils.ModelUtils;
import utils.PagedList;

@Entity
public class RoleControl extends BaseModel{

	public String name; // 模块名
	public String controller; // 控制器
	public String action; // 方法
	public Integer value; // 模块值
	public Integer sort;
	@ManyToOne
	public Menu menu;
	
	public static void findPage(PagedList<RoleControl> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count("RoleControl", "['name','controller','action']", search, searchField, condition,where);
		List<RoleControl> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), "RoleControl", "['name','controller','action']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}

	@Override
	public String toString() {
		return name;
	}
	
	public String getMenuStr(){
		return menu.name;
	}
	
	public static boolean checkPower(long userPurview, long optPurview){   
		Long purviewValue = (long)Math.pow(2, optPurview);   
	    return (userPurview & purviewValue) == purviewValue;  
	} 
	
	
	public static boolean hasVal(String rolevalue,String controller,Integer value){
		if(rolevalue!=null){
			int userPurview = 0;
			String[] roles = rolevalue.split("\\|");
			for(String _role : roles){
				if(_role.length()==1){
					break;
				}
				String[] purview =_role.split(":");
				if(purview[0].equals(controller)){
					userPurview = Integer.parseInt(purview[1]);
					break;
				}
			}
			if(checkPower(userPurview,value))
				return true;
		}
		return false;
	}
	
	public static Integer getNextValue(String controller){
		RoleControl con=find("controller = ? order by value desc",controller).first();
		if(con==null)
			return 1;
		return con.value+1;
	}
}