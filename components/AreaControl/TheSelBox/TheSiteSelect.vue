<template>
  <div class="top_selBox_zone">
    <div class="selBox_zone_l">
      <div class="selBox_zone_l_sel">
        <InputSelectbox placeholder="거래사업자" />
        <InputSelectbox placeholder="자원" />
        <!-- <InputSelectbox placeholder="자원" style="width: 22.5rem" /> -->
      </div>
      <div class="selBox_zone_l_btn">
        <button
          type="button"
          class="btn btn_size_free btn_color_blue"
          @click="showAiDiInfo()"
        >
          <span>{{ $t("areaControl.AI/DI") }}</span>
        </button>
      </div>
    </div>
    <div class="selBox_zone_r">
      <ul class="state_info2">
        <li class="ico_day">
          <dl>
            <dt>{{ $t("areaControl.daily") }}</dt>
            <dd>
              <span class="info2_tit">{{ $t("areaControl.pv") }} : </span>
              <span id="daily-accum-pv" class="info2_txt">{{ dailyPv }}</span>

              <span class="info2_tit">{{ $t("areaControl.chg") }} : </span>
              <span id="daily-accum-chg" class="info2_txt">{{ dailyChg }}</span>

              <span class="info2_tit">{{ $t("areaControl.dcg") }} : </span>
              <span id="daily-accum-dcg" class="info2_txt">{{ dailyDcg }}</span>

              <span class="info2_unit"
                >({{ $t("areaControl.unit") }} : kWh)</span
              >
            </dd>
          </dl>
        </li>
        <li class="ico_month">
          <dl>
            <dt>{{ $t("areaControl.monthly") }}</dt>
            <dd>
              <span class="info2_tit">{{ $t("areaControl.pv") }} : </span>
              <span id="monthly-accum-pv" class="info2_txt"></span>

              <span class="info2_tit">{{ $t("areaControl.chg") }} : </span>
              <span id="monthly-accum-chg" class="info2_txt"></span>

              <span class="info2_tit">{{ $t("areaControl.dcg") }} : </span>
              <span id="monthly-accum-dcg" class="info2_txt"></span>

              <span class="info2_unit"
                >({{ $t("areaControl.unit") }} : MWh)</span
              >
            </dd>
          </dl>
        </li>
        <li class="ico_month">
          <dl>
            <dd>
              <span class="info2_tit"
                ><img src="/images/common/ico_weather_info1.png"
              /></span>
              <span id="weather-Temp" class="info2_txt">-</span>
              <span class="info2_tit"
                ><img src="/images/common/ico_weather_info2.png"
              /></span>
              <span id="weather-Humidity" class="info2_txt">-</span>
              <span class="info2_tit"
                ><img src="/images/common/ico_weather_info3.png"
              /></span>
              <span id="weather-Clouds" class="info2_txt">-</span>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import InputSelectbox from "@/components/common/Input/InputSelectbox.vue";
export default {
  components: {
    InputSelectbox,
  },
  data() {
    return {
      dailyPv: 999,
      dailyChg: 999,
      dailyDcg: 999,
    };
  },
};
</script>