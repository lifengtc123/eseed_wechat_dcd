function getTime(){
	time.innerHTML = "";
	today=new Date();
	var hours=today.getHours();
	var minutes=today.getMinutes();
	var seconds=today.getSeconds();
	var timeValue=""+hours; //+((hours>12)?hours-12:hours);
	timeValue+=(minutes<10)?(":0"+minutes+""):(":"+minutes);
	timeValue+=(seconds<10)?(":0"+seconds+""):(":"+seconds);
	function initArray() {
		this.length=initArray.arguments.length;
		for(var i=0;i<this.length;i++)
			  this[i+1]=initArray.arguments[i];
	}
	var d=new initArray("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var datetime=("现在是"+(today.getMonth()+1)+"月"+""+today.getDate()+"日 "+timeValue+" "+d[today.getDay()+1]);
	time.innerHTML = time.innerHTML + datetime;
	setTimeout("getTime()",30);
}