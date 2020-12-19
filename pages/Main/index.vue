<template>
  <div class="cont_body">
    <statusTop />
    <!-- main_cont_wrap -->
    <div class="main_cont_wrap">
      <rcc-monitor :MainrccList="MainrccList" />
      <div class="temp"></div>
      <div class="main_mid_cont">
        <div id="dashboardMap" class="main_map_area">
          <div class="dddd"></div>
          <div id="jejuMap" class="innerMap"></div>
        </div>
        <statusBottom />
      </div>
    </div>
    <!--// main_cont_wrap -->
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import statusBottom from "~/components/Main/MainStatusBottom";
//import rccMonitor from "~/components/Main/MainRccMonitor";
import rccMonitor from "~/components/Main/MainRccCard";
import statusTop from "~/components/Main/MainStatusTop.vue";
export default {
  middleware: "authenticated",
  layout: "common",
  head: {
    script: [
      // 지도영역 색 지정
      { src: "/scripts/data/statusMapLatLng.js" },

      // leaflet.js
      { src: "https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" },
      { src: "/scripts/leaflet/leaflet.migrationLayer.js" },
      { src: "/scripts/leaflet/leaflet.textpath.js" },
      { src: "/scripts/map/p21-ctrlAnimation.js" },
      { src: "/scripts/leaflet/leaflet.curve.js" },

      // amchart
      { src: "https://cdn.amcharts.com/lib/4/core.js" },
      { src: "https://cdn.amcharts.com/lib/4/charts.js" },
      { src: "https://cdn.amcharts.com/lib/4/themes/dark.js" },
      { src: "https://cdn.amcharts.com/lib/4/themes/animated.js" },

      // chart.js 플러그인
      { src: "/scripts/charts/Chart.bundle.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js" },

      // amchart 스크립트
    ],
  },
  components: {
    statusTop,
    statusBottom,
    rccMonitor,
  },
  beforeDestroy() {
    clearInterval(this.interval1);
    clearInterval(this.smp_interval);
  },
  async created() {
    this.MainrccList = this.$store.getters.MainrccList;
    // '전국' 삭제
  },
  data() {
    return {
      rccMonitorCard: [],
      rccColorList: [],
      todayInterval: null,
      map: null,
      jejuMap: null,
      markerGroup: null,
      markerImgMap: null,
      markerLoc: [],
      markerLocMap: null,
      //officeLatLng : {lat : 36.429260, lng : 127.390647},
      officeLatLng: { lat: 36.454125, lng: 127.4372 },
      fromTo: [
        { from: "rcc1", to: "rcc2", value: 19 },
        { from: "rcc3", to: "rcc2", value: 19 },
        { from: "rcc3", to: "rcc4", value: 19 },
        { from: "rcc4", to: "rcc2", value: 19 },
        { from: "rcc4", to: "rcc5", value: 19 },
        { from: "rcc4", to: "rcc8", value: 19 },
        { from: "rcc5", to: "rcc1", value: 19 },
        { from: "rcc5", to: "rcc2", value: 19 },
        { from: "rcc5", to: "rcc3", value: 19 },
        { from: "rcc6", to: "rcc4", value: 19 },
        { from: "rcc6", to: "rcc5", value: 19 },
        { from: "rcc6", to: "rcc8", value: 19 },
        { from: "rcc7", to: "rcc4", value: 19 },
        { from: "rcc7", to: "rcc8", value: 19 },
        { from: "rcc7", to: "rcc13", value: 19 },
        { from: "rcc9", to: "rcc10", value: 19 },
        { from: "rcc10", to: "rcc7", value: 19 },
        { from: "rcc10", to: "rcc13", value: 19 },
        { from: "rcc11", to: "rcc12", value: 19 },
        { from: "rcc11", to: "rcc14", value: 19 },
        { from: "rcc13", to: "rcc9", value: 19 },
        { from: "rcc13", to: "rcc11", value: 19 },
        { from: "rcc13", to: "rcc12", value: 19 },
        { from: "rcc14", to: "rcc6", value: 19 },
        { from: "rcc14", to: "rcc8", value: 19 },
      ],
      myInterval: null,
      smp_interval: null,
      url_aggregatorgroupid: "/contractor/getcontractorsites?aggregatorgroupid",
      locData: null,
    };
  },
  methods: {
    initMaker(map, jeju, locData) {
      // init marker
      var code;
      var markerGroup;

      var id, loc, obj;
      //this.markerGroup = getMarkerGroup(map, locData);
      this.drawRccMarker(map, jeju, this.markerGroup);
    },
    drawRccMarker(map, jeju) {
      // add marker map
      var loc;
      var markerIcon;
      var markerIdx;
      this.markerLocMap = new HashMap();

      // marker-image
      var markerImgMap = initMarkerImg();
      // marker-location
      var markerLocHashMap = initMarkerLoc();

      markerLocHashMap.forEach((v, k) => {
        markerIdx = "mImg" + k;
        markerIcon = markerImgMap.get(markerIdx);
        var loc = { lat: v.lat, lng: v.lng };
        // for lineanimation
        this.markerLocMap.set("rcc" + k, loc);
        // 마커 추가
        var m = L.marker(loc, { icon: markerIcon });
        //L.marker({lat: 33.372829, lng : 126.536349}, {icon : markerIcon}).addTo(jeju);

        // 계통지리정보로 이동
        m.on("click", function () {
          var Area = $("#area-" + (k - 1));
          var selectedArea = k;
          if (Area.hasClass("is_disabled") == false) {
            localStorage.setItem("MainAreaNum", selectedArea);
            location.href = "/statusMap";
          }
        });
        if (k == 16) {
          m.addTo(jeju);
        } else {
          m.addTo(map);
        }
      });

      // set officeIcon
      //var officeIcon = L.icon({iconUrl : '/images/building.png', iconSize : [20, 20]});
      var officeIcon = L.icon({
        iconUrl: "/images/contents/main_icon_building.png",
        iconSize: [25, 50],
      });
      L.marker(this.officeLatLng, { icon: officeIcon }).addTo(map);
    },
    getAccumData() {
      var resp = _ajax("s", "accmofmeasurement", "summary", "yymmdd");
      if (resp == undefined || resp == null) {
        return;
      }
      resp = resp[0];
      var dailyaccum = [];
      dailyaccum.push({
        toady_chg: abs(resp.sumofcharge),
        today_dcg: unitKW(resp.sumofdischarge),
        today_pv: unitKW(resp.sumofpvgeneration),
        //avg_soc : unitSoc(resp.avgofsoc)
      });
      this.$nuxt.$emit("statustop-accum-data", dailyaccum);

      resp = _ajax("s", "accmofrevenue", "summary", "yymmdd");

      if (resp == undefined || resp == null) {
        return;
      }

      resp = resp[0];
      var forcast = resp.sumofforecastrevenue;
      if (forcast == null) {
        forcast = 0;
      }

      // 금일 누적 수익금
      this.$nuxt.$emit("daily-income", resp.sumofactualrevenue.toFixed(0));
      // 금일 예상 수익금
      this.$nuxt.$emit("daily-predict-income", forcast.toFixed(0));
    },

    setActPwrAni(data) {
      // for line-animation map
      _aniMap = data;
      var map = this.map;
      var to = [];
      initAni(map, this.officeLatLng, to, this.markerLocMap);
      getFlowStatus(
        map,
        this.officeLatLng,
        this.markerLocMap,
        this.fromTo,
        _aniMap
      );
    },
    kpxData() {
      var token = Cookie.get("token");
      var url =
        "https://www.peiu.co.kr:3077/api/information/v1/tradeindicators";
      $.ajax({
        url: url,
        contentType: "application/json",
        async: false,
        headers: {
          Authorization: "Bearer " + token,
        },
        type: "get",
        success: this.recvStatusBottomData,
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("[Error] :smp data 수신 실패");
        },
      });
    },
    recvStatusBottomData(data) {
      if (data == undefined) {
        return;
      }
      var result = data.Result;

      if (result.Code == 200) {
        // 성공
        data = data.Payload.elements[0];
        var statusBottomdata = [];
        statusBottomdata.push({
          // 현재부하
          currPwrTot: unitKW(data.load),
          // 피크시간-시작시간
          fcstime: data.peakstarthour,
          // 피크시간-종료시간
          fcEtime: data.peakendhour,
          // SMP - 육지
          smp_value_land: data.landsmp,
          // SMP - 제주
          smp_value_jeju: data.jejusmp,
          // REC
          rec_average_price: Number(data.avgofrec)
            .toLocaleString("en")
            .split(".")[0],
        });
      } else {
        console.log(url + " ajax data load 실패");
      }
      this.$nuxt.$emit("status-bottom", statusBottomdata);
    },
    setpvchartData() {
      var resp = _ajax("h", "latestpvgenerations", "rcc");
      if (resp == undefined || resp == null) {
        return;
      }

      for (var i = 0; i < resp.length; i++) {
        var v = resp[i];
        $nuxt.$emit("rcc" + v.rcc + "-PreData", Number(v.predictpvgen));
        $nuxt.$emit("rcc" + v.rcc + "-currentPV", v.actualpvgen);
      }
    },
    getChartDataByrcc() {
      // 상단 평균 soc, pv, actpwr (graphql)
      this.measurementData();

      // 00 분부터 현재 까지 예측, 실제값
      this.setpvchartData();

      // 날씨
      this.weatherData();
    },
    weatherData() {
      var resp = _ajax("i", "currentweather", "rcc");

      if (resp == undefined || resp == null) {
        return;
      }

      for (var i = 0; i < resp.length; i++) {
        var r = resp[i];
        if (r.icon == undefined) {
          console.log("rcc별 날씨 정보 없음");
          return;
        } else {
          $nuxt.$emit("rcc" + r.rcc + "-WheatherByRcc", r.icon.substring(0, 2));
        }
      }
    },
    measurementData() {
      // rcc별 발전
      var resp = _ajax("m", "realtime", "rcc");
      if (resp == undefined || resp == null) {
        return;
      }

      var EventByAll = 0;
      var aniMap = new HashMap();

      var avgofsoc = 0;

      for (var i = 0; i < resp.length; i++) {
        EventByAll += resp[i].activeevent;
        // 메인페이지 애니메이션 맵
        aniMap.set(resp[i].rcc, resp[i].activepower);
        // 이벤트 버스 배열 초기화
        avgofsoc += resp[i].soc;
        var resource = [];
        resource.push({
          sumOfActivePower: Number(resp[i].activepower / 1000).toFixed(3),
          meanOfSOC: Number(resp[i].soc).toFixed(0),
          sumOfPvPower: Math.abs(Number(resp[i].pvgeneration / 1000)).toFixed(
            3
          ),
        });
        $nuxt.$emit("rcc" + resp[i].rcc + "-EventByRcc", resp[i].activeevent);
        $nuxt.$emit("rcc" + resp[i].rcc + "-activePower", resource);
      }

      avgofsoc = avgofsoc / resp.length;
      this.$nuxt.$emit("statustop-avgofsoc", unitSoc(avgofsoc));
      $nuxt.$emit("statustop-total-eventCount", EventByAll);
      this.setActPwrAni(aniMap);
    },

    getInstalledInfo() {
      // agg수
      var resp = _ajax("i", "owner", "agg");
      if (resp == undefined || resp == null) {
        return;
      } else {
        $nuxt.$emit("statustop-agg-count", resp.length);
      }

      // 총 설치용량
      resp = _ajax("i", "owner", "summary");

      var installedInfo = [];

      if (resp == undefined || resp == null) {
        return;
      } else {
        resp = resp[0].facility;
        installedInfo.push({
          tPv: unitMW(resp.sumofpvcapacity),
          tBms: unitMW(resp.sumofbmscapacity),
        });

        $nuxt.$emit("statustop-custom-info", installedInfo);
      }

      // rcc 별 설비용량
      var resp = _ajax("i", "owner", "sitebyrcc", null, null);
      for (var i = 0; i < resp.length; i++) {
        var f = resp[i].facility;
        $nuxt.$emit("rcc" + resp[i].rcc + "-installedPV", f.sumofpvcapacity);
      }
    },
    initMap() {
      var level = 8;
      //해상도 level 9로 조정
      if (window.innerWidth > 1920) {
        level = 9;
      }
      // set map tile style
      var cartodbUrl =
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png";
      // land
      this.map = L.map("dashboardMap").setView([36.279707, 127.847817], level);
      // jeju
      this.jejuMap = L.map("jejuMap").setView([33.386949, 126.548782], level);

      // prevent dragging
      this.map.dragging.disable();
      this.jejuMap.dragging.disable();

      // set Map Options
      var koreaMap = this.map;
      var jejuMap = this.jejuMap;

      L.tileLayer(cartodbUrl, {
        attributionControl: false,
        maxZoom: level,
        minZoom: level,
        preferCanvas: true,
        noMoveStart: true,
        zoomControl: false,
        reuseTiles: true,
      }).addTo(koreaMap);
      koreaMap.zoomControl.remove();
      koreaMap.setMaxBounds([
        [37.993998198369574, 131.27563476562503],
        [34.52692430140103, 124.41741943359376],
      ]);

      L.tileLayer(cartodbUrl, {
        attributionControl: false,
        maxZoom: level,
        minZoom: level,
        preferCanvas: true,
        noMoveStart: true,
        zoomControl: false,
        reuseTiles: true,
      }).addTo(jejuMap);
      jejuMap.zoomControl.remove();

      koreaMap.doubleClickZoom.disable();
      jejuMap.doubleClickZoom.disable();

      // change background color
      var korea = {
        type: "Feature",
        id: "KOR",
        properties: {
          name: "Korea",
          style: {
            weight: 0,
            color: "#000d4c",
            opacity: 0.2,
            fillColor: "#000d4c",
          },
        },
        geometry: {
          type: "Polygon",
          coordinates: RegionJson,
        },
      };

      L.geoJson([korea], {
        style: function (feature) {
          return feature.properties && feature.properties.style;
        },
      }).addTo(this.map);

      // init marker
      this.initMaker(koreaMap, jejuMap);
    },
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off("line-animation");
    // clear interval
    clearInterval(this.todayInterval);
    clearInterval(this.smp_interval);
  },
  mounted() {
    //var resp = _ajax("i", "owner", "sitebyrcc", null, null);
    // // 한번만 받아오는 데이터
    //this.getInstalledInfo();
    // // 지도 초기화
    // this.initMap()
    // // 금일 누적 방전,충전,발전, 예상, 누적 수익금
    // this.getAccumData();
    // this.getChartDataByrcc();
    // // 1분마다 업데이트
    // this.todayInterval = setInterval(() =>{
    //     this.getAccumData();
    //     this.getChartDataByrcc();
    // },60000)
    // // 1시간마다 업데이트
    // this.kpxData();
    // this.smp_interval = setInterval(() => {
    // 	this.kpxData();
    // }, 600000);
    // //global menu
    // if($nuxt.$route.path === '/main'){
    //     // hide menu
    //     $('#header').css('position','absolute');
    //     $('#header').css('top','-5.9rem');
    //     $('#header').css('width','100%');
    //     $('#header').css('z-index',999);
    // }
    // //document.onkeydown = KeyPress;
    // // 상단메뉴 마우스오버 이벤트
    // $("#header").mouseover(function(){
    //     // showing global menu
    //     //$('#header').css('position','relative');
    //     $('#header').animate({top:'0rem'});
    //     // reset timeout func
    //     clearTimeout(timeout);
    // });
    // // 상단메뉴 마우스리브 이벤트
    // $("#header").mouseleave(function() {
    //     // hide global menu
    //     $('#header').animate({top : '-5.9rem'});
    //     // reset timeout func
    //     clearTimeout(timeout);
    // });
    // // 누적발전량, 누적충전량 마우스 오버 이벤트
    // $(".cont_head").mouseover(function(){
    //    // show global menu
    //    $('#header').animate({top:'0rem'});
    //    // reset timeout func
    //     clearTimeout(timeout);
    // });
  },
};

let _showMenu = true;
let _aniMap;

let timeout;
function KeyPress(e) {
  var evtobj = window.event ? event : e;

  if (evtobj.ctrlKey) {
    // show menu
    //    $("#header").css('position','relative')
    $("#header").animate({ top: "0rem" });
    // hide after 5 second

    timeout = setTimeout(function () {
      $("#header").animate({ top: "-5.9rem" });
    }, 5000);
  }
  //Do action on SHIFT + DELEETE
  if (evtobj.keyCode == 46 && evtobj.shiftKey) {
    alert("Shift + Delete Pressed");
  }
}
</script>

<style>
.temp {
  background-color: #000d4c;
  width: 98rem;
  height: 100%;
  margin-left: 47rem;
  position: absolute;
  opacity: 0.2;
}
.innerMap {
  width: 12vw;
  height: 14vh;
  z-index: 999;
  position: absolute;
  bottom: 0;
  right: 0;
  outline: 0.1px dotted #4b5a6c;
}
</style>