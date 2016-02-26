package utils;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class Dom4jUtils {

	/**
	 * 获得指定xml节点的值
	 * @param xml xml字符串
	 * @param nodeName 节点名称
	 * @return
	 */
	public static String readStringXml(String xml, String nodeName) {
		String nodeValue = null;
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml); // 将字符串转为XML

			Element rootElt = doc.getRootElement(); // 获取根节点
			
			Iterator iter = rootElt.elementIterator(nodeName);
			
			while (iter.hasNext()) {

				Element recordEle = (Element) iter.next();
				nodeValue = recordEle.getStringValue();
			}

		} catch (DocumentException e) {
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();

		}
		return nodeValue;
	}

	public static void main(String[] args) {

		// 下面是需要解析的xml字符串例子
		String xmlString = "<xml>" + "<ToUserName>"
				+ "<![CDATA[gh_186e4f3247b3]]>" + "</ToUserName>"
				+ "<FromUserName>" + "<![CDATA[o7dfojkGwHGyu4lbYC2j2buirRSA]]>"
				+ "</FromUserName>" + "<CreateTime>1405404581</CreateTime>"
				+ "<MsgType><![CDATA[event]]></MsgType>"
				+ "<Event><![CDATA[CLICK]]></Event>"
				+ "<EventKey><![CDATA[001002click]]></EventKey>" + "</xml>";

		Dom4jUtils test = new Dom4jUtils();
		System.out.println(test.readStringXml(xmlString, "Event"));

	}

}