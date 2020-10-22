<template>
  <div class="conts">
    <div class="inquiry">
      <p class="btn_wrap">        
        <a href="#" id="btn1" class="btn" @click="loadSCCJson('3023010900', 'btn1')">대덕</a>
        <a href="#" id="btn2" class="btn" @click="loadSCCJson('3011013700', 'btn2')">동구</a>
        <a href="#" id="btn3" class="btn" @click="loadSCCJson('3017011000', 'btn3')">서구</a>
        <a href="#" id="btn4" class="btn" @click="loadSCCJson('3020014600-1', 'btn4')">유성1</a>
        <a href="#" id="btn5" class="btn" @click="loadSCCJson('3020014600-2', 'btn5')">유성2</a>
        <a href="#" id="btn6" class="btn" @click="loadSCCJson('3014010500', 'btn6')">중구</a>
        <a href="#" id="btn7" class="btn active" @click="loadSCCJson('4425010100', 'btn7')">계룡</a>
        <a href="#" id="btn8" class="btn" @click="loadSCCJson('4427010600', 'btn8')">당진</a>
        <a href="#" id="btn9" class="btn" @click="loadSCCJson('4418010400', 'btn9')">보령</a>
        <a href="#" id="btn10" class="btn" @click="loadSCCJson('4223010100', 'btn10')">서산</a>
        <a href="#" id="btn11" class="btn" @click="loadSCCJson('4420011400', 'btn11')">아산</a>
        <a href="#" id="btn12" class="btn" @click="loadSCCJson('4413110800', 'btn12')">천안</a>
        <a href="#" id="btn13" class="btn" @click="loadSCCJson('4479025023', 'btn13')">청양</a>
      </p>
    </div>
    <!-- <div class="graphArea_wrap">
      <div class="graphArea">
      </div>
    </div> -->
    <div id='sccDiagram' class='mylineDiv'></div>
  </div>
</template>
<script>
export default {
  layout: "sccLineComponent",

  components: {},
  head: {
    link: [
      // {  rel: "stylesheet", href: "/css/line.css" }
    ],
    script: [
      // {src : 'http://d3js.org/d3.v3.min.js'},
      // {src : '/scripts/line/sccLine.js'}
    ]
  },
  data() {
    return {
      // sccData : {"sccGroup":[{"id":"11212","cbList":[{"cbID":"a1","isOpen":false,"poleList":[{"poleID":"a1-1","dr":"DG,ESS"},{"poleID":"a1-2","dr":""},{"poleID":"a1-3","dr":""},{"poleID":"a1-4","dr":""},{"poleID":"a1-5","dr":"DG,ESS"}]},{"cbID":"a2","isOpen":false,"poleList":[{"poleID":"a2-1","dr":""},{"poleID":"a2-2","dr":""},{"poleID":"a2-3","dr":"DG,ESS"},{"poleID":"a2-4","dr":"DG,ESS"},{"poleID":"a2-5","dr":"DG,ESS"}]},{"cbID":"a3","isOpen":false,"poleList":[{"poleID":"a3-1","dr":""},{"poleID":"a3-2","dr":""},{"poleID":"a3-3","dr":"DG,ESS"},{"poleID":"a3-4","dr":"DG,ESS"},{"poleID":"a3-5","dr":"DG,ESS"}]},{"cbID":"a4","isOpne":false,"poleList":[{"poleID":"a4-1","dr":""},{"poleID":"a4-2","dr":""},{"poleID":"a4-3","dr":"DG,ESS"}]}]}]}
      // sccData : {"sccGroup":[{"id":"3020014600","cbList":[{"cbID":"a1","isOpen":false,"poleList":[{"poleID":"3020012300_07100001","Name":"-","dr":"ess"},{"poleID":"3020012300_07100003","Name":["<-대전광역시 서구 내동","<-대전광역시 대덕구 중리동"],"dr":"ess"}]},{"cbID":"a2","isOpen":false,"poleList":[{"poleID":"3020012300_07100007","Name":"-","dr":"dr"},{"poleID":"3020012300_07100011","Name":"-","dr":"dr"}]},{"cbID":"a3","isOpen":false,"poleList":[{"poleID":"3020012300_07100015","Name":"-","dr":"dr"},{"poleID":"3020012300_07100017","Name":"-","dr":"ess"}]},{"cbID":"a4","isOpen":false,"poleList":[{"poleID":"3020012300_07100019","Name":["<-대전광역시 유성구 관평동"],"dr":"ess"},{"poleID":"3020012300_07100021","Name":"-","dr":"dr"}]}]}]},
      sccData: null,
      selectedItem: null
    };
  },
  methods: {
    loadSCCJson: function(code, eleId) {
      $(".btn").removeClass("active");
      $("#" + eleId).addClass("active");

      var path = "/sccJson/" + code + ".json";
      // console.log(path);
      $.getJSON(path, function(data) {
        // console.log('success, ' + data)
      })
        .done(function(data) {
          // console.log(data);
          drawScc(data, "sccDiagram");
        })
        .fail(function(data) {
          alert("error," + data);
        })
        .always(function(data) {
          // console.log('always, '+data);
        });
    }
  },
  mounted() {
    this.loadSCCJson("4425010100", "btn7");
    // drawScc(this.sccData, 'sccDiagram');
    // draw(this.rccData, 'sccDiagram');
  }
};
</script>

<style>
.col-xs-12,
.main {
  margin: 0px;
  padding: 0px;
}
</style>
