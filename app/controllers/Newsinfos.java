package controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import play.libs.WS;
import play.libs.WS.HttpResponse;
import controllers.weixin.WXUtils;
import models.Customerinfo;
import models.Imagetext;
import models.ImgStock;
import models.Newsinfo;
import models.WXConfig;
import models.WXInterface;
import utils.CacheUtils;
import utils.PagedList;
import utils.ParamUtils;
import utils.UploadUtils;

public class Newsinfos extends Application{
	
	public static void list(String orderBy,String order) {
		PagedList<Newsinfo> pagedList = new PagedList<Newsinfo>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		Newsinfo.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),null);
		render(pagedList,orderBy,order);
	}
	public static void listblank(String orderBy,String order) {
		String search=params.get("search");
		List<Newsinfo> newsinfos=new ArrayList<Newsinfo>();
		if(search!=null&&!"".equals(search.trim())){
			String hql="1=1 and classic!=1 and  newsinfo.state=0 and (title like '"+search+"%' or author like '"+search+"%' or summary  like '"+search+"%') group by newsinfo_id order by newsinfo.updated desc";
			List<Imagetext> imagetext=Imagetext.find(hql).fetch();
			for (Imagetext imagetext2 : imagetext) {
				newsinfos.add(imagetext2.newsinfo);
			}
			render(newsinfos,orderBy,order);
		}
		String hql="1=1 and classic!=1 and state=0 order by updated desc";
		newsinfos=Newsinfo.find(hql).fetch();
		render(newsinfos,orderBy,order);
	}
	public static void listblanktwo(String orderBy,String order,Integer b) {
		String hql="1=1 and classic!=1 and state=0 order by updated desc";
		List<Newsinfo> newsinfos=Newsinfo.find(hql).fetch();
		render(newsinfos,orderBy,order,b);
	}
	public static void blank() {
		Newsinfo newsinfo = new Newsinfo();
		render(newsinfo);
	}
	public static void blankMany(Long id) {
		Newsinfo newsinfo = new Newsinfo();
		List<Imagetext> imagetexts=new ArrayList<Imagetext>();
		if(id!=null){
			newsinfo=Newsinfo.findById(id);
			if(!newsinfo.imagetext.isEmpty())
			imagetexts=newsinfo.imagetext;
		}else{
			Imagetext i1=new Imagetext();
			Imagetext i2=new Imagetext();
			imagetexts.add(i1);
			imagetexts.add(i2);
		}
		render(newsinfo,imagetexts);
	}
	public static void blankOne(Long id,Integer type1) {
		Newsinfo newsinfo = new Newsinfo();
		if(type1!=null){
			newsinfo.classic=type1;
		}
		Imagetext imagetext=new Imagetext();

		if(type1!=null&&type1==1){
			imagetext.classic=1;//关注的时候给客户推送的图文
		}
		if(id!=null){
			newsinfo=Newsinfo.findById(id);
			if(!newsinfo.imagetext.isEmpty())
			imagetext=newsinfo.imagetext.get(0);
		}
		render(newsinfo,imagetext);
	}
	public static void create() {
		Newsinfo object = new Newsinfo();
		object = object.edit("newsinfo", params.all());
		object.save();
		
		List<Imagetext> imagetexts = ParamUtils.getAllList(Imagetext.class, "imagetext", params);
		for (Imagetext imagetext:imagetexts) {
			imagetext.newsinfo = object;
			imagetext.save();
		}
		
		result("保存新闻资讯成功","保存新闻资讯单成功!","/newsinfos/blank",true);
	}
	
	public static void show(long id) {
		Newsinfo newsinfo= Newsinfo.findById(id);
		notFoundIfNull(newsinfo);
		render(newsinfo);
	}
	
	public static void detail(long id) {
		Newsinfo newsinfo= Newsinfo.findById(id);
		notFoundIfNull(newsinfo);
		render(newsinfo);
	}
	public static void detailNews(long id) {
//		Newsinfo newsinfo= Newsinfo.findById(id);
//		notFoundIfNull(newsinfo);
		Imagetext imagetext=Imagetext.findById(id);
		render(imagetext);
	}
	public static void save(Long id) {
		Newsinfo object = Newsinfo.findById(id);
		object = object.edit("newsinfo", params.all());
		object.save();
		
		List<Imagetext> imagetexts = ParamUtils.getAllList(Imagetext.class, "imagetext", params);
		for (Imagetext imagetext:imagetexts) {
			if(imagetext.id==null){
				imagetext.newsinfo = object;
			}
			imagetext.save();
		}
		
		result("保存新闻资讯成功","保存新闻资讯成功!","/newsinfos/blank",true);
	}
	public static void blankOnesave(Long id,Integer type,String wxAccount) {
		Newsinfo object=null;
		Integer b=1;  //是否显示保存成功  1显示
		if(id!=null){
			object= Newsinfo.findById(id);
		}else{
			object=new Newsinfo();
		}
		object = object.edit("newsinfo", params.all());
		object.state=0;
		object.type=0;
		object.updated=new Date();
		object.save();
		
		List<Imagetext> imagetexts = ParamUtils.getAllList(Imagetext.class, "imagetext", params);
		for (Imagetext imagetext:imagetexts) {
			if(imagetext.id==null){
				imagetext.newsinfo = object;
			}
			if(imagetext.imgStock_id!=null){
				ImgStock img=ImgStock.findById(imagetext.imgStock_id);
				img.id=imagetext.imgStock_id;
				imagetext.imgStock=img;
			}
			
			imagetext.save();
		}
		if(type==1){//预览
			flash.success("发送成功");
			if(wxAccount!=null){//给指定的用户发送预览消息
				List<Customerinfo> customerinfos = new ArrayList<Customerinfo>();
				Customerinfo customerinfo = Customerinfo.find("openid=?", wxAccount).first();
				customerinfos.add(customerinfo);
				String text = WXUtils.sendNewsinfo(customerinfos,object,1);
				
				String url = WXInterface.URL_PREVIEW;
				
				WXUtils.dealPOST(url, text, "Newsinfos.blankOnesave()");
				
			}
			blankOne(id,null);
		}else{
			listblanktwo(null,null,b);
		}
		
	}
	public static void blankManysave(Long id) {
		Newsinfo object=null;
		Integer b=1;  //是否显示保存成功  1显示
		if(id!=null){
			object= Newsinfo.findById(id);
		}else{
			object=new Newsinfo();
		}
		object = object.edit("newsinfo", params.all());
		object.state=0;
		object.type=1;
		object.updated=new Date();
		object.save();
		
		List<Imagetext> imagetexts = ParamUtils.getAllList(Imagetext.class, "imagetext", params);
		for (Imagetext imagetext:imagetexts) { 
			if(imagetext.id==null){
				imagetext.newsinfo = object;
			}
			if(imagetext.imgStock_id!=null){
				ImgStock img=new ImgStock();
				img.id=imagetext.imgStock_id;
				imagetext.imgStock=img;
			}
			imagetext.save();
		}
		listblanktwo(null,null,b);
	}
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Newsinfo newsinfo= Newsinfo.findById(_id);
				if(newsinfo!=null) newsinfo.delete();
			}
		}else if(id!=null){
			Newsinfo newsinfo= Newsinfo.findById(id);
			if(newsinfo==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			newsinfo.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	
	
	public static void deleteImagetext(Long id){
		Imagetext object = Imagetext.findById(id);
		if(object!=null){ object.delete(); renderJSON(getJSON("success"));}
		renderJSON(getJSON("fail"));
	}
	
	//用于菜单的发布
	public static void list1() {
		List<Newsinfo> list = new ArrayList<Newsinfo>();
		list = Newsinfo.findAll();
		render(list);
	}
	/**
	 * ajax删除新闻信息
	 * @param id
	 */
	public static void  delectNewsinfo(Long id){
		try {
			Newsinfo newsinfo= Newsinfo.findById(id);
			if(newsinfo==null)renderJSON(3);
			if(newsinfo.imagetext.isEmpty()){
				for (Imagetext i : newsinfo.imagetext) {
					i.delete();
				}
			}
			newsinfo.delete();
			renderJSON(1);
		} catch (Exception e) {
			renderJSON(2);
		}
	}
	public static void findByNewsInfo(Long id){
		Newsinfo newsinfo= Newsinfo.findById(id);
		render(newsinfo);
	}
	
	public static void selectSuCai(){
		List<Imagetext> list = new ArrayList<Imagetext>();
		list = Imagetext.findAll();
		render(list);
	}
	
	public static void findImagetext(Long id){
		Imagetext imagetext = Imagetext.findById(id);
		//System.out.println(imagetext.imgStock);
		if(imagetext.imgStock==null){
			renderJSON(0);
		}
		System.out.println(imagetext.imgStock.id);
		renderJSON(imagetext.imgStock.id);
		
	}
	
	/**
	 * ajax删除单模块
	 * @param id
	 */
	public static void  delectImagetext(Long id){
		try {
			Imagetext imagetext= Imagetext.findById(id);
			if(imagetext==null)renderJSON(3);
			imagetext.delete();
			renderJSON(1);
		} catch (Exception e) {
			renderJSON(2);
		}
	}
	/**
	 * ueditor上传配置方法
	 * @param upfile
	 * @param action
	 */
	    public static void ueditorupload(File upfile,String action){
	    	if("ueditorupload, config".equals(action)){
	    		String result = "{\"imageMaxSize\":\""+ 2048000 +"\"}";
	    		result = result.replaceAll( "\\\\", "\\\\" );
	    		renderJSON(result);
	    	}
	    	if(upfile!=null){
		    		String ext = upfile.getName().substring(upfile.getName().lastIndexOf("."));
		    		String filename = System.currentTimeMillis()+ext;
		    		String filepath="";
		    		if("ueditorupload, uploadimg".equals(action)){
		    			filepath = UploadUtils.newuploadimg(upfile,filename);
			    	}else if("ueditorupload, uploadvideo".equals(action)){
			    		filepath = UploadUtils.newuploadvideo(upfile,filename);
			    	}else if("ueditorupload, uploadfile".equals(action)){
			    		filepath = UploadUtils.newuploadfile(upfile,filename);
			    	}else{
			    		filepath = UploadUtils.newuploadfile(upfile,filename);
			    	}
		    		String result = "{\"name\":\""+ filename +"\", \"originalName\": \""+ upfile.getName() +"\", \"size\": "+ 500 +", \"state\": \""+ "SUCCESS" +"\", \"type\": \""+ ext +"\", \"url\": \""+ filepath +"\"}";
		    		result = result.replaceAll( "\\\\", "\\\\" );
		    		renderJSON(result);
	    	}
		}

	    /**
	     * 单图文的预览
	     * @param id 图文id
	     * @param type 用来判断是预览还是保存
	     * @param wxAccount openId
	     */
		public static void blankOnesave1(Long id,Integer type,String wxAccount) {
			System.out.println(type);
			String result="";
			Newsinfo object=null;
			Integer b=1;  //是否显示保存成功  1显示
			if(id!=null){
				object= Newsinfo.findById(id);
			}else{
				object=new Newsinfo();
			}
			object = object.edit("newsinfo", params.all());
			object.state=0;
			object.type=0;
			object.classic = type;
			object.updated=new Date();
			object.save();
			
			List<Imagetext> imagetexts = ParamUtils.getAllList(Imagetext.class, "imagetext", params);
			for (Imagetext imagetext:imagetexts) {
				if(imagetext.id==null){
					imagetext.newsinfo = object;
				}
				if(imagetext.imgStock_id!=null){
					ImgStock img=ImgStock.findById(imagetext.imgStock_id);
					img.id=imagetext.imgStock_id;
					imagetext.imgStock=img;
				}
				imagetext.classic=type;
				imagetext.save();
			}
			if(type==1){//预览
				flash.success("发送成功");
				if(wxAccount!=null){//给指定的用户发送预览消息
					List<Customerinfo> customerinfos = new ArrayList<Customerinfo>();
					System.out.println(wxAccount);
					Customerinfo customerinfo = Customerinfo.find("openid=?", wxAccount).first();
					customerinfos.add(customerinfo);
					String text = WXUtils.sendNewsinfo(customerinfos,object,1);
					
					String url = WXInterface.URL_PREVIEW;
					
					result = WXUtils.dealPOST(url, text, "Newsinfos.blankOnesave()");
					
					JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
					JsonObject json = jsonparer.parse(result).getAsJsonObject();
					JsonElement element = json.get("errcode");
					String errcode = "";
					if(element!=null){
						errcode = element.getAsString();
					}
				
					Gson gson = new GsonBuilder().setVersion(1.1).create();
					String json1 = gson.toJson(errcode);
					
					renderJSON(json1);;
				}
				
				
				
				
			}else{
				listblanktwo(null,null,b);
			}
			
		}
		
		
		public static void blankManysave1(Long id,Integer type,String wxAccount) {
			String result="";
			Newsinfo object=null;
			Integer b=1;  //是否显示保存成功  1显示
			if(id!=null){
				object= Newsinfo.findById(id);
			}else{
				object=new Newsinfo();
			}
			object = object.edit("newsinfo", params.all());
			object.state=0;
			object.type=1;
			object.updated=new Date();
			object.save();
			
			List<Imagetext> imagetexts = ParamUtils.getAllList(Imagetext.class, "imagetext", params);
			for (Imagetext imagetext:imagetexts) { 
				if(imagetext.id==null){
					imagetext.newsinfo = object;
				}
				if(imagetext.imgStock_id!=null){
					ImgStock img=new ImgStock();
					img.id=imagetext.imgStock_id;
					imagetext.imgStock=img;
				}
				imagetext.save();
			}
			
			if(type==1){//预览
				flash.success("发送成功");
				if(wxAccount!=null){//给指定的用户发送预览消息
					List<Customerinfo> customerinfos = new ArrayList<Customerinfo>();
					System.out.println(wxAccount);
					Customerinfo customerinfo = Customerinfo.find("openid=?", wxAccount).first();
					customerinfos.add(customerinfo);
					String text = WXUtils.sendNewsinfo(customerinfos,object,1);
					
					String url = WXInterface.URL_PREVIEW;
					
					result = WXUtils.dealPOST(url, text, "Newsinfos.blankOnesave()");
					
					JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
					JsonObject json = jsonparer.parse(result).getAsJsonObject();
					JsonElement element = json.get("errcode");
					String errcode = "";
					if(element!=null){
						errcode = element.getAsString();
					}
				
					Gson gson = new GsonBuilder().setVersion(1.1).create();
					String json1 = gson.toJson(errcode);
					
					renderJSON(json1);;
				}
				
			}else{
				listblanktwo(null,null,b);
			}
			
			
			
		}
}