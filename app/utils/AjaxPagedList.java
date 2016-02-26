package utils;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import com.google.gson.annotations.Until;

import play.db.jpa.JPA;
import play.db.jpa.Model;
import play.mvc.Scope;
import play.mvc.Http.Request;

/**
 * ajax分页回传的对象
 * 分页使用json，使用GSON解析，解析版本 1 以后 1版本为list的json解析，如果代码中有对象循环关联，使用@Until(1)去掉关联
 * @author LF
 *
 */
public class AjaxPagedList<E> {
	//这些是回传参数
	private Long iTotalRecords;  //整型	iTotalRecords	记录合计，过滤前（即数据库中的记录的总数）
	private Long iTotalDisplayRecords;  //记录合计，过滤后（即过滤后的记录总数已应用 - 在此结果集被返回的记录不只是数）
//	private Integer sEcho;  //sEcho的一个不变的副本，从客户端发送。该参数将与各拉伸改变（它基本上是平局计数） -因此，它是重要的，这是实现。请注意，它强烈建议出于安全原因，那你投'这个参数为整数，以防止跨站点脚本（XSS）攻击。
	private List<E> aaData;
	
	//获取的参数
	@Until(1)private Integer iColumns; //页面显示字段
	@Until(1)private Integer iDisplayStart; //数据集开始
	@Until(1)private Integer iDisplayLength; //每页显示数据数
	@Until(1)private String sSearch;  //搜索的参数
	//@Until(1)private Boolean bRegex;  //True如果全局过滤器应被视为一个正则表达式先进的过滤，否则为false。
	@Until(1)private List<String> mDataProps=new ArrayList<String>();  //列表字段
//	@Until(1)private List<String> sSearchs=new ArrayList<String>();  //组合搜索
	@Until(1)private List<Boolean> bSearchables=new ArrayList<Boolean>();  //各列是否搜索
//	@Until(1)private List<Boolean> bRegexs=new ArrayList<Boolean>();  //各列过滤的优先 
//	@Until(1)private List<Integer> iSortCols=new ArrayList<Integer>();  //排序
//	@Until(1)private List<String> sSortDirs=new ArrayList<String>();  //排序
//	@Until(1)private Integer iSortingCols;  //排序
	//@Until(1)private List<Boolean> bSortables=new ArrayList<Boolean>();;  //排序
	
	public AjaxPagedList(){
		Scope.Params params = Scope.Params.current();
		this.iDisplayStart = Integer.parseInt(params.get("iDisplayStart"));
		this.iDisplayLength = Integer.parseInt(params.get("iDisplayLength"));
		if(this.iDisplayLength==-1)this.iDisplayLength=null;
		this.sSearch = params.get("sSearch");
	//	this.bRegex = Boolean.parseBoolean(params.get("bRegex"));
		//this.sEcho=Integer.parseInt(params.get("sEcho"));
		this.iColumns=Integer.parseInt(params.get("iColumns"));
		for(int i=0;i<this.iColumns;i++){
			mDataProps.add(params.get("mDataProp_"+i));
	//		sSearchs.add(params.get("sSearch_"+i));
			bSearchables.add(Boolean.parseBoolean(params.get("bSearchable_"+i)));
		//	bSortables.add(Boolean.parseBoolean(params.get("bSortable_"+i)));
		}
//		this.iSortingCols=Integer.parseInt(params.get("iSortingCols"));
//		for(int i=0;i<this.iSortingCols;i++){
//			iSortCols.add(Integer.parseInt(params.get("iSortCol_"+i)));
//			sSortDirs.add(params.get("sSortDir_"+i));
//			bSearchables.add(Boolean.parseBoolean(params.get("bSearchable")));
//		}
	}
	public Long getiTotalRecords() {
		return iTotalRecords;
	}
	public void setiTotalRecords(Long iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}
	
	public Long getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}
	public void setiTotalDisplayRecords(Long iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}
//	public Integer getsEcho() {
//		return sEcho;
//	}
//	public void setsEcho(Integer sEcho) {
//		this.sEcho = sEcho;
//	}
	public List<E> getAaData() {
		return aaData;
	}
	public void setAaData(List<E> aaData) {
		this.aaData = aaData;
	}
	
	public Integer getiDisplayStart() {
		return iDisplayStart;
	}
	public void setiDisplayStart(Integer iDisplayStart) {
		this.iDisplayStart = iDisplayStart;
	}
	public Integer getiDisplayLength() {
		return iDisplayLength;
	}
	public void setiDisplayLength(Integer iDisplayLength) {
		this.iDisplayLength = iDisplayLength;
	}
	public String getsSearch() {
		return sSearch;
	}
	public void setsSearch(String sSearch) {
		this.sSearch = sSearch;
	}
//	public Boolean getbRegex() {
//		return bRegex;
//	}
//	public void setbRegex(Boolean bRegex) {
//		this.bRegex = bRegex;
//	}
	//查找数据
	public void find(String table,String where){
		 String q = "from "+table + " where 1=1";
		 if(this.sSearch!=null&&!this.sSearch.equals("")){
			 String s="";
			 for(int i=0;i<this.iColumns;i++){
				if(this.bSearchables.get(i)){
					if(s.equals(""))s=this.mDataProps.get(i)+" like ?1";
					else s+=" or "+this.mDataProps.get(i)+" like ?1";
				}
			}
			q+=" and ("+s+")";
		 }
//		 if(this.iSortingCols!=null&&this.iSortingCols>0){
//			 String order=" order by ";
//			 for(int i=0;i<this.iSortingCols;i++){
//				if(i!=0) order+=" ,";
//				order+=this.mDataProps.get(this.iSortCols.get(i))+" "+this.sSortDirs.get(i);
//			 }
//			 q+=order;
//		 }
		 if(where!=null) q+=" and "+where;
		 Query query = JPA.em().createQuery(q);
		 Query querycount=JPA.em().createQuery("select count(id) "+q);
		 if (this.sSearch!=null&&!this.sSearch.equals("")&& q.indexOf("?1") != -1) {
			query.setParameter(1, "%" + this.sSearch + "%");
			querycount.setParameter(1, "%" + this.sSearch + "%");
		 }
		 query.setFirstResult(this.getiDisplayStart());
		 
		 if(this.getiDisplayLength()!=null)query.setMaxResults(this.getiDisplayLength());
		 this.aaData=query.getResultList();
		this.iTotalRecords=this.iTotalDisplayRecords= Long.decode(querycount.getSingleResult().toString());
	}
}
