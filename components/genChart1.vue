<template>
  <div id='chartDiv' class="chartDiv">
    <div id='chart1' class="chart-line chart-bar" /> 
  </div>
</template>

<script>
export default {
  layout: "getChart",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/css/map.css"
      },
      {
        rel: "stylesheet",
        href: "/css/chartist.min.css"
      },
      {
        rel: "stylesheet",
        href: "/css/jquery.jqplot.min.css"
      },
      {
        rel: " stylesheet",
        href: "/css/jquery-ui.min.css"
      }
    ],
    script: [
      {
        src: "/scripts/plugins/jquery.jqplot.min.js"
      },
      {
        src: "/scripts/plugins/jqplot.barRenderer.min.js"
      },
      {
        src: "/scripts/plugins/jqplot.highlighter.min.js"
      },
      {
        src: "/scripts/plugins/jqplot.cursor.min.js"
      },
      {
        src: "/scripts/plugins/jqplot.pointLabels.min.js"
      }
    ]
  },
  fetch() {},
  mounted() {
    setChart();
  }
};

function getData() {}

var plot1;
function setChart() {
  var s1 = [
    [2002, 112000],
    [2003, 122000],
    [2004, 104000],
    [2005, 99000],
    [2006, 121000],
    [2007, 148000],
    [2008, 114000],
    [2009, 133000],
    [2010, 161000],
    [2011, 173000]
  ];
  var s2 = [
    [2002, 10200],
    [2003, 10800],
    [2004, 11200],
    [2005, 11800],
    [2006, 12400],
    [2007, 12800],
    [2008, 13200],
    [2009, 12600],
    [2010, 13100]
  ];

  $(window).bind("resize", function(event, ui) {
    plot1.replot({ resetAxes: true });
  });

  plot1 = $.jqplot("chart1", [s2, s1], {
    // Turns on animatino for all series in this plot.
    // animate: true,
    // Will animate plot on calls to plot1.replot({resetAxes:true})
    animateReplot: true,
    cursor: {
      show: true,
      zoom: true,
      looseZoom: true,
      showTooltip: false
    },
    series: [
      {
        pointLabels: {
          show: true
        },
        renderer: $.jqplot.BarRenderer,
        showHighlight: false,
        yaxis: "y2axis",
        rendererOptions: {
          // Speed up the animation a little bit.
          // This is a number of milliseconds.
          // Default for bar series is 3000.
          animation: {
            speed: 2500
          },
          barWidth: 20,
          barPadding: -1,
          barMargin: 0,
          highlightMouseOver: false
        }
      },
      {
        rendererOptions: {
          // speed up the animation a little bit.
          // This is a number of milliseconds.
          // Default for a line series is 2500.
          animation: {
            speed: 2000
          }
        }
      }
    ],
    axesDefaults: {
      pad: 0
    },
    axes: {
      // These options will set up the x axis like a category axis.
      xaxis: {
        tickInterval: 1,
        drawMajorGridlines: false,
        drawMinorGridlines: true,
        drawMajorTickMarks: false,
        rendererOptions: {
          tickInset: 0.5,
          minorTicks: 1
        }
      },
      yaxis: {
        tickOptions: {
          formatString: "$%'d"
        },
        rendererOptions: {
          forceTickAt0: true
        }
      },
      y2axis: {
        tickOptions: {
          formatString: "$%'d"
        },
        rendererOptions: {
          // align the ticks on the y2 axis with the y axis.
          alignTicks: true,
          forceTickAt0: true
        }
      }
    },
    highlighter: {
      show: true,
      showLabel: true,
      tooltipAxes: "y",
      sizeAdjust: 7.5,
      tooltipLocation: "ne"
    }
  });
}

function getRandom() {
  return (Math.random() * 100).toFixed(0);
}
</script>


<style scoped>
.chartDiv {
  width: 100%;
  height: 250px;
  border: 1ps solid white;
  outline: greenyellow solid 1px;
}

.myChart-line {
  width: 100%;
  height: 250px;
  background-color: beige;
}
</style>
