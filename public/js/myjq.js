$(function(){

//state
$("#stateInput").on("click",function(){
	if($("#stateList").is(":hidden")){
		$(".mask").show();
		$("#stateList").slideDown(300);
		$(this).addClass("tit_show");
	}else {
		setTimeout("$('.mask').hide()",300);
		$("#stateList").slideUp(300);
		$(this).removeClass("tit_show");
	}
});

// $("#stateList, .mask").on("click",function(){
	// setTimeout("$('.mask').hide()",300);
	// $("#stateList").slideUp(300);
	// $("#stateInput").removeClass("tit_show");
// });

//div同步
var aa = new Array(10);
var bb = new Array(10);
var aaTable = 0;

$("#sourceDiv span").each(function(index){
	aa[index] = $(this).outerWidth();
	bb[index] = $(this).width();
});

$("#targetDiv span").each(function(index){
	$(this).width(bb[index]);
});

var aaLength = $("#sourceDiv span").length;
for(var i=0; i<aaLength; i++){
	aaTable += aa[i];
}
$("#targetDiv .warning_history_table").width(aaTable);



var navH = $("#sourceDiv").offset().top - $(".public_blank").height();
$(window).scroll(function(){
	var scroH = $(this).scrollTop();
	if(scroH>=navH){
		$('.warning_history_tit').addClass("warning_history_tit_show");
		$('.warning_history_tit2').addClass("warning_history_tit_show2");
	}else {
		$('.warning_history_tit').removeClass("warning_history_tit_show");
		$('.warning_history_tit2').removeClass("warning_history_tit_show2");
	}
});




})