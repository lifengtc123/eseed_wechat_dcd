package results;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.codec.net.URLCodec;

import play.exceptions.UnexpectedException;
import play.mvc.Http.Request;
import play.mvc.Http.Response;
import play.mvc.results.Result;
 
public class RenderExcel extends Result{
	
	private static URLCodec encoder = new URLCodec();
	private File file;
	private String name;
	
	public RenderExcel(File file) {
		this.file = file;
		this.name = file.getName();
	}
	
	public RenderExcel(File file,String name){
		this.file = file;
		this.name = name;
	}
	
	@Override
	public void apply(Request request, Response response) {
		try {
			response.setHeader("Content-Disposition", "attachment; filename=" + encoder.encode(name, "utf-8"));
			response.setHeader("Content-Length", file.length()+ "");
			response.setHeader("Content-Transfer-Encoding","binary");   
			response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");        
			response.setHeader("Pragma", "public");   
			response.direct = file;
		} catch (Exception e) {
			throw new UnexpectedException(e);
		}
	}

}
