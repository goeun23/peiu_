<template>
  <div class="dashboard_wrap ">
      
      <div class="eco_analysis_wrap">
          <div>
              <strong>
                  ESS 경제성 평가
              </strong>
          </div> 
          <div class="ess_input_wrap">
               <strong>규모 </strong>
            <div class="ess_input_box">
                <label for="">PV</label>
                <input type="text" name="" id="" v-model="a1" @change="isValid(a1)">kW
            </div> 
            <div class="ess_input_box">
                <label for="">ESS</label>
                <input type="text" name="" id="" v-model="b1" @change="isValid(b1)">kWh
            </div>
            <div class="ess_input_box">
                <label for="">PCS</label>
                <input type="text" name="" id="" v-model="c1" @change="isValid(c1)">kW
            </div>
            <div class="ess_input_box"> 
                <div class="calc_btn_wrap">
                    <button @click="calcEco()">계산</button>
                </div>                
                <div class="calc_setting_wrap" @click="showOptDlg('essOption_wrap')">
                    <i class="material-icons">settings</i>
                </div>
            </div>
          </div>
          <div class="ess_eco_analysis_ess">
              <strong>발전량</strong>
               <table class="data_table center">
                  <thead>
                      <tr>
                          <th>-</th><th>1Y</th><th>2Y</th><th>3Y</th><th>4Y</th><th>5Y</th><th>6Y</th>
                          <th>7Y</th><th>8Y</th><th>9Y</th><th>10Y</th>                          
                        </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>PV발전량</td>
                          <td><span>{{pv_gen_Y1}}</span></td>
                          <td><span >{{pv_gen_Y2}}</span></td>
                          <td><span>{{pv_gen_Y3}}</span></td>
                          <td><span>{{pv_gen_Y4}}</span></td>
                          <td><span>{{pv_gen_Y5}}</span></td>
                          <td><span>{{pv_gen_Y6}}</span></td>
                          <td><span>{{pv_gen_Y7}}</span></td>
                          <td><span>{{pv_gen_Y8}}</span></td>
                          <td><span>{{pv_gen_Y9}}</span></td>
                          <td><span>{{pv_gen_Y10}}</span></td>
                      </tr>
                      <tr>
                          <td>ESS충전</td>
                          <td><span > {{ess_chg_Y1}} </span></td>
                          <td><span > {{ess_chg_Y2}} </span></td>
                          <td><span > {{ess_chg_Y3}} </span></td>
                          <td><span> {{ess_chg_Y4}} </span></td>
                          <td><span> {{ess_chg_Y5}} </span></td>
                          <td><span> {{ess_chg_Y6}} </span></td>
                          <td><span> {{ess_chg_Y7}} </span></td>
                          <td><span> {{ess_chg_Y8}} </span></td>
                          <td><span> {{ess_chg_Y9}} </span></td>
                          <td><span> {{ess_chg_Y10}} </span></td>
                      </tr>
                      <tr>
                          <td>ESS방전</td>
                          <td><span> {{ess_dischg_Y1}} </span></td>
                          <td><span> {{ess_dischg_Y2}} </span></td>
                          <td><span> {{ess_dischg_Y3}} </span></td>
                          <td><span> {{ess_dischg_Y4}} </span></td>
                          <td><span> {{ess_dischg_Y5}} </span></td>
                          <td><span> {{ess_dischg_Y6}} </span></td>
                          <td><span> {{ess_dischg_Y7}} </span></td>
                          <td><span> {{ess_dischg_Y8}} </span></td>
                          <td><span> {{ess_dischg_Y9}} </span></td>
                          <td><span> {{ess_dischg_Y10}} </span></td>
                      </tr>
                      <tr>
                          <td>PV 방전</td>
                          <td><span> {{pv_dischg_Y1}} </span></td>
                          <td><span> {{pv_dischg_Y2}} </span></td>
                          <td><span> {{pv_dischg_Y3}} </span></td>
                          <td><span> {{pv_dischg_Y4}} </span></td>
                          <td><span> {{pv_dischg_Y5}} </span></td>
                          <td><span> {{pv_dischg_Y6}} </span></td>
                          <td><span> {{pv_dischg_Y7}} </span></td>
                          <td><span> {{pv_dischg_Y8}} </span></td>
                          <td><span> {{pv_dischg_Y9}} </span></td>
                          <td><span> {{pv_dischg_Y10}} </span></td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="ess_eco_analysis_profit">
              <strong>전력 판매 수입</strong>
               <table class="data_table center">
                  <thead>
                      <tr>
                          <th>-</th><th></th><th>1Y</th><th>2Y</th><th>3Y</th><th>4Y</th><th>5Y</th><th>6Y</th>
                          <th>7Y</th><th>8Y</th><th>9Y</th><th>10Y</th>                          
                        </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td rowspan="2">SMP</td>
                          <td>PV</td>
                          <td><span>{{smp_pv_Y1}}</span>원</td>
                          <td><span>{{smp_pv_Y2}}</span>원</td>
                          <td><span>{{smp_pv_Y3}}</span>원</td>
                          <td><span>{{smp_pv_Y4}}</span>원</td>
                          <td><span>{{smp_pv_Y5}}</span>원</td>
                          <td><span>{{smp_pv_Y6}}</span>원</td>
                          <td><span>{{smp_pv_Y7}}</span>원</td>
                          <td><span>{{smp_pv_Y8}}</span>원</td>
                          <td><span>{{smp_pv_Y9}}</span>원</td>
                          <td><span>{{smp_pv_Y10}}</span>원</td>
                      </tr>
                      <tr>
                           <!-- <td></td> -->
                           <td>ESS</td>
                          <td><span>{{smp_ess_Y1}}</span> 원</td>
                          <td><span>{{smp_ess_Y2}}</span> 원</td>
                          <td><span>{{smp_ess_Y3}}</span> 원</td>
                          <td><span>{{smp_ess_Y4}}</span> 원</td>
                          <td><span>{{smp_ess_Y5}}</span> 원</td>
                          <td><span>{{smp_ess_Y6}}</span> 원</td>
                          <td><span>{{smp_ess_Y7}}</span> 원</td>
                          <td><span>{{smp_ess_Y8}}</span> 원</td>
                          <td><span>{{smp_ess_Y9}}</span> 원</td>
                          <td><span>{{smp_ess_Y10}}</span> 원</td>
                      </tr>
                      <tr>
                          <td rowspan="2">REC</td>
                          <td>PV</td>
                          <td><span>{{rec_pv_Y1}}</span> 원</td>
                          <td><span>{{rec_pv_Y2}}</span> 원</td>
                          <td><span>{{rec_pv_Y3}}</span> 원</td>
                          <td><span>{{rec_pv_Y4}}</span> 원</td>
                          <td><span>{{rec_pv_Y5}}</span> 원</td>
                          <td><span>{{rec_pv_Y6}}</span> 원</td>
                          <td><span>{{rec_pv_Y7}}</span> 원</td>
                          <td><span>{{rec_pv_Y8}}</span> 원</td>
                          <td><span>{{rec_pv_Y9}}</span> 원</td>
                          <td><span>{{rec_pv_Y10}}</span> 원</td>
                      </tr>
                      <tr> 
                          <!-- <td></td> -->
                          <td>ESS</td>
                          <td><span>{{rec_ess_Y1}}</span>원</td>
                          <td><span>{{rec_ess_Y2}}</span>원</td>
                          <td><span>{{rec_ess_Y3}}</span>원</td>
                          <td><span>{{rec_ess_Y4}}</span>원</td>
                          <td><span>{{rec_ess_Y5}}</span>원</td>
                          <td><span>{{rec_ess_Y6}}</span>원</td>
                          <td><span>{{rec_ess_Y7}}</span>원</td>
                          <td><span>{{rec_ess_Y8}}</span>원</td>
                          <td><span>{{rec_ess_Y9}}</span>원</td>
                          <td><span>{{rec_ess_Y10}}</span>원</td>
                      </tr>
                      <tr> 
                          <td colspan="2">합계</td>
                          <td><span>{{sell_sum_Y1}}</span>원</td>
                          <td><span>{{sell_sum_Y2}}</span>원</td>
                          <td><span>{{sell_sum_Y3}}</span>원</td>
                          <td><span>{{sell_sum_Y4}}</span>원</td>
                          <td><span>{{sell_sum_Y5}}</span>원</td>
                          <td><span>{{sell_sum_Y6}}</span>원</td>
                          <td><span>{{sell_sum_Y7}}</span>원</td>
                          <td><span>{{sell_sum_Y8}}</span>원</td>
                          <td><span>{{sell_sum_Y9}}</span>원</td>
                          <td><span>{{sell_sum_Y10}}</span>원</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="eco_analysis_wrap">
          <div>
              <strong>
                  DR 경제성 평가
              </strong>
          </div>
          <div class="dr_input_wrap">
              <div  class="dr_input_box">                  
                연간 지급 정산금 : <span>{{year_amout_paid}}</span>원                
              </div>
              <div class="dr_input_box">                  
                기본 정산금 : <span>{{base_payment}}</span>원
                
              </div>
              <div class="dr_input_box">
                    감축 실적 정산금 : <span>{{reduced_amount_paid}}</span>원
              </div> 
          </div>
          <div class="dr_calculated_condition">
            <div class="dr_calculated_condition"> 
                <label for="reduced_amount_power">전력 감축 용량</label>
                <input type="text" name="reduced_amount_power" id="reduced_amount_power" v-model="reduced_amount_power" @change="isValid(reduced_amount_power)"> 
                <label for="result_payment_unit_price">실적 정산금 단가</label>
                <input type="text" name="result_payment_unit_price" id="result_payment_unit_price" v-model="result_payment_unit_price" @change="isValid(result_payment_unit_price)">원/kWh
            </div>
            <div class="dr_calculated_condition"> 
                <div class="calc_btn_wrap">
                    <button @click="calcDR()">계산</button>
                </div> 
                <div class="calc_setting_wrap" @click="showOptDlg('dr_option_wrap')">
                    <i class="material-icons">settings</i>
                </div> 
            </div>
            <div class="dr_calculated_table">
                <table  class="data_table center"> 
                    <thead>
                        <tr>
                            <th>거래월</th>
                            <th>월변기본 정산금<br>(단위 : 1kW)</th>
                            <th>감축시간</th>
                            <th>감축 실적 정산금</th>
                            <th>월별 지급 정산금</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{mon1}}</td>
                            <td><span>{{mon_base_payment1}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_1" @change="isValid(reduced_time_1)"></td>
                            <td><span>{{result_payment_1}}</span>원</td>
                            <td><span>{{mon_given_payment_1}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon2}}</td>
                            <td><span>{{mon_base_payment2}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_2" @change="isValid(reduced_time_2)"></td>
                            <td><span>{{result_payment_2}}</span>원</td>
                            <td><span>{{mon_given_payment_2}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon3}}</td>
                            <td><span>{{mon_base_payment3}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_3" @change="isValid(reduced_time_3)"></td>
                            <td><span>{{result_payment_3}}</span>원</td>
                            <td><span>{{mon_given_payment_3}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon4}}</td>
                            <td><span>{{mon_base_payment4}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_4" @change="isValid(reduced_time_4)"></td>
                            <td><span>{{result_payment_4}}</span>원</td>
                            <td><span>{{mon_given_payment_4}}</span>원</td>
                        </tr>  
                        <tr>
                            <td>{{mon5}}</td>
                            <td><span>{{mon_base_payment5}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_5" @change="isValid(reduced_time_5)"></td>
                            <td><span>{{result_payment_5}}</span>원</td>
                            <td><span>{{mon_given_payment_5}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon6}}</td>
                            <td><span>{{mon_base_payment6}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_6" @change="isValid(reduced_time_6)"></td>
                            <td><span>{{result_payment_6}}</span>원</td>
                            <td><span>{{mon_given_payment_6}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon7}}</td>
                            <td><span>{{mon_base_payment7}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_7" @change="isValid(reduced_time_7)"></td>
                            <td><span>{{result_payment_7}}</span>원</td>
                            <td><span>{{mon_given_payment_7}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon8}}</td>
                            <td><span>{{mon_base_payment8}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_8" @change="isValid(reduced_time_8)"></td>
                            <td><span>{{result_payment_8}}</span>원</td>
                            <td><span>{{mon_given_payment_8}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon9}}</td>
                            <td><span>{{mon_base_payment9}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_9" @change="isValid(reduced_time_9)"></td>
                            <td><span>{{result_payment_9}}</span>원</td>
                            <td><span>{{mon_given_payment_9}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon10}}</td>
                            <td><span>{{mon_base_payment10}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_10" @change="isValid(reduced_time_10)"></td>
                            <td><span>{{result_payment_10}}</span>원</td>
                            <td><span>{{mon_given_payment_10}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon11}}</td>
                            <td><span>{{mon_base_payment11}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_11" @change="isValid(reduced_time_11)"></td>
                            <td><span>{{result_payment_11}}</span>원</td>
                            <td><span>{{mon_given_payment_11}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>{{mon12}}</td>
                            <td><span>{{mon_base_payment12}}</span>원</td>
                            <td><input type="text" v-model="reduced_time_12" @change="isValid(reduced_time_12)"></td>
                            <td><span>{{result_payment_12}}</span>원</td>
                            <td><span>{{mon_given_payment_12}}</span>원</td>
                        </tr> 
                        <tr>
                            <td>계</td>
                            <td><span>{{sum_mon_base_payment}}</span></td>
                            <td><span>{{sum_reduced_time}}</span></td>
                            <td><span>{{sum_result_payment}}</span></td>
                            <td><span>{{sum_mon_given_payment}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
          <div class="essOption_wrap">
              <div class="ess_option_table_wrap">                  
                <strong>경제성 평가 옵션 설정</strong>
                <table class="data_table center">
                    <tbody>
                        <tr>
                            <th>발전효율</th>
                            <td><input type="text" v-model="a"></td>
                        </tr>
                        <tr>
                            <th>PV출력 저하율</th>
                            <td><input type="text" v-model="b"></td>
                        </tr>
                        <tr>
                            <th>충전효율</th>
                            <td><input type="text" v-model="c"></td>
                        </tr>
                        <tr>
                            <th>방전효율</th>
                            <td><input type="text" v-model="d"></td>
                        </tr>
                        <tr>
                            <th>ESS 출력 저하율</th>
                            <td><input type="text" v-model="e"></td>
                        </tr>
                        <tr>
                            <th>SMP</th>
                            <td><input type="text" v-model="f"></td>
                        </tr>
                        <tr>
                            <th>REC</th>
                            <td><input type="text" v-model="g"></td>
                        </tr>
                        <tr>
                            <th>PV(가중치)</th>
                            <td><input type="text" v-model="h"></td>
                        </tr>
                        <tr>
                            <th>ESS(가중치)</th>
                            <td><input type="text" v-model="i"></td>
                        </tr>
                    </tbody>
                </table>
                <div>                    
                  <button @click="closeOptDlg('essOption_wrap')">닫기</button>
                  <button @click="setOption('essOption_wrap')">설정</button>
                  <button @click="refreshEco()">갱신</button> 
                </div>
              </div> 
          </div>
          <div class="dr_option_wrap">
              <div class="dr_option_table_wrap">
                  <strong>DR 경제성 평가 월별 기본 정상금 설정</strong>
                  <table class="data_table center">
                      <tbody>
                          <tr>
                              <th>{{mon1}}</th>
                              <td><input type="text" v-model="mon1_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon2}}</th>
                              <td><input type="text" v-model="mon2_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon3}}</th>
                              <td><input type="text" v-model="mon3_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon4}}</th>
                              <td><input type="text" v-model="mon4_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon5}}</th>
                              <td><input type="text" v-model="mon5_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon6}}</th>
                              <td><input type="text" v-model="mon6_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon7}}</th>
                              <td><input type="text" v-model="mon7_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon8}}</th>
                              <td><input type="text" v-model="mon8_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon9}}</th>
                              <td><input type="text" v-model="mon9_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon10}}</th>
                              <td><input type="text" v-model="mon10_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon11}}</th>
                              <td><input type="text" v-model="mon11_price"></td>
                          </tr>
                          <tr>
                              <th>{{mon12}}</th>
                              <td><input type="text" v-model="mon12_price"></td>
                          </tr>
                      </tbody>
                  </table> 
                <div>
                    <button @click="closeOptDlg('dr_option_wrap')">닫기</button>
                    <button @click="setOption('dr_option_wrap')">설정</button>
                </div>
              </div>
              
          </div>
      </div>
  </div>  
</template>
<script>  
  // import { cube } from '~/assets/my-module';

  export default {
    layout: "prediection",

    components: {  
    },
    head: {
      link: [ 
          {rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'},
          {rel : 'stylesheet', href : 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ],
      script: [ 
      ]
    },
    data() {
        return{
            period1:null,
            period2:null,
            a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,a1:0,b1:0,c1:0, 
            pv_gen_Y1:0, pv_gen_Y2:0, pv_gen_Y3:0, pv_gen_Y4:0, pv_gen_Y5:0,
            pv_gen_Y6:0, pv_gen_Y7:0, pv_gen_Y8:0, pv_gen_Y9:0, pv_gen_Y10:0, 
            ess_chg_Y1:0, ess_chg_Y2:0, ess_chg_Y3:0, ess_chg_Y4:0, ess_chg_Y5:0,
            ess_chg_Y6:0, ess_chg_Y7:0, ess_chg_Y8:0, ess_chg_Y9:0, ess_chg_Y10:0,
            ess_dischg_Y1 : 0,ess_dischg_Y2 : 0,ess_dischg_Y3 : 0,ess_dischg_Y4 : 0,ess_dischg_Y5 : 0,
            ess_dischg_Y6 : 0,ess_dischg_Y7 : 0,ess_dischg_Y8 : 0,ess_dischg_Y9 : 0,ess_dischg_Y10 : 0,
            pv_dischg_Y1 :0, pv_dischg_Y2 :0, pv_dischg_Y3 :0, pv_dischg_Y4 :0, pv_dischg_Y5 :0,
            pv_dischg_Y6 :0, pv_dischg_Y7 :0, pv_dischg_Y8 :0, pv_dischg_Y9 :0, pv_dischg_Y10 :0, 
            smp_pv_Y1 :0, smp_pv_Y2 :0, smp_pv_Y3 :0, smp_pv_Y4 :0, smp_pv_Y5 :0, 
            smp_pv_Y6 :0, smp_pv_Y7 :0, smp_pv_Y8 :0, smp_pv_Y9 :0, smp_pv_Y10 :0, 
            smp_ess_Y1 :0, smp_ess_Y2 :0, smp_ess_Y3 :0, smp_ess_Y4 :0, smp_ess_Y5 :0, 
            smp_ess_Y6 :0, smp_ess_Y7 :0, smp_ess_Y8 :0, smp_ess_Y9 :0, smp_ess_Y10 :0,
            rec_pv_Y1: 0, rec_pv_Y2: 0,rec_pv_Y3: 0,rec_pv_Y4: 0,rec_pv_Y5: 0,
            rec_pv_Y6: 0,rec_pv_Y7: 0,rec_pv_Y8: 0,rec_pv_Y9: 0,rec_pv_Y10: 0,
            rec_ess_Y1:0, rec_ess_Y2:0, rec_ess_Y3:0, rec_ess_Y4:0, rec_ess_Y5:0, 
            rec_ess_Y6:0, rec_ess_Y7:0, rec_ess_Y8:0, rec_ess_Y9:0, rec_ess_Y10:0, 
            sell_sum_Y1:0, sell_sum_Y2:0, sell_sum_Y3:0, sell_sum_Y4:0, sell_sum_Y5:0, 
            sell_sum_Y6:0, sell_sum_Y7:0, sell_sum_Y8:0, sell_sum_Y9:0, sell_sum_Y10:0, 
            mon1 : '',mon2 : '',mon3 : '',mon4 : '',mon5 : '',mon6 : '',
            mon7 : '',mon8 : '',mon9 : '',mon10 : '',mon11 : '',mon12 : '',
            mon1_price : 0, mon2_price : 0, mon3_price : 0, mon4_price : 0, mon5_price : 0, mon6_price : 0, 
            mon7_price : 0, mon8_price : 0, mon9_price : 0, mon10_price : 0, mon11_price : 0, mon12_price : 0, 
            mon_base_payment1 : 0,mon_base_payment2 : 0,mon_base_payment3 : 0,mon_base_payment4 : 0,mon_base_payment5 : 0,mon_base_payment6 : 0,
            mon_base_payment7 : 0,mon_base_payment8 : 0,mon_base_payment9 : 0,mon_base_payment10 : 0,mon_base_payment11 : 0,mon_base_payment12 : 0,
            reduced_time_1 : 0, reduced_time_2 : 0, reduced_time_3 : 0, reduced_time_4 : 0, reduced_time_5 : 0, reduced_time_6 : 0, 
            reduced_time_7 : 0, reduced_time_8 : 0, reduced_time_9 : 0, reduced_time_10 : 0, reduced_time_11 : 0, reduced_time_12 : 0, 
            result_payment_1 : 0, result_payment_2 : 0, result_payment_3 : 0, result_payment_4 : 0, result_payment_5 : 0, result_payment_6 : 0, 
            result_payment_7 : 0, result_payment_8 : 0, result_payment_9 : 0, result_payment_10 : 0, result_payment_11 : 0, result_payment_12 : 0, 
            mon_given_payment_1 : 0,mon_given_payment_2 : 0,mon_given_payment_3 : 0,mon_given_payment_4 : 0,mon_given_payment_5 : 0,mon_given_payment_6 : 0,
            mon_given_payment_7 : 0,mon_given_payment_8 : 0,mon_given_payment_9 : 0,mon_given_payment_10 : 0,mon_given_payment_11 : 0,mon_given_payment_12 : 0,
            reduced_amount_power : 0, result_payment_unit_price : 0,
            sum_mon_base_payment : '-', sum_reduced_time : '-', sum_result_payment : '-', sum_mon_given_payment : '-',
            year_amout_paid : '-', base_payment : '-', reduced_amount_paid : '-',
            url_eco_get_opt : process.env.url_eco_get_opt,
            url_eco_set_opt : process.env.url_eco_set_opt,
        }
    },
    methods:{  
        refreshEco : function(){
            this.getOptInfo();
        },
        showOptDlg : function(div_tag_name){
            document.getElementsByClassName(div_tag_name)[0].style.display = "block";
        },
        closeOptDlg : function(div_tag_name){
            document.getElementsByClassName(div_tag_name)[0].style.display = "none";
        },
        setOption : function(div_tag_name){
            if(div_tag_name == 'dr_option_wrap'){
                this.mon_base_payment1 = this.mon1_price;
                this.mon_base_payment2 = this.mon2_price;
                this.mon_base_payment3 = this.mon3_price;
                this.mon_base_payment4 = this.mon4_price;
                this.mon_base_payment5 = this.mon5_price;
                this.mon_base_payment6 = this.mon6_price;
                this.mon_base_payment7 = this.mon7_price;
                this.mon_base_payment8 = this.mon8_price;
                this.mon_base_payment9 = this.mon9_price;
                this.mon_base_payment10 = this.mon10_price;
                this.mon_base_payment11 = this.mon11_price;
                this.mon_base_payment12 = this.mon12_price; 
            }
            if(div_tag_name == 'essOption_wrap'){
                this.setOptInfo();
            }

            document.getElementsByClassName(div_tag_name)[0].style.display = "none";
        },
        calcEco : function(){
            //PV발전량
            this.pv_gen_Y1 = (Number(this.a1) * Number(this.a) * 365);
            this.pv_gen_Y2 = (this.pv_gen_Y1 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y3 = (this.pv_gen_Y2 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y4 = (this.pv_gen_Y3 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y5 = (this.pv_gen_Y4 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y6 = (this.pv_gen_Y5 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y7 = (this.pv_gen_Y6 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y8 = (this.pv_gen_Y7 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y9 = (this.pv_gen_Y8 * (1 - Number(this.b))).toFixed(0);
            this.pv_gen_Y10 = (this.pv_gen_Y9 * (1 - Number(this.b))).toFixed(0);

            this.pv_gen_Y1 = this.ToMoney(this.pv_gen_Y1);
            this.pv_gen_Y2 = this.ToMoney(this.pv_gen_Y2);
            this.pv_gen_Y3 = this.ToMoney(this.pv_gen_Y3);
            this.pv_gen_Y4 = this.ToMoney(this.pv_gen_Y4);
            this.pv_gen_Y5 = this.ToMoney(this.pv_gen_Y5);
            this.pv_gen_Y6 = this.ToMoney(this.pv_gen_Y6);
            this.pv_gen_Y7 = this.ToMoney(this.pv_gen_Y7);
            this.pv_gen_Y8 = this.ToMoney(this.pv_gen_Y8);
            this.pv_gen_Y9 = this.ToMoney(this.pv_gen_Y9);
            this.pv_gen_Y10 = this.ToMoney(this.pv_gen_Y10);

            
            //ESS 충전
            this.ess_chg_Y1 = (Number(this.b1) * Number(this.c) * 365).toFixed(0);
            this.ess_chg_Y2 = (Number(this.ess_chg_Y1) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y3 = (Number(this.ess_chg_Y2) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y4 = (Number(this.ess_chg_Y3) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y5 = (Number(this.ess_chg_Y4) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y6 = (Number(this.ess_chg_Y5) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y7 = (Number(this.ess_chg_Y6) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y8 = (Number(this.ess_chg_Y7) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y9 = (Number(this.ess_chg_Y8) * (1 - Number(this.e))).toFixed(0);
            this.ess_chg_Y10 = (Number(this.ess_chg_Y9) * (1 - Number(this.e))).toFixed(0);
            
            this.ess_chg_Y1 = this.ToMoney(this.ess_chg_Y1);
            this.ess_chg_Y2 = this.ToMoney(this.ess_chg_Y2);
            this.ess_chg_Y3 = this.ToMoney(this.ess_chg_Y3);
            this.ess_chg_Y4 = this.ToMoney(this.ess_chg_Y4);
            this.ess_chg_Y5 = this.ToMoney(this.ess_chg_Y5);
            this.ess_chg_Y6 = this.ToMoney(this.ess_chg_Y6);
            this.ess_chg_Y7 = this.ToMoney(this.ess_chg_Y7);
            this.ess_chg_Y8 = this.ToMoney(this.ess_chg_Y8);
            this.ess_chg_Y9 = this.ToMoney(this.ess_chg_Y9);
            this.ess_chg_Y10 = this.ToMoney(this.ess_chg_Y10);


            //ESS 방전
            this.ess_dischg_Y1 = ((this.ess_chg_Y1.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y2 = ((this.ess_chg_Y2.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y3 = ((this.ess_chg_Y3.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y4 = ((this.ess_chg_Y4.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y5 = ((this.ess_chg_Y5.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y6 = ((this.ess_chg_Y6.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y7 = ((this.ess_chg_Y7.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y8 = ((this.ess_chg_Y8.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y9 = ((this.ess_chg_Y9.removeComma()) * this.d).toFixed(0);
            this.ess_dischg_Y10 = ((this.ess_chg_Y10.removeComma()) * this.d).toFixed(0);

            this.ess_dischg_Y1 = this.ToMoney(this.ess_dischg_Y1.removeComma());
            this.ess_dischg_Y2 = this.ToMoney(this.ess_dischg_Y2.removeComma());
            this.ess_dischg_Y3 = this.ToMoney(this.ess_dischg_Y3.removeComma());
            this.ess_dischg_Y4 = this.ToMoney(this.ess_dischg_Y4.removeComma());
            this.ess_dischg_Y5 = this.ToMoney(this.ess_dischg_Y5.removeComma());
            this.ess_dischg_Y6 = this.ToMoney(this.ess_dischg_Y6.removeComma());
            this.ess_dischg_Y7 = this.ToMoney(this.ess_dischg_Y7.removeComma());
            this.ess_dischg_Y8 = this.ToMoney(this.ess_dischg_Y8.removeComma());
            this.ess_dischg_Y9 = this.ToMoney(this.ess_dischg_Y9.removeComma());
            this.ess_dischg_Y10 = this.ToMoney(this.ess_dischg_Y10.removeComma());

            //PV방전

            this.pv_dischg_Y1 = (this.pv_gen_Y1.removeComma() - this.ess_chg_Y1.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y2 = (this.pv_gen_Y2.removeComma() - this.ess_chg_Y2.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y3 = (this.pv_gen_Y3.removeComma() - this.ess_chg_Y3.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y4 = (this.pv_gen_Y4.removeComma() - this.ess_chg_Y4.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y5 = (this.pv_gen_Y5.removeComma() - this.ess_chg_Y5.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y6 = (this.pv_gen_Y6.removeComma() - this.ess_chg_Y6.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y7 = (this.pv_gen_Y7.removeComma() - this.ess_chg_Y7.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y8 = (this.pv_gen_Y8.removeComma() - this.ess_chg_Y8.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y9 = (this.pv_gen_Y9.removeComma() - this.ess_chg_Y9.removeComma()).toFixed(0).moneyFormat();
            this.pv_dischg_Y10 = (this.pv_gen_Y10.removeComma() - this.ess_chg_Y10.removeComma()).toFixed(0).moneyFormat();

            this.smp_pv_Y1 = ((this.pv_dischg_Y1.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y2 = ((this.pv_dischg_Y2.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y3 = ((this.pv_dischg_Y3.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y4 = ((this.pv_dischg_Y4.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y5 = ((this.pv_dischg_Y5.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y6 = ((this.pv_dischg_Y6.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y7 = ((this.pv_dischg_Y7.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y8 = ((this.pv_dischg_Y8.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y9 = ((this.pv_dischg_Y9.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_pv_Y10 = ((this.pv_dischg_Y10.removeComma() * this.f)/1000).toFixed(0).moneyFormat();

            this.smp_ess_Y1 = ((this.ess_dischg_Y1.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y2 = ((this.ess_dischg_Y2.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y3 = ((this.ess_dischg_Y3.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y4 = ((this.ess_dischg_Y4.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y5 = ((this.ess_dischg_Y5.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y6 = ((this.ess_dischg_Y6.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y7 = ((this.ess_dischg_Y7.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y8 = ((this.ess_dischg_Y8.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y9 = ((this.ess_dischg_Y9.removeComma() * this.f)/1000).toFixed(0).moneyFormat();
            this.smp_ess_Y10 = ((this.ess_dischg_Y10.removeComma() * this.f)/1000).toFixed(0).moneyFormat();

            this.rec_pv_Y1 = ((this.pv_dischg_Y1.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y2 = ((this.pv_dischg_Y2.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y3 = ((this.pv_dischg_Y3.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y4 = ((this.pv_dischg_Y4.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y5 = ((this.pv_dischg_Y5.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y6 = ((this.pv_dischg_Y6.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y7 = ((this.pv_dischg_Y8.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y8 = ((this.pv_dischg_Y9.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y9 = ((this.pv_dischg_Y9.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();
            this.rec_pv_Y10 = ((this.pv_dischg_Y10.removeComma() * this.g * this.h)/1000).toFixed(0).moneyFormat();

            this.rec_ess_Y1 = ((this.ess_dischg_Y1.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y2 = ((this.ess_dischg_Y2.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y3 = ((this.ess_dischg_Y3.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y4 = ((this.ess_dischg_Y4.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y5 = ((this.ess_dischg_Y5.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y6 = ((this.ess_dischg_Y6.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y7 = ((this.ess_dischg_Y7.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y8 = ((this.ess_dischg_Y8.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y9 = ((this.ess_dischg_Y9.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();
            this.rec_ess_Y10 = ((this.ess_dischg_Y10.removeComma() * this.g * this.i)/1000).toFixed(0).moneyFormat();

            this.sell_sum_Y1 = (Number(this.smp_pv_Y1.removeComma()) + Number(this.smp_ess_Y1.removeComma()) + Number(this.rec_pv_Y1.removeComma()) + Number(this.rec_ess_Y1.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y2 = (Number(this.smp_pv_Y2.removeComma()) + Number(this.smp_ess_Y2.removeComma()) + Number(this.rec_pv_Y2.removeComma()) + Number(this.rec_ess_Y2.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y3 = (Number(this.smp_pv_Y3.removeComma()) + Number(this.smp_ess_Y3.removeComma()) + Number(this.rec_pv_Y3.removeComma()) + Number(this.rec_ess_Y3.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y4 = (Number(this.smp_pv_Y4.removeComma()) + Number(this.smp_ess_Y4.removeComma()) + Number(this.rec_pv_Y4.removeComma()) + Number(this.rec_ess_Y4.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y5 = (Number(this.smp_pv_Y5.removeComma()) + Number(this.smp_ess_Y5.removeComma()) + Number(this.rec_pv_Y5.removeComma()) + Number(this.rec_ess_Y5.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y6 = (Number(this.smp_pv_Y6.removeComma()) + Number(this.smp_ess_Y6.removeComma()) + Number(this.rec_pv_Y6.removeComma()) + Number(this.rec_ess_Y6.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y7 = (Number(this.smp_pv_Y7.removeComma()) + Number(this.smp_ess_Y7.removeComma()) + Number(this.rec_pv_Y7.removeComma()) + Number(this.rec_ess_Y7.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y8 = (Number(this.smp_pv_Y8.removeComma()) + Number(this.smp_ess_Y8.removeComma()) + Number(this.rec_pv_Y8.removeComma()) + Number(this.rec_ess_Y8.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y9 = (Number(this.smp_pv_Y9.removeComma()) + Number(this.smp_ess_Y9.removeComma()) + Number(this.rec_pv_Y9.removeComma()) + Number(this.rec_ess_Y9.removeComma())).toFixed(0).moneyFormat();
            this.sell_sum_Y10 = (Number(this.smp_pv_Y10.removeComma()) + Number(this.smp_ess_Y10.removeComma()) + Number(this.rec_pv_Y10.removeComma()) + Number(this.rec_ess_Y10.removeComma())).toFixed(0).moneyFormat();
            alert('계산되었습니다.');

        },
        calcDR : function(){
            //console.log("DR 경제성 평가 계산")
            //월별 기본 정산금
            this.mon_base_payment1 = (Number(this.mon1_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment2 = (Number(this.mon2_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment3 = (Number(this.mon3_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment4 = (Number(this.mon4_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment5 = (Number(this.mon5_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment6 = (Number(this.mon6_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment7 = (Number(this.mon7_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment8 = (Number(this.mon8_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment9 = (Number(this.mon9_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment10 = (Number(this.mon10_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment11 = (Number(this.mon11_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();
            this.mon_base_payment12 = (Number(this.mon12_price) * Number(this.reduced_amount_power)).toFixed(0).moneyFormat();

            //감축 실정 정산금
            this.result_payment_1= (Number(this.reduced_amount_power) * Number(this.reduced_time_1) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_2= (Number(this.reduced_amount_power) * Number(this.reduced_time_2) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_3= (Number(this.reduced_amount_power) * Number(this.reduced_time_3) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_4= (Number(this.reduced_amount_power) * Number(this.reduced_time_4) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_5= (Number(this.reduced_amount_power) * Number(this.reduced_time_5) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_6= (Number(this.reduced_amount_power) * Number(this.reduced_time_6) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_7= (Number(this.reduced_amount_power) * Number(this.reduced_time_7) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_8= (Number(this.reduced_amount_power) * Number(this.reduced_time_8) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_9= (Number(this.reduced_amount_power) * Number(this.reduced_time_9) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_10= (Number(this.reduced_amount_power) * Number(this.reduced_time_10) * Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_11= (Number(this.reduced_amount_power) * Number(this.reduced_time_11 )* Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();
            this.result_payment_12= (Number(this.reduced_amount_power) * Number(this.reduced_time_12 )* Number(this.result_payment_unit_price)).toFixed(0).moneyFormat();

            //월별 지급 정산금
            this.mon_given_payment_1 = (Number(this.mon_base_payment1.removeComma()) + Number(this.result_payment_1.removeComma())).format();
            this.mon_given_payment_2 = (Number(this.mon_base_payment2.removeComma()) + Number(this.result_payment_2.removeComma())).format();
            this.mon_given_payment_3 = (Number(this.mon_base_payment3.removeComma()) + Number(this.result_payment_3.removeComma())).format();
            this.mon_given_payment_4 = (Number(this.mon_base_payment4.removeComma()) + Number(this.result_payment_4.removeComma())).format();
            this.mon_given_payment_5 = (Number(this.mon_base_payment5.removeComma()) + Number(this.result_payment_5.removeComma())).format();
            this.mon_given_payment_6 = (Number(this.mon_base_payment6.removeComma()) + Number(this.result_payment_6.removeComma())).format();
            this.mon_given_payment_7 = (Number(this.mon_base_payment7.removeComma()) + Number(this.result_payment_7.removeComma())).format();
            this.mon_given_payment_8 = (Number(this.mon_base_payment8.removeComma()) + Number(this.result_payment_8.removeComma())).format();
            this.mon_given_payment_9 = (Number(this.mon_base_payment9.removeComma()) + Number(this.result_payment_9.removeComma())).format();
            this.mon_given_payment_10 = (Number(this.mon_base_payment10.removeComma()) + Number(this.result_payment_10.removeComma())).format();
            this.mon_given_payment_11 = (Number(this.mon_base_payment11.removeComma()) + Number(this.result_payment_11.removeComma())).format();
            this.mon_given_payment_12 = (Number(this.mon_base_payment12.removeComma()) + Number(this.result_payment_12.removeComma())).format();

            //월별 기존 정산금 합계
            this.sum_mon_base_payment = Number(this.mon_base_payment1.removeComma()) + Number(this.mon_base_payment2.removeComma()) + Number(this.mon_base_payment3.removeComma()) +
                                        Number(this.mon_base_payment4.removeComma()) + Number(this.mon_base_payment5.removeComma()) + Number(this.mon_base_payment6.removeComma()) +
                                        Number(this.mon_base_payment7.removeComma()) + Number(this.mon_base_payment8.removeComma() )+ Number(this.mon_base_payment9.removeComma()) +
                                        Number(this.mon_base_payment10.removeComma()) + Number(this.mon_base_payment11.removeComma()) + Number(this.mon_base_payment12.removeComma());            
            this.sum_mon_base_payment = this.sum_mon_base_payment.toFixed(0).moneyFormat();

            //감축 시간 합계
            this.sum_reduced_time = Number(this.reduced_time_1) + Number(this.reduced_time_2) + Number(this.reduced_time_3) + 
                                    Number(this.reduced_time_4) + Number(this.reduced_time_5) + Number(this.reduced_time_6) + 
                                    Number(this.reduced_time_7) + Number(this.reduced_time_8) + Number(this.reduced_time_9) + 
                                    Number(this.reduced_time_10) + Number(this.reduced_time_11) + Number(this.reduced_time_12);
            //감축 실적 정산금 합계
            this.sum_result_payment = Number(this.result_payment_1.removeComma()) + Number(this.result_payment_2.removeComma()) + Number(this.result_payment_3.removeComma()) +
                                    Number(this.result_payment_4.removeComma()) + Number(this.result_payment_5.removeComma()) + Number(this.result_payment_6.removeComma()) +
                                    Number(this.result_payment_7.removeComma()) + Number(this.result_payment_8.removeComma()) + Number(this.result_payment_9.removeComma()) +
                                    Number(this.result_payment_10.removeComma()) + Number(this.result_payment_11.removeComma()) + Number(this.result_payment_12.removeComma());
            this.sum_result_payment = this.sum_result_payment.toFixed(0).moneyFormat();

            //월별 지급 정산금 합계
            this.sum_mon_given_payment = Number(this.mon_given_payment_1.removeComma()) + Number(this.mon_given_payment_2.removeComma()) + Number(this.mon_given_payment_3.removeComma()) +
                                        Number(this.mon_given_payment_4.removeComma()) + Number(this.mon_given_payment_5.removeComma()) + Number(this.mon_given_payment_6.removeComma()) +
                                        Number(this.mon_given_payment_7.removeComma()) + Number(this.mon_given_payment_8.removeComma()) + Number(this.mon_given_payment_9.removeComma()) +
                                        Number(this.mon_given_payment_10.removeComma()) + Number(this.mon_given_payment_11.removeComma()) + Number(this.mon_given_payment_12.removeComma());
            this.sum_mon_given_payment = this.sum_mon_given_payment.toFixed(0).moneyFormat();

            this.year_amout_paid = this.sum_mon_given_payment;
            this.base_payment = this.sum_mon_base_payment;
            this.reduced_amount_paid = this.sum_result_payment;
            
            alert('계산되었습니다.')
        },
        isValid : function( v){
            if(isNaN(v) == true){
                alert('숫자만 입력 가능합니다.'); 
            }
        },
        ToMoney : function(value)
        {
            return Number(Math.abs(value)).format();
        },
        ToNumber : function(value){
             return(value.replace(/,/g,''));
        },
        initMonth : function(){
            var dt = new Date();            
            this.mon1 = dt.getFullYear() + "-01";
            this.mon2 = dt.getFullYear() + "-02";
            this.mon3 = dt.getFullYear() + "-03";
            this.mon4 = dt.getFullYear() + "-04";
            this.mon5 = dt.getFullYear() + "-05";
            this.mon6 = dt.getFullYear() + "-06";
            this.mon7 = dt.getFullYear() + "-07";
            this.mon8 = dt.getFullYear() + "-08";
            this.mon9 = dt.getFullYear() + "-09";
            this.mon10 = dt.getFullYear() + "-10";
            this.mon11 = dt.getFullYear() + "-11";
            this.mon12 = dt.getFullYear() + "-12";

            this.mon1_price = "5.76312";
            this.mon2_price = "4.24936";
            this.mon3_price = "3.51993";
            this.mon4_price = "1.24546";
            this.mon5_price = "1.03646";
            this.mon6_price = "3.30072";
            this.mon7_price = "5.80364";
            this.mon8_price = "5.35486";
            this.mon9_price = "3.15083";
            this.mon10_price = "1.00348";
            this.mon11_price = "2.7178";
            this.mon12_price = "5.33072";  
        },
        getOptInfo : function(){
            $.ajax({
                url : this.url_eco_get_opt,
                contentType : 'application/json',
                type : 'get',
                xhrFields : {withCredentials:true},
                success : this.getApiResult,
                error : function(jqXHR, textStatus, errorThrown){
                    //console.log('error : getOptInfo');
                    //console.log(jqXHR);
                    alert('경제성 정보 초기값 수신 실패(서버연결)')
                }   
            })
        },
        getApiResult : function(data, textStatus,  jqXHR){
            if(textStatus == "success"){
                this.a = data.generation_efficiency;
                this.b = Number(data.pvout_lowrate).toFixed(3);
                this.c = Number(data.charging_efficiency).toFixed(2);
                this.d = Number(data.discharging_efficiency).toFixed(2);
                this.e = Number(data.essout_lowrate).toFixed(2);
                this.f = Number(data.smp).toFixed(2);
                this.g = Number(data.rec).toFixed(2);
                this.h = Number(data.pv_weight).toFixed(1);
                this.i = Number(data.ess_weight).toFixed(1); 
            }else{
                alert('경제성 정보 초기값 수신 실패')
            }
        },
        setOptInfo : function(){
            var data = {
                generation_efficiency : Number(this.a),
                pvout_lowrate : Number(this.b),
                charging_efficiency : Number(this.c),
                discharging_efficiency : Number(this.d),
                essout_lowrate : Number(this.e),
                smp : Number(this.f),
                rec : Number(this.g),
                pv_weight : Number(this.h),
                ess_weight : Number(this.i)
            };
            data = JSON.stringify(data);
            $.ajax({
                url : this.url_eco_set_opt,
                contentType : 'application/json',
                xhrFields : {withCredentials:true},
                // dataType : 'json',
                type : 'put',
                data : data,
                success : this.setApiResult,
                error : function(jqXHR, textStatus, errorThrown){
                    //console.log('error : setOptInfo');
                    //console.log(jqXHR);
                    alert('경제성 정보 값 설정 실패');
                }
            })
        },
        setApiResult : function(data, textStatus, jqXHR){
            if(textStatus == "success"){
                alert('반영되었습니다.');
            }else{
                alert('반영실패하였습니다.');
            }
        }

    },
    
    mounted() 
    {
        $('.th1').removeClass('active');
        $('#gnav-ecoAnalysis').addClass('active');

        this.initMonth();
        this.getOptInfo();
        // this.initMenu();
        // $('.progressbar').css('display','none');
        // new PerfactScroll('table');
    }
  }

  

</script>

<style>
.eco_analysis_wrap{width:60rem;height:60rem;float: left;padding: 1.5rem;} 
.eco_analysis_wrap::after{clear: both;}
.eco_analysis_wrap strong{display:block;margin:0.9375rem;font-weight: bolder;font-size: 1.875rem;line-height: 1.875rem;color:#fff;letter-spacing: -0.0625rem;}
.eco_analysis_wrap button{display: block;width:3.875rem;height:2.125rem;padding:0.4375rem 0;
                        border-radius: 0.1875rem;background:#2a75ff;font-size: 1.0625rem;
                        line-height: 1.25rem;color:#fff;letter-spacing: -0.03125rem;
                        text-align: center;}

.dr_input_box{float: left;margin: .5rem;color:white;}
/* .dr_input_box::before{content:'';background:#72A4FF;border-radius:50%;} */
.dr_input_box::after{clear: both;}
.dr_input_box label {clear:left; text-align:right; padding-right:10px;}
.dr_input_box input{width:3rem;height: 1.3rem;}
.dr_input_box input, .dr_input_box label {float:left;}
.dr_input_wrap{width:100%;display: inline-block;border-bottom:0.09375rem solid #484c56;}
.dr_input_box::before{content:'';background: #72AfFF;width: 0.375rem;height:0.375rem;display: inline-block;top: 0;left: 0;border-radius:50%;margin-right:0.23rem;}

.dr_calculated_condition{display: block;color:#fff;float: left;}
.dr_calculated_condition::after{clear:both;}
.dr_calculated_condition input{width:3rem;height: 1.3rem;}

.dr_calculated_condition label::before{content:'';background: #72AfFF;width: 0.375rem;height:0.375rem;display: inline-block;top: 0;left: 0;border-radius:50%;margin-right:0.23rem;}
.ess_input_wrap{width:100%;height:10vh;display: inline-block;border-bottom:0.09375rem solid #484c56;}
.ess_input_wrap input{width:3rem;height:1.3rem;margin:0 0.3rem;}
.ess_size::after{clear:both;}
.ess_input_box{float:left;color:#fff;width:24%;}
.ess_input_box label{clear:both;text-align: right;padding-right: 10px;}
.ess_input_box input[type="text"]{width:5vw;height:3vh;padding :0 5px;border-radius: 3px;}
.ess_input_box label:before{content:'';background: #72AfFF;width: 0.375rem;height:0.375rem;display: inline-block;top: 0;left: 0;border-radius:50%;margin-right:0.23rem;}
.ess_input_box::after{clear:both;}
.calc_btn_wrap{float: left;}
.calc_setting_wrap{float:left;padding:.3rem 0;margin: 0 1rem;}
.calc_setting_wrap::after{clear:both;}

.essOption_wrap, .dr_option_wrap{display: none; position:fixed; top:0; left:0; width: 100%; height: 100%; background: #031424; opacity: 0.9;}
.ess_option_table_wrap, .dr_option_table_wrap{position:absolute;top : 50%; left:50%;transform: translate(50%, 50%);-webkit-transform: translate(-50%, -50%); }
.dr_option_table_wrap table td input, .ess_option_table_wrap table td input{height: 3vh; border-radius: 8px;width:80%;padding: 10px;}
.dr_option_table_wrap div button, .ess_option_table_wrap div button{float: right; margin:2px 5px;}
.dr_option_table_wrap div button::after, .ess_option_table_wrap div button::after{clear: both;}

input[type="text"]{text-align: center;}
</style>
