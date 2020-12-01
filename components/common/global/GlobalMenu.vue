<template >
  <div id="header">
    <nav class="gnb_wrap">
      <a class="top_logo"></a>
      <div class="gnb">
        <ul class="page_move">
          <li><a href="javascript:history.back(-1)" class="btn_prev"></a></li>
          <li><a href="javascript:history.go(1)" class="btn_next"></a></li>
        </ul>
        <ul>
          <li>
            <a v-if="containMain" id="gnav-main" class="home"></a>
          </li>
          <li v-for="(item, index) in menuList" :id="item.id" :key="index">
            <a class="menuStyle btnCursor" :href="item.href">
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>
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
            <a href="#" class="set_info2" @click="logout()"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      containMain: false,
      menu_gismap: {
        id: "menu_gismap",
        href: "/statusMap",
        text: "계통지리정보",
      },
      menu4: { id: "menu4", href: "/areaControl", text: "설비운영" },
      menu6: { id: "menu6", href: "/prediction", text: "예측" },
      menu8: { id: "menu8", href: "/stat", text: "통계/이력조회" },
      menu11: { id: "menu11", href: "/market", text: "마켓" },
      menu12: { id: "menu12", href: "/SearchEvent", text: "이벤트" },
      menu14: { id: "menu14", href: "/report", text: "보고서" },
      menu15: { id: "menu15", href: "/manage", text: "관리자전용" },
      menuList: [],
      user: "",
      ctrl_temp: "",
      ctrl_hum: "",
      ctrl_cloud: "",
      level: 0,
    };
  },
  methods: {
    changeLanguage(e, value) {
      if (value == undefined) {
        // 셀렉트 박스 선택으로 들어온 경우
        if (e != null) {
          this.lang = e.target.value;
        } else if (e == null) {
          this.lang = "kr";
        }
      } else {
        //mounted 이후 진입한 경우

        if (value == null) {
          this.lang = "kr";
        } else {
          this.lang = value;
        }
      }
      $(".language").val(this.lang);
      this.$i18n.locale = this.lang;

      setCookie("lang", this.lang);
      // if(e != null){
      // 	var e = event.target.value;
      // 	this.lang = e
      // }
      // else{
      // 	this.lang = value;
      // }

      // $(".language").val(value)
      // this.$i18n.locale = this.lang;
      // setCookie('lang', this.lang);
    },
    logout: function () {
      var token = Cookie.get("token");
      location.href = "/";
      var url = "https://www.peiu.co.kr:3020/api/auth/logout";
      $.ajax({
        url: url,
        type: "put",
        headers: {
          Authorization: "Bearer " + token,
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
    checkAuth() {
      this.level = getCookie("userType");
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
    setList(level) {
      var menu = [];

      // 2레벨만 메인페이지 노출
      if (level == 2) {
        this.containMain = true;
      } else {
        this.containMain = false;
      }

      // 레벨별 페이지 노출
      switch (level) {
        case 3:
          return (menu = [this.menu15]);
          break;
        case 5:
          return (menu = [this.menu8]);
          break;
        case 2:
          return (menu = [
            this.menu_gismap,
            this.menu4,
            this.menu6,
            this.menu8,
            this.menu11,
            this.menu12,
            this.menu14,
            this.menu15,
          ]);
          break;
        case 1:
          return (menu = [
            this.menu_gismap,
            this.menu4,
            this.menu6,
            this.menu8,
            this.menu12,
            this.menu14,
          ]);
          break;
        case 0:
          return (menu = [
            this.menu4,
            this.menu6,
            this.menu8,
            this.menu12,
            this.menu14,
          ]);
          break;
        default:
          break;
      }
    },
    setMenuList() {
      const level = 2;
      this.menuList = this.setList(level);
    },
  },
  created() {
    this.setMenuList();
  },
  beforeMount() {
    //this.checkAuth();
    //this.setMenuList();
  },
  mounted() {
    // this.changeLanguage(null, getCookie('lang'))
    // this.checkAuth();
    // this.setCtrlCenterData();
    // this.user = getCookie('username')+'( '+getCookie('userId')+')님, 환영합니다.'
  },
};
</script>
<style>
.language {
  width: 10rem !important;
}
</style>