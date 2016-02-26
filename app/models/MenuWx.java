package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.Play;
import utils.ModelUtils;
import utils.PagedList;

import com.google.gson.Gson;
import com.google.gson.annotations.Until;

import controllers.weixin.WXUtils;

@Entity
public class MenuWx extends BaseModel{
	
	
	@ManyToOne public MenuWx parent;	//上一级菜单
	
	public String name;	//菜单名称
	
	/**
	 * 1、click：点击推事件
	 * 2、view：跳转URL
	 * 3、scancode_push：扫码推事件
	 * 4、scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
	 * 5、pic_sysphoto：弹出系统拍照发图
	 * 6、pic_photo_or_album：弹出拍照或者相册发图
	 * 7、pic_weixin：弹出微信相册发图器
	 * 8、location_select：弹出地理位置选择器
	 * 9、media_id：下发消息（除文本消息）
	 * 10、view_limited：跳转图文消息URL 
	 */
	public Integer menuType;	//菜单类型
	
	/*
	 * key规则：
	 * 文本: txt_id
	 * 图片:pic_id
	 * 多图文:multiPic_id
	 */
	public String menu_key;	//值 如果menuType为1 必填并且唯一
	
	public String url;	//路径 如果menuType为2 必填
	
	public Integer sort;	//排序
	
	public Integer flag;	//状态
	
	public String content;//如是发送文本消息的 这里保存的的是发送消息的内容
	
	@OneToMany(mappedBy="parent",cascade=CascadeType.ALL)
	@Until(1.1)public List<MenuWx> children;//下级菜单;
	
	@ManyToOne
	public Newsinfo newsinfo;//图文对象
	
	@ManyToOne
	public ImgStock imgStock;//图片
	
	public static void findPage(PagedList<MenuWx> pagedList,String search, String searchField, String orderBy, String order,String condition,String where){
		long count = ModelUtils.count(MenuWx.class.getName(), "['parent.name','name','menuType','menu_key','url','sort','flag']", search, searchField, condition,where);
		List<MenuWx> list = ModelUtils.findPage(pagedList.getFirstRowInThisPage(), pagedList.getPageSize(), MenuWx.class.getName(), "['parent.name','name','menuType','menu_key','url','sort','flag']", search, searchField, orderBy, order,condition,where);
		pagedList.setRowCount(count);
		pagedList.setList(list);
	}


	/**
	 * 把菜单转换成jso格式的字符串
	 * 
	 * @return
	 */
	public static String toJson() {
		StringBuffer jsonStr = new StringBuffer();
		jsonStr.append("{\"button\":[");
		List<MenuWx> rootList = MenuWx.find("parent is NULL order by sort").fetch();

		if (rootList != null && rootList.size() > 0) {
			for (int i = 0; i < rootList.size(); i++) {
				List<MenuWx> children = MenuWx.find("parent.id=?  order by sort", rootList.get(i).id).fetch();

				String rootStr = "{\"name\":\"" + rootList.get(i).name + "\"";
				if (children == null || children.size() == 0) {// 当前菜单下面没有子菜单
					
					//返回值是1：存在还未设置响应的菜单，请检查！
					if(rootList.get(i).menuType==null){//没有指定事件类型
						return "1";
					}else if(rootList.get(i).menuType==1){//click事件
						if(rootList.get(i).menu_key==null){//没有指定key
							return "1";
						}
					}else if(rootList.get(i).menuType==2){//view事件
						if(rootList.get(i).url==null||"".equals(rootList.get(i).url.trim())){//没有指定url
							return "1";
						}
					}
					
					String typeStr = ",\"type\":";
					String keyStr = ",\"key\":\"";
					if (rootList.get(i).menuType!=null&&rootList.get(i).menuType == 2) {//view事件
						keyStr = ",\"url\":\"";
					} else if(rootList.get(i).menuType!=null){
						
						/*
						 * 对于菜单是click时间并且是发送图片的 需要进行下面的处理。把菜单上传到微信服务器上面去
						 * 然后获取返回的media_id，把media_id保存到对应的图片对象里面
						 */
						//获取菜单对应的图片对象
						ImgStock imgStock = rootList.get(i).imgStock;
						
						if(imgStock!=null&&imgStock.path!=null){//如果图像存在并且图像地址也存在
							
							imgStock.media_id = WXUtils.uploadFile(imgStock.path, "image",1);
							
							imgStock.save();
						}
						
						keyStr = ",\"key\":\"";
					}
					if (rootList.get(i).menuType != null && rootList.get(i).menuType == 2) {
						typeStr = typeStr + "\"view\"";
						if (rootList.get(i).url.startsWith("http")) {
							keyStr = keyStr + rootList.get(i).url + "\"";
						} else {
							keyStr = keyStr + Play.configuration.getProperty("project.url") + rootList.get(i).url + "\"";
						}
					} else {
						typeStr = typeStr + "\"click\"";
						keyStr = keyStr + rootList.get(i).menu_key + "\"";
					}
					rootStr = rootStr + typeStr + keyStr;
					rootStr = rootStr + ",\"sub_button\":[";

				} else {
					rootStr = rootStr + ",\"sub_button\":[";
					for (int j = 0; j < children.size(); j++) {
						String childStr = "{\"name\":\"" + children.get(j).name + "\"";
						String typeStr = ",\"type\":";
						String keyStr = "";
						
						//返回值是1：存在还未设置响应的菜单，请检查！
						if(children.get(j).menuType==null){
							return "1";
						}else if(children.get(j).menuType==1){//click事件
							if(children.get(j).menu_key==null){
								return "1";
							}
						}else if(children.get(j).menuType==2){//view事件
							if(children.get(j).url==null||"".equals(children.get(j).url.trim())){
								return "1";
							}
						}
						
						if (children.get(j).menuType!=null&&children.get(j).menuType == 2) {//view事件
							keyStr = ",\"url\":\"";
						} else if(children.get(j).menuType != null){
							//在这里如果发现imgStock有值需要把图片上传到微信服务器上面
							ImgStock imgStock = children.get(j).imgStock;
							if(imgStock!=null&&imgStock.path!=null){
								
								imgStock.media_id = WXUtils.uploadFile(imgStock.path, "image",1);
								
								imgStock.save();
							}
							keyStr = ",\"key\":\"";
						}

						if (children.get(j).menuType != null && children.get(j).menuType == 2) {
							typeStr = typeStr + "\"view\"";
							if (children.get(j).url.startsWith("http")) {
								keyStr = keyStr + children.get(j).url + "\"";
							} else {
								keyStr = keyStr + Play.configuration.getProperty("project.url") + children.get(j).url + "\"";
							}
						} else {
							typeStr = typeStr + "\"click\"";
							keyStr = keyStr + children.get(j).menu_key + "\"";
						}
						childStr = childStr + typeStr + keyStr;

						if (j == children.size() - 1) {
							childStr = childStr + "}";
						} else {
							childStr = childStr + "},";
						}

						rootStr = rootStr + childStr;
					}
				}

				if (i == rootList.size() - 1) {
					rootStr = rootStr + "]}";
				} else {
					rootStr = rootStr + "]},";
				}
				jsonStr.append(rootStr);
			}
		}
		jsonStr.append("]}");
		return jsonStr.toString();
	}

}