package models;

import java.util.Date;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import play.db.jpa.JPABase;
import play.db.jpa.Model;
import play.mvc.Scope;

@MappedSuperclass
public class BaseModel extends Model{

	public Date created;	//创建时间
	public Date updated;	//更新时间
	public String creator;	//创建人

	@PrePersist
	@PreUpdate
	public void update_date() {
		if(created == null) created = new Date();
		updated = new Date();
		Scope.Session session = Scope.Session.current();
		if(creator==null)creator = session.get("truename");
	}
}
