<template>
    <div class="info">
         123112311231123112311231123112311231123112311231123112311231123112311231123112311231
    </div>
</template>

<style scoped>
.info {
  height: 100px;
  widows: 400px;
  font-size: 15pt;
  background-color: white;
  color: red;
  position: relative;
}
</style>
<script>
export default {
  /*
   * Same as
   * <template>
   *   <div :class="{'is-red': isRed}">
   *     <p>Example Text</p>
   *   </div>
   * </template>
   */
  render(h) {
    return h(
      "div",
      {
        class: {
          "is-red": this.isRed
        }
      },
      [h("p", "Example Text")]
    );
  }
};
// export default {
//     render(div){
//         // return <div style="width : 200px; height : 200px; background-color:black; color : black;">hello</div>
//         return '<button type="button" class="btn btn-default">'+
//               '    <i class="fa fa-crosshairs"></i>'+
//               '</button>'+
//               '<button type="button" class="btn btn-info">'+
//               '    <i class="fa fa-compass"></i>'+
//               '</button>'+
//               '<button type="button" class="btn btn-primary">'+
//               '    <i class="fa fa-spinner fa-pulse fa-fw"></i>'+
//               '</button>'+
//               '<button type="button" class="btn btn-danger">'+
//               '    <i class="fa fa-times"></i>'+
//               '</button>'+
//               '<button type="button" class="btn btn-success">'+
//               '    <i class="fa fa-check"></i>'+
//               '</button>'+
//               '<button type="button" class="btn btn-warning">'+
//               '    <i class="fa fa-exclamation-triangle"></i>'+
//               '</button>';
//     }
// }
//
</script>
