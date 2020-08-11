
let result;
function alertPop(icoTyp,btnTyp,alertCont) {
    console.log('common-popup script imported!')
    var btnCont;
    var btnCancel;
    
    switch (btnTyp) {
        case 1    : 
            btnCont  = document.createElement("button");
            btnCont.setAttribute('class','btn btn_size_free btn_color_blue')
            btnCont.onclick = function() {
                 confirmAlert();};
            var span = document.createElement("span");
            span.textContent = '확인'
            btnCont.append(span)
            
            break;
        case 2    : 
            btnCont  = document.createElement("button");
            btnCont.setAttribute('class','btn btn_size_free btn_color_blue')
            btnCont.onclick = function() {
                $("#alert_wrap").remove();
                result = 'ok';
                // confirmAlert();
                };
            var span = document.createElement("span");
            span.textContent = '확인'
            btnCont.append(span)

            btnCancel  = document.createElement("button");
            btnCancel.setAttribute('class','btn btn_size_free')
            btnCancel.onclick = function() {
                closeAlert();};
            var spancancel = document.createElement("span");
            spancancel.textContent = '취소'
            btnCancel.append(spancancel)
            
            //<button type="button" @click=closeAlert();" class="btn btn_size_free"><span>취소</span></button>';
            break;
        default   : 
            btnCont  = document.createElement("button");
            btnCont.setAttribute('class','btn btn_size_free btn_color_blue')
            btnCont.onclick = function() {
                 confirmAlert();};
            var span = document.createElement("span");
            span.textContent = '확인'
            btnCont.append(span)
            
            break;
    }
    
    var alertWrap = document.createElement("div")
    alertWrap.setAttribute('id','alert_wrap')
    alertWrap.setAttribute('class','alert_ico_typ'+icoTyp+' alert_btn_typ1')

    var alertdim = document.createElement("div")
    alertdim.setAttribute('class','alert_dim')

    var alertbody = document.createElement("div")
    alertbody.setAttribute('class','alert_body')

    var alerticon = document.createElement("div")
    alerticon.setAttribute('class','alert_icon')

    var alerttxt = document.createElement("div")
    alerttxt.setAttribute('class','alert_txt')
    alerttxt.textContent = alertCont
    
    var alertbtn = document.createElement("div")
    alertbtn.setAttribute('class','alert_btn_wrap')
    if(btnTyp == 2){
        alertbtn.append(btnCont)
        alertbtn.append(btnCancel)
    }
    else{
        alertbtn.append(btnCont)
    }
    

    alertbody.append(alerticon)
    alertbody.append(alerttxt)
    alertbody.append(alertbtn)
    
    alertdim.append(alertbody)


    alertWrap.append(alertdim)


    $("#wrapper").append(alertWrap);
    return 'dkddkkd'
}
function confirmAlert(){//얼럿 확인  
    $("#alert_wrap").remove();
   
} 
function closeAlert(){//얼럿팝업 닫기
    $("#alert_wrap").remove();
   
}