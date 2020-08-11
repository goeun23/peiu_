<template>
	<!-- 본문컨텐츠 영역 -->
	<div class="dashboard_wrap">
        <!--일반계약관리-->
		<div class="dashboard_box">
			<strong class="title"><a href="#">일반계약관리<i class="xi-angle-up" aria-hidden="true"></i></a></strong>
			<div class="conts">
				<div class="inquiry">
					<div class="selectbox">
						<label for="region_field">구분항목</label>
						 
					</div>

					<dl class="period">
					<dt>기간</dt>
					<dd>
						<div class="datesel period_wrap">
							<div class="input-group">
								<input type="month" class="form-control" name="period1" id="period1" value="" placeholder="시작월 입력" />
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div>
							<div class="input-group">
								<span class="input-group-addon">~</span>
								<input type="month" class="form-control" name="period2" id="period2" value="" placeholder="종료월 입력" />
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div>
						</div>
						<p class="btn_inguiry"><a href="#">조회</a></p>
                        <p class="btn_inguiry"><a href="#" @click="open_dlg('newContractDlg')" class="btn_detail">신규계약</a></p>
					</dd> 
					</dl>
				</div>
                <!--일방계약 정보 수정 Dialog -->
                <div id="normalContractDialog" class="modal">
                    <div class="modal-content">
                        <span class="close-button" @click="closeDlg('normalContractDialog')">&times;</span>
                        <form id="normalContractDialog_form" action="">
                            <table class="data_table center">
                                <colgroup>
                                        <col style="width:30%;">
                                        <col style="width:70%;">
                                    </colgroup>
                                <thead>
                                </thead>
                                <tbody>                                    
                                    <tr>
                                      <th>번호</th>
                                      <td>1</td>
                                    </tr>
                                    <tr>
                                        <th>계약종류</th>
                                        <td>
                                            <input type="radio" id="normalA" name="normalContractType" value="normalA" >
                                            <label for="normalA">일반A</label>
                                            <input type="radio" id="normalB" name="normalContractType" value="normalB" >
                                            <label for="normalB">일반B</label>
                                        </td>                                        
                                    </tr>
                                    <tr>
                                        <th>계약명(고객명)</th>
                                        <td>대건소프트</td>
                                    </tr>
                                    <tr>
                                        <th>계약시작일 </th>
                                        <td><input type="date" name="contractStartDT" id="contractStartDT"></td>
                                    </tr>
                                    <tr>
                                        <th>계약종료일</th>
                                        <td><input type="date" name="contractEndDT" id="contractEndDT"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal_btn_div">
                                <input type="button" value="Save" @click="saveContract('')">                         
                            </div>                    
                        </form> 
                    </div>
                </div>
                <!--신규 정보 수정 Dialog -->
                <div id="newContractDlg" class="modal">
                    <div class="modal-content">
                        <span class="close-button" @click="closeDlg('newContractDlg')">&times;</span>
                        <form id="newContractDlg_form" action="">
                            <table class="data_table center">
                                <colgroup>
                                        <col style="width:30%;">
                                        <col style="width:70%;">
                                    </colgroup>
                                <thead>
                                </thead>
                                <tbody>                                    
                                    <tr>
                                      <th>번호</th>
                                      <td>1</td>
                                    </tr>
                                    <tr>
                                        <th>계약종류</th>
                                        <td>
                                            <input type="radio" id="normalA" name="normalContractType" value="normalA" required>
                                            <label for="normalA">일반A</label>
                                            <input type="radio" id="normalB" name="normalContractType" value="normalB" required>
                                            <label for="normalB">일반B</label>
                                        </td>                                        
                                    </tr>
                                    <tr>
                                        <th>계약명(고객명)</th>
                                        <td><input type="text" name="newCustomer" id="newCustomer" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>계약시작일</th>
                                        <td><input type="date" name="contractStartDT" id="" required></td>
                                    </tr>
                                    <tr>
                                        <th>계약종료일</th>
                                        <td><input type="date" name="contractEndDT" id="" required></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal_btn_div">
                                <input type="button" value="Save" @click="saveContract('newContractDlg_form')">                         
                            </div>                    
                        </form> 
                    </div>
                </div>
				<div class="graphArea_wrap section_area">
					<div class="graphArea  normal_section_area">
						<table class="data_table center ">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>계약종류</th>
                                    <th>계약명(고객명)</th>
                                    <th>계약일</th>
                                    <th>종료일</th>
                                    <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in normalContracts" v-bind:key="row.id">
                                    <td><span>{{row.idx}}</span></td>
                                    <td><span>{{row.type}}</span></td>
                                    <td><span>{{row.name}}</span></td>
                                    <td><span>{{row.startDT}}</span></td>
                                    <td><span>{{row.endDT}}</span></td>
                                    <td><button @click="openNormalContractDlg(row.idx)" class="btn_detail">상세보기</button></td>
                                </tr> 
                            </tbody>
                        </table> 
					</div>
                    <div class="center">
                        <div class="pagination">
                            <a href="#">&laquo;</a>
                            <a href="#">1</a>
                            <a href="#" class="active">2</a>
                            <a href="#">3</a>
                            <a href="#">&raquo;</a>
                        </div>
                    </div>
				</div>
			</div>
		</div> 

        <!--자원계약관리-->
		<div class="dashboard_box">
			<strong class="title"><a href="#">자원계약관리<i class="xi-angle-up" aria-hidden="true"></i></a></strong>
			<div class="conts">
				<div class="inquiry">
					<div class="selectbox">
						<label for="res_field">구분항목</label>
						 <select name="res_field" id="res_field"></select>
					</div>

					<dl class="period">
					<dt>기간</dt>
					<dd>
						<div class="datesel period_wrap">
							<div class="input-group">
								<input type="date" class="form-control" name="period1" id="period1" value="" placeholder="시작일 입력" />
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div>
							<div class="input-group">
								<span class="input-group-addon">~</span>
								<input type="date" class="form-control" name="period2" id="period2" value="" placeholder="종료일 입력" />
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div>
						</div>
						<p class="btn_inguiry"><a href="#">조회</a></p>
                        <p class="btn_inguiry"><a href="#" @click="open_dlg('res_contract_dialog')">신규계약</a></p>
					</dd> 
					</dl>
				</div>
                <!--신규 정보 및 수정 Dialog -->
                <div id="res_contract_dialog" class="modal">
                    <div class="modal-content">
                        <span class="close-button" @click="closeDlg('res_contract_dialog')">&times;</span>
                        <form id="res_contract_dialog_form" action="">
                            <table class="data_table center">
                                <colgroup>
                                        <col style="width:30%;">
                                        <col style="width:70%;">
                                    </colgroup>
                                <thead>
                                </thead>
                                <tbody>                                    
                                    <tr>
                                      <th>번호</th>
                                      <td><span id="res_dialog_idx">1</span></td>
                                    </tr>
                                    <tr>
                                        <th>계약종류</th>
                                        <td>
                                            <input type="radio" id="res_A1" name="res_contract_type" value="res_A1" checked="checked" required>
                                            <label for="normalA" >일반A</label>
                                            <input type="radio" id="res_A2" name="res_contract_type" value="res_A2" required>
                                            <label for="normalB">일반B</label>
                                        </td>                                        
                                    </tr>
                                    <tr>
                                        <th>계약명(고객명)</th>
                                        <td><input type="text" name="res_customer_name" id="res_customer_name" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>계약시작일</th>
                                        <td>
                                            <input type="date" name="res_contract_start_dt" id="res_contract_start_dt" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>계약종료일</th>
                                        <td>
                                            <input type="date" name="res_contract_end_dt" id="res_contract_end_dt" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>PV 계약 용량</th>
                                        <td>
                                            <input type="text" name="pv_amount" id="pv_amount" value="300" required>
                                        
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>ESS 계약 용량</th>
                                        <td><input type="text" name="ess_amount" id="ess_amount" value="300" required></td>
                                    </tr>
                                    <tr>
                                        <th>DR 계약 용량</th>
                                        <td><input type="text" name="dr_amount" id="dr_amount" value="300" required></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal_btn_div">
                                <input type="button" value="Save" @click="save_dlg('res_contract_dialog_form')">                         
                            </div>                    
                        </form> 
                    </div>
                </div>
				<div class="graphArea_wrap section_area">
					<div class="graphArea new_section_area">
						<table class="data_table center">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>계약종류</th>
                                    <th>계약명(고객명)</th>
                                    <th>계약일</th>
                                    <th>종료일</th>
                                    <th>PV 계약용량(kV)</th>
                                    <th>ESS 계약용량(kV)</th>
                                    <th>DR 계약용량(kV)</th>
                                    <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in res_contrancs_data" v-bind:key="row.id">
                                    <td><span>{{row.idx}}</span></td>
                                    <td><span>{{row.type}}</span></td>
                                    <td><span>{{row.name}}</span></td>
                                    <td><span>{{row.startDT}}</span></td>
                                    <td><span>{{row.endDT}}</span></td>
                                    <td><span>{{row.pvAmount}}</span></td>
                                    <td><span>{{row.essAmount}}</span></td>
                                    <td><span>{{row.drAmount}}</span></td>
                                    <td><button @click="open_res_detail_dialog('res_contract_dialog', row.idx)" class="btn_detail">상세보기</button></td>
                                </tr> 
                            </tbody>
                        </table>
					</div>
                    <div class="center">
                        <div class="pagination">
                            <a href="#">&laquo;</a>
                            <a href="#">1</a>
                            <a href="#" class="active">2</a>
                            <a href="#">3</a>
                            <a href="#">&raquo;</a>
                        </div>
                    </div>
				</div>
			</div>
		</div>

        <!--입찰낙찰관리-->
		<div class="dashboard_box bid_box">
			<strong class="title"><a href="#">입찰낙찰관리<i class="xi-angle-up" aria-hidden="true"></i></a></strong>
            
			<div class="conts">
				<div class="inquiry">
					<div class="selectbox">
						<label for="region_field">구분항목</label>
						 
					</div>

					<dl class="period">
					<dt>기간</dt>
					<dd>
						<div class="datesel period_wrap">
							<div class="input-group">
								<input type="date" class="form-control" name="period1" id="period1" value="" placeholder="시작일 입력" />
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div>
							<div class="input-group">
								<span class="input-group-addon">~</span>
								<input type="date" class="form-control" name="period2" id="period2" value="" placeholder="종료일 입력" />
								<i class="xi-calendar" aria-hidden="true"><span class="hide">달력</span></i>
							</div>
						</div>
						<p class="btn_inguiry"><a href="#">조회</a></p> 
                        <p class="btn_inguiry"><a href="#" @click="open_dlg('bid_dialog')">입찰</a></p> 
                        <!-- <p class="btn_inguiry"><input type="button" value="입찰 추가가"></p> -->
					</dd>
					</dl>
                    <dl>
                        <dd>
                            <p class="btn_wrap">
                                <a href="#" class="btn active">입찰량 : 30kW</a>
                                <a href="#" class="btn">낙찰량 : 15kW</a>
                            </p>
                        </dd>
                    </dl>
				</div>
                <!--입찰/낙찰 정보 수정 Dialog -->
                <div id="bid_dialog" class="modal">
                    <div class="modal-content">
                        <span class="close-button" @click="closeDlg('bid_dialog')">&times;</span>
                        <form id="bid_dialog_form" action="">
                            <table class="data_table center">
                                <colgroup>
                                        <col style="width:30%;">
                                        <col style="width:70%;">
                                    </colgroup>
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>입찰시작날짜</th>
                                        <td>
                                            <label for="for input bid_dialog_start"></label>
                                            <input type="datetime-local" name="bid_dialog_start" id="bid_dialog_start" required>
                                           
                                        </td>
                                    </tr>                                    
                                    <tr>
                                        <th>입찰종료날짜</th>
                                        <td>
                                            <label for="input bid_dialog_end"></label>
                                            <input id="bid_dialog_end" type="datetime-local" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>입찰여부</th>
                                        <td>
                                             
                                            <input type="radio" name="bid_dialog_bid_y_n" id="bid_dialog_bid_y" title="Y" required>Y
                                            <input type="radio" name="bid_dialog_bid_y_n" id="bid_dialog_bid_n" title="N" required>N
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            입찰 종류
                                        </th>
                                        <td>
                                            <input type="radio" name="bid_type" id="bid_auto" value="bid_auto" checked="checked" @click="set_bid_type('auto')" title="알고리즘 기반 자동 입찰" required>알고리즘 기반 자동 입찰
                                            <input type="radio" name="bid_type" id="bid_manual" value="bid_manual" @click="set_bid_type('manual')" title="수동 입찰" required>수동 입찰
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <div class="tooltip">입찰량(kV) <span>&#9432;</span>
                                                <span class="tooltiptext">[ 수동입찰 ]시만 입찰 가능</span>
                                            </div>
                                        </th>
                                        <td><input type="text" name="bid_amount" id="bid_amount" value="3323" disabled="false"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal_btn_div">
                                <input type="button" value="Save" @click="save_dlg('bid_dialog_form')">
                            </div>                    
                        </form> 
                    </div>
                </div>
				<div class="graphArea_wrap section_area">
					<div class="graphArea">
                        <div class="calendar_wrap">
                            <div id="bid_calendar"></div>
                        </div>						
					</div>
				</div> 
			</div>
		</div>

        <!--휴일관리-->
		<div class="dashboard_box">
			<strong class="title"><a href="#">휴일관리<i class="xi-angle-up" aria-hidden="true"></i></a></strong>
			<div class="conts">
				<div class="inquiry">
					<dl class="period">
                        <dt>휴일 추가</dt>
                        <dd>
                            <p class="btn_inguiry"><a href="#" @click="open_dlg('holi_dialog')">추가</a></p>
                        </dd> 
					</dl> 
				</div>
                <div id="holi_dialog" class="modal">
                    <div class="modal-content">
                        <span class="close-button" @click="closeDlg('holi_dialog')">&times;</span>
                        <form id="holi_dialog_form" action="">
                            <table class="data_table center">
                                <colgroup>
                                    <col style="width:30%;">
                                    <col style="width:70%;">
                                </colgroup>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            명칭
                                        </th>
                                        <td>
                                            <input type="text" name="holi_day_title" id="holi_day" title="휴일 명칭">
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th>
                                            일자
                                        </th>
                                        <td>
                                            <input type="date" name="holi_day" id="holi_day" title="휴일 일자">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal_btn_div">
                                <input type="button" value="Save" @click="save_dlg('holi_dialog_form')">
                            </div>
                        </form>
                    </div>
                </div>
				<div class="graphArea_wrap section_area">
					<div class="graphArea">
                        <div class="holiday_wrap">
                            <table class="data_table center">
                                <colgroup>
                                        <col style="width:50%;"/>
                                        <col style="width:50%;"/>
                                    </colgroup>
                                <thead>
                                    <tr>
                                        <th>명칭</th>
                                        <th>날짜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3.1</td>
                                        <td>03-01</td>
                                    </tr>
                                    <tr>
                                        <td>광복절</td>
                                        <td>08-15</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>						
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //본문컨텐츠 영역 -->
</template>
<script>
 
  export default {
    layout: "system",

    components: {  
    },
    head: {
      link: [ {rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'}
      ],
      script: [   

          
				{src : '/scripts/calendar/moment.min.js'},
				{src : '/scripts/calendar/fullcalendar.min.js'}
        //   {src : 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.4.0/perfect-scrollbar.min.js' }
        // {src : '/scripts/calendar/moment.min.js'},
        // {src : '/scripts/calendar/fullcalendar.min.js'}
      ]
    },
    data(){
      return{
         start_dt : null,
         end_dt : null,
         holidays:[],
         normalContracts : [],
         res_contrancs_data : [],
      }
    },
    methods:{
        pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        },
        closeDlg : function(id){ 
            document.getElementById(id).classList.toggle('show-modal');
        },
        open_res_detail_dialog : function(id, idx){
            var data = this.res_contrancs_data[idx];
            document.getElementById('res_dialog_idx').innerHTML = idx;
            document.getElementById('res_customer_name').innerHTML = data.name;
            document.getElementById(data.type).checked = 'true';
            // document.getElementById('').innerHTML = '';
            document.getElementById('res_contract_start_dt').innerHTML = data.start;
            document.getElementById('res_contract_end_dt').innerHTML = data.endDT;
            document.getElementById('pv_amount').innerHTML = data.pvAmount;
            document.getElementById('ess_amount').innerHTML = data.essAmount;
            document.getElementById('dr_amount').innerHTML = data.drAmount;
            document.getElementById(id).classList.toggle('show-modal');
        },
        openNormalContractDlg : function(idx){
            
            document.getElementById('normalContractDialog').classList.toggle('show-modal');
        },
        save_dlg : function(form_id){
            document.getElementById(form_id).submit();
        },
        saveContract : function(){
            document.getElementById('normalContractDialog_form').submit();            
        },
        open_dlg : function(div_id){
            document.getElementById(div_id).classList.toggle('show-modal');
        },
        set_bid_type : function(mode){
            //console.log('current mode is = ' + mode);
            if(mode == 'manual'){
                document.getElementById('bid_amount').disabled = false;
            }else{
                document.getElementById('bid_amount').disabled = true;
            }
        },
        //대쉬보드 아코디언
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
        }
    }, 
	middleware : 'authenticated',
    
    mounted() 
    {   
        this.dashboardTab();

        for(var i=0; i < 23; i++){
            var tmpData = {
                idx : i, id : i, type : "res_A1", name : "대건소프트", 
                startDT : "2018-12-25 09:00:00", endDT : "2018-12-25 11:00:00",
                pvAmount : 300, essAmount : 300, drAmount : 300
            };
            this.normalContracts.push(tmpData);
            this.res_contrancs_data.push(tmpData);
        }

        var d = new Date();
        //console.log('a');
        this.start_dt = d.getFullYear() +'-' + 
            this.pad2(d.getMonth() + 1) + '-' + this.pad2(d.getDate()) 
            + 'T' + this.pad2(d.getHours()) +':'+ this.pad2(d.getMinutes()) + ':' + this.pad2(d.getSeconds());

        this.end_dt = d.getFullYear() +'-' + 
            this.pad2(d.getMonth() + 1) + '-' + this.pad2(d.getDate()) 
            + 'T' + this.pad2(d.getHours()+1) +':'+ this.pad2(d.getMinutes()) + ':' + this.pad2(d.getSeconds());
        
        document.querySelector('.bid_box').addEventListener('click', function(event) {
        // do something 
               $('#bid_calendar').fullCalendar('render');
        });

         $('#bid_calendar').fullCalendar( {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            // defaultDate: '2017-04-12',
            navLinks: true,
            editable: true,
            eventLimit: true,
            // defaultDate: this.start_dt, 
            height: 'parent',
            events: [ {
                title: '입찰',
                bidYN : 'y',
                start: this.start_dt,
                end: this.end_dt,
                etc : 'hello???'
            }],
            eventClick : function(calEvent, jsEvent, view){
                //console.log('b');
                document.getElementById('bid_dialog').classList.toggle('show-modal'); 
                document.getElementById("bid_dialog_start").value   = calEvent.start._i;
                document.getElementById("bid_dialog_end").value   = calEvent.end._i;
                if(calEvent.bidYN == 'Y'){
                    document.getElementById("bid_dialog_bid_y_n").checked = "true";
                }else{
                    document.getElementById("bid_dialog_bid_y_n").checked = "true";
                }
                    
            } 
        } );  

        //console.log('mounted()')
    },updated() {
        //console.log('updated()');
         
        new PerfectScrollbar('.normal_section_area');//커스텀 스크롤      
        new PerfectScrollbar('.new_section_area');//커스텀 스크롤      
    },
  }

 

</script>

<style>
.event_detail_box{display: none;position:absolute;top:0;left:0;width:10rem;height: 8rem;background: navy;color:white;}

#bid_calendar{height:41rem;}
.calendar{height:41rem;}
.modal_btn_div{display:block;margin:.3rem;float:right;border-top: 1px solid grey;}
.modal {position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);opacity: 0;visibility: hidden;transform: scale(1.1);transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;}
/* .modal-content {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: #708090;padding: 1rem 1.5rem;width: 60%;height: 27%;border-radius: 0.5rem;} */
.modal-content {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: #708090;padding: 1rem 1.5rem;width: 40%;border-radius: 0.5rem;}
.close-button {float: right;width: 1.5rem;line-height: 1.5rem;text-align: center;cursor: pointer;border-radius: 0.25rem;background-color: lightgray;}
.close-button:hover {background-color: darkgray;}
.show-modal {opacity: 1;z-index:1000;visibility: visible;transform: scale(1.0);transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;}
.section_area{height:41rem!important;position:relative;}
.normal_section_area{position:relative;height:37rem!important;width:100%!important;}
.new_section_area{position:relative;height:37rem!important;width:100%!important;}

.pagination {display: inline-block;}
.pagination a {color: white;float: left;padding: 8px 16px;text-decoration: none;transition: background-color .3s;border: 1px solid #ddd;margin: 0 4px;}
.pagination a.active {background-color: #4CAF50;color: white;border: 1px solid #4CAF50;}
.pagination a:hover:not(.active) {background-color: #ddd;}
.calendar_wrap{height:34rem!important;}
 
.tooltip { position: relative; display: inline-block; border-bottom: 1px dotted black;}
.tooltip .tooltiptext { visibility: hidden; width: 120px; background-color: #555; color: #fff; text-align: center; border-radius: 6px; padding: 5px 0; position: absolute; z-index: 1; bottom: 125%; left: 50%; margin-left: -60px; opacity: 0; transition: opacity 0.3s; }

.tooltip .tooltiptext::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: #555 transparent transparent transparent;}
.tooltip:hover .tooltiptext { visibility: visible; opacity: 1;}
.btn_detail{width:5.875rem;height:2.125rem;padding : 0.4375rem 0;border-radius: 0.1875rem;background:#2a75ff;font-size:1.0625rem;line-height:1.25rem;color:#fff;letter-spacing: -0.03125rem;text-align: center;}
</style>
