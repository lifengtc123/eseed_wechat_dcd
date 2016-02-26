package models;

import java.util.List;

import javax.persistence.Entity;

import play.db.jpa.Model;
import utils.ModelUtils;
import utils.PagedList;
/**
 * 配置类（微信支付配置、查询接口配置）
 * @author Administrator
 *
 */
public class Configs{

	private String paternerKey;//paternerKey(密钥)： ningboyisaidekeji8888888yidakeji
	private String appId;//APPID:wx68b779ee1d32b13b
	private String mch_id;//微信支付商户号:1226277702
	private String cheappId;//联系车首页获取471
	private String cheappKey;////联系车首页获取84a67445a5c68d9ff442272fd201e9c3
	/**
	 * 获得APIkey paternerKey(密钥)
	 * @return paternerKey
	 */
	public String getPaternerKey() {
		//return "dukeqichedukeqiche88888888888888";  //违章
		return "ningboyisaidekeji8888888yidakeji";  //公司
	}
	/**
	 * 获得APPID
	 * @return APPID
	 */
	public String getAppId() {
		
		//return "wx0336bc76b33b556f";   //违章
		return "wx68b779ee1d32b13b";   //公司
	}
	/**
	 * 获得微信支付商户号
	 * @return Mch_id
	 */
	public String getMch_id() {
		//return "1227033902";   //违章
		return "1226277702";   //公司
	}
	/**
	 * 获取查询的违章接口的appid
	 * @return appid
	 */
	public String getCheappId() {
		return cheappId="471";
	}
	/**
	 * 获取查询的违章接口的appKey
	 * @return appKey
	 */
	public String getCheappKey() {
		return cheappKey="84a67445a5c68d9ff442272fd201e9c3";
	}
}