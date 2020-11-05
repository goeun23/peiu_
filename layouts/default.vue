<template>
	<div>
		<div v-if="routeName == 'index' || routeName == 'Login'">
			<nuxt/>
		</div>
		<div v-else id="wrapper" :class="wrapperClass">
				<div id="wrapper_body">
						<global-menu/>
						<div id="contents">
							<global-state/>
							<nuxt/>
						</div>
				</div>
		</div> 
	</div>
</template>


<script>
const Cookie = process.client ? require('js-cookie') : undefined

import globalMenu from '~/components/common/global/GlobalMenu';
import globalState from '~/components/common/global/GlobalState';



export default {
	layout: 'default',
	components: {
		globalMenu,
		globalState,
	},
	head: {
		link: [],
		script: [
			{ src: '/scripts/calendar/moment.min.js' },
			{ src: '/scripts/calendar/fullcalendar.min.js' },
			{ src: "/scripts/helper.js" },
		]
	},
	beforeDestroy() {
		clearInterval(this.interval1);
	},
	data(){
		return {
			routeName : "",
			lang : "",
			interval1 : null,
			wrapperClass: ""
		}
	},
	created(){
		this.setHeader();
	}, 
	methods : {
		setHeader(){
			
			this.routeName = this.$nuxt.$route.name

			if(this.routeName === 'main' || this.routeName === 'vietnammain'){
				this.wrapperClass = "main"
			}else{
				this.wrapperClass = "";
			}
		}, 
		logout: function (event) {	
			sessionStorage.clear();
		},	
		getMonthlyAccumData(data){
            // 금월 누적 발,충,방
            var resp = _ajax('s','accmofmeasurement','summary','yymm')
            if(resp == undefined || resp == null){
                return;
            }
            var dailyaccum = [];
            resp = resp[0]
            if(resp != null){
                dailyaccum.push({
                    toady_chg : abs(resp.sumofcharge/1000),
					today_dcg : Number(resp.sumofdischarge/ 1000).toFixed(1),
                    today_pv : Number(resp.sumofpvgeneration/ 1000).toFixed(1)
				})
            }
            this.$nuxt.$emit("globalState", dailyaccum);
            // 금월 누적 수익금
            var resp = _ajax('s','accmofrevenue','summary','yymm')
            if(resp == undefined || resp == null){
                return;
            }
            resp = resp[0]
            if(resp != null){
				// 금월 누적 수익금 이벤트 버스
                this.$nuxt.$emit("globalState-revenues", resp.sumofactualrevenue);
			}
		},
		getSiteCount(){	
            // 소유한 자원의 갯수
            var resp = _ajax('i','owner','site')
            if(resp == undefined || resp == null){
                return;
            }
            $nuxt.$emit('status-count-sites', resp.length)
		},
		getGlobalData(){
			// 금월 누적 충,방,발전량, 수익금
			this.getMonthlyAccumData();
		},
		mounted(){

				
			// var lang = getCookie('lang')
			// console.log(lang)
			// if(lang == null){
			//     this.$i18n.locale = 'ko'
			// }else{
			//     this.$i18n.locale = lang
			// }

			// // 소유 사이트 번호 세팅
			// getownersitelist();
			// // 소유 사이트(단위별) 설치용량 세팅
			// getownerfacilitylist();

			// this.getSiteCount();

			// 누적데이터 수신(1분마다 업데이트)
			// this.getGlobalData();
			// this.interval1 = setInterval(() => {
			// 	this.getGlobalData();
			// }, 60000);

			
			window.addEventListener('beforeunload',this.logout);
		}
	}
	
}
</script> 
