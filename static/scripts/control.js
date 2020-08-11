var pcs;
var request;
var installedpcs;
function selectdevice(device){
    pcs = new Array()
    //$(".selectpcs").removeClass('is_active');
    
    // 버튼값
    var btn = $("#btn_pcs_"+device)
    
    // 이미 선택되어있는 버튼인 경우 선택 해제
    if(btn.hasClass('is_active')){
       
        btn.removeClass('is_active');
    }else{
        btn.addClass('is_active');
    }
    var p = [];


    if(device == 'all'){
        for(var i = 1; i <= 4; i++){
            $("#btn_pcs_"+i).removeClass('is_active')
            p.push(i)
        }
        
    }else{
        // 선택된 PCS 버튼 파악
        for(var i = 1; i <= 4; i++){
            if($("#btn_pcs_"+i).hasClass('is_active')){
                p.push(i)
            }
        }
        // 모든 pcs를 선택한 경우 모두 선택 해제하고 'PCS ALL' 선택
        if(p.length == 4 ){
            $(".selectpcs").removeClass('is_active');
            $("#btn_pcs_all").addClass('is_active');
        }else{
            $("#btn_pcs_all").removeClass('is_active');
        }
    }
    
    pcs = p;
}

function selectCtrl(mode, txt){
    var control = 0; // 명령값
    var value = null; // 충전, 방전, soc min, max 입력값
    
   
    request = {}
    switch (mode) {
        case 'run': // 운전
            control = "pcs_run"
        break;
        case 'stop': // 정지
            control = "pcs_stop"
        break;
        case 'emergency': // 긴급정지
            control = "pcs_emergencystop"
        break;
        case 'reset': // reset
            control = "pcs_faultreset"
        break;
        case 'chg': // 충전
            control = "pcs_activepower"
            value = -1 * Math.abs( $("#amountofchgdcg").val() )
        break;
        case 'dcg': // 방전
            control = "pcs_activepower"
            value =  Math.abs( $("#amountofchgdcg").val() )
        break;
        case 'auto': // 자동모드
            control = "pcs_automode"
        break;
        case 'manual': // 수동모드
            control = "pcs_manualmode"
        break;
        case 'setmin': // 하한설정
            control = "pcs_soclower"
            value = $("#amountofsetmin").val()
        break;
        case 'setmax': // 상한설정
            control = "pcs_socupper"
            value = $("#amountofsetmax").val()
        break;
        case 'modify_control': // 제어권변경
            control = "pcs_localremote"
        break;
        
        default:
            break;

        if(value == undefined){
            errorpoup(txt + ' 입력 값 없음')
            return;
        }
    }
    
    if(pcs == undefined){
        errorpoup('PCS 선택 값 없음')
        return;
    }else{
        var siteid = getCookie('selectedsite')
        if(siteid == undefined || siteid == null || siteid == "null"){
            errorpoup('주소(SITEID) 값 없음');
            // PCS 버튼 선택 해제
            $(".ctrl_PCS").find('button').removeClass('is_active')
            // 제어 버튼 선택 해제
            $(".btn_ctrl").find('button').removeClass('is_active')
            return;
        }
        request = {
            'siteid' : siteid,
            'btn_id' : "btn_" + mode,
            'device' : pcs,  // pcs 대수
            'text' : txt, // 명령 이름(text)
            'control' : control, // 명령 코드
            'value' : value // 충방전, 상하한 입력 값
        }

        // 유효성 체크
        // 충전, 방전 명령 -> 최대값이 pcs 설치 용량을 넘지 않아야 함 
        // 상한설정 : 최대 100을 넘을 수 없음.  하한설정 : 최대 0을 넘을 수 없음
        
        if( mode == 'setmin' || mode == 'setmax'){
        
            var result = datainvalidcheck(mode, value)
            
            if(result == false){
                errorpoup(txt + ' 값 입력 오류')
                $("#amountofchgdcg").val('')
                $("#amountofsetmin").val('')
                $("#amountofsetmax").val('')
                return;
            }
        
        }
        
        var temp = ""
        if(mode == 'chg' || mode == 'dcg' || mode == 'setmin' || mode == 'setmax'){
            temp = 'PCS : ' + pcs + "<br> 명령 : " + txt + "<br> 코드 : " + control + "<br> 값 : " + value
        }else{
            temp = 'PCS : ' + pcs + "<br> 명령 : " + txt + "<br> 코드 : " + control
        }
        var msg = temp + "<br> <br> <span onclick='autofill()'> 제어 비밀번호 :  </span> <input id='ctrlpw' type='password' autocomplete='off' />"
        passwordcheck(msg)
    }

}

function datainvalidcheck(txt, value){
    var comparemin = 0, comparemax = 0;
    
    switch (txt) {
        case 'setmin':
            comparemax = 100;
        break;
        case 'setmax':
            comparemax = 100;
        break;
        case 'chg' :
            comparemax = installedpcs;
        break;
        case 'dcg' :
            comparemax = installedpcs;
        break;

        default:
            break;
    }

    console.log('txt: ' + txt +  ', value : ' + value + ", comparemax  : " + comparemax + "comparemin : " + comparemin  )

    if(comparemax == undefined || value < comparemin || value > comparemax || value == ""){
        // pcs 최대 값이 없거나,  초과 범위 값을 입력한 경우, 입력값이 없는 경우
        return false;
    }else{
        // 범위 내 값을 입력한 경우
        return true;
    }
}

function autofill(){

    $("#ctrlpw").val('power211234/')
    $("#ctrlpw").text('power211234/')
}

function passwordcheck(msg){//팝업 열림 (팝업 아이콘 모양:숫자, 버튼 갯수:숫자, 얼럿 내용:변수)
    var btnCont  = '<button type="button" onclick="javascript:checkpassword();" class="btn btn_size_free btn_color_blue"><span>확인</span></button> <button type="button" onclick="javascript:closeAlert();" class="btn btn_size_free"><span>취소</span></button>';
    var alertBody = '<div id="alert_wrap" class="alert_ico_typ1" alert_btn_typ1">';
        alertBody += '		<div class="alert_dim">';
        alertBody += '			<div class="alert_body">';
        alertBody += '				<div class="alert_icon"></div>';
        alertBody += '				<div class="alert_txt">'+msg+'</div>';
        alertBody += '				<div class="alert_btn_wrap">'+btnCont+'</div>';
        alertBody += '			</div>';
        alertBody += '		</div>';
        alertBody += '	</div>';
    $("#wrapper").append(alertBody);
}
function closeAlert(){//얼럿팝업 닫기

    // 충방전량, 상한, 하한 설정 값 초기화
    $("#amountofchgdcg").val('')
    $("#amountofsetmin").val('')
    $("#amountofsetmax").val('')
    
    $("#alert_wrap").remove();
   
}
function checkpassword(){//얼럿 확인

    var password = $("#ctrlpw").val()
    if(password != 'power211234/'){
        // 비밀번호가 일치하지 않는 경우
        errorpoup('제어 비밀번호가 일치하지 않습니다.')
        
    }else{
        // 비밀번호가 일치하는 경우

        
        // btn id
        var btnid = request['btn_id']

        // 선택한 버튼 값
        var btn = "#"+ request['btn_id']
        
        // 모든 제어 버튼 선택 해제
        $(".btn_ctrl").find('button').removeClass('is_active')
        
        if(btnid == 'btn_modify_control'){
            // 제어권 변경을 선택한 경우 모든 제어 버튼 막기
          //  $(".btn_ctrl").find('button').prop("disabled", true);

            if($(btn).hasClass('is_active')){
                $(btn).removeClass('is_active');
                $(".btn_ctrl").find('button').attr("disabled", false); 
                $("#alert_wrap").remove();
                return;
            }
        }else{
            // 제어권 변경을 선택하지 않은 경우 모든 제어 버튼 막기 해제
            //$(".btn_ctrl").find('button').attr("disabled", false); 
        }

        // 선택한 제어 버튼 활성화
        $(btn).addClass('is_active')

        // 제어 요청 값 
     //   console.log(request)
        requestControl(request)

    }

    
    $("#alert_wrap").remove();

}
function requestControl(re){
  
    var d= re['device']
    var contorl = re['control']
    var ajaxresult = ["제어 결과 <br/>"];
    var token = getCookie('token')

    if(contorl == 'pcs_localremote'){
        var stat = $("#controlstatus").attr('placeholder')
        if(stat == 'EMS'){
            var value = 0
        }else{
            var value = 1
        }

        var url = 'https://www.peiu.co.kr:3020/api/Hubbub/v1/' + re['control'] + '?siteid='+re['siteid'] + '&deviceindex=1'+ '&localremote=' + value
        
        var s = $.ajax({
            url: url,
            contentType: "application/json",
            type: "get",
            async : false,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(resp,xhr){
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var msg;
                console.log(url+'[Error:]'+jqXHR.status)
            },
        });
        
        ajaxresult.push("PCS1 : " +s.statusText+"<br/>")
    }else{
            for(var i=0; i < d.length; i++){
        
            if(contorl == 'pcs_socupper' ){
                var url = 'https://www.peiu.co.kr:3020/api/Hubbub/v1/' + re['control'] + '?siteid='+re['siteid'] + '&deviceindex='+ d[i] + '&socuppper=' + re['value']
            }else if(contorl == 'pcs_soclower'){
                var url = 'https://www.peiu.co.kr:3020/api/Hubbub/v1/' + re['control'] + '?siteid='+re['siteid'] + '&deviceindex='+ d[i] + '&soclower=' + re['value']
            }else if(contorl == 'pcs_activepower' ){
                var url = 'https://www.peiu.co.kr:3020/api/Hubbub/v1/' + re['control'] + '?siteid='+re['siteid'] + '&deviceindex='+ d[i] + '&power=' + re['value']
            }
            else{
                var url = 'https://www.peiu.co.kr:3020/api/Hubbub/v1/' + re['control'] + '?siteid='+re['siteid'] + '&deviceindex='+ d[i]
            }
            var token = getCookie('token')
            var s = $.ajax({
                url: url,
                contentType: "application/json",
                type: "get",
                async : false,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function(resp,xhr){
                    
                    // console.log(resp)
                    // if(resp == ""){
                    //     errorpoup('제어 ajax 완료')
                    // }
                    // if(result.Code == 200){
                    //     // 성공
                    //     data = resp.Payload.elements
                    // }else{
                    //     console.log(url+' ajax data load 실패')
                    // }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var msg;
                    console.log(url+'[Error:]'+jqXHR.status)
                },
            });
            // ajaxresult.push({
            //     idx : i, 
            //     result : "<p> PCS : " +  d[i] + ": " +s.statusText+"</p><br/>", })
            ajaxresult.push("PCS" +  d[i] + " : " +s.statusText+"<br/>")
            
            }
    
    }
  
    
    console.log(ajaxresult)
    errorpoup(ajaxresult)
}

