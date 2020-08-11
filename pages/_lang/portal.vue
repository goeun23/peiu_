<template>
 <section id="content" class="container">
	  <div class="logo"></div>
			<article id="detail_content" class="portal">
    <!-- portal_top -->
				<div class="portal_top">
					<!-- pie_chart_wrap -->
					<div class="pie_chart_wrap">
						<!-- pie_chart_left -->
						<div class="pie_chart_left">
							<!-- pie_chart_area -->
							<div class="pie_chart_area">
								<svg version="1.1" style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="265" height="265" viewBox="0 0 265 265">
									<!-- <desc>당일충전량</desc> -->
									<desc>{{$t("customerPortal.charge1")}}</desc>
									<defs>
										<clipPath id="pie_chart1">
											<rect x="0" y="0" width="245" height="200" fill="none"></rect>
										</clipPath>
									</defs>
									<rect fill="none" class="pie_chart-background" x="0" y="0" width="265" height="265" rx="0" ry="0"></rect>
									<rect fill="none" class="pie_chart-plot-background" x="10" y="50" width="245" height="200"></rect>
									<g class="pie_chart-pane-group">
										<path fill="rgba(35,41,57,1)" d="M 132.5 54.8 A 95.2 95.2 0 1 1 132.4048000158666 54.800047599996034 M 132.42520001246663 75.20003739999689 A 74.8 74.8 0 1 0 132.5 75.2 " class="pie_chart-pane "></path>
									</g>
									<g class="pie_chart-grid pie_chart-yaxis-grid "></g>
									<rect fill="none" class="pie_chart-plot-border" x="10" y="50" width="245" height="200"></rect>
									<g class="pie_chart-axis pie_chart-yaxis ">
										<path fill="none" class="pie_chart-axis-line" d="M 132.5 65 A 85 85 0 1 1 132.41500001416662 65.00004249999645 M 132.5 150 A 0 0 0 1 0 132.5 150 "></path>
									</g>
									<g class="pie_chart-series-group">
										<g class="pie_chart-series pie_state" transform="translate(10,50) scale(1 1)">
											<path fill="#14d9bb" d="" class="pie_chart-point pie_chart-color-0" sweep-flag="0" stroke-linecap="round" stroke-linejoin="round"></path>
										</g>
										<g class="pie_chart-markers pie_chart-series-0 pie_chart-solidgauge-series pie_chart-color-undefined " transform="translate(10,50) scale(1 1)" clip-path="none"></g>
									</g>
								</svg>
								<div class="pie_chart-label">
									<!-- <span class="txt">감소</span> -->
									<!-- <span class="txt">{{$t("customerPortal.reducted ")}}</span> -->
									<span class="per">{{charging_per}}</span>%
								</div>
							</div>
							<!--// pie_chart_area -->
							<!-- pie_chart_info -->
							<div class="pie_chart_info">
								<ul class="info_list">
									<li>
										<dl>
											<!-- <dt>당일충전량(kWh)</dt> -->
											<dt>{{$t("customerPortal.charge1")}}</dt>
											<dd>{{charging1}}</dd>
										</dl>
									</li>
									<li>
										<dl>
											<!-- <dt>당일충전량(kWh)(증강율)</dt> -->
											<dt>{{$t("customerPortal.charge2 ")}}</dt>
											<dd>
												<span class="default_data">{{charging_before}}</span>
												<span id="charging-icon" class="change_per down">
													<i id="charging-icon-status" class="xi-caret-down" aria-hidden="true"></i>{{charging_diff}} %</span>
												<!-- <span class="change_per up"><i class="xi-caret-up" aria-hidden="true"></i>66%</span> -->
											</dd>
										</dl>
									</li>
									<!-- <li style="display:none;">
										<dl>
											 <dt>평균충전량(kWh)</dt>
											<dt>{{$t("customerPortal.year_charge ")}}</dt>
											<dd>{{charging3}}</dd>
										</dl>
									</li> -->
								</ul>
							</div>
							<!--// pie_chart_info -->
						</div>
						<!--// pie_chart_left -->
						<!-- pie_chart_right -->
						<div class="pie_chart_right">
							<!-- pie_chart_area -->
							<div class="pie_chart_area">
								<svg version="1.1" style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="265" height="265" viewBox="0 0 265 265">
									<!-- <desc>당일충방전량</desc> -->
									<desc>{{$t("customerPortal.chg-dischg1 ")}}</desc>
									<defs>
										<clipPath id="pie_chart2">
											<rect x="0" y="0" width="245" height="200" fill="none"></rect>
										</clipPath>
									</defs>
									<rect fill="none" class="pie_chart-background" x="0" y="0" width="265" height="265" rx="0" ry="0"></rect>
									<rect fill="none" class="pie_chart-plot-background" x="10" y="50" width="245" height="200"></rect>
									<g class="pie_chart-pane-group">
										<path fill="rgba(35,41,57,1)" d="M 132.5 54.8 A 95.2 95.2 0 1 1 132.4048000158666 54.800047599996034 M 132.42520001246663 75.20003739999689 A 74.8 74.8 0 1 0 132.5 75.2 " class="pie_chart-pane "></path>
									</g>
									<g class="pie_chart-grid pie_chart-yaxis-grid "></g>
									<rect fill="none" class="pie_chart-plot-border" x="10" y="50" width="245" height="200"></rect>
									<g class="pie_chart-axis pie_chart-yaxis ">
										<path fill="none" class="pie_chart-axis-line" d="M 132.5 65 A 85 85 0 1 1 132.41500001416662 65.00004249999645 M 132.5 150 A 0 0 0 1 0 132.5 150 "></path>
									</g>
									<g class="pie_chart-series-group">
										<g class="pie_chart-series pie_state" transform="translate(10,50) scale(1 1)">
											<path fill="#35b0ff" d="" class="pie_chart-point pie_chart-color-0" sweep-flag="0" stroke-linecap="round" stroke-linejoin="round"></path>
										</g>
										<g class="pie_chart-markers pie_chart-series-0 pie_chart-solidgauge-series pie_chart-color-undefined " transform="translate(10,50) scale(1 1)" clip-path="none"></g>
									</g>
								</svg>
								<div class="pie_chart-label">
									<span class="per">{{discharging_per}}</span>%
								</div>
							</div>
							<!--// pie_chart_area -->
							<!-- pie_chart_info -->
							<div class="pie_chart_info">
								<ul class="info_list">
									<li>
										<dl>
											<!-- <dt>당일충방전량(kWh)</dt> -->
											<dt>{{$t("customerPortal.chg_dischg1 ")}}</dt>
											<dd>{{discharging1}}</dd>
										</dl>
									</li>
									<li>
										<dl>
											<!-- <dt>당일방전량(kWh)(증강율)</dt> -->
											<dt>{{$t("customerPortal.discharge ")}}</dt>
											<dd>
												<span class="default_data">{{discharging_before}}</span>
												<span id="discharging-icon" class="change_per up">
													<i id="discharging-icon-status" class="xi-caret-up" aria-hidden="true"></i>
													{{discharging_diff}}%
												</span>
												<!-- <span class="change_per down"><i class="xi-caret-down" aria-hidden="true"></i>66%</span> -->
											</dd>
										</dl>
									</li>
									<!-- <li style="display:none;">
										<dl>
											<dt>평균방전량(kWh)</dt>
											<dt>{{$t("customerPortal.year_discharge ")}}</dt>
											<dd>{{discharging3}}</dd>
										</dl>
									</li> -->
								</ul>
							</div>
							<!--// pie_chart_info -->
						</div>
						<!--// pie_chart_right -->
					</div>
					<!--// pie_chart_wrap -->
					<!-- battery_wrap -->
					<div class="battery_wrap">
						<!-- battery_left -->
						<div class="battery_left">
							<dl>
								<dt>SOC</dt>
								<dd>
									<div class="battery_cont">
										<span class="battery_gauge_wrap"><span class="battery_gauge"></span></span>
									</div>
									<span class="batter_per">0%</span>
								</dd>
							</dl>
						</div>
						<!--// battery_left -->
						<!-- battery_right -->
						<div class="battery_right">
							<dl>
								<dt>SOH</dt>
								<dd>
									<div class="battery_cont">
										<span class="battery_gauge_wrap"><span class="battery_gauge"></span></span>
									</div>
									<span class="batter_per">99%</span>
								</dd>
							</dl>
						</div>
						<!--// battery_right -->
					</div>
					<!--// battery_wrap -->
					<!-- portal_table_wrap -->
					<div class="portal_table_wrap">
						<div class="portal_table_view">
							<div class="portal_table">
								<table class="battery_table">
								<caption>배터리 타입, 가용용량/설치용량, 가용개수/설치개수, 이벤트개수 정보안내</caption>
									<colgroup>
									<col width="11%" />
									<col width="35%" />
									<col width="33%" />
									<col width="*" />
									</colgroup>
									<thead>
										<tr>
											<!-- <th scope="col">타입</th> -->
											<!-- <th scope="col">가용용량/설치용량</th> -->
											<!-- <th scope="col">가용개수/설치개수</th> -->
											<!-- <th scope="col">이벤트개수</th> -->
											<th scope="col">{{$t("customerPortal.type ")}}</th>
											<th scope="col">{{$t("customerPortal.installed1 ")}}</th>
											<th scope="col">{{$t("customerPortal.installed2 ")}}</th>
											<th scope="col">{{$t("customerPortal.eventCnt ")}}</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>PCS</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>BAT</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PV</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PCS</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>BAT</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PV</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PCS</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>BAT</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PV</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PCS</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>BAT</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
										<tr>
											<td>PV</td>
											<td>1000kW/1000kW</td>
											<td>10/10</td>
											<td>3</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!--// portal_table_wrap -->
				</div>
				<!--// portal_top -->
				<!-- portal_middle -->
				<div class="portal_middle">
					<!-- portal_middle_left -->
					<div class="portal_middle_left portal_chart_wrap">
						<dl>
							<!-- <dt><a href="#">태양광 발전량 <i class="chart_tit_icon"></i></a></dt> -->
							<dt><a href="#">{{$t("customerPortal.pv_gen_amt ")}} <i class="chart_tit_icon"></i></a></dt>
							<dd style="width:892;height:446;position:relative;"><canvas id="portal_chart1"></canvas></dd>
						</dl>
					</div>
					<!--// portal_middle_left -->
					<!-- portal_middle_right -->
					<div class="portal_middle_right portal_chart_wrap">
						<dl>
							<!-- <dt><a href="#">부하 <i class="chart_tit_icon"></i></a></dt> -->
							<dt><a href="#">{{$t("customerPortal.load ")}} <i class="chart_tit_icon"></i></a></dt>
							<dd style="width:892;height:446;position:relative;"><canvas id="portal_chart2"></canvas></dd>
						</dl>
					</div>
					<!--// portal_middle_right -->
				</div>
				<!--// portal_middle -->
				<!-- portal_bottom -->
				<div class="portal_bottom">
					<!-- portal_bottom_left -->
					<div class="portal_bottom_left portal_chart_wrap">
						<dl>
							<!-- <dt><a href="#">충방전량 <i class="chart_tit_icon"></i></a></dt> -->
							<dt><a href="#">{{$t("customerPortal.chg_dischg2 ")}} <i class="chart_tit_icon"></i></a></dt>
							<dd style="width:892;height:446;position:relative;"><canvas id="portal_chart3"></canvas></dd>
						</dl>
					</div>
					<!--// portal_bottom_left -->
					<!-- portal_bottom_right -->
					<div class="portal_bottom_right portal_chart_wrap">
						<dl>
							<dt><a href="#">DR <i class="chart_tit_icon"></i></a></dt>
							<dd style="width:892;height:446;position:relative;"><canvas id="portal_chart4"></canvas></dd>
							
						</dl>
					</div>
					<!--// portal_bottom_right -->
				</div>
				<!--// portal_bottom -->
			</article>
 </section>
</template>

<script>
export default {
  layout : "portal",
  head : {
    script : [
			// {src : "/scripts/portal/portal.js"}, 
			// {src : "/scripts/jquery/core/perfect-scrollbar.js"},  
			// {src : "/scripts/jquery/core/jquery-2.1.4.js"}
    ]
  },
  data(){	
		return{
			chart1 : null,
			chart2 : null,
			chart3 : null,
			chart4 : null,
			charging1 : 99.99,  
			charging_before : null,
			charging_diff : null,
			charging_diffTmp : null,
			charging_per : 0,
			discharging1 : 99.99, 
			discharging_before : null,
			discharging_diff : null,
			discharging_diffTmp : null,
			discharging_per : 0,

		}	
	},
	methods : {
		//태양광 발전량
		initChart1 : function(label1, label2)
		{ 
			var config1 = {
				type: 'line',
				data: {
					labels: [
							'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
							],
					datasets: [{
						label: label1,
						backgroundColor: "#5fb7af",
						borderColor: "#5fb7af",
						borderWidth: 1,//라인 두께 조정 default는 3
						data: [],
						fill: false,
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					}, {
						label: label2,
						fill: false,
						backgroundColor: "transparent",
						borderColor: "#366ba1",
						borderDash: [5, 5],
						borderWidth: 1,
						data: [],
						fill: false,
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					}]
				},
				options: {
					// responsive: true,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					legend: {
						position: 'top',
						labels: {
                fontColor: "white",             
            }
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true, 
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: '24H'
							},gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white", 
								min: 0,
								max: 24
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: 'MW'
								
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white",
								// min: 0,
								// max: 9999
							}
						}]
					}
				}
			};
			var ctx1 = document.getElementById('portal_chart1').getContext('2d');
			this.chart1 = new Chart(ctx1, config1);
		},
		//부하
		initChart2 : function(label1, label2)
		{
			var config2 = {//부하
				type: 'line',
				data: {
					labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
					datasets: [{
						label: label1,
						backgroundColor: "#5fb7af",
						borderColor: "#5fb7af",	 
						data: [0],
						fill: false,
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					}]
				},
				options: {
					// responsive: true,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					legend: {
						position: 'top',
						labels: {
                fontColor: "white",             
            }
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: { 
								fontColor: "white", 
								display: true,
								labelString: '24H'
							},gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
							 	fontColor: "white",
								min: 0,
								max: 24
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: 'MW'								
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white", 
							}
						}]
					}
				}
			};
			var ctx2 = document.getElementById('portal_chart2').getContext('2d');
			this.chart2 = new Chart(ctx2, config2);
		},
		//충방전량
		initChart3 : function(label1, label2)
		{ 
			var config3 = {
				type: 'bar',
				data: {
					labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
					datasets: [{
						// label: '충전량',
						label: label1,
						borderColor: '#5fb7af',
						backgroundColor: '#5fb7af',
						data: [						],
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					},{
						// label: '방전량',
						label : label2,
						borderColor: '#366ba1',
						backgroundColor: '#366ba1',
						data: [
						],
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					}]
				},options: {
					//responsive: true,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: 'Chart.js Line Chart - Stacked Area'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					legend: {
						position: 'top',
						labels: {
                fontColor: "white",             
            }
					},
					hover: {
						mode: 'index'
					},
					scales: {
						xAxes: [{
							stacked: true,
							scaleLabel: {
								fontColor: "white",
								display: true,
								labelString: '24H'
							},
							ticks :{
								fontColor: "white", 
							}
						}],
						yAxes: [{
							stacked: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: 'MW'
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white", 
							}
						}]
					}
				}
			};
			var ctx3 = document.getElementById('portal_chart3').getContext('2d');
			this.chart3 = new Chart(ctx3, config3);
		},
		initChart4 : function(label1, label2)
		{
			var config4 = {//DR
			type: 'line',
			data: {
				labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
				datasets: [{
					// label: '절감량',
					label: label1,
					backgroundColor: "#3a77b5",
					borderColor: "#3a77b5",
					borderWidth: 1,
					data: [],
					fill : false,					
					pointHitRadius: 0,
					pointRadius: 0,
					lineTension: 0
				}]
			},
			options: {
				// responsive: true,
				maintainAspectRatio: false,
				title: {
					display: false,
					text: 'Chart.js Line Chart - Stacked Area'
				},
				tooltips: {
					mode: 'index',
				},
				legend: {
					position: 'top',
					labels: {
                fontColor: "white",             
            }
				},
				hover: {
					mode: 'index'
				},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: { 
								fontColor: "white", 
								display: true,
								labelString: '24H'
							},gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
							 	fontColor: "white",
								min: 0,
								max: 24
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								fontColor: "white", 
								display: true,
								labelString: 'MW'								
							},
							gridLines: {
								drawBorder: true,
								color: '#2a2f3d'
							},
							ticks: {
								fontColor: "white", 
							}
						}]
					}
			} 
		};
			var ctx4 = document.getElementById('portal_chart4').getContext('2d');
			this.chart4 = new Chart(ctx4, config4);
		},
		updateSoC : function(data){
			batteryGauge(".battery_left", data);//배터리
		},
		updateGraph1 : function(d){
			if(d.minute == 0)
			{
				this.chart1.config.data.datasets[0].data = [];
			}
			this.chart1.config.data.datasets[0].data[d.minute] = d.pv_activePower;

			var forecast = JSON.parse(d.forecast);
			this.chart1.config.data.datasets[1].data = forecast;

			this.chart1.update();
		},
		updateGraph2 : function(d){
				var load = d.rec.LoadMW / 1000;
				if(this.chart2.config.data.datasets[0].data.length >= 24)
				{
					this.chart2.config.data.datasets[0].data.shift();
				}
				this.chart2.config.data.datasets[0].data.push(load);
				this.chart2.update();
		},
		updateChargingValue : function(d){
				this.charging1 = (d.sum_today_accum_charging / 10000).toFixed(2);	
				if(this.charging_diffTmp == null || this.charging_diffTmp == undefined)
				{
					this.charging_before = 0;
					this.charging_diff = 0;	 
					// this.charging_before = d.sum_today_accum_charging;
				}else{					
					this.charging_diff = ((d.sum_today_accum_charging - this.charging_diffTmp) / 10000).toFixed(2);
					this.charging_before = (this.charging_diffTmp / 10000).toFixed(2);

						
						document.getElementById('charging-icon').classList.remove("up");
						document.getElementById('charging-icon').classList.remove("down"); 
						document.getElementById('charging-icon-status').classList.remove("xi-caret-up");
						document.getElementById('charging-icon-status').classList.remove("xi-caret-down");

					if(Number(this.charging_diff) > 0){
						document.getElementById('charging-icon').classList.add("up"); 
						document.getElementById('charging-icon-status').classList.add("xi-caret-up");
					}else if(Number(this.charging_diff) < 0){
						document.getElementById('charging-icon').classList.add("down"); 
						document.getElementById('charging-icon-status').classList.add("xi-caret-down");
					}else{ 
					}
				}	
				// this.charging_per = (Number(this.charging1)/100).toFixed(2);
				 this.charging_per = (Number(this.charging1) / 400).toFixed(2);
				if(Number(this.charging_per) >= 100)
				{
					this.charging_per = 100;
				}
				if(Number(this.charging_per) <= 0)
				{
					this.charging_per = 0;
				}
				go_pieChart1(".pie_chart_left", Math.floor(this.charging_per), "144.00");
				this.charging_diffTmp = d.sum_today_accum_charging;		
		},
		updateDischargingValue : function(d){
				this.discharging1 = Math.abs((d.sum_today_accum_discharging / 30000)).toFixed(2);	
				this.discharging_per = (Number(this.discharging1)/ 40).toFixed(2);
				if(this.discharging_diffTmp == null || this.discharging_diffTmp == undefined)
				{
					this.discharging_before = 0;
					this.discharging_diff = 0;	 
					// this.charging_before = d.sum_today_accum_charging;
				}else{					
					this.discharging_diff = ((Math.abs(d.sum_today_accum_discharging) - this.discharging_diffTmp) / 30000 ).toFixed(2);
					this.discharging_before = (this.discharging_diffTmp / 30000).toFixed(2);

						
						document.getElementById('discharging-icon').classList.remove("up");
						document.getElementById('discharging-icon').classList.remove("down"); 
						document.getElementById('discharging-icon-status').classList.remove("xi-caret-up");
						document.getElementById('discharging-icon-status').classList.remove("xi-caret-down");

					if(Number(this.discharging_diff) > 0){
						document.getElementById('discharging-icon').classList.add("up"); 
						document.getElementById('discharging-icon-status').classList.add("xi-caret-up");
					}else if(Number(this.discharging_diff) < 0){
						document.getElementById('discharging-icon').classList.add("down"); 
						document.getElementById('discharging-icon-status').classList.add("xi-caret-down");
					}else{ 
					}
				}	
				// this.disharging_per = this.discharging1;
				var tt = Math.floor(this.discharging_per );
				if(tt > 100)
				{
					tt = 100;
				}
				if(tt <=0){
					tt = 0;
				}
				console.log('per : ' +tt);
				go_pieChart1(".pie_chart_right",tt, "144.00");
				this.discharging_diffTmp = Math.abs(d.sum_today_accum_discharging);		

		},
		updateGraph3 : function(d){
			var c = d.sum_today_accum_charging/100000;
			var dc = d.sum_today_accum_discharging/ 100000;
			if(this.chart3.config.data.datasets[0].data.length >= 24)
			{
				this.chart3.config.data.datasets[0].data.shift();
			}
			this.chart3.config.data.datasets[0].data.push(c);

			if(this.chart3.config.data.datasets[1].data.length >= 24)
			{
				this.chart3.config.data.datasets[1].data.shift();
			}
			this.chart3.config.data.datasets[1].data.push(dc);
			this.chart3.update();
		},updateGraph4 : function(d){
			if(this.chart4.config.data.datasets[0].data.length >= 24)
			{
				this.chart4.config.data.datasets[0].data.shift();
			}
			this.chart4.config.data.datasets[0].data.push(d.market_dr_charging);
			this.chart4.update();
		},
		updatePitChart1(d){

		},updatePitChart2(d){

		}
	},
	created() {},
	beforeDestroy() {
		// $off method will turned off the event listner
		this.$nuxt.$off("customerPortal-evt");
	}, 
	middleware : 'authenticated',
	mounted() {
		// 	$(document).ready(function(){
		$('.th1').removeClass('active');
		$('#gnav-portal').addClass('active');

		this.$nuxt.$on("customerPortal-evt", data => {
			this.updateSoC(Number(data[5].soc_average).toFixed(0));
			this.updateGraph1(data[5]);//강원도
			this.updateGraph2(data[16]);//
			this.updateGraph3(data[5]); // 강원도

			this.updateChargingValue(data[5]);
			this.updateDischargingValue(data[5]);		
			
			this.updateGraph4(data[5]);
			// this.updatePitChart1(data[5]);
			// this.updatePitChart2(data[5]);
		});



		// });

		new PerfectScrollbar('.portal_table tbody');//커스텀 스크롤
		
		batteryGauge(".battery_left", 99);//배터리
		batteryGauge(".battery_right", 99);//배터리
		
		//파이차트 (대상, 200%를 100로 계산하여 입력 index값이라 정수만, 실제 수치상 적히는 %입력)
		go_pieChart1(".pie_chart_right", 72,"144.00");
		//증가 감소 분리된 파이차트 (대상, 증가 감소[plus, minus], 100%를 50으로 계산하여 입력 index값이라 정수만, 실제 수치상 적히는 %입력)
		go_pieChart2(".pie_chart_left", "plus", 36,"72");

		this.initChart1(this.$t("customerPortal.today1"),this.$t("customerPortal.forcast"));
		this.initChart2(this.$t("customerPortal.today1"),this.$t("customerPortal.forcast"));
		this.initChart3(this.$t("customerPortal.charge1"),this.$t("customerPortal.discharge2"));
		this.initChart4(this.$t("customerPortal.reducted"),this.$t("customerPortal.goal"));
	},
}
</script>
