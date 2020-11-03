<template>
<div>
<!-- <div id="wrapper" class="login layer"> -->
    <div class="layer">
        <span class="content">
            <div class="login_wrap">
                <div class="login_body">
                    <h1 class="login_logo"><img @click='autofilled()' src="/images/logo_login_top.png" alt="PEI U_TOC" />
                    <div>{{$t("links.only_platform_memeber")}}</div>
                    </h1>
                    
                    <div class="login_form">
                        <span class=" input_unit">
                            <input type="text"  v-model="userId"  placeholder="Email" autocomplete="off"/>
                        </span>
                        <span class="input_unit">
                            <input type="password"  v-on:keyup.13="Submit"  v-model="userPassword"   placeholder="Password" autocomplete="off"/>
                        </span>
                        <div class="login_check">
                            <label for="loginCheck1" class="checkbox_set2 flL">
                                <input type="checkbox" name="" id="loginCheck1">
                                <span class="cont"></span>
                                <span class="txt">{{$t("links.save_email")}}</span>
                            </label>
                            <label for="loginCheck2" class="checkbox_set2 flR">
                                <input type="checkbox" name="" id="loginCheck2">
                                <span class="cont"></span>
                                <span class="txt">{{$t("links.save_login")}}</span>
                            </label>
                        </div>
                        <div class="failLogin" style='text-align : left; color: #ec0037; font-weight:bold'></div>
                        <div class="login_btn">
                            <a  @click='Submit()'  href="#" style="width:100%;" class="layout_login btn btn_login"><span>{{$t("links.login")}}</span></a>
                        </div>
                        <div class="etc_link">
                            <a onClick="location.href='https://www.peiu.co.kr:1010/register'" class="flL">{{$t("links.regist")}}</a>
                            <a href="/findpassword" class="flR">{{$t("links.forgetpassword")}}</a>
                        </div>
                    </div>
                </div>
                <footer class="login_footer">
                    <div class="login_footer_info">
                        <ul class="link_list">
                            <li><a href="#">{{$t("links.info1")}}</a></li>
                            <li><a href="#">{{$t("links.info2")}}</a></li>
                            <li><a href="#">{{$t("links.info3")}}</a></li>
                            <li><a onClick="location.href='https://www.peiu.co.kr:1010/notice'">{{$t("links.info4")}}</a></li>
                        </ul>
                        <ul class="lang_list">
                            <li id='kr' class="lang is_active"><a @click='changeLanguage("kr")'>KOR</a></li>
                            <li id='en' class='lang'><a @click='changeLanguage("en")'>ENG</a></li>
                        </ul>
                    </div>
                    <div class="copy"><img href='https://www.peiu.co.kr:1010' src="/images/logo_login_footer.png" alt="POWER21">Copyright ⓒ POWER 21 All Rights Reserved</div>
                </footer>
            </div>
        </span>
        <span class="blank"></span>
    </div>

</div>
</template>

<script>

export default {
    //layout : 'common',
    data(){
        return{
            posts : [],
            username : "",
            selectedLang : "한국어",
            userId : "",
            userPassword : "",
    
        }
    },
    head: {
        link: [
            {rel:"stylesheet", href:"/css/login.css"}
        ],
        script: [
            { src: "/scripts/login.js" },
        ]
    },
    methods: {
        
        changeLanguage(val){
         
            $(".lang").removeClass('is_active')
            $("#"+val).addClass('is_active')
			
            this.$i18n.locale = val;
			setCookie('lang', val);
		},
        autofilled(){
            this.userId = 'power21@power21.co.kr'
            this.userPassword = 'power211219/'
        },
        Submit(){
            
            // 입력받은 아이디를 소문자로 변환
            var userid = this.userId;
            this.userId = userid.toLowerCase();
            
            // var data = {
            //     Email : this.userId, 
            //     Password : this.userPassword, 
            //     RememberMe : false
            // }
            // console.log(this.$router)
            location.href = '/main'
            // data = JSON.stringify(data);
            // var url = 'https://www.peiu.co.kr:3020/api/auth/login'
            // $.ajax({
            //     type: "post",
            //     url: url,
            //     data: data,
            //     contentType: 'application/json',
            //     success: this.successLogin,
            //     error : this.LoginFailed
            // })
        },
        LoginFailed(err){
        
            if(err.responseText == ""){
                $(".failLogin").text('로그인 서버 에러: 관리자 문의')
            }else{
                $(".failLogin").text(JSON.parse(err.responseText).result['errors'][0].description)
            }
            
        },
        successLogin(data){
            var resp = data;

            setCookie("token", resp.token, 1);
            setCookie('username',resp.user.firstName, 1)
            setCookie('userType',resp.user.userType, 1)
            setCookie('userId', this.userId, 1);
            this.loginFailedCount = 0;
            this.$store.commit('setAuth', resp.token)
            var level = getCookie('userType')
            if(this.userId == 'c02@google.co.kr'){
                location.href = '/areaControl'
                return;
            }

            if(this.$store.state.auth != null){
                if(level == 2){
                    location.href = '/main'
                }
                else if(level == 3){
                    location.href = '/manage'
                }
                else if(level == 0){
                    location.href = '/areaControl'
                }
                else if(level == 1){
                    location.href = '/statusMap'
                }
                else if(level == 5){
                    location.href = '/stat'
                }
            }
            
        },
  
  
      
    },
    
    mounted() {
        
        $(document).ready(function(){
            var loginBg = [
                '/images/bg_login1.jpg', 
                // '/images/bg_login2.jpg', 
                // '/images/bg_login3.jpg'
                ]
            var bgIdx = parseInt(Math.random() * 10)%1;
            $(".layer").css({"background":"url("+loginBg[bgIdx]+") center center no-repeat","background-size":"cover"});
        });
        $(document.body).delegate('#confirm', 'click', function() { 
            
            confirmAlert();
        }) 
        $(document.body).delegate('#cancel', 'click', function() { 
            
            $("#alert_wrap").remove();
        }) 

        $(document.body).delegate('._loginpopup', 'click', function() { 
            
            $("._loginpopup").remove();
        }) 
    },
}
function alertPop(icoTyp,btnTyp,alertCont){//팝업 열림 (팝업 아이콘 모양:숫자, 버튼 갯수:숫자, 얼럿 내용:변수)
    var btnCont;
    var closeBtn;
    closeBtn = '<button type="button" id="cancel" class="btn btn_size_free btn_color_blue"><span>취소</span></button>';
    var alertBody = '<div id="alert_wrap" class="alert_ico_typ'+icoTyp+' alert_btn_typ1">';
        alertBody += '		<div class="alert_dim">';
        alertBody += '			<div class="alert_body">';
        alertBody += '				<div class="alert_icon"></div>';
        alertBody += '				<div class="alert_txt">'+alertCont+'</div>';
        alertBody += '				<div class="alert_btn_wrap"><button type="button" id="confirm" class="btn btn_size_free btn_color_blue"><span>확인</span></button></div>';
        alertBody += '				<div class="alert_btn_wrap">'+closeBtn+'</div>';
        alertBody += '			</div>';
        alertBody += '		</div>';
        alertBody += '	</div>';
    $(".wrapper").append(alertBody);
}
function confirmAlert(){//얼럿 확인

    var email = $( '#userEmail' ).val()
    var url = "https://www.peiu.co.kr:3020/api/auth/forgotpassword?Email="+email
    $.ajax({
        type: "get",
        url: url,
        contentType: 'application/json',
        success: function(data){
            alert('비밀번호를 초기화 합니다. 입력하신 이메일을 확인해주세요.')
            $("#alert_wrap").remove();
        },
        error: function (error) {
            // 에러메세지
            console.log(error)
        },	
    })
  }
</script>

<style>
.layer {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* font-size: 20px; */
}
.layer .content {
    display: inline-block;
    vertical-align: middle
}
.layer .blank {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle
}
</style>