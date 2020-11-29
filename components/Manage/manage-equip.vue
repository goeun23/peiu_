<template>
  <div class="tbl tblEquip">
    <div class="tbl_wrap tbl_crm_info">
      <colgroup></colgroup>
      <table>
        <thead>
          <th scope="col">{{ $t("manage.number") }}</th>
          <th scope="col">{{ $t("manage.area") }}</th>
          <th scope="col">{{ $t("manage.agg") }}</th>
          <th scope="col">{{ $t("manage.name") }}</th>
          <th scope="col">{{ $t("manage.address") }}</th>
          <th scope="col">{{ $t("manage.pvcapability") }}/대수</th>
          <th scope="col">{{ $t("manage.pcscapability") }}/대수</th>
          <th scope="col">{{ $t("manage.batcapability") }}/대수</th>
          <th scope="col">{{ $t("manage.installedDate") }}</th>
          <th scope="col" class="setemailwidth">{{ $t("manage.email") }}</th>
          <!-- <th>{{ $t('manage.admin') }}</th> -->
        </thead>
        <tbody class="tableScrollbar">
          <tr v-for="v in UserTblData" :key="v.idx">
            <td>
              <span>{{ v.idx }}</span>
            </td>
            <td>
              <span>{{ v.rcc }}</span>
            </td>
            <td>
              <span>{{ v.companyName }}</span>
            </td>
            <td>
              <span>{{ v.userName }}</span>
            </td>
            <td>
              <span>{{ v.siteAddress }}</span>
            </td>
            <td>
              <span>{{ v.pvCapacity }} / {{ v.countofpv }}</span>
            </td>
            <td>
              <span>{{ v.pcsCapacity }} / {{ v.countofpcs }}</span>
            </td>
            <td>
              <span>{{ v.essCapacity }} / {{ v.countofbms }}</span>
            </td>
            <td>
              <span>{{ v.installedDate }}</span>
            </td>
            <td class="setemailwidth">
              <span>{{ v.userEmail }}</span>
            </td>
            <!-- <td>
                            <span v-html="v.btn"></span>
                        </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      UserTblData: [],
      RccList: [
        "경기",
        "서울",
        "인천",
        "대전",
        "충남",
        "전북",
        "전남",
        "광주",
        "강원",
        "충북",
        "경북",
        "대구",
        "울산",
        "부산",
        "경남",
        "제주",
      ],
    };
  },
  methods: {
    setUserTblData(d) {
      this.UserTblData = [];
      for (var i = 0; i < d.length; i++) {
        var site = d[i];
        var info = {
          idx: i + 1,
          Id: site.SiteId,
          rcc: this.RccList[site.RCC - 1],
          countofpcs: site.PcsCount,
          countofbms: site.BmsCount,
          countofpv: site.PvCount,
          userName: site.Firstname,
          companyName: site.AggName,
          userEmail: site.Email,
          installedDate: site.RegisterTimestamp,
          siteAddress: site.Address1,
          essCapacity: site.TotalBmsCapacity,
          pvCapacity: site.TotalPvCapacity,
          pcsCapacity: site.TotalPcsCapacity,
          // btn: "<button type='button' class='btn btn_tbl_inner'><span>수정</span></button>"
        };
        this.UserTblData.push(info);
      }
    },
  },
  mounted() {
    this.$nuxt.$on("management-equip", (d) => {
      this.setUserTblData(d);
    });
  },
};
</script>

<style lang="">
.setemailwidth {
  width: 28rem !important;
}
</style>