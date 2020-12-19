<template>
  <div class="view_box_right">
    <div class="graph_list_wrap">
      <ul>
        <ViewBoxProgressBar progressType="left" title="수익금 현황" />
        <ViewBoxProgressBar progressType="right" title="이벤트 현황" />
        <li>
          <dl>
            <dt>{{ $t("areaControl.totalChart") }}</dt>
            <dd>
              <div id="areCtrlChart"></div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="info_tbl_area">
      <!-- info_right -->
      <div class="info_right">
        <ViewBoxTable />
      </div>
    </div>
  </div>
</template>

<script>
import ViewBoxProgressBar from "@/components/AreaControl/TheViewBox/ViewBoxR/TheProgress.vue";
import ViewBoxTable from "@/components/AreaControl/TheViewBox/ViewBoxR/TheTable.vue";

export default {
  components: { ViewBoxProgressBar, ViewBoxTable },
  data() {
    return {};
  },
};
</script>