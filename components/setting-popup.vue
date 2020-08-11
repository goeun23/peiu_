<template>
    <div>
    <!-- popup_wrap -->
	<div id="popup_wrap" class="layer_popup" style="display:none;">
		<div class="layer_dim">
			<div class="pop_body">
				<div class="pop_head">
					<ul>
						<li><button type="button" class="btn_pop_tit is_active"><span>Profile</span></button></li>
						
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
					
				</div>
			</div>
		</div>
	</div>
	<!--// popup_wrap -->
	
    </div>
</template>
<style>
#popup_wrap{
	display:none;
}
</style>