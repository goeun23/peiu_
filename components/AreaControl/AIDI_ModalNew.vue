<template>
    <div  id='AIDI_info_modal' class="full_popup" style="display:none;">
		
		<div class="pop_head">
			<h1 class="h1_pop">AI/DI 상세보기</h1>
			<span class="pop_close" @click="closeAiDiModal()">&times;</span>
		</div>
		<div class="pop_cont">
			<div class="btn_sel_wrap pcs_switch">
				<button type="button" id="showingcontrol" @click="showpcspvctrl()" class="switch_land_island switch_detail on_land" value="PCS"><span></span></button>
				<ul class="sel_pcs is_active">
					<li><button @click="ShowAIDI('PCS1')" value='pcs1' id="btn_PCS1"  type="button" class="pcs_ctrl btn btn_sel"><span>PCS 1</span></button></li><!-- 활성화시  is_active -->
					<li><button @click="ShowAIDI('PCS2')" value='pcs2' id="btn_PCS2"  type="button" class="pcs_ctrl btn btn_sel"><span>PCS 2</span></button></li>
					<li><button @click="ShowAIDI('PCS3')" value='pcs3' id="btn_PCS3"  type="button" class="pcs_ctrl btn btn_sel"><span>PCS 3</span></button></li>
					<li><button @click="ShowAIDI('PCS4')" value='pcs4' id="btn_PCS4"  type="button" class="pcs_ctrl btn btn_sel"><span>PCS 4</span></button></li>
				</ul>
				<ul class="sel_pv">
					<li><button type="button" @click="ShowPV('first')" id="btn_PV1-2" class="pv_ctrl btn btn_sel is_active"><span>PV 1/2</span></button></li><!-- 활성화시  is_active -->
					<li><button type="button" @click="ShowPV('second')"  id="btn_PV3-4" class="pv_ctrl btn btn_sel"><span>PV 3/4</span></button></li>
				</ul>
			</div>
			<!-- btn_sel_view view_pcs -->
			<div class="btn_sel_view view_pcs is_active">
				<div class="detail_view_ai">
					<dl>
						<dt>{{aitxt}}</dt>
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
												<li><span class="tit">유효 지령</span><span class="data_val val_kw"></span></li>
												<li><span class="tit">무효 지령</span><span class="data_val val_kvar"></span></li>
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
												<li><span class="tit">충전제한전력</span><span class="data_val val_kw"></span></li>
												<li><span class="tit">방전제한전력</span><span class="data_val val_kw"></span></li>
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
										<dt>PCS 상태</dt>
										<dd>
											<ul>
												<li><span class="tit">권한 상태</span><span class="data_val val_none"></span></li>
												<li><span class="tit">충전 상태</span><span class="data_val val_none"></span></li>
												<li><span class="tit">운영 상태</span><span class="data_val val_none"></span></li>
												<li><span class="tit">방전 상태</span><span class="data_val val_none"></span></li>
												<li><span class="tit">고장 상태</span><span class="data_val val_none"></span></li>
												<li><span class="tit">AC MC</span><span class="data_val val_none"></span></li>
												<li><span class="tit">AC ACB</span><span class="data_val val_none"></span></li>
												<li><span class="tit">DC MC</span><span class="data_val val_none"></span></li>
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
						<dt>{{ditxt}}</dt>
						<dd>
							<ul class="detail_list">
								<li>
									<dl class="detail_list_set">
										<dt>PCS</dt>
										<dd>
                                            <ul id='status-pcs' class="detail_state">
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>BAT(Warning)</dt>
										<dd>
                                            <ul id='status-bms-warning'  class="detail_state">
											
											</ul>
											
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dd class="size1">
											<ul id="status-bms-warning2" class="detail_state">
												<!-- <li><span class="ico_state">렉 과방전 전류 이상</span></li> -->
											</ul>
										</dd>
										<dt>BAT(Fault)</dt>
										<dd class="size2">
                                            <ul  id='status-bms-falut'  class="detail_state"></ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dd class="size3">
											 <ul  id='status-bms-falut2'  class="detail_state">
												
											</ul>
										</dd>
										<dt>PCS AO</dt>
										<dd class="size4">
											<ul class="detail_state">
												<li><span class="ico_state tit">운전상태</span><span class="data_val"><span></span></span></li>
												<li><span class="ico_state tit">유효전력 설정</span><span class="data_val"><span></span> kW</span></li>
												<li><span class="ico_state tit">무효전력 설정</span><span class="data_val"><span></span> kVar</span></li>
												<li><span class="ico_state tit">제어모드</span><span class="data_val"><span></span></span></li>
												<li><span class="ico_state tit">SOC 상한 설정</span><span class="data_val"><span></span> %</span></li>
												<li><span class="ico_state tit">SOC 하한 설정</span><span class="data_val"><span></span> %</span></li>
											</ul>
										</dd>
									</dl>
								</li>
							</ul>
						</dd>
					</dl>
				</div>
			</div>
			<!--// btn_sel_view view_pcs -->
			<!-- btn_sel_view view_pv -->
			<div class="btn_sel_view view_pv">
				<div class="detail_view first">
					<dl>
						<dt>{{pvinverter1}}</dt>
						<dd>
							<ul class="detail_list">
								<li>
									<dl class="detail_list_set">
										<dt>AI 상세보기</dt>
										<dd>
											<ul>
												<li><span class="tit">유효출력</span><span id= "TotalActivePower" class="data_val val_kw">-</span></li><!-- 단위는 클래스로 제어함  val_hz, val_v, val_a, val_kw, val_kvar, val_per, val_c, val_mwh, val_kwh, val_none ...-->
												<li><span class="tit">무효출력</span><span id= "TotalReactivePower" class="data_val val_kvar">-</span></li>
												<li><span class="tit">역방향 유효 출력</span><span id= "ReverseActivePower" class="data_val val_kw">-</span></li>
												<li><span class="tit">역방향 무효 출력</span><span id= "ReverseReactivePower" class="data_val val_kw">-</span></li>
												<li><span class="tit">PV 전압 R</span><span id= "vltR"  class="data_val val_v">-</span></li>
												<li><span class="tit">PV 전압 S</span><span id= "vltS"  class="data_val val_v">-</span></li>
												<li><span class="tit">PV 전압 T</span><span id= "vltT"  class="data_val val_v">-</span></li>
												<li><span class="tit">PV 전류 R</span><span id= "crtR"  class="data_val val_a">-</span></li>
												<li><span class="tit">PV 전류 S</span><span id= "crtS"  class="data_val val_a">-</span></li>
												<li><span class="tit">PV 전류 T</span><span id= "crtT"  class="data_val val_a">-</span></li>
                                                <li><span class="tit">금일 누적 발전량</span><span id= "EnergyTodayActivePower"  class="data_val val_kw">-</span></li>
												<li><span class="tit">누적 발전량</span><span id= "EnergyTotalActivePower"  class="data_val val_kw">-</span></li>
												<li><span class="tit">누적 무효 출력량</span><span id= "EnergyTotalReactivePower"  class="data_val val_kvar">-</span></li>
												<li><span class="tit">누적 역방향 유효출력</span><span id= "EnergyTotalReverseActivePower"  class="data_val val_kw">-</span></li>
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>DI 상세보기</dt>
										<dd>
											<ul class="detail_state">
												<li><span class="ico_state">렉 과방전 전력 이상(*****예시****)</span></li><!-- warning 일때  ico_warning 클래스 추가-->
												<!-- <li><span class="ico_state">과방전 전력</span></li>
												<li><span class="ico_state">과충전 전력</span></li>
												<li><span class="ico_state">과방전 전류</span></li>
												<li><span class="ico_state">과충전 전류</span></li>
												<li><span class="ico_state">저온도</span></li>
												<li><span class="ico_state">과온도</span></li>
												<li><span class="ico_state">저전압</span></li>
												<li><span class="ico_state">과전압</span></li>
												<li><span class="ico_state">과편균 온도</span></li>
												<li><span class="ico_state">과온도 롱텀</span></li>
												<li><span class="ico_state">RBMS-MBMS 간 통신 오류</span></li>
												<li><span class="ico_state">RBMS-BBMS 간 통신 오류</span></li>
												<li><span class="ico_state">렉 과방전 전력 이상</span></li>
												<li><span class="ico_state">렉 과방전 전력 이상</span></li>
												<li><span class="ico_state">온도 편차 이상</span></li>
												<li><span class="ico_state">전압 편차 이상</span></li>
												<li><span class="ico_state">온도 센서 이상</span></li>
												<li><span class="ico_state">팬 에러</span></li>
												<li><span class="ico_state">전류 센서 이상</span></li>
												<li><span class="ico_state">MBMS 고장</span></li>
												<li><span class="ico_state">렉 접촉 이상</span></li>
												<li><span class="ico_state">컨텍터 개방 이상</span></li>
												<li><span class="ico_state">렉 과방전 전류 이상</span></li>
												<li><span class="ico_state">렉 과충전 전류 이상</span></li>
												<li><span class="ico_state">렉 불균형 이상</span></li>
												<li><span class="ico_state">메인 컨텍터 피드백 오류</span></li>
												<li><span class="ico_state">CB1 ON/OFF</span></li>
												<li><span class="ico_state">CB1 ON/OFF</span></li>
												<li><span class="ico_state">MC1 ON/OFF</span></li>
												<li><span class="ico_state">CB3 ON/OFF</span></li>
												<li><span class="ico_state">배터리 고장 유무</span></li> -->
											</ul>
										</dd>
									</dl>
								</li>
							</ul>
						</dd>
					</dl>
				</div>
				<div class="detail_view second">
					<dl>
						<dt>{{pvinverter2}}</dt>
						<dd>
							<ul class="detail_list">
								<li>
									<dl class="detail_list_set">
										<dt>AI 상세보기</dt>
										<dd>
											<ul>
												<li><span class="tit">유효출력</span><span id= "second-TotalActivePower" class="data_val val_kw">-</span></li><!-- 단위는 클래스로 제어함  val_hz, val_v, val_a, val_kw, val_kvar, val_per, val_c, val_mwh, val_kwh, val_none ...-->
												<li><span class="tit">무효출력</span><span id= "second-TotalReactivePower" class="data_val val_kvar">-</span></li>
												<li><span class="tit">역방향 유효 출력</span><span id= "second-ReverseActivePower" class="data_val val_kw">-</span></li>
												<li><span class="tit">역방향 무효 출력</span><span id= "second-ReverseReactivePower" class="data_val val_kw">-</span></li>
												<li><span class="tit">PV 전압 R</span><span id= "second-vltR"  class="data_val val_v">-</span></li>
												<li><span class="tit">PV 전압 S</span><span id= "second-vltS"  class="data_val val_v">-</span></li>
												<li><span class="tit">PV 전압 T</span><span id= "second-vltT"  class="data_val val_v">-</span></li>
												<li><span class="tit">PV 전류 R</span><span id= "second-crtR"  class="data_val val_a">-</span></li>
												<li><span class="tit">PV 전류 S</span><span id= "second-crtS"  class="data_val val_a">-</span></li>
												<li><span class="tit">PV 전류 T</span><span id= "second-crtT"  class="data_val val_a">-</span></li>
                                                <li><span class="tit">금일 누적 발전량</span><span id= "second-EnergyTodayActivePower"  class="data_val val_kw">-</span></li>
												<li><span class="tit">누적 발전량</span><span id= "second-EnergyTotalActivePower"  class="data_val val_kw">-</span></li>
												<li><span class="tit">누적 무효 출력량</span><span id= "second-EnergyTotalReactivePower"  class="data_val val_kvar">-</span></li>
												<li><span class="tit">누적 역방향 유효출력</span><span id= "second-EnergyTotalReverseActivePower"  class="data_val val_kw">-</span></li>
											</ul>
										</dd>
									</dl>
								</li>
								<li>
									<dl class="detail_list_set">
										<dt>DI 상세보기</dt>
										<dd>
											<ul class="detail_state">
												
											</ul>
										</dd>
									</dl>
								</li>
							</ul>
						</dd>
					</dl>
				</div>
			</div>
			<!--// btn_sel_view view_pv -->
		</div>
	</div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined

let _deviceId;
export default {
    data(){
        return {
            url_getcurrenteventstatus :
			'https://www.peiu.co.kr:3020/api/notification/getcurrenteventstatus?siteId=',
			url_geteventmaplist :"https://www.peiu.co.kr:3020/api/notification/geteventmaplist",
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
			
            ditxt : "",
            aitxt : "",

            diinterval : null,
            pvinverter1 : "",
            pvinverter2 : ""
        }
    },
    methods: {
        ShowPV(v){
            $('#btn_PV1-2').removeClass('is_active')
            $('#btn_PV3-4').removeClass('is_active')
            
            if(v == null){
                v = 'first'
            }
            var c = "";
            if(v == 'first'){
                c = "btn_PV1-2"
                this.pvinverter1 = "PV 인버터 1"
                this.pvinverter2 = "PV 인버터 2"
            }else{
                c = "btn_PV3-4"
                this.pvinverter1 = "PV 인버터 3"
                this.pvinverter2 = "PV 인버터 4"
            }
            $('#'+c).addClass('is_active')

            this.$nuxt.$emit('pv_num', v)

            // pv 인버터 1 , 2

        },
        showpcspvctrl(){
            
            var obj = $('#showingcontrol')
            if(obj.hasClass('on_land')){
                obj.removeClass("on_land").addClass("on_island");
                obj.val("PV");
                $(".btn_sel_view.view_pcs").removeClass("is_active");
                $(".btn_sel_view.view_pv").addClass("is_active");
                $(".pcs_switch > ul.sel_pcs").removeClass("is_active");
                $(".pcs_switch > ul.sel_pv").addClass("is_active");
            }else{
                obj.removeClass("on_island").addClass("on_land");
                obj.val("PCS");
                $(".btn_sel_view.view_pcs").addClass("is_active");
                $(".btn_sel_view.view_pv").removeClass("is_active");
                $(".pcs_switch > ul.sel_pcs").addClass("is_active");
                $(".pcs_switch > ul.sel_pv").removeClass("is_active");
            }

            this.ShowAIDI('PCS1')
            this.ShowPV('first')
            
        },
		closeAiDiModal: function () {
			document.getElementById("AIDI_info_modal").style.display = "none";
			this.$nuxt.$off('siteid')

		},
		ShowAIDI: function(value) {
            if(value == null || value == undefined){
                value = 1;
            }
            // 상단 텍스트 변경 
            this.aitxt = 'AI 상세보기('+ value + ')'
            this.ditxt = 'DI 상세보기('+ value + ')'

            
		
			var _num = value.replace(/[^0-9]/g,"");
			_deviceId = _num;

			// 버튼 활성화/비활성화
			for(var i =1; i<5; i++){
				$("#btn_PCS"+i).removeClass("is_active");
			}
            $("#btn_PCS"+_num).addClass("is_active");
            
            
            // 대수별 mqtt 데이터 수신

            // pcs
            this.$nuxt.$emit('pcs_num', _num);

            
            // 사이트, 자원별 di 상태 수신
            this.diinterval = setInterval(() => {
                
                if(this.siteid != null &&  _deviceId != null){
                    this.getDIstat(_num);
                }

            }, 2500);

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
            var BMSwarning = new HashMap();
            var bmsfault = new HashMap();

			for(var i=0;i<data.length;i++){
                var v = data[i]
                if(v.level >= 4 ){
                    bmsfault.set(v.code,{idx : i, columnName : v.name,status :v.status,level : v.level})
                }else{
                    BMSwarning.set(
                        v.code,{
                            idx : i,
                            columnName : v.name,
                            status :v.status,
                            // level 1~3 이하 : 경고, 4이상 : 고장
                            level : v.level
                        }
				    )
                }
            }
            
          
			// bms값, 상태 
			
            $("#status-bms-warning").children().remove();
            $("#status-bms-warning2").children().remove();
            $("#status-bms-falut").children().remove();
            $("#status-bms-falut2").children().remove();
          
            bmsfault.forEach((v,k) => {
                //31개 이상이면..
				
			
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
               
                if(v.idx < 37){
                   
                    var fault = $("#status-bms-falut")
                }else{
                   
                    var fault = $("#status-bms-falut2")
                }
                fault.append(li)
            });
            
			BMSwarning.forEach((v,k) => {
                //31개 이상이면..
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
             
                if(v.idx < 37){
                    var warning = $("#status-bms-warning")
                }else{
                    var warning = $("#status-bms-warning2")
                }

                warning.append(li)
             

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
        btnCtrl(data){
            this.siteid = data[0].siteId;
            var p = data[0].pcsCount;
            var b = data[0].pvCount;
            
            $('.pcs_ctrl').hide();
            for(var i = 1; i<= p; i++){
                $('#btn_PCS'+i).show();
            }

            $('.pv_ctrl').hide();
            $(".first").hide();
            $('.second').hide();
            
            if(b == 1 || b == 2){
                $('#btn_PV1-2').show();
                if(b == 1){
                    $('.first').show();
                }
            }else{
                $(".first").show();
                $('.second').show();
                $('#btn_PV1-2').show(); $('#btn_PV3-4').show();
            }

            this.ShowAIDI('PCS1')
            
        }
    },
    beforeDestroy() {
        // if(this.client !=null){
        //     this.client.end();
        //  //  alert('mqtt disconnect')
        // },
    },
    mounted() {
        // custom scroll
        
        // this.$nuxt.$on('deviceCount', data => {
            
        //     var t = new PerfectScrollbar('#status-pcs');//커스텀 스크롤
        //     console.log(t)
        //     clearInterval(this.diinterval)
        //     this.btnCtrl(data);
        // })
        // pcs, bat 영역 동적 바인딩
    },
}
</script>
<style>
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