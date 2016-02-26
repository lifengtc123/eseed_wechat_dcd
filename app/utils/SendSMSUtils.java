package utils;

import play.libs.WS;
import play.libs.WS.HttpResponse;

public class SendSMSUtils {
	
	/**
	 * @shixy
	 * 发送信息
	 */
	public static void sendSMS(String sendURL,String account,String password,String mobile,String content,String sendTime){
		String url = sendURL+ "/sms.aspx?action=send&userid=827&account="+account+"&password="+password+"&mobile="+mobile+"&content="+content+"&sendTime="+sendTime;
		HttpResponse res = WS.url(url).get();
	}
	
}
