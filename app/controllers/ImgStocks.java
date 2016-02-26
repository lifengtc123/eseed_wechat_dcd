package controllers;

import java.io.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.ImgStock;
import models.Imggroups;
import play.data.validation.Valid;
import play.db.DB;
import utils.DateUtils;
import utils.PagedList;
import utils.SelectTree;
import utils.SelectTreeUtils;
import utils.UploadUtils;

public class ImgStocks extends Application{

	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<Imggroups> list = Imggroups.find("1=1 order by sort ").fetch();
		render(list);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<ImgStock> pagedList = new PagedList<ImgStock>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		if(params.get("pid")==null){
			ImgStock.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		}else if("-1".equals(params.get("pid"))){
			System.out.println("--------");
			ImgStock.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),"imggroups is NULL");
		}else{
			String where = "imggroups.id = " + params.get("pid");
			ImgStock.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),where);
		}
		render(pagedList,orderBy,order);
	}
	public static void listimg(String orderBy,String order) {
		List<ImgStock> imgStocks = new ArrayList<ImgStock>();
		
		String hql="1=1";
		if(params.get("pid")==null){
			hql+= "and imggroups.id =null ";
			imgStocks= ImgStock.find(hql).fetch();
		}else{
			hql+= "and imggroups.id = " + params.get("pid");
			imgStocks= ImgStock.find(hql).fetch();
		}
		List<Imggroups> imggroupss=new ArrayList<Imggroups>();
		List<ImgStock> imgStocks2=ImgStock.find(" imggroups.id =null ").fetch();
		Imggroups imggroups=new Imggroups();
		imggroups.counts=imgStocks2.size();
		imggroupss.add(imggroups);
		List<Imggroups> imggroupss2=Imggroups.findAll();
		imggroupss.addAll(imggroupss2);
		render(imgStocks,imggroupss);
	}
	
		/**
		 * 获得分组
		 * @return 分组
		 */
		public static List<Imggroups> getImggroups() {
		
			Connection conn = DB.getConnection();
			try {
					conn.setAutoCommit(false);
					Statement st = conn.createStatement();
					String sql = "select a.imggroups_id as imggroups_id,count(*) as counts,b.name as name  from ImgStock a,Imggroups b where b.id=a.imggroups_id and b.flag=1 GROUP BY imggroups_id"; 
					st = conn.createStatement();
					ResultSet rs = st.executeQuery(sql);	//查找产品
					List<Imggroups> imggroupss=new ArrayList<Imggroups>();
					if(rs.next()){
						Imggroups imggroups=new Imggroups();
						imggroups.counts=rs.getInt("counts");
						imggroups.id=rs.getLong("imggroups_id");
						imggroups.name=rs.getString("name");
						imggroupss.add(imggroups);
					}
					return imggroupss;
				} catch (SQLException e) {
					e.printStackTrace();
					try {
						conn.rollback();
					} catch (SQLException e1) {
						e1.printStackTrace();
					}
					return null;
				}
			}
	public static void blank() {
		ImgStock imgStock= new ImgStock();
		render(imgStock);
	}
	
	public static void create() {
		ImgStock imgStock= new ImgStock();
		validation.valid(imgStock.edit("imgStock", params.all()));
		if(validation.hasErrors()){
			render("@blank",imgStock);
		}
		imgStock.save();
		result("保存图片库成功","保存图片库单成功!","/imgStocks/blank",true);
	}
	
	public static void show(long id) {
		ImgStock imgStock= ImgStock.findById(id);
		notFoundIfNull(imgStock);
		render(imgStock);
	}
	
	public static void detail(long id) {
		ImgStock imgStock = ImgStock.findById(id);
		notFoundIfNull(imgStock);
		render(imgStock);
	}
	
	public static void save(Long id) {
		ImgStock imgStock= ImgStock.findById(id);
		validation.valid(imgStock.edit("imgStock", params.all()));
		if(validation.hasErrors()){
			render("@show",imgStock);
		}
		imgStock.save();
		result("保存图片库成功","保存图片库成功!","/imgStocks/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				ImgStock imgStock= ImgStock.findById(_id);
				if(imgStock!=null) imgStock.delete();
			}
		}else if(id!=null){
			ImgStock imgStock= ImgStock.findById(id);
			if(imgStock==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			imgStock.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	//图片上传
	public static void upload(File file,String fieldID,String preImgID,String preImgtwoID){
		ImgStock imgstock=new ImgStock();
		String filepath=null;
		if(file!=null){
			filepath = UploadUtils.uploadimgStocks(file);
			imgstock.name=file.getName();
			imgstock.uploador=connect().truename;
			imgstock.path=filepath;
			imgstock.save();
		}
		render(filepath,imgstock,fieldID,preImgID,preImgtwoID);
	}
    
	//删除保存的图片
	public static void deleteImg(String path) {
		renderJSON(utils.UploadUtils.delFile(path));
	}
	
	/**
	 * 
	 * @param id 图片组的id
	 */
	public static void findByImgGroup(Long id){
		List<ImgStock> list = new ArrayList<ImgStock>();
		if(id==0){
			list = ImgStock.find("imggroups is NULL ").fetch();
		}else{
			list = ImgStock.find("imggroups.id=?",id).fetch();
		}
		
		render("@imgList",list);
	}
	public static void selectImgStock(Long id){
		ImgStock img = ImgStock.findById(id);
		Gson gson=new GsonBuilder().setVersion(1).create();
		String json=gson.toJson(img);
		renderJSON(json);
	}
}
