package models;

public interface WXInterface {

	public static final String UPLOAD_MEDIA_URL0 ="https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE";// 上传临时多媒体文件

	public static final String UPLOAD_MEDIA_URL1 = "https://api.weixin.qq.com/cgi-bin/material/add_material";// 上传永久多媒体文件
	
	//预览接口
	public static final String URL_PREVIEW = "https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=ACCESS_TOKEN";
	
	public static final String URL_ADDNEWS = "https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN";
}
