<template>
  <div class="main_cont_wrap">
    <!-- local_info_chart -->
    <ul class="local_info_chart">
      <li
        v-for="(item, index) in MainrccList"
        :key="index"
        :class="{ is_disabled: false }"
      >
        <dl>
          <dt>
            <button
              @click="hrefStatusMap($event)"
              :value="index"
              style="button"
              class="local_name"
            >
              <img
                :src="`/images/contents/ico_local_bul${item.color}.png`"
                class="local_bul"
              />{{ item.name }}
            </button>
            <ul>
              <li>
                <span class="tit">발전: </span>
                <span class="txt"><span>-</span> MWp</span>
              </li>
              <li>
                <span class="tit">유효: </span>
                <span class="txt"><span>-</span> MW</span>
              </li>
              <li>
                <span @click="hrefEvent($event)" class="txt" value="이벤트"
                  >-</span
                >
              </li>
              <li class="weather"><span class="hide">날씨</span></li>
            </ul>
          </dt>
          <dd>
            <div class="main-rcc-card-chart">
              <div id="chartdiv"></div>
              <!-- <div :id="`lienChartId${item.rcc}`"></div> -->
            </div>
            <div class="batB_wrap" style="float: right">
              <span id="soc_gauge" :class="battery">
                <span class="per_wrap">
                  <span>999</span>
                </span>
              </span>
            </div>
          </dd>
        </dl>
      </li>
    </ul>
    <!--// local_info_chart -->
  </div>
</template>


<script>
//import MainRealtimeMap from "~/components/common/Chart/chartRealtime.vue";
export default {
  components: {
    //MainRealtimeMap,
  },
  head: {
    script: [],
  },
  props: {
    MainrccList: { type: Array },
  },
  data() {
    return { battery: "" };
  },
};
</script>

<style scoped>
.main-rcc-card-chart {
  width: 32rem;
  height: 7rem;
  float: left;
  margin-top: 1.5rem;
  margin-left: 2rem;
}
</style>