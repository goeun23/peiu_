<template>
<div>
    <div id="message" class="suggestion_wrap">
        <div class="fixed_tbl_wrap">
            <div class="tbl_wrap tbl_suggestion_info">
                <table border="0" cellpadding="0" cellspacing="0" summary="">
                <caption></caption>
                    <thead>
                        <tr>
                            <th>IDX</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>보낸시간</th>
                            <th>확인여부</th>
                            <th>확인시간</th>
                            <th>답변</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>12311230</td>
                            <td>power21@power21.co.kr</td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>

                            <td id='1'><img height="35" width="35" src="https://img.pngio.com/flat-message-icon-transparent-png-svg-vector-png-message-512_512.png" alt="Comments, inbox, message, one message icon"></td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><button type="button" class="btn btn_tbl_inner"><span>미완료</span></button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>12311230</td>
                            <td>power21@power21.co.kr</td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td id='3'><img height="35" width="35" src="https://img.pngio.com/flat-message-icon-transparent-png-svg-vector-png-message-512_512.png" alt="Comments, inbox, message, one message icon"></td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><button type="button" class="btn btn_tbl_inner"><span>미완료</span></button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>12311230</td>
                            <td>power21@power21.co.kr</td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td id='2'><img height="35" width="35" src="https://img.pngio.com/flat-message-icon-transparent-png-svg-vector-png-message-512_512.png" alt="Comments, inbox, message, one message icon"></td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><button type="button" class="btn btn_tbl_inner"><span>미완료</span></button></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>12311230</td>
                            <td>power21@power21.co.kr</td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><img height="35" width="35" src="https://img.pngio.com/flat-message-icon-transparent-png-svg-vector-png-message-512_512.png" alt="Comments, inbox, message, one message icon"></td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><button type="button" class="btn btn_tbl_inner" disabled><span>완료</span></button></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>12311230</td>
                            <td>power21@power21.co.kr</td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><img height="35" width="35" src="https://img.pngio.com/flat-message-icon-transparent-png-svg-vector-png-message-512_512.png" alt="Comments, inbox, message, one message icon"></td>
                            <td>2019-07-01T0030:00.5324174+09:00</td>
                            <td><button type="button" class="btn btn_tbl_inner" disabled><span>완료</span></button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- popup_wrap -->
	<!-- <div id="popup_wrap" class="layer_popup" style="display:none;"> -->
    <div id="reply_popup_wrap" class="layer_popup" style="display:none;">
		<div class="layer_dim">
			<div class="pop_body">
				<div class="pop_head">
					<div class="pop_tit">건의사항</div>
				</div>
				<div class="pop_cont">
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
									<th><span class="tbl_th required">타이틀</span></th>
									<td><span class="tbl_td"><input type="text" id="" name="" value="123311231" class="pop_input" /></span></td>
								</tr>
								<tr>
									<th><span class="tbl_th required">이름</span></th>
									<td><span class="tbl_td">power21@power21.co.kr</span></td>
								</tr>
								<tr>
									<th><span class="tbl_th required">내용</span></th>
									<td><span class="tbl_td"><textarea id="" name="" cols="" rows="" placeholder="내용을 입력하세요." class="pop_textarea"></textarea></span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn_wrap alR">
						<button type="button" class="btn btn_size_free btn_color_blue"><span>저장</span></button>
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
export default {
    mounted() {
        var interval = setInterval(function(){
            $("#1").fadeOut('slow').fadeIn('slow')
            $("#2").fadeOut('slow').fadeIn('slow')
            $("#3").fadeOut('slow').fadeIn('slow')
        },2000)
        $(document).ready(function(){
		new PerfectScrollbar('.fixed_tbl_wrap .tbl_suggestion_info tbody');//커스텀 스크롤
		
		$(".btn_tbl_inner").on("click",function(){
			if($(this).prop("disabled") != "disabled"){
				$("#reply_popup_wrap").css("display","block");
			}
		});
		$(".layer_popup .btn_wrap .btn").on("click",function(){
			$(this).closest(".layer_popup").css("display","none");
		});
	});
    },    
}
</script>