<template>
  <div class="login_btn">
    <a v-on="$listeners" 
    style="width: 100%" 
    class="layout_login btn btn_login"
      ><span>{{ label }}</span></a
    >
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
    },
    isLogin: {
      type: Boolean,
      defalut: false,
    },
  },
};
</script>