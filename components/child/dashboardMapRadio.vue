<template>
   <div class="control_wrap"> 
     <div class="qulity_title_wrap">
         <strong> <span>선택된 지역 : {{selectedRccName}}</span></strong>
       </div>
     <div class="quality_wrap">
       
        <!-- <strong>전체 서비스</strong> -->
        <strong>{{ $t("statusMap.service_0")}}</strong>
          <div class="radio_wrap">   
            <div class="radiobtn"> 
              <input type="radio" id="all_ctrl_auto" value="true" v-model="ctrl_all">
              <label for="all_ctrl_auto">Auto</label>  
              <input type="radio" id="all_ctrl_manual" value="false" v-model="ctrl_all">
              <label for="all_ctrl_manual">Manual</label>  
              <button @click="setMode('all')">설정</button>
            </div>
          </div>
      </div>
       <!-- <strong>전력품질 주파수</strong> -->
      <div class="quality_wrap">       
        <strong>{{ $t("statusMap.service_1")}}</strong>
          <div class="radio_wrap">   
            <div class="radiobtn"> 
              <input type="radio" id="freq_ctrl_auto" value="true" v-model="ctrl_freq">
              <label for="freq_ctrl_auto">Auto</label>  
              <input type="radio"  id="freq_ctrl_manual" value="false" v-model="ctrl_freq">
              <label for="freq_ctrl_manual">Manual</label> 
              <button @click="setMode('freq')">설정</button>
            </div> 
          </div>
      </div>
      
      <!-- <strong>전력품질 전압</strong> -->
      <!-- <div class="quality_wrap">        
        <strong>{{ $t("statusMap.service_2")}}</strong>
            <div class="radio_wrap">  
              <div class="radiobtn">
                <input type="radio" id="volatage_ctrl_auto" value="auto" v-model="voltage_ctrl">  
                <label for="volatage_ctrl_auto">Auto</label>
              </div>
            <div class="radiobtn">
              <input type="radio"  id="volatage_ctrl_manual" value="manual" v-model="voltage_ctrl">
              <label for="volatage_ctrl_manual">Manual</label>
            </div>
          </div>
      </div> -->

      <div class="quality_wrap">
        <!-- <strong>DR 요금서비스</strong>     -->
        <strong>{{ $t("statusMap.service_3")}}</strong>
          <div class="radio_wrap">   
            <div class="radiobtn">        
              <input type="radio" id="dr_ctrl_auto" value="true" v-model="ctrl_dr">                   
              <label for="dr_ctrl_auto">Auto</label> 
              <input type="radio" id="dr_ctrl_manual" value="false" v-model="ctrl_dr">           
              <label for="dr_ctrl_manual">Manual</label> 
              <button @click="setMode('dr')">설정</button>
            </div> 
          </div>
      </div>

      <!-- <strong>P2P 요금서비스</strong> -->
      <!-- <div class="quality_wrap">        
        <strong>{{ $t("statusMap.service_4")}}</strong>
          <div class="radio_wrap">
            <div class="radiobtn">      
              <input type="radio" name="price_ctrl_auto" value="auto" v-model="price_ctrl">                     
              <label for="price_ctrl_auto">Auto</label>
            </div>
            <div class="radiobtn">
              <input type="radio" name="price_ctrl_manual" value="manual" v-model="price_ctrl">   
              <label for="price_ctrl_manual">Manual</label>
            </div>                    
          </div>
      </div> -->

      <div class="quality_wrap">
        <!-- <strong>Peak 요금서비스</strong> -->
        <strong>{{ $t("statusMap.service_5")}}</strong>
          <div class="radio_wrap">
            <div class="radiobtn">
              <input type="radio" name="peak_ctrl_auto" value="true" v-model="ctrl_peak">                     
              <label for="peak_ctrl_auto">Auto</label>
              <input type="radio" name="peak_ctrl_manual" value="false" v-model="ctrl_peak">   
              <label for="peak_ctrl_manual">Manual</label> 
              <button @click="setMode('peak')">설정</button>
            </div>  
          </div>
      </div>

      <div class="quality_wrap">
        <!-- <strong>Scheduling 요금서비스</strong> -->
        <strong>{{ $t("statusMap.service_6")}}</strong>
          <div class="radio_wrap">
            <div class="radiobtn">
              <input type="radio" name="scheduling_ctrl_auto" value="true" v-model="ctrl_scheduling">                     
              <label for="scheduling_ctrl_auto">Auto</label> 
              <input type="radio" name="scheduling_ctrl_manual" value="false" v-model="ctrl_scheduling">   
              <label for="scheduling_ctrl_manual">Manual</label> 
              <button @click="setMode('scheduling')"> 설정</button>
            </div> 
          </div>
      </div>
  </div>
</template>

<script>
export default {
  layout: "dashboardMapRadio",
  data() {
    return {
      ctrl_freq: "manual",
      voltage_ctrl: "manual",
      ctrl_dr: "manual",
      price_ctrl: "manual",
      ctrl_peak: "manual",
      ctrl_scheduling: "manual",
      selectedRccName: "",
      selectedRccNumber: 0,
      ctrl_all: "ctrl_all",
      url_ctrl_set_mode: process.env.url_ctrl_set_mode,
      url_ctrl_set_all_mode: process.env.url_ctrl_set_all_mode,
      mode: ""
    };
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off("EVTBUS_SET_RCC_NAME");
  },
  methods: {
    setMode: function(mode) {
      /**
       * 0 : 주파수 조정(FR)
       * 1 : DR (수요자반응)
       * 2 : PV (태양광)
       * 3 : 스케쥴링
       * 4 : 피크컷
       */
      var url;
      ///api/ESS/allmodecontrol?AutoMode=False
      this.mode = mode;
      if (mode == "all") {
        if (this.ctrl_all == "true") {
          url = this.url_ctrl_set_all_mode + "?AutoMode=True";
        } else {
          url = this.url_ctrl_set_all_mode + "?AutoMode=False";
        }
      } else {
        //{{apiUrl}}/api/ESS/modecontrol?rcc=1&modeNumber=1&AutoMode=True
        url = this.url_ctrl_set_mode + "?rcc=" + this.selectedRccNumber;

        if (mode == "freq") {
          if (this.ctrl_freq == "true") {
            url = url + "&modeNumber=0&AutoMode=True";
          } else {
            url = url + "&modeNumber=0&AutoMode=False";
          }
        }

        if (mode == "dr") {
          if (this.ctrl_dr == "true") {
            url = url + "&modeNumber=1&AutoMode=True";
          } else {
            url = url + "&modeNumber=1&AutoMode=False";
          }
        }

        if (mode == "peak") {
          if (this.ctrl_peak == "true") {
            url = url + "&modeNumber=4&AutoMode=True";
          } else {
            url = url + "&modeNumber=4&AutoMode=False";
          }
        }
        if (mode == "scheduling") {
          if (this.ctrl_scheduling == "true") {
            url = url + "&modeNumber=3&AutoMode=True";
          } else {
            url = url + "&modeNumber=3&AutoMode=False";
          }
        }
      }
      document.body.style.cursor = "wait";
      this.sendRequest(url);
    },
    sendRequest: function(url) {
      $.ajax({
        url: url,
        type: "put",
        contentType: "application/json",
        success: this.recvSetCtrlResult,
        error: function(jqXHR, textStatus, errorThrown) {
          //console.log("error : setmode()");
          //console.log(jqXHR);
          document.body.style.cursor = "default";
          alert("제어 실패(통신에러)");
        }
      });
    },
    recvSetCtrlResult: function(data, textStatus, jqXHR) {
      document.body.style.cursor = "default";
      if (textStatus == "success") {
        if (this.mode == "all") {
          if (this.ctrl_all == true || this.ctrl_all == "true") 
          {
            this.ctrl_freq = true;
            this.ctrl_dr = true;
            this.ctrl_peak = true;
            this.ctrl_scheduling = true;
          } else {
            this.ctrl_freq = false;
            this.ctrl_dr = false;
            this.ctrl_peak = false;
            this.ctrl_scheduling = false;
          }
        }
        alert("제어 성공");
      } else {
        alert("제어실패");
      }
    }
  },
  mounted() {
    this.$nuxt.$on("EVTBUS_SET_RCC_NAME", data => {
      //console.log("EVTBUS_SET_RCC_NAME - dashboardMapRadio");
      this.selectedRccName = data.name;
      this.selectedRccNumber = data.number;
      this.ctrl_freq = data.ctrl_freq;
      this.ctrl_dr = data.ctrl_dr;
      this.ctrl_peak = data.ctrl_peak;
      this.ctrl_scheduling = data.ctrl_scheduling;

      if (
        this.ctrl_freq == true && this.ctrl_dr == true &&
        this.ctrl_peak == true && this.ctrl_peak == true
      ) {
        this.ctrl_all = true;
      }
      if (
        this.ctrl_freq == false &&
        this.ctrl_dr == false &&
        this.ctrl_peak == false &&
        this.ctrl_scheduling == false
      ) {
        this.ctrl_all = false;
      }
    });
  }
};
</script>

<style>

.qulity_title_wrap {
  width: 100%;
  border-bottom: 1px dotted white;
  margin: 0 0 2rem 0;
}
.radio_wrap button {
  display: inline-block;
  width: 3.875rem;
  height: 2.125rem;
  padding: 0.4375rem 0;
  border-radius: 0.1875rem;
  background: #2a75ff;
  font-size: 1.0625rem;
  line-height: 1.25rem;
  color: #fff;
  letter-spacing: -0.03125rem;
  text-align: center;
}
.radiobtn input[type="radio"] {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
