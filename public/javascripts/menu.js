$(function(){
	$(".menuitem").click(function(){
		MainMenu.onClick(this);
	});
	$(".menuitem").mouseover(function(){
		MainMenu.onMouseOver(this);
	});
	$(".menuitem").mouseout(function(){
		MainMenu.onMouseOut(this);
	});
	$(".menu_sub").click(function(){
		MainMenu.onClick(this);
		var url = $(this).attr("url");
		url = 'parent.main.location="'+url+'";';
		makeClickEvent(url);
	});
	$(".menu_sub").mouseover(function(){
		MainMenu.onMouseOver(this);
	});
	$(".menu_sub").mouseout(function(){
		MainMenu.onMouseOut(this);
	});
	MainMenu.init('/public/images/');
	MainMenu.clickMainItemByDefault('');
})