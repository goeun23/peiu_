<template>
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
</template>