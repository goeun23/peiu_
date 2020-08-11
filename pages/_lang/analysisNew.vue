<template>
<div class="cont_body">
    <div class="analysis_wrap">
        <div id="map" class="analysis_map_area" style="background:#444444;"></div>
            <div class="map_oper">
                <input type="text" id="" name="" value="1" class="map_oper_input" />
                <button type="button" class="btn btn_set"><span class="hide">설정</span></button>
                <button type="button" class="btn btn_down"><span class="hide">다운로드</span></button>
            </div>
        
         
        <div class="analysis_info_area">
        <dl>
            <dt>
                <button type="button" class="switch_land_island switch_graph on_land">
                    <span></span>
                </button>
            </dt>
            <dd>
                <div class="view_graph_area">
                    <ul>
                        <li>
                            <dl>
                                <dt>765kV</dt>
                                <dd>
                                    <canvas id="analysisChart1"></canvas> 
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>345kV</dt>
                                <dd>
                                    <canvas id="analysisChart2"></canvas> 
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>154kV</dt>
                                <dd>
                                    <canvas id="analysisChart3"></canvas> 
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="view_table_area" style="display:none;">
                    <ul>
                        <li>
                            <dl>
                            <dt>High-Voltage</dt>
                            <dd>
                                <div class="search_area">
                                    <input type="text" id="" name="" value="" class="input_search" />
                                    <button type="button" class="btn btn_search"></button>
                                </div>
                                <div class="fixed_tbl_wrap">
                                    <div class="tbl_wrap anal_tbl">
                                        <table border="0" cellpadding="0" cellspacing="0" summary="">
                                        <caption></caption>
                                            <colgroup>
                                            <col width="50%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>BUS Name</th>
                                                    <th>Voltage(PU)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>수색</td>
                                                    <td>1.05</td>
                                                </tr>
                                                <tr>
                                                    <td>상암</td>
                                                    <td>1.02</td>
                                                </tr>
                                                <tr>
                                                    <td>신포천1</td>
                                                    <td>1.07</td>
                                                </tr>
                                                <tr>
                                                    <td>가나</td>
                                                    <td>1.07</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>Low-Voltage</dt>
                                <dd>
                                    <div class="search_area">
                                        <input type="text" id="" name="" value="" class="input_search" />
                                        <button type="button" class="btn btn_search"></button>
                                    </div>
                                    <div class="fixed_tbl_wrap">
                                        <div class="tbl_wrap anal_tbl">
                                            <table border="0" cellpadding="0" cellspacing="0" summary="">
                                            <caption></caption>
                                                <colgroup>
                                                <col width="50%" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>BUS Name</th>
                                                        <th>Voltage(PU)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>수색</td>
                                                        <td>1.05</td>
                                                    </tr>
                                                    <tr>
                                                        <td>상암</td>
                                                        <td>1.02</td>
                                                    </tr>
                                                    <tr>
                                                        <td>신포천1</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                    <tr>
                                                        <td>가나</td>
                                                        <td>1.07</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </dd>
        </dl>
    </div>
    </div>
  
</div>
</template>
<script>
let koreaMap;
export default {
    middleware: 'authenticated',
    head: {
    link: [
        { rel: "stylesheet", href: "/css/common.css" },
        { rel: "stylesheet", href: "/css/layout.css" },
        { rel: "stylesheet", href: "/css/contents.css" },
    ],
    script:[
        { src : "/scripts/jquery/core/jquery-1.11.2.min.js"},
        { src : "/scripts/Chart.bundle.js"},
        { src : "/scripts/perfect-scrollbar.js"},
        { src : "/scripts/utils.js"},
        ]
    },
    data(){
        return{
           map : null,
           officeLatLng : {lat : 36.351719, lng : 127.398300},
        }
    },
    methods:{
        setMarker(map){
            var loc;
            var markerIcon;
            var markerIdx;

            var markerImgMap = this.initMarkerImg();
			var markerLocHashMap = this.initMarkerLoc();
			this.markerLocMap = new HashMap(); 
            

            markerLocHashMap.forEach((v,k)=>{
                
                markerIdx = 'mImg' + k;
                markerIcon = markerImgMap.get(markerIdx);

                
                var loc = {lat : v.lat , lng : v.lng}
                // for LineAnimation
                this.markerLocMap.set('rcc'+(k),loc);

                // add marker
                var m = L.marker(loc, {icon : markerIcon})

                
                m.addTo(map)


            })
			// for(var i=1; i < markerLocHashMap.keys().length+1; i++){
			// 	var markerIdx = 'mImg' + (i);
			// 	var markerIcon = markerImgMap.get(markerIdx);
			// 	var loc = markerLocHashMap.get(i);
			// 	this.markerLocMap.set('rcc'+(i),loc);
			// 	L.marker(loc, {icon : markerIcon}).addTo(this.map);
            // }
            

			var officeIcon = L.icon({iconUrl : '/images/building.png', iconSize : [20, 20]});
            L.marker(this.officeLatLng, {icon : officeIcon}).addTo(map);
            
        },
        initMarkerImg : function()
		{
			 var markerImgMap = new HashMap();
            markerImgMap.set('mImg1', L.icon({ iconUrl: '/images/contents/ico_main_marker1.png', iconSize:  [30, 40],	})); // 경기
            markerImgMap.set('mImg2', L.icon({ iconUrl: '/images/contents/ico_main_marker3.png', iconSize:  [30, 40],	})); // 인천
            markerImgMap.set('mImg3', L.icon({ iconUrl: '/images/contents/ico_main_marker5.png', iconSize:  [30, 40],	})); // 서울
            markerImgMap.set('mImg4', L.icon({ iconUrl: '/images/contents/ico_main_marker7.png', iconSize:  [30, 40],	})); // 대전
            markerImgMap.set('mImg5', L.icon({ iconUrl: '/images/contents/ico_main_marker9.png', iconSize:  [30, 40],	})); // 충남
            markerImgMap.set('mImg6', L.icon({ iconUrl: '/images/contents/ico_main_marker11.png', iconSize:  [30, 40],	})); // 전북
            markerImgMap.set('mImg7', L.icon({ iconUrl: '/images/contents/ico_main_marker13.png', iconSize: [30, 40],	})); // 전남
            markerImgMap.set('mImg8', L.icon({ iconUrl: '/images/contents/ico_main_marker15.png', iconSize:  [30, 40]	})); // 광주
            markerImgMap.set('mImg9', L.icon({ iconUrl: '/images/contents/ico_main_marker2.png', iconSize:  [30, 40],	})); // 강원
            markerImgMap.set('mImg10', L.icon({ iconUrl: '/images/contents/ico_main_marker4.png', iconSize:  [30, 40],	})); // 충북
            markerImgMap.set('mImg11', L.icon({ iconUrl: '/images/contents/ico_main_marker6.png', iconSize: [30, 40],	})); // 경북
            markerImgMap.set('mImg12', L.icon({ iconUrl: '/images/contents/ico_main_marker8.png', iconSize:  [30, 40]	})); // 대구
            markerImgMap.set('mImg13', L.icon({ iconUrl: '/images/contents/ico_main_marker10.png', iconSize:  [30, 40],	})); // 울산
            markerImgMap.set('mImg14', L.icon({ iconUrl: '/images/contents/ico_main_marker12.png', iconSize:  [30, 40],	})); // 부산
            markerImgMap.set('mImg15', L.icon({ iconUrl: '/images/contents/ico_main_marker14.png', iconSize:  [30, 40],	})); // 경남
            markerImgMap.set('mImg16', L.icon({ iconUrl: '/images/map/m15.png', iconSize:  [25, 41],})); // 제주
			return markerImgMap;
        },
        initMarkerLoc : function(){
			var markerLoc = new HashMap();
            markerLoc.set(1, {lat: 37.263416, lng : 127.028583});//경기(수원시청 위치 추가)
            markerLoc.set(2, {lat: 37.458384, lng : 126.702545});//인천(인천시청 위치 추가)
            markerLoc.set(3, {lat: 37.591169, lng : 126.981261});//서울
            markerLoc.set(4, {lat : 36.58885351698976, lng : 126.95821166038515});//대전
            markerLoc.set(5, {lat: 36.790182, lng :127.002529});//충남 (아산시청 위치 추가)
            markerLoc.set(6, {lat : 35.71046060286918, lng : 127.1841824054718});//전북
            markerLoc.set(7, {lat : 35.02451264407351, lng : 127.31542825698853});//전남
            markerLoc.set(8, {lat : 35.160068, lng : 126.851433});// 광주
            markerLoc.set(9, {lat : 37.62818198386735, lng : 128.89443397521973});//강원
            markerLoc.set(10, {lat : 36.72473031116381, lng : 127.83198952674866});//충북
            markerLoc.set(11, {lat : 36.52669712203727, lng : 128.67660641670227});//경북
            markerLoc.set(12, {lat : 35.85920854499696, lng : 128.62467885017395});//대구
            markerLoc.set(13, {lat : 35.85920854499696, lng : 128.62467885017395});//울산
            markerLoc.set(14, {lat : 35.32428811283104, lng : 129.19279217720032});//부산
            markerLoc.set(15, {lat : 35.21695664169799, lng : 128.60976576805115});//경남
            markerLoc.set(16, {lat : 33.499606, lng : 126.531258});//제주
        
            return markerLoc;
		}, 
        initMap(){
            var cartodbUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png'
			this.map = L.map('map', { minZoom: 8, maxZoom: 16, dragging: false })
				.setView([36.38149043210595,    128.17749023437503], 7); 
				this.map.on("click", function(e){
					//console.log(e);
				})
			L.tileLayer(cartodbUrl, { 
            }).addTo(this.map);
            koreaMap = this.map;
            this.map.zoomControl.remove();
            this.setMarker(koreaMap);
        }
    },
    mounted() {
        $('.th1').removeClass('active');
		document.getElementById('menu5').classList.add("active");
        this.initMap();
        
        $(document).ready(function(){
            $(".switch_land_island").on("click",function(){//육지, 제주 선택 스위치
                    if($(this).hasClass("on_land")){
                        $(this).removeClass("on_land").addClass("on_island");
                        $(this).val("표");
                        $(".view_graph_area").css("display","none");
                        $(".view_table_area").css("display","block");
                        new PerfectScrollbar('.view_table_area > ul > li:nth-child(1) .fixed_tbl_wrap .anal_tbl tbody');//커스텀 스크롤
                        new PerfectScrollbar('.view_table_area > ul > li:nth-child(2) .fixed_tbl_wrap .anal_tbl tbody');//커스텀 스크롤
                    }else{
                        $(this).removeClass("on_island").addClass("on_land");
                        $(this).val("그래프");
                        $(".view_graph_area").css("display","block");
                        $(".view_table_area").css("display","none");
                    }
            });
		
        });
    	var analConfig1 = {//765kV
			type: 'line',
			data: {
				labels: ['북경남7','신고리NP7','신한물7','신안성7','신태백7','당진TP7','신서산7','신가평7'],
				datasets: [{
					label: '범례1',
					borderColor: '#c83162',
					borderWidth: 1,
					backgroundColor: '#c83162',
					pointRadius:2,
					data: [
                        (randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10)
					],
					fill: false,
					lineTension: 0
				}]
			},options: {
				responsive: true,
				//responsive: false,
				maintainAspectRatio: false,
				width:1070,
				height:195,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				legend: {
					display:false,
					position: 'top',
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				elements: {
					point: {
						pointStyle: 'rect'
					}
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'minute'
						},gridLines: {
							drawBorder: true,
							color: '#2a2f3d'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Votage(PU)'
						},
						gridLines: {
							drawBorder: true,
							color: '#2a2f3d'
						},
						ticks: {
							min: 0.9,
							max: 1.4
						}
					}]
				}
			}
		};
		var analConfig2 = {//345kV
			type: 'line',
			data: {
				labels: ['무주PP3','신계룡3','신옥천3','신옥천3S','새만금3','군산3','세종3','신화순3','신광주','신김제3','신남원3','선산3','신강진3','청원','청양3S','서대구3','북대구3','산청PP3','고령3','북경남3'],
				datasets: [{
					label: '범례1',
					borderColor: '#3d84c9',
					borderWidth: 1,
					backgroundColor: '#3d84c9',
					pointRadius:2,
					data: [
                        (randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10)
					],
					fill: false,
					lineTension: 0
				}]
			},options: {
				responsive: true,
				//responsive: false,
				maintainAspectRatio: false,
				width:1070,
				height:195,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				legend: {
					display:false,
					position: 'top',
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				elements: {
					point: {
						pointStyle: 'rect'
					}
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'minute'
						},gridLines: {
							drawBorder: true,
							color: '#2a2f3d'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Votage(PU)'
						},
						gridLines: {
							drawBorder: true,
							color: '#2a2f3d'
						},
						ticks: {
							min: 0.9,
							max: 1.4
						}
					}]
				}
			}
		};
		var analConfig3 = {//154kV
			type: 'line',
			data: {
				labels: ['아산1S','예산','온양','용봉','북대구SP1','북대구SP2','서대구1','대화','동대전','칠곡','둔산','둔지','신흥','용운','풍세','남대전','대덕','홍성','유천','서대전'],
				datasets: [{
					label: '범례1',
					borderColor: '#59a9a3',
					borderWidth: 1,
					backgroundColor: '#59a9a3',
					pointRadius:2,
					data: [
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10),
						(randomScalingFactor9()/10)
					],
					fill: false,
					lineTension: 0
				}]
			},options: {
				responsive: true,
				//responsive: false,
				maintainAspectRatio: false,
				width:1070,
				height:195,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				legend: {
					display:false,
					position: 'top',
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				elements: {
					point: {
						pointStyle: 'rect'
					}
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'minute'
						},gridLines: {
							drawBorder: true,
							color: '#2a2f3d'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Votage(PU)'
						},
						gridLines: {
							drawBorder: true,
							color: '#2a2f3d'
						},
						ticks: {
							min: 0.9,
							max: 1.4
						}
					}]
				}
			}
		};
		window.onload = function() {
			var analCtx1 = document.getElementById('analysisChart1').getContext('2d');
			window.myLine = new Chart(analCtx1, analConfig1);//765kV
			var analCtx2 = document.getElementById('analysisChart2').getContext('2d');
			window.myLine = new Chart(analCtx2, analConfig2);//345kV
			var analCtx3 = document.getElementById('analysisChart3').getContext('2d');
			window.myLine = new Chart(analCtx3, analConfig3);//154kV
		};
    },
}
</script>