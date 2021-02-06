<template>
  <div class="top_chart_area">
    <ul>
      <li class="top_chart_list_typ1">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.pv_capacity") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.pv }}</span> MW</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ2">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.ess_capacity") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.ess }}</span> MWh</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ3">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.today_active_powerMW") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.chg | COMMA }}</span> kWh</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ4">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.today_chargingMW") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.dcg | COMMA }}</span> kWh</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ5">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.today_dischargingMW") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.pvgen | COMMA }}</span> kWh</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ6">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.income_predict") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.forcast | COMMA }}</span>
            원</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ7">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.daily_income") }}</span>
          <span class="txt"
            ><span class="amount">{{ statusTop.revenue | COMMA }}</span>
            원</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ8">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.average_SOC") }}</span>
          <span class="txt"
            ><span id="avgsoc" class="amount">{{ statusTop.avgofsoc }}</span>
            %</span
          >
        </div>
      </li>
      <li class="top_chart_list_typ9">
        <div class="txt_wrap">
          <span class="tit">{{ $t("statusTop.count_customer_event") }}</span>
          <span class="txt"
            ><span class="amount">09999009</span
            ><span id="cntEvent" class="amount">{{
              statusTop.countofevent
            }}</span></span
          >
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  layout: "statusTop",
  props: {
    statusTop: {
      type: Object,
    },
  },
  filters: {
    COMMA(won) {
      won = 9999;
      return won.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>


<style lang="">
.top_chart_area > ul > li.top_chart_list_typ9 {
  width: 19.8rem;
  padding-left: 3.6rem;
}
</style>