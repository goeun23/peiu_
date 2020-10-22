<template>
    <div class='system'>
        <div class='chapter system_info'>
            <ul class='sitemange'>
                <li><span class="tit">[장치 현황]</span></li>
                <li><span class="tit"></span></li>
                <li>                        
                    <div class="info_right">
                        <dl>
                            <dd id='tbl_device_info'>
                                <div class=" divice_tbl tbl_wrap" style='width:123rem;  height: 28.4rem;'>
                                    <table id='device-info' class="tbl_error_info">
                                        <thead>
                                            <tr>
                                                <td class="" ><span style='width:9rem;' class='tit'>사이트번호</span></td>
                                                <td class="" ><span style='width:7rem;' class='tit'>장치번호</span></td>
                                                <td class="" ><span style='width:20rem;' class='tit'>수집장치명</span></td>
                                                <td class="" ><span style='width:10rem;' class='tit'>설치일자</span></td>
                                                <td class="" ><span style='width:12rem;' class='tit'>마지막 점검일자</span></td>
                                                <td class="" ><span style='width:9rem;' class='tit'>펌웨어 버전</span></td>
                                                <td class="" ><span style='width:10rem;' class='tit'>상태</span></td>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="completed">
                                                <td><span class='txt'>6</span></td>
                                                <td><span class='txt'>1</span></td>
                                                <td><span class='txt'>EF 연계용 수집장치1</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>1.0</span></td>
                                                <td><span class='txt'>동작중</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>6</span></td>
                                                <td><span class='txt'>2</span></td>
                                                <td><span class='txt'>EF 연계용 수집장치1</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>1.0</span></td>
                                                <td><span class='txt'>동작중</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>6</span></td>
                                                <td><span class='txt'>3</span></td>
                                                <td><span class='txt'>EF 연계용 수집장치1</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>1.0</span></td>
                                                <td><span class='txt'>동작중</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>6</span></td>
                                                <td><span class='txt'>4</span></td>
                                                <td><span class='txt'>EF 연계용 수집장치1</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>1.0</span></td>
                                                <td><span class='txt'>동작중</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>6</span></td>
                                                <td><span class='txt'>5</span></td>
                                                <td><span class='txt'>EF 연계용 수집장치1</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>2020-06-01</span></td>
                                                <td><span class='txt'>1.0</span></td>
                                                <td><span class='txt'>동작중</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </li>
                <li><span class="tit">전력수집장치 정보</span></li>
        
                <li><span class="tit">수집장치명</span><span class="txt">EF 연계용 수집장치1</span></li>
                <li><span class="tit">역할</span><span class="txt">MASTER</span></li>
                <li><span class="tit">상태</span><span class="txt">작동중</span></li>
                <li><span class="tit">통신 프로토콜</span><span class="txt">Modbus-TCP-Slave</span></li>
                <li><span class="tit">IP 주소</span><span class="txt">192.168.0.10</span></li>
                <li><span class="tit">동작제어</span>
                    <span class="txt">
                        <div style='float:left;'>
                            <label class="switch">
                                <input type="checkbox">
                                <span></span>
                            </label>
                            <a class="dribbble" style='display:none;' href="https://dribbble.com/shots/5449131-Switch-animation" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""></a>
                        </div>
                        <div style='float:left;'>
                            <button style='padding-left:0.5rem;' type="button" class="btn btn_sel "><span>적용</span></button>
                        </div>
                    </span>
                </li>
                <li><span class="tit">펌웨어 버전</span><span class="txt">1.10</span></li>
                <li><span class="tit">시스템 동작 시간</span><span class="txt">100일 10시간 00분 00초</span></li>
            </ul>
        </div>
        <div class='chapter system_log'>
            <ul class='sitemange'>
                <li><span class="tit">[시스템 로그]</span></li>
                <li><span class="tit"></span></li>
                <li><span class="tit">시스템 로그 설정</span><span class="txt"></span></li>
                <li>
                    <span class="tit">로그 기능 설정</span>
                    <span class="txt">
                        <div style='float:left;'>
                            <label class="switch">
                                <input type="checkbox">
                                <span></span>
                            </label>
                            <a class="dribbble" style='display:none;' href="https://dribbble.com/shots/5449131-Switch-animation" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""></a>
                        </div>
                        <div style='float:left;'>
                            <button style='padding-left:0.5rem;' type="button" class="btn btn_sel "><span>적용</span></button>
                        </div>
                    </span>
                </li>
                <li><span class="tit">E-Mail 보고 기능</span>
                    <span class="txt">
                        <span style='padding-right:0.5rem;'><input type="checkbox" class="tbl_inner_check"><label for="tbl_check0"></label></span>
                        로그 내용을 매일 
                        <span class="input_option_control_wrap" style='width: 6.5rem;'>
                            <input style='width:3.5rem;' type="text" id="device_capacity" value="0">
                                <button type="button" class="btn_option_control control_up"><span></span></button>
                                <button type="button" class="btn_option_control control_down"><span></span></button>
                        </span>
                        시에 관리자에게 E-Mail로 보고합니다.
                    </span>
                </li>
                <li>
                    <span class="tit"></span>
                        <span class="txt">
                        <span style='padding-right:0.5rem;'><input type="checkbox" class="tbl_inner_check"><label for="tbl_check0"></label></span>
                            E-Mail 전송 후 로그 삭제
                    </span>
                </li>
                <li><span class="tit"></span>
                    <span class="txt">
                        <button type="button" class="btn btn_sel"><span>즉시 로그 전송</span></button>
                        <button style='padding-left:0.5rem;' type="button" class="btn btn_sel "><span>적용</span></button>
                    </span>
                </li>
                <li><span class="tit"></span></li>
                <li><span class="tit">시스템 로그 보기</span><span class="txt"></span></li>
                <li>
                    <div class="info_right">
                        <dl>
                            <dd id='tbl_device_info'>
                                <div class=" divice_tbl tbl_wrap" style='width:123rem;  height: 38.4rem;'>
                                    <table id='device-info' class="tbl_error_info">

                                    <caption></caption>
                                        <colgroup>
                                            <col width="50%">
                                            <col width="50%">
                                            
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <td class=""><span class='tit' style='width:10rem;'>발생시간</span></td>
                                                <td class=""><span class='tit' style='width:15rem;'>로그내용</span></td>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="completed">
                                                <td><span class='txt'>2020/05/19 15:12:51</span></td>
                                                <td><span class='txt'>관리자 로그인 성공</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>2020/05/19 15:10:51</span></td>
                                                <td><span class='txt'>연결장치 접속 성공</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>2020/05/19 15:09:51</span></td>
                                                <td><span class='txt' >연결장치 접속 실패</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>2020/05/19 15:09:51</span></td>
                                                <td><span class='txt' >연결장치 접속 실패</span></td>
                                            </tr>
                                            <tr class="completed">
                                                <td><span class='txt'>2020/05/19 15:09:51</span></td>
                                                <td><span class='txt' >관리자 로그인 실패</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>