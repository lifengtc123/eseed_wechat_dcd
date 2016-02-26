var qq = {
	addhetong: function(attid,file_selector) {
		var template = $("p.template");
		var templateHTML = template.html();
		var len = $("p.offscreen").find("input[type=file]").length;
		var last_key = 0;
		var id = "1";
		if(len>0){
			id = $("p.offscreen").find("input[type=file]").last().attr("id");
			last_key = id.match(/\d+/);
			id = (Number(last_key)+1);
		} 
		$(file_selector).attr("name","files");
		$(file_selector).attr("id","files_"+id);
		this.updateAttachments(file_selector,id,attid);
		$("p.offscreen").last().append($(file_selector));
		template.html(templateHTML);
	},
	addtuzhi: function(attid,file_selector2) {
		var template2 = $("p.template2");
		var templateHTML = template2.html();
		var len = $("p.offscreen2").find("input[type=file]").length;
		var last_key = 0;
		var id = "1";
		if(len>0){
			id = $("p.offscreen2").find("input[type=file]").last().attr("id");
			last_key = id.match(/\d+/);
			id = (Number(last_key)+1);
		} 
		$(file_selector2).attr("name","filesb");
		$(file_selector2).attr("id","filesb_"+id);
		this.updateAttachmentstuzhi(file_selector2,id,attid);
		$("p.offscreen2").last().append($(file_selector2));
		template2.html(templateHTML);
	},
	remove: function(id){
		$('#files_'+id).remove();
		$('#files_info_'+id).remove();
	},
	remove2: function(id){
		$('#filesb_'+id).remove();
		$('#files_infob_'+id).remove();
	},
	updateAttachments: function(file_selector,id,attid){
		var file = $(file_selector).val();
		var ext = file.substring(file.lastIndexOf(".")+1);
		var html = '<div class="file" id="files_info_'+id+'"><span class="file-icon '+ext.toLowerCase()+'"></span>&nbsp;'+file+'&nbsp;&nbsp;<a href="#" onclick="qq.remove('+id+');return false;">删除</a> </div>';
		$("#"+attid).last().append(html);
	},
	updateAttachmentstuzhi: function(file_selector2,id,attid){
		var file = $(file_selector2).val();
		var ext = file.substring(file.lastIndexOf(".")+1);
		var html = '<div class="file" id="files_infob_'+id+'"><span class="file-icon '+ext.toLowerCase()+'"></span>&nbsp;'+file+'&nbsp;&nbsp;<a href="#" onclick="qq.remove2('+id+');return false;">删除</a> </div>';
		$("#"+attid).last().append(html);
	}
}
