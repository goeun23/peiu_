<template>
    <div>
         <li :id="Cardnum" >
            <dd>
                <ul>
                    <li><span class="tit">방전량 :</span><span class="txt"><span :id='dcgValue'>{{dcg}}</span>MW</span></li>
                    <li><span class="tit">수익금 :</span><span class="txt"><span :id='income'></span>천원</span></li>
                    <li><span class="tit">수수료 :</span><span class="txt"><span :id='power'></span>천원</span></li>
                </ul>
            </dd>
         </li>
    </div>
</template>
<script>
export default {
    layout: "marketCard",
    props:{
        Cardnum: { type: String },
        rccId: null,
        
    },
    data(){
        return {
            //lineChart: null,
            dcgValue : this.rccId + "-dcg",
            income : this.rccId + "-income",
          
            power : this.rccId + "-power",
           
        }
    },
    methods: {
        updateCardData(data){
            console.log(data.pv)
           // $("#" + this.dcgValue).text(data.pv)
            this.dcg = data.pv
            $("#" + this.income).text(data.money)
            $("#" + this.power).text("??????")
            // this.dcg = data.pv;
            
            // this.income = data.money;
            // this.power = '계산필요'
       
        }
    },
    mounted() {
        //console.log(this.Cardnum)
        this.$nuxt.$on(this.Cardnum+'-marketData',data=>{
            //console.log(data)
            this.updateCardData(data);
            
        })
      
        var dcg = this.dcg;
        console.log(dcg)
    },
}
</script>