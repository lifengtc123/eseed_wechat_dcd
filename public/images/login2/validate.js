String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
function validate() {
	var state = true;
	$.each($("input[reg][disabled='']"), function(index, item) {
		var target = $(item);
		var patten = eval("/" + $(item).attr("reg") + "/");
		if (!patten.test(target.val())) {
			state = false;
			if (target.next("img").length < 1)
				target
						.after("<img name='error' title='"+target.attr("regText")+"' src='./images/exclamation.gif'>"
								);
		} else if (patten.test(target.val()) && target.next("img").length > 0) {
			target.next("img").remove();
		}
	})
	$.each($("select[reg][disabled='']"), function(index, item) {
		var target = $(item);
		var patten = eval("/" + $(item).attr("reg") + "/");
		if (!patten.test(target.val())||target.val()==null) {
			state = false;
			if (target.next("img").length < 1)
				target
						.after("<img name='error' title='"+target.attr("regText")+"' src='./images/exclamation.gif'>"
								);
		} else if (patten.test(target.val()) && target.next("img").length > 0) {
			target.next("img").remove();
		}
	})
	$.each($("textarea[reg]"), function(index, item) {
		var target = $(item);
		var patten = eval("/" + $(item).attr("reg") + "/");
		if (!patten.test(target.val())) {
			state = false;
			if (target.next("img").length < 1)
				target
						.after("<img name='error' title='"+target.attr("regText")+"' src='./images/exclamation.gif'>"
								);
		} else if (patten.test(target.val()) && target.next("img").length > 0) {
			target.next("img").remove();
		}
	})
	return state;
}
$().ready(function() {
			var ins = $(":input:visible");
			if (ins.length > 0) {
				ins[0].focus();
			}
		})