<template >
  <div id="header">
    <nav class="gnb_wrap">
      <a @click="clickMenu('/main', '메인페이지')" class="top_logo"></a>
      <div class="gnb">
        <ul class="page_move">
          <li><a href="javascript:history.back(-1)" class="btn_prev"></a></li>
          <li><a href="javascript:history.go(1)" class="btn_next"></a></li>
        </ul>
        <a
          @click="clickMenu('/main', '메인페이지')"
          id="gnav-main"
          class="home"
        >
          <span></span>
        </a>
        <ul>
          <li id="menu_gismap">
            <a @click="clickMenu('/statusMap', '계통지리정보')">
              <span>{{ $t("menu.statusMap") }}</span>
            </a>
          </li>
          <!-- <li id="menu1.1">
						<a @click="clickMenu('/statusMap','계통지리정보')">
							<span>{{$t("menu.statusMap")}}</span>
						</a>
					</li>-->
          <li id="menu4">
            <a @click="clickMenu('/areaControl', '설비운영')">
              <span>{{ $t("menu.areaCtrl") }}</span>
            </a>
          </li>

          <!-- <li id="menu5" class="th1">
					<a @click="clickMenu('/analysis', '계통해석')">
						<span>{{$t("menu.menu4")}}</span>
					</a>
					</li> -->
          <li id="menu6">
            <a @click="clickMenu('/prediction', '예측')">
              <span>{{ $t("menu.predict") }}</span>
            </a>
          </li>
          <!-- <li id="menu7" class="th1">
						<a @click="clickMenu('/ecoAnalysisNew', '경제성 분석')" id="menu7" class="menuStyle btnCursor">
							<span>{{$t("menu.menu6")}}</span>
						</a>
					</li>  -->

          <li id="menu8">
            <a
              @click="clickMenu('/stat', '통계/이력조회')"
              id="menu8"
              class="menuStyle btnCursor"
            >
              <span>{{ $t("menu.stat-his") }}</span>
            </a>
          </li>
          <!-- <li >
						<a @click="clickMenu('/history', '이력조회')" id="menu9" class="menuStyle btnCursor">
							<span>{{$t("menu.menu8")}}</span>
						</a>
					</li>  -->
          <li id="menu11">
            <a
              @click="clickMenu('/market', '마켓')"
              class="menuStyle btnCursor"
            >
              <span>{{ $t("menu.market") }}</span>
            </a>
          </li>
          <li id="menu12">
            <a
              @click="clickMenu('/SearchEvent', '이벤트')"
              id="menu12"
              class="menuStyle btnCursor"
            >
              <span>{{ $t("menu.event") }}</span>
            </a>
          </li>
          <li id="menu14">
            <a
              @click="clickMenu('/report', '보고서')"
              id="menu14"
              class="menuStyle btnCursor"
            >
              <span>{{ $t("menu.report") }}</span>
            </a>
          </li>
          <!--고객관리-->
          <li id="menu15" class="th1">
            <a href="/manage" id="menu15" class="menuStyle btnCursor">
              <span>{{ $t("menu.manage") }}</span>
            </a>
          </li>
        </ul>
      </div>
      <ul>
        <!-- <li id="menu3" class="menuStyle btnCursor">
					<a @click="clickMenu('/lineDiagram','계통도')" id="gnav-lineDiagram" class="th1">
						<span>{{$t("menu.menu2")}}</span>
					</a>
				</li> -->

        <!-- 메뉴활성화:active -->
        <!-- <li v-if="menu1"><a href="/" id="gnav-main" class="th1"><span>메인페이지</span></a></li> -->
        <!-- <li v-if="menu1"><a href="/statusMap" id="gnav-line" class="th1"><span> {{$t("menu.menu0")}} </span></a></li> -->
        <li v-if="menu2">
          <a href="/regionStatus" id="gnav-region" class="th1">
            <!-- <span>{{$t("menu.menu1")}}</span> -->
          </a>
        </li>
        <!-- <li v-if="menu3"><a href="/lineDiagram" id="gnav-lineDiagram" class="th1"><span>{{$t("menu.menu2")}}</span></a></li> -->
        <!-- <li v-if="menu4"><a href="/areaControl" id="gnav-areaControl" class="th1"><span> {{$t("menu.menu3")}} </span></a></li>					 -->
        <!-- <li v-if="menu5"><a href="/analysis" id="gnav-analysis" class="th1"><span> {{$t("menu.menu4")}} </span></a></li>					 -->
        <!-- <li v-if="menu6"><a href="/prediction" id="gnav-forcast" class="th1"><span> {{$t("menu.menu5")}} </span></a></li> -->
        <!-- <li v-if="menu7"><a href="/ecoAnalysis" id="gnav-ecoReport" class="th1"><span> {{$t("menu.menu6")}} </span></a></li> -->
        <!-- <li v-if="menu8"><a href="stat" id="gnav-stat" class="th1"><span> {{$t("menu.menu7")}} </span></a></li> -->
        <!-- <li v-if="menu9"><a href="history" id="gnav-his" class="th1"><span> {{$t("menu.menu8")}} </span></a></li> -->
        <li v-if="menu10">
          <a href="/portal" id="gnav-portal" class="th1">
            <!-- <span>{{$t("menu.menu9")}}</span> -->
          </a>
        </li>

        <!-- <li id="menuPortlCustomer" class="menuStyle btnCursor">
					<a href="/portalCustomer" id="gnav-portal" class="th1">
						<span>개인포탈</span>
					</a>
				</li> -->
        <!-- <li v-if="menu11"><a href="/market2" id="gnav-market" class="th1"><span> {{$t("menu.menu10")}} </span></a></li>  -->
      </ul>
    </nav>
    <div class="header_info_wrap">
      <div class="weather_info">
        <ul>
          <li style="padding-left: 0.8rem">
            <marquee
              width="77rem;"
              loop="-1"
              direction="left"
              style="color: #bfccdc; font-size: 1.3rem"
              ><li>{{ user }}</li></marquee
            >
          </li>
          <li style="padding-left: 0.8rem">
            <select
              @change="changeLanguage($event)"
              class="sel sel_size1 language"
            >
              <option value="kr">KOR</option>
              <option value="en">ENG</option>
            </select>
          </li>
          <li class="weather_info1" id="ctrl_temp">
            <span>{{ ctrl_temp }}</span
            >℃
          </li>
          <li class="weather_info2" id="ctrl_hum">
            <span>{{ ctrl_hum }}</span
            >%
          </li>
          <li class="weather_info3" id="ctrl_cloud">
            <span>{{ ctrl_cloud }}</span
            >%
          </li>
        </ul>
      </div>
      <div class="set_info">
        <ul>
          <li>
            <a href="/setting" class="set_info1"
              ><span class="hide">설정</span></a
            >
          </li>
          <!-- 비활성화시 a태그에 is_disable 클래스 추가 -->
          <li>
            <a href="#" class="set_info2" @click="logout()"> </a>
          </li>
          <!-- 비활성화시 a태그에 is_disable 클래스 추가 -->
        </ul>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
.language {
  width: 10rem;
}
.menuStyle {
  display: none;
}
body {
  font-family: "Noto Sans KR", sans-serif;
}
</style>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
const cookieparser = require("cookieparser");
let shiftPressed = false;
export default {
  layout: "globalMenu",
  head: {
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap",
      },
    ],
  },
  data() {
    return {
      user: "",
      ctrl_temp: "",
      ctrl_hum: "",
      ctrl_cloud: "",
      lang: "ko",
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
      menu7: false,
      menu8: false,
      menu9: false,
      menu10: false,
      menu11: false,
      menu12: false,
      menu13: false,
      menu14: false,
      isRoot: false,
      url_log_menu: process.env.url_log_menu,
      url_log_func: process.env.url_log_func,
    };
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    //console.log("beforeMounted - globalMenu");
    //this.checkAuth();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    //console.log("beforeRouteEnter - globalMenu");
  },
  beforeRouteLeave(to, from, next) {
    // ...
    //console.log("beforeRouteLeave - globalMenu");
  },
  updated() {
    //console.log("updated - globalMenu");
    this.checkAuth();
  },
  methods: {
    changeLanguage(e, value) {
      if (e != null) {
        var e = event.target.value;
        this.lang = e;
      } else {
        this.lang = value;
      }

      this.$i18n.locale = this.lang;
      setCookie("lang", this.lang);
    },

    checkAuth: function () {
      var auth = Cookie.get("userType");
      var gridid = Cookie.get("userId");

      if (auth == 3) {
        // 관리자(manager@power21.co.kr 인 경우)
        $("#gnav-main").css("display", "none");
        $("#menu_gismap").css("display", "none");
        $("#menu4").css("display", "none");
        $("#menu6").css("display", "none");
        $("#menu8").css("display", "none");
        $("#menu11").css("display", "none");
        $("#menu12").css("display", "none");
        $("#menu14").css("display", "none");
        // location.href='/manage'
        return;
      }

      // 그리드 안정화 테스트
      if (gridid == "c02@google.co.kr") {
        $("#gnav-main").css("display", "none");
        $("#menu_gismap").css("display", "none");
        $("#menu6").css("display", "none");
        $("#menu11").css("display", "none");
        $("#menu15").css("display", "none");
        return;
      }

      if (auth != 2) {
        $("#gnav-main").css("display", "none");
        $("#menu5").css("display", "none");
        $("#menu7").css("display", "none");
        $("#menu11").css("display", "none");
      }
    },
    setLangs: function (data) {
      location.href = this.$route.fullPath;
    },
    loadSVG: function (selector, url) {
      var target = document.querySelector(selector);
      // If SVG is supported
      if (typeof SVGRect != "undefined") {
        // Request the SVG file
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        ajax.send();

        // Append the SVG to the target
        ajax.onload = function (e) {
          target.innerHTML = ajax.responseText;
          target.children[0].setAttribute("height", "1.45rem");
          target.children[0].setAttribute("width", "1.45rem");
        };
      } else {
        // Fallback to png
        target.innerHTML = "<img src='" + url + ".png' />";
      }
    },
    logout: function () {
      console.log("logout");
      var token = Cookie.get("token");
      location.href = "/";
      var url = "https://www.peiu.co.kr:3020/api/auth/logout";
      $.ajax({
        url: url,
        type: "put",
        headers: {
          Authorization: "Bearer " + this.usertoken,
        },
        success: function (data, textStatus, jqXHR) {
          console.log("success Logout");
        },
        error: function (jqXHR, textStatus, errorThrown) {},
      });
      Cookie.remove("token");
      Cookie.remove("username");
      Cookie.remove("userId");
      Cookie.remove("userType");
      Cookie.remove("lang");
    },

    clickMenu: function (addr, menuname) {
      if (shiftPressed == true) {
        // shift key pressed == create new tab
        var newTab = window.open("https://www.peiu.co.kr" + addr, "_blank");
        newTab.focus();
      } else {
        //
        var username = Cookie.get("UserName");
        addr = addr.substr(1);
        location.href = "/" + addr;
        //this.writeLog(addr, menuname, username);
      }
    },

    writeLog: function (addr, menuname, username) {
      // var url =
      // 	this.url_log_menu + "?username=" + username + "&menuname=" + menuname;
      // $.ajax({
      // 	url: url,
      // 	type: "put",
      // 	timeout: 1000,
      // 	success: function (data, textStatus, jqXHR) {
      // 		if (textStatus != "success") {
      // 			// alert("로그 작성 실패");
      // 		} else {
      // 			location.href = "/" + this.addr;
      // 		}
      // 	},
      // 	addr: addr,
      // 	error: function (jqXHR, textStatus, errorThrown) {
      // 		// alert("통신에러, 로그 작성 서버 통신 실패");
      // 		location.href = "/" + this.addr;
      // 	}
      // });
    },
    setCtrlCenterData() {
      var resp = _ajax("i", "currentweather", "site", null, 0);
      if (resp == undefined) {
        return;
      }
      resp = resp[0];

      this.ctrl_temp = Number(resp.temp).toFixed(0);
      this.ctrl_hum = resp.humidity;
      this.ctrl_cloud = resp.clouds;
    },
  },
  mounted() {
    this.checkAuth();

    document.onkeydown = KeyPress;
    document.onkeyup = KeyPressedUp;

    // get controll center Weather Data
    this.setCtrlCenterData();

    // execute after all content mounted
    this.$nextTick(function () {
      this.changeLanguage(null, "kr");
      // this.lang = getCookie('lang');
      // this.$i18n.locale = this.lang;
      // $('.language').val(this.lang).prop('selected', true);
    });

    this.user =
      getCookie("username") + "( " + getCookie("userId") + ")님, 환영합니다.";
    // 고객명, 레벨
    //$("#user").text(getCookie('username')+'( power21@power21.co.kr '+getCookie('userType')+')')
  },
};
let timeout;
function KeyPress(e) {
  var path = window.location.pathname;
  var evtobj = window.event ? event : e;
  if (path == "/main") {
    if (evtobj.ctrlKey) {
      // show menu
      $("#header").animate({ top: "0rem" });
      // hide after 5 second
      timeout = setTimeout(function () {
        $("#header").animate({ top: "-5.9rem" });
      }, 5000);
    }

    if (evtobj.shiftKey) {
      shiftPressed = true;
    }
  }
}
function KeyPressedUp(e) {
  var evt = window.event ? event : e;

  if (evt.key == "Shift") {
    shiftPressed = false;
  }
}
</script>
