<template>
    <div>
        <!-- cont_body -->
        <div class="cont_body">
            <div class="tab_wrap size1">
                <div class="tab_tit">
                    <ul>
                        <li id="adm" @click="clickMenu('adm')" class="is_active"><a class="btn_tab_tit"><span>사용자관리</span></a></li>
                        <li id="msg" @click="clickMenu('msg')"  ><a class="btn_tab_tit"><span>건의사항</span></a></li>
                        <li id="info" @click="clickMenu('info')"  ><a class="btn_tab_tit"><span>관리자정보</span></a></li>
                        <!-- <li id="log" @click="clickMenu('log')"  ><a class="btn_tab_tit"><span>시스템로그</span></a></li> -->
                    </ul>
                </div>
                <div class="tab_cont">
                    <user-info></user-info>
                    <user-msg></user-msg>
                    <user-dev-info></user-dev-info>
                </div>
            </div>  
        </div>
        <!--// cont_body -->
        <acc-popup></acc-popup>
    </div>
</template>
<script>
import userInfo from "~/components/setting-userinfo.vue";
import accPopup from "~/components/setting-popup.vue";
import userMsg from "~/components/setting-message.vue";
import userDevInfo from "~/components/setting-devinfo.vue"
export default{
    layout: 'common',
    components: {
		userInfo,
        userMsg,
        accPopup,
        userDevInfo
	},
    data(){
        return{

        }
    },
    methods: {
        clickMenu(value){
            $("#adm").removeClass("is_active")
            $("#msg").removeClass("is_active")
            $("#info").removeClass("is_active")
            $("#log").removeClass("is_active")
            $("#"+value).addClass("is_active")
            
            $("#userinfo").css('display','none');
            $("#message").css('display','none');
            $("#devinfo").css("display","none")

            if(value == "adm"){
                $("#userinfo").css('display','inline-block');
            }else if(value == 'msg'){
                
                $("#message").css('display','inline-block');
            }else if(value == "info"){
                $("#devinfo").css('display','block')
            }
        }
    },
    mounted() {
        this.clickMenu('adm')
        $(document).ready(function(){
		new PerfectScrollbar('.fixed_tbl_wrap .tbl_management_info tbody');//커스텀 스크롤
		
		var $pop_tit_tab = $(".pop_body .pop_head ul li .btn_pop_tit");
		$pop_tit_tab.on("click",function(){
			if(!$(this).hasClass("is_active")){
				var idx = $(this).closest("li").index();
				$(this).closest("ul").find("li").not(":eq("+idx+")").find(".btn_pop_tit").removeClass("is_active");
				$(this).addClass("is_active");
				$(this).closest(".pop_body").find(".pop_cont > div").not(":eq("+idx+")").css("display","none");
				$(this).closest(".pop_body").find(".pop_cont > div:eq("+idx+")").css("display","block");
			}
		});

            $("#setAuth").on("click",function(){
                $("#popup_wrap").css("display","block");
            });
            $(".btn_search").on("click",function(){
                $("#popup_wrap2").css("display","block");
            });
            $(".layer_popup .btn_wrap .btn").on("click",function(){
                $(this).closest(".layer_popup").css("display","none");
            });
	    });
    },
}
</script>