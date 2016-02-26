package jobs;

import java.util.List;

import models.Imagetext;
import models.Newsinfo;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

/**
 * 初始化新增的参数。项目运行的时候执行一次
 * @author blackboy2015
 *
 */
@OnApplicationStart
public class InitParams extends Job {
	@Override
	public void doJob(){
		List<Imagetext> imagetexts = Imagetext.find("status is NULL or type is NULL or classic is NULL").fetch();
		for (Imagetext imagetext : imagetexts) {
			imagetext.status=0;
			imagetext.type=0;
			imagetext.classic=0;
			imagetext.save();
		}
		
		List<Newsinfo>  newsinfos = Newsinfo.find("classic is NULL").fetch();
		for (Newsinfo newsinfo : newsinfos) {
			newsinfo.classic=0;
			newsinfo.save();
		}
	}
}
