<template>
<!-- cont_body -->
    <div class="cont_body" style="background : #1A2031 !important; ">
        <div class="tab_wrap size1">
            
            <div class="tab_tit">
                <ul>
                    <li id="marketMar" @click="selectMenu('Mar')">
                        <a class="btn_tab_tit">
                            <span>{{ $t('market.manageMarket') }}</span>
                        </a>
                    </li>
                    
                </ul>
            </div>
            <div class="tab_cont">
                <div id="Mar" class="market_switch_wrap">
                    <dl>
                        <dt>
                            <div class="selBox_zone_r">
                                
                                <div class="btn_sel_wrap">
                                    <ul id='category'>
                                        <li>
                                            <button id="rcc" @click='SetCategory("rcc")' type="button" class="btn btn_sel is_active">
                                                <span>{{ $t('market.region') }}</span> <!-- 지역별 -->
                                            </button>
                                        </li>
                                        <li>
                                            <button id="agg" @click='SetCategory("agg")'  type="button" class="btn btn_sel">
                                                <span>{{ $t('market.customer') }}</span> <!-- 고객별 -->
                                            </button>
                                        </li>
                                        <li>
                                            <select style='width: 11rem;' v-model="selectedItem"  @change='getSiteInfo($event)' class="sel sel_size1 SelcteAgg">
                                                <option value="" selected="selected"></option>
                                                <option v-for="v in agglist" :key='v.idx' :value='v.id'>{{v.value}}</option>
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- <button type="button" class="switch_land_island switch_market on_land"><span></span></button> -->
                        </dt>
                        <dd>
                            <!-- type_area -->
                            <div class="type_area">
                                <div class="market_area_chart">
                                   <div id="marketAreaChart"></div> 
                                </div>
                                <div class="market_area_info rcc">
                                    <ul>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="1" >경기</dt>
                                                    <!-- <dd><market-card Cardnum = "card1" rccId='rcc1'/></dd> -->
                                                    <dd>
                                                        <ul>
                                                            <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-1'>0</span>kWh</span></li>
                                                            <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-1'>0</span>천원</span></li>
                                                            <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-1'>0</span>천원</span></li>
                                                        </ul>
                                                    </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="2" >인천</dt>
                                                <!-- <dd><market-card Cardnum = "card2" rccId='rcc2'/></dd> -->
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-2'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-2'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-2'>0</span>천원</span></li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="3" >서울</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-3'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-3'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-3'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="4" >대전</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-4'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-4'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-4'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="5" >충남</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-5'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-5'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-5'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="6" >전북</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-6'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-6'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-6'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="7" >전남</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-7'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-7'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-7'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="8" >광주</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-8'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-8'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-8'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                               
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="9" >강원</dt>
                                               <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-9'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-9'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-9'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                             
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="10" >충북</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-10'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-10'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-10'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="11" >경북</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-11'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-11'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-11'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="12" >대구</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-12'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-12'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-12'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                               
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="13" >울산</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-13'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-13'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-13'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                              
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="14" >부산</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-14'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-14'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-14'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="15" >경남</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-15'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-15'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-15'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                                
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt data-rcc-id="16" >제주</dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='dcgValue-16'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='income-16'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='fee-16'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                               
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                                <div class="market_area_info SelcteAgg">
                                    <ul>
                                        <li li-id='0'>
                                            <dl>
                                                <dt site-item="0" >경기</dt>
                                                    <!-- <dd><market-card Cardnum = "card1" rccId='rcc1'/></dd> -->
                                                    <dd>
                                                        <ul>
                                                             <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-0'>0</span>kWh</span></li>
                                                            <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-0'>0</span>천원</span></li>
                                                            <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-0'>0</span>천원</span></li>
                                                        </ul>
                                                    </dd>
                                            </dl>
                                        </li>
                                        <li li-id='1'>
                                            <dl>
                                                <dt site-item="1" ></dt>
                                                <!-- <dd><market-card Cardnum = "card2" rccId='rcc2'/></dd> -->
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-1'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-1'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-1'>0</span>천원</span></li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li li-id='2'>
                                            <dl>
                                                <dt site-item="2" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-2'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-2'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-2'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li li-id='3'>
                                            <dl>
                                                <dt site-item="3" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-3'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-3'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-3'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li li-id='4'>
                                            <dl>
                                                <dt site-item="4" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-4'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-4'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-4'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li li-id='5'>
                                            <dl>
                                                <dt site-item="5" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-5'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-5'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-5'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                                
                                            </dl>
                                        </li>
                                        <li li-id='6'>
                                            <dl>
                                                <dt site-item="6" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-6'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-6'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-6'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                                
                                            </dl>
                                        </li>
                                        <li li-id='7'>
                                            <dl>
                                                <dt site-item="7" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-7'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-7'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-7'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                               
                                            </dl>
                                        </li>
                                        <li li-id='8'>
                                            <dl>
                                                <dt site-item="8" ></dt>
                                               <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-8'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-8'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-8'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                             
                                            </dl>
                                        </li>
                                        <li li-id='9'>
                                            <dl>
                                                <dt site-item="9" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-9'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-9'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-9'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                            </dl>
                                        </li>
                                        <li li-id='10'>
                                            <dl>
                                                <dt site-item="10" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-10'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-10'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-10'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                            </dl>
                                        </li>
                                        <li li-id='11'>
                                            <dl>
                                                <dt site-item="11" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-11'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-11'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-11'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                               
                                            </dl>
                                        </li>
                                        <li li-id='12'>
                                            <dl>
                                                <dt site-item="12" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-12'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-12'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-12'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                              
                                            </dl>
                                        </li>
                                        <li li-id='13'>
                                            <dl>
                                                <dt site-item="13" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-13'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-13'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-13'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                            </dl>
                                        </li>
                                        <li li-id='14'>
                                            <dl>
                                                <dt site-item="14" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-14'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-14'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-14'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                                
                                            </dl>
                                        </li>
                                        <li li-id='15'>
                                            <dl>
                                                <dt site-item="15" ></dt>
                                                <dd>
                                                    <ul>
                                                        <li><span class="tit">{{$t("market.discharging")}} :</span><span class="txt"><span id='site-dcgValue-15'>0</span>kWh</span></li>
                                                        <li><span class="tit">{{$t("market.profit")}} :</span><span class="txt"><span id='site-income-15'>0</span>천원</span></li>
                                                        <li><span class="tit">{{$t("market.fee")}}:</span><span class="txt"><span id='site-fee-15'>0</span>천원</span></li>
                                                    </ul>   
                                                </dd>
                                                
                                               
                                            </dl>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                            <!--// type_area -->
                            
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    <!--// cont_body -->
</template>
<script>
import marketCard from '~/components/Market/marketCard.vue'
const Cookie = process.client ? require('js-cookie') : undefined
let cnt;
export default {
    layout: 'common',
     components: 
    {
        marketCard
    },
    head: {
        
        script: [ 
			{src : "https://www.amcharts.com/lib/4/core.js" },
			{src : "https://www.amcharts.com/lib/4/charts.js" },
			{src : "https://www.amcharts.com/lib/4/themes/dark.js" },
            {src : "https://www.amcharts.com/lib/4/themes/animated.js" },
            
			{src : "/scripts/jquery/core/jquery-ui.min.js"},
            {src : "/scripts/perfect-scrollbar.js"},
        ]
    },
    data(){
        return{
            category : "",
            OptionList: "",
            selectedItem : '',
            rccInfo :[],
            SiteInfo : [],
            profit : 0.05,
            agglist : [],
        }
        
    },
    methods: {
        getSiteInfo(event){
            //var siteinfo = []
            //this.SiteInfo = [];
            // agg별 소유 siteid 정보 
            //this.selectedItem
            var aggbysite = _ajax('i', 'simpleowner', 'agg')
            var databyagg = [];
            
            var sitelist = [];
            for(var i =0 ; i< aggbysite.length; i++){
                if(aggbysite[i].aggid == this.selectedItem){
                    sitelist = aggbysite[i].sitelist
                }
            }
    

             // 차트 초기화 
            $("#marketAreaChart").empty();

            // 하단 카드 초기화 
            for(var i=0; i<= 16; i++){
                $("[site-item='" + i + "']").text("")
                $("#site-dcgValue-"+i).text("")
                $("#site-income-"+i).text("")
                $("#site-fee-"+i).text("")
            }

            if(sitelist.length == 0){
                for(var i=0; i< 16; i++){
                    $("[li-id='" + i + "']").css('visibility', 'visible')
                }
            }

            if(sitelist.length > 0){
                // 소유 사이트 주소
                var addresslist = new HashMap();
                if(getCookie('userType') == 2){
                    var address = _ajax('i', 'owner', 'sitebyagg/'+this.selectedItem, null , null)
                    var ad = address[0].sitelist;
                    for(var i =0; i < ad.length; i++){
                        addresslist.set(String(ad[i].siteid), ad[i].name )
                    }
                
                }
                

                // 방전량, 수익금, 수수료 
                var select = 'SELECT acc.siteid, acc.sumofdischarge, rev.sumofrevenue '
                var from  = " FROM ( select siteid, sum(sumofdischarge) as sumofdischarge from mysql.peiuoperation.`HourlyAccmofMeasurements` where createdt= '" + getToday() +"' group by siteid) as acc "
                var innerjoin = " INNER JOIN ( select siteid, sum(revenue) as sumofrevenue from mysql.peiuoperation.`HourlyActualRevenue` where createdt = '" + getToday() +"' group by siteid) as rev "
                var on = " ON acc.siteid = rev.siteid"
                var where = " WHERE acc.siteid in (" + sitelist.toString() + ")"
                var query = query = select + from + innerjoin + on + where
                var data = _query(query)



                for(var i=0; i< 16; i++){
                    $("[li-id='" + i + "']").css('visibility', 'hidden')
                }

                for(var i=0; i< 16; i++){
                    var d = data[i]
                   
                    if(d != undefined){
                        var address = "";
                
                        if(addresslist.get(d.siteid) == undefined){
                            address = "";
                        }else{
                            address = addresslist.get(d.siteid).substring(0, 3)
                        }
                        databyagg.push({
                            idx : i, 
                            country : address, 
                            visits : d.sumofrevenue, 
                            fee : d.sumofrevenue * this.profit, 
                            dcg : d.sumofdischarge
                        })
                        $("[li-id='" + i + "']").css('visibility', 'visible')
                        $("[site-item='" + i + "']").text(address + "("+d.siteid+")")
                        $("#site-dcgValue-"+i).text(unitKW(Number(data[i].sumofdischarge)))
                        $("#site-income-"+i).text(unitWon(d.sumofrevenue))
                        $("#site-fee-"+i).text((data[i].sumofrevenue/100*this.profit).toFixed(0))
                    }
                }
            }
            this.initChart(databyagg)
        },
        SetCategory(value){
            $(".SelcteAgg").hide()
            $(".rcc").hide()
            $("#category button").removeClass('is_active');
            $("#"+value).addClass('is_active');

            // 차트 초기화 
            $("#marketAreaChart").empty();

            // 하단 카드 초기화 
            for(var i=0; i<= 16; i++){
                $("[site-item='" + i + "']").text("")
                $("#site-dcgValue-"+i).text("")
                $("#site-income-"+i).text("")
                $("#site-fee-"+i).text("")
            }

            this.category = value;
           
            if(value == 'agg'){
                $(".SelcteAgg").show()
                this.selectedItem = ""

                if(getCookie('userType') == 1 || getCookie('userType') == 2){
                    this.agglist = getUserSiteInfo();
                    
                }

            }else{
                // 지역별 
                $(".rcc").show();

                var dcg = _query("SELECT rcc, sum(sumofdischarge) as sumofdischarge FROM mysql.peiuoperation.`HourlyAccmofMeasurements` where createdt = '" + getToday() + "' group by rcc")
                var revenue = _query("select rcc,sum(revenue) as sumofrevenue from mysql.peiuoperation.`HourlyActualRevenue` where createdt = '" + getToday() + "' group by rcc")
                var databyrcc = [];
         
                for(var i =0; i< dcg.length; i++){
                    if(dcg[i].rcc == revenue[i].rcc){
                        databyrcc.push({
                            idx : i, 
                            country : RccList[dcg[i].rcc], 
                            visits : revenue[i].sumofrevenue, 
                            fee : revenue[i].sumofrevenue * this.profit,
                            dcg : dcg[i].sumofdischarge
                        })
                    }
                    $("#dcgValue-"+dcg[i].rcc).text(unitKW(Number(dcg[i].sumofdischarge)))
                    $("#income-"+dcg[i].rcc).text(unitWon(revenue[i].sumofrevenue))
                    $("#fee-"+dcg[i].rcc).text(Number(revenue[i].sumofrevenue/100 * this.profit).toFixed(0))
                }
               
                this.initChart(databyrcc);
                
            }
        },
       
        selectMenu(menu){
            $("#marketMar").removeClass("is_active")
            $("#marketHis").removeClass("is_active")
            $("#market"+menu).addClass("is_active")
            $("#Mar").css('display','none');
            $("#His").css('display','none');
            $("#"+menu).css('display','inline-block');
        },
        initChart(chartdata){

            am4core.ready(function() {
               // Themes begin
                am4core.useTheme(am4themes_dark);
                am4core.useTheme(am4themes_animated);
                am4core.options.commercialLicense = true;
                // Themes end

                // Create chart instance
                var chart = am4core.create("marketAreaChart", am4charts.XYChart);
                //chart.scrollbarX = new am4core.Scrollbar();
                chart.fontSize = 13;

                chart.legend = new am4charts.Legend();
                
                chart.legend.position = 'top';
                

        
                // Add data
                chart.data = chartdata;
                
                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 30;
                categoryAxis.renderer.labels.template.horizontalCenter = "right";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                // 카테고리축(지역) 텍스트의 회전? 정도 
                categoryAxis.renderer.labels.template.rotation = 0;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.minHeight = 110;

                // 카테고리 막대
                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.minWidth = 10;

                var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.tooltip.disabled = true;
                valueAxis2.renderer.grid.template.strokeDasharray = "3,4";
                valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
                valueAxis2.renderer.minWidth = 60;

                // dfcc64

                // 수익금 시리즈
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.sequencedInterpolation = true;
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";
                series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
                series.columns.template.strokeWidth = 0;
                series.name = "수익금(천원)";

                series.tooltip.pointerOrientation = "vertical";

                series.columns.template.column.cornerRadiusTopLeft = 10;
                series.columns.template.column.cornerRadiusTopRight = 10;
                series.columns.template.column.fillOpacity = 0.2;
                series.columns.template.column.strokeOpacity = 0.2;

                // 수수료 시리즈
                var series2 = chart.series.push(new am4charts.LineSeries());
                series2.sequencedInterpolation = true;
                series2.tensionX = 0.8;
                
                series2.dataFields.valueY = "fee";
                series2.dataFields.categoryX = "country";
                // tooltip 세팅 
                series2.tooltipText = "[{categoryX}: bold]{valueY}[/]";
                series2.tooltip.pointerOrientation = "vertical";
                series2.yAxis = valueAxis2;
                // 수수료를 맨 앞으로.
                series2.zIndex = 999;
                series2.name = "수수료(천원)";
 
                // on hover, make corner radiuses bigger
                var hoverState = series.columns.template.column.states.create("hover");
                hoverState.properties.cornerRadiusTopLeft = 0;
                hoverState.properties.cornerRadiusTopRight = 0;
                hoverState.properties.fillOpacity = 1;

                // Cursor
                chart.cursor = new am4charts.XYCursor();
               

            }); // end am4core.ready()
            
        },
        
    },
    mounted(){
        $("#menu11").addClass('active');
        
        this.selectMenu("Mar");

        // 지역별 활성화
        this.SetCategory('rcc')
        
    }
}


</script>
<style lang="">
.SelcteAgg{
    display: none;

}
.market_area_info {
    /* margin-top: 80px; */
     margin-top: 2rem; 
} 

.paging_wrap {
    /* margin-top: 4rem; */
    margin-top: 0rem;
    text-align: right;
}
.market_area_chart {
    width: 178.7rem;
    height: 38rem;
}
#marketAreaChart {
  
    height: 48rem;
}
</style>