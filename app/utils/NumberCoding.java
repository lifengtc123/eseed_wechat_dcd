package utils;

import java.util.Date;

public class NumberCoding {
	public static String getPswd(){
		StringBuffer buf = new StringBuffer("a,b,c,d,e,f,g,h,i,g,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z");
		buf.append(",1,2,3,4,5,6,7,8,9,0");
		String[] arr = buf.toString().split(",");
		StringBuffer b = new StringBuffer();
		java.util.Random r;
		int k ;
		for(int i=0;i<5;i++){
			 r = new java.util.Random();
			 k = r.nextInt();
			 b.append(String.valueOf(arr[Math.abs(k % 36)]));
		}
		return b.toString();
	}
	public static String replyNumber(String type){
		return type+DateUtils.format(new Date(),"yyMMdd")+getPswd();
	}
}
