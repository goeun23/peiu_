var installedpcs;
var installedpv;

function getHourlyChartData(siteid, dCount){
    var send = "SELECT createts, activepower, pvgeneration, soc FROM mysql.peiuoperation.`vwMinuteMeasurements` where siteid = "+ siteid +"and createts >= date_add(now(), interval '-1' hour)"
    var data = _query(send)
    var chart =[];
    
    for(var i =0; i< data.length; i++){
        var d = data[i]
        chart.push({
            date : new Date(d.createts),
            actpwr : Number(d.activepower).toFixed(1),
            pv : Number(d.pvgeneration).toFixed(1),
            soc : Number(d.soc).toFixed(1)
        })
    }
    
    _settrendchartdata(chart, siteid,'areCtrlChart', dCount)
}
function _settrendchartdata(data,siteid, canvasId, dCount) {


    dCount = dCount[0]
           
    var maxpv = dCount.installedpv + (dCount.installedpv * 0.1);
    var maxess = dCount.installedpcs + (dCount.installedpcs *0.1);

    
    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    am4core.options.commercialLicense = true;

    // Create chart instance
    var chart = am4core.create(canvasId, am4charts.XYChart);
    chart.fontSize = "1.3vh";
    
    // Add data
    chart.data = data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    
    // x라벨 간격 
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("minute", "HH:mm");

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor(막기)
    chart.cursor = new am4charts.XYCursor();

    // prevent drag
    chart.cursor.behavior = "none";

    createAxisAndSeries("pv", "태양광발전(kWp)", "#db66cd", maxpv, 0);
    createAxisAndSeries("actpwr", "유효출력(kW)", "#6771dc", maxess, maxess*-1);
    createAxisAndSeries("soc", "SOC(%)", "#5898ba", 110, 0);

    function createAxisAndSeries(field, name, color, max, min) {

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        valueAxis.min = min;
        valueAxis.max = max;


        if(field == "soc"){
            var series = chart.series.push(new am4charts.StepLineSeries());
            series.fillOpacity = 0.1;
            series.strokeWidth = 0.6;
            
            // y축 우측정렬
            valueAxis.renderer.opposite = true;

        }else{
            
            // y축 좌측정렬
            valueAxis.renderer.opposite = false;
            var series = chart.series.push(new am4charts.LineSeries());
            series.strokeWidth = 2;
            valueAxis.renderer.labels.template.fill = am4core.color(color);
            
            series.zIndex = 9999;
            valueAxis.renderer.line.strokeOpacity = 0.5;
        }


        series.fill = am4core.color(color);
        series.stroke = am4core.color(color);
        
        // y축 기준
        series.dataFields.valueY = field;
        // x축 기준
        series.dataFields.dateX = "date";
        // y축 scale
        series.yAxis = valueAxis;
        // y축 title name
        //valueAxis.title.text = name;
        // 시리즈 이름 
        series.name = name;
        //series.tooltipText = "{dateX}: [bold]{valueY}[/]";
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.grid.template.disabled = true;
    }

    // // 현재시간으로 부터 1분 전까지의 데이터가 들어오기 때문에 현재 시간의 act, pv, soc를 add
    var query = "SELECT * FROM mysql.peiuoperation.`vwMinuteMeasurements` where createts = '" + getNow() + "' and siteid = "+ siteid;
    
    // 1분마다 실시간 업데이트
    
    interval = setInterval(function() {
    
        var resp = _query(query)[0]
        var now = new Date();
        chart.addData({ 
            date: Date.parse(now), 
            actpwr: Math.abs(resp.activepower).toFixed(1),
            soc : resp.soc,
            pv : resp.pvgeneration
        },1);
        
    },60000);
}); 
}
function summaryaccmData(siteid)
{
    // 금일 누적 발전 충전 방전
    var resp = _ajax('s', 'accmofmeasurement','site','yymmdd', siteid)

    if(resp == null || resp == undefined){
        return;
    }
    resp = resp[0];
  
    $("#daily-accum-pv").text(unitKW(resp.sumofpvgeneration))
    $("#daily-accum-chg").text(unitKW(Math.abs(resp.sumofcharge)))
    $("#daily-accum-dcg").text(unitKW(resp.sumofdischarge))

    var resp = _ajax('s', 'accmofmeasurement','site','yymm', siteid)
    if(resp == null || resp == undefined){
        return;
    }

    resp = resp[0];
    $("#monthly-accum-pv").text(unitMW(resp.sumofpvgeneration))
    $("#monthly-accum-chg").text(unitMW(Math.abs(resp.sumofcharge)))
    $("#monthly-accum-dcg").text(unitMW(resp.sumofdischarge))
}
function getWeatherStatus(siteid)
{
    var resp = _ajax('i', 'currentweather','site',null, siteid)
    if(resp == null || resp == undefined){
        return;
    }
    resp = resp[0]
    // 온도
    $("#weather-Temp").text(Number(resp.temp).toFixed(0)+"℃")
    // 습도
    $("#weather-Humidity").text(resp.humidity+"%")
    // 운량
    $("#weather-Clouds").text(resp.clouds+"%")

}

function getRevenueBySite(siteid)
{
    var resp = _ajax('s', 'accmofrevenue','site','yymmdd', siteid)
    
    if(resp == null || resp == undefined){
        return;
    }

    resp = resp[0]
   
    $("#dailyrevenue").text(unitWon(resp.sumofactualrevenue))
    var value = resp.sumofactualrevenue /10000
    _setprogressBar(DailyIncome,value)
    
    // 금월 수익금
    var d = new Date();
    
    var query = "SELECT sum(revenue) as revenue FROM mysql.peiuoperation.`DailyActualRevenue` where siteid = " +siteid+ " and year(createdt) = " + d.getFullYear() + " and month(createdt) = " + Number(d.getMonth()+1)
    var resp = _query(query)[0]
    
    if(resp == null || resp == undefined){
        return;
    }
    
    $("#accmofincome").text(unitWon(resp.revenue))
    value = resp.revenue /10000
    
    _setprogressBar(MothlyIncome,value)
}

function getEventBySite(siteid){
    var d = new Date();
    // 금일 
    var query = "SELECT count(*) as daily FROM mysql.peiuoperation.`EventRecord` where siteid = " + siteid + " and cast(createts as date) = current_date"
    var data = _query(query)

    _setprogressBar(DailyEvent, (data[0].daily/100))
    $("#dailyevent").text(data[0].daily);

    // 금월
    
    var query = "SELECT count(*) as monthly FROM mysql.peiuoperation.`EventRecord` where siteid = " + siteid +"  and year(createts) = " + d.getFullYear()+  " and month(createts) = " + Number(d.getMonth()+1);
    var data = _query(query)
    $("#monthlyevent").text(data[0].monthly);
    _setprogressBar(MonthlyEvent, (data[0].monthly/100))
}

function _setprogressBar(fn, value){
    if(value<1){
    fn(1)
    }
    else if(value > 100){
        fn(100)
    }else{
        fn(value);
    }
}

function DailyEvent(per){
    $("#evtBlue").css("width",per+"%");
    $("#evtBlue").css("background","#8066db");   
}
function MonthlyEvent(per){
    $("#evtRed").css("width",per+"%");
    $("#evtRed").css("background","#db66cd");
}
function DailyIncome(per){
  
    $("#wonBlue").css("width",per+"%");
    $("#wonBlue").css("background","#66b6db");
}
function MothlyIncome(per){
    $("#wonYellow").css("width",per+"%");
    $("#wonYellow").css("background","#8066db");
}


