<template>
  <div class="map_view" :id="id">
    <!-- 확대된 넓이 :  164.4rem, 축소된 넓이 : 130rem -->
    <div class="map_size_btn_set">
      <button type="button" class="btn_size_plus">
        <span class="hide">확대</span>
      </button>
      <button type="button" class="btn_size_minus">
        <span class="hide">축소</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: { id: { type: String } },
};
</script>