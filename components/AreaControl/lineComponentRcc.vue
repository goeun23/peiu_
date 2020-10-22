<template>	
  <div class="conts">
    <div class="inquiry">
      <dl class="period">
        <dt>Site : </dt>
        <dd>
          <div class="selectbox">
            <!-- <label id="selectedLB" for="region_field">1</label>  -->
            <label for="region_field">{{selectedItem}}</label>
            <select name="region_field" id="region_field" class="info_select"
                        v-model="selectedItem" @change="changedValue">
              <option v-for="option in options" :value="option.id" 
                              :key="option.id" >{{ option.label }}</option>
            </select>
          </div>
          <!-- <p class="btn_inguiry"><a  @click="changedValue(selectedItem)" >조회</a></p> -->
        </dd>
      </dl>
    </div>
    
    <div id='rccDiagram' class='mylineDiv'></div>
    <div id="rccContext-rccMenu" class="rccMenu">
      <span id="clicked-Rcc-Id">ESS#101</span>
      <hr>
      <div id="rccContext-rccMenu-subMenu">
        <!-- 클릭 이벤트 발생시 클릭 이벤트 하는 테그 자동 추가 -->
      </div>
    </div>
  </div>
   
  <!-- <div class="">
      
    </div> -->
</template>
<script>
export default {
  layout: "rccLineComponent",

  components: {},
  head: {
    link: [
      //  {  rel: "stylesheet", href: "/css/line.css" },
    ],
    script: [
      // {src : 'http://d3js.org/d3.v3.min.js'},
      // {src : 'https://d3js.org/d3.v4.min.js'},
      // {src : 'https://d3js.org/d3-selection-multi.v1.min.js'},
      // { src : '/scripts/line/rccLine2.js'},
      // { src : '/scripts/data/markerLocInfo.js'  },
      // { src : '/scripts/my-ol.map.js'  },
      // { src : '/scripts/data/regCode.js'  },
    ]
  },
  props: {
    requestID: { type: String }
  },
  data() {
    return {
      // rccData : {"rccGroup":[{"name":"A","subNode":[{"type":"Load","id":"Load-1"}],"topNode":[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name":"B","subNode":[{"type":"Load","id":"Load-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"}]}]}
      // rccData : {"rccGroup" :[{"name" :"A","subNode" :[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode" :[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name" :"B","subNode" :[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode" :[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]}]}
      //  rccData : {"rccGroup":[{"name":"A","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name":"B","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]}]}
      // rccData : {"rccGroup":[{"name":"A","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name":"B","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]}]}
      // rccData  :{"rccGroup":[{"name":"A","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name":"B","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"E","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]}]}
      //6개
      rccIdx: 0,
      rccNodeMap: null,
      rccNodeList: null,
      areaList: null,
      selectedItem: null,

      // rccData:{"rccGroup":[{"name":"A","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name":"B","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]}]},
      // rccData:{"rccGroup":[{"name":"A","subNode":[{"type":"대전충남Gen","id":"4413000000","value":0,"name":"천안"},{"type":"대전충남Gen","id":"4421000000","value":0,"name":"서산"}],"topNode":[{"id":"4155000000","type":"경기도RCC","name":"천안-안성","value":0}]},{"name":"B","subNode":[{"type":"대전충남Gen","id":"4427000000","value":0,"name":"당진"},{"type":"대전충남Gen","id":"4425000000","value":0,"name":"계룡"}],"topNode":[{"id":"4513000000","type":"전라북도RCC","name":"계룡-군산","value":0}]},{"name":"C","subNode":[{"type":"대전충남Gen","id":"4418000000","value":0,"name":"보령"},{"type":"대전충남Gen","id":"3020000000","value":0,"name":"유성"},{"type":"대전충남Gen","id":"2717000000","value":0,"name":"서구"}],"topNode":[{"id":"4311000000","type":"충청북도RCC","name":"유성-청주","value":0}]},{"name":"D","subNode":[{"type":"대전충남Gen","id":"2714000000","value":0,"name":"동구"},{"type":"대전충남Gen","id":"4479000000","value":0,"name":"청양"}],"topNode":[{"id":"4373000000","type":"충청북도RCC","name":"동구-옥천","value":0}]},{"name":"E","subNode":[{"type":"대전충남Gen","id":"4420000000","value":0,"name":"아산"},{"type":"대전충남Gen","id":"2711000000","value":0,"name":"중구"},{"type":"대전충남Gen","id":"3023000000","value":0,"name":"대덕구"}],"topNode":[{"id":"4719000000","type":"경상북도RCC","name":"중구-구미","value":0}]}]},
      rccData: {
        rccGroup: [
          {
            name: "name-0",
            subNode: [
              { type: "sub-0-0-Gen", id: "sub-0-0", name: "sub-0-0", value: 0 },
              { type: "sub-0-1-Gen", id: "sub-0-1", name: "sub-0-1", value: 0 }
            ],
            topNode: [
              { type: "top-0-0-Rcc", id: "top-0-0", name: "top-0-0", value: 0 },
              { type: "top-0-1-Rcc", id: "top-0-1", name: "top-0-1", value: 0 }
            ]
          },
          {
            name: "name-1",
            subNode: [
              { type: "sub-1-0-Gen", id: "sub-1-0", name: "sub-1-0", value: 0 },
              { type: "sub-1-1-Gen", id: "sub-1-1", name: "sub-1-1", value: 0 }
            ],
            topNode: [
              { type: "top-1-0-Rcc", id: "top-1-0", name: "top-1-0", value: 0 }
            ]
          }
        ]
      },
      options: [
        { id: "rcc1", label: "서울" },
        { id: "rcc2", label: "남서울" },
        { id: "rcc3", label: "인천" },
        { id: "rcc4", label: "경기" },
        { id: "rcc5", label: "경기북부" },
        { id: "rcc6", label: "강원" },
        { id: "rcc7", label: "대전충남" },
        { id: "rcc8", label: "충북" },
        { id: "rcc9", label: "광주전남" },
        { id: "rcc10", label: "전북" },
        { id: "rcc11", label: "대구" },
        { id: "rcc12", label: "부산울산" },
        { id: "rcc13", label: "경남" },
        { id: "rcc14", label: "경북" }
      ]
    };
  },
  methods: {
    changePage(key) {
      alert("clicked id" + key);
    },
    createModel: function() {},
    changedValue: function(value) {
      var idx = value.currentTarget.value;
      this.options.forEach((v, i) => {
        if (v.id === idx) {
          this.selectedItem = v.label;
        }
      });
      // $('#value.currentTarget.id').siblings('label').text(idx);
      this.$nuxt.$emit("rcc-line-dlg", idx);
      var d = this.createRccData();
      //console.log(JSON.stringify(d));
      //console.log(this.rccData);

      var svgRccDiv = document.getElementById("rccDiagram");
      while (svgRccDiv.hasChildNodes()) {
        svgRccDiv.removeChild(svgRccDiv.firstChild);
      }

      drawRcc(d, "rccDiagram");
    },
    createRccData: function() {
      var data = {};
      var rccGroup = [];
      var rccCnt = getRandomInt(2, 5);
      for (var rccIdx = 0; rccIdx < rccCnt; rccIdx++) {
        var topCnt = getRandomInt(1, 3);
        var subCnt = getRandomInt(1, 3);
        var subNodeList = [];
        var topNodeList = [];

        var name = "name-" + rccIdx;
        for (var i = 0; i < subCnt; i++) {
          subNodeList.push({
            type: "sub-" + rccIdx + "-" + i + "-Gen",
            id: "sub-" + rccIdx + "-" + i,
            name: "sub-" + rccIdx + "-" + i,
            value: 0
          });
        }
        for (var i = 0; i < topCnt; i++) {
          topNodeList.push({
            type: "top-" + rccIdx + "-" + i + "-Rcc",
            id: "top-" + rccIdx + "-" + i,
            name: "top-" + rccIdx + "-" + i,
            value: 0
          });
        }

        rccGroup.push({
          name: name,
          subNode: subNodeList,
          topNode: topNodeList
        });
      }
      data = { rccGroup: rccGroup };
      return data;
    }
  },
  created() {},
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off("rcc-line-dlg");
  },
  mounted() {
    this.requestID = this.$parent.$data.reqID;

    this.rccNodeMap = new HashMap();
    this.$nuxt.$on("rcc-line-dlg", selectedIdx => {
      this.rccNodeMap.clear();
      this.rccNodeList = [];
      this.rccIdx = selectedIdx.substr(3, selectedIdx.length);
      var code;
      var _rccIdx;
      var data;
      var tempList = [];
      var checkList = [];
      var regNameList = regCodeJson[Number(this.rccIdx) - 1];
      var reg2List = [];
      regNameList.forEach(function(d) {
        reg2List.push(d.id);
      });
      for (var i = 0; i < locData.features.length; i++) {
        data = locData.features[i];
        code = data.properties.id;
        code = parseInt(code.toString().slice(0, 4) * 1000000);
        _rccIdx = data.properties.id.toString().slice(11, 13);
        // id = data.properties.id;
        // console.log('clicked code = ' + code);
        if (
          checkList.indexOf(code) == -1 &&
          Number(_rccIdx) === Number(this.rccIdx) &&
          data.properties.subnode.length > 0
        ) {
          checkList.push(code);
          this.rccNodeList.push(code);
        }
      }
      //console.log(this.rccNodeList.length);
    });
    drawRcc(this.rccData, "rccDiagram");
  }
};
</script>

<style>
.col-xs-12,
.main {
  margin: 0px;
  padding: 0px;
}

/* rcc context rccMenu*/

.rccMenu {
  border: 1px solid black;
  background-color: grey;
  display: none;
  position: relative;
}
.rccMenu,
.rccMenu li {
  padding: 0px;
  margin: 0px;
}
.rccMenu li {
  color: white;
}
.rccMenu > li:hover {
  background-color: lightblue;
  color: black;
}
.rccMenu li {
  display: none;
}

.rccMenu.svg li.svg,
.rccMenu.svg li.svg li,
.rccMenu.rect li.rect,
.rccMenu.circle li.circle li,
.rccMenu.circle li.circle {
  display: block;
}
/* Support sub rccMenu */
.rccMenu li ul {
  display: none;
}
.rccMenu li:hover ul {
  display: inline-block;
  position: relative;
  top: 0;
}
li.color {
  width: 30px;
  height: 20px;
}
li.color-1 {
  background-color: red;
}
li.color:hover {
  opacity: 0.5;
}
li.color-2 {
  background-color: green;
}

.selectbox label {
  width: 10rem;
}
</style>
