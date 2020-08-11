<template>

	<div id="body">
		<div class="logo"></div>
		<!-- <section id="content" class="container">
			<article id="detail_content"> -->
				<!-- 본문컨텐츠 영역 -->
				<div class="dashboard_wrap regionStatus">
					<div class="dashboard_box">
						<div class="conts">
							<div class="inquiry">
								<dl class="period">
								<dt>Site : </dt>
								<dd>
									<div class="selectbox">
										<!-- <label id="selectedLB" for="region_field">1</label>  -->
										<label  for="region_field">{{selectedItem}}</label>
                    
										<!-- <select name="region_field" id="region_field" class="info_select" 
													v-model="selectedItem" @change="changedValue"> -->
										<!-- <select name="region_field" id="region_field" class="info_select" >
                      <option v-for="option in options" :value="option.id" 
                          :key="option.id"  @selected="changedLabel">{{ option.label }}</option> 
										</select> -->
										<select name="region_field" id="region_field" class="info_select"
											v-model="selectedItem" @change="changedValue">
											<option v-for="option in options" :value="option.id" 
														:key="option.id" >{{ option.label }}</option> 
										</select>
									</div>
									<!-- <p class="btn_inguiry"><a  @click="changedValue(selectedItem)" >조회</a></p> -->
								</dd>
								</dl>

								<p class="btn_wrap">
									<!-- <button v-on="addRow()">Add</button> -->
									<!-- <a href="#" class="btn active"><i class="xi-check" aria-hidden="true"></i> 계통도</a>
									<a href="#" class="btn"><i class="xi-check" aria-hidden="true"></i> 개별 ESS</a> -->
								</p>
							</div>

							<div class="graphAreaWrap">
								<div class="graphArea">
									<!-- <ul class="markType">
									<li><span class="no1">DR</span></li>
									<li><span class="no2">Peak</span></li>
									<li><span class="no3">요금</span></li>
									<li><span class="no4">PQ</span></li>
									<li><span class="no5">이벤트</span></li>
									<li><span class="no6">비상</span></li>
                  </ul> -->
									<div id="regionSvgWrap" style="width:100%;height:100%;" > 										
										<!-- 지도영역 -->			
										<!-- <svg-img :rccName=selectedItem>	</svg-img>																 -->
									</div>		 		
 
								</div>
								<div class="infoSection">
									<div class="reaction_wrap">
										<strong>{{$t('regionStatus.quality_service')}}</strong>
										<div class="reaction regionStatusWrap">
											<table id="qau-info-tbl" class="regionStatusTable center">
												<caption>서비스명,지역명,용량,동작,비고로 나뉘어 설명</caption>
												<colgroup>
													<col /><col span="4" />
												</colgroup>
												<thead>
												<!-- <tr>
													<th scope="col">서비스명</th><th scope="col">지역명</th><th scope="col">용량</th><th scope="col">동작</th><th scope="col">비고</th>
												</tr>	
												</thead>
												<tbody>
												<tr>
													<td scope="row"></td><td> </td> <td>-</td> <td>-</td>
													<td></td>
												</tr> -->
												<tr>
													<th scope="col">{{$t('regionStatus.service_name')}}</th>	
													<th scope="col" >{{$t('regionStatus.area_name')}}</th>	
													<th scope="col">{{$t('regionStatus.capacity')}}</th>
													<th scope="col">{{$t('regionStatus.operation')}}</th>	
													<th scope="col">{{$t('regionStatus.remarks')}}</th>
												</tr>	
												</thead>
												<tbody>
												<tr>
													<td scope="row">{{$t('regionStatus.frequency ')}}</td>	
													<td>종로구</td> 
													<td>2MW</td> 
													<td>{{$t('regionStatus.run ')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												<tr>
													<td scope="row">{{$t('regionStatus.frequency ')}}</td> 
													<td>마포구</td>	
													<td>4MW</td>	
													<td>{{$t('regionStatus.run ')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												<tr>
													<td scope="row">{{$t('regionStatus.frequency ')}}</td>	
													<td>용산구</td>
													<td>4MW</td>	
													<td>{{$t('regionStatus.run ')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												<tr>
													<td scope="row">{{$t('regionStatus.frequency ')}}</td>	
													<td>마포구</td>	
													<td>2MW</td>	
													<td>{{$t('regionStatus.stop ')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="eventDetail_wrap">
										<strong>{{$t('regionStatus.quality_event_status ')}}</strong>
											<div class="eventDetail regionStatusWrap">
												<table id="qau-evt-tbl" class="regionStatusTable center">
													<caption>이벤트지역,이벤트서버,이벤트명,발생시간,조치상태로 나뉘어 설명</caption>
													<colgroup>
														<col /><col span="4" />
													</colgroup>
													<thead>
													<!-- <tr>
														<th scope="col">지역</th> <th scope="col">H/W</th> <th scope="col">발생시간</th> <th scope="col">조치상태</th> <th scope="col">비고</th>
													</tr>	 -->
														<tr>
															<th scope="col">{{$t('regionStatus.area ')}}</th>
															<th scope="col">H/W</th>	
															<th scope="col">{{$t('regionStatus.time_of_occurrence ')}}</th>
															<th scope="col" >{{$t('regionStatus.action_state ')}}</th>
															<th scope="col">{{$t('regionStatus.remarks ')}}</th>
													</tr>	
													</thead>
													<tbody>
													<tr>
														<td scope="row">마포구</td>
														<td>BAT</td>	
														<td>05:00</td>	
														<td>{{$t('regionStatus.action_no ')}}</td>	
														<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
														</tr>
													<tr>
														<td scope="row">용산구</td>	
														<td>PCS</td> 
														<td>10:00</td> 
														<td>{{$t('regionStatus.action_no')}}</td>
														<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
													</tr>
													</tbody>
												<!-- <tr>
														<td scope="row"></td><td> </td> <td>-</td> <td>-</td>
														<td></td>
													</tr>
														</tbody> -->
												</table>
											</div>
									</div>
								</div>
								<div class="infoSection">
									<div class="reaction_wrap">
										<strong>{{$t('regionStatus.price_service ')}}</strong>
										<div class="reaction regionStatusWrap">
											<table id="fee-info-tbl" class="regionStatusTable center">
												<caption>서비스명,지역명,용량,동작,비고로 나뉘어 설명</caption>
												<colgroup>
													<col /><col span="4" />
												</colgroup>
												<thead>
												<tr>
													<th scope="col">{{$t('regionStatus.service_name ')}}</th>	
													<th scope="col">{{$t('regionStatus.area_name ')}}</th>	
													<th scope="col">{{$t('regionStatus.capacity ')}}</th>	
													<th scope="col">{{$t('regionStatus.operation ')}}</th>	
													<th scope="col">{{$t('regionStatus.remarks')}}</th>
												</tr>	
												</thead>
												<tbody>
												<tr>
													<td scope="row">{{$t('regionStatus.scheduling ')}}</td>	
													<td>용두동</td> 
													<td>1MW</td> 
													<td>{{$t('regionStatus.run')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												<tr>
													<td scope="row">Peck-Cut</td> 
													<td>종암동</td>	
													<td>2MW</td>	
													<td>{{$t('regionStatus.run')}}</td>
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												<tr>
													<td scope="row">{{$t('regionStatus.scheduling ')}}</td>	
													<td>역삼동</td>
													<td>0.5MW</td>	
													<td>{{$t('regionStatus.run')}}</td>
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												<tr>
													<td scope="row">Peck-Cut</td>
													<td>화양동</td>
													<td>1MW</td>	
													<td>{{$t('regionStatus.standby')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
													</tr>
												<tr>
													<td scope="row">{{$t('regionStatus. scheduling')}}</td>
													<td>월계동</td> 
													<td>1MW</td> 
													<td>{{$t('regionStatus.stop')}}</td>	
													<td><button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
												</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="eventDetail_wrap blink">
										<strong>{{$t('regionStatus.price_event_status')}}</strong>
											<div class="eventDetail regionStatusWrap">
												<table id="fee-evt-tbl" class="regionStatusTable center">
													<caption>이벤트지역,이벤트서버,이벤트명,발생시간,조치상태로 나뉘어 설명</caption>
													<colgroup>
														<col /><col span="4" />
													</colgroup>
													<thead>
													<tr>
														<th scope="col">{{$t('regionStatus.area ')}}</th> 
														<th scope="col">H/W</th> 
														<th scope="col">{{$t('regionStatus.time_of_occurrence ')}}</th> 
														<th scope="col">{{$t('regionStatus.action_state ')}}</th> 
														<th scope="col">{{$t('regionStatus.remarks ')}}</th>
													</tr>	
													</thead>
													<tbody>
													<tr>
														<td scope="row">월계동</td>	
														<td>PCS</td> 
														<td>16:00</td> 
														<td>{{$t('regionStatus.action_no ')}}</td> 
														<td> <button class="detailBtn" @click="showLine()" >{{$t('regionStatus.detail ')}}</button></td>
													</tr>
													<tr>
														<!-- <td scope="row"></td><td>BAT</td> <td></td> <td></td> <td></td> -->
													</tr>
													<tr>
														<!-- <td scope="row"></td>		<td>PV</td><td></td> <td></td> <td></td> -->
													</tr>
													<tr>
														<!-- <td scope="row"></td>	<td>&nbsp;</td><td></td> <td></td>	<td></td> -->
													</tr>
													</tbody>
												</table>
											</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- //본문컨텐츠 영역 -->
			<!-- </article>
		</section> -->
	</div>
	

</template>
<script>  

	import svgImg from '~/components/svgImg.vue'

  export default {
    layout: "regionStatus",
    props : {
      // myValue : {type:String}
    },
    components: { 
			svgImg
    }, 
    head :{
      link:[
			 	{  rel: "stylesheet", href: "/css/regionStatus.css" } ,
			],
      script:[
				
				{src : "/scripts/jquery/core/perfect-scrollbar.js"}, 
				// {src : "/scripts/jqGrid/grid.locale-en.js" },
        // {src : "/scripts/jqGrid/jquery.jqGrid.min.js"}				
			]
    },
    data(){
      return{
        selectedItem : null,
        options :[
          {id:'rcc1', label:'서울'},{id:'rcc2', label:'남서울'},{id:'rcc3', label:'인천'},
          {id:'rcc4', label:'경기'},{id:'rcc5', label:'경기북부'},{id:'rcc6', label:'강원'},
          {id:'rcc7', label:'대전충남'},{id:'rcc8', label:'충북'},{id:'rcc9', label:'광주전남'},
          {id:'rcc10', label:'전북'},{id:'rcc11', label:'대구'},{id:'rcc12', label:'부산울산'},
          {id:'rcc13', label:'경남'},{id:'rcc14', label:'경북'}
				],
				timer:null,
      }
    }, 
    methods : {
		changeSVG : function(selectedItem){
			//console.log(selectedItem+'11111111111111111') 
		},
		changedValue: function(evt, value) { 			
			var svgDiv = document.getElementById("regionSvgWrap"); 
			while ( svgDiv.hasChildNodes() ) 
			{ 
				svgDiv.removeChild( svgDiv.firstChild );					
			}
			var rccName = evt.target.value;
			this.selectedItem = rccName;

			this.options.forEach((v, i) =>{
				if(v.id === rccName){
					this.selectedItem = v.label;
				}
			})
			var rccIdx = Number(rccName.substring(rccName.length,3));
			//console.log('selected rcc idx = ' + rccIdx);
			
			var svgFilePath = "/scripts/regionStatus/" + rccIdx + ".svg";
			this.loadRegionSVG("#regionSvgWrap", svgFilePath);

			clearTimeout(this.timer); 
			this.timer = setTimeout(() =>{
				if(document.getElementById('1135000000') != null){
					document.getElementById("1135000000").classList.add("blink");
				} 
			},1000) 	
		}, 
		showLine(){
			location.href = "/lineDiagram?id=1135000000";
		},
		loadRegionSVG : function(selector, url){
			var target = document.querySelector(selector); 
			// If SVG is supported
			if (typeof SVGRect != "undefined") {
				// Request the SVG file
				var ajax = new XMLHttpRequest();
				ajax.open("GET", url, true);
				ajax.send();

				// Append the SVG to the target
				ajax.onload = function(e) {
					target.innerHTML = ajax.responseText;
					// target.children[0].setAttribute('height','1.45rem')
					// target.children[0].setAttribute('width','1.45rem')
				}
			} else {
				// Fallback to png
				target.innerHTML = "<img src='" + url + ".png' />";
			}
		}
    },
	middleware : 'authenticated',
    mounted() 
    {
		$('.th1').removeClass('active');
		$('#gnav-region').addClass('active');
		
		new PerfectScrollbar('.eventDetail #qau-evt-tbl');
		// new PerfectScrollbar('.reaction #qau-info-tbl');
		new PerfectScrollbar('.reaction .regionStatusTable');
		new PerfectScrollbar('.reaction #fee-info-tbl');
		new PerfectScrollbar('.eventDetail #fee-evt-tbl');
		// new PerfectScrollbar('.eventDetail #qau-evt-tbl ');
		// new PerfectScrollbar('.reaction #fee-info-tbl');
		this.selectedItem = "서울";
		this.loadRegionSVG('#regionSvgWrap','/scripts/regionStatus/1.svg');
		//console.log('');
		
		clearTimeout(this.timer);
		this.timer = setTimeout(() =>{
			if(document.getElementById('1135000000') != null){
				document.getElementById("1135000000").classList.add("blink");
			}
				
		},1000)
    },
  } 
	//셀렉트박스 디자인
// function selectDesign(){
// 	var select = $("select.info_select"); 
// 	select.on('change', function() { 
// 		var select_name = $(this).children('option:selected').text();
// 		$(this).siblings('label').text(select_name);
// 	}).trigger('change');
// }
  

</script>

<style>

@keyframes blink-animation {
    from {fill: red;}
    to {fill: yellow;}
}
object{
	width: 56rem;
	height : 50rem;
}
g#Map{
	transform:scaleX(.75);
}
.blink {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}

 .mapSize{
    transform:scale(1.6);   
  　-webkit-transform:scale(1.6);
  　-moz-transform : scale(1.6);
  　-ms-transform : scale(1.6);
  　-o-transform : scale(1.6);
 }
 .mapImgLoc{
   transform:translateY(10%);
   /* top : 50%; */
 }
 .map {
         stroke:            black;
         stroke-width:      2;
         fill:              #E1DDD7;
}
.boundary {
         stroke-linejoin:   round;
         stroke-linecap:    round;
         stroke:            black;
         stroke-width:      1;
         fill:              #F1fffe;
}

.regionStatusWrap{padding:0.75em 1.875rem 1em 1.875rem; border-radius:.25rem;background:#0e192a;}
.regionStatusWrap .regionStatusTable{width:100%;}
.regionStatusWrap .regionStatusTable thead th{padding:.25rem 0;border-bottom:2px solid #394554;font-size:0.875rem;line-height:1.75rem;color:#fff; }
.regionStatusWrap .regionStatusTable tbody td{padding:.25rem 0;border-bottom:1px solid #394554;text-align:center;font-size:0.875rem;line-height:1.75rem;color:#bdc2cb; }
/* .graphArea_wrap > .infoSection{	height: 95%; width:32rem;margin:1.1rem;position: relative;float: left;margin:0 3rem 0 0;}
.detailBtn{background-color: #4CAF50;  border: none; color: white; padding: 0.2rem 0.4rem; text-align: center; text-decoration: none; display: inline-block;border-radius : 12px;} */



</style>
