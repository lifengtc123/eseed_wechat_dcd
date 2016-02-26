package utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import play.Logger;
import play.Play;
import play.mvc.Router;
import play.mvc.Scope;
import play.mvc.Http.Request;

/**
 * <p>
 * 用于保存分页信息和负责分页逻辑运算的类，这个类配合标签使用最佳！<br />
 * <b>这个类不是线程安全的</b>
 * </p>
 * 
 * 使用方法： <br />
 * PagedList&lt;Person&gt; pList=new PagedList&lt;Person&gt;();<br />
 * pList.setPageIndex();//当前页的页码<br />
 * pList.setPageSize();//每页的大小<br />
 * <br />
 * pList.setRowCount(dao.count(...));//获取数据库里的总记录数<br />
 * pList.setList(dao.list(...));//从数据库获取当前页的数据<br />
 * <br />
 * pList.addParam("category","5");//设置其他的url参数<br />
 * request.setAttribute("pagedList",pList);//放入request<br />
 * 至此，PagedList的数据填充就完成了，下一步是在JSP页面内做显示<br />
 * <br />
 * 使用标签的时候，只需要这样：<br />
 * &lt;ext:defaultPageBar pagedList="${pagedList}" pageIndexKey="pageIndex"
 * /&gt;
 * 
 * @author Jonney
 */
public class PagedList<E> {

	private int pageSize;		//每页显示记录数
	private int pageNumber;		//当前第几页
	private int pageCount;		//总的页数
	private long rowCount;		//总的记录数
	private String paramName;	//参数吗
	private List<E> list = new ArrayList<E>();
	private final Map<String, Object> viewParams;
	private final String action;
	private final String DEFAULT_PAGE_PARAM = "page";
	private final int DEFAULT_PAGE_SIZE = 15;
	
	public PagedList() {
		this.pageSize = DEFAULT_PAGE_SIZE;
		Request request = Request.current();
		if (request != null) {
			this.action = request.action;
		} else {
			this.action = null;
		}
		Scope.Params params = Scope.Params.current();
		this.viewParams = new HashMap<String,Object>();
		if (params != null) {
			setParameterName(Play.configuration.getProperty("paginator.parameter.name", DEFAULT_PAGE_PARAM));
			this.viewParams.putAll(params.allSimple());
		} else {
			this.paramName = DEFAULT_PAGE_PARAM;
		}
	}

	public void setParameterName(String paramName) {
		this.paramName = paramName;
		parsePageParameter();
	}
	
	private void parsePageParameter() {
		Scope.Params params = Scope.Params.current();
		String page = (String) params.get(paramName);
		if (page == null) {
			setPageNumber(1);
		} else {
			try {
				int pageNumber = Integer.parseInt(page);
				setPageNumber(pageNumber);
			} catch (Throwable t) {
				Logger.warn(t, "Error parsing page: %s", page);
			}
		}
	}
	
	public int getPageNumber() {
		return pageNumber + 1;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber - 1;
	}
	
	/**
	 * @return pageCount
	 */
	public int getPageCount() {
		return pageCount;
	}

	/**
	 * @return rowCount
	 */
	public long getRowCount() {
		return rowCount;
	}

	/**
	 * @param rowCount
	 *            要设置的 rowCount
	 */
	public void setRowCount(long rowCount) {
		this.rowCount = rowCount;
		pageCount = (int) (((rowCount + pageSize - 1) / pageSize));
		if(pageCount<=0){
			pageCount=1;
		}
		if (pageCount > 0 && pageNumber > pageCount) {
			pageNumber = pageCount;
		}
	}

	/**
	 * @return pageSize
	 */
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize){
		this.pageSize = pageSize;
	}
	
	/**
	 * @return list
	 */
	public List<E> getList() {
		return list;
	}

	/**
	 * @param list
	 *            要设置的 list
	 */
	public void setList(List<E> list) {
		this.list = list;
	}

	/**
	 * 取当前页的第一行数据在数据库中的行号，在操作数据库的时候有用
	 * 
	 * @return
	 */
	public int getFirstRowInThisPage() {
		return (getPageNumber() - 1) * pageSize;
	}

	/**
	 * 是否第一页
	 * 
	 * @return
	 */
	public boolean isFirstPage() {
		return getPageNumber() <= 1 ? true : false;
	}

	/**
	 * 是否最后一页
	 * 
	 * @return
	 */
	public boolean isLastPage() {
		return pageNumber >= pageCount ? true : false;
	}

	public boolean getHasPreviousPage() {
		return pageNumber != 0;
	}

	public boolean getHasNextPage() {
		return pageNumber < (getPageCount() - 1);
	}
	
	public String getCallbackURL(int page){
		viewParams.put(paramName, String.valueOf(page));
		return Router.reverse(action, viewParams).url;
	}
	
	public class Param {

		public String key;

		public String value;

		public Param(String key, String value) {
			this.key = key;
			this.value = value;
		}
	}
}
