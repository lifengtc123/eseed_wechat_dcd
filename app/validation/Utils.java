package validation;

import java.io.File;
import java.util.Date;
import play.Play; 
import play.libs.Files;
import utils.DateUtils;


public class Utils {

	public static String tree_code(String pid,Object cid) {
		if(cid == null){
			return "0".equals(pid) ? "001" : pid+"001";
		}
		String code = cid.toString();
		if("0".equals(code))return pid+"001";
		String cidfirst = code.substring(0, code.length() - 3);
		String cidend = code.substring(code.length() - 3, code.length());
		Integer icid = Integer.parseInt(cidend); 
		icid += 1;
		String cidresult = String.valueOf(icid);
		int i = 3 - cidresult.length();
		for (int j = 0; j < i; j++) {
			cidresult = "0" + cidresult;
		}
		return cidfirst + cidresult;
	}
	
	public static String makeAllWordFirstLetterUpperCase(String name) {
		String[] strs = name.split("_");
		String result = "";
		String preStr = "";
		for (int i = 0; i < strs.length; i++) {
			if (preStr.length() == 1) {
				result += strs[i];
			} else {
				result += capitalize(strs[i]);
			}
			preStr = strs[i];
		}
		return result;
	}
	
	public static String capitalize(String str) {
		return changeFirstCharacterCase(str, true);
	}
	
	public static String uncapitalize(String str) {
		return changeFirstCharacterCase(str, false);
	}
	
	private static String changeFirstCharacterCase(String str,
			boolean capitalize) {
		if (str == null || str.length() == 0) {
			return str;
		}
		StringBuffer buf = new StringBuffer(str.length());
		if (capitalize) {
			buf.append(Character.toUpperCase(str.charAt(0)));
		} else {
			buf.append(Character.toLowerCase(str.charAt(0)));
		}
		buf.append(str.substring(1));
		return buf.toString();
	}
	
	public static String datepath(){
		return DateUtils.format(new Date(), "yyyy-MM/dd") + "/";
	}
	
	public static String uploads(File files){
		String ext = files.getName().substring(files.getName().lastIndexOf("."));
//		System.out.println("=============="+ext);
		String appPath = Play.applicationPath.toString().replace("\\", "/");
		String folderpath = "public/uploads/" + DateUtils.format(new Date(), "yyyy-MM")+"/"+DateUtils.format(new Date(), "dd");
		File folder = new File(appPath + "/" + folderpath);
		if(!folder.exists()) folder.mkdirs();
		String filename = System.nanoTime()+ext;
//		System.out.println("................"+filename);
		File to = new File(folder,filename);
		Files.copy(files,to);
		String imgPath = "/"+folderpath + "/" + filename;
		return imgPath;
	}
	
	/**
	 * 删除文件
	 * 
	 * @param filePathAndName
	 *            文本文件完整绝对路径及文件名
	 * @return Boolean 成功删除返回true,遇异常返回false
	 */
	public static boolean delFile(String filePathAndName) {
		String message = "";
		boolean bea = false;
		try {
			String filePath = filePathAndName;
			File myDelFile = new File(Play.applicationPath, filePath);
			if (myDelFile.exists()) {
				myDelFile.delete();
				bea = true;
			} else {
				bea = false;
				message = (filePathAndName + "删除文件操作出错");
			}
		} catch (Exception e) {
			message = e.toString();
		}
		return bea;
	}

}
