<template>
  <!-- cont_body -->
  <div class="cont_body" style="background: #1a2031 !important">
    <!-- top_event_state_zone -->
    <div class="top_event_state_zone">
      <dl>
        <dt>
          {{ $t("locale.all") }}
          <span id="total_cnt" class="count">{{ total_cnt }}</span>
          <!-- <div class="top_message">확인요망</div> -->
        </dt>
        <dd>
          <ul>
            <li>
              <button
                id="0"
                @click="showRegionEvt(0, '전국')"
                type="button"
                class="area_name all_area"
              >
                <span class="hide">전국</span>
              </button>
            </li>
            <li>
              <button
                id="1"
                @click="showRegionEvt(1, '경기')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local4") }}
              </button>
            </li>
            <li>
              <button
                id="2"
                @click="showRegionEvt(2, '인천')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local3") }}
              </button>
            </li>
            <li>
              <button
                id="3"
                @click="showRegionEvt(3, '서울')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local1") }}
              </button>
            </li>
            <li>
              <button
                id="4"
                @click="showRegionEvt(4, '대전')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local7") }}
              </button>
            </li>
            <li>
              <button
                id="5"
                @click="showRegionEvt(5, '충남')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local5") }}
              </button>
            </li>
            <li>
              <button
                id="6"
                @click="showRegionEvt(6, '전북')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local10") }}
              </button>
            </li>
            <li>
              <button
                id="7"
                @click="showRegionEvt(7, '전남')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local2") }}
              </button>
            </li>
            <!-- 이벤트 발생이 없을경우 disabled -->
            <li>
              <button
                id="8"
                @click="showRegionEvt(8, '광주')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local9") }}
              </button>
            </li>
            <li>
              <button
                id="9"
                @click="showRegionEvt(9, '강원')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local6") }}
              </button>
            </li>
            <li>
              <button
                id="10"
                @click="showRegionEvt(10, '충북')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local8") }}
              </button>
            </li>
            <li>
              <button
                id="11"
                @click="showRegionEvt(11, '경북')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local14") }}
              </button>
            </li>
            <li>
              <button
                id="12"
                @click="showRegionEvt(12, '대구')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local11") }}
              </button>
            </li>
            <li>
              <button
                id="13"
                @click="showRegionEvt(13, '울산')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local12") }}
              </button>
            </li>
            <li>
              <button
                id="14"
                @click="showRegionEvt(14, '부산')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local15") }}
              </button>
            </li>
            <li>
              <button
                id="15"
                @click="showRegionEvt(15, '경남')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local13") }}
              </button>
            </li>
            <li>
              <button
                id="16"
                @click="showRegionEvt(16, '제주')"
                type="button"
                class="noevent area_name"
              >
                {{ $t("locale.local16") }}
              </button>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!--// top_event_state_zone -->
    <!-- top_event_info_tbl -->
    <div class="top_event_info_tbl">
      <dl>
        <dt>
          {{ $t("locale.selected") }} :
          <span id="Region" class="sel_area">{{ Region }}</span>
        </dt>
        <dd>
          <div class="fixed_tbl_wrap">
            <p class="tbl_topR_comment btn_comment">
              <button
                @click="SendAck()"
                type="button"
                class="btn btn_size_free btn_color_blue"
              >
                <span>ACK</span>
              </button>
            </p>
            <div class="tbl_wrap tbl_event_info">
              <table id="evt-table" border="0" cellpadding="0" cellspacing="0">
                <caption></caption>
                <colgroup>
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <input
                        @click="allEvtAck"
                        type="checkbox"
                        id="tbl_checkAll"
                        name="aaaa"
                        value=""
                        class="tbl_inner_check all_check"
                      />
                      <label for="tbl_checkAll"></label>
                    </th>
                    <th>{{ $t("manage.agg") }}</th>
                    <th>{{ $t("manage.area") }}</th>
                    <th>{{ $t("manage.site") }}</th>
                    <th>{{ $t("areaControl.Device") }}</th>
                    <th>{{ $t("areaControl.EventName") }}</th>
                    <th>{{ $t("areaControl.OccourTime") }}</th>
                    <th>{{ $t("areaControl.RecoveryTime") }}</th>
                    <th>{{ $t("areaControl.ShortCut") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="trmain"></tr>
                  <tr
                    v-for="v in evtList"
                    :key="v.idx"
                    :id="v.eventId"
                    :tr-id="v.trId"
                  >
                    <td>
                      <span
                        v-html="v.ckbtn"
                        :data-evt-id="v.eventId"
                        :id="v.eventId"
                        :value="v.eventId"
                      ></span>
                    </td>
                    <td>
                      <span>{{ v.aggName }}</span>
                    </td>
                    <td>
                      <span>{{ v.rcc }}</span>
                    </td>
                    <td>
                      <span>{{ v.siteId }}</span>
                    </td>
                    <td>
                      <span>{{ v.deviceId }}</span>
                    </td>
                    <td>
                      <span>{{ v.description }}</span>
                    </td>
                    <td>
                      <span>{{ v.createDT }}</span>
                    </td>
                    <td>
                      <span>{{ v.recoveryDT }}</span>
                    </td>
                    <td>
                      <span
                        v-on:click="hrefAreaCtrl($event, v.aggId, v.siteId)"
                        :id="v.aggId"
                        :value="v.siteId"
                        v-html="v.btn"
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </dd>
      </dl>
    </div>
    <!--// top_event_info_tbl -->
  </div>
  <!--// cont_body -->
</template>
<script>
var token;

const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticated",
  head: {
    link: [],
    script: [],
  },
  components: {},
  data() {
    return {
      total_cnt: 0,
      Rcc: "",
      Region: "없음",
      usertoken: null,
      evtList: [],
      table_headers: [],
      AllEventCount: 0,
      RegionEventCount: 0,
      activercc: 0,
      rccMapbysiteid: null,
    };
  },
  methods: {
    allEvtAck() {
      // 모든 항목 all check
      if ($("#tbl_checkAll").is(":checked")) {
        $("input[name=aaaa]").prop("checked", true);
      } else {
        $("input[name=aaaa]").prop("checked", false);
      }
    },
    SendAck() {
      // ack 처리 ..
      // 체크된 모든 tr id 값(고유 이벤트 아이디 가져오기)
      var items = [];
      $('input[name="aaaa"]:checkbox:checked').each(function () {
        if ($(this).attr("id") != "tbl_checkAll") {
          items.push($(this).attr("id"));
        }
      });

      // 확인 버튼을 누르면 ack 처리 넘김
      this.alertPop(4, 2, "선택 항목을 Ack처리 하시겠습니까?", items);
    },

    ajaxSendAck(data) {
      var token = Cookie.get("token");
      for (var i = 0; i < data.length; i++) {
        var req = "https://www.peiu.co.kr:3077/api/event/v1/ack";
        var send = { targetids: [data[i]] };
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
            var tag = "[tr-id='" + data[i] + "']";
            $(tag).removeClass("selected");
            if (resp.Result.Code == 200) {
              //$(tag).remove();
              console.log(tag + "success Ack");
            } else {
              console.log(tag + "failed Ack");
            }
            $("#alert_wrap").remove();
            $("input[name=aaaa]").prop("checked", false);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            var msg;
          },
        });
      }

      this.initPageStatus(this.activercc);
      // this.showRegionEvt(this.activercc)
    },
    showRegionEvt(rcc) {
      // 새로운 지역으로 이동할때마다 전체선택 체크박스 해제
      $("#tbl_checkAll").prop("checked", false);

      // 선택한 항목(파란박스) 모두 해제
      $("tbody tr").removeClass("selected");

      //$("input[id=tbl_checkAll]").prop("checked", false);

      this.activercc = rcc;
      //지역 이벤트 리스트(하단)
      this.getEventListByrcc(rcc);
    },
    getEventCountbyall() {
      var request = [];
      var rcc = 0;
      var request = [];

      // 상단 사이렌(복구 X)
      var resp = _ajax("e", "activeevent", "summary/rcc", null);
      this.getActiveEventbyrcc(resp);

      // ACK 조회 건이 없는 이벤트 갯수 조회
      resp = _ajax("e", "noackevent", "summary/rcc", null);

      this.getNoackEventbyrcc(rcc, resp);
    },
    alertPop(icoTyp, btnTyp, alertCont, senditem) {
      var btnCont;
      var btnCancel;
      var result = "";
      var isSuccessAck = "";
      btnCont = document.createElement("button");
      btnCont.setAttribute("class", "btn btn_size_free btn_color_blue");

      btnCont.onclick = function () {
        $("#alert_wrap").remove();
        $nuxt.$emit("forceAck", senditem);
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
      alertWrap.setAttribute(
        "class",
        "alert_ico_typ" + icoTyp + " alert_btn_typ1"
      );

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
    },
    hrefAreaCtrl(event, agg, siteId) {
      var siteid = siteId;
      var aggId = agg;

      if (aggId == null) {
        return;
      } else {
        localStorage.setItem("areaControl_ID", siteid);
        localStorage.setItem("areaControl_aggID", aggId);
        location.href = "/areaControl";
      }
    },
    getNoackEventbyrcc(rcc, resp) {
      if (resp == undefined) {
        console.log("전국 No ack 이벤트 건 조회 오류");
        return;
      }

      var noackevent = 0;
      for (var i = 0; i < resp.length; i++) {
        var d = resp[i];

        if (d.count > 0) {
          noackevent += d.count;
          $("#" + d.rcc).text(RccList[d.rcc] + "(" + d.count + ")");
        } else {
          $("#" + d.rcc).text(RccList[d.rcc]);
        }
      }
      if (rcc == 0) {
        this.total_cnt = noackevent;
      }
    },
    getActiveEventbyrcc(resp) {
      if (resp == undefined) {
        console.log("미복구 이벤트 건 조회 오류");
        return;
      }
      // 사이렌
      for (var i = 0; i < 17; i++) {
        // 모든 사이렌 비활성화

        if ($("#" + i + 1).hasClass("noevent") == false) {
          $("#" + i + 1).addClass("noevent");
        }
      }
      for (var i = 0; i < resp.length; i++) {
        var d = resp[i];
        var r = $("#" + d.rcc);
        r.removeClass("noevent");
        if (d.count > 0) {
          // 미복구 이벤트 있음.
          //rcccount++;
        } else {
          // 미복구 이벤트 없음.
          r.addClass("noevent");
        }
      }
    },
    initPageStatus(rcc) {
      // 전국 사이렌 발생 지역 카운트, 사이렌, 하단 숫자
      this.getEventCountbyall();

      //  지역 이벤트 리스트(하단)
      this.getEventListByrcc(rcc);
    },
    getEventListByrcc(rcc) {
      //  지역 이벤트 리스트(하단)
      this.evtList = [];
      var request = [];

      var item =
        " where " + _wherecondition("rcc", rcc, null) + " and   Ackts is null";

      var query =
        "SELECT *" + " FROM mysql.peiuoperation.`vwEventRecord` " + item;
      var data = _query(query);
      var count = 0;

      if (data == undefined) {
        this.Region = RccList[rcc] + "";
        return;
      } else {
        this.Region = RccList[rcc] + "(" + data.length + " 건)";
      }

      for (var i = 0; i < data.length; i++) {
        var evt = data[i];

        if (evt.createts == null) {
          var createts = "";
        } else {
          var createts = evt.createts.replace(/\T/g, " ");
        }

        if (evt.Recoveryts == null) {
          var recoveryts = "-";
        } else {
          var recoveryts = evt.Recoveryts.replace(/\T/g, " ");
        }

        if (evt.Ackts == null) {
          var ackts = "-";
        } else {
          var ackts = evt.Ackts.replace(/\T/g, " ");
        }

        var eventid = evt.EventRecordId;

        this.evtList.push({
          trId: eventid,
          idx: i,
          rcc: RccList[this.rccMapbysiteid.get(String(evt.SiteId))],
          eventId: eventid,
          aggName: evt.AggName,
          deviceId: devicecode[evt.DeviceType] + evt.DeviceIndex,
          description: evt.Name,
          createDT: createts,
          recoveryDT: recoveryts,
          ackDT: ackts,
          siteId: evt.SiteId,
          aggId: evt.AggGroupId,
          ckbtn:
            "<input type='checkbox' name='aaaa' data-evt-id='" +
            eventid +
            "' id='" +
            eventid +
            "' class='tbl_inner_check'><label for='tbl_check0'></label>",
          btn:
            "<button type='button' class='btn btn_tbl_inner btn_management'><span class='hide'>계정관리</span></button>",
        });
      }
    },
    getHashMapbysiteid() {
      this.rccMapbysiteid = new HashMap();
      var d = _ajax("i", "simpleowner", "rcc");
      for (var i = 0; i < d.length; i++) {
        var site = d[i].sitelist;
        for (var j = 0; j < site.length; j++) {
          this.rccMapbysiteid.set(String(site[j]), String(d[i].rcc));
        }
      }
    },
  },
  layout: "common",
  mounted() {
    $("table").tablesort();

    // 메뉴 활성화
    document.getElementById("menu12").classList.add("active");

    // 커스텀 스크롤 활성화
    new PerfectScrollbar(".fixed_tbl_wrap .tbl_event_info tbody"); //커스텀 스크롤

    // siteid-rcc hashmap 생성
    this.getHashMapbysiteid();

    // 동적으로 추가된 tr에 대해서 클릭, 체크박스 이벤트
    $(document.body).delegate("#evt-table tr", "click", function () {
      var id = $(this).attr("id");
      var checked = $(this).hasClass("selected");
      if (checked == false) {
        // 선택한 tr 클래스 추가
        $(this).addClass("selected");
        // 체크박스에 체크 추가
        $("input:checkbox[data-evt-id='" + id + "']").prop("checked", true);
      } else {
        // 선택되어있던 경우 클래스 제거
        $(this).removeClass("selected");

        // 체크박스 체크 해제
        $("input:checkbox[data-evt-id='" + id + "']").prop("checked", false);
      }
    });

    $nuxt.$on("forceAck", (data) => {
      console.log(data);
      this.ajaxSendAck(data);
    });

    this.$nextTick(function () {
      // 전국 이벤트 가져오기(한번만 실행)
      this.initPageStatus(0);

      // 메인페이지에서 유입된 경우 해당지역 이벤트 로드
      var _rcc = localStorage.getItem("MainAreaEvtNum");
      if (_rcc != null) {
        this.initPageStatus(_rcc);
        localStorage.removeItem("MainAreaEvtNum");
      }
    });
  },
};
</script>
<style>
.top_message {
  padding-top: 4.2rem;
  font-size: 1.4rem;
  line-height: 2.8rem;
}
.noevent {
  color: #d0dcf7 !important;
  background: url(/images/contents/ico_event_normal.png) center top no-repeat !important;
  background-size: 4.2rem 4.2rem !important;
}
</style>
	