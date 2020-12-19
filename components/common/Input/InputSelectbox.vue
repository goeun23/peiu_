<template>
  <div class="sel_set_wrap">
    <select id="agg" class="sel sel_size1">
      <option value="">{{ $t("areaControl.customer") }}</option>
      <option v-for="v in OptionList" :key="v.idx" :value="v.id">
        {{ v.value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return { OptionList: [] };
  },
  props: {
    placeholder: { type: String },
  },
};
</script>