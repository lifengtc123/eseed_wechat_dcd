package utils;

import java.util.Map;

public class MyUtils {

	public static String tree_code(String pid,Object cid) {
		if(cid == null){
			return "0".equals(pid) ? "001" : pid+"001";
		}
		String code = cid.toString();
		if("0".equals(code))return pid+"001";
		String cidfirst = code.substring(0, code.length() - 3);
		String cidend = code.substring(code.length() - 3, code.length());
		Integer icid = Integer.parseInt(cidend); 
		icid += 1;
		String cidresult = String.valueOf(icid);
		int i = 3 - cidresult.length();
		for (int j = 0; j < i; j++) {
			cidresult = "0" + cidresult;
		}
		return cidfirst + cidresult;
	}
	
	public static String get_list_table_head(){
		StringBuffer sb = new StringBuffer("<form action=\"@@{delete()}\" method=\"post\" onsubmit=\"return chk_arrayid();\">\r\n");
		sb.append("<table height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" border=\"0\" class=\"t0\">\r\n");
		sb.append("<tbody><tr><td valign=\"top\" align=\"middle\" width=\"100%\" height=\"100%\">\r\n");
		sb.append("<div style=\"height:400px;overflow: auto;\">\r\n");
		sb.append("<table class=\"t1\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
		sb.append("<thead>\r\n");
		return sb.toString();
	}
	
	public static String get_blank_table_head(){
		StringBuffer sb = new StringBuffer("#{form @@create()}\r\n");
		sb.append("<div class=\"form\">\r\n");
		return sb.toString();
	}
	
	public static String get_show_table_head(Map<String,Object> map){
		StringBuffer sb = new StringBuffer("#{form @@save("+map.get("model_lower")+"?.id)}\r\n");
		sb.append("<div class=\"form\">\r\n");
		return sb.toString();
	}
	
	public static String get_detail_table_head(){
		StringBuffer sb = new StringBuffer();
		sb.append("<div class=\"form\">\r\n");
		return sb.toString();
	}
}
