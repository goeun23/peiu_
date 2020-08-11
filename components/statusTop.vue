<template>
	<div class="top_chart_area">
		<ul>
			<li class="top_chart_list_typ1">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.pv_capacity")}}</span>
					<span class="txt"><span class="amount">{{totalPvCapacity}}</span> MW</span>
				</div>
			</li>
			<li class="top_chart_list_typ2">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.ess_capacity")}}</span>
					<span class="txt"><span class="amount">{{totalBmsCapacity}}</span> MWh</span>
				</div>
			</li>
			<li class="top_chart_list_typ3">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.today_active_powerMW")}}</span>
					<span class="txt"><span class="amount">{{today_accum_pv_energy}}</span> kWh</span>
				</div>
			</li>
			<li class="top_chart_list_typ4">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.today_chargingMW")}}</span>
					<span class="txt"><span class="amount">{{toady_accum_charging}}</span> kWh</span>
				</div>
			</li>
			<li class="top_chart_list_typ5">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.today_dischargingMW")}}</span>
					<span class="txt"><span class="amount">{{today_accum_discharging}}</span> kWh</span>
				</div>
			</li>
			<li class="top_chart_list_typ6">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.income_predict")}}</span>
					<span class="txt"><span class="amount">{{DailyPredictIncome}}</span> 원</span>
				</div>
			</li>
			<li class="top_chart_list_typ7">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.daily_income")}}</span>
					<span class="txt"><span class="amount">{{DailyAccomIncome}}</span> 원</span>
				</div>
			</li>
			<li class="top_chart_list_typ8">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.average_SOC")}}</span>
					<span class="txt"><span id ="avgsoc" class="amount">{{today_avg_soc}}</span> %</span>
				</div>
			</li>
			<li class="top_chart_list_typ9">
				<div class="txt_wrap">
					<span class="tit">{{$t("statusTop.count_customer_event")}}</span>
					<span class="txt"><span class="amount">{{cntAgg}}/</span><span id="cntEvent" class="amount">{{totalEventCount}}</span></span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	layout: "statusTop",


	data() {
		return {
			toady_accum_charging:'-', //금일 충전량
			today_accum_discharging:'-', //금일 방전량
			today_accum_pv_energy:'-', // 금일 발전량
			totalPvCapacity :'-', // PV 설치용량
			totalBmsCapacity :'-', // ESS 설치용량
			totalEventCount : '-', // 이벤트 수
			DailyAccomIncome : '-', // 금일 누적 수익금
			DailyPredictIncome : '-',// 금일 예상 수익금 
			cntAgg : '-', // agg 수 
			today_avg_soc:'-', // 평균 SOC
			interval1: null
		};
	},
	methods: {
		
		updateAccumData(data) {	
            
			if(data != null){
				// 금일 발전량
				this.today_accum_pv_energy = data[0].today_pv
				// 금일 충전량
				this.toady_accum_charging = data[0].toady_chg
				// 금일 방전량
                this.today_accum_discharging = data[0].today_dcg
                
            }
            
		},
		
		updateCustomerInfo(data){
          
			// pv 설치용량
			this.totalPvCapacity = data[0].tPv
			// bms 설치용량
			this.totalBmsCapacity = data[0].tBms
			
		}
	},
	beforeDestroy() {
		// $off method will turned off the event listner
		this.$nuxt.$off("statustop-accum-data");
		this.$nuxt.$off("statustop-custom-info");
		this.$nuxt.$off("daily-income");
		this.$nuxt.$off("statustop-avg-soc");
		this.$nuxt.$off("statustop-agg-count");
		this.$nuxt.$off("statustop-total-eventCount");
	},
	mounted() {

		this.$nuxt.$on("statustop-agg-count", data => {
			// agg 수 
			this.cntAgg = data;
		});
		this.$nuxt.$on("statustop-total-eventCount", data => {
			// 이벤트 수 
			this.totalEventCount = data;
		});
		this.$nuxt.$on("statustop-accum-data", data => {
			// 금일 누적 발전, 충전, 방전, 평균 soc
			this.updateAccumData(data);
        });
        this.$nuxt.$on('statustop-avgofsoc', data => {
            // 평균 soc
            
            this.today_avg_soc = data
        })
		this.$nuxt.$on("statustop-custom-info", data => {
			// pv설치용량, ess 설치용량
			this.updateCustomerInfo(data)
		});
		
		this.$nuxt.$on("daily-income",data=>{
            //금일 실제 수익금
           
			this.DailyAccomIncome = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		})

		this.$nuxt.$on("daily-predict-income",data=>{
            
			this.DailyPredictIncome = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		})

		this.$nuxt.$on("statustop-avg-soc", data => {
			// 평균soc
			 
		});
		
	},
	beforeDestroy() {
		//clearInterval(this.interval1);
	}
};
</script>
<style lang="">
.top_chart_area > ul > li.top_chart_list_typ9 {
    width: 19.8rem;
    padding-left: 3.6rem;
}	
</style>