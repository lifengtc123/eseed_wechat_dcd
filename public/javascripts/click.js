var highlightcolor = '#B0D4EA';
var clickcolor = '#B0D4EA';
var clicktarget;
var source;
var ds;
$().ready(function() {
	ds = $("tr[name=datas]");
	ds.each(function(index,item){
		$(item).attr("bg",item.style.background);
	})
	$("input[name=checkbox]:checked").each(function(index,item){
			$($(item).parents("td")[0]).parents("tr")[0].style.background = clickcolor;
		})
	ds.click(function() {
				var e = this;
				var ck = $($(e).children("td")[0])
						.children("input[name=checkbox]")[0];
				if (!event.ctrlKey) {
					var ks = $("input[name=checkbox]:checked");
					$.each(ks, function(index, item) {
								item.click();
							})

				}
				ck.click();
			})
	ds.mouseover(function() {
				changeto(this);
			})
	ds.mouseout(function() {
				changeback(this);
			})
	$("input[name=checkbox]").click(function(event) {
				event.stopPropagation();
				var e = this;
				if (e.checked) {
					checked(e);
					return
				}
				uncheck(e);

			})
})
function changeto(e) {
	source = e;
	if (source.style.background != highlightcolor
			&& source.style.background != clickcolor
			&& undefined == $(source).attr("bg"))
		$(source).attr("bg", source.style.background);
	source.style.background = highlightcolor;
}
function changeback(e) {
	target = e;
	if (undefined == source)
		return
	if ($($(source).children("td")[0]).children("input[type=checkbox]")[0].checked) {
		target.style.background = clickcolor;
		return
	}
	target.style.background = $(target).attr("bg");
}
function checked(e) {
	$($(e).parents("td")[0]).parents("tr")[0].style.background = clickcolor;
	e.checked = true;
}
function uncheck(e) {
	var tr = $($(e).parents("td")[0]).parents("tr")[0];
	e.checked = false;
	if(undefined==$(tr).attr("bg"))
		$(tr).attr("bg","#FFFFFF")
	tr.style.background = $(tr).attr("bg");
}