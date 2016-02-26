package models;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import play.db.jpa.JPABase;
import play.db.jpa.Model;
import utils.ModelUtils;

@MappedSuperclass
public class TreeModel extends Model{

	public String name;
	public String cid;
	public String pid;
	public String oldpid;
	
	@PrePersist
	@PreUpdate
	public void beforeSave() {
		cid = ModelUtils.getTreeCid(id,this.getClass().getName(),pid,oldpid,cid);
		oldpid = pid;
	}
}
