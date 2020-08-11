<template>
<div class="cont_body">
    <div class="evaluation_wrap">
        <div class="evaluation_body">
            <dl>
              <dt>ESS 경제성 평가</dt> 
              <dd>
                <!-- section -->
                    <div class="section search_calc">									
                        <dl>
                            <dt>규모</dt>
                            <dd>
                                <div class="search_calc_l">
                                    <dl>
                                        <dt>PV</dt>
                                        <dd>
                                            <span class="input_txt_wrap outer_kw"><input type="text" id="" name="" value="" placeholder="000.000" class="input_txt"></span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>ESS</dt>
                                        <dd>
                                            <span class="input_txt_wrap outer_kwh"><input type="text" id="" name="" value="" placeholder="000.000" class="input_txt"></span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>PCS</dt>
                                        <dd>
                                            <span class="input_txt_wrap outer_kw"><input type="text" id="" name="" value="" placeholder="000.000" class="input_txt"></span>
                                        </dd>
                                    </dl>
                                    <button type="button" class="btn btn_size_free btn_color_blue"><span>계산</span></button>
                                </div>
                                <div class="search_calc_r">
                                    <button type="button" @click="openOptionPop();" class="btn btn_set"><span class="hide">설정</span></button>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <!--// section -->
                    <!-- section -->
                    <div class="section evaluation_section">
                        <dl>
                            <dt>발전량</dt>
                            <dd>
                                <div class="tbl_wrap">
                                    <p class="tbl_topR_comment">(단위:kWh)</p>
                                    <table border="0" cellpadding="0" cellspacing="0" summary="" class="tbl_type_normal">
                                    <caption></caption>
                                        <colgroup>
                                        <col width="*" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        <col width="8.8%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>구분</th>
                                                <th>1Y</th>
                                                <th>2Y</th>
                                                <th>3Y</th>
                                                <th>4Y</th>
                                                <th>5Y</th>
                                                <th>6Y</th>
                                                <th>7Y</th>
                                                <th>8Y</th>
                                                <th>9Y</th>
                                                <th>10Y</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>PV발전량</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr>
                                                <th>ESS충전</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr>
                                                <th>ESS방전</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr>
                                                <th>PV방전</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <!--// section -->
                    <div class="section evaluation_section">
                        <dl>
                            <dt>발전량</dt>
                            <dd>
                                <div class="tbl_wrap">
                                    <p class="tbl_topR_comment">(단위:kWh)</p>
                                    <table border="0" cellpadding="0" cellspacing="0" summary="" class="tbl_type_normal">
                                        <caption></caption>
                                        <colgroup>
                                            <col width="*" />
                                            <col width="4%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                            <col width="8.8%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th colspan="2">구분</th>
                                                <th>1Y</th>
                                                <th>2Y</th>
                                                <th>3Y</th>
                                                <th>4Y</th>
                                                <th>5Y</th>
                                                <th>6Y</th>
                                                <th>7Y</th>
                                                <th>8Y</th>
                                                <th>9Y</th>
                                                <th>10Y</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th rowspan="2">SMP</th>
                                                <th>PV</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr>
                                                <th>ESS</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr>
                                                <th rowspan="2">REC</th>
                                                <th>PV</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr>
                                                <th>ESS</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="2">합계</th>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                                <td>100,000</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </dd>
            </dl>
        </div>
        <!-- evaluation_side -->
        <div class="evaluation_side">
            <dl>
                <dt>경제성 평가 옵션 설정</dt>
                <dd>
                    <div class="tbl_wrap">
                        <table border="0" cellpadding="0" cellspacing="0" summary="" class="tbl_type_option" >
                        <caption></caption>
                            <colgroup>
                            <col width="*" />
                            <col width="30%" />
                            <col width="30%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>항목</th>
                                    <th>현재 값</th>
                                    <th>설정 값</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>발전효율(%)</th>
                                    <td>00</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>PV출력 저하율(%)</th>
                                    <td>0.0000</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.001" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>충전효율(%)</th>
                                    <td>0.000</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>방전효율(%)</th>
                                    <td>0.000</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>ESS 출력 저하율(%)</th>
                                    <td>0.000</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>SMP(원/kWh)</th>
                                    <td>000.00</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>REC(원/REC)</th>
                                    <td>000.00</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>PV(가중치)</th>
                                    <td>0.0</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>ESS(가중치)</th>
                                    <td>0.0</td>
                                    <td class="alC">
                                        <span class="input_option_control_wrap">
                                            <input type="text" id="" name="" value="000.000" />
                                            <button type="button" class="btn_option_control control_up"><span></span></button>
                                            <button type="button" class="btn_option_control control_down"><span></span></button>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                   <div class="btn_wrap alR">
                        <button type="button" class="btn btn_size_free btn_color_blue"><span>수정</span></button>
                        <button type="button" class="btn btn_size_free btn_color_blue"><span>적용</span></button>
                        <button type="button" onclick="openOptionPop();" class="btn btn_size_free"><span>닫기</span></button>
                    </div>
                </dd>
            </dl>
        </div>
        <!--// evaluation_side -->
    </div>
</div>
</template>
<script>

export default{
    methods:{
        openOptionPop(){
            var popOpen = $(".evaluation_wrap").hasClass("open_optionPop");
            console.log("popOpen"+popOpen);
            if(popOpen == true){
                $(".evaluation_wrap").removeClass("open_optionPop");
            }else{
                $(".evaluation_wrap").addClass("open_optionPop");
            }
	    }
    },
    mounted() {
        $('.th1').removeClass('active');
		document.getElementById('menu7').classList.add("active");
        $(document).ready(function(){
            var $btn_option_control = $(".input_option_control_wrap .btn_option_control");
            $btn_option_control.on("click",function(){
                var optionVal = Number($(this).closest(".input_option_control_wrap").find("input").val());
                if($(this).hasClass("control_up")){
                    $(this).closest(".input_option_control_wrap").find("input").val((optionVal+1));
                }else{
                    $(this).closest(".input_option_control_wrap").find("input").val((optionVal-1));
                }
            });
        });
    },
}
</script>