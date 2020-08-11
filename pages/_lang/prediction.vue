<template>
  <div class="dashboard_wrap ">
		<div class="dashboard_box prediction">
			<div class="conts active">
				<div class="inquiry">
					<div class="selectbox">
						<select name="region_field" id="region_field" class="info_select" v-model="selectedRcc">
						    <option value="1">서울</option>
                            <option value="2">남서울</option>
                            <option value="3">인천</option>
                            <option value="4">경기</option>
                            <option value="5">경기북부</option>
                            <option value="6">강원</option>
                            <option value="7">대전충남</option>
                            <option value="8">충북</option>
                            <option value="9">광주전남</option>
                            <option value="10">전북</option>
                            <option value="11">대구</option>
                            <option value="12">부산울산</option>
                            <option value="13">경남</option>
                            <option value="14">경북</option>
						</select>
					</div>
					<dl class="period">
						<dt>조회항목</dt>	
						<dd>
                            									
							<div class="sort"> 
                                <a id="btn_load" @click="change('load')" class="active btn_conditions"><i class="xi-check-min" aria-hidden="true"></i>부하예측</a>
								<a id="btn_gen" @click="change('gen')" class="btn_conditions" ><i class="xi-check-min" aria-hidden="true"></i>발전예측</a>								
							</div>
                            <button class="btn_inguiry" @click="getData()">조회</button>
							<!-- <p class="btn_inguiry" ><a href="#">조회</a></p>  -->
						</dd>
					</dl>
				</div> 
            </div>
            <div class="prediction_wrap each_data_wrap">
                <div id="load_predict_wrap">
                    <div class="load_chart_wrap">
                        <strong>부하예측 그래프</strong>	
                        <div class="load_canvas_wrap">
                            <canvas id="load_chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="load_table_wrap">
                        <table class="data_table center"> 
                            <tbody>
                                <tr>
                                    <th>-</th> 
                                    <th>0H</th>
                                    <th>1H</th>
                                    <th>2H</th>
                                    <th>3H</th>
                                    <th>4H</th>
                                    <th>5H</th>
                                    <th>6H</th>
                                    <th>7H</th>
                                    <th>8H</th>
                                    <th>9H</th>
                                    <th>10H</th>
                                    <th>11H</th> 
                                </tr> 
                                 <tr>
                                    <td>예측</td>
                                    <td><span id="load_predic_0h">-</span></td>
                                    <td><span id="load_predic_1h">-</span></td>
                                    <td><span id="load_predic_2h">-</span></td>
                                    <td><span id="load_predic_3h">-</span></td>
                                    <td><span id="load_predic_4h">-</span></td>
                                    <td><span id="load_predic_5h">-</span></td>
                                    <td><span id="load_predic_6h">-</span></td>
                                    <td><span id="load_predic_7h">-</span></td>
                                    <td><span id="load_predic_8h">-</span></td>
                                    <td><span id="load_predic_9h">-</span></td>
                                    <td><span id="load_predic_10h">-</span></td>
                                    <td><span id="load_predic_11h">-</span></td> 
                                </tr>
                                <tr>
                                    <td>실제값</td>
                                    <td><span id="load_real_0h">-</span></td>
                                    <td><span id="load_real_1h">-</span></td>
                                    <td><span id="load_real_2h">-</span></td>
                                    <td><span id="load_real_3h">-</span></td>
                                    <td><span id="load_real_4h">-</span></td>
                                    <td><span id="load_real_5h">-</span></td>
                                    <td><span id="load_real_6h">-</span></td>
                                    <td><span id="load_real_7h">-</span></td>
                                    <td><span id="load_real_8h">-</span></td>
                                    <td><span id="load_real_9h">-</span></td>
                                    <td><span id="load_real_10h">-</span></td>
                                    <td><span id="load_real_11h">-</span></td> 
                                </tr> 
                                <tr>
                                    <td>오차율</td>
                                    <td><span id="load_error_0h">-</span></td>
                                    <td><span id="load_error_1h">-</span></td>
                                    <td><span id="load_error_2h">-</span></td>
                                    <td><span id="load_error_3h">-</span></td>
                                    <td><span id="load_error_4h">-</span></td>
                                    <td><span id="load_error_5h">-</span></td>
                                    <td><span id="load_error_6h">-</span></td>
                                    <td><span id="load_error_7h">-</span></td>
                                    <td><span id="load_error_8h">-</span></td>
                                    <td><span id="load_error_9h">-</span></td>
                                    <td><span id="load_error_10h">-</span></td>
                                    <td><span id="load_error_11h">-</span></td> 
                                </tr>
                                <tr>
                                    <th>-</th> 
                                    <th>12H</th>
                                    <th>13H</th>
                                    <th>14H</th>
                                    <th>15H</th>
                                    <th>16H</th>
                                    <th>17H</th>
                                    <th>18H</th>
                                    <th>19H</th>
                                    <th>20H</th>
                                    <th>21H</th>
                                    <th>22H</th>
                                    <th>23H</th> 
                                </tr> 
                                 <tr>
                                    <td>예측</td>
                                    <td><span id="load_predic_12h">-</span></td>
                                    <td><span id="load_predic_13h">-</span></td>
                                    <td><span id="load_predic_14h">-</span></td>
                                    <td><span id="load_predic_15h">-</span></td>
                                    <td><span id="load_predic_16h">-</span></td>
                                    <td><span id="load_predic_17h">-</span></td>
                                    <td><span id="load_predic_18h">-</span></td>
                                    <td><span id="load_predic_19h">-</span></td>
                                    <td><span id="load_predic_20h">-</span></td>
                                    <td><span id="load_predic_21h">-</span></td>
                                    <td><span id="load_predic_22h">-</span></td> 
                                    <td><span id="load_predic_23h">-</span></td> 
                                </tr>
                                <tr>
                                    <td>실제값</td>
                                    <td><span id="load_real_12h">-</span></td>
                                    <td><span id="load_real_13h">-</span></td>
                                    <td><span id="load_real_14h">-</span></td>
                                    <td><span id="load_real_15h">-</span></td>
                                    <td><span id="load_real_16h">-</span></td>
                                    <td><span id="load_real_17h">-</span></td>
                                    <td><span id="load_real_18h">-</span></td>
                                    <td><span id="load_real_19h">-</span></td>
                                    <td><span id="load_real_20h">-</span></td>
                                    <td><span id="load_real_21h">-</span></td>
                                    <td><span id="load_real_22h">-</span></td> 
                                    <td><span id="load_real_23h">-</span></td> 
                                </tr> 
                                <tr>
                                    <td>오차율</td>
                                    <td><span id="load_error_12h">-</span></td>
                                    <td><span id="load_error_13h">-</span></td>
                                    <td><span id="load_error_14h">-</span></td>
                                    <td><span id="load_error_15h">-</span></td>
                                    <td><span id="load_error_16h">-</span></td>
                                    <td><span id="load_error_17h">-</span></td>
                                    <td><span id="load_error_18h">-</span></td>
                                    <td><span id="load_error_19h">-</span></td>
                                    <td><span id="load_error_20h">-</span></td>
                                    <td><span id="load_error_21h">-</span></td>
                                    <td><span id="load_error_22h">-</span></td> 
                                    <td><span id="load_error_23h">-</span></td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="gen_predict_wrap"> 
                    <div class="gen_chart_wrap">
                        <strong>발전예측 그래프</strong>	
                        <div class="gen_canvas_wrap">
                            <canvas id="gen_chart"></canvas>
                        </div>
                    </div>
                
                    <div class="gen_table_wrap">
                        <table class="data_table center"> 
                            <tbody>
                                <tr>
                                    <th>-</th>                                    
                                    <th>0H</th>
                                    <th>1H</th>
                                    <th>2H</th>
                                    <th>3H</th>
                                    <th>4H</th>
                                    <th>5H</th>
                                    <th>6H</th>
                                    <th>7H</th>
                                    <th>8H</th>
                                    <th>9H</th>
                                    <th>10H</th>
                                    <th>11H</th>
                                </tr>  
                                <tr>
                                    <td>예측</td> 
                                    <td><span id="pv_forecast_0h">-</span></td>
                                    <td><span id="pv_forecast_1h">-</span></td>
                                    <td><span id="pv_forecast_2h">-</span></td>
                                    <td><span id="pv_forecast_3h">-</span></td>
                                    <td><span id="pv_forecast_4h">-</span></td>
                                    <td><span id="pv_forecast_5h">-</span></td>
                                    <td><span id="pv_forecast_6h">-</span></td>
                                    <td><span id="pv_forecast_7h">-</span></td>
                                    <td><span id="pv_forecast_8h">-</span></td>
                                    <td><span id="pv_forecast_9h">-</span></td>
                                    <td><span id="pv_forecast_10h">-</span></td>
                                    <td><span id="pv_forecast_11h">-</span></td>
                                </tr>
                                <tr>
                                    <td>실제값</td> 
                                    <td><span id="pv_real_0h">-</span></td>
                                    <td><span id="pv_real_1h">-</span></td>
                                    <td><span id="pv_real_2h">-</span></td>
                                    <td><span id="pv_real_3h">-</span></td>
                                    <td><span id="pv_real_4h">-</span></td>
                                    <td><span id="pv_real_5h">-</span></td>
                                    <td><span id="pv_real_6h">-</span></td>
                                    <td><span id="pv_real_7h">-</span></td>
                                    <td><span id="pv_real_8h">-</span></td>
                                    <td><span id="pv_real_9h">-</span></td>
                                    <td><span id="pv_real_10h">-</span></td>
                                    <td><span id="pv_real_11h">-</span></td>
                                </tr>
                                <tr>
                                    <td>오차율</td> 
                                    <td><span id="pv_error_0h">-</span></td>
                                    <td><span id="pv_error_1h">-</span></td>
                                    <td><span id="pv_error_2h">-</span></td>
                                    <td><span id="pv_error_3h">-</span></td>
                                    <td><span id="pv_error_4h">-</span></td>
                                    <td><span id="pv_error_5h">-</span></td>
                                    <td><span id="pv_error_6h">-</span></td>
                                    <td><span id="pv_error_7h">-</span></td>
                                    <td><span id="pv_error_8h">-</span></td>
                                    <td><span id="pv_error_9h">-</span></td>
                                    <td><span id="pv_error_10h">-</span></td>
                                    <td><span id="pv_error_11h">-</span></td>
                                </tr>
                                <tr>
                                    <th>-</th>                                                                        
                                    <th>12H</th>
                                    <th>13H</th>
                                    <th>14H</th>
                                    <th>15H</th>
                                    <th>16H</th>
                                    <th>17H</th>
                                    <th>18H</th>
                                    <th>19H</th>
                                    <th>20H</th>
                                    <th>21H</th>
                                    <th>22H</th>
                                    <th>23H</th>
                                </tr>
                                <tr>
                                    <td>예측</td> 
                                    <td><span id="pv_forecast_12h">-</span></td>
                                    <td><span id="pv_forecast_13h">-</span></td>
                                    <td><span id="pv_forecast_14h">-</span></td>
                                    <td><span id="pv_forecast_15h">-</span></td>
                                    <td><span id="pv_forecast_16h">-</span></td>
                                    <td><span id="pv_forecast_17h">-</span></td>
                                    <td><span id="pv_forecast_18h">-</span></td>
                                    <td><span id="pv_forecast_19h">-</span></td>
                                    <td><span id="pv_forecast_20h">-</span></td>
                                    <td><span id="pv_forecast_21h">-</span></td>
                                    <td><span id="pv_forecast_22h">-</span></td>
                                    <td><span id="pv_forecast_23h">-</span></td>
                                </tr>
                                <tr>
                                    <td>실제값</td> 
                                    <td><span id="pv_real_12h">-</span></td>
                                    <td><span id="pv_real_13h">-</span></td>
                                    <td><span id="pv_real_14h">-</span></td>
                                    <td><span id="pv_real_15h">-</span></td>
                                    <td><span id="pv_real_16h">-</span></td>
                                    <td><span id="pv_real_17h">-</span></td>
                                    <td><span id="pv_real_18h">-</span></td>
                                    <td><span id="pv_real_19h">-</span></td>
                                    <td><span id="pv_real_20h">-</span></td>
                                    <td><span id="pv_real_21h">-</span></td>
                                    <td><span id="pv_real_22h">-</span></td>
                                    <td><span id="pv_real_23h">-</span></td>
                                </tr> 
                                <tr>
                                     <td>오차율</td> 
                                    <td><span id="pv_error_12h">-</span></td>
                                    <td><span id="pv_error_13h">-</span></td>
                                    <td><span id="pv_error_14h">-</span></td>
                                    <td><span id="pv_error_15h">-</span></td>
                                    <td><span id="pv_error_16h">-</span></td>
                                    <td><span id="pv_error_17h">-</span></td>
                                    <td><span id="pv_error_18h">-</span></td>
                                    <td><span id="pv_error_19h">-</span></td>
                                    <td><span id="pv_error_20h">-</span></td>
                                    <td><span id="pv_error_21h">-</span></td>
                                    <td><span id="pv_error_22h">-</span></td>
                                    <td><span id="pv_error_23h">-</span></td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>  
                </div>
            </div>
            <div class="prediction_wrap table_wrap">
                <div class="day_table_wrap">
                    <div>
                        <strong>일일 오차율</strong>
                    </div>
                    <div class="day_table">
                        <table class="data_table center">
                            <tbody>
                                <tr>
                                   <th>0H</th><th>1H</th><th>2H</th><th>3H</th><th>4H</th>
                                   <th>5H</th><th>6H</th><th>7H</th><th>8H</th><th>9H</th>
                                   <th>10H</th><th>11H</th>
                                </tr>
                                <tr>
                                    <td><span id="dd_error_0h">-</span></td>
                                    <td><span id="dd_error_1h">-</span></td>
                                    <td><span id="dd_error_2h">-</span></td>                                    
                                    <td><span id="dd_error_3h">-</span></td>
                                    <td><span id="dd_error_4h">-</span></td>
                                    <td><span id="dd_error_5h">-</span></td>
                                    <td><span id="dd_error_6h">-</span></td>
                                    <td><span id="dd_error_7h">-</span></td>
                                    <td><span id="dd_error_8h">-</span></td>
                                    <td><span id="dd_error_9h">-</span></td>
                                    <td><span id="dd_error_10h">-</span></td>
                                    <td><span id="dd_error_11h">-</span></td>
                                </tr>
                                 <tr>
                                   <th>12H</th>
                                   <th>13H</th>
                                   <th>14H</th>
                                   <th>15H</th>
                                   <th>16H</th>
                                   <th>17H</th>
                                   <th>18H</th>
                                   <th>19H</th>
                                   <th>20H</th>
                                   <th>21H</th>
                                   <th>22H</th>
                                   <th>23H</th>
                                </tr>
                                <tr>
                                   <td><span id="dd_error_12h">-</span></td>
                                   <td><span id="dd_error_13h">-</span></td>
                                   <td><span id="dd_error_14h">-</span></td>
                                   <td><span id="dd_error_15h">-</span></td>
                                   <td><span id="dd_error_16h">-</span></td>
                                   <td><span id="dd_error_17h">-</span></td>
                                   <td><span id="dd_error_18h">-</span></td>
                                   <td><span id="dd_error_19h">-</span></td>
                                   <td><span id="dd_error_20h">-</span></td>
                                   <td><span id="dd_error_21h">-</span></td>
                                   <td><span id="dd_error_22h">-</span></td>
                                   <td><span id="dd_error_23h">-</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="week_table_wrap">
                    <div>
                        <strong>주간 오차율</strong>
                    </div>
                    <div class="week_table">
                        <table class="data_table center">                            
                            <tbody>
                                <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>                                    
                                </tr>
                                <tr>
                                    <td><span id="week_forcast_0">-</span></td>
                                    <td><span id="week_forcast_1">-</span></td>
                                    <td><span id="week_forcast_2">-</span></td>
                                    <td><span id="week_forcast_3">-</span></td>
                                    <td><span id="week_forcast_4">-</span></td>
                                    <td><span id="week_forcast_5">-</span></td>
                                    <td><span id="week_forcast_6">-</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> 
                <div class="month_table_wrap">
                    <div>
                        <strong>월별 오차율</strong>
                    </div>
                    <div class="month_table">
                        <table class="data_table center">
                            <tbody> 
                               <tr>
                                   <th>1M</th>
                                   <th>2M</th>
                                   <th>3M</th>
                                   <th>4M</th>
                                   <th>5M</th>
                                   <th>6M</th>
                               </tr>
                               <tr>
                                   <td id="month_1h">-</td>
                                   <td>-</td>
                                   <td>-</td>
                                   <td>-</td>
                                   <td>-</td>
                                   <td>-</td>
                               </tr>
                               <tr>
                                   <th>7M</th>
                                   <th>8M</th>
                                   <th>9M</th>
                                   <th>10M</th>
                                   <th>11M</th>
                                   <th>12M</th>                                   
                               </tr>
                               <tr>
                                   <td>-</td>
                                   <td>-</td>
                                   <td>-</td>
                                   <td>-</td>
                                   <td>-</td>
                                   <td id="month_12h">-</td>
                               </tr>
                            </tbody>
                        </table>
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
          {rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'}
      ],
      script: [ 
      ]
    },
    data() {
        return{
            forcast_load : null,
            forcast_gen : null,
            period1:null,
            period2:null,
            graph1 : null,
            graph2 : null, 
            url_drill : process.env.url_drill,
            selectedMenuName : 'load',
            selectedRcc : "1",
            errorMonth : [0.01, 0.02]
        }
    },
    beforeMount() {
		console.log('beforeMounted - predictino')
	},
    updated() {
		console.log('updated - prediction');
	},
    methods:{ 
        change : function(menu){
            if(menu == 'load')
            {
                document.getElementById('load_predict_wrap').style.display = "block";
                document.getElementById('gen_predict_wrap').style.display = "none";
                // document.getElementById('weather_predict_wrap').style.display = "none";

                document.getElementById('btn_load').classList.add('active');
                document.getElementById('btn_gen').classList.remove('active');
                // document.getElementById('btn_wether').classList.remove('active');
                this.selectedMenuName = 'load'; 
                // this.offSelectBox();
            }else if(menu == 'gen')
            {
                document.getElementById('load_predict_wrap').style.display = "none";
                document.getElementById('gen_predict_wrap').style.display = "block";
                // document.getElementById('weather_predict_wrap').style.display = "none";

                document.getElementById('btn_load').classList.remove('active');
                document.getElementById('btn_gen').classList.add('active');
                // document.getElementById('btn_wether').classList.remove('active');
                this.selectedMenuName ='gen';
                // this.onSelectBox();
            }
        },
        initMenu : function(){
            document.getElementById('load_predict_wrap').style.display = "block";
            document.getElementById('gen_predict_wrap').style.display = "none";
            // document.getElementById('weather_predict_wrap').style.display = "none";

            document.getElementById('btn_load').classList.add('active');
            document.getElementById('btn_gen').classList.remove('active');
            // document.getElementById('btn_wether').classList.remove('active');
        },
        initGraph1 : function(){
            // load_chart
            var ctx1 = document.getElementById('load_chart').getContext('2d');
            this.graph1 = new Chart(ctx1, {
                type: 'line',
                data :{
                    labels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                    datasets : [{
                            label : "예측값",
                            data : [],
                            background : 'rgba(84,156,254, .2)',
                            borderColor : '#22B14C',
                            pointRadius : 3,
                            borderWidth : 3
                        },
                        {
                            label : "실제값",
                            data : [],
                            background : 'rgba(34,126,154, .2)',
                            borderColor : '#3F48CC',
                            pointRadius : 3,
                            borderWidth : 3
                        },
                        {
                            label : "오차율",
                            data : [],
                            background : 'rgba(84,156,254, .2)',
                            borderColor : '#F2454C',
                            pointRadius : 3,
                            borderWidth : 3
                        }
                    ],
                },
                options : {
                    title : {
                        text : "부하 예측"
                    },
                maintainAspectRatio: false, 
                }
            })
        },
        
        initGraph2 : function(){
            // gen_chart
            var ctx1 = document.getElementById('gen_chart').getContext('2d');
            this.graph2 = new Chart(ctx1, {
                type: 'line',
                data :{
                    labels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                    datasets : [{
                            label : "예측값",
                            data : [],
                            background : 'rgba(84,156,254, .2)',
                            borderColor : '#22B14C',
                            pointRadius : 3,
                            borderWidth : 3
                        },
                        {
                            label : "실제값",
                            data : [],
                            background : 'rgba(34,126,154, .2)',
                            borderColor : '#3F48CC',
                            pointRadius : 3,
                            borderWidth : 3
                        },
                        {
                            label : "오차율",
                            data : [],
                            background : 'rgba(84,156,254, .2)',
                            borderColor : '#F2454C',
                            pointRadius : 3,
                            borderWidth : 3
                                                    }
                    ],
                },
                options : {
                    title : {
                        text : "발전 예측"
                    },                    
                    maintainAspectRatio: false, 
                }
            })
        },
        getData : function(){ 
            if(this.selectedMenuName == 'load'){
                this.setLoadForecastData_onWeek();
                this.setLoadForecastData();
            }else{
                this.setGenForecastData();
            }   
            
        },
        setLoadForecastData_onWeek : function(){
            /**
             * {      "queryType" : "SQL",
             *       "query" : " select * from dfs.view.loadforecast_onweek"
             * }
             */

            var data = {
                queryType : 'SQL',
                query : "select * from mysql.aggdb.load_weekly_forecast"
            };
            data = JSON.stringify(data);
            $.ajax({
                url : this.url_drill,
                data : data,
                type : 'post',
                contentType : 'application/json',
                xhrFields: {withCredentials:true}, 
                xhrFields : {withCredentials : true},
                success : this.recvWeekData,
                error : function(jqXHR, textStatus, errorThrown){
                    console.log('error setLoadForecastdat_onWeek');
                    console.log(jqXHR);
                }
            })
        },
        recvWeekData : function(data, textStatus, jqXHR){
            data.rows.forEach((v, i, a) =>{
                var value = Number(v.rate).toFixed(2);
                document.getElementById('week_forcast_'+i).innerHTML = value;
            })
        },
        setGenForecastData : function(){
            /**
             * {
             *      "queryType" : "SQL",
             *      "query" : "SELECT * FROM mongo.ESS_History.`LoadForecast` where CAST(datetime as DATE) = CAST('2018-12-01' as DATE)  order by datetime"
             * }
             */
            var date = new Date();
            var currentDT = date.getFullYear() +'-'+ (date.getMonth()+1)+"-"+date.getDate();
            console.log(currentDT);
            var data = {
                queryType : 'SQL',
                query : "SELECT * FROM mysql.aggdb.pv_hourly_forecast where CAST(datetime as DATE) = CAST('"+currentDT+"' as DATE) AND `rcc`="+this.selectedRcc+"  order by datetime "
            };
            data = JSON.stringify(data);
            console.log(data);
            $.ajax({
                url : this.url_drill,                
                type : 'post',
                data : data,
                contentType : 'application/json',
                xhrFields: {withCredentials:true}, 
                success : this.recvPvData,
                error : function(jqXHR, textStatus, errorThrown){ 
                    console.log('error setGenForecastData');
                    console.log(jqXHR);
                }
            })
        },
        recvPvData :  function(data, textStatus, jqXHR){
            if(textStatus == "success")
            {
                if(data.columns.length > 0)
                {
                    var pvMeterList = [];
                    var forecastList = [];
                    var errList = [];
                    var date = new Date();
                    var hour = date.getHours();
                    data.rows.forEach((v, i ,arr) =>{
                        if(hour >= i){
                            pvMeterList.push(v.pv_meter); 
                            errList.push(v.rate);
                        }else{
                            pvMeterList.push('-'); 
                            errList.push('-');
                        }
                        forecastList.push(v.pv_forecast);                
                    });

                    this.graph2.data.datasets[0].data = forecastList.slice();
                    this.graph2.data.datasets[1].data = pvMeterList.slice();
                    this.graph2.data.datasets[2].data = errList.slice();

                    // forecastList.forEach((v, i) =>{
                    //     this.graph2.data.datasets[0].data.push(Number(v));
                    // })
                    // loadList.forEach((v, i) =>{
                    //     this.graph2.data.datasets[1].data.push(Number(v));
                    // }) 
                    // errList.forEach((v, i) =>{
                    //     this.graph2.data.datasets[2].data.push(Number(v));
                    // })
        
                    pvMeterList.forEach((v, i, a) =>{
                        if(isNaN(v) == true)
                        {
                            document.getElementById('pv_real_'+i+'h').innerHTML = v;
                        }else{
                            this.graph2.data.datasets[1].data.push(Number(v));
                            document.getElementById('pv_real_'+i+'h').innerHTML = Number(v).toFixed(2);
                        }
                        
                    })

                    errList.forEach((v, i, a) =>{
                        if(isNaN(v) == true)
                        {
                            document.getElementById('pv_error_'+i+'h').innerHTML = v;
                        }
                        else{
                            this.graph2.data.datasets[2].data.push(Number(v));
                            document.getElementById('pv_error_'+i+'h').innerHTML = Number(v).toFixed(2);
                            document.getElementById('dd_error_'+i+'h').innerHTML = Number(v).toFixed(2);
                        }
                        
                    })

                    forecastList.forEach((v, i, a) =>{
                        document.getElementById('pv_forecast_'+i+'h').innerHTML = Number(v).toFixed(2);
                    }) 

                    this.graph2.update(); 
                }else
                {
                    alert('데이터가 없습니다.');
                }  

            }
        },
        setLoadForecastData : function(){
            /**
             * {
             *      "queryType" : "SQL",
             *      "query" : "SELECT * FROM mongo.ESS_History.`LoadForecast` where CAST(datetime as DATE) = CAST('2018-12-01' as DATE)  order by datetime"
             * }
             */
            var date = new Date();
            var currentDT = date.getFullYear() +'-'+ (date.getMonth()+1)+"-"+date.getDate();
            console.log(currentDT);
            var data = {
                queryType : 'SQL',
                // query : "SELECT * FROM mysql.aggdb.load_forecast where rcc = "+this.selectedRcc+" AND  CAST(datetime as DATE) = CAST('"+currentDT+"' as DATE)  order by datetime"
                query : "SELECT * FROM mysql.aggdb.pv_hourly_forecast where `datetime` = '"+currentDT+"' AND `rcc`=1  order by datetime "
            };
            data = JSON.stringify(data);
            console.log(data);
            $.ajax({
                url : this.url_drill,                
                type : 'post',
                data : data,
                contentType : 'application/json',
                xhrFields: {withCredentials:true}, 
                success : this.recvLoadData,
                error : function(jqXHR, textStatus, errorThrown){ 
                    console.log('error setLoadForecastData');
                    console.log(jqXHR);
                }
            })
        },
        recvLoadData :  function(data, textStatus, jqXHR){
            var loadList = [];
            var forecastList = [];
            var errList = [];
            var date = new Date();
            var hour = date.getHours();
            data.rows.forEach((v, i ,arr) =>{
                if(hour >= i){
                    loadList.push(v.load); 
                    errList.push(v.rate);
                }else{
                    loadList.push('-'); 
                    errList.push('-');
                }
                forecastList.push(v.load_forecast);                
            });

            this.graph1.data.datasets[0].data = [];
            this.graph1.data.datasets[1].data = [];
            this.graph1.data.datasets[2].data = [];

            forecastList.forEach((v, i) =>{
                this.graph1.data.datasets[0].data.push(Number(v));
            })
            loadList.forEach((v, i) =>{
                this.graph1.data.datasets[1].data.push(Number(v));
            }) 
            errList.forEach((v, i) =>{
                this.graph1.data.datasets[2].data.push(Number(v));
            })
 
            loadList.forEach((v, i, a) =>{
                if(isNaN(v) == true)
                {
                    document.getElementById('load_real_'+i+'h').innerHTML = v;
                }else{
                    this.graph1.data.datasets[1].data.push(Number(v));
                    document.getElementById('load_real_'+i+'h').innerHTML = Number(v).toFixed(2);
                }
                
            })

            errList.forEach((v, i, a) =>{
                 if(isNaN(v) == true)
                {
                    document.getElementById('load_error_'+i+'h').innerHTML = v;
                }
                else{
                    this.graph1.data.datasets[2].data.push(Number(v));
                    document.getElementById('load_error_'+i+'h').innerHTML = Number(v).toFixed(2);
                    document.getElementById('dd_error_'+i+'h').innerHTML = Number(v).toFixed(2);
                }
                
            })

            forecastList.forEach((v, i, a) =>{
                document.getElementById('load_predic_'+i+'h').innerHTML = Number(v).toFixed(2);
            }) 

            this.graph1.update(); 
        },
        recvGenForcastData : function(){
            this.options.forEach((v, i , a) =>{
                
            });
        },
    },
	middleware : 'authenticated',
    
    mounted() 
    {
        $('.th1').removeClass('active');
        $('#gnav-forcast').addClass('active');
        this.initMenu();

        this.initGraph1();
        this.initGraph2();

        // this.setLoadForecastData_onWeek();
        // this.setLoadForecastData();
        // $('.progressbar').css('display','none');
         

        var d = new Date();
        if(d.getMonth()+1 == 12){
            document.getElementById('month_12h').innerText = this.errorMonth[0] +""
        }
        if(d.getMonth() +1 == 1){
            document.getElementById('month_1h').innerText = this.errorMonth[0] +""
        }
    },
    
  }

  

</script>

<style>
/* .dashboard_wrap {width:100%;height:100%;} */
/* .prediction{width:100%;height:100%;} */
.prediction_wrap{width:57.97rem;height:57rem;float:left;position:relative;padding:1.0625rem 1.0125rem;border:1ps solid #3b3e47;border-radius: 0.3125rem;background:#0a1a28; margin: 1.0625rem 1.0125rem;}
.each_data_wrap{float:left;}
.load_canvas_wrap, .gen_canvas_wrap{height:24.8rem;padding:1rem;}
.table_wrap::after{clear: both;}
.weather_predict_wrap, .gen_predict_wrap{display:none;}
.gen_chart_wrap, .load_chart_wrap, {height:38rem;margin:0.5rem 0;}
.weather_hour_wrap, .weather_week_wrap, .pv_error_wrap{height:11rem;margin:0.5rem 0;}
.week_table_wrap{height:14rem;}
.month_table_wrap{height:34rem;}
.month_table_wrap, .week_table_wrap,{margin:0 0 1.5rem 0;float: left;}
.week_table_wrap::after{clear:both;width:25.5rem;margin:0 0.25rem;}
.day_table_wrap{width:55rem;height:17rem; margin:0 0.25rem;}
.prediction_wrap strong{display:block;margin: 0.9375rem;font-weight: bolder;font-size: 1.875rem;line-height: 1.875rem;color:#fff;letter-spacing: -0.0625rem;}
.btn_conditions{cursor:pointer;}
.btn_inguiry{display: inline-block;width:3.875rem;height:2.125rem;padding:0.4375rem 0;
            border-radius: 0.1875rem;background:#2a75ff;font-size: 1.0625rem;
            line-height: 1.25rem;color:#fff;letter-spacing: -0.03125rem;
            text-align: center;}
.selectbox select{opacity: 1!important;}
</style>
