<template>
	<section id="content" class="container">
		<div class="logo"></div>
		<article id="detail_content" class="portal">
			<div>
				<select v-model="selectedSite" @change="selectSite()">
					<option
						v-for="row in siteList"
						:key="row.idx"
						:value="row.SiteId"
					>{{row.AssetName}}({{row.SiteId}})</option>
				</select>
			</div>

			<!--// portal_top -->
			<!-- portal_middle -->
			<div class="portal_middle portal_space">
				<!-- portal_middle_left -->
				<div class="portal_middle_left portal_chart_wrap">
					<dl>
						<!-- <dt><a href="#">태양광 발전량 <i class="chart_tit_icon"></i></a></dt> -->
						<dt>
							<a href="#">
								실시간 발전량
								<i class="chart_tit_icon"></i>
							</a>
						</dt>
						<dd style="width:892;height:446;position:relative;">
							<canvas id="portal_chart1"></canvas>
						</dd>
					</dl>
				</div>
				<!--// portal_middle_left -->
				<!-- portal_middle_right -->
				<div class="portal_middle_right portal_chart_wrap">
					<dl>
						<!-- <dt><a href="#">부하 <i class="chart_tit_icon"></i></a></dt> -->
						<dt>
							<a href="#">
								실시간 거래량
								<i class="chart_tit_icon"></i>
							</a>
						</dt>
						<dd style="width:892;height:446;position:relative;">
							<canvas id="portal_chart2"></canvas>
						</dd>
					</dl>
				</div>
				<!--// portal_middle_right -->
			</div>
			<!--// portal_middle -->
			<!-- portal_bottom -->
			<div class="portal_middle portal_space">
				<!-- portal_bottom_left -->
				<div class="portal_middle_left portal_chart_wrap">
					<dl>
						<!-- <dt><a href="#">충방전량 <i class="chart_tit_icon"></i></a></dt> -->
						<dt>
							<a href="#">
								실시간 충/방전량
								<i class="chart_tit_icon"></i>
							</a>
						</dt>
						<dd style="width:892;height:446;position:relative;">
							<canvas id="portal_chart3"></canvas>
						</dd>
					</dl>
				</div>
				<!--// portal_bottom_left -->
				<!-- portal_bottom_right -->
				<div class="portal_middle_right portal_chart_wrap">
					<dl>
						<dt>
							<a href="#">
								실시간 요금
								<i class="chart_tit_icon"></i>
							</a>
						</dt>
						<dd style="width:892;height:446;position:relative;">
							<canvas id="portal_chart4"></canvas>
						</dd>
					</dl>
				</div>
				<!--// portal_bottom_right -->
			</div>
			<!--// portal_bottom -->
			<div class="portal_middle portal_space">
				<!-- portal_bottom_left -->
				<div class="portal_middle_left portal_chart_wrap portal_data_table">
					<dl>
						<dt>
							<a href="#" @click="showLeftHour()">시간 별</a>
							<a href="#" @click="showLeftDay()">일자 별</a>
							<a href="#" @click="showLeftWeek()">주간 별</a>
							<a href="#" @click="showLeftMonth()">월 별</a>
						</dt>
						<dd style="width:892;height:446;position:relative;">
							<table class="data_table center">
								<tbody>
									<tr>
										<th v-for="data in data_left_header1" :key="data.idx">{{ data.title }}</th>
									</tr>
									<tr>
										<th>발전량(kW)</th>
										<td v-for="data in data_left_row1_1" :key="data.idx">{{ data.value }}</td>
									</tr>
									<tr>
										<th>충방전(kW)</th>
										<td v-for="data in data_left_row2_1" :key="data.idx">{{ data.value }}</td>
									</tr>
									<tr>
										<th v-for="data in data_left_header2" :key="data.idx">{{ data.title }}</th>
									</tr>
									<tr>
										<th>발전량(kW)</th>
										<td v-for="data in data_left_row1_2" :key="data.idx">{{ data.value }}</td>
									</tr>
									<tr>
										<th>충방전(kW)</th>
										<td v-for="data in data_left_row2_2" :key="data.idx">{{ data.value }}</td>
									</tr>
								</tbody>
							</table>
						</dd>
					</dl>
				</div>
				<!--// portal_bottom_left -->
				<!-- portal_bottom_right -->
				<div class="portal_middle_right portal_chart_wrap portal_data_table">
					<dl>
						<dt>
							<a href="#" @click="showRightHour()">시간 별</a>
							<a href="#" @click="showRightDay()">일자 별</a>
							<a href="#" @click="showRightWeek()">주간 별</a>
							<a href="#" @click="showRightMonth()">월 별</a>
						</dt>
						<!-- <dt>
							<a href="#">
								DR
								<i class="chart_tit_icon"></i>
							</a>
						</dt>-->
						<dd style="width:892;height:446;position:relative;">
							<table class="data_table center">
								<tbody>
									<tr>
										<th v-for="data in data_right_header1" :key="data.idx">{{ data.title }}</th>
									</tr>
									<tr>
										<th>발전량(kW)</th>
										<td v-for="data in data_right_row1_1" :key="data.idx">{{ data.value }}</td>
									</tr>
									<tr>
										<th>충방전(kW)</th>
										<td v-for="data in data_right_row2_1" :key="data.idx">{{ data.value }}</td>
									</tr>
									<tr>
										<th v-for="data in data_right_header2" :key="data.idx">{{ data.title }}</th>
									</tr>
									<tr>
										<th>발전량(kW)</th>
										<td v-for="data in data_right_row1_2" :key="data.idx">{{ data.value }}</td>
									</tr>
									<tr>
										<th>충방전(kW)</th>
										<td v-for="data in data_right_row2_2" :key="data.idx">{{ data.value }}</td>
									</tr>
								</tbody>
							</table>
						</dd>
					</dl>
				</div>
				<!--// portal_bottom_right -->
			</div>
		</article>
	</section>
</template>

<script>

const Cookie = process.client ? require('js-cookie') : undefined

export default {
	layout: "portal",
	head: {
		script: [
			// {src : "/scripts/portal/portal.js"}, 
			// {src : "/scripts/jquery/core/perfect-scrollbar.js"},  
			// {src : "/scripts/jquery/core/jquery-2.1.4.js"}
		]
	},
	data() {
		return {
			chart1: null,
			chart2: null,
			chart3: null,
			chart4: null,
			charging1: 99.99,
			charging_before: null,
			charging_diff: null,
			charging_diffTmp: null,
			charging_per: 0,
			discharging1: 99.99,
			discharging_before: null,
			discharging_diff: null,
			discharging_diffTmp: null,
			discharging_per: 0,
			data_left_header1: [],
			data_left_header2: [],
			data_left_row1_1: [],
			data_left_row2_1: [],
			data_left_row1_2: [],
			data_left_row2_2: [],
			data_right_header1: [],
			data_right_header2: [],
			data_right_row1_1: [],
			data_right_row2_1: [],
			data_right_row1_2: [],
			data_right_row2_2: [],
			email: '',
			url_get_data_pcs: process.env.url_get_data_pcs,
			url_get_data_bsc: process.env.url_get_data_bsc,
			url_get_data_pv: process.env.url_get_data_pv,
			url_get_data_ess: process.env.url_get_data_ess,
			url_account_list: process.env.url_account_list,
			SiteId: 0,
			selectedSite: "",
			siteList: [],
			getDataInterval: '',
		}
	},
	methods: {
		selectSite: function () {
			alert('데이터를 수신을 시작합니다.');

			this.getPCSData(this.selectedSite);
			this.getPVData(this.selectedSite);
			this.getESSData(this.selectedSite);
			this.getBSCData(this.selectedSite);

			this.getDataInterval = setInterval(() => {
				this.getPCSData(this.selectedSite);
				this.getPVData(this.selectedSite);
				this.getESSData(this.selectedSite);
				this.getBSCData(this.selectedSite);
			}, 5000)

		},
		getUserList: function () {
			var url = this.url_account_list;
			$.ajax({
				url: url,
				type: 'get',
				success: this.recvUserList,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('getUserList() 연결 실패')
				}
			})
		},
		recvUserList: function (data, textStatus, jqXHR) {
			this.getUserList = [];
			if (data.length > 0) {

				data.forEach((value, index) => {
					if (value.CustomerEmail == this.email) {
						if (value.Assets.length > 0) {
							value.Assets.forEach((asset, idx) => {
								this.siteList.push({
									idx: idx,
									SiteId: asset.SiteId,
									AssetName: asset.AssetName
								})
							})
						}
					}
				});
			}
		},
		getPCSData: function (SiteId) {
			var url = this.url_get_data_pcs + SiteId;
			$.ajax({
				url: url,
				type: 'get',
				success: this.recvPCSData,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('getPCSData() 연결 실패')
				}
			})
		},
		recvPCSData: function (data, textStatus, jqXHR) {
			if (data != 400) {
				this.updateGraph1(data.ActivePower);
			}
		},
		getPVData: function (SiteId) {
			var url = this.url_get_data_pv + SiteId;
			$.ajax({
				url: url,
				type: 'get',
				success: this.recvPVData,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('getPVData() 연결 실패')
				}
			})
		},
		recvPVData: function (data, textStatus, jqXHR) {
			if (data != 400) {
				this.updateGraph3(data.TotalActivePower);
			}
		},
		getESSData: function (SiteId) {
			var url = this.url_get_data_ess + SiteId;
			$.ajax({
				url: url,
				type: 'get',
				success: this.recvESSData,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('getESSData() 연결 실패')
				}
			})
		},
		recvESSData: function (data, textStatus, jqXHR) {
			if (data != 400) {

			}
		},
		getBSCData: function (SiteId) {
			var url = this.url_get_data_bsc + SiteId;
			$.ajax({
				url: url,
				type: 'get',
				success: this.recvBSCData,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log('getBSCData() 연결 실패')
				}
			})
		},
		recvBSCData: function (data, textStatus, jqXHR) {
			if (data != 400) {

			}
		},
		//실시간 발전량
		initChart1: function (label1, label2) {
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
							}, gridLines: {
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
		//실시간 거래량
		initChart2: function (label1, label2) {
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
							}, gridLines: {
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
		//실시간 충/방전량
		initChart3: function (label1, label2) {
			var config3 = {
				type: 'bar',
				data: {
					labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
					datasets: [{
						// label: '충전량',
						label: label1,
						borderColor: '#5fb7af',
						backgroundColor: '#5fb7af',
						data: [],
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					}, {
						// label: '방전량',
						label: label2,
						borderColor: '#366ba1',
						backgroundColor: '#366ba1',
						data: [
						],
						pointHitRadius: 0,
						pointRadius: 0,
						lineTension: 0
					}]
				}, options: {
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
							ticks: {
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
		//실시간 요금
		initChart4: function (label1, label2) {
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
							}, gridLines: {
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
		updateGraph1: function (d) {
			this.chart1.config.data.datasets[1].data.push(d);
			this.chart1.update();
		},
		updateGraph2: function (d) {
			var load = d.rec.LoadMW / 1000;
			if (this.chart2.config.data.datasets[0].data.length >= 24) {
				this.chart2.config.data.datasets[0].data.shift();
			}
			this.chart2.config.data.datasets[0].data.push(load);
			this.chart2.update();
		},
		updateChargingValue: function (d) {
			this.charging1 = (d.sum_today_accum_charging / 10000).toFixed(2);
			if (this.charging_diffTmp == null || this.charging_diffTmp == undefined) {
				this.charging_before = 0;
				this.charging_diff = 0;
				// this.charging_before = d.sum_today_accum_charging;
			} else {
				this.charging_diff = ((d.sum_today_accum_charging - this.charging_diffTmp) / 10000).toFixed(2);
				this.charging_before = (this.charging_diffTmp / 10000).toFixed(2);


				document.getElementById('charging-icon').classList.remove("up");
				document.getElementById('charging-icon').classList.remove("down");
				document.getElementById('charging-icon-status').classList.remove("xi-caret-up");
				document.getElementById('charging-icon-status').classList.remove("xi-caret-down");

				if (Number(this.charging_diff) > 0) {
					document.getElementById('charging-icon').classList.add("up");
					document.getElementById('charging-icon-status').classList.add("xi-caret-up");
				} else if (Number(this.charging_diff) < 0) {
					document.getElementById('charging-icon').classList.add("down");
					document.getElementById('charging-icon-status').classList.add("xi-caret-down");
				} else {
				}
			}
			// this.charging_per = (Number(this.charging1)/100).toFixed(2);
			this.charging_per = (Number(this.charging1) / 400).toFixed(2);
			if (Number(this.charging_per) >= 100) {
				this.charging_per = 100;
			}
			if (Number(this.charging_per) <= 0) {
				this.charging_per = 0;
			}
			go_pieChart1(".pie_chart_left", Math.floor(this.charging_per), "144.00");
			this.charging_diffTmp = d.sum_today_accum_charging;
		},
		updateDischargingValue: function (d) {
			this.discharging1 = Math.abs((d.sum_today_accum_discharging / 30000)).toFixed(2);
			this.discharging_per = (Number(this.discharging1) / 40).toFixed(2);
			if (this.discharging_diffTmp == null || this.discharging_diffTmp == undefined) {
				this.discharging_before = 0;
				this.discharging_diff = 0;
				// this.charging_before = d.sum_today_accum_charging;
			} else {
				this.discharging_diff = ((Math.abs(d.sum_today_accum_discharging) - this.discharging_diffTmp) / 30000).toFixed(2);
				this.discharging_before = (this.discharging_diffTmp / 30000).toFixed(2);


				document.getElementById('discharging-icon').classList.remove("up");
				document.getElementById('discharging-icon').classList.remove("down");
				document.getElementById('discharging-icon-status').classList.remove("xi-caret-up");
				document.getElementById('discharging-icon-status').classList.remove("xi-caret-down");

				if (Number(this.discharging_diff) > 0) {
					document.getElementById('discharging-icon').classList.add("up");
					document.getElementById('discharging-icon-status').classList.add("xi-caret-up");
				} else if (Number(this.discharging_diff) < 0) {
					document.getElementById('discharging-icon').classList.add("down");
					document.getElementById('discharging-icon-status').classList.add("xi-caret-down");
				} else {
				}
			}
			// this.disharging_per = this.discharging1;
			var tt = Math.floor(this.discharging_per);
			if (tt > 100) {
				tt = 100;
			}
			if (tt <= 0) {
				tt = 0;
			}
			console.log('per : ' + tt);
			go_pieChart1(".pie_chart_right", tt, "144.00");
			this.discharging_diffTmp = Math.abs(d.sum_today_accum_discharging);

		},
		updateGraph3: function (d) {

			this.chart3.config.data.datasets[1].data.push();
			this.chart3.update();
		},
		updateGraph4: function (d) {
			this.chart4.config.data.datasets[0].data.push(d);
			this.chart4.update();
		},

		showLeftHour: function () {

			this.data_left_header1 = ["-"];
			this.data_left_header2 = ["-"];
			this.data_left_row1_1 = [];
			this.data_left_row2_1 = [];
			this.data_left_row1_2 = [];
			this.data_left_row2_2 = [];

			for (var i = 0; i < 24; i++) {
				if (i < 12) {
					this.data_left_header1.push({ idx: i, title: i });
					this.data_left_row1_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_left_row2_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				} else {
					this.data_left_header2.push({ idx: i, title: i });
					this.data_left_row1_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_left_row2_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				}

			}
		},
		showLeftDay: function () {
			this.data_left_header1 = ["-"];
			this.data_left_header2 = ["-"];
			this.data_left_row1_1 = [];
			this.data_left_row2_1 = [];
			this.data_left_row1_2 = [];
			this.data_left_row2_2 = [];

			var year = moment().year();
			var month = moment().month() + 1;
			var lastDays = moment(year + "-" + month).daysInMonth();

			for (var i = 0; i < lastDays / 2; i++) {
				this.data_left_header1.push({ idx: i, title: i });
				this.data_left_row1_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				this.data_left_row2_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
			}

			var temp1 = Math.floor(lastDays / 2);
			for (var i = temp1; i < lastDays; i++) {
				this.data_left_header2.push({ idx: i, title: i });
				this.data_left_row1_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				this.data_left_row2_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
			}
		},
		showLeftWeek: function () {
			this.data_left_header1 = ["-"];
			this.data_left_header2 = ["-"];
			this.data_left_row1_1 = [];
			this.data_left_row2_1 = [];
			this.data_left_row1_2 = [];
			this.data_left_row2_2 = [];

			this.data_left_header1.push({ idx: 0, title: "월" });
			this.data_left_header1.push({ idx: 1, title: "화" });
			this.data_left_header1.push({ idx: 2, title: "수" });
			this.data_left_header1.push({ idx: 3, title: "목" });
			this.data_left_header1.push({ idx: 4, title: "금" });
			this.data_left_header1.push({ idx: 5, title: "토" });
			this.data_left_header1.push({ idx: 6, title: "일" });

			this.data_left_row1_1.push({ idx: 0, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row1_1.push({ idx: 1, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row1_1.push({ idx: 2, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row1_1.push({ idx: 3, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row1_1.push({ idx: 4, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row1_1.push({ idx: 5, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row1_1.push({ idx: 6, value: Math.floor(Math.random() * 100) + 1 });

			this.data_left_row2_1.push({ idx: 0, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row2_1.push({ idx: 1, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row2_1.push({ idx: 2, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row2_1.push({ idx: 3, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row2_1.push({ idx: 4, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row2_1.push({ idx: 5, value: Math.floor(Math.random() * 100) + 1 });
			this.data_left_row2_1.push({ idx: 6, value: Math.floor(Math.random() * 100) + 1 });


		},
		showLeftMonth: function () {
			this.data_left_header1 = ["-"];
			this.data_left_header2 = ["-"];

			this.data_left_row1_1 = [];
			this.data_left_row2_1 = [];
			this.data_left_row1_2 = [];
			this.data_left_row2_2 = [];
			for (var i = 0; i < 12; i++) {
				if (i < 6) {
					this.data_left_header1.push({ idx: i, title: (i + 1) });
					this.data_left_row1_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_left_row2_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				} else {
					this.data_left_header2.push({ idx: i, title: (i + 1) });
					this.data_left_row1_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_left_row2_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				}
			}
		},
		showRightHour: function () {
			this.data_right_header1 = ["-"];
			this.data_right_header2 = ["-"];
			this.data_right_row1_1 = [];
			this.data_right_row2_1 = [];

			this.data_right_row1_2 = [];
			this.data_right_row2_2 = [];
			for (var i = 0; i < 24; i++) {
				if (i < 12) {
					this.data_right_header1.push({ idx: i, title: i + "H" });
					this.data_right_row1_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_right_row2_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				} else {
					this.data_right_header2.push({ idx: i, title: i + "H" });
					this.data_right_row1_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_right_row2_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				}
			}
		},
		showRightDay: function () {
			this.data_right_header1 = ["-"];
			this.data_right_header2 = ["-"];
			this.data_right_row1_1 = [];
			this.data_right_row2_1 = [];
			this.data_right_row1_2 = [];
			this.data_right_row2_2 = [];

			var year = moment().year();
			var month = moment().month() + 1;
			var lastDays = moment(year + "-" + month).daysInMonth();

			for (var i = 0; i < lastDays / 2; i++) {

				this.data_right_header1.push({ idx: i, title: i });
				this.data_right_row1_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				this.data_right_row2_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
			}
			var temp1 = Math.floor(lastDays / 2);
			for (var i = temp1; i < lastDays; i++) {

				this.data_right_header2.push({ idx: i, title: i });
				this.data_right_row1_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				this.data_right_row2_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
			}
		},
		showRightWeek: function () {
			this.data_right_header1 = ["-"];
			this.data_right_header2 = ["-"];
			this.data_right_row1_1 = [];
			this.data_right_row2_1 = [];
			this.data_right_row1_2 = [];
			this.data_right_row2_2 = [];

			this.data_right_header1.push({ idx: 0, title: "월" });
			this.data_right_header1.push({ idx: 1, title: "화" });
			this.data_right_header1.push({ idx: 2, title: "수" });
			this.data_right_header1.push({ idx: 3, title: "목" });
			this.data_right_header1.push({ idx: 4, title: "금" });
			this.data_right_header1.push({ idx: 5, title: "토" });
			this.data_right_header1.push({ idx: 6, title: "일" });

			this.data_right_row1_1.push({ idx: 0, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row1_1.push({ idx: 1, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row1_1.push({ idx: 2, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row1_1.push({ idx: 3, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row1_1.push({ idx: 4, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row1_1.push({ idx: 5, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row1_1.push({ idx: 6, value: Math.floor(Math.random() * 100) + 1 });

			this.data_right_row2_1.push({ idx: 0, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row2_1.push({ idx: 1, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row2_1.push({ idx: 2, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row2_1.push({ idx: 3, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row2_1.push({ idx: 4, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row2_1.push({ idx: 5, value: Math.floor(Math.random() * 100) + 1 });
			this.data_right_row2_1.push({ idx: 6, value: Math.floor(Math.random() * 100) + 1 });

		},
		showRightMonth: function () {
			this.data_right_header1 = ["-"];
			this.data_right_header2 = ["-"];
			this.data_right_row1_1 = [];
			this.data_right_row2_1 = [];
			this.data_right_row1_2 = [];
			this.data_right_row2_2 = [];

			for (var i = 0; i < 12; i++) {
				if (i < 6) {
					this.data_right_header1.push({ idx: i, title: (i + 1) });
					this.data_right_row1_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_right_row2_1.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				} else {
					this.data_right_header2.push({ idx: i, title: (i + 1) });
					this.data_right_row1_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
					this.data_right_row2_2.push({ idx: i, value: Math.floor(Math.random() * 100) + 1 });
				}
			}
		}

	},
	created() { },
	beforeDestroy() {
		// $off method will turned off the event listner 
	},
	middleware: 'authenticated',
	mounted() {
		// 	$(document).ready(function(){
		$('.th1').removeClass('active');
		$('#gnav-portal').addClass('active');
		this.email = Cookie.get("Email");

		this.getUserList()

		this.initChart1(this.$t("customerPortal.today1"), this.$t("customerPortal.forcast"));
		this.initChart2(this.$t("customerPortal.today1"), this.$t("customerPortal.forcast"));
		this.initChart3(this.$t("customerPortal.charge1"), this.$t("customerPortal.discharge2"));
		this.initChart4(this.$t("customerPortal.reducted"), this.$t("customerPortal.goal"));
	},
}
</script>

<style>
.portal_space {
	padding: 0.625rem 1.625rem;
}
.portal_data_table dl dt a {
	margin: 0 0.625rem;
	padding: 0 0.125rem;
	border: 1px solid gray;
}
.portal_space table {
	width: 100%;
	color: #fff;
}
.data_table th {
	background: #1b354d;
	padding: 0.25rem 0;
	border-bottom: 2px solid #394554;
	border: 2px solid #394554;
	font-size: 1.075rem;
	line-height: 1rem;
	color: #fff;
}
</style>
