package utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * <p>
 * 一个用来存储并处理Action操作流程结果的类<br />
 * <b>这个类不是线程安全的</b>
 * </p>
 * <p>
 * 这个类必须配合一个JSP页面来显示操作结果
 * </p>
 * <b>如果不需要显示操作结果而直接redirect，不需要使用这个类</b>
 * 
 * @author Jonney
 */
public class Result1 {
	/**
	 * 日志记录器
	 */
	private static final Log log = LogFactory.getLog(Result1.class);

	private static final String NO_RESULT_MESSAGE = StringEscapeUtils.escapeJava("服务端发生了错误");

	private String title;
	
	/**
	 * 操作结果
	 */
	private String message;

	/**
	 * 装跳转链接的列表
	 */
	private List<Map<String, String>> links;

	private String jumpName = "";

	private int jumpTime = 0;

	public Result1() {
		this.message = "";
		this.links = new ArrayList<Map<String, String>>();
	}

	public Result1(String result) {
		this.message = result;
		this.links = new ArrayList<Map<String, String>>();
	}

	public Result1(String result, List<Map<String, String>> links) {
		this.message = result;
		this.links = links;
	}

	public String getTitle() {
		if(StringUtils.isEmpty(title)){
			return "信息";
		}
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @param message
	 *            要设置的 message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * 返回操作结果信息
	 * 
	 * @return 操作结果信息
	 */
	public String getMessage() {
		return this.message;
	}

	/**
	 * 添加一个跳转链接
	 * 
	 * @param linkName
	 *            跳转链接的文字
	 * @param linkUrl
	 *            跳转链接的url
	 */
	public void addLink(String linkName, String linkUrl) {

		Map<String, String> m = new HashMap<String, String>(2);
		m.put("linkName", linkName);
		m.put("linkUrl", linkUrl);
		links.add(m);
	}

	/**
	 * 添加一个跳转链接，页面会在指定的若干秒之后自动跳转到这个链接指向的页面。<br />
	 * 如果多次调用这个方法，只有最后一次的调用生效。<br />
	 * 如果设置的跳转时间为0，则表示不自动跳转。
	 * 
	 * @param linkName
	 *            跳转链接的文字
	 * @param linkUrl
	 *            跳转链接的url
	 * @param seconds
	 *            指定的等待跳转的时间
	 */
	public void setJumpLink(String linkName, String linkUrl, int seconds) {

		Map<String, String> m = new HashMap<String, String>(2);
		m.put("linkName", linkName);
		m.put("linkUrl", linkUrl);
		this.jumpName = linkName;
		this.jumpTime = seconds;
		links.add(m);
	}

	/**
	 * 设置导航链接的List
	 * 
	 * @param links
	 *            导航链接的List
	 */
	public void setLinks(List<Map<String, String>> links) {
		this.links = links;
	}

	/**
	 * 返回导航链接的List
	 * 
	 * @return 导航链接的List
	 */
	public List<Map<String, String>> getLinks() {
		return this.links;
	}

	public String getJumpName() {
		return jumpName;
	}

	public void setJumpName(String jumpName) {
		this.jumpName = jumpName;
	}

	public int getJumpTime() {
		return jumpTime;
	}

	public void setJumpTime(int jumpTime) {
		this.jumpTime = jumpTime;
	}

	/**
	 * 以操作结果和跳转链接为parameters生成一个url,做redirect用
	 * 
	 * @param resultPage
	 *            要跳去的那个页面
	 * @return 要的url
	 */
	public String getUrlParams() {

		StringBuilder url = new StringBuilder();
		url.append("message=");
		url.append(StringEscapeUtils.escapeJava(message));
		url.append("&jumpName=");
		url.append(StringEscapeUtils.escapeJava(jumpName));
		url.append("&jumpTime=");
		url.append(String.valueOf(jumpTime));
		for (Map<String, String> m : links) {
			url.append("&");
			url.append("linkName=");
			try {
				url.append(StringEscapeUtils.escapeJava(URLEncoder.encode(m.get("linkName"),
						"utf-8")));
			} catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}
			url.append("&");
			url.append("linkUrl=");
			try {
				url.append(StringEscapeUtils.escapeJava(URLEncoder
						.encode(m.get("linkUrl"), "utf-8")));
			} catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}
		}
		return url.toString();
	}

	/**
	 * 接收操作结果信息
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @return 操作结果
	 * @throws UnsupportedEncodingException
	 */
	private static String getMessageFromServletRequest(HttpServletRequest req) {

		return StringEscapeUtils.unescapeJava(getStringParameter(req,"message", NO_RESULT_MESSAGE));
	}

	/**
	 * 接收自动跳转的链接
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @return 自动跳转的链接
	 * @throws UnsupportedEncodingException
	 */
	private static String getJumpNameFromServletRequest(HttpServletRequest req) {

		return StringEscapeUtils.unescapeJava(getStringParameter(req,"jumpName", NO_RESULT_MESSAGE));
	}

	/**
	 * 接收自动跳转的时间
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @return 自动跳转的时间
	 * @throws UnsupportedEncodingException
	 */
	private static int getJumpTimeFromServletRequest(HttpServletRequest req) {

		return NumberUtils.toInt(StringEscapeUtils.unescapeJava(getStringParameter(req, "jumpTime", NO_RESULT_MESSAGE)));
	}

	/**
	 * 接收跳转链接
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @return 跳转链接列表
	 * @throws UnsupportedEncodingException
	 */
	private static List<Map<String, String>> getLinksFromServletRequest(HttpServletRequest req) {

		// 接收操作结果
		String[] linkContents = getStringParameters(req, "linkName");
		String[] linkUrls = getStringParameters(req, "linkUrl");

		// 接收链接
		List<Map<String, String>> resultLinkList = new ArrayList<Map<String, String>>(
				linkContents.length);
		try {
			for (int i = 0; i < linkContents.length; i++) {
				HashMap<String, String> m = new HashMap<String, String>(2);
				m.put("linkName", StringEscapeUtils.unescapeJava(linkContents[i]));
				m.put("linkUrl", linkUrls[i]);
				resultLinkList.add(m);
			}
		} catch (ArrayIndexOutOfBoundsException e) {
			log.warn("URI: " + req.getRequestURI() + " ,IP: " + req.getRemoteAddr(), e);
		}
		return resultLinkList;
	}

	/**
	 * 从HttpServletRequest里面获得Result实例
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @return 新的Result
	 */
	public static Result1 getInstanceFromServletRequest(HttpServletRequest req) {
		Result1 r = new Result1(getMessageFromServletRequest(req), getLinksFromServletRequest(req));
		r.setJumpName(getJumpNameFromServletRequest(req));
		r.setJumpTime(getJumpTimeFromServletRequest(req));
		return r;
	}

	
	public static String getStringParameter(HttpServletRequest req,String parameter,String message){
		String returnMessage=(String) req.getAttribute(parameter);
		if(StringUtils.isEmpty(message)){
			return message;
		}else{
			return returnMessage;
		}
	}
	
	public static String[] getStringParameters(HttpServletRequest req,String parameter){
		return req.getParameterValues(parameter);
	}
	
	public static void main(String[] args) {
		Result1 r = new Result1("错误");
		r.addLink("s", "s");
		// r.setJumpLink("jumpName", "javascript:alert('hello')", 5);

		System.out.println(r.getUrlParams());
	}

}