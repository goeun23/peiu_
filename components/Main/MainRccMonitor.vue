<template>
  <ul class="local_info_chart">
    <li
      v-for="item in monitorArray"
      :key="item.id"
      :class="{ is_disabled: disabled }"
    >
      <dl>
        <dt>
          <button
            @click="hrefStatusMap($event)"
            :value="item.id"
            style="button"
            class="local_name"
          >
            <img
              :src="`/images/contents/ico_local_bul${item.id}.png`"
              class="local_bul"
            />{{ item.rccName }}
          </button>
          <ul>
            <li>
              <span class="tit">발전: </span>
              <span class="txt"
                ><span>{{ pvpwr }}</span> MWp</span
              >
            </li>
            <li>
              <span class="tit">유효: </span>
              <span class="txt"
                ><span>{{ actpwr }}</span> MW</span
              >
            </li>
            <li>
              <span
                @click="hrefEvent($event)"
                :id="href"
                class="txt"
                value="이벤트"
                >{{ txtevent }}</span
              >
            </li>
            <li :class="weather"><span class="hide">날씨</span></li>
          </ul>
        </dt>
        <dd>
          <!-- <div style="width:32rem; height:7rem; float:left; margin-top: 1.5rem; margin-left: 2rem;"> 
                        <canvas :id="lienChartId" ></canvas>
                    </div>
                    <div class="batB_wrap" style='float:right;'>
                        <span id='soc_gauge' :class="battery">
                            <span class="per_wrap">
                                <span>{{avg_soc}}</span>
                            </span>
                        </span>
                    </div> -->
        </dd>
      </dl>
    </li>
  </ul>
  <!-- <li :id="liId" :class="{is_disabled : disabled}">
        <dl>
            <dt>
                <button @click="hrefStatusMap($event)"  :value='href' style="button" class="local_name">
                    <img :src='color' class="local_bul" />{{rccName}}</button>
                <ul>
                    <li><span class="tit">{{$t("common.M301")}}: </span><span class="txt"><span>{{pvpwr}}</span> MWp</span></li>
                    <li><span class="tit">{{$t("common.M302")}}: </span><span class="txt"><span>{{actpwr}}</span> MW</span></li>
                    <li><span @click="hrefEvent($event)" :id="href" class="txt" value='이벤트'>{{txtevent}}</span></li>
                    <li :class="weather"><span class="hide">날씨</span></li>
                </ul>
            </dt>
            <dd>
                <div style="width:32rem; height:7rem; float:left; margin-top: 1.5rem; margin-left: 2rem;"> 
                    <canvas :id="lienChartId" ></canvas>
                </div>
                <div class="batB_wrap" style='float:right;'>
                    <span id='soc_gauge' :class="battery">
                        <span class="per_wrap">
                            <span>{{avg_soc}}</span>
                        </span>
                    </span>
                </div>
            </dd>
        </dl>
    </li> -->
</template>
<script>
export default {
  layout: "rccMonitor",
  props: {
    monitorArray: { type: Array },
    rccName: { type: String },
    lienChartId: { type: String },
    rccId: null,
    liId: { type: String },
    color: { type: String },
    href: { type: String },
  },
  data() {
    return {
      txtevent: "이벤트",
      isevent: false,
      interval: null,
      weather: "",
      battery: "",
      disabled: true,
      avg_soc: "",
      pvpwr: "-",
      actpwr: "-",
      lineChart: null,
      rccList: null,
    };
  },
  methods: {
    moveto(rcc, route, storage) {
      // click 할 경우 rccList 받아오기
      this.rccList = getRccList();

      // 자원이 있는 경우에만 계통지리정보, 이벤트 페이지로 이동
      for (var i = 0; i < this.rccList.length; i++) {
        if (this.rccList[i].toString() == rcc) {
          localStorage.setItem(storage, rcc);
          location.href = route;
        }
      }
    },
    hrefStatusMap(e) {
      var rcc = e.target.value;
      this.moveto(rcc, "/statusMap", "MainAreaNum");
    },
    hrefEvent(e) {
      var rcc = e.target.id;
      this.moveto(rcc, "/SearchEvent", "MainAreaEvtNum");
    },
    initLineChart(id) {
      var labels = [];
      for (var i = 0; i <= 60; i++) {
        labels.push(i);
      }

      var mContChart = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "PV발전량",
              borderColor: "#db66cd",
              borderWidth: 1,
              backgroundColor: "#db66cd",
              pointRadius: 0,
              data: [],
              fill: false,
              lineTension: 0,
            },
            {
              label: "예측값",
              borderColor: "#787edb",
              borderWidth: 1,
              borderDash: [6, 3],
              backgroundColor: "#787edb",
              pointRadius: 0,

              data: [],
              fill: false,
              lineTension: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          title: {
            display: false,
            text: "Chart.js Line Chart",
          },
          tooltips: {
            yAlign: "above",
            mode: "index",
            intersect: false,
          },
          legend: {
            display: false,
            position: "top",
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "minute",
                },
                gridLines: {
                  display: false,
                  drawBorder: true,
                  color: "#000000",
                },
                ticks: {
                  fontColor: "#3e69a5",
                  fontSize: 13,
                  fontFamily: "Malgun Gothic",
                  autoSkip: true,
                  maxTicksLimit: 6,
                  stepSize: 10,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "kW",
                },
                gridLines: {
                  display: false,
                  drawBorder: true,
                  color: "#000000",
                },
                ticks: {
                  fontColor: "#3e69a5",
                  fontSize: 13,
                  fontFamily: "Malgun Gothic",
                  min: 0,
                  // max : 0,
                  autoSkip: true,
                  maxTicksLimit: 3,
                  //stepSize: 1
                },
              },
            ],
          },
        },
      };
      var ctx = document.getElementById(id).getContext("2d");
      this.lineChart = new Chart(ctx, mContChart);
    },

    updatePreChart(data) {
      var dt = new Date();
      var pre = [];

      for (var i = 0; i < 60; i++) {
        pre.push((data / 1000).toFixed(3));
      }
      // 분이 0분이면 모든 데이터 초기화
      if (dt.getMinutes() == 0) {
        this.lineChart.data.datasets[1].data = [];
      }
      // 데이터 갯수가 60개 이상이면 초기화
      if (this.lineChart.data.datasets[1].data.length >= 60) {
        this.lineChart.data.datasets[1].data = [];
      }
      // 현재시간의 예측값을 PUSH
      this.lineChart.data.datasets[1].data = pre;
      this.lineChart.update();
    },
    updateCurrentChartData(current) {
      // 1분 단위로 00분부터 1분 전까지의 값을 차트에 표시
      var chart = [];
      // data clear
      this.lineChart.data.datasets[0].data = [];
      // mw 단위로 변환
      for (var i = 0; i < current.length; i++) {
        chart.push((current[i] / 1000).toFixed(3));
      }
      this.lineChart.data.datasets[0].data = chart;
      this.lineChart.update();
    },
    updatetopValue(data) {
      // SOC, PV, ACTPWR, 날씨, 이벤트건
      var d = data[0];
      this.disabled = false;

      // RCC 별 SOC
      this.avg_soc = d.meanOfSOC;

      // RCC 별 PV
      this.pvpwr = d.sumOfPvPower;

      // RCC 별 ACTPWR
      this.actpwr = d.sumOfActivePower;

      // (RCC 별 SOC) 값에 따른 배터리 잔량 이미지
      var soc = d.meanOfSOC;

      this.battery = "batB_cont ";
      if (soc == 100) {
        this.battery += "batB_gauge10";
      } else {
        if (soc <= 10) {
          this.battery += "batB_gauge1";
        } else {
          var value = soc.substring(0, 1);
          this.battery += "batB_gauge" + value;
        }
      }
      this.avg_soc += "%";
    },
    updateEvtWeather(data) {
      // RCC 별 날씨 정보
      var d = data[0];
      this.weather = "icon_weather type" + d.wheather;
    },
    SetChartValue(data) {
      // 차트의 최대값을 pv 용량으로 설정 (단위 : MW)
      var max = data / 1000;
      max = max + max * 0.1;
      this.lineChart.config.options.scales.yAxes[0].ticks.max = max;
      var stepSize = max / 2;
      this.lineChart.config.options.scales.yAxes[0].ticks.stepSize = stepSize;
      this.lineChart.update();
    },
    updateEvt(data) {
      // RCC 별 이벤트 수
      var eventCount = data;
      var rcc = this.href;
      // 이벤트 발생시 FADEIN \ FADEOUT
      if (eventCount > 0) {
        this.interval = setInterval(function () {
          $("#" + rcc).css("cursor", "pointer");
          $("#" + rcc).css("color", "red");
          $("#" + rcc)
            .fadeOut("slow")
            .fadeIn("slow");
        }, 2000);
      }
    },
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off(this.rccId + "-currentPV");
    this.$nuxt.$off(this.rccId + "-PreData");
    this.$nuxt.$off(this.rccId + "-activePower");
    this.$nuxt.$off(this.rccId + "-EvtWeather");
    this.$nuxt.$off(this.rccId + "-installedPV");
    this.$nuxt.$off(this.rccId + "-EventByRcc");
    this.$nuxt.$off(this.rccId + "-WheatherByRcc");
  },
  mounted() {
    // //this.rccList = getRccList();
    // var lineChartId = this.lienChartId;
    // var rccId = this.rccId;
    // this.initLineChart(lineChartId)
    // this.$nuxt.$on(this.rccId + "-installedPV", data => {
    //     // rcc 그래프 최대값 설정
    //     this.SetChartValue(data)
    // });
    // this.$nuxt.$on(this.rccId+"-PreData", data => {
    //     // 현재시간의 예측 값
    //     this.updatePreChart(data)
    // });
    // // 현재시간 00분부터 1분전 까지의 pv(1분마다 업데이트)
    // this.$nuxt.$on(this.rccId + "-currentPV", data => {
    //     this.updateCurrentChartData(data)
    // });
    // //1분마다 업데이트
    // this.$nuxt.$on(this.rccId + "-activePower", data => {
    //     // 상단 SOC, PV, ACTPWR, rcc차트 pv
    //     this.updatetopValue(data)
    // });
    // this.$nuxt.$on(this.rccId + "-EventByRcc", data => {
    //     // 상단 값 이벤트건
    //     this.updateEvt(data)
    // });
    // this.$nuxt.$on(this.rccId + "-WheatherByRcc", data => {
    //     // 날씨
    //     this.weather = "icon_weather type"+ data;
    // });
  },
};
</script>
<style>
</style>