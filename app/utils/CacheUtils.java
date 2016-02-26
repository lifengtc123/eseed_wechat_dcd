package utils;


import java.util.Date;

import models.Customerinfo;
import models.Imagetext;
import models.WXConfig;
import play.cache.Cache;
import play.mvc.results.NotFound;

import com.sun.org.apache.bcel.internal.generic.NEW;
/**
 * 缓存相关
 * @author Administrator
 *
 */
public class CacheUtils {
	/**
	 * 获得微信配置 licen
	 * @return
	 */
	public static WXConfig getWXConfig(){
		//Cache.delete("WXConfig");
		WXConfig config=null;
		if(Cache.get("WXConfig")!=null){
			config=(WXConfig)Cache.get("WXConfig",WXConfig.class);
			if(config==null){
				config=WXConfig.find("").first();
			}
		}else{
			config=WXConfig.find("").first();
		}
		Cache.set("WXConfig", config,"7000s");
		return config;
	}
	/**
	 * 根据id获得新闻信息licen 并设置缓存3h  key为Imagetext_+id
	 * @param id 资讯id
	 * @return 资讯
	 */
	public static Imagetext getImagetext(Long id){
		Imagetext imagetext=null;
		if(Cache.get("Imagetext_"+id)!=null){
			imagetext=(Imagetext)Cache.get("Imagetext_"+id,Imagetext.class);
			if(imagetext==null){
				imagetext=Imagetext.findById(id);
			}
		}else{
			imagetext=Imagetext.findById(id);
		}
		Cache.set("Imagetext_"+imagetext.id, imagetext,"3h");
		return imagetext;
	}
//	/**
//	 * 获得订单号 licen
//	 */
//	public static String getOrderNumber(){
//		//-------------订单编号-----------------
//		String orderNumber="";
//		orderNumber=  (String) Cache.get("OrderNumber");
//		String date = DateUtils.format(new Date(), "yyyyMMdd");
//		if(orderNumber==null||"".equals(orderNumber.trim())){
//			Orderinfo orderinfo=Orderinfo.find("number like '"+date+"%' order by id desc").first();
//			if(orderinfo!=null&&orderinfo.number!=null){
//				int num=1;
//				String dbnum=orderinfo.number;
//				if(dbnum.substring(0, 8).equals(date)){
//					num=Integer.parseInt(dbnum.substring(8, 11))+1;
//				}
//				String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
//				orderNumber=date+strnum;
//			}else{
//				orderNumber=date+"001";
//			}
//		}else{
//			if(orderNumber.indexOf(date)!=-1){
//				Integer num=Integer.parseInt(orderNumber.substring(8, 11))+1;
//				String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
//				orderNumber=date+strnum;
//			}else{
//				orderNumber=date+"001";
//			}
//		}
//		Cache.set("OrderNumber", orderNumber);
//		//System.out.println("orderNumber:"+orderNumber);
//		return orderNumber;
//	}
	/**
	 * 获得客户号 licen
	 */
	public static String getCustomerNumber(){
		//-------------客户编号-----------------
		String customerNumber=  (String) Cache.get("CustomerNumber");
		if(customerNumber==null||"".equals(customerNumber.trim())){
			Customerinfo customerinfo=Customerinfo.find("1=1 order by id desc").first();
			
			if(customerinfo!=null&&customerinfo.number!=null){
				customerNumber=customerinfo.number;
			}else{
				customerNumber="1001000";
			}
		}
		Integer num=Integer.parseInt(customerNumber)+1;
		customerNumber=num.toString();
		Cache.set("CustomerNumber",customerNumber);
		//System.out.println("CustomerNumber:"+customerNumber);
		return customerNumber.trim();
	}

}
