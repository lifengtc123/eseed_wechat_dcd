// JScript 文件

document.writeln("<iframe id='CoverTemp'frameborder='0'src=''scrolling='no'style='position:absolute;z-index:1;top:0;left:0;height:100%;width:100%;display:none;background-color:#FFF;'></iframe>");

document.writeln("<center><iframe id='divDialog' frameborder='0' src='/IntoForms/showDiv' scrolling='no'style='position:absolute;display:none;z-index:2;'></iframe></center>");

function showCoverDivLodding()
{
    var varbody = document.getElementsByTagName("form1")[0];
    $("#CoverTemp").show().css("filter","alpha(opacity=60)").css("opacity","0.6");
    $('#divDialog').show().css("width" ,326).css("height" ,65).css("left" ,(document.body.clientWidth - 248) / 2).css("top",(document.body.clientHeight - 60) / 2);
}
