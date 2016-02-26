package controllers;


import java.util.List;

import models.Depart;
import models.Role;
import models.ScreenSet;
import models.User;
import models.Word;
import utils.MD5;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;

public class Users extends Application{

	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<Depart> list = Depart.find("1=1 order by sort asc").fetch();
		render(list);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<User> pagedList = new PagedList<User>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		if (order == null){
			order = "DESC";
		}
		if (orderBy == null){
			orderBy = "created";
		}
		if(params.get("pid")==null){
			User.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		}else{
			String where = "depart.id = " + params.get("pid");
			User.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),where);
		}
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		User user = new User();
		List<Role> role = Role.findAll();
		List<Depart> departs = Depart.find("flag=1 order by id").fetch();
		List<Word> posts = Word.find("wordType.name='职位'").fetch();
		render(user,role,departs,posts);
	}
	
	public static void create() {
		User user = new User();
		user.edit(params.getRootParamNode(), "user");
		user.password=MD5.hash(user.password);
		user.login=0;
		user.save();
		result("保存用户成功","保存用户成功!","/users/blank",true);
	
	}
	
	public static void show(long id) {
		User user = User.findById(id);
		List<Role> role = Role.findAll();
		List<Word> posts = Word.find("wordType.name='职位'").fetch();
		render(user,role,posts);
	}
	
	/**
	 * @author shixy
	 * 个人修改
	 */
	public static void show1(long id,Double screen_height,Double screen_width) {
		User user = User.findById(id);
		 //先找自己的配置
        ScreenSet screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id=?",screen_width,screen_height,id).first();
        //系统的
        if(screenSet==null) screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id is null",screen_width,screen_height).first();
        if(screenSet==null){
        	screenSet = new ScreenSet();
        	screenSet.widthSize = screen_width;
        	screenSet.heightSize = screen_height;
        	screenSet.tableHeight = 400d;
        	screenSet.pageSize = 15;
        }
		render(user,screenSet);
	}
	
	public static void userInformSet(long id,Double screen_height,Double screen_width) {
		User object = User.findById(id);
		notFoundIfNull(object);
		List<Word> word = Word.find("wordType.id = 1 order by id asc").fetch();
		List<Word> word2 = Word.find("wordType.id = 10 order by id asc").fetch();
		 //先找自己的配置
        ScreenSet screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id=?",screen_width,screen_height,id).first();
        //系统的
        if(screenSet==null) screenSet = ScreenSet.find("widthSize=? and heightSize=? and user.id is null",screen_width,screen_height,id).first();
        else{
        	screenSet = new ScreenSet();
        	screenSet.widthSize = screen_width;
        	screenSet.heightSize = screen_height;
        	screenSet.tableHeight = 400d;
        	screenSet.pageSize = 15;
        }
		render(object,word,word2,screenSet);
	}
	
	public static void detail(long id) {
		User user = User.findById(id);
		render(user);
	}
	
	public static void save(Long id) {
		User user = User.findById(id);
		user.edit(params.getRootParamNode(), "user");
		if(params.get("user.password2")!=null&&!params.get("user.password2").trim().equals("")&&!user.password.equals(MD5.hash(params.get("user.password2")))){
			user.password=MD5.hash(params.get("object.password2"));
		}
		user.save();
		result("保存用户成功","保存用户成功!","/users/show",false);
	}
	
	public static void save1(Long id) {
		User user = User.findById(id);
		user.edit(params.getRootParamNode(), "user");
		if(params.get("user.password2")!=null&&!params.get("user.password2").trim().equals("")&&!user.password.equals(MD5.hash(params.get("user.password2")))){
			user.password=MD5.hash(params.get("user.password2"));
		}
		user.save();
		String screenSetID = params.get("screenSet.id");
		ScreenSet screenSet = null;
		if(screenSetID!=null&&!"".equals(screenSetID)) screenSet = ScreenSet.findById(Long.parseLong(screenSetID));
		else screenSet = new ScreenSet();
		screenSet.heightSize = Double.parseDouble(params.get("heightSize"));
		screenSet.widthSize = Double.parseDouble(params.get("widthSize"));
		screenSet.tableHeight = Double.parseDouble(params.get("tableHeight"));
		screenSet.pageSize = Integer.parseInt(params.get("pageSize"));
		screenSet.menuNum = Integer.parseInt(params.get("menuNum"));
		screenSet.user = user;
		screenSet.save();
		session.put("pageSize", screenSet.pageSize);
    	session.put("tableHeight", screenSet.tableHeight);
    	session.put("menuNum", screenSet.menuNum);
		result("保存用户成功","保存用户成功!","/users/show",false);
	}
	
	public static void userInformSetSave(Long id) {
		User object = User.findById(id);
		validation.valid(object.edit("object", params.all()));
		if(params.get("object.password2")!=null&&!params.get("object.password2").trim().equals("")&&!object.password.equals(MD5.hash(params.get("object.password2")))){
			object.password=MD5.hash(params.get("object.password2"));
		}
		if(validation.hasErrors()){
			render("@show",object);
		}
		
		object.save();
		result2("保存用户成功","保存用户成功!","/users/userInformSet?id="+id,false);
		
	}
	
	public static void delete(Long id,Long[] arrayid) {
		try {
			if(arrayid!=null && arrayid.length > 0){
				for(long _id : arrayid){
					User user= User.findById(_id);
					if(user!=null) user.delete();
				}
			}else if(id!=null){
				User user= User.findById(id);
				if(user==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
				user.delete();
			}
			flash.success("删除数据成功!");
			list(null,null);
		} catch (Exception e) {
			flash.error("删除数据失败，已被其他数据关联!");
			list(null,null);
		}
	}
	
	public static void select() {
		List<Depart> list = Depart.find("flag = 1 order by sort").fetch();
		List<SelectTree> departs = SelectTreeUtils.setTree(list);
		render(departs);
	}
	
	//填出选择用户界面
	public static void select1(){
		List<Depart> list = Depart.find("flag = 1 and sort!=4 order by sort").fetch();
		List<SelectTree> departs = SelectTreeUtils.setTree(list);
		render("@select",departs);
	}
	
	public static void user_edit(){
		User user = User.findById(Long.parseLong(session.get("userid")));
		render(user);
	}
	
	public static void user_save(Long id, String password){
		User user = User.findById(id);
		user.edit("user", params.all());
		if(!"".equals(password) && password != null) {
			user.password = MD5.hash(password);
		}else {
			user.password = user.password;
		}
		user.save();
		new_result("修改个人信息成功","修改个人信息成功!","/users/user_edit",true);
	}
	
	public static void listphone(){
		List<Depart> departList = Depart.find("flag=1 order by sort").fetch();
		List<User> userList = User.find("status=1 order by depart_id").fetch();
		render(departList,userList);
	}
	
	//ip绑定页面
	public static void ipedit(Long id) {
		User user = User.findById(id);
		if (user != null) {
			render(user);
		}
	}
	
	//ip绑定保存
	public static void doIpEdit(Long id, String useIp, String ip_address) {
		User user = User.findById(id);
		if (user != null) {
			if (useIp != null && useIp.trim().equals("1")) {
				user.useIp = true;
				user.ip_address = ip_address;
				user.save();
			} else {
				user.useIp = false;
				user.ip_address = ip_address;
				user.save();
			}
			result("保存成功!", "保存成功!", "/Users/ipedit", false);
		} else {
			result("不存在此用户!", "不存在此用户!", "/Users/ipedit", false);
		}
	}
	
}

