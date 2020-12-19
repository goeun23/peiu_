<template>
  <li class="size_half" :class="`po_` + `${progressType}`">
    <dl>
      <dt>{{ title }}</dt>
      <dd>
        <ul class="service_state">
          <li class="state_blue">
            <dl>
              <dt>{{ $t("areaControl.daily") }}</dt>
              <dd>
                <div class="bar_wrap">
                  <span id="wonBlue" class="bar_cont"></span>
                </div>
                <div class="state_won">
                  <span id="dailyrevenue">{{ todayIncome }}</span
                  >천원
                </div>
              </dd>
            </dl>
          </li>
          <li class="state_yellow">
            <dl>
              <dt>{{ $t("areaControl.monthly") }}</dt>
              <dd>
                <div class="bar_wrap">
                  <span id="wonYellow" class="bar_cont"></span>
                  <span class="bar_unit step1">999</span>
                  <span class="bar_unit step2">999</span>
                  <span class="bar_unit step3">999</span>
                </div>
                <div class="state_won">
                  <span id="accmofincome"> </span>천원
                </div>
              </dd>
            </dl>
          </li>
        </ul>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  props: {
    progressType: { type: String },
    title: { type: String },
    unit: { type: Array },
  },
  data() {
    return {
      progressPeriod: [],
    };
  },
  watch: {},
};
</script>