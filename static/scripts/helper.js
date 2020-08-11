var BaseUrl = "https://www.peiu.co.kr:3020/api"

let facilitybyrcc;
let facilitybyagg;
let facilitybysite;

let ownerlistbyrcc;
let ownerlistbyagg;

var version = 'v1'
var serviceCode = {
    "1" : "스케줄링(전력거래)",
    "2" : "스케줄링(PPA)",    
    "4" : "DR",
    "8" : "Peak-Cut",
    "16" : "전력품질(FR)",
    "32" : "전력품질(VR)"
}
var devicecode = { '0' : 'PCS',  '1' : 'BMS', '2' : 'PV'}

var RccList =  {
    "0"  : "전국",
    "1"  : '경기',
    "2"  : '인천',
    "3"  : '서울',
    "4"  : '대전',
    "5"  : '충남',
    "6"  : '전북',
    "7"  : '전남',
    "8"  : '광주',
    "9"  : '강원',
    "10"  : '충북',
    "11"  : '경북',
    "12"  : '대구',
    "13"  : '울산',
    "14"  : '부산',
    "15"  : '경남',
    "16"  : '제주',

}

function rccFormating(addr){
     var code = 0;
    var s = String(addr).substr(0,2);

    if(s == "서울"){
        code = "3"
    }else if(s == "부산"){
        code = '14'
    }else if(s == "대구"){
        code = '12'
    }else if(s == "인천"){
        code = '2'
    }else if(s == "광주"){
        code = '8'
    }else if(s == "대전"){
        code = '4'
    }else if(s == "울산"){
        code = '13'
    }else if(s == "세종"){
        code = '5'
    }else if(s == "경기"){
        code = '1'
    }else if(s == "강원"){
        code = '9'
    }else if(s == "전북"){
        code = '6'
    }else if(s == "충남"){
        code = '5'
    }else if(s == "전남"){
        code = '7'
    }else if(s == "경북"){
        code = '11'
    }else if(s == "경남"){
        code = '15'
    }else if(s == "충북"){
        code = '10'
    }

    return code;
}

function addressFormating(addr){
     var result = "";
  var s = String(addr).substr(0,2);
  if(s == "서울"){
    result = addr.replace(s,"서울특별시")
  }else if(s == "부산"){
    result = addr.replace(s,"부산특별시")
  }else if(s == "대구"){
    result = addr.replace(s,"대구광역시")
  }else if(s == "인천"){
    result = addr.replace(s,"인천광역시")
  }else if(s == "광주"){
    result = addr.replace(s,"광주광역시")
  }else if(s == "대전"){
    result = addr.replace(s,"대전광역시")
  }else if(s == "울산"){
    result = addr.replace(s,"울산광역시")
  }else if(s == "세종"){
    result = addr.replace(s,"세종특별자치시")
  }else if(s == "경기"){
    result = addr.replace(s,"경기도")
  }else if(s == "강원"){
    result = addr.replace(s,"강원도")
  }else if(s == "전북"){
    result = addr.replace(s,"전라북도")
  }else if(s == "충남"){
    result = addr.replace(s,"충청남도")
  }else if(s == "전남"){
    result = addr.replace(s,"전라남도")
  }else if(s == "경북"){
    result = addr.replace(s,"경상북도")
  }else if(s == "경남"){
    result = addr.replace(s,"경상남도")
  }else if(s == "충북"){
    result = addr.replace(s,"충청북도")
  }
  return result;
}

function seturl(category,resource,type, period, id, date){
    var c="", p=""

    // type : site, agg, rcc
    // period : yymmdd, yymm, yy
    // id : id 파라미터 요청 값이 있는 경우

   
    // 첫번째 분류 선택
    switch (category){
        case 'm' :
            c = 'measurement/'
            break;
        case 's' :
            c = 'statisitcs/'
            break;
        case 'i' :
            c = 'information/'
            break;
        case 'h' :
            c = 'history/'
            break;
        case 'e' :
            c = 'event/'
            break;
        default :
            c = category + '/';
            break;
    }


    if(date == null || date == undefined){
        // 날짜 파라미터가 없는 경우 금일자 데이터 조회
        var d = new Date();
        switch (period){
        case 'yymmdd' :
            p = d.getFullYear() +'/'+ ("0"+(d.getMonth()+1)).slice(-2) +'/'+("0"+d.getDate()).slice(-2);
            break;
        case 'yymm' :
            p = d.getFullYear() +'/'+ ("0"+(d.getMonth()+1)).slice(-2)
            break;
        case 'yy' :
            p =  d.getFullYear() 
            break;
        default :
            p = '';
            //return;
        }
    }
    else{
        // 날짜 문자열을 파라미터로 받은 경우 요청일 데이터 조회
        d = date.split('-');
        switch (period){
            case 'yymmdd' :
                p = d[0] +'/'+ d[1] +'/'+ d[2];
                break;
            case 'yymm' :
                p = d[0] +'/'+ d[1]
                break;
            case 'yy' :
                p =  d[0] 
                break;
            default :
                p = '';

        }
    }


    if(type == null){
        return '/api/'+c+'v1/'+resource;
    }
    else if(id == null || id == undefined){
        // id 파라미터 요청 값이 없는 경우의 url 세팅
        return '/api/'+c+'v1/'+resource+'/'+type+'/'+p;
    }
    
    else{
        // id 파라미터 요청 값이 있는 경우의 url 세팅
        return '/api/'+c+'v1/'+resource+'/'+type+'/'+p + '?id='+ id;
    }

}
function setismarturl(type1, type2, from, to, id){

    //  accmofdaily/maxdemand/2020/06/18 &id=fhty
    //  account
    //  history/charge/?id=cge96&startdt=2020-06-10&enddt=2020-06-11 
    //  history/discharge/?id=cge96&startdt=2019-12-08&enddt=2019-12-09 
    //  history/load/?id=rhdms2059&startdt=2019-12-08&enddt=2019-12-09 
    //  history/onsitepower/?id=rhdms2059&startdt=2019-12-08&enddt=2019-12-09 
    //  summary?startdt=2019-12-08&enddt=2019-12-09&id=rhdms2059 
    //  season/maxdemand/2020/20/20 &id=sad

    console.log(type1, type2, from, to, id)

    //https://www.peiu.co.kr:3077/api/ismart/v1/ismart/summary?startdt=2019-12-08&enddt=2019-12-09&id=rhdms2059&isheavy=true&isexceptholiday=true
    
    //https://www.peiu.co.kr:3077/api/ismart/v1/summary?isheavy=false&isexceptholiday=false&startdt=2020-06-11$enddt=2020-06-11&id=0422203118

    
    var url = 'https://www.peiu.co.kr:3077/api/ismart/v1/'
    var holiday = '?isheavy=false&isexceptholiday=false' // 고정값
    
    // url 세팅
    if(type1 == 'account')
    {
        url += type1;
        return url;
    }
    else if(type2 == null)
    {
        url += type1 + holiday
    }
    else
    {
        url += type1 + '/' + type2 + holiday
    }
    
    // 기간 단위 세팅
    if(type2 == 'maxdemand')
    {
        from.split('-')
        url += '/' + from[0] + '/' + from[1] + '/' + from[2];
    }
    else
    {
        url += '&startdt=' + from + '&enddt=' + to;
    }

    // id 조회 세팅
    if(id != null)
    {
        url += '&id=' + id;
        return url;
    }
    else
    {
        return url;
    }
    console.log(url)
}

function ismart(type1, type2, from, to, id)
{

    var url = setismarturl(type1,type2, from, to, id)
    console.log(url)

    var token = Cookies.get('token');
    $.ajax({
        url: url,
        contentType: "application/json",
        type: "get",
        async : false,
        connection: 'keep-alive',
        timeout: 60000,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(resp,xhr){
            var result = resp.Result;
            if(result.Code == 200){
                // 성공
                data = resp.Payload.elements
            }else{
                console.log(url+' ajax data load 실패')
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var msg;
            console.log(url+'[Error:]'+jqXHR.status)
        },
    });

     return data;

}


function _query(query){
    console.log(query)
    var send ={
        "queryType": "SQL",
        "query": query
    }

    var response;
    // 토큰 필요없음 
    $.ajax({
        url: 'https://www.peiu.co.kr:4001/query.json',
        type: "post",
        async : false,
        data : JSON.stringify(send),
        timeout: 60000,
        contentType: "application/json",
        success : function(data){
            
            if(data.queryState == "COMPLETED"){
                response =  data.rows;
            }
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log(textStatus)
        
        },
    })
    return response;
}

function _wherecondition(type, item, siteid){
    var v = "";

    if(type == 'rcc'){
        
        v = ownerlistbyrcc.get(Number(item))
        if(v != undefined){
            item ='siteid in(' + v.toString() + ")"
        }else{
            item ='siteid in()'
        }
        
    }else if(type == 'agg'){

        v = ownerlistbyagg.get(String(item))
        if(v != undefined){
            item ='siteid in(' + v.toString() + ")"
        }else{
            item ='siteid in()'
        }
        
    }else{
        item = 'siteid = '+siteid
    }
  
    return item;
}


function getownerfacilitylist(){
    
    var type = "";
    var d = null;
    facilitybyrcc = new HashMap();
    facilitybyagg = new HashMap();
    facilitybysite = new HashMap();
    
    //byrcc 
    type= 'sitebyrcc'
    var d = _ajax('i', 'owner/', type, null, null)
    if(d != undefined ){
    for(var i = 0; i < d.length; i++){
            var f = d[i].facility
            facilitybyrcc.set(d[i].rcc, {
                pcs : f.sumofpcscapacity, 
                bms : f.sumofbmscapacity, 
                pv : f.sumofpvcapacity, 
            })
        }
    }
    
    //byagg
    type= 'sitebyagg'
    facilitybyagg = new HashMap();
    
    var d = _ajax('i', 'owner/', type, null, null)
   
    if(d != undefined ){
        for(var i = 0; i < d.length; i++){
            var f = d[i].facility
            facilitybyagg.set(d[i].aggid, {
                pcs : f.sumofpcscapacity, 
                bms : f.sumofbmscapacity, 
                pv : f.sumofpvcapacity, 
            })
        }
    }
    
    
    //bysite
    type= 'site'
    var d = _ajax('i', 'owner/', type, null, null)
    if(d != undefined){
        var totalpcs = 0, totalbms = 0, totalpv = 0, totalsite = [];
        for(var i = 0; i < d.length; i++){
            var f = d[i].facility
            totalpcs += f.sumofpcscapacity
            totalbms += f.sumofbmscapacity
            totalpv += f.sumofpvcapacity
            totalsite.push(d[i].siteid)

            facilitybysite.set(d[i].siteid, {
                siteid : d[i].siteid,
                pcs : f.sumofpcscapacity, 
                bms : f.sumofbmscapacity, 
                pv : f.sumofpvcapacity, 
            })
        }
        facilitybysite.set(0, { pcs : totalpcs, bms : totalbms, pv : totalpv, siteid : totalsite })
    }
}

let level;

function getownersitelist(){
    // byrcc
    var rcclist = new HashMap();
    
    var all = _ajax('i', 'simpleowner', 'site', null, null)
    if(all == undefined){
        return;
    }
    // 전체
    rcclist.set(0, all)
    
    var list = _ajax('i', 'simpleowner', 'rcc', null, null)
    if(list == undefined){
        return;
    }
    
    for(var i = 0; i< list.length; i++){
        rcclist.set(list[i].rcc, list[i].sitelist)
    }
    ownerlistbyrcc = rcclist;
    
    $nuxt.$emit('ownerlistbyrcc', rcclist)

    //byagg
    var agglist = new HashMap();
    agglist.set(0, all)
    if(getCookie('userType') == 0){
        return;
    }
    list = _ajax('i', 'simpleowner', 'agg', null, null)
    if(list == undefined){
        return;
    }

    for(var i = 0; i< list.length; i++){
        agglist.set(list[i].aggid, list[i].sitelist)
    }
    ownerlistbyagg = agglist;
    $nuxt.$emit('ownerlistbyagg', agglist)
    
}

function _ajax(category, resource, type, period, id, date){
    // date : 보고서에서 특정일 조회 용도로 받음, 아닌경우 현재(오늘)
    var request = seturl(category, resource, type, period, id, date);
    var url = 'https://www.peiu.co.kr:3077'+ request;
    var token = Cookies.get('token');
    var data;
    $.ajax({
        url: url,
        contentType: "application/json",
        type: "get",
        async : false,
        connection: 'keep-alive',
        timeout: 60000,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(resp,xhr){
            
            var result = resp.Result;
            
            if(result.Code == 200){
                // 성공
                data = resp.Payload.elements
            }else{
                console.log(url+' ajax data load 실패')
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var msg;
            console.log(url+'[Error:]'+jqXHR.status)
        },
    });
    
    return data;
}

function getInstalledData(category,id,siteid){
    var target = null;
    var targetitem = null;

    if(category == 'rcc'){
        target = facilitybyrcc
        targetitem = Number(id);
    }else if(category == 'agg'){
        target = facilitybyagg
        targetitem = String(id);
    }else {
        target = facilitybysite
        targetitem = Number(siteid);
    }
    
    if(target == undefined){
        return [];
    }else{
        return target.get(targetitem)
    }
    
}

function downloadCSVfile(btntype, title, data, filename){
    
    var array = data;
    var a = "";
    for(var i = 0; i < title.length; i++){
        a += title[i]  + ","
    }
    a += "\r\n";

    if(btntype == 'equip'){
        $.each(array, function(i, item){
            a += item.data1 + "," + item.data2 + "," + item.data3 + "," + item.data4 + "," + item.data5 + "," + item.data6 + "," + item.data7 + "," + item.data8 + "," + item.data9+ "," + item.data10+',' + item.data11+ "," + item.data12+ "," + item.data13+ "\r\n";
        });
    }else{
        $.each(array, function(i, item){
            a += item.data1 + "," + item.data2 + "," + item.data3 + "," + item.data4 + "," + item.data5 + "," + item.data6 + "," + item.data7 + "," + item.data8 + "," + item.data9+ "," + item.data10+"\r\n";
        });
    }
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff"+a], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function saveCSV(title, data, filename){
    var array = data;
    var a = "";
    for(var i = 0; i < title.length; i++){
        a += title[i]  + ","
    }
    a += "\r\n";
    $.each(array, function(i, item){
        console.log(item.data+i)
        a += item.data1 + "," + item.data2 + "," + item.data3 + "," + item.data4 + "," + item.data5 + "," + item.data6 + "," + item.data7 + "," + item.data8 + "," + item.data9 +"\r\n";
    });
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff"+a], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function savePDF(classname, save){
    html2canvas($('.' + classname)[0]).then(function(canvas) {
        // 캔버스를 이미지로 변환
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('l', 'mm');
        var imgWidth = 297; // 이미지 가로 길이(mm) A4 기준
        var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
        var imgHeight = doc.internal.pageSize.getHeight();
        //var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        
        
        // orientation, unit, forfat
        var position = 0;
        
        // 첫 페이지 출력
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // 파일 저장
        doc.save(save);
    });
}


function setgridDistance(v){
    // 차트 x 축 간격 
    // v : 시작일-종료일 일수 차
    // g : x축 간격 값
    var g;
    if(v == 0){
        g = 100;
    }
    else if( v == 1 ){
        g = 400;
        //g = 600
    }
    else if(v == 2 || v == 3 || v == 4 ){
        g = 300
    }else {
        g = 200
    }
    
    return g;
}
function dateDiff(from ,to){

    var f = from.split('-');
    var t = to.split('-');
    var fromObj = new Date(f[0], Number(f[1])-1, f[2]);
    var toObj = new Date(t[0], Number(t[1])-1, t[2]);
    var diff = (toObj.getTime() - fromObj.getTime())/1000/60/60/24;

    return diff;
}

function setdatelist(from, to){
    var date = 
    [
        {d1 : from}, 
        {d1 : to}
    ]

    var t = new HashMap();
    for(var i = 0; i< date.length; i++){
        for(var j = 0; j< 24; j++){
            if(j < 10){
                var hour = "0"+j
            }else{
                var hour = j
            }
            t.set(date[i].d1 +" " + hour, null)
            
        }
    }
    return t;
}
function filtering(data,period, timelist){
    
    var filtering = new HashMap();
    var s = 0; e = 0;
    if(period == '1min'){
        return data;
    }else if(period == '1hour'){
        s = 0, e = 13
    }else if(period == '6hour'){
        s = 11, e = 13
    }else{
        s = 0, e = 10
    }
    for(var i = 0; i< data.length; i++){
        var times = data[i].timestamp.substring(s,e)
        
        timelist.forEach((v,k)=> {
            if(times == k.substring(s,e)){
                 
                if(filtering.get(times) != null){
                    filtering.set(times, timelist.get(times)+ data[i].data2)
                }else {
                    filtering.set(times, data[i].data2)
                }
            }
        })
    }
    return filtering
    
}


function errorpoup(msg){
    //팝업 열림 (팝업 아이콘 모양:숫자, 버튼 갯수:숫자, 얼럿 내용:변수)

    var btnCont = '<button type="button" onKeyDown="javascript:onkeydown();" onclick="javascript:confirmAlert();" class="btn btn_size_free btn_color_blue"><span>확인</span></button>';
    
    var alertBody = '<div tabindex="0"  id="alert_wrap" class="alert_ico_typ1 alert_btn_typ1">';
        alertBody += '		<div class="alert_dim">';
        alertBody += '			<div class="alert_body">';
        alertBody += '				<div class="alert_icon"></div>';
        alertBody += '				<div class="alert_txt">'+msg+'</div>';
        alertBody += '				<div class="alert_btn_wrap">'+btnCont+'</div>';
        alertBody += '			</div>';
        alertBody += '		</div>';
        alertBody += '	</div>';
    $("#wrapper").append(alertBody);

    $(function() {
        $("#alert_wrap").focus();
    })

    $("#alert_wrap").on('keypress', function(event) {
        
        // space : 32 enter : 13
        if(event.keyCode == 32 || event.keyCode == 13){
            confirmAlert();
        }

    })
}

function convert(p, t){
    // p : 리턴 값 마지막 단위
    // t : unix time code

    if(t == 0){
        return;
    }

    var date = new Date(t)
    var year = date.getFullYear();
    var month = "0"+ (date.getMonth()+1)
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds()

    switch (p){
    case 'yyyy-mm-dd' :
        return year + "-" + month.substr(-2) + "-" + day.substr(-2);
    case 'hh' :
        return hour.substr(-2);
    case 'dd' :
        return day.substr(-2);
    case 'mm' :
        return month.substr(-2);
    case 'hh:mm:ss' :
        return month.substr(-2);
    case 'yy-mm-dd hh:mm' :
        return year + "-" + month.substr(-2) + "-" + day.substr(-2) +" " + hour.substr(-2) + ":" + minute.substr(-2)
    case 'yy-mm-dd hh:mm:ss' : 
        return year + "-" + month.substr(-2) + "-" + day.substr(-2) +" " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2)
    default :
        console.log('category 값 없음')
        return;
    }

}

function closeAlert(){//얼럿팝업 닫기
    $("#alert_wrap").remove();
}
function confirmAlert(){//얼럿 확인
    $("#alert_wrap").remove();
}
function unix_timestamp(t){
    // yyyy-mm-dd
    if(t == 0){
        return ""
    }
    var date = new Date(t)
    var year = date.getFullYear();
    var month = "0"+ (date.getMonth()+1)
    var day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2)
}

function getDateStr(myDate){

	var year = myDate.getFullYear();

	var month = ("0"+(myDate.getMonth()+1)).slice(-2);

	var day = ("0"+myDate.getDate()).slice(-2);

	return ( year + '-' + month + '-' + day );

}
/* 오늘 날짜 */
function today() {
	var d = new Date();
	return getDateStr(d);
}

/* 오늘로부터 며칠전 날짜 */
function prevDay(days) {
	var d = new Date();
	var dayOfMonth = d.getDate();
	d.setDate(dayOfMonth - days);
	return getDateStr(d);
}

function getNow(){
    var d = new Date();
    var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
    var day = ("0"+d.getDate()).slice(-2);
    if(d.getHours() < 10){
        var hour = "0" + d.getHours();
    }else{
        var hour = d.getHours();
    }
    //var hour = ("0"+d.getHours()).slice(-2);
    if(d.getMinutes() < 10){
        var min = "0" + d.getMinutes();
    }else{
        var min = d.getMinutes();
    }
    //var min = ("0"+d.getMinutes()).slice(-2);
    var string = year + '-' + month + '-' + day +" " + hour + ":"+min + ":00"
	return ( year + '-' + month + '-' + day +" " + hour + ":"+min + ":00");
}


function timestamp(p){
    var d = new Date();
    var hourOfDay = d.getHours();
    var minofDay = d.getMinutes();

    if(p == "hoursago" || p == '1hour'){
       
        d.setHours(hourOfDay - 1);
     
    }else if(p == '30min'){
        d.setMinutes(minofDay - 30)
    }else if(p == '6hour'){
        d.setHours(hourOfDay - 6)
    }else if(p == '12hour'){
        d.setHours(hourOfDay - 12)
    }

    var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
    var day = ("0"+d.getDate()).slice(-2);
    var hour = ("0"+d.getHours()).slice(-2);
    var min = ("0"+d.getMinutes()).slice(-2);

	return ( year + '-' + month + '-' + day +" " + hour + ":"+min + ":00");

}

/* 오늘로부터 몇개월전 날짜 */

function prevMonth(month) {

	var d = new Date();
	var monthOfYear = d.getMonth();
	d.setMonth(monthOfYear - month);
	return getDateStr(d);

}

function nextMonth(datestring, month) {
    var d = new Date(datestring + " 00:00:00")
    console.log(d)
	var monthOfYear = d.getMonth();
	d.setMonth(monthOfYear + month);
	return getDateStr(d);

}

function nextYear(datestring, year) {
    var d = new Date(datestring)
	var Year = d.getFullYear();
	d.setYear(Year + year);
	return getDateStr(d);

}

function setCookie(name, value, exp){
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires='+date.toUTCString() + ';path=/';
}
function getCookie(name){
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getToday(){
    var date = new Date();
    var today = "";
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
    

    today = year +'-'+month+'-'+day;

    return today;
}

function getUserSiteInfo() {
    /* 권한에 상관없이 agg의 정보 가져오기 (파워1,파워2..) - 로그인 권한에 따라 리턴 값이 다름 */
    //var data = recvAjaxResult('/contractor/getcontractors')
    var data = _ajax('i', 'owner', 'agg')
    if(data == undefined || data == null){
        return;
    }else{
        var aggList = [];
        var t = new HashMap();
        if(data.length>0){
            for(var i = 0; i< data.length; i++){
                t.set(data[i].aggid,{
                    
                    idx : i, 
                    value : data[i].aggname,
                    
                })
            }
        }
        t.forEach((v,k) => {
            var d = {
                idx : v.idx,
                value : v.value,
                id : k
            }
            aggList.push(d)
        });
       
        return aggList;
    }
  
  
}

function getSiteInfo(siteid){
    
    var data = _ajax('i', 'owner', 'site/'+siteid)
    return data[0];
}

function getAggList(type){
    var data = _ajax('i', 'owner', 'agg', null);
    if(data == null || data == undefined){
        return;
    }
    if(type == 'search'){
        var arr = [];
        for(var i = 0; i < data.length; i++){
            var user = data[i]
            if(data.length > 0){
                arr.push({
                    idx: i,
                    id : user.aggid,
                    value : user.aggname 
                })
            }
        }
        return arr;
    }
}

function getSiteList(id, type){
    var site = _ajax('i', 'owner','sitebyagg/'+id, null, null )
 
    if(site == undefined){
        return [];
    }
    if(type == 'search'){
        site = site[0].sitelist
        var arr = [];
        for(var i=0; i<site.length; i++){
            arr.push({
                idx:i,
                represenation : site[i].name + "(" + site[i].siteid +")",
                siteid : site[i].siteid
            })
        }
        return arr;
    }
}

function getRccList(type){
    var data = _ajax('i', 'owner', 'site', null)

    if(data == null || data == undefined){
        return;
    }

    var r = []
    for(var i=0; i< data.length ; i++){
        r.push(data[i].rcc)
    }
    
    var res = []
    $.each(r,function(i,el){
        if($.inArray(el,res) === -1){
            res.push(el);
        }
    })
    res.sort(function(a, b) {
        return a - b;
    });
    if(type == 'search'){
        arr = [];
        for(var i = 0; i< res.length; i++){
                arr.push({
                    idx : i,
                    id : res[i],
                    value : RccList[res[i]]
                })
            }
            console.log(arr)
        return arr;
    }else{
        // rcc 번호만 배열로 리턴
        return res;
    }
}

function unitWon(value){
    var won = parseInt((value/1000)).toLocaleString('en').split(".")[0]
    return won;
}
function unitMW(value){

    if(value == null || value == "null"){
        return 0;
    }else{
        var v = Number(value/1000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return v;
    }
    
}
function unitKW(value){
    if(value == null || value == "null"){
        return '';
    }else{
        var v = Number(value).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return v;
    }
}
function abs(value){
    var value = Math.abs(value).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
}
function unitSoc(value){
    value = Number(value).toFixed(1)
    return value;
}
function initMarkerImg()
{
    var markerImgMap = new HashMap();
    markerImgMap.set('mImg1', L.icon({ iconUrl: '/images/contents/ico_main_marker1.svg', iconSize:  [20, 30],	})); // 경기
    markerImgMap.set('mImg2', L.icon({ iconUrl: '/images/contents/ico_main_marker3.svg', iconSize:  [20, 30],	})); // 인천
    markerImgMap.set('mImg3', L.icon({ iconUrl: '/images/contents/ico_main_marker5.svg', iconSize:  [20, 30],	})); // 서울
    markerImgMap.set('mImg4', L.icon({ iconUrl: '/images/contents/ico_main_marker7.svg', iconSize:  [20, 30],	})); // 대전
    markerImgMap.set('mImg5', L.icon({ iconUrl: '/images/contents/ico_main_marker9.svg', iconSize:  [20, 30],	})); // 충남
    markerImgMap.set('mImg6', L.icon({ iconUrl: '/images/contents/ico_main_marker11.svg', iconSize:  [20, 30],	})); // 전북
    markerImgMap.set('mImg7', L.icon({ iconUrl: '/images/contents/ico_main_marker13.svg', iconSize: [20, 30],	})); // 전남
    markerImgMap.set('mImg8', L.icon({ iconUrl: '/images/contents/ico_main_marker15.svg', iconSize:  [20, 30]	})); // 광주
    markerImgMap.set('mImg9', L.icon({ iconUrl: '/images/contents/ico_main_marker2.svg', iconSize:  [20, 30],	})); // 강원
    markerImgMap.set('mImg10', L.icon({ iconUrl: '/images/contents/ico_main_marker4.svg', iconSize:  [20, 30],	})); // 충북
    markerImgMap.set('mImg11', L.icon({ iconUrl: '/images/contents/ico_main_marker6.svg', iconSize: [20, 30],	})); // 경북
    markerImgMap.set('mImg12', L.icon({ iconUrl: '/images/contents/ico_main_marker8.svg', iconSize:  [20, 30]	})); // 대구
    markerImgMap.set('mImg13', L.icon({ iconUrl: '/images/contents/ico_main_marker10.svg', iconSize:  [20, 30],	})); // 울산
    markerImgMap.set('mImg14', L.icon({ iconUrl: '/images/contents/ico_main_marker12.svg', iconSize:  [20, 30],	})); // 부산
    markerImgMap.set('mImg15', L.icon({ iconUrl: '/images/contents/ico_main_marker14.svg', iconSize:  [20, 30],	})); // 경남
    markerImgMap.set('mImg16', L.icon({ iconUrl: '/images/contents/ico_main_marker16.svg', iconSize:  [20, 30],})); // 제주
    
    return markerImgMap;
}
function initMarkerLoc(){
    // 1depth 고정 좌표
    var markerLoc = new HashMap();

    markerLoc.set(1, {lat: 37.241627, lng : 127.064427, rcc : 1});//경기
    markerLoc.set(2, {lat: 37.474910, lng : 126.598097, rcc : 2});//인천
    markerLoc.set(3, {lat: 37.868283, lng : 127.036563, rcc : 3});//서울
    markerLoc.set(4, {lat : 36.515061, lng : 127.129743, rcc : 4});//대전
    //markerLoc.set(4, {lat : 36.454184, lng : 127.417217});//대전
    markerLoc.set(5, {lat: 36.936224, lng :126.438272, rcc : 5});//충남 
    markerLoc.set(6, {lat : 35.71046060286918, lng : 127.1841824054718, rcc : 6});//전북
    markerLoc.set(7, {lat : 34.571853, lng : 126.593157, rcc : 7});//전남
    markerLoc.set(8, {lat : 35.139628, lng : 126.811111, rcc : 8});// 광주
    markerLoc.set(9, {lat : 37.62818198386735, lng : 128.89443397521973, rcc : 9});//강원
    markerLoc.set(10, {lat : 36.72473031116381, lng : 127.83198952674866, rcc : 10});//충북
    markerLoc.set(11, {lat : 36.52669712203727, lng : 128.67660641670227, rcc : 11});//경북
    markerLoc.set(12, {lat : 35.85920854499696, lng : 128.62467885017395, rcc : 12});//대구
    markerLoc.set(13, {lat : 35.593456, lng : 129.236280, rcc : 13});//울산
    markerLoc.set(14, {lat : 35.427637, lng : 128.765279, rcc : 14});//부산
    markerLoc.set(15, {lat : 35.193726, lng : 128.057174, rcc : 15});//경남
    markerLoc.set(16, {lat : 33.403262, lng : 126.531268, rcc : 16});//제주
   
    return markerLoc;  
}
