<template>
  <div class="col-xs-12 main">
    <div class="searchDiv">
      <div class="searchDate">
        조회일자 :
        <input type="date" name="" id="date1">~
        <input type="date" name="" id="date2">
      </div>
      <div class="searchGroup">
        <fieldset disabled="disabled">
        <legend>Select Type</legend>
          <input type="radio" name="type" id='typeGroup' value="ess" checked="checked">ess
          <input type="radio" name="type" value="pv">pv
          <input type="radio" name="type" value="ess_pv">ess+pv
          </fieldset>
      </div>
      <div class="searchBtn">
        <button type="submit" @click="btnTest">조회</button>
      </div>
    </div>

    <gen-chart1/>
    <!-- <div class="chartDiv">
      <div id='chart1' class="chart-line chart-bar"/>
    </div> -->
    <gen-table/>
  </div>
</template>
<script> 
  import genChart1 from '~/components/genChart1.vue';
  import genTable from '~/components/genTable.vue';
  import * as mLib from '~/assets/gMap'
  // import { cube } from '~/assets/my-module';

  export default {
    layout: "map",
    data() {
      return {
        data0: Math.random(),
        data1: Math.random(),
        data2 : {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":"A1","type":"rcc","name":"서울","values":"[{'soc':100,'soh':100,'load':100}]"},"geometry":{"type":"Point","coordinates":[126.9964599609375,37.57505900514996]}}]}
      }
    },
    components: { 
      genChart1,genTable
    },
    head: {
      link: [{
          rel: "stylesheet",
          href: "/css/map.css"
        },
        {
          rel: 'stylesheet',
          href: '/css/chartist.min.css'
        }
      ],
      script: [{
        src: '/scripts/charts/chartist.min.js'
      }]
    },
    methods : {
      btnTest(){
        this.$nuxt.$emit('MY_TEST',this.data2);
      }
    },
    mounted() {
      

      // setChart();
      // refresh();
    }
  }

</script>

<style>
  .col-xs-12,
  .main {
    margin: 0px;
    padding: 0px;
  }

  .searchDiv {
    width: 100%;
    height: 65px;
    /* background-color: aqua; */
     -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
    border: 1px solid white;
  }

  .searchDate {
    float: left;
  }

  .searchBtn {
    float: right;
    padding: 6px;
  }
  .searchGroup{
    float: left;
  }
</style>
