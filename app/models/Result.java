package models;

import java.util.ArrayList;
import java.util.List;

public class Result {

	private String title;
	private String message;
	private List<Link> links = new ArrayList<Link>();;

	public Result(String title,String message) {
		this.title = title;
		this.message = message;
	}
	
	public void addLink(String name,String url){
		Link link = new Link(name,url);
		links.add(link);
	}
	
	public String getTitle() {
		return title;
	}

	public String getMessage() {
		return message;
	}

	public List<Link> getLinks() {
		return links;
	}
	
	class Link {
		private String name;
		private String url;

		public Link(String name,String url) {
			this.name = name;
			this.url = url;
		}
		
		public String getName() {
			return name;
		}

		public String getUrl() {
			return url;
		}
	}
	
}
