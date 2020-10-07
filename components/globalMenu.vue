<template >
	<div id="header">
		<nav class="gnb_wrap">
			<a  class="top_logo"></a>
			<div class='gnb'>
				<ul class="page_move">
					<li><a href="javascript:history.back(-1)" class="btn_prev"></a></li>
					<li><a href="javascript:history.go(1)" class="btn_next"></a></li>
                    
				</ul> 
            
                <ul v-if='level == 0'>
                
                    <li id="menu4"> <a href='/areaControl'><span>{{$t("menu.areaCtrl")}}</span></a></li>
                    <li id="menu6"><a href='/prediction'><span>{{$t("menu.predict")}}</span></a></li>
                    <li id="menu8"><a href='/stat' class="menuStyle btnCursor"><span>{{$t("menu.stat-his")}}</span></a></li> 
                  
                    <li id="menu12"><a href='/SearchEvent' class="menuStyle btnCursor"><span>{{$t("menu.event")}}</span></a></li>
                    <li id="menu14"><a href='/report' class="menuStyle btnCursor"><span>{{$t("menu.report")}}</span></a></li> 
            
                </ul>
                <ul v-else-if='level == 1'>
                    
                    <li id="menu_gismap"><a href='/statusMap'><span>{{$t("menu.statusMap")}}</span></a></li>
                    <li id="menu4"> <a href='/areaControl'><span>{{$t("menu.areaCtrl")}}</span></a></li>
                    <li id="menu6"><a href='/prediction'><span>{{$t("menu.predict")}}</span></a></li>
                    <li id="menu8"><a href='/stat' class="menuStyle btnCursor"><span>{{$t("menu.stat-his")}}</span></a></li> 
                   
					<li id="menu12"><a href='/SearchEvent' class="menuStyle btnCursor"><span>{{$t("menu.event")}}</span></a></li>
					<li id="menu14"><a href='/report' class="menuStyle btnCursor"><span>{{$t("menu.report")}}</span></a></li> 
                   
                </ul>
                <ul v-else-if='level == 2'>
                    <a href='/main' id="gnav-main" class="home "><span></span></a>
                    <li id="menu_gismap"><a href='/statusMap'><span>{{$t("menu.statusMap")}}</span></a></li>
                    <li id="menu4"> <a href='/areaControl'><span>{{$t("menu.areaCtrl")}}</span></a></li>
                    <li id="menu6"><a href='/prediction'><span>{{$t("menu.predict")}}</span></a></li>
                    <li id="menu8"><a href='/stat'  class="menuStyle btnCursor"><span>{{$t("menu.stat-his")}}</span></a></li> 
                    <li id="menu11"><a href='/market' class="menuStyle btnCursor"><span>{{$t("menu.market")}}</span></a></li>
					<li id="menu12"><a href='/SearchEvent' class="menuStyle btnCursor"><span>{{$t("menu.event")}}</span></a></li>
					<li id="menu14"><a href='/report' class="menuStyle btnCursor"><span>{{$t("menu.report")}}</span></a></li> 
                    <li id="menu15" class="th1"><a href='/manage' class="menuStyle btnCursor"><span>{{$t("menu.manage")}}</span></a></li> 
                    
                </ul>
                <ul v-if='level == 3'>
                    <li id="menu15" class="th1"> <a href='/manage' class="menuStyle btnCursor"><span>{{$t("menu.manage")}}</span></a></li> 
                </ul>
                <ul v-if='level == 5'>
                    <li id="menu8"><a href='/stat'  class="menuStyle btnCursor"><span>{{$t("menu.stat-his")}}</span></a></li> 
                </ul>
			</div>
		</nav>
		<div class="header_info_wrap">
			<div class="weather_info">
				<ul>
                    <li  style="padding-left: 0.8rem">
                        <marquee width= "77rem;" loop="-1" direction="left" style='color:#bfccdc; font-size: 1.3rem;'><li>{{user}} </li></marquee>
                    </li>
					<li  style="padding-left: 0.8rem">
					<select  @change='changeLanguage($event)' class="sel sel_size1 language ">
						<option value="kr">KOR</option>
						<option value="en">ENG</option>
					</select>
					</li>
					<li class="weather_info1" id='ctrl_temp'><span>{{ctrl_temp}}</span>℃</li>
					<li class="weather_info2" id='ctrl_hum'><span>{{ctrl_hum}}</span>%</li>
					<li class="weather_info3" id='ctrl_cloud'><span>{{ctrl_cloud}}</span>%</li>
                    
				</ul>
			</div>
			<div class="set_info">
				<ul>
					<li><a href="/setting" class="set_info1"><span class="hide">설정</span></a></li><!-- 비활성화시 a태그에 is_disable 클래스 추가 -->
					<li>
						<a href="#" class="set_info2" @click="logout()"></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
    
    data(){
        return{
            user : "",
            ctrl_temp:"",
            ctrl_hum:"",
            ctrl_cloud:"",
            level : 0
        }
    },
    methods: {
        changeLanguage(e,value){
            
            if(value == undefined){
                // 셀렉트 박스 선택으로 들어온 경우
                if(e != null){
                    this.lang = e.target.value;
                }else if(e == null){
                    this.lang = 'kr'
                }

            }else{
                //mounted 이후 진입한 경우 
                
                if(value == null ){
                    this.lang = 'kr'
                }else{
                    this.lang = value;
                }
            }
            $(".language").val(this.lang)
            this.$i18n.locale = this.lang;
       
            setCookie('lang', this.lang);
			// if(e != null){
			// 	var e = event.target.value;
			// 	this.lang = e
			// }
            // else{
			// 	this.lang = value;
			// }
            
            // $(".language").val(value)
            // this.$i18n.locale = this.lang;
			// setCookie('lang', this.lang);
		},
        logout: function () {
			var token = Cookie.get("token")
			location.href = "/";
			var url = "https://www.peiu.co.kr:3020/api/auth/logout"
			$.ajax({
				url: url,
				type: "put",
				headers: {
					'Authorization': 'Bearer ' + token
				},
				success: function (data, textStatus, jqXHR) {
					console.log('success Logout')
				},
				error: function (jqXHR, textStatus, errorThrown) {
				}
			});
			Cookie.remove("token");
			Cookie.remove("username");
			Cookie.remove("userId");
			Cookie.remove("userType");
			Cookie.remove("lang");

		},
        checkAuth(){
            this.level = getCookie('userType')
          
            
        },
        setCtrlCenterData(){
            var resp = _ajax('i', 'currentweather', 'site', null, 0)
            if(resp == undefined){
                return;
            }
            resp = resp[0]
            
            this.ctrl_temp = Number(resp.temp).toFixed(0)
            this.ctrl_hum = resp.humidity
            this.ctrl_cloud = resp.clouds
        }, 
        menuList(){
            const level = 2;
            
        }
    },
    beforeMount() {
        //this.checkAuth();
        this.menuList()
    },
    mounted() {
        // this.changeLanguage(null, getCookie('lang'))
        // this.checkAuth();
        // this.setCtrlCenterData();
        // this.user = getCookie('username')+'( '+getCookie('userId')+')님, 환영합니다.'
    },
}
</script>
<style>
.language {
    width:10rem !important;
}
</style>