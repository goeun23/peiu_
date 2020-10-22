<template>
	<div>
		 <svg
			xmlns:dc="http://purl.org/dc/elements/1.1/"
			xmlns:cc="http://creativecommons.org/ns#"
			xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
			xmlns:svg="http://www.w3.org/2000/svg"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
			xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
			width="529"
			height="666"
			version="1.1"
			id="areaControlDiagram"
		>
			<!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
			<g id="g861">
				<title id="title855">background</title>
				<rect fill="#131f2a" id="canvas_background" height="568" width="525" y="-1" x="-1"></rect>
				<g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
					<rect
						fill="url(#gridpattern)"
						stroke-width="0"
						y="0"
						x="0"
						height="100%"
						width="100%"
						id="rect858"
					></rect>
				</g>
			</g>
			<g id="g885">
				<title id="title863">Layer 1</title>

				<line
					stroke-linecap="undefined"
					stroke-linejoin="undefined"
					id="line3"
					y2="213.76924"
					x2="468.73074"
					y1="213"
					x1="204.11537"
					style="fill:none;stroke:#5fbf00;stroke-width:5.5"
				></line>
				<line
					stroke-linecap="undefined"
					stroke-linejoin="undefined"
					id="line2"
					y2="506.07693"
					x2="203.34613"
					y1="123.76923"
					x1="204.8846"
					style="fill:none;stroke:#5fbf00;stroke-width:5.5"
				></line>
				<line
					stroke-linecap="undefined"
					stroke-linejoin="undefined"
					id="line4"
					y2="318.99063"
					x2="471.03845"
					y1="214.53847"
					x1="471.03845"
					style="fill:none;stroke:#5fbf00;stroke-width:5.5"
				></line>
				<line
					stroke-linecap="undefined"
					stroke-linejoin="undefined"
					id="line1"
					y2="121"
					x2="493.53845"
					y1="123"
					x1="112"
					style="fill:none;stroke:#5fbf00;stroke-width:5.5"
				></line>

				<g id="animationGroup"></g>

				<image
					xlink:href="/images/areaControl/switch_off.png"
					id="sw3"
					height="19"
					width="19"
					y="412.5"
					x="196.34615"
				></image>
				<image
					xlink:href="/images/areaControl/switch_off.png"
					id="sw4"
					height="19"
					width="19"
					y="205.5"
					x="463"
				></image>
				<image
					xlink:href="/images/areaControl/switch_off.png"
					id="sw2"
					height="19"
					width="19"
					y="205.5"
					x="196.34615"
				></image>
				<image
					xlink:href="/images/areaControl/switch_off.png"
					id="sw1"
					height="19"
					width="19"
					y="115"
					x="196.34616"
				></image>
				<image
					xlink:href="/images/areaControl/pcs.png"
					id="pcs"
					height="91"
					width="125"
					y="305.96155"
					x="172"
				></image>
				<image
					xlink:href="/images/areaControl/transformer.png"
					id="transformer"
					height="66"
					width="101"
					y="88.461533"
					x="6.307693"
				></image>
				<image
					xlink:href="/images/areaControl/pv.png"
					id="pv"
					height="125"
					width="131"
					y="302.80768"
					x="429.76923"
				></image>
				<image
					xlink:href="/images/areaControl/battery.png"
					id="battery"
					height="145"
					width="174"
					y="497.42307"
					x="158.26923"
				></image>

				<g id="labelBox1">
					<image
						xlink:href="/images/areaControl/databox.png"
						id="dataBox1"
						height="82.538002"
						width="153.15385"
						y="195.69231"
						x="7.1538439"
					></image>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="219.92308"
						x="48.73077"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>{{ $t('areaControl.active_powerkW')}}</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="260.92308"
						x="117.73077"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>kW</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						id="value1"
						y="261.92308"
						x="104.73077"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:19px;font-family:Arvo, sans-serif;text-anchor:end;fill:#6cd8ff;stroke:#5fbf00;stroke-width:0"
					>-</text>
				</g>
				<g id="labelBox2">
					<image
						xlink:href="/images/areaControl/databox.png"
						id="dataBox2"
						height="82.538002"
						width="153.15385"
						y="287.23077"
						x="7.1538439"
					></image>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="312.23077"
						x="48.73077"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>{{ $t('areaControl.target_powerkW') }}</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="354.23077"
						x="117.73077"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>kW</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						id="value2"
						y="352.23077"
						x="104.73077"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:19px;font-family:Arvo, sans-serif;text-anchor:end;fill:#6cd8ff;stroke:#5fbf00;stroke-width:0"
					>-</text>
				</g>
				<g id="labelBox3">
					<image
						xlink:href="/images/areaControl/databox.png"
						id="dataBox3"
						height="82.538002"
						width="153.15385"
						y="518"
						x="12.538457"
					></image>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="544.53845"
						x="76.237183"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>SOC</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="586.53845"
						x="117.237183"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>%</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						id="value3"
						y="586.53845"
						x="104.237183"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:19px;font-family:Arvo, sans-serif;text-anchor:end;fill:#6cd8ff;stroke:#5fbf00;stroke-width:0"
					>-</text>
				</g>
				<g id="labelBox4">
					<image
						xlink:href="/images/areaControl/databox.png"
						id="dataBox4"
						height="82.538002"
						width="153.15385"
						y="287.23077"
						x="262.53845"
					></image>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="313.76923"
						x="298.11539"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>{{ $t('areaControl.pv_active_powerkW')}}</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						y="354.76923"
						x="367.11539"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:13px;font-family:Arvo, sans-serif;text-anchor:start;fill:#a9abc5;stroke:#5fbf00;stroke-width:0"
					>kW</text>
					<text
						font-weight="bold"
						xml:space="preserve"
						font-size="13"
						id="value4"
						y="355.76923"
						x="355.11539"
						fill-opacity="null"
						stroke-opacity="null"
						style="font-weight:bold;font-size:19px;font-family:Arvo, sans-serif;text-anchor:end;fill:#6cd8ff;stroke:#5fbf00;stroke-width:0"
					>-</text>
				</g>
			</g>
		</svg> 
	</div>
</template>
<script>
export default {
	layout: "areaCtrlDiagram",
	data() {
		return { interval: null };
	},
	methods: {
		// drawLine1 : function(){
		//   const context = d3.path();
		//   context.moveTo(205, 115);
		//   context.lineTo(205, 497);
		//   // context.arc(100, 100, 50, -0.5 * Math.PI, 0);
		//   // context.lineTo(150, 150);
		//   var animationLine = d3.select('svg#areaControlDiagram').select('#animationGroup').append('path')
		//     .attr('id', 'situation').attr('class','areaCtrlAnimation').attr('d', context.toString());
		//   var idx = 0;
		//   d3.select('.areaCtrlAnimation').attr('stroke','yellow').attr('stroke-width',5).attr('stroke-dasharray',20).attr('stroke-dashoffset',0);
		//   this.interval = setInterval(() => {
		//     d3.select('.areaCtrlAnimation').attr('stroke-dashoffset', idx)
		//      idx +=1;
		//   },15);
		// },
		// drawLine2 : function(){
		//   var idx = 0;
		//   const context = d3.path();
		//   context.moveTo(205, 115);
		//   context.lineTo(205, 497);
		//   context.moveTo(207, 213);
		//   context.lineTo(463, 213);
		//   context.moveTo(471, 208);
		//   context.lineTo(471, 350);
		//   // context.arc(100, 100, 50, -0.5 * Math.PI, 0);
		//   // context.lineTo(150, 150);
		//   var animationLine1 = d3.select('svg#areaControlDiagram').select('#animationGroup').append('path')
		//     .attr('id', 'situation').attr('class','areaCtrlAnimation').attr('d', context.toString());
		//  d3.select('.areaCtrlAnimation').attr('stroke','yellow').attr('stroke-width',5).attr('stroke-dasharray',20).attr('stroke-dashoffset',0);
		//   this.interval = setInterval(() => {
		//     d3.select('.areaCtrlAnimation').attr('stroke-dashoffset', idx)
		//      idx +=1;
		//   },15);
		// },
		// drawLine3 : function(){
		//   var idx = 0;
		//   const context = d3.path();
		//   context.moveTo(471, 208);
		//   context.lineTo(471, 350);
		//   context.moveTo(207, 213);
		//   context.lineTo(463, 213);
		//   context.moveTo(205, 497);
		//   context.lineTo(205, 205);
		//   var animationLine1 = d3.select('svg#areaControlDiagram').select('#animationGroup').append('path')
		//     .attr('id', 'situation').attr('class','areaCtrlAnimation').attr('d', context.toString());
		//  d3.select('.areaCtrlAnimation').attr('stroke','yellow').attr('stroke-width',5).attr('stroke-dasharray',20).attr('stroke-dashoffset',0);
		//   this.interval = setInterval(() => {
		//     d3.select('.areaCtrlAnimation').attr('stroke-dashoffset', idx)
		//      idx +=1;
		//   },15);
		// },
		// drawLine4 : function(){
		//    var idx = 0;
		//   const context = d3.path();
		//   context.moveTo(471, 208);
		//   context.lineTo(471, 350);
		//    context.moveTo(207, 213);
		//   context.lineTo(463, 213);
		//   context.moveTo(205, 115);
		//   context.lineTo(205, 205);
		//   var animationLine1 = d3.select('svg#areaControlDiagram').select('#animationGroup').append('path')
		//     .attr('id', 'situation').attr('class','areaCtrlAnimation').attr('d', context.toString());
		//   d3.select('.areaCtrlAnimation').attr('stroke','yellow').attr('stroke-width',5).attr('stroke-dasharray',20).attr('stroke-dashoffset',0);
		//   this.interval = setInterval(() => {
		//     d3.select('.areaCtrlAnimation').attr('stroke-dashoffset', idx)
		//      idx +=1;
		//   },15);
		// },
		// removePath : function(){
		//   clearInterval(this.interval);
		//   d3.select('path#situation').remove();
		// }
	},
	mounted() {
		// this.drawLine4();
		// setInterval(() =>{
		//   // var val4 = d3.select('value4');
		//   var random = Number((Math.random()*1000).toFixed(1));
		//   var val1 = d3.select('text#value1');
		//   var val2 = d3.select('text#value2');
		//   var val3 = d3.select('text#value3');
		//   var val4 = d3.select('text#value4');
		//   val1.text(random);
		//   val2.text(random);
		//   val3.text(random);
		//   val4.text(random);
		// },50);
		// this.drawLine2();
		// this.drawLine4();
		// setInterval(() => {
		//   var i = Number(((Math.random() * 10) /4).toFixed(0));
		//   this.removePath();
		//   // i = 0;
		//   switch(i){
		//     case 0 :
		//       this.drawLine1();
		//       break;
		//     case 1:
		//       this.drawLine2();
		//       break;
		//     case 2:
		//       this.drawLine3();
		//       break;
		//     default:
		//       this.drawLine4();
		//       break;
		//   }
		// },3000)
	}
};
</script>

<style>
.img-transformer {
	x: 30;
	y: 45;
}
.img-sw1 {
	x: 220;
	y: 60;
}
.img-sw2 {
	x: 220;
	y: 180;
}
.img-sw3 {
	x: 220;
	y: 380;
}
.img-sw4 {
	x: 450;
	y: 180;
}
.img-pcs {
	x: 191;
	y: 244;
}
.img-pv {
	x: 415;
	y: 245;
}
.img-battery {
	x: 186;
	y: 474;
}
</style>
