<template>
    <div class='setting'>
        <div class='chapter setting_init'>
            <ul class='sitemange'>
                <li><span class="tit">[전력수집장치 관리]</span></li>
            </ul>
        </div>
        <ul class='sitemange btn_component connect_setting'>
            <li><span class="tit"></span></li>
            <li><span class="tit">연결설정</span><span class="txt"></span></li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li>
                <span class="tit">사이트 선택</span>
                <span class="txt">
                    <select class="sel sel_size1">
                        <option value="2">조천변전소</option>
                        <option value="1">조천변전소2</option>
                        <option value="1">조천변전소3</option>
                    </select>
                </span>
            </li>
            <li><span class="tit">수집장치 선택</span>
                <span class="txt">
                        <select class="sel sel_size1">
                            <option value="2">EF 연계용 전력수집장치1</option>
                            <option value="1">제주도 EF 모드버스2</option>
                            <option value="1">제주도 EF 모드버스3</option>
                            <option value="1">제주도 EF 모드버스4</option>
                        </select>
                        <button style='margin-left : 0.5rem; width:7rem;' type="button" class="btn btn_sel"><span>추가</span></button>
                        <button style='margin-left : 0.5rem; width:7rem;' type="button" class="btn btn_sel"><span>수정</span></button>
                        <button style='margin-left : 0.5rem; width:7rem;' type="button" class="btn btn_sel"><span>삭제</span></button>
                    </span>
            </li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit">수집 설정</span></li>
            <li>
                <span class="tit">데이터 수집 주기</span>
                <span class="txt">
                    <span class="input_option_control_wrap">
                        <input type="text" id="device_capacity" value="0">
                            <button type="button" class="btn_option_control control_up"><span></span></button>
                            <button type="button" class="btn_option_control control_down"><span></span></button>
                    </span>
                    ms
                </span>
            </li>
            <li>
                <span class="tit">통신 재접속 시도 주기</span>
                <span class="txt">
                    <span class="input_option_control_wrap">
                        <input type="text" id="device_capacity" value="0">
                            <button type="button" class="btn_option_control control_up"><span></span></button>
                            <button type="button" class="btn_option_control control_down"><span></span></button>
                    </span>
                    ms
                </span>
            </li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit">장치 설정</span><span class="txt"></span></li>
            <li><span class="tit">접속정보</span>
                <span class="txt">
                    <select class="sel sel_size1">
                        <option value="2">EF TCP 모드버스</option>
                        <option value="1">EF TCP 모드버스2</option>
                        <option value="1">EF TCP 모드버스3</option>
                    </select>
                </span>
            </li>
            <li><span class="tit">AI 맵 설정</span>
                <span class="txt">
                    <select class="sel sel_size1">
                        <option value="2">EF PCS1 AI MAP</option>
                    </select>
                </span>
            </li>
            <li><span class="tit">DI 맵 설정</span>
                <span class="txt">
                    <select class="sel sel_size1">
                        <option value="2">EF PCS1 DI MAP</option>
                    </select>
                </span>
            </li>
            <li><span class="tit">DO 맵 설정</span>
                <span class="txt">
                    <select class="sel sel_size1">
                        <option value="2">EF PCS1 DO MAP</option>
                    </select>
                </span>
            </li>
            <li><span class="tit">상태 맵 설정</span>
                <span class="txt">
                    <select class="sel sel_size1">
                        <option value="2">EF PCS1 상태 MAP</option>
                    </select>
                </span>
            </li>
        </ul>
        <div class='chapter setting_mapping'>
            <ul class='sitemange'>
                <li><span class="tit">[맵핑포인트 그룹 관리]</span></li>
                <li><span class="tit"></span></li>
            </ul>
                <div class="selBox_zone_l_btn">
                <button type="button" style='margin-right:0.5rem;' @click="showpointcomponent('digital')" id='btn_digital'  class="btn btn_sel is_active"><span>디지털 포인트 설정(DI)</span></button><!-- 활성화 시  is_active 클래스 추가-->
                <button type="button" style='margin-right:0.5rem;' @click="showpointcomponent('di')" id='btn_di'  class="btn btn_sel is_active"><span>상태 포인트 설정(DI)</span></button><!-- 활성화 시  is_active 클래스 추가-->
                <button type="button" style='margin-right:0.5rem;' @click="showpointcomponent('ai')" id='btn_ai' class="btn btn_sel"><span>아날로그 포인트 설정(AI)</span></button>
                <button type="button" style='margin-right:0.5rem;' @click="showpointcomponent('aodo')" id='btn_aodo' class="btn btn_sel"><span>외부 제어 포인트 설정(AO/DO)</span></button>
                
            </div>
        </div>
        <ul class='sitemange'>
            <li><span class="tit"></span><span class="txt"></span></li>
            <li><span class="tit">{{title}}</span></li>
            <li><span class="tit">{{groupname}}</span>
                <span class="txt">
                    <select @change='setpointList($event)' v-model='groupid' id='grouptext' class="sel sel_size1">
                        <option v-for='v in groupList' :key='v.idx'  :value="v.id">{{v.value}}</option>
                    </select>
                    <button style='margin-left : 0.5rem; width:7rem;' @click='openPopup("group","add", "추가")' type="button" class="btn btn_sel"><span>추가</span></button>
                    <button style='margin-left : 0.5rem; width:7rem;' @click='openPopup("group","modify", "수정")'  type="button" class="btn btn_sel"><span>수정</span></button>
                    <button style='margin-left : 0.5rem; width:7rem;' @click='openPopup("group","remove", "삭제")' type="button" class="btn btn_sel"><span>삭제</span></button>
                </span>
            </li>
            <li><span class="tit"></span><span class="txt"></span></li>
            <div class="info_right">
                <dl>
                    <dd id='tbl_device_info'>
                        <div class=" divice_tbl tbl_wrap" style='width:100%; height:47.4rem;'>
                            <button style='margin-left : 0.5rem; width:12rem;' @click='openPopup("point","add", "추가")' type="button" class="btn btn_sel"><span>포인트 추가</span></button>
                            <button style='margin-left : 0.5rem; width:12rem;' @click='openPopup("point","modify", "추가")' type="button" class="btn btn_sel"><span>포인트 수정</span></button>
                            <button style='margin-left : 0.5rem; width:12rem;' @click='openPopup("point","remove", "추가")' type="button" class="btn btn_sel"><span>포인트 삭제</span></button>
                            <button style='margin-left : 0.5rem; width:9rem; float:right;' type="button" class="btn btn_sel"><span>IMPORT</span></button>
                            <button style='margin-left : 0.5rem; width:9rem; float:right;' type="button" class="btn btn_sel"><span>EXPORT</span></button>
                            <div v-if="selectedbtn == 'digital'">
                                <table class="tbl_error_info">
                                    <caption></caption>
                                        <thead>
                                            <tr >
                                                <th v-for='v in tblhead' :key='v.idx'><span class='tit' style='width:7.5rem;'>{{v.value}}</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for='v in pointList' :key='v.idx' >
                                                <td><span><input type="checkbox" class="tbl_inner_check"><label for="tbl_check0"></label></span></td>
                                                <td><span class='txt'>{{v.fc}}</span></td>
                                                <td><span class='txt'>{{v.offset}}</span></td>
                                                <td><span class='txt'>{{v.bitflag}}</span></td>
                                                <td><span class='txt'>{{v.datatypeid}}</span></td>
                                                <td><span class='txt'>{{v.name}}</span></td>
                                                <td><span class='txt'>{{v.level}}</span></td>
                                                <td><span class='txt'>{{v.devicetype}}</span></td>
                                            </tr>

                                        </tbody>
                                    </table>
                            </div> 
                            <div v-else-if="selectedbtn == 'di'">
                                <table class="tbl_error_info">
                                    <thead>
                                        <tr >
                                            <th v-for='v in tblhead' :key='v.idx'><span class='tit' style='width:7.5rem;'>{{v.value}}</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='v in pointList' :key='v.idx' >
                                            <td><span><input type="checkbox" class="tbl_inner_check"><label for="tbl_check0"></label></span></td>
                                            <td><span class='txt'>{{v.fc}}</span></td>
                                            <td><span class='txt'>{{v.offset}}</span></td>
                                            <td><span class='txt'>{{v.bitflag}}</span></td>
                                            <td><span class='txt'>{{v.datatypeid}}</span></td>
                                            <td><span class='txt'>{{v.pcsstatusid}}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else-if="selectedbtn == 'ai'">
                                <table class="tbl_error_info">
                                    <thead>
                                        <tr >
                                            <th v-for='v in tblhead' :key='v.idx'><span class='tit' style='width:7.5rem;'>{{v.value}}</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='v in pointList' :key='v.idx' >
                                            <td><span><input type="checkbox" class="tbl_inner_check"><label for="tbl_check0"></label></span></td>
                                            <td><span class='txt'>{{v.pointname}}</span></td>
                                            <td><span class='txt'>{{v.devicetype}}</span></td>
                                            <td><span class='txt'>{{v.fc}}</span></td>
                                            <td><span class='txt'>{{v.offset}}</span></td>
                                            <td><span class='txt'>{{v.datatypeid}}</span></td>
                                            <td><span class='txt'>{{v.scale}}</span></td>
                                            <td><span class='txt'>{{v.byteidx}}</span></td>
                                            <td><span class='txt'>{{v.defaultvalue}}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else-if="selectedbtn =='aodo'">
                                <table class="tbl_error_info">
                                    <thead>
                                        <tr >
                                            <th v-for='v in tblhead' :key='v.idx'><span class='tit' style='width:7.5rem;'>{{v.value}}</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='v in pointList' :key='v.idx' >
                                            <td><span><input type="checkbox" class="tbl_inner_check"><label for="tbl_check0"></label></span></td>
                                            <td><span class='txt'>{{v.pointname}}</span></td>
                                            <td><span class='txt'>{{v.devicetype}}</span></td>
                                            <td><span class='txt'>{{v.fc}}</span></td>
                                            <td><span class='txt'>{{v.offset}}</span></td>
                                            <td><span class='txt'>{{v.datatypeid}}</span></td>
                                            <td><span class='txt'>{{v.scale}}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </dd>
                </dl>
            </div>
        </ul>
        <div id="popup_wrap_addpoint" class="layer_popup" style="display:none;">
            <div class="layer_dim">
                <div class="pop_body" style='width:41rem;'>
                    <div class="pop_head">
                        <ul>
                            <li><button type="button" class="btn_pop_tit is_active"><span>{{groupname}}-{{popuptxt}}</span></button></li>
                        
                        </ul>
                    </div>
                    <div class="pop_cont">
                        <!-- cont1 -->
                        <div class="cont1">
                            <div class="tbl_wrap">
                                <p class="tbl_topR_comment"><span class="required">필수 입력</span></p>
                                <table border="0" cellpadding="0" cellspacing="0" summary="">
                                <caption></caption>
                                    <colgroup>
                                    <col width="40%" />
                                    <col width="60%" />
                                    </colgroup>
                                    <tbody>
                                        <tr v-for='v in tblhead' :key='v.idx'>
                                            <th><span class='tbl_th'>{{v.value}}</span></th>
                                            <td><span class="tbl_td"><input type="text" :id="v.id"  class="pop_input" /></span></td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                            <div class="btn_wrap alR">
                                <button @click ='saveinfo()' type="button" class="btn btn_size_free btn_color_blue"><span>{{popuptxt}}</span></button>
                                <button type="button" class="btn btn_size_free"><span>{{ $t('manage.close') }}</span></button>
                            </div>
                        </div>
                        <!--// cont1 -->
                    
                    </div>
                </div>
            </div>
        </div>
        <div id="popup_wrap_addgroup" class="layer_popup" style="display:none;">
            <div class="layer_dim">
                <div class="pop_body" style='width:41rem;'>
                    <div class="pop_head">
                        <ul>
                            <li><button type="button" class="btn_pop_tit is_active"><span>{{groupname}}-{{popuptxt}}</span></button></li>
                        </ul>
                    </div>
                    <div class="pop_cont">
                        <!-- cont1 -->
                        <div class="cont1">
                            <div class="tbl_wrap">
                                <p class="tbl_topR_comment"><span class="required">필수 입력</span></p>
                                <table border="0" cellpadding="0" cellspacing="0" summary="">
                                <caption></caption>
                                    <colgroup>
                                    <col width="40%" />
                                    <col width="60%" />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th><span class="tbl_th ">그룹명</span></th>
                                            <td><span class="tbl_td"><input type="text" id="groupname"  class="pop_input" /></span></td>
                                        </tr>
                                        <tr>
                                            <th><span class="tbl_th ">설명(선택항목)</span></th>
                                            <td><span class="tbl_td"><input type="text" id="groupdescription"  class="pop_input" /></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="btn_wrap alR">
                                <button @click ='saveinfo()' type="button" class="btn btn_size_free btn_color_blue"><span>{{popuptxt}}</span></button>
                                <button type="button" class="btn btn_size_free"><span>{{ $t('manage.close') }}</span></button>
                            </div>
                        </div>
                        <!--// cont1 -->
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectedbtn : "digital",
            title : "",
            groupname : "",
            groupid : "",
            groupList : [],
            tblhead : [],
            pointList : [],
            popuptxt : "",
            isgroup: false,
            selectedrequest : "", 
        }
    },
    methods: {
        addPointgroup(){
            
            var send = 
            {
                "id": this.groupid,
                "name": $("#groupname").val(),
                "description": $("#groupdescription").val()
            }

            if(this.selectedrequest == 'add')
            {
                // url 이 같기 때문에 modify로
                this.selectedrequest = 'modify'

                // 추가일 경우 아이디 값 삭제,
                delete send.id;
            }
            else if(this.selectedrequest == 'remove')
            {
                // 삭제일 경우 url에 파라미터로 아이디를 넘겨줌
                send = this.groupid
            }
          
            // 그룹명 필수입력 항목 체크
            if($("#groupname").val() == null || $("#groupname").val() == "")
            {
                errorpoup('그룹명을 입럭해주세요.')
                return;
            }
            
            // 추가/수정요청일때, 그룹명 중복체크
            if(this.selectedrequest == 'modify' ){
                for(var i =0 ; i < this.groupList.length; i++){
                    if(this.groupList[i].value == $("#groupname").val()){
                        errorpoup('그룹명이 이미 존재합니다.')
                        return;
                    }
                }
            }

            // 요청 url 세팅
            var request = this.setAjaxurl() + 'group';
            var url = 'https://www.peiu.co.kr:3020/api/Hubbub/v1/' + this.selectedrequest + '/' + request;
            

            // 추가, 수정, 삭제 ajax 요청
            this.requestajax(this.selectedrequest, url, send)
        },
        saveinfo(){

            if(this.isgroup)
            {
                // 포인트 그룹 추가
                this.addPointgroup()
            }
            else
            {
                // 포인트 추가
                this.addPoint();
            }
        },
        addPoint(){
            var pointinfo = [];
            for(var i = 0; i< this.tblhead.length; i++)
            {
                pointinfo.push({
                    idx : i, 
                    id : '#headlist' + i , 
                    value : $("#headlist" + i).val()
                })
            }

        },
        requestajax(v, url, send ){
            var token = getCookie('token')
            if(v == 'remove')
            {
                url += "?id=" + send
                $.ajax({
                    url : url,
                    type : "delete",
                    headers: { 'Authorization': 'Bearer ' + token },
                    success: this.recvajaxResult
                });
            }
            else
            {
                $.ajax({
                    url : url,
                    type : "put",
                    headers: { 'Authorization': 'Bearer ' + token },
                    data : JSON.stringify(send),
                    contentType : "application/json",
                    success: this.recvajaxResult
                });
            }
        },
        recvajaxResult(response){
            if(response.result.code == 200){
                errorpoup('요청 완료')
                this.setComponenttxt();
            }
        },
        setAjaxurl(){
            var url= "";
            switch (this.selectedbtn) {
                case "digital":
                    url = 'digitalinput'
                    break;
                case "di":
                    url = 'digitalstatus'
                    break;
                case "ai":
                    url = 'analoginput'
                    break;
                case "aodo":
                    url = 'digitaloutput'
                    break;
                default:
                    break;
            }
            url = url
            return url;
        },
        openPopup(v1, v2, v3){
            // v1 : group / point
            // v2 :  modify(추가, 수정)
            // v3 : 팝업 구분 텍스트 

            this.selectedrequest = v2;
            this.popuptxt = v3;
            // 팝업 텍스트 항목 초기화
            $("#groupname").val("");  $("#groupdescription").val(""); 
         
            // 수정 버튼 클릭시
            // 셀렉트 리스트에서 선택한 항목의 고유ID 
            $("#groupname").val($("#grouptext option:checked").text())


            if(v1 == 'group'){
                // 그룹 팝업 show
                $("#popup_wrap_addgroup").css('display', 'block')
                this.isgroup = true;
            }
            else if(v1 == 'point'){
                // 포인트 팝업 show 
                $("#popup_wrap_addpoint").css('display', 'block')
                this.isgroup = false;
            }
        },
        showpointcomponent(v1){

            $(".selBox_zone_l_btn > button").removeClass('is_active')
            $("#btn_"+v1).addClass('is_active')
            $('.btn_component').hide();
            $('.'+v1 + "_setting").show();
            
            $('.system').hide()
            $(".setting_init").hide();
            $(".setting_mapping").hide();
            
            if(v1 == 'connect' || v1 == 'etc' || v1 == 'backup'){
                $(".setting_init").show()
                
            }else{
                $(".setting_mapping").show()
            }

            this.selectedbtn = v1;
           
            if(v1 != ""){
                this.setComponenttxt();
            }
            
        },
        setComponenttxt(){
            var table = "";
            var headlist = [];

            switch (this.selectedbtn) {
                case "digital":
                    headlist = ['선택', 'FC', 'OFFSET', 'BIT값', '데이터타입', '이벤트명','이벤트레벨', '장치']
                    table = "DigitalInputGroup"
                    this.title = "DI 포인트 설정"
                    this.groupname = "DI 포인트 그룹 설정"
                    break;
                case "di":
                    headlist = ['선택', 'FC', 'OFFSET', 'BIT값', '데이터타입', '상태명']
                    table = "DigitalStatusGroup"
                    this.title = "상태 포인트 설정"
                    this.groupname = "상태 포인트 그룹 설정"
                    break;
                case "ai":
                    headlist = ['선택', '포인트명', '장치종류', 'FC' ,'OFFSET', '데이터타입', '스케일값','바이트위치', '기본값']
                    table = "AnalogInputGroup"
                    this.title = "아날로그 포인트 설정"
                    this.groupname = "아날로그 포인트 그룹 설정"
                    break;
                case "aodo":
                    headlist = ['선택', '포인트명', '장치종류', 'FC' ,'OFFSET', '데이터타입', '스케일값']
                    table = "DigitalOutputGroup"
                    this.title = "외부 제어 포인트 설정"
                    this.groupname = "외부 제어 포인트 그룹 설정"
                    break;
                default:
                    break;
            }

            // table head 세팅
            this.tblhead = [];
            for(var i= 0; i< headlist.length; i++){
                this.tblhead.push({
                    idx : i, 
                    value : headlist[i], 
                    id : 'headlist' + i
                })
            }

            // 그룹리스트 세팅
            var group = _query('select * from mysql.peiuhubbub.`' +table+'`')
            this.groupList = [];
            for(var i = 0 ; i < group.length; i++){
                this.groupList.push({
                    idx : i, 
                    id : group[i].id,
                    value : group[i].name
                })
            }

            if(this.groupList.length > 0){
                // 그룹리스트 중 첫번째 항목의 포인트리스트 세팅
                this.groupid = this.groupList[0].id
               
                this.setpointList();
            }

        },
        setpointList(e){ 
            var value = "";
            if(e != undefined){
                value = e.target.value;
            }else{
                value = this.groupid
            }
          
            var q = "select * from mysql.peiuhubbub.`"
            switch (this.selectedbtn) {
                case 'ai':
                    q += 'vwAnalogPoints`'
                    break;
                case 'di':
                    q += 'ModbusDigitalStatusPoints`'
                    break;
                case 'digital':
                    q += 'ModbusDigitalInputPoints`'
                    break;
                case 'aodo':
                    q += 'ModbusDigitalOutputPoints`'
                    break;

                default:
                    
                    break;
            }

            q += ' where groupid = ' + value;

            this.pointList = [];

            var list = _query(q)
           
            for(var i=0; i < list.length; i++){
                this.pointList.push({
                    idx : i, 
                    fc : list[i].functioncode,
                    offset : list[i].offset,
                    bitflag : list[i].bitflag,
                    name : list[i].name,
                    level : list[i].level,
                    datatypeid : list[i].datatypeid,
                    devicetype : list[i].devicetypeid,
                    scale : list[i].scalefactor, 
                    byteidx : list[i].byteindex, 
                    defaultvalue : list[i].defaultvalue,
                    pcsstatusid : list[i].pcsstatusid,
                    pointname : list[i].description, 
                    devicetype : list[i].devicetype, 
                    type : "", 
                })
            }
        },
    },
    mounted() {
        // '디지털 포인트 설정'으로 초기화 
        this.showpointcomponent('digital')
        
        this.$nuxt.$on('btn_value', data => {
            
            // connect : 전력수집장치 컴포넌트
            // connect 외 : 맵핑 포인트 그룹 관리 컴포넌트
            if(data != 'connect'){
                this.showpointcomponent(data)
            }
            
        })
        // 스크롤바
        // var aipoint = document.querySelector('#ai_point_tbl');
        // new PerfectScrollbar(aipoint);
      
    },
}

</script>

<style>
#ai_point_tbl {
    position: relative;
    width: 123rem;
    height: 20.4rem;
    overflow: auto;
}
</style>