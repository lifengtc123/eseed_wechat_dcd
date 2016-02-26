define("common/wx/simplePopup.js", [ "tpl/simplePopup.html.js", "common/wx/popup.js", "biz_common/jquery.validate.js" ], function(e, t, n) {
try {
	var r = +(new Date);
	"use strict";
	var i = e("tpl/simplePopup.html.js");
	e("common/wx/popup.js"), e("biz_common/jquery.validate.js");
	function s(e) {
		var t = $.Deferred(), n = this;
		n.$dom = $(template.compile(i)(e)).popup({
			title: e.title || "输入提示框",
			buttons: [ {
				text: "确认",
				click: function() {
					var i = this;
					if (r.form()) {
						var s = n.$dom.find("input").val().trim();
						if (e.callback) {
							var o = e.callback.call(i, s);
							o !== !1 && this.remove();
						} else this.remove();
						t.resolve(s);
					}
				},
				type: "primary"
			}, {
				text: "取消",
				click: function() {
					this.remove();
				},
				type: "default"
			} ],
			className: "simple label_block"
		}), 
		n.$dom.find("input").val(e.value).focus(), 
		$.validator.addMethod("_popupMethod", function(t, n, r) {
			return e && e.rule && e.rule(t.trim(), n, r);
		}, e.msg);

		/**
		 * jquery表单验证
		 */
		var r = n.$dom.find("form").validate({
			rules: {
				popInput: {
					required: !0,
					_popupMethod: !0
				}
			},
			messages: {
				popInput: {
					required: "输入框内容不能为空"
				}
			},
			onfocusout: !1
		});


		return t.callback = t.done, t;
	}
	n.exports = s;
	} catch (o) {
		wx.jslog({
			src: "common/wx/simplePopup.js"
		}, o);
	}
});

define("common/wx/tooltip.js", [ "tpl/tooltip.html.js", "widget/tooltip.css" ], function(e, t, n) {
	try {
		var r = +(new Date);
		"use strict";
		var i = e("tpl/tooltip.html.js");
		e("widget/tooltip.css");
		var s = {
				dom: "",
				content: "",
				position: {
					x: 0,
					y: 0
				}
		}, o = function(e) {
			this.options = e = $.extend(!0, {}, s, e), this.$dom = $(this.options.dom), this.init();
		};
		o.prototype = {
				constructor: o,
				init: function() {
					var e = this;
					e.pops = [], e.$dom.each(function() {
						var t = $(this), n = t.data("tooltip"), r = $(template.compile(i)(n ? $.extend(!0, {}, e.options, {
							content: n
						}) : e.options));
						e.pops.push(r), $("body").append(r), r.css("display", "none"), t.on("mouseenter", function() {
							var n = t.offset();
							r.css({
								top: n.top - (e.options.position.y || 0) - r.height(),
								left: n.left + t.width() / 2 - r.width() / 2 + (e.options.position.x || 0)
							}), r.show();
						}).on("mouseleave", function() {
							r.hide();
						}), t.data("tooltip_pop", r);
					});
				},
				show: function() {
					var e = this, t = 0, n = e.pops.length;
					for (var t = 0; t < n; t++) e.pops[t].show();
				},
				hide: function() {
					var e = this, t = 0, n = e.pops.length;
					for (var t = 0; t < n; t++) e.pops[t].hide();
				}
		}, n.exports = o;
	} catch (u) {
		wx.jslog({
			src: "common/wx/tooltip.js"
		}, u);
	}
});
define(function(e){
	"use strict";
	function t(e){
		this.data=e;
	}


	var i=e("common/wx/Tips.js"),n=e("common/wx/tooltip.js"),s=e("common/wx/simplePopup.js"),a=e("common/wx/popover.js"),r=e("common/wx/dialog.js"),o=e("common/wx/Cgi.js"),d=e("common/wx/richEditor/msgSender.js"),l=e("common/wx/media/factory.js"),c=e("common/qq/mask.js"),u=(e("biz_common/xss.js"),
			e("biz_common/moment.js"),e("homepage/appmsgdialog.js")),h=e("cardticket/parse_data.js");
	e("common/qq/emoji.js"),e("biz_web/lib/json.js"),e("biz_common/jquery.ui/jquery.ui.sortable.js");
	var f=("1"==wx.cgiData.service_type||"0"==wx.cgiData.service_type)&&"1"!=wx.cgiData.is_wx_verify&&"1"!=wx.cgiData.is_qverify&&"3"!=wx.cgiData.is_wb_verify,m={
		menuLocation:0,
		menuStyle:1,
		menuId:"",
		menuPid:""
	},
	p=!1;
	t.prototype={
		cgi:"/MenuWxs/update",
		parent:0,
		id:0,
		name:"",
		get:function(e){
			var t;
			return this.data.each(function(i){
				i.id==e&&(t=i);
			}),t;
		},
		
		getSub:function(e,t,i){
			var n,s;
			return i===!0?this.data.each(function(e){
				e.subs&&e.subs.each(function(e){
					return e.id==t?(s=e,!1):void 0;
				});
			}):(n=this.get(e),n.subs.each(function(e){
				e.id==t&&(s=e);
			})),s;
		},
		
		add:function(e,t,url){//添加菜单
			var i=(new Date).getTime()+"_menu_"+this.data.length;
			this.cgi=url;
			this.name=e;
			this.data
			this.data.push({
				name:e,
				id:i,
				type:1
			}),this.post(t,i);
		},
		addSub:function(e,t,i,id,url){//添加二级菜单
			this.cgi=url;
			this.name=t;
			this.parent=id;
			e.type=0,
			e.act=null,
			e.subs||(e.subs=[]);
			var n=(new Date).getTime()+"_subMenu_"+e.id+"_"+e.subs.length;
			e.subs.push({
				name:t,
				id:n,
				type:1
			}),this.post(i,n);
		},
		del:function(e,id,url,t){//删除一级菜单
			var i=this;
			this.cgi=url;
			this.id=id;
			$.each(this.data,function(t,n){
				return n.id==e?(i.data.splice(t,1),!1):void 0;
			}),this.post(t);
		},
		delSub:function(e,t,id,url,i){
			var n=this.get(e);
			this.cgi=url;
			this.id=id;
			n.subs.each(function(e,i){
				return e.id==t?(n.subs.splice(i,1),!1):void 0;
			}),0==n.subs.length&&(n.type=1),this.post(i);
		},
		
		//修改菜单的名字
		//t,e,a,id,url
		edit:function(e,t,i,id,url,parent){
			e.name=t,
			this.cgi=url;
			this.id=id;
			this.name=t;
			this.parent = parent,
			this.post(i,id);
		},
		sort:function(e,t){
			var n=this,s=[],a=!1;
			e.each(function(e){
				var t=[];
				e.subs.each(function(i){
					t.push(n.getSub(e.id,i,!0));
				});
				var r=n.get(e.id);
				return r=Object.clone(r,!0),r.subs=t,r.subs.length>5?(i.err("同一个一级菜单下最多只能添加五个二级菜单，当前已达设置上限"),
						a=!0,!1):void s.push(r);
			}),a||(n.data=s,this.post(t));
		},
		
		//post提交事件
		post:function(e,t){
			var n=this;
			o.post({
				url:n.cgi,
				/*data:{
					info:n.adapt(n.data)
				}*/
			
				data:{
					id:n.id,
					name:n.name,
					parentId:n.parent
				}
			}).success(function(n){
				window.location.reload();
			});
		},
		adapt:function(e){
			function t(e){
				if(e){
					var t={};
					return $.each(e,function(e,i){
						e.endsWith("_data")||("value"==e?t.value=(i+"").html(!1):t[e]=i);
					}),[t];
				}
				return[];
			}
			var i=[];
			return $.each(e,function(e,n){
				var s={
						name:n.name.html(!1),
						type:n.type
				};
				s.act_list=[],n.subs&&n.subs.length>0?(s.sub_button_list=[],$.each(n.subs,function(e,i){
					s.sub_button_list.push({
						name:i.name.html(!1),
						act_list:t(i.act),
						type:i.type,
						sub_button_list:[]
					});
				})):s.act_list=t(n.act),i.push(s);
			}),JSON.stringify2({
				version:wx.cgiData.menu.version,
				name:wx.cgiData.menu.name,
				button_list:i
			});
		}
	};
var v,_=function(){
function e(){
return void 0==wx.cgiData.menu?(b.init(),void y.init()):(i(),w.init(),j.init(),x.init(),
b.init(),void y.init());
}
function i(){
	wx.cgiData.menu=wx.cgiData.menu;
	var e=[];
	$.each(wx.cgiData.menu&&wx.cgiData.menu.button_list,function(t,i){
		var n={
			name:i.name,
			id:"menu_"+t,
			type:i.type
		};
		if(i.sub_button_list.length>0){
			var s=[];
			$.each(i.sub_button_list,function(e,t){
				s.push({
					name:t.name,
					act:t.act_list[0],
					id:"subMenu_"+n.id+"_"+e,
					type:t.type
				});
			}),n.subs=s;
		}else {
			n.act=i.act_list[0];
		}
		e.push(n);
	}),v=new t(e),window.myMenu=v;
}
return{
	init:e
};
}(),b=function(){
function e(){
t(),o();
}
function t(){
var e=MenuData;
e.is.selfMenu?($("#menu_container").show(),$("#div_start").show(),$("#div_stop").hide()):($("#menu_container").hide(),
$("#div_start").hide(),$("#div_stop").show()),e.is.isOpen?$("#div_alertTips").hide():($("#div_alertTips").show(),
$("#btn_start").removeClass("btn_primary").addClass("btn_disabled"),$("#btn_stop").removeClass("btn_warn").addClass("btn_disabled")),
e.is.isOpen&&e.is.selfMenu?n(e):$("#menuStatus").hide();
}
function n(e){
e.selfMenu.hasButton?($("#menuStatus").show(),"1"==e.selfMenu.status?$("#menustatus_1").show():"2"==e.selfMenu.status?$("#menustatus_2").show():"3"==e.selfMenu.status&&$("#menustatus_3").html("<p>已发布："+e.selfMenu.leftTime+"小时后生效</p>").show()):$("#menuStatus").hide();
}
function s(){
$("#menustatus_1").hide(),$("#menustatus_2").show(),$("#menustatus_3").hide();
}
function a(e){
	var t,n={
		type:"POST",
		url:"/misc/skeyform?form=advancedswitchform&lang=zh_CN",
		dataType:"json"
	},s=e?1:0,a=3,o=["关闭自定义菜单之后， 将在24小时内对所有用户生效。 确认关闭？ ","开启自定义菜单之后， 将在24小时内对所有用户生效。 确认开启？ "];
	r.show({
		type:"warn",
		msg:"操作确认|"+o[s?1:0],
		buttons:[{
			text:"确定",
			click:function(){
				t=$.extend(!0,{},n,{
					data:{
						flag:s,
						type:a,
						token:wx.data.t
					},
					success:function(e){
						return 0==e.base_resp.ret?(i.suc("操作成功 "),MenuData.is.selfMenu=s,MenuData.is.isOpen||(MenuData.is.isOpen=!0),
								void window.location.reload()):void i.err("系统发生错误， 请稍后重试 ");
					}
				}),$.ajax(t),this.remove();
			}
		},{
			text:"取消",
			type:"normal",
			click:function(){
				this.remove();
			}
		}]
	});
}
function o(){
	$("#div_stop .btn_primary").click(function(){
		return!$(this).hasClass("btn_disabled")&&a(!0),!1;
	}),$("#div_start .btn_warn").click(function(){
		return a(!1),!1;
	}),$(".detail_desc").click(function(){
		$("#detail_pop").popup({
			buttons:[{
				text:"我知道了",
				click:function(){
					this.hide();
				},
				type:"primary"
			}],
			title:"提示"
		});
	});
	}
	return{
		init:e,
		refreshTips:s
	};
	}(),g=function(){
		function e(e,i){
			t[e]&&i&&i(t[e]),o.get("/merchant/electroniccardmgr?action=get&card_id="+e,function(n){
				if(0==n.base_resp.ret&&n.card_detail){
					var s=$.parseJSON(n.card_detail);
					s=h.parse_cardticket(s),t[e]=s,i&&i(s);
				}
			});
		}
		var t={};
		return{
			getCardData:e
		};
	}(),




	w=function(){
		function e(){
			a(),l(),new n({
				dom:"#addBt",//添加一级菜单
				content:"添加",
				position:{
					x:0,
					y:20
				}
			}),new n({
				dom:"#orderBt",
				content:"排序",
				position:{
					x:0,
					y:20
				}
			});
		}
		function a(){
			var e="";
			if(p){
				if(p=!1,$(".selected").hasClass("jslevel1")){
					for(var t=0,i=$(".jslevel1");t<i.length;t++)if($(i[t]).hasClass("selected")){
						m.menuLocation=t,m.menuId=i[t].id;
						break;
					}
					m.menuStyle=1;
				}else if($(".selected").hasClass("jslevel2")){
					for(var t=0,i=$(".jsMenu").find(".selected").parent("dl").children(".jslevel2");t<i.length;t++)if($(i[t]).hasClass("selected")){
						m.menuLocation=t,m.menuId=i[t].id,m.menuPid=$(i[t]).siblings("dt").attr("id");
						break;
					}
					m.menuStyle=2;
				}
				var e=m.menuId;
				if(1==m.menuStyle){
					var s=[];
					$(".jslevel1").each(function(e,t){
						var i={
								id:t.id,
								subs:[]
						};
						$(t).siblings(".jslevel2").each(function(e,t){
							i.subs.push(t.id);
						}),s.push(i);
					});
					var i=v.data;
					i.splice(m.menuLocation,0,i[i.length-1]),i.splice(i.length-1,1);
					for(var t=0;t<i.length;t++)s[t].name=$("#"+s[t].id).find("strong").text(),s[t].id==m.menuId&&(s[t].id=i[t].id);
					v.sort(s,function(){});
				}
				if(2==m.menuStyle){
					var s=[];
					$(".jslevel1").each(function(e,t){
						var i={
								id:t.id,
								subs:[]
						};
						$(t).siblings(".jslevel2").each(function(e,t){
							i.subs.push(t.id);
						}),s.push(i);
					});
					for(var t=0,i=v.data;t<i.length;t++)i[t].id==m.menuPid&&(i[t].subs.splice(m.menuLocation,0,i[t].subs[i[t].subs.length-1]),
							s[t].subs[m.menuLocation]=i[t].subs[m.menuLocation].id,i[t].subs.splice(i[t].subs.length-1,1)),
							s[t].name=v.get(s[t].id).name;
					v.sort(s,function(){});
				}
				j.ui.reset(),$(".js_reseting").hide(),j.ui.index();
			}
		$("#menuList").html(template.render("tpl",v)),
		e&&($("#"+e).addClass("selected"),e=""),
		$(".js_addSecondMenu").on("click",w.addSecondMenu),
		$(".jsMenu").sortable({
			items:".jslevel2",
			placeholder:"sub_drag_placeholder",
			dropOnEmpty:!0,
			start:function(e,t){
				t.item.addClass("dragging");
			},
			stop:function(e,t){
				t.item.removeClass("hover").removeClass("dragging");
			}
		}),$(".jsMenu").sortable("disable"),$("#").sortable({
			items:".jsMenu",
			placeholder:"drag_placeholder",
			dropOnEmpty:!0,
			start:function(e,t){
				t.item.addClass("dragging");
			},
			stop:function(e,t){
				t.item.removeClass("dragging");
			}
		}),$("#").sortable("disable"),new n({
			dom:".jsAddBt, .js_addSecondMenu",
			content:"添加",
			position:{
				x:0,
				y:10
			}
		}),new n({
			dom:".jsEditBt, .jsSubEditBt",
			content:"编辑",
	position:{
		x:0,
		y:20
	}
}),
new n({
	dom:".jsDelBt, .jsSubDelBt",
	content:"删除",
	position:{
		x:0,
		y:20
	}
}),
new n({
	dom:".jsOrderBt",
	content:"排序",
	position:{
		x:0,
		y:20
	}
});
}
function o(){
	return c;
}

//二级菜单
function d(){
	$(this).hasClass("js_addSecondMenu")&&($(this).parents("dt").hasClass("selected")||($(".selected").length&&$(".selected").removeClass("selected"),
	$($(this).parents("dt")[0]).addClass("selected"),
	j.autoSaveEdit(),$(".js_second_title_bar").show(),
	$("#index .initialCreate").show(),
	$(".action_setting .js_second_title_bar h4").text("一级菜单："+$(this).parents("dt").find("strong").text()),
	$("#index .action_tips").text("请选择订阅者点击“"+$($(this).parents("dt")[0]).find("strong").text()+"”菜单后，公众号做出的响应动作"),
	c=v.get($(this).parents("dt")[0].id),j.refresh(c)));
	var e=$("#").find(".selected").attr("id"),
	t=v.get(e),
	n=$("#"+e).siblings(".jslevel2").length;
	var length = $(this).attr("length")
	var id = $(this).attr("id");
	var url = $(this).attr("url");
	return t&&t.subs&&length>=5?i.err("同一个一级菜单下最多只能添加五个二级菜单，当前已达设置上限"):t.act?r.show({
		type:"warn",
		msg:"二级菜单确认|使用二级菜单后，当前编辑的消息将会被清除。确定使用二级菜单？",
		buttons:[{
			text:"确定",
			click:function(){
				new s({
					title:"添加二级菜单",
					label:"还能添加"+(5-length)+"个二级菜单，请输入名称（8个汉字或16个字母以内）",
					rule:function(e){
						return e.len()<=16;
					},
					msg:"菜单名称应不多于8个汉字或16个字母",
					callback:function(e){
						v.addSub(t,e,a,id),i.suc("成功添加二级菜单“"+e+"”");
					}
				}),this.remove(),b.refreshTips();
			}
		},{
			text:"取消",
			type:"normal",
			click:function(){
				this.hide();
			}
		}]
	}):new s({
		title:"添加二级菜单",
		label:"还能添加"+(5-n)+"个二级菜单，请输入名称（8个汉字或16个字母以内）",
		rule:function(e){
			return e.len()<=16;
		},
		msg:"菜单名称名字不多于8个汉字或16个字母",
		callback:function(e){
			
			v.addSub(t,e,a,id,url),i.suc("成功添加二级菜单“"+e+"”"),b.refreshTips();
		}
	}),!1;
}
function l(){
	var e;
	$("#orderBt").click(function(){
		return e=Object.clone(v.data,!0),$("#").addClass("sorting"),$("#addBt").hide(),
		$("#orderBt").hide(),$("#finishBt").show(),$("#cancelBt").show(),$(".jsOrderBt").show().siblings().hide(),
		$("#").sortable("enable"),$(".jsMenu").sortable("enable"),j.ui.rankTips(1),
		$(".jslevel2").mousedown(function(){
			$(".menu_mask").show(),$(this).parent("dl").addClass("dragging"),$(this).parent("dl").siblings("dl").length&&$(this).parent("dl").siblings("dl").addClass("undragging");
		}),$(".jslevel2").mouseup(function(){
		$(".menu_mask").hide(),$(this).parent("dl").removeClass("dragging"),$(this).parent("dl").siblings("dl").hasClass("undragging")&&$(this).parent("dl").siblings("dl").removeClass("undragging");
		}),!1;
	}),$("#cancelBt").click(function(){
		return e&&(v=new t(e),a(),e=null),$("#").removeClass("sorting"),$("#addBt").show(),
		$("#orderBt").show(),$("#finishBt").hide(),$("#cancelBt").hide(),$(".jsOrderBt").hide().siblings().show(),
		$("#").sortable("disable"),j.ui.rankTips(0),!1;
	}),$("#finishBt").click(function(){
	var e=[];
	return $(".jslevel1").each(function(t,i){
		var n={
			id:i.id,
			subs:[]
		};
		$(i).siblings(".jslevel2").each(function(e,t){
			n.subs.push(t.id);
		}),e.push(n);
	}),v.sort(e,a),$("#").removeClass("sorting"),$("#addBt").show(),$("#orderBt").show(),
		$("#finishBt").hide(),$("#cancelBt").hide(),$(".jsOrderBt").hide().siblings().show(),
		$("#").sortable("disable"),b.refreshTips(),j.ui.rankTips(0),!1;
	}),$("#").on("click","dt>a",function(){
		return $(this).parent().hasClass("selected")?void 0:(j.autoSaveEdit(),$(".js_second_title_bar").show(),
			$("#").find("dd,dt").removeClass("selected"),$("#index .initialCreate").show(),
			$(this).parent().addClass("selected"),$(".action_setting .js_second_title_bar h4").text("一级菜单："+$(this).find("strong").text()),
			$("#index .action_tips").text("请选择订阅者点击“"+$(this).find("strong").text()+"”菜单后，公众号做出的响应动作"),
			c=v.get($(this).parent()[0].id),j.refresh(c),!1);
	}),$("#").on("click","dd>a",function(){
		return $(this).parent().hasClass("selected")?void 0:(j.autoSaveEdit(),$(".js_second_title_bar").show(),
			$("#").find("dd,dt").removeClass("selected"),$(this).parent().addClass("selected"),
			$("#index .initialCreate").hide(),$(".action_setting .js_second_title_bar h4").text("二级菜单："+$(this).find("strong").text()),
			$("#index .action_tips").text("请选择订阅者点击“"+$(this).find("strong").text()+"”菜单后，公众号做出的响应动作"),
			c=v.getSub($(this).parent().siblings("dt")[0].id,$(this).parent()[0].id),j.refresh(c),
			!1);
	});
	var n=function(data,url){
		return data>=3?void i.err("最多只能添加三个一级菜单，当前已达设置上限"):void new s({
			title:"添加一级菜单",
			url:"MenuWx/add",
			label:"还能添加"+(3-data)+"个一级菜单，请输入名称（4个汉字或8个字母以内）",
			rule:function(e){
				return e.len()<=8;
			},
			msg:"菜单名称应不多于4个汉字或8个字母"
		}).callback(function(e){
			//e:一级菜单的名字
			v.add(e,a,url),
			$(".menu_setting_empty_wrp").hide(),
			$(".menu_setting_area").show(),
			$(".js_totaltool_bar").show(),
			$(".js_second_title_bar").show(),
			b.refreshTips(),i.suc("成功添加一级菜单“"+e+"”");
		});
	};
	$(".addBt").on("click",function(){
		var length = $(this).attr("length");
		var url = $(this).attr("url");
		return n(length,url),!1;
	}),
	
	//菜单的删除
	$("#jsDelBt").on("click",function(){
		var e=$("#").find(".selected").attr("id");//获取选中的一级菜单
		//菜单的id
		var id = $("#menuList1").find(".selected").children("a").first().attr("id");
		//回掉的url地址
		var url = $("#menuList1").find(".selected").children("a").first().attr("url1");
		
		if($("#"+e).hasClass("jslevel1"))r.show({
			type:"warn",
			msg:"删除确认|删除后该菜单下设置的消息将不会被保存",
			buttons:[{
				text:"确定",
				click:function(){
					v.del(e,id,url,function(){
						i.suc("成功删除一级菜单“"+$("#"+e).find("strong").text()+"”"),$(".js_second_title_bar").hide(),
						j.ui.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作"),a(),j.refresh(),b.refreshTips();
					}),this.remove();
				}
			},{
				text:"取消",
				type:"normal",
				click:function(){
					this.hide();
				}
			}]
		});
		else if($("#"+e).hasClass("jslevel2")){
			var t=$("#"+e).siblings("dt")[0].id;
			r.show({
				type:"warn",
				msg:"删除确认|删除后该菜单下设置的消息将不会被保存",
				buttons:[{
					text:"确定",
					click:function(){
						v.delSub(t,e,id,url,function(){
							i.suc("成功删除二级菜单“"+$("#"+e).find("strong").text()+"”"),$(".js_second_title_bar").hide(),
							j.ui.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作"),a(),j.refresh();
						}),b.refreshTips(),this.remove();
					}
				},{
					text:"取消",
					type:"normal",
					click:function(){
						this.hide();
					}
				}]
			});
		}
		return!1;
		}),
		
		$("#jsChangeBt").on("click",function(){//修改一级菜单
			var e=$("#menuList1").find(".selected").attr("id");
			//菜单的id
			var id = $("#menuList1").find(".selected").children("a").first().attr("id");
			//回掉的url地址
			var url = $("#menuList1").find(".selected").children("a").first().attr("url");
			//回掉的url地址
			var parent = $("#menuList1").find(".selected").children("a").first().attr("parent");
			if($("#"+e).hasClass("jslevel1")){
				var t=v.get(e);
				new s({
					title:"修改一级菜单名称",
					value:t.name.html(!1),
					rule:function(e){
						return e.len()<=8;
					},
				tips:"不多于4个汉字或8个字母",
				msg:"菜单名称名字不多于4个汉字或8个字母",
				callback:function(e){
					v.edit(t,e,a,id,url),b.refreshTips(),i.suc("成功将一级菜单重命名为“"+e+"”"),$(".js_second_title_bar").hide(),
					$("#initialCreate").hide(),j.ui.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作");
				}
				});
			}else if($("#"+e).hasClass("jslevel2")){//修改二级菜单
				var n=$("#"+e).siblings("dt")[0].id,
				t=v.getSub(n,e);
				new s({
					title:"修改二级菜单名称",
					value:t.name.html(!1),
					rule:function(e){
						return e.len()<=16;
					},
					tips:"不多于8个汉字或16个字母",
					msg:"菜单名称名字不多于8个汉字或16个字母",
					callback:function(e){
						v.edit(t,e,a,id,url,parent),b.refreshTips(),i.suc("成功将二级菜单重命名为“"+e+"”"),$(".js_second_title_bar").hide(),
						$("#initialCreate").hide(),j.ui.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作");
					}
				});
			}
			return!1;
		}),$(".initialCreate").on("click",d);
	}
	var c;
	return{
		init:e,
		refresh:a,
		getData:o,
		addSecondMenu:d
	};
}(),
j=function(){
function e(){
	m.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作"),m.initialView(),$("#none .initialCreate").hide(),
t();
}
function t(){
	var e="disabled";
	f&&$("#urlText").attr(e,e).parent().addClass(e),
	
	//菜单跳转到发送消息时间
	$("#sendMsg").click(function(){
		//查询图文信息
		$.getJSON("/Newsinfos/list1", { id : i}, function(data) {
			alert(data);
		});
		return m.edit(),b.refreshTips(),!1;
	}),

	//菜单跳转到网页事件
	$("#goPage").click(function(){
		//菜单的id
		var id = $("#menuList1").find(".selected").children("a").first().attr("id");
		$("#menuId").val(id);
		return m.url(),b.refreshTips(),!1;
	}),
	$("#urlBack").click(function(){
		return m.data.act?m.view():m.index(),!1;
	}),
	$(".resetAction").on("click",function(){
		return new a({
			dom:this,
			content:"<p>重设动作会导致当前菜单内容被清空</p><p>确定重设？</p>",
			place:"bottom",
			margin:"center",
			buttons:[{
				text:"确定",
				click:function(){
					this.hide(),j.ui.reset(),$(".js_reseting").show(),$("#initialCreate").hide(),b.refreshTips();
					var e=$("#menuList1").find(".selected").attr("id"),t=$("#"+e).find("strong").text();
					if($("#"+e).hasClass("jslevel1"))v.del(e,function(){
						v.add(t,w.refresh);
					});
					else if($("#"+e).hasClass("jslevel2")){
						var i=$("#"+e).siblings("dt")[0].id,n=v.get(i);
						v.delSub(i,e,function(){
							v.addSub(n,t,w.refresh);
						});
					}
					return p=!0,!1;
				},
				type:"primary"
			},{
				text:"取消",
				click:function(){
					return this.hide(),$.browser.msie&&"7.0"==$.browser.version&&(window.onbeforeunload=null),
					!1;
				}
			}]
		}),!1;
	}),
	$("#changeBt").click(function(){
		return 6==m.data.act.type?m.url(m.data.act.value):m.edit(),b.refreshTips(),!1;
	}),
	$("#editBack").click(function(){
		return n(w.getData()),!1;
	}),

	//素材库中的图文消息
	$("#js_appmsgPop").on("click",function(){
		return new u({
			ids:[],
			multi:!1,
			maxNum:1,
			callback:function(e){
				if(e.length>0){
					var t=e[0],i=t.title,n=t.link;
					n&&($("#urlText").val(n).data("url",n).closest(".frm_control_group").show(),
							$("#js_urlTitle").show().find("span").text(i),
							$("#urlUnSelect").hide());
				}
			}
		}),
		$("#a_search").on("click",function(){
			return!1;
		}),!1;
	}),
	$("#urlText").on("keyup propertychange",function(){
		var e=$(this),t=e.val().trim(),i=e.data("url");
		i&&t==i?$("#js_urlTitle").show():$("#js_urlTitle").hide();
	});
}
function n(e){
	if(!e)
		return m.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作"),
		m.initialView(),
		void $("#none .initialCreate").hide();
	switch(m.data=e,e&&e.type){
	case 0:
		var t=$("#"+e.id).siblings(".jslevel2").length;
		5>t?(m.none("已经为“"+$("#"+e.id).find("strong").text()+"”添加了二级菜单，无法设置其他动作。<br>你还可以添加"+(5-t)+"个二级菜单"),
				$("#none .initialCreate").show()):(m.none("你已添加满5个二级菜单"),$("#none .initialCreate").hide());
		break;

	case 1:
		e.act?m.view():m.index();
		break;

	case 2:
		m.view();
		break;

	case 3:
		e.act.source="file";
		break;

	case 3:
		e.act.source="file",e.act.id=e.act.file_id;
		break;

	default:
		m.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作"),m.initialView();
	}
}
function s(e){
	if($("#edit").is(":visible")){
		for(var t=0,n=$(".tab_content");t<n.length;t++)if($(n[t]).is(":visible")&&($($(n[t]).children(".inner").find(".edit_area")[1]).text()||$(n[t]).children(".inner").children("div").length)){
			var s=h.getData(!0);
			if(!s.error){
				if(10==s.data.type?s.data.type=5:11==s.data.type?s.data.type=8:15==s.data.type?s.data.type=9:16==s.data.type?s.data.type=10:21==s.data.type&&(s.data.type=11),
						s=s.data,m.data.act={
						type:s.type,
						value:s.app_id||s.file_id||s.cardid||s.content.html(!0),
						_data:s
				},m.data.act._data.content&&(m.data.act._data.content=m.data.act._data.content.html(!0)),
				e)return v.adapt(v.data);
				v.post(function(){});
			}
			b.refreshTips();
			break;
		}
	}else if($("#url").is(":visible")){
		var a=w.getData(),r=$("#urlText").val().trim();
		if(""==r&&f)$("#urlUnSelect").show();else{
			if($("#urlUnSelect").hide(),r.startsWith("http://")||r.startsWith("https://")||(r="http://"+r),
					0==r.indexOf("http://mp.weixin.qq.com/s")&&(r=r.replace(/#rd$/,"#wechat_redirect")),
					!$.validator.rules.url(r))return $("#urlFail").show(),i.err("请输入正确的URL"),!1;
			if($("#urlFail").hide(),a.type=2,a.act={
				type:6,
				value:r
			},o.get("/misc/checkurl?url="+r+"&f=json&action=check").success(function(e){
				return"10302"==e.base_resp.ret?void i.err("填写url是黑名单地址"):void 0;
			}),e)return v.adapt(v.data);
			v.post(function(){
				$("#urlText").val(""),$("#urlFail").hide();
			}),b.refreshTips();
		}
	}
}

//初始化富文本框
function r(e,t){
	function i(){
		var i;
		if(i=c(t.act),e)if($("#edit").show(),h)f&&!i?h.clear():h.setData(i);else{
			var n,s=i?{
				data:i,
				acl:wx.acl.msg_acl
			}:{
				acl:wx.acl.msg_acl
			};
			if(f){
				var a=$.extend(!0,{},s);
				a.acl.can_text_msg=0,n=a;
			}else n=s;
			
			h=new d("#editDiv",n);
		}else i&&l.render("#viewDiv",i);
		$("a.emotion_switch").on("click",function(){
			return!1;
		});
	}
	if(t.act&&10==t.act.type&&!t.act._data){
		var n=t.act.value;
		g.getCardData(n,function(e){
			e._className="",t.act._data=e,i();
		});
	}else t.act&&10==t.act.type&&(t.act._data._className=""),i();
}


function c(e){
	if(!e)return null;
	var t=null;
	return Object.each(e,function(e,i){
		return i.endsWith("_data")?(t=e,!1):void 0;
	}),t.type=e.type,5==t.type?t.type=10:8==t.type?t.type=11:9==t.type?t.type=15:10==t.type?t.type=16:11==t.type&&(t.type=21),
			t;
}
var h,m={
		none:function(e){
			this.reset(),e.indexOf("<br>")>=0?$("#none").show().find("p").empty().append(e):$("#none").show().find("p").text(e);
},
index:function(){
	this.reset(),$("#index").show();
},
url:function(e){
	this.reset(),!e&&f?$("#urlText").val("认证后才可手动输入地址"):$("#urlText").val(e&&e.html(!1)).focus(),
			$("#js_urlTitle").hide(),$("#url").show();
},
view:function(){
	alert(this.data.type);
	if(this.reset(),1==this.data.type)switch($("#viewDiv").siblings("p").text("订阅者点击该子菜单会收到以下消息"),
			this.data.act.type){
			case 1:
				$("#viewDiv").html(this.data.act.value.emoji());
				break;
			case 7:
				$("#viewDiv").text("发送名片");
				break;
			default:
	r(!1,this.data);

	}else 2==this.data.type&&($("#viewDiv").html(this.data.act.value),$("#viewDiv").siblings("p").text("订阅者点击该子菜单会跳到以下链接"));
	$("#view").show(),$("#changeBt").show();
},

//初始化菜单
initialView:function(){
	0==$("#menuList1").children(".jsMenu").length?($(".menu_setting_empty_wrp").show(),
			$(".menu_setting_area").hide(),$(".js_totaltool_bar").hide(),$(".js_second_title_bar").hide()):($(".menu_setting_empty_wrp").hide(),
					$(".menu_setting_area").show(),$(".js_totaltool_bar").show(),$("#menuList1").find(".selected").length?$(".js_second_title_bar").show():$(".js_second_title_bar").hide());
},
edit:function(){
	this.reset(),
	$("#edit").show(),
	r(!0,this.data);
},
reset:function(){
	$(".jsMain").hide(),$("#changeBt").hide(),$("#urlFail").hide(),$("#urlUnSelect").hide();
},
rankTips:function(e){
	1==e?(this.none("请通过拖拽左边的菜单进行排序"),$(".js_second_title_bar").hide(),$(".initialCreate").hide()):0==e&&this.none("你可以点击左侧菜单或添加一个新菜单，然后设置菜单响应动作");
}
};
return{
	init:e,
	refresh:n,
	getData:c,
	autoSaveEdit:s,
	ui:m
};
}(),

x=function(){
	function e(){
		$("#viewBt").click(function(){
			return $("#mobileDiv:hidden").length>0&&(c.show({
				spin:!1
			}),$("#viewList").html(template.render("viewTpl",v)),$("#mobileDiv").show()),!1;
		}),$("#viewClose").click(function(){
			return c.hide(),$("#mobileDiv").hide(),$("#viewShow").html(""),!1;
		}),$("#viewList").on("click",".jsView",function(){
			$(this).parent().siblings().find(".jsSubViewDiv").hide();
			var e=v.get($(this).parent()[0].id);
			return e.act?t(e.act):$(this).parent().find(".jsSubViewDiv").toggle(),!1;
		}),$("#viewList").on("click",".jsSubView",function(){
			var e=v.getSub($(this).parents(".jsViewLi")[0].id,$(this).parent()[0].id);
			return e.act&&t(e.act),$(".jsSubViewDiv").hide(),!1;
		});
		var e=function(e){
			switch(e.base_resp.ret){
			case 0:
				i.suc("保存并发布成功"),window.onbeforeunload=null,window.location.reload();
				break;
			case 8:
				i.err("空菜单，不能同步");
				break;
			case 9:
				i.err("存在还未设置响应动作的菜单，请检查");
				for(var t,n=$("#menuList1").find(".inner_menu_item"),s=1,a=0,r=n.length;r>a;a++)
					if($(n[a]).hasClass("jslevel1")?(t=v.get(n[a].id),s=1):$(n[a]).hasClass("jslevel2")&&(t=v.getSub($(n[a]).siblings()[0].id,n[a].id),s=2),!t||!t.act&&t.type){
						j.refresh(t),$(n[a]).hasClass("selected")||($("#menuList1").find("dd,dt").removeClass("selected"),
								$(n[a]).addClass("selected")),1==s?$(".action_setting .js_second_title_bar h4").text("一级菜单："+$("#"+t.id).find("strong").text()):2==s&&$(".action_setting .js_second_title_bar h4").text("二级菜单："+$("#"+t.id).find("strong").text()),
										$("#index .action_tips").text("请选择订阅者点击“"+$("#"+t.id).find("strong").text()+"”菜单后，公众号做出的响应动作");
								break;
					}
				$(".selected").hasClass("jslevel2")?$("#index a#initialCreate").hide():$(".selected").hasClass("jslevel1")&&($("#initialCreate").show(),
						$("#index a#initialCreate").css("display","inline-block"));
				break;
			case 10:
				i.err("自定义菜单功能处于关闭状态，无法发布");
				break;
			default:
				i.err("系统错误，请稍后再试");
			}
		};
		
		//保存并发布菜单
		$("#pubBt").click(function(){
			return $("#index").is(":visible")?i.err("请设置当前菜单响应动作"):v.data.length>0?r.show({
				type:"warn",
				msg:"发布确认|本次发布将在24小时内对所有用户生效。确认发布？",
				buttons:[{
					text:"确定",
					click:function(){
						var id=$("#menuId").val();
						var menuType = $("#menuType").val();
						var msg = $("#urlText").val();
						
						var t=j.autoSaveEdit(!0);
						t?o.post({
							url:"/MenuWXs/update",//更新菜单
							data:{
								"id":id,
								"menuType":menuType,
								"msg":msg
							}
						},function(t){
							e(t);
						}):o.post({
							url:"/MenuWXs/update",//更新菜单
							data:{
								"id":id,
								"menuType":menuType,
								"msg":msg
							}
						},function(t){
							e(t);
						}),this.remove();
					}
				},{
					text:"取消",
					type:"normal",
					click:function(){
						this.hide();
					}
				}]

			}):i.err("空菜单，不能同步"),!1;
		});
	}
	function t(e){
		var t={
			src:$(".head .avatar").attr("src"),
			id:"_view_"+1*new Date
		};
		return 6==e.type?void window.open(e.value):($("#viewShow").append(template.compile(n)(t)).parent().scrollTop($("#viewShow")[0].scrollHeight),
				1==e.type?void $("#"+t.id).html(e.value.emoji()):void(10==e.type?g.getCardData(e.value,function(i){
					i._className="small_card",e._data=i,i&&l.render.defer("#"+t.id,j.getData(e));
				}):l.render.defer("#"+t.id,j.getData(e))));
	}
	var n='<li class="show_item"><img class="avatar" src="{src}"><div class="show_content" id="{id}"></div></li>';
	return{
		init:e
	};
	}(),
	
	y=function(){
function e(){
if(wx.cgiData.authrized&&"1"==wx.cgiData.authrized){
for(var e=$("#js_authrized"),t="",i=wx.cgiData.auth_info,n=i.length,s=0;n>s;s++){
var a=i[s].component_name||"未知",r=i[s].func_category_list||[];
r.indexOf(1)>-1&&(t=""==t?a:t+"、"+a);
}
e.find(".js_thirdname").text(t),e.show(),$("#btn_start").removeClass("btn_primary").addClass("btn_disabled");
}
}
return{
init:e
};
}();
_.init(),window.onbeforeunload=function(e){
e=e||window.event;
var t="";
if(!$("#edit").is(":visible")||$(".dialog_wrp").is(":visible")||$(".popover").is(":visible"))$("#url").is(":visible")&&!$(".popover").is(":visible")&&(t="你正在编辑的菜单“"+$(".selected").find("strong").text()+"”可能还有未保存的内容");else for(var i=0,e=$(".tab_content");i<e.length;i++)if($(e[i]).is(":visible")&&$(e[i]).children(".inner").children("div").length){
t="你正在编辑的菜单“"+$(".selected").find("strong").text()+"”可能还有未保存的内容";
break;
}
return t?(e&&(e.returnValue=t),t):void 0;
};
});