<template>
    <div class="etc_info_wrap">
        <ul>
            <li class="etc_list_typ1">
                <div class="txt_wrap">
                    <span class="tit">{{$t("statusBottom.M201")}}</span>
                    <span class="txt"><span class="amount">{{currPwrTot}}</span> MW</span>
                </div>
            </li>
            <li class="etc_list_typ2">
                <div class="txt_wrap">
                    <span class="tit">{{$t("statusBottom.M202")}}
                        <div class="peak_time_wrap">
                            <dl>
                                <dt><span class="start_time">00</span><span class="middle_time">12</span><span class="end_time">24h</span></dt>
                                <dd>
                                    <ul>
                                        <!-- <li class="peak_time"></li> -->
                                        <li id='00' class=""></li><!-- 00 -->
                                        <li id='01' class=""></li><!-- 01 -->
                                        <li id='02'  class=""></li><!-- 02 -->
                                        <li id='03'  class=""></li><!-- 03 -->
                                        <li id='04'  class=""></li><!-- 04 -->
                                        <li id='05'  class=""></li><!-- 05 -->
                                        <li id='06'  class=""></li><!-- 06 -->
                                        <li id='07'  class=""></li><!-- 07 -->
                                        <li id='08'  class=""></li><!-- 08 -->
                                        <li id='09' ></li><!-- 09 -->
                                        <li id='10' ></li><!-- 10 -->
                                        <li id='11' ></li><!-- 11 -->
                                        <li id='12'  class=""></li><!-- 12 -->
                                        <li id='13' ></li><!-- 13 -->
                                        <li id='14' ></li><!-- 14 -->
                                        <li id='15' ></li><!-- 15 -->
                                        <li id='16' ></li><!-- 16 -->
                                        <li id='17' ></li><!-- 17 -->
                                        <li id='18' ></li><!-- 18 -->
                                        <li id='19' ></li><!-- 19 -->
                                        <li id='20' ></li><!-- 20 -->
                                        <li id='21' ></li><!-- 21 -->
                                        <li id='22' ></li><!-- 22 -->
                                        <li id='23' ></li><!-- 23 -->
                                        
                                    </ul>
                                </dd>
                            </dl>
                        </div>
                    </span>
                    <span class="txt"><span class="amount">{{fcstime}}</span> {{$t("statusBottom.M203")}} <span class="amount">00</span> {{$t("statusBottom.M204")}} ~ <span class="amount">{{fcEtime}}</span> {{$t("statusBottom.M203")}} <span class="amount">00</span> {{$t("statusBottom.M204")}} </span>
                </div>
                
            </li>
            <li class="etc_list_typ3">
                <div class="txt_wrap">
                    <span class="tit">SMP</span>
                    <span class="txt" data-tit="육지"><span class="amount">{{smp_value_land}}</span> {{$t("statusBottom.M208")}}</span>
                    <span class="txt" data-tit="제주"><span class="amount">{{smp_value_jeju}}</span> {{$t("statusBottom.M208")}}</span>
                </div>
            </li>
            <li class="etc_list_typ4">
                <div class="txt_wrap">
                    <span class="tit">REC</span>
                    <span class="txt"><span class="amount">{{rec_average_price}}</span> {{$t("statusBottom.M210")}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    layout: "statusBotton",
    data() {
    return {
      currPwrTot :0,
      fcstime:0,
      fcEtime:0,
      smp_value_land:0,
      smp_value_jeju:0,
      rec_average_price:0
    };
  },
  methods: {
      updateData(arr){
      
          var land_smp =  String(arr[0].smp_value_land)
          if(land_smp != null && land_smp != undefined){
            // smp 육지
            this.smp_value_land = land_smp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }else{
              this.smp_value_land = "-"
          }

          var jeju_smp =  String(arr[0].smp_value_jeju)
          if(jeju_smp != null && jeju_smp != undefined){
            // smp 제주
            this.smp_value_jeju = jeju_smp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }else{
              this.smp_value_jeju = "-"
          }

          // 현재부하
          this.currPwrTot = arr[0].currPwrTot;
          // 시작시간
          this.fcstime = arr[0].fcstime;
          // 종료시간
          this.fcEtime = arr[0].fcEtime;
         
          // rec
          this.rec_average_price = arr[0].rec_average_price;

          // remove all peak time class
          for(var i = 0; i<= 23; i++){
            if(i<10){
                i = "0"+i
                 
                $("#"+i).removeClass("peak_time")
            }
            
            $("#"+i).removeClass("peak_time")

          }
            // set peak time class
           
          for(var i = this.fcstime; i<= this.fcEtime; i++){
            if(i<10){
                i = "0"+i 
                $("#"+i).addClass("peak_time")
            }
            $("#"+i).addClass("peak_time")
          }
      }
  },
  mounted() {
      this.$nuxt.$on("status-bottom", arr => {

        this.updateData(arr);
        
        });
      
  },
}
</script>