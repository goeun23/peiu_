<template>
  <div class="lineDiagramMain">
    <div class="logo"></div>
    <div class="dashboard_wrap Circuit">
        <div class="dashboard_box">
          <!-- <line-component-rcc/> -->
          <div class="conts">
            <div class="inquiry">
              <dl class="period">
                <dt>Site : </dt>
                <dd>
                  <div class="selectbox"> 
                    <select name="region_field" id="region_field" 
                    class="info_select"  v-model="selectedItem" @change="changedValue()">
                          <option value="1">서울</option>
                          <option value="2">남서울</option>
                          <option value="3">인천</option>
                          <option value="4">경기</option>
                          <option value="5">경기북부</option>
                          <option value="6">강원</option>
                          <option value="7">대전충남</option>
                          <option value="8">충북</option>
                          <option value="9">광주전남</option>
                          <option value="10">전북</option>
                          <option value="11">대구</option>
                          <option value="12">부산울산</option>
                          <option value="13">경남</option>
                          <option value="14">경북</option> 
                    </select>
                  </div>
                  <!-- <p class="btn_inguiry"><a  @click="changedValue(selectedItem)" >조회</a></p> -->
                </dd>
              </dl>
            </div>
            <div id='rccDiagram' class='mylineDiv'></div>
          </div>
          <!-- SCC Wrap -->
          <div class="conts">
            <div class="inquiry">
              <div class="btn_wrap" v-for="sccAreaName in sccAreaNameList " v-bind:key="sccAreaName.idx">
                <a href="#"   class="btn" 
                  v-bind:id='sccAreaName.id'
                  :data-lawCode="sccAreaName.lawCode"
                  @click="clickAreaBtn(sccAreaName.id ,sccAreaName.lawCode)">{{sccAreaName.name}}</a>
              </div> 
            </div>
            <!-- <div class="graphArea_wrap">
              <div class="graphArea">
              </div>
            </div> -->
            <div id='sccDiagram' class='mylineDiv'></div>
            <div id="sccContext-sccMenu" class="rccMenu">
              <span id="clicked-Rcc-Id"></span>
              <!-- <hr> -->
              <div id="sccContext-sccMenu-subMenu">
                <!-- 클릭 이벤트 발생시 클릭 이벤트 하는 테그 자동 추가 -->
              </div>
            </div>
          </div>
          <!-- <line-component-scc/> -->
        </div>
     </div>
  </div>
</template>
<script>
// import lineComponentRcc from '~/components/lineComponentRcc.vue' 
// import lineComponentScc from '~/components/lineComponentScc.vue'

  export default {
    layout: "lineDiagram",

    components: {
      // lineComponentRcc ,lineComponentScc
    },
    head: {
      link: [ 
        // { rel : "stylesheet", href  : "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.0/jquery.contextMenu.min.cs" },
        {  rel: "stylesheet", href: "/css/line.css" } 
      ],
      script: [ 
        {src : 'https://d3js.org/d3.v4.min.js'},
        {src : 'https://d3js.org/d3-selection-multi.v1.min.js'},
        {src : '/scripts/line/common.js'}, 
        { src : '/scripts/line/rccLine2.js'}, 
         {src : '/scripts/line/sccLine.js'}
      ]
    },
    data(){
      return {
        selectedItem : "1",
        reqID : 1,
      //  rccData:{"rccGroup":[{"name":"A","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"1","type":"rcc","name":"청송-포스코"}]},{"name":"B","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]},{"name":"C","subNode":[{"type":"Load","id":"Load-1"},{"type":"Gen","id":"Gen-1"}],"topNode":[{"id":"2","type":"rcc","name":"신영주-청송"},{"id":"3","type":"rcc","name":"신영주-대구"}]}]},
        rccData:{"rccGroup":[{"name":"A","subNode":[{"type":"대전충남Gen","id":"4413000000","value":0,"name":"천안"},{"type":"대전충남Gen","id":"4421000000","value":0,"name":"서산"}],"topNode":[{"id":"4155000000","type":"경기도RCC","name":"천안-안성","value":0}]},{"name":"B","subNode":[{"type":"대전충남Gen","id":"4427000000","value":0,"name":"당진"},{"type":"대전충남Gen","id":"4425000000","value":0,"name":"계룡"}],"topNode":[{"id":"4513000000","type":"전라북도RCC","name":"계룡-군산","value":0}]},{"name":"C","subNode":[{"type":"대전충남Gen","id":"4418000000","value":0,"name":"보령"},{"type":"대전충남Gen","id":"3020000000","value":0,"name":"유성"},{"type":"대전충남Gen","id":"2717000000","value":0,"name":"서구"}],"topNode":[{"id":"4311000000","type":"충청북도RCC","name":"유성-청주","value":0}]},{"name":"D","subNode":[{"type":"대전충남Gen","id":"2714000000","value":0,"name":"동구"},{"type":"대전충남Gen","id":"4479000000","value":0,"name":"청양"}],"topNode":[{"id":"4373000000","type":"충청북도RCC","name":"동구-옥천","value":0}]},{"name":"E","subNode":[{"type":"대전충남Gen","id":"4420000000","value":0,"name":"아산"},{"type":"대전충남Gen","id":"2711000000","value":0,"name":"중구"},{"type":"대전충남Gen","id":"3023000000","value":0,"name":"대덕구"}],"topNode":[{"id":"4719000000","type":"경상북도RCC","name":"중구-구미","value":0}]}]},
        // rccData : {"rccGroup":[{"name":"name-0","subNode":[{"type":"sub-0-0-Gen","id":"sub-0-0","name":"sub-0-0","value":0},{"type":"sub-0-1-Gen","id":"sub-0-1","name":"sub-0-1","value":0}],"topNode":[{"type":"top-0-0-Rcc","id":"top-0-0","name":"top-0-0","value":0},{"type":"top-0-1-Rcc","id":"top-0-1","name":"top-0-1","value":0}]},{"name":"name-1","subNode":[{"type":"sub-1-0-Gen","id":"sub-1-0","name":"sub-1-0","value":0},{"type":"sub-1-1-Gen","id":"sub-1-1","name":"sub-1-1","value":0}],"topNode":[{"type":"top-1-0-Rcc","id":"top-1-0","name":"top-1-0","value":0}]}]},
         
        sccData : null, 
        sccAreaNameList : [],
        requesetedRcc : '',
        requestedDeviceId : '', 
        url_account_list : process.env.url_account_list,
        url_meter_data : process.env.url_meter_data,
        sccGroup : '',
      }        
    },
    methods: { 
      initAreaBtn : function(){
        var list = document.querySelectorAll('.conts .inquiry .btn_wrap a');
        if(list.length > 0)
        {
          list.forEach((v, i) =>{
            v.classList.remove('active');
          })

          // list = d3.select("#sccDiagram").selectAll('[data-lawCode]').nodes();
          // list.forEach((v, i) =>{
          //   v.classList.remove('blink');
          // });

          list = d3.select('#sccDiagram').selectAll('[data-groupLawCode]').nodes();
          list.forEach((v, i) =>{
             v.classList.remove('blind');
          })

        };
      },
      clickAreaBtn : function(btnId, lawCode){
        var code = lawCode;
        //버튼 
        if(lawCode !='' && lawCode != undefined)
        {
          this.initAreaBtn();
          
          document.getElementById(btnId).classList.add('active');
          var list = d3.select('#sccDiagram').selectAll('[data-lawCode]').nodes();
          // list.forEach((v,i) =>{
          //   if(v.getAttribute('data-lawCode') == code){
          //     v.classList.add('blink');
          //   }
          // });
          
          list = d3.select('#sccDiagram').selectAll('[data-groupLawCode]').nodes();
          list.forEach((v, i) =>{
            if(v.getAttribute('data-groupLawCode') != code){
                v.classList.add('blind');
            }
          });
          
          sccSvg.selectAll('path#sccAniLine').remove();

           var tmp = [];
           var group = this.sccGroup.sccGroup[0];
            group.cbList.forEach((data) =>{
              data.poleList.forEach((data2)=>{
                tmp.push(data2.poleID);
              })
            })
            
          getMeterData(tmp);
        }
      },
      changedValue: function(value) {  
        // var idx = value.currentTarget.value; 
         
        // var d = this.createRccData();  
        // var svgRccDiv = document.getElementById("rccDiagram"); 
        // while ( svgRccDiv.hasChildNodes() ) 
        // { 
        //   svgRccDiv.removeChild( svgRccDiv.firstChild );
        // }
        // drawRcc(d, 'rccDiagram');
        
        // this.setSccNameList("_"+idx.split("rcc")[1]);
        // this.createSccData();
        this.initAreaBtn();
        this.requesetedRcc = this.selectedItem;
        this.getUserData();
      },
      createRccData : function()
      {
        var data = {};
        var rccGroup = [];
        var rccCnt = getRandomInt(2, 5);
        for(var rccIdx = 0 ; rccIdx < rccCnt; rccIdx++){
          var topCnt = getRandomInt(1, 3);
          var subCnt = getRandomInt(1, 3);
          var subNodeList = [];
          var topNodeList = [];

          var name = 'name-'+rccIdx;
          for(var i=0; i  <subCnt; i++){
            subNodeList.push(
              {
                type : 'sub-'+rccIdx+'-'+i+'-Gen',
                id : 'sub-'+rccIdx+'-'+i,
                name : 'sub-'+rccIdx+'-'+i,
                value : 0
              }
            )
          }
          for(var i=0; i < topCnt; i++){
            topNodeList.push(
              {
                type : 'top-'+rccIdx+'-'+i+'-Rcc',
                id : 'top-'+rccIdx+'-'+i,
                name : 'top-'+rccIdx+'-'+i,
                value : 0
              }
            )
          }

          rccGroup.push({
            name :name,
            subNode : subNodeList,
            topNode : topNodeList
          })
        }
        data = {rccGroup : rccGroup};
        return data;
      },
      loadSCCJson : function(code, eleId)
      {
          $('.btn').removeClass("active");
          $('#'+eleId).addClass("active");

          var path = "/sccJson/"+code+".json";
          // console.log(path);
          $.getJSON(path, function(data){
            // console.log('success, ' + data)
          }).done(function(data){
            // console.log(data);
            drawScc(data, 'sccDiagram');
          })
          .fail(function(data){
            alert('error,' + data )
          })
          .always(function(data){
            // console.log('always, '+data);
          })
      },
      setSccNameList : function(requestedID)
      {
          this.sccAreaNameList = [];
          console.log(requestedID);
          if(requestedID !== undefined){
            var areaCode = requestedID.split('_')[1];
            areaCode = areaCode.substring(0, 2);
            areaCode = Number(areaCode) -1;
            regCodeJson[areaCode].forEach((v, i) =>{
              // console.log(v);
              this.sccAreaNameList.push({idx : i, name : v.addr});
            });
          }else{
            regCodeJson[0].forEach((v, i) =>{
              // console.log(v);
              this.sccAreaNameList.push({idx : i, name : v.addr});
            });
          } 
      },
      setSccNameList2 : function(list, rcc)
      {
          this.sccAreaNameList = [];
          var lawCode;
          var DeviceId;
          list.forEach((v, i) =>{
             // console.log('lawCode = ' + lawCode);
            lawCode = v.lawCode;
            DeviceId = v.DeviceId;
            var areaCode = lawCode ;
            regCodeJson[rcc-1].forEach((v, i) =>{
              // console.log(v.id);
               
              if(v.id.toString().substring(0, 4) == lawCode)
              {
                this.sccAreaNameList.checkPush(
                  {
                    idx : i, 
                    name : v.addr, 
                    lawCode : lawCode, 
                    DeviceId : DeviceId, 
                    id : 'areaBtn-'+i
                  });
              }              
            });            
          })
      },
      loadRandomSCCData: function()
      {
        var svgSccDiv = document.getElementById("sccDiagram"); 
        while ( svgSccDiv.hasChildNodes() ) 
        { 
          svgSccDiv.removeChild( svgSccDiv.firstChild );
        }

        var sccData = this.createSccData();
        drawScc(sccData, 'sccDiagram');
      },
      createSccData : function()
      {
        var cbCnt = 4; 
        var cbList = [];
        
        for(var cbIdx = 0; cbIdx < cbCnt; cbIdx++){
          var poleCnt = getRandomInt(1,9);
          var poleList = [];
          for(var poleIdx=0; poleIdx < poleCnt; poleIdx++){
            var randomRes = getRandomInt(0,2);
            poleList.push({
              poleID : "pole-"+cbIdx+"-"+poleIdx,
              Name : ["pole-"+cbIdx+"-"+poleIdx],
              dr : (randomRes == 0) ? "ess" : "dr",
            });

          }
          cbList.push(
            {
              cbID : 'cb-' + cbIdx,
              isOpen : false,
              poleList : poleList
            }
          ); 
        }

        var sccGroup = {sccGroup : [
          {
            id : 'cb-'+cbCnt,
            cbList : cbList
        }]};
        // sccGroup.push(cbList);
        // console.log(JSON.stringify(sccGroup));
        return sccGroup;
      },
      getUserData : function()
      {
         var url = this.url_account_list;

         $.ajax({
           url : url,
           contentType:'application/json',
           type:'get',
           success : this.recvUserData,
           error : function(jqXHR, textStatus, errorThrown){
             console.log('getUserData error');
             console.log(jqXHR);
             alert('사용자 정보 수신실패(통신에러)');
           }
         })
       },
       recvUserData : function(data, textStatus, jqXHR){
         if(textStatus == 'success'){
          var devicedList = [];
          var d =[];
          var lawCode;
          for(var i=0; i < data.length; i++){
            var v = data[i];
            if(v.Rcc == this.selectedItem){
              
              lawCode = v.LawLevel1 + v.LawLevel2;
              var temp = {DeviceId : v.DeviceId, DLNo : v.DLNo, Rcc : v.Rcc, lawCode : lawCode};
              d.push(temp);
            }
          } 

          console.log(JSON.stringify(d)); 
          this.setSccNameList2(d, this.selectedItem);

          var cbList = new Array(4);
          var poleList = new Array(4);
          poleList[0] = [];
          poleList[1] = [];
          poleList[2] = [];
          poleList[3] = [];

          d.forEach((v, i) =>{
            
            if(v.DeviceId != undefined)
            {
              var node  = v.DeviceId.substring(0, 2);
              if(v.DLNo == 1){
                poleList[0].push({poleID : v.DeviceId, Name : ['rcc-'+v.Rcc+"-" + v.DeviceId], dr : node, lawCode : v.lawCode});
              }else if(v.DLNo == 2){
                poleList[1].push({poleID : v.DeviceId, Name : ['rcc-'+v.Rcc+"-" + v.DeviceId], dr : node, lawCode : v.lawCode});
              }else if(v.DLNo == 3){
                poleList[2].push({poleID : v.DeviceId, Name : ['rcc-'+v.Rcc+"-" + v.DeviceId], dr : node, lawCode : v.lawCode});
              }else if(v.DLNo == 4){
                poleList[3].push({poleID : v.DeviceId, Name : ['rcc-'+v.Rcc+"-" + v.DeviceId], dr : node, lawCode : v.lawCode});
              }
              devicedList.push(v.DeviceId);
            }
            
          });

          cbList[0] = {cbID : 'cb1', isOpen : false, poleList : poleList[0] }; 
          cbList[1] = {cbID : 'cb2', isOpen : false, poleList : poleList[1] }; 
          cbList[2] = {cbID : 'cb3', isOpen : false, poleList : poleList[2] }; 
          cbList[3] = {cbID : 'cb4', isOpen : false, poleList : poleList[3] }; 
          
           this.sccGroup = {
              sccGroup : [
                {
                  id : "-",
                  cbList : cbList
                } 
              ]
            }
          

          console.log(JSON.stringify(this.sccGroup));
          setURL(this.url_meter_data);//SCC 실시간 데이터를 가져오기 위해 URL 설정
          drawScc(this.sccGroup, 'sccDiagram');


         }else{
           alert('사용자 정보 수신실패');
         }
       }
    },    
	  middleware : 'authenticated',
    mounted() 
    {     
      this.selectedItem = $nuxt.$route.query.rcc;
      
      if(this.selectedItem == undefined || this.selectedItem == ''){
      
        this.selectedItem = '1';
      } 
 
      $('.th1').removeClass('active');
      $('#gnav-lineDiagram').addClass('active');
      
      drawRcc(this.rccData, 'rccDiagram');
      // this.loadSCCJson("4425010100", "btn7");

      // this.setSccNameList(this.reqID);
      this.getUserData();
    }
  } 
</script>

<style>
 
 .selectbox label{ 
   width: 20rem;
 }
 .lineDiagramMain{
   position: relative;
 }
 .svgLineDlg{
   background : black;
 }

.path{
  stroke-dasharray: 100;
}
.selectbox select.info_select{opacity: 1!important;}



/* css blink */

.blink{-webkit-animation:blink .75s linear infinite;-moz-animation:blink .75s linear infinite;-ms-animation:blink .75s linear infinite;-o-animation:blink .75s linear infinite;animation:blink .75s linear infinite}
@-webkit-keyframes blink{0%,50%{opacity:1}100%,50.01%{opacity:0.3}}
@-moz-keyframes blink{0%,50%{opacity:1}100%,50.01%{opacity:0.3}}
@-ms-keyframes blink{0%,50%{opacity:1}100%,50.01%{opacity:0.3}}
@-o-keyframes blink{0%,50%{opacity:1}100%,50.01%{opacity:0.3}}
@keyframes blink{0%,50%{opacity:1}100%,50.01%{opacity:0.3}}
.blind{display:none;}
</style>
