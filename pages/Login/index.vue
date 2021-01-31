<template>
  <div class="layer">
    <span class="content">
      <div class="login_wrap">
        <div class="login_body">
          <h1 class="login_logo">
            <img
              @click="autofilled()"
              src="/images/logo_login_top.png"
              alt="PEI U_TOC"
            />
            <div>[PEIU_TOC 플랫폼 회원전용 로그인 화면입니다.]</div>
          </h1>
          <div class="login_form">
            <input-text v-model="userId" placeholder="Email" />
            <input-text
              v-model="userPassword"
              placeholder="Password"
              v-on:keyup.13="Submit"
            />
            <div class="login_check">
              <input-checkbox id="loginCheck1" text="아이디 저장" />
              <input-checkbox id="loginCheck2" text="자동 로그인" is-right />
            </div>
            <div
              class="failLogin"
              style="text-align: left; color: #ec0037; font-weight: bold"
            >
              {{ error }}
            </div>
            <input-button @click="Submit()" label="로그인" />
            <div class="etc_link">
              <a
                onClick="location.href='https://www.peiu.co.kr:1010/register'"
                class="flL"
                >회원가입</a
              >
              <a @click="openPopup" class="flR">비밀번호를 잊으셨나요?</a>
            </div>
          </div>
        </div>
        <login-footer />
      </div>
    </span>
  </div>
</template>

<script>
import InputText from "@/components/common/Input/InputText";
import InputCheckbox from "@/components/common/Input/InputCheckbox";
import InputButton from "@/components/common/Input/InputButton";
import LoginFooter from "@/components/Login/LoginFooter";
export default {
  components: {
    InputText,
    InputCheckbox,
    InputButton,
    LoginFooter,
  },

  data() {
    return {
      username: "",
      selectedLang: "한국어",
      userId: "",
      userPassword: "",
      error: "",
      validateResult: false,
    };
  },
  head: {
    link: [{ rel: "stylesheet", href: "/css/login.css" }],
  },
  methods: {
    openPopup() {
      const popup = {
        iconTyp: 2,
        btnTyp: 2,
        msg: "비밀번호 초기화를 진행하시겠습니까?",
      };

      this.$nuxt.$emit("open:alertPopup", popup);
    },

    changeLanguage(val) {
      // $(".lang").removeClass('is_active')
      // $("#"+val).addClass('is_active')
      // this.$i18n.locale = val;
      // setCookie('lang', val);
    },
    autofilled() {
      this.userId = "power21@power21.co.kr";
      this.userPassword = "power211219/";
    },
    formValidateCheck() {
      // 이메일 유효성 체크
      var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!reg_email.test(this.userId) || !this.userId) {
        return false;
      } else {
        return true;
      }
    },
    async Submit() {
      //this.validateResult = await this.formValidateCheck();

      //   if (!this.validateResult) {
      //     this.error = "이메일 형식이 유효하지 않습니다.";
      //     return;
      //   }

      const data = {
        Email: this.userId.toLowerCase(),
        Password: this.userPassword,
        RememberMe: false,
      };

      //var result = await this.$Api.test(data);
      //console.log(result);
      //return;

      const result = await this.$Api.Login(data);
      if (result.status == 200) {
        await this.successLogin(result.data);
        // 리다이렉팅
      } else {
        if (err.responseText == "") {
          this.error = "로그인 서버 에러: 관리자 문의";
        } else {
          this.error = JSON.parse(err.responseText).result[
            "errors"
          ][0].description;
        }
      }
    },
    redirectByLevel(level) {
      switch (level) {
        // 설비운영
        case 0:
          return this.$router.push("areaControl");

        // 계통지리정보
        case 1:
          return this.$router.push("statusMap");

        // 메인
        case 2:
          return this.$router.push("main");

        // 관리자 페이지
        case 3:
          return this.$router.push("manage");

        // 통계/이력조회
        case 5:
          return this.$router.push("stat");
      }
    },

    async successLogin(data) {
      const resp = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIyNmJhY2NhLThkOWUtNGY0NS05MDc0LWU4MzZjMTZiNDNhMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLsnbTsnbjsnZEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rci93cy8yMDE5LzA5L2lkZW50aXR5L3JvbGVzL3N1cGVydmlzb3IiLCJTaXRlSWRzQnlSY2MiOiIxOjcxLDE6MTM4LDE6MjI3NDQyNzAwLDE6MTAyMDE0MjYwMywxOjExMjY0NjU2MDcsNDoxNjAsNDo2MjIyNDc3MTgsNDoxMzE2MTIyMDIwLDQ6MTMxNjEyMzMxNCw1OjEwNyw1OjEzNyw1OjYyMjI0MDM4Nyw2OjMsNjo5Nyw2OjE2Miw2OjEyMTYxMTM2OTMsNjoxMjE2MTEzNzAwLDY6MTIxNjExMzcxOSw2OjEyMTYxMTUxNzQsNzozMSw3OjMzLDc6MTIzLDc6MzIyMTMxNTU0LDc6MzMzODYzMjcwLDk6MSw5OjIsOToxMzYsOTo3MTAwNTE0NDAsOTo3MTAwNTM2OTgsOTo3MTAwNTQ3MjIsOToxNzE0NzIwNDk3LDk6MTcxNDcyMDUzMCwxMDo2MSwxMDoxMTksMTA6MTUwLDEwOjE2MSwxMDoxMzE2MTE4MDgwLDEwOjEzMTYxMjMzMDUsMTA6MTMxNjEyMzQyMSwxMDoxMzIxOTY1NDA0LDExOjksMTE6OTYsMTE6MTA0LDExOjE0NywxMToxNDgsMTE6MTQ5LDExOjUyNjMwNzIyOCwxMTo1MjYzMDczNzEsMTI6NTI2MzE1NzI3LDEzOjQyMjIwMzExOCwxMzo0MjIyMDMzNzgsMTM6NDIyMjAzNjI2LDEzOjQzMTA5MTAxNiwxNDo3MCwxNTo5NSwxNToxMTYsMTU6MTI5LDE1OjQyMjIwNjk5MCwxNTo5MTcxMDk5NzksMTY6NiIsImV4cCI6MTYzOTkwNTcwNSwiaXNzIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rciIsImF1ZCI6InBvd2VyMjFAcG93ZXIyMS5jby5rciJ9.P6ofkzvDMjSt3ldpGbzMwjeXthhTCE8y2bpwzafnyew",
        username: "allen",
        userType: 2,
        userId: "allen.cge",
      };
      this.$store.commit("setAuthLevel", resp.userType);
      this.$store.commit("setToken", resp.token);
      this.$store.commit("setUserName", resp.username);

      Promise.all([
        // 타입별 사이트 번호
        this.$store.commit('getOwnerSiteNum', 'rcc'),
        this.$Api.getOwnerSiteNum("rcc"),
        this.$Api.getOwnerSiteNum("agg"),
        this.$Api.getOwnerSiteNum("site"),

        // 타입별 설치용량
        this.$Api.getOwnerFaciility("rcc"),
        this.$Api.getOwnerFaciility("agg"),
        this.$Api.getOwnerFaciility("site"),
      ]).then((res) => {
        this.redirectByLevel(resp.userType);
      });
    },
  },
  mounted() {
    $(document).ready(function () {
      var loginBg = ["/images/bg_login1.jpg"];
      var bgIdx = parseInt(Math.random() * 10) % 1;
      $(".layer").css({
        background: "url(" + loginBg[bgIdx] + ") center center no-repeat",
        "background-size": "cover",
      });
    });
    $(document.body).delegate("#confirm", "click", function () {
      confirmAlert();
    });
    $(document.body).delegate("#cancel", "click", function () {
      $("#alert_wrap").remove();
    });

    $(document.body).delegate("._loginpopup", "click", function () {
      $("._loginpopup").remove();
    });
  },
};

function confirmAlert() {
  //얼럿 확인

  var email = $("#userEmail").val();
  var url =
    "https://www.peiu.co.kr:3020/api/auth/forgotpassword?Email=" + email;
  $.ajax({
    type: "get",
    url: url,
    contentType: "application/json",
    success: function (data) {
      alert("비밀번호를 초기화 합니다. 입력하신 이메일을 확인해주세요.");
      $("#alert_wrap").remove();
    },
    error: function (error) {
      // 에러메세지
      console.log(error);
    },
  });
}
</script>

<style>
.layer {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* font-size: 20px; */
}
.layer .content {
  display: inline-block;
  vertical-align: middle;
}
.layer .blank {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
</style>