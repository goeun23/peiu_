<template>
	<!-- 본문컨텐츠 영역 -->
	<div class="dashboard_wrap">
		<div class="dashboard_box current">
			<strong class="title active"><a href="#">성과분석 <i class="xi-angle-up" aria-hidden="true"></i></a></strong>
			<div class="conts active">
				<div class="inquiry">
					<div class="selectbox"> 
							<select name="region_field" id="region_field" 
								@change='selectRegion($event)' class="info_select" v-model="selectRcc">
								<option disabled value="">지역</option>
								<option v-for="option in regions" :value="option.id" :key="option.id">
								{{option.label}}
							</option>
						</select> 
						<!-- <select name="region_field" id="region_field" class="info_select"
							v-model="selectedItem" @change="changedValue($event)">
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
						</select> -->
					</div>
					<dl class="period">
					<dt>조회 날짜</dt>
					<dd>
						<div class="datesel period_wrap">
							<div class="input-group">
								<input type="date" class="form-control" name="period1" id="period1" value="" placeholder="시작일 입력" v-model="period"/>
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div> 
						</div>
						<p class="btn_inguiry">
							<button class="btn_query" @click="search()">조회</button>
							<button class="btn_query" @click="download()">다운로드</button>
						</p>
					</dd> 
					</dl>
					<p class="btn_wrap">
						<a @click="changeContent('result_charging_wrap')" id="btn_result_charging" class="btn active">충/방전량</a>
						<a @click="changeContent('result_gen_wrap')" id="btn_result_gen" class="btn">발전 부하량</a>
						<!-- <a @click="changeContent('result_price_wrap')" id="btn_result_price" class="btn">정산금액</a> -->
						<a id="btn_result_price" class="btn">정산금액</a>
					</p>
				</div>
				<div class="graphArea_wrap">
					<div class="graphArea">
						<div id="result_charging_wrap" class="show_wrap">
							<canvas id="graph1" class="graph"></canvas> 
							<div class="table_wrap">
								<table  id="table1"  class="data_table center">
								<caption>시간대별 실적(KWh), 예측(KWh), 오차율(%)을 설명</caption>
								<colgroup>
									<col style="width:100px" /><col span="25" />
								</colgroup>
								<thead>
									<tr>
										<th>-</th>
										<th v-for="pk in chdhdata" :key="pk.idx">
											<span>{{pk.date}}</span>
										</th>
									</tr>
									
								</thead>
								<tbody>
									<!-- <tr>
										<td>PK 충방전</td>
										<td v-for="pk in chdhdata" :key="pk.idx">
											<span>{{pk.accum_pk}}</span>
										</td>
									</tr> -->
									<!-- <tr>
										<td>FR 충방전</td>
										<td v-for="fr in chdhdata" :key="fr.idx">
											<span>{{fr.accum_fr}}</span>
										</td>
									</tr> -->
									<tr>
										<!-- <td>SC 충방전</td>
										<td v-for="sc in chdhdata" :key="sc.idx">
											<span>{{sc.accum_sc}}</span>
										</td> -->
											<td>SC 충방전</td>
										<td v-for="sc in SCdata" :key="sc.idx">
											<span>{{sc.data}}</span>
										</td>
									</tr>
									
								</tbody>
								</table>
							</div>
						</div>
						<div id="result_gen_wrap" class="hide_wrap">
							<canvas id="graph2" class="graph"></canvas> 
							<div class="table_wrap">
								<table id="table2" class="data_table center">
								<caption>시간대별 실적(KWh), 예측(KWh), 오차율(%)을 설명</caption>
								<colgroup>
									<col style="width:100px" /><col span="25" />
								</colgroup>
								<thead>
									<tr>
										<th>-</th>
											<th v-for="dt in genLoad" :key="dt.idx">
											<span>{{dt.date}}</span>
										</th>
										<!-- <th v-for="dt in genLoad" :key="dt.idx">
											<span>{{dt.date}}</span>
										</th> -->
									</tr> 
										
								</thead>
								<tbody>
									<tr>
										<td>발전</td>
										<td v-for="gen in ACTdata" :key="gen.idx">
											<span>{{gen.data}}</span>
										</td>
									</tr>
									<!-- <tr>
										<td>부하</td>
										<td v-for="gen in genLoad" :key="gen.idx">
											<span>{{gen.load_meter}}</span>
										</td>
									</tr> -->
								</tbody>
								</table>
							</div>
						</div>
						<div id="result_price_wrap" class="hide_wrap">
							<canvas id="graph3" class="graph"></canvas> 
							<div class="table_wrap">
								<table  id="table3"  class="data_table center">
									<caption>시간대별 실적(KWh), 예측(KWh), 오차율(%)을 설명</caption>
									<!-- <colgroup>
										<col style="width:100px" /><col span="25" />
									</colgroup> -->
									<thead>
										<tr>
											<th>-</th>
											<th v-for="dt in moneyList" :key="dt.idx">
												<span>{{dt.date}}</span>
											</th>
										</tr> 
									</thead>
									<tbody>
									<tr>
										<td>PeakCut</td>
										<td v-for="gen in moneyList" :key="gen.idx">
											<span>{{gen.pk}}</span>
										</td>
									</tr>
									<tr>
										<td>FR</td>
										<td v-for="gen in moneyList" :key="gen.idx">
											<span>{{gen.fr}}</span>
										</td>
									</tr>
									<tr>
										<td>SC</td>
										<td v-for="gen in moneyList" :key="gen.idx">
											<span>{{gen.sc}}</span>
										</td>
									</tr>
									<tr>
										<td>DR</td>
										<td v-for="gen in moneyList" :key="gen.idx">
											<span>{{gen.dr}}</span>
										</td>
									</tr>
								</tbody>
								</table>
							</div>
						</div>
					 
						
					</div>
				</div>
			</div>
		</div>
 
	</div>
	<!-- //본문컨텐츠 영역 -->
	
</template>
<script>  
  // import { cube } from '~/assets/my-module';
 
  export default {
    layout: "empty",

    components: {  
    },
    head: {
      link: [ {rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'}
      ],
      script: [ 
        {src : "/scripts/jqGrid/grid.locale-en.js" },
				{src : "/scripts/jqGrid/jquery.jqGrid.min.js"},
				{src : "/scripts/script_common.js"}
      ]
    },
    data(){
      return{
				ACTdata : [],
				ACTtemp : [],
				SCtemp : [],
				SCdata : [],
				url_stat : process.env.url_stat,
				current_result_wrap_id : 'result_charging_wrap',
				selectedItem : null, 
				period : '', 
				url_drill : process.env.url_drill,
				chdhdata : [],
				genLoad : [],
				moneyList : [],
				graph1 : '',
				graph2 : '',
				graph3 : '',
				selectedRegion : '',
				regions: [],
				url_history_rcc : process.env.url_history_rcc
      }
    },
    methods:{
			initACTGraph : function(){
					var config = {
				"type":"line",
				"data":{
					"labels" : [
						0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
					],
					
					"datasets" : [
						{
							"label":"발전",
							"data" : this.ACTtemp,
							"backgroundColor": '#FFAEC9',
							borderColor:  '#FFAEC9', 
							pointRadius: 1, 
							borderWidth: 1,
							fill: false
						},
						{
							"label":"부하",
							"data" : [],
							"backgroundColor": '#B5E61D',
							borderColor:  '#B5E61D', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						}
					]
				},
				"options" : 
				{
					"animation":false,
					// "responsive":true,
					maintainAspectRatio: false,
					"title" : 
					{
						"display":false,
						"text":"Chart.js Line Chart"
					},
					"legend": {
						fontColor: 'white',
						display: true
					},
					tooltips: {
							enabled: true
					},
					"hover" : 
					{
						// "mode":"nearest",
						"intersect":false
					},
					"scales" : 
					{
						"xAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false},
								ticks:{
								
								}
							}
						],
						"yAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false,"labelString":"Value"},
								 ticks: { 
                  }
							}
						]
					}, 
				}
			}
			var ctx = document.getElementById('graph2').getContext('2d'); 
			this.graph2 = new Chart(ctx, config);
			},
			selectRegion : function(event) {
			this.selectedRegion = event.target.value;
			
		},
		changeContent : function(id){
			if(id === 'result_charging_wrap')
			{
				document.getElementById('btn_result_charging').classList.add('active');
				document.getElementById('btn_result_gen').classList.remove('active');
				document.getElementById('btn_result_price').classList.remove('active');
				this.initGraph1();
			}
			else if(id === 'result_gen_wrap'){	
				document.getElementById('btn_result_charging').classList.remove('active');
				document.getElementById('btn_result_gen').classList.add('active');
				document.getElementById('btn_result_price').classList.remove('active');
				this.initGraph2();
			}else{
				//pricement
				document.getElementById('btn_result_charging').classList.remove('active');
				document.getElementById('btn_result_gen').classList.remove('active');
				document.getElementById('btn_result_price').classList.add('active');
				this.initGraph3();
			}

			document.getElementById('result_charging_wrap').classList.remove('show_wrap');
			document.getElementById('result_gen_wrap').classList.remove('show_wrap');
			document.getElementById('result_price_wrap').classList.remove('show_wrap') ;

			document.getElementById('result_charging_wrap').classList.add('hide_wrap');
			document.getElementById('result_gen_wrap').classList.add('hide_wrap');
			document.getElementById('result_price_wrap').classList.add('hide_wrap') ;

			document.getElementById(id).classList.remove('hide_wrap');
			document.getElementById(id).classList.add('show_wrap');
			this.current_result_wrap_id = id;
		},
		changedValue : function(value){
			//console.log(value);
				},
		changedLabel: function(label) {
			//console.log(label)
			//receive the label of the value selected (the label shown in the select, or an empty string)
		},
		randomScalingFactor : function(){
			return Math.random() * (100 - (0)) +(0);
		},
		dashboardTab : function(){
				var dashboardTab_param = $(".dashboard_wrap");
				var dashboardTab_btn = dashboardTab_param.find(".title > a");
				var dashboardTab_obj = dashboardTab_param.find(".conts");
				var event = "click";
				dashboardTab_btn.parent().eq(0).addClass("active");
				dashboardTab_obj.eq(0).addClass("active");
				dashboardTab_btn.parent().parent().eq(0).addClass("current");
				dashboardTab_btn.on(event,function(ev){
				var t = $(this);
				dashboardTab_btn.parent().removeClass("active");
				dashboardTab_obj.removeClass("active");
				dashboardTab_btn.parent().parent().removeClass("current");
				t.parent().addClass("active");
				t.parent().next().addClass("active");
				t.parent().parent().addClass("current");
				ev.preventDefault();
			});
		},
		setEvtData : function(){

		},
		getChageDisChage : function()
		{
			//SELECT * FROM aggdb.marketinfo where rcc=1 and date(`date`) = '2018-12-20'
			var rccId = this.selectedItem; 
			/**
			 * {
				"queryType" : "SQL",
				"query" : "SELECT * FROM mysql.aggDB.marketinfo where `rcc` = 1 and CAST(`date` as DATE) = CAST('2018-12-20' as DATE)"
				}
			 */
			// var data =  {
      //         "queryType" : "SQL",
      //         "query" : "SELECT * FROM mysql.aggDB.marketinfo where `rcc` = "+rccId+" and CAST(`date` as DATE) = CAST('"+this.period+"' as DATE)"
			// };
			// data = JSON.stringify(data);
			// $.ajax({
			// 	url : this.url_drill,
			// 	data : data,
			// 	contentType : 'application/json',
			// 	  type : 'post',
			// 	  success : this.getChageDisChageResult,
			// 	  error : function(jqXHR, textStatus, errorThrown){
			// 		//console.log('error getChageDisChage');
			// 		//console.log(jqXHR);
			// 		alert('정보 수신 실패(통신에러)')
      //         }
			// });
			// 	var url = this.url_stat + this.selectedRegion + '&date=' + this.period
			// 	console.log(url)
			// 	$.ajax({
			// 	  url : url,
			// 	  type : 'get',
			// 	  success : this.getStatData,
			// 	  error : function(jqXHR, textStatus, errorThrown){
			// 		alert('정보 수신 실패(통신에러)')
      //     }
			// });
		},
		getChageDisChageResult : function(data, textStatus, jqXHR)
		{	
			if(data.columns.length > 0)
			{
				this.chdhdata = [];
				var nowDT = new Date();
				var tmpDT;
				data.rows.forEach((v, i) =>{
					tmpDT = new Date(v.date);
					 
					if(nowDT < tmpDT)
					{
						if(nowDT.getHours() > new Date(v.date).getHours())
						{
							this.chdhdata.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									accum_pk : (Number(v.accum_pk_dh) + Number(v.accum_pk_ch)).toFixed(2),
									accum_fr : (Number(v.accum_fr_dh) + Number(v.accum_fr_dh)).toFixed(2),
									accum_sc : (Number(v.accum_sc_dh) + Number(v.accum_sc_ch)).toFixed(2)
								}
							)
						}else
						{
							this.chdhdata.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									accum_pk : '-',
									accum_fr : '-',
									accum_sc : '-',
								}
							)
						}
					}
					else{
						this.chdhdata.push(
							{	idx : i, 
								date : new Date(v.date).getHours() + "h", 
								accum_pk : (Number(v.accum_pk_dh) + Number(v.accum_pk_ch)).toFixed(2),
								accum_fr : (Number(v.accum_fr_dh) + Number(v.accum_fr_dh)).toFixed(2),
								accum_sc : (Number(v.accum_sc_dh) + Number(v.accum_sc_ch)).toFixed(2)
							}
						)
					} 
				});

				this.updateGraph1(this.chdhdata);
			}else
			{
				alert('데이터가 없습니다.')
			}
		},
		getGenLoad : function()
		{
			//SELECT * FROM aggdb.marketinfo where rcc=1 and date(`date`) = '2018-12-20'
			var rccId = this.selectedItem; 
			/**
			 * {
				"queryType" : "SQL",
				"query" : "SELECT * FROM mysql.aggDB.marketinfoex where `rcc` = 1 and CAST(`date` as DATE) = CAST('2018-12-21' as DATE)"
				}
			 */
			var data =  {
              "queryType" : "SQL",
              "query" : "SELECT * FROM mysql.aggDB.marketinfoex where `rcc` = "+rccId+" and CAST(`date` as DATE) = CAST('"+this.period+"' as DATE) order by `date` asc" 
			};
			data = JSON.stringify(data);
 
			$.ajax({
				url : this.url_drill,
				data : data,
				contentType : 'application/json',
				  type : 'post',
				  success : this.getGenLoadResult,
				  error : function(jqXHR, textStatus, errorThrown){
					//console.log('error getChageDisChage');
					//console.log(jqXHR);
					alert('정보 수신 실패(통신에러)')
              }
			});
		},
		getGenLoadResult : function(data, textStatus, jqXHR)
		{
			if(data.columns.length > 0)
			{
				this.genLoad = [];
				var nowDT = new Date();
				var tmpDT;

				data.rows.forEach((v, i) =>{
					tmpDT = new Date(v.date);
					if(nowDT < tmpDT)
					{
						if(nowDT.getHours() > new Date(v.date).getHours())
						{
							this.genLoad.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									pv_meter : Number(v.pv_meter).toFixed(2),
									load_meter : Number(v.load_meter).toFixed(2),
								}
							)
						}else{
							this.genLoad.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									pv_meter : '-',
									load_meter : '-',
								}
							)
						}
					}
					else{
						this.genLoad.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									pv_meter : Number(v.pv_meter).toFixed(2),
									load_meter : Number(v.load_meter).toFixed(2),
								}
							)
					} 
				});

				this.updateGraph2(this.genLoad);
			}else
			{
				alert('데이터가 없습니다.')
			}
		},
		getPrice : function()
		{
			//SELECT * FROM mysql.aggDB.marketinfo where `rcc` = 1 and CAST(`date` as DATE) = CAST('2018-12-21' as DATE)

			//SELECT * FROM aggdb.marketinfo where rcc=1 and date(`date`) = '2018-12-20'
			var rccId = this.selectedItem; 
			/**
			 * {
				"queryType" : "SQL",
				"query" : "SELECT * FROM mysql.aggDB.marketinfoex where `rcc` = 1 and CAST(`date` as DATE) = CAST('2018-12-21' as DATE)"
				}
			 */
			var data =  {
              "queryType" : "SQL",
              "query" : "SELECT * FROM mysql.aggDB.marketinfo where `rcc` = "+rccId+" and CAST(`date` as DATE) = CAST('"+this.period+"' as DATE)"
			};
			data = JSON.stringify(data);
			$.ajax({
				url : this.url_drill,
				data : data,
				contentType : 'application/json',
				  type : 'post',
				  success : this.getPriceResult,
				  error : function(jqXHR, textStatus, errorThrown){
					//console.log('error getChageDisChage');
					//console.log(jqXHR);
					alert('정산금액 실패(통신에러)')
              }
			});
		},
		getPriceResult : function(data, textStatus, jqXHR)
		{
			if(data.columns.length > 0)
			{
				this.moneyList = [];
				var nowDT = new Date();
				var tmpDT;
				data.rows.forEach((v, i) =>{
					tmpDT = new Date(v.date);
					if(nowDT < tmpDT)
					{
						if(nowDT.getHours() > new Date(v.date).getHours())
						{
							this.moneyList.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									dr : Number(v.money_dr).toFixed(2),
									pk : Number(v.money_pk).toFixed(2),
									sc : Number(v.money_sc).toFixed(2),
									fr : Number(v.money_fr).toFixed(2),
								}
							)
						}else
						{
							this.moneyList.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									dr : '-',
									pk : '-',
									sc : '-',
									fr : '-',
								}
							)
						}
					}else
					{
						this.moneyList.push(
								{	idx : i, 
									date : new Date(v.date).getHours() + "h", 
									dr : Number(v.money_dr).toFixed(2),
									pk : Number(v.money_pk).toFixed(2),
									sc : Number(v.money_sc).toFixed(2),
									fr : Number(v.money_fr).toFixed(2),
								}
							)
					}
					
					
				}); 
				this.updateGraph3(this.moneyList);
				//console.log('s');
			}else
			{
				alert('데이터가 없습니다.')
			}
		},
		search : function()
		{
			this.getstatData();
			this.getChageDisChage();
			
		//	this.initSCGraph();
		//	console.log(this.SCtemp)
			this.graph1.update();
			// if(this.current_result_wrap_id =="result_charging_wrap")
			// {
			// 	this.getChageDisChage();
			// }else if(this.current_result_wrap_id == "result_gen_wrap")
			// {
			// 	this.getGenLoad();
			// }else
			// {	
			// 	this.getPrice();
			// }
		},
		download : function()
		{
			 var csv = [];
			var rows;
			var title;
			if(this.current_result_wrap_id =="result_charging_wrap")
			{
				title = "충방전량.csv";
				rows = document.querySelectorAll("#table1 tr");
				 for (let i = 0; i < rows.length; i++) {
					var row = [], 
					cols = rows[i].querySelectorAll("td, th")

					for (let j = 0; j < cols.length; j++)
						row.push(cols[j].innerText)

					csv.push(row.join(","))
				}
			}else if(this.current_result_wrap_id == "result_gen_wrap")
			{
				title = "발전_부하량.csv";
				rows = document.querySelectorAll("#table2 tr");
				 for (let i = 0; i < rows.length; i++) {
					var row = [], 
					cols = rows[i].querySelectorAll("td, th")

					for (let j = 0; j < cols.length; j++)
						row.push(cols[j].innerText)

					csv.push(row.join(","))
				}
			}else
			{	
				title = "정산금액.csv";
				rows = document.querySelectorAll("#table3 tr");
				 for (let i = 0; i < rows.length; i++) {
					var row = [], 
					cols = rows[i].querySelectorAll("td, th")

					for (let j = 0; j < cols.length; j++)
						row.push(cols[j].innerText)

					csv.push(row.join(","))
				}
			} 

			exportCSVFile(csv.join("\n"), title);
		},
		initSCGraph : function(){
					var config = {
				"type":"line",
				"data":{
					"labels" : [
						0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
					],
					"datasets" : [
						{
							"label":"PK 충방전",
							"data" : [],
							"backgroundColor": '#FFAEC9',
							borderColor:  '#FFAEC9', 
							pointRadius: 1, 
							borderWidth: 1,
						},
						{
							"label":"FR 충방전",
							"data" : [],
							"backgroundColor": '#B5E61D',
							borderColor:  '#B5E61D', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						},
						{
							"label":"SC 충방전",
							//"data" : [],
							'data' : this.SCtemp,
							"backgroundColor":  '#00A2E8',
							borderColor:  '#00A2E8', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						}
					]
				},
				"options" : 
				{
					"animation":false,
					// "responsive":true,
					maintainAspectRatio: false,
					"title" : 
					{
						"display":false,
						"text":"Chart.js Line Chart"
					},
					"legend": {
						 fontColor: 'white',
						display: true
					},
					tooltips: {
							enabled: true
					},
					"hover" : 
					{
						// "mode":"nearest",
						"intersect":false
					},
					"scales" : 
					{
						"xAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false},
								ticks:{
								
								}
							}
						],
						"yAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false,"labelString":"Value"},
								 ticks: { 
                  }
							}
						]
					}, 
				}
			}
			var ctx = document.getElementById('graph1').getContext('2d'); 
			this.graph1 = new Chart(ctx, config);
		},
		initGraph1 : function()
		{
			//console.log(this.SCdata)
			var config = {
				"type":"line",
				"data":{
					"labels" : [
						0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
					],
					
					"datasets" : [
						{
							"label":"PK 충방전",
							"data" : [],
							"backgroundColor": '#FFAEC9',
							borderColor:  '#FFAEC9', 
							pointRadius: 1, 
							borderWidth: 1,
						},
						{
							"label":"FR 충방전",
							"data" : [],
							"backgroundColor": '#B5E61D',
							borderColor:  '#B5E61D', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						},
						{
							"label":"SC 충방전",
							//"data" : [],
							'data' : this.SCdata,
							"backgroundColor":  '#00A2E8',
							borderColor:  '#00A2E8', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						}
					]
				},
				"options" : 
				{
					"animation":false,
					// "responsive":true,
					maintainAspectRatio: false,
					"title" : 
					{
						"display":false,
						"text":"Chart.js Line Chart"
					},
					"legend": {
						 fontColor: 'white',
						display: true
					},
					tooltips: {
							enabled: true
					},
					"hover" : 
					{
						// "mode":"nearest",
						"intersect":false
					},
					"scales" : 
					{
						"xAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false},
								ticks:{
								
								}
							}
						],
						"yAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false,"labelString":"Value"},
								 ticks: { 
                  }
							}
						]
					}, 
				}
			}
			var ctx = document.getElementById('graph1').getContext('2d'); 
			this.graph1 = new Chart(ctx, config);
		},
		
		updateGraph1 : function(chdhdata){
			this.graph1.data.datasets[0].data = [];
			this.graph1.data.datasets[1].data = [];
			this.graph1.data.datasets[2].data = [];
			chdhdata.forEach((v, i) =>{
				this.graph1.data.datasets[0].data.push(v.accum_pk);
				this.graph1.data.datasets[1].data.push(v.accum_fr);
				this.graph1.data.datasets[2].data.push(v.accum_sc);
			});

			this.graph1.update();
		},
	
		initGraph2 : function(){
			var config = {
				"type":"line",
				"data":{
					"labels" : [
						0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
					],
					
					"datasets" : [
						{
							"label":"발전",
							"data" : [],
							"backgroundColor": '#FFAEC9',
							borderColor:  '#FFAEC9', 
							pointRadius: 1, 
							borderWidth: 1,
						},
						{
							"label":"부하",
							"data" : [],
							"backgroundColor": '#B5E61D',
							borderColor:  '#B5E61D', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						}
					]
				},
				"options" : 
				{
					"animation":false,
					// "responsive":true,
					maintainAspectRatio: false,
					"title" : 
					{
						"display":false,
						"text":"Chart.js Line Chart"
					},
					"legend": {
						fontColor: 'white',
						display: true
					},
					tooltips: {
							enabled: true
					},
					"hover" : 
					{
						// "mode":"nearest",
						"intersect":false
					},
					"scales" : 
					{
						"xAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false},
								ticks:{
								
								}
							}
						],
						"yAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false,"labelString":"Value"},
								 ticks: { 
                  }
							}
						]
					}, 
				}
			}
			var ctx = document.getElementById('graph2').getContext('2d'); 
			this.graph2 = new Chart(ctx, config);
		},
		updateGraph2 : function(data){
			this.graph2.data.datasets[0].data = [];
			this.graph2.data.datasets[1].data = []; 
			data.forEach((v, i) =>{
				this.graph2.data.datasets[0].data.push(v.pv_meter);
				this.graph2.data.datasets[1].data.push(v.load_meter);				
			});

			this.graph2.update();
		},
		initGraph3 : function()
		{
			var config = {
				"type":"line",
				"data":{
					"labels" : [
						0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
					],
					
					"datasets" : [
						{
							"label":"PeakCut",
							"data" : [],
							"backgroundColor": '#B5E61D',
							borderColor:  '#B5E61D', 
							pointRadius: 1, 
							borderWidth: 1,
						},
						{
							"label":"FR",
							"data" : [],
							"backgroundColor": '#FFAEC9',
							borderColor:  '#FFAEC9', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						},{
							"label":"SC",
							"data" : [],
							"backgroundColor": '#00A2E8',
							borderColor:  '#00A2E8', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						},{
							"label":"DR",
							"data" : [],
							"backgroundColor": '#B97A57',
							borderColor:  '#B97A57', 
							pointRadius: 1, 
							borderWidth: 1,
							fill:false,
						}
					]
				},
				"options" : 
				{
					"animation":false,
					// "responsive":true,
					maintainAspectRatio: false,
					"title" : 
					{
						"display":false,
						"text":"Chart.js Line Chart"
					},
					"legend": {
						lebels:{
							fontColor: 'white',
						},
						
						display: true
					},
					tooltips: {
							enabled: true
					},
					"hover" : 
					{
						// "mode":"nearest",
						"intersect":false
					},
					"scales" : 
					{
						"xAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false},
								ticks:{
								
								}
							}
						],
						"yAxes" : [
							{
								"display":true,
								"scaleLabel":{"display":false,"labelString":"Value"},
								 ticks: { 
                 				 }
							}
						]
					}, 
				}
			}
			var ctx = document.getElementById('graph3').getContext('2d'); 
			this.graph3 = new Chart(ctx, config);
		},
		updateGraph3 : function(data){
			this.graph3.data.datasets[0].data = [];
			this.graph3.data.datasets[1].data = []; 
			this.graph3.data.datasets[2].data = []; 
			this.graph3.data.datasets[3].data = []; 
			
			var sum_money_dr =0;
			var sum_money_pk =0;
			var sum_money_sc =0;
			var sum_money_fr =0;

			// data.forEach((v, i) =>{
			// 	sum_money_dr = sum_money_dr + Number(v.dr);
			// 	sum_money_pk = sum_money_pk + Number(v.pk);
			// 	sum_money_sc = sum_money_sc + Number(v.sc);
			// 	sum_money_fr = sum_money_fr + Number(v.fr);
			// })
 				
			
			data.forEach((v, i) =>{
				// this.graph3.data.datasets[0].data[[sum_money_pk], [sum_money_fr], [sum_money_sc], [sum_money_dr]];
				this.graph3.data.datasets[0].data.push(v.pk);
				this.graph3.data.datasets[1].data.push(v.fr);				
				this.graph3.data.datasets[2].data.push(v.sc);				
				this.graph3.data.datasets[3].data.push(v.dr);	
			});

			this.graph3.update();
		},
		initTable1 : function(){

			for(var i=0; i < 24; i++){
				this.chdhdata.push({idx :  i, date : i + 'H', accum_pk : '-', accumf_fr :'-', accum_sc : '0'});
			}
		},
		initTable2 : function(){
			for(var i=0; i < 24; i++){
				this.genLoad.push({idx :  i, date : i + 'H', pv_meter : '-', load_meter :'-'});
			}
		},
		initTable3 : function(){
			for(var i=0; i < 24; i++){
				this.moneyList.push({idx :  i, date : '-', pk : '-', fr :'-', sc : '-', dr : '-'});
			}
		},
		getstatData : function(){
			//	var url = this.url_stat + '14&date=2019-05-28'
				var url = this.url_stat + this.selectedRegion + '&date=' + this.period
				$.ajax({
				  url : url,
				  type : 'get',
				  success : this.getStatData,
				  error : function(jqXHR, textStatus, errorThrown){
					alert('Bad Request')
          }
			});
		},
		getStatData : function(data, textStatus, jqXHR){
			this.SCdata = [];
			this.SCtemp = [];
			this.ACTdata = [];
			this.ACTtemp = [];
			for(var i=0; i<data.length; i++){
				this.SCdata.push({
					idx : i,
					data : data[i].ActivePower.toFixed(2)
				})
			}
			for(var j=0 ; j<this.SCdata.length; j++){
				this.SCtemp.push(this.SCdata[j].data);
			}
			for(var i=0; i<data.length; i++){
				this.ACTdata.push({
					idx : i,
					data : data[i].PvActivePower.toFixed(2)
				})
			}
			for(var j=0 ; j<this.ACTdata.length; j++){
				this.ACTtemp.push(this.ACTdata[j].data);
			}
		//	console.log(this.ACTtemp);
			//this.updateGraph1_SC(this.SCdata);
			this.initSCGraph();
			this.initACTGraph();
			this.graph1.update();
			this.graph2.update();
		},
		gerRccData : function(){
			var url = this.url_history_rcc
				$.ajax({
				url : url,
				type : 'get',			 
				success : this.recvRccData,
				error : function(jqXHR, textStatus, errorThrown){
					alert('지역 리스트 수신 실패');
				},
			});
		},
		recvRccData : function (data, textStatus, jqXHR){
			this.regions = [];
		//	console.log(data)
				for(var i = 0; i < data.length; i++){
					if(data.length > 0){
						this.regions.push({
							id : data[i].rcc,
							label : data[i].name
						})
					}
				}
				
		}
    },
		middleware : 'authenticated',
    mounted() 
    {
		 this.selectedItem = 1;
		 this.gerRccData();
		var dt = new Date();
		$('.th1').removeClass('active');
		$('#gnav-stat').addClass('active'); 
		// document.getElementById('result_charging_wrap').classList.add('show_wrap');
		// this.dashboardTab();	
		var ISODate = moment().format('YYYY[-]MM[-]DD');
		this.period = ISODate;
        setTimeout(function(){
          $('.wrapper-content').removeClass('animated fadeInRight');
		},700);
	//	this.getstatData();
	//	this.initGraph1();
		this.initGraph2();
		this.initGraph3();

		this.initTable1();
		this.initTable2();
		this.initTable3();
    }
  }

  

</script>

<style>
 
 .graph{
   height:27.8rem;
 }
.table_wrap{padding-top: 2.5rem ; padding-left : 2.5rem;}
.btn{cursor: pointer;} 
.show_wrap {z-index:1000;display: block;}
.hide_wrap{display:none;}
#result_charging_wrap{width:100%; height:100%;}
#result_gen_wrap{width:100%; height:100%;}
#result_price{width:100%; height:100%;}
.btn_query{display: block;width: 4.125rem; height:2.125rem; padding:0.4375rem 0; border-radius: 0.1875rem;background:#2a75ff;font-size: 1.0625rem;line-height: 1.25rem;color:#fff;letter-spacing: -0.03125rem;text-align: center;float:left;margin: 0 .125rem;}
.btn_query::after{clear:both;}
.period_wrap .input-group .xi-calendar{pointer-events : none;}
#region_field{opacity: 1!important;}
</style>
