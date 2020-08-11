// module "my-charts.js"
let area;
export function areaChart(tag) {
  area = Morris.Area({
    // element: 'morris-area-example',
    element: tag,
    data: [
      {
        y: "00",
        a: 100,
        b: 90
      },
      {
        y: "01",
        a: 75,
        b: 65
      },
      {
        y: "02",
        a: 50,
        b: 40
      },
      {
        y: "03",
        a: 75,
        b: 65
      },
      {
        y: "04",
        a: 50,
        b: 40
      },
      {
        y: "05",
        a: 75,
        b: 65
      },
      {
        y: "06",
        a: 100,
        b: 90
      },
      {
        y: "07",
        a: 100,
        b: 90
      },
      {
        y: "08",
        a: (Math.random() * 50).toFixed(0),
        b: (Math.random() * 50).toFixed(0)
      }
    ],
    xkey: "y",
    ykeys: ["a", "b"],
    //behaveLikeLine: true,
    labels: ["Series A", "Series B"],
    lineColors: [colors.danger, colors.warning],
    lineWidth: 2,
    pointSize: 4,
    pointFillColors: [colors.danger, colors.warning],
    pointStrokeColors: [colors.danger, colors.warning]
  });
  setInterval(update(), 1000);
  return area;
}
function update() {}
export default areaChart;
