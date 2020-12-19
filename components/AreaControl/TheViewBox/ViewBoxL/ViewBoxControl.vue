<template>
  <div class="set_box_wrap">
    <div class="set_box set_box_l">
      <dl>
        <dt>{{ $t("areaControl.selectDevice") }}</dt>
        <dd>
          <ul class="ctrl_PCS">
            <li class="checkAll">
              <button
                id="btn_pcs_all"
                onclick="selectdevice('all')"
                type="button"
                class="btn_set selectpcs"
              >
                <span>PCS ALL</span>
              </button>
            </li>
            <li>
              <button
                id="btn_pcs_1"
                onclick="selectdevice(1)"
                type="button"
                class="btn_set selectpcs"
              >
                <span>PCS 1</span>
              </button>
            </li>
            <!-- 활성화시에 is_active 클래스 추가 disabled일때는 disabled어트리뷰트 추가 -->
            <li>
              <button
                id="btn_pcs_2"
                onclick="selectdevice(2)"
                type="button"
                class="btn_set selectpcs"
              >
                <span>PCS 2</span>
              </button>
            </li>
            <li>
              <button
                id="btn_pcs_3"
                onclick="selectdevice(3)"
                type="button"
                class="btn_set selectpcs"
              >
                <span>PCS 3</span>
              </button>
            </li>
            <li>
              <button
                id="btn_pcs_4"
                onclick="selectdevice(4)"
                type="button"
                class="btn_set selectpcs"
              >
                <span>PCS 4</span>
              </button>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="set_box set_box_c">
      <dl>
        <dt>{{ $t("areaControl.control") }}</dt>
        <dd>
          <ul class="ctrl_PCS btn_ctrl">
            <li>
              <button type="button" class="btn_set">
                <span>{{ $t("areaControl.Mode1") }}</span>
              </button>
            </li>
            <li>
              <button type="button" class="btn_set">
                <span>{{ $t("areaControl.Mode2") }}</span>
              </button>
            </li>
            <!-- <li><button type="button" class="btn_set btn_error is_active"><span>비상정지</span></button></li> -->
            <li>
              <button
                id="btn_emergency"
                onclick="selectCtrl('emergency', '긴급정지')"
                type="button"
                class="btn_set btn_error"
              >
                <span>{{ $t("areaControl.emergency") }}</span>
              </button>
            </li>
            <li>
              <button
                id="btn_reset"
                onclick="selectCtrl('reset', 'RESET')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.reset") }}</span>
              </button>
            </li>
            <li>
              <button
                id="btn_auto"
                onclick="selectCtrl('auto', 'RESET')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.auto_mode") }}</span>
              </button>
            </li>
            <li>
              <button
                id="btn_manual"
                onclick="selectCtrl('manual', 'RESET')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.manual_mode") }}</span>
              </button>
            </li>
            <li class="set_input">
              <span class="input_txt_wrap outer_kw"
                ><input
                  @click="emptyamountfield()"
                  autocomplete="off"
                  type="text"
                  id="amountofchgdcg"
                  placeholder="충방전량"
                  class="input_txt"
              /></span>
            </li>
            <li>
              <button
                id="btn_run"
                onclick="selectCtrl('run', '운전')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.Run") }}</span>
              </button>
            </li>
            <li>
              <button
                id="btn_stop"
                onclick="selectCtrl('stop', '정지')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.stop") }}</span>
              </button>
            </li>
            <li>
              <button
                id="btn_chg"
                onclick="selectCtrl('chg', '충전')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.chg") }}</span>
              </button>
            </li>
            <li>
              <button
                id="btn_dcg"
                onclick="selectCtrl('dcg', '방전')"
                type="button"
                class="btn_set"
              >
                <span>{{ $t("areaControl.dcg") }}</span>
              </button>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="set_box set_box_r ctrl_PCS">
      <dl>
        <dt>{{ $t("areaControl.soc") }}</dt>
        <dd>
          <ul>
            <li class="set_input set_btn">
              <span class="input_txt_wrap outer_per"
                ><input
                  type="text"
                  autocomplete="off"
                  id="amountofsetmin"
                  placeholder="SET MIN"
                  class="input_txt"
              /></span>
              <button
                onclick="selectCtrl('setmin', '하한설정')"
                type="button"
                class="btn_set btn_size_mini"
              >
                <span>{{ $t("areaControl.SetMin") }}</span></button
              ><!-- 선택중일때 is_active클래스 추가 -->
            </li>
            <li class="set_input set_btn">
              <span class="input_txt_wrap outer_per"
                ><input
                  type="text"
                  autocomplete="off"
                  id="amountofsetmax"
                  placeholder="SET MAX"
                  class="input_txt"
              /></span>
              <button
                onclick="selectCtrl('setmax', '상한설정')"
                type="button"
                class="btn_set btn_size_mini"
              >
                <span>{{ $t("areaControl.SetMax") }}</span></button
              ><!-- 선택중일때 is_active클래스 추가 -->
            </li>
            <li class="set_input set_btn">
              <span class="input_txt_wrap"
                ><input
                  type="text"
                  autocomplete="off"
                  id="controlstatus"
                  class="input_txt"
                  readOnly
              /></span>
              <button
                onclick="selectCtrl('modify_control', '제어권 변경')"
                type="button"
                style="width: 6.5rem"
                class="btn_set btn_size_mini"
              >
                <span>제어권 변경</span>
              </button>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>