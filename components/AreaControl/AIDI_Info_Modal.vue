<template>
	<!-- popup -->
	<div id='AIDI_info_modal' class="full_popup" >
		<div class="pop_head">
			<h1 class="h1_pop">AI/DI 상세보기</h1>			
			<span class="pop_close" @click="closeAiDiModal()">&times;</span>
		</div>
		<div class="pop_cont">
			
			<div class="btn_sel_wrap">
				<ul>
					<li><button type="button" class="switch_land_island on_land"><span></span></button></li>
					<li><button @click="ShowAIDI('PCS1')" value='pcs1' id="btn_PCS1" type="button" class="btn btn_sel is_active"><span>PCS 1</span></button></li><!-- 활성화시  is_active -->
					<li><button @click="ShowAIDI('PCS2')" value='pcs2' id="btn_PCS2" type="button" class="btn btn_sel"><span>PCS 2</span></button></li>
					<li><button @click="ShowAIDI('PCS3')" value='pcs3' id="btn_PCS3" type="button" class="btn btn_sel"><span>PCS 3</span></button></li>
					<li><button @click="ShowAIDI('PCS4')" value='pcs4' id="btn_PCS4" type="button" class="btn btn_sel"><span>PCS 4</span></button></li>
				</ul>
			</div>
			<div class="btn_sel_view">
				<div class="detail_view_ai">
					<dl>
						<dt id='_ainum'>AI 상세보기(PCS1)</dt>
						<dd>
							<ul class="detail_list">
								<li>
									<dl class="detail_list_set">
										<dt>PCS</dt>
										<dd>
											<ul>
												<li><span class="tit">주파수</span><span class="data_val val_hz" id= "freq"></span></li><!-- 단위는 클래스로 제어함  val_hz, val_v, val_a, val_kw, val_kvar, val_per, val_c, val_mwh, val_kwh, val_none ...-->
												<li><span class="tit">AC 전압</span><span class="data_val val_v" id= "acGridVlt"></span></li>
												<li><span class="tit">AC 전류_HIGH</span><span class="data_val val_a" id= "acGridCrtHigh"></span></li>
												<li><span class="tit">AC 전류_LOW</span><span class="data_val val_a" id= "acGridCrtLow"></span></li>
												<li><span class="tit">AC 전력</span><span class="data_val val_kw" id = "acGridPwr"></span></li>
												<li><span class="tit">PCS 전압 R</span><span class="data_val val_v" id= "acGridVltR"></span></li>
												<li><span class="tit">PCS 전압 S</span><span class="data_val val_v" id= "acGridVltS"></span></li>
												<li><span class="tit">PCS 전압 T</span><span class="data_val val_v" id= "acGridVltT"></span></li>
												<li><span class="tit">PCS 전류 R</span><span class="data_val val_a" id = "acGridCrtR"></span></li>
												<li><span class="tit">PCS 전류 S</span><span class="data_val val_a" id = "acGridCrtS"></span></li>
												<li><span class="tit">PCS 전류 T</span><span class="data_val val_a" id = "acGridCrtT"></span></li>
												<li><span class="tit">유효 지령</span><span class="data_val val_kw">{{ pcs.actPwrKwRef }}</span></li>
												<li><span class="tit">무효 지령</span><span class="data_val val_kvar">{{ pcs.rctPwrKwRef }}</span></li>
												<li><span class="tit">유효 출력</span><span class="data_val val_kw" id="actPwrKw"></span></li>
												<li><span class="tit">무효 출력</span><span class="data_val val_kvar" id="rctPwrKw"></span></li>
												<li><span class="tit">Power Factor</span><span class="data_val val_none" id= "pwrFact"></span></li>
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>BAT</dt>
										<dd>
											<ul>
												<li><span class="tit">SOC</span><span class="data_val val_per" id= "bms_soc"></span></li>
												<li><span class="tit">SOH</span><span class="data_val val_per" id= "bms_soh"></span></li>
												<li><span class="tit">DC 전압</span><span class="data_val val_v" id= "dcCellVlt"></span></li>
												<li><span class="tit">DC 전류</span><span class="data_val val_a" id= "dcCellCrt"></span></li>
												<li><span class="tit">DC 전력</span><span class="data_val val_kw" id= "dcCellPwr"></span></li>
												<li><span class="tit">충전제한전력</span><span class="data_val val_kw">{{ bcs.chgPwrLmt }}</span></li>
												<li><span class="tit">방전제한전력</span><span class="data_val val_kw">{{ bcs.dhgPwrLmt }}</span></li>
												<li><span class="tit">최대 Cell 전압</span><span class="data_val val_v" id= "dcCellVltMx"></span></li>
												<li><span class="tit">최소 Cell 전압</span><span class="data_val val_v" id= "dcCellVltMn"></span></li>
												<li><span class="tit">최대 모듈 온도</span><span class="data_val val_c" id= "dcCellTmpMx"></span></li>
												<li><span class="tit">최소 모듈 온도</span><span class="data_val val_c" id= "dcCellTmpMn"></span></li>
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>PV</dt>
										<dd>
											<ul>
												<li><span class="tit">DC 전력</span><span class="data_val val_kw" id= "ID_POWER"></span></li>
												<li><span class="tit">PV전압</span><span class="data_val val_v" id= "ID_VOLTAGE"></span></li>
												<li><span class="tit">PV전류</span><span class="data_val val_a" id= "ID_CURRENT"></span></li>
												<li><span class="tit">전압 A</span><span class="data_val val_v" id= "A_VOLTAGE"></span></li>
												<li><span class="tit">전압 B</span><span class="data_val val_v" id= "B_VOLTAGE"></span></li>
												<li><span class="tit">전압 C</span><span class="data_val val_v" id= "C_VOLTAGE"></span></li>
												<li><span class="tit">전류 A</span><span class="data_val val_a" id= "A_CURRENT"></span></li>
												<li><span class="tit">전류 B</span><span class="data_val val_a" id= "B_CURRENT"></span></li>
												<li><span class="tit">전류 C</span><span class="data_val val_a" id= "C_CURRENT"></span></li>
												<li><span class="tit">출력 전력</span><span class="data_val val_kw" id= "G_POWER"></span></li>
												<li><span class="tit">총 누적 발전량</span><span class="data_val val_mwh" id= "TOTAL_POWER"></span></li>
												<li><span class="tit">금일 누적 발전량</span><span class="data_val val_kwh" id= "TODAY_POWER"></span></li>
												<li><span class="tit">인버터 동작 상태</span><span class="data_val val_none" id= "STATE_RUN"></span></li>
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>PCS 상태</dt>
										<dd>
											<ul>
												<li><span class="tit">권한 상태</span><span class="data_val val_none">{{PCS40181._0}}</span></li>
												<li><span class="tit">충전 상태</span><span class="data_val val_none">{{PCS40181._5}}</span></li>
												<li><span class="tit">운영 상태</span><span class="data_val val_none">{{PCS40181._1}}</span></li>
												<li><span class="tit">방전 상태</span><span class="data_val val_none">{{PCS40181._6}}</span></li>
												<li><span class="tit">고장 상태</span><span class="data_val val_none">{{PCS40181._3}}</span></li>
												<li><span class="tit">AC MC</span><span class="data_val val_none">{{PCS40181._11}}</span></li>
												<li><span class="tit">AC ACB</span><span class="data_val val_none">{{PCS40181._7}}</span></li>
												<li><span class="tit">DC MC</span><span class="data_val val_none">{{PCS40181._12}}</span></li>
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>PCS AO</dt>
										<dd>
											<ul>
												<li><span class="tit">운전 상태</span><span class="data_val val_none">{{PCSAO40190._0}}</span></li>
												<li><span class="tit">제어모드</span><span class="data_val val_none">{{PCSAO40190._3}}</span></li>
												<li><span class="tit">유효전력 설정</span><span class="data_val val_kw"></span></li>
												<li><span class="tit">SOC 상한 설정</span><span class="data_val val_per"></span></li>
												<li><span class="tit">무효전력 설정</span><span class="data_val val_kvar"></span></li>
												<li><span class="tit">SOC 하한 설정</span><span class="data_val val_per"></span></li>
											</ul>
										</dd>
									</dl>
								</li>
							</ul>
						</dd>
					</dl>
				</div>
				<div class="detail_view_di">
					<dl>
						<dt id="_dinum">DI 상세보기(PCS1)</dt>
						<dd>
							<ul class="detail_list">
								<li>
									<dl class="detail_list_set" >
										<dt>PCS</dt>
										<dd>
											<ul id='status-pcs' class="detail_state" style="overflow:auto;">
												
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>BAT(warning)</dt>
										<dd>
											<ul id='status-bms-warning'  class="detail_state">
											
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>BAT(fault)</dt>
										<dd>
											<ul  id='status-bms-falut'  class="detail_state">
												
											</ul>
										</dd>
									</dl>
								</li>
							</ul>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
	<!--// popup -->

</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

let _deviceId;
export default {
	layout: "aidi_info_modal",

	data() {
		return {
			url_getcurrenteventstatus :
			'https://www.peiu.co.kr:3021/api/notification/getcurrenteventstatus?siteId=',
			url_geteventmaplist :"https://www.peiu.co.kr:3021/api/notification/geteventmaplist",
			mqtt:null,
			topic:null,
			tPCS:null,
			tBMS:null,
			tPV:null,
			client:null,
			siteid :null,
			url_DI_stat : process.env.url_DI_stat,
			temp: 0,
			Interval1: null,
			PCSAO40190: {
				_0: "정지",
				_3: "Manual"
			},
			PCS40181: {
				_0: "Local",
				_1: "Stop",
				_3: "정상",
				_7: "open",
				_5: "대기",
				_6: "대기",
				_11: "open",
				_12: "open"
			},

			

			pcs: {
				dcBatVlt:'99.99',
				dcLinkVlt:'99.99',
				freq: '99.99',
				acGridVlt: '99.99',
				acGridPwr: '99.99',
				acVltR: '99.99',
				acVltS: '99.99',
				acVltT: '99.99',
				acCrtR: '99.99',
				acCrtS: '99.99',
				acCrtT: '99.99',
				actPwrKwRef: '99.99',
				rctPwrKwRef: '99.99',
				actPwrKw: 0,
				rctPwrKw: 0,
				pwrFact: 0,
				acCrtLow:0,
				acCrtHigh :0
			},
			bcs: {
				bms_soc: 0,
				bms_soh: 0,
				dcBatPwr: 0,
				chgPwrLmt: 0,
				dhgPwrLmt: 0,
				dcCellVltMx: 0,
				dcCellVltMn: 0,
				dcCellTmpMx: 0,
				dcCellTmpMn: 0,
				dcCellVlt:0,
				dcCellCrt:0,
				dcCellPwr:0
			},
			pv: {
				ID_POWER:0,
				ID_VOLTAGE:0,
				ID_CURRENT:0,
				ID_DATE:0,
				A_VOLTAGE:0,
				B_VOLTAGE:0,
				C_VOLTAGE:0,
				A_CURRENT:0,
				B_CURRENT:0,
				C_CURRENT:0,
				G_POWER:0,
				TOTAL_POWER:0,
				TODAY_POWER:0,
				STATE_RUN:'STOP',
			
			}
		}
	},
	methods: {
		
		closeAiDiModal: function () {
			document.getElementById("AIDI_info_modal").style.display = "none";

		},
		ShowAIDI: function(value) {
			// 상단 텍스트 변경 
			$('#_ainum').text('AI 상세보기('+ value + ')')
			$('#_dinum').text('DI 상세보기('+ value + ')')
			var _num = value.replace(/[^0-9]/g,"");
			_deviceId = _num;

			// 버튼 활성화/비활성화
			for(var i =1; i<5; i++){
				$("#btn_PCS"+i).removeClass("is_active");
			}
			$("#btn_PCS"+_num).addClass("is_active");
			
			
			
			// 대수별 mqtt 데이터 수신
			this.MappingAIData(_num)

			// 사이트, 자원별 di 상태 수신
			this.getDIstat(_num);
			
			
			
		   },
		getDIstat(_num){
			
			this.getPCS('PCS',_num)
			this.getBMS('BMS',_num)
			//this.getPV('PV'+_num)
			
		},
		getPV(val){
			var url = this.url_getcurrenteventstatus + this.siteid + '&deviceId='+ val;
	
			var token = Cookie.get('token')
			$.ajax({
                url: url,
                type: "get",
                headers: {
					'Authorization': 'Bearer ' + token
				},
                success: this.recvDIpvstat,
                error: function(jqXHR, textStatus, errorThrown) {
                    alertPop(2,1,"[Error] :  getaggregatorgroups");
                }
            });
		},
		recvDIpvstat(data){
			$("#status-pv").children().remove();

			var PVstat = new HashMap();
			for(var i=0; i<data.length; i++){
				for(var j=0; j<pvMap.length; j++){
					if(data[i].code = pvMap[j].code){
						PVstat.set(
							pvMap[j].code,{
								name : pvMap[j].code,
								columnName : pvMap[j].name,
								status :data[i].status
								//status:"True"
							}
						)
					}
				}
			}

			// pv 값, 상태 
			PVstat.forEach((v,k) => {
			
				var li = document.createElement("li")
				var title = document.createElement('span')
				
				
				if(v.status == "True"){
					title.setAttribute('class','ico_state ico_warning')
				}else{
					title.setAttribute('class','ico_state')
				}
				title.textContent = v.columnName
				
				li.append(title)
				$("#status-pv").append(li);



			});
		},
		getBMS(val,idx){
			var url = this.url_getcurrenteventstatus + this.siteid + '&deviceName='+ val + '&index='+idx;
	
			var token = Cookie.get('token')
			$.ajax({
                url: url,
                type: "get",
                headers: {
					'Authorization': 'Bearer ' + token
				},
                success: this.recvDIbmsstat,
                error: function(jqXHR, textStatus, errorThrown) {
                    alertPop(2,1,"[Error] :  getaggregatorgroups");
				},
				
            });
		},

		recvDIbmsstat:function(data, textStatus, jqXHR){
			
			var BMSstat = new HashMap();

			for(var i=0;i<data.length;i++){
				var v = data[i]
				BMSstat.set(
					v.code,{	
						columnName : v.name,
						status :v.status,
						// level 1~3 이하 : 경고, 4이상 : 고장
						level : v.level
					}
					
				)
			}
			
			// bms값, 상태 
			$("#status-bms-warning").children().remove();
			$("#status-bms-falut").children().remove();
			BMSstat.forEach((v,k) => {
				
				var li = document.createElement("li")
				var title = document.createElement('span')
				
				if(v.status == "True"){
					title.setAttribute('class','ico_state ico_warning')
				}else{
					title.setAttribute('class','ico_state')
				}
				//title.textContent = v.columnName +"["+ k +"]"
				title.textContent = v.columnName
				
				li.append(title)
				if(v.level >= 4){
					$("#status-bms-falut").append(li);
				}else if(v.level <= 3){
					$("#status-bms-warning").append(li);
				}

			});
			
		},
		getPCS(val,idx){
			var url = this.url_getcurrenteventstatus + this.siteid + '&deviceName='+ val + '&index='+idx;
			var token = Cookie.get('token')
			$.ajax({
                url: url,
                type: "get",
                headers: {
					'Authorization': 'Bearer ' + token
				},
                success: this.recvDIpcsstat,
                error: function(jqXHR, textStatus, errorThrown) {
                    alertPop(2,1,"[Error] :  getaggregatorgroups");
                }
            });
		},
		recvDIpcsstat:function(data, textStatus, jqXHR){
		
			var PCSstat = new HashMap();

			for(var i=0;i<data.length;i++){
				var v = data[i]
				PCSstat.set(
					v.code,{	
						columnName : v.name,
						status :v.status,
						// level 1~3 이하 : 경고, 4이상 : 고장
						level : v.level
					}
					
				)
			}
			
			
			// pcs 값, 상태 수신
			$("#status-pcs").children().remove();
			PCSstat.forEach((v,k) => {
				
				var li = document.createElement("li")
				var title = document.createElement('span')
	

				if(v.status == "True"){
					title.setAttribute('class','ico_state ico_warning')
				}else{
					title.setAttribute('class','ico_state')
				}
				//title.textContent = v.columnName +"["+ k +"] "
				title.textContent = v.columnName
				
				li.append(title)
				$("#status-pcs").append(li);

			 });
		},
		MappingAIData(value){

				var SITEID = this.siteid
				var PCS = 'PCS'+value;
				var BMS = 'BMS'+value;
				var PV = 'PV'+value;	
				
				if(this.tPCS !=null){
					this.client.unsubscribe(this.tPCS);
				}
				
				this.tPCS = 'hubbub/'+SITEID+'/'+PCS+'/AI';
				this.client.subscribe(this.tPCS, function (err) {
					if (err) {
						console.log(err)
					}
				})
					
				this.client.on('message', function (topic, message) {
					var data = message.toString();
					var tmp = JSON.parse(message.toString());
					var siteID = tmp.siteId;
					var tmpID = tmp.normalizedeviceid
					var d = tmp;
					
					if(tmp.groupname == "PCS_SYSTEM" && siteID == SITEID){
						
						if(tmpID == PCS){
						
							$("#freq").text(Number(d.freq).toFixed(2));
							$("#acGridVlt").text(Number(d.acGridVlt).toFixed(1));
							$("#acGridCrtHigh").text(Number(d.acGridCrtHigh).toFixed(1));
							$("#acGridCrtLow").text(Number(d.acGridCrtLow).toFixed(1));
							$("#acGridPwr").text(Number(d.acGridPwr).toFixed(1));
							$("#acGridVltR").text(Number(d.acGridVltR).toFixed(1));
							$("#acGridVltS").text(Number(d.acGridVltS).toFixed(1));
							$("#acGridVltT").text(Number(d.acGridVltT).toFixed(1));
							$("#pwrFact").text((Number(d.pwrFact*100).toFixed(0)));
							$("#acGridCrtR").text(Number(d.acGridCrtR).toFixed(1));
							$("#acGridCrtS").text(Number(d.acGridCrtS).toFixed(1));
							$("#acGridCrtT").text(Number(d.acGridCrtT).toFixed(1));
							$("#actPwrKw").text(Number(d.actPwrKw).toFixed(1));
							$("#rctPwrKw").text(Number(d.rctPwrKw).toFixed(1));
							
						}
					}
				})
				if(this.tBMS !=null){
					this.client.unsubscribe(this.tBMS);
				}
				this.tBMS = 'hubbub/'+SITEID+'/'+BMS+'/AI';
			
				this.client.subscribe(this.tBMS, function (err) {
					if (err) {
						console.log(err)
					}
				})
					
				this.client.on('message', function (topic, message) {
					var data = message.toString();
					var tmp = JSON.parse(message.toString());
					var siteID = tmp.siteId;
					var tmpID = tmp.normalizedeviceid
					var d = tmp;
				
					if(tmp.groupname == "PCS_BATTERY" && siteID == SITEID)
					{
						if(tmpID == BMS){

							$("#bms_soc").text(Number(d.bms_soc).toFixed(1));
							$("#bms_soh").text(Number(d.bms_soh).toFixed(1));
							$("#dcCellVlt").text(Number(d.dcCellVlt).toFixed(1));
							$("#dcCellCrt").text(Number(d.dcCellCrt).toFixed(1));
							$("#dcCellPwr").text(Number(d.dcCellPwr).toFixed(1));
							$("#dcCellVltMx").text(Number(d.dcCellVltMx).toFixed(1));
							$("#dcCellVltMn").text(Number(d.dcCellVltMn).toFixed(1));
							$("#dcCellTmpMx").text(Number(d.dcCellTmpMx).toFixed(1));
							$("#dcCellTmpMn").text(Number(d.dcCellTmpMn).toFixed(1));

						}
					}
				})

				if(this.tPV !=null){
					this.client.unsubscribe(this.tPV);
				}
				this.tPV = 'hubbub/'+SITEID+'/'+PV+'/AI';
			
				this.client.subscribe(this.tPV, function (err) {
					if (err) {
						console.log(err)
					}
				})
					
				this.client.on('message', function (topic, message) {
					var data = message.toString();
					var tmp = JSON.parse(message.toString());
					var siteID = tmp.siteId;
					var tmpID = tmp.normalizedeviceid
					var d = tmp;
					
					if(tmp.groupname == "PV_SYSTEM" && siteID == SITEID)
					{
					
						if(tmpID == PV){
							
							// $("ID_POWER).text(Number(d.bms_soc).toFixed(1));
							// $("ID_VOLTAGE).text(Number(d.bms_soc).toFixed(1));
							// $("ID_CURRENT).text(Number(d.bms_soc).toFixed(1));
							// $("ID_DATE).text(Number(d.bms_soc).toFixed(1));
							$("#A_VOLTAGE").text(Number(d.vltR).toFixed(1));
							$("#B_VOLTAGE").text(Number(d.vltS).toFixed(1));
							$("#C_VOLTAGE").text(Number(d.vltT).toFixed(1));
							$("#A_CURRENT").text(Number(d.crtR).toFixed(1));
							$("#B_CURRENT").text(Number(d.crtS).toFixed(1));
							$("#C_CURRENT").text(Number(d.crtT).toFixed(1));
							$("#G_POWER").text(Number(d.TotalActivePower).toFixed(1));
							// $("TOTAL_POWER).text(Number(d.bms_soc).toFixed(1));
							// $("TODAY_POWER).text(Number(d.bms_soc).toFixed(1));
							// $("STATE_RUN).text(Number(d.bms_soc).toFixed(1));

						}
						
					}
				})
				
	
		},
    
	},
	beforeDestroy() {
        if(this.client !=null){
            //this.client.end();
         //  alert('mqtt disconnect')
        }
    },
	mounted() {

		$(".switch_land_island").on("click",function(){//육지, 제주 선택 스위치
			if($(this).hasClass("on_land")){
				$(this).removeClass("on_land").addClass("on_island");
				$(this).val("PCS");
			}else{
				$(this).removeClass("on_island").addClass("on_land");
				$(this).val("PV");
			}
		});
		


		// MQTT CONNECT
		new PerfectScrollbar('.detail_view_di > dl > dd');//커스텀 스크롤
		var mqtt = require('mqtt')
		this.client = mqtt.connect('wss://www.peiu.co.kr:9001/ws');
		this.$nuxt.$on("siteid", data => {
			this.siteid = data;
			_deviceId = 1;
			// pcs, bms 상태 수신 
			
			if(this.siteid != null &&  _deviceId != null){
				// pcs, bms 상태 수신 
				this.getDIstat(_deviceId)
			}
		});
		setInterval(() => {
			if(this.siteid != null &&  _deviceId != null){
				// pcs, bms 상태 수신 
				this.getDIstat(_deviceId)
			}
		}, 1000);
	},
};
</script>



<style>
.switch_land_island.on_land:before {
   content: 'PCS';
}
.switch_land_island.on_island:before {
    content: 'PCS';
    
}
.switch_land_island.on_land:after {
    content: 'PCS';
    
}
.switch_land_island.on_land:after {
    content: 'PV';
}
.switch_land_island.on_island:after {
     content: 'PV';
}
#AIDI_info_modal {
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.8);
}
</style>
