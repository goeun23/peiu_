<template>
  <div class="top_switch_zone">
    <div class="switch_zone_l">
      <button
        id="toggle"
        @click="toggle"
        type="button"
        class="switch_land_island"
        :class="actived == '육지' ? 'on_land' : 'on_island'"
      >
        <span></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actived: "육지",
      isActive: "on_land",
    };
  },
  methods: {
    toggle() {
      if (this.actived == "육지") {
        this.actived = "제주";
      } else if (this.actived == "제주") {
        this.actived = "육지";
      }
    },
  },
};
</script>