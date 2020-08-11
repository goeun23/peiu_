<template>
 <section id="content" class="analysis_container">
	 <!-- <loading></loading> -->
    <div class="logo"></div>
			<article id="analysis_content" class="analysis">
				<div id="map" class="mapSection">
					<div class="timeTrigger_wrap">
						<input type="text" id="timeSet" placeholder="주기(분)">
						<button  class="btn_query" @click="setTimer()">설정</button>
						<button id="btn_download" class="btn_query" @click="download()">다운로드</button>
					</div>
				</div>	
				<div class="analysis-graph-wrap">
					<dl>
						<dt>765kV</dt>
						<dd> 
						<canvas id="graph765"></canvas> 
						</dd>
					</dl>
			 	</div>
				<div class="analysis-graph-wrap">
					<dl>
						<dt>345kV</dt>
						<dd><canvas id="graph345"></canvas></dd>
					</dl>
				</div>
				<div class="analysis-graph-wrap">
					<dl>
						<dt>154kV</dt>
						<dd><canvas id="graph154"></canvas></dd>
					</dl>
				</div>
				<div class="analysis-table-wrap">
						<dl>
							<dt>High Voltage</dt>
							<dd>
								<div class="analysis-table table_wrap1"> 
										<table id="table1" class="highTable">
											<colgroup>
												<col width="45%"/>
												<col width="*"/>
											</colgroup>
											<thead>
												<tr>
													<th scope="col">{{ $t("analysis.table1_col1")}}</th>
												<th scope="col">{{ $t("analysis.table1_col2")}}</th>
												</tr>											
											</thead>
											<tbody id="table1-body">										
											</tbody>
										</table> 
									</div>  
							</dd>
						</dl>
				</div>   
				<div class="analysis-table-wrap">
						<dl>
							<dt>Low Voltage</dt>
							<dd> 
								<div class="analysis-table table_wrap2">
									<table id="table2" class="lowTable">
									 <colgroup>
											<col width="45%"/>
											<col width="*"/>
										</colgroup>
										<thead>
											<tr>
												<th scope="col">{{ $t("analysis.table1_col1")}}</th>
												<th scope="col">{{ $t("analysis.table1_col2")}}</th>
											</tr>											
										</thead>
										<tbody id="table2-body">
											 
										</tbody>  
									</table> 
								</div>
							</dd>
						</dl>
				</div>   
			</article>
 </section>
</template>

<script>
import { get182247 } from "@/assets/temp/a182247.js";
 import { get182354 } from "@/assets/temp/a182354.js";
 import { get182457 } from "@/assets/temp/a182457.js";
 import { get182600 } from "@/assets/temp/a182600.js";
 import { get182703 } from "@/assets/temp/a182703.js";
 import { get182806 } from "@/assets/temp/a182806.js";
 import { get182909 } from "@/assets/temp/a182909.js"; 
 import { get183011 } from "@/assets/temp/a183011.js";

export default {
  layout : "analysis",
  head : {
		link: [
				{rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'} 
      ],
    script : [
			//  { src: "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",	integrity: "sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==",	crossorigin: "" },
			// {	src : "/scripts/map/leaflet.migrationlayer.js"	},	
			// {src : '/scripts/jqGrid/jquery.jqGrid.min.js'},
			// {src : '/scripts/jqGrid/grid.locale-en.js	'}, 
			// {src : "/scripts/jqGrid/p21-custom-paging.js"}, 
			// {src : "/scripts/jquery/core/perfect-scrollbar.js"},
			// {src : "/scripts/map/p21-loadFlow.js", type : "module"},
    ]
  },
  data(){	
		return{ 
			map : null,
			markerLocMap : null,
			officeLatLng : {lat : 36.351719, lng : 127.398300	},
			graph765 : null,
			graph345 : null,
			graph154 : null,
			urlLoadFlow : process.env.url_load_flow,
			fromTo : [{"from":"rcc1","to":"rcc2","value":19},{"from":"rcc3","to":"rcc2","value":19},{"from":"rcc3","to":"rcc4","value":19},{"from":"rcc4","to":"rcc2","value":19},{"from":"rcc4","to":"rcc5","value":19},{"from":"rcc4","to":"rcc8","value":19},{"from":"rcc5","to":"rcc1","value":19},{"from":"rcc5","to":"rcc2","value":19},{"from":"rcc5","to":"rcc3","value":19},{"from":"rcc6","to":"rcc4","value":19},{"from":"rcc6","to":"rcc5","value":19},{"from":"rcc6","to":"rcc8","value":19},{"from":"rcc7","to":"rcc4","value":19},{"from":"rcc7","to":"rcc8","value":19},{"from":"rcc7","to":"rcc13","value":19},{"from":"rcc9","to":"rcc10","value":19},{"from":"rcc10","to":"rcc7","value":19},{"from":"rcc10","to":"rcc13","value":19},{"from":"rcc11","to":"rcc12","value":19},{"from":"rcc11","to":"rcc14","value":19},{"from":"rcc13","to":"rcc9","value":19},{"from":"rcc13","to":"rcc11","value":19},{"from":"rcc13","to":"rcc12","value":19},{"from":"rcc14","to":"rcc6","value":19},{"from":"rcc14","to":"rcc8","value":19}],
			flowInfoMarker : [],
			mapLabel1 : null,
			mapLabel2 : null,
			timeSet : null,
			// migrationlayer : null,
			interval1 : null,
			intervalTime : 1000 * 60,
			loadData : '',
			sorted765 :'',
			sorted345 : '',
			sorted154 : '',
			downloadEnable : true,
			randomIdx : 0,
		}
	},
	methods : { 
		download : function()
		{
			var csv = [];
			var row = [];
			row.push("area");
			row.push("name");
			row.push("number");
			row.push("pu");
			row.push("volt");
			csv.push(row.join(','));
			row = [];
			this.sorted765.forEach((info) =>{
				row.push(info.area);
				row.push(info.name);
				row.push(info.number);
				row.push(info.pu);
				row.push(info.volt);

				csv.push(row.join(','));
				row = [];
			}); 

			row = [];
			this.sorted345.forEach((info) =>{
				row.push(info.area);
				row.push(info.name);
				row.push(info.number);
				row.push(info.pu);
				row.push(info.volt);
				
				csv.push(row.join(','));
				row = [];
			}); 

			row = [];
			this.sorted154.forEach((info) =>{
				row.push(info.area);
				row.push(info.name);
				row.push(info.number);
				row.push(info.pu);
				row.push(info.volt);
				
				csv.push(row.join(','));
				row = [];
			}); 

			exportCSVFile(csv.join('\n'), '계통해석.csv');

		}, 
		setTimer()
		{
			var tiemSet = document.getElementById('timeSet').value;
			if(isNaN(this.timeSet) == true)
			{
				alert('숫자만 입력 가능합니다.');
				return ;
			}
			if(Number(this.timeSet) < 0 || Number(this.timeSet) > 61)
			{
				alert('1분 이상, 60분 이하로만 입력 가능합니다.');
				return ;
			}

			this.intervalthis = Number(this.timeSet) * 1000 * 60
			this.stopAnalysis();
			this.startCalculator();
			alert('반영되었습니다.');
		}, 
		init : function(){
			var cartodbUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png'
			this.map = L.map('map', { minZoom: 8, maxZoom: 16, dragging: false })
				.setView([36.38149043210595,    128.17749023437503], 7); 
				this.map.on("click", function(e){
					//console.log(e);
				})
			L.tileLayer(cartodbUrl, { 
			}).addTo(this.map);			
			this.map.zoomControl.remove(); 
		}, 
		initAnimationMap : function(map){
			if(migrationlayer !=null || migrationlayer == undefined){
				migrationlayer = new L.migrationLayer({
					map : map,
					// data : data,
					pulseRadius : 2
				});
				migrationlayer.addTo(map);
			}
		},
		initMarkerLoc : function(){
				var markerLoc = new HashMap();
				markerLoc.set(1, {lat: 37.591169, lng : 126.981261});//서울
				markerLoc.set(2, {lat: 37.44641786318253, lng : 127.13540364266785});//남서울
				markerLoc.set(3, {lat: 37.47258209654341, lng : 126.45991221747337});//인천
				markerLoc.set(4, {lat: 37.162385770353495, lng : 126.83884643160687 });//경기
				markerLoc.set(5, {lat : 37.9636294182446, lng : 126.90474803406487});//경기북부
				markerLoc.set(6, {lat : 37.62818198386735, lng : 128.89443397521973});
				markerLoc.set(7, {lat : 36.58885351698976, lng : 126.95821166038515});
				markerLoc.set(8, {lat : 36.72473031116381, lng : 127.83198952674866});
				markerLoc.set(9, {lat : 35.02451264407351, lng : 127.31542825698853});
				markerLoc.set(10, {lat : 35.71046060286918, lng : 127.1841824054718});
				markerLoc.set(11, {lat : 35.85920854499696, lng : 128.62467885017395});
				markerLoc.set(12, {lat : 35.32428811283104, lng : 129.19279217720032});
				markerLoc.set(13, {lat : 35.21695664169799, lng : 128.60976576805115});
				markerLoc.set(14, {lat : 36.52669712203727, lng : 128.67660641670227});
				return markerLoc;  
		}, 
		initMarkerImg : function()
		{
			var markerImgMap = new HashMap();
				markerImgMap.set('mImg1', L.icon({ iconUrl: '/images/map/m1.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg2', L.icon({ iconUrl: '/images/map/m2.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg3', L.icon({ iconUrl: '/images/map/m3.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg4', L.icon({ iconUrl: '/images/map/m4.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg5', L.icon({ iconUrl: '/images/map/m5.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg6', L.icon({ iconUrl: '/images/map/m6.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg7', L.icon({ iconUrl: '/images/map/m7.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg8', L.icon({ iconUrl: '/images/map/m8.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg9', L.icon({ iconUrl: '/images/map/m9.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg10', L.icon({ iconUrl: '/images/map/m10.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg11', L.icon({ iconUrl: '/images/map/m11.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg12', L.icon({ iconUrl: '/images/map/m12.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg13', L.icon({ iconUrl: '/images/map/m13.png', iconSize:  [37, 48],	}));
				markerImgMap.set('mImg14', L.icon({ iconUrl: '/images/map/m14.png', iconSize:  [37, 48]	}));
				// markerImgMap.set('mImg15', L.icon({ iconUrl: '/images/map/m15.png', iconSize:  [25, 41],	}));
			return markerImgMap;
		},
		setMarker : function(){
			var markerImgMap = this.initMarkerImg();
			var markerLocHashMap = this.initMarkerLoc();
			this.markerLocMap = new HashMap(); 
			var officeLatLng = {lat : 36.351719, lng : 127.398300	}
			for(var i=1; i < markerLocHashMap.keys().length+1; i++){
				var markerIdx = 'mImg' + (i);
				var markerIcon = markerImgMap.get(markerIdx);
				var loc = markerLocHashMap.get(i);
					this.markerLocMap.set('rcc'+(i),loc);
				L.marker(loc, {icon : markerIcon}).addTo(this.map);
			}

			var officeIcon = L.icon({iconUrl : '/images/building.png', iconSize : [20, 20]});
			L.marker(this.officeLatLng, {icon : officeIcon}).addTo(this.map);
		},
		init765Graph : function( yaxeLabel, data1Label, data2Label)
		{
			var config1 = {
				type: 'line',
				data: {
					labels: [
						'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
							],
					datasets: [
						{
							label: 'RCC1',
							backgroundColor: "red",
							borderColor: "red",
							borderWidth: 1,//라인 두께 조정 default는 3
							data: [
							],
							fill: false,
							pointHitRadius: 0,
							pointRadius: 5,
							lineTension: 0
						}						
					]
				},
				options: {
					// responsive: true,
					maintainAspectRatio: false,
					maxPU : 1.15,
					minPU : 0.95,
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					legend: {
						display : false,
						// position: 'top',						
						// labels: {
						// 		fontColor: "white",   
						// 		fontSize : 9,          
						// }
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true, 
							scaleLabel: {
								fontColor: "white", 
								display: true,
								// labelString: '24H'
							},gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white", 
								// min: 0,
								// max: 24
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: yaxeLabel
								
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white",
								min: 0.9,
								max: 1.35,
								stepSize : 0.1
							}
						}]
					},
					annotation: {
						annotations: [{
							type: 'line',
							mode: 'horizontal',
							scaleID: 'y-axis-0',
							value: 1.05,
							borderColor: 'rgb(75, 192, 192)',
							borderWidth: 4,
							label: {
								enabled: false,
								content: 'Test label'
							}
						},
						{
							type: 'line',
							mode: 'horizontal',
							scaleID: 'y-axis-1',
							value: 0.95,
							borderColor: 'rgb(75, 192, 192)',
							borderWidth: 4,
							label: {
								enabled: false,
								content: 'Test label'
							}
						}]
					}
				}
					
			};
			var ctx1 = document.getElementById('graph765').getContext('2d');
			this.graph765 = new Chart(ctx1, config1);
			
		},
		init375Graph : function( yaxeLabel, data1Label, data2Label)
		{
			var config1 = {
				type: 'line',
				data: {
					labels: [
							'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
							],
					datasets: [{
						label: '금일',
						backgroundColor: "blue",
						borderColor: "blue",
						borderWidth: 1,//라인 두께 조정 default는 3
						data: [
						],
						fill: false,
						pointHitRadius: 0,
						pointRadius: 5,
						lineTension: 0
					}]
				},
				options: {
					// responsive: true,
					maintainAspectRatio: false,
					maxPU : 1.15,
					minPU : 0.95,
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					legend: {
						display : false,
						// position: 'right',
						// labels: {
						// 		fontColor: "white",             
						// }
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true, 
							scaleLabel: {
								fontColor: "white", 
								display: false,
								labelString: '24H'
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white", 
								//  fontSize: 5
								// min: 0,
								// max: 24
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: yaxeLabel 									
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white",
								min: 0.9,
								max: 1.35,
								stepSize : 0.1
							}
						}]
					}
				}
			};
			var ctx1 = document.getElementById('graph345').getContext('2d');
			this.graph345 = new Chart(ctx1, config1);
		},
		init154Graph : function( yaxeLabel, data1Label, data2Label)
		{
			var config1 = 
				{
				type: 'line',
				data: {
					labels: [
							'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
							],
					datasets: [{
						label: data1Label,
						backgroundColor: "green",
						borderColor: "green",
						borderWidth: 1,//라인 두께 조정 default는 3
						data: [],
						fill: false,
						pointHitRadius: 0,
						pointRadius: 5,
						lineTension: 0
					}]
				},
				options: {
					// responsive: true,
					maintainAspectRatio: false,
					maxPU : 1.15,
					minPU : 0.95,
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					legend: {
						display : false,
						// position: 'right',
						// labels: {
						// 		fontColor: "white",             
						// }
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true, 
							scaleLabel: {
								fontColor: "white", 
								display: false,
								labelString: '24H'
							},gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white",  
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: yaxeLabel
								
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white",
								min: 0.9,
								max: 1.35,
								stepSize : 0.1
							}
						}]
					}
				}
			};
			var ctx1 = document.getElementById('graph154').getContext('2d');
			this.graph154 = new Chart(ctx1, config1);
		},
		flowRCCLocData : function(fromTo)
		{
			var randomCnt = fromTo.length-1;
			var idx = 0;
			var randomList = [];
			var flowInfo = [];
			while(randomList.length < randomCnt)
			{
				// var num = getRandomInt(0, fromTo.length);
				// if(randomList.indexOf(num) == -1 )
				// 	randomList.push(num);
				randomList.push(idx++);
			}
			for(var i=0; i < randomList.length; i++)
			{
				var fromToInfo = fromTo[randomList[i]];
				flowInfo.push({from : fromToInfo.from, to : fromToInfo.to, value : fromToInfo.value});
			} 
			// flowInfo = [];
			// flowInfo.push({from : this.fromTo[3].from, to : this.fromTo[3].to, value : this.fromTo[3].value})
			return flowInfo;
		},
		recvData : function(data,a,b,c,d,e)
		{
			var _latlng;
			var _high_voltage_count;
			var _low_voltage_count;
			var _id;
			var markerLocHashMap = this.initMarkerLoc();
			$('.voltage-cnt').remove();
			for(var _i =0; _i < data.loadflow.length; _i++)
			{
				_id = data.loadflow[_i].rcc;
				_latlng = markerLocHashMap.get(_id);
				_high_voltage_count = data.loadflow[_i].high_voltage_count;
				_low_voltage_count = data.loadflow[_i].low_voltage_count;
				var	infoDiv = this.setVoltageLavel('rcc-volCnt-'+_i, _high_voltage_count, _low_voltage_count);
				var divIcon = L.divIcon({
					className : 'voltage-cnt',
					html : infoDiv.innerHTML,
					iconSize : [280, 50],
					iconAnchor : [-30, 20]
				})
				var m = L.marker(_latlng, {
					icon : divIcon,
					draggable : false
				}).addTo(this.map);
				this.flowInfoMarker.push(m);
			} 
		},
		setVoltageLavel : function(id, high_voltage_count, low_voltage_count){
			var div = document.createElement('div'); 
			div.class = "voltage-cnt";
			var ul = document.createElement('ul');
			ul.className="voltage-label-list";
			
			
			var li1 = document.createElement('li');
			var span1 = document.createElement('span');
			// span1.innerText = "과전압 개소 : "+high_voltage_count;
			span1.innerText = this.mapLabel1 + high_voltage_count;
			span1.id = "high_voltage_count-"+id;
			li1.appendChild(span1);   
			
			var li2 = document.createElement('li');
			var span2 = document.createElement('span');
			span2.innerText =  this.mapLabel2 + low_voltage_count;
			span2.id = "low_voltage_count-"+id;
			li2.appendChild(span2);   

			ul.appendChild(li1); 
			ul.appendChild(li2); 
			div.appendChild(ul);
			return div;
		} ,
		setFlowAniData : function(map, officeLatLng, locMap, fromTo){
				var url = this.urlLoadFlow;
				
				var data = [];
				var flowInto = this.flowRCCLocData(this.fromTo);
				var from = {lat:null, lng : null}, to = {lat:null, lng : null};
				var labelFn = this.setVolateLabel;
				// $.ajax({
				// 	url : url,
				// 	type : 'get',
				// 	success : this.recvData,
				// 	error : function(data){
				// 		console.log('setFlowAniData() error,\t' + data);
				// 	},
				// });
				this.recvData(fromTo);
				
				for(var i=0; i < flowInto.length; i++)
				{
					var	d = flowInto[i];
					var fromIdx, toIdx;
					fromIdx = Number(d.from.substring(d.from.length,3));
					toIdx = Number(d.to.substring(d.to.length,3));
					if(flowInto[i].value > 0)
					{
						
						from.lat = locMap.get(fromIdx).lat;
						from.lng = locMap.get(fromIdx).lng;
						to.lat = locMap.get(toIdx).lat;
						to.lng  =locMap.get(toIdx).lng;
						data.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
					}
					else
					{
						from.lat = locMap.get(toIdx).lat;
						from.lng = locMap.get(toIdx).lng;
						to.lat = locMap.get(fromIdx).lat;
						to.lng  =locMap.get(fromIdx).lng;
						data.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
					}
				} 
				if(migrationlayer == undefined || migrationlayer == null){
						migrationlayer = new L.migrationLayer({
						map : this.map,
						data : data,
						pulseRadius : 2
					});
					migrationlayer.addTo(this.map);
					migrationlayer.show();
					migrationlayer.setData(data);
					migrationlayer.play();
				}  else{
						migrationlayer.addTo(this.map);
					migrationlayer.show();
					migrationlayer.setData(data);
					migrationlayer.play();
				}
				
		},
		setHigtVoltageTable : function(data){
			var tbody = document.getElementById("table1-body");
			data.forEach((d)=>{
				var row = tbody.insertRow( tbody.rows.length ); // 하단에 추가
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = d.name;
				cell2.innerHTML = d.pu;
			}) 
		},
		setlowVoltageDataTable : function(data){
			var tbody = document.getElementById("table2-body");
			data.forEach((d)=>{
				var row = tbody.insertRow( tbody.rows.length ); // 하단에 추가
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = d.name;
				cell2.innerHTML = d.pu;
			})
		},
		runAnalysis : function()
		{				
			var idx = this.randomIdx %8;
					this.randomIdx ++;
					var loadData;
					if(idx == 0)
						loadData = get182247();
					else if(idx == 1){
						loadData = get182354();
					}else if(idx ==2){
						loadData = get182457();
					}else if(idx == 3){
						loadData = get182600();
					}else if(idx == 4){
						loadData = get182703();
					}else if(idx == 5){
						loadData = get182806();
					}else if(idx == 6){
						loadData = get182909();
					}else if(idx == 7){
						loadData = get183011();
					}
					this.loadData = loadData;
					// loadData.buslist[0].volt
					var data765 =[];
					var data345 = [];
					var data154 = [];

					var highVoltageData = [];
					var lowVoltageData = [];
					// this.initAnimationMap(this.map);
					//data 1차 가공
					loadData.buslist.forEach((info)=>{
						if(info.volt === 765)
						{
							data765.push(info);
						}else if(info.volt === 345)
						{
							data345.push(info);
						}else if(info.volt === 154)
						{
							data154.push(info);
						}else{
							//console.log(info);
						}

						//high ? low?
						if(info.pu > 1.05){
							highVoltageData.push(info);
						}					
						else if(info.pu < 0.95){
							lowVoltageData.push(info);
						}
					});
					this.sorted765 =  data765.sort(function(a, b)
					{
						// console.log(a);console.log(b);
						return b.pu - a.pu}
					);

					this.sorted345 =  data345.sort(function(a, b)
					{
						// console.log(a);console.log(b);
						return b.pu - a.pu}
					);

					this.sorted154 =  data154.sort(function(a, b)
					{ return b.pu - a.pu}
					);
					
					// this.setFlowAniData(this.map, this.officeLatLng, this.initMarkerLoc(), this.fromTo)
					this.setFlowAniData(this.map, this.officeLatLng, this.initMarkerLoc(), loadData);

					//label 뿌리기	
					//765 데이터 표현
					this.graph765.config.data.labels = [];
					this.graph765.config.data.datasets[0].data = [];
					// var c = getRandomColor();
					var c = 'rgb(255,0,255)';
					var bar765Data = {label : '', fill : false, backgroundColor : c, borderColor : c, borderWidth : 1, data : [], pointHitRadius : 0, pointRadius : 5, lineTension : 0};
					for(var i = 0; i < this.sorted765.length && i < 20; i++)
					{
						this.graph765.config.data.labels.push(this.sorted765[i].name.trim());
						this.graph765.config.data.datasets[0].data.push(this.sorted765[i].pu.toFixed(2));
					}
					// this.graph765.config.data.datasets.push(bar765Data);			
					this.graph765.update(); 

					//345 
					this.graph345.config.data.labels = [];
					this.graph345.config.data.datasets[0].data = [];
					// var c = getRandomColor();
					var c = 'rgb(0,128,255)';
					var bar345Data = {label : '', fill : false, backgroundColor : c, borderColor : c, borderWidth : 1, data : [], pointHitRadius : 0, pointRadius : 5, lineTension : 0};
					for(var i = 0; i < this.sorted345.length && i < 20 ; i++)
					{
						this.graph345.config.data.labels.push(this.sorted345[i].name.trim());
						// bar345Data.data.push(sorted345[i].pu.toFixed(2));
						this.graph345.config.data.datasets[0].data.push(this.sorted345[i].pu.toFixed(2));
					}
					// this.graph345.config.data.datasets.push(bar345Data);			
					this.graph345.update(); 
				

					//154
					this.graph154.config.data.labels = [];
					this.graph154.config.data.datasets[0].data = [];
					// var c = getRandomColor();
					var c = 'rgb(0,128,0)';
					var bar154Data = {label : '', fill : false, backgroundColor : c, borderColor : c, borderWidth : 1, data : [], pointHitRadius : 0, pointRadius : 5, lineTension : 0};
					for(var i = 0; i < this.sorted154.length && i < 20 ; i++)
					{
						this.graph154.config.data.labels.push(this.sorted154[i].name.trim());
						// bar154Data.data.push(sorted154[i].pu.toFixed(2));
						this.graph154.config.data.datasets[0].data.push(this.sorted154[i].pu.toFixed(2))
					}
					// this.graph154.config.data.datasets.push(bar154Data);			
					this.graph154.update(); 

					var highTableData = [];
					var lowTableData = [];

					highVoltageData.forEach((data) =>{
						highTableData.push({name : data.name.trim(), pu : data.pu.toFixed(2)});
					})
					lowVoltageData.forEach((data) =>{
						lowTableData.push({name : data.name.trim(), pu : data.pu.toFixed(2)});
					})

					this.setHigtVoltageTable(highTableData);
					this.setlowVoltageDataTable(lowTableData);
					this.enableDownload();

		},
		startCalculator : function(){
			//console.log('start calculator after '+ this.intervalTime);
			var randomIdx =0;
			// var fnRun = this.runAnalysis();
			
			this.interval1 = setInterval(this.runAnalysis(), this.intervalTime);
		},
		stopAnalysis : function(){
			clearInterval(this.interval1);
			this.disableDownload();
		},
		enableDownload : function()
		{
			document.getElementById('btn_download').disabled = false;
		},
		disableDownload : function()
		{
			document.getElementById('btn_download').disabled = true;
		}
	},
	middleware : 'authenticated',
	mounted() { 
		this.init();
		this.setMarker();

		this.mapLabel1 = this.$t("analysis.map_label1")
		this.mapLabel2 = this.$t("analysis.map_label2");

		$('.th1').removeClass('active');
		$('#gnav-analysis').addClass('active');

		// this.initAnimationMap(this.map);
		this.init765Graph( this.$t("analysis.chart_yaxes"), this.$t("analysis.chart_data1Lb"),  this.$t("analysis.chart_data2Lb") );
		this.init375Graph( this.$t("analysis.chart_yaxes"), this.$t("analysis.chart_data1Lb"),  this.$t("analysis.chart_data2Lb") );
		this.init154Graph( this.$t("analysis.chart_yaxes"), this.$t("analysis.chart_data1Lb"),  this.$t("analysis.chart_data2Lb") );

		this.map.on("click", function(e){
			//console.log(this.map)
		})
		this.disableDownload();
		// this.startCalculator();
			
		new PerfectScrollbar('.table_wrap1');
		new PerfectScrollbar('.table_wrap2');

		Chart.pluginService.register({
			afterDraw: function(chart) {
				if(typeof chart.config.options.maxPU != 'undefined' && typeof chart.config.options.minPU != 'undefined')
				{
					var maxPU = chart.config.options.maxPU;
					var minPU = chart.config.options.minPU;
					var ctxPlugin = chart.chart.ctx;
					var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
					var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];
												
					ctxPlugin.beginPath(); 
					// yIdx = yIdx * 40;
					var maxPU = (yAxe.height/5) * 3.5;
					ctxPlugin.moveTo(xAxe.left, maxPU);
					ctxPlugin.lineTo(xAxe.right, maxPU);

					maxPU = (yAxe.height/5) * 4.7;
					ctxPlugin.moveTo(xAxe.left, maxPU);
					ctxPlugin.lineTo(xAxe.right, maxPU);

					ctxPlugin.lineWidth=1;
					ctxPlugin.strokeStyle = "#fff";
					ctxPlugin.setLineDash([10,20]);
					ctxPlugin.stroke();
				}
			}
		});
	 },
	 beforeDestroy() {
		 clearInterval(this.interval1);
	 },
} 

var migrationlayer;
</script>

<style>
.analysis_container{height: 60rem;width: 120rem;}
.analysis {width: 100%;height: 100%;padding:.25rem;}
.analysis .mapSection{width:43rem; height: 59.125rem;margin:.25rem;float: left;border-radius:.25rem;}
.analysis-graph-wrap{float: left; height:14.3rem; width: 75.75rem;border-radius: .25rem;background: #232939;margin: .25rem 0;}
.analysis-graph-wrap dt, .analysis-table-wrap dt{padding: .75rem 2.55rem;display: inline-block;font-size: 1.124rem;line-height: 1.375rem;color: #d6dee7;font-weight: bold;vertical-align: top;}
.analysis-graph-wrap dd{position: relative;padding:0 .525rem;height:12.5rem;}
.analysis-table-wrap{float:left; height:14.3rem; width:37.5rem;border-radius: .25rem;background:#232939;margin:.25rem;}
.analysis-table{display:block;margin:0 auto; height:10rem;width:35rem; position: relative;border-radius:.25rem;background:#0e192a;}
.analysis-table table{width:100%;}
/* .analysis-table table tbody{position: relative;} */
.analysis-table table th{padding:.25rem;border-bottom:2px solid #394554;font-size:.875rem;line-height:1.75rem;color:#fff;}
.analysis-table table td{padding:.25rem;border-bottom:1px solid #28303b;text-align:center;font-size:.875rem;line-height:1.75rem;color:#bcd2cb;}

.timeTrigger_wrap{position:fixed;z-index:99999;float:left;left:26rem; top:8.5rem;}
.timeTrigger_wrap::after{clear:both;}
.timeTrigger_wrap input[type="text"]{width:8.125rem; height:2.125rem; font-size:15pt;padding:1.125rem;float: left;}
.btn_query{display: block;width: 4.125rem; height:2.125rem; padding:0.4375rem 0; border-radius: 0.1875rem;background:#2a75ff;font-size: 1.0625rem;line-height: 1.25rem;color:#fff;letter-spacing: -0.03125rem;text-align: center;float:left;margin: 0 .125rem;}
.btn_query::after{clear:both;}

.progressbar{ display: block; position: absolute; background-color: lightslategray;	opacity: .3;	width: 100%;	height: 100%;	top : 0;}
.lds-facebook {display: inline-block;  position: absolute; width: 64px; height: 64px; top : 50%; left: 50%;}
.lds-facebook div { display: inline-block;  position: absolute; left: 6px; width: 13px; background: #fff;  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;}
.lds-facebook div:nth-child(1) {left: 6px; animation-delay: -0.24s;}
.lds-facebook div:nth-child(2) { left: 26px; animation-delay: -0.12s;}
.lds-facebook div:nth-child(3) { left: 45px; animation-delay: 0;}

</style>
