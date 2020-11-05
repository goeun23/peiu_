<template>
    <div class="wrapper" v-if="layer">
        <div class="wrapper_body">
            <div id="alert_wrap" :class="alertClass">		
                <div class="alert_dim">			
                    <div class="alert_body">				
                        <div class="alert_icon"></div>				
                            <div class="alert_txt">{{message}}</div>				
                            <div class="alert_btn_wrap">
                                <button type="button" @click="close" class="btn btn_size_free btn_color_blue">
                                <span>닫기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  
</template>

<script>
export default {

    data(){
        return {
            layer : false, 
            message : null,
            alertClass : "",
        }
    }, 
    methods:{
        close(){
            this.layer = false
            this.message = null
        }
    },
    mounted(){
        this.$nuxt.$on('open:alertPopup', popup => {

            // 아이콘 
            const icon = popup.iconTyp;

            // 버튼 
            const btn = popup.btnTyp;

            // 팝업 클래스 세팅
            this.alertClass = "alert_ico_typ" + icon +" alert_btn_typ" + btn

            // 메세지 세팅
            this.message = popup.msg;
            
            // 팝업 오픈
            this.layer = true;
        })
    }


}
</script>

<style>

</style>