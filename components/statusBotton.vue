<template>
  <div class="localCondition_footer">
    <ul class="localCondition_info">
      <!-- 부하량 -->
      <li class="status-1" style="display:none;">
        <div class="status-label"> 
          <strong>{{$t('statusBotton.loadMW')}}</strong>
         <p class="dateValue">{{LoadMW}} <span class="unit"> MW</span></p>
        </div>        
        <!-- <div class="graph">그래프영역5</div> -->
        <div class="graph2">
          <canvas id="loadChart"/>
        </div>        
      </li>
      <!-- 최대부하 -->
      <li class="status-2" style="width:25rem;">
         <div class="status-label"> 
          <!-- <strong>{{$t('statusBotton.max_loadMW')}}</strong>
          <p class="dateValue">{{PeakLoad}} <span class="unit"> MW</span></p> -->
           <strong>{{$t('statusBotton.max_loadMW')}}</strong>
          <p class="dateValue">0 <span class="unit"> MW</span></p>
        </div>
      </li>
      <!-- 피크 시간 -->
      <li class="status-1" >        
        <div class="status-label">
          <strong>{{$t('statusBotton.peak_time')}}</strong>
          <p class="dateValue"> 
            <!-- {{ peakTime1 }}<span class="unit"> H</span> -->
             0<span class="unit"> H</span>
            <!-- {{ peakTime2 }}<span class="unit"> H</span> -->
          </p> 
        </div>                  
        <!-- <div class="graph">그래프영역4</div> --> 
        <div>

        </div>
        <div class="graph3 boundray-black">
          <canvas id="peakChart" style="display:none;" ></canvas>
          <div class="HourLabel">
            <div class="HourTitle HourLabel-1">1H</div>
            <div class="HourTitle HourLabel-2">12H</div>
            <div class="HourTitle HourLabel-3">24H</div>
          </div>
          <!-- <div class="HourBar">
            <div class="HourBar-1"><div class="SmallHourBar"></div></div>
            <div class="HourBar-2">|</div>
            <div class="HourBar-3">|</div>
          </div> -->
          <div class="H24Title">
            <div class="H0 HourBar"></div> 
            <div class="H1 HourBar noBar"></div>
            <div class="H2 HourBar noBar"></div>
            <div class="H3 HourBar noBar"></div>
            <div class="H4 HourBar noBar"></div>
            <div class="H5 HourBar "></div>
            <div class="H6 HourBar noBar"></div>
            <div class="H7 HourBar noBar"></div>
            <div class="H8 HourBar noBar"></div>
            <div class="H9 HourBar noBar"></div>
            <div class="H10 HourBar noBar"></div>
            <div class="H11 HourBar "></div>
            <div class="H12 HourBar noBar"></div>
            <div class="H13 HourBar noBar"></div>
            <div class="H14 HourBar noBar"></div>
            <div class="H15 HourBar noBar"></div>
            <div class="H16 HourBar noBar"></div>
            <div class="H17 HourBar "></div>
            <div class="H18 HourBar noBar"></div>
            <div class="H19 HourBar noBar"></div>
            <div class="H20 HourBar noBar"></div>
            <div class="H21 HourBar noBar"></div>
            <div class="H22 HourBar noBar"></div>
            <div class="H23 HourBar"></div>
          </div> 
          <div class="H24Title">
            <div class="H0 Hour"></div>
            <div class="H1 Hour"></div> 
            <div class="H2 Hour"></div>
            <div class="H3 Hour"></div>
            <div class="H4 Hour"></div>
            <div class="H5 Hour"></div>
            <div class="H6 Hour"></div>
            <div class="H7 Hour"></div>
            <div class="H8 Hour"></div>
            <div class="H9 Hour"></div>
            <div class="H10 Hour"></div>
            <div class="H11 Hour"></div>
            <div class="H12 Hour"></div>
            <div class="H13 Hour"></div>
            <div class="H14 Hour"></div>
            <div class="H15 Hour"></div>
            <div class="H16 Hour"></div>
            <div class="H17 Hour"></div>
            <div class="H18 Hour"></div>
            <div class="H19 Hour"></div>
            <div class="H20 Hour"></div>
            <div class="H21 Hour"></div>
            <div class="H22 Hour"></div>
            <div class="H23 Hour"></div>            
          </div> 
        </div>                     
      </li>  
      <!-- SMP -->    
      <li class="status-4" style="width:15rem;">
        <div class="status-label">
          <strong>SMP</strong>
          <!-- <p class="dateValue">{{Price}}</p> -->
          <p class="dateValue">-</p>
        </div>        
      </li>
      <!-- RPC -->
      <li class="status-4" style="width:15rem;">
        <div class="status-label">
          <strong>REC</strong>
          <!-- <p class="dateValue">{{rec}}</p> -->
           <p class="dateValue">-</p>
        </div>        
      </li>
      <!-- 감축지시발령 -->
      <li class="status-6">
        <div class="status-label-r ">
          <strong>감축지시발령</strong> 
           <!-- <p class="dateValue">총감축시간 : {{peakRunTime}}<br>({{diffPeakTime}}시간)</p>  -->
           <p class="dateValue ReducTextActive ">{{$t('statusBotton.total_reduction_time')}} 00:00~00:00(0시간)</p>  
        </div>        
      </li>
    </ul>
</div>
</template>

<script>
export default {
  layout: "statusBotton",
  head: {
    link: [{ rel: "stylesheet", href: "/css/statusBotton.css" }]
  },
  data() {
    return {
      peakChart: null,
      loadChart: null,
      Price: "99.99",
      rec: "9.9",
      peakTime1: "00",
      peakTime2: "01",
      peakRunTime: null,
      PeakLoad: 9999, //최대부하
      PeakTimedDiff: null, //최대부하 시간차이
      PeakLoadColor: [
        "#FFCE56",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FF6384",
        "#FFCE56"
      ],
      LoadMW: "99.999", // 부하량
      reductTime: "99:99 ~ 99:99"
    };
  },
  created() {},
  beforeDestroy() {
    this.$nuxt.$off("status-bottom");
  },
  methods: {
    initLoadChart: function() {
      var config = {
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
              data: [0],
              // "backgroundColor": '#FFCCA9'
              backgroundColor: "rgba(255, 204, 0, .2)",
              borderColor: "#ffcc00",
              pointRadius: 1,
              borderWidth: 2
            }
          ]
        },
        options: {
          animation: false,
          // "responsive":,
          maintainAspectRatio: false,
          title: {
            display: false,
            text: "Chart.js Line Chart"
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          },
          hover: {
            mode: "nearest",
            intersect: false
          },
          scales: {
            xAxes: [
              {
                display: false,
                scaleLabel: { display: false }
              }
            ],
            yAxes: [
              {
                display: false,
                scaleLabel: { display: false, labelString: "Value" },
                ticks: {
                  max: 83000,
                  min: 40000
                }
              }
            ]
          }
        }
      };
      var ctx = document.getElementById("loadChart");
      this.loadChart = new Chart(ctx, config);
    },
    updateSMP(data) {
      this.Price = data.toFixed(2);
    },
    updateREC(rec) {
      this.rec = Number(rec.RecMax).format();
    },
    updatePeakRunTime(rec) {
      var _time = rec.PeakHour;
      var _PeakLoad = rec.PeakLoad;
      var arr = _time.split(":");
      arr[0] = arr[0].replace(/\s/gi, "");
      arr[1] = arr[1].replace(/\s/gi, "");
      if (document.getElementsByClassName("HourActive")[0] != undefined) {
        for (
          var i = 0;
          i < document.getElementsByClassName("HourActive").length;
          i++
        ) {
          document
            .getElementsByClassName("HourActive")
            [i].classList.remove("HourActive");
        }
      }

      document
        .getElementsByClassName("H" + (arr[0] - 1) + " Hour")[0]
        .classList.add("HourActive");
      this.peakTime1 = arr[0].substring(0, 2);
      this.peakTime2 = arr[1].substring(0, 2);
      this.PeakLoad = Number(_PeakLoad / 1000).format();

      //감축시간 설정
      var _reductTime = rec.PeakHour;
      var reducArr = [];
      reducArr = _reductTime.split(":");
      reducArr[1] = reducArr[1].substring(reducArr[1].length - 2);
      var reducStart = Number(reducArr[0]);
      var reducEnd = Number(reducArr[1]);

      if (document.getElementsByClassName("ReducActive")[0] != undefined) {
        for (
          var i = 0;
          i < document.getElementsByClassName("ReducActive").length;
          i++
        ) {
          document
            .getElementsByClassName("ReducActive")
            [i].classList.remove("ReducActive");
        }
      }
      for (var i = reducStart; i <= reducEnd; i++) {
        document
          .getElementsByClassName("H" + (i - 1) + "  Hour")[0]
          .classList.add("ReducActive");
      }
      // this.reductTime =  " " + _reductTime + " (" + (reducEnd - reducStart) + "H)";
      this.reductTime = rec.commandhour;
      // console.log(reducArr);
    },
    _updateLoaddChart(data) {
      if (this.loadChart.data.datasets[0].data.length >= 60) {
        this.loadChart.data.datasets[0].data.push(data);
        this.loadChart.data.datasets[0].data.shift();
      } else {
        this.loadChart.data.datasets[0].data.push(data);
      }
      this.loadChart.update();
    },
    _updateLoadMW(_data) {
      this.LoadMW = Number((_data / 1000).toFixed(0)).format();
    }
  },
  mounted() {
    this.$nuxt.$on("status-bottom", data => {
      // this.updateSMP(data.rec.Price);
      // this.updateREC(data.rec);
      // this.updatePeakRunTime(data.rec);
      // this._updateLoaddChart(data.rec.LoadMW / 1000);
      // this._updateLoadMW(data.rec.LoadMW);
    });

    // this.initPeakTimeChart();
    this.initLoadChart();
    // console.log('1');console.log('1');
    // setInterval(() => {
    //   var data = [
    //         "#FF6384","#FF6384","#FF6384","#FF6384",
    //         "#FF6384","#FF6384","#FF6384","#FFCE56",
    //         "#FF6384","#FF6384","#FF6384","#FF6384",
    //       ];
    //       this.peakChart.data.datasets[0].backgroundColor = data;
    //       this.peakChart.update();

    // }, 5000);
  }
};
</script>

<style>
</style>
