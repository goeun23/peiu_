<template>
<div>
    <!-- cont_body -->
    <div id="userinfo" class="market_record_wrap">
        <!-- top_selBox_zone -->
        <!-- <div class="top_selBox_zone alR">
            <div class="btn_sel_wrap">
                <ul>
                    <li><button type="button" class="btn btn_sel is_active"><span>신규회원</span></button></li>
                </ul>
            </div>
        </div> -->
        <!--// top_selBox_zone -->
        <div class="fixed_tbl_wrap">
            <div class="tbl_wrap tbl_management_info">
                <table border="0" cellpadding="0" cellspacing="0" summary="">
                <caption></caption>
                    <thead>
                        <tr>
							<th>No</th>
							<th>계약번호</th>
                            <th>ID</th>
                            <th>고객명</th>
                            <th>회사명</th>
                            <th>전화번호</th>
                            <th>페이지수</th>
                            <th>권한설정</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in UserTblData" :key="v.idx">
							
                                <td>
                                    <span>{{v.idx}}</span>
                                </td>
                                <td>
                                    <span>{{v.ContractNum}}</span>
                                </td>
                                <td>
                                    <span>{{v.userEmail}}</span>
                                </td>
                                 <td>
                                    <span>{{v.userName}}</span>
                                </td>
                                 <td>
                                    <span>{{v.companyName}}</span>
                                </td>
                                <td>
                                    <span>{{v.tel}}</span>
                                </td>
                                <td>
                                    <span>{{v.page}}</span>
                                </td>
                                <td>
                                    <span v-on:click="showAuthPopup" v-html="v.btn"></span>
                                </td>
                        </tr>
                            <!-- <td><button id='setAuth' type="button" class="btn btn_tbl_inner btn_management"><span class="hide">계정관리</span></button></td> -->
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="popup_wrap" class="layer_popup" style="display:none;">
		<div class="layer_dim">
			<div class="pop_body">
				<div class="pop_head">
					<ul>
						<li><button type="button" class="btn_pop_tit is_active"><span>Profile</span></button></li>
						<li><button type="button" class="btn_pop_tit"><span>권한설정</span></button></li>
					</ul>
				</div>
				<div class="pop_cont">
					<!-- cont1 -->
					<div class="cont1">
						<div class="tbl_wrap">
							<p class="tbl_topR_comment"><span class="required">필수 입력</span></p>
							<table border="0" cellpadding="0" cellspacing="0" summary="">
							<caption></caption>
								<colgroup>
								<col width="40%" />
								<col width="60%" />
								</colgroup>
								<tbody>
									<tr>
										<th><span class="tbl_th">성</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="홍" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th">이름</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="길동" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th required">Email</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="user@power21.co.kr" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th required">회사명</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="파워이십일" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th required">Password</span></th>
										<td><span class="tbl_td"><input type="password" id="" name="" value="" placeholder="New Password" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th required">Confirm password</span></th>
										<td><span class="tbl_td"><input type="password" id="" name="" value="" placeholder="New Password" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th required">지역정보</span></th>
										<td><span class="tbl_td inner_search"><input type="text" id="" name="" value="대전 유성구 테크노3로 65" class="pop_input" /><button type="button" class="btn btn_search"></button></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th">상세 지역</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="한센S메카 610호" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th">핸드폰 번호</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="010-0000-0000" class="pop_input" /></span></td>
									</tr>
									<tr>
										<th><span class="tbl_th">중개사업자 등록번호</span></th>
										<td><span class="tbl_td"><input type="text" id="" name="" value="000-00-00000" class="pop_input" /></span></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="btn_wrap alR">
							<button type="button" class="btn btn_size_free btn_color_blue"><span>저장</span></button>
							<button type="button" class="btn btn_size_free"><span>삭제</span></button>
							<button type="button" class="btn btn_size_free"><span>닫기</span></button>
						</div>
					</div>
					<!--// cont1 -->
					<!-- cont2 -->
					<div class="cont2" style="display:none;">
						<ul class="pop_check_list">
							<li><input type="checkbox" id="checkId1" name="" value="" class="normal_check" /><label for="checkId1">메인페이지</label></li>
							<li><input type="checkbox" id="checkId2" name="" value="" class="normal_check" /><label for="checkId2">계통지리정보</label></li>
							<li><input type="checkbox" id="checkId3" name="" value="" class="normal_check" /><label for="checkId3">설비운영</label></li>
							<li><input type="checkbox" id="checkId4" name="" value="" class="normal_check" /><label for="checkId4">계통해석</label></li>
							<li><input type="checkbox" id="checkId5" name="" value="" class="normal_check" /><label for="checkId5">예측</label></li>
							<li><input type="checkbox" id="checkId6" name="" value="" class="normal_check" /><label for="checkId6">경제성분석</label></li>
							<li><input type="checkbox" id="checkId7" name="" value="" class="normal_check" /><label for="checkId7">통계/이력조회</label></li>
							<li><input type="checkbox" id="checkId8" name="" value="" class="normal_check" /><label for="checkId8">마켓</label></li>
							<li><input type="checkbox" id="checkId9" name="" value="" class="normal_check" /><label for="checkId9">이벤트</label></li>
							<li><input type="checkbox" id="checkId10" name="" value="" class="normal_check" /><label for="checkId10">보고서</label></li>
							<li><input type="checkbox" id="checkId11" name="" value="" class="normal_check" /><label for="checkId11">고객관리</label></li>
							<li><input type="checkbox" id="checkId12" name="" value="" class="normal_check" /><label for="checkId12">추가 수정</label></li>
						</ul>
						<div class="btn_wrap alR">
							<button type="button" class="btn btn_size_free btn_color_blue"><span>저장</span></button>
							<button type="button" class="btn btn_size_free"><span>닫기</span></button>
						</div>
					</div>
					<!--// cont2 -->
				</div>
			</div>
		</div>
	</div>
	<!--// popup_wrap -->
	<!-- popup_wrap -->
	<div id="popup_wrap2" class="layer_popup" style="display:none;">
		<div class="layer_dim">
			<div class="pop_body">
				<div class="pop_head">
					<div class="pop_tit">"대전 광역시 대덕구"을(를) 검색한 결과 총 <span>18,061</span>건 입니다.</div>
				</div>
				<div class="pop_cont">
					<div class="tbl_wrap">
						<table border="0" cellpadding="0" cellspacing="0" summary="" class="tbl_zip_code">
						<caption></caption>
							<colgroup>
							<col width="10%" />
							<col width="*" />
							<col width="20%" />
							<col width="15%" />
							</colgroup>
							<thead>
								<tr>
									<th>IDX</th>
									<th>주소1</th>
									<th>주소2</th>
									<th>우편번호</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>0</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>1</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>2</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>3</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>4</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>5</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>6</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>7</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>8</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>9</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>10</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>11</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>12</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
								<tr>
									<td>13</td>
									<td class="alL">대전 광역시 대덕구 계측로 677 (법동)</td>
									<td>법동 282-1</td>
									<td>34383</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn_wrap alR clfix">
						<div class="paging_wrap flL">
							<dl>
								<dt>Page: 1</dt>
								<dd>
									<button type="button" class="btn page_prev"><span>Previouse</span></button>
									<button type="button" class="btn page_next"><span>Next</span></button>
								</dd>
							</dl>
						</div>
						<button type="button" class="btn btn_size_free"><span>닫기</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--// popup_wrap -->
</div>
    
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
	data(){
		return{
			UserTblData : [],
			RccList : [
                '경기',
                '서울',
                '인천',
                '대전',
                '충남',
                '전북',
                '전남',
                '광주',
                '강원',
                '충북',
                '경북',
                '대구',
                '울산',
                '부산',
                '경남',
                '제주',
            ],
		}
	},
	methods: {
		showAuthPopup(){
			alert('popup clicked')
			$("#popup_wrap").css("display","block");
		},
		SetUserList(data){
			this.UserTblData = [];
            if(data != null){
                for(var i=0; i<data.length; i++){
					var site = data[i]
					
                    this.UserTblData.push({
						idx : i+1, 
						ContractNum : site.aggGroupId,
						tel : '010-1234-1324',
						page : 999,
                        userName : site.firstname,
                        companyName : site.aggRepresentation,
                        userEmail : site.email,
                        btn: "<button id='setAuth' type='button' class='btn btn_tbl_inner btn_management'><span class='hide'>계정관리</span></button>"
					})
					
                }
                
            }
            
		}
	},
    mounted() {
		if(Cookie.get('userType') ==2){
			this.$nuxt.$on('getMasterUserList', data=>{
				
				this.SetUserList(data)
			})
		}
        $(document).ready(function(){
		new PerfectScrollbar('.fixed_tbl_wrap .tbl_management_info tbody');//커스텀 스크롤
		
		var $pop_tit_tab = $(".pop_body .pop_head ul li .btn_pop_tit");
		$pop_tit_tab.on("click",function(){
			if(!$(this).hasClass("is_active")){
				var idx = $(this).closest("li").index();
				$(this).closest("ul").find("li").not(":eq("+idx+")").find(".btn_pop_tit").removeClass("is_active");
				$(this).addClass("is_active");
				$(this).closest(".pop_body").find(".pop_cont > div").not(":eq("+idx+")").css("display","none");
				$(this).closest(".pop_body").find(".pop_cont > div:eq("+idx+")").css("display","block");
			}
		});

		$(".btn_management").on("click",function(){
			
			
		});
		$(".btn_search").on("click",function(){
			$("#popup_wrap2").css("display","block");
		});
		$(".layer_popup .btn_wrap .btn").on("click",function(){
			$(this).closest(".layer_popup").css("display","none");
		});
	});
    },    
}
</script>