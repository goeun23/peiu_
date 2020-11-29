<template>
  <!-- cont_body -->
  <div class="tbl tblInfo">
    <div class="tbl_wrap tbl_crm_info">
      <table id="equiptable" class="tablesorter">
        <thead>
          <th>{{ $t("manage.number") }}</th>
          <th>{{ $t("manage.area") }}</th>
          <th>{{ $t("manage.agg") }}</th>
          <th>{{ $t("manage.name") }}</th>
          <th>{{ $t("manage.contractDate") }}</th>
          <th>{{ $t("manage.account") }}</th>
          <th>{{ $t("manage.accountNumber") }}</th>
          <th>{{ $t("manage.tel") }}</th>
          <th>{{ $t("manage.companyNumber") }}</th>
          <th class="setemailwidth">{{ $t("manage.email") }}</th>
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
              <span>{{ v.contractDate }}</span>
            </td>
            <td>
              <span>{{ v.bank }}</span>
            </td>
            <td>
              <span>{{ v.accountNumber }}</span>
            </td>
            <td>
              <span>{{ v.tel }}</span>
            </td>
            <td>
              <span>{{ v.companyNumber }}</span>
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
  <!--// cont_body -->
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
      if (d != null) {
        for (var i = 0; i < d.length; i++) {
          var site = d[i];

          this.UserTblData.push({
            idx: i + 1,
            Id: site.SiteId,
            rcc: this.RccList[site.RCC - 1],
            userName: site.Firstname,
            contractDate: site.RegisterTimestamp,
            companyName: site.AggName,
            userEmail: site.Email,
            bank: "**은행",
            accountNumber: "***-********-0" + i,
            tel: "031-****-000" + i,
            companyNumber: "999-******-**-000" + i,
            // btn: "<button type='button' class='btn btn_tbl_inner'><span>수정</span></button>"
          });
        }
      }
    },
  },
  mounted() {
    this.$nuxt.$on("management-info", (d) => {
      console.log("dddd");
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