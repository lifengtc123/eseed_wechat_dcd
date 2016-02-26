package utils;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import models.TreeModel;
import play.db.jpa.JPA;

public class ModelUtils {
	
	public static List find(String className,String defaultField,String search, String searchField, String orderBy, String order,String condition){
		boolean b = true;
		String q = "from "+className;
		if(search!=null && !search.equals("")){
			 String searchQuery = getSearchQuery(searchField,condition,defaultField);
			 if (!searchQuery.equals("")) {
                 q += " where (" + searchQuery + ")";
             }
			 b = getColumnType(className,searchField);
		}
        if (orderBy == null && order == null) {
            orderBy = "id";
            order = "ASC";
        }
        if (orderBy == null && order != null) {
            orderBy = "id";
        }
        if (order == null || (!order.equals("ASC") && !order.equals("DESC"))) {
            order = "ASC";
        }
        q += " order by " + orderBy + " " + order;
        Query query = JPA.em().createQuery(q);
        Object value = getColumnValue(className, searchField,search);
        if (search != null && !search.equals("") && q.indexOf("?1") != -1) {
        	if(condition.equals("like") && b)
        		query.setParameter(1, "%" + value + "%");
        	else
        		query.setParameter(1,  value);
        }
        return query.getResultList();
	}

	public static Long count(String className,String defaultField,String search, String searchField, String condition,String where) {
		boolean b = true;
		String q = "select count(id) from " + className + " e where  1=1";
		if (search != null && !search.equals("")) {
			String searchQuery = getSearchQuery(searchField,condition,defaultField);
			if (!searchQuery.equals("")) {
				q += " and (" + searchQuery + ")";
			}
			q += (where != null ? " and " + where : "");
			b = getColumnType(className,searchField);
		}else {
			q += (where != null ? " and " + where : "");
		}
		Query query = JPA.em().createQuery(q);
		Object value = getColumnValue(className, searchField,search);
		if (search != null && !search.equals("") && q.indexOf("?1") != -1) {
			if(condition.equals("like") && b) {
				query.setParameter(1, "%" + value + "%");
			}else
				query.setParameter(1, value);
		}
		return Long.decode(query.getSingleResult().toString());
	}
	 
	
	 public static List findPage(int firstResult,int pageLength,String className,String defaultField,String search, String searchField, String orderBy, String order,String condition,String where){
		 boolean b = true;
		 String q = "from "+className + " where 1=1";
		 if(search!=null && !search.equals("")){
			 String searchQuery = getSearchQuery(searchField,condition,defaultField);
			 if (!searchQuery.equals("")) {
				 q += " and (" + searchQuery + ")";
			 }
			 q += (where != null ? " and " + where : "");
			 b = getColumnType(className,searchField);
		 }else {
			 q += (where != null ? "  and " + where : "");
		 }
		 if (orderBy == null && order == null) {
			 orderBy = "id";
			 order = "DESC";
		 }
		 if (orderBy == null && order != null) {
			 orderBy = "id";
		 }
		 if (order == null || (!order.equals("ASC") && !order.equals("DESC"))) {
			 order = "DESC";
		 }
		 q += " order by " + orderBy + " " + order;
		 if(orderBy!=null &&!orderBy.contains("id")&& checkWhetherDate(className, orderBy)){
	        	q += ",id "+order;
	      }
		 Query query = JPA.em().createQuery(q);
		 Object value = getColumnValue(className, searchField,search);
		 if (search != null && !search.equals("") && q.indexOf("?1") != -1) {
			 if(condition.equals("like") && b) {
				 query.setParameter(1, "%" + value + "%");
			 }
			 else
				 query.setParameter(1,  value);
		 }
		 query.setFirstResult(firstResult);
		 query.setMaxResults(pageLength);
		 return query.getResultList();
	 }
	 
	public static String getSearchQuery(String searchField,String condition,String fields) {
        String q = "";
        if (searchField != null && !searchField.equals("")) {
        	if (!q.equals("")) {
                q += " or ";
            }
        	q += searchField + " " + condition + " ?1";
        }else{
        	String[] _fields = fields.substring(1,fields.length()-1).replaceAll("'", "").split(",");
        	for(String field : _fields){
        		if (!q.equals("")) {
                    q += " or ";
                }
        		q += field + " " + condition + " ?1";
        	}
        }
        return q;
    }
	
	public static String getTreeCid(Long id,String className,String pid,String oldpid,String cid){
		if(id==null){
			return getTreeCid(className,pid);
		}else{
			String q = "from "+className + " e where id = " + id;
			Query query = JPA.em().createQuery(q);
			Object object = query.getSingleResult();
			if(object!=null && object instanceof TreeModel) {
				TreeModel model = (TreeModel) object;
				if(oldpid.equals(model.pid)) return cid;
				return getTreeCid(className, pid);
			}
		}
		return "";
	}
	
	public static String getTreeCid(String className,String pid){
		String q = "select max(cid) from "+className + " e where e.pid = ?1";
		Query query = JPA.em().createQuery(q);
		query.setParameter(1, pid);
		Object result = query.getSingleResult();
		return MyUtils.tree_code(pid, result);
	}
	
	
	public static boolean getColumnType(String className,String column){
		String classPath = className.startsWith("models")?className:"models."+className;
		if(column!=null && !column.equals("")) {
			try {
				Class clazz = Class.forName(classPath);
				Field field = clazz.getDeclaredField(column);
				if(field!=null){
					if(field.getType() == Integer.class){
						return false;
					}
					if(field.getType() == Long.class){
						return false;
					}
					if(field.getType() == Double.class){
						return false;
					}
					if(field.getType() == Short.class){
						return false;
					}
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				//e.printStackTrace();
			}
		}
		return true;
	}
	
	public static Object getColumnValue(String className,String column,String value){
		String classPath = className.startsWith("models")?className:"models."+className;
		if(column!=null && !column.equals("")) {
			try {
				Class clazz = Class.forName(classPath);
				Field field = clazz.getDeclaredField(column);
				if(field!=null){
					if(field.getType() == Integer.class){
						return Integer.parseInt(value);
					}
					if(field.getType() == Long.class){
						return Long.parseLong(value);
					}
					if(field.getType() == Double.class){
						return Double.parseDouble(value);
					}
					if(field.getType() == Short.class){
						return Short.parseShort(value);
					}
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				//e.printStackTrace();
			}
		}
		return value;
	}
	
	public static boolean checkWhetherDate(String className,String column){
		String classPath = className.startsWith("models")?className:"models."+className;
		if(column!=null && !column.equals("")) {
			try {
				Class clazz = Class.forName(classPath);
				Field field = clazz.getDeclaredField(column);
				if(field!=null){
					if(field.getType() == Date.class){
						return true;
					}
					if(field.getType() == java.sql.Date.class){
						return true;
					}
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				//e.printStackTrace();
			}
		}
		return false;
	}
}
