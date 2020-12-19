<template>
  <div class="cont_body">
    <TheSiteSelect />
    <div class="view_box_wrap1">
      <TheViewBoxL />
      <TheViewBoxR />
    </div>
    <aidi-modal></aidi-modal>
  </div>
</template>


<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import aidiModal from "~/components/AreaControl/AIDI_modal";
import TheSiteSelect from "@/components/AreaControl/TheSelBox/TheSiteSelect.vue";
import TheViewBoxL from "@/components/AreaControl/TheViewBox/ViewBoxL.vue";
import TheViewBoxR from "@/components/AreaControl/TheViewBox/ViewBoxR.vue";

export default {
  middleware: "authenticated",
  layout: "common",
  components: {
    TheSiteSelect,
    TheViewBoxL,
    TheViewBoxR,
    //areaCtrlDiagram,
    aidiModal,
    //jejuDiagram,
  },
  head: {
    // script: [
    //   { src: "/scripts/areaControl/diagram.js" },
    //   { src: "/scripts/areaControl/data.js" },
    //   { src: "/scripts/control.js" },
    //   { src: "https://www.amcharts.com/lib/4/core.js" },
    //   { src: "https://www.amcharts.com/lib/4/charts.js" },
    //   { src: "https://www.amcharts.com/lib/4/themes/dark.js" },
    //   { src: "https://www.amcharts.com/lib/4/themes/animated.js" },
    //   { src: "https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.js" },
    //   //{ src: "/scripts/common-popup.js" },
    // ],
  },
  data() {
    return {
      green: "/images/contents/icon_MCCB_green.png",
      red: "/images/contents/icon_MCCB_red.png",
      initsoc: "/images/common/bat_B_10.png",
      background_url: "../images/contents/",
      countofdiagram: "listL_type1 listR_type1",
      eventList: [],
      occurEvtCount: "",
      dCount: [],
      dailyChg: "-",
      dailyDcg: "-",
      dailyPv: "-",
      monthlyChg: "-",
      monthlyDcg: "-",
      monthlyPv: "-",

      evtToday: "-",
      evtMonthly: "-",
      AccumIncome: "-",
      todayIncome: "-",

      mqtt: null,
      topic: null,
      client: null,

      diclient: null,
      ditopic: null,

      eventinterval: null,

      pvess_id: "",
      installedPCS: "-", // capacity
      installedESS: "-",
      installedPV: "-",
      installed_date: "", // date
      selectedSiteId: "",

      selectedaAggID: "",
      SiteList: [],
      OptionList: [],
      //interval : null
    };
  },
  // methods: {
  //     getSiteId(e){
  //         if(e != null){
  //             if(this.selectedaAggID == ""){
  //                 this.selectedaAggID = e.target.value;
  //             }else{
  //                 var selected = e.target.value;
  //             }
  //         }

  //         this.SiteList = []
  //         if(this.selectedaAggID != ""){
  //             if(getCookie('userType') == 0){
  //                 this.SiteList = [];
  //                 return;
  //             }else{
  //                 console.log(this.selectedaAggID)
  //                 this.SiteList = getSiteList(this.selectedaAggID, 'search');
  //                 console.log(this.SiteList)
  //             }

  //         }

  //     },
  //     setUserAsset(event){
  //         if(event != null){
  //             this.selectedSiteId = event.target.value;
  //         }
  //         this.getDataBySiteId(this.selectedSiteId)
  //     },
  //     CreateEvtTable(SITEID){
  //         var query = "SELECT * FROM mysql.peiuoperation.`vwEventRecord` where siteid = "+ this.selectedSiteId +" and Ackts is null"
  //         var data = _query(query)

  //         if(data == null || data == undefined){
  //             return;
  //         }

  //         this.eventList = [];
  //         this.occurEvtCount = "(" + data.length + " 건)"
  //         $('#no_error_tr').remove();
  //         if(data.length == 0){
  //             var tr = "<tr id='no_error_tr'><td colspan='7' style='width:86rem;'>최근 발생 장애 이력 없음</td></tr>"
  //             $('#tbl_error tr:last').after(tr)
  //         }else{

  //             var tr = "<tr>"
  //             var evtMap = new HashMap();
  //             var eventmsg = "";
  //             for(var i=0; i<data.length; i++){
  //                 var evt = data[i]
  //                 var createts =  evt.createts.replace(/\T/g,' ');

  //                 if(evt.Recoveryts == null){
  //                     var recoveryts = "-"
  //                     eventmsg = "처리요망"
  //                 }else{
  //                     var recoveryts = evt.Recoveryts.replace(/\T/g,' ');
  //                     eventmsg = "처리완료"
  //                 }

  //                 this.eventList.push({
  //                     index : i,
  //                     createDT :createts,
  //                     recoveryDT : recoveryts,
  //                     deviceId : devicecode[evt.DeviceType] + evt.DeviceIndex,
  //                     description : evt.Name,
  //                     eventId : evt.EventRecordId,
  //                     msg : eventmsg
  //                 })

  //             }

  //         }

  //     },

  //     setdiagramUI(siteid,pcs, pv){

  //         for(var i=1 ; i<= 4; i++){

  //             $('li[name=info'+i+']').css('display','none')
  //             $('li[name=infopv'+i+']').css('display','none')
  //         }

  //         // 자원 갯수에 맞게 클래스명 세팅
  //         this.countofdiagram = "listL_type" + pcs + " listR_type" + pv;

  //         // pcs, pv 칸 inline-block
  //         for(var i = 1; i<= pv; i++){
  //             $('li[name=infopv'+i+']').css('display','inline-block');
  //         }
  //         for(var i = 1; i<= pcs; i++){
  //             $('li[name=info'+i+']').css('display','inline-block')
  //         }

  //         // 단선도 배경 이미지 세팅 (현재 1*1,4*4만 가능)
  //         // pv 대수 기준
  //         $("#diagram_img").css('background-size','80.5rem 35.7rem')
  //         //$("#diagram_img").css('background-repeat', "no-repeat" )

  //         if(pv == 1){
  //             $("#diagram_img").css('background', "url('../images/contents/ex_map1x1_805x370.png') 7.4rem 5rem  no-repeat" )
  //         }else if(pv == 4){
  //             $("#diagram_img").css('background', "url('../images/contents/jeju_ex_map4x4_805x370.png') 7.4rem 5rem no-repeat" )

  //         }
  //         // 초기 스위치, soc 아이콘 세팅
  //         setmcbbstat(pcs, pv);
  //     },
  //     emptyamountfield(){
  //         $("#amountofchgdcg").text("")
  //         $("#amountofchgdcg").val("")
  //     },
  //     getDataBySiteId(SITEID){

  //         if(SITEID != null){

  //             setCookie('selectedsite', SITEID)
  //             _setprogressBar(DailyIncome,0)
  //             _setprogressBar(MothlyIncome,0)
  //             _setprogressBar(DailyEvent,0)
  //             _setprogressBar(MonthlyEvent,0)

  //             var dCount = this.getfacility(SITEID);
  //             // 금일, 금월 충전, 방전, 발전량
  //             summaryaccmData(SITEID)

  //             // 실시간 운영추이 인터벌 클리어
  //             clearInterval(interval)

  //             // 단선도 인터벌 클리어
  //             clearInterval(diagraminterval)

  //             // 조회시간 기준 한시간 전 pv, 충방전 데이터 요청 (차트)
  //             getHourlyChartData(SITEID, dCount);

  //             // 실시간 이벤트 테이블
  //             this.CreateEvtTable(SITEID)

  //             //실시간 장애 발생 이력 가져오기
  //             clearInterval(this.eventinterval);
  //             this.eventinterval = setInterval(() => {
  //                 if(SITEID != null ){
  //                     this.CreateEvtTable(SITEID)
  //                 }
  //             }, 2000);

  //             // 금일,금월 수익금
  //             getRevenueBySite(SITEID);

  //             // 금일, 금월 이벤트 현황
  //             getEventBySite(SITEID);

  //             // 날씨정보
  //             getWeatherStatus(SITEID)

  //             var list = getDIList(SITEID)[0];

  //             var pcslist = list.pcslist
  //             var bmswarning = list.bmswarninglist
  //             var bmsfault = list.bmsfaultlist

  //             if(this.topic != null){
  //                 this.client.unsubscribe(this.topic);

  //             }
  //             this.topic = 'hubbub/'+SITEID+'/+/AI';
  //             this.client.subscribe(this.topic, function (err) {

  //                 // 설비정보
  //                 $(".data_val").text('')
  //                 $(".data_val").val('')

  //                 // 목표출력 값 초기화
  //                 $("#diagram-actpwr1-1").text('')
  //                 $("#diagram-actpwr1-1").val('')

  //                 // 유효출력 값 초기화
  //                 $("#diagram-actpwr2-1").text('')
  //                 $("#diagram-actpwr2-1").val('')

  //                 // PV 발전량 값 초기화
  //                 $("#diagram-pv1").text('')
  //                 $("#diagram-pv1").val('')

  //                 if (err) {
  //                     console.log(err)
  //                 }
  //             })

  //             if(this.ditopic != null){
  //                 this.diclient.unsubscribe(this.ditopic)
  //             }
  //             this.ditopic = 'hubbub/'+SITEID+'/+/+/+';

  //             this.diclient.subscribe(this.ditopic,function(err) {

  //                 if(err) { console.log(err)}
  //             })

  //             // ai/di 값을 받음. 없으면 1번
  //             var devicenum = 1;
  //             this.$nuxt.$on('pcs_num', data => {
  //                 devicenum = data;
  //             })

  //             var pvfirst = 1, pvsecond = 2;
  //             var diviceid1 = "PV1" , diviceid2 = "PV2"
  //             this.$nuxt.$on('pv_num', data => {

  //                 if(data == 'first'){
  //                     pvfirst = 1; pvsecond = 2;
  //                     diviceid1 = "PV1" ;  diviceid2 = "PV2"
  //                 }else{
  //                     pvfirst = 3; pvsecond = 4;
  //                     diviceid1 = "PV3" ;  diviceid2 = "PV4"
  //                 }
  //             })

  //             var pcs = dCount[0].pcsCount
  //             var bms = dCount[0].bmsCount
  //             var pv = dCount[0].pvCount

  //             this.setdiagramUI(SITEID, pcs, pv)

  //             /*********** DI 포인트 바인딩 ***********/
  //             this.diclient.on('message', function(topic, message) {
  //                 var data = message.toString();
  //                 var dipoint = JSON.parse(message.toString());

  //                 var stat = ""

  //                     if(dipoint['ditype'] == 1 ){
  //                         // PCS 상태

  //                         var index = dipoint['deviceindex']
  //                         var controlstatus = dipoint['LOCALREMOTE'];

  //                         if(controlstatus == 0){
  //                             $("#controlstatus").attr('placeholder','PMS')
  //                             $("#controlstatus").attr('val','PMS')
  //                             $("#pcsao_AUTH").text('PMS')

  //                         }else{
  //                             $("#controlstatus").attr('placeholder','EMS')
  //                             $("#controlstatus").attr('val','EMS')
  //                             $("#pcsao_AUTH").text('EMS')
  //                         }

  //                         for(var i=1 ; i<= 4; i++){
  //                             if(i == dipoint['deviceindex']){
  //                                 var manualauto = dipoint['MANUALAUTO']
  //                                 if(manualauto == 0){
  //                                     $("#diagram-modestatus-"+i).val('수동')
  //                                 }else{
  //                                     $("#diagram-modestatus-"+i).val('자동')
  //                                 }
  //                             }

  //                         }

  //                         for(var i=1 ; i<= 4; i++){
  //                             if(i == dipoint['deviceindex']){
  //                                 var ac_cb = dipoint['AC_CB'];

  //                                 if(ac_cb == 0){
  //                                     $('#pcsao_AC_CB').text('OPEN')
  //                                     stat = '/images/contents/icon_MCCB_green.png';
  //                                 }else{
  //                                     $('#pcsao_AC_CB').text('CLOSE')
  //                                     stat = '/images/contents/icon_MCCB_red.png';
  //                                 }
  //                                 $("#diagram-ac-" + i).removeAttr('href')
  //                                 $("#diagram-ac-" + i).removeAttr("xlink:href")
  //                                 $("#diagram-ac-" + i).attr("href",stat)

  //                                 var dc_cb = dipoint['DC_CB'];
  //                                 if(dc_cb == 0){
  //                                     $('#pcsao_DC_CB').text('OPEN')
  //                                     stat = '/images/contents/icon_MCCB_green.png';
  //                                 }else{
  //                                     $('#pcsao_DC_CB').text('CLOSE')
  //                                     stat = '/images/contents/icon_MCCB_red.png';
  //                                 }
  //                                 $("#diagram-dc-" + i).removeAttr('href')
  //                                 $("#diagram-dc-" + i).removeAttr("xlink:href")
  //                                 $("#diagram-dc-" + i).attr("href",stat)
  //                             }

  //                         }

  //                         for(var i=1 ; i<= 4; i++){
  //                             if(i == dipoint['deviceindex']){
  //                                 var ac_cb = dipoint['AC_CB'];

  //                                 if(ac_cb == 0){
  //                                     $('#pcsao_AC_CB').text('OPEN')
  //                                     stat = '/images/contents/icon_MCCB_green.png';
  //                                 }else{
  //                                     $('#pcsao_AC_CB').text('CLOSE')
  //                                     stat = '/images/contents/icon_MCCB_red.png';
  //                                 }
  //                                 $("#diagram-ac-" + i).removeAttr('href')
  //                                 $("#diagram-ac-" + i).removeAttr("xlink:href")
  //                                 $("#diagram-ac-" + i).attr("href",stat)

  //                                 var dc_cb = dipoint['DC_CB'];
  //                                 if(dc_cb == 0){
  //                                     $('#pcsao_DC_CB').text('OPEN')
  //                                     stat = '/images/contents/icon_MCCB_green.png';
  //                                 }else{
  //                                     $('#pcsao_DC_CB').text('CLOSE')
  //                                     stat = '/images/contents/icon_MCCB_red.png';
  //                                 }
  //                                 $("#diagram-dc-" + i).removeAttr('href')
  //                                 $("#diagram-dc-" + i).removeAttr("xlink:href")
  //                                 $("#diagram-dc-" + i).attr("href",stat)
  //                             }

  //                         }

  //                         var ac_mc = dipoint['AC_MC'];
  //                         if(ac_mc == 0){
  //                             $('#pcsao_AC_MC').text('OPEN')
  //                         }else{

  //                             $('#pcsao_AC_MC').text('CLOSE')
  //                         }
  //                         var chg = dipoint['CHARGE']
  //                         if(chg == 0){
  //                             $('#pcsao_CHARGE').text('대기')
  //                         }else{
  //                             $('#pcsao_CHARGE').text('충전중')
  //                         }
  //                         var dcg = dipoint['DISCHARGE'];
  //                         if(dcg == 0){
  //                             $('#pcsao_DISCHARGE').text('대기')
  //                         }else{
  //                             $('#pcsao_DISCHARGE').text('방전중')
  //                         }
  //                         var fault = dipoint['FAULT'];
  //                         if(fault == 0){
  //                             $('#pcsao_FAULT').text('정상')
  //                         }else{
  //                             $('#pcsao_FAULT').text('비정상')
  //                         }
  //                         var run = dipoint['RUN'];
  //                         if(run == 0){
  //                             $('#pcsao_RUN').text('정지')
  //                         }else{
  //                             $('#pcsao_RUN').text('동작')
  //                         }

  //                         var standby = dipoint['STAND_BY']
  //                         if(standby == 0){
  //                             $('#pcsao_STANDBY').text('OFF')
  //                         }else{
  //                             $('#pcsao_STANDBY').text('ON')
  //                         }
  //                     }
  //                     else if(dipoint['ditype'] == 0){

  //                         if(dipoint['deviceindex'] == devicenum){

  //                             var key = Object.keys(dipoint)

  //                             if(dipoint['devicetype'] == 0){
  //                                 // PCS
  //                                 if(pcslist != undefined){
  //                                     pcslist.forEach((v,k)=> {
  //                                         var value = dipoint[Number(v.groupcode)]
  //                                         if(value != undefined){
  //                                             var r = (v.bitflag & value) == v.bitflag ? false : true
  //                                             if(r == true){
  //                                                 $("span[name='eventcode-" + k + "']").attr('class','ico_state')
  //                                             }else{
  //                                                 $("span[name='eventcode-" + k + "']").attr('class','ico_state ico_warning')
  //                                             }
  //                                         }
  //                                     })
  //                                 }
  //                             }
  //                             if(dipoint['devicetype'] == 1){
  //                             // BAT
  //                                 if(bmswarning != undefined){
  //                                     // WARNING
  //                                     bmswarning.forEach((v,k)=> {
  //                                         var value = dipoint[Number(v.groupcode)]

  //                                         if(value != undefined){
  //                                             var r = (v.bitflag & value) == v.bitflag ? false : true
  //                                             if(r == true){
  //                                                 $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state')
  //                                             }else{
  //                                                 $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state ico_warning')
  //                                             }
  //                                         }
  //                                     })
  //                                 }
  //                                 if(bmsfault != undefined){
  //                                     // FAULT
  //                                     bmsfault.forEach((v,k)=> {
  //                                         var value = dipoint[Number(v.groupcode)]
  //                                         if(value != undefined){
  //                                             var r = (v.bitflag & value) == v.bitflag ? false : true
  //                                             if(r == true){
  //                                                 $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state')
  //                                             }else{
  //                                                 $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state ico_warning')
  //                                             }
  //                                         }
  //                                     })
  //                                 }
  //                             }
  //                         }
  //                 }
  //             })
  //             // AI/DI 상세보기 장치별 AI 정보
  //             this.client.on('message', function (topic, message) {

  //                 var data = message.toString();
  //                 var tmp = JSON.parse(message.toString());
  //                 var siteID = tmp.siteId;
  //                 var tmpID = tmp.normalizedeviceid

  //                 if(tmp.groupname == "PCS_SYSTEM" && Number(siteID) == Number(SITEID)){

  //                     for(var i=1; i<= pcs; i++){
  //                         if(tmp.normalizedeviceid == "PCS" + devicenum){
  //                             // ai
  //                             var d = tmp;

  //                             $("#freq").text(Number(d.freq).toFixed(2));
  //                             $("#acGridVlt").text(Number(d.acGridVlt).toFixed(1));
  //                             $("#acGridCrtHigh").text(Number(d.acGridCrtHigh).toFixed(1));
  //                             $("#acGridCrtLow").text(Number(d.acGridCrtLow).toFixed(1));
  //                             $("#acGridPwr").text(Number(d.acGridPwr).toFixed(1));
  //                             $("#acGridVltR").text(Number(d.acGridVltR).toFixed(1));
  //                             $("#acGridVltS").text(Number(d.acGridVltS).toFixed(1));
  //                             $("#acGridVltT").text(Number(d.acGridVltT).toFixed(1));
  //                             $("#pwrFact").text((Number(d.pwrFact*100).toFixed(0)));
  //                             $("#acGridCrtR").text(Number(d.acGridCrtR).toFixed(1));
  //                             $("#acGridCrtS").text(Number(d.acGridCrtS).toFixed(1));
  //                             $("#acGridCrtT").text(Number(d.acGridCrtT).toFixed(1));
  //                             $("#actPwrKw").text(Number(d.actPwrKw).toFixed(1));
  //                             $("#rctPwrKw").text(Number(d.rctPwrKw).toFixed(1));
  //                         }

  //                         if(tmp.normalizedeviceid == "PCS"+i){
  //                             // 단선도
  //                             $("#diagram-actpwr1-"+i).val(Number(tmp['actPwrKw']).toFixed(1))
  //                             $("#diagram-actpwr2-"+i).val(Number(tmp['actPwrKw']).toFixed(1))
  //                         }
  //                     }
  //                 }
  //                 // soc, soh
  //                 if(tmp.groupname == "PCS_BATTERY" && siteID == SITEID){

  //                     //console.log(tmp)

  //                     for(var i=1; i<= bms; i++){
  //                         if(tmp.normalizedeviceid == "BMS"+i){

  //                             // 단선도
  //                             $("#diagram-soc"+i).val(Number(tmp.bms_soc).toFixed(1))
  //                             var soc = _setsoc($("#diagram-soc"+i).val())
  //                             var s = "/images/common/bat_B_" + soc + ".png"
  //                             $("#diagram-soc-" + i).removeAttr('href')
  //                             $("#diagram-soc-" + i).removeAttr("xlink:href")
  //                             $("#diagram-soc-" + i).attr("href",s)
  //                         }

  //                         if(tmp.normalizedeviceid == "BMS" + devicenum){
  //                             // ai
  //                             var d = tmp;

  //                             $("#bms_soc").text(Number(d.bms_soc).toFixed(1));
  //                             $("#bms_soh").text(Number(d.bms_soh).toFixed(1));
  //                             $("#dcCellVlt").text(Number(d.dcCellVlt).toFixed(1));
  //                             $("#dcCellCrt").text(Number(d.dcCellCrt).toFixed(1));
  //                             $("#dcCellPwr").text(Number(d.dcCellPwr).toFixed(1));
  //                             $("#dcCellVltMx").text(Number(d.dcCellVltMx).toFixed(1));
  //                             $("#dcCellVltMn").text(Number(d.dcCellVltMn).toFixed(1));
  //                             $("#dcCellTmpMx").text(Number(d.dcCellTmpMx).toFixed(1));
  //                             $("#dcCellTmpMn").text(Number(d.dcCellTmpMn).toFixed(1));
  //                             $("#minofsoc").text(Number(d.soc_min).toFixed(1));
  //                             $("#maxofsoc").text(Number(d.soc_max).toFixed(1));

  //                         }

  //                     }
  //                 }
  //                 // // pv
  //                 if(tmp.groupname == "PV_SYSTEM" && siteID == SITEID){

  //                     for(var i=1; i<= pv ; i++){

  //                          if(tmp.normalizedeviceid == "PV"+i){
  //                             // 단선도
  //                             $("#diagram-pv"+i).val(Number(tmp.TotalActivePower).toFixed(1))
  //                         }

  //                         if(i == pvfirst && tmp.deviceId == diviceid1) {
  //                             // ai
  //                             var d = tmp;

  //                             $("#TotalActivePower").text(Number(d.TotalActivePower).toFixed(1));
  //                             $("#TotalReactivePower").text(Number(d.TotalReactivePower).toFixed(1));
  //                             $("#ReverseActivePower").text(Number(d.ReverseActivePower).toFixed(1));
  //                             $("#ReverseReactivePower").text(Number(d.ReverseReactivePower).toFixed(1));

  //                             $("#vltR").text(Number(d.vltR).toFixed(1));
  //                             $("#vltS").text(Number(d.vltS).toFixed(1));
  //                             $("#vltT").text(Number(d.vltT).toFixed(1));

  //                             $("#crtR").text(Number(d.crtR).toFixed(1));
  //                             $("#crtS").text(Number(d.crtS).toFixed(1));
  //                             $("#crtT").text(Number(d.crtT).toFixed(1));

  //                             $("#EnergyTodayActivePower").text(Number(d.EnergyTodayActivePower).toFixed(1));
  //                             $("#EnergyTotalActivePower").text(Number(d.EnergyTotalActivePower).toFixed(1));
  //                             $("#EnergyTotalReactivePower").text(Number(d.EnergyTotalReactivePower).toFixed(1));
  //                             $("#EnergyTotalReverseActivePower").text(Number(d.EnergyTotalReverseActivePower).toFixed(1));

  //                         }

  //                         if(i == pvsecond && tmp.deviceId == diviceid2) {

  //                             // ai
  //                             var d = tmp;

  //                             $("#second-TotalActivePower").text(Number(d.TotalActivePower).toFixed(1));
  //                             $("#second-TotalReactivePower").text(Number(d.TotalReactivePower).toFixed(1));
  //                             $("#second-ReverseActivePower").text(Number(d.ReverseActivePower).toFixed(1));
  //                             $("#second-ReverseReactivePower").text(Number(d.ReverseReactivePower).toFixed(1));

  //                             $("#second-vltR").text(Number(d.vltR).toFixed(1));
  //                             $("#second-vltS").text(Number(d.vltS).toFixed(1));
  //                             $("#second-vltT").text(Number(d.vltT).toFixed(1));

  //                             $("#second-crtR").text(Number(d.crtR).toFixed(1));
  //                             $("#second-crtS").text(Number(d.crtS).toFixed(1));
  //                             $("#second-crtT").text(Number(d.crtT).toFixed(1));

  //                             $("#second-EnergyTodayActivePower").text(Number(d.EnergyTodayActivePower).toFixed(1));
  //                             $("#second-EnergyTotalActivePower").text(Number(d.EnergyTotalActivePower).toFixed(1));
  //                             $("#second-EnergyTotalReactivePower").text(Number(d.EnergyTotalReactivePower).toFixed(1));
  //                             $("#second-EnergyTotalReverseActivePower").text(Number(d.EnergyTotalReverseActivePower).toFixed(1));

  //                         }
  //                     }
  //                 }
  //             })
  //         }
  //         return true;
  //     },
  //     getfacility(siteid){
  //         var resp = getSiteInfo(siteid)
  //         if(resp == null || resp == undefined){
  //             return;
  //         }

  //         // 설치주소
  //         this.pvess_id = resp.address
  //         var f = resp.facility;

  //         // pv 설치용량
  //         this.installedPV = f.sumofpvcapacity
  //         $("#installedPV").text(comma(f.sumofpvcapacity)+"kWp")

  //         // pcs 설치용량
  //         this.installedPCS = f.sumofpcscapacity
  //         installedpcs = f.sumofpcscapacity
  //         $("#installedPCS").text(comma(f.sumofpcscapacity)+"kW")

  //         // ess 설치용량
  //         this.installedESS = f.sumofbmscapacity
  //         $("#installedESS").text(comma(f.sumofbmscapacity)+"kWh")

  //         // 설치일자
  //         this.installed_date = resp.registertimestamp.substring(0,11);

  //         var controlauth = resp.restrictsite
  //         if(controlauth == true){
  //             // 제어 막아야함 = 제어권한x
  //             $(".ctrl_PCS li>button").attr('disabled',"disabled")
  //         }else{
  //             // 제어 오픈 = 제어권한 o
  //             $(".ctrl_PCS li>button").removeAttr('disabled')
  //         }

  //         var dCount = []
  //         dCount.push({
  //             // pcs, bat, pv 대수
  //             siteId : resp.siteid,
  //             pcsCount : f.countofpcs,
  //             pvCount : f.countofpv,
  //             bmsCount : f.countofbms,
  //             installedpcs : f.sumofpcscapacity,
  //             installedpv : f.sumofpvcapacity
  //         })

  //         this.dCount = dCount;
  //         this.$nuxt.$emit('deviceCount',dCount);

  //         return dCount;
  //     },

  //     showAiDiInfo: function () {

  //         if(this.selectedSiteId == undefined || this.selectedSiteId == ""){
  //             errorpoup('자원을 선택하세요')
  //             //alertPop(1,1,'자원을 선택하세요.')
  //         }else{

  //             this.$nuxt.$emit('deviceInfo',this.dCount);
  //             $('#AIDI_info_modal').css('display','block')

  //         }
  //     },
  //     checkAuth(){
  //         // id 별 제어 권한 막기
  //         var token = getCookie('token')
  //         $.ajax({
  //             url: 'https://www.peiu.co.kr:3020/api/Hubbub/v1/controlcheck',
  //             contentType: "application/json",
  //             type: "get",
  //             async : false,
  //             headers: {
  //                 'Authorization': 'Bearer ' + token
  //             },
  //             success: function(resp,xhr){
  //                 $(".ctrl_PCS li>button").removeAttr('disabled')
  //             },
  //             error: function (jqXHR, textStatus, errorThrown) {
  //                 var msg;
  //                 console.log('[Error:]'+jqXHR.status)
  //                 $(".ctrl_PCS li>button").attr('disabled',"disabled")
  //             },
  //         });

  //         // 발전사업자 레벨(0)이면 거래사업자 선택 카테고리 삭제
  //         if(getCookie('userType') == 0 ){
  //             this.OptionList = [];
  //             var data = _ajax('i', 'owner', 'site');
  //             for(var i = 0; i< data.length; i++){
  //                 this.SiteList.push({
  //                     idx : i,
  //                     represenation : data[i].represenation,
  //                     siteid : data[i].siteid
  //                 })
  //             }
  //             $('#agg').hide();
  //         }else{
  //             this.OptionList = getUserSiteInfo();
  //             $('#agg').show();
  //         }

  //     }
  // },
  // beforeDestroy() {
  //     // if(this.client !=null){
  //     //     this.client.end();

  //     // }
  // },
  // mounted() {
  //     this.checkAuth();
  //     // 테이블 sort 기능
  //     $('table').tablesort();

  //     //메뉴 활성화
  //     document.getElementById('menu4').classList.add("active");

  //     // mqtt 초기화
  //     var mqtt = require('mqtt')
  //     this.client = mqtt.connect('wss://www.peiu.co.kr:9001/ws');
  //     this.diclient = mqtt.connect('wss://www.peiu.co.kr:9001/ws');

  //    // custom scroll
  //    new PerfectScrollbar('.fixed_tbl_wrap .tbl_error_info tbody');//커스텀 스크롤

  //     this.setdiagramUI(null,1,1);

  //     /* 팝업 test용 start */
  //     $("#pop_detail_show").on("click",function(){
  //         $("#popup_wrap").show();
  //     });
  //     $("#popup_wrap .pop_close").on("click",function(){
  //         $("#popup_wrap").hide();
  //         });

  //     /* 팝업 test용 end */

  //     //장애 이력 테이블 ack 처리
  //     $(document.body).delegate('#tbl_error button', 'click', function() {

  //         var id = $(this).attr('id')
  //         var ackId = id;
  //         var rDT = $(this).attr('value')
  //         if( rDT != "-"){
  //             // 확인 버튼을 누르면 ack 처리 넘김
  //             AckPop(4,2,'선택 항목을 Ack처리 하시겠습니까?',ackId)

  //         }
  //     })

  //     $nuxt.$on('reloadeventlist', data => {

  //         if(data == 'success'){
  //             this.CreateEvtTable(this.selectedSiteId)
  //         }
  //     })

  //     // execute after all content mounted
  // 	  this.$nextTick(function () {
  //         var _areaId = localStorage.getItem('areaControl_aggID');

  //         if(_areaId != null)
  //         {
  //             this.selectedaAggID = _areaId;
  //             this.getSiteId();
  //             this.selectedSiteId = localStorage.getItem('areaControl_ID')
  //             this.setUserAsset();

  //         }
  //         localStorage.removeItem('areaControl_aggID');
  //         localStorage.removeItem('areaControl_ID');

  //     })

  // },
};

let aggInfo;
let siteid;
let token;
let pcs;
let bms;
let pv;
var l;
var batlist_warning;
var batlist_fault;

import Cookies from "js-cookie";

function AckPop(icoTyp, btnTyp, alertCont, item) {
  var btnCont;
  var btnCancel;
  var result = "";
  btnCont = document.createElement("button");
  btnCont.setAttribute("class", "btn btn_size_free btn_color_blue");
  btnCont.onclick = function () {
    var req = "https://www.peiu.co.kr:3077/api/event/v1/ack";
    var send = { targetids: [item] };
    var token = Cookies.get("token");
    var data;
    var r;
    $.ajax({
      url: req,
      contentType: "application/json",
      type: "post",
      data: JSON.stringify(send),
      async: false,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (resp, xhr) {
        var tag = "[tr-id='" + item + "']";
        if (resp.Result.Code == 200) {
          $(tag).remove();
          console.log(tag + "success Ack");
          r = "success";
        } else {
          r = "fail";
          console.log(tag + "failed Ack");
        }
        $("#alert_wrap").remove();
        $nuxt.$emit("reloadeventlist", r);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg;
      },
    });
    return r;
  };
  var span = document.createElement("span");
  span.textContent = "확인";
  btnCont.append(span);

  btnCancel = document.createElement("button");
  btnCancel.setAttribute("class", "btn btn_size_free");
  btnCancel.onclick = function () {
    $("#alert_wrap").remove();
    result = "cancel";
  };
  var spancancel = document.createElement("span");
  spancancel.textContent = "취소";
  btnCancel.append(spancancel);

  var alertWrap = document.createElement("div");
  alertWrap.setAttribute("id", "alert_wrap");
  alertWrap.setAttribute("class", "alert_ico_typ" + icoTyp + " alert_btn_typ1");

  var alertdim = document.createElement("div");
  alertdim.setAttribute("class", "alert_dim");

  var alertbody = document.createElement("div");
  alertbody.setAttribute("class", "alert_body");

  var alerticon = document.createElement("div");
  alerticon.setAttribute("class", "alert_icon");

  var alerttxt = document.createElement("div");
  alerttxt.setAttribute("class", "alert_txt");
  alerttxt.textContent = alertCont;

  var alertbtn = document.createElement("div");
  alertbtn.setAttribute("class", "alert_btn_wrap");
  if (btnTyp == 2) {
    alertbtn.append(btnCont);
    alertbtn.append(btnCancel);
  }

  alertbody.append(alerticon);
  alertbody.append(alerttxt);
  alertbody.append(alertbtn);
  alertdim.append(alertbody);
  alertWrap.append(alertdim);
  $("#wrapper").append(alertWrap);
}

var interval;
var diagraminterval;
</script>
<style>
.newChartArea {
  margin-top: 15rem;
  width: 93rem;
  height: 60rem;
}
.cont-body {
  padding: 0 2.6rem;
  background-color: "#1A2031";
}

.info_weather {
  font-size: 1.4rem;
  color: #bfccdc;
  letter-spacing: -1px;
}

.state_info2 li + li {
  margin-left: 3.5rem;
}
.state_info2 li + li {
  margin-left: 2.5rem;
}
.state_info2 li dl dd .info2_txt + .info2_tit {
  position: relative;
  padding-left: 0.6rem;
  margin-left: 1.6rem;
}
.today_income {
  background: #66b6db;
}
#areCtrlChart {
  height: 33rem;
}

.control_list {
  display: none;
}
.pic_schematic_solar {
  display: none;
}
.schematic_area .btn_goStop.color_green {
  background-size: 100% 100%;
  display: none;
}
.modestatus {
  color: white;
  fill: white;
  font-size: 1.4rem;
}
</style>