<template>
	<div class="areaCard">
		<div class="cardHeaderInfo">
			<dl>
				<dt :id="rccId">
					<!-- <img v-bind="markerImgSrc" src="/images/index/icon_01.PNG" alt=""> -->
					<img :src="markerImgSrc" alt>
					{{rccName}}
				</dt>
				<dd class="infoDD">
					<ul class="mnt">
						<li>
							{{ $t('monitorCard.active_powerMW')}} :
							<span>{{actPwr}}</span>
						</li>
					</ul>
					<!-- <ul class="dr">
						<li>
							{{ $t('monitorCard.load_reductionMW')}} :
							<span>{{disChg}}</span>
						</li>
					</ul> -->
						<ul class="dr">
						<li>
							{{ $t('monitorCard.load_reductionMW')}} :
							<span>0</span>
						</li>
					</ul>
					<ul class="evt">
						<li>
							{{ $t('monitorCard.event')}} :
							<span>{{evtCnt}}</span>
						</li>
					</ul>
					<!-- <ul style="display:none;">							
							<li><i :id="weatherId" class="wi wi-day-rain-wind"></i> </li>
					</ul>-->
				</dd>
				<dd class="weatherDD" :id="rccId+'weather'">
					<!-- <img :id="weatherId" src="/images/index/weather/icon_weather_11.png">						 -->
				</dd>
			</dl>
		</div>

		<div class="total-info-area">
			<div class="service-noti-area">
				<ul>
					<li class="evt">
						<span :id="serviceFreq" class="service">{{ $t('monitorCard.frequency')}}</span>
					</li>
					<li class="evt">
						<span :id="serviceSchedule" class="service">{{ $t('monitorCard.scheduling')}}</span>
					</li>
					<li class="evt">
						<span :id="servicePeak" class="service">피크컷</span>
					</li>
					<li class="evt">
						<span :id="serviceDr" class="service">DR</span>
					</li>
					<!-- <li class="evt"><span :id="serviceP2p" class="service ">P2P</span></li>  -->
				</ul>
			</div>
			<div class="graph-area">
				<canvas :id="lienChartId"></canvas>
			</div>
			<div class="battery-area">
				<div class="batteryImg">
					<img :id="rccId+'Bat'" src="/images/common/bat_B_08.PNG" alt>
				</div>
				<div class="batteryValue">
					<span>{{soc_average}}%</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: "rccMonitor",
	component: {},
	head: {
		link: [],
		script: [
			// {src : '/scripts/charts/Chart.min.js'}
		]
	},
	props: {
		rccName: { type: String },
		lienChartId: { type: String },
		drChartId: { type: String },
		rccId: null,
		rccColor: null,
		markerImgSrc: null,
		socId: null
	},
	data() {
		return {
			weatherId: this.rccId + "-weather",
			serviceFreq: this.rccId + "-freq",
			serviceSchedule: this.rccId + "-schedule",
			servicePeak: this.rccId + "-peak",
			serviceDr: this.rccId + "-dr",
			serviceP2p: this.rccId + "-p2p",
			getSocName: this.rccId + "soc",
			socBatName: this.rccId + "-BatPer",
			chartData: [],
			lineChart: null,
			drChart: null,
			// drChartId : null,
			actPwr: 0.0,
			sumActPwr: 0.0,
			amount: 0,
			sumAcount: 0,
			disChg: 99.99,
			essCnt: 0,
			pvCnt: 0,
			drCnt: 0,
			gradientStroke: null,
			soc_average: null,
			evtCnt: 0,
			beforeMin: 0,
			config1: {
				type: "line",
				data: {
					labels: [
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23,
						24,
						25,
						26,
						27,
						28,
						29,
						30,
						31,
						32,
						33,
						34,
						35,
						36,
						37,
						38,
						39,
						40,
						41,
						42,
						43,
						44,
						45,
						46,
						47,
						48,
						49,
						50,
						51,
						52,
						53,
						54,
						55,
						56,
						57,
						58,
						59,
						60
					],

					datasets: [
						{
							label: "My First dataset",
							data: [],
							backgroundColor: "rgba(84, 156, 254, .2)",
							borderColor: "#549cfe",
							pointRadius: 1,
							borderWidth: 1
						},
						{
							label: "My First dataset2",
							data: [],
							backgroundColor: "#FF5079",
							borderColor: "#FF5079",
							pointRadius: 1,
							borderWidth: 1,
							fill: false
						}
					]
				},
				options: {
					animation: false,
					// "responsive":true,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: "Chart.js Line Chart"
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: true
					},
					hover: {
						// "mode":"nearest",
						intersect: false
					},
					scales: {
						xAxes: [
							{
								display: false,
								scaleLabel: { display: false },
								ticks: {}
							}
						],
						yAxes: [
							{
								display: false,
								scaleLabel: { display: false, labelString: "Value" },
								ticks: {
									// max: 30000, // minimum value
									// min: -50, // maximum value
									//  stepSize : 5000
								}
							}
						]
					}
				}
			}
		};
	},
	created() { },
	beforeDestroy() {
		// $off method will turned off the event listner
		this.$nuxt.$off(this.rccId + "-activePower");
	},
	methods: {
		initLineChart(id) {
			var ctx = document.getElementById(id).getContext("2d");
			this.lineChart = new Chart(ctx, this.config1);
		},
		initDRChart(id) {
			var ctx = document.getElementById(id).getContext("2d");

			this.drChart = new Chart(ctx, this.config2);
		},
		updateChartData(data) {
			if (data.request_id == "ESS.statistics.rsc.1") {
				// console.log("min = " + data.minute);
			}
			var dt = new Date();
			// console.log(dt.getMinutes());
			// 분이 0분이면 모든 데이터 초기화 
			if (dt.getMinutes() == 0) {
				this.lineChart.data.datasets[0].data = [];
			}
			if(this.lineChart.data.datasets[0].data.length >=60){
					this.lineChart.data.datasets[0].data = [];
			}
			if(data.minute+1 == 60){
				for(var i=0; i  <60 ;i++){
					this.lineChart.data.datasets[0].data[data.minute]
				}
			}

			this.lineChart.data.datasets[0].data[dt.getMinutes()] =
				data.pv_activePower;
			// console.log(data.minute + ", " + data.pv_activePower);
			// if (data.forecast[0] !== null) {
			// 	// var forecast = JSON.parse(data.forecast);
			// 	this.lineChart.data.datasets[1].data = data.forecast;
			// } else {
			// 	this.lineChart.data.datasets[1].data = [
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0,
			// 		0
			// 	];
			// }
			this.lineChart.update();
		},
		updateActPwr(data) {
			console.log(data.pv_activePower)
			if(data.pv_activePower != null & data.soc_average != null){
				//var _num = data.pv_activePower;
			//this.actPwr = _num.toFixed(2);
			this.actPwr = data.pv_activePower.toFixed(2);
			}
			else{
				this.actPwr = 0;
			}
			//var _num = Number(Math.abs(data.pv_activePower));
		
		},
		updateDisChg(data) {
			// var _num  = (Math.random() * (10 - 0)).toFixed(2);
			// this.disChg = _num;
			this.disChg = data.dr_meter.toFixed(0);
		},
		updateEvtCnt(data) {
			// var _num  = Math.floor((Math.random() * (3 - 0)));
			// this.disChg = _num.format();
			// this.evtCnt = data.rccEvtCnt;

			this.evtCnt = data.event_count;
		},
		updateSoc(data) {
			if(data.pv_activePower != null & data.soc_average != null){
				this.soc_average = data.soc_average.toFixed(2);
			}
			else{
				this.soc_average = 0;
			}
			var socImgSrc = "/images/common/";
			if (this.soc_average === 100) {
				socImgSrc = socImgSrc + "bat_B_10.PNG";
			} else if (this.soc_average < 100 && this.soc_average >= 90) {
				socImgSrc = socImgSrc + "bat_B_09.PNG";
			} else if (this.soc_average < 90 && this.soc_average >= 80) {
				socImgSrc = socImgSrc + "bat_B_08.PNG";
			} else if (this.soc_average < 80 && this.soc_average >= 70) {
				socImgSrc = socImgSrc + "bat_B_07.PNG";
			} else if (this.soc_average < 70 && this.soc_average >= 60) {
				socImgSrc = socImgSrc + "bat_B_06.PNG";
			} else if (this.soc_average < 60 && this.soc_average >= 50) {
				socImgSrc = socImgSrc + "bat_B_05.PNG";
			} else if (this.soc_average < 50 && this.soc_average >= 40) {
				socImgSrc = socImgSrc + "bat_B_04.PNG";
			} else if (this.soc_average < 40 && this.soc_average >= 30) {
				socImgSrc = socImgSrc + "bat_B_03.PNG";
			} else if (this.soc_average < 30 && this.soc_average >= 20) {
				socImgSrc = socImgSrc + "bat_B_02.PNG";
			} else if (this.soc_average < 20 && this.soc_average >= 10) {
				socImgSrc = socImgSrc + "bat_B_01.PNG";
			}
			// else if(this.soc_average < 10 && this.soc_average >= 0)
			else {
				socImgSrc = socImgSrc + "bat_B_00.PNG";
			}
			$("#" + this.rccId + "Bat").attr("src", socImgSrc);
		},
		updateCnt(data) {
			this.essCnt = data.ess_count;
			this.drCnt = 0;
			this.pvCnt = data.pv_count;
		},
		updateServiceOn(data) {
			
			//var _f = data.fr_service_active !== 0 ? true : false;
			//var _dr = data.dr_service_active !== 0 ? true : false;
			//var _peak = data.peakcut_service_active !== 0 ? true : false;
			var _sch = false;
			if(data.pcs_activePower == null){
				_sch = false;
			}
			else{	
				_sch = data.pcs_activePower !== 0 ? true : false;
			}
			
			// var _p2p = data.schedule_service_on > 0 ? false: true;
			// $("#" + this.serviceFreq)
			// 	.removeClass()
			// 	.addClass("service");
			// $("#" + this.serviceDr)
			// 	.removeClass()
			// 	.addClass("service");
			// $("#" + this.servicePeak)
			// 	.removeClass()
			// 	.addClass("service");
			$("#" + this.serviceSchedule)
				.removeClass()
				.addClass("service");

			// if (_f == true) {
			// 	$("#" + this.serviceFreq).addClass("serviceOn");
			// }
			// if (_dr == true) {
			// 	$("#" + this.serviceDr).addClass("serviceOn");
			// }

			// if (_peak == true) {
			// 	$("#" + this.servicePeak).addClass("serviceOn");
			// }

			if (_sch == true) {
				$("#" + this.serviceSchedule).addClass("serviceOn");
			}
			// console.log('123');
		},
		updateWeather(data) {
			var wCode = Number(data.weather_code);
			var weatherImgSrc = "/images/index/weather/";
			var id = "#" + this.rccId + "weather";
			if (wCode === 1) {
				//맑음//wi-day-sunny
				this.loadSVG(id, "/images/weather/img_WF_Weather001.svg");
			} else if (wCode === 2) {
				//구름조금//wi-cloud
				this.loadSVG(id, "/images/weather/img_WF_Weather002.svg");
			} else if (wCode === 3) {
				//구름 많음//wi-cloudy
				this.loadSVG(id, "/images/weather/img_WF_Weather003.svg");
			} else if (wCode === 4) {
				//흐림//wi-day-fog
				this.loadSVG(id, "/images/weather/img_WF_Weather011.svg");
			} else if (wCode === 5) {
				//비//wi-day-rain
				this.loadSVG(id, "/images/weather/img_WF_Weather004.svg");
			} else if (wCode === 6) {
				//비/눈(진눈꺠비)//wi-day-sleet-storm
				this.loadSVG(id, "/images/weather/img_WF_Weather009.svg");
			} else if (wCode == 7) {
				//눈//wi-day-snow-wind
				this.loadSVG(id, "/images/weather/img_WF_Weather009.svg");
			} else {
				this.loadSVG(id, "/images/weather/img_WF_Weather001.svg");
			}
		},
		loadSVG: function (selector, url) {
			var target = document.querySelector(selector);
			// If SVG is supported
			if (typeof SVGRect != "undefined") {
				// Request the SVG file
				var ajax = new XMLHttpRequest();
				ajax.open("GET", url, true);
				ajax.send();

				// Append the SVG to the target
				ajax.onload = function (e) {
					target.innerHTML = ajax.responseText;
					target.children[0].setAttribute("height", "2.25rem");
					target.children[0].setAttribute("width", "2.25rem");
				};
			} else {
				// Fallback to png
				target.innerHTML = "<img src='" + url + ".png' />";
			}
		}
	},
	mounted() {
		this.$nuxt.$on(this.rccId + "-activePower", data => {
			 console.log(data)
			 this.updateChartData(data);
			 this.updateActPwr(data); //발전량
			// this.updateDisChg(data); //감축량
			 this.updateSoc(data); //SoC
			// this.updateCnt(data); //ESS 카운트
			// this.updateWeather(data);
			 this.updateServiceOn(data);
			// this.updateEvtCnt(data); //evt 개수
		});

		var lineChartId = this.lienChartId;
		var rccColor = this.rccColor;
		var rccId = this.rccId;
		var drChartId = this.drChartId;

		// $("#" + rccId).css("backgroundColor", this.rccColor);
		this.initLineChart(lineChartId);
		// this.initDRChart(drChartId);
	}
};
</script>


<style>
/* .ct-point{
	stroke: #d70206;
	stroke-width: 10px;
	stroke-linecap: round;
}
.ct-line{
	stroke-width: 4px;
} */
</style>
