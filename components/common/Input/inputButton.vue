<template>
    <div class="login_btn">
        <a  @click='Submit()'  href="#" style="width:100%;" class="layout_login btn btn_login"><span>{{$t("links.login")}}</span></a>
    </div>
</template>
<script>
export default {
    props : {
        isLogin : {
            type : Boolean, 
            defalut : false
        }
    }
}
</script>