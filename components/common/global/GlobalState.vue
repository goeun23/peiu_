<template>
<div class="cont_head" >
	<ul class="state_info">
		<li class="ico_info1"><span class="info_tit">{{$t("globalState.time")}} : </span><span class="info_txt">{{dt}}</span></li>
        <li class="ico_info8"><span class="info_tit">{{$t("globalState.monthly")}}</span></li>
		<li class="ico_info2" style="margin-left:2rem;"><span class="info_tit">{{$t("globalState.total_active_powerMW")}} : </span><span class="info_txt" id="total_active_powerMW"><span>{{ total_active_powerMW  }}</span> MWh</span></li>
		<li class="ico_info3"><span class="info_tit">{{$t("globalState.accum_chargingMW")}} : </span><span class="info_txt" id="accum_chargingMW"><span>{{accum_chargingMW}}</span> MWh</span></li>
		<li class="ico_info4"><span class="info_tit">{{$t("globalState.accum_dischargingMW")}} : </span><span class="info_txt" id="accum_dischargingMW"><span>{{accum_dischargingMW}}</span> MWh</span></li>
    <li class="ico_info7"><span class="info_tit">{{$t("globalState.accum_profit")}} : </span><span class="info_txt" id="accum_income"><span>{{accum_profit}}</span> 천원</span></li>
	</ul>
	<ul class="cont_info_r">
		<li><span class="info_tit">{{$t("globalState.runStatus")}} </span> <span id="cnt-run" class="info_true">{{runGoodCnt}}</span> <span class="info_false">{{runBadCnt}}</span></li>
		<li><span class="info_tit">{{$t("globalState.commStatus")}} </span> <span id="cnt-conn" class="info_true">{{commGoodCnt}}</span> <span class="info_false">{{commBadCnt}}</span></li>
	</ul>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  layout: "globalState",

  created() {
    // this.$nuxt.$on("evt-run-status", data => {
    // 	this.setRunStatValue(data.goodCnt, data.badCnt);
    // });
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off("globalState");
    this.$nuxt.$off('status-count-sites')
    this.$nuxt.$off('globalState')
  },
  data() {
    return {
     
      total_active_powerMW: 0, //누적 발전량
      accum_dischargingMW: 0, //누적 방전량
      accum_chargingMW: 0, //누적 충전량
      runGoodCnt: "-", //Good 운전상태
      runBadCnt: 0, //Bad 운전상태
      commGoodCnt: "-", //Good 통신상태
      commBadCnt: 0, //Bad 통신상태
      accum_profit : 0, // 누적 수익금
      dt: null,
      interval1: null,
      interval2: null
    };
  },
  methods: {    
    
    setTime() {
      var d = new Date();
      // var curDT = d.getFullYear() +'.'+Number(d.getMonth()+1) + '.' +d.getDate()
      // 	+' '+ d.getHours() +':'+d.getMinutes()+':'+d.getSeconds();
      var curDT = "";
      if(d.getHours()>12){
        // 오후
         curDT =
          d.getFullYear() +
          "-" +
          this.pad2(d.getMonth() + 1) +
          "-" +
          this.pad2(d.getDate()) +
          " 오후 " +
          this.pad2(d.getHours()) +
          ":" +
          this.pad2(d.getMinutes()) +
          ":" +
          this.pad2(d.getSeconds()) +
          " ";
      }else{
        // 오전
         curDT =
          d.getFullYear() +
          "-" +
          this.pad2(d.getMonth() + 1) +
          "-" +
          this.pad2(d.getDate()) +
          " 													 오전 " +
          this.pad2(d.getHours()) +
          ":" +
          this.pad2(d.getMinutes()) +
          ":" +
          this.pad2(d.getSeconds()) +
          " ";
      }
     
      this.dt = curDT;
      // this.dt = d.toLocaleTimeString();
      // this.$store.commit('setTime',curDT);
      // console.log(this.$store.state.dt);
    },
    pad2(n) {
      // always returns a string
      return (n < 10 ? "0" : "") + n;
    },

  },
  
  mounted() {
    this.setTime();

    this.interval1 = setInterval(() => {
      this.setTime();
    }, 1000);

    this.$nuxt.$on("globalState", data => {
      this.total_active_powerMW = data[0].today_pv;
      this.accum_chargingMW = data[0].toady_chg;
      this.accum_dischargingMW = data[0].today_dcg;
    });

    this.$nuxt.$on("status-count-sites", data => {
        this.runGoodCnt = data;
        this.commGoodCnt = data;
    });

    this.$nuxt.$on("globalState-revenues", data => {
      
      this.accum_profit = unitWon(data);
    });

  },
};
</script>
<style>
.state_info > li span {

    font-weight: bold;
}
</style>
