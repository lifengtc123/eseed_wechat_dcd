String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
function validate() {
	var state = true;
	$.each($("input[reg]"), function(index, item) {
		var target = $(item);
		var patten = eval("/" + $(item).attr("reg") + "/");
		if (!patten.test(target.val())) {
			state = false;
			target.next("span").html(target.attr("regText"));
		} else if (patten.test(target.val()) ) {
			target.next("span").html("");
		}
	});
	$.each($("select[reg]"), function(index, item) {
		var target = $(item);
		var patten = eval("/" + $(item).attr("reg") + "/");
		if (!patten.test(target.val())||target.val()==null) {
			state = false;
			target.next("span").html(target.attr("regText"));
		} else if (patten.test(target.val()) ) {
			target.next("span").html("");
		}
	});
	$.each($("textarea[reg]"), function(index, item) {
		var target = $(item);
		var patten = eval("/" + $(item).attr("reg") + "/");
		if (!patten.test(target.val())) {
			state = false;
			target.next("span").html(target.attr("regText"));
		} else if (patten.test(target.val()) ) {
			target.next("span").html("");
		}
	});
	return state;
}
$().ready(function() {
			var ins = $(":input:visible");
			if (ins.length > 0) {
				ins[0].focus();
			}
		});