package utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.Iterator;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

import play.Play;
import play.libs.Files;
import play.libs.Images;

public class UploadUtils {
	
	public static String image(File file){
		String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
		String name = System.currentTimeMillis()+ext;
		String filepath = "/public/uploads/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		filepath = filepath + "/";
		File to = new File(Play.applicationPath,filepath);
		if(!to.exists()){
			to.mkdirs();
		}
		to = new File(to,name);
		Files.copy(file,to);
		return filepath + name;
	}
	
	public static String resizeImage(File file,String filename,int w,int h){
		String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
//		String name = file.getName().substring(0,file.getName().lastIndexOf(".")) + "_" + filename + ext;
		String name = filename + ext;
		String filepath = "/public/uploads/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		filepath = filepath + "/";
		File to = new File(Play.applicationPath,filepath+name);
		Images.resize(file, to, w, h);
		return filepath + name;
	}
	
	public static String uploadimage(File file){
		String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
		String name = System.currentTimeMillis()+ext;
		String filepath = "/public/uploads/carimage/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		filepath = filepath + "/";
		File to = new File(Play.applicationPath,filepath);
		if(!to.exists()){
			to.mkdirs();
		}
		to = new File(to,name);
		Files.copy(file,to);
		return filepath + name;
	}
	public static String uploadimages(File file){
		String ext=UploadUtils.getFormatName(file);
//		String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
		String name = System.currentTimeMillis()+"."+ext;
		String filepath = "/public/uploads/imagetwo/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		filepath = filepath + "/";
		File to = new File(Play.applicationPath,filepath);
		if(!to.exists()){
			to.mkdirs();
		}
		to = new File(to,name);
		Files.copy(file,to);
		return filepath + name;
	}
	/**
	 * 上传文件先到临时目录，保存时才移动
	 * @param file
	 * @return
	 */
	public static String imageTemp(File file){
		String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
		String name = System.currentTimeMillis()+ext;
		String filepath = "/public/uploads/tmp/";
		File to = new File(Play.applicationPath,filepath);
		if(!to.exists()){
			to.mkdirs();
		}
		to = new File(to,name);
		Files.copy(file,to);
		return filepath + name;
	}
	/**
	 * 编辑器上传
	 * @param files
	 * @param filename
	 * @return
	 */
	public static String newuploadimg(File files,String filename){
		String ext = files.getName().substring(files.getName().lastIndexOf("."));
		String folderpath = "/public/ueditoruploads/image/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(Play.applicationPath,folderpath);
		if(!folder.exists()) folder.mkdirs();
		File to = new File(folder,filename);
		Files.copy(files,to);
		String imgPath = folderpath + "/" + filename;
		return imgPath;
	}
	/**
	 * 编辑器上传视频
	 * @param files
	 * @param filename
	 * @return
	 */
	public static String newuploadvideo(File files,String filename){
		String ext = files.getName().substring(files.getName().lastIndexOf("."));
		String folderpath = "/public/ueditoruploads/video/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(Play.applicationPath,folderpath);
		if(!folder.exists()) folder.mkdirs();
		File to = new File(folder,filename);
		Files.copy(files,to);
		String imgPath = folderpath + "/" + filename;
		return imgPath;
	}
	/**
	 * 编辑器上传文件
	 * @param files
	 * @param filename
	 * @return
	 */
	public static String newuploadfile(File files,String filename){
		String ext = files.getName().substring(files.getName().lastIndexOf("."));
		String folderpath = "/public/ueditoruploads/file/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(Play.applicationPath,folderpath);
		if(!folder.exists()) folder.mkdirs();
		File to = new File(folder,filename);
		Files.copy(files,to);
		String imgPath = folderpath + "/" + filename;
		return imgPath;
	}
	public static String upload(File files){
		String ext = files.getName().substring(files.getName().lastIndexOf("."));
		String folderpath = "/public/uploads/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(Play.applicationPath,folderpath);
		if(!folder.exists()) folder.mkdirs();
		String filename = System.currentTimeMillis()+ext;
		File to = new File(folder,filename);
		Files.copy(files,to);
		String imgPath = "/"+folderpath + "/" + filename;
		return imgPath;
	}
	public static String uploadtwo(File files){
		String ext = files.getName().substring(files.getName().lastIndexOf("."));
		String folderpath = "public/files/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(Play.applicationPath,folderpath);
		if(!folder.exists()) folder.mkdirs();
		String filename = new String(UUID.randomUUID().toString()).substring(0, 10)+ext;
		File to = new File(folder,filename);
		Files.copy(files,to);
		String imgPath = "/"+folderpath + "/" + filename;
		return imgPath;
	}
	//转换png
	public static String uploadPNG(File files){
		String folderpath = "public/ExcelImage/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(Play.applicationPath,folderpath);
		if(!folder.exists()) folder.mkdirs();
		String filename = new String(UUID.randomUUID().toString()).substring(0, 10)+".png";
		File to = new File(folder,filename);
		if(!to.exists()) to.mkdirs();
	 BufferedImage bufferImg;
	try {
		String imgPath=null;
			bufferImg = ImageIO.read(files);
			if(bufferImg!=null){
				ImageIO.write(bufferImg, "jpg", to);
			     imgPath = "/"+folderpath + "/" + filename;
			}else{
				imgPath=uploadtwo(files);
			}
			
		return imgPath;
	} catch (IOException e) {
		e.printStackTrace();
		return null;
	}
     
	}
	
	public static boolean delFile(String filePathAndName) {
		String message = "";
		boolean bea = false;
		try {
			String filePath = filePathAndName;
			File myDelFile = new File(Play.applicationPath, filePath);
			if (myDelFile.exists()) {
				myDelFile.delete();
				bea = true;
			} else {
				bea = false;
				message = (filePathAndName + "删除文件操作出错");
			}
		} catch (Exception e) {
			message = e.toString();
		}
		return bea;
	}
	/**
	 * 图片判断
	 */
	public static String getFormatName(Object o) {  
	     try {  
	         // Create an image input stream on the image  
	         ImageInputStream iis = ImageIO.createImageInputStream(o);  
	  
	         // Find all image readers that recognize the image format  
	         Iterator<ImageReader> iter = ImageIO.getImageReaders(iis);  
	         if (!iter.hasNext()) {  
	             // No readers found  
	             return null;  
	         }  
	  
	         // Use the first reader  
	         ImageReader reader = (ImageReader) iter.next();  
	  
	         // Close stream  
	         iis.close();  
	  
	         // Return the format name  
	         return reader.getFormatName();  
	     } catch (IOException e) {  
	         return null;
	     }  
	 }
	
	
	public static String urlGetFileName(String img){
		 File files=new File(img);
	     String ext = files.getName().substring(files.getName().lastIndexOf("."));
	     String folderpath = "/public/uploads/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
	     File folder = new File(Play.applicationPath,folderpath);
	     if(!folder.exists()) folder.mkdirs();
	     String filename = System.currentTimeMillis()+ext;
		 //new一个URL对象  
    	//String img="http://www.zjninghai.jcy.gov.cn/uploads/2014822/20140822164316371637.jpg";
		try {
		URL url = new URL(img);
        //打开链接  
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();  
        //设置请求方式为"GET"  
        conn.setRequestMethod("GET");  
        //超时响应时间为5秒  
        conn.setConnectTimeout(5 * 1000);  
        //通过输入流获取图片数据  
        InputStream inStream = conn.getInputStream();
        //得到图片的二进制数据，以二进制封装得到数据，具有通用性  
        byte[] data = readInputStream(inStream);  
        //new一个文件对象用来保存图片，默认保存当前工程根目录  
		File to = new File(folder,filename);
        //创建输出流  
        FileOutputStream outStream = new FileOutputStream(to);  
        //写入数据  
        outStream.write(data);  
        //关闭输出流  
        outStream.close();
		} catch (MalformedURLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} 
		String imgPath =folderpath + "/" + filename;
		
		ImagesUtil.zoom(new File(Play.applicationPath,imgPath), new File(Play.applicationPath,imgPath), 280, 260);
		
		
		//此处写方法
		return imgPath;
	}
	//读取文件的方法
	 public static byte[] readInputStream(InputStream inStream) throws Exception{  
	        ByteArrayOutputStream outStream = new ByteArrayOutputStream();  
	        //创建一个Buffer字符串  
	        byte[] buffer = new byte[1024];  
	        //每次读取的字符串长度，如果为-1，代表全部读取完毕  
	        int len = 0;  
	        //使用一个输入流从buffer里把数据读取出来  
	        while( (len=inStream.read(buffer)) != -1 ){  
	            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度  
	            outStream.write(buffer, 0, len);  
	        }  
	        //关闭输入流  
	        inStream.close();  
	        //把outStream里的数据写入内存  
	        return outStream.toByteArray();  
	    }  
	 /**
	  * 导入原来的图片需要保存原来的名字
	  * @param file
	  * @return
	  */
	 public static String importimage(File file){
			String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
			String name = file.getName().substring(0, file.getName().lastIndexOf("."))+"_"+DateUtils.format(new Date(), "yyyyMMddHHmmss")+ext;
			//System.out.println(name);
			String filepath = "/public/upbaogao/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
			filepath = filepath + "/";
			File to = new File(Play.applicationPath,filepath);
			if(!to.exists()){
				to.mkdirs();
			}
			to = new File(to,name);
			Files.copy(file,to);
			return filepath + name;
		}
	 /**
	  * 上传至图片库    licen
	  * @param file
	  * @return
	  */
	 public static String uploadimgStocks(File file){
			String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
			String name = System.currentTimeMillis()+ext;
			String filepath = "/public/imgStocks/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
			filepath = filepath + "/";
			File to = new File(Play.applicationPath,filepath);
			if(!to.exists()){
				to.mkdirs();
			}
			to = new File(to,name);
			Files.copy(file,to);
			return filepath + name;
		}

}
