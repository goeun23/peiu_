<template>

	<div id="body">
		<!-- <section id="content" class="container">
			<article id="detail_content"> -->
				<!-- 본문컨텐츠 영역 -->
				
    <div class="logo"></div>
				<div class="dashboard_wrap localSite">
					<div class="dashboard_box">
						<div class="conts">
							

							<div class="graphArea_wrap">
								<div class="graphArea">
									<!-- <ul class="markType">
									<li><span class="no1">전체 자동</span></li>
									<li><span class="no2">전체 수동</span></li>
                  </ul> -->
									<div class="markType">
										<fieldset class="field">
												<legend class="regionLgend">전체모드</legend>
												<input type="radio" id="rcc0A" name="rcc0" value="all" checked>
												<label for="rcc0A">전체 자동</label>
													<input type="radio" id="rcc0M" name="rcc0" value="all">
												<label for="rcc0M">전체 수동</label>
										</fieldset>
									</div>
									<div style="width:100%;height:100%;" class="koreaMap" > 
										 <!-- <div id="svgObj" style="width:100%;height:100%;">s</div> -->
										<!-- 지도영역 -->			
										<!-- <svg-img :rccName=selectedItem>	</svg-img>						 -->
										<!-- <img src="/images/region/rcc7.svg" alt="Breaking Borders Logo" height="100%" width="100%" v-if="selectedItem=='대전충남'">	지도영역										 -->
										<!-- <img src="/images/region/rcc5.svg" alt="Breaking Borders Logo" height="100%" width="100%" v-else>	 -->
										<!-- <object type="image/svg+xml" data="/images/map/Korea2.svg" ></object> -->
										<div class="btnDiv1 btnDiv"> 
												<!-- <button id="rcc1A" class="btn" @click="onAuto([1])"> 자동</button>
												<button id="rcc1M" class="btn" @click="onManual([1])">수동</button> -->
													<fieldset class="field">
														<legend class="regionLgend"> 서울</legend>
														<input type="radio" id="rcc1A" name="rcc1" value="all" checked>
														<label for="rcc1A">자동</label>
															<input type="radio" id="rcc1M" name="rcc1" value="all">
														<label for="rcc1M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv2 btnDiv">
												<!-- <button id="rcc2A" class="btn" @click="onAuto([2])">자동</button>
												<button id="rcc2M" class="btn" @click="onManual([2])">수동</button> -->
												<fieldset class="field">
														<legend class="regionLgend">남서울</legend>
														<input type="radio" id="rcc2A" name="rcc2" value="all" checked>
														<label for="rcc2A">자동</label>
															<input type="radio" id="rcc2M" name="rcc2" value="all">
														<label for="rcc2M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv3 btnDiv">
												<!-- <button id="rcc3A" class="btn" @click="onAuto([3])">자동</button>
												<button id="rcc3M" class="btn"  @click="onManual([3])">수동</button> -->
												<fieldset class="field">
													<legend class="regionLgend">인천</legend>
														<input type="radio" id="rcc3A" name="rcc3" value="all" checked>
														<label for="rcc3A">자동</label>
															<input type="radio" id="rcc3M" name="rcc3" value="all">
														<label for="rcc3M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv4 btnDiv">
												<!-- <button id="rcc4A" class="btn" @click="onAuto([4])">자동</button>
												<button id="rcc4M" class="btn" @click="onManual([4])">수동</button> -->
												<fieldset class="field">
														<legend class="regionLgend">경기</legend>
														<input type="radio" id="rcc4A" name="rcc4" value="all" checked>
														<label for="rcc4A">자동</label>
															<input type="radio" id="rcc4M" name="rcc4" value="all">
														<label for="rcc4M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv5 btnDiv">
												<!-- <button id="rcc5A" class="btn" @click="onAuto([5])">자동</button>
												<button id="rcc5M" class="btn" @click="onManual([5])">수동</button> -->
												<fieldset class="field">
													<legend class="regionLgend">경기북부</legend>
														<input type="radio" id="rcc5A" name="rcc5" value="all" checked>
														<label for="rcc5A">자동</label>
															<input type="radio" id="rcc5M" name="rcc5" value="all">
														<label for="rcc5M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv6 btnDiv">
												<!-- <button id="rcc6A" class="btn" @click="onAuto([6])">자동</button>
												<button id="rcc6M" class="btn" @click="onManual([6])">수동</button> -->
												<fieldset class="field">
													<legend class="regionLgend">강원</legend>
														<input type="radio" id="rcc6A" name="rcc6" value="all" checked>
														<label for="rcc6A">자동</label>
															<input type="radio" id="rcc6M" name="rcc6" value="all">
														<label for="rcc6M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv7 btnDiv">
												<!-- <button id="rcc7A" class="btn" @click="onAuto([7])">자동</button>
												<button id="rcc7M" class="btn" @click="onManual([7])">수동</button> -->
												<fieldset class="field">
													<legend class="regionLgend">충남</legend>
														<input type="radio" id="rcc7A" name="rcc7" value="all" checked>
														<label for="rcc7A">자동</label>
															<input type="radio" id="rcc7M" name="rcc7" value="all">
														<label for="rcc7M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv8 btnDiv">
												<!-- <button id="rcc8A" class="btn" @click="onAuto([8])">자동</button>
												<button id="rcc8M" class="btn" @click="onManual([8])">수동</button> -->
												<fieldset class="field">
														<legend class="regionLgend">충북</legend>
														<input type="radio" id="rcc8A" name="rcc8" value="all" checked>
														<label for="rcc8A">자동</label>
															<input type="radio" id="rcc8M" name="rcc8" value="all">
														<label for="rcc8M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv9 btnDiv">
												<!-- <button id="rcc9A" class="btn" @click="onAuto([9])">자동</button>
												<button id="rcc9M" class="btn" @click="onManual([9])">수동</button> -->
												<fieldset class="field">
														<legend class="regionLgend">광주/전남</legend>
														<input type="radio" id="rcc9A" name="rcc9" value="all" checked>
														<label for="rcc9A">자동</label>
															<input type="radio" id="rcc9M" name="rcc9" value="all">
														<label for="rcc9M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv10 btnDiv">
												<!-- <button id="rcc10A" class="btn" @click="onAuto([10])">자동</button>
												<button id="rcc10M" class="btn" @click="onManual([10])">수동</button> -->
												<fieldset class="field">
														<legend class="regionLgend">전북</legend>
														<input type="radio" id="rcc10A" name="rcc10" value="all" checked>
														<label for="rcc10A">자동</label>
															<input type="radio" id="rcc10M" name="rcc10" value="all">
														<label for="rcc10M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv11 btnDiv">
												<!-- <button id="rcc11A" class="btn"  @click="onAuto([11])">자동</button>
												<button id="rcc11M" class="btn"  @click="onAuto([11])">수동</button> -->
												<fieldset class="field">
														<legend class="regionLgend">대구</legend>
														<input type="radio" id="rcc11A" name="rcc11" value="all" checked>
														<label for="rcc11A">자동</label>
															<input type="radio" id="rcc11M" name="rcc11" value="all">
														<label for="rcc11M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv12 btnDiv">
												<!-- <button id="rcc12A" class="btn"  @click="onAuto([12])">자동</button>
												<button id="rcc12M" class="btn"  @click="onAuto([12])">수동</button> -->
												<fieldset class="field">
															<legend class="regionLgend">부산/울산</legend>
														<input type="radio" id="rcc12A" name="rcc12" value="all" checked>
														<label for="rcc12A">자동</label>
															<input type="radio" id="rcc12M" name="rcc12" value="all">
														<label for="rcc12M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv13 btnDiv">
												<!-- <button id="rcc13A" class="btn" @click="onAuto([13])">자동</button>
												<button id="rcc13M" class="btn" @click="onAuto([13])">수동</button> -->
													<fieldset class="field">
															<legend class="regionLgend">경남</legend>
														<input type="radio" id="rcc13A" name="rcc13" value="all" checked>
														<label for="rcc13A">자동</label>
															<input type="radio" id="rcc13M" name="rcc13" value="all">
														<label for="rcc13M">수동</label>
												</fieldset>
										 </div>
										 <div class="btnDiv14 btnDiv">
												<!-- <button id="rcc14A" class="btn" @click="onAuto([14])">자동</button>
												<button id="rcc14M" class="btn" @click="onAuto([14])">수동</button> -->
												<fieldset  class="field">
													<legend class="regionLgend">경북</legend>
														<input type="radio" id="rcc14A" name="rcc14" value="all" checked>
														<label for="rcc14A">자동</label>
															<input type="radio" id="rcc14M" name="rcc14" value="all">
														<label for="rcc14M">수동</label>
												</fieldset>
										 </div>
									</div>		 		
 
								</div>
								<div class="settingSection">
									<div class="reaction_wrap setting_wrap">
										<strong>전력품질 <br>자동/수동 모드</strong>
										<div class="reaction setting">
											<table id="qau-info-tbl" class="data_table center">
												<caption>서비스명,지역명,용량,동작,비고로 나뉘어 설명</caption>
												<colgroup>
													<col /><col span="4" />
												</colgroup>
												<thead>
												<tr> 
													<th>서비스</th><th></th><th></th><th>운영 모드</th><th></th>
												</tr>	
												</thead>
												<tbody>
												<tr>
													<td scope="row">주파수</td>
													<td colspan="4">
														<fieldset>
															<input type="radio" id="freqA" name="freq" value="all" checked>
															<label for="freqA">자동</label>
																<input type="radio" id="freqM" name="freq" value="all">
															<label for="freqM">수동</label>
														</fieldset>
													</td>
													</tr>
													<tr>
													<td  scope="row">전압</td>
													<td colspan="4">

														<fieldset>
															<input type="radio" id="volA" name="voltage" value="all" checked>
															<label for="volA">자동</label>
																<input type="radio" id="volM" name="voltage" value="all">
															<label for="volM">수동</label>
														</fieldset>
													</td>
												</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="reaction_wrap setting_wrap">
										<strong>요금 <br>자동/수동 모드</strong>
										<div class="reaction setting">
											<table id="qau-info-tbl" class="data_table center">
												<caption>서비스명,지역명,용량,동작,비고로 나뉘어 설명</caption>
												<colgroup>
													<col /><col span="4" />
												</colgroup>
												<thead>
												<tr>
													<th>서비스</th><th></th><th></th><th>운영 모드</th><th></th>
												</tr>	
												</thead>
												<tbody>
												<tr>
													<td scope="row">DR</td>
													<td colspan="4">

														<fieldset>
															<input type="radio" id="volA" name="DR" value="all" checked>
															<label for="DRA">자동</label>
																<input type="radio" id="volM" name="DR" value="all">
															<label for="DRM">수동</label>
														</fieldset>
													</td>
												</tr>
												<tr>
													<td scope="row">요금</td>
													<td colspan="4">

														<fieldset>
															<input type="radio" id="feeA" name="fee" value="all" checked>
															<label for="feeA">자동</label>
																<input type="radio" id="volM" name="fee" value="all">
															<label for="feeM">수동</label>
														</fieldset>
													</td>
												</tr>
												<tr>
													<td scope="row">Peak</td>
													<td colspan="4">

														<fieldset>
															<input type="radio" id="peakA" name="peak" value="all" checked>
															<label for="peakA">자동</label>
																<input type="radio" id="peakM" name="peak" value="all">
															<label for="peakM">수동</label>
														</fieldset>
													</td>
												</tr>
												<tr>
													<td scope="row">스케줄링</td>
													<td colspan="4">
														<fieldset>
															<input type="radio" id="scheuleA" name="schedule" value="all" checked>
															<label for="scheuleA">자동</label>
																<input type="radio" id="scheuleM" name="schedule" value="all">
															<label for="scheuleM">수동</label>
														</fieldset>
													</td>
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
      link:[],
      script:[
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
        ]
      }
    }, 
    methods : {
      changeSVG : function(selectedItem){
        //console.log(selectedItem+'11111111111111111') 
			},
			changedValue: function(value) { 			
        $('.imgMap').css("visibility","hidden");
        var idx = value.currentTarget.value;
        $('#'+idx+"SVG").css("visibility", "visible")         ; 
				$('#value.currentTarget.id').siblings('label').text(idx);  
				
				setTimeout(()=>{
					document.getElementById('1135000000').classList.add('blink');
					// $("#1135000000").addClass('blink');
					//console.log('blink')
				},10)
				
      },
      changedLabel: function(label) {
        //console.log(label)
        //receive the label of the value selected (the label shown in the select, or an empty string)
			}, 
			onAuto(data){
				//console.log(data);
			}, 
			onManual(data){
				//console.log(data);
			},
		},
	middleware : 'authenticated',
    mounted() 
    {
				$('.th1').removeClass('active');
				$('#gnav-alogorithm').addClass('active');
				  
		}
				
	}
</script>

<style scoped>
 
.koreaMap{
	background:url("/images/map/korea5.png") no-repeat;
	background-size:contain;
}

.btn {
    border: 2px solid black;
    background-color: white;
    color: black;
    padding: .3rem .6rem;
    font-size: 16px;
		cursor: pointer; 
}
.btnDiv{
	
		position:absolute;
}
.btnDiv1{
	
	transform:translate(20rem,8rem);
}
.btnDiv2{
	transform:translate(20rem,11.7rem)
}
.btnDiv3{
	transform:translate(9rem,11rem)
}
.btnDiv4{
	transform:translate(20rem,16.3rem)
}
.btnDiv5{
	transform:translate(20rem,3.8rem)
}
.btnDiv6{
	transform:translate(33rem,9rem)
}
.btnDiv7{
	transform:translate(17rem,21rem)
}
.btnDiv8{
	transform:translate(28rem,18rem)
}
.btnDiv9{
	transform:translate(17rem,35rem)
}
.btnDiv10{
	transform:translate(20rem,29rem)
}
.btnDiv11{
	transform:translate(36rem,28rem)
}
.btnDiv12{
	transform:translate(44rem,34rem)
}
.btnDiv13{
	transform:translate(33rem,32rem)
}
.btnDiv14{
	transform:translate(39rem,22rem)
} 


 input[type=radio] {
		display:none;
	}

	input[type=radio] + label {
		display:inline-block;
		margin:-2px;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		color: #333;
		text-align: center;
		text-shadow: 0 1px 1px rgba(255,255,255,0.75);
		vertical-align: middle;
		cursor: pointer;
		background-color: #f5f5f5;
		/* background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x; */
		border: 1px solid #ccc;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
		border-bottom-color: #b3b3b3;
		/* filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);
		filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); */
		-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
		-moz-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
		
		-webkit-transition: all ease 0.8s;
		-moz-transition: all ease 0.8s;
		transition: all ease 0.8s;
	}

	input[type=radio]:checked + label {
		   background-image: none;
		outline: 0;
		-webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
		-moz-box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
		box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
			background-color:#e0e0e0;
			/* box-shadow: inset 100px 0 0 0 #e0e0e0; */
			box-shadow : inset 100px 0 0 0 #4245b7;
		color: #fff;
			-webkit-transition: all ease 0.8s;
		-moz-transition: all ease 0.8s;
		transition: all ease 0.8s;
	}  
	legend{
		margin : 0;
	}
		
.field {
	font-family: sans-serif;
	/* border: 5px solid #1F497D; */
	background: #ddd;
	border-radius: 2px;
	padding: 4px 0 0 0;
}

.field >  .regionLgend {
	background: #1F497D;
	color: #fff;
	padding: 1px 2px ;
	font-size: 15px;
	border-radius: 2px;
	box-shadow: 0 0 0 1px #ddd;
	margin : 0;
	width: 100%;
	height: 1.2rem; 
	text-align:center;
	position : relative;
}
</style>
