<template>
    <!-- cont_body -->
    <div class="cont_body">
        <div class="tab_wrap size1" style=" background : #1A2031 !important; margin-top : 2.6rem !important; margin-left: 0rem !important; margin-right: 0rem !important;">
            <div class="tab_tit">
                <ul>
                    <li id="marketstat" @click="selectSearch('stat')">
                        <a class="btn_tab_tit">
                            <span>{{ $t('statstics.stat') }}</span>
                        </a>
                    </li>
                    <li id="markethistory" @click="selectSearch('history')" >
                        <a class="btn_tab_tit">
                            <span>{{ $t('statstics.history') }}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="tab_cont">
				<!-- top_selBox_zone -->
                <div class="top_selBox_zone">
                        <div class="sel_set_wrap">
                            <select style="width: 10rem !important;" id="criteria"  @change='SetCategory($event)' class="sel sel_size1">
                                <option value="criteriabase" selected="selected">{{ $t('statstics.criteria') }}</option>
                                <option value="rcc" >지역</option>
                                <option value="agg" >거래사업자</option>
                                <option value="site" >자원</option>
                            </select>
                        </div>
                        <div class="sel_set_wrap">
                            <select style="width: 10rem;" id="selectrccaddid" @change="setselectId($event)" class="sel sel_size1">
                                <option vaule="initselectid" value='null' selected="selected">{{selectedcategory}}</option>
                                <option v-for="v in OptionList" :key="v.idx" :value="v.id">{{v.value}}</option>
                            </select>
                        </div>
                        <div class="sel_set_wrap site" >
                            <select style="width:22.5rem;" @change="setsiteid($event)"  id="selectsiteid"  class="sel sel_size1">
                                <option value="initsite" selected="selected">자원</option>
                                <option v-for="v in SiteList" :key="v.idx" :value="v.siteid">{{v.represenation}}</option>
                            </select>
                        </div>

                        <div v-if='isismart'  class="sel_set_wrap"  style="margin-left: 0.9rem;">
                            <span style="font-size: 1.4rem; color: #ffffff;" class="text"> 항목 : </span>
                            <select @change='setIsmartContent($event)' style=" padding-right: 0.9rem; width:10.5rem;" class="sel sel_size1">
                                <option value="summary" selected="selected">전체</option>
                                <option value="demand" >Demand</option>
                                <option value="discharge" >충방전</option>
                                <option value="onsitepower">소내부하</option>
                                <option value="laod" >Load</option>
                            </select>
                        </div>

                        <div v-else class="sel_set_wrap"  style="margin-left: 0.9rem;">
                            <span style="font-size: 1.4rem; color: #ffffff;" class="text"> 항목 : </span>
                            <select @click='selectItem($event)' id="selectitem" style=" padding-right: 0.9rem; width:10.5rem;" class="sel sel_size1">
                                <option value="equip" selected="selected">설비</option>
                                <option value="forcast" >예측</option>
                                <option value="market" >마켓</option>
                                <option value="event" >이벤트</option>
                            </select>
                        </div>

                        <!-- 날짜 -->
                        <div class="btn_sel_wrap">
                            <dl>
                                <dt style="padding-right: 0.9rem;"></dt>
                                <dd>
                                    <span class="pick_calendar_wrap">
                                        <input  style="width:12rem;" autocomplete="off" id="startDate"  readonly  type="text" class="pick_calendar" /> 
                                    </span>
                                    <span style="font-size: 1.4rem; color: #ffffff;" class="text"> ~ </span>
                                    <span class="pick_calendar_wrap" >
                                        <input style="width:12rem;" autocomplete="off" id="endDate" type="text"  readonly  class="pick_calendar" />
                                    </span>	
                                    <button @click="setToday()"  type="button" class="btn btn_sel"><span>{{ $t('statstics.today') }}</span></button>
                                    <button @click="Search('period', null)" type="button" class="btn btn_search"><span class="hide">찾기</span></button>
                                    <button @click="download()" type="button" class="btn btn_down"><span class="hide">다운받기</span></button>
                                    <button id="30min" @click='searchbytime("30min")' type="button" class="s_bytime btn btn_sel"><span>30분전</span></button>
                                    <button id="1hour"  @click='searchbytime("1hour")' type="button" class="s_bytime btn btn_sel"><span>1시간전</span></button>
                                    <button id="6hour"  @click='searchbytime("6hour")' type="button" class="s_bytime btn btn_sel"><span>6시간전</span></button>
                                    <button id="12hour"  @click='searchbytime("12hour")' type="button" class="s_bytime btn btn_sel"><span>12시간전</span></button>
                                </dd>
                            </dl>
                        </div> 

                    <!-- 공통버튼 설비/이벤트 -->
                    <div class="selBox_zone_r paging_history">
                        <div class="btn_sel_wrap">
                            <ul class='common-btn'>
                                <li>
                                    <dl>
                                        <dt>Page: {{pagination}} / {{maxPage}}</dt>
                                        <dd>
                                            <button @click="prev()" type="button" class="btn page_prev"><span>이전</span></button>
                                            <button @click="next()" type="button" class="btn page_next"><span>다음</span></button>
                                        </dd>
                                    </dl>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <stat-history-stat/>
				<stat-history-history/>
            </div>

            
        </div>
    </div>
    <!--// cont_body -->
</template>
<script>

const Cookie = process.client ? require('js-cookie') : undefined
import statHistoryStat from '~/components/StatHistory/StatHistory-stat.vue'
import statHistoryHistory from '~/components/StatHistory/StatHistory-history.vue'

export default {
    layout: 'common',
	components: 
    {
        statHistoryStat,statHistoryHistory
    },
	data(){
		return{
            isismart : false,
            ismartcontent : "summary", 
            startTS : "",
            endTS : "",
            selectedbtn : "", // 설비, 이벤트
			selectedMenu : "", // 통계조회, 이력조회
            selectedItem: "",

            csvdata : [],
            selectlist : [],
            searchDate : "",
            selectId : "",
            selectedsiteId: "",
            selectedAggId:"",
            category: "",
            selectedcategory : "기준 선택",
            OptionList: [],
            SiteList:[],
            pagination : 1,
            row : 300,
            maxPage : 1,
            request : [],
            timeunit : null,
          
		}
	},
	head: {
        
        script: [ 
			{src : "https://www.amcharts.com/lib/4/core.js" },
			{src : "https://www.amcharts.com/lib/4/charts.js" },
			{src : "https://www.amcharts.com/lib/4/themes/dark.js" },
            {src : "https://www.amcharts.com/lib/4/themes/animated.js" },
            {src : "//www.amcharts.com/lib/4/lang/ko_KR.js"},
            {src : "/scripts/jquery/core/jquery-ui.min.js"},

			{src : "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js" },
            {src : "https://html2canvas.hertzen.com/dist/html2canvas.min.js"},

        ]
    },
    methods: {
        setIsmartContent(e){
            this.ismartcontent = e.target.value;
   
        },
        searchbytime(unit){
            $('.s_bytime ').removeClass("is_active");
            $('#' + unit).addClass("is_active");
            this.timeunit = unit;
            this.Search(null, null);
        },
        download(){
            //this.Search( null,'download');
            this.$nuxt.$off('appeared')
            var date = $("#startDate").val() + "~" + $("#endDate").val()
            var filename = date + this.selectedMenu +this.selectedbtn+ " report"
            this.setdownloadData(this.selectedMenu, this.csvdata, filename + ".csv")
        },
        setdownloadData(menu, data, filename){
           
            var titlelist = [];
            var c = [];

            if(menu == 'stat'){
                // 통계
                switch (this.selectedbtn) {
                case 'equip':
                    titlelist = ['시간','태양광발전','유효출력','SOC(%)']
                    for(var i = 0; i < data.length; i++){
                        var d = data[i]
                        c.push({
                            data1 : d.createts,
                            data2 : d.pvgen, 
                            data3 : d.actpwr,
                            data4 : d.soc, 
                            data5 : "",
                            data6 : "",
                            data7 : "",
                            data8 : "",
                            data9 : ""
                        })
                    }
                    break;
                case 'forcast':
                    titlelist = ['시간','예측값','실제값']
                    for(var i = 0; i < data.length; i++){
                        var d = data[i]
                        c.push({
                            data1 : d.createts,
                            data2 : d.forcast, 
                            data3 : d.pvgen,
                            data4 : "",
                            data5 : "",
                            data6 : "",
                            data7 : "",
                            data8 : "",
                            data9 : ""
                        })
                    }
                    break;
                default:
                    break;
                }
            }else{
                // 이력
                switch (this.selectedbtn) {
                case 'equip':
                    titlelist = ['시간','지역명','거래사업자','주소','서비스명','태양광발전(kW)','유효출력(kW)','SOC(%)', 'SOH(%)']
                    for(var i = 0; i < data.length; i++){
                        var d = data[i]
                        c.push({
                            data1 : d.createts,
                            data2 : RccList[d.rcc],
                            data3 : d.aggname, 
                            data4 : d.siteid,
                            data5 : serviceCode[d.servicecode], 
                            data6 : d.pvgen, 
                            data7 : d.actpwr,
                            data8 : d.soc,
                            data9 : d.soh
                        })
                    }
                    break;
                case 'forcast':
                    titlelist = ['시간','지역명','거래사업자','주소','예측값','실제값']
                    for(var i = 0; i < data.length; i++){
                        var d = data[i]
                        c.push({
                            data1 : d.createts,
                            data2 : RccList[d.rcc],
                            data3 : d.aggname, 
                            data4 : d.siteid,
                            data5 : d.forcast, 
                            data6 : d.pvgen,
                            data7 : "",
                            data8 : "",
                            data9 : ""
                        })
                    }
                    break;
                case 'event':
                    titlelist = ['시간','지역명','거래사업자','주소','설비명','알람명','발생시간','복구시간', 'ack시간']
                    for(var i = 0; i < data.length; i++){
                        var d = data[i]
                        c.push({
                            data1 : d.createts,
                            data2 : RccList[d.rcc],
                            data3 : d.aggname, 
                            data4 : d.siteid,
                            data5 : devicecode[d.DeviceType] + d.DeviceIndex, 
                            data6 : d.Name, 
                            data7 : d.createts,
                            data8 : d.Recoveryts,
                            data9 : d.Ackts
                        })
                    }
                    break;
                default:
                    break;
                }
            }
            
            saveCSV(titlelist, c, filename);
        },
        setsiteid(e){
            this.selectedsiteId = e.target.value;
            this.emptySelectField('table')
        },
        setselectId(event){
            this.selectId = event.target.value;

            this.emptySelectField('table')
            $("#statisticsChart1").empty();

            // 세번째 셀렉트박스 초기화 
            $('#selectsiteid').val('initsite').prop('selected', true)
            this.SiteList = [];
            this.selectedsiteId = null;

            if(this.selectId == 'null'){
                this.SiteList = [];
                return;
            }
            
            this.SiteList = [];
            if(this.category == 'site'){
                // get site list
                this.SiteList = getSiteList(this.selectId, 'search')
                
            }

            var type = [{
                btn : this.selectedbtn, 
                category : this.category
            }]
            
            this.$nuxt.$emit('theadtype', type)

        },
        prev(){
            this.pagination = this.pagination - 1 ;
            if(this.pagination == 0){
                this.pagination = 1;
                errorpoup('첫번째 페이지 입니다.')
            }
            this.getHistoryData();

        },
        next(){
            this.pagination = this.pagination + 1 ;
            if(this.pagination > this.maxPage){
                this.pagination = this.maxPage;
                errorpoup('마지막 페이지 입니다.')
            }
            
            this.getHistoryData();
        },
        emptySelectField(v){
          
            if(v == 'date'){
                $("#startDate").val("")
                $("#endDate").val("")
                return;
            }else if(v == 'chart'){
                $("#statisticsChart1").empty();
                return;
            }
            else if(v == 'table'){
                this.$nuxt.$emit('getempty', true);
                return;
            }
            // 첫번째 셀렉트 박스 
            var f = $('#criteria').val('criteriabase')
            // 두번째 셀렉트 박스 기본값 항목
            var s = $('#selectrccaddid').val('initselectid')
            // 세번째 셀렉트 박스 기본값 항목 
            var t = $('#selectsiteid').val('initsite')

            if(v == 'rccagg'){
                this.OptionList = [];
                this.selectId = null;
                $('#selectrccaddid').val('initselectid').prop('selected', true)
                // s.prop('selected', true)
                // this.selectId = null;
                return;
            }
        },
		SetCategory(event){

            this.category =  event.target.value;
            this.$nuxt.$emit('category', this.category)
            
            // 날짜 초기화
            $("#statisticsChart1").empty();

            // 차트 삭제
            this.emptySelectField('chart')

            // 이력조회 테이블 삭제
            this.emptySelectField('table')
            
            if(this.category == 'rcc'){
                this.selectedcategory = '지역명'
            }else if(this.category == 'criteriabase'){
                this.selectedcategory = "기준 선택"
            }else{
                this.selectedcategory = '고객명'
            }

            // 두번째, 세번째 셀렉트박스 초기화 
            $('#selectrccaddid').val('initselectid').prop('selected', true)
            this.OptionList = [];
            this.selectId = null;

            // 세번째 셀렉트박스 초기화 
            $('#selectsiteid').val('initsite').prop('selected', true)
            this.SiteList = [];
            this.selectedsiteId = null;


            var type = [{
                btn : this.selectedbtn, 
                category : this.category
            }]
            
            this.$nuxt.$emit('theadtype', type)

            $('.site').hide();
            if(this.category == 'site'){
                if(getCookie('userType') == 0 || getCookie('userType') == 5){
                    $('.site').show();
                }

                if(getCookie('userType') == 0 )
                {
                    // 발전사업자 계정인 경우
                    this.OptionList = [];
                    this.SiteList = [];
                    var data = _ajax('i', 'owner', 'site');
                    for(var i = 0; i< data.length; i++){
                        this.SiteList.push({
                            idx : i, 
                            represenation : data[i].represenation + "(" +  data[i].siteid +  ")", 
                            siteid : data[i].siteid
                        })
                    }
                    
                }
                else if(getCookie('userType') == 5)
                {

                    // ismart 계정인 경우
                    this.OptionList = [];
                    this.SiteList = [];
                    var data = ismart('account')
                    this.SiteList.push({
                        idx : 0, 
                        represenation : '전체', 
                        siteid : 'all'
                    })
                  
                    for(var i =0 ; i < data.length; i++){
                        this.SiteList.push({
                            idx : i+1, 
                            represenation : data[i].nickname,
                            siteid : data[i].id
                        })
                    }

                }
                else{
                    $('.site').show();
                }

            }

            // agg, rcc 셀렉트 리스트 추가.
            if(this.category != null){
                if(this.category != null){
                    if(this.category == 'rcc'){
                        this.OptionList = getRccList('search');
                    }else{
                        this.OptionList = getAggList('search');
                    }
                    
                }
            }

        },
		selectItem(v){
            // 설비, 예측, 마켓, 이벤트
            if(v == undefined){
                this.selectedbtn = 'equip'
            }else{
                this.selectedbtn = v.target.value
            }

            var type = [{
                btn : this.selectedbtn, 
                category : this.category
            }]
            
            this.$nuxt.$emit('theadtype', type)

            // 차트 삭제
            $("#statisticsChart1").empty();

            //this.$nuxt.$emit('selectedbtn',this.selectedbtn);
        },
        datainvalidcheck(){
            
            if(this.category == "" || this.category == null){
                errorpoup('조회기준 없음')
                this.emptySelectField('date')
                return false;
            }

            var item;
            if(this.category == 'site'){
                item = this.selectedsiteId
            }
            else{
                item = this.selectId
            }

            if(item == "initselectid" || item == "initsite" || item == null || item == 0){
                errorpoup('조회 요청 값 없음')
                this.emptySelectField('date')
                return false;
            }
            

            if(this.timeunit != null){
                this.startTS = timestamp(this.timeunit);
                this.endTS = getNow();
                $("#startDate").val(getToday())
                $("#endDate").val(getToday())
                //this.timeunit = null;
            }else{
                $(".s_bytime").removeClass("is_active");

                if( $("#startDate").val() == "" || $("#endDate").val() == ""){
                    errorpoup('조회날짜 없음')
                    this.emptySelectField('date')
                    return false;
                }else{
                    var invalidstart = dateDiff(getToday(), $("#startDate").val())
                    var invalidend = dateDiff(getToday(), $("#endDate").val())
                    var invaliddate = dateDiff($("#startDate").val(), $("#endDate").val())

                    if(invalidstart > 0 || invalidend > 0){
                        errorpoup('조회 날짜 오류[금일 이후 조회 불가]')
                        return false;
                    }else if(invaliddate < 0){
                        errorpoup('조회 날짜 오류[시작일, 종료일 선택 오류]')
                        return false;
                    }
                    else{
                        this.startTS = $("#startDate").val() + " 00:00:00"
                        this.endTS = $("#endDate").val() + " 23:59:00"
                    }
                }
            }
            
            if(this.category =='agg'){
                this.request = [String(item)]
            }else{
                this.request = [Number(item)]
            }
            return true;

        },
		Search(unit, trigger){
            // unit : 금일, 기간, 버튼단위 조회 
            // trigger : pdf 다운로드 기능
            if(unit == 'daily' || unit == 'period'){
                // 기간조회, 금일 일 경우 
                // 시간단위 버튼 선택 해제,
                $('.s_bytime ').removeClass("is_active");
                // this.unit 값 null
                this.timeunit = null;
            }
            console.log(this.selectedsiteId)
            var check = this.datainvalidcheck();

            this.pagination = 1;
            this.maxPage = 0;

            if(check ==  false){
                return;
            }
            
            if(this.selectedMenu =='stat'){
                
                this.getStatData();
            } else{
                this.getHistoryData();
            }
            
            this.$nuxt.$emit('startdate', $("#startDate").val())
            this.$nuxt.$emit('enddate', $("#endDate").val())

            // 다운로드 부분 (추후 수정)
           
            // if(trigger == 'download'){
                
            //     this.$nuxt.$off('appeared')
            //     var date = $("#startDate").val() + "~" + $("#endDate").val()
            //     var filename = date + this.selectedMenu +this.selectedbtn+ " report"

            //     //this.setcsvdata(this.selectedMenu, data)

            //     if(this.selectedMenu == 'stat'){
            //         // 통계
            //         $nuxt.$on('appeared', data => {
                        
            //             savePDF('tab_cont', filename + ".pdf");
            //             this.$nuxt.$off('appeared')
            //         })
            //     }else{
            //         // 이력
            //         this.setdownloadData(this.csvdata, filename +".csv")
            //     }
                
            // }else{
                
            //     return;
            // }
            // 금일, 날짜 조회면 시간단위 버튼 선택 해제
        },
        _statusData(){
            // 조회 조건
            var item = _wherecondition(this.category, this.selectId, this.selectedsiteId)
            var get = "";
            // 기간 조건
            var p = " FROM mysql.peiuoperation.";
            if(this.selectedbtn == 'equip'){
                // 통계-설비
                table = 'vwMinuteMeasurements'
                if(this.category == 'rcc' || this.category == 'agg'){
                    get = "SELECT distinct createts, sum(activepower) over (partition by createts) as actpwr ,avg(soc) over (partition by createts) as soc, sum(pvgeneration)over (partition by createts) as pvgen" 
                }else if(this.category == 'site'){
                    get = "SELECT createts, activepower as actpwr, pvgeneration as pvgen, soc"
                }
                
            }else if(this.selectedbtn == 'forcast'){
                
                // 통계-예측
                table = 'vwHourlyPvGenerations'
                if(this.category == 'rcc' || this.category == 'agg'){
                    get = "SELECT createts, sum(forecastpvgeneration) as forcast, sum(sumofpvgeneration) as pvgen " 
                }else if(this.category == 'site'){
                    get = "SELECT createts, forecastpvgeneration as forcast, sumofpvgeneration as pvgen" 
                }
                
            }
            p += '`'+ table + '` where ' + item + " and createts >='" + this.startTS + "' and createts <= '" + this.endTS + "'"
            var send = get + p 
            
            if(this.selectedbtn == 'forcast'){
                if(this.category != 'site'){
                    var send = get + p + ' group by createts' 
                }
            }else{
                var send = get + p 
            }

            

            return ;
        },
		getStatData(id){
            var datediff = dateDiff($("#startDate").val(),  $("#endDate").val());
            var resp = [];
            var table = "";

            // 조회 값
            var data =null;

            if(this.isismart){
                // ismart 통계 데이터 조회
                var data = this.getisamrtData();
                this.$nuxt.$emit(this.selectedMenu + '-' + 'ismart', data);
            }else{
                // 통계 데이터 조회 
                var data = this._statusData();
                var r = null;
                if(data == undefined){
                    r = []
                }else{
                    r = data;
                }
                // 설치용량 
                var facility = getInstalledData(this.category, this.selectId, this.selectedsiteId)
                
                // 이벤트 버스 데이터 세팅
                var resp = {
                    data : r,
                    datediff : datediff,
                    facility : facility
                }
                
                if(resp == null || resp == undefined){
                    return;
                }else{
                    this.$nuxt.$emit(this.selectedMenu+'-'+this.selectedbtn, resp);
                }
            }

            // csv 데이터 생성
            this.csvdata = data;
        },
        getisamrtData(){
            // 일단위 ismart 요약 이력
            if(this.selectedsiteId == 'all'){
                var data = ismart(this.ismartcontent, null, $("#startDate").val(), $("#endDate").val())
            }else{
                var data = ismart(this.ismartcontent, null, $("#startDate").val(), $("#endDate").val(), this.selectedsiteId)
            }

            return data;

        },
        setcsvdata(type, data){

            var array = this.csvdata;

            if(type == 'stat'){
                var a = "일자" + "," + "예측값(kW)" + "," + "실제값(kW)" + "\r\n";
                $.each(array, function(i, item){
                    a += item.date + "," + item.forcast + "," + item.pvgen + "\r\n";
                });
            }else{
                var a = "일자" + "," + "예측값(kW)" + "," + "실제값(kW)" + "\r\n";
                $.each(array, function(i, item){
                    a += item.date + "," + item.forcast + "," + item.pvgen + "\r\n";
                });
            }
            
            var downloadLink = document.createElement("a");
            var blob = new Blob(["\ufeff"+a], { type: "text/csv;charset=utf-8" });
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            var title = $("#startDate").val() + "~" + $("#endDate").val() + "예측값_실제값.csv"
            downloadLink.download = title;
            //downloadLink.download = "data.csv";

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

        },
       
		getHistoryData(){
            //페이징처리
            var siteid = "";
            var select = "SELECT ";
            var from = ' FROM mysql.peiuoperation.'
            var maxpage = "SELECT count(*) / 500 as maxpage "
        
            var offset = " OFFSET " + (500 * (this.pagination-1) + (this.pagination-1)) + ' ROWS'
            
            var where = _wherecondition(this.category, this.selectId, this.selectedsiteId)
            var paging = ' LIMIT 500 ' + offset

            var start = " AND fromtable.createts >= '" + this.startTS +"'"
            var end = " AND fromtable.createts <= '" + this.endTS + "'"
            switch (this.selectedbtn){
                case 'equip' :
                    select += 'fromtable.createts as createts, con.RCC as rcc, con.AggName as aggname, con.SiteId as siteid, con.ServiceCode as servicecode, fromtable.activepower as actpwr, fromtable.pvgeneration as pvgen, soc, soh '
                    from += '`vwMinuteMeasurements` as fromtable'
                    siteid = "siteid"
                    break;
                case 'forcast' :
                    select += 'fromtable.createts as createts, con.rcc as rcc, con.AggName as aggname, con.SiteId as siteid, sumofpvgeneration as pvgen, forecastpvgeneration as forcast'
                    from += '`vwHourlyPvGenerations`as fromtable'
                    siteid = "SiteId"
                    break;
                case 'event' :
                    select += 'con.RCC as rcc, con.AggName as aggname, con.SiteId as siteid, DeviceType, DeviceIndex, Name, fromtable.createts as createts, Recoveryts , Ackts'
                    from += '`vwEventRecord` as fromtable'
                    siteid = "SiteId"
                    break;
                // case 'market' :
                //     select += 'con.RCC as rcc, con.AggName as aggname, con.SiteId as siteid, DeviceType, DeviceIndex, Name, fromtable.createts as createts, Recoveryts , Ackts'
                //     from += '`vwEventRecord` as fromtable'
                //     siteid = "SiteId"
                // break;
                default :
                    return;
            }
            var join = " JOIN mysql.peiu_account.`vw_contractorsites` as con ON fromtable." + siteid + ' = con.SiteId'
            var page = maxpage + from + join + " WHERE fromtable."+ where + start + end
            var query = select + from + join + " WHERE fromtable."+ where + start + end + paging
            var data = _query(query)
            this.csvdata = data;
            if(data ==undefined){
                return;
            }

            var maxofpage = _query(page)
            this.maxPage = Math.ceil(maxofpage[0].maxpage)
            
            this.$nuxt.$emit(this.selectedMenu+'-'+this.selectedbtn, data);

        },
		setToday(){
			
            $("#startDate").val(getToday())
            $("#endDate").val(getToday())
            // 금일 기간 조회
			this.Search('daily', null);
		},
        selectSearch(menu){
            

            // 페이징 처리 버튼 hide
            $(".paging_history").hide();

            // 통계조회/이력조회 컴포넌트 hide
            $("#marketstat").removeClass("is_active")
            $("#markethistory").removeClass("is_active")

            // 선택한 컴포넌트 show
            $("#market"+menu).addClass("is_active")

            $("#stat").css('display','none');
            $("#history").css('display','none');
            $("#"+menu).css('display','inline-block');

            $('.s_bytime ').removeClass("is_active");
            this.timeunit = null;

            
            $("select#selectitem option[value='event']").remove();
            // 통계조회 인 경우 이벤트 버튼 삭제 
            if(menu == "stat"){
                // 통계
                this.selectlist.push({idx : '',item : 'equip',},{},{},{})
            }else{
                // 이력 
                $("select#selectitem").append("<option value='event'>이벤트</option>");

                // 페이징 처리 버튼 show 
                $(".paging_history").show();
            }

            this.selectedMenu = menu;
            this.selectItem()
            //this.SetCategory();
		},
        setSelectlistbyauth(){
            var level = getCookie('userType')
            // 셀렉트 리스트 hide, show

            $(".site").hide();
            if(level == 0 || level == 5){
                // 발전사업자, ismart 계정 : 자원 단위 조회만 가능
                // agg 단위 조회 셀렉트 박스 hide
                $("#selectrccaddid").hide();

                // 자원단위 조회 셀렉트박스 show
                $('.site').show();

            }else{
                // 모든 단위 조회 가능 
                $("#selectrccaddid").show();
            }

            if(level == 0)
            {
                // 거래사업자 단위 검색 옵션 삭제 
                $("select#criteria option[value='agg']").remove();
            }
            else if(level == 5)
            {
                this.isismart = true;
                // 거래사업자 단위, 지역단위 검색 옵션 삭제 
                $("select#criteria option[value='agg']").remove();
                $("select#criteria option[value='rcc']").remove();
            }
        }
    },
    mounted(){
        // 메뉴 활성화
        $("#menu8").addClass('active');

        this.setSelectlistbyauth();
        
        // 사용자 권한 레벨
        var level = Cookie.get("userType");

        if(level != 2){
			//라디오버튼, 지역별 선택 조회 select 박스 안보이게.
			$("input[name=type]").css('display','none')
		
        }

        if(level == 0 ){
            $("input[name=type]").css('display','none')
        }


		// 통계조회 보여주기
        this.selectSearch('stat');

		$(document).ready(function(){
            $( "#startDate" ).datepicker();
            $( "#endDate" ).datepicker();
		});

    }

}
var installedList = [];
</script>
<style>
.cont_body{
    background : #1A2031 !important;
}
.siteid{
    display: none;
}
.statistics_wrap .statistics_cont + .tbl_wrap {
    margin-top: 4rem;
}

.top_selBox_zone {
    padding: 0rem 0 1.7rem 0;
}
</style>