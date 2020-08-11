<template>
  <!-- 본문컨텐츠 영역 -->
	<div class="dashboard_wrap History">
		<div class="dashboard_box">
			<div class="conts">
				<div class="inquiry">
					<div class="selectbox"> 
						<!-- <select name="region_field" id="region_field" 
								class="info_select" v-model="selectVal">
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
						</select>  -->
						<select name="region_field" id="region_field" 
								@change='selectRegion($event)' class="info_select" v-model="selectRcc">
								<option disabled value="">지역</option>
								<option v-for="option in regions" :value="option.id" :key="option.id">
								{{option.label}}
							</option>
								<!-- <option value="1">서울</option>
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
								<option value="14">경북</option>							 -->
						</select> 
						
					</div>
						<!-- <div class="selectbox"> 
						<select name="region_field" id="region_field" 
								class="info_select" v-model="selectAsset">
								<option disabled value="">자원</option>
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
						
					</div> -->

					<dl class="period">
						<dt>기간</dt>
						<dd>
							<div class="datesel period_wrap">
								<div class="input-group">
									<input type="date" class="form-control" v-model="period1" placeholder="시작일 입력" />
									<i class="xi-calendar" aria-hidden="true">
										<span class="hide">달력</span>
									</i>
								</div>
								<div class="input-group">
									<span class="input-group-addon">~</span>
									<input type="date" class="form-control" v-model="period2" placeholder="종료일 입력" />
									<i class="xi-calendar" aria-hidden="true">
										<span class="hide">달력</span>
									</i>
								</div> 
							</div> 
						</dd> 
					</dl>
					<dl class="period">
						<dt>조회항목</dt>	
						<dd>									
							<p class="sort"> 
								<a id="btn_dr" @click="selectConditions('btn_dr')" class="active btn_conditions"><i class="xi-check-min" aria-hidden="true"></i>DR</a>
								<a id="btn_fr" @click="selectConditions('btn_fr')" class="btn_conditions" ><i class="xi-check-min" aria-hidden="true"></i>주파수</a>
								<a id="btn_sc" @click="selectConditions('btn_sc')" class="btn_conditions" ><i class="xi-check-min" aria-hidden="true"></i>스케줄링</a>
								<a id="btn_pk" @click="selectConditions('btn_pk')" class="btn_conditions" ><i class="xi-check-min" aria-hidden="true"></i> 피크컷</a>
								<!-- <a id="btn_accmulate" @click="selectConditions('btn_accmulate')" class="btn_conditions" ><i class="xi-check-min" aria-hidden="true"></i> ACCMULATE</a> -->
							</p>
							<p class="btn_inguiry" @click="clickEvt('new')"><a href="#">조회</a></p>
							<p class="btn_inguiry" @click="download()"><a href="#">다운로드</a></p>
						</dd>
					</dl>
				</div>
				
				<div class="tableArea_wrap">
					<div id="result_table" class="wrap">
						<!-- <table id="table1" class="data_table center"></table>						
   						<div id="table1Pager"></div>  -->
					<table id="table1" class="data_table center"> 
						 <thead> 
							 <tr>
								 <th v-for="header in table_headers" :key="header.idx">{{header.data}}</th>
							 </tr>
						 </thead>
						<tbody id='tableBody'> 
						 
						</tbody>
					</table> 
					<div class="pagination" id="demo"> 
						<div>Page : {{(offset/limit)+1}}</div>
						<div @click="getPreviouse()">Previouse</div>
						<div @click="getNext()">Next</div>
					</div>
					</div>
				</div>
				
			</div> 
		</div>
		<div class ="progressbar">
			<div class="lds-facebook"><div></div><div></div><div></div></div>
		</div>
		
	</div>
	<!-- //본문컨텐츠 영역 -->
</template>
<script>  
  // import { cube } from '~/assets/my-module'; 
  
	const Cookie = process.client ? require('js-cookie') : undefined 
  export default {
    layout: "history",

    components: {  
    },
    head: {
      link: [
		{rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'}, 
		{rel : 'stylesheet', href : 'https://cdn.datatables.net/1.10.19/css/dataTables.material.min.css'},
		{rel : 'stylesheet', href : '/css/table/simplePagination.css'},
		// {rel : 'stylesheet', id : 'bootstrap-css', href : '//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'},
      ],
      script: [
		{src:"/scripts/table/paginator.js"}, 
		{src : '//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'},
		{src : '/scripts/table/jquery.simplePagination.js'},
		{src : '/scripts/table/pagination.js'}
      ]
	},
	data(){
		return {
			regions : [],
			//histURL : process.env.rul_ESS_his,
			url_history : process.env.url_history,
			url_ess_log : process.env.url_ess_log,
			url_drill : process.env.url_drill,
			period1 : '2019-05-28',
			period2 : '2019-05-30', 
			conditions : 'DR',
			limit : 15,
			offset : 0,
			rows : [],
			recvRows : [],
			totalPage : [],
			pageIdx : 0,
			page_item_unit : 10,
			row_start_idx : 0,   
			table_headers :[],
			table_rows : [],  
			selectVal : '1', 
			selectRcc : "",
			selectAsset : '',
			url_log_menu : process.env.url_log_menu,
			url_log_func : process.env.url_log_func,
			url_download : process.env.url_download,
			url_history_rcc : process.env.url_history_rcc,
			historyTable : null,
			selectedRegion : '',
		}
	},
	computed: {
		
	},
	methods:{ 
		selectRegion : function(event) {
			this.selectedRegion = event.target.value;
		},
		getPreviouse : function()
		{
			if((this.offset - this.limit) >=0)
			{
				this.offset -= this.limit;
				this.clickEvt(false);
			}else{
				alert('데이터가 없습니다.')
			}
		},
		getNext : function(){
			this.offset += this.limit;
			this.clickEvt(false);
		},
		writeLog : function(username, func){
			var url = this.url_log_func +'?username='+username+'&functionname='+func;

			$.ajax({
				url : url,
				type : 'put',
				success :  function(data, textStatus, jqXHR){ 
				},
				error : function(jqXHR, textStatus, errorThrown){
					alert('통신에러, 기능 로그 서버 통신 실패');
				}
			})
		}, 
		downloadURI :function(uri, name) {
			var link = document.createElement("a");
			link.download = name;
			link.href = uri;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			link = null;
			// delete link;
		},
		download : function()
		{  
			$('.progressbar').css('display','block');
			// var csv = [];
			// var rows = document.querySelectorAll("#table1 tr");
			// 	for (let i = 0; i < rows.length; i++) {
			// 	var row = [], 
			// 	cols = rows[i].querySelectorAll("td, th")

			// 	for (let j = 0; j < cols.length; j++)
			// 		row.push(cols[j].innerText) 
			// 	csv.push(row.join(","))
			// } 
			// var title = this.conditions + "_" + this.period1 + "_"+this.period2+ ".csv";			
			// exportCSVFile(csv.join("\n"), title);
			
			//{{apiUrl}}/api/ess/QueryHistory?rcc=1&source=SC&start=2019-01-12&end=2019-01-15
			var url = this.url_download +'?rcc=' + this.selectVal + '&source='+this.conditions+'&start=' + this.period1 + "&end=" + this.period2;
			// alert(url);
			this.downloadURI(url,'');
			$('.progressbar').css('display','none');
		},
		clearTable : function()
		{
			this.table_headers = []; 
			var tbody =document.getElementById('table1').getElementsByTagName('tbody')[0];
			var rowLength = tbody.rows.length;
			for(var i=0; i < rowLength; i++){
				tbody.deleteRow(0);
			}
		},
		clickEvt(isNew)
		{			
			if(isNew == 'new'){
				this.offset = 0;
			}
			var username = Cookie.get('UserName'); 
			var startDT = this.period1;
			var endDT = this.period2;
			var conditions = this.conditions;
			// if(this.selectVal == ''){
			// 	alert('지역을 선택하세요');
			// 	return ;
			// }
				if(this.selectRcc == ''){
				alert('지역을 선택하세요');
				return ;
			}
			
			if(startDT > endDT)
			{
				this.endDT = this.star;
				alert('시작날짜가 더 늦을수 없습니다.');
				return ;
			} 

			var dt = new Date();
			var today = dt.getFullYear() + "-" + (dt.getMonth() +1) +"-"+ dt.getDate() +" " + dt.getHours() + ":" + dt.getMinutes() +":00";
			var tmpDT = new Date(endDT);
			var tmpDT1 = new Date(today);

			if(tmpDT > tmpDT1 || tmpDT.getDate () == tmpDT1.getDate()){
				endDT = tmpDT1.toString();
			}  

			this.clearTable();
			//this.getHistory();
			var logData = '이력조회' +"_rcc="+this.selectVal+"_condition="+this.conditions+"_"+this.period1+"_"+this.period2;
			//this.writeLog(username, logData)
			this.getHistoryNew();
		}, 
		getHistoryNew : function(){
			var rcc = this.selectedRegion;
			var startdate = this.period1;
			var endDT = this.period2;
			var url = 'https://www.peiu.co.kr:3021/api/statistics/gehistorybyrcc?rcc=' +rcc + '&startdate=' + startdate + '&enddate=' 
			+endDT+ '&PageNo=1&ShowRowCount=20'
			$.ajax({
				url : url,
				type : 'get',
				success : this.recvHisData,
				error : function(jqXHR, textStatus, errorThrown){
					alert('이력데이터 수신 실패(통신에러)');
				},
			});
		},
		recvHisData : function(data, textStatus){
			if(textStatus == 'success'){
				if(data.length > 0){
						this.table_headers.push({idx : 0 , data : 'ACCurrent'})
						this.table_headers.push({idx : 1 , data : 'ActivePower'})
						this.table_headers.push({idx : 2 , data : 'Frequency'})
						this.table_headers.push({idx : 3 , data : 'PvActivePower'})
						this.table_headers.push({idx : 4 , data : 'Soc'})
						this.table_headers.push({idx : 5 , data : 'Soh'})
					  this.table_headers.push({idx : 6 , data : 'pcs_status'})
						this.table_headers.push({idx : 7 , data : 'pvVoltage'})
						this.table_headers.push({idx : 8 , data : 'siteid'})
						this.table_headers.push({idx : 9 , data : 'time'})
					var tbody = document.getElementById('table1').getElementsByTagName('tbody')[0];
					for(var index = 0; index < data.length; index++){
						var value = data[index];
						var key = Object.keys(value);
						var rowLen = document.getElementById('table1').getElementsByTagName('tbody')[0].rows.length;
						var row = tbody.insertRow(index);
					//	key.splice(key.indexOf('PK'), 1);
						for(var i=0; i<key.length; i++){
							var cell = row.insertCell(i);
							cell.innerHTML = value[this.table_headers[i].data];    
						}
					}	 
				}
			}
		},
		getHistory : function(){
			var dbType = '';
			if(this.conditions =="DR"){
				dbType = "dr_information";
			}else if(this.conditions == "FR"){
				dbType = "fr_information";
			}else if(this.conditions == "SC"){
				dbType = "schedule_information";
			}else if(this.conditions == "Peakcut"){
				dbType = "peakcut_information";
			}else{
				dbType = "dr_information"
			}
			var curDate = moment().format('HH:mm:ss');
			var p2 = this.period2 + ' ' + curDate;
			var data = {
				queryType : "SQL",
				query : "SELECT * FROM mysql.aggdb." + dbType + " where `datetime` >= ('"+this.period1+" 00:00:00') AND `datetime` <=('"+p2+"')  AND `rcc`= " + this.selectVal + ' LIMIT ' + this.limit + ' OFFSET ' + this.offset
			};
			data = JSON.stringify(data);
			//console.log('request data = ' + data);

			$.ajax({
				url : this.url_drill,
				type : 'post',
				data : data,					 
				beforeSend : function(){ 
						$('.progressbar').css('display','block');
				},
				xhrFields: {withCredentials:true},
				contentType : 'application/json',
				success : this.recvData,
				error : function(jqXHR, textStatus, errorThrown){
					alert('이력데이터 수신 실패(통신에러)');
				},
				complete : function(){
					
				}
			});
		},
		recvData : function(data, textStatus, jqXHR){
			if(textStatus == "success"){
				if(data.columns.length > 0){ 
					// $('#table1 ').empty();
					data.columns.splice(data.columns.indexOf("PK"), 1);
					for(var idx = 0; idx< data.columns.length; idx++){
						var value = data.columns[idx];						
						if(value !='pk' || value !='PK')
						{
							this.table_headers.push({idx : idx, data : value});
						}	
					}
					var tbody = document.getElementById('table1').getElementsByTagName('tbody')[0];
					for(var index = 0; index < data.rows.length; index++){
						var value = data.rows[index];
						var rowLen = document.getElementById('table1').getElementsByTagName('tbody')[0].rows.length;
						var row = tbody.insertRow(index);
						var key = Object.keys(value);
						key.splice(key.indexOf('PK'), 1);
						for(var i=0; i<key.length; i++){
							var cell = row.insertCell(i);
							cell.innerHTML = value[this.table_headers[i].data];    
						}
					}	 

					$('.progressbar').css('display','none');
				}else{
					alert('데이터가 없습니다.');
					$('.progressbar').css('display','none');
				}
			}else{
				alert('이력데이터 수신 실패');
				$('.progressbar').css('display','none');
			}
		},
		selectConditions : function(id){
			document.getElementById('btn_dr').classList.remove('active');
			document.getElementById('btn_fr').classList.remove('active');
			document.getElementById('btn_sc').classList.remove('active');
			document.getElementById('btn_pk').classList.remove('active');
			document.getElementById(id).classList.add('active');

			var beforeConditions = this.conditions;

			if(id =='btn_dr')
			{
				this.conditions = "DR";
			}else if(id =='btn_fr')
			{
				this.conditions = "FR";
			}else if(id =='btn_sc')
			{
				this.conditions = "SC";
			}else if(id =='btn_pk')
			{
				this.conditions = 'Peakcut';
			}
			if(beforeConditions != this.conditions)
			{
				this.offset = 0;
			}
			// this.resetTableThead();
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
			//console.log(data)
				for(var i = 0; i < data.length; i++){
					if(data.length > 0){
						this.regions.push({
							id : data[i].rcc,
							label : data[i].name
						})
					}
				}
			//	console.log(this.regions)
		}
	},	
	middleware : 'authenticated',
    mounted() 
		{
			document.getElementById('btn_dr').classList.remove('active');
			document.getElementById('btn_fr').classList.remove('active');
			document.getElementById('btn_sc').classList.remove('active');
			document.getElementById('btn_pk').classList.remove('active');
			document.getElementById('btn_sc').classList.add('active');
      // $nuxt.$route.path
		$('.th1').removeClass('active');
		$('#gnav-his').addClass('active');
		$('.progressbar').css('display','none');
		
		// this.initGridTable1();
		this.gerRccData();

		// new PerfectScrollbar('.wrap  tbody');//커스텀 스크롤
		new PerfectScrollbar('table');
		// new PerfectScrollbar('.historytable tbody');//커스텀 스크롤
		// this.setNowDate(); 

		// $('#result_table').pagination({
		// 	items: 100,
		// 	itemsOnPage: 10,
		// 	cssStyle: 'light-theme'
		// });
					
    }
  }

  

</script>

<style>

  .col-xs-12,
  .main {
    margin: 0px;
    padding: 0px;
	} 
	/* progress bar animation */
.progressbar{ display: block; position: absolute; background-color: lightslategray;	opacity: .3;	width: 100%;	height: 100%;	top : 0;}
.lds-facebook {display: inline-block;  position: absolute; width: 64px; height: 64px; top : 50%; left: 50%;}
.lds-facebook div { display: inline-block;  position: absolute; left: 6px; width: 13px; background: #fff;  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;}
.lds-facebook div:nth-child(1) {left: 6px; animation-delay: -0.24s;}
.lds-facebook div:nth-child(2) { left: 26px; animation-delay: -0.12s;}
.lds-facebook div:nth-child(3) { left: 45px; animation-delay: 0;}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}
	
/* jqgrid pager */
.selectbox{
	margin-right: 1rem;
}
.fa{ font-size: 14px; text-align: center; opacity: 0.2; padding: 5px;}
.faPointer{ cursor: pointer; opacity: 1;}
.faPointer:hover{ opacity: 0.2;}
 
.customPageNumberBtn{ margin-left: 5px; margin-right: 5px; text-align: center; padding-top: 4px; }
.customPageMoveBtn{ text-align: center; }
.customPageMoveBtn a:hover{color: #fff;}
.customPageMoveBtn a:visited{color:#fff;}
.customPageMoveBtn .clicked{color:#fff;}
.customPaginateBar {
 /* border: 1px solid #D5D5D5; */
 /* background-image : url('images/ui-bg_highlight-soft_100_f6f6f6_1x100.png'); */
 background-color : #021323;
 /* background-position-y : 50%;
 margin-top: -1px;
 height: 25px; */
}
.customPaginateBar a:link{font-size: 1rem;}
.customPaginateBar a strong{color: #fff;font-size: 1rem;}
 
.pagination { display: inline-block; bottom: 0; position: fixed; right: 10px; }
.pagination div { color: white; float: left; padding: 8px 16px; text-decoration: none; transition: background-color .3s;cursor: pointer;}
.pagination div.active { background-color: #4CAF50; color: white; }
.pagination div:hover:not(.active) {background-color: #ddd;}

.btn_conditions{cursor: pointer;}
.disabled {pointer-events: none; color: #555; opacity: 1; }
.period_wrap .xi-calendar{pointer-events:none;}
.dashboard_box .inquiry > .period .btn_inguiry > a{width:4.875rem;}
.selectbox select.info_select{opacity: 1!important;}
/* .History table span{line-height: 3.1em;} */
.pager button{color:white;margin-right: .125rem;}
</style>
