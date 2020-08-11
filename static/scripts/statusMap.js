/* statusMap script*/

let mqtt;
let topic;
let client;
let iconMap;
var activeMap;
let koreaMap;
let jejuMap;
let coreUrl = '/images/contents/ico_marker_point_typ'
let actLv;
let customMarkers;
let selectedArea;
var BaseUrl = "https://www.peiu.co.kr:3020/api"
var url_3022 = "https://www.peiu.co.kr:3022/"
var markerClass = "markerbyEvent"
var rccRed = coreUrl+ '4.png';
var rccGreen = coreUrl + '1.png';
let lawGreen = coreUrl+ '4_1.png'
let lawRed = coreUrl+ '4_4.png'


/* DATA */

function getusersiteinfo(data){
    var sitelist = _ajax('i', 'simpleowner', 'site')

    if(sitelist == null || sitelist == undefined){
        return;
    }
   
    customMarkers = [];
    var query = 'select * from mysql.peiu_account.vw_contractorsites where siteid in (' + sitelist +')'
    var data = _query(query)
    if(data.length>0){
        var law3;
        for(var i=0; i<data.length; i++){
            var assets = data[i]
            if(assets.Latitude > 0 && assets.Longtidue){
                if(assets.LawLastCode.length <6){
                    law3 = "0" + assets.LawLastCode
                }else{
                    law3 = assets.LawLastCode
                }
                var d = {
                    Rcc : assets.RCC,
                    Address: assets.Address1,
                    DeviceId: assets.ServiceCode,
                    Lat: assets.Longtidue,
                    Lon: assets.Latitude,
                    LawLevel1: assets.LawFirstCode,
                    LawLevel2: assets.LawMiddleCode,
                    LawLevel3: law3,
                    deviceType: assets.ServiceCode,
                    UserID: assets.Email,
                    SiteId: assets.SiteId,
                    represenation: assets.Represenation,
                    aggRepresentation : assets.AggRepresentation,
                    registerTimestamp : assets.RegisterTimestamp,
                    aggID : assets.AggGroupId,
                    pcsCount : assets.PcsCount,
                    bmsCount : assets.BmsCount,
                    pvCount : assets.PvCount 
                };
                customMarkers.push(d);
            }
        }
    }else{
        console.log('고객리스트 데이터 없음')
    }
    return customMarkers;
}


/*SET AREA LIST*/
function AddRccList(data, rccId){
			
    var addedArea = [];
    var duplicated = false;
    var ListMap = new HashMap();
    var localList = "#localList"
    var localList2 = "#localList2"
    var detailArea = "#areaName3"
    
    $(localList2).empty();
    $(detailArea).empty();

    customMarkers.forEach((v1, i1) => {
        // 시, 군, 구 단위 법정동 코드
        var lawCode = v1.LawLevel1 + v1.LawLevel2 + "000000";
        
        // 코드가 같으면 addedArea에 추가
        if (data.id == Number(lawCode)) {
            for (var i = 0; i < addedArea.length; i++) {
                if (addedArea[i] == data.id) {
                    duplicated = true;
                    break;
                }
            }
            addedArea.push(data.id);
            if (duplicated != true) {
                $(localList).append(
                    $("<li/>").append(
                        $("<button/>", { href: "#", id: data.id, "lawCode-id": data.id })
                        .text(data.addr)
                        .on("click", function () {
                            //click evet
                            $(localList+ " > li > button").removeClass("is_active");
                            $(detailArea).text(data.addr);
                            $(localList2).empty();
                            // 읍, 면, 동 단위
                            AddDetailAreaList(data.id,rccId,customMarkers)
                        }) 
                    )
                );
            }
        }
    });
}
function AddDetailAreaList(dataId,rccId,customMarkers) {
    
    // 선택한 지역의 시군구 법정동코드 4자리 ex.5011
    var selectedlawCode = dataId + ''; 

    // 지역 모든 정보를 담을 해시맵
    var AreaListMap = new HashMap(); 

    // 선택한 지역의 모든 법정동 코드 정보 ex.5011대 모든 법정동코드 정보 
    var law3List = addressJson[0][rccId]; 
    
    
	// 중간 지역 클릭 활성화
	var tagID = "[lawcode-id='" + dataId + "']";
	$("[lawcode-id]").removeClass("is_active");
	$(tagID).addClass("is_active");

   
	var localList2 = "#localList2"
	var detailArea = "#areaName3"
	
	// 마지막지역 상단 텍스트
    var areaName3 = $(tagID).text();
    $(detailArea).text(areaName3);



	// 지역 셀렉트 리스트 추가
	law3List.forEach((value,key)=>{
        var ListLawCode = value.lawCode.substring(0,4)+'000000' // 5011000000

		if(ListLawCode == selectedlawCode){
            if(value.law3 != undefined){
                // 아래 해쉬맵을 사용할때는 10자리 법정동 코드를 사용해서 리스트를 만드니까 
                // ListLawCode 아닌, 10자리 법정동 코드를 키 값으로 넣어줘야함 
                AreaListMap.set(value.lawCode, [{
                    value : value.law3
                }])
            }
		}
    });

    var t = new HashMap();
    var d;
    var lawCode;
	for(var i = 0; i<customMarkers.length; i++){
        d = customMarkers[i];
        
        // 고객 모든 법정동 코드 10자리
        lawCode = d.LawLevel1 + d.LawLevel2 + d.LawLevel3;
        
        
		AreaListMap.forEach((value,key)=>{
        
            // 자산 정보에 등록된 10자리 법정동코드(lawCode)가 선택된 지역의 읍면동데이터를 모두 담은
            // AreaListMap의 키 값과 같으면 t라는 해쉬맵에 위도, 경도, 읍,면,동 데이터 추가.
			if(lawCode == key){
				t.set(lawCode, [{
					text : value[0].value,
					lat : d.Lat,
					lng : d.Lon
				}])
			}
		});
	}
	
	
	var points = new HashMap();			
	var arrPoints = [];
	t.forEach((value, key)=>{
		var ckLat = value[0].lat
		var ckLng = value[0].lng
		points.set(key,[{lat : ckLat, lng : ckLng}])
		arrPoints.push({lat : ckLat, lng : ckLng})
	});
	
	$(localList2).empty();
	t.forEach((value,key)=>{
		$(localList2).append(
			// 마지막 지역 버튼 리스트 생성
			$('<li/>').append(
				$('<button/>',{'lawCode3' : key, id :key})
				.text(value[0].text)
				.on('click', function(){
					$(localList2 + ' > li > button').removeClass('is_active');
					$(this).addClass('is_active');
					// 한개인 경우, 
					if(points.size == 1){
						var poly = L.polygon(arrPoints, {color:'yellow'})
						activeMap.fitBounds(poly.getBounds())
					}
					// 한개 이상인 경우
					else if(points.size > 1){
						points.forEach((points, idx)=>{
							if(key == idx){
								var poly = L.polygon(points, {color:'yellow'})
								activeMap.fitBounds(poly.getBounds())
							}
						})
                    }
                    
				})
			)
		)
	})


}
let landlist = new Array();
let islandlist = new Array();
function getSiteCount() {
    landlist = [];
    islandlist = [];
    var siteCount = new HashMap();
    var resp = _ajax('i', 'simpleowner', 'rcc', null, null)
   
    
    if(resp != null){
        for(var i = 0; i< resp.length; i++){
            var k = resp[i].rcc
            var count = resp[i].sitelist.length
            siteCount.set(resp[i].rcc,count)
            var d = {
                idx: k,
                area : RccList[k]+"("+count+")",
                value : count
            }
            if(k == 16){
                islandlist.push(d)
            }else{
                landlist.push(d)
            }
        }
    }
}

/*MAP CONTROL*/
function CtrlMap(value){
    
    if(value == "+"){
        koreaMap.setZoom(koreaMap.getZoom()+2)
    }else{
        koreaMap.setZoom(koreaMap.getZoom()-2)
    }
}
function CtrlMap_jeju(value){
    if(value == "+"){
        jejuMap.setZoom(jejuMap.getZoom()+2)
    }else{
        jejuMap.setZoom(jejuMap.getZoom()-2)
    }
}
function getZoomDepth(map, ZOOM_LEVEL){
    var lv = 1;
    if(map == koreaMap){
        if(ZOOM_LEVEL == 8 || ZOOM_LEVEL == 9 ){
        	lv = 1;
        }else if(ZOOM_LEVEL == 10 || ZOOM_LEVEL == 11){
        	lv = 2;
        }else if(ZOOM_LEVEL == 12 || ZOOM_LEVEL == 13){
        	lv = 3;
        }else if(ZOOM_LEVEL == 14){
        	lv = 4;
        }
    }else {
        if(ZOOM_LEVEL == 11){
            lv = 1;
        }else if(ZOOM_LEVEL == 12){
            lv = 2;
        }else if(ZOOM_LEVEL == 13){
            lv = 3;
        }else if(ZOOM_LEVEL == 14){
            lv = 4;
        }
    }
    return lv;
}

let rccMap;
/*MAP DATA*/
function getRccMap(){
    // marker-location (1 level)
    var markerLocHashMap = initMarkerLoc();
    var t = new HashMap();
    var res = getRccList();
    if(res == null || res == undefined){
        return;
    }
    for(var i = 0; i<res.length; i++){
        t.set(res[i],[markerLocHashMap.get(res[i])])
    }
    rccMap = t;
    return t;
}
function initialMap(d) {
    var cartodbUrl =
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png";
    // set map option
    d.vueCont = L.map(d.cont, {
        minZoom: d.minZoom,
        maxZoom: 14,
        zoomSnap: d.snap, 
        zoomControl: false,
        contextmenu: 'true',
    }).setView(d.setView, d.minZoom);

    d.vueCont.setMaxBounds([
        d.setMaxBounds
    ]);
        
    L.tileLayer(cartodbUrl, {noWrap: true}).addTo(d.vueCont);
        
    // get region area (change bgd color)
    var korea = {
        "type": "Feature",
        "id": d.cont + "-KOR",
        "properties": {
            "name": "Korea",
            "style": {
                weight: 0,
                color: "#111926",
                fillColor: "#111926",
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": d.coordinates
        }
    };
    var geo = L.geoJson([korea], {
        style: function (feature) {
            return feature.properties && feature.properties.style;
        }
    })
    geo.addTo(d.vueCont);

    return d.vueCont;
}

function areaPopup(k, rcc){
    var list = addressJson[0][rcc];
    var law3 = "";
    var title = ""
    var law = "";
    if(actLv == 1){
        return;
    }else{
        if(actLv == 2){
            law = k + "000000"
        }else if(actLv == 3){
            law = k;
        }
        for(var i = 0; i < list.length; i++){
            if(list[i].lawCode.toString() == law.toString()){
                if(list[i].law3 == undefined){
                    law3 = "";
                }else{
                    law3 = list[i].law3;
                }
                title = list[i].law1 + " " + list[i].law2 + " " + law3;
            }
        }
    }
    var markerWrap = document.createElement("div")
    markerWrap.setAttribute("class","marker_wrap marker_green")

    var pointWrap = document.createElement("div")
    pointWrap.setAttribute("class","marker_point_wrap")

    var point = document.createElement("div")
    point.setAttribute("class","marker_pointer_info")

    var wrap = document.createElement("div")
    wrap.setAttribute("class","marker_hisroty_info_wrap custom-popup is_active")

    var info = document.createElement("div")
    info.setAttribute("class","marker_hisroty_info ")

    var dlist = document.createElement("dl")
    dlist.setAttribute("class","marker_hisroty_info")

    var dt = document.createElement("dt")
    dt.textContent = title



    dlist.append(dt);

    // 리스트
    markerWrap.append(pointWrap)
    pointWrap.append(point)
    point.append(wrap)
    wrap.append(info)
    info.append(dlist);

    return markerWrap;
}

function setLocPopup(
    userid,deviceType,SiteId,
    represenation,aggRepresentation,Address,
    timestamp,aggID
){
    if(aggID != undefined){
      
        var markerWrap = document.createElement("div")
        markerWrap.setAttribute("class","marker_wrap marker_green")

        var pointWrap = document.createElement("div")
        pointWrap.setAttribute("class","marker_point_wrap")

        var point = document.createElement("div")
        point.setAttribute("class","marker_pointer_info")

        var wrap = document.createElement("div")
        wrap.setAttribute("class","marker_hisroty_info_wrap is_active")

        var info = document.createElement("div")
        info.setAttribute("class","marker_hisroty_info")


        var dlist = document.createElement("dl")

        var dt = document.createElement("dt")
        dt.textContent = represenation  + " ("+SiteId+")"
        

        var dd = document.createElement("dd")


        var infobody = document.createElement("div")
        infobody.setAttribute("class","info_body")

        var infopic = document.createElement("div")
        infopic.setAttribute("class","info_pic")

        var infoimg = document.createElement("img")
        infoimg.setAttribute("src","/images/contents/pic_marker_info_thume.png")

        var infolist = document.createElement("div")
        infolist.setAttribute("class","info_list")

        var infoul = document.createElement("ul")

        // 회사명
        var infoli1 = document.createElement("li")
        var span1tit = document.createElement("span")
        span1tit.setAttribute("class","tit")
        span1tit.textContent = "회사명 : "

        var span1txt = document.createElement("span")
        span1txt.setAttribute("class","txt")
        span1txt.textContent = aggRepresentation
        
        infoli1.append(span1tit)
        infoli1.append(span1txt)

        // 서비스
        var infoli2 = document.createElement("li")
        var span2tit = document.createElement("span")
        span2tit.setAttribute("class","tit")
        span2tit.textContent = "서비스 : "

        var span2txt = document.createElement("span")
        span2txt.setAttribute("class","txt")
        
        span2txt.textContent = serviceCode[String(deviceType)] + "("+deviceType+")"
    
        
        infoli2.append(span2tit)
        infoli2.append(span2txt)

        // 주소
        var infoli3 = document.createElement("li")
        var span3tit = document.createElement("span")
        span3tit.setAttribute("class","tit")
        span3tit.textContent = "주소 : "

        var span3txt = document.createElement("span")
        span3txt.setAttribute("class","txt")
        span3txt.textContent = Address
        
        infoli3.append(span3tit)
        infoli3.append(span3txt)

        // 설치일자
        var infoli4 = document.createElement("li")
        var span4tit = document.createElement("span")
        span4tit.setAttribute("class","tit")
        span4tit.textContent = "설치일자 : "

        var span4txt = document.createElement("span")
        span4txt.setAttribute("class","txt")

        span4txt.textContent = timestamp.substring(0,10)
        
        infoli4.append(span4tit)
        infoli4.append(span4txt)

        // 리스트
        infoul.append(infoli1)
        infoul.append(infoli2)
        infoul.append(infoli3)
        infoul.append(infoli4)

        var infobtnWrap = document.createElement("div")
        infobtnWrap.setAttribute("class","btn_wrap alR")

        var infoa = document.createElement("a")
        infoa.setAttribute("class","btn btn_size_free btn_color_blue")

        var infoaspan = document.createElement("span")
        infoaspan.textContent = "설비운영으로 이동"
        
        infoaspan.onclick = function () {
            localStorage.setItem("areaControl_ID", SiteId);
            localStorage.setItem("areaControl_aggID", aggID);
            localStorage.setItem("userId", userid);
            
            location.href = '/areaControl';
        }
        infoa.append(infoaspan)

        var infobtn = document.createElement("button")
        infobtn.setAttribute("class","btn btn_size_free hisroty_info_close")

        var infobtnspan = document.createElement("span")
        infobtnspan.textContent = "닫기"
        infobtnspan.onclick = function(){
            activeMap.closePopup();
        }
        infobtn.append(infobtnspan)


        infobtnWrap.append(infoa)
        infobtnWrap.append(infobtn)
        

        infolist.append(infoul)

        infopic.append(infoimg)

        infobody.append(infopic)
        infobody.append(infolist)

        dd.append(infobody)
        dd.append(infobtnWrap)


        dlist.append(dt)
        dlist.append(dd)

        markerWrap.append(pointWrap)
        pointWrap.append(point)
        point.append(wrap)
        wrap.append(info)
        info.append(dlist)

        return markerWrap;
    }
}

function getdatabylawcode(level){
    var lv=0
    if(level == 2){
        // lawcode 4자리
        lv = 1
    }else if(level == 3){
        // lawcode 10자리
        lv = 2
    }

    var markericon;
    var token = getCookie('token');
    $.ajax({
        url : "https://www.peiu.co.kr:3077/api/measurement/v1/realtime/lawlevel/"+ lv,
        contentType: "application/json",
        type: "get",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data){
            if(data.Result.Code == 200){
                data = data.Payload.elements;
                $("."+markerClass).remove();
                for(var i = 0; i< data.length; i++){
                    var d = data[i]
                    var k = d.lawcode
                    
                    $(".evt-level-"+actLv+"-"+k).text(d.activeevent+"건")
                    // gen
                    $('.gen-level-'+actLv+"-"+k).text(Math.abs(Number(d.pvgeneration/1000)).toFixed(1) + "MWp")
                    // actpwr
                    $('.ActPwr-level-'+actLv+"-"+k).text(Number(d.activepower/1000).toFixed(1) + " MW")
                    // soc
                    $('.SOC-level-'+actLv+"-"+k).text(Number(d.soc).toFixed(1)+" %")

                    var icon;
                    if(d.countofactiveevent > 0){
                        icon = lawRed;
                    }else{
                        icon = lawGreen;
                    }
                    var loc = iconMap.get(k)[0];
                    marker = L.marker(loc,{icon: 
                        L.icon({
                            className : markerClass,
                            iconUrl : icon,
                            iconSize: ["2.5rem", "2.5rem"]
                        })
                    })
                    marker.addTo(activeMap);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        },
    })
}

function getMarkersDataByDepth(actLv){
 
    if(actLv == 1){
        // rcc
        getDataByrcc();
    }
    if(actLv == 2 || actLv == 3){
        // ajax
        getdatabylawcode(actLv)
    }
    else if(actLv == 4){
        // graphQL
        getDataBySiteid(actLv)
    }
    
   
}
function getDataByrcc(){

    var markericon;
    var token = getCookie('token');
    $.ajax({
        url : "https://www.peiu.co.kr:3077/api/measurement/v1/realtime/rcc",
        contentType: "application/json",
        type: "get",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data){

            if(data.Result.Code == 200){
                data = data.Payload.elements;
                
                $("."+markerClass).remove();
                for(var i = 0; i< data.length; i++){
                    var d = data[i]
                    var k = d.rcc
                    
                    $(".evt-level-"+actLv+"-"+k).text(d.activeevent+"건")
                    // gen
                    $('.gen-level-'+actLv+"-"+k).text(Math.abs(Number(d.pvgeneration/1000)).toFixed(1) + "MWp")
                    // actpwr
                    $('.ActPwr-level-'+actLv+"-"+k).text(Number(d.activepower/1000).toFixed(1) + " MW")
                    // soc
                    $('.SOC-level-'+actLv+"-"+k).text(Number(d.soc).toFixed(1)+" %")

                    var icon;
                    if(d.activeevent > 0){
                        icon = rccRed;
                    }else{
                        icon = rccGreen;
                    }
                    var loc = iconMap.get(k)[0];
                    marker = L.marker(loc,{icon: 
                        L.icon({
                            className : markerClass,
                            iconUrl : icon,
                            iconSize: ["2.5rem", "2.5rem"]
                        })
                    })
                    marker.addTo(activeMap);
                }
            }
        
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        },
    })


}
function getDataBySiteid(){
    var markericon;
    var token = getCookie('token');
    $.ajax({
        url : "https://www.peiu.co.kr:3077/api/measurement/v1/realtime/site",
        contentType: "application/json",
        type: "get",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data){
            
            if(data.Result.Code == 200){
                data = data.Payload.elements;
                $("."+markerClass).remove();
                for(var i = 0; i< data.length; i++){
                    var d = data[i]
                    var k = d.siteid
            
                    $(".evt-level-"+actLv+"-"+k).text(d.activeevent+"건")
                    // gen
                    $('.gen-level-'+actLv+"-"+k).text(Math.abs(Number(d.pvgeneration)).toFixed(1) + "kWp")
                    // actpwr
                    $('.ActPwr-level-'+actLv+"-"+k).text(Number(d.activepower).toFixed(1) + " kW")
                    // soc
                    $('.SOC-level-'+actLv+"-"+k).text(Number(d.soc).toFixed(1)+" %")

                    var icon;
                    if(d.activeevent > 0){
                        icon = lawRed;
                    }else{
                        icon = lawGreen;
                    }
                    var loc = iconMap.get(k)[0];
                    marker = L.marker(loc,{icon: 
                        L.icon({
                            className : markerClass,
                            iconUrl : icon,
                            iconSize: ["2.5rem", "2.5rem"]
                        })
                    })
                    marker.addTo(activeMap);
                }
            }
        
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        },
    })
   

}
