package controllers;

import java.util.List;

import models.Word;
import models.WordType;
import utils.PagedList;

public class Words extends Application{

	
	public static void index() {
		render();
	}
	
	public static void left(){
		List<WordType> list = WordType.find("flag=1 order by sort ").fetch();
		render(list);
	}
	
	public static void list(String orderBy,String order) {
		PagedList<Word> pagedList = new PagedList<Word>();
		pagedList.setPageSize(Integer.parseInt(session.get("pageSize")));
		if(params.get("pid")==null){
			Word.findPage(pagedList,params.get("search"), params.get("field"), orderBy, order, params.get("condition"),null);
		}else{
			String where = "wordType.id = " + params.get("pid");
			Word.findPage(pagedList,params.get("search"), params.get("searchField"), orderBy, order, params.get("condition"),where);
		}
		render(pagedList,orderBy,order);
	}
	
	public static void blank() {
		Word object = new Word();
		Long pid = params.get("pid",Long.class);
		List<Word> words = null;
		if(pid!=null){
			WordType wordType = WordType.findById(pid);
			if(wordType!=null){
				wordType = wordType.parent();
				if(wordType!=null)words = Word.find("wordType.id=?",wordType.id).fetch();
			}
		}
		render(object,words);
	}
	
	public static void create() {
		Word object = new Word();
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			render("@blank",object);
		}
		object.save();
		result("保存字典数据成功","保存字典数据单成功!","/words/blank",true);
	}
	
	public static void show(long id) {
		Word object = Word.findById(id);
		notFoundIfNull(object);
		List<Word> words = null;
		if(object.word!=null){
			words = Word.find("wordType.id=?",object.word.id).fetch();
		}
		render(object,words);
	}
	
	public static void detail(long id) {
		Word object = Word.findById(id);
		notFoundIfNull(object);
		List<Word> words = null;
		if(object.word!=null){
			words = Word.find("wordType.id=?",object.word.id).fetch();
		}
		render(object,words);
	}
	
	public static void save(Long id) {
		Word object = Word.findById(id);
		validation.valid(object.edit("object", params.all()));
		if(validation.hasErrors()){
			render("@show",object);
		}
		object.save();
		result("保存字典数据成功","保存字典数据成功!","/words/blank",true);
	}
	
	public static void delete(Long id,Long[] arrayid) {
		if(arrayid!=null && arrayid.length > 0){
			for(long _id : arrayid){
				Word word= Word.findById(_id);
				if(word!=null) word.delete();
			}
		}else if(id!=null){
			Word word= Word.findById(id);
			if(word==null){ flash.error("记录不存在，删除数据失败!"); list(null,null);}
			word.delete();
		}
		flash.success("删除数据成功!");
		list(null,null);
	}
	
	public static void get_change_value(long id) {
		WordType wordType = WordType.findById(id);
		if(wordType!=null){
			wordType = wordType.parent();
			if(wordType!=null){
				List<Word> words = Word.find("wordType.id=?",wordType.id).fetch();
				renderJSON(words);
			}
		}
		renderJSON("");
	}
	
	public static void get_words(long id){
		List<Word> words = Word.find("word.id=?",id).fetch();
		renderJSON(words);
	}
}
