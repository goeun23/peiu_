<template>
    <div style='display:none;' id="history" class="market_record_wrap">
        <div class="paging_wrap">
       
        </div>
        <div class="fixed_tbl_wrap">
            <div class="tbl_wrap record_tbl">
                <table border="0" cellpadding="0" cellspacing="0" summary="">
                    <thead>
                        <tr>
                            <th v-for='v in history_thead' :key="v.index">
                                <span>{{v.th}}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="historytbody" ><tr>
                        <tr id="historytabletbody" v-for='v in history_tbody' :key="v.index">
                            <td>
                                <span>{{v.timestamp}}</span>
                            </td>
                            <td>
                                <span>{{v.rcc}}</span>
                            </td>
                            <td>
                                <span>{{v.agg}}</span>
                            </td>
                            <td>
                                <span>{{v.site}}</span>
                            </td>
                            <td>
                                <span>{{v.data1}}</span>
                            </td>
                            <td>
                                <span>{{v.data2}}</span>
                            </td>
                            <td>
                                <span>{{v.data3}}</span>
                            </td>
                            <td>
                                <span>{{v.data4}}</span>
                            </td>
                            <td>
                                <span>{{v.data5}}</span>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
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
            sum : "",
            dateMap : [],
            history_thead : [],
            history_tbody : [],
            t : null, 
            btn : "",
            
        }
    },
    methods: {
       
        setTablethead(v){

            if(v == null || v == undefined){
                this.category = "rcc"
                this.btn = "equip";
            }else{
                this.category = v[0].category;
                this.btn = v[0].btn;
            }

            this.history_thead = [];
            this.history_tbody = [];
            if(this.btn  == 'event'){
                // 이벤트
                var th = ['순서','지역명','거래사업자','주소','설비명','알람명','발생시간','복구시간', 'ack시간']
            }else if(this.btn == 'market'){
                // 마켓
                var th = ['순서','지역명','거래사업자','발전량','수익금','수수료','','','',]
            }
            else if(this.btn  == 'equip'){
                // 설비
                if(this.category == 'rcc' || this.category == "agg"){
                    var th = ['시간','지역명','거래사업자','주소','서비스명','태양광발전(MWp)','유효출력(MW)','SOC(%)', 'SOH(%)']
                }else{
                    var th = ['시간','지역명','거래사업자','주소','서비스명','태양광발전(kWp)','유효출력(kW)','SOC(%)', 'SOH(%)']
                }
                
            }else if(this.btn  == 'forcast'){
                // 예측
                var th = ['시간','지역명','거래사업자','주소','예측값','실제값','','','',]
            }else {
                var th = [];
            }
            for(var i = 0; i < th.length; i++){
                this.history_thead.push({
                    idx: i,
                    th : th[i]
                })
            }
           
        },
        SetEquipTable(d){
            

            this.history_tbody = [];
            $("#historytbody").empty()
            if(d.length == 0){
                
                var html = "<td style='width: 179rem;'><span>조회 결과 없음</span></td>"
                
                $("#historytbody").append(html)
                this.history_tbody = [];
            }else{
               
                for(var i = 0; i< d.length; i++){
                    var r = d[i]

                    if(r.servicecode != undefined){
                        var servicecode = r.servicecode
                    }else{
                        var servicecode = ""
                    }
                    var pvgen = 0, actpwr=0;

                    if(this.category == 'rcc' || this.category == "agg"){
                        pvgen = unitMW(r.pvgen)
                        actpwr = unitMW(r.actpwr)
                    }else{
                        pvgen = unitKW(r.pvgen)
                        actpwr = unitKW(r.actpwr)
                    }

                    this.history_tbody.push({
                        index : i,
                        timestamp :r.createts.replace(/\T/g,' '),
                        rcc : this.RccList[r.rcc-1], 
                        agg : r.aggname,
                        site : r.siteid,
                        
                        // 서비스명
                        // pv
                        // 유효
                        // soc
                        // soh
                        
                        data1 : serviceCode[r.servicecode],
                        data2 : pvgen,
                        data3 : actpwr,
                        data4 : unitSoc(r.soc),
                        data5 : unitSoc(r.soh)
                    })

                }
            }
            
        },
        SetEventTable(d){
            
            this.history_tbody = [];
            
            $("#historytbody").empty()
            if(d.length == 0){
                var html = "<td style='width: 179rem;'><span>조회 결과 없음</span></td>"
                
                $("#historytbody").append(html)
                this.history_tbody = [];
            }else{
                for(var i = 0; i< d.length; i++){
                    var r = d[i]
                    this.history_tbody.push({
                        index : i +  "",
                        timestamp : i + 1 + "",
                        rcc : this.RccList[r.rcc-1], 
                        site : r.siteid,
                        agg : r.aggname,

                        // 설비명
                        // 알람명
                        // 발생시간
                        // 복구시간
                        // ack시간

                        data1 : devicecode[r.DeviceType]+r.DeviceIndex,
                        data2 : r.Name,
                        data3 : r.createts.replace(/\T/g,' '),
                        data4 : r.Recoveryts.replace(/\T/g,' '),
                        data5 : r.Ackts.replace(/\T/g,' ')

                    })
                }
            }
            
        },
        setForcastTable(d){
            this.history_tbody = [];
            $("#historytbody").empty()
            if(d.length == 0){
                var html = "<td style='width: 179rem;'><span>조회 결과 없음</span></td>"
                $("#historytbody").append(html)
                this.history_tbody = [];
                return;
            }
            var rcc, agg, site,data1 , data2; 
            for(var i = 0; i< d.length; i++){

                var r = d[i]
                rcc = this.RccList[r.rcc-1]
                agg = r.aggname
                site = r.siteid

                if(this.category == 'rcc'){
                    data1 = unitMW(r.forcast)
                    data2 = unitMW(r.pvgen)
                }else if(this.category == 'agg'){
                    data1 = unitMW(r.forcast)
                    data2 = unitMW(r.pvgen)
                }else{
                    data1 = unitKW(r.forcast)
                    data2 = unitKW(r.pvgen)
                }

                // data1 : 예측값, data2 : 실제값
                
                this.history_tbody.push({
                    index : i, 
                    rcc : rcc, 
                    agg : agg, 
                    site : site,
                    timestamp : r.createts.replace(/\T/g,' '),
                    
                    // 예측값
                    data1 : data1,

                    // 실제값
                    data2 : data2,
                })
                
                
            }
        },
        setCategory(v){
            this.category = v;
        }
    },
    
    mounted() {

        this.setTablethead();

        this.$nuxt.$on('getempty',data=>{
            $("#historytbody").empty();
            this.history_tbody = [];
        });
       

        // custom scroll
       new PerfectScrollbar('tbody');

       this.$nuxt.$on('theadtype', data=> {
           this.setTablethead(data);
       })

        this.$nuxt.$on('history-equip',data=>{
            this.SetEquipTable(data)
            
        });

        this.$nuxt.$on('history-forcast', data => {
            this.setForcastTable(data)
        })
        
        this.$nuxt.$on('history-event',data=>{
            this.SetEventTable(data)
        });


    },
};

</script>