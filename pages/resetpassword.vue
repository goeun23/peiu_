<template>
<div>
<!-- <div id="wrapper" class="login layer"> -->
    <div class="layer">
        <span class="content">
            <div class="login_wrap">
                <div class="login_body">
                    <h1 class="login_logo"><img src="/images/logo_login_top.png" alt="PEI U_TOC" />[PEIU_TOC 비밀번호 재설정 화면입니다.]</h1>
                    <div class="login_form">
                        <span class=" input_unit"> 
                            <input type="text"  v-model="userId"  placeholder="사용자 Email" autocomplete="off" readonly/>
                        </span>
                        <span class=" input_unit"> 
                            <input type="password"  v-model="userPassword"   placeholder="새로운 비밀번호" autocomplete="off"/>
                        </span>
                        <span class="input_unit"> 
                            <input type="password"  v-on:keyup="passwordcheck"  v-model="userPassword2"   placeholder="새로운 비밀번호 확인" autocomplete="off"/>
                        </span>
                        <div class="correctnewpassowrd" style='text-align : left;'></div>
                        <div class="login_btn">
                            <a  @click='submit()' style="width:100%;" class="layout_login btn btn_login"><span>설정</span></a>
                        </div>
                        <div class="resetpasswordresult" style='text-align : left;'></div>
                    </div>
                </div>
                <footer class="login_footer">
                    <div class="login_footer_info">
                        <ul class="link_list">
                            <li><a href="#">이용약관</a></li>
                            <li><a href="#">개인정보처리방침</a></li>
                            <li><a href="#">운영정책</a></li>
                            <li><a href="#">공지사항</a></li>
                        </ul>
                        <ul class="lang_list">
                            <li class="is_active"><a href="#">KOR</a></li>
                            <li><a href="#">ENG</a></li>
                        </ul>
                    </div>
                    <div class="copy"><img src="/images/logo_login_footer.png" alt="POWER21">Copyright ⓒ POWER 21 All Rights Reserved</div>
                </footer>
            </div>
        </span>
        <span class="blank"></span>
    </div>

</div>
</template>
<script>
export default {
    head: {
        link: [
            {rel:"stylesheet", href:"/css/login.css"}
        ],
        script: [
            { src: "/scripts/login.js" },
        ]
    },
    data(){
        return{
            userPassword : "",
            userPassword2 : "",
            userId : "",
            correct : false
        }
    },
    methods: {
        submit(){
             var url = "https://www.peiu.co.kr:3020/api/auth/resetpassword"
            var token = getParameters('token');
            var email = this.userId
            var newPassword = this.userPassword2
            
            var newLoginInfo = {
                email: email,
                newPassword: newPassword,
                token: token
            }
            
            if(this.correct == false){
                alert('[새로운 비밀번호]와 [새로운 비밀번호 확인]값이 일치하지 않습니다.')
                return;
            }
            
            $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(newLoginInfo),
                contentType: 'application/json',
                success: function(data){
                    alert('새로운 비밀번호가 설정되었습니다.')
                    window.close();
                },
                error: function (error) {
                    // 에러메세지
                    var msg = error.responseText
                    $('.resetpasswordresult').text(msg)
                },	
            })
        },
        passwordcheck(){
           
            if(this.userPassword2 == this.userPassword){
                $(".correctnewpassowrd").text('새로운 비밀번호가 확인되었습니다.')
                this.correct = true;
            }else{
                $(".correctnewpassowrd").text('새로운 비밀번호가 일치하지 않습니다.')
                this.correct = false;
            }
        }
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
        
        var email = getParameters('email');
        this.userId = email;
        
           
    },
}
function getParameters(paramName) {
    var url = decodeURI(location.href);
    var returnValue;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == paramName.toUpperCase()) {
            returnValue = parameters[i].split('=')[1];
            return decodeURIComponent(returnValue);
        }
    }
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