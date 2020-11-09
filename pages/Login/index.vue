<template>
    <div class="layer">
        <span class="content">
            <div class="login_wrap">
                <div class="login_body">
                    <h1 class="login_logo"><img @click='autofilled()' src="/images/logo_login_top.png" alt="PEI U_TOC" />
                    <div>[PEIU_TOC 플랫폼 회원전용 로그인 화면입니다.]</div>
                    </h1> 
                    <div class="login_form">
                        <input-text v-model="userId" placeholder="Email" />
                        <input-text v-model="userPassword" placeholder="Password" v-on:keyup.13="Submit"/>
                        <div class="login_check">
                            <input-checkbox id="loginCheck1" text="아이디 저장" />
                            <input-checkbox id="loginCheck2" text="자동 로그인" is-right />
                        </div>
                        <div class="failLogin" style='text-align : left; color: #ec0037; font-weight:bold'>{{error}}</div>
                        <input-button  @click='Submit()' label="로그인"/>
                        <div class="etc_link">
                            <a onClick="location.href='https://www.peiu.co.kr:1010/register'" class="flL">회원가입</a>
                            <a @click="openPopup" class="flR">비밀번호를 잊으셨나요?</a>
                        </div>
                    </div>
                </div>
                <login-footer/>
            </div>
        </span>
    </div>
</template>

<script>
import InputText from '@/components/common/Input/InputText';
import InputCheckbox from '@/components/common/Input/InputCheckbox'
import InputButton from '@/components/common/Input/InputButton'
import LoginFooter from '@/components/Login/LoginFooter'
export default {
    components:{
        InputText, 
        InputCheckbox, 
        InputButton, 
        LoginFooter
    },
    
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