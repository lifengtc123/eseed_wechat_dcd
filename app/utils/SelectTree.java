package utils;

import java.util.List;


public class SelectTree {

	private Long id;
	private String name;
	private String pid;
	private String cid;
	private List<SelectTree> childTree;
	private String selectTree;
	
	public SelectTree() {}
	
	public SelectTree(Long id,String name,String pid,String cid) {
		this.id = id;
		this.name = name;
		this.pid = pid;
		this.cid = cid;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public List<SelectTree> getChildTree() {
		return childTree;
	}

	public void setChildTree(List<SelectTree> childTree) {
		this.childTree = childTree;
	}

	public String getSelectTree() {
		return selectTree;
	}

	public void setSelectTree(String selectTree) {
		this.selectTree = selectTree;
	}
	

}
