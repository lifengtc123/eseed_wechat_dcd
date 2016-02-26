package models;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Entity;

import com.mysql.jdbc.IterateBlock;

import play.db.DB;
import play.mvc.Http.Request;
import utils.DateUtils;

//行为管理
@Entity
public class History extends BaseModel{

	public String controller;
	public String action;
	public String href;
	public Long datetime;
	public String address;
	public String username;
	public String head;
	public String postText;
	public String source;
	public Boolean error = false;
	public String message;
	public String date;
	public Integer hour;
	public Boolean isPost;
	
	public History(String user,boolean error,String message){
		Request request = Request.current();
		this.controller = request.controller;
		this.action = request.actionMethod;
		this.href = request.url;
		this.address = request.remoteAddress;
		this.datetime = new Date().getTime();
		this.username = user;
		this.error = error;
		this.message = message;
		this.date = DateUtils.format(new Date(), "yyyy-MM-dd");
		this.hour = Integer.parseInt(DateUtils.format(new Date(), "HH"));
	}
	
	public History(String user,String postText) {
		Request request = Request.current();
		this.controller = request.controller;
		this.action = request.actionMethod;
		this.href = request.url;
		this.address = request.remoteAddress;
		if(postText!=null&&postText.length()>5000){
			//不保存
		}else{
			//保存
			this.postText = postText;
		}
		this.datetime = new Date().getTime();
		this.username = user;
		/*Map<String,Http.Header> headers = request.headers;
		Set<String> keys = headers.keySet();
		Iterator<String> it= keys.iterator();
		while(it.hasNext()){
			String key = it.next();
			System.out.println("key:"+key);
			System.out.println("value:"+headers.get(key).value());
		}*/
		if(request.headers.get("user-agent")!=null)
		this.head = request.headers.get("user-agent").value();
		RoleControl roleControl = RoleControl.find("controller = ? and action = ?", this.controller,this.action).first();
		if(roleControl != null){
			this.controller = roleControl.menu.name;
			this.action = roleControl.name;
			
		}else{
			roleControl = RoleControl.find("controller = ?", this.controller).first();
			if(roleControl != null){
				this.controller = roleControl.menu.name;
			}
		}
		this.isPost = request.method.equals("POST");
		this.date = DateUtils.format(new Date(), "yyyy-MM-dd");
		this.hour = Integer.parseInt(DateUtils.format(new Date(), "HH"));
		//System.out.println("head:"+head);
	}
	
	public static List<Map<String,Object>> report(String datetime){
		String date = DateUtils.format2String(datetime, "yyyy-MM-dd");
		long start = DateUtils.getStartTime(datetime);
		long end = DateUtils.getEndTime(datetime);;
		List<User> users = User.findAll();
		//初始化数据
		Map<String,Map<String,Object>> rows = new HashMap<String,Map<String,Object>>();
		for(User user : users){
			Map<String,Object> row = new HashMap<String,Object>();
			row.put("id", user.id);
			row.put("truename", user.truename);
			row.put("links", 0);
			row.put("posts", 0);
			row.put("errors", 0);
			row.put("max", 0);
			for(int i=0;i<24;i++){
				String val = "hour_";
				if(i<10) val = val + "0"+i;
				else val = val + i;
				row.put(val, 0);
			}
			rows.put(user.truename, row);
		}
		
		try{
			//点击数
			String sql = "select username,count(id) from history where datetime > "+start+" and datetime < "+end+" group by username";
			ResultSet rs = DB.executeQuery(sql);
			while(rs.next()){
				String username = rs.getString(1);
				Integer links = rs.getInt(2);
				Map<String,Object> row = rows.get(username);
				row.put("links", links);
				rows.put(username, row);
			}
			//提交数
			sql = "select username,count(id) from history where datetime > "+start+" and datetime < "+end+" and isPost = 1 group by username";
			rs = DB.executeQuery(sql);
			while(rs.next()){
				String username = rs.getString(1);
				Integer posts = rs.getInt(2);
				Map<String,Object> row = rows.get(username);
				row.put("posts", posts);
			}
			//错误数
			sql = "select username,count(id) from history where datetime > "+start+" and datetime < "+end+" and error = 1 group by username";
			rs = DB.executeQuery(sql);
			while(rs.next()){
				String username = rs.getString(1);
				Integer errors = rs.getInt(2);
				Map<String,Object> row = rows.get(username);
				row.put("errors", errors);
			}
			for(User user : users){
				sql = "select hour,count(id) from history where date = '"+date+"' and username = '"+user.truename+"' group by hour";
				rs = DB.executeQuery(sql);
				Map<String,Object> row = rows.get(user.truename);

				while(rs.next()){
					int hour = rs.getInt(1);
					Integer total = rs.getInt(2);
					row.put("hour_"+hour, total);
					int max = Integer.parseInt(row.get("max").toString());
					if(max < total) row.put("max", total);
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		List<Map<String,Object>> result = new ArrayList<Map<String,Object>>();
		Iterator<String> it = rows.keySet().iterator();
		while(it.hasNext()){
			String key = it.next();
			Map<String,Object> row = rows.get(key);
			result.add(row);
		}
		
		return result;
	}
	
}