(function($){
	
	function buildgrid($table,options){
		var fields=[];
		$table.find("thead th").each(function(){
			var $th = $(this);
			var field = {
					name: $th.attr("name") || "",
					fieldClass: $th.attr("fieldClass") || "",
					width:$th.attr("width") || "0",
					type:$th.attr("type") || "",
					format:$th.attr("format") || ""
			};
			$th.removeAttr("width");
			fields.push(field);
		});
		var cols = renderHeader(fields);
		$(cols).prependTo($table);
		var $newTable = $('<div style="height:'+options.height+'px;overflow-x:'+options.x+'"><table class="tbody">'+cols+'<tbody></tbody></table></div>').appendTo($(".multform"));
		$newTable.hide();
		var $newTbody = $newTable.find("tbody");
		loadData($table,$newTable,$newTbody,fields,1,options);
	};
	
	function loadData($table,$newTable,$newTbody,fields,page,options){
		var $loading = $('<div id="loading">数据加载中,请稍等...</div>').appendTo(document.body);
		$.getJSON($table.attr("url"),{page:page,t:Math.random()},function(data){
			var root = data.root;
			$(root).each(function(i,row){
				renderData(i,row,$newTbody,fields,options);
			});
			$loading.remove();
			$newTable.css("heigth",240);
			pagination($table,$newTable,$newTbody,fields,data,options);
			$newTable.show();
		});
	}
	
	function updateData($table,$newTable,$newTbody,fields,page,$html,options){
		$newTable.hide();
		$newTbody.empty();
		$html.remove();
		loadData($table,$newTable,$newTbody,fields,page,options);
	}
	
	function pagination($table,$newTable,$newTbody,fields,data,options){
		var $html =$(renderPageHtml(data));
		var $page = $html.insertAfter($newTable);
		$page.find("a.first").click(function(){
			updateData($table,$newTable,$newTbody,fields,$(this).attr("rel"),$html,options);
		});
		$page.find("a.last").click(function(){
			updateData($table,$newTable,$newTbody,fields,$(this).attr("rel"),$html,options);
		});
		$page.find("a.previous").click(function(){
			updateData($table,$newTable,$newTbody,fields,$(this).attr("rel"),$html,options);
		});
		$page.find("a.next").click(function(){
			updateData($table,$newTable,$newTbody,fields,$(this).attr("rel"),$html,options);
		});
		$page.find("a.num").click(function(){
			updateData($table,$newTable,$newTbody,fields,$(this).attr("rel"),$html,options);
		});
	}
	
	function renderPageHtml(data){
		var pc = new Pagination(data);
		return '<div class="panelBar">'+pc.toHtml()+'</div>';
	}
	
	function renderData(i,row,$newTbody,fields,options){
		var html = trHtml(i,row,fields);
		var $tr = $(html).appendTo($newTbody);
		$tr.find("a.btnLookup").click(function(){
			var DG = frameElement.lhgDG;
			DG.curWin.$.bringBack(row,options.item);
			DG.cancel();
		});
	}
	
	function trHtml(i,row,fields){
		var html = '';
		$(fields).each(function(){
			html += tdHtml(i,row,this);
		});
		return "<tr>" + html + "</tr>"
	}
	
	function tdHtml(i,row,field){
		var html = row[field.name];
		switch(field.type){
			case "index":
				html = '<span style="padding-left:5px;">' + (i + 1) + "</span>";
				break;
			case "format":
				format = eval(field.format);
				html = format(row[field.name]);
				break;
			case "lookup":
				html = '<a href="javascript:void(0);" class="btnLookup">选择</a>';
				break;
			default:
				html = row[field.name];
				break;
		}
		return "<td>" + html + "</td>";
	}
	
	function renderHeader(fields){
		var html = '';
		$(fields).each(function(){
			if(this.width) html = html + '<col width="'+this.width+'px"></col>';
			else html = html + '<col></col>';
		});
		return html;
	}
	
	$.fn.itemgrid = function(options){
		var options = jQuery.extend( {
			height:"240",
			x:"hidden",
			item:""
		}, options);
		
		this.each(function(){
			var $table = $(this);
			$table.addClass("thead")
			buildgrid($table,options);
		});
	}
	

})(jQuery);