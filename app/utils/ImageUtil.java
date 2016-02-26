
package utils;
import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Date;

import javax.imageio.ImageIO;

import com.sun.org.apache.bcel.internal.generic.NEW;

import play.Play;
import play.libs.Files;
/**
 * 图片水印
 */
public class ImageUtil {
    /**
     * @param args
     */
    public static void main(String[] args) {
//    	//原图
//        String srcImgPath = "e:/2.jpg";
//        //加了字的图
//        String targerPath = "e:/3.jpg";
//        // 给图片添加字
//        ImageUtil.pressText("李辰的饮酒基因报告",srcImgPath,targerPath,125, 60, 0.9f);//测试OK
//       System.out.println("ok");
    }
//    /**
//     * 往模板报报告上写内容 动态生成新图
//     * @param path 路径
//     * @param orderinfo 订单
//     * @return
//     */
//    public static String createNewimg(String path,Orderinfo orderinfo){
//    	File file = new File(Play.applicationPath, path);
//    	String ext = file.getName().substring(file.getName().lastIndexOf("."));	//该文件的后缀名
//		String name = orderinfo.barcode+"_"+DateUtils.format(new Date(), "yyyyMMddHHmmss")+ext;
//		//System.out.println(name);
//		String filepath = "/public/upbaogao/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
//		filepath = filepath + "/";
//		File to = new File(Play.applicationPath,filepath);
//		if(!to.exists()){
//			to.mkdirs();
//		}
//		to = new File(to,name);
//		Files.copy(file,to);
//		//System.out.println("本地路径："+to.getPath());
//		String pathtwo= filepath + name;
//		//System.out.println(new Date());
//		ImageUtil.pressText(orderinfo.customerinfo.name.trim(),file.getPath(),to.getPath(),125, 110,"样品号："+orderinfo.barcode,125,165, 1f);//测试OK
//		
//		return pathtwo;
//    }
    /*
    * 给图片添加文字水印
    * @param pressText 水印文字
    * @param srcImageFile 源图像地址
    * @param destImageFile 目标图像地址
    * @param fontName 水印的字体名称
    * @param fontStyle 水印的字体样式
    * @param color 水印的字体颜色
    * @param fontSize 水印的字体大小
    * @param x 修正值
    * @param y 修正值
    * @param alpha 透明度：alpha 必须是范围 [0.0, 1.0] 之内（包含边界值）的一个浮点数字
    */
   public final static void pressText(String pressText,String srcImageFile, String destImageFile,int x,int y,String pressTexttwo,int xtwo,int ytwo, float alpha) {
       try {
           File img = new File(srcImageFile);
           Image src = ImageIO.read(img);
           int width = src.getWidth(null);
           int height = src.getHeight(null);
           BufferedImage image = new BufferedImage(width, height,
                   BufferedImage.TYPE_INT_RGB);
           Graphics2D g = image.createGraphics();
           	// 开文字抗锯齿 去文字毛刺
           g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
          
           g.drawImage(src, 0, 0, width, height, null);
           // 设置颜色
           g.setColor(new Color(89,87,87));
           // 设置 Font
           g.setFont(new Font("方正兰亭中黑_GBK",Font.BOLD,54));
           g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP,
                   alpha));
           // 第一参数->设置的内容，后面两个参数->文字在图片上的坐标位置(x,y) .
           Integer i=0;
          // pressText="{}《》？！";
         //  System.out.println(pressText.length());
           String ENGLISH = "^[A-Z]";
         //  String regeschinese="^[\u4e00-\u9fa5]";
           String english="^[a-z]";
           String regexmath="^[0-9]";
           Double sum=0.0;
           String s="";
           Integer length=0;
           if(pressText.length()>2){
        	   for (Integer b=0;b<pressText.length();b++) {
            	   s=pressText.substring(b,b+1);  
            	   length=b;
        		   if(sum>8){
        			   	   length=length-1;
        			   	   //System.out.println(length);
	            		  // System.out.println("--stop--");
	            		   break;
	            	}else if(s.matches(english)){
	    				i+=9;
	    				sum+=1.1;
	    				//System.out.print(9);
	    			}else if(s.matches(regexmath)){
	    				i+=12;
	    				sum+=1.5;
	    				//System.out.print(12);
	    			}
	    			else if(s.matches(ENGLISH)){
	    				i+=14;
	    				sum+=1.3;
	    				//System.out.print(14);
	    			}
	    			else{
	    				i+=14;
	    				sum+=2;
	    				//System.out.print(14);
	    				//System.out.print(s.matches(regeschinese));
	    			}
	    			 //System.out.println("--"+s+"--"+i);
               }
        	  // i=(pressText.length()-2)*7;
           }
           if(sum>=8){
        	   pressText=pressText.substring(0,length);
           }
           //System.out.println(pressText);
           g.drawString(pressText+"的饮酒基因报告", x-i, y);
        // 设置 Font
           g.setFont(new Font("方正兰亭中黑_GBK",Font.BOLD,23));
           g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP,
                   alpha));
           g.drawString(pressTexttwo, xtwo-i, ytwo);
           g.dispose();
           ImageIO.write((BufferedImage) image, "JPEG", new File(destImageFile));// 输出到文件流
       } catch (Exception e) {
           e.printStackTrace();
       }
   }



}
