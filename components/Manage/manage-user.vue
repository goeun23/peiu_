<template>
  <div id="usermanagement" class="componentofmenu market_record_wrap">
    <!-- top_selBox_zone -->
    <div class="top_selBox_zone alR">
      <div class="btn_sel_wrap">
        <div class="top_selBox_zone">
          <span style="padding-right: 12rem">
            <input
              @click="getdata(null)"
              value="null"
              type="radio"
              name="selRadio"
              id="selRadio1"
              class="selBox_radio"
            />
            <label for="selRadio1">
              <div style="padding-left: 0.5rem" class="btn_sel_wrap">
                <dl style="width: 4rem">
                  <dt style="line-height: 2rem">{{ $t("manage.all") }}</dt>
                </dl>
              </div>
            </label>
          </span>
          <span style="padding-right: 12rem">
            <input
              @click="getdata(1)"
              value="1"
              type="radio"
              name="selRadio"
              id="selRadio2"
              class="selBox_radio"
            />
            <label for="selRadio2">
              <div style="padding-left: 0.5rem" class="btn_sel_wrap">
                <dl style="width: 4rem">
                  <dt style="line-height: 2rem">
                    {{ $t("manage.auth_approval") }}
                  </dt>
                </dl>
              </div>
            </label>
          </span>
          <span style="padding-right: 12rem">
            <input
              @click="getdata(0)"
              value="0"
              type="radio"
              name="selRadio"
              id="selRadio3"
              class="selBox_radio"
            />
            <label for="selRadio3">
              <div
                style="width: 10rem; padding-left: 0.5rem"
                class="btn_sel_wrap"
              >
                <dl style="width: 5rem">
                  <dt style="line-height: 2rem">
                    {{ $t("manage.auth_disapproval") }}
                  </dt>
                </dl>
              </div>
            </label>
          </span>
        </div>
      </div>
    </div>
    <div class="fixed_tbl_wrap">
      <div class="tbl_wrap tbl_event_info">
        <table border="0" cellpadding="0" cellspacing="0" summary="">
          <colgroup></colgroup>
          <thead>
            <tr>
              <th style="width: 10rem !important">{{ $t("manage.number") }}</th>
              <th style="width: 10rem !important">{{ $t("manage.name") }}</th>
              <th style="width: 20rem !important">{{ $t("manage.id") }}</th>
              <th style="width: 15rem !important">{{ $t("manage.tel") }}</th>
              <th style="width: 45rem !important">
                {{ $t("manage.address") }}
              </th>
              <th style="width: 15rem !important">
                {{ $t("manage.companyname") }}
              </th>
              <th style="width: 10rem !important">
                {{ $t("manage.registdate") }}
              </th>
              <th style="width: 10rem !important">
                {{ $t("manage.expiredate") }}
              </th>
              <th style="width: 10rem !important">
                {{ $t("manage.auth_approval") }}
              </th>
              <th style="width: 15rem !important">{{ $t("manage.level") }}</th>
              <th style="width: 14rem !important">{{ $t("manage.manage") }}</th>
            </tr>
          </thead>
          <tbody class="tableScrollbar">
            <tr v-for="v in bodycomponent" :key="v.idx">
              <td style="width: 10rem !important">{{ v.idx }}</td>
              <td style="width: 10rem !important">{{ v.data1 }}</td>
              <td style="width: 20rem !important">{{ v.data2 }}</td>
              <td style="width: 15rem !important">{{ v.data3 }}</td>
              <td style="width: 45rem !important">{{ v.data4 }}</td>
              <td style="width: 15rem !important">{{ v.data5 }}</td>
              <td style="width: 10rem !important">{{ v.data6 }}</td>
              <td style="width: 10rem !important">{{ v.data7 }}</td>
              <td style="width: 10rem !important">{{ v.data8 }}</td>
              <td style="width: 15rem !important">{{ v.data9 }}</td>
              <td
                style="width: 14rem !important"
                @click="popupopen(v.idx)"
                v-html="v.data10"
              >
                {{ v.data10 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="popup_wrap" class="layer_popup" style="display: none">
      <div class="layer_dim">
        <div class="pop_body">
          <div class="pop_head">
            <ul>
              <li>
                <button type="button" class="btn_pop_tit is_active">
                  <span>Profile</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="pop_cont">
            <!-- cont1 -->
            <div class="cont1">
              <div class="tbl_wrap">
                <p class="tbl_topR_comment">
                  <span class="required">필수 입력</span>
                </p>
                <table border="0" cellpadding="0" cellspacing="0" summary="">
                  <caption></caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <span class="tbl_th">{{ $t("manage.name") }}</span>
                      </th>
                      <td>
                        <span class="tbl_td"
                          ><input
                            type="text"
                            id="username"
                            name=""
                            value=""
                            class="pop_input"
                            disabled
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{ $t("manage.id") }}</span>
                      </th>
                      <td>
                        <span class="tbl_td"
                          ><input
                            type="text"
                            id="email"
                            name=""
                            value=""
                            class="pop_input"
                            disabled
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{
                          $t("manage.companyname")
                        }}</span>
                      </th>
                      <td>
                        <span class="tbl_td"
                          ><input
                            type="text"
                            id="company"
                            name=""
                            value=""
                            class="pop_input"
                            disabled
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{ $t("manage.level") }}</span>
                      </th>
                      <td>
                        <span class="tbl_td inner_search"
                          ><input
                            type="text"
                            id="authtype"
                            class="pop_input"
                            disabled
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{
                          $t("manage.registdate")
                        }}</span>
                      </th>
                      <td>
                        <span class="tbl_td inner_search"
                          ><input
                            type="text"
                            id="regist"
                            class="pop_input"
                            disabled
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{
                          $t("manage.expiredate")
                        }}</span>
                      </th>
                      <td>
                        <span class="tbl_td inner_search">
                          <input
                            type="text"
                            id="expire"
                            class="pop_input"
                            style="width: 13rem; margin-right: 1rem"
                          />
                          <div class="alR">
                            <button
                              style="right: 0rem"
                              id="done"
                              type="button"
                              @click="setexpire('done')"
                              class="setexpire btn btn_size_free"
                            >
                              <span>즉시 만료</span>
                            </button>
                          </div>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{ $t("manage.address") }}</span>
                      </th>
                      <td>
                        <span class="tbl_td inner_search"
                          ><input
                            type="text"
                            id="seladdress"
                            class="pop_input" />
                          <button
                            @click="DaumPostcode()"
                            type="button"
                            class="btn btn_search"
                          ></button
                        ></span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{ $t("manage.tel") }}</span>
                      </th>
                      <td>
                        <span class="tbl_td"
                          ><input type="text" id="seltel" class="pop_input"
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <th><span class="tbl_th">사업자등록증</span></th>
                      <td>
                        <button
                          type="button"
                          @click="downloadcompanydoc()"
                          class="btn btn_size_free btn_color_blue"
                        >
                          <span>{{ $t("manage.download") }}</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span class="tbl_th">{{
                          $t("manage.auth_approval")
                        }}</span>
                      </th>
                      <td>
                        <div class="switch_zone_l"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="btn_wrap alR">
                <button
                  @click="save()"
                  type="button"
                  class="btn btn_size_free btn_color_blue"
                >
                  <span>{{ $t("manage.save") }}</span>
                </button>
                <button type="button" class="btn btn_size_free">
                  <span>{{ $t("manage.close") }}</span>
                </button>
              </div>
            </div>
            <!--// cont1 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headcomponent: [],
      bodycomponent: [],
      status: "",
      auth: {
        0: "발전사업자",
        1: "중개거래사업자",
        2: "운영자",
        3: "계정관리자",
      },
      confirm: {
        true: "승인",
        false: "미승인",
      },
      approval: "land",
      disapproval: "island",
      popupuserid: "",
      setexpireperiod: null,
      expiredate: "",
    };
  },
  methods: {
    downloadcompanydoc() {
      var url =
        "https://www.peiu.co.kr:3020/api/information/v1/download/registdocument/" +
        this.popupuserid;
      var token = getCookie("token");

      downloadFile(url);

      function downloadFile(urlToSend, filename) {
        var req = new XMLHttpRequest();
        var filename = "";
        req.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            filename = req.getResponseHeader("filename");
          }
        };

        req.open("GET", urlToSend, true);
        req.setRequestHeader("Authorization", "Bearer " + token);
        req.responseType = "blob";

        req.onload = function (event) {
          var blob = req.response;
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        };
        req.send();
      }
    },
    setexpire(p) {
      if ($("#" + p).hasClass("btn_color_blue")) {
        $("#" + p).removeClass("btn_color_blue");
        this.setexpireperiod = null;
        $("#expire").val(this.expiredate);
        return;
      }

      $(".setexpire").removeClass("btn_color_blue");
      $("#" + p).addClass("btn_color_blue");
      this.setexpireperiod = p;

      var d = $("#expire").val();

      // 만료일자 부분 텍스트 변경
      if (p == "1m") {
        $("#expire").val(d, nextMonth(1));
      } else if (p == "6m") {
        $("#expire").val(d, nextMonth(6));
      } else if (p == "1y") {
        $("#expire").val(d, nextYear(1));
      } else {
        // 즉시만료 : 금일
        $("#expire").val("");
      }
    },
    DaumPostcode(_num) {
      new daum.Postcode({
        oncomplete: function (data) {
          var addr = "";
          if (data.userSelectedType === "R") {
            // 도로명 주소를 선택했을 경우
            //addr = data.roadAddress;
            addr = data.jibunAddress;
          } else {
            //지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
            // 위도, 경도 검색을 위해 지번 주소로 통일
          }
          // 주소 정형화
          var newadd = addressFormating(addr);

          // 주소
          $("#seladdress").val(newadd);
        },
      }).open();
    },
    save() {
      // 승인 여부(미승인-> 승인 요청 한 경우)
      var result = $("#correctbtn").val();

      if (result == this.approval) {
        this.userMangement(this.popupuserid, "confirm");
      }

      // 고객정보 수정 요청
      this.userMangement(this.popupuserid, "modify");
      if (this.setexpireperiod == "done") {
        // 즉시 만료
        this.userMangement(this.popupuserid, "now");
      } else {
        // 기간단위 만료
        this.userMangement(this.popupuserid, "setexpire");
      }
    },
    userMangement(id, type) {
      // confirm

      var url = "https://www.peiu.co.kr:3077/api/manage/v1/account/" + type;
      switch (type) {
        case "confirm":
          url += "/" + id;
          break;
        case "setexpire":
          url += "/date/" + id + "/" + $("#expire").val();
          break;
        case "now":
          var url =
            "https://www.peiu.co.kr:3077/api/manage/v1/account/setexpire/now/" +
            id;
          break;

        default:
          break;
      }

      var token = Cookies.get("token");

      if (type == "modify") {
        // 고객정보 변경
        // 전화번호, 주소 유효성 체크
        // 전화번호 형식에 맞지 않는 경우를 체크
        var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
        if (!regExp.test(String($("#seltel").val()))) {
          alert("잘못된 연락처 입니다.");
          return;
        }

        var modifyjson = {
          address: String($("#seladdress").val()),
          id: String(this.popupuserid),
          phonenumber: String($("#seltel").val()),
        };

        $.ajax({
          url: url,
          type: "put",
          data: JSON.stringify(modifyjson),
          timeout: 60000,
          headers: {
            Authorization: "Bearer " + token,
          },
          contentType: "application/json",
          success: function (data) {
            if (data.Result.Code == 200) {
              errorpoup("고객정보 변경 성공");
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            errorpoup("고객정보 변경 실패");
          },
        });
      } else {
        $.ajax({
          url: url,
          type: "put",
          timeout: 60000,
          headers: {
            Authorization: "Bearer " + token,
          },
          contentType: "application/json",
          success: function (data) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
          },
        });
      }

      this.getdata(null);
    },
    getdata(v) {
      // null : 전체
      // 1 : 승인
      // 0 : 미승인
      var etc = "";
      switch (v) {
        case null:
          break;
        case 1:
          etc = " where SignInConfirm = 1";
          break;
        case 0:
          etc = " where SignInConfirm = 0";
          break;
        default:
          break;
      }
      this.headcomponent = [];
      var tbl = [
        "순서",
        "고객명",
        "아이디",
        "연락처",
        "주소",
        "회사명",
        "등록일",
        "만료일",
        "승인여부",
        "권한",
        "수정",
      ];
      for (var i = 0; i < tbl.length; i++) {
        this.headcomponent.push({
          idx: i,
          title: tbl[i],
        });
      }

      var q =
        "SELECT UserName,PhoneNumber, Id, FirstName, LastName, CompanyName, Address, to_char(RegistDate, 'YYYY-MM-dd') as RegistDate, to_char(Expire, 'YYYY-MM-dd') as Expire, SignInConfirm, UserType FROM mysql.peiu_account.`UserAccounts` " +
        etc;
      var userlist = _query(q);

      this.bodycomponent = [];

      for (var i = 0; i < userlist.length; i++) {
        var d = userlist[i];
        this.bodycomponent.push({
          idx: i + 1,
          data1: d.FirstName,
          data2: d.UserName,
          data3: d.PhoneNumber,
          data4: d.Address,
          data5: d.CompanyName,
          data6: d.RegistDate,
          data7: d.Expire,
          data8: this.confirm[String(d.SignInConfirm)],
          data9: this.auth[String(d.UserType)],
          data10:
            "<button type='button' class='btn btn_tbl_inner'><span>수정</span></button>",
          data11: d.Id,
          data12:
            "<button type='button' class='btn btn_tbl_inner'><span>다운로드</span></button>",
        });
      }
    },
    popupopen(idx) {
      var s, result;
      var user = this.bodycomponent[idx - 1];
      // 클릭한 고객 정보로 팝업 생성

      // 클릭한 고객의 고유 id
      this.popupuserid = user["data11"];

      $(".switch_zone_l").empty();

      if (user["data8"] == "승인") {
        // 이미 승인된 유저이므로 토글X
        $(".switch_zone_l").append("<span class='aa tbl_th'>승인</span>");
      } else {
        // 미승인 유저이므로 승인 가능하도록 토글생성
        $(".switch_zone_l").append(
          "<button id='correctbtn' type='button' class='iscorrect_switch_land_island on_island'><span></span></button>"
        );

        // 기본 상태 세팅(디폴트 : 미승인)

        var s = "island";
        $("#correctbtn").on("click", function () {
          // 상태 토글
          if (s == "island") {
            s = "land";
          } else {
            s = "island";
          }

          var btn = $(".iscorrect_switch_land_island");
          btn.removeClass("on_land");
          btn.removeClass("on_island");
          btn.addClass("on_" + s);
          btn.val(s);

          //승인 여부 값
          //result = $('#correctbtn').val()
        });
      }

      // 고객명
      $("#username").val(user["data1"]);
      // 이메일
      $("#email").val(user["data2"]);
      // 회사명
      $("#company").val(user["data5"]);
      // 주소
      $("#seladdress").val(user["data4"]);
      // 연락처
      $("#seltel").val(user["data3"]);
      // 권한
      $("#authtype").val(user["data9"]);
      // 등록일
      $("#regist").val(user["data6"]);
      // 만료일
      $("#expire").val(user["data7"]);
      this.expiredate = user["data7"];

      // 팝업 오픈
      $("#popup_wrap").css("display", "block");
    },
  },
  mounted() {
    // 라디오 버튼중 '전체' 선택 활성화
    $("input:radio[name='selRadio']:radio[value='null']").prop("checked", true);
    this.getdata(null);
    new PerfectScrollbar("tbody");
    $("#expire").datepicker();

    $(".btn_management").on("click", function () {
      $("#popup_wrap").css("display", "block");
    });

    $(".btn_search").on("click", function () {
      $("#popup_wrap2").css("display", "block");
    });

    $(".layer_popup .btn_wrap .btn").on("click", function () {
      $(this).closest(".layer_popup").css("display", "none");
    });

    $(".iscorrect_switch_land_island").on("click", function () {
      //육지, 제주 선택 스위치
      if ($(this).hasClass("on_land")) {
        $(this).removeClass("on_land").addClass("on_island");
        $(this).val("미승인");
      } else {
        $(this).removeClass("on_island").addClass("on_land");
        $(this).val("승인");
      }
    });
  },
};
</script>