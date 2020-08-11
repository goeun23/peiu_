<template>
    <div class="cont_body" style="background : #1A2031 !important; ">
        <div class="tab_wrap size1">
            <div class="tab_tit">
                <ul>
                    
                    <div v-if='level == 1' >
                        <li class="menulist usermanagement is_active"><a @click="showmenu('usermanagement')" class="btn_tab_tit"><span>고객관리</span></a></li>
                    </div>
                    <div v-else-if='level == 0' >
                        <li class="menulist usermanagement is_active"><a @click="showmenu('usermanagement')" class="btn_tab_tit"><span>고객관리</span></a></li>
                    </div>
                    <div v-else>
                        <li class="menulist usermanagement is_active"><a @click="showmenu('usermanagement')" class="btn_tab_tit"><span>고객관리</span></a></li>
                        <li class="menulist sitemanagement"><a  @click="showmenu('sitemanagement')" class="btn_tab_tit"><span>사이트관리</span></a></li>
                        <li class="menulist collectormanagement"><a  @click="showmenu('collectormanagement')" class="btn_tab_tit"><span>수집장치관리</span></a></li>
                    </div>
                </ul>
            </div>
            <div class="tab_cont">
                <manage-user/>
                <manage-site/>
                <manage-collector/>
            </div>
        </div>
    </div>
</template>


<script>
import manageUser from "~/components/manage-user.vue";
import manageSite from "~/components/manage-site.vue";
import manageCollector from '~/components/manage-collector.vue';

export default {
    components: {
      manageUser, manageSite, manageCollector
    },
    layout:"common",
    head:{
        link:[
            { rel: "stylesheet", href:"/css/table/theme.default.css"},
            { rel: "stylesheet", href: "/css/common.css" },
            { rel: "stylesheet", href: "/css/layout.css" },
            { rel: "stylesheet", href: "/css/contents.css" },
            { rel: "stylesheet", href: "/css/jquery-ui.css" },
        ],
        script: [
       
            { src : "/scripts/jquery/core/jquery-ui.min.js"},
            { src : "/scripts/perfect-scrollbar.js"},
            { src : "/scripts/utils.js"},
            { src : "/scripts/custom-select.js" },
            { src : "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"}
        ]
    },
    data(){
        return{
            headcomponent : [],
            bodycomponent : [],
            status : "",
            auth : {
                '0' : '관리자',
                '1' : '중개거래사업자',
                '2' : '발전사업자',
                '3' : '계정관리자'
            },
            confirm : {
                'true' : '승인',
                'false' : '미승인'
            },
            approval : 'land',
            disapproval : 'island',
            popupuserid : "",
            setexpireperiod : null,
            expiredate : "",
            level : 0
        }
    },
    methods: {
        showmenu(menu){
            // 폴더 메뉴 활성/비활성
            $('.menulist').removeClass('is_active')
            $('.' + menu).addClass('is_active')

            // 해당 컴포넌트 show on/off
            $('.componentofmenu').hide();
            $('#' + menu).show()
        },
        setexpire(p){
            if($('#' + p).hasClass('btn_color_blue')){
                $('#' + p).removeClass('btn_color_blue')
                this.setexpireperiod = null;
                $('#expire').val(this.expiredate);
                return;
            }

            $('.setexpire').removeClass('btn_color_blue')
            $('#' + p).addClass('btn_color_blue')
            this.setexpireperiod = p;


            var d = $('#expire').val();

            // 만료일자 부분 텍스트 변경 
            if(p == '1m'){
                $('#expire').val(d, nextMonth(1));
            }else if(p == '6m'){
                $('#expire').val(d, nextMonth(6));
            }else if(p == '1y'){
                $('#expire').val(d, nextYear(1));
            }else{
                // 즉시만료 : 금일
                $('#expire').val("");
            }
           
        },
        DaumPostcode(_num){
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
                    var newadd = settingAddress(addr);

                    // 주소
                    $('#seladdress').val(newadd)
                    
                }
            }).open();
        },
        save(){
            // 승인 여부(미승인-> 승인 요청 한 경우)
            var result = $('#correctbtn').val()

            if(result == this.approval){
                this.userMangement(this.popupuserid, 'confirm')
            }

            // 고객정보 수정 요청
            this.userMangement(this.popupuserid, 'modify')
            if(this.setexpireperiod == 'done'){
                // 즉시 만료
                this.userMangement(this.popupuserid, 'now')
            }else{
                // 기간단위 만료
                this.userMangement(this.popupuserid, 'setexpire')
            }
            
            
        },
        userMangement(id, type){
            // confirm 
            var url = 'https://www.peiu.co.kr:3077/api/manage/v1/account/' + type
            switch (type) {
                case  'confirm':
                    url +=  '/' + id
                break;
                case  'setexpire':
                    url +=  '/date/' + id + "/" +  $('#expire').val()
                break;
                case  'now':
                    var url = 'https://www.peiu.co.kr:3077/api/manage/v1/account/setexpire/now/' + id
                break;
                
                default:
                    break;
            }

            var token = Cookies.get('token');

            if(type == 'modify'){
                // 고객정보 변경 
                // 전화번호, 주소 유효성 체크
                // 전화번호 형식에 맞지 않는 경우를 체크
                var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
                if ( !regExp.test( String($('#seltel').val()) ) ) {
                    alert("잘못된 연락처 입니다.");
                    return;
                }
                
                var modifyjson = {
                    'address' : String($('#seladdress').val()),
                    'id' : String(this.popupuserid), 
                    'phonenumber' : String($('#seltel').val())
                }

                $.ajax({
                    url: url,
                    type: "put",
                    data : JSON.stringify(modifyjson),
                    timeout: 60000,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json",
                    success : function(data){
                        if(data.Result.Code == 200){
                            errorpoup('고객정보 변경 성공')
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                         errorpoup('고객정보 변경 실패')
                    },
                })

            }else{
               
                $.ajax({
                    url: url,
                    type: "put",
                    timeout: 60000,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json",
                    success : function(data){
                        console.log(data)
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                        console.log(textStatus)
                    },
                })
            }

            this.getdata(null)
        },
        getdata(v){
            // null : 전체
            // 1 : 승인
            // 0 : 미승인
            var etc = "";
            switch (v) {
                case null:
                    break;
                case 1:
                    etc = ' where SignInConfirm = 1'
                    break;
                case 0:
                    etc = ' where SignInConfirm = 0'
                    break;
                default:
                    break;
            }
            this.headcomponent = [];
            var tbl = ['순서','고객명','아이디','연락처','주소','회사명','등록일','만료일','승인여부','권한', '수정']
            for(var i =0; i < tbl.length; i++){
                this.headcomponent.push({
                    idx: i, 
                    title : tbl[i]
                })
            }
            
            var q = "SELECT UserName,PhoneNumber, Id, FirstName, LastName, CompanyName, Address, to_char(RegistDate, 'YYYY-MM-dd') as RegistDate, to_char(Expire, 'YYYY-MM-dd') as Expire, SignInConfirm, UserType FROM mysql.peiu_account.`UserAccounts` " + etc
            var userlist = _query(q);
            
            this.bodycomponent = [];
            for(var i=0 ; i < userlist.length; i++){
                var d = userlist[i]
                this.bodycomponent.push({
                    idx : i+1, 
                    data1 : d.FirstName,
                    data2 : d.UserName, 
                    data3 : d.PhoneNumber, 
                    data4 : d.Address, 
                    data5 : d.CompanyName, 
                    data6 : d.RegistDate, 
                    data7 : d.Expire, 
                    data8 : this.confirm[String(d.SignInConfirm)], 
                    data9 : this.auth[String(d.UserType)],
                    data10 : "<button type='button' class='btn btn_tbl_inner'><span>수정</span></button>",
                    data11 : d.Id,
                    data12 : "<button type='button' class='btn btn_tbl_inner'><span>다운로드</span></button>",
                })
            }
        },
        popupopen(idx){
            var s, result;
            var user = this.bodycomponent[idx-1]
            // 클릭한 고객 정보로 팝업 생성

            // 클릭한 고객의 고유 id
            this.popupuserid = user['data11']

            $(".switch_zone_l").empty()

            if(user['data8'] == '승인'){
               
                // 이미 승인된 유저이므로 토글X
                $(".switch_zone_l").append("<span class='aa tbl_th'>승인</span>")
            }else{

                // 미승인 유저이므로 승인 가능하도록 토글생성
                $(".switch_zone_l").append("<button id='correctbtn' type='button' class='iscorrect_switch_land_island on_island'><span></span></button>")
                
                // 기본 상태 세팅(디폴트 : 미승인)
                
                var s = 'island'
                $('#correctbtn').on('click', function(){
                    
                    // 상태 토글
                    if(s == 'island'){
                        s = 'land'
                    }else{
                        s = 'island'
                    }

                    var btn = $('.iscorrect_switch_land_island')
                        btn.removeClass('on_land')
                        btn.removeClass('on_island')
                        btn.addClass("on_" + s);
                        btn.val(s)
                        
                    //승인 여부 값
                    //result = $('#correctbtn').val()
                })
            }
            
            // 고객명 
            $('#username').val(user['data1'])
            // 이메일
            $('#email').val(user['data2'])
            // 회사명
            $('#company').val(user['data5'])
            // 주소
            $('#seladdress').val(user['data4'])
            // 연락처
            $('#seltel').val(user['data3'])
            // 권한
            $('#authtype').val(user['data9'])
            // 등록일
            $('#regist').val(user['data6'])
            // 만료일
            $('#expire').val(user['data7'])
            this.expiredate = user['data7']

            // 팝업 오픈
            $("#popup_wrap").css('display', 'block')
        }, 
        checkAuth(){
            this.level = getCookie('userType')
        },
    },
    mounted() {
        
        this.showmenu('usermanagement');

        this.checkAuth();

        // 라디오 버튼중 '전체' 선택 활성화
        $("input:radio[name='selRadio']:radio[value='null']").prop('checked', true); 
        this.getdata(null)
        new PerfectScrollbar('tbody');
        $( "#expire" ).datepicker();
        
		$(".btn_management").on("click",function(){
			$("#popup_wrap").css("display","block");
        });
        
		$(".btn_search").on("click",function(){
			$("#popup_wrap2").css("display","block");
        });
        
		$(".layer_popup .btn_wrap .btn").on("click",function(){
			$(this).closest(".layer_popup").css("display","none");
        });

        $(".iscorrect_switch_land_island").on("click",function(){//육지, 제주 선택 스위치
            if($(this).hasClass("on_land")){
                $(this).removeClass("on_land").addClass("on_island");
                $(this).val("미승인");
            }else{
                $(this).removeClass("on_island").addClass("on_land");
                $(this).val("승인");
            }
        });
      
    },
}

function settingAddress(addr){
  var result = "";
  var s = String(addr).substr(0,2);
  
  if(s == "서울"){
    result = addr.replace(s,"서울특별시")
  }else if(s == "부산"){
    result = addr.replace(s,"부산특별시")
  }else if(s == "대구"){
    result = addr.replace(s,"대구광역시")
  }else if(s == "인천"){
    result = addr.replace(s,"인천광역시")
  }else if(s == "광주"){
    result = addr.replace(s,"광주광역시")
  }else if(s == "대전"){
    result = addr.replace(s,"대전광역시")
  }else if(s == "울산"){
    result = addr.replace(s,"울산광역시")
  }else if(s == "세종"){
    result = addr.replace(s,"세종특별자치시")
  }else if(s == "경기"){
    result = addr.replace(s,"경기도")
  }else if(s == "강원"){
    result = addr.replace(s,"강원도")
  }else if(s == "전북"){
    result = addr.replace(s,"전라북도")
  }else if(s == "충남"){
    result = addr.replace(s,"충청남도")
  }else if(s == "전남"){
    result = addr.replace(s,"전라남도")
  }else if(s == "경북"){
    result = addr.replace(s,"경상북도")
  }else if(s == "경남"){
    result = addr.replace(s,"경상남도")
  }else if(s == "충북"){
    result = addr.replace(s,"충청북도")
  }
  
  return result;
}
</script>
<style>
.aa{
    font-size: 1.5rem;
    line-height: 1.7rem;
    color: #d0dcf7;
}

 

</style>