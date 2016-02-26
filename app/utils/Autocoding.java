package utils;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Query;

import play.db.jpa.JPA;



import models.*;

public class Autocoding {
	
	//生成单据编号20111228001
	public static String autocode(String tableName,String fields){
		String formatDate,initNumber,returnAN,returnNumber;
		int num;
		DateFormat df = new SimpleDateFormat("yyyyMMdd");  	
		formatDate = df.format(new Date());
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+formatDate+"%'  and (dr=0 or dr is null)  order by "+fields+" desc"; 
		//System.out.println("sql:"+sql);
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(8);
			num=Integer.parseInt(initNumber)+1;
		}
		String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
		returnNumber=formatDate+strnum;
		return returnNumber;
    }
	
	//生成单据编号 带头字母 CZ20111228001
	public static String autocode2(String qq,String tableName,String fields){
		String formatDate,initNumber,returnAN,returnNumber,formatDate2;
		int num;
		DateFormat df = new SimpleDateFormat("yyyyMMdd");  	
		formatDate = df.format(new Date());
		formatDate2 = qq + formatDate;
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+formatDate2+"%'  and (dr=0 or dr is null)  order by "+fields+" desc"; 
//		System.out.println("sql:"+sql);
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(qq.length()+8);
			num=Integer.parseInt(initNumber)+1;
		}
		String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
		returnNumber=qq+formatDate+strnum;
		return returnNumber;
	}
	
	//生成月考试批次2011120001
	public static String autocode3(String tableName,String fields){
		String formatDate,initNumber,returnAN,returnNumber;
		int num=1;
		DateFormat df = new SimpleDateFormat("yyyyMM");  	
		formatDate = df.format(new Date());
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+formatDate+"%' and (dr=0 or dr is null)  order by "+fields+" desc"; 
//		System.out.println("sql:"+sql);
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(6);
			if(!initNumber.equals("")){
				num=Integer.parseInt(initNumber)+1;
			}
		}
		String strnum="";
		if (num<10) {
			strnum="000"+num;
		}else if (num<100) {
			strnum="00"+num;
		}else if(num<1000) {
			strnum="0"+num;
		}else {
			strnum=num+"";
		}
//		strnum=num<10?("000"+num):((num<100)?("00"+num):(num+""));
		returnNumber=formatDate+strnum;
		return returnNumber;
    }
	
	
	//生成班级编号 工种编号+日期编号 011201112001
	public static String autocode4(String qq,String tableName,String fields){
		String formatDate,initNumber,returnAN,returnNumber,formatDate2;
		int num=1;
		DateFormat df = new SimpleDateFormat("yyyyMM");  	
		formatDate = df.format(new Date());
		formatDate2 = qq + formatDate;
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+formatDate2+"%' and (dr=0 or dr is null)  order by "+fields+" desc"; 
//		System.out.println("sql:"+sql);
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(qq.length()+6);
			if(!initNumber.equals("")){
			num=Integer.parseInt(initNumber)+1;
			}
		}
		String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
		returnNumber=qq+formatDate+strnum;
		return returnNumber;
	}
	//生成单据编号20111201
	public static String autocode5(String tableName,String fields){
		String formatDate,initNumber,returnAN,returnNumber;
		int num;
		DateFormat df = new SimpleDateFormat("yyyyMM");  	
		formatDate = df.format(new Date());
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+formatDate+"%' and (dr=0 or dr is null) order by "+fields+" desc"; 
		//System.out.println("sql:"+sql);
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(6);
			num=Integer.parseInt(initNumber)+1;
		}
		String strnum=num<1?("00"+num):((num<10)?("0"+num):(num+""));
		returnNumber=formatDate+strnum;
		return returnNumber;
    }
	//生成班级批次号   李健
	public static String autocode6(String gonghao,String tableName,String fields){
		String formatDate,returnNumber,returnAN,initNumber;
		int num;
		DateFormat df = new SimpleDateFormat("yyyy");  	
		formatDate = df.format(new Date());
		returnNumber = gonghao+formatDate;
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+returnNumber+"%'  and (dr=0 or dr is null)  order by "+fields+" desc"; 
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(7,10);
			num=Integer.parseInt(initNumber)+1;
		}
		String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
		returnNumber=gonghao+formatDate+strnum;
		return returnNumber;
	}
	//生成资格证号20120222   张利龙
	public static String autocode7(String pname,String tableName,String fields){
		String formatDate,returnNumber,returnAN,initNumber;
		int num;
		DateFormat df = new SimpleDateFormat("yyyy");  	
		formatDate = df.format(new Date());
		returnNumber = pname+formatDate;
		String sql = "select "+fields+" from "+tableName+" where "+fields+" like '"+returnNumber+"%'  and (dr=0 or dr is null)  order by "+fields+" desc"; 
		Query query = JPA.em().createQuery(sql);
		if(query.getResultList().isEmpty()){
			num=1;
		}else{
			returnAN=(String) query.getResultList().get(0);
			initNumber=returnAN.substring(7,12);
			num=Integer.parseInt(initNumber)+1;
		}
		
		String strnum="";
		if (num<10) {
			strnum="0000"+num;
		}else if (num<100) {
			strnum="000"+num;
		}else if(num<1000) {
			strnum="00"+num;
		}else if(num<10000){
			strnum="0"+num;
		}else {
			strnum=num+"";
		}
			
		
//		String strnum=num<10?("00"+num):((num<100)?("0"+num):(num+""));
		returnNumber=pname+formatDate+strnum;
		return returnNumber;
	}
	
}

