package utils;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

import com.sun.org.apache.bcel.internal.generic.NEW;

public class DESUtils {
	/*	public static void main(String [] args) throws ParseException{

	System.out.println(convertZoneTime("GMT -8:00",new Date()));
}*/
	private static final String PASSWORD_CRYPT_KEY="DES";//自定义秘钥
	public static String decrypt(String data,String key,String encode) throws Exception{
		byte[] bytesrc =convertHexString(data);
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		DESKeySpec desKeySpec = new DESKeySpec(MD5.hash(key).substring(0,8).getBytes("UTF-8"));
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
		SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
		IvParameterSpec iv = new IvParameterSpec(MD5.hash(key).substring(0,8).getBytes("UTF-8"));
		cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);
        byte[] retByte = cipher.doFinal(bytesrc); 
        return new String(retByte,encode); 
	}

	private static byte[] convertHexString(String data) {
		byte[] digest=new byte[data.length()/2];
		for(int i=0;i<digest.length;i++){
			String str=data.substring(2*i,2*i+2);
			int value=Integer.parseInt(str,16);
			digest[i]=(byte)value;
		}
		return digest;
	}
	public static byte[] encrypt(String message, String key) throws Exception {
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		DESKeySpec desKeySpec = new DESKeySpec(key.getBytes("UTF-8"));
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");  
		SecretKey secretKey = keyFactory.generateSecret(desKeySpec);    
		IvParameterSpec iv = new IvParameterSpec(key.getBytes("UTF-8")); 
		cipher.init(Cipher.ENCRYPT_MODE, secretKey, iv);   
		return cipher.doFinal(message.getBytes("UTF-8"));   
	} 

	public static String encrypt(String value){ 
		String result=""; 
		try{  value=java.net.URLEncoder.encode(value, "utf-8"); 
		result=toHexString(encrypt(value, PASSWORD_CRYPT_KEY)).toUpperCase();
		}catch(Exception ex){   
			ex.printStackTrace();    return ""; 
		} 
		return result;  
	} 

	public static String toHexString(byte b[]) {
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < b.length; i++) {   
			String plainText = Integer.toHexString(0xff & b[i]); 
			if (plainText.length() < 2)      
				plainText = "0" + plainText; 
			hexString.append(plainText); 
		}          
		return hexString.toString(); 
	}
	
	
	
	/**
	 * 加密
	 * @param message(需要加密的字段)
	 * @param key(密钥)
	 * @return
	 */
	public static String getPas(String message,String key){
		try {
			byte[] bt=encrypt(message,MD5.hash(key).substring(0,8));
			return toHexString(bt);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}//加密
		return null;
	}
	
	/**
	 * 解密
	 * @param message(加密后的的字段)
	 * @param key(密钥)
	 * @return
	 */
	public static String removePas(String message,String key){
		byte[] bt=message.getBytes();
		try {

			String value=decrypt(message,key,"UTF-8");
			return value;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
