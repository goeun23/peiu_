<template>
	<!-- 본문컨텐츠 영역 -->
	<div class="dashboard_wrap">
		<div class="dashboard_box current">
			<strong class="title active">
				<a href="#">
					이력조회
					<i class="xi-angle-up" aria-hidden="true"></i>
				</a>
			</strong>
			<div class="conts active">
				<div class="inquiry">
					<div id="selectBox" class="selectbox">
						<select name="region_field" id="region_field" class="info_select" v-model="selectedItem">
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

					<dl id="selectPeriod" class="period">
						<dt>조회 날짜(기준 날짜)</dt>
						<dd>
							<div class="datesel period_wrap">
								<div class="input-group">
									<input
										type="date"
										class="form-control"
										v-model="period1"
										id="period1"
										placeholder="시작일 입력"
									>
									<i class="xi-calendar" aria-hidden="true">
										<span class="hide">달력</span>
									</i>
								</div>
							</div>
							<p class="sort">
								<a id="btn_1Day" @click="selectConditions('btn_1Day')" class="active btn_conditions">
									<i class="xi-check-min" aria-hidden="true"></i>-1일
								</a>
								<a id="btn_7Day" @click="selectConditions('btn_7Day')" class="btn_conditions">
									<i class="xi-check-min" aria-hidden="true"></i>-7일
								</a>
								<a id="btn_30Day" @click="selectConditions('btn_30Day')" class="btn_conditions">
									<i class="xi-check-min" aria-hidden="true"></i>-30일
								</a>

								<!-- <a id="btn_accmulate" @click="selectConditions('btn_accmulate')" class="btn_conditions" ><i class="xi-check-min" aria-hidden="true"></i> ACCMULATE</a> -->
							</p>
							<p class="btn_inguiry">
								<button class="btn_query" @click="searching()">조회</button>
								<button class="btn_query" @click="download()">다운로드</button>
							</p>
						</dd>
					</dl>

					<div class="btn_wrap">
						<a id="btn_section1_1" class="btn active" @click="showContent1('section1_1')">정산현황</a>
						<a id="btn_section1_2" class="btn" @click="showContent1('section1_2')">입찰/낙찰 정보</a>
						<a id="btn_section1_3" class="btn" @click="showContent1('section1_3')">자원별 발전 현황</a>
						<a id="btn_section1_4" class="btn" @click="showContent1('section1_4')">거래 수익</a>
						<a id="btn_section1_5" class="btn" @click="showContent1('section1_5')">패널티 현황</a>
						<a id="btn_section1_6" class="btn" @click="showContent1('section1_6')">거래 이행현황</a>
					</div>
				</div>
				<div class="market">
					<div class="graphArea_wrap">
						<div id="section1_1" class="marketGrapeArea">
							<div class="dataSection">
								<div class="infoSection">
									<div class="reaction_wrap">
										<strong>{{ $t('market.service') }}</strong>
										<div class="reaction">
											<strong>{{ $t('market.frequency') }}</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{freq.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{freq.disCharging}}</li>
												<li>{{ $t('market.total_price_of_trade') }} : {{freq.price}}</li>
											</ul>
										</div>
										<div class="reaction">
											<strong>{{ $t('market.scheduling') }}</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{scheduling.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{scheduling.disCharging}}</li>
												<li>{{ $t('market.total_price_of_trade') }} : {{scheduling.price}}</li>
											</ul>
										</div>
										<div class="reaction">
											<strong>{{ $t('market.peak_cut') }}</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{peakCut.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{peakCut.disCharging}}</li>
												<li>{{ $t('market.total_price_of_trade') }} : {{peakCut.price}}</li>
											</ul>
										</div>
										<div class="reaction">
											<strong>{{ $t('market.dr') }}</strong>
											<ul class="item_lst">
												<li>{{ $t('market.trade_amount') }} : {{dr.charging}}</li>
												<li>{{ $t('market.implementation_ratio') }} : {{dr.disCharging}}</li>
												<li>{{ $t('market.total_price_of_trade') }} : {{dr.price}}</li>
											</ul>
										</div>
										<!-- <div class="reaction">
										<strong>{{ $t('market.p2p') }}</strong> 
										<ul class="item_lst">
										<li>{{ $t('market.trade_amount') }} : {{p2p.charging}}</li>
										<li> {{ $t('market.implementation_ratio') }} : {{p2p.disCharging}}</li>
										<li>{{ $t('market.total_price_of_trade') }}: {{p2p.price}} </li>
										</ul>
										</div>-->
									</div>
								</div>
								<div class="regionSection">
									<div class="rccPrice_wrap">
										<strong>{{ $t('market.service1') }}</strong>
										<div class="rccPrice">
											<strong>경기북부</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc5Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc5Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc5Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>경기</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc4Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc4Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc4Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>인천</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc3Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc3Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc3Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>서울</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc1Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc1Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc1Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>남서울</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc2Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc2Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc2Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>전북</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc10Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc10Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc10Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>대전충남</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc7Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc7Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc7Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>광주전남</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc9Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc9Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc9Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>강원</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc6Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc6Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc6Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>경북</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc14Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc14Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc14Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>충북</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc8Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc8Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc8Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>대구</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc11Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc11Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc11Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>부산울산</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc12Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc12Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc12Price.price}}</li>
											</ul>
										</div>
										<div class="rccPrice">
											<strong>경남창원</strong>
											<ul class="item_lst">
												<li>{{ $t('market.charging') }} : {{rcc13Price.charging}}</li>
												<li>{{ $t('market.discharging') }} : {{rcc13Price.disCharging}}</li>
												<li class="price">{{ $t('market.total_price_of_trade') }} : {{rcc13Price.price}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>

							<div class="graphSection">
								<div class="graph_wrap">
									<strong>{{ $t('market.accumulated_graph_service') }}</strong>
									<canvas id="serviceGraph" class="priceGraph"></canvas>
								</div>
								<div class="graph_wrap">
									<strong>{{ $t('market.accumulated_graph_area') }}</strong>
									<canvas id="regionGraph" class="priceGraph"></canvas>
								</div>
							</div>
						</div>
						<div id="section1_2" class="marketGrapeArea"></div>
						<div id="section1_3" class="marketGrapeArea">
							<div id="section1_3_graph_wrap_1_1">
								<div id="selection1_3_table_1_wrap">
									<table id="SC_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>SC 충전</th>
												<th>SC 방전</th>
											</tr>
											<tr v-for="sc in accum_sc" :key="sc.idx">
												<td>{{sc.date}}</td>
												<td>{{sc.ch}}</td>
												<td>{{sc.dh}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="section1_3_graph_wrap_1_2">
								<div id="selection1_3_table_2_wrap">
									<table id="PK_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>PK 충전</th>
												<th>PK 방전</th>
											</tr>
											<tr v-for="pk in accum_pk" :key="pk.idx">
												<td>{{pk.date}}</td>
												<td>{{pk.ch}}</td>
												<td>{{pk.dh}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="section1_3_graph_wrap_1_3">
								<div id="selection1_3_table_3_wrap">
									<table id="FR_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>FR 충전</th>
												<th>FR 방전</th>
											</tr>
											<tr v-for="fr in accum_fr" :key="fr.idx">
												<td>{{fr.date}}</td>
												<td>{{fr.ch}}</td>
												<td>{{fr.dh}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="section1_3_graph_wrap_1_4">
								<div id="selection1_3_table_4_wrap">
									<table id="DR_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>DR</th>
											</tr>
											<tr v-for="dr in meter_dr" :key="dr.idx">
												<td>{{dr.date}}</td>
												<td>{{dr.dr}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="section1_4" class="marketGrapeArea">
							<div id="section1_4_graph_wrap_1_1">
								<div id="selection1_4_table_1_wrap">
									<table id="SC_Money_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>SC 금액</th>
											</tr>
											<tr v-for="sc in money_sc" :key="sc.idx">
												<td>{{sc.date}}</td>
												<td>{{sc.money}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="section1_4_graph_wrap_1_2">
								<div id="selection1_4_table_2_wrap">
									<table id="PK_Money_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>PK 금액</th>
											</tr>
											<tr v-for="pk in money_pk" :key="pk.idx">
												<td>{{pk.date}}</td>
												<td>{{pk.money}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="section1_4_graph_wrap_1_3">
								<div id="selection1_4_table_3_wrap">
									<table id="FR_Money_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>FR 금액</th>
											</tr>
											<tr v-for="fr in money_fr" :key="fr.idx">
												<td>{{fr.date}}</td>
												<td>{{fr.money}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div id="section1_4_graph_wrap_1_4">
								<div id="selection1_4_table_4_wrap">
									<table id="DR_Money_table" class="data_table center">
										<tbody>
											<tr>
												<th>Date</th>
												<th>DR 금액</th>
											</tr>
											<tr v-for="dr in money_dr" :key="dr.idx">
												<td>{{dr.date}}</td>
												<td>{{dr.money}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="section1_5" class="marketGrapeArea">
							<!-- <div id="penaltyGraphArea" style="width:1186px;height:592px;"> -->
							<div id="penaltyGraphArea">
								<canvas id="graph_penalty"></canvas>
							</div>
							<div class="penaltyTableArea">
								<table class="data_table center">
									<tbody>
										<tr>
											<th>RCC Index</th>
											<th>1</th>
											<th>2</th>
											<th>3</th>
											<th>4</th>
											<th>5</th>
											<th>6</th>
											<th>7</th>
											<th>8</th>
											<th>9</th>
											<th>10</th>
											<th>11</th>
											<th>12</th>
											<th>13</th>
											<th>14</th>
										</tr>
										<tr>
											<td>불이행건수</td>
											<td>
												<span id="penalty_1"></span>
											</td>
											<td>
												<span id="penalty_2"></span>
											</td>
											<td>
												<span id="penalty_3"></span>
											</td>
											<td>
												<span id="penalty_4"></span>
											</td>
											<td>
												<span id="penalty_5"></span>
											</td>
											<td>
												<span id="penalty_6"></span>
											</td>
											<td>
												<span id="penalty_7"></span>
											</td>
											<td>
												<span id="penalty_8"></span>
											</td>
											<td>
												<span id="penalty_9"></span>
											</td>
											<td>
												<span id="penalty_10"></span>
											</td>
											<td>
												<span id="penalty_11"></span>
											</td>
											<td>
												<span id="penalty_12"></span>
											</td>
											<td>
												<span id="penalty_13"></span>
											</td>
											<td>
												<span id="penalty_14"></span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div id="section1_6" class="marketGrapeArea"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 계약관리 탭 시작 -->
		<div class="dashboard_box">
			<strong class="title">
				<a href="#">
					계약관리
					<i class="xi-angle-up" aria-hidden="true"></i>
				</a>
			</strong>
			<div class="conts">
				<div class="inquiry">
					<dl id="section2_1_inquiry" class="period" style="display:none;">
						<dt>해당년월</dt>
						<dd>
							<div class="datesel period_wrap">
								<div class="input-group">
									<input
										type="date"
										class="form-control"
										name="period1"
										id="period1"
										value
										placeholder="시작일 입력"
									>
									<i class="xi-calendar" aria-hidden="true">
										<span class="hide">달력</span>
									</i>
								</div>
							</div>

							<div class="btn_inguiry" style="display:none;">
								<button class="btn_query">조회</button>
								<button class="btn_query">다운로드</button>
							</div>
						</dd>
					</dl>
					<dl id="section2_3_inquiry" class="period">
						<dt>휴일 추가</dt>
						<dd>
							<div class="btn_inguiry">
								<button class="btn_query" @click="openIDDlg('holiday_wrap')">추가</button>
							</div>
						</dd>
					</dl>
					<div class="btn_wrap">
						<a id="btn_section2_1" @click="showContent2('section2_1')" class="btn active">계약 관리</a>
						<a id="btn_section2_3" @click="showContent2('section2_3')" class="btn">휴일 관리</a>
					</div>
				</div>
				<div id="section2_1" class="graphArea_wrap">
					<div class="marketGrapeArea">
						<div id="section2_1_tb" class="graphArea normal_section_area">
							<table class="data_table center">
								<thead>
									<tr>
										<th>인덱스</th>
										<th>아이디</th>
										<th>고객명</th>
										<th>회사명</th>
										<th>회사주소</th>
										<th>전화번호</th>
										<th>중개사업자등록번호</th>
										<th>서비스종류</th>
										<th>자원명</th>
										<th>RCC</th>
										<th>위도 (Latitude)</th>
										<th>경도(Longtidue)</th>
										<th>법정동코드</th>
										<th>자산 소재지</th>
										<th>ESS 용량</th>
										<th>PV 용량</th>
										<th>PCS 용량</th>
										<th>자원계약등록</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="row in resource_row" :key="row.idx">
										<td>{{row.idx}}</td>
										<td>{{row.Id}}</td>
										<td>{{row.Username}}</td>
										<td>{{row.CustomerCompanyName}}</td>
										<td>{{row.Address}}</td>
										<td>{{row.ContactPhoneNumber}}</td>
										<td>{{row.RegistrationNumber}}</td>
										<td>{{row.AssetServiceCode}}</td>
										<td>{{row.AssetName}}</td>
										<td>{{row.AssetRcc}}</td>
										<td>{{row.AssetLat}}</td>
										<td>{{row.AssetLon}}</td>
										<td>{{row.AssetLawCode}}</td>
										<td>{{row.AssetAddr}}</td>
										<td>{{row.AssetEssKW}}</td>
										<td>{{row.AssetPVKW}}</td>
										<td>{{row.AssetPCSKW}}</td>
										<td>
											<button class="btn_query" @click="editResource(row.idx)">수정</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="pagination" id="demo">
							<div>Page : {{(offset/limit)+1}}</div>
							<div @click="getPreviouse()">Previouse</div>
							<div @click="getNext()">Next</div>
						</div>
					</div>
				</div>
				<div id="section2_3" class="graphArea_wrap">
					<div class="marketGrapeArea">
						<div class="holiday_wrap graphArea new_section_area">
							<table class="data_table center">
								<thead>
									<tr>
										<th>명칭</th>
										<th>날짜</th>
										<th>삭제</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="holiday in holidayList" :key="holiday.idx">
										<td>{{holiday.date}}</td>
										<td>{{holiday.desc}}</td>
										<td>
											<button @click="deleteHoliday(holiday.idx)">삭제</button>
										</td>
									</tr>
								</tbody>
							</table>
							<div id="section2_3_pager"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 자원계약 등록-->
		<div id="resource_wrap">
			<div class="resource_tb_wrap">
				<div>
					<strong>자원추가</strong>
				</div>
				<table class="data_table center">
					<tbody>
						<tr>
							<th>ID</th>
							<td colspan="2">{{asset_id}}</td>
						</tr>
						<!-- <tr>
							<th>주소</th>
							<td colspan="2">{{user_addr}}</td>
						</tr>-->

						<tr>
							<th>
								<span>설치일자</span>
							</th>
							<td colspan="2">
								<input type="date" v-model="installed_date">
							</td>
						</tr>
						<tr>
							<th>자원명</th>
							<td colspan="2">
								<input type="text" v-model="asset_name">
							</td>
						</tr>
						<tr>
							<th>사이트 ID</th>
							<td colspan="2">
								<input type="text" v-model="site_ID">
							</td>
						</tr>
						<tr>
							<th>자원 소재지</th>
							<td>
								<input type="text" v-model="asset_addr">
							</td>
							<td>
								<button class="btn-small" @click="searchAssetAddr()">검색</button>
							</td>
						</tr>
						<tr></tr>
						<tr>
							<th>자원 소재지 상세주소</th>
							<td colspan="2">
								<input type="text" v-model="asset_addr_detail">
							</td>
						</tr>
						<tr>
							<th>RCC *</th>
							<td colspan="2">
								<select name id @change="selectRcc()" v-model="selectedRcc">
									<option v-for="rcc in rccList" :value="rcc.id" :key="rcc.id">{{ rcc.label }}</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>DLNO</th>
							<td colspan="2">
								<select v-model="selectedDLno">
									<option v-for="dl in DLlist" :value="dl.id" :key="dl.id">{{ dl.label }}</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>법정동코드</th>
							<td colspan="2">
								<input type="text" v-model="asset_addr_lawCode" class="disabled" readonly>
							</td>
						</tr>
						<tr>
							<th>위도</th>
							<td colspan="2">
								<input type="text" v-model="asset_lat" class="disabled" readonly>
							</td>
						</tr>
						<tr>
							<th>경도</th>
							<td colspan="2">
								<input type="text" v-model="asset_lon" class="disabled" readonly>
							</td>
						</tr>
						<tr>
							<th>서비스 품목 *</th>
							<td colspan="2">
								<select name id="serviceType" v-model="selectedServicetype">
									<option
										v-for="service in serviceList"
										:key="service.id"
										v-bind:value="service.code"
									>{{service.name}}</option>
									<!-- <option value="1">PV+ESS 스케줄링</option>
									<option value="2">ESS FR</option>
									<option value="3">ESS Peak-Cut</option>
									<option value="4">DR</option>-->
								</select>
							</td>
						</tr>
						<tr>
							<th>
								<span id="installed_pv_title">PV 용량(kW)</span>
							</th>
							<td colspan="2">
								<input
									type="text"
									id="installed_pv"
									v-model="installed_pv"
									ref="installed_pv"
									@change="verifyNum(installed_pv,'installed_pv')"
								>
							</td>
						</tr>

						<tr>
							<th>
								<span id="installed_pcs_title">PCS 용량(kW)</span>
							</th>
							<td colspan="2">
								<input
									type="text"
									id="installed_pcs"
									v-model="installed_pcs"
									ref="installed_pcs"
									@change="verifyNum(installed_pcs,'installed_pcs')"
								>
							</td>
						</tr>

						<tr>
							<th>
								<span id="installed_ess_title">ESS 용량(kW)</span>
							</th>
							<td colspan="2">
								<input
									type="text"
									id="installed_ess"
									v-model="installed_ess"
									ref="installed_ess"
									@change="verifyNum(installed_ess,'installed_ess')"
								>
							</td>
						</tr>
						<!-- <tr>
							<th>선로명 *</th>
							<td colspan="2">
								<select name id v-model="selectedDLLine">
									<option value="1">DL-1</option>
									<option value="2">DL-2</option>
									<option value="3">DL-3</option>
									<option value="4">DL-4</option>
								</select>
							</td>
						</tr>-->
					</tbody>
				</table>
				<button class="btn_query" @click="editUser()">Save</button>
				<button class="btn_query" @click="closeDlg('resource_wrap')">Close</button>
			</div>
		</div>

		<!-- 휴일 추가 -->
		<div id="holiday_wrap">
			<div class="holiday_tb_wrap">
				<table class="data_table center">
					<tbody>
						<tr>
							<th>휴일 *</th>
							<td>
								<input type="date" v-model="holiday">
							</td>
						</tr>
						<tr>
							<th>설명 *</th>
							<td>
								<input type="text" v-model="holiday_desc">
							</td>
						</tr>
					</tbody>
				</table>
				<button id="btn_add_holi" class="btn_query" @click="addHoliday()">추가</button>
				<button class="btn_query" @click="closeDlg('holiday_wrap')">닫기</button>
			</div>
		</div>
		<!-- 주소 검색 결과 리스트 시작 -->
		<div id="result_search_addr">
			<div class="result_search_tb_wrap">
				<table class="data_table center">
					<thead>
						<tr>
							<th>index</th>
							<th>주소1</th>
							<th>주소2</th>
							<th>우편번호</th>
							<th>법정동코드</th>
							<th>위도</th>
							<th>경도</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="data in asset_addr_table"
							:key="data.idx"
							style="text-decoration:underline;cursor:pointer;"
							@click="selectAssetAddr(data)"
						>
							<td>{{data.idx}}</td>
							<td>{{data.road}}</td>
							<td>{{data.parcel}}</td>
							<td>{{data.zipcode}}</td>
							<td>{{data.lawCode}}</td>

							<td>{{data.y}}</td>
							<td>{{data.x}}</td>
						</tr>
					</tbody>
				</table>
				<div class="paginationAddr" id="demo">
					<div>
						<span>Page : {{(offsetAddr/limitAddr) + 1}}</span>
					</div>
					<div @click="getPreviouseAddr()">
						<span>Previouse</span>
					</div>
					<div @click="getNextAddr()">
						<span>Next</span>
					</div>
				</div>
				<div>
					<button class="btn" @click="closeDlg('result_search_addr')">닫기</button>
				</div>
			</div>
		</div>
		<!-- //주소 검색 결과 리스트 끝 -->
	</div>
	<!-- //본문컨텐츠 영역 -->
</template>
<script>
// import { cube } from '~/assets/my-module';

export default {
	layout: "empty",

	components: {},
	head: {
		link: [{ rel: "stylesheet", href: "/css/jqGrid/ui.jqgrid.css" }],
		script: [
			{ src: "/scripts/jqGrid/grid.locale-en.js" },
			{ src: "/scripts/jqGrid/jquery.jqGrid.min.js" },
			{ src: "/scripts/script_common.js" },
			{ src: "/scripts/table/paginator.js" }
		]
	},
	data() {
		return {
			userIndex: 0,
			current_result_wrap_id: "result_charging_wrap",
			selectedItem: null,
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
				{ id: "rcc14", label: "경북" },
				{ id: "rcc15", label: "제주도" }
			],
			freq: { charging: 0, disCharging: 0, price: 0 },
			scheduling: { charging: 0, disCharging: 0, price: 0 },
			peakCut: { charging: 0, disCharging: 0, price: 0 },
			dr: { charging: 0, disCharging: 0, price: 0 },
			p2p: { charging: 0, disCharging: 0, price: 0 },
			rcc1Price: { charging: 0, disCharging: 0, price: 0 },
			rcc2Price: { charging: 0, disCharging: 0, price: 0 },
			rcc3Price: { charging: 0, disCharging: 0, price: 0 },
			rcc4Price: { charging: 0, disCharging: 0, price: 0 },
			rcc5Price: { charging: 0, disCharging: 0, price: 0 },
			rcc6Price: { charging: 0, disCharging: 0, price: 0 },
			rcc7Price: { charging: 0, disCharging: 0, price: 0 },
			rcc8Price: { charging: 0, disCharging: 0, price: 0 },
			rcc9Price: { charging: 0, disCharging: 0, price: 0 },
			rcc10Price: { charging: 0, disCharging: 0, price: 0 },
			rcc11Price: { charging: 0, disCharging: 0, price: 0 },
			rcc12Price: { charging: 0, disCharging: 0, price: 0 },
			rcc13Price: { charging: 0, disCharging: 0, price: 0 },
			rcc14Price: { charging: 0, disCharging: 0, price: 0 },
			dataService: {
				labels: ["FR", "스케줄링", "Peak-Cut", "DR"],
				datasets: [
					{
						label: "Charging",
						backgroundColor: "#e9de79",
						stack: "Stack 1",
						data: [0, 0, 0, 0],
						yAxisID: "y-axis-0"
					},
					{
						label: "Discharging",
						backgroundColor: "#36a5f0",
						stack: "Stack 2",
						data: [0, 0, 0, 0],
						yAxisID: "y-axis-0"
					},
					{
						label: "Payment",
						backgroundColor: "#44bb76",
						stack: "Stack 3",
						data: [0, 0, 0, 0],
						yAxisID: "y-axis-1"
					}
				]
			},
			dataRegion: {
				labels: [
					"서울",
					"남서울",
					"인천",
					"경기",
					"경기북부",
					"강원",
					"대전/충남",
					"충북",
					"광주/전남",
					"전북",
					"대구",
					"부산/울산",
					"경남",
					"경북"
				],
				datasets: [
					{
						label: "Charging",
						backgroundColor: "#e98bd5",
						stack: "Stack 1",
						data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						yAxisID: "y-axis-0"
					},
					{
						label: "Discharging",
						backgroundColor: "#35a2ff",
						stack: "Stack 2",
						data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						yAxisID: "y-axis-0"
					},
					{
						label: "Payment",
						backgroundColor: "#616ce3",
						stack: "Stack 3",
						data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						yAxisID: "y-axis-1"
					}
				]
			},
			serviceGraph: null,
			regionGraph: null,
			url_market: process.env.url_market,
			url_drill: process.env.url_drill,
			url_account_list: process.env.url_account_list,
			url_holiday: process.env.url_holiday,
			url_asset_update: process.env.url_asset_update,
			url_address: process.env.url_address,
			url_asset_servicelist: process.env.url_asset_servicelist,
			period1: "2018-12",
			period2: "2018-12",
			penalty_graph: null,
			selectedMenu: "",
			normalContracts: [],
			res_contrancs_data: [],
			resource_row: [],
			installed_pv: 0,
			installed_pcs: 0,
			installed_ess: 0,
			installed_date: "1999-01-01",
			rccList: [
				{ id: "0", label: "서울" },
				{ id: "1", label: "남서울" },
				{ id: "2", label: "인천" },
				{ id: "3", label: "경기" },
				{ id: "4", label: "경기북부" },
				{ id: "5", label: "강원" },
				{ id: "6", label: "대전충남" },
				{ id: "7", label: "충북" },
				{ id: "8", label: "광주전남" },
				{ id: "9", label: "전북" },
				{ id: "10", label: "대구" },
				{ id: "11", label: "부산울산" },
				{ id: "12", label: "경남" },
				{ id: "13", label: "경북" }
			],
			selectedDLLine: "",
			selectedRcc: "",
			user_addr: "",
			serviceList: [],
			site_ID: "",
			asset_id: "",
			asset_addr: "",
			asset_name: "",
			asset_addr_detail: "",
			asset_addr_table: [],
			asset_addr_lawCode: "0",
			asset_lat: "",
			asset_lon: "",
			recv_asset_list: [],
			selectedServicetype: "",
			areaCode: [
				{
					"0": [
						"도봉구",
						"노원구",
						"강북구",
						"성북구",
						"은평구",
						"중랑구",
						"동대문구",
						"종로구",
						"서대문구",
						"마포구",
						"용산구",
						"중구",
						"성동구",
						"광진구"
					]
				},
				{
					"1": [
						"강서구",
						"양천구",
						"영등포구",
						"구로구",
						"금천구",
						"동작구",
						"관악구",
						"서초구",
						"강남구",
						"송파구",
						"강동구"
					]
				},
				{
					"2": [
						"강화",
						"김포",
						"서구",
						"계양구",
						"부평구",
						"부천",
						"시흥",
						"남동구",
						"연수구",
						"남구",
						"동구",
						"중구",
						"영종도",
						"웅진군",
						"백령도"
					]
				},
				{
					"3": [
						"광명",
						"부천",
						"안양",
						"군포",
						"안산",
						"의왕",
						"하남",
						"성남",
						"수원",
						"화성",
						"오산",
						"평택",
						"광주",
						"용인",
						"안성",
						"이천",
						"여주"
					]
				},
				{
					"4": [
						"연천",
						"파주",
						"고양",
						"동두천",
						"영주",
						"의정부",
						"포천",
						"가평",
						"남양주",
						"구리"
					]
				},
				{
					"5": [
						"고성군",
						"속초시",
						"양앙군",
						"인제군",
						"양구군",
						"화천군",
						"철원군",
						"춘천시",
						"홍천군",
						"횡성군",
						"평창군",
						"강릉시",
						"원주시",
						"영월군",
						"정선군",
						"동해시",
						"삼척시",
						"태백시"
					]
				},
				{
					"6": [
						"당진군",
						"서산시",
						"태안군",
						"홍성군",
						"예산군",
						"아산시",
						"천안시",
						"공주시",
						"청양군",
						"보령시",
						"부여군",
						"서천군",
						"논산시",
						"금산군",
						"유성구",
						"대덕구",
						"동구",
						"중구",
						"서구"
					]
				},
				{
					"7": [
						"단양군",
						"제천시",
						"충주시",
						"음성군",
						"진천군",
						"증평군",
						"괴산군",
						"청주시",
						"보은군",
						"옥천군",
						"영동군"
					]
				},
				{
					"8": [
						"영광군",
						"장성군",
						"담양군",
						"곡성군",
						"구례군",
						"광양시",
						"여수시",
						"순천시",
						"화순군",
						"북구",
						"동구",
						"남구",
						"서구",
						"광산구",
						"함평군",
						"무안군",
						"나주시",
						"목포시",
						"영암군",
						"진도군",
						"해남군",
						"완도군",
						"강진군",
						"장흥군",
						"보성군",
						"고흥군"
					]
				},
				{
					"9": [
						"군산시",
						"익산시",
						"완주군",
						"무주군",
						"진안군",
						"전주시",
						"김제시",
						"부안군",
						"정읍시",
						"임실군",
						"장수군",
						"남원시",
						"순창군",
						"고창군"
					]
				},
				{
					"10": [
						"영덕군",
						"포항시",
						"영천시",
						"경주시",
						"청도시",
						"경산시",
						"달성군",
						"고령군",
						"성주군",
						"김천시",
						"칠곡군",
						"북구",
						"동구",
						"수겅구",
						"중구",
						"서구",
						"달서구",
						"남구"
					]
				},
				{
					"11": [
						"북구",
						"중구",
						"동구",
						"남구",
						"울주군",
						"양산시",
						"기장군",
						"김해시",
						"금전구",
						"북구",
						"해운대구",
						"동래구",
						"연제구",
						"수영구",
						"부산진구",
						"남구",
						"동구",
						"사상구",
						"중구",
						"영도구",
						"서구",
						"사하구",
						"강서구"
					]
				},
				{
					"12": [
						"거창군",
						"함양군",
						"산청군",
						"합천군",
						"창년군",
						"의령군",
						"밀양시",
						"함안군",
						"창원시",
						"진해시",
						"마산시",
						"진주시",
						"하동군",
						"사천시",
						"남해군",
						"고성군",
						"통영시",
						"거제시"
					]
				},
				{
					"13": [
						"문경시",
						"상주시",
						"구미시",
						"예천군",
						"의성군",
						"군위군",
						"청송군",
						"안동시",
						"영주시",
						"봉화군",
						"영양군",
						"울진군",
						"울릉도",
						"독도"
					]
				}
			],
			holidayList: [],
			holiday: "",
			holiday_idx: 0,
			holiday_desc: "",
			conditions: "1",
			accum_sc: [],
			accum_pk: [],
			accum_fr: [],
			accum_sc_ch: [],
			accum_sc_dh: [],
			accum_pk_ch: [],
			accum_pk_dh: [],
			accum_fr_ch: [],
			accum_fr_dh: [],
			meter_dr: [],
			money_sc: [],
			money_pk: [],
			money_dr: [],
			money_fr: [],
			url_update_holyday: process.env.url_update_holyday,
			url_delete_holyday: process.env.url_delete_holyday,
			scrollbar1: "",
			scrollbar2: "",
			scrollbar3: "",
			scrollbar4: "",
			scrollbar5: "",
			scrollbar6: "",
			scrollbar7: "",
			scrollbar8: "",
			scrollbar9: "",
			offset: 0,
			limit: 3,
			offsetAddr: 0,
			limitAddr: 5,
			recvUserData: [],
			selectedDLno: "",
			DLlist: [
				{ id: 0, value: 0, label: "0라인" },
				{ id: 1, value: 1, label: "1라인" },
				{ id: 2, value: 2, label: "2라인" },
				{ id: 3, value: 3, label: "3라인" }
			]
		};
	},
	methods: {
		getServiceList: function () {
			// 서비스 품목 조회
			var url = this.url_asset_servicelist;
			this.serviceList = [];
			$.ajax({
				url: url,
				contentType: "application/json",
				success: this.recvGetServiceList,
				error: function (jqXHR, textStatus, error) {
					alert("통신에러");
				}
			});
		},
		recvGetServiceList: function (data, textStatus, jqXHR) {
			data.forEach((value, idx) => {
				this.serviceList.push({
					idx: idx,
					id: value.Id,
					name: value.ServiceName,
					code: value.ServiceCode
				});
			});
		},
		searchAssetAddr: function () {
			if (this.asset_addr.length > 0) {
				this.openIDDlg("result_search_addr");

				var url =
					this.url_address +
					"&query=" +
					this.asset_addr +
					"&type=address&size=1000";
				url += "&category=ROAD";

				$.ajax({
					url: url,
					type: "get",
					dataType: "jsonp",
					jsonpCallback: "myCallback",
					success: this.recvSearchAssetAddr,
					error: function (jqXHR, textStatus, error) {
						alert("주소검색 실패");
					}
				});
			} else {
				alert("자산 소새지 입력해 주세요");
			}
		},
		recvSearchAssetAddr: function (data, textStatus, jqXHR) {
			if (data.response.status == "NOT_FOUND") {
				alert("검색 결과 없습니다.");
			} else {
				this.recv_asset_list = data.response.result.items;
				this.asset_addr_table = [];
				this.offsetAddr = 0;
				for (
					var i = this.offsetAddr;
					i < this.recv_asset_list.length &&
					i < this.offsetAddr + this.limitAddr;
					i++
				) {
					var value = this.recv_asset_list[i];
					this.addAssetAddrRow(i, value);
				}
			}
		},
		addAssetAddrRow: function (idx, value) {
			this.asset_addr_table.push({
				idx: idx,
				road: value.address.road,
				parcel: value.address.parcel,
				zipcode: value.address.zipcode,
				address: value.address.road + ", " + value.address.parcel,
				x: value.point.x,
				y: value.point.y,
				lawCode: value.id.substring(0, 10)
			});
		},
		selectAssetAddr: function (data) {
			this.asset_addr = data.road;
			this.asset_lat = data.y;
			this.asset_lon = data.x;
			this.asset_addr_lawCode = data.lawCode;
			this.closeDlg("result_search_addr");
		},
		getPreviouseAddr: function () {
			if (this.offsetAddr - this.limitAddr >= 0) {
				this.offsetAddr -= this.limitAddr;
				this.asset_addr_table = [];

				for (
					var i = this.offsetAddr;
					i < this.recv_asset_list.length &&
					i < this.offsetAddr + this.limitAddr;
					i++
				) {
					var value = this.recv_asset_list[i];
					this.addAssetAddrRow(i, value);
				}
			} else {
				alert("데이터가 없습니다.");
			}
		},
		getNextAddr: function () {
			this.offsetAddr += this.limitAddr;

			if (this.offsetAddr > this.recv_asset_list.length) {
				alert("데이터가 없습니다.");
			} else {
				this.asset_addr_table = [];
				for (
					var i = this.offsetAddr;
					i < this.recv_asset_list.length &&
					i < this.offsetAddr + this.limitAddr;
					i++
				) {
					var value = this.recv_asset_list[i];
					this.addAssetAddrRow(i, value);
				}
			}
		},
		deleteHoliday: function (idx) {
			var data = this.holidayList[idx];
			var url = this.url_delete_holyday + "?PK=" + data.pk;
			$.ajax({
				url: url,
				type: "delete",
				contentType: "application/json",
				success: this.deleteHolidayResult,
				error: function (jqXHR, textStatus, error) {
					alert("통신에러");
				}
			});
		},
		deleteHolidayResult: function (data, textStatus, jqXHR) {
			if (textStatus == "success") {
				alert("삭제 하였습니다.");
				this.getHoliday();
			} else {
				alert("삭제 실패하여습니다.");
			}
		},
		selectConditions: function (btn_id) {
			document.getElementById("btn_1Day").classList.remove("active");
			document.getElementById("btn_7Day").classList.remove("active");
			document.getElementById("btn_30Day").classList.remove("active");

			document.getElementById(btn_id).classList.add("active");
			if (btn_id == "btn_1Day") {
				this.conditions = "1";
			} else if (btn_id == "btn_7Day") {
				this.conditions = "7";
			} else if (btn_id == "btn_30Day") {
				this.conditions = "30";
			}
		},
		searching: function () {
			if (this.period1 == "" || this.period1 == undefined) {
				alert("날짜 선택하세요");
				return;
			}
			if (this.selectedMenu == "section1_1") {
			}
			if (this.selectedMenu == "section1_2") {
			}
			if (this.selectedMenu == "section1_3") {
				this.getGenResource();
			}
			if (this.selectedMenu == "section1_4") {
				this.getGenMoney();
			}
			if (this.selectedMenu == "section1_5") {
				var date = new Date(this.period1);
				this.setPenaltyData(date.getFullYear(), date.getMonth() + 1);
			}
			if (this.selectedMenu == "section1_6") {
			}
		},
		download: function () {
			if (this.selectedMenu == "section1_1") {
			}
			if (this.selectedMenu == "section1_2") {
			}
			if (this.selectedMenu == "section1_3") {
				var csv = [];
				var rows;
				rows = document.querySelectorAll("#SC_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				rows = document.querySelectorAll("#PK_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				rows = document.querySelectorAll("#FR_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				rows = document.querySelectorAll("#DR_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				var title = "자원별_발전현황.csv";

				exportCSVFile(csv.join("\n"), title);
			}
			if (this.selectedMenu == "section1_4") {
				var csv = [];
				var rows;
				rows = document.querySelectorAll("#SC_Money_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				rows = document.querySelectorAll("#PK_Money_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				rows = document.querySelectorAll("#FR_Money_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				rows = document.querySelectorAll("#DR_Money_table tr");
				for (let i = 0; i < rows.length; i++) {
					var row = [],
						cols = rows[i].querySelectorAll("td, th");

					for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

					csv.push(row.join(","));
				}

				var title = "거래_수익.csv";

				exportCSVFile(csv.join("\n"), title);
			}
			if (this.selectedMenu == "section1_5") {
				var date = new Date(this.period1);
				this.setPenaltyData(date.getFullYear(), date.getMonth() + 1);
			}
			if (this.selectedMenu == "section1_6") {
			}
		},
		dashboardTab: function () {
			var dashboardTab_param = $(".dashboard_wrap");
			var dashboardTab_btn = dashboardTab_param.find(".title > a");
			var dashboardTab_obj = dashboardTab_param.find(".conts");
			var event = "click";
			dashboardTab_btn
				.parent()
				.eq(0)
				.addClass("active");
			dashboardTab_obj.eq(0).addClass("active");
			dashboardTab_btn
				.parent()
				.parent()
				.eq(0)
				.addClass("current");
			dashboardTab_btn.on(event, function (ev) {
				var t = $(this);
				dashboardTab_btn.parent().removeClass("active");
				dashboardTab_obj.removeClass("active");
				dashboardTab_btn
					.parent()
					.parent()
					.removeClass("current");
				t.parent().addClass("active");
				t.parent()
					.next()
					.addClass("active");
				t.parent()
					.parent()
					.addClass("current");
				ev.preventDefault();
			});
		},
		initServiceGraph: function () {
			var ctx1 = document.getElementById("serviceGraph").getContext("2d");
			this.serviceGraph = new Chart(ctx1, {
				type: "bar",
				data: this.dataService,
				options: {
					title: {
						display: false,
						text: "Chart.js Bar Chart - Stacked"
					},
					tooltips: {
						mode: "index",
						intersect: false
					},
					legend: {
						labels: {
							fontColor: "#ffffff"
						}
					},
					responsive: true,
					scales: {
						xAxes: [
							{
								stacked: true,
								ticks: {
									fontColor: "white"
								}
							}
						],
						// yAxes: [{
						//   stacked: true,
						//   ticks: {
						//       fontColor: 'white'
						//   },
						// }]
						yAxes: [
							{
								stacked: false,
								position: "left",
								id: "y-axis-0",
								ticks: {
									fontColor: "white",
									min: 0,
									max: 50000
								}
							},
							{
								stacked: false,
								position: "right",
								id: "y-axis-1",
								ticks: {
									fontColor: "white"
								}
							}
						]
					}
				}
			});
		},
		ToNumber: function (fixed, value) {
			var m = value.toFixed(fixed);
			return Number(m).format();
		},
		ToMoney: function (value) {
			var m = Math.abs(value.toFixed(0));
			return Number(m).format();
		},
		initSignalRConnection: function () {
			console.log("Initiated SignalR");
			const hub_con = new signalR.HubConnectionBuilder()
				.withUrl(this.url_market)
				.configureLogging(signalR.LogLevel.Trace)
				.build();
			hub_con.serverTimeoutInMilliseconds = 100 * 60 * 10;

			console.log("Connected SignalR");
			hub_con.start().then(() => console.log("SignalR is Start"));
			hub_con.on("ReceiveMarketStock", stock => {
				// console.log(stock);
				this.freq.charging = this.ToNumber(2, stock.market_fr_charging);
				this.freq.disCharging = this.ToNumber(
					2,
					Math.abs(stock.market_fr_discharging)
				);
				this.freq.price = this.ToMoney(stock.market_fr_price);

				this.scheduling.charging = this.ToNumber(
					2,
					stock.market_schedule_charging
				);
				this.scheduling.disCharging = this.ToNumber(
					2,
					Math.abs(stock.market_schedule_discharging)
				);
				this.scheduling.price = this.ToMoney(stock.market_schedule_price);

				this.peakCut.charging = this.ToNumber(2, stock.market_peakcut_charging);
				this.peakCut.disCharging = this.ToNumber(
					2,
					Math.abs(stock.market_peakcut_discharging)
				);
				this.peakCut.price = this.ToMoney(stock.market_peakcut_price);

				this.dr.charging = this.ToNumber(2, stock.market_dr_contracts);
				this.dr.disCharging = 100;
				this.dr.price = this.ToMoney(stock.market_dr_price);

				this.dataService.datasets[0].data = [
					stock.market_fr_charging,
					stock.market_schedule_charging,
					stock.market_peakcut_charging,
					0
				];
				this.dataService.datasets[1].data = [
					Math.abs(stock.market_fr_discharging),
					Math.abs(stock.market_schedule_discharging),
					Math.abs(stock.market_peakcut_discharging),
					stock.market_dr_contracts
				];
				this.dataService.datasets[2].data = [
					Math.abs(stock.market_fr_price),
					Math.abs(stock.market_schedule_price),
					Math.abs(stock.market_peakcut_price),
					stock.market_dr_price.toFixed(0)
				];

				this.serviceGraph.update();

				// console.log((stock.market_peakcut_charging),( stock.market_peakcut_discharging), (Math.abs(stock.market_peakcut_price)))

				this.rcc1Price.charging = this.ToNumber(
					2,
					stock.RSC[0].market_all_charging
				);
				this.rcc1Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[0].market_all_discharging)
				);
				this.rcc1Price.price = this.ToMoney(stock.RSC[0].market_all_price);

				this.rcc2Price.charging = this.ToNumber(
					2,
					stock.RSC[1].market_all_charging
				);
				this.rcc2Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[1].market_all_discharging)
				);
				this.rcc2Price.price = this.ToMoney(stock.RSC[1].market_all_price);

				this.rcc2Price.charging = this.ToNumber(
					2,
					stock.RSC[1].market_all_charging
				);
				this.rcc2Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[1].market_all_discharging)
				);
				this.rcc2Price.price = this.ToMoney(stock.RSC[1].market_all_price);

				this.rcc3Price.charging = this.ToNumber(
					2,
					stock.RSC[2].market_all_charging
				);
				this.rcc3Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[2].market_all_discharging)
				);
				this.rcc3Price.price = this.ToMoney(stock.RSC[2].market_all_price);

				this.rcc4Price.charging = this.ToNumber(
					2,
					stock.RSC[3].market_all_charging
				);
				this.rcc4Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[3].market_all_discharging)
				);
				this.rcc4Price.price = this.ToMoney(stock.RSC[3].market_all_price);

				this.rcc5Price.charging = this.ToNumber(
					2,
					stock.RSC[4].market_all_charging
				);
				this.rcc5Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[4].market_all_discharging)
				);
				this.rcc5Price.price = this.ToMoney(stock.RSC[4].market_all_price);

				this.rcc6Price.charging = this.ToNumber(
					2,
					stock.RSC[5].market_all_charging
				);
				this.rcc6Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[5].market_all_discharging)
				);
				this.rcc6Price.price = this.ToMoney(stock.RSC[5].market_all_price);

				this.rcc7Price.charging = this.ToNumber(
					2,
					stock.RSC[6].market_all_charging
				);
				this.rcc7Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[6].market_all_discharging)
				);
				this.rcc7Price.price = this.ToMoney(stock.RSC[6].market_all_price);

				this.rcc8Price.charging = this.ToNumber(
					2,
					stock.RSC[7].market_all_charging
				);
				this.rcc8Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[7].market_all_discharging)
				);
				this.rcc8Price.price = this.ToMoney(stock.RSC[7].market_all_price);

				this.rcc9Price.charging = this.ToNumber(
					2,
					stock.RSC[8].market_all_charging
				);
				this.rcc9Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[8].market_all_discharging)
				);
				this.rcc9Price.price = this.ToMoney(stock.RSC[8].market_all_price);

				this.rcc10Price.charging = this.ToNumber(
					2,
					stock.RSC[9].market_all_charging
				);
				this.rcc10Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[9].market_all_discharging)
				);
				this.rcc10Price.price = this.ToMoney(stock.RSC[9].market_all_price);

				this.rcc11Price.charging = this.ToNumber(
					2,
					stock.RSC[10].market_all_charging
				);
				this.rcc11Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[10].market_all_discharging)
				);
				this.rcc11Price.price = this.ToMoney(stock.RSC[10].market_all_price);

				this.rcc12Price.charging = this.ToNumber(
					2,
					stock.RSC[11].market_all_charging
				);
				this.rcc12Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[11].market_all_discharging)
				);
				this.rcc12Price.price = this.ToMoney(stock.RSC[11].market_all_price);

				this.rcc13Price.charging = this.ToNumber(
					2,
					stock.RSC[12].market_all_charging
				);
				this.rcc13Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[12].market_all_discharging)
				);
				this.rcc13Price.price = this.ToMoney(stock.RSC[12].market_all_price);

				this.rcc14Price.charging = this.ToNumber(
					2,
					stock.RSC[13].market_all_charging
				);
				this.rcc14Price.disCharging = this.ToNumber(
					2,
					Math.abs(stock.RSC[13].market_all_discharging)
				);
				this.rcc14Price.price = this.ToMoney(stock.RSC[13].market_all_price);

				this.dataRegion.datasets[0].data = [
					Math.abs(stock.RSC[0].market_all_charging),
					Math.abs(stock.RSC[1].market_all_charging),
					Math.abs(stock.RSC[2].market_all_charging),
					Math.abs(stock.RSC[3].market_all_charging),
					Math.abs(stock.RSC[4].market_all_charging),
					Math.abs(stock.RSC[5].market_all_charging),
					Math.abs(stock.RSC[6].market_all_charging),
					Math.abs(stock.RSC[7].market_all_charging),
					Math.abs(stock.RSC[8].market_all_charging),
					Math.abs(stock.RSC[9].market_all_charging),
					Math.abs(stock.RSC[10].market_all_charging),
					Math.abs(stock.RSC[11].market_all_charging),
					Math.abs(stock.RSC[12].market_all_charging),
					Math.abs(stock.RSC[13].market_all_charging)
				];

				this.dataRegion.datasets[1].data = [
					Math.abs(stock.RSC[0].market_all_discharging),
					Math.abs(stock.RSC[1].market_all_discharging),
					Math.abs(stock.RSC[2].market_all_discharging),
					Math.abs(stock.RSC[3].market_all_discharging),
					Math.abs(stock.RSC[4].market_all_discharging),
					Math.abs(stock.RSC[5].market_all_discharging),
					Math.abs(stock.RSC[6].market_all_discharging),
					Math.abs(stock.RSC[7].market_all_discharging),
					Math.abs(stock.RSC[8].market_all_discharging),
					Math.abs(stock.RSC[9].market_all_discharging),
					Math.abs(stock.RSC[10].market_all_discharging),
					Math.abs(stock.RSC[11].market_all_discharging),
					Math.abs(stock.RSC[12].market_all_discharging),
					Math.abs(stock.RSC[13].market_all_discharging)
				];

				this.dataRegion.datasets[2].data = [
					Math.abs(stock.RSC[0].market_all_price),
					Math.abs(stock.RSC[1].market_all_price),
					Math.abs(stock.RSC[2].market_all_price),
					Math.abs(stock.RSC[3].market_all_price),
					Math.abs(stock.RSC[4].market_all_price),
					Math.abs(stock.RSC[5].market_all_price),
					Math.abs(stock.RSC[6].market_all_price),
					Math.abs(stock.RSC[7].market_all_price),
					Math.abs(stock.RSC[8].market_all_price),
					Math.abs(stock.RSC[9].market_all_price),
					Math.abs(stock.RSC[10].market_all_price),
					Math.abs(stock.RSC[11].market_all_price),
					Math.abs(stock.RSC[12].market_all_price),
					Math.abs(stock.RSC[13].market_all_price)
				];
				this.regionGraph.update();
			});
		},
		initRegionGraph: function () {
			var ctx2 = document.getElementById("regionGraph").getContext("2d");
			this.regionGraph = new Chart(ctx2, {
				type: "bar",
				data: this.dataRegion,
				options: {
					title: {
						display: false,
						text: "Chart.js Bar Chart - Stacked"
					},
					legend: {
						labels: {
							fontColor: "#ffffff"
						}
					},
					tooltips: {
						mode: "index",
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [
							{
								stacked: true,
								ticks: {
									fontColor: "white"
								}
							}
						],
						// yAxes: [{
						//   stacked: true,
						//   ticks: {
						//       fontColor: 'white'
						//   },
						// }]
						yAxes: [
							{
								stacked: true,
								position: "left",
								id: "y-axis-0",
								ticks: {
									fontColor: "white"
								}
							},
							{
								stacked: true,
								position: "right",
								id: "y-axis-1",
								ticks: {
									fontColor: "white"
								}
							}
						]
					}
				}
			});
		},
		initPenaltyGraph: function () {
			var ctx2 = document.getElementById("graph_penalty").getContext("2d");
			this.penaltyGraph = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: [
						"RCC1",
						"RCC2",
						"RCC3",
						"RCC4",
						"RCC5",
						"RCC6",
						"RCC7",
						"RCC8",
						"RCC9",
						"RCC10",
						"RCC11",
						"RCC12",
						"RCC13",
						"RCC14"
					],
					datasets: [
						{
							label: "불이행건수",
							backgroundColor: "#e98bd5",
							data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
						}
					]
				},
				options: {
					// responsive: false,
					maintainAspectRatio: false,
					title: {
						display: false,
						text: "Chart.js Bar Chart - Stacked"
					},
					legend: {
						labels: {
							fontColor: "#ffffff"
						}
					},
					tooltips: {
						mode: "index",
						intersect: false
					},
					scales: {
						xAxes: [
							{
								ticks: {
									fontColor: "white"
								}
							}
						],
						yAxes: [
							{
								ticks: {
									fontColor: "white",
									min: 0,
									max: 100
								}
							}
						]
					}
				}
			});
		},
		setPenaltyData: function (year, month) {
			// {
			//       "queryType" : "SQL",
			//       "query" : "SELECT * FROM mysql.aggDB.`penaltiies` where `year` = 2018 and `month` = 10"
			// }
			var url = this.url_drill;
			var data = {
				queryType: "SQL",
				query:
					"SELECT * FROM mysql.aggDB.`penaltiies` where `year` = " +
					year +
					" and `month` = " +
					month
			};
			data = JSON.stringify(data);

			$.ajax({
				url: url,
				data: data,
				contentType: "application/json",
				type: "post",
				success: this.recvPenalties,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log("error setPenaltyData");
					console.log(jqXHR);
					alert("패널티 정보 수신 실패(통신에러)");
				}
			});
		},
		recvPenalties: function (data, textStatus, jqXHR) {
			if (textStatus == "success") {
				if (data.columns.length > 0) {
					var rccIdx = 0;
					var penaltyCnt = 0;
					var datas = new Array(14);

					data.rows.forEach((v, i, arr) => {
						rccIdx = Number(v.rcc);
						penaltyCnt = v.penalty_count;
						document.getElementById("penalty_" + v.rcc).innerHTML = penaltyCnt;
						datas[rccIdx - 1] = penaltyCnt;
					});

					this.penaltyGraph.data.datasets[0].data = datas;
					this.penaltyGraph.update();
				} else {
					alert("데이터가 없습니다.");
				}
			} else {
				alert("패널티 정보 수신 실패");
			}
		},
		showContent1: function (type) {
			document.getElementById("btn_section1_1").classList.remove("active");
			document.getElementById("btn_section1_2").classList.remove("active");
			document.getElementById("btn_section1_3").classList.remove("active");
			document.getElementById("btn_section1_4").classList.remove("active");
			document.getElementById("btn_section1_5").classList.remove("active");
			document.getElementById("btn_section1_6").classList.remove("active");
			document.getElementById("btn_" + type).classList.add("active");

			document.getElementById("section1_1").style.display = "none";
			document.getElementById("section1_2").style.display = "none";
			document.getElementById("section1_3").style.display = "none";
			document.getElementById("section1_4").style.display = "none";
			document.getElementById("section1_5").style.display = "none";
			document.getElementById("section1_6").style.display = "none";

			document.getElementById(type).style.display = "block";
			this.selectedMenu = type;

			if (type == "section1_1") {
				document.getElementById("selectPeriod").style.display = "none";
				document.getElementById("selectBox").style.display = "none";
			} else if (type == "section1_2") {
				//제외
			} else if (type == "section1_3") {
				document.getElementById("selectPeriod").style.display = "block";
				document.getElementById("selectBox").style.display = "block";
			} else if (type == "section1_4") {
				document.getElementById("selectPeriod").style.display = "block";
				document.getElementById("selectBox").style.display = "block";
			} else if (type == "section1_5") {
				//제외
				document.getElementById("period1").type = "month";
				this.period1 = "2018-12";
				document.getElementById("period2").disabled = true;
				document.getElementById("period2").background = "#cdc";
			} else if (type == "section1_6") {
			}
		},
		showContent2: function (type) {
			document.getElementById("btn_section2_1").classList.remove("active");
			document.getElementById("btn_section2_3").classList.remove("active");
			document.getElementById("btn_" + type).classList.add("active");

			document.getElementById("section2_1").style.display = "none";
			document.getElementById("section2_3").style.display = "none";

			document.getElementById(type).style.display = "block";
			this.selectedMenu = type;

			if (type == "section2_1") {
				document.getElementById("section2_1_inquiry").style.display = "none";
				document.getElementById("section2_3_inquiry").style.display = "none";
			} else if (type == "section2_3") {
				document.getElementById("section2_1_inquiry").style.display = "none";
				document.getElementById("section2_3_inquiry").style.display = "block";
			}
		},
		getPreviouse: function () {
			if (this.offset - this.limit >= 0) {
				this.offset -= this.limit;

				this.resource_row = [];
				for (
					var i = this.offset;
					i < this.recvUserData.length && i < this.offset + this.limit;
					i++
				) {
					var value = this.recvUserData[i];
					this.addResourceRow(i % this.limit, value);
				}
			} else {
				alert("데이터가 없습니다.");
			}
		},
		getNext: function () {
			this.offset += this.limit;

			if (this.offset > this.recvUserData.length) {
				alert("데이터가 없습니다.");
			} else {
				this.resource_row = [];
				for (
					var i = this.offset;
					i < this.recvUserData.length && i < this.offset + this.limit;
					i++
				) {
					var value = this.recvUserData[i];
					this.addResourceRow(i % this.limit, value);
				}
			}
		},
		getUserList: function () {
			this.rows = [];
			$.ajax({
				url: this.url_account_list,
				contentType: "application/json",
				xhrFields: { withCredentials: true },
				beforeSend: function () {
					// console.log('before request');
					$(".progressbar").css("display", "block");
				},
				success: this.recvUserList,
				error: this.recvUserError
			});
		},
		recvUserError: function (jqXHR, textStatus, errorThrown) {
			console.log("getUserList error");
			console.log(jqXHR);
			//alert("유저 데이터 수신 실패");
			//this.recvUserList(this.tempData, "", "");
		},
		recvUserList: function (data, textStatus, jqXHR) {
			console.log("userList cnt = " + data.length);
			this.resource_row = [];
			this.offset = 0;
			this.recvUserData = data;

			for (
				var i = this.offset, j = 0;
				i < data.length && i < this.offset + this.limit;
				i++ , j++
			) {
				var value = data[i];
				this.addResourceRow(i, value);
			}
			console.log("please");
		},
		addResourceRow: function (idx, data) {
			try {
				var defaultjson = {
					idx: this.resource_row.length,
					Id: data.Id,
					Username: data.CustomerLastName + data.CustomerFirstName,
					Address: data.CustomerAddress1 + data.CustomerAddress2,
					CustomerCompanyName: data.CustomerCompanyName,
					ContactPhoneNumber: data.ContactPhoneNumber,
					RegistrationNumber: data.RegistrationNumber
				};

				//Javascript Call by value 로 하기 위해서 
				var asset = JSON.parse(JSON.stringify(defaultjson));;

				if (data.Assets.length > 0) {
					for (var i = 0; i < data.Assets.length; i++) {

						//Javascript Call by value 로 하기 위해서 
						asset = JSON.parse(JSON.stringify(defaultjson));;

						for (var j = 0; j < this.serviceList.length; j++) {
							if (this.serviceList[j].code == data.Assets[i].ServiceCode) {
								asset.AssetServiceCode = this.serviceList[j].name;
							}
						}
						asset.AssetName = data.Assets[i].AssetName;
						asset.AssetRcc = data.Assets[i].Address.RCC;
						asset.AssetLon = data.Assets[i].Address.Longtidue;
						asset.AssetLat = data.Assets[i].Address.Latitude;
						asset.AssetLawCode =
							"" + data.Assets[i].Address.LawFirstCode +
							"" + data.Assets[i].Address.LawMiddleCode +
							"" + data.Assets[i].Address.LawLasttCode;
						asset.AssetAddr =
							data.Assets[i].Address.Address1 + data.Assets[i].Address.Address2;

						asset.AssetEssKW = data.Assets[i].TotalAvaliableESSMountKW;
						asset.AssetPVKW = data.Assets[i].TotalAvaliablePVMountKW;
						asset.AssetPCSKW = data.Assets[i].TotalAvaliablePCSMountKW;
						//반복되는 객체(Assets) 때문에 idx를 다시 새로 할당
						asset.idx = this.resource_row.length;
						this.resource_row.push(asset);

						console.log("idx : " + asset.idx);
					}
				} else {
					asset.AssetServiceCode = "-";
					asset.AssetName = "-";
					asset.AssetRcc = "-";
					asset.AssetLon = "-";
					asset.AssetLat = "-";
					asset.AssetLawCode = "-";
					asset.AssetAddr = "-";
					asset.AssetEssKW = "-";
					asset.AssetPVKW = "-";

					this.resource_row.push(asset);
				}
			} catch (e) {
				console.log(e);
			}
			console.log("a");
		},
		editResource: function (idx) {
			/** 서비스 목록 가져오기 */

			//선택한 항목의 데이터값을 자원계약등록 필드에 채우기.
			var data = this.resource_row[idx];
			this.asset_id = data.Id;
			this.user_addr = data.Address;
			this.asset_deviceID = data.DeviceId;
			this.selectedDLLine = data.DLNo;
			this.installed_pcs = data.PCSInstall;
			this.installed_ess = data.ESSInstall;
			this.installed_pv = data.PVInstall;
			this.selectedRcc = data.Rcc;

			// document.getElementById('serviceType').disabled = false;
			// if (this.asset_deviceID != null) {
			// 	if (data.DeviceId.indexOf('SC') == 0) {
			// 		this.selectedServicetype = 1;
			// 		document.getElementById('serviceType').disabled = true;
			// 	} else if (data.DeviceId.indexOf('FR') == 0) {
			// 		this.selectedServicetype = 2;
			// 		document.getElementById('serviceType').disabled = true;
			// 	} else if (data.DeviceId.indexOf('PK') == 0) {
			// 		this.selectedServicetype = 3;
			// 		document.getElementById('serviceType').disabled = true;
			// 	} else if (data.DeviceId.indexOf('DR') == 0) {
			// 		this.selectedServicetype = 4;
			// 		document.getElementById('serviceType').disabled = true;
			// 	} else {

			// 	}
			// }

			this.openIDDlg("resource_wrap");
		},
		openIDDlg: function (id) {
			document.getElementById(id).style.display = "block";
		},
		closeDlg: function (id) {
			document.getElementById(id).style.display = "none";
		},
		selectRcc: function () {
			console.log("selected rcc = " + this.selectedRcc);
			var idx = Number(this.selectedRcc);

			var data = this.areaCode[idx][idx];

			this.selectedAreaList = [];
			data.forEach((v, i, arr) => {
				this.selectedAreaList.push({ id: i, label: v });
			});
		},
		verifyNum: function (value, id) {
			if (isNaN(value) == true) {
				document.getElementById(id).value = "";
				alert("숫자만 입력 가능합니다");
				return;
			}

			if (value < 0 || value > 5000) {
				document.getElementById(id).value = "";
				alert("0이상, 5000 이하만 입력 가능합니다");
			}
		},
		getHoliday: function () {
			var data = {
				queryType: "SQL",
				query: "SELECT * FROM mysql.aggdb.holidaymanager `PK` order by desc"
			};

			data = JSON.stringify(data);
			$.ajax({
				url: this.url_drill,
				data: data,
				contentType: "application/json",
				type: "post",
				success: this.recvGetHolidayResult,
				error: function (jqXHR, textStatus, errorThrown) {
					alert("휴일 정보 수신 실패(통신 에러)");
				}
			});
		},
		recvGetHolidayResult: function (data, textStatus, jqXHR) {
			this.holidayList = [];
			if (textStatus == "success") {
				if (data.columns.length > 0) {
					data.rows.forEach((v, i) => {
						this.holidayList.push({
							idx: i,
							date: v.date,
							desc: v.desc,
							pk: v.PK
						});
					});
				} else {
				}
			} else {
				alert("휴일 정보 수신 실패");
			}
		},
		addHoliday: function () {
			if (this.holiday == "" || this.holiday_desc == "") {
				alert("필수항목 (*) 입력해야 합니다.");
				return;
			}
			var data = {
				// PK : this.holiday_idx,
				date: this.holiday,
				desc: this.holiday_desc
			};
			data = JSON.stringify(data);
			$.ajax({
				url: this.url_holiday,
				data: data,
				type: "put",
				contentType: "application/json",
				success: this.recvAddHolidayResult,
				error: function (jqXHR, textStatus, errorThrown) {
					alert("휴일 추가 실패(통신 에러)");
				}
			});
		},
		recvAddHolidayResult: function (data, textStatus, jqXHR) {
			if (textStatus == "success") {
				alert("추가되었습니다.");
				this.getHoliday();
			} else {
				alert("휴일 추가 실패");
			}
			this.closeDlg("holiday_wrap");
		},
		editUser: function () {
			// alert('김기룡 차장님한테 설치일자!!!!!!!!!!!!!!!!!!!!!');
			// alert('그럼 전송데이터에 installed_date 추가!!!!!!!!!!!!!!!!!!!!');
			if (this.installed_pcs == undefined || this.installed_pcs == "") {
				this.installed_pcs = 0;
			}
			if (this.installed_ess == undefined || this.installed_ess == "") {
				this.installed_ess = 0;
			}
			if (this.installed_pv == undefined || this.installed_pv == "") {
				this.installed_pv = 0;
			}

			var data = {
				AssetName: this.asset_name,
				Address: {
					RCC: this.selectedRcc,
					Longtidue: this.asset_lon,
					Latitude: this.asset_lat,
					LawFirstCode: this.asset_addr_lawCode.substring(0, 2),
					LawMiddleCode: this.asset_addr_lawCode.substring(2, 4),
					LawLasttCode: this.asset_addr_lawCode.substring(4, 10),
					Address1: this.asset_addr,
					Address2: this.asset_addr_detail
				},
				SiteId: this.site_ID,
				TotalAvaliableESSMountKW: this.installed_ess,
				TotalAvaliablePVMountKW: this.installed_pv,
				TotalAvaliablePCSMountKW: this.installed_pcs,
				ServiceCode: this.selectedServicetype,
				InstallDate: this.installed_date,
				DLNo: this.selectedDLno
			};

			data = JSON.stringify(data);
			var url = this.url_asset_update + "id=" + this.asset_id;
			console.log("url = " + url);

			$.ajax({
				url: url,
				contentType: "application/json",
				type: "post",
				data: data,
				success: this.getEditUserResult,
				error: function (jqXHR, textStatus, errorThrown) {
					alert("자원계약 저장 실패(통신에러)");
				}
			});
		},
		getEditUserResult: function (data, textStatus, jqXHR) {
			console.log("data");
			alert("저장되었습니다.");
			this.getUserList();
			this.closeDlg("resource_wrap");
		},
		getGenResource: function () {
			// var d = (Number(this.conditions) * -1);
			// var dt1 = new Date(this.period1);
			// var dt2 = new Date(this.period1);
			// dt2.setDate(dt2.getDate() + d);
			// dt1 = dt1.toISOString();
			// dt2 = dt2.toISOString();

			var d = Number(this.conditions);
			var dt1 = moment(this.period1)
				.subtract(1, "days")
				.format("YYYY-MM-DD");
			var dt2 = moment(this.period1)
				.subtract(d, "days")
				.format("YYYY-MM-DD");

			var data = {
				queryType: "SQL",
				query:
					"SELECT * FROM mysql.aggdb.market_daily where `date` between ('" +
					dt2 +
					"') AND ('" +
					dt1 +
					"')  AND `rcc`= " +
					this.selectedItem
			};
			data = JSON.stringify(data);
			console.log(data);
			$.ajax({
				url: this.url_drill,
				contentType: "application/json",
				type: "post",
				data: data,
				success: this.getGenResourceResult,
				error: function (jqXHR, textStatus, errorThrown) {
					alert("자원별 발전 현황 수신 실패(통신 에러)");
				}
			});
		},
		getGenResourceResult: function (data, textStatus, jqXHR) {
			this.accum_sc_ch = [];
			this.accum_sc = [];
			this.accum_pk = [];
			this.accum_fr = [];
			this.meter_dr = [];
			if (data.columns.length > 0) {
				data.rows.forEach((v, i) => {
					this.accum_sc.push({
						idx: i,
						date: v.date,
						ch: Number(v.accum_sc_ch).toFixed(2),
						dh: Number(v.accum_sc_dh).toFixed(2)
					});
					this.accum_pk.push({
						idx: i,
						date: v.date,
						ch: Number(v.accum_pk_ch).toFixed(2),
						dh: Number(v.accum_pk_dh).toFixed(2)
					});
					this.accum_fr.push({
						idx: i,
						date: v.date,
						ch: Number(v.accum_fr_ch).toFixed(2),
						dh: Number(v.accum_fr_dh).toFixed(2)
					});
					this.meter_dr.push({ idx: i, date: v.date, dr: Number(v.meter_dr) });
				});
			}
		},
		getGenMoney: function () {
			// var d = (Number(this.conditions) * -1);
			// var dt1 = new Date(this.period1);
			// var dt2 = new Date(this.period1);
			// dt2.setDate(dt2.getDate() + d);

			// dt1 = dt1.toISOString();
			// dt2 = dt2.toISOString();
			var d = Number(this.conditions);
			var dt1 = moment(this.period1)
				.subtract(1, "days")
				.format("YYYY-MM-DD");
			var dt2 = moment(this.period1)
				.subtract(d, "days")
				.format("YYYY-MM-DD");

			// dt1 = dt1.getFullYear() +"-"+ (dt1.getMonth() +1) +"-"+ dt1.getDate();
			// dt2 = dt2.getFullYear() +"-"+ (dt2.getMonth() +1) +"-"+ dt2.getDate();

			// var data = {
			// 	queryType : "SQL",
			// 	query : "SELECT * FROM mysql.aggdb.market_daily where `date` between CAST('"+dt2+"' as DATE) AND CAST('"+dt1+"' as DATE)  AND `rcc`= " + this.selectedItem
			// };
			var data = {
				queryType: "SQL",
				query:
					"SELECT * FROM mysql.aggdb.market_daily where `date` between ('" +
					dt2 +
					"') AND ('" +
					dt1 +
					"')  AND `rcc`= " +
					this.selectedItem
			};
			data = JSON.stringify(data);
			console.log(data);
			$.ajax({
				url: this.url_drill,
				contentType: "application/json",
				type: "post",
				data: data,
				success: this.getGenMoneyResult,
				error: function (jqXHR, textStatus, errorThrown) {
					alert("거래수익 수신 실패(통신 에러)");
				}
			});
		},
		getGenMoneyResult: function (data, textStatus, jqXHR) {
			this.money_sc = [];
			this.money_pk = [];
			this.money_fr = [];
			this.money_dr = [];

			if (data.columns.length > 0) {
				data.rows.forEach((v, i) => {
					this.money_sc.push({
						idx: i,
						date: v.date,
						money: Math.abs(Number(v.money_sc)).toFixed(0)
					});
					this.money_pk.push({
						idx: i,
						date: v.date,
						money: Math.abs(Number(v.money_pk)).toFixed(0)
					});
					this.money_fr.push({
						idx: i,
						date: v.date,
						money: Math.abs(Number(v.money_fr)).toFixed(0)
					});
					this.money_dr.push({
						idx: i,
						date: v.date,
						money: Math.abs(Number(v.money_dr)).toFixed(0)
					});
				});
			}

			this.scrollbar5.update();
			this.scrollbar6.update();
			this.scrollbar7.update();
			this.scrollbar8.update();
		}
	},
	middleware: "authenticated",
	mounted() {
		var dt = new Date();
		this.selectedItem = 1;
		var ISODate = moment().format("YYYY[-]MM[-]DD");
		this.period1 = ISODate;

		$(".th1").removeClass("active");
		$("#gnav-market").addClass("active");
		document.getElementById("section1_1").style.display = "block";

		this.selectedMenu = "section1_1";

		this.showContent1("section1_1");

		/**정산현황 */
		//this.initServiceGraph();
		//this.initRegionGraph();
		// this.initSignalRConnection();

		/**패널티현황 */
		//this.initPenaltyGraph();

		this.dashboardTab();

		for (var i = 0; i < 23; i++) {
			var tmpData = {
				idx: i,
				id: i,
				type: "res_A1",
				name: "Power21",
				startDT: "2018-12-25 09:00:00",
				endDT: "2018-12-25 11:00:00",
				pvAmount: 300,
				essAmount: 300,
				drAmount: 300
			};
			this.normalContracts.push(tmpData);
			this.res_contrancs_data.push(tmpData);
		}
		this.getServiceList();
		//**사용자 정보 리스트 가져오기 */
		this.getUserList();
		/** 휴일 목록 가져오기*/
		// this.getHoliday();

		$("#section2_1_tb th").click(function () {
			var table = $(this)
				.parents("table")
				.eq(0);
			var rows = table
				.find("tr:gt(0)")
				.toArray()
				.sort(comparer($(this).index()));
			this.asc = !this.asc;
			if (!this.asc) {
				rows = rows.reverse();
			}
			for (var i = 0; i < rows.length; i++) {
				table.append(rows[i]);
			}
		});

		this.scrollbar1 = new PerfectScrollbar("#section1_3_graph_wrap_1_1");
		this.scrollbar2 = new PerfectScrollbar("#section1_3_graph_wrap_1_2");
		this.scrollbar3 = new PerfectScrollbar("#section1_3_graph_wrap_1_3");
		this.scrollbar4 = new PerfectScrollbar("#section1_3_graph_wrap_1_4");

		this.scrollbar5 = new PerfectScrollbar("#section1_4_graph_wrap_1_1");
		this.scrollbar6 = new PerfectScrollbar("#section1_4_graph_wrap_1_2");
		this.scrollbar7 = new PerfectScrollbar("#section1_4_graph_wrap_1_3");
		this.scrollbar8 = new PerfectScrollbar("#section1_4_graph_wrap_1_4");

		this.scrollbar9 = new PerfectScrollbar(".marketGrapeArea table");
	}
};
</script>

<style>
.graph {
	height: 27.8rem;
}

.btn {
	cursor: pointer;
}
.result_content_wrap {
	opacity: 0;
	display: none;
	transform: scale(1.1);
	transition: display 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}
.show_wrap {
	opacity: 1;
	z-index: 1000;
	display: block;
	transform: scale(1);
	transition: display 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
#result_charging_wrap {
	width: 100%;
	height: 100%;
}
#result_gen_wrap {
	width: 100%;
	height: 100%;
}
#result_price {
	width: 100%;
	height: 100%;
}
.btn_query {
	display: block;
	width: 4.125rem;
	height: 2.125rem;
	padding: 0.4375rem 0;
	border-radius: 0.1875rem;
	background: #2a75ff;
	font-size: 1.0625rem;
	line-height: 1.25rem;
	color: #fff;
	letter-spacing: -0.03125rem;
	text-align: center;
	float: left;
	margin: 0 0.125rem;
}
.btn_query::after {
	clear: both;
}
.period_wrap .input-group .xi-calendar {
	pointer-events: none;
}
.market .dashboard_box .marketGrapeArea {
	float: left;
	width: 100vw;
	padding: 0.465rem;
}
.dashboard_box .graphArea_wrap {
	height: 72vh;
	weight: 100vw;
}
.market .graphArea_wrap .dataSection {
	width: 73rem;
}
.market {
	display: inline-block;
	height: 72vh;
	width: 100%;
}
/* .market{position:relative; height:100%; padding: 1.875rem 2.9375rem;border :1px solid #3b3e47;border-radius: 0.3125rem;background:#0a1a28;} */
#section1_1,
#section1_2,
#section1_3,
#section1_4,
#section1_5,
#section1_6 {
	display: none;
}
#penaltyGraphArea {
	position: relative;
	height: 37rem !important;
	width: 100%;
	padding: 0.2rem;
}
#section2_1_tb,
#section2_2_tb {
	height: 42rem;
	overflow-y: auto;
}
#section2_1_pager select,
#section2_1_pager span {
	display: none;
}
#section2_2_pager select,
#section2_2_pager span {
	display: none;
}
#section2_1_pager button {
	color: #fff;
	font-size: 15pt;
	margin-right: 5px;
}
#holiday_wrap,
#resource_wrap,
#result_search_addr {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.85);
	display: none;
	z-index: 3;
}
#holiday_wrap .holiday_tb_wrap,
#resource_wrap .resource_tb_wrap,
#result_search_addr .result_search_tb_wrap {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
}
#holiday_wrap input,
#resource_wrap select,
#resource_wrap input {
	width: 15rem;
	height: 2.125rem;
	padding: 0.1rem;
}
.disabled {
	background: #aaa !important;
	color: black !important;
}
.resource_tb_wrap strong {
	color: #fff;
	font-size: 25pt;
	font-weight: bolder;
	line-height: 3rem;
	text-align: center;
}
#section2_3_inquiry {
	display: none;
}

#btn_section1_2,
#btn_section1_5,
#btn_section1_6 {
	display: none;
}
#region_field {
	opacity: 1 !important;
}
#section1_3_graph_wrap {
	height: 30rem;
}

#section1_3_graph_wrap_1_1,
#section1_4_graph_wrap_1_1 {
	width: 25rem;
	float: left;
	height: 45rem;
	margin: 1.125rem;
}
#section1_3_graph_wrap_1_2,
#section1_4_graph_wrap_1_2 {
	width: 25rem;
	float: left;
	height: 45rem;
	margin: 1.125rem;
}
#section1_3_graph_wrap_1_3,
#section1_4_graph_wrap_1_3 {
	width: 25rem;
	float: left;
	height: 45rem;
	margin: 1.125rem;
}
#section1_3_graph_wrap_1_4,
#section1_4_graph_wrap_1_4 {
	width: 25rem;
	float: left;
	height: 45rem;
	margin: 1.125rem;
}
#selection1_3_graph_1_wrap {
	width: 29rem;
	height: 35rem;
}
#selection1_3_graph_2_wrap {
	width: 29rem;
	height: 35rem;
}
#selection1_3_graph_3_wrap {
	width: 29rem;
	height: 35rem;
}
#selection1_3_graph_4_wrap {
	width: 29rem;
	height: 35rem;
}

.pagination {
	display: inline-block;
	bottom: 6rem;
	position: fixed;
	right: 6vh;
}

.paginationAddr {
	display: inline-block;
	bottom: 0vh;
	position: fixed;
	right: 0.125rem;
}
.paginationAddr div,
.pagination div {
	color: white;
	float: left;
	padding: 8px 16px;
	text-decoration: none;
	transition: background-color 0.3s;
	cursor: pointer;
}
.paginationAddr div.active .pagination div.active {
	background-color: #4caf50;
	color: white;
}
.paginationAdd div:hover:not(.active) .pagination div:hover:not(.active) {
	background-color: #ddd;
}

.btn-small {
	width: 5.8rem;
	height: 2.125rem;
	border-radius: 0.1875rem;
	font-size: 1.0625rem;
	color: white;
	text-align: center;
	background: #2a75ff;
	float: right;
	margin: 0 1rem;
}

.marketGrapeArea table {
	height: 100%;
}
</style>
