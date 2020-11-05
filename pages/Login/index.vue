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
                        <div class="failLogin" style='text-align : left; color: #ec0037; font-weight:bold'>{{error}}</div>
                        <div class="login_btn">
                            <a  @click='Submit()'  href="#" style="width:100%;" class="layout_login btn btn_login"><span>{{$t("links.login")}}</span></a>
                        </div>
                        <div class="etc_link">
                            <a onClick="location.href='https://www.peiu.co.kr:1010/register'" class="flL">{{$t("links.regist")}}</a>
                            <a @click="openPopup" class="flR">{{$t("links.forgetpassword")}}</a>
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
            username : "",
            selectedLang : "한국어",
            userId : "",
            userPassword : "",
            error : "", 
            validateResult : false
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

        openPopup(){
            const popup = {
                iconTyp : 2, 
                btnTyp : 2,
                msg : '비밀번호 초기화를 진행하시겠습니까?'
            }

            this.$nuxt.$emit('open:alertPopup', popup)
        },
        
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
        formValidateCheck(){
            // 이메일 유효성 체크                
            var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            if(!reg_email.test(this.userId) || (!this.userId)) {                            
                return false;
            }                            
            else {
                return true;
            }
               
        },
        async Submit(){

            this.validateResult = await this.formValidateCheck();


            if(!this.validateResult) 
            {
                
                this.error = "이메일 형식이 유효하지 않습니다."
                return;
            }
            

            
            // 입력받은 아이디를 소문자로 변환
            var userid = this.userId;
            this.userId = userid.toLowerCase();
            
            // var data = {
            //     Email : this.userId, 
            //     Password : this.userPassword, 
            //     RememberMe : false
            // }
            // console.log(this.$router)
            //location.href = '/main'
            // 로그인 성공시

            const result = await this.$Api.Login();

            if(result.status == 200){
                await this.successLogin();
                // 리다이렉팅 
                return this.$router.push('main');
            }else{
                if(err.responseText == ""){
                    this.error = '로그인 서버 에러: 관리자 문의'
                }else{
                    this.error = JSON.parse(err.responseText).result['errors'][0].description
                }
            }

            // 권한별 첫번째 페이지 이동
            //this.redirectByLevel();


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
       
        async successLogin(data){
            //var resp = data;

            // 데이터 세팅 
            // 소유 사이트 번호 세팅
            let OwnerSiteNumbyrcc = await this.$Api.getOwnerSiteNum('rcc')
            let OwnerSiteNumbyagg = await this.$Api.getOwnerSiteNum('agg')
            let OwnerSiteNumbysite = await this.$Api.getOwnerSiteNum('site')

            // 소유 사이트(단위별) 설치용량 세팅
            let OwnerSiteFacilitybyrcc = await this.$Api.getOwnerFaciility('rcc');
            let OwnerSiteFacilitybyagg = await this.$Api.getOwnerFaciility('agg');
            let OwnerSiteFacilitybysite = await this.$Api.getOwnerFaciility('site');

            const resp = {
                'token' : 'kl;ks;lkd;a',
                'username' : 'allen', 
                'userType' : 3, 
                'userId' : 'allen.cge'
            }

            this.$store.commit('setAuthLevel', resp.userType)
            this.$store.commit('setToken', resp.token)
            this.$store.commit('setUserName', resp.username)

            
            // var level = getCookie('userType')
            // if(this.userId == 'c02@google.co.kr'){
            //     location.href = '/areaControl'
            //     return;
            // }

            // if(this.$store.state.auth != null){
            //     if(level == 2){
            //         location.href = '/main'
            //     }
            //     else if(level == 3){
            //         location.href = '/manage'
            //     }
            //     else if(level == 0){
            //         location.href = '/areaControl'
            //     }
            //     else if(level == 1){
            //         location.href = '/statusMap'
            //     }
            //     else if(level == 5){
            //         location.href = '/stat'
            //     }
            // }
            
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