<template>
  <div id="collectormanagement" class="componentofmenu market_record_wrap">
    <div
      class="admin_section"
      style="float: left; width: 15%; margin-right: 5rem"
    >
      <ul id="tree">
        <li>
          <a href="#"
            ><span class="tit" style="font-size: 1.55rem !important"
              >기본 정보</span
            ></a
          >
          <ul>
            <li>
              <span
                @click="showcomponent('system', 'info')"
                class="txt subtitle"
                style="font-size: 1.45rem !important; font-weight: bold"
                >장치 현황</span
              >
            </li>
            <li>
              <span
                @click="showcomponent('system', 'log')"
                class="txt subtitle"
                style="font-size: 1.45rem !important; font-weight: bold"
                >시스템 로그</span
              >
            </li>
          </ul>
        </li>
        <li>
          <a href="#"
            ><span class="tit" style="font-size: 1.55rem !important"
              >관리</span
            ></a
          >
          <ul>
            <li>
              <span
                class="txt subtitle"
                @click="showcomponent('setting', 'init')"
                style="font-size: 1.45rem !important; font-weight: bold"
                >전력수집장치 관리</span
              >
            </li>
            <li>
              <a href="#"
                ><span
                  class="txt subtitle"
                  @click="showcomponent('setting', 'mapping')"
                  style="font-size: 1.45rem !important; font-weight: bold"
                  >맵핑 포인트 그룹 관리</span
                ></a
              >
              <ul>
                <li>
                  <span @click="showbtncomponent('digital')" class="txt second"
                    >디지털 포인트 설정(DI)</span
                  >
                </li>
                <li>
                  <span @click="showbtncomponent('di')" class="txt second"
                    >상태 포인트 설정(DI)</span
                  >
                </li>
                <li>
                  <span @click="showbtncomponent('ai')" class="txt second"
                    >아날로그 포인트 설정(AI)</span
                  >
                </li>
                <li>
                  <span @click="showbtncomponent('aodo')" class="txt second"
                    >외부 제어 포인트 설정(AO/DO)</span
                  >
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#"
            ><span class="tit" style="font-size: 1.55rem !important"
              >기타 설정</span
            ></a
          >
          <ul>
            <li>
              <span
                @click="showcomponent('etc', 'backup')"
                class="txt subtitle"
                style="font-size: 1.45rem !important; font-weight: bold"
                >설정 백업/복구</span
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div
      class="admin_section"
      style="
        float: left;
        width: 68%;
        margin-right: 5rem;
        margin-top: 0rem !important;
      "
    >
      <collector1 />
      <collector2 />

      <div class="etc">
        <div class="chapter etc_backup">
          <ul>
            <li><span class="tit"></span></li>
            <li>
              <span class="tit"
                ><button type="button" class="btn btn_sel">
                  <span>설정 파일 백업</span>
                </button></span
              ><span class="txt"
                >모든 설정을 설정파일로 저장하여 PC로 다운로드합니다. <br />PC에
                저장된 설정 파일은 설정 복구시 사용됩니다.</span
              >
            </li>
            <li><span class="tit"></span></li>
            <li>
              <span class="tit"
                ><button type="button" class="btn btn_sel">
                  <span>설정 파일 복구</span>
                </button></span
              ><span class="txt"
                >PC로 저장해준 설정 파일을 이용해 설정을 복구합니다.</span
              >
            </li>
            <li><span class="tit"></span></li>
            <li>
              <span class="tit"
                ><button type="button" class="btn btn_sel">
                  <span>초기 설정 복원</span>
                </button></span
              ><span class="txt"
                >시스템의 모든 설정이 초기화 된 후 다시 시작됩니다.</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collector1 from "~/components/Collector/collector1.vue";
import collector2 from "~/components/Collector/collector2.vue";
export default {
  components: {
    collector1,
    collector2,
  },
  data() {
    return {};
  },
  methods: {
    showbtncomponent(v1) {
      $(".selBox_zone_l_btn > button").removeClass("is_active");
      $("#btn_" + v1).addClass("is_active");
      $(".btn_component").hide();
      $("." + v1 + "_setting").show();

      $(".system").hide();
      $(".setting_init").hide();
      $(".setting_mapping").hide();

      if (v1 == "connect" || v1 == "etc" || v1 == "backup") {
        $(".setting_init").show();
      } else {
        $(".setting_mapping").show();
      }

      this.$nuxt.$emit("btn_value", v1);
      //setting_init
      //setting_mapping
    },
    showcomponent(v1, v2) {
      // 하위메뉴가 없는 메뉴 선택시

      // 기본정보 컴포넌트 hide
      $(".system").show();

      $(".btn_component").hide();

      // 기타설정 컴포넌트 hide
      $(".etc").hide();

      $(".chapter").hide();

      // 선택한 컴포넌트 show
      $("." + v1 + "_" + v2).show();

      if (v2 == "init") {
        // 기본설정
        this.showbtncomponent("connect");
      } else if (v2 == "mapping") {
        // 맵핑 포인트 그룹관리 클릭시 디지털 포인트 설정 버튼 활성화
        this.showbtncomponent("digital");
      }
    },
  },
  mounted() {
    var MenuTree = {
      collapse: function (element) {
        element.slideToggle(600);
      },

      walk: function () {
        $("a", "#tree").each(function () {
          var $a = $(this);
          var $li = $a.parent();
          if ($a.next().is("ul")) {
            var $ul = $a.next();
            $a.click(function (e) {
              e.preventDefault();
              MenuTree.collapse($ul);
              $a.toggleClass("active");
            });
          }
        });
      },
    };
    MenuTree.walk();
    this.showcomponent("system", "info");

    var $btn_option_control = $(
      ".input_option_control_wrap .btn_option_control"
    );
    $btn_option_control.on("click", function () {
      var optionVal = Number(
        $(this).closest(".input_option_control_wrap").find("input").val()
      );
      if ($(this).hasClass("control_up")) {
        $(this)
          .closest(".input_option_control_wrap")
          .find("input")
          .val(optionVal + 1);
      } else {
        $(this)
          .closest(".input_option_control_wrap")
          .find("input")
          .val(optionVal - 1);
      }
    });
  },
};
</script>

<style>
.second {
  line-height: 3rem;
}
#tree {
  margin: 2em 0 0 0em;
  width: 26em;
}

#tree > li {
  padding-bottom: 3px;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #ccc;
}

#tree li > a {
  color: #000;
  text-decoration: none;
}

#tree li > a:before {
  content: "+";
  padding-right: 4px;
  font-weight: bold;
  color: white;
}

#tree li > a.active:before {
  content: "-";
  padding-right: 4px;
  font-weight: bold;
}

#tree li ul {
  margin: 1.5em 0 0.5em 2em;
  /* display: none; */
}
.sitemange {
  font-family: "NanumBarunGothic";
  font-size: 3.7rem !important;
  line-height: 3.5rem !important;
}

.tit {
  display: inline-block;
  width: 26.5rem;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: bold;
  vertical-align: middle;
}

.txt {
  display: inline-block;
  font-size: 1.5rem;
  color: #d0dcf7;
  vertical-align: middle;
}

#ai_point_tbl {
  position: relative;
  width: 123rem;
  height: 46.4rem;
  overflow: auto;
}

.switch {
  cursor: pointer;
}
.switch input {
  display: none;
}
.switch input + span {
  width: 48px;
  height: 28px;
  border-radius: 14px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  display: block;
  position: relative;
  background: #ff4651;
  box-shadow: 0 8px 16px -1px rgba(255, 70, 81, 0.2);
}
.switch input + span:before,
.switch input + span:after {
  content: "";
  display: block;
  position: absolute;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.switch input + span:before {
  top: 5px;
  left: 5px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 5px solid #fff;
  box-sizing: border-box;
}
.switch input + span:after {
  top: 5px;
  left: 32px;
  width: 6px;
  height: 18px;
  border-radius: 40%;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  background: #fff;
  opacity: 0;
}
.switch input + span:active {
  -webkit-transform: scale(0.92);
  transform: scale(0.92);
}
.switch input:checked + span {
  background: #48ea8b;
  box-shadow: 0 8px 16px -1px rgba(72, 234, 139, 0.2);
}
.switch input:checked + span:before {
  width: 0px;
  border-radius: 3px;
  margin-left: 27px;
  border-width: 3px;
  background: #fff;
}
.switch input:checked + span:after {
  -webkit-animation: blobChecked 0.35s linear forwards 0.2s;
  animation: blobChecked 0.35s linear forwards 0.2s;
}
.switch input:not(:checked) + span:before {
  -webkit-animation: blob 0.85s linear forwards 0.2s;
  animation: blob 0.85s linear forwards 0.2s;
}

@-webkit-keyframes blob {
  0%,
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  30% {
    -webkit-transform: scale(1.12, 0.94);
    transform: scale(1.12, 0.94);
  }
  60% {
    -webkit-transform: scale(0.96, 1.06);
    transform: scale(0.96, 1.06);
  }
}

@keyframes blob {
  0%,
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  30% {
    -webkit-transform: scale(1.12, 0.94);
    transform: scale(1.12, 0.94);
  }
  60% {
    -webkit-transform: scale(0.96, 1.06);
    transform: scale(0.96, 1.06);
  }
}
@-webkit-keyframes blobChecked {
  0% {
    opacity: 1;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  30% {
    -webkit-transform: scaleX(1.44);
    transform: scaleX(1.44);
  }
  70% {
    -webkit-transform: scaleX(1.18);
    transform: scaleX(1.18);
  }
  50%,
  99% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 0;
  }
}
@keyframes blobChecked {
  0% {
    opacity: 1;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  30% {
    -webkit-transform: scaleX(1.44);
    transform: scaleX(1.44);
  }
  70% {
    -webkit-transform: scaleX(1.18);
    transform: scaleX(1.18);
  }
  50%,
  99% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 0;
  }
}

/* 
* {
  box-sizing: border-box;
}
*:before, *:after {
  box-sizing: border-box;
} */
</style>