(function($){
	var $table,itemDetail,$newTbody,fields=[],$selectTr,$index;
	
	var _lookup = {currentGroup:"",currentName:"",index:-1};
	var _util = {
			_lookupPrefix: function(){
				var indexStr = _lookup.index < 0 ? "" : "["+_lookup.index+"]";
				var preFix = _lookup.currentGroup + indexStr;
				return preFix ? preFix+"." : "";
			},
			lookupPk: function(key){
				return _util._lookupPrefix() + _lookup.currentName + "." + key;
			},
			lookupField: function(key){
				return _util._lookupPrefix() + "lookup." + _lookup.currentName + "." + key;
			}
	};
	
	$.extend({
		bringBackSuggest: function(rows){
			$selectTr.find(':input').each(function(i){
				var $input = $(this), inputName = $input.attr("name");
				for (var key in rows) {
					var name = ("id" == key) ? _util.lookupPk(key) : _util.lookupField(key);
					if (name == inputName) {
						$input.val(rows[key]);
						break;
					}
				}
			});
		},
		bringBack:function(row){
			$selectTr.find('>td').each(function(i){
				field = fields[i];
				if(field.type=="lookup"){
					var lookupFieldName = itemDetail + '['+$index+'].lookup.' + field.lookupName + "." +field.name;
					$(this).find(":input[name="+lookupFieldName+"]").val(row[field.name]);
					var lookupFieldId = itemDetail+'['+$index+'].'+field.lookupName+'.id';
					$(this).find(":input[name="+lookupFieldId+"]").val(row["id"]);
				}else if(field.type=="lookupField"){
					var lookupFieldName = itemDetail + '['+$index+'].lookup.' + field.lookupName + "." +field.name;
					$(this).find(":input[name="+lookupFieldName+"]").val(row[field.name]);
				}
			});
		}
	});
	
	$.fn.extend({
		initUI:function(){
			return this.each(function(){
				if($.isFunction(initUI)) initUI(this);
			});
		},
		hoverClass: function(className){
			var _className = className || "hover";
			return this.each(function(){
				$(this).hover(function(){
					$(this).addClass(_className);
				},function(){
					$(this).removeClass(_className);
				});
			});
		},

		suggest:function(){
			var op = {suggest$:"#suggest", suggestShadow$: "#suggestShadow"};
			var selectedIndex = -1;
			var timeout;
			return this.each(function(){
				var $input = $(this).attr('autocomplete', 'off').keydown(function(event){
					if (event.keyCode == FAST.keyCode.ENTER) return false; //屏蔽回车提交
				});
				var suggestFields=$input.attr('suggestFields').split(",");
				function _show(){
					if($input.val() == "") return false;
					$selectTr = $input.parents("tr:first");
					if(timeout){ clearTimeout(timeout); }
					var offset = $input.offset();
					var iTop = offset.top+this.offsetHeight;
					var $suggest = $(op.suggest$);
					if ($suggest.size() == 0) $suggest = $('<div id="suggest"></div>').appendTo($('body'));
					$suggest.css("top",(offset.top+25)+"px").css("left",offset.left).show();
					_lookup = $.extend(_lookup, {
						currentGroup: $input.attr("lookupGroup") || "", 
						currentName:$input.attr("lookupName") || "",
						index: parseInt($input.attr("index")|| -1)
					});
					
					timeout = setTimeout(function(){$.ajax({
						type:'POST', dataType:"json", url:$input.attr("suggestUrl"), cache: false,
						data:{inputValue:$input.val()},
						success: function(response){
							if (!response) return;
							var html = '';
							$.each(response, function(i){
								var liAttr = '', liLabel = '';
								for (var i=0; i<suggestFields.length; i++){
									var str = this[suggestFields[i]];
									if (str || str == "") {
										if (liLabel) liLabel += ' ';
										liLabel += str;
										if (liAttr) liAttr += ',';
										liAttr += suggestFields[i]+":'"+str+"'";
									}
								}
								html += '<li lookupId="'+this["id"]+'" lookupAttrs="'+liAttr+'">' + liLabel + '</li>';
							});
							$suggest.html('<ul>'+html+'</ul>').find("li").hoverClass("selected").click(function(){
								_select($(this));
							});
						},
						error: function(){
							$suggest.html('');
						}
					})},300);
					$(document).bind("click", _close);
					return false;
				}
				function _select($item){
					var jsonStr = "{id:'"+$item.attr('lookupId')+"'," + $item.attr('lookupAttrs') +"}";
					$.bringBackSuggest(FAST.jsonEval(jsonStr));
				}
				
				function _close(){
					$(op.suggest$).html('').hide();
					selectedIndex = -1;
					$(document).unbind("click", _close);
				}
				
				$input.focus(_show).click(false).keyup(function(event){
					var $items = $(op.suggest$).find("li");
					switch(event.keyCode){
						case FAST.keyCode.ESC:
						case FAST.keyCode.TAB:
						case FAST.keyCode.SHIFT:
						case FAST.keyCode.HOME:
						case FAST.keyCode.END:
						case FAST.keyCode.LEFT:
						case FAST.keyCode.RIGHT:
							break;
						case FAST.keyCode.ENTER:
							_close();
							break;
						case FAST.keyCode.DOWN:
							if (selectedIndex >= $items.size()-1) selectedIndex = -1;
							else selectedIndex++;
							break;
						case FAST.keyCode.UP:
							if (selectedIndex < 0) selectedIndex = $items.size()-1;
							else selectedIndex--;
							break;
						default:
							_show();
							break;
					}
					$items.removeClass("selected");
					if (selectedIndex>=0) {
						var $item = $items.eq(selectedIndex).addClass("selected");
						_select($item);
					}
				});
			});
		},
	itemDetail:function(options){
		itemDetail = $table.attr("itemDetail") || "";
		$table.find("thead th").each(function(){
			var $th = $(this);
			var field = {
					type : $th.attr("type") || "text",
					fmt: $th.attr("fmt") || "yyyy-MM-dd",
					name: $th.attr("name") || "",
					size: $th.attr("size") || "12",
					fieldClass: $th.attr("fieldClass") || "",
					width:$th.attr("width") || "0",
					lookupName:$th.attr("lookupName") || "",
					lookupUrl:$th.attr("lookupUrl") || "",
					cityScript:$th.attr("cityScript") || "",
					oppoName:$th.attr("oppoName") || "否,是",
					fieldonkeyup:$th.attr("fieldonkeyup")||"",
					suggestFields:$th.attr("suggestFields") || "",
					suggestUrl:$th.attr("suggestUrl") || "",
					template:$th.attr("template") || ""
			};
			fields.push(field);
		});
		var cols = renderHeader();
		$(cols).prependTo($table);
		var $tbody = $table.find("tbody");
		var $newTable = $('<div style="height:'+options.height+'px;overflow-x:'+options.x+'"><table class="tbody">'+cols+'<tbody></tbody></table></div>').appendTo($(".multform"));
		$newTbody = $newTable.find("tbody");
		$table.find("a.btnAdd").click(function(){
			render();
			return false;
		});
		
		var len = $tbody.find(">tr").size();
		if(len==0) render();
		else fill($tbody,options);
	}
})
	
	function render(){
		var $trTm = trHtml();
		var $tr = $($trTm.replaceAll("#index#", $newTbody.find(">tr").size())).appendTo($newTbody).initUI();
		$tr.find("a.btnDel").click(function(){
			if($(".tbody").find("tr").length == 1) {
				alert("最后一行不能被删除!");
			}else {
				$(this).parents("tr:first").remove();
			}
			initSuffix();
			return false;
		});
		$tr.find("a.btnLookup").click(function(){
			$selectTr = $(this).parents("tr:first");
			$index = $(this).attr("index");
			var dg = new $.dialog({id:"lookup",page:$(this).attr("rel"), autoSize:true,title:"查找带回",width:800, height:420});
			dg.ShowDialog();
			return false;
		});
	};
	
	function renderHeader(){
		var html = '';
		$(fields).each(function(){
			if(this.width) html = html + '<col width="'+this.width+'px"></col>';
			else html = html + '<col></col>';
		});
		return html;
	}
	
	function fill($tbody,options){
		$tbody.find('>tr').each(function(i){
			var $trTm = fillTrHtml($(this));
			var $tr = $($trTm.replaceAll("#index#",$newTbody.find(">tr").size())).appendTo($newTbody).initUI();
			$tr.find("a.btnDel").click(function(){
				var msg = options.confirm;
				if(msg && confirm(msg)){
					delDbData($(this),options.url);
				}
				return false;
			});
			$tr.find("a.btnLookup").click(function(){
				$selectTr = $(this).parents("tr:first");
				$index = $(this).attr("index");
				var dg = new $.dialog({id:"lookup",page:$(this).attr("rel"), autoSize:true,title:"查找带回",width:800, height:420});
				dg.ShowDialog();
				return false;
			});
			$(this).remove();
		});
	}
	
	function delDbData($btnDel,href){
		$.post(href,{id:$btnDel.attr("rel")},function(html){
			if(html=="success") {alert("删除成功!");$btnDel.parents("tr:first").remove();initSuffix();}
		});
		
		
	}
	
	/**
	 * 删除时重新初始化下标
	 */
	function initSuffix() {
		$newTbody.find('>tr').each(function(i){
			$(this).find("span").html(i+1);
			$(':input', this).each(function(){
				var $input = $(this);
				var name = $input.attr('name').replaceAll('\[[0-9]+\]','['+i+']');
				$input.attr('name', name);
			});
		});

		countMoney();
	}
	function countMoney(){
		var mycountTotal=document.getElementById('countTotal');		
		if(mycountTotal){
			countTotal(this);  //计算金额
		}
	}
	
	function fillTrHtml($tr){
		var html = '';
		$tr.find('>td').each(function(i){
			var val = $(this).text();
			html += tdHtml(fields[i],val,$(this));
		})
		return "<tr>"+html+"</tr>"; 
	};
	
	function trHtml(){
		var html = '';
		$(fields).each(function(){
			html += tdHtml(this,'',$(this));
		});
		return "<tr>"+html+"</tr>";
	};
	
	
	function tdHtml(field,val,$td){
		var html = '', fieldName = itemDetail+'[#index#].'+field.name;
		var lookupFieldName = itemDetail + '[#index#].lookup.' + field.lookupName + "." +field.name;
		var lookupId = $td.attr("lookupId") || "";
		switch(field.type){
			case "del":
				html = '<a href="javascript:void(0)" class="btnDel"><img src="/public/images/del.png"/></a>';
				break;
			case "delAndHide":
				html = '<a href="javascript:void(0)" class="btnDel" rel="'+val+'"><img src="/public/images/del.png"/></a>';
				html = html + '<input type="hidden" name="'+fieldName+'" value="'+val+'"/>';
				break;
			case 'date':
				html = '<input type="text" name="'+fieldName+'" class="txt wd Wdate'+field.fieldClass+'" size="'+field.size+'" value="'+val+'"/>'
				break;
			case 'hide':
				break;
			case 'select':
				html = $(field.template).html();
				html =$(html).val(val);
				html = "<select name='fieldName'>" + $(html).html() + "</select>";
				html = html.replaceAll('fieldName',fieldName);
				break;
			case 'lookup':
				var suggestFrag = '';
				if (field.suggestFields) {
					suggestFrag = 'autocomplete="off" lookupGroup="'+itemDetail+'" lookupName="'+field.lookupName+'" index="#index#" suggestUrl="'+field.suggestUrl+'" suggestFields="'+field.suggestFields+'"';
				}
				html = '<input type="hidden" name="'+itemDetail+'[#index#].'+field.lookupName+'.id" value="'+lookupId+'"/>';
				html +='<input type="text" name="'+lookupFieldName+'" size="'+field.size+'" class="txt '+field.fieldClass+'" value="'+val+'" '+suggestFrag+' style="width:80%"/>';
				html +='<a href="javascript:void(0);" index="#index#" rel="'+field.lookupUrl+'" class="btnLookup"><img src="/public/images/FDJ.gif"/></a>';
				break;
			case 'lookupField':
				html = '<input type="text" name="'+lookupFieldName+'" size="'+field.size+'" class="txt wd '+field.fieldClass+'" value="'+val+'" readonly="readonly"/>';
				break;
			case 'selectCity':
				html = '<select name="'+fieldName+'" style="width:'+field.size+'"> </select>';
				if(field.cityScript){
					html += '<script language="javascript">'
					html += 'new PCAS(';
					var name = itemDetail+'[#index#].';
					var len = field.cityScript.split(",").length;
					$(field.cityScript.split(",")).each(function(i,row){
						html += '"'+name + row+'"';
						if((len-i)!=1) html +=',';
						
					});
					if($td.attr("cityValue")){
						var cityValue = $td.attr("cityValue");
						len = cityValue.split(",").length;
						$(cityValue.split(",")).each(function(i,row){
							html += ',"' + row + '"';
						});
					}
					html += ');'
					html += '</script>'
				}
				break;
				
			case 'opposite':
				var oppoNamesArray=field.oppoName.split(",");
				var opt1 = "";
				var opt2 = "";
				html = '<select name="'+fieldName+'">'
				if(val == 1) opt1 = "selected";
				if(val == 0) opt2 = "selected";
				html += '<option value="1" '+opt1+'>'+oppoNamesArray[1]+'</option>'
				html += '<option value="0" '+opt2+'>'+oppoNamesArray[0]+'</option>'		
				html += '</select>'
				break;
			case'readonlyInput':		//查看时只读
				html = '<input type="text" name="'+fieldName+'" size="'+field.size+'" class="txt wd '+field.fieldClass+'" value="'+val+'" readonly="readonly"/>';
				break;
			case'showIndex':			//显示序号
				html="<span>"+parseInt($newTbody.find(">tr").size()+1)+"</span>";
				break;
			case'onkeyup':
				html = '<input type="onkeyup" name="'+fieldName+'" size="5" class="txt wd '+field.fieldClass+'" value="'+val+'"onkeyup="'+field.fieldonkeyup+'" />';
				break;
			
			default:
				html = '<input type="text" name="'+fieldName+'" size="'+field.size+'" class="txt wd '+field.fieldClass+'" value="'+val+'" />';
				break;
		}
		return '<td width="'+field.width+'px">' + html + "</td>"
	}
	
	
	$.fn.itemdetail = function(options){
		var options = jQuery.extend( {
			height:"200",
			x:"hidden",
			confirm:"确定要删除该信息?"
		}, options);
		
		this.each(function(){
			$table = $(this);
			$table.addClass("thead")
			$.fn.itemDetail(options);
		});
	}
	

})(jQuery);

String.prototype.replaceAll  = function(s1,s2){   
	return this.replace(new RegExp(s1,"gm"),s2);   
}  