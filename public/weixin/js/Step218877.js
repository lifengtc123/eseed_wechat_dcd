define("tpl/tooltips.html.js",[],function(){
return'<div class="popover {parentClass}" style="display:none;position:{container_mode};{if offset.left}left:{offset.left}px;top:{offset.top}px;{/if}">\n    <div class="popover_inner">\n        <div class="popover_content">{=content}</div>\n        {if container_close}\n        <!--#0001#-->\n        <a href="javascript:;" class="popover_close icon16_common close_flat js_popover_close">关闭</a>\n        <!--%0001%-->\n        {/if}\n        {if buttons.length > 0}\n        <div class="popover_bar">\n			{each buttons as o index}\n			<a onclick="return false;" href="javascript:;" class="btn {o.type}">{o.text}</a>\n			{/each}\n        </div>\n        {/if}\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i>\n</div>\n';
});define("tpl/cardticket/card_quantity.html.js",[],function(){
return'<div class="pop_store">\n	<!--增减库存-->\n	{if setquantity}\n	<div class="frm_control_group">\n        <div class="frm_controls">\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">增加</span>\n				<input type="radio" name="isadd" checked value="1" class="frm_radio js_quantity_type">\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">减少</span>\n				<input type="radio" name="isadd" value="0" class="frm_radio js_quantity_type">\n			</label>\n		</div>\n	</div>\n	{/if}\n	<div class="frm_control_group">                        \n		<div class="frm_controls">\n			<div class="frm_controls_hint group">\n				<span class="frm_input_box"><input type="text" class="frm_input js_value"></span>\n				<span class="frm_hint">份</span>\n			</div>\n			<p class="frm_tips fail">库存不能少于1</p>\n		</div>\n	</div>\n	<!--增减库存 end-->\n</div>';
});define("common/wx/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js"],function(e){
"use strict";
function i(e){
f.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),t=e("common/wx/dialog.js"),a=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=wx.T,l=wx.path.webuploader,s=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",c={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/*"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/*,application/pdf"
},
fileSingleSizeLimit:2097152
},
7:{
accept:{
extensions:"bmp,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:2097152
}
};
c[15]=c[4];
var p=function(e){
t.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},m=function(e){
var i=n.Uploader;
0==i.support("flash")?p("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?p("<p>您的浏览器不支持上传</p>"):e.refresh();
},u=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},d={
swf:l,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:5,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1e8,
height:1e8,
quality:90,
compressSize:0,
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},f=new Image,g={},h=function(e){
if(!e.url)throw"missing url";
var t,l,s,p=$('<ul class="upload_file_box" style="display:none"></ul>'),f=$(e.container);
f.on("click",function(){
Math.random()<.1&&u(12),m(t);
}).parent().append(p),function(){
0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),l={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket),
pick:{
id:f,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},s=c[e.type]||c[2],e=$.extend(!0,{},d,l,s,e);
try{
t=n.create(e);
}catch(h){
if(!t)return;
}
return p.on("click",".js_cancel",function(){
var e=$(this).data("id");
t.cancelFile(e),$(this).hide();
}),t.on("beforeFileQueued",function(i){
return Math.random()<.1&&u(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),t.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
p.append(r(o,i)).show();
}),t.on("fileDequeued",function(){
Math.random()<.1&&u(14),e.onCancel&&e.onCancel();
}),t.on("uploadProgress",function(i,n){
var t="#uploadItem%s".sprintf(i.id),a=p.find(t).find(".progress_bar_thumb");
a.width("%s%".sprintf(100*n)),1==n&&p.find(t).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),t.on("uploadStart",function(e){
g[e.id]=+new Date;
}),t.on("uploadSuccess",function(n,t,o){
if(Math.random()<.1&&u(16),t&&t.base_resp){
var r=+t.base_resp.ret;
if(0==r)Math.random()<.1&&(u(17),g[n.id]&&i(+new Date-g[n.id]));else switch(n.setStatus("invalid"),
r){
case-18:
a.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
a.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
a.err("上传文件过于频繁，请稍后再试");
break;

case-10:
a.err("上传文件过大");
break;

case-22:
a.err("上传音频文件不能超过60秒");
break;

case-39:
a.err("上传图片已超过宽度（或者高度）限制，请将图片调整到宽度4000像素以下，高度4000像素以下后重试");
break;

default:
a.err("上传文件发送出错，请刷新页面后重试！");
}
}
e.onComplete&&e.onComplete(null,n.id,n,t,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),t.on("uploadFinished",function(i){
this.reset(),p.fadeOut().html(""),g={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),t.on("uploadError",function(){
Math.random()<.1&&u(15),e.onError&&e.onError();
}),t.on("error",function(i,t,o){
switch("object"==typeof t&&(o=t),i){
case"Q_EXCEED_NUM_LIMIT":
a.err("一次上传最多只能上传%s个文件".sprintf(t));
break;

case"F_EXCEED_SIZE":
a.err("文件大小不能超过%s".sprintf(n.formatSize(t,"0")));
break;

case"Q_TYPE_DENIED":
a.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),t;
},b=function(e){
return function(i){
return i.url=e,h(i);
};
},w=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:h,
uploadBizFile:b(s+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:b(s+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:b(s+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:b(s+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:b(s+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:b(s+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:b(s+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:b(s+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:b(s+"/misc/setlocation?action=upload"),
uploadCdnFileFromAd:function(e){
return b(s+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=s+"/cgi-bin/filetransfer?action=upload_material&f=json",1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),
h(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return b(s+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
tmpFileUrl:w(s+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:w(s+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:w(s+"/cgi-bin/filetransfer?action=multimedia")
};
});define("common/wx/tooltipsManager.js", [ "common/wx/tooltips.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = e("common/wx/tooltips.js"), s = {
tooltips: [],
init: function(e, t) {
var n = this;
$(e).each(function() {
t.container = this, n.add(new i(t));
});
},
add: function(e) {
this.tooltips.push(e);
},
hideAll: function() {
for (var e = 0; e < this.tooltips.length; e++) this.tooltips[e].hide();
},
removeItem: function(e) {
for (var t = 0; t < this.tooltips.length; t++) if (this.tooltips[t] === e) return this.tooltips.splice(t, 1), e.$dom.remove(), !0;
return !1;
},
removeIndex: function(e) {
if (e >= this.tooltips.length || e < 0) return;
var t = this.tooltips[e];
this.tooltips.splice(e, 1), t.$dom.remove();
},
current: function() {},
hide: function() {},
removeAll: function() {
for (var e = 0; e < this.tooltips.length; e++) this.tooltips[e].$dom.remove();
this.tooltips = [];
}
};
return s;
} catch (o) {
wx.jslog({
src: "common/wx/tooltipsManager.js"
}, o);
}
});define("common/wx/tooltips.js", [ "tpl/tooltips.html.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = {
position: {},
container: "",
type: "hover",
buttons: [],
delay: 300,
disabled: !1,
reposition: !1,
container_close: !1,
parentClass: "",
container_mode: "absolute"
}, s = wx.T, o = e("tpl/tooltips.html.js"), u = "btn_disabled", a = "hover", f = "show", l = function(e) {
this.options = e = $.extend(!0, {}, i, e), this.$container = $(this.options.container);
if (!this.$container || this.$container.length == 0) return;
var t = this.$container.offset(), n = this.$container.height(), r = this.options.position.left || this.$container.data("x") || 0, l = n + (this.options.position.top || this.$container.data("y") || 0);
this.options.offset = {
left: t.left + r,
top: t.top + l,
left_x: r,
top_y: l
}, !e.content && (e.content = this.$container.data("tips") || ""), this.$dom = $(s(o, e)).appendTo("body"), this.options.disabled && this.$container.addClass(u);
var c = this, h = this.options.type === a || this.options.type === "click" ? this.options.type : a;
if (h == a) {
var p = null;
this.$container.hover(function(e) {
c.options.onshow && typeof c.options.onshow == "function" ? c.options.onshow.apply(c) : !c.options.disabled && c.show();
}, function(e) {
p = window.setTimeout(function() {
c.hide();
}, c.options.delay);
}), this.$dom.hover(function(e) {
p && window.clearTimeout(p);
}, function(e) {
c.hide();
});
} else this.$container.click(function(e) {
if (c.options.disabled) return;
if (c.options.onbeforeclick && typeof c.options.onbeforeclick == "function" && c.options.onbeforeclick.apply(c) === !1) return;
return c.$dom.data(f) ? c.options.onclose && typeof c.options.onclose == "function" ? c.options.onclose.apply(c) : c.hide() : c.options.onshow && typeof c.options.onshow == "function" ? c.options.onshow.apply(c) : c.show(), !1;
});
$(document).on("click", function(e) {
c.options.onclose && typeof c.options.onclose == "function" ? c.options.onclose.apply(c, [ e ]) : c.hide();
}), c.$dom.find(".js_popover_close").on("click", function(e) {
return c.options.onclose && typeof c.options.onclose == "function" ? c.options.onclose.apply(c, [ e ]) : c.hide(), !1;
}), this.$dom.hide(), function() {
$.each(c.$dom.find(".btn"), function(e, t) {
c.options.buttons[e].click && $(t).on("click", function() {
c.options.buttons[e].click.apply(c);
});
});
}();
};
l.prototype = {
constructor: l,
show: function() {
if (this.options.reposition) {
var e = this.$container.offset(), t = e.left + this.options.offset.left_x, n = e.top + this.options.offset.top_y;
this.$dom.css({
left: t,
top: n
}).show();
} else this.$dom.show();
this.$dom.data(f, !0);
},
hide: function() {
this.$dom.hide(), this.$dom.data(f, !1);
},
enable: function() {
return this.options.disabled = !1, this.$container.removeClass(u), this;
},
disable: function() {
return this.options.disabled = !0, this.$container.addClass(u), this;
}
}, n.exports = l;
} catch (c) {
wx.jslog({
src: "common/wx/tooltips.js"
}, c);
}
});define("tpl/step.html.js", [], function(e, t, n) {
return '<ul class="processor_bar grid_line">\n    {each stepArr as item index}\n    <li class="{if (index+1==length)}no_extra{/if} step grid_item size1of{length} {item.cls}">\n        <h4>{item.name}</h4>\n    </li>\n    {/each}\n</ul>\n';
});define("tpl/top.html.js", [], function(e, t, n) {
return '<ul class="tab_navs title_tab" data-index="{itemIndex=0}">\n    {each data as o index}\n    {if (typeof o.acl == "undefined" || o.acl == 1)}\n    <li data-index="{itemIndex++}" class="tab_nav {if (itemIndex == 1)}first{/if} js_top {o.className}" data-id="{o.id}"><a href="{o.url}" {if o.target==\'_blank\'}target="_blank"{/if}>{o.name}</a></li>\n    {/if}\n    {/each}\n</ul>\n';
});define("tpl/cardticket/send_card.html.js",[],function(){
return'<div>\n<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_card_list"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	\n</div>';
});define("cardticket/card_quantity.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","tpl/cardticket/card_quantity.html.js","common/wx/tooltips.js","common/wx/tooltipsManager.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),o=t("common/wx/Tips.js"),n=(t("biz_web/ui/checkbox.js"),
template.compile(t("tpl/cardticket/card_quantity.html.js"))),i={
container:"",
quantityChange:$.noop,
setquantity:!0
},a=t("common/wx/tooltips.js"),c=t("common/wx/tooltipsManager.js"),r=function(t){
t=$.extend(!0,{},i,t),this.opt=t;
var r=this;
$(t.container).on("click",function(i){
var s,u=$(this).data("cid");
if(t.before&&t.before(u)===!1)return!1;
var d=new a({
container:this,
content:n({
setquantity:t.setquantity
}),
container_mode:t.mode||"absolute",
type:"click",
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),o=t.target,n=!1;o&&o!==document.body;){
if(o==e){
n=!0;
break;
}
o=o.parentNode;
}
n?this.show():this.hide();
}
},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var n=d.$dom,i=n.find(".js_value"),a=parseInt($.trim(i.val()));
if(isNaN(a)||0>=a)return o.err("库存必须是不能小于1的整数"),!1;
var m=1e9;
return a>=m?(o.err("库存不能大于10亿"),i.focus(),!1):void e.post({
url:"/merchant/electroniccardmgr",
data:{
action:t.setquantity?"modifyquantity":"setquantity",
card_id:u,
value:a,
isadd:s.value()
}
},function(n){
0==n.base_resp.ret?(o.suc("设置库存成功"),c.removeAll(),t.quantityChange&&t.quantityChange.call(r,u,!t.setquantity||s.value()?a:-a)):1e4==n.base_resp.ret?o.err("库存不能小于0"):e.show(n);
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
c.removeAll();
}
}]
});
d.show(),c.removeAll(),c.add(d),$(".popover").css("z-index","10000"),s=d.$dom.find(".js_quantity_type").checkbox(),
d.$dom.find(".js_value").focus(),i.stopPropagation();
});
};
return r;
});define("tpl/cardticket/card_preview.html.js",[],function(){
return'<div class="pop_card_preview js_pop_card_preview">\n	<span class="hook hook_right_top js_arrow">\n	<!--\n		箭头位置 \n		hook_right_top      右偏上\n		\n	-->\n		<span class="hook_top"></span>\n		<span class="hook_btm"></span>\n	</span>\n	<div class="card_preview">\n		<div class="client_side">\n			<div class="banner">{convert_type card.type}</div>\n			<div class="wrp">\n				<div class="top" style="background-color: {card.color};border-bottom-color: {card.color};">\n					<div class="logo group">\n						<div class="avartar l"><img src="{http2https card.logo_url}"></div>\n						<p>{card.brand_name}</p>\n					</div>\n					<div class="msg">\n						<div class="main_msg">\n							<p>{card.title}</p>\n							<p class="title_sub">{card.sub_title}</p>\n						</div>\n						<p class="time">有效期 {validtime card \'YYYY-MM-DD\'}</p>\n					</div>\n					<div class="deco"></div>\n				</div>\n				<div class="wrp_content">\n					<div class="wrp_section section_dispose">\n						{if card.code_type==0}\n							<div class="main_msg sn">1513-2290-1878</div>\n						{else if card.code_type==1}\n							<div class="bar_code_panel">\n								<div class="main_msg bar_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{else if card.code_type==2}\n							<div class="qr_code_panel">\n								<div class="main_msg qr_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{/if}\n						<p>{card.notice}</p>\n					</div>\n					<div class="wrp_section">\n						<ul class="info_list">\n							<li class="info_li">\n								<p class="info">{convert_type card.type}详情</p>\n								<span class="supply_area"><i class="ic ic_go"></i></span>\n							</li>\n							<li class="info_li">\n								<p class="info">适用门店</p>\n								<span class="supply_area">{card.location_id_list.length}家<i class="ic ic_go"></i></span>\n							</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>';
});define("tpl/cardticket/card_table.html.js",[],function(){
return'<div class="release_method js_card_container">\n	{if loading}\n	<i class="icon_loading_small white">loading...</i>\n	{else}\n	<div class="sub_title_bar group">\n		<!-- <span class="frm_input_box search append">\n			<a href="javascript:void(0);" class="js_search frm_input_append">\n				<i class="icon16_common search_gray">搜索</i>\n				&nbsp;\n			</a>\n			<input type="text" placeholder="请输入卡券名称" class="frm_input js_keyword">\n		</span> -->\n	</div>\n	<div class="table_wrp release_method_select_table_wrp">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell release_method_select_box">&nbsp;</th>\n					<th class="table_cell release_method_kind"><div class="td_panel">卡券类型</div></th>\n					<th class="table_cell release_method_name"><div class="td_panel">卡券名称</div></th>\n					<th class="table_cell release_method_time"><div class="td_panel">卡券有效期</div></th>\n					<th class="table_cell release_method_stock"><div class="td_panel">库存</div></th>\n					{if payflag==1||payflag==2}<th class="table_cell release_method_price"><div class="td_panel">微信价(元)</div></th>{/if}\n					<!-- <th class="table_cell release_method_preview"><div class="td_panel">预览</div></th> -->\n					<th class="table_cell release_method_state"><div class="td_panel">卡券状态</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n			{if !data.length}\n				<tr>\n					<td class="empty_tips" colspan="6">暂无卡券</td>\n				</tr>\n			{else}\n			{each data as card i}\n            <tr  {if hasdata && (i<pageInfo.begin||i>=pageInfo.begin+pageInfo.count)}class="dn"{/if} id="js_ct_tr_{card.id}">\n					<td class="table_cell release_method_select_box"><div class="td_panel">\n						{if !multi}\n						<label class="frm_radio_label">\n							<i class="icon_radio"></i>\n							<input type="radio" data-id="{card.id}" value="{card.id}" class="frm_radio js_select">\n						</label>\n						{else}\n						<label class="frm_checkbox_label">\n							<i class="icon_checkbox"></i>\n							<input type="checkbox" data-id="{card.id}" value="{card.id}" class="frm_checkbox js_select">\n						</label>\n						{/if}\n					</div></td>\n					<td class="table_cell release_method_kind"><div class="td_panel">{convert_type card.type}</div></td>\n					<td class="table_cell release_method_name"><div class="td_panel">{card.title}</div></td>\n					<td class="table_cell release_method_time"><div class="td_panel">{validtime card \'YYYY-MM-DD\'}</div></td>\n					<td class="table_cell release_method_stock"><div class="td_panel"><span class="js_sendcard_quantity">{card.quantity}</span>\n						{if editquantity && !card.is_from_intercomm && card.can_edit_quantity}<a class="icon14_common edit_gray js_modify_quantity" href="javascript:;" data-new="{if card.isnew}1{/if}" data-cid="{card.id}" data-x="-126"></a>{/if}</div>\n					</td>\n					{if payflag==1||payflag==2}<td class="table_cell release_method_price"><div class="td_panel">{if card.ispay}{card.price}{else}--{/if}</div></td>{/if}\n					<!-- <td class="table_cell release_method_preview"><div class="td_panel"><a data-cid="{card.id}" data-x="-125" class="js_card_preview" href="javascript:void(0);">预览</a></div></td> -->\n					<td class="table_cell release_method_state"><div class="td_panel"><span class="fail pass"><i></i>{convert_state card.status}</span></div></td></td>\n				</tr>\n			{/each}\n			{/if}\n			</tbody>\n		</table>\n        <div class="js_pager"></div>\n        {if multi}\n        <p class="dialog_bt_tip">已选<span class="js_selectcount">{defaultValues.length||0}</span>个</p>\n        {/if}\n	</div>\n	{/if}\n</div>\n';
});define("cardticket/common_template_helper.js",["common/wx/upload.js","biz_common/moment.js"],function(e){
"use strict";
function t(e){
return e.replace(/\\n/g,"<br/>");
}
function r(e){
var t="YYYY-MM-DD HH:mm:ss",r=p(e,t);
return r?r.format("YYYY-MM-DD"):"";
}
var n=e("common/wx/upload.js"),p=e("biz_common/moment.js"),a={
10:"会员卡",
21:"门票",
22:"电影票",
4:"代金券",
1:"团购券",
2:"折扣券",
3:"礼品券",
0:"优惠券"
},m={
1:"审核中",
2:"未通过",
3:"待投放",
4:"已删除",
5:"待投放",
6:"已投放",
8:"已过期"
},p=e("biz_common/moment.js");
template.helper("convert_state",function(e){
return m[e]||e;
}),template.helper("convert_type",function(e){
return a[e]||e;
}),template.helper("card_type_map",function(e){
return e;
}),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),p.unix(e).format(t);
}),template.helper("validtime",function(e,t){
if(1==e.time_type){
var r=p.unix(e.begin_time).format(t)+"至"+p.unix(e.end_time).format(t);
return e.end_time<p().unix()&&(r+="(已过期)"),r;
}
return 2==e.time_type?(e.from_day=0==e.from_day?"当":e.from_day,"领取后{from_day}天生效{fixed_term}天有效".format(e)):"";
}),template.helper("addtoken",function(e){
return wx.url(e);
}),template.helper("nl2br",function(e){
return t(e);
});
var i={
1:"50万以下",
2:"50-100万",
3:"100-500万",
4:"500-1000万",
5:"1000万以上"
};
template.helper("convert_business_volume_type",function(e){
return i[e]||e;
});
var l={
0:"未审核",
2:"审核中",
3:"生效",
4:"审核失败"
};
template.helper("convert_store_state",function(e){
return l[e]||e;
}),template.helper("$preview",function(e){
if(!e)return"无";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=n.tmpFileUrl(e)):t=n.multimediaFileUrl(e),
"<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t,t);
}),template.helper("$upload_preview",function(e){
if(!e)return"";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=n.tmpFileUrl(e)):t=n.multimediaFileUrl(e),
"<img src='%s' style='width:260px;' />".sprintf(t);
}),template.helper("$preview_stuffs",function(e){
for(var t=[],r=e.stuffs,n=0;n<r.length;n++){
var p=r[n]+"_preview_tpl";
$("#"+p).length&&t.push(template.render(p,e));
}
return t.join("");
});
var o={
2:"女",
1:"男"
};
template.helper("convert_gender",function(e){
return o[e]||"未知";
}),template.helper("percentage",function(e,t,r,n){
var r=e/t*100;
return n&&r>n&&(r=n),r.toFixed(2);
});
var u={
"":"全部",
0:"API渠道",
1:"嵌入图文消息",
2:"直接群发卡券",
3:"下载二维码"
};
template.helper("convert_channel",function(e){
return u[e]||e;
}),template.helper("convert_provide_time",r),template.helper("http2https",function(e){
return e?(e+"").http2https():"";
}),template.helper("https2http",function(e){
return e?(e+"").https2http():"";
}),template.helper("codepad",function(e){
var t=new RegExp("([^s]{4})(?=([^s])+$)","ig");
return e.replace(t,"$1-");
});
var c={
0:"等待接收",
1:"已接收",
3:"过期退回",
2:"已拒绝"
},_={
0:"等待接收",
2:"已拒绝",
1:"已接收",
3:"过期退回"
};
return template.helper("convert_intercard_status",function(e){
return c[e]||e;
}),template.helper("convert_intercard_rec_status",function(e){
return _[e]||e;
}),{
type_map:a,
status_map:m,
store_status:l,
gender_map:o,
source_map:u,
convert_provide_time:r,
nl2br:t
};
});define("cardticket/store_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js"],function(t){
"use strict";
var s=t("common/wx/Cgi.js"),e=t("common/wx/Tips.js"),o=t("common/wx/tooltips.js"),c=t("common/wx/tooltipsManager.js"),n=(t("common/wx/dialog.js"),
{
deleteStore:function(t){
s.post({
url:"/merchant/entityshop?action=delete",
data:{
id:t.store_id
},
btn:t.btn
},function(o){
0==o.base_resp.ret?(e.suc("删除门店成功"),t.success&&t.success()):s.show(o);
});
},
deleteWithConfirm:function(t){
if(3==t.state||4==t.state){
var s=new o({
container:t.container,
content:"删除将影响在用此门店的相关业务。<br />你确定要删除吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
if(t.success){
var s=t.success;
t.success=function(){
s&&s(),c.removeAll();
};
}
n.deleteStore(t);
}
},{
text:"取消",
type:"btn_default",
click:function(){
c.removeAll();
}
}]
});
s.show(),c.removeAll(),c.add(s);
}
},
listStore:function(t){
s.get({
url:"/merchant/entityshop",
data:{
action:"list",
begin:0,
count:9999999,
keyword:t.keyword,
task_id:t.task_id,
audit_state:t.audit_state||3
}
},function(e){
if(0==e.base_resp.ret){
var o=$.parseJSON(e.data),c=o.store_location;
t.success&&t.success({
shop_list:c,
total_num:e.total_count
});
}else s.show(e);
});
},
canSendCard:function(t){
t.success&&t.success(!0);
}
});
return n;
});define("common/wx/Step.js", [ "widget/processor_bar.css", "tpl/step.html.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = wx.T, s = e("widget/processor_bar.css"), o = e("tpl/step.html.js"), u = {
selected: 1
}, a = function() {
var e = navigator.userAgent.toLowerCase(), t = /(msie) ([\w.]+)/.exec(e) || [], n = t[1] || "";
return n == "msie";
};
function f(e) {
this.opts = $.extend(!0, {}, u, e), this.init();
}
f.prototype.init = function() {
var e = this.opts, t = e.names.length, n = parseInt(e.selected, 10), r = [], s, u;
n = n < 0 ? 0 : n > t ? t : n;
for (s = 0; s < t; s++) u = f.getClass(s + 1, n), r.push({
name: e.names[s],
cls: u
});
this.$dom = $(i(o, {
stepArr: r,
length: t
})).appendTo(e.container), a() && this.$dom.addClass("ie");
}, f.prototype.setStep = f.prototype.go = function(e) {
var t = this.$dom.find("li.step"), n = t.length;
return e = e < 0 ? 0 : e > n ? n : e, t.each(function(t, r) {
var i = f.getClass(t + 1, e);
t + 1 == n ? r.className = "no_extra " + "step grid_item size1of%s %s".sprintf(n, i) : r.className = "step grid_item size1of%s %s".sprintf(n, i);
}), this;
}, f.getClass = function(e, t) {
var n;
return e < t - 1 ? n = "pprev" : e === t - 1 ? n = "prev" : e === t ? n = "current" : e === t + 1 ? n = "next" : e > t + 1 && (n = "nnext"), n;
}, n.exports = f;
} catch (l) {
wx.jslog({
src: "common/wx/Step.js"
}, l);
}
});