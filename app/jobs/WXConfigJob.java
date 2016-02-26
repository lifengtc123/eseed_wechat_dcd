package jobs;

import controllers.weixin.WXUtils;
import models.WXConfig;
import play.jobs.Every;
import play.jobs.Job;
import play.libs.WS;
import play.libs.WS.HttpResponse;

/*
 * 每隔7200s重新获取一下access_token
 */
@Every("7000s")
public class WXConfigJob extends Job {
	
	@Override
	public void doJob(){
		WXConfig config = WXConfig.find("").first();
		config=WXUtils.getAccess_token(config,"job.WXConfigJob.doJob()");  //刷新token
	}
}
