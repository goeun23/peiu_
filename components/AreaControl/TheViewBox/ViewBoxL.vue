<template>
  <div class="view_box_left">
    <ViewBoxDiagram />
    <ViewBoxControl />
    <ViewBoxInstalledInfo />
  </div>
</template>

<script>
import ViewBoxDiagram from "@/components/AreaControl/TheViewBox/ViewBoxL/ViewBoxDiagram.vue";
import ViewBoxControl from "@/components/AreaControl/TheViewBox/ViewBoxL/ViewBoxControl.vue";
import ViewBoxInstalledInfo from "@/components/AreaControl/TheViewBox/ViewBoxL/ViewBoxInstalledInfo.vue";
export default {
  components: {
    ViewBoxDiagram,
    ViewBoxControl,
    ViewBoxInstalledInfo,
  },
};
</script>