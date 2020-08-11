
// function drawCtrlDlg(canvasId)
// {
// 	 "use strict"; 

// 	var myCanvas = document.getElementById(canvasId);
// 	var ctx = myCanvas.getContext('2d');
// 	// ctx.drawImage(imgTrans1, 0, 0, 100, 100 ,auto);
// 	// transImg.src = strDataURI;

// 	var img = new Image();
// 	img.onload = function () {
// 			ctx.drawImage(img, 30, 45, this.width, this.height);
// 	}
// 	img.src = "/images/areaControl/transformer.png";

// 	var sw1 = new Image();
// 	sw1.src = "/images/areaControl/switch_off.png";
// 	sw1.onload = function(){
// 		ctx.drawImage(sw1, 220, 60, this.width, this.height);	
// 	}
	
// 	var sw2 = new Image();
// 	sw2.src = "/images/areaControl/switch_off.png";
// 	sw2.onload = function(){
// 		ctx.drawImage(sw2, 220, 180, this.width, this.height);	
// 	}

// 	var sw3 = new Image();
// 	sw3.src = "/images/areaControl/switch_off.png";
// 	sw3.onload = function(){
// 		ctx.drawImage(sw3, 220, 380, this.width, this.height);	
// 	}

// 	var sw4 = new Image();
// 	sw4.src = "/images/areaControl/switch_off.png";
// 	sw4.onload = function(){
// 		ctx.drawImage(sw4, 450, 180, this.width, this.height);	
// 	}

// 	var pcs = new Image();
// 	pcs.src = "/images/areaControl/pcs.png";
// 	pcs.onload= function(){
// 		ctx.drawImage(pcs, 220 - (this.width/4), 280, this.width, this.height);
// 	}

// 	var pv = new Image();
// 	pv.src = "/images/areaControl/pv.png";
// 	pv.onload = function(){
// 		ctx.drawImage(pv, 450 - (this.width/4), 280, this.width, this.height);
// 	}
	
// 	var battery = new Image();
// 	battery.src = "/images/areaControl/battery.png";
// 	battery.onload = function(){
// 		ctx.drawImage(battery, 220 - (this.width/4), 450, this.width, this.height);
// 	}

// 	var dataBox1 = new Image();
// 	dataBox1.src = "/images/areaControl/databox.png";
// 	dataBox1.onload = function(){
// 		var x = 80 - (this.width/4);
// 		var y = 200;
// 		ctx.drawImage(dataBox1, x, y, this.width, this.height);
// 		console.log("db1  x : "+ x + ",y : "+ y + ", w : " + this.width +", h : " + this.height);

// 		ctx.font = "13pt malgun gothic";
// 		ctx.textAlign = "center";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("유효출력",x + 60, y + 20);

// 		ctx.font = "19pt malgun gothic";
// 		ctx.textAlign = "right";
// 		ctx.fillStyle = "#6cd8ff";
// 		ctx.fillText("1234.5", x + 75, y + 55);

// 		ctx.font = "14pt malgun gothic";
// 		ctx.textAlign = "left";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("kW", x + 85, y + 53);

// }
// 	var dataBox2 = new Image();
// 	dataBox2.src = "/images/areaControl/databox.png";
// 	dataBox2.onload = function(){
// 		var x = 80 - (this.width/4);
// 		var y = 200 + this.height + 10;

// 		ctx.drawImage(dataBox2, x, y, this.width, this.height);
// 		console.log("db2  x : "+ x + ",y : "+ y + ", w : " + this.width +", h : " + this.height);
// 		ctx.font = "13pt malgun gothic";
// 		ctx.textAlign = "center";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("목표출력",x + 60, y + 20);

// 		ctx.font = "19pt malgun gothic";
// 		ctx.textAlign = "right";
// 		ctx.fillStyle = "#6cd8ff";
// 		ctx.fillText("1234.5", x + 75, y + 55);
// 		console.log('db2.loc.x = ' + (x + 75) + ", " + "db2.loc.y = " + (y + 55));

// 		ctx.font = "14pt malgun gothic";
// 		ctx.textAlign = "left";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("kW", x + 85, y + 53);
// 	}

// 	var dataBox3 = new Image();
// 	dataBox3.src = "/images/areaControl/databox.png";
// 	dataBox3.onload = function(){
// 		var x =  80 - (this.width/4);
// 		var y = 480;
// 		ctx.drawImage(dataBox3, x, y, this.width, this.height);
// 	console.log("db3  x : "+ x + ",y : "+ y + ", w : " + this.width +", h : " + this.height);
// 		ctx.font = "13pt bold malgun gothic";
// 		ctx.textAlign = "center";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("SOC",x + 60, y + 20);

// 		ctx.font = "19pt malgun gothic";
// 		ctx.textAlign = "right";
// 		ctx.fillStyle = "#6cd8ff";
// 		ctx.fillText("90.8", x + 75, y + 55);

// 		ctx.font = "14pt malgun gothic";
// 		ctx.textAlign = "left";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("%", x + 85, y + 53);
// 	}

// 	var dataBox4 = new Image();
// 	dataBox4.src = "/images/areaControl/databox.png";
// 	dataBox4.onload = function(){
// 		var x = 320 - (this.width/4);
// 		var y = 280;
		
// 		ctx.drawImage(dataBox4, x, y,this.width, this.height);
// 		console.log("db4  x : "+ x + ",y : "+ y + ", w : " + this.width +", h : " + this.height);
// 		ctx.font = "13pt malgun gothic";
// 		ctx.textAlign = "center";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("PV 발전량",x + 60, y + 20);

// 		ctx.font = "19pt malgun gothic";
// 		ctx.textAlign = "right";
// 		ctx.fillStyle = "#6cd8ff";
// 		ctx.fillText("1234.5", x + 75, y + 55);

// 		ctx.font = "14pt malgun gothic";
// 		ctx.textAlign = "left";
// 		ctx.fillStyle = "#a9abc5";
// 		ctx.fillText("kW", x + 85, y + 53);

// 	}

// 	ctx.beginPath();
// 	ctx.strokeStyle="#24BD41"; 
// 	ctx.moveTo(145, 67);
// 	ctx.lineTo(470, 67); 
// 	ctx.stroke();

// 	ctx.beginPath();
// 	ctx.strokeStyle="#24BD41"; 
// 	ctx.moveTo(220, 180);
// 	ctx.lineTo(458, 180); 
// 	ctx.lineTo(458, 280); 
// 	ctx.stroke();

// 	ctx.beginPath();
// 	ctx.strokeStyle="#24BD41"; 
// 	ctx.moveTo(227, 60);
// 	ctx.lineTo(227, 450); 
// 	ctx.lineTo(227, 480); 
// 	ctx.stroke();
	 
// }

// function drawBox(value, x, y){

// }


// function drawArrowhead(canvasId, from, to, radius) {
//   var myCanvas = document.getElementById(canvasId);
//   var context = myCanvas.getContext('2d');
//   var cnt = 30;
//   var points = [];
//   var diffLen = {x : Math.abs(from.x - to.x)/cnt, y : Math.abs(from.y - to.y)/cnt};
//   var x, y;
//   var angle;

//   for(var i = 0; i < cnt; i++)
//   {
//     points.push({x :from.x, y : from.y - (diffLen.y)*i})
//     console.log(points[i]);
//   }

// 	var x_center = to.x;
//   var y_center = to.y;
//   var pointIdx = 0;
 
//   setInterval(() =>{
//     context.clearRect(0,0,context.canvas.width, context.canvas.height);

//     context.beginPath();
//     context.fillStyle = "red"
//     x_center = points[pointIdx].x;
//     y_center = points[pointIdx].y;

//     angle = Math.atan2(to.y - from.y, to.x - from.x)
//     x = radius * Math.cos(angle) + x_center;
//     y = radius * Math.sin(angle) + y_center;

//     context.moveTo(x, y);

//     angle += (1.0/3.0) * (2 * Math.PI)
//     x = radius * Math.cos(angle) + x_center;
//     y = radius * Math.sin(angle) + y_center;

//     context.lineTo(x, y);

//     angle += (1.0/3.0) * (2 * Math.PI)
//     x = radius *Math.cos(angle) + x_center;
//     y = radius *Math.sin(angle) + y_center;

//     context.lineTo(x, y);

//     context.closePath();

//     context.fill();
//     pointIdx++;
//     if(pointIdx >= points.length)
//       pointIdx = 0;
//     // console.log('draw')

//   }, 80)
  
// }

// function runSenario1(){
//   var myCanvas = document.getElementById(canvasId);
//   var ctx = myCanvas.getContext('2d');
  
//   ctx.save();        

//   // move the rotation point to the center of the rect    
//   ctx.translate(ptArrow.x, ptArrow.y);        
//   // rotate the rect
//   ctx.rotate(angleInDegrees*Math.PI/180);

//   ctx.beginPath();
//   ctx.moveTo(0,0);
//   ctx.lineTo( 0, -arrow.h);
//   ctx.lineTo( arrow.w, 0);
//   ctx.lineTo( 0, +arrow.h);       
//   ctx.closePath();
//   ctx.fillStyle = "rgb(72,72,72)";
//   ctx.stroke();
//   ctx.fill();

//   // restore the context to its untranslated/unrotated state
//   canvasContext.restore();
// }

// function runSenario2(){

// }
// function runSenario3(){

// }
// function runSenario4(){

// }

// var requestAnimationFrame =  
//         window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         function(callback) {
//           return setTimeout(callback, 1);
//         };


// var line = d3.line()
// .x(function(d) { return x(d.date); })
// .y(function(d) { return y(d.close); }) 

var red = "/images/contents/icon_MCCB_red.png";
var green = "/images/contents/icon_MCCB_green.png";
var initsoc = "/images/common/bat_B_10.png"
var modepng = "/images/contents/temp.png";

function _setsoc(n)
{
    var s = "";
    if(n == 100){
        s = "10"
    }else if(n < 10){
        s = "01"
    }else{
        s = "0" + String(n).substring(0,1)
    }
    return s;
}

function setmcbbstat(pcs, pv)
{
    $("#svgcanvas").remove();

    var svg = d3.select('#diagram_img').append('svg')
        .attr("width",930).attr('id', 'svgcanvas')
        .attr("height",900);

    if(pcs == 1){
        // top-mcbb-switch
        svg.append("image")
        .attr("xlink:href",red)
        .attr("x",323).attr("y",63)
        .attr('id', 'mccb')
        .attr("width",17).attr("height",17);

        // pv1
        svg.append("image")
        .attr("x",619).attr("y",301)
        .attr("xlink:href",red)
        .attr('id', 'diagram-pv1')
        .attr("width",17).attr("height",17);

        // ac
        svg.append("image")
        .attr("x",323).attr("y",158)
        .attr("xlink:href",red)
        .attr('id', 'diagram-ac-1')
        .attr("width",17).attr("height",17);

        // dc 
        svg.append("image")
        .attr("x",323).attr("y",302.5)
        .attr("xlink:href",red)
        .attr('id', 'diagram-dc-1')
        .attr("width",17).attr("height",17);


        var soc = "/images/common/bat_B_10.png";
        svg.append("image")
        .attr("x",317).attr("y",350)
        .attr("xlink:href",soc)
        .attr('id', 'diagram-soc-1')
        .attr("width",28).attr("height",70);

       

    }else{
        svg.append("image")
        .attr("xlink:href",red)
        .attr("x",417).attr("y",63)
        .attr('id', 'mccb')
        .attr("width",17).attr("height",17);

        // pv1, pv2, pv3, pv4
        for(var i=0; i<pv; i++){
            svg.append("image")
            .attr("x",700).attr("y",151 + (75 * i))
            .attr("xlink:href",red)
            .attr('id', 'diagram-pv' + (i+1))
            .attr("width",17).attr("height",17);
        }

        for(var i = 0; i< pcs; i++){
            // ac
            svg.append("image")
            .attr("x",143  + (137 * i)).attr("y",158)
            .attr("xlink:href",green)
            .attr('id', 'diagram-ac-' + (i+1))
            .attr("width",17).attr("height",17);
            
            // dc 
            svg.append("image")
            .attr("x",143  + (137 * i)).attr("y",302.5)
            .attr("xlink:href",green)
            .attr('id', 'diagram-dc-' + (i+1))
            .attr("width",17).attr("height",17);
            
            // soc
            svg.append("image")
            .attr("x",137  + (137 * i)).attr("y",350)
            .attr("xlink:href",initsoc)
            .attr('id', 'diagram-soc-' + (i+1))
            .attr("width",28).attr("height",70);

        }
    }
}

function getDIList(siteid){
    var query = "SELECT * FROM mysql.peiu_account.`ContractorAssets` as asset LEFT JOIN mysql.peiuoperation.`EventMap` as map on asset.AssetType = map.devicetype and asset.FactoryCode = map.FactoryCode where asset.SiteId = " + siteid + " and asset.FactoryCode = 1 and asset.AssetType = 0 and asset.DeviceIndex = 1" 
    var pcs = _query(query)
   
    query = "SELECT * FROM mysql.peiu_account.`ContractorAssets` as asset LEFT JOIN mysql.peiuoperation.`EventMap` as map on asset.AssetType = map.devicetype and asset.FactoryCode = map.FactoryCode where asset.SiteId = " + siteid + " and asset.FactoryCode = 1 and asset.AssetType = 1 and asset.DeviceIndex = 1" 
    var bms = _query(query)

    var list = [];
    
    
    $("#status-pcs").children().remove();
    $("#status-pcs2").children().remove();
    $("#status-bms-warning").children().remove();
    $("#status-bms-warning2").children().remove();
    $("#status-bms-fault").children().remove();
    $("#status-bms-fault2").children().remove();


    var pcslist = new HashMap();
    batlist_warning = new HashMap();
    batlist_fault = new HashMap();
    for(var i = 0 ; i < pcs.length; i++){
        var t = pcs[i]
        pcslist.set(Number(t.eventcode), {name : t.name, bitflag :Number(t.bitflag), level : Number(t.level), groupcode : Number(t.groupcode)})
        
        
        var li = document.createElement('li')
        var title = document.createElement('span')
        title.setAttribute('name','eventcode-' + Number(t.eventcode))
        title.setAttribute('value','pcs-bitflag-' + Number(t.bitflag))
        title.setAttribute('class','ico_state')
        title.textContent = t.name
        li.append(title)
        $("#status-pcs").append(li)

    }

    var warning = [],  fault = [];
    var w = "";
    for(var i = 0 ; i < bms.length; i++){
        var t = bms[i]
        var f = {
            flag : false ,
            name : t.name, level : t.level,
            bitflag : t.bitflag,
            eventcode : Number(t.eventcode)
        }
        
        if(t.level < 4 ){
            warning.push(f)
            batlist_warning.set(Number(t.eventcode), {name : t.name, bitflag :Number(t.bitflag), level : Number(t.level), groupcode : Number(t.groupcode)})
        }else{
            fault.push(f)
            batlist_fault.set(Number(t.eventcode), {name : t.name, bitflag :Number(t.bitflag), level : Number(t.level), groupcode : Number(t.groupcode)})
        }
        
    }
    // bms warning
    for(var i =0; i< warning.length; i++){
        var t = warning[i]
        var li = document.createElement('li')
        var title = document.createElement('span')
        title.setAttribute('class','ico_state')
        title.textContent = warning[i].name
        title.setAttribute('name','bat-eventcode-' + Number(t.eventcode))
        title.setAttribute('value','bat-bitflag-' + Number(t.bitflag))
        title.setAttribute('class','ico_state')
        li.append(title)
        $("#status-bms-warning").append(li)
    }
    // bms fault
    for(var i =0; i< fault.length; i++){
        var li = document.createElement('li')
        var title = document.createElement('span')
    
        title.setAttribute('name','bat-eventcode-' + Number(t.eventcode))
        title.setAttribute('value','bat-bitflag-' + Number(t.bitflag))
        title.setAttribute('class','ico_state')
        title.textContent = fault[i].name

        li.append(title)
        if(i < 46){
            var w = $("#status-bms-fault")
        }else{
            var w = $("#status-bms-fault2")
        }
        w.append(li)
    }
    var faultlist = [];
    faultlist.push({
        'pcslist' : pcslist,
        'bmswarninglist' : batlist_warning,
        'bmsfaultlist' : batlist_fault
    })
    return faultlist;
    
}