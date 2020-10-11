<template>
    <div class="cont-body">
      <div class="top_selBox_zone">
            <div class="selBox_zone_l">
                <div class="selBox_zone_l_sel">
                    <div class="sel_set_wrap">
                        <select id='agg' v-model="selectedaAggID" @change='getSiteId($event)' class="sel sel_size1">
                            <option value="">{{$t("areaControl.customer")}}</option>
                            <option v-for="v in OptionList" :key='v.idx' :value='v.id'>{{v.value}}</option>
                        </select>
                        
                    </div>
                    <div  class="sel_set_wrap">
                        <select id='selSite' v-model="selectedSiteId" @change="setUserAsset($event)" style="width:22.5rem;" class="sel sel_size1">
                            <option value="site" selected="selected" disabled>{{$t("areaControl.sites")}}</option>
                            <option v-for="v in SiteList" :key='v.idx' :value='v.siteid'>{{v.represenation}} ({{v.siteid}})</option>
                        </select>
                    </div>
                   
                </div>
                <div class="selBox_zone_l_btn">
                    <button type="button" class="btn btn_size_free btn_color_blue" @click="showAiDiInfo()">
                        <span>{{ $t('areaControl.AI/DI') }}</span>
                    </button>
                </div>
            </div>
            <div class="selBox_zone_r">
                <ul class="state_info2">
                    <li class="ico_day">
                        <dl>
                            <dt>{{ $t('areaControl.daily') }}</dt>
                            <dd>
                                <span class="info2_tit">{{ $t('areaControl.pv') }} : </span>
                                <span id="daily-accum-pv" class="info2_txt">{{dailyPv}}</span>

                               
                                <span class="info2_tit">{{ $t('areaControl.chg') }} : </span>
                                <span id="daily-accum-chg" class="info2_txt">{{dailyChg}}</span>


                                <span class="info2_tit">{{ $t('areaControl.dcg') }} : </span>
                                 <span id="daily-accum-dcg" class="info2_txt">{{dailyDcg}}</span>



                                <span class="info2_unit">({{ $t('areaControl.unit') }} : kWh)</span>
                            </dd>
                        </dl>
                    </li>
                    <li class="ico_month">
                        <dl>
                            <dt>{{ $t('areaControl.monthly') }}</dt>
                            <dd>
                                <span class="info2_tit">{{ $t('areaControl.pv') }} : </span>
                                <span id="monthly-accum-pv" class="info2_txt"></span>

                                <span class="info2_tit">{{ $t('areaControl.chg') }} : </span>
                                <span id="monthly-accum-chg" class="info2_txt"></span>


                                <span class="info2_tit">{{ $t('areaControl.dcg') }} : </span>
                                <span id="monthly-accum-dcg" class="info2_txt"></span>


                                <span class="info2_unit">({{ $t('areaControl.unit') }} : MWh)</span>
                            </dd>
                        </dl>
                    </li>
                    <li class="ico_month">
                        <dl>
                            <dd>
                                <span class="info2_tit"><img src='/images/common/ico_weather_info1.png'/></span>
                                <span id="weather-Temp" class="info2_txt">-</span>
                                <span class="info2_tit"><img src='/images/common/ico_weather_info2.png'/></span>
                                <span id="weather-Humidity" class="info2_txt">-</span>
                                <span class="info2_tit"><img src='/images/common/ico_weather_info3.png'/></span>
                                <span id="weather-Clouds" class="info2_txt">-</span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class='view_box_wrap1'>
            
            <div class='view_box_left'>
                <!-- <area-ctrl-diagram/> 
                <jeju-diagram/>-->
                <!-- schematic_area  ***listL_type1 listR_type1****-->
                <div id="diagram_img" class="schematic_area" style="">
                    <dl :class="countofdiagram ">  
                        <dd>
                        <ul class="list_pcs">
                            <!-- 1 -->
                            <li name='info1'>
                                <ul class="control_list">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_pcs"></div>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_goStop color_red"></button>
                                        <div class="pic_schematic_bat">
                                            <div class="pic_schematic_bat_cont">
                                                <span class="pic_schematic_bat_gauge"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <dl class="info_data">
                                    <dt>1</dt>
                                    <dd>
                                        <ul>
                                            <li><span class="tit">목표</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr1-1" type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">유효</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr2-1"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">SOC</span><span class="input_txt_wrap inner_per"><input id="diagram-soc1"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">모드</span><span class="input_txt_wrap "><input id="diagram-modestatus-1" type="text" class="input_txt" readonly  /></span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </li>
                            <!--// 1 -->
                            <!-- 2 -->
                            <li name='info2'>
                                <ul class="control_list">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_pcs"></div>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_bat">
                                            <div class="pic_schematic_bat_cont">
                                                <span class="pic_schematic_bat_gauge"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <dl class="info_data">
                                    <dt>2</dt>
                                    <dd>
                                        <ul>
                                            <li><span class="tit">목표</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr1-2" type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">유효</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr2-2"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">SOC</span><span class="input_txt_wrap inner_per"><input id="diagram-soc2"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">모드</span><span class="input_txt_wrap "><input id="diagram-modestatus-2" type="text" class="input_txt" readonly  /></span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </li>
                            <!--// 2 -->
                            <!-- 3 -->
                            <li name='info3'>
                                <ul class="control_list">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_pcs"></div>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_bat">
                                            <div class="pic_schematic_bat_cont">
                                                <span class="pic_schematic_bat_gauge"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <dl class="info_data">
                                    <dt>3</dt>
                                    <dd>
                                        <ul>
                                            <li><span class="tit">목표</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr1-3" type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">유효</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr2-3"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">SOC</span><span class="input_txt_wrap inner_per"><input id="diagram-soc3"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">모드</span><span class="input_txt_wrap "><input id="diagram-modestatus-3" type="text" class="input_txt" readonly  /></span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </li>
                            <!--// 3 -->
                            <!-- 4 -->
                            <li name='info4'>
                                <ul class="control_list">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_pcs"></div>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_bat">
                                            <div class="pic_schematic_bat_cont">
                                                <span class="pic_schematic_bat_gauge"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <dl class="info_data">
                                    <dt>4</dt>
                                    <dd>
                                        <ul>
                                              <li><span class="tit">목표</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr1-4" type="text" class="input_txt"  readonly /></span></li>
                                            <li><span class="tit">유효</span><span class="input_txt_wrap inner_kw"><input id="diagram-actpwr2-4"  type="text" class="input_txt"  readonly /></span></li>
                                            <li><span class="tit">SOC</span><span class="input_txt_wrap inner_per"><input id="diagram-soc4"  type="text" class="input_txt" readonly  /></span></li>
                                            <li><span class="tit">모드</span><span class="input_txt_wrap "><input id="diagram-modestatus-4" type="text" class="input_txt" readonly  /></span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </li>
                            <!--// 4 -->
                        </ul>
                        <ul class="list_solar">
                            <!-- 1 -->
                            <li name='infopv1'>
                                <ul class="info_solar_data">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_solar"></div>
                                        <div class="solar_data"><span class="tit">발전량1</span><span class="input_txt_wrap inner_kwp">
                                            <input type="text" id="diagram-pv1" class="input_txt" readonly /></span></div>
                                    </li>
                                </ul>
                            </li>
                            <!--// 1 -->
                            <!-- 2 -->
                            <li name='infopv2'>
                                <ul class="info_solar_data">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_solar"></div>
                                        <div class="solar_data"><span class="tit">발전량2</span><span class="input_txt_wrap inner_kwp">
                                            <input type="text"  id="diagram-pv2"  class="input_txt"  readonly /></span></div>
                                    </li>
                                </ul>
                            </li>
                            <!--// 2 -->
                            <!-- 3 -->
                            <li name='infopv3'>
                                <ul class="info_solar_data">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_solar"></div>
                                        <div class="solar_data"><span class="tit">발전량3</span><span class="input_txt_wrap inner_kwp">
                                            <input type="text"  id="diagram-pv3"   class="input_txt"  readonly /></span></div>
                                    </li>
                                </ul>
                            </li>
                            <!--// 3 -->
                            <!-- 4 -->
                            <li name='infopv4'>
                                <ul class="info_solar_data">
                                    <li>
                                        <button type="button" class="btn_goStop color_green"></button>
                                        <div class="pic_schematic_solar"></div>
                                        <div class="solar_data"><span class="tit">발전량4</span><span class="input_txt_wrap inner_kwp">
                                            <input type="text"  id="diagram-pv4"  class="input_txt"  readonly /></span></div>
                                    </li>
                                </ul>
                            </li>
                            <!--// 4 -->
                        </ul>
                    </dd>
                </dl>
				</div>
                <div class="set_box_wrap">
                    <div class="set_box set_box_l">
                        <dl>
                            <dt>{{ $t('areaControl.selectDevice') }}</dt>
                            <dd>
                                <ul class='ctrl_PCS'>
                                    <li class="checkAll"><button id="btn_pcs_all" onclick="selectdevice('all')" type="button" class=" btn_set selectpcs"><span>PCS ALL</span></button></li>
                                    <li><button id="btn_pcs_1"  onclick="selectdevice(1)"  type="button" class="btn_set selectpcs"><span>PCS 1</span></button></li><!-- 활성화시에 is_active 클래스 추가 disabled일때는 disabled어트리뷰트 추가 -->
                                    <li><button id="btn_pcs_2"  onclick="selectdevice(2)"  type="button" class="btn_set selectpcs" ><span>PCS 2</span></button></li>
                                    <li><button id="btn_pcs_3"  onclick="selectdevice(3)"  type="button" class="btn_set selectpcs" ><span>PCS 3</span></button></li>
                                    <li><button id="btn_pcs_4"  onclick="selectdevice(4)"  type="button" class="btn_set selectpcs"  ><span>PCS 4</span></button></li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div class="set_box set_box_c">
                        <dl>
                            <dt>{{ $t('areaControl.control') }}</dt>
                            <dd>
                                <ul class='ctrl_PCS btn_ctrl'>
                                    <li><button type="button" class="btn_set"><span>{{ $t('areaControl.Mode1') }}</span></button></li>
                                    <li><button type="button" class="btn_set "><span>{{ $t('areaControl.Mode2') }}</span></button></li>
                                    <!-- <li><button type="button" class="btn_set btn_error is_active"><span>비상정지</span></button></li> -->
                                    <li><button id="btn_emergency" onclick="selectCtrl('emergency', '긴급정지')"  type="button" class="btn_set btn_error "><span>{{ $t('areaControl.emergency') }}</span></button></li>
                                    <li><button id="btn_reset" onclick="selectCtrl('reset', 'RESET')"  type="button" class="btn_set"><span>{{ $t('areaControl.reset') }}</span></button></li>
                                    <li><button id="btn_auto" onclick="selectCtrl('auto', 'RESET')" type="button" class="btn_set"><span>{{ $t('areaControl.auto_mode') }}</span></button></li>
                                    <li><button id="btn_manual" onclick="selectCtrl('manual', 'RESET')"  type="button" class="btn_set"><span>{{ $t('areaControl.manual_mode') }}</span></button></li>
                                    <li class="set_input">
                                        <span class="input_txt_wrap outer_kw"><input @click='emptyamountfield()' autocomplete="off"  type="text" id="amountofchgdcg" placeholder="충방전량" class="input_txt"></span>
                                    </li>
                                    <li><button id="btn_run" onclick="selectCtrl('run', '운전')" type="button" class="btn_set"><span>{{ $t('areaControl.Run') }}</span></button></li>
                                    <li><button id="btn_stop" onclick="selectCtrl('stop', '정지')"  type="button" class="btn_set "><span>{{ $t('areaControl.stop') }}</span></button></li>
                                    <li><button id="btn_chg" onclick="selectCtrl('chg', '충전')"  type="button" class="btn_set"><span>{{ $t('areaControl.chg') }}</span></button></li>
                                    <li><button id="btn_dcg" onclick="selectCtrl('dcg', '방전')"  type="button" class="btn_set"><span>{{ $t('areaControl.dcg') }}</span></button></li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div class="set_box set_box_r ctrl_PCS">
                        <dl>
                            <dt>{{ $t('areaControl.soc') }}</dt>
                            <dd>
                                <ul>
                                    <li class="set_input set_btn">
                                        <span class="input_txt_wrap outer_per"><input type="text"  autocomplete="off"  id="amountofsetmin"  placeholder="SET MIN" class="input_txt"></span>
                                        <button  onclick="selectCtrl('setmin', '하한설정')"  type="button" class="btn_set btn_size_mini"><span>{{ $t('areaControl.SetMin') }}</span></button><!-- 선택중일때 is_active클래스 추가 -->
                                    </li>
                                    <li class="set_input set_btn">
                                        <span class="input_txt_wrap outer_per"><input type="text" autocomplete="off"  id="amountofsetmax"  placeholder="SET MAX" class="input_txt"></span>
                                        <button  onclick="selectCtrl('setmax', '상한설정')"  type="button" class="btn_set btn_size_mini"><span>{{ $t('areaControl.SetMax') }}</span></button><!-- 선택중일때 is_active클래스 추가 -->
                                    </li>
                                    <li class="set_input set_btn">
                                        <span class="input_txt_wrap "><input type="text" autocomplete="off"  id="controlstatus"  class="input_txt" readOnly/></span>
                                        <button  onclick="selectCtrl('modify_control', '제어권 변경')"  type="button" style="width: 6.5rem;" class="btn_set btn_size_mini"><span>제어권 변경</span></button>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="tbl_wrap">
                    <table class="tbl_view_box_inner">
                        <colgroup>
                        <col width="14%" />
                        <col width="36%" />
                        <col width="14%" />
                        <col width="36%" />
                        </colgroup>
                        <tr>
                            <th>PV</th>
                            <td id="installedPV">{{installedPV}}kWp</td>
                            <th>PCS</th>
                            <td id="installedPCS">{{installedPCS}}kW</td>
                        </tr>
                        <tr>
                            <th>ESS</th>
                            <td id="installedESS">{{installedESS}}kWh</td>
                            <th>{{ $t('areaControl.installed_date') }}</th>
                            <td id="installed_date">{{installed_date}}</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="cont" id="pvess_id">{{ $t('areaControl.installed_address') }} : {{pvess_id}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="view_box_right">
                <div class="graph_list_wrap">
                    <ul>
                        <li class="size_half po_left">
                            <dl>
                                <dt>{{ $t('areaControl.ProfitStatus') }}</dt>
                                <dd>
                                    <ul class="service_state">
                                        <li class="state_blue">
                                            <dl>
                                                <dt>{{ $t('areaControl.daily') }}</dt>
                                                <dd>
                                                    <div class="bar_wrap">
                                                        <span id='wonBlue' class="bar_cont"></span>
                                                    </div>
                                                    <div class="state_won">
                                                        <span id='dailyrevenue'>{{todayIncome}}</span>천원
                                                    </div>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li class="state_yellow">
                                            <dl>
                                                <dt>{{ $t('areaControl.monthly') }}</dt>
                                                <dd>
                                                    <div class="bar_wrap">
                                                        <span id="wonYellow" class="bar_cont"></span>
                                                        <span class="bar_unit step1">0</span>
                                                        <span class="bar_unit step2">500</span>
                                                        <span class="bar_unit step3">1,000</span>
                                                    </div>
                                                    <div class="state_won">
                                                        <span id='accmofincome'></span>천원
                                                    </div>
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                    
                                </dd>
                            </dl>
                        </li>
                        <li class="size_half po_right">
                            <dl>
                                <dt>{{ $t('areaControl.EventStatus') }}</dt>
                                <dd>
                                    <ul class="service_state">
                                        <li class="state_blue">
                                            <dl>
                                                <dt>{{ $t('areaControl.daily') }}</dt>
                                                <dd>
                                                    <div class="bar_wrap">
                                                        <span id='evtBlue' class="bar_cont"></span>
                                                    </div>
                                                    <div class="state_date">
                                                        <span id='dailyevent'>{{evtToday}}</span>건
                                                    </div>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li class="state_red">
                                            <dl>
                                                <dt>{{ $t('areaControl.monthly') }}</dt>
                                                <dd>
                                                    <div class="bar_wrap">
                                                        <span id='evtRed' class="bar_cont"></span>
                                                        <span class="bar_unit step1">0</span>
                                                        <span class="bar_unit step2">50</span>
                                                        <span class="bar_unit step3">100</span>
                                                    </div>
                                                    <div class="state_date">
                                                        <span id='monthlyevent'>{{evtMonthly}}</span>건
                                                    </div>
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>{{ $t('areaControl.totalChart') }}</dt>
                                <dd>
                                    <div id='areCtrlChart'></div>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="info_tbl_area">
                    <!-- info_right -->
                    <div class="info_right">
                        <dl>
                            <dt>{{ $t('areaControl.EventRecord') }}  {{occurEvtCount}} </dt>
                            <dd>
                    
                                 <div class="error_wrap">
                                    <div class="fixed_tbl_wrap">
                                        <div id='tbl_error' class="tbl_wrap tbl_error_info">
                                            <table>
                                                <caption></caption>
                                                <colgroup>
                                                <col width="11%" />
                                                <col width="27%" />
                                                <col width="7%" />
                                                <col width="*" />
                                                </colgroup>
                                                <thead>
                                                    <th>{{ $t('areaControl.Device') }}</th>
                                                    <th style="width: 23rem;">{{ $t('areaControl.EventName') }}</th>
                                                    <th style="width: 15rem;">{{ $t('areaControl.OccourTime') }}</th>
                                                    <th style="width: 15rem;">{{ $t('areaControl.RecoveryTime') }}</th>
                                                    <th>ACK</th>
                                                    <th>{{ $t('areaControl.Status') }}</th>
                                                </thead>
                                                <tbody>
                                                    <tr id="historytabletbody" v-for='v in eventList' :key="v.index">
                                                        
                                                        <td>
                                                            <span>{{v.deviceId}}</span>
                                                        </td>
                                                        <td  style='width: 23rem;'>
                                                            <span>{{v.description}}</span>
                                                        </td>
                                                        <td style='width: 15rem;'>
                                                            <span>{{v.createDT}}</span>
                                                        </td>
                                                        <td  style='width: 15rem;'>
                                                            <span>{{v.recoveryDT}}</span>
                                                        </td>
                                                        <td>
                                                            <button :id="v.eventId" type='button' class='btn btn_tbl_inner'>
                                                                <span>ACK</span>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <span class='error_state'>{{v.msg}}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> 
                            </dd>
                        </dl>
                    </div>
                   
                </div>
               
            </div>
            
        </div>
        <aidi-modal></aidi-modal>
    </div>
</template>


<script>
const Cookie = process.client ? require('js-cookie') : undefined
import aidiModal from "~/components/AreaControl/AIDI_modal";

export default {
    middleware: 'authenticated',
    layout: 'common',
    components: {
        //areaCtrlDiagram, 
        aidiModal, 
        //jejuDiagram,
    },
    head:{
        link:[
          //  {rel:"stylesheet", href:"/css/layout.css"},
          
        ],
        script: [
            { src: "/scripts/areaControl/diagram.js" },
            { src: "/scripts/areaControl/data.js" },
            { src: "/scripts/control.js" },
            { src: "https://www.amcharts.com/lib/4/core.js" },
            { src: "https://www.amcharts.com/lib/4/charts.js" },
            { src: "https://www.amcharts.com/lib/4/themes/dark.js" },
            { src : "https://www.amcharts.com/lib/4/themes/animated.js"},
            { src : "https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.js"}
            //{ src: "/scripts/common-popup.js" },
        ]
    },
    data(){
        return{
            green : '/images/contents/icon_MCCB_green.png',
            red : '/images/contents/icon_MCCB_red.png',
            initsoc : '/images/common/bat_B_10.png',
            background_url : "../images/contents/",
            countofdiagram : "listL_type1 listR_type1",
            eventList : [],
            occurEvtCount : "" ,
            dCount : [],
            dailyChg : '-',
            dailyDcg : '-',
            dailyPv : '-',
            monthlyChg : '-',
            monthlyDcg : '-',
            monthlyPv : '-',
            
            evtToday:"-",
            evtMonthly : "-",
            AccumIncome:"-",
            todayIncome:"-",
         
            mqtt:null,
            topic:null,
            client:null,

            diclient : null,
            ditopic : null,

            eventinterval : null,


            pvess_id:"",
            installedPCS: "-", // capacity
            installedESS: "-",
            installedPV: "-",
            installed_date: "", // date
            selectedSiteId: "",
            
            selectedaAggID : "",
            SiteList:[],
            OptionList:[],
            //interval : null
        }
    },
    methods: { 
        getSiteId(e){
            if(e != null){
                if(this.selectedaAggID == ""){
                    this.selectedaAggID = e.target.value;
                }else{
                    var selected = e.target.value;
                }
            }

            this.SiteList = []
            if(this.selectedaAggID != ""){
                if(getCookie('userType') == 0){
                    this.SiteList = [];
                    return;
                }else{
                    console.log(this.selectedaAggID)
                    this.SiteList = getSiteList(this.selectedaAggID, 'search');
                    console.log(this.SiteList)
                }
                
            }

        },
        setUserAsset(event){
            if(event != null){
                this.selectedSiteId = event.target.value;
            }
            this.getDataBySiteId(this.selectedSiteId)
        },
        CreateEvtTable(SITEID){
            var query = "SELECT * FROM mysql.peiuoperation.`vwEventRecord` where siteid = "+ this.selectedSiteId +" and Ackts is null"
            var data = _query(query)
           
            if(data == null || data == undefined){
                return;
            }

            this.eventList = [];
            this.occurEvtCount = "(" + data.length + " 건)"
            $('#no_error_tr').remove();
            if(data.length == 0){
                var tr = "<tr id='no_error_tr'><td colspan='7' style='width:86rem;'>최근 발생 장애 이력 없음</td></tr>"
                $('#tbl_error tr:last').after(tr)
            }else{
                
                var tr = "<tr>"
                var evtMap = new HashMap();
                var eventmsg = "";
                for(var i=0; i<data.length; i++){
                    var evt = data[i]
                    var createts =  evt.createts.replace(/\T/g,' ');

                    if(evt.Recoveryts == null){
                        var recoveryts = "-"
                        eventmsg = "처리요망"
                    }else{
                        var recoveryts = evt.Recoveryts.replace(/\T/g,' ');
                        eventmsg = "처리완료"
                    }

                    this.eventList.push({
                        index : i, 
                        createDT :createts,
                        recoveryDT : recoveryts,
                        deviceId : devicecode[evt.DeviceType] + evt.DeviceIndex,
                        description : evt.Name,
                        eventId : evt.EventRecordId,
                        msg : eventmsg
                    })

                }
                
            }

        },
     
        setdiagramUI(siteid,pcs, pv){

            for(var i=1 ; i<= 4; i++){
                    
                $('li[name=info'+i+']').css('display','none')
                $('li[name=infopv'+i+']').css('display','none')
            }
            
            // 자원 갯수에 맞게 클래스명 세팅
            this.countofdiagram = "listL_type" + pcs + " listR_type" + pv;
            
            // pcs, pv 칸 inline-block
            for(var i = 1; i<= pv; i++){
                $('li[name=infopv'+i+']').css('display','inline-block');
            }
            for(var i = 1; i<= pcs; i++){
                $('li[name=info'+i+']').css('display','inline-block')
            }
            
            // 단선도 배경 이미지 세팅 (현재 1*1,4*4만 가능)
            // pv 대수 기준 
            $("#diagram_img").css('background-size','80.5rem 35.7rem')
            //$("#diagram_img").css('background-repeat', "no-repeat" )
            
            if(pv == 1){
                $("#diagram_img").css('background', "url('../images/contents/ex_map1x1_805x370.png') 7.4rem 5rem  no-repeat" )
            }else if(pv == 4){
                $("#diagram_img").css('background', "url('../images/contents/jeju_ex_map4x4_805x370.png') 7.4rem 5rem no-repeat" )
                
            }
            // 초기 스위치, soc 아이콘 세팅
            setmcbbstat(pcs, pv);
        },
        emptyamountfield(){
            $("#amountofchgdcg").text("")
            $("#amountofchgdcg").val("")
        },
        getDataBySiteId(SITEID){
            
            if(SITEID != null){

                setCookie('selectedsite', SITEID)
                _setprogressBar(DailyIncome,0)
                _setprogressBar(MothlyIncome,0)
                _setprogressBar(DailyEvent,0)
                _setprogressBar(MonthlyEvent,0)

                var dCount = this.getfacility(SITEID);
                // 금일, 금월 충전, 방전, 발전량
                summaryaccmData(SITEID)

                // 실시간 운영추이 인터벌 클리어
                clearInterval(interval)

                // 단선도 인터벌 클리어
                clearInterval(diagraminterval)

                // 조회시간 기준 한시간 전 pv, 충방전 데이터 요청 (차트)
                getHourlyChartData(SITEID, dCount);

                // 실시간 이벤트 테이블
                this.CreateEvtTable(SITEID)
                
                //실시간 장애 발생 이력 가져오기 
                clearInterval(this.eventinterval);
                this.eventinterval = setInterval(() => {
                    if(SITEID != null ){
                        this.CreateEvtTable(SITEID)
                    }
                }, 2000);

                
                // 금일,금월 수익금
                getRevenueBySite(SITEID);

                // 금일, 금월 이벤트 현황
                getEventBySite(SITEID);

                // 날씨정보
                getWeatherStatus(SITEID)

                var list = getDIList(SITEID)[0];

                var pcslist = list.pcslist
                var bmswarning = list.bmswarninglist
                var bmsfault = list.bmsfaultlist


                if(this.topic != null){
                    this.client.unsubscribe(this.topic);
                    
                }
                this.topic = 'hubbub/'+SITEID+'/+/AI';
                this.client.subscribe(this.topic, function (err) {
                    
                    // 설비정보
                    $(".data_val").text('')
                    $(".data_val").val('')

                    // 목표출력 값 초기화
                    $("#diagram-actpwr1-1").text('')
                    $("#diagram-actpwr1-1").val('')
                    
                    // 유효출력 값 초기화
                    $("#diagram-actpwr2-1").text('')
                    $("#diagram-actpwr2-1").val('')

                    // PV 발전량 값 초기화
                    $("#diagram-pv1").text('')
                    $("#diagram-pv1").val('')
                    
                    if (err) {
                        console.log(err)
                    }
                })

                if(this.ditopic != null){
                    this.diclient.unsubscribe(this.ditopic)
                }
                this.ditopic = 'hubbub/'+SITEID+'/+/+/+';
               
                this.diclient.subscribe(this.ditopic,function(err) {
                    
                    if(err) { console.log(err)}
                })


                // ai/di 값을 받음. 없으면 1번
                var devicenum = 1;
                this.$nuxt.$on('pcs_num', data => {
                    devicenum = data;
                })

                var pvfirst = 1, pvsecond = 2;
                var diviceid1 = "PV1" , diviceid2 = "PV2" 
                this.$nuxt.$on('pv_num', data => {
             
                    if(data == 'first'){
                        pvfirst = 1; pvsecond = 2;
                        diviceid1 = "PV1" ;  diviceid2 = "PV2"
                    }else{
                        pvfirst = 3; pvsecond = 4;
                        diviceid1 = "PV3" ;  diviceid2 = "PV4"
                    }
                })

                var pcs = dCount[0].pcsCount
                var bms = dCount[0].bmsCount
                var pv = dCount[0].pvCount
                
               
                this.setdiagramUI(SITEID, pcs, pv)

               
                /*********** DI 포인트 바인딩 ***********/ 
                this.diclient.on('message', function(topic, message) {
                    var data = message.toString();
                    var dipoint = JSON.parse(message.toString());
                   
                    var stat = ""
                    
                        
                        if(dipoint['ditype'] == 1 ){
                            // PCS 상태 

                            
                            var index = dipoint['deviceindex']
                            var controlstatus = dipoint['LOCALREMOTE'];
                            
                            if(controlstatus == 0){
                                $("#controlstatus").attr('placeholder','PMS')
                                $("#controlstatus").attr('val','PMS')
                                $("#pcsao_AUTH").text('PMS')
                             
                            }else{
                                $("#controlstatus").attr('placeholder','EMS')
                                $("#controlstatus").attr('val','EMS')
                                $("#pcsao_AUTH").text('EMS')
                            }
                            

                            for(var i=1 ; i<= 4; i++){
                                if(i == dipoint['deviceindex']){
                                    var manualauto = dipoint['MANUALAUTO']
                                    if(manualauto == 0){
                                        $("#diagram-modestatus-"+i).val('수동')
                                    }else{
                                        $("#diagram-modestatus-"+i).val('자동')
                                    }
                                }
                                
                            }
                     
                       
                            for(var i=1 ; i<= 4; i++){
                                if(i == dipoint['deviceindex']){
                                    var ac_cb = dipoint['AC_CB'];
                               
                                    if(ac_cb == 0){
                                        $('#pcsao_AC_CB').text('OPEN')
                                        stat = '/images/contents/icon_MCCB_green.png';
                                    }else{
                                        $('#pcsao_AC_CB').text('CLOSE')
                                        stat = '/images/contents/icon_MCCB_red.png';
                                    }
                                    $("#diagram-ac-" + i).removeAttr('href')
                                    $("#diagram-ac-" + i).removeAttr("xlink:href")
                                    $("#diagram-ac-" + i).attr("href",stat)

                                    var dc_cb = dipoint['DC_CB'];
                                    if(dc_cb == 0){
                                        $('#pcsao_DC_CB').text('OPEN')
                                        stat = '/images/contents/icon_MCCB_green.png';
                                    }else{
                                        $('#pcsao_DC_CB').text('CLOSE')
                                        stat = '/images/contents/icon_MCCB_red.png';
                                    }
                                    $("#diagram-dc-" + i).removeAttr('href')
                                    $("#diagram-dc-" + i).removeAttr("xlink:href")
                                    $("#diagram-dc-" + i).attr("href",stat)
                                }
                                
                            }

                            for(var i=1 ; i<= 4; i++){
                                if(i == dipoint['deviceindex']){
                                    var ac_cb = dipoint['AC_CB'];
                               
                                    if(ac_cb == 0){
                                        $('#pcsao_AC_CB').text('OPEN')
                                        stat = '/images/contents/icon_MCCB_green.png';
                                    }else{
                                        $('#pcsao_AC_CB').text('CLOSE')
                                        stat = '/images/contents/icon_MCCB_red.png';
                                    }
                                    $("#diagram-ac-" + i).removeAttr('href')
                                    $("#diagram-ac-" + i).removeAttr("xlink:href")
                                    $("#diagram-ac-" + i).attr("href",stat)

                                    var dc_cb = dipoint['DC_CB'];
                                    if(dc_cb == 0){
                                        $('#pcsao_DC_CB').text('OPEN')
                                        stat = '/images/contents/icon_MCCB_green.png';
                                    }else{
                                        $('#pcsao_DC_CB').text('CLOSE')
                                        stat = '/images/contents/icon_MCCB_red.png';
                                    }
                                    $("#diagram-dc-" + i).removeAttr('href')
                                    $("#diagram-dc-" + i).removeAttr("xlink:href")
                                    $("#diagram-dc-" + i).attr("href",stat)
                                }
                                
                            }

                            var ac_mc = dipoint['AC_MC'];
                            if(ac_mc == 0){
                                $('#pcsao_AC_MC').text('OPEN')
                            }else{

                                $('#pcsao_AC_MC').text('CLOSE')
                            }
                            var chg = dipoint['CHARGE']
                            if(chg == 0){
                                $('#pcsao_CHARGE').text('대기')
                            }else{
                                $('#pcsao_CHARGE').text('충전중')
                            }
                            var dcg = dipoint['DISCHARGE'];
                            if(dcg == 0){
                                $('#pcsao_DISCHARGE').text('대기')
                            }else{
                                $('#pcsao_DISCHARGE').text('방전중')
                            }
                            var fault = dipoint['FAULT'];
                            if(fault == 0){
                                $('#pcsao_FAULT').text('정상')
                            }else{
                                $('#pcsao_FAULT').text('비정상')
                            }
                            var run = dipoint['RUN'];
                            if(run == 0){
                                $('#pcsao_RUN').text('정지')
                            }else{
                                $('#pcsao_RUN').text('동작')
                            }
                            
                            var standby = dipoint['STAND_BY']
                            if(standby == 0){
                                $('#pcsao_STANDBY').text('OFF')
                            }else{
                                $('#pcsao_STANDBY').text('ON')
                            }
                        }
                        else if(dipoint['ditype'] == 0){
                            
                            if(dipoint['deviceindex'] == devicenum){
                          
                                var key = Object.keys(dipoint)
                               
                                if(dipoint['devicetype'] == 0){
                                    // PCS 
                                    if(pcslist != undefined){
                                        pcslist.forEach((v,k)=> {
                                            var value = dipoint[Number(v.groupcode)]
                                            if(value != undefined){
                                                var r = (v.bitflag & value) == v.bitflag ? false : true
                                                if(r == true){
                                                    $("span[name='eventcode-" + k + "']").attr('class','ico_state')
                                                }else{
                                                    $("span[name='eventcode-" + k + "']").attr('class','ico_state ico_warning')
                                                }   
                                            }
                                        })
                                    }
                                }
                                if(dipoint['devicetype'] == 1){
                                // BAT 
                                    if(bmswarning != undefined){
                                        // WARNING
                                        bmswarning.forEach((v,k)=> {
                                            var value = dipoint[Number(v.groupcode)]
                                            
                                            if(value != undefined){
                                                var r = (v.bitflag & value) == v.bitflag ? false : true
                                                if(r == true){
                                                    $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state')
                                                }else{
                                                    $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state ico_warning')
                                                }   
                                            }
                                        })
                                    }
                                    if(bmsfault != undefined){
                                        // FAULT
                                        bmsfault.forEach((v,k)=> {
                                            var value = dipoint[Number(v.groupcode)]
                                            if(value != undefined){
                                                var r = (v.bitflag & value) == v.bitflag ? false : true
                                                if(r == true){
                                                    $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state')
                                                }else{
                                                    $("span[name='bat-eventcode-" + k + "']").attr('class','ico_state ico_warning')
                                                }   
                                            }
                                        })
                                    }
                                }
                            }
                    }
                })
                // AI/DI 상세보기 장치별 AI 정보 
                this.client.on('message', function (topic, message) {
                   
                    var data = message.toString();
                    var tmp = JSON.parse(message.toString());
                    var siteID = tmp.siteId;
                    var tmpID = tmp.normalizedeviceid

                    if(tmp.groupname == "PCS_SYSTEM" && Number(siteID) == Number(SITEID)){
                      
                        for(var i=1; i<= pcs; i++){
                            if(tmp.normalizedeviceid == "PCS" + devicenum){
                                // ai 
                                var d = tmp;
                                
                                $("#freq").text(Number(d.freq).toFixed(2));
                                $("#acGridVlt").text(Number(d.acGridVlt).toFixed(1));
                                $("#acGridCrtHigh").text(Number(d.acGridCrtHigh).toFixed(1));
                                $("#acGridCrtLow").text(Number(d.acGridCrtLow).toFixed(1));
                                $("#acGridPwr").text(Number(d.acGridPwr).toFixed(1));
                                $("#acGridVltR").text(Number(d.acGridVltR).toFixed(1));
                                $("#acGridVltS").text(Number(d.acGridVltS).toFixed(1));
                                $("#acGridVltT").text(Number(d.acGridVltT).toFixed(1));
                                $("#pwrFact").text((Number(d.pwrFact*100).toFixed(0)));
                                $("#acGridCrtR").text(Number(d.acGridCrtR).toFixed(1));
                                $("#acGridCrtS").text(Number(d.acGridCrtS).toFixed(1));
                                $("#acGridCrtT").text(Number(d.acGridCrtT).toFixed(1));
                                $("#actPwrKw").text(Number(d.actPwrKw).toFixed(1));
                                $("#rctPwrKw").text(Number(d.rctPwrKw).toFixed(1));
                            }
                            
                            if(tmp.normalizedeviceid == "PCS"+i){
                                // 단선도 
                                $("#diagram-actpwr1-"+i).val(Number(tmp['actPwrKw']).toFixed(1))
                                $("#diagram-actpwr2-"+i).val(Number(tmp['actPwrKw']).toFixed(1))
                            }
                        }
                    }
                    // soc, soh 
                    if(tmp.groupname == "PCS_BATTERY" && siteID == SITEID){

                        //console.log(tmp)
                        
                        for(var i=1; i<= bms; i++){
                            if(tmp.normalizedeviceid == "BMS"+i){
                                
                                // 단선도 
                                $("#diagram-soc"+i).val(Number(tmp.bms_soc).toFixed(1))
                                var soc = _setsoc($("#diagram-soc"+i).val())
                                var s = "/images/common/bat_B_" + soc + ".png"
                                $("#diagram-soc-" + i).removeAttr('href')
                                $("#diagram-soc-" + i).removeAttr("xlink:href")
                                $("#diagram-soc-" + i).attr("href",s)
                            }
                           
                            if(tmp.normalizedeviceid == "BMS" + devicenum){
                                // ai 
                                var d = tmp;

                                $("#bms_soc").text(Number(d.bms_soc).toFixed(1));
                                $("#bms_soh").text(Number(d.bms_soh).toFixed(1));
                                $("#dcCellVlt").text(Number(d.dcCellVlt).toFixed(1));
                                $("#dcCellCrt").text(Number(d.dcCellCrt).toFixed(1));
                                $("#dcCellPwr").text(Number(d.dcCellPwr).toFixed(1));
                                $("#dcCellVltMx").text(Number(d.dcCellVltMx).toFixed(1));
                                $("#dcCellVltMn").text(Number(d.dcCellVltMn).toFixed(1));
                                $("#dcCellTmpMx").text(Number(d.dcCellTmpMx).toFixed(1));
                                $("#dcCellTmpMn").text(Number(d.dcCellTmpMn).toFixed(1));
                                $("#minofsoc").text(Number(d.soc_min).toFixed(1));
                                $("#maxofsoc").text(Number(d.soc_max).toFixed(1));
                                
                            }

                        }
                    }
                    // // pv
                    if(tmp.groupname == "PV_SYSTEM" && siteID == SITEID){

                        
                        for(var i=1; i<= pv ; i++){

                             if(tmp.normalizedeviceid == "PV"+i){
                                // 단선도 
                                $("#diagram-pv"+i).val(Number(tmp.TotalActivePower).toFixed(1))
                            }

                            if(i == pvfirst && tmp.deviceId == diviceid1) {
                                // ai 
                                var d = tmp;
                              
                            
                                $("#TotalActivePower").text(Number(d.TotalActivePower).toFixed(1));
                                $("#TotalReactivePower").text(Number(d.TotalReactivePower).toFixed(1));
                                $("#ReverseActivePower").text(Number(d.ReverseActivePower).toFixed(1));
                                $("#ReverseReactivePower").text(Number(d.ReverseReactivePower).toFixed(1));
                                
                                $("#vltR").text(Number(d.vltR).toFixed(1));
                                $("#vltS").text(Number(d.vltS).toFixed(1));
                                $("#vltT").text(Number(d.vltT).toFixed(1));

                                $("#crtR").text(Number(d.crtR).toFixed(1));
                                $("#crtS").text(Number(d.crtS).toFixed(1));
                                $("#crtT").text(Number(d.crtT).toFixed(1));

                                $("#EnergyTodayActivePower").text(Number(d.EnergyTodayActivePower).toFixed(1));
                                $("#EnergyTotalActivePower").text(Number(d.EnergyTotalActivePower).toFixed(1));
                                $("#EnergyTotalReactivePower").text(Number(d.EnergyTotalReactivePower).toFixed(1));
                                $("#EnergyTotalReverseActivePower").text(Number(d.EnergyTotalReverseActivePower).toFixed(1));

                            }
                           
                            if(i == pvsecond && tmp.deviceId == diviceid2) {
                                
                                // ai 
                                var d = tmp;
                                
                                $("#second-TotalActivePower").text(Number(d.TotalActivePower).toFixed(1));
                                $("#second-TotalReactivePower").text(Number(d.TotalReactivePower).toFixed(1));
                                $("#second-ReverseActivePower").text(Number(d.ReverseActivePower).toFixed(1));
                                $("#second-ReverseReactivePower").text(Number(d.ReverseReactivePower).toFixed(1));
                                
                                $("#second-vltR").text(Number(d.vltR).toFixed(1));
                                $("#second-vltS").text(Number(d.vltS).toFixed(1));
                                $("#second-vltT").text(Number(d.vltT).toFixed(1));

                                $("#second-crtR").text(Number(d.crtR).toFixed(1));
                                $("#second-crtS").text(Number(d.crtS).toFixed(1));
                                $("#second-crtT").text(Number(d.crtT).toFixed(1));

                                $("#second-EnergyTodayActivePower").text(Number(d.EnergyTodayActivePower).toFixed(1));
                                $("#second-EnergyTotalActivePower").text(Number(d.EnergyTotalActivePower).toFixed(1));
                                $("#second-EnergyTotalReactivePower").text(Number(d.EnergyTotalReactivePower).toFixed(1));
                                $("#second-EnergyTotalReverseActivePower").text(Number(d.EnergyTotalReverseActivePower).toFixed(1));

                            }
                        }
                    }
                })
            }
            return true;
        },
        getfacility(siteid){
            var resp = getSiteInfo(siteid)
            if(resp == null || resp == undefined){
                return;
            }
            
            // 설치주소
            this.pvess_id = resp.address
            var f = resp.facility;

            // pv 설치용량
            this.installedPV = f.sumofpvcapacity
            $("#installedPV").text(comma(f.sumofpvcapacity)+"kWp")
            
            // pcs 설치용량
            this.installedPCS = f.sumofpcscapacity
            installedpcs = f.sumofpcscapacity
            $("#installedPCS").text(comma(f.sumofpcscapacity)+"kW")
            
            // ess 설치용량
            this.installedESS = f.sumofbmscapacity
            $("#installedESS").text(comma(f.sumofbmscapacity)+"kWh")

            // 설치일자
            this.installed_date = resp.registertimestamp.substring(0,11);

            
            var controlauth = resp.restrictsite
            if(controlauth == true){
                // 제어 막아야함 = 제어권한x
                $(".ctrl_PCS li>button").attr('disabled',"disabled")
            }else{
                // 제어 오픈 = 제어권한 o
                $(".ctrl_PCS li>button").removeAttr('disabled')
            }

            var dCount = []
            dCount.push({
                // pcs, bat, pv 대수
                siteId : resp.siteid,
                pcsCount : f.countofpcs,
                pvCount : f.countofpv,
                bmsCount : f.countofbms, 
                installedpcs : f.sumofpcscapacity, 
                installedpv : f.sumofpvcapacity
            })

            this.dCount = dCount;
            this.$nuxt.$emit('deviceCount',dCount);
               
            return dCount;
        },

        showAiDiInfo: function () {
            
            if(this.selectedSiteId == undefined || this.selectedSiteId == ""){
                errorpoup('자원을 선택하세요')
                //alertPop(1,1,'자원을 선택하세요.')
            }else{
             
                this.$nuxt.$emit('deviceInfo',this.dCount);
                $('#AIDI_info_modal').css('display','block')
                
            }
        },
        checkAuth(){
            // id 별 제어 권한 막기 
            var token = getCookie('token')
            $.ajax({
                url: 'https://www.peiu.co.kr:3020/api/Hubbub/v1/controlcheck',
                contentType: "application/json",
                type: "get",
                async : false,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function(resp,xhr){
                    $(".ctrl_PCS li>button").removeAttr('disabled')
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var msg;
                    console.log('[Error:]'+jqXHR.status)
                    $(".ctrl_PCS li>button").attr('disabled',"disabled")
                },
            });
  
            // 발전사업자 레벨(0)이면 거래사업자 선택 카테고리 삭제 
            if(getCookie('userType') == 0 ){
                this.OptionList = [];
                var data = _ajax('i', 'owner', 'site');
                for(var i = 0; i< data.length; i++){
                    this.SiteList.push({
                        idx : i, 
                        represenation : data[i].represenation, 
                        siteid : data[i].siteid
                    })
                }
                $('#agg').hide();
            }else{
                this.OptionList = getUserSiteInfo();
                $('#agg').show();
            }
            
        }
    },
    beforeDestroy() {
        // if(this.client !=null){
        //     this.client.end();
         
        // }
    },
    mounted() {
        this.checkAuth();
        // 테이블 sort 기능 
        $('table').tablesort();

        //메뉴 활성화
        document.getElementById('menu4').classList.add("active");
     
     
        // mqtt 초기화 
        var mqtt = require('mqtt')
        this.client = mqtt.connect('wss://www.peiu.co.kr:9001/ws');
        this.diclient = mqtt.connect('wss://www.peiu.co.kr:9001/ws');

       // custom scroll
       new PerfectScrollbar('.fixed_tbl_wrap .tbl_error_info tbody');//커스텀 스크롤

        this.setdiagramUI(null,1,1);
       
        /* 팝업 test용 start */
        $("#pop_detail_show").on("click",function(){
            $("#popup_wrap").show();
        });
        $("#popup_wrap .pop_close").on("click",function(){
            $("#popup_wrap").hide();
            });

        /* 팝업 test용 end */
        
        //장애 이력 테이블 ack 처리
        $(document.body).delegate('#tbl_error button', 'click', function() { 
        
            var id = $(this).attr('id')
            var ackId = id;
            var rDT = $(this).attr('value')
            if( rDT != "-"){
                // 확인 버튼을 누르면 ack 처리 넘김 
                AckPop(4,2,'선택 항목을 Ack처리 하시겠습니까?',ackId)
                
            }
        }) 

        $nuxt.$on('reloadeventlist', data => {
            
            if(data == 'success'){
                this.CreateEvtTable(this.selectedSiteId)
            }
        })

        // execute after all content mounted
		  this.$nextTick(function () {
            var _areaId = localStorage.getItem('areaControl_aggID');

            if(_areaId != null)
            {
                this.selectedaAggID = _areaId;
                this.getSiteId();
                this.selectedSiteId = localStorage.getItem('areaControl_ID')
                this.setUserAsset();

            }
            localStorage.removeItem('areaControl_aggID');
            localStorage.removeItem('areaControl_ID');
            
	    })

    },
}

let aggInfo;
let siteid;
let token; 
let pcs;
let bms;
let pv;
var l;
var batlist_warning;
var batlist_fault;

import Cookies from 'js-cookie';


function AckPop(icoTyp,btnTyp,alertCont,item) {
    
    var btnCont;
    var btnCancel;
    var result = "";
    btnCont  = document.createElement("button");
    btnCont.setAttribute('class','btn btn_size_free btn_color_blue')
    btnCont.onclick = function() {
        var req = "https://www.peiu.co.kr:3077/api/event/v1/ack"
        var send = { 'targetids' : [item] }
        var token = Cookies.get('token');
        var data;
        var r;
        $.ajax({
            url: req,
            contentType: "application/json",
            type: "post",
            data : JSON.stringify(send),
            async : false,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(resp,xhr){
                
                var tag = "[tr-id='"+ item + "']"
                if(resp.Result.Code == 200){
                    $(tag).remove(); 
                    console.log(tag + 'success Ack')
                    r = 'success'
                }else{
                    r = 'fail'
                    console.log(tag + 'failed Ack')
                }
                $("#alert_wrap").remove();
                $nuxt.$emit('reloadeventlist', r)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var msg;
            },
        });
        return r;
    };
    var span = document.createElement("span");
    span.textContent = '확인'
    btnCont.append(span)

    btnCancel  = document.createElement("button");
    btnCancel.setAttribute('class','btn btn_size_free')
    btnCancel.onclick = function() {
        $("#alert_wrap").remove();
        result = 'cancel'
        };
    var spancancel = document.createElement("span");
    spancancel.textContent = '취소'
    btnCancel.append(spancancel)


    var alertWrap = document.createElement("div")
    alertWrap.setAttribute('id','alert_wrap')
    alertWrap.setAttribute('class','alert_ico_typ'+icoTyp+' alert_btn_typ1')

    var alertdim = document.createElement("div")
    alertdim.setAttribute('class','alert_dim') 

    var alertbody = document.createElement("div")
    alertbody.setAttribute('class','alert_body')

    var alerticon = document.createElement("div")
    alerticon.setAttribute('class','alert_icon')

    var alerttxt = document.createElement("div")
    alerttxt.setAttribute('class','alert_txt')
    alerttxt.textContent = alertCont
    
    var alertbtn = document.createElement("div")
    alertbtn.setAttribute('class','alert_btn_wrap')
    if(btnTyp == 2){
        alertbtn.append(btnCont)
        alertbtn.append(btnCancel)
    }
    
    alertbody.append(alerticon)
    alertbody.append(alerttxt)
    alertbody.append(alertbtn)
    alertdim.append(alertbody)
    alertWrap.append(alertdim)
    $("#wrapper").append(alertWrap);
}

var interval;
var diagraminterval;
</script>
<style>

.newChartArea{
    margin-top: 15rem;
    width: 93rem;
    height: 60rem;
}
.cont-body{
    padding: 0 2.6rem;
    background-color : "#1A2031"
}

.info_weather{
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
.today_income{
    background : #66b6db;
}
#areCtrlChart{
    height: 33rem;
}

.control_list{
    display:none;
} 
.pic_schematic_solar{
    display:none;
}
.schematic_area .btn_goStop.color_green {
    
    background-size: 100% 100%;
    display: none;
}
.modestatus {
    color : white;
    fill: white;
    font-size: 1.4rem;
}


</style>