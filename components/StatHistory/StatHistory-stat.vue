<template>
    <div  style='display:none;' id="stat" class="market_switch_wrap">
        <!-- statistics_wrap -->
            <div class="statistics_wrap">
                
                <div class="statistics_cont">
                    <div id="statisticsChart1"></div> 
                   
                </div>
                <div class="tbl_wrap ">
                    
                </div>
            </div>
            <!--// statistics_wrap -->
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
let RccList = {	   
    "1" : '경기',
    "2" : '인천',
    "3" : '서울',
    "4" : '대전',
    "5" : '충남',
    "6" : '전북',
    "7" : '전남',
    "8" : '광주',
    "9" : '강원',
    "10" : '충북',
    "11" : '경북',
    "12" : '대구',
    "13" : '울산',
    "14" : '부산',
    "15" : '경남',
    "16" : '제주',
    
}

export default {
    data(){
        return{
            category : "",
            Hourlydata:[],
            deviceChart : null,
            forcastChart : null,
            baseUrl : 'https://www.peiu.co.kr:3020/api',
            maxpv : 0,
            maxess : 0,
        }
    },
    methods: {
        setEquipData(resp){
         
            var data = resp.data;
            var datediff = resp.datediff

            if(this.category == "rcc" || this.category == "agg"){
                var txtpv = "태양광발전량(MWh)"
                var txtactpwr = "유효출력(MWh)"
            }else{
                var txtpv = "태양광발전량(kWh)"
                var txtactpwr = "유효출력(kWh)"
            }
            var chartdata = [];

            if(data == undefined){
                alert('차트 생성 실패')
                return;
            }
            var field = {
                "id" : "statisticsChart1",
                "data1" : txtpv, // pvpower
                "data2" : txtactpwr, // actpwr
                "data3" : "SOC(%)" // soc
            }

            
            if(data.length >0){
                for (var i = 0; i < data.length; i++) {

                    var d = data[i]
                    if(this.category == 'rcc' || this.category == 'agg'){
                        var data1 = unitMW(d.pvgen*1)
                        var data2 = unitMW(d.actpwr*1)
                    }else {
                        var data1 = unitKW(d.pvgen*1)
                        var data2 = unitKW(d.actpwr*1)
                    }
                    
                  
                    chartdata.push({
                        date : new Date(d.createts), 
                        data1 : data1,
                        data2 : data2,
                        data3 : d.soc
                    })
                   
                }
            }else{
                
                chartdata.push({
                    date : null, 
                    data1 : null,
                    data2 : null,
                    data3 : null
                })
                
            }
            this.$nuxt.$emit('csvdata', chartdata)
            this.setDeviceChart(chartdata,field, datediff, resp.facility);
        },
        setDeviceChart(chartdata, field, datediff, facility){
            var grid = setgridDistance(datediff)
            if(this.category == 'rcc' || this.category == 'agg'){
                var maxpv = facility.pv/1000 + (facility.pv/1000 * 0.1);
                var maxess = facility.pcs/1000 + (facility.pcs/1000 * 0.1);;
            }else{
                var maxpv = facility.pv + (facility.pv * 0.1);
                var maxess = facility.pcs + (facility.pcs * 0.1);
            }

            // 유효출력 pcs 설치용량.. 
            
            
            am4core.ready(function() {
                // Themes begin
                am4core.useTheme(am4themes_dark);
                am4core.useTheme(am4themes_animated);

                // 라이센스
                am4core.options.commercialLicense = true;
                // Themes end
                // 차트 설정
                var chart = am4core.create(field['id'], am4charts.XYChart);
                
                chart.language.locale = am4lang_ko_KR;
                chart.numberFormatter.language = new am4core.Language();
                chart.numberFormatter.language.locale = am4lang_ko_KR;
                chart.dateFormatter.language = new am4core.Language();
                chart.dateFormatter.language.locale = am4lang_ko_KR;
                
                chart.fontSize = "1.5vh";
                chart.data = chartdata;

                var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                // 날짜 표기 단위(조회 일자마다 값이 달라지게 함 )
                dateAxis.renderer.minGridDistance = grid;
                // 날짜 표기 형식
                dateAxis.dateFormats.setKey("day", "[bold] MM/dd (eee)");
                // 'day'항목이 넘어갈때, 볼드 강조 
                dateAxis.periodChangeDateFormats.setKey("day", "[bold] MM/dd (eee)"); 
                // 날짜 표기 세로줄 두께 
                dateAxis.renderer.grid.template.strokeWidth = 4;
                // 날짜 표기 컬러
                dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

                function CreateValueAxis(colors, field, opposite, max){
                    var v = chart.yAxes.push(new am4charts.ValueAxis());
                    v.tooltip.disabled = true;
                    v.renderer.labels.template.fill = am4core.color(colors);
                    v.renderer.minWidth = 60;
                    v.renderer.opposite = opposite;
                    
                    
                    if(max != 0){
                        v.max = max;
                    }
                    
                    if(field == 'actpwr'){
                        v.min = maxess * -1;
                    }else{
                        v.min = 0;
                    }
                    return v;
                }
                
                // create value axis
                var valueAxis = CreateValueAxis("#db66cd", 'pv', false, maxpv); // pv
                var valueAxis2 = CreateValueAxis('#6771dc', 'actpwr', false, maxess); // actpwr
                var valueAxis3 = CreateValueAxis('#5898ba', 'soc', true, 110); // soc

                function CreateSeries(data, colors, value, issoc){
                    var s;
                    if(issoc){
                        // soc 
                        s = chart.series.push(new am4charts.StepLineSeries());
                        s.fillOpacity = 0.1;
                        s.strokeWidth = 0.6;
                    }else{
                        // pv, actpwr
                        s = chart.series.push(new am4charts.LineSeries());
                        s.strokeWidth = 2;
                    }

                    s.dataFields.dateX = "date";
                    s.dataFields.valueY = data;

                    s.yAxis = value;
                    //s.xAxis = dateAxis;

                    s.tooltipText = "{valueY.value}";
                    s.fill = am4core.color(colors);
                    s.stroke = am4core.color(colors);
                    s.name = field[data];
                    s.zIndex = 999;
                    return s;
                }

                // activePower
                var series = CreateSeries('data1',"#db66cd", valueAxis, false);
                // pv
                var series2 = CreateSeries('data2',"#6771dc", valueAxis2, false);
                // soc
                var series3 = CreateSeries('data3',"#5898ba", valueAxis3, true);

                chart.cursor = new am4charts.XYCursor();
                chart.cursor.xAxis = dateAxis;

                // 차트 스크롤바
                var scrollbarX = new am4charts.XYChartScrollbar();
                // 스크롤바 시리즈
                scrollbarX.series.push(series);
                chart.scrollbarX = scrollbarX;
                // font 사이즈
                scrollbarX.fontSize = 18
                // 배경색
                scrollbarX.background.fill = am4core.color("#454545");
                // 투명도
                scrollbarX.background.fillOpacity = 0;

                // 차트 밖 영역으로 레전드 고정
                chart.legend = new am4charts.Legend();

                valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
                dateAxis.renderer.grid.template.strokeOpacity = 0.07;
                valueAxis.renderer.grid.template.strokeOpacity = 0.07;

                chart.events.on('appeared', () => {
                    
                    $nuxt.$emit('appeared', true)
                });

            }); // end am4core.ready()

        },
        setForcastData(data){
            
            var datediff = data.datediff
            var resp = data.data
            var chart = [];
            
            for (var i = 0; i < resp.length; i++) {
                var d = resp[i]
                var date = new Date(d.createts)

                if(this.category == 'rcc' || this.category == 'agg'){
                    var f = unitMW(d.forcast*1);
                    var pv = unitMW(Number(d.pvgen));
                }else{
                    var f = unitKW(d.forcast*1);
                    var pv = unitKW(Number(d.pvgen));
                }
                chart.push({
                    date : date,
                    forcast : f,
                    pv : pv,
                })
            }
            
            this.setChart(chart, datediff, data.facility)
        },
        setChart(data, datediff, facility){
            var grid = setgridDistance(datediff)

            if(this.category == 'rcc' || this.category == 'agg'){
                var maxpv = facility.pv/1000;
            }else{
                var maxpv = facility.pv;
            }
            
			am4core.ready(function() {
                // Themes begin
                am4core.useTheme(am4themes_dark);
                am4core.useTheme(am4themes_animated);
                am4core.options.commercialLicense = true;
                // Themes end
                // Create chart
                var chart = am4core.create("statisticsChart1", am4charts.XYChart);
                chart.fontSize = "1.3vh";
                chart.data = data;

                chart.language.locale = am4lang_ko_KR;
                chart.numberFormatter.language = new am4core.Language();
                chart.numberFormatter.language.locale = am4lang_ko_KR;
                chart.dateFormatter.language = new am4core.Language();
                chart.dateFormatter.language.locale = am4lang_ko_KR;
                

                var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                // 날짜 표기 단위(조회 일자마다 값이 달라지게 함 )
                dateAxis.renderer.minGridDistance = grid;
                // 날짜 표기 형식
                dateAxis.dateFormats.setKey("day", "[bold] MM/dd (eee)");
                // 'day'항목이 넘어갈때, 볼드 강조 
                dateAxis.periodChangeDateFormats.setKey("day", "[bold] MM/dd (eee)");
                // 날짜 표기 세로줄 두께 
                dateAxis.renderer.grid.template.strokeWidth = 4;
                // 날짜 표기 컬러
                dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                valueAxis.renderer.labels.template.fill = am4core.color("#787edb");
                valueAxis.renderer.minWidth = 60;
                valueAxis.min = 0
                valueAxis.max = maxpv

                var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.tooltip.disabled = true;
                valueAxis2.renderer.labels.template.fill = am4core.color("#db66cd");
                valueAxis2.min = 0;
                valueAxis2.max = maxpv

                var series = chart.series.push(new am4charts.LineSeries());
                series.name = "실제값(kW)";
                series.strokeWidth = 2;
                series.dataFields.dateX = "date";
                series.dataFields.valueY = "pv";
                series.tooltipText = "{valueY.value}";
                series.fill = am4core.color("#db66cd");
                series.stroke = am4core.color("#db66cd");

                var series2 = chart.series.push(new am4charts.LineSeries());
                series2.strokeDasharray = "5,4";
                series2.name = "예측값(kW)";
                series2.strokeWidth = 2;
                series2.dataFields.dateX = "date";
                series2.dataFields.valueY = "forcast";
                series2.tooltipText = "{valueY.value}";
                series2.fill = am4core.color("#787edb");
                series2.stroke = am4core.color("#787edb");

                chart.cursor = new am4charts.XYCursor();
                chart.cursor.xAxis = dateAxis;
                var scrollbarX = new am4charts.XYChartScrollbar();
                scrollbarX.series.push(series);
                chart.scrollbarX = scrollbarX;
                chart.legend = new am4charts.Legend();
                
                valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
                dateAxis.renderer.grid.template.strokeOpacity = 0.07;
                valueAxis.renderer.grid.template.strokeOpacity = 0.07;
			}); 
		},
        setMarketData(data){
            //
        },
        setcatecory(data){
            
            this.category = data;
          
        },
        setInstalledvalue(data){

            // console.log(data)

            // var pv = 0, ess = 0;
            
            // if(this.category == 'rcc' || this.category == 'agg'){
            //     pv = data.pv /1000
            //     ess = data.pcs /1000
            // }else{
            //     pv = data.pv
            //     ess = data.pcs
            // }
            // this.maxpv = pv + (pv * 0.1)
            // this.maxess= ess + (ess * 0.1)
       
        }, 
        setIsmartData(data){
            var chart = [];
            for(var i=0; i < data.length; i++){
                var d = data[i]
                var date = new Date(d.createts);
                chart.push({
                    date : date, 
                    chg : d.charge, 
                    dcg : d.discharge, 
                    onsitepower : d.sitepower, 
                    load : d.load
                })
            }
            this.setIsmartChart(chart);
        },
        setIsmartChart(data){

            
			am4core.ready(function() {
                // Themes begin
                am4core.useTheme(am4themes_dark);
                am4core.useTheme(am4themes_animated);
                am4core.options.commercialLicense = true;
                // Themes end
                // Create chart
                var chart = am4core.create("statisticsChart1", am4charts.XYChart);
                chart.fontSize = "1.3vh";
                chart.data = data;

                chart.language.locale = am4lang_ko_KR;
                chart.numberFormatter.language = new am4core.Language();
                chart.numberFormatter.language.locale = am4lang_ko_KR;
                chart.dateFormatter.language = new am4core.Language();
                chart.dateFormatter.language.locale = am4lang_ko_KR;
                

                var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                // 날짜 표기 단위(조회 일자마다 값이 달라지게 함 )
                dateAxis.renderer.minGridDistance = grid;
                // 날짜 표기 형식
                dateAxis.dateFormats.setKey("day", "[bold] MM/dd (eee)");
                // 'day'항목이 넘어갈때, 볼드 강조 
                dateAxis.periodChangeDateFormats.setKey("day", "[bold] MM/dd (eee)");
                // 날짜 표기 세로줄 두께 
                dateAxis.renderer.grid.template.strokeWidth = 4;
                // 날짜 표기 컬러
                dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                valueAxis.renderer.labels.template.fill = am4core.color("#787edb");
                valueAxis.renderer.minWidth = 60;

                var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.tooltip.disabled = true;
                valueAxis2.renderer.labels.template.fill = am4core.color("#db66cd");

                var series = chart.series.push(new am4charts.LineSeries());
                series.name = "실제값(kW)";
                series.strokeWidth = 2;
                series.dataFields.dateX = "date";
                series.dataFields.valueY = "pv";
                series.tooltipText = "{valueY.value}";
                series.fill = am4core.color("#db66cd");
                series.stroke = am4core.color("#db66cd");

                var series2 = chart.series.push(new am4charts.LineSeries());
                series2.strokeDasharray = "5,4";
                series2.name = "예측값(kW)";
                series2.strokeWidth = 2;
                series2.dataFields.dateX = "date";
                series2.dataFields.valueY = "forcast";
                series2.tooltipText = "{valueY.value}";
                series2.fill = am4core.color("#787edb");
                series2.stroke = am4core.color("#787edb");

                chart.cursor = new am4charts.XYCursor();
                chart.cursor.xAxis = dateAxis;
                var scrollbarX = new am4charts.XYChartScrollbar();
                scrollbarX.series.push(series);
                chart.scrollbarX = scrollbarX;
                chart.legend = new am4charts.Legend();
                
                valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
                dateAxis.renderer.grid.template.strokeOpacity = 0.07;
                valueAxis.renderer.grid.template.strokeOpacity = 0.07;
			}); 
        }
    },    
    mounted() {
      
        this.$nuxt.$on('category', data => {
            this.setcatecory(data)
        })

        this.$nuxt.$on('stat-equip',data=>{
            // 설비
            this.setEquipData(data)
        });

        this.$nuxt.$on('stat-forcast',data=>{
            // 예측
            this.setForcastData(data)
        });

        this.$nuxt.$on('stat-market',data=>{
            // 마켓
            this.setMarketData(data)
        });

        this.$nuxt.$on('stat-ismart', data => {
            this.setIsmartData(data);
        } )
    },
}
</script>
<style>
#statisticsChart1 {
  width: 100%;
  height: 78rem;
}


</style>