<template>
  <!-- cont_body -->
  <div class="cont_body">
    <div
      class="tab_wrap size1"
      style="
        background: #1a2031 !important;
        margin-top: 2.6rem !important;
        margin-left: 0rem !important;
        margin-right: 0rem !important;
      "
    >
      <TheTabList />
      <div class="tab_cont">
        <!-- top_selBox_zone -->
        <div class="top_selBox_zone" style="padding: 0 0 0 0rem !important">
          <TheFilter />

          <!-- forecast_cont -->
          <div class="">
            <dl>
              <dd>
                <div class="forecast_area">
                  <!-- <canvas id="forecastChart1"></canvas>  -->
                  <div id="forecastChart1"></div>
                </div>
              </dd>
            </dl>
            <ForcastTable />
          </div>
          <!--// forecast_cont -->
        </div>
      </div>
    </div>
  </div>
  <!--// cont_body -->
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import TheFilter from "@/components/common/modules/TheFilter.vue";
import TheTabList from "@/components/common/modules/TheTabList.vue";
import ForcastTable from "@/components/Forcast/ForcastTable.vue";
export default {
  layout: "common",
  components: {
    TheFilter,
    TheTabList,
    ForcastTable,
  },
  data() {
    return {
      criteria: "기준 선택",
      csvdata: [],

      date: "",
      datelist: [],
      category: "",
      pagination: 1,
      maxPage: 1,
      thead: [],

      tbody_table: [],
      startTS: "",
      endTS: "",
      OptionList: [],
      SiteList: [],
      selectedItem: "",
      selectedsiteId: "",
      usertoken: "",
      userType: "",
      errorMonth: [0.01, 0.02],
    };
  },
//   head: {
//     link: [{ rel: "stylesheet", href: "/css/jquery-ui.css" }],
//     script: [
//       { src: "https://www.amcharts.com/lib/4/core.js" },
//       { src: "https://www.amcharts.com/lib/4/charts.js" },
//       { src: "https://www.amcharts.com/lib/4/themes/dark.js" },
//       { src: "https://www.amcharts.com/lib/4/themes/animated.js" },
//       { src: "//www.amcharts.com/lib/4/lang/ko_KR.js" },
//       { src: "/scripts/jquery/core/jquery-ui.min.js" },
//     ],
//   },
  //   methods: {
  //     downloadCSV() {
  //       var s = $("#startDate").val();
  //       var e = $("#endDate").val();

  //       if (this.category == "" || this.category == null) {
  //         errorpoup("조회기준 없음");
  //         this.emptyselectedfield("data");

  //         this.criteria = "기준 선택";

  //         // 첫번째 셀렉트 박스 초기화
  //         $("#evtCategory").val("criteria").prop("selected", true);
  //         this.category = null;

  //         // 두번째 셀렉트 박스 초기화
  //         $("#rccaggcategory").val("rccaggcriteria").prop("selected", true);
  //         this.selectedItem = null;

  //         // 세번째 셀렉트 박스 초기화
  //         $("#siteidcategory").val("siteidcriteria").prop("selected", true);
  //         this.selectedsiteId = null;
  //         return;
  //       } else {
  //         // 선택한 조회기준의 값 (rcc, site, aggid)

  //         var filtering = null;
  //         if (this.category == "site") {
  //           filtering = this.selectedsiteId;
  //         } else {
  //           filtering = this.selectedItem;
  //         }

  //         if (
  //           filtering == "" ||
  //           filtering == "rccaggcriteria" ||
  //           filtering == "siteidcriteria" ||
  //           filtering == null
  //         ) {
  //           errorpoup("선택 값 없음");
  //           this.emptyselectedfield("data");

  //           this.criteria = "기준 선택";

  //           // 첫번째 셀렉트 박스 초기화
  //           $("#evtCategory").val("criteria").prop("selected", true);
  //           this.category = null;

  //           // 두번째 셀렉트 박스 초기화
  //           $("#rccaggcategory").val("rccaggcriteria").prop("selected", true);

  //           this.OptionList = [];
  //           this.selectedItem = null;

  //           // 세번째 셀렉트 박스 초기화
  //           $("#siteidcategory").val("siteidcriteria").prop("selected", true);
  //           this.SiteList = [];
  //           this.selectedsiteId = null;
  //           return;
  //         }

  //         // 날짜
  //         if (s == "" || e == "") {
  //           errorpoup("조회 날짜 없음");
  //           this.emptyselectedfield("data");

  //           // 첫번째 셀렉트 박스 초기화
  //           $("#evtCategory").val("criteria").prop("selected", true);
  //           this.category = null;

  //           this.criteria = "기준 선택";

  //           // 두번째 셀렉트 박스 초기화
  //           $("#rccaggcategory").val("rccaggcriteria").prop("selected", true);
  //           this.OptionList = [];
  //           this.selectedItem = null;

  //           // 세번째 셀렉트 박스 초기화
  //           $("#siteidcategory").val("siteidcriteria").prop("selected", true);
  //           this.SiteList = [];
  //           this.selectedsiteId = null;
  //           return;
  //         }
  //       }

  //       var array = [];
  //       var array = this.csvdata;

  //       var a = "일자" + "," + "예측값(kW)" + "," + "실제값(kW)" + "\r\n";
  //       $.each(array, function (i, item) {
  //         a += item.date + "," + item.forcast + "," + item.pvgen + "\r\n";
  //       });

  //       var downloadLink = document.createElement("a");
  //       var blob = new Blob(["\ufeff" + a], { type: "text/csv;charset=utf-8" });

  //       var url = URL.createObjectURL(blob);
  //       downloadLink.href = url;
  //       var title =
  //         $("#startDate").val() + "~" + $("#endDate").val() + "예측값_실제값.csv";
  //       downloadLink.download = title;
  //       //downloadLink.download = "data.csv";

  //       document.body.appendChild(downloadLink);
  //       downloadLink.click();
  //       document.body.removeChild(downloadLink);
  //     },
  //     prev() {
  //       this.pagination = this.pagination - 1;

  //       if (
  //         this.maxPage == 0 ||
  //         this.maxPage == this.pagination ||
  //         this.pagination == 0
  //       ) {
  //         this.pagination = 1;
  //         errorpoup("첫번째 페이지 입니다.");
  //         return;
  //       }
  //       this.date = this.datelist[this.pagination - 1];
  //       this.setTblData();
  //     },
  //     next() {
  //       if (this.maxPage == 0) {
  //         this.pagination = 1;
  //         errorpoup("첫번째 페이지 입니다");
  //         return;
  //       }

  //       if (this.maxPage == this.pagination) {
  //         errorpoup("마지막 페이지 입니다.");
  //         return;
  //       }

  //       this.pagination = this.pagination + 1;
  //       this.date = this.datelist[this.pagination - 1];

  //       this.setTblData();
  //     },
  //     setToday() {
  //       var data = getToday();
  //       $("#endDate").val(data);
  //       $("#startDate").val(data);
  //       // search 버튼
  //       this.getStatChart();
  //     },
  //     SetCategory(event) {
  //       var apiUrl = "";
  //       this.OptionList = [];
  //       this.category = event.target.value;
  //       $(".site").hide();

  //       // 차트 empty
  //       $("#forecastChart1").empty();

  //       // 테이블 empty
  //       this.tbody_table = [];

  //       // 날짜 초기화
  //       $("#startDate").val("");
  //       $("#endDate").val("");

  //       // 두번째 셀렉트박스 초기화
  //       $("#rccaggcategory").val("rccaggcriteria").prop("selected", true);
  //       this.selectedItem = null;
  //       this.OptionList = [];

  //       // 세번째 셀렉트 박스 초기화
  //       $("#siteidcategory").val("siteidcriteria").prop("selected", true);
  //       this.selectedsiteId = null;
  //       this.SiteList = [];

  //       // 두번째 셀렉트 박스 기본값 설정
  //       if (this.category == "rcc") {
  //         this.criteria = "지역명";
  //       } else {
  //         this.criteria = "고객명";
  //       }
  //       $(".aggforsiteid").show();
  //       // 조회기준이 site 인 경우 site 선택 항목 show()
  //       if (this.category == "site") {
  //         $(".site").show();
  //         // 발전사업자 인 경우
  //         // 거래사업자 셀렉트박스 삭제

  //         if (getCookie("userType") == 0) {
  //           $(".aggforsiteid").hide();
  //           var data = _ajax("i", "owner", "site");

  //           for (var i = 0; i < data.length; i++) {
  //             this.SiteList.push({
  //               idx: i,
  //               represenation: data[i].represenation,
  //               siteid: data[i].siteid,
  //             });
  //           }
  //           this.$nuxt.$emit("category", this.category);
  //           return;
  //         }
  //       }

  //       if (this.category != null) {
  //         if (this.category == "rcc") {
  //           this.OptionList = getRccList("search");
  //         } else {
  //           this.OptionList = getAggList("search");
  //         }
  //       }

  //       this.$nuxt.$emit("category", this.category);
  //     },
  //     setselectId(event) {
  //       this.selectedItem = event.target.value;

  //       // 세번째 셀렉트박스 초기화
  //       $("#siteidcategory").val("siteidcriteria").prop("selected", true);
  //       this.SiteList = [];
  //       this.selectedsiteId = null;

  //       // 차트 empty
  //       $("#forecastChart1").empty();

  //       // 테이블 empty
  //       this.tbody_table = [];

  //       if (this.selectedItem == null) {
  //         this.SiteList = [];
  //         return;
  //       }

  //       if (this.category == "site") {
  //         // get site list
  //         this.SiteList = getSiteList(this.selectedItem, "search");
  //       }
  //     },

  //     setSiteId(event) {
  //       this.selectedsiteId = event.target.value;

  //       // 차트 empty
  //       $("#forecastChart1").empty();
  //       this.tbody_table = [];

  //       // 테이블 empty
  //       this.tbody_table = [];
  //     },

  //     getChartData() {
  //       var item = _wherecondition(
  //         this.category,
  //         this.selectedItem,
  //         this.selectedsiteId
  //       );
  //       var p =
  //         " FROM mysql.peiuoperation.`vwHourlyPvGenerations` where " +
  //         item +
  //         " and createts >='" +
  //         this.startTS +
  //         "' and createts <= '" +
  //         this.endTS +
  //         "'";

  //       if (this.category == "rcc" || this.category == "agg") {
  //         var send =
  //           "SELECT createts, sum(forecastpvgeneration) as forcast, sum(sumofpvgeneration) as pvgen " +
  //           p +
  //           " group by createts";
  //       } else if (this.category == "site") {
  //         var send =
  //           "SELECT createts, forecastpvgeneration as forcast, sumofpvgeneration as pvgen" +
  //           p;
  //       }

  //       var data = _query(send);

  //       if (data.length == 0) {
  //         return false;
  //       }
  //       var arr = [];

  //       for (var i = 0; i < data.length; i++) {
  //         var forcast = 0,
  //           pvgen = 0;
  //         var d = data[i];

  //         if (this.category == "site") {
  //           forcast = unitKW(d.forcast);
  //         } else {
  //           forcast = unitMW(d.forcast);
  //         }

  //         if (d.pvgen == null) {
  //           pvgen = null;
  //         } else {
  //           if (this.category == "site") {
  //             pvgen = unitKW(d.pvgen);
  //           } else {
  //             pvgen = unitMW(d.pvgen);
  //           }
  //         }

  //         this.csvdata.push({
  //           date: d.createts,
  //           forcast: forcast,
  //           pvgen: pvgen,
  //         });
  //         arr.push({
  //           date: new Date(d.createts),
  //           forcast: forcast,
  //           pvgen: pvgen,
  //         });
  //       }

  //       // 설치용량
  //       var facility = getInstalledData(
  //         this.category,
  //         this.selectedItem,
  //         this.selectedsiteId
  //       );

  //       this.setChart(arr, facility);
  //     },
  //     emptyselectedfield(v) {
  //       if (v == "data") {
  //         $("#startDate").val("");
  //         $("#endDate").val("");
  //       }
  //     },
  //     getStatChart() {
  //       var s = $("#startDate").val();
  //       var e = $("#endDate").val();

  //       if (this.category == "" || this.category == null) {
  //         errorpoup("조회기준 없음");
  //         this.emptyselectedfield("data");

  //         this.criteria = "기준 선택";

  //         // 첫번째 셀렉트 박스 초기화
  //         $("#evtCategory").val("criteria").prop("selected", true);
  //         this.category = null;

  //         // 두번째 셀렉트 박스 초기화
  //         $("#rccaggcategory").val("rccaggcriteria").prop("selected", true);
  //         this.selectedItem = null;

  //         // 세번째 셀렉트 박스 초기화
  //         $("#siteidcategory").val("siteidcriteria").prop("selected", true);
  //         this.selectedsiteId = null;
  //         return;
  //       } else {
  //         // 선택한 조회기준의 값 (rcc, site, aggid)

  //         var filtering = null;
  //         if (this.category == "site") {
  //           filtering = this.selectedsiteId;
  //         } else {
  //           filtering = this.selectedItem;
  //         }

  //         if (
  //           filtering == "" ||
  //           filtering == "rccaggcriteria" ||
  //           filtering == "siteidcriteria" ||
  //           filtering == null
  //         ) {
  //           errorpoup("선택 값 없음");
  //           return;
  //         }

  //         // 날짜
  //         if (s == "" || e == "") {
  //           errorpoup("조회 날짜 없음");
  //           return;
  //         }
  //       }

  //       this.startTS = $("#startDate").val() + " 00:00:00";
  //       this.endTS = $("#endDate").val() + " 23:59:59";
  //       this.datelist = [];

  //       this.datelist = this.getdatearray(
  //         $("#startDate").val(),
  //         $("#endDate").val(),
  //         this.datelist
  //       );

  //       this.maxPage = this.datelist.length;
  //       this.date = this.datelist[0];

  //       this.pagination = 1;

  //       var isempty = this.getChartData();
  //       if (isempty == false) {
  //         errorpoup("조회 결과 없음");
  //         $("#startDate").val("");
  //         $("#endDate").val("");
  //         this.maxPage = 1;
  //         this.pagination = 1;
  //         return;
  //       } else {
  //         this.setTblData();
  //       }
  //     },
  //     getdatearray(startDate, endDate, listDate) {
  //       var dateMove = new Date(startDate);
  //       var strDate = startDate;
  //       if (startDate == endDate) {
  //         var strDate = dateMove.toISOString().slice(0, 10);
  //         listDate.push(strDate.substring(0, 10));
  //       } else {
  //         while (strDate < endDate) {
  //           var strDate = dateMove.toISOString().slice(0, 10);
  //           listDate.push(strDate.substring(0, 10));
  //           dateMove.setDate(dateMove.getDate() + 1);
  //         }
  //       }

  //       return listDate;
  //     },
  //     setTblData() {
  //       var start = this.date + " 00:00:00";
  //       var end = this.date + " 23:59:00";

  //       var item = _wherecondition(
  //         this.category,
  //         this.selectedItem,
  //         this.selectedsiteId
  //       );
  //       var p =
  //         " FROM mysql.peiuoperation.`vwHourlyPvGenerations` where " +
  //         item +
  //         " and createts >='" +
  //         start +
  //         "' and createts <= '" +
  //         end +
  //         "'";

  //       if (this.category == "rcc" || this.category == "agg") {
  //         var send =
  //           "SELECT createts, sum(forecastpvgeneration) as forcast, sum(sumofpvgeneration) as pvgen " +
  //           p +
  //           " group by createts";
  //       } else if (this.category == "site") {
  //         var send =
  //           "SELECT createts, forecastpvgeneration as forcast, sumofpvgeneration as pvgen" +
  //           p;
  //       }

  //       var data = _query(send);

  //       if (data == undefined) {
  //         return;
  //       }

  //       this.tbody_table = [];
  //       var value, forcastpv, error;
  //       for (var i = 0; i < data.length; i++) {
  //         var value = 0,
  //           forcastpv = 0;
  //         var d = data[i];
  //         if (this.category == "site") {
  //           value = unitKW(d.pvgen);
  //           forcastpv = unitKW(d.forcast);
  //         } else {
  //           value = unitMW(d.pvgen);
  //           forcastpv = unitMW(d.forcast);
  //         }
  //         if (d.pvgen == null || d.pvgen == undefined || Number(d.pvgen) < 0.01) {
  //           error = "-";
  //         } else {
  //           error = (100 * (Math.abs(d.pvgen - d.forcast) / d.pvgen)).toFixed(1);
  //         }

  //         this.tbody_table.push({
  //           index: i,
  //           pvgen: value,
  //           forcast: forcastpv,
  //           error: error,
  //         });
  //       }
  //     },
  //     setChart(data, facility) {
  //       var datediff = dateDiff($("#startDate").val(), $("#endDate").val());
  //       var grid = setgridDistance(datediff);
  //       var forcasttxt = "",
  //         pvgentxt = "";
  //       if (this.category == "rcc" || this.category == "agg") {
  //         var pv = facility.pv / 1000;
  //         forcasttxt = "예측값(MWp)";
  //         pvgentxt = "실제값(MWp)";
  //       } else {
  //         var pv = facility.pv;
  //         forcasttxt = "예측값(kWp)";
  //         pvgentxt = "실제값(kWp)";
  //       }

  //       am4core.ready(function () {
  //         // Themes begin
  //         am4core.useTheme(am4themes_dark);
  //         am4core.useTheme(am4themes_animated);
  //         am4core.options.commercialLicense = true;
  //         // Themes end
  //         // Create chart
  //         var chart = am4core.create("forecastChart1", am4charts.XYChart);

  //         chart.language.locale = am4lang_ko_KR;
  //         chart.numberFormatter.language = new am4core.Language();
  //         chart.numberFormatter.language.locale = am4lang_ko_KR;
  //         chart.dateFormatter.language = new am4core.Language();
  //         chart.dateFormatter.language.locale = am4lang_ko_KR;
  //         chart.fontSize = "1.5vh";
  //         chart.data = data;

  //         var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  //         // 날짜 표기 단위(조회 일자마다 값이 달라지게 함 )
  //         dateAxis.renderer.minGridDistance = grid;
  //         // 날짜 표기 형식
  //         dateAxis.dateFormats.setKey("day", "[bold] MM/dd (eee)");
  //         // 'day'항목이 넘어갈때, 볼드 강조
  //         dateAxis.periodChangeDateFormats.setKey("day", "[bold] MM/dd (eee)");
  //         // 날짜 표기 세로줄 두께
  //         dateAxis.renderer.grid.template.strokeWidth = 4;
  //         // 날짜 표기 컬러
  //         dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

  //         var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //         valueAxis.tooltip.disabled = true;
  //         valueAxis.renderer.labels.template.fill = am4core.color("#787edb");
  //         valueAxis.renderer.minWidth = 60;
  //         valueAxis.gridThickness = 0;
  //         valueAxis.max = pv;

  //         var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
  //         valueAxis2.tooltip.disabled = true;
  //         valueAxis2.renderer.labels.template.fill = am4core.color("#db66cd");
  //         valueAxis2.max = pv;

  //         var series = chart.series.push(new am4charts.LineSeries());
  //         series.name = pvgentxt;
  //         //series.fontSize = "3rem";
  //         series.strokeWidth = 2;
  //         series.dataFields.dateX = "date";
  //         series.dataFields.valueY = "pvgen";
  //         series.tooltipText = "{valueY.value}";
  //         series.fill = am4core.color("#db66cd");
  //         series.stroke = am4core.color("#db66cd");

  //         var series2 = chart.series.push(new am4charts.LineSeries());
  //         series2.strokeDasharray = "5,4";
  //         series2.name = forcasttxt;
  //         series2.strokeWidth = 2;
  //         series2.dataFields.dateX = "date";
  //         series2.dataFields.valueY = "forcast";
  //         series2.tooltipText = "{valueY.value}";
  //         series2.fill = am4core.color("#787edb");
  //         series2.stroke = am4core.color("#787edb");

  //         chart.cursor = new am4charts.XYCursor();
  //         chart.cursor.xAxis = dateAxis;
  //         var scrollbarX = new am4charts.XYChartScrollbar();
  //         scrollbarX.series.push(series);
  //         chart.scrollbarX = scrollbarX;
  //         chart.legend = new am4charts.Legend();

  //         //valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
  //         dateAxis.renderer.grid.template.strokeOpacity = 0.07;
  //         valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  //       }); // end am4core.ready()
  //     },
  //     setSelectlistbyauth() {
  //       var level = getCookie("userType");
  //       if (level == 0) {
  //         // 거래사업자 단위 검색 옵션 삭제
  //         $("select#evtCategory option[value='agg']").remove();
  //       }
  //     },
  //   },
  //   mounted() {
  //     // 메뉴 활성화
  //     document.getElementById("menu6").classList.add("active");

  //     this.setSelectlistbyauth();

  //     $(document).ready(function () {
  //       $("#endDate").datepicker();
  //       $("#startDate").datepicker();

  //       //new PerfectScrollbar('.fixed_tbl_wrap .record_tbl tbody');//커스텀 스크롤
  //     });
  //     for (var i = 0; i < 24; i++) {
  //       this.thead.push({
  //         hour: i + "시",
  //       });
  //     }

  //     $(".site").hide();

  //     // 로그인 토큰
  //     this.usertoken = Cookie.get("token");
  //     // 사용자 권한 레벨
  //     this.userType = Cookie.get("userType");
  //   },
};
function fnExcelReport(id, title) {
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text =
    tab_text +
    '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  tab_text =
    tab_text + "<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>";
  tab_text = tab_text + "<x:Name>Test Sheet</x:Name>";
  tab_text =
    tab_text +
    "<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>";
  tab_text =
    tab_text + "</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>";
  tab_text = tab_text + "<table border='1px'>";
  var exportTable = $("#" + id).clone();
  exportTable.find("input").each(function (index, elem) {
    $(elem).remove();
  });
  tab_text = tab_text + exportTable.html();
  tab_text = tab_text + "</table></body></html>";
  var data_type = "data:application/vnd.ms-excel";
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var fileName = title + ".xls";
}
</script>
<style>