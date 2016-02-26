var checkall;
$().ready(function() {
	checkall = $("#checkAll");
	checkall.click(function() {
		if (!checkall.attr("checked")) {
			var cks = $("input[type=checkbox][name=checkbox]:checked");
			cks.each(function(index, item) {
						var tr = $($(item).parents("td")[0]).parents("tr")[0];
						tr.style.background = $(tr).attr("bg");
					})
			cks.attr("checked", false);
			return
		}
		$("input[name=checkbox]").each(function(index, item) {
			if (!item.checked) {
				if (undefined == $(item).attr("bg")) {
					$(item).attr("bg", item.style.background);
				}
				item.checked = true;
				$($(item).parents("td")[0]).parents("tr")[0].style.background = clickcolor;
			}
		})
	})
})
function LoadDialogWindow(url, title, width, height) {
	var check = $("input[type=checkbox][name!=checkAll]:checked");
	if ("新建" != title && "删除" != title && check.length != 1) {
		alert("选中数据不合法，无法执行操作。\n请选择后，在执行此操作。");
		return;
	}
	url = url + $(check[0]).val();
	if ("删除" == title) {
		if (!confirm("确定执行操作吗？")) {
			return;
		}
		var ids = "";
		check.each(function(index, item) {
					ids += $(item).val() + ",";
				})
		if (ids.length > 0)
			ids = ids.substring(0, ids.length - 1);
		if (ids.length < 1) {
			alert("未选择数据，无法执行[" + title + "]操作。\n请选择后，在执行此操作。");
			return;
		}
		$(this).attr("disabled","disabled");
		url += "&ids=" + ids;
	}
	if (title != "删除"&&title!="新建" && check.length > 1) {
		alert("无法多选操作!");
		return;
	}
	var listurl = window.location;
	listurl = ("" + listurl).replace(new RegExp("&", "g"), ",");
	if (window.parent.document.getElementById("list") == null
			|| window.parent.document.getElementById("list") == undefined) {
		if (undefined == window.parent.document.getElementsByName("listframe")[0]) {
			window.location = url + "&listUrl=" + listurl + "&t=" + Math.random();
			return;
		}
		window.parent.document.getElementsByName("listframe")[0].src = url
				+ "&listUrl=" + listurl + "&t=" + Math.random();
		return
	}
	window.parent.document.getElementById("list").src = url + "&listUrl="
			+ listurl + "&t=" + Math.random();
}

function LoadSmallWindow(url, title, width, height) {
	var check = $("input[type=checkbox][name!=checkAll]:checked");
	if ("新建" != title && "删除" != title && check.length != 1) {
		alert("选中数据不合法，无法执行[" + title + "]操作。\n请选择后，在执行此操作。");
		return;
	}
	url = url + $(check[0]).val();
	if ("删除" == title) {
		if (!confirm("确定执行[删除]操作吗？")) {
			return;
		}
		var ids = "";
		check.each(function(index, item) {
					ids += $(item).val() + ",";
				})
		if (ids.length > 0)
			ids = ids.substring(0, ids.length - 1);
		if (ids.length < 1) {
			alert("未选择数据，无法执行[" + title + "]操作。\n请选择后，在执行此操作。");
			return;
		}
		url += "&ids=" + ids;
	}
	if (title != "删除" &&title != "新建" && check.length > 1) {
		alert("[" + title + "]无法多选操作!");
		return;
	}
	if ("密码初始化" == title) {
		if (!confirm("确定执行[密码初始化]操作吗？")) {
			return;
		}
	}
	var listurl = window.location;
	listurl = ("" + listurl).replace(new RegExp("&", "g"), ",");
	var s = window.showModalDialog(url = url + "&listUrl=" + listurl + "&t="
					+ Math.random(), window,
			"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:"
					+ width + "px;dialogHeight:" + height + "px;", true);
	if (s == true) {
		if ($("#reload").length > 0)
			reload.click();
		window.location.reload();
	}
	if (typeof(s) == "string") {
		window.location.href = s;
	}
}