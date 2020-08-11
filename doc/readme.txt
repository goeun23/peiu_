* RestFul 
제어:
POST 방식
​
https://192.168.0.92:4000/api/ESS/control/
헤더: Content-Type : application/json
Body :
[
	{
		"essid" : "ESS.1144012300_01100003", // ESS ID
		"command" : 4, // 명령 코드
		"value" : -500 // 4번 명령일 떄만 포함 
	}
]​
​
command code:
0: Idle 상태
1: Stand By 
2: Fault Reset
4: 충방전 명령 (value 필수)
5: Set Min SOC (value 필수)
6: Set Max SOC (value 필수)
​
​
- ESS 정보 가져오기
GET
https://192.168.0.92:4000/api/ESS/ESS.1144012300_01100003
ESS.$essid
​
JSON 으로 가져옴
​

* data 정의
{
  "request_id": "ESS.statistics.rsc.14",
  "rsc_no": 14,
  "ess_count": 18,
  "pv_count": 8,
  "sum_pv_activePower": 0,발전량 맵핑
  "soc_average": 0,SOC 화면 맵핑
  "sum_activepower": 0,
  "sum_activepowercommand": 0,
  "sum_maxactivePower": 0,
  "sum_accum_charging": 0,
  "sum_accum_discharging": 0,
  "Idle": 18,
  "StandBy": 18,
  "FaultReset": 18,
  "Charging": 18,
  "Discharching": 18,
  "None": 18,
  "Manual": 18,
  "Auto": 0
}
//발전량 총합 -sum_pv_activePower 의 총합
//총 방전량, 누적 충전량 : - sum_accum_discharging 의 총합
//soc : soc_average & soc_average의 평균값
//총방전량, 누적 방전량 : sum_accum_charging
//////////////////////////통계​/////////////////////////
특정 지역가져오기
https://192.168.0.92:4001/api/stat/ESS.statistics.rsc.5
뒤의 숫자가 지역 코드​
​
전체 가져오기​
https://192.168.0.92:4001/api/stat/
​
*ESS 개별 데이터 API와 Port가 다름. 주의할것
* data 정의
  {
    "request_id": "ESS.statistics.rsc.2",
    "soc_average": 50,
    "sum_activepower": 500,<!-- 발전량 -->
    "sum_activepowercommand": 0,
    "sum_maxactivePower": 1000,<!-- 용량 -->
    "sum_accum_charging": 0,  <!-- 누적 충전량 -->
    "sum_accum_discharging": 0, <!-- 누적 방전량 -->
    "Idle": 1, <!-- idle 개수 -->
    "StandBy": 0, <!-- StandBy 개수 -->
    "FaultReset": 0, <!-- FaultReset(긴급정지) 개수 -->
    "Charging": 0,<!-- 현재 충전중 인 개수 -->
    "Discharching": 0,  <!-- 현재 방전중 인 개수 -->
    "None": 0,  <!--  -->
    "Manual": 1,  <!-- Manual 개수-->
    "Auto": 0, <!-- auto 회수 -->
    "ess_count": 1 <!-- counter 개수 -->
  },
​///////////////////////// 통계 끝 /////////////////////////////