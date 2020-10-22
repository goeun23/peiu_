<template>
<div>
<!-- <div id="wrapper" class="login layer"> -->
    <div class="layer">
        <span class="content">
            <div class="login_wrap">
                <div class="login_body">
                    <h1 class="login_logo"><img src="/images/logo_login_top.png" alt="PEI U_TOC" /></h1>
                    <div class="login_form">
                        
                        <span class=" input_unit">
                            <input type="text"  v-model="email"  placeholder="Email" autocomplete="off"/>
                        </span>
                        <div class="failLogin" style='text-align : left;'></div>
                        <div class="login_btn">
                            <a @click='Submit()'  href="#" style="width:100%;" class="layout_login btn btn_login"><span>비밀번호 재설정 하기</span></a>
                            
                        </div>
                        <div class="login_btn">
                            <a href="javascript:history.back();" style="width:100%;" class="layout_login btn btn_login"><span>뒤로가기</span></a>
                        </div>
                        <p style="text-align: left;" class="forget_comment"></p>
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
    //layout : 'common',
    data(){
        return{
            email : ""
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
        Submit(){
            var email = this.email
            var url = "https://www.peiu.co.kr:3020/api/auth/forgotpassword?Email="+email

            $.ajax({
                type: "get",
                url: url,
                contentType: 'application/json',
                success: function(data){
                    $('.forget_comment').text('비밀번호 재설정 메일 전송이 완료되었습니다. 입력한 이메일 주소의 메일함을 확인해주세요.')
                },
                error: function (error) {
                    // 에러메세지
                   $('.forget_comment').text('비밀번호 재설정 메일 전송 실패. 다시 시도해 주세요.')
                    console.log(error)
                },	
            })
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

        
    },
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