<template>
  <div id = 'body'>
  	<section id="content" class="container">
			<article id="detail_content">
				<!-- 본문컨텐츠 영역 -->
				<div class="localCondition_wrap">
					<div class="localCondition_header">
						<ul class="localCondition_info">
						<li>
							<strong>발전량/용량</strong>
							<p class="dateValue">121MW<br/>/1212kWh</p>
							<div class="graph">그래프영역1</div>
						</li>
						<li>
							<strong>주파수</strong>
							<p class="dateValue">60.3234Hz</p>
							<div class="graph">그래프영역2</div>
						</li>
						<li>
							<strong>총방전량</strong>
							<p class="dateValue">+1212kWh</p>
							<div class="graph">그래프영역3</div>
						</li>
						<li class="no_graph battery">
							<strong>SOC</strong>
							<p class="dateValue">80%</p>
							<div class="batteryInfo">
								<span class="battery_rating big"><!-- 20개일경우 "big" 삭제-->
									<span style ="height:80%"></span>
								</span>
							</div>
						</li>
						<li class="no_graph center">
							<strong>설비수/이벤트</strong>
							<p class="dateValue">100/24</p>
						</li>
						</ul>
					</div>
					<div class="localCondition_body">
						<div class="mapTotal">
							<span class="marker"></span>
						</div>
						<!-- 지역별 정보-->
						<div class="localConditionInfo GyeonggiNorthern">
							<dl>
							<dt></dt>
							<dd>
								<ul>
								<li>발전량 : 123MW</li>
								<li>총 방전량 : 123MW</li>
								<li>SOC : 46%</li>
								</ul>
							</dd>
							</dl>
							<div class="graphArea">
								<div class="graph no1">그래프 영역1</div>
								<div class="graph no2">그래프 영역2</div>
								<div class="weatherInfo">
									<span class="weather_icon">
										<i class="icon no1" aria-hidden="true"><span class="hide">맑음</span></i>
									</span>
									<span class="temper">30℃<br/>2m/s</span>
								</div>
							</div>
						</div>
						<!-- //지역별 정보-->
						<div class="localConditionInfo Incheon">
							<dl>
							<dt>인천</dt>
							<dd>
								<ul>
								<li>발전량 : 123MW</li>
								<li>총 방전량 : 123MW</li>
								<li>SOC : 46%</li>
								</ul>
							</dd>
							</dl>
							<div class="graphArea">
								<div class="graph no1">그래프 영역1</div>
								<div class="graph no2">그래프 영역2</div>
								<div class="weatherInfo">
									<span class="weather_icon">
										<i class="icon no1" aria-hidden="true"><span class="hide">맑음</span></i>
									</span>
									<span class="temper">30℃<br/>2m/s</span>
								</div>
							</div>
						</div>
					</div>
					<div class="localCondition_footer">
						<ul class="localCondition_info">
						<li>
							<strong>발전량</strong>
							<p class="dateValue">121MW</p>
							<div class="graph">그래프영역4</div>
						</li>
						<li>
							<strong>부하량</strong>
							<p class="dateValue">12.345MW</p>
							<div class="graph">그래프영역5</div>
						</li>
						<li class="no_graph center">
							<strong>DR/전력품질/요금</strong>
							<p class="dateValue">125.23kWh</p>
						</li>
						<li class="no_graph center">
							<strong>SMP</strong>
							<p class="dateValue">12345원</p>
						</li>
						<li class="no_graph center">
							<strong>REC</strong>
							<p class="dateValue">35234.0</p>
						</li>
						</ul>
					</div>
				</div>
				<!-- //본문컨텐츠 영역 -->
			</article>
		</section>
	</div>
</template>
<script>
// import { cube } from '~/assets/my-module';

export default {
  layout: "dashBoard",

  components: {},
  head: {
    link: [
      // {rel : "stylesheet", href : "/css/webfonts.css"},
      // {rel : "stylesheet", href : "/css/common.css"},
      // {rel : "stylesheet", href : "/css/layout.css"},
      // {rel : "stylesheet", href : "/css/cmpt.css"},
      // {rel : "stylesheet", href : "/css/contents.css"}
    ]
  },
  mounted() {}
};
</script>

<style>
.localCondition_body .mapTotal {
  max-width: 80rem;
}
</style>
