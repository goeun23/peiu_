<template>
<div id='sitemanagement' class="componentofmenu market_record_wrap">
    <!-- top_selBox_zone -->
    <div class="admin_section" style='float : left; width: 42%; margin-right: 5rem;'>
        <ul class='sitemange'>
            <li>
                <span class="tit">대상 발전 사업자</span>
                <span class="txt">
                    <select v-model="aggid" @change='setcontractorlist($event)' class="sel sel_size1">
                        <option value="">{{$t("areaControl.customer")}}</option>
                        <option v-for="v in OptionList" :key='v.idx' :value='v.id'>{{v.value}}</option>
                    </select>
                </span>
                <span class="txt" style='padding-left:0.5rem;' >
                    <select v-model="contractorid" class="sel sel_size1"  style=' width:24rem;' >
                        <option value=""></option>
                        <option v-for="v in constractorlist" :key='v.idx' :value='v.id'>{{v.value}}</option>
                    </select>
                </span>
            </li>
            <li><span class="tit">사이트 번호</span>
                <span class="txt">
                    <input @click='empty()'  v-on:keyup.13="checkinvalidsiteid" type="text" class="input_txt" id='input_siteid'/>
                    <button @click='checkinvalidsiteid()' style='margin-left : 1rem; width:10rem;' type="button" class="btn btn_sel"><span>중복체크</span></button>
                    <span style='padding-left:0.5rem; color:#ec0037; ' id="isinvalidsiteid" class="txt"></span>
                </span>

            </li>
            <li>
                <span class="tit">주소</span>
                <span class="tbl_td inner_search">
                    <input  @click='DaumPostcode()' style='width: 45rem;' type="text" id='address' class="pop_input" readOnly/>
                    <button @click='DaumPostcode()' type="button" class="btn btn_search"></button>
                </span>
            </li>
            <li>
                <span class="tit">지역구분</span> 
                <span class="txt">
                     <input type="text" id='selectedrcc' class="pop_input" readOnly/>
                </span>
            </li>
            <li>
                <span class="tit">위도 </span>
                <span class="txt"><input type="text" id='lat' class="pop_input" readOnly/></span>
            </li>
            <li>
                <span class="tit">경도</span>
                <span class="txt"><input type="text" id='lng' class="pop_input" readOnly/></span>
            </li>
            <li>
                <span class="tit">법정동코드</span>
                <span class="txt"><input type="text" id='bcode' class="pop_input" readOnly/></span>
            </li>
            <li>
                <span class="tit">서비스 종류</span>
                <span class="txt">
                    <select id='agg' class="sel sel_size1">
                        <option value="2">스케줄링(PPA)</option>
                        <option value="1">스케줄링(전력거래)</option>
                        <option value="3">Peak-Cut</option>
                        <option value="4">DR</option>
                        <option value="5">전력품질(FR)</option>
                        <option value="6">전력품질(VR)</option>
                    </select>
                </span>
            </li>
            <li>
                <span class="tit">제어</span>
                <span class="top_selBox_zone">
                    <span style='padding-right: 12rem;'>
                        <input @click='checkauth(0)' value='0' type="radio" name="controlauth" class="selBox_radio">
                        <label  >
                            <div style=' padding-left:0.5rem;' class="btn_sel_wrap">
                            <dl style='width: 4rem;'><dt style='line-height: 2rem; vertical-align: top;'>허용</dt></dl></div>
                        </label>
                    </span>
                    <span style='padding-right: 12rem;'>
                        <input @click='checkauth(1)' value='1' type="radio" name="controlauth" class="selBox_radio">
                        <label >
                            <div style=' padding-left:0.5rem;' class="btn_sel_wrap">
                            <dl style='width: 6rem;'><dt style='line-height: 2rem; vertical-align: top;'>비허용</dt></dl></div>
                        </label>
                    </span>
                </span>
            </li>
            
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit"></span><span class="txt"></span></li>
        </ul>
    </div>
    <div class="admin_section" style='float : left; width: 41%; margin-right: 5rem; margin-top:0rem !important;'>
        <ul class='sitemange'>
            <li><span class="tit">설비 정보</span><span class="txt">설비 대수를 입력하고 생성 버튼을 선택하여 용량, 설치 일자를 추가하세요</span></li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li>
                <span style='width:7rem;'  class="tit">설비 종류</span>
                <span class="txt">
                    <select style='width:10rem;' id='device_type' class="sel sel_size1">
                        <option value="PCS">PCS</option>
                        <option value="BMS">BMS</option>
                        <option value="PV">PV</option>
                    </select>
                </span>
                <span style='padding-left:4rem; width:4rem;'  class="tit">용량</span>
                <span class="txt">
                <span class="input_option_control_wrap">
                    <input type="text" id="device_capacity" value="0">
                    <button type="button" class="btn_option_control control_up"><span></span></button>
                    <button type="button" class="btn_option_control control_down"><span></span></button>
                </span>
                </span>
                <span style='padding-left:4rem; width:6rem;' class="tit">설치일자</span>
                <span class="pick_calendar_wrap selectdate">
                    <input style='width:13rem;' autocomplete="off" readonly id="installeddate" type="text" class="pick_calendar" />
                </span>
               
                <button style='margin-left : 4rem; width:7rem;' @click='createTbltr()' type="button" class="btn btn_sel"><span>생성</span></button>
            </li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li style='padding-bottom: 2rem;'>
                <!-- info_right -->
                <span class="txt" style='padding-left: 40.2rem;'>
                    <button style='margin-left : 4rem; width:7rem;' @click='modify()' type="button" class="btn btn_sel"><span>수정</span></button>
                    <button style='margin-left : 4rem; width:7rem;' @click='save()' type="button" class="btn btn_sel"><span>저장</span></button>
                    <button style='margin-left : 4rem; width:7rem;' @click='deleterow()' type="button" class="btn btn_sel"><span>삭제</span></button>
                </span>
                <div class="info_right">
                    <dl>
                        <dd id='tbl_device_info'>
                            
                            <div class=" divice_tbl tbl_wrap" >
                                <table id='device-info' class="tbl_error_info">
                                <caption></caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="15%">
                                        <col width="20%">
                                        <col width="40%">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <td class=""><span class='tit' style='width:10rem;'></span></td>
                                            <td class=""><span class='tit' style='width:15rem;'>설비</span></td>
                                            <td class=""><span class='tit' style='width:15rem;'>번호</span></td>
                                            <td class=""><span class='tit' style='width:15rem;'>용량(kW)</span></td>
                                            <td class=""><span class='tit' style='width:15rem;'>설치일자</span></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="completed">
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </dd>
                    </dl>
                </div>
            </li>
            
            <li>
                <span class="tit"></span>
                <span class="txt">
                    <button style='margin-left : 4rem; width:11.5rem;' type="button" class="btn btn_sel"><span>사이트 등록</span></button>
                </span>
            </li>
        </ul>
    </div>
  
</div>
</template>
<script>

export default {
    head:{
        link : [

        ],
        script: [
            { src: "/scripts/data/latlngbylawcode.js" },
        ]
    },
    data(){
        return{
            OptionList : [],
            constractorlist : [], 
            aggid : "",
            contractorid : "",
            siteilist : null, 
            siteidcheck : false, 
            pcscnt : 0, 
            bmscnt : 0, 
            pvcnt : 0
        }
    },
    methods: {
        checkauth(v){
        
            // 0 허용 1 미허용
            $("input:radio[name='controlauth']:radio[value='0']").prop('checked', true); 
        },
        deleterow(){
            $('#'+clickedid).remove();
        },
        save(){
            // 수정 불가능 
            $('#'+clickedid + '-capacity').attr('disabled', true)
            $('#'+clickedid + '-installdate').attr('disabled', true)

            // 모든 체크 해제 
            $("tr[rowid=device_row]").removeClass('selected')
            $("input:checkbox[name=device_check]").prop("checked", false);
        },
        modify(){
            // 수정 가능하도록 disabled 속성 해제
           $('#'+clickedid + '-capacity').attr('disabled', false)
           $('#'+clickedid + '-installdate').attr('disabled', false)
           
        },
        createTbltr(){
            var type = $("#device_type").val()
            var indexnum = 0;
            if(type == 'PCS'){
                this.pcscnt = this.pcscnt +1
                indexnum = this.pcscnt;
            }else if(type == 'BMS'){
                this.bmscnt = this.bmscnt +1
                indexnum = this.bmscnt;
            }else{
                this.pvcnt = this.pvcnt +1
                indexnum = this.pvcnt;
            } 
            var installeddate = $("#installeddate").val()
            if(installeddate == ""){
                errorpoup('설치 일자를 선택하세요.')
                return;
            }
            var innerHtml = "";
            innerHtml += 
                "<tr rowid='device_row' id=" +type+indexnum+ " class='completed'>"
                + "<td><span><input type='checkbox' data-device-id="+ type+indexnum +" name='device_check' id="+ type+indexnum +" class='tbl_inner_check'><label for='tbl_check0'></label></span></td>"
                + "<td class='info3' id="+type+indexnum+"-device style='width:15rem; text-align : center;'><span>" + type  + "</span></td>"
                + "<td class='info3' id="+type+indexnum+"-indexnum style='width:15rem; text-align : center;'><span>" + indexnum +"</span></td>"
                + "<td class='info3' style='width:15rem; text-align : center;'><span><span><input type='text' style='width:10rem;' id="+type+indexnum+"-capacity  value="+ $("#device_capacity").val() +" disabled/></span></span>"
                + "<td class='info3' style='width:15rem; text-align : center;'><span><span><input type='text' style='width:10rem;' id="+type+indexnum+"-installdate value="+ installeddate +" disabled/></span></span>"
                + "</td></tr>"
            $('#device-info > tbody:last').append(innerHtml)
        },
        empty(){
            $("#isinvalidsiteid").text("");

            
        },
        checkinvalidsiteid(){
            
            // 정수만 입력 가능 유효성체크
            var regexp = /^[0-9]*$/
            var siteid = $('#input_siteid').val();
            
            if(siteid != "")
            {
               if( !regexp.test(siteid) ) 
                {
                    errorpoup("숫자(정수)만 입력하세요");
                    $('#input_siteid').val("");
                    return;
                }
                else
                {
                    // 중복값 체크 
                    if(this.siteilist.get(siteid) !=undefined)
                    {
                        $('#isinvalidsiteid').text('[중복] : 입력 불가능')
                        $('#input_siteid').val("");
                    }
                    else
                    {
                        $('#isinvalidsiteid').text('입력가능')
                    }
                    this.siteidcheck = true;
                }
            }
            

        },
        setcontractorlist(e){
            if(e != null){
                if(this.aggid == ""){
                    this.aggid = e.target.value;
                }else{
                    var selected = e.target.value;
                }
            }
            this.constractorlist = []
            if(this.aggid != ""){
                var query = "SELECT * FROM mysql.peiu_account.`vw_contractorusers` where AggGroupId = '" + this.aggid + "'";
                var data = _query(query)
                for(var i =0; i< data.length; i++){
                    this.constractorlist.push({
                        idx : i, 
                        id : data[i].UserId,
                        value : data[i].FirstName + " (" + data[i].Email + ")"
                    })
                }
            }
        },
        DaumPostcode(_num){
            var rcc;
            var lawcode;
            new daum.Postcode({
                oncomplete: function(data) {
            
                    var addr = '';
                    if (data.userSelectedType === 'R') { 
                        // 도로명 주소를 선택했을 경우
                        //addr = data.roadAddress;
                        addr = data.jibunAddress;
                    } else { 
                        //지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                        // 위도, 경도 검색을 위해 지번 주소로 통일
                    }

                    // 주소 정형화
                    var newadd = addressFormating(addr);
                    
                    // 주소
                    $('#address').val(newadd)
                    $("#bcode").val(data.bcode)
                    
                    
                    // rcc (지역구분)세팅 
                    rcc = rccFormating(addr)
                    $("#selectedrcc").val(RccList[rcc] + "("+rcc +")")
                    
                    // 위도경도 세팅
                    objoflawcode.forEach((v, k) => {
                        if(v.lawcode == data.bcode){
                            $('#lat').val(v.lat)
                            $("#lng").val(v.lng)
                        }
                    });
                }
            }).open();

            
        },
    },
    mounted() {
        this.OptionList = getUserSiteInfo();
        var siteid = _query('select SiteId from mysql.peiu_account.`vw_contractorsites`')
        this.checkauth(0)
        this.siteilist = new HashMap();
        $('table').tablesort();
      
        for(var i = 0; i< siteid.length; i++){
            this.siteilist.set(siteid[i].SiteId, "")
        }
        //var list = regCodeJson[0][rccId];
        $(document).ready(function(){

            var s = new PerfectScrollbar('.divice_tbl');
            var $btn_option_control = $(".input_option_control_wrap .btn_option_control");
                $btn_option_control.on("click",function(){
                    var optionVal = Number($(this).closest(".input_option_control_wrap").find("input").val());
                    if($(this).hasClass("control_up")){
                        $(this).closest(".input_option_control_wrap").find("input").val((optionVal+1));
                    }else{
                        $(this).closest(".input_option_control_wrap").find("input").val((optionVal-1));
                    }
                });
            $('#installeddate').datepicker();
            /* 팝업 test용 end */
        });
        

        $(document.body).delegate('#device-info tr', 'click', function() { 
            var id = $(this).attr('id')
            // 한개의 체크박스만 선택 가능하도록
            $("tr[rowid=device_row]").removeClass('selected')
            $("input:checkbox[name=device_check]").prop("checked", false);

            var checked = $(this).hasClass("selected")
            // 이미 선택된 경우(토글)
			if(checked == false){
				// 선택한 tr 클래스 추가
				$(this).addClass('selected')
				// 체크박스에 체크 추가
				$("input:checkbox[data-device-id='"+ id  + "']").prop("checked", true);
			}else{
				// 선택되어있던 경우 클래스 제거 
				$(this).removeClass('selected')
				// 체크박스 체크 해제
				$("input:checkbox[data-device-id='"+ id  + "']").prop("checked", false);
            }
            clickedid = id;
          
        })
    }
}


var clickedid;

</script>
<style>
.sitemange{
    font-family: 'NanumBarunGothic';
    font-size: 3.7rem !important;
    line-height: 3.5rem !important;
}
/* .info_right > dl > dd {
    height: 15rem;
} */


.divice_tbl{
    width:74rem;
    height: 38.4rem; 
}



</style>