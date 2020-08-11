Array.prototype.checkPush = function(data){
	var duplicated = false;
	for(var i=0; i < this.length; i++){
		if(data.name == this[i].name){
			duplicated = true;
			break;
		}
	}

	if(duplicated == false){
		this.push(data);
	}
};

Number.prototype.format = function(){
	if(this==0) return 0;

	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (this + '');

	while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

	return n;
};

String.prototype.removeComma = function(){
	return(this.replace(/,/g,''));
};

String.prototype.moneyFormat = function(){
	if(isNaN(this) == true) return 0;

	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (this + '');

	while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

	return n;
};


//OS 체크 불린값 전달 window 폰, window 기반 태블릿pc 에서 테스트가 필요함
function chaked_OS(){
	var device = navigator.userAgent;
	var str = device.split(";");
		str = str[0].split("(");
		str = str[1].split(" ");
	var chkOS = false;
	if(str[0] != "Windows" && str[0] != "Macintosh" && str[0] != "compatible"){
		chkOS = true; // 데스크탑이 아닐 때 true
	}
	return chkOS;
}
//MSIE 9이하 버전체크
function ms_ver(){
	if(navigator.userAgent.match('MSIE')){
		var msie = navigator.userAgent;
		var ms_ver = msie.substr(msie.lastIndexOf('MSIE')).split('MSIE')[1];
			ms_ver = Number(ms_ver.split('.')[0]);
		return ms_ver;
	}else{
		return null;
	}
}

$(document).ready(function(){
	flowlabel(); //인풋 레이블
	selectDesign(); //셀렉트박스 디자인
	dashboardTab(); //대쉬보드 아코디언

	

});

$(window).bind("load resize",function(){
	setTimeout(function(){
	},100);
});

$(window).bind("load resize scroll",function(){ });
// $(window).load(function(){ });
$(window).resize(function(){ });
$(window).scroll(function(){ });
 
// 인풋 레이블
function flowlabel(){
	if(!$("label").is(".flow")) return false;
	var o1 = $("label.flow");
	var o2 = $("label.flow").next();
	o1.css({"position":"absolute"});
	o1.bind("click focusin",function(){ $(this).css({"visibility":"hidden"}); });
	o2.bind("click focusin",function(){ $(this).prev().css({"visibility":"hidden"}); });
	o2.bind("focusout",function(){
		if($(this).val() == ""){ $(this).prev().css({"visibility":"visible"}); }
	});
	$.each(o2,function(e){ if($(this).val() != "") $(this).prev().css({"visibility":"hidden"}); });
}

//셀렉트박스 디자인
function selectDesign(){
	var select = $("select.info_select");
	// alert('11');
	select.on('change', function() {
		// alert('22');
		var select_name = $(this).children('option:selected').text();
		$(this).siblings('label').text(select_name);
	}).trigger('change');
}

//대쉬보드 아코디언
function dashboardTab(){
	var dashboardTab_param = $(".dashboard_wrap");
	var dashboardTab_btn = dashboardTab_param.find(".title > a");
	var dashboardTab_obj = dashboardTab_param.find(".conts");
	var event = "click";
	dashboardTab_btn.parent().eq(0).addClass("active");
	dashboardTab_obj.eq(0).addClass("active");
	dashboardTab_btn.parent().parent().eq(0).addClass("current");
	dashboardTab_btn.on(event,function(ev){
		var t = $(this);
		dashboardTab_btn.parent().removeClass("active");
		dashboardTab_obj.removeClass("active");
		dashboardTab_btn.parent().parent().removeClass("current");
		t.parent().addClass("active");
		t.parent().next().addClass("active");
		t.parent().parent().addClass("current");
		ev.preventDefault();
	});
}

 
function commify(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n += '';                          // 숫자를 문자열로 변환

	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}
 

// min (포함) 과 max (불포함) 사이의 난수를 반환
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function exportFile(header, keys, body, title) {

	var csv ='';
	// header.forEach((value, idx, arr) =>{
	// 	csv += value +',';
	// })
	// csv += '\n';
	// // csv = header +'\n';
	
	// $.each(header, function (idx, r){
	// 	if(r){
	// 		csv += r + ',';
	// 	}
	// })
	var i=0;
	for(i=0; i < header.length-1; i++){
		csv += header[i] + ',';
	}
	csv += header[i] + '\n';

	$.each(body, function(index, rows){
  
	  if(rows){
		var tmp = [];
		var o = JSON.stringify(rows);
		o = JSON.parse(o);
		var values = Object.values(o);
		
		csv += values + '\n';
	  }
	})
  
	var KOR =  '%EF%BB%BF';//한글꺠짐방지
	// Data URI
	var csvData = 'data:application/csv;charset=utf-8,' +KOR+','+ encodeURIComponent(csv);
	
	var fileEle = document.createElement('a');
	fileEle.href='data:application/csv;charset=utf-8,'  +KOR+';'+ encodeURI(csv);
	fileEle.target = '_blank';
	fileEle.download = title +'.csv';
    fileEle.click();
    
  }

  function exportCSVFile(csv, filename) {

	let csvFile;
	let downloadLink;

	// CSV 파일을 위한 Blob 만들기
	csvFile = new Blob(["\ufeff"+csv], {type: "text/csv;charset=utf-8;"})

	// Download link를 위한 a 엘리먼스 생성
	downloadLink = document.createElement("a")

	// 다운받을 csv 파일 이름 지정하기
	downloadLink.download = filename;

	// 위에서 만든 blob과 링크를 연결
	downloadLink.href = window.URL.createObjectURL(csvFile)

	// 링크가 눈에 보일 필요는 없으니 숨겨줍시다.
	downloadLink.style.display = "none"

	// HTML 가장 아래 부분에 링크를 붙여줍시다.
	document.body.appendChild(downloadLink)

	// 클릭 이벤트를 발생시켜 실제로 브라우저가 '다운로드'하도록 만들어줍시다.
	downloadLink.click();
  }

  function guid(){
	function s4() {
		return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }


function comparer(index) {
	return function(a, b) {
		var valA = getCellValue(a, index), valB = getCellValue(b, index)
		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
	}
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }

