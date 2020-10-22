<template>
  	<div> 
			<dl>
				<dt :id="rccId">{{rccName}}</dt>
			<dd>
				<ul class="mnt">
					<li>{{ $t('monitorCard.active_powerMW')}} : <span>{{actPwr}}</span> MW</li>
				</ul>
				<ul class="dr">
					<li>{{ $t('monitorCard.load_reductionMW')}} : <span>{{disChg}}</span> MW</li> 
				</ul>
				<ul class="evt">
					<li>{{ $t('monitorCard.event')}} : <span>{{evtCnt}}</span> 개</li> 
				</ul>
				<ul>
					<!-- <li><i id="weather" class="wi wi-day-rain-wind"></i> </li> -->
					<li><i :id="weatherId" class="wi wi-day-rain-wind"></i> </li>
				</ul>
			</dd>
			</dl>
			<div class="graphArea"> 				
				<div class="rccSocDiv"> 
					<div class="socBattery_rating big">
						
						<div class="rccDiv">
							<span :id="socBatName" style="height:100%"/>
							<!-- <div class="rccBty" :id="socBatName" style="height:100%"/> -->
							<!-- <img src="/images/common/batteryInfo_bg.png" alt=""> -->
						</div>
						<div class="socValue">
							<span>{{soc_average}}%</span>
						</div>									
					</div> 
					
					<!-- <img src="/immages/common/battryInfo_rating04.png" alt=""> -->
					<!-- <span :id="socBatName" style="height:100%">111111111</span> <<img src="/images/common/batteryInfo_bg.png" alt="" srcset=""> -->
				</div>
				<canvas :id="lienChartId" class="rccGraph"></canvas>
				<!-- <div class="rccGrpahDiv">
					<canvas :id="lienChartId" class="rccGraph"></canvas>
				</div>
				
				<div class="rccGrpahDiv">
					<canvas :id="drChartId" class="rccGraph"></canvas>
				</div> -->
				 <!-- <canvas :id="drChartId" class="rccGraph" style="display:none;"></canvas> -->
				 <ul	>
					 <li class="evt"> <span :id="serviceFreq" class="service ">{{ $t('monitorCard.frequency')}}</span> </li>
					 <li class="evt"> <span :id="serviceSchedule" class="service ">{{ $t('monitorCard.scheduling')}}</span></li>
					 <li class="evt"> <span :id="servicePeak" class="service">Peak-Cut</span></li>
					 <li class="evt"><span :id="serviceDr" class="service ">DR</span></li>
					 <li class="evt"><span :id="serviceP2p" class="service ">P2P</span></li>
					 <!-- <li class="evt"> <span id="service-freq" class="service ">주파수</span> </li>
					 <li class="evt"> <span id="service-sch" class="service ">스케줄링</span></li>
					 <li class="evt"> <span id="service-peak" class="service">Peak-Cut</span></li>
					 <li class="evt"><span id="service-dr" class="service ">DR</span></li>
					 <li class="evt"><span id="service-p2p" class="service ">P2P</span></li> -->
				 </ul>
			<!-- .localCondition_info .batteryInfo -->
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
    rccColor2: null,
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
              data: [
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
              // "backgroundColor": this.rccColor
              borderColor: "#007AAE",
              pointBorderColor: "#007AAE",
              pointBackgroundColor: "#007AAE",
              pointHoverBackgroundColor: "#007AAE",
              pointHoverBorderColor: "#007AAE",
              pointBorderWidth: 1,
              pointHoverRadius: 1,
              pointHoverBorderWidth: 1,
              pointRadius: 1,
              fill: false,
              borderWidth: 5
            }
          ]
        },
        options: {
          animation: false,
          responsive: true,
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
            intersect: true
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
                  max: 63000, // minimum value
                  min: -50 // maximum value
                  // stepSize : 5
                }
              }
            ]
          }
        }
      }
    };
  },
  created() {},
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
      if (this.lineChart.data.datasets[0].data.length >= 60) {
        this.lineChart.data.datasets[0].data.shift();
      }
      this.lineChart.data.datasets[0].data.push(data.sum_pv_activePower);
      this.lineChart.data.datasets[0].data.shift();
      this.lineChart.update();
    },
    updateActPwr(data) {
      var _num = Number(Math.abs(data.sum_pv_activePower)) / 1000;
      this.actPwr = Number(_num.toFixed(2)).format();
    },
    updateDisChg(data) {
      // var _num = Number(data.sum_accum_discharging.toFixed(2));
      var _num = (Math.random() * (10 - 0)).toFixed(2);
      // this.disChg = _num.format();
      this.disChg = _num;
    },
    updateEvtCnt(data) {
      var _num = Math.floor(Math.random() * (3 - 0));
      // this.disChg = _num.format();
      this.evtCnt = _num;
    },
    updateSoc(data) {
      var socImgId = this.rccId + "-BatPer";
      // $('#'+socImgId).css('height',Number(data.soc_average)+"%");
      $("#" + socImgId).css("height", Number(data.soc_average / 20) + "rem");
      $("#" + this.rccId + "soc").text(data.soc_average);
      this.soc_average = data.soc_average.toFixed(0);
    },
    updateCnt(data) {
      this.essCnt = data.ess_count;
      this.drCnt = 0;
      this.pvCnt = data.pv_count;
    },
    updateServiceOn(data) {
      // var _f = data.frequency_service_on > 0 ? true : false;
      // var _dr = data.dr_service_on > 0 ? true : false;
      var _f = false;
      var _dr = false;
      var _peak = data.peakcut_activePower !== 0 ? true : false;
      var _sch = data.schedule_activePower !== 0 ? true : false;
      // var _p2p = data.schedule_service_on > 0 ? false: true;
      $("#" + this.serviceFreq)
        .removeClass()
        .addClass("service");
      $("#" + this.serviceDr)
        .removeClass()
        .addClass("service");
      $("#" + this.servicePeak)
        .removeClass()
        .addClass("service");
      $("#" + this.serviceSchedule)
        .removeClass()
        .addClass("service");

      if (_f == true) {
        $("#" + this.serviceFreq).addClass("serviceOn");
      }
      if (_dr == true) {
        $("#" + this.serviceDr).addClass("serviceOn");
      }

      if (_peak == true) {
        $("#" + this.servicePeak).addClass("serviceOn");
      }

      if (_sch == true) {
        $("#" + this.serviceSchedule).addClass("serviceOn");
      }
      // console.log('123');
    },
    updateWeather(data) {
      var wCode = Number(data.weather_code);
      if (wCode === 1) {
        //맑음//wi-day-sunny
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-day-sunny");
      } else if (wCode === 2) {
        //구름조금//wi-cloud
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-cloud");
      } else if (wCode === 3) {
        //구름 많음//wi-cloudy
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-cloudy");
      } else if (wCode === 4) {
        //흐림//wi-day-fog
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-day-fog");
      } else if (wCode === 5) {
        //비//wi-day-rain
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-day-rain");
      } else if (wCode === 6) {
        //비/눈(진눈꺠비)//wi-day-sleet-storm
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-day-sleet-storm");
      } else if (wCode == 7) {
        //눈//wi-day-snow-wind
        $("#" + this.weatherId)
          .removeClass()
          .addClass("wi wi-day-snow-wind");
      }
      //console.log("["+data.request_id+'] weathcode = '+wCode)
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  mounted() {
    this.$nuxt.$on(this.rccId + "-activePower", data => {
      this.updateChartData(data);
      this.updateActPwr(data); //발전량
      this.updateDisChg(data); //감축량
      this.updateSoc(data); //SoC
      this.updateCnt(data); //ESS 카운트
      this.updateWeather(data);
      this.updateServiceOn(data);
      this.updateEvtCnt(data); //evt 개수
    });

    var lineChartId = this.lienChartId;
    var rccColor = this.rccColor;
    var rccId = this.rccId;
    var drChartId = this.drChartId;

    $("#" + rccId).css("backgroundColor", this.rccColor);
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
