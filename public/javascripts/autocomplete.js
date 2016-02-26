var $results = null;
var timeout = null;
var $input = null;
var KEY = null;
var select = false;
var selectid = -1;
var blockSubmit;
var options;
$(document).ready(function(){
	var results = document.createElement("div");
	$("body").append(results);
	$results = $(results);
	KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};
});

function hideResults(){
	select = false;
	if (timeout){ clearTimeout(timeout); }
	if ($results.is(":visible")) {
    	$results.hide();
    }
}

function keyenter(event){
	lastKeyPressCode = event.keyCode;
	if(lastKeyPressCode == KEY.RETURN){
		if (select){
			if(event.preventDefault) event.preventDefault();
			event.returnValue = false;
			blockSubmit = true;
			change(); return false;
		}
	}
}

function findValue(input,options,event){
	lastKeyPressCode = event.keyCode;
	$input = $(input);
	$input.blur(function(){
		hideResults();
	});
	switch(event.keyCode) {
		case KEY.UP:
			if(event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if(select)move(-1);
			break;
		case KEY.DOWN:
			if(event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if (select)move(1);
			else{
				this.options = options;
				timeout = setTimeout(onChange,10);
			}
			break;	
		case KEY.PAGEUP:
			if(event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if (select)move(-1);
			break;
		case KEY.PAGEDOWN:
			if(event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if (select)move(1);
			break;
		case KEY.TAB:
		case KEY.ESC:
			hideResults();
			break;
		default :
			if(timeout){ clearTimeout(timeout); }
			if($input.val()===""){
				hideResults();
			}else{
				clearTimeout(timeout);
				this.options = options;
				timeout = setTimeout(onChange,10);
			}
	}
	
}

function move(step){
	oldid = selectid;
	selectid = parseInt(selectid) + step;
	var $obj = $("#"+selectid);
	var len = $obj.length;
	if(len==1){
		if(oldid>-1){
			$("#"+oldid).trigger("mouseout");
		}
		$obj.trigger("mouseover");
	}else{
		selectid = oldid;
	}
}

function change(){
	var $obj = $("#"+selectid);
	var len = $obj.length;
	if(len==1){
		$obj.trigger("mousedown");
		hideResults();
	}
}

function onChange(){
	if(lastKeyPressCode == KEY.DEL || lastKeyPressCode == KEY.RETURN) {
		hideResults();
		return;
	}
	$.getJSON(options.url,{"method":options.method,"keyword":$input.val(),"t":Math.random()},function(data){
		showResults(data);
	});
}

function showResults(data){
	var offset = $input.offset();
	$results.hide().addClass("kuang").css("position","absolute").css("background-color","white").css("border",1+"px solid #818181")
				   .css("top",offset.top+$input.height()+5+"px").css("left",offset.left+"px")
				   .width($input.width()+12+"px");
    $results.empty();
    if(data.length>0){
    	selectid = -1;
    	$(data).each(function(i,row){
    		var newDiv = $("<div style='padding:3px;'>").attr("id",i);
    		newDiv.html(options.formateItem(row,i));
    		$(newDiv).appendTo($results);
    		newDiv.bind("mouseover",function(){
    			if(selectid>-1){
    				$("#"+selectid).css("background-color","white");
					$("#"+selectid).css("color","black");
    			}
				$(this).css("background-color","#3B5998");
				$(this).css("color","white");
				selectid = $(this).attr("id");
			}).bind("mouseout",function(){
				$(this).css("background-color","white");
				$(this).css("color","black");
				selectid = -1;
			}).bind("mousedown",function(){
				options.selectItem($input,row);
				hideResults();
			});
			if(i>=10){
				return false;
			}
    	});
    }else{
    	var appendHtml="";
		appendHtml+="<div style='padding:3px;'>找不到结果.</div>";
		$results.append(appendHtml);
    }
    select = true;
    $results.show();
}

function selectItem(obj){
}