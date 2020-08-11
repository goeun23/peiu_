<template>
   <!-- cont_body -->
        <div class="cont_body">
            <!-- top_selBox_zone -->
            <div class="top_selBox_zone">
				<div>
					<div class="sel_set_wrap siteid">
					<select id='Item' @change='getSiteId($event)' class="sel sel_size1">
						<option value="item" selected="selected">{{ $t('manage.agg') }}</option>
						<option v-for="v in OptionList" :key='v.idx' :value='v.id'>{{v.value}}</option>
					</select>
				</div>
				<div  class="sel_set_wrap siteid">
					
					<select id="sitecriteria" @change='setSiteId($event)' style="width:22.5rem;"  class="sel sel_size1">
						<option value="base" selected="selected">{{init}}</option>
						<option v-for="v in SiteList" :key='v.idx' :value='v.siteid'>{{v.represenation}}({{v.siteid}})</option>
					</select>
				</div>
				<div class="btn_sel_wrap period">
					<ul>
						<li><button type="button" @click='SelectCriteria("date")' class="btn btn_sel date"><span>{{ $t('report.day') }}</span></button></li>
						<li><button type="button" @click='SelectCriteria("month")' class="btn btn_sel month"><span>{{ $t('report.month') }}</span></button></li>
						<li><button type="button" @click='SelectCriteria("year")'  class="btn btn_sel year"><span>{{ $t('report.year') }}</span></button></li>
					</ul>
				</div>
				<div class="btn_sel_wrap">
					<dl>
						<dt style="padding-right: 0.9rem;"></dt>
						<dd id="periodList">
							<span @click="selectPeriod()" class="pick_calendar_wrap selectdate">
								<input autocomplete="off" readonly id="selectdate" type="text" class="pick_calendar" />
							</span>
							<span @click="selectPeriod()" class="pick_calendar_wrap selectmonth">
								<input autocomplete="off" readonly id="selectmonth" type="text" class="pick_calendar" />
							</span>
							<span @click="selectPeriod()" class="pick_calendar_wrap selectyear">
								<input autocomplete="off" readonly id="selectyear" type="text" class="pick_calendar" />
							</span>
						
						</dd>
					</dl>
				</div> 
				<div class="btn_sel_wrap">
					<ul>
						<li><button type="button" @click="Search()" class="btn btn_search"><span class="hide">조회</span></button></li>
						<li><button type="button" @click="download()"  class="btn btn_down"><span class="hide">다운로드</span></button></li>
					</ul>
				</div>
				</div>
            </div>
            <!--// top_selBox_zone -->
			<!-- top_state_area -->
			<div class="top_state_area" >
				<div class="state_box area3">
					<dl>
						<dt class="tit_pv"><span class="hide">{{ $t('report.pv') }}</span></dt>
						<dd>
							<span class="tit">{{ $t('report.pv') }}</span>
							<span class="txt"><span  class="amount">{{pv}}</span>{{unit}}</span>
						</dd>
					</dl>
				</div>
				<div class="state_box area1">
					<dl>
						<dt class="tit_ess"><span class="hide">ess</span></dt>
						<dd>
							<ul>
								<li><span class="tit">{{ $t('report.chg') }}</span>
								<span class="txt">
									<span class="amount">{{charge}}</span>{{unit}}</span></li>
								<li><span class="tit">{{ $t('report.dcg') }}</span><span class="txt"><span class="amount">{{discharge}}</span>{{unit}}</span></li>
								<li><span class="tit">{{ $t('report.oper') }}</span><span class="txt"><span id='totalPerEss' class="amount">{{operationRate}}</span>%</span></li>
							</ul>
						</dd>
					</dl>
				</div>
				<div class="state_box area3">
					<dl>
						<dt class="tit_won"><span class="hide">{{ $t('report.rev') }}</span></dt>
						<dd>
							<ul>
								
								<li><span class="tit">{{ $t('report.rev') }}</span><span class="txt"><span class="amount">{{revenue}}</span>천원</span></li>
							</ul>
						</dd>
					</dl>
				</div>
				<div class="state_box area3">
					<dl>
						<dt class="tit_event"><span class="hide">{{ $t('report.event') }}</span></dt>
						<dd>
							<span class="tit">{{ $t('report.event') }}</span><span class="txt"><span class="amount">{{eventCount}}</span>건</span>
						</dd>
					</dl>
				</div>
			</div>
			<!--// top_state_area -->
            <!-- cont_report_wrap -->
				<div class="cont_report_wrap">
					<div class="chart_area">
						<div class="report_chart_top">
							<dl>
								<dt>{{selectedPeriod}} {{ $t('report.graphOper') }}</dt>
								<dd>
									<div id="reportChart1"></div>
								</dd>
							</dl>
						</div>
						<div class="report_chart_top">
							<dl>
								<!-- <dt>{{ $t('report.graphRev') }}</dt> -->
                                <dt>{{bottomreport}}</dt>
                                <!-- <div class="dateEvent fixed_tbl_wrap" style="padding-top:2rem; max-height:24rem;"> -->
                                    <div class="dateEvent fixed_tbl_wrap" style="padding-top:2rem; ">
                                <div class="tbl_wrap tbl_report_info typ30d">
                                    <table>
                                        <caption></caption>
                                        <colgroup>
                                        <col width="">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th style="width:10rem;">No.</th>
                                                <th>{{ $t('areaControl.OccourTime') }}</th>
                                                <th>{{ $t('areaControl.RecoveryTime') }}</th>
                                                <th>{{ $t('areaControl.Device') }}</th>
                                                <th style="width:16.5rem;">{{ $t('areaControl.EventName') }}</th>
                                            </tr>
                                        
                                        </thead>
                                        <!-- <tbody id="scrolltbody" style="height: 25rem !important; width: 72rem !important;"> -->
                                        <tbody>
                                           
                                            <tr id="historytbody">
                                           
                                            </tr>
                                            <tr v-for="v in eventList" :key="v.idx">
                                                <td style="width:10rem;">
                                                    <span class="color_time">{{v.idx}}</span>
                                                </td>
                                                <td>
                                                    <span >{{v.startts}}</span>
                                                </td>
                                                <td>
                                                    <span >{{v.endts}}</span>
                                                </td>
                                                <td>
                                                    <span >{{v.device}}</span>
                                                </td>
                                                <td style="width:29.5rem;">
                                                    <span >{{v.name}}</span>
                                                </td>
                                            </tr>
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
								<dd>
									<div id="reportChart2"> </div>
								</dd>
							</dl>
						</div>
					</div>
                    <div class="tbl_box" v-if="isdate">
                        <div :class="tbl_class_ctrl">
                            <table>
                                <thead>
                                    <tr >
                                        <th v-for="r in report_thead" :id="r.id" :key="r.idx">{{r.field}}</th>
                                    </tr>
								</thead>
                                <tbody>
                                    <tr v-for="v in tblData" :key="v.idx" v-if="isdate">
                                        <td>
                                            <span class="color_time">{{v.timestamps}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.revenue}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.pv}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.chg}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.dcg}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.soc}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tbl_box" v-else>
                        <div :class="tbl_class_ctrl">
                            <table>
                                <thead>
                                    <tr >
                                        <th v-for="r in report_thead" :id="r.id" :key="r.idx">{{r.field}}</th>
                                    </tr>
								</thead>
                                <tbody>
                                    <tr v-for="v in tblData" :key="v.idx">
                                        <td>
                                            <span class="color_time">{{v.timestamps}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.revenue}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.pv}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.chg}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.dcg}}</span>
                                        </td>
                                        <td>
                                            <span >{{v.soc}}</span>
                                        </td>
                                        <td class="eventtable">
                                            <span>{{v.evt}}</span>
                                        </td> 
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                 
				</div>
				<!--// cont_report_wrap -->
        </div>
        <!--// cont_body -->
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default{
	middleware: 'authenticated',
	layout : "common",
	data(){
		return{
            isdate: true,
            report_thead : [],
            eventList : [],
			bottomreport : "",
			unit : "kWh", // 단위
			selectedsiteId: "", // 조회할 SITEID
            userType : "",
            init : "자원",
            OptionList: [],
			SiteList:[],
			tblData:[],
			selectedPeriod : "", // ~~ 별 운영추이
		
			Period : 'date', // YY, YYMM, DD
			Syear : "",
			Smonth : "", 
            Sday : "",
            
			charge : "0",
			discharge : "0",
			operationRate : "0",
			revenue : "0",
			eventCount : "-",
            pv : "0", 
            tbl_class_ctrl : "", // 테이블 css 제어 클래스명 
		}
	},
    head: {
    link: [
        { rel: "stylesheet", href: "/css/common.css" },
        { rel: "stylesheet", href: "/css/layout.css" },
        { rel: "stylesheet", href: "/css/contents.css" },
        { rel: "stylesheet", href: "/css/jquery-ui.css" },
    ],
    script:[
      
        { src : "/scripts/jquery/core/jquery-ui.min.js"},
        { src : "/scripts/Chart.bundle.js"},
        { src : "/scripts/perfect-scrollbar.js"},
		{ src : "/scripts/utils.js"},

	    { src: "https://www.amcharts.com/lib/4/core.js" },
        { src: "https://www.amcharts.com/lib/4/charts.js" },
        { src: "https://www.amcharts.com/lib/4/themes/dark.js" },
        { src : "https://www.amcharts.com/lib/4/themes/animated.js"},
        { src : "//www.amcharts.com/lib/4/lang/ko_KR.js"},

        
        {src : "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js" },
        {src : "https://html2canvas.hertzen.com/dist/html2canvas.min.js"},
            
        ]
	},
	
	methods: {
        download(){
            var date = $("#selectdate").val()
            var address = $("#sitecriteria option:selected").text();
            var save = date + address+" report";
            savePDF('cont_body', save + ".pdf");
        },
        dateDiff_report(_date1, _date2, period){
            var sdd = _date1
            var edd = _date2
            var ar1 = sdd.split('-');
            var ar2 = edd.split('-');
            if(period == 'date'){
                var da1 = new Date(ar1[0], ar1[1], ar1[2]);
                var da2 = new Date(ar2[0], ar2[1], ar2[2]);
            }else if(period == 'month'){
                var da1 = new Date(ar1[0], ar1[1], '01');
                var da2 = new Date(ar2[0], ar2[1], '01');
            }else{
                var da1 = new Date(ar1[0],'01', '01');
                var da2 = new Date(ar2[0],'01', '01');
            }
            
            var dif = da2 - da1;
            var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
            var cMonth = cDay * 30;// 월 만듬
            var cYear = cMonth * 12; // 년 만듬

            var r;
            if(period == 'date'){
                r = dif/cDay
            }else if(period == 'month'){
                r = dif/cMonth
            }else{
                r = dif/cYear
            }
            return r;
        },
		Search(isinit){
            
            // 운영추이 차트  
            $("#reportChart1").empty();

            // 수익금 현황 차트 
            $("#reportChart2").empty();
            
            // 이벤트 차트 
            $("#historytbody").empty();

            this.tblData =[];
            this.eventList = [];

            if(isinit == 'init'){
                this.selectedsiteId = 0;
                this.init = "전체"
                $('#select'+this.Period).val( prevDay(1));
            }else{
                if(this.selectedsiteId == ""){
                    errorpoup('조회 자원 없음')
                    return;
                }
            }
            
            var getDate = $('#select'+this.Period).val();
              
            if(getDate == ""){
                errorpoup('조회 날짜 없음')
                return;
            }
            
             
            // 날짜 비교
            var result = this.dateDiff_report(getDate, getToday(), this.Period);
            
            var d = today();
            var msg;
            if(this.Period == 'date'){
                msg = "금일"
            }else if(this.Period == 'month'){
                msg = "금월"
            }else{
                msg = "금년도"
            }

            if(result == 0){ 
                errorpoup( getDate+msg+' 조회 불가');
                $('#select'+this.Period).val("");
                return;
            }else if(result < 0){
                errorpoup( getDate+' 조회 불가');
                $('#select'+this.Period).val("");
                return;
            }

            var split = getDate.split('-');

          
            if(this.Period == "date"){
                this.selectedPeriod = split[0] +"년 " + split[1] + "월 " + split[2] + "일 "
               
            }
            else if(this.Period == 'month'){
                this.selectedPeriod = split[0] +"년 " + split[1] + "월 "
               
            }else{
                this.selectedPeriod = split[0] +"년 "
                
            }
            var facility = getInstalledData('site', null , this.selectedsiteId);
            this.getReportData(split, getDate, facility);
		},
		selectPeriod(){
			
			var instanceCalendar = $(".ui-datepicker-calendar")
			$("#selectdate").val('')
			$("#selectmonth").val('')
			$("#selectyear").val('')
			this.selectedPeriod = ""
            
            var headlist = []
			if(this.Period == 'date'){
                this.isdate = true;
                
                headlist = 
                [
                    "시간",
                    '수익금(천원)',
                    '발전량(kWh)',
                    '충전량(kWh)',
                    '방전량(kWh)',
                    'SOC(%)'
                ]
                instanceCalendar.css('display','table');
               
			}else if(this.Period == 'year' || this.Period == 'month'){
                this.isdate = false;
                
                instanceCalendar.css('display','none');
                headlist = 
                [
                     "시간",
                    '수익금(천원)',
                    '발전량(MWh)',
                    '충전량(MWh)',
                    '방전량(MWh)',
                    'SOC(%)',
                    '이벤트'
                ]
            }


            this.report_thead = [];

			for(var i=0; i< headlist.length; i++){
                this.report_thead.push({
                    id : 'head-' + i,
                    idx : i, 
                    field : headlist[i]
                })
            }
			
        },
        resetdatafield(){
            // 선택한 siteid

            // init calendar value
			//$(".select"+this.Period).val('');
            
            // $('#sitecriteria').val('base').prop('selected', true)
            // this.selectedsiteId = "";

            // // 선택한 agg
            // $('#Item').val('item').prop('selected', true)

            // 운영추이 차트  
            $("#reportChart1").empty();

            // 수익금 현황 차트 
            $("#reportChart2").empty();

            // 이벤트 테이블

            $("#historytbody").empty();

            // 이벤트 현황 테이블 
            this.eventList = [];

            // 우측 테이블 데이터 
            this.tblData = [];

            this.pv = "";
            this.charge = "";
            this.discharge = "";
            this.operationRate = "";

            this.revenue = "";
            this.eventCount = "-";

        },
		SelectCriteria(period){
            
            this.Period = period;

            // 이전 차트, 이벤트현황, 테이블, 상단 값 모두 삭제 
            this.resetdatafield();

			// button
			$(".period").find('button').removeClass('is_active')
			$("."+period).addClass("is_active")

			// calendar
			$("#periodList").find('span').hide();
			

			// show calendar
            $(".select"+this.Period).css('display','inline-block');
            
            $('.dateEvent').css('display','none');
            
			// set unit, timestamp
			if(this.Period != "date"){
                // mm, yyyy
                $('.dateEvent').css('display','none');
                $('.eventtbl').css('display','inline-block');
                this.bottomreport = "수익금현황"
                this.unit = "MWh";
                
			}else{
                // dd
                $('.dateEvent').css('display','inline-block');
                
                this.bottomreport = "이벤트현황"
				this.unit = "kWh";	
            }


            // tbl class ctrl
            this.tbl_class_ctrl = "tbl_wrap tbl_report_info"
            if(this.Period == 'date'){
                this.tbl_class_ctrl += " typ24h"
            }else if(this.Period == 'month'){
                this.tbl_class_ctrl += " typ30d"
            }else{
                this.tbl_class_ctrl += " typ12m"
            }

            this.selectPeriod();
		},
		getReportData(date, dailydate, facility){

            var year = "", month = "", day = "";
            var join = ' LEFT JOIN mysql.peiuoperation.'
            var table = ' FROM mysql.peiuoperation.'
            var create = "";
            var period = "";
            
            if(this.selectedsiteId == 0){
                var where =  " WHERE  accm.siteid in( " + facility['siteid'].toString() + ")"
            }else{
                var where =  " WHERE  accm.siteid in (" + this.selectedsiteId + ")"
            }
            
            if(this.Period == "date"){
                year = date[0] 
                month = date[1]
                date = date[2]
                table += '`vwHourlyAccmofMeasurements`'
                join += '`vwHourlyActualRevenue` as rev'
                create = 'createts'
                period = ' and accm.' + create + " >= '" + dailydate + "' and accm." + create +" <= '" + dailydate + " 23:00:00'"
            }
            else if(this.Period == 'month'){
                year = date[0] 
                month = date[1] 
                create = 'createdt'
                join += '`DailyActualRevenue` as rev'
                table += '`DailyAccmofMeasurements`'
                period = ' and year(rev.' + create + ") = " + year + " and month(rev." + create + ") = " + month
            }else{
                year = date[0] 
                return;
            }
            
            if(this.selectedsiteId == 0){
                var select = 'SELECT distinct accm.' + create + " as createts, avg(avgofsoc) over (partition by accm.createts)  as soc, sum(sumofcharge)  over (partition by accm.createts) as chg, sum(sumofdischarge)  over (partition by accm.createts) as dcg, sum(sumofcharge+sumofdischarge)  over (partition by accm.createts) as actpwr, sum(revenue) over (partition by accm.createts) as revenue, sum(sumofpvgeneration) over (partition by accm.createts)  as pvgen "
            }else{
                var select = 'SELECT accm.' + create + " as createts, accm.siteid, avgofsoc as soc, sumofcharge as chg, sumofdischarge as dcg, sumofcharge+sumofdischarge as actpwr, revenue, sumofpvgeneration as pvgen"
            }
            
            
            join += ' ON rev.'+ create  + '= accm.'+create + " and rev.siteid = accm.siteid"
            var query = select + table + "as accm " + join + where + period;

            

            var data = _query(query)
            if(data == undefined || data == null){
                return;
            }
            
            this.setReportChart(data, year, month, day);


            //상단 종합 데이터 
            var period = ""
            if(this.Period == 'date'){
                period = 'yymmdd'
                
            }else if(this.Period == 'month'){
                period = 'yymm'
            }else {
                period = 'yy'
            }
            var site = ''
            if(this.selectedsiteId == 0){
                site = 'summary'
            }else{
                site = 'site'
            }
            // 충전, 방전, 발전
            var data = _ajax('s', 'accmofmeasurement', site, period, this.selectedsiteId, dailydate)
            if(data == undefined){
                return;
            }
            data = data[0]
            if(this.Period == "date"){
                // kw
                this.charge = unitKW(data.sumofcharge * -1)
                this.discharge = unitKW(data.sumofdischarge)
    		    this.pv = unitKW(data.sumofpvgeneration)
            }else{
                // mw
                this.charge = unitMW(data.sumofcharge * -1)
                this.discharge = unitMW(data.sumofdischarge)
    		    this.pv = unitMW(data.sumofpvgeneration)
            }
            if(data.operationrate == null){
                this.operationRate = ' '
            }else{
                this.operationRate = unitSoc(data.operationrate)
            }

            // 수익금
            var data = _ajax('s', 'accmofrevenue', site, period, this.selectedsiteId, dailydate)
            if(data == undefined){
                return;
            }
            data = data[0]
            this.revenue = unitWon(data.sumofactualrevenue)

        },
        setReportChart(data, year, month, day){
          
            var trend = [], revenuetrend = [];
            for(var i = 0; i < data.length; i++){
                var d = data[i]
            
                var chg = d.chg;
                var dcg = d.dcg; 
                var soc = unitSoc(d.soc)
                var pvgen = d.pvgen
                var createts = new Date(d.createts)
                var actpwr = d.actpwr

               
               
                if(d.revenue == null){
                    var rev = ""
                }else{
                    var rev = unitWon(d.revenue)
                }

                if(this.Period == 'date'){
                   chg = unitKW(Math.abs(d.chg)), dcg = unitKW(dcg*1), 
                   pvgen = unitKW(pvgen*1), actpwr = unitKW(actpwr*1)
                }else{
                   chg = unitMW(Math.abs(d.chg)), dcg = unitMW(dcg*1), 
                   pvgen = unitMW(pvgen*1), actpwr = unitMW(actpwr*1)
                }
                
                
                var timestamp = "";
                var label = "";
                if(this.Period == 'date'){
                    timestamp = d.createts.substring(11,13)
                    label = timestamp + "시"
                }else{
                    timestamp = d.createts.substring(8,10)
                    label = timestamp + "일"
                }

                trend.push({
                    date : timestamp,
                    pvgen : pvgen,
                    actpwr : actpwr,
                    soc: soc
                })
               
                this.tblData.push({
                    idx : 'report-' + i,
                    mmidx : 'monthly-' + i, 
                    timestamps : label,
                    revenue : rev,
                    chg : chg,
                    dcg : dcg,
                    soc : soc,
                    evt : "",
                    pv : pvgen
                })
            }
            var facility = getInstalledData('site', null , this.selectedsiteId);
            var wherecondition = "";

            if(this.selectedsiteId == 0){
                wherecondition = "actual.siteid in( " + facility['siteid'].toString() + ")"
            }else{
                wherecondition = "actual.siteid in (" + this.selectedsiteId + ")"
            }
            // 운영추이 차트
            this.setChart(trend, facility);

            if(this.Period == 'month'){
                var query = "SELECT actual.createdt as createts, actual.revenue as actual, forcast.revenue as forcast"+
                    " FROM mysql.peiuoperation.DailyActualRevenue as actual"+
                    " JOIN mysql.peiuoperation.DailyForecastRevenue as forcast "+
                    " ON actual.siteid = forcast.siteid AND actual.createdt = forcast.createdt"+
                    " WHERE "+ wherecondition + 
                    " AND year(actual.createdt) = " + year  + " AND month(actual.createdt) = " + month
                var data = _query(query)
                var revenue = [];
                if(data == undefined){
                    return
                }
                
                for(var i = 0; i< data.length; i++){
                    var d = data[i]
                    revenue.push({
                        date : d.createts.substring(8,10),
                        open : unitWon(d.forcast), // 예상수익금
                        close : unitWon(d.actual), // 실제수익금
                    })
                }

                this.incomeChart(revenue)
            }
            var eventarr = [];
            if(this.Period == 'date'){
                
                if(eventarr == null || eventarr == undefined || eventarr.length == 0){
                   
                    var html = "<td colspan='5'>이벤트 없음</td>"
                    $("#historytbody").append(html)
                    this.eventList = [];
                }else {

                    this.eventList = [];
                    for(var i = 0; i< eventarr.length; i++){
                        this.eventList.push({
                            idx : i+1, 
                            startts : reportHHMMSS(eventarr[i].startts),
                            endts : reportHHMMSS(eventarr[i].endts),
                            device : eventarr[i].devicetype + eventarr[i].deviceindex,
                            name : eventarr[i].name
                        })
                    }
                }

            }else{
                this.incomeChart(revenue);
            }			
        },
		setChart(chartData, install){
            
            if(this.Period == 'date'){
                var pv = install.sumofpvcapacity
                var pcs = install.sumofpcscapacity
                var txt = 'kWh'
            }else{
                var pvmax = install.sumofpvcapacity/1000
                var actmax = install.sumofpcscapacity/1000
                var txt = 'MWh'
            }
            var period = this.Period
            var pvmax = pv + (pv * 0.1)
            var actmax = pcs + (pcs * 0.1)

			am4core.ready(function() {
				
				// Themes begin
				am4core.useTheme(am4themes_dark);
				am4core.useTheme(am4themes_animated);
				am4core.options.commercialLicense = true;
				// Themes end

				// Create chart instance
                var chart = am4core.create("reportChart1", am4charts.XYChart);

                chart.language.locale = am4lang_ko_KR;
                chart.numberFormatter.language = new am4core.Language();
                chart.numberFormatter.language.locale = am4lang_ko_KR;
                chart.dateFormatter.language = new am4core.Language();
                chart.dateFormatter.language.locale = am4lang_ko_KR;

                
                chart.fontSize = "1.3vh";

				// Increase contrast by taking evey second color
				chart.colors.step = 2;

				// Add data
                chart.data = chartData;
                
                // Add legend
				chart.legend = new am4charts.Legend();

                // Add cursor 막기
                chart.cursor = new am4charts.XYCursor();
                // prevent drag
                chart.cursor.behavior = "none";

                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "date";

                // Set settings
                categoryAxis.renderer.minGridDistance = 50;
                categoryAxis.renderer.grid.template.location = 0.5;
                categoryAxis.startLocation = 0.5;
                categoryAxis.endLocation = 0.5;
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.grid.template.disabled = true;
                categoryAxis.grid  = am4core.color("#ffffff");
                
                
                createAxisAndSeries("pvgen", "태양광발전량("+txt + ")", "#db66cd", pvmax);
				createAxisAndSeries("actpwr", "유효출력량("+txt+")", "#6771dc", actmax);
				createAxisAndSeries("soc", "SOC(%)", "#5898ba", 110);

				// Create series
				function createAxisAndSeries(field, name, color, max) {

                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    
                    valueAxis.max = max
                
                    if(field == "soc"){

                        var series = chart.series.push(new am4charts.StepLineSeries());
                        series.fillOpacity = 0.1;
                        series.strokeWidth = 0.6;
                        // y축 우측정렬
                        valueAxis.renderer.opposite = true;

                    }else{

                         
                        // y축 좌측정렬
                        valueAxis.renderer.opposite = false;
                        var series = chart.series.push(new am4charts.LineSeries());
                        series.zIndex = 9999;
                        series.strokeWidth = 1;
                        
                        valueAxis.renderer.line.strokeOpacity = 0.5;
                    }

                    // 차트 y축 최대값, 최소값 설정
                    if(field == 'actpwr'){
                        valueAxis.min = max * -1
                    }else{
                        valueAxis.min = 0
                    }

                    series.fill = am4core.color(color);
                    series.tooltipText = "{valueY.value}";
                    series.stroke = am4core.color(color);

                    valueAxis.renderer.labels.template.fill = am4core.color(color);

                    // y축 기준
                    series.dataFields.valueY = field;
                    // x축 기준
                    series.dataFields.categoryX  = "date";
                    //series.dataFields.dateX = "date";
                    // y축 scale
                    series.yAxis = valueAxis;
                    // y축 title name
                    //valueAxis.title.text = name;
                    // 시리즈 이름 
                    series.name = name;

                    // 툴팁 사용 X
                    //series.tooltipText = "{dateX}: [bold]{valueY}[/]";
                    
                    valueAxis.renderer.line.strokeWidth = 2;
                    valueAxis.renderer.line.stroke = series.stroke;
                    valueAxis.renderer.labels.template.fill = series.stroke;
                    valueAxis.renderer.grid.template.disabled = true;
				}
			}); // end am4core.ready()
		},
		incomeChart(data){
           
			am4core.ready(function() {

				// Themes begin
				am4core.useTheme(am4themes_dark);
				am4core.useTheme(am4themes_animated);
				am4core.options.commercialLicense = true;
				// Themes end

				var chart = am4core.create("reportChart2", am4charts.XYChart);
				chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
                chart.fontSize = "1.3vh";

                chart.language.locale = am4lang_ko_KR;
                chart.numberFormatter.language = new am4core.Language();
                chart.numberFormatter.language.locale = am4lang_ko_KR;
                chart.dateFormatter.language = new am4core.Language();
                chart.dateFormatter.language.locale = am4lang_ko_KR;

                chart.seriesContainer.draggable = false;
                chart.seriesContainer.resizable = false;

                // Add legend
                chart.legend = new am4charts.Legend();
                chart.data = data;

                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "date";

                // Set settings
                categoryAxis.renderer.minGridDistance = 50;
                categoryAxis.renderer.grid.template.location = 0.5;
                categoryAxis.startLocation = 0.5;
                categoryAxis.endLocation = 0.5;
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.grid.template.disabled = true;
                categoryAxis.grid  = am4core.color("#ffffff");

                
                // var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                // dateAxis.dateFormats.setKey("day", "dd");

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                
                var series = chart.series.push(new am4charts.LineSeries());
                series.strokeDasharray = "5,4";
                series.name = "예상 수익금(천원)";
                series.strokeWidth = 2;
                series.dataFields.categoryX  = "date";
                //series.dataFields.dateX = "date";
                series.dataFields.valueY = "open";
                series.tooltipText = "{valueY.value}";
                series.fill = am4core.color("#787edb");
                series.stroke = am4core.color("#787edb");
			
                var series2 = chart.series.push(new am4charts.LineSeries());
                series2.name = "실제 수익금(천원)";
                series2.strokeWidth = 2;
                series2.dataFields.categoryX  = "date";
                //series2.dataFields.dateX = "date";
                series2.dataFields.valueY = "close";
                series2.tooltipText = "{valueY.value}";
                series2.fill = am4core.color("#db66cd");
                series2.stroke = am4core.color("#db66cd");

                chart.cursor = new am4charts.XYCursor();
                // prevent drag
                chart.cursor.behavior = "none";

                //chart.cursor.xAxis = dateAxis;

                }); // end am4core.ready()

		},
		getSiteId(e){
            var agg = e.target.value
            this.SiteList = getSiteList(agg, 'search');

            $('#sitecriteria').val('base').prop('selected',true)
            this.selectedsiteId = "";
        },
		setSiteId(event){
            this.selectedsiteId = event.target.value;
		},
	},
   mounted() {

        // custom scroll
        //new PerfectScrollbar('tbody');
        
		this.SelectCriteria('date');
		$("#selectdate").datepicker({

		});
		$("#selectmonth").datepicker({
			showMonthAfterYear: true,
			changeYear: true,
			changeMonth: true,
			monthNamesShort: [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12"
			], //달력의 월 부분 텍스트
			
			autoclose: true,
			showButtonPanel: false,
			dateFormat: "yy-mm",
			onClose: function(dateText, inst) {
			$(this).datepicker(
				"setDate",
				new Date(inst.selectedYear, inst.selectedMonth+1, null)
			);
			}
		});
		$("#selectyear").datepicker({
			changeYear: true,
			changeMonth: true,
			autoclose: true,
			showButtonPanel: false,
			dateFormat: "yy",
			maxDate: "+1M",
			viewMode: "years",
			onClose: function (dataText,inst){
				$(this).datepicker(
					"setDate",
					new Date(inst.selectedYear+1, null, null))
			}
		})
		.focus(function() {
			$(".ui-datepicker-month").remove();
		});

		$("#selectmonth").on('focus blur click',function () {
			$(".ui-datepicker-calendar").hide();

		});
		$("#selectyear").on('focus blur click',function () {
			$(".ui-datepicker-calendar").hide();

		});
        this.userType = Cookie.get("userType");

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
                $("#Item").hide();
        }else{
            this.OptionList = getAggList('search');
        }
       
       
        this.$nextTick(function(){
            this.Search('init');
        })

	   $('.th1').removeClass('active');
        document.getElementById('menu14').classList.add("active");
       
   }, 
}
</script>
<style>

.cont_body{
    background-color: #1A2031;
}

#evtChart2 {
  	width: 100%;
	height: 30rem;
}
#reportChart1{
    width:72rem;
    height : 30rem;
}

#reportChart2{
    width:72rem;
    height : 30rem;
}

#head-0{
    width: 11rem;
}
</style>