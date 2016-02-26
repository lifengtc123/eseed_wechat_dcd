package utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Query;

import models.BaseModel;
import play.data.binding.Binder;
import play.db.jpa.JPA;
import play.db.jpa.Model;
import play.exceptions.UnexpectedException;
import play.mvc.Scope.Params;

public class ParamUtils {

	public static <T> List<T> getAllList(Class<T> o,String name,Params params) {
		List<T> result =new ArrayList<T>();
		try{
		List<String> names = new ArrayList<String>();
		Set<Field> fields = new HashSet<Field>();
		Field fid = null;
		Collections.addAll(fields, o.getDeclaredFields());
        for(Field field : fields){
        	names.add(field.getName());
        }
        Class clazz = o.getSuperclass();
        if(clazz.equals(BaseModel.class)){
        	clazz = clazz.getSuperclass();
        }
        if(clazz.equals(Model.class)){
        	fid = clazz.getField("id");
        }
        int len = 0 ;
        for (int i =0 ;i< names.size();i++) {
        	String key = name+"."+names.get(i);
        	String[] values = params.getAll(key);
        	if(values!=null && values.length > 0){
        		len = values.length;
        	}
		}
        for(int i=0;i<len;i++){
        	Object instance = null;
        	if(fid!=null){
	        	String key = name+".id";
	        	String[] values = params.getAll(key);
	        	String value = "";
	        	if(i<values.length){
	        		value=values[i];
	        	}
	        	if(value!=null&&!value.equals("")){
	        		Query query = JPA.em().createQuery("from " + o.getName() + " where id = ?");
	        		query.setParameter(1, Binder.directBind(value, fid.getType()));
	        		instance = query.getSingleResult();
	        	}
        	}
        	if(instance==null)instance = o.newInstance();
        	for (int j =0 ;j< names.size();j++) {
        		String column = names.get(j);
            	String key = name+"."+column;
            	String[] values = params.getAll(key);
            	if(values!=null){
            		for(Field field : fields){
                    	if(field.getName().equals(column)){
                    		String value = null;
                    		if(i<values.length){
                    			value = values[i];
                    		}
                    		field.set(instance, Binder.directBind(value, field.getType()));
                    		break;
                    	}
                    }
            	}
    		}
        	result.add((T) instance);
        }
        }catch (Exception e) {
        	throw new UnexpectedException(e);
		}
        return result;
	}
}
