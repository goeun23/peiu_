<template>
  <div class="tbl_wrap">
    <table class="tbl_view_box_inner">
      <colgroup>
        <col width="14%" />
        <col width="36%" />
        <col width="14%" />
        <col width="36%" />
      </colgroup>
      <tbody>
        <tr>
          <th>PV</th>
          <td id="installedPV">{{ installedPV }}kWp</td>
          <th>PCS</th>
          <td id="installedPCS">{{ installedPCS }}kW</td>
        </tr>
        <tr>
          <th>ESS</th>
          <td id="installedESS">{{ installedESS }}kWh</td>
          <th>{{ $t("areaControl.installed_date") }}</th>
          <td id="installed_date">{{ installed_date }}</td>
        </tr>
        <tr>
          <td colspan="4" class="cont" id="pvess_id">
            {{ $t("areaControl.installed_address") }} : {{ pvess_id }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      installedPV: 999,
      installedESS: 999,
      installedPCS: 999,
      pvess_id: 999,
      installed_date: 999,
    };
  },
};
</script>