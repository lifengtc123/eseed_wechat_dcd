package utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.WritableRaster;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

import org.apache.commons.io.FilenameUtils;

import jj.play.ns.nl.captcha.backgrounds.BackgroundProducer;
import jj.play.ns.nl.captcha.backgrounds.TransparentBackgroundProducer;
import jj.play.ns.nl.captcha.text.renderer.DefaultWordRenderer;



import play.Play;
import play.libs.Files;
import play.libs.Images;

public class ImagesUtil {
	   /**
     * ImageMagick的路径
     */
    public static String imageMagickPath = null;
     
    static{
        /**
         * 获取ImageMagick的路径
         */
        //linux下不要设置此值，不然会报错
        imageMagickPath = "E:\\ImageMagick-6.7.0-Q8";   
    }
   
    
    public static Color getColorByid(int id) {
    	switch (id) {
    		case 1:
    			return  Color.white;
			case 2:
				return  Color.black;
			case 3:
				return  Color.blue;
			case 4:
				return  Color.cyan;//青色
			default:
				return  Color.white;
		}

	}
    
	// 删除图片
	public static boolean deleteImg(String imgPath) {
		String appPath = Play.applicationPath.toString().replace("\\", "/");
		File file = new File(appPath + imgPath);
		if (file.exists()) {
			return (new File(appPath + imgPath).delete());
		} else {
			return false;
		}
	}
	
	  public static BufferedImage resize(BufferedImage source, int targetW, int targetH) {
	         // targetW，targetH分别表示目标长和宽
	         int type = source.getType();
	         BufferedImage target = null;
	         double sx = (double) targetW / source.getWidth();
	         double sy = (double) targetH / source.getHeight();
	         //这里想实现在targetW，targetH范围内实现等比缩放。如果不需要等比缩放
	         //则将下面的if else语句注释即可
	         if(sx>sy)
	         {
	             sx = sy;
	             targetW = (int)(sx * source.getWidth());
	         }else{
	             sy = sx;
	             targetH = (int)(sy * source.getHeight());
	         }
	         if (type == BufferedImage.TYPE_CUSTOM) { //handmade
	             ColorModel cm = source.getColorModel();
	             WritableRaster raster = cm.createCompatibleWritableRaster(targetW, targetH);
	             boolean alphaPremultiplied = cm.isAlphaPremultiplied();
	             target = new BufferedImage(cm, raster, alphaPremultiplied, null);
	         } else
	             target = new BufferedImage(targetW, targetH, type);
	             Graphics2D g = target.createGraphics();
	             //smoother than exlax:
	             g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY );
	             g.drawRenderedImage(source, AffineTransform.getScaleInstance(sx, sy));
	             g.dispose();
	             return target;
	         }
	     
	         public static void saveImageAsJpg (String fromFileStr,String saveToFileStr,int width,int hight)
	         throws Exception {
	         BufferedImage srcImage;
	         // String ex = fromFileStr.substring(fromFileStr.indexOf("."),fromFileStr.length());
	         String imgType = "JPEG";
	         if (fromFileStr.toLowerCase().endsWith(".png")) {
	             imgType = "PNG";
	         }
	         // System.out.println(ex);
	         File saveFile=new File(saveToFileStr);
	         File fromFile=new File(fromFileStr);
	         srcImage = ImageIO.read(fromFile);
	         if(width > 0 || hight > 0)
	         {
	             srcImage = resize(srcImage, width, hight);
	         }
	         ImageIO.write(srcImage, imgType, saveFile);

	     }
	     
	     public static void main (String argv[]) {
	         try{
	         //参数1(from),参数2(to),参数3(宽),参数4(高)
	             saveImageAsJpg("C:\\vcredist.bmp",
	                     "C:\\3.png",
	                     440,440);
	         } catch(Exception e){
	             e.printStackTrace();
	         }

	     }
	     
	     
	     
	     
	     
	     
    public static void zoom(File srcFile, File destFile, int destWidth,int destHeight) {
	Color BACKGROUND_COLOR = Color.white;
	int DEST_QUALITY = 88;
	Graphics2D graphics2D = null;
	ImageOutputStream imageOutputStream = null;
	ImageWriter imageWriter = null;
	try {
	    BufferedImage srcBufferedImage = ImageIO.read(srcFile);
	    int srcWidth = srcBufferedImage.getWidth();
	    int srcHeight = srcBufferedImage.getHeight();
	    int width = destWidth;
	    int height = destHeight;
	    if (srcHeight >= srcWidth) {
		width = (int) Math.round(((destHeight * 1.0 / srcHeight) * srcWidth));
	    } else {
		height = (int) Math.round(((destWidth * 1.0 / srcWidth) * srcHeight));
	    }
	    BufferedImage destBufferedImage = new BufferedImage(destWidth, destHeight, BufferedImage.TYPE_INT_RGB);
	    graphics2D = destBufferedImage.createGraphics();
	    graphics2D.setBackground(BACKGROUND_COLOR);
	    graphics2D.clearRect(0, 0, destWidth, destHeight);
	    graphics2D.drawImage(srcBufferedImage.getScaledInstance(width, height, Image.SCALE_SMOOTH), (destWidth / 2) - (width / 2),(destHeight / 2) - (height / 2), null);

	    imageOutputStream = ImageIO.createImageOutputStream(destFile);
	    imageWriter = ImageIO.getImageWritersByFormatName(FilenameUtils.getExtension(destFile.getName())).next();
	    imageWriter.setOutput(imageOutputStream);
	    ImageWriteParam imageWriteParam = imageWriter.getDefaultWriteParam();
	    imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
	    imageWriteParam.setCompressionQuality((float) (DEST_QUALITY / 100.0));
	    imageWriter.write(null, new IIOImage(destBufferedImage, null, null), imageWriteParam);
	    imageOutputStream.flush();
	} catch (IOException e) {
	    e.printStackTrace();
	} finally {
	    if (graphics2D != null) {
		graphics2D.dispose();
	    }
	    if (imageWriter != null) {
		imageWriter.dispose();
	    }
	    if (imageOutputStream != null) {
		try {
		    imageOutputStream.close();
		} catch (IOException e) {
		}
	    }
	}
    }
}