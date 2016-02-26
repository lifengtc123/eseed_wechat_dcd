$(function(){
	var obj = "tab"+tab_index;
	$(".tabs span").each(function(i){
		if(tab_index==i){
			$(".tab"+i).show();
		}else{
			$(".tab"+i).hide();
		}
	});
	$(".tabs #"+obj).addClass("current"); //为第一个SPAN添加当前效果样式
	$(".tabs span").click(function() {
		$(".tabs span").removeClass("current"); //去掉所有SPAN的样式
		$(this).addClass("current");
		var spanid = $(this).attr("id");
		$(".tabs span").each(function(){
			if(spanid == $(this).attr("id")){
				$("."+$(this).attr("id")).show();
			}else{
				$("."+$(this).attr("id")).hide();
			}
		});
	});
})