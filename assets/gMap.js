var HashMap = require("hashmap");

const koreaLat = 36.28109102040759;
const koreaLng = 127.82043457031249;
const marketP = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "A4",
        area: "신일",
        local: "동서울(서울본부)",
        substation: "본부",
        Name: ""
      },
      geometry: {
        type: "Point",
        coordinates: [127.08263397216797, 37.540425948432734]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "A1",
        area: "신일",
        local: "동서울(서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [127.09576606750488, 37.54587032406914]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "A3",
        area: "신일",
        local: "동서울(서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [127.08718299865724, 37.53532148519354]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "A2",
        area: "신일",
        local: "동서울(서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [127.10280418395995, 37.54199124714955]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B5",
        area: "두마",
        local: "영등포(남서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.90170288085939, 37.52606450059144]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B2",
        area: "두마",
        local: "영등포(남서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.88762664794922, 37.5249753680482]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B3",
        area: "두마",
        local: "영등포(남서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.89183235168458, 37.51966561919912]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B6",
        area: "두마",
        local: "영등포(남서울본부)",
        "substation ": "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.90264701843262, 37.520618678869305]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B1",
        area: "두마",
        local: "영등포(남서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.89088821411133, 37.534708926123805]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B9",
        area: "두마",
        local: "영등포(남서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.91972732543945, 37.52579221894634]
      }
    },
    {
      type: "Feature",
      properties: {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        id: "B11",
        area: "두마",
        local: "영등포(남서울본부)",
        substation: "본부"
      },
      geometry: {
        type: "Point",
        coordinates: [126.93225860595703, 37.51959754304258]
      }
    }
  ]
};

let rccMap = new HashMap();
let rccLinkMap = new HashMap();

export function getRccGeoHashMap() {
  var id, lat, lng, name;
  marketP.features.forEach(function(item, i, array) {
    rccMap.set(item.properties.id, item.geometry.coordinates);
  });
  return rccMap;
}

export function initLink() {
  marketP.features.forEach(function(item, i, array) {});
}
export function getToLatLng(fromID) {
  var toInfo = rccMap.get(fromID);
}
export function getKoreaLatLng() {
  var loc = { lat: koreaLat, lng: koreaLng };
  return loc;
}
export function getMarketP() {
  return marketP;
}
export function getDRComboDiv() {
  var combo = document.createElement("div");
  combo.style.marginTop = "10px";

  var item = document.createElement("select");
  item.name = "drSelect";
  item.style.width = "100%";
  item.style.height = "39px";
  item.style.marginTop = "10px";
  item.style.marginLeft = "8px";
  item.style.fontSize = "14pt";
  item.style.textAlign = "center";
  item.style.border = "1px solid #ccc";

  var opt1 = document.createElement("option");
  opt1.value = "피크 DR";
  opt1.innerText = "피크 DR";

  var opt2 = document.createElement("option");
  opt2.value = "요금절감 DR";
  opt2.innerText = "요금절감 DR";

  var opt3 = document.createElement("option");
  opt3.value = "경제성 DR";
  opt3.innerText = "경제성 DR";

  var opt4 = document.createElement("option");
  opt4.value = "양뱡향 DR";
  opt4.innerText = "양뱡향 DR";

  item.appendChild(opt1);
  item.appendChild(opt2);
  item.appendChild(opt3);
  item.appendChild(opt4);

  combo.appendChild(item);
  return combo;
}
export function getEnergyTypeDiv() {
  var combo = document.createElement("div");
  combo.style.marginTop = "10px";

  var item = document.createElement("select");
  item.name = "drSelect";
  item.style.width = "100%";
  item.style.height = "39px";
  item.style.marginTop = "10px";
  item.style.marginLeft = "15px";
  item.style.fontSize = "14pt";
  item.style.textAlign = "center";
  item.style.border = "1px solid #ccc";

  var opt1 = document.createElement("option");
  opt1.value = "PV";
  opt1.innerText = "PV";

  var opt2 = document.createElement("option");
  opt2.value = "ESS";
  opt2.innerText = "ESS";

  var opt3 = document.createElement("option");
  opt3.value = "PV + ESS";
  opt3.innerText = "PV + ESS";

  item.appendChild(opt1);
  item.appendChild(opt2);
  item.appendChild(opt3);

  combo.appendChild(item);
  return combo;
}
export function getRTChart() {
  var demoContainer = document.createElement("div");
  demoContainer.style.backgroundColor = "#fff";
  demoContainer.style.border = "1px solid #ddd";
  demoContainer.style.borderRadius = "3px";
  demoContainer.style.boxShadow = "0 10x 6px rgba(0,0,0,.3)";
  demoContainer.style.cursor = "pointer";
  demoContainer.style.marginBottom = "20px";
  demoContainer.style.height = "115px";
  demoContainer.style.width = "1700px";
  demoContainer.style.opacity = "0.75";
  demoContainer.style.boxSizing = "border-box";

  var img = document.createElement("img");
  img.src = "/static/images/siren.png";

  var infoHolder = document.createElement("div");

  infoHolder.style.height = "100%";
  infoHolder.style.width = "400px";
  infoHolder.style.marginRight = "5px";
  infoHolder.style.fontSize = "15pt";
  infoHolder.style.cssFloat = "left";
  infoHolder.innerText = "피크감축DR 중...";
  infoHolder.appendChild(img);

  var placeholder = document.createElement("div");
  placeholder.id = "placeholder";
  placeholder.style.height = "100%";
  placeholder.style.width = "630px";
  placeholder.style.cssFloat = "left";
  plot = $.plot($(placeholder), [getRandomData1()], {
    series: {
      shadowSize: 0, // Drawing is faster without shadows
      color: "black"
    },
    yaxis: {
      min: 1,
      max: 130
    },
    xaxis: {
      show: true
    }
  });

  var placeholder2 = document.createElement("div");
  placeholder2.id = "placeholder2";
  placeholder2.style.height = "100%";
  placeholder2.style.width = "630px";
  placeholder2.style.cssFloat = "left";
  plot2 = $.plot($(placeholder2), [getRandomData2()], {
    series: {
      shadowSize: 0, // Drawing is faster without shadows
      color: "red"
    },

    yaxis: {
      min: 1,
      max: 120
    },
    xaxis: {
      show: true
    }
  });

  demoContainer.appendChild(infoHolder);
  demoContainer.appendChild(placeholder);
  demoContainer.appendChild(placeholder2);
  update();
  return demoContainer;
}
var plot;
var plot2;
var data = [],
  totalPoints = 30;

function getRandomData1() {
  if (data.length > 0) data = data.slice(1);

  // Do a random walk

  while (data.length < totalPoints) {
    var prev = data.length > 0 ? data[data.length - 1] : 30,
      y = prev + Math.random() * 10 - 5;

    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }
    //console.log('updating');
    data.push(y);
  }

  // Zip the generated y values with the x values

  var res = [];
  for (var i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }

  return res;
}
function getRandomData2() {
  if (data.length > 0) data = data.slice(1);
  var max = 100;
  var min = 0;
  // Do a random walk

  while (data.length < totalPoints) {
    var prev = data.length > 0 ? data[data.length - 1] : 30,
      // y = prev + Math.random()* Math.random() * 10 - 1;
      y = Math.floor(Math.random() * (max - min + 1)) + min;

    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }
    //console.log('updating');
    data.push(y);
  }

  // Zip the generated y values with the x values

  var res = [];
  for (var i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }

  return res;
}
function update() {
  plot.setData([getRandomData1()]);
  plot2.setData([getRandomData2()]);
  // Since the axes don't change, we don't need to call plot.setupGrid()

  plot.draw();
  plot2.draw();
  setTimeout(update, 100);
}
export function getRccLinkInfo() {
  return rccLink;
}
const rccLink = {
  "1": [
    {
      FromID: "E1",
      FromName: "가수원",
      ToID: "E5",
      ToName: "도마",
      FromToName: "가수원-도마"
    }
  ],
  "2": [
    {
      FromID: "E5",
      FromName: "도마",
      ToID: "E5",
      ToName: "도마",
      FromToName: "도마-도마"
    }
  ],
  "3": [
    {
      FromID: "E5",
      FromName: "도마",
      ToID: "E18",
      ToName: "흑석",
      FromToName: "도마-흑석"
    }
  ],
  "4": [
    {
      FromID: "E18",
      FromName: "흑석",
      ToID: "J4",
      ToName: "기성",
      FromToName: "흑석-기성"
    }
  ],
  "5": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "가장-수침#1"
    }
  ],
  "6": [
    {
      FromID: "E9",
      FromName: "수침#1",
      ToID: "E6",
      ToName: "변동",
      FromToName: "수침#1-변동"
    }
  ],
  "7": [
    {
      FromID: "E6",
      FromName: "변동",
      ToID: "E4",
      ToName: "대원",
      FromToName: "변동-대원"
    }
  ],
  "8": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "E16",
      ToName: "태평",
      FromToName: "대원-태평"
    }
  ],
  "9": [
    {
      FromID: "E16",
      FromName: "태평",
      ToID: "E17",
      ToName: "학연",
      FromToName: "태평-학연"
    }
  ],
  "10": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "C1",
      ToName: "삼부",
      FromToName: "학연-삼부"
    }
  ],
  "11": [
    {
      FromID: "E3",
      FromName: "갈마",
      ToID: "E16",
      ToName: "태평",
      FromToName: "갈마-태평"
    }
  ],
  "12": [
    {
      FromID: "E16",
      FromName: "태평",
      ToID: "E4",
      ToName: "대원",
      FromToName: "태평-대원"
    }
  ],
  "13": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "K5",
      ToName: "무정",
      FromToName: "대원-무정"
    }
  ],
  "14": [
    {
      FromID: "K5",
      FromName: "무정",
      ToID: "E17",
      ToName: "학연",
      FromToName: "무정-학연"
    }
  ],
  "15": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E12",
      ToName: "온천",
      FromToName: "학연-온천"
    }
  ],
  "16": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "E2",
      ToName: "가장",
      FromToName: "대원-가장"
    }
  ],
  "17": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E11",
      ToName: "쌍용",
      FromToName: "가장-쌍용"
    }
  ],
  "18": [
    {
      FromID: "E11",
      FromName: "쌍용",
      ToID: "E17",
      ToName: "학연",
      FromToName: "쌍용-학연"
    }
  ],
  "19": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E3",
      ToName: "갈마",
      FromToName: "학연-갈마"
    }
  ],
  "20": [
    {
      FromID: "E3",
      FromName: "갈마",
      ToID: "E10",
      ToName: "수침#2",
      FromToName: "갈마-수침#2"
    }
  ],
  "21": [
    {
      FromID: "E10",
      FromName: "수침#2",
      ToID: "K5",
      ToName: "무정",
      FromToName: "수침#2-무정"
    }
  ],
  "22": [
    {
      FromID: "K5",
      FromName: "무정",
      ToID: "G25",
      ToName: "행정",
      FromToName: "무정-행정"
    }
  ],
  "23": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "K11",
      ToName: "하나",
      FromToName: "행정-하나"
    }
  ],
  "24": [
    {
      FromID: "E5",
      FromName: "도마",
      ToID: "E18",
      ToName: "흑석",
      FromToName: "도마-흑석"
    }
  ],
  "25": [
    {
      FromID: "E18",
      FromName: "흑석",
      ToID: "E2",
      ToName: "가장",
      FromToName: "흑석-가장"
    }
  ],
  "26": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E11",
      ToName: "쌍용",
      FromToName: "가장-쌍용"
    }
  ],
  "27": [
    {
      FromID: "E11",
      FromName: "쌍용",
      ToID: "E17",
      ToName: "학연",
      FromToName: "쌍용-학연"
    }
  ],
  "28": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E3",
      ToName: "갈마",
      FromToName: "학연-갈마"
    }
  ],
  "29": [
    {
      FromID: "E6",
      FromName: "변동",
      ToID: "E2",
      ToName: "가장",
      FromToName: "변동-가장"
    }
  ],
  "30": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E5",
      ToName: "도마",
      FromToName: "가장-도마"
    }
  ],
  "31": [
    {
      FromID: "E5",
      FromName: "도마",
      ToID: "E15",
      ToName: "정림",
      FromToName: "도마-정림"
    }
  ],
  "32": [
    {
      FromID: "E7",
      FromName: "서북",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "서북-수침#1"
    }
  ],
  "33": [
    {
      FromID: "E9",
      FromName: "수침#1",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "수침#1-시청#2"
    }
  ],
  "34": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "G5",
      ToName: "도산",
      FromToName: "시청#2-도산"
    }
  ],
  "35": [
    {
      FromID: "G5",
      FromName: "도산",
      ToID: "G6",
      ToName: "동부",
      FromToName: "도산-동부"
    }
  ],
  "36": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "G9",
      ToName: "목련",
      FromToName: "동부-목련"
    }
  ],
  "37": [
    {
      FromID: "E8",
      FromName: "서원",
      ToID: "E18",
      ToName: "흑석",
      FromToName: "서원-흑석"
    }
  ],
  "38": [
    {
      FromID: "E18",
      FromName: "흑석",
      ToID: "J2",
      ToName: "관저",
      FromToName: "흑석-관저"
    }
  ],
  "39": [
    {
      FromID: "J2",
      FromName: "관저",
      ToID: "E15",
      ToName: "정림",
      FromToName: "관저-정림"
    }
  ],
  "40": [
    {
      FromID: "E15",
      FromName: "정림",
      ToID: "C2",
      ToName: "안영",
      FromToName: "정림-안영"
    }
  ],
  "41": [
    {
      FromID: "E9",
      FromName: "수침#1",
      ToID: "G5",
      ToName: "도산",
      FromToName: "수침#1-도산"
    }
  ],
  "42": [
    {
      FromID: "G5",
      FromName: "도산",
      ToID: "E7",
      ToName: "서북",
      FromToName: "도산-서북"
    }
  ],
  "43": [
    {
      FromID: "E7",
      FromName: "서북",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "서북-시청#2"
    }
  ],
  "44": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "E10",
      ToName: "수침#2",
      FromToName: "시청#2-수침#2"
    }
  ],
  "45": [
    {
      FromID: "E10",
      FromName: "수침#2",
      ToID: "E17",
      ToName: "학연",
      FromToName: "수침#2-학연"
    }
  ],
  "46": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E11",
      ToName: "쌍용",
      FromToName: "학연-쌍용"
    }
  ],
  "47": [
    {
      FromID: "E11",
      FromName: "쌍용",
      ToID: "E2",
      ToName: "가장",
      FromToName: "쌍용-가장"
    }
  ],
  "48": [
    {
      FromID: "E10",
      FromName: "수침#2",
      ToID: "E4",
      ToName: "대원",
      FromToName: "수침#2-대원"
    }
  ],
  "49": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "E17",
      ToName: "학연",
      FromToName: "대원-학연"
    }
  ],
  "50": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "G3",
      ToName: "계백",
      FromToName: "학연-계백"
    }
  ],
  "51": [
    {
      FromID: "G3",
      FromName: "계백",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "계백-수침#1"
    }
  ],
  "52": [
    {
      FromID: "E11",
      FromName: "쌍용",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "쌍용-수침#1"
    }
  ],
  "53": [
    {
      FromID: "E9",
      FromName: "수침#1",
      ToID: "E4",
      ToName: "대원",
      FromToName: "수침#1-대원"
    }
  ],
  "54": [
    {
      FromID: "E12",
      FromName: "온천",
      ToID: "E16",
      ToName: "태평",
      FromToName: "온천-태평"
    }
  ],
  "55": [
    {
      FromID: "E16",
      FromName: "태평",
      ToID: "E17",
      ToName: "학연",
      FromToName: "태평-학연"
    }
  ],
  "56": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E3",
      ToName: "갈마",
      FromToName: "학연-갈마"
    }
  ],
  "57": [
    {
      FromID: "E3",
      FromName: "갈마",
      ToID: "K6",
      ToName: "수연",
      FromToName: "갈마-수연"
    }
  ],
  "58": [
    {
      FromID: "K6",
      FromName: "수연",
      ToID: "G4",
      ToName: "대둔",
      FromToName: "수연-대둔"
    }
  ],
  "59": [
    {
      FromID: "E13",
      FromName: "용문",
      ToID: "E2",
      ToName: "가장",
      FromToName: "용문-가장"
    }
  ],
  "60": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E11",
      ToName: "쌍용",
      FromToName: "가장-쌍용"
    }
  ],
  "61": [
    {
      FromID: "E11",
      FromName: "쌍용",
      ToID: "E17",
      ToName: "학연",
      FromToName: "쌍용-학연"
    }
  ],
  "62": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E10",
      ToName: "수침#2",
      FromToName: "학연-수침#2"
    }
  ],
  "63": [
    {
      FromID: "E10",
      FromName: "수침#2",
      ToID: "G5",
      ToName: "도산",
      FromToName: "수침#2-도산"
    }
  ],
  "64": [
    {
      FromID: "G5",
      FromName: "도산",
      ToID: "E7",
      ToName: "서북",
      FromToName: "도산-서북"
    }
  ],
  "65": [
    {
      FromID: "E7",
      FromName: "서북",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "서북-시청#2"
    }
  ],
  "66": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "시청#2-수침#1"
    }
  ],
  "67": [
    {
      FromID: "E14",
      FromName: "유천",
      ToID: "E5",
      ToName: "도마",
      FromToName: "유천-도마"
    }
  ],
  "68": [
    {
      FromID: "E5",
      FromName: "도마",
      ToID: "C2",
      ToName: "안영",
      FromToName: "도마-안영"
    }
  ],
  "69": [
    {
      FromID: "C2",
      FromName: "안영",
      ToID: "E15",
      ToName: "정림",
      FromToName: "안영-정림"
    }
  ],
  "70": [
    {
      FromID: "E15",
      FromName: "정림",
      ToID: "E6",
      ToName: "변동",
      FromToName: "정림-변동"
    }
  ],
  "71": [
    {
      FromID: "E6",
      FromName: "변동",
      ToID: "E1",
      ToName: "가수원",
      FromToName: "변동-가수원"
    }
  ],
  "72": [
    {
      FromID: "E1",
      FromName: "가수원",
      ToID: "E18",
      ToName: "흑석",
      FromToName: "가수원-흑석"
    }
  ],
  "73": [
    {
      FromID: "E18",
      FromName: "흑석",
      ToID: "E14",
      ToName: "유천",
      FromToName: "흑석-유천"
    }
  ],
  "74": [
    {
      FromID: "E14",
      FromName: "유천",
      ToID: "E5",
      ToName: "도마",
      FromToName: "유천-도마"
    }
  ],
  "75": [
    {
      FromID: "E16",
      FromName: "태평",
      ToID: "E6",
      ToName: "변동",
      FromToName: "태평-변동"
    }
  ],
  "76": [
    {
      FromID: "E6",
      FromName: "변동",
      ToID: "E2",
      ToName: "가장",
      FromToName: "변동-가장"
    }
  ],
  "77": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E12",
      ToName: "온천",
      FromToName: "가장-온천"
    }
  ],
  "78": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "E2",
      ToName: "가장",
      FromToName: "학연-가장"
    }
  ],
  "79": [
    {
      FromID: "E2",
      FromName: "가장",
      ToID: "E4",
      ToName: "대원",
      FromToName: "가장-대원"
    }
  ],
  "80": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "E10",
      ToName: "수침#2",
      FromToName: "대원-수침#2"
    }
  ],
  "81": [
    {
      FromID: "E10",
      FromName: "수침#2",
      ToID: "E11",
      ToName: "쌍용",
      FromToName: "수침#2-쌍용"
    }
  ],
  "82": [
    {
      FromID: "E11",
      FromName: "쌍용",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "쌍용-수침#1"
    }
  ],
  "83": [
    {
      FromID: "E9",
      FromName: "수침#1",
      ToID: "E3",
      ToName: "갈마",
      FromToName: "수침#1-갈마"
    }
  ],
  "84": [
    {
      FromID: "E3",
      FromName: "갈마",
      ToID: "E12",
      ToName: "온천",
      FromToName: "갈마-온천"
    }
  ],
  "85": [
    {
      FromID: "E12",
      FromName: "온천",
      ToID: "G8",
      ToName: "둔유",
      FromToName: "온천-둔유"
    }
  ],
  "86": [
    {
      FromID: "E18",
      FromName: "흑석",
      ToID: "E5",
      ToName: "도마",
      FromToName: "흑석-도마"
    }
  ],
  "87": [
    {
      FromID: "E5",
      FromName: "도마",
      ToID: "E1",
      ToName: "가수원",
      FromToName: "도마-가수원"
    }
  ],
  "88": [
    {
      FromID: "E1",
      FromName: "가수원",
      ToID: "E8",
      ToName: "서원",
      FromToName: "가수원-서원"
    }
  ],
  "89": [
    {
      FromID: "E8",
      FromName: "서원",
      ToID: "J4",
      ToName: "기성",
      FromToName: "서원-기성"
    }
  ],
  "90": [
    {
      FromID: "J4",
      FromName: "기성",
      ToID: "E15",
      ToName: "정림",
      FromToName: "기성-정림"
    }
  ],
  "91": [
    {
      FromID: "G1",
      FromName: "갑천",
      ToID: "G20",
      ToName: "청사#3",
      FromToName: "갑천-청사#3"
    }
  ],
  "92": [
    {
      FromID: "G3",
      FromName: "계백",
      ToID: "E10",
      ToName: "수침#2",
      FromToName: "계백-수침#2"
    }
  ],
  "93": [
    {
      FromID: "G4",
      FromName: "대둔",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "대둔-공단#2"
    }
  ],
  "94": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "공단#2-삼천#2"
    }
  ],
  "95": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "G14",
      ToName: "월평",
      FromToName: "삼천#2-월평"
    }
  ],
  "96": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "K6",
      ToName: "수연",
      FromToName: "월평-수연"
    }
  ],
  "97": [
    {
      FromID: "K6",
      FromName: "수연",
      ToID: "L17",
      ToName: "장대",
      FromToName: "수연-장대"
    }
  ],
  "98": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "G8",
      ToName: "둔유",
      FromToName: "장대-둔유"
    }
  ],
  "99": [
    {
      FromID: "G8",
      FromName: "둔유",
      ToID: "E12",
      ToName: "온천",
      FromToName: "둔유-온천"
    }
  ],
  "100": [
    {
      FromID: "E12",
      FromName: "온천",
      ToID: "K6",
      ToName: "수연",
      FromToName: "온천-수연"
    }
  ],
  "101": [
    {
      FromID: "G5",
      FromName: "도산",
      ToID: "G12",
      ToName: "수정",
      FromToName: "도산-수정"
    }
  ],
  "102": [
    {
      FromID: "G12",
      FromName: "수정",
      ToID: "E7",
      ToName: "서북",
      FromToName: "수정-서북"
    }
  ],
  "103": [
    {
      FromID: "E7",
      FromName: "서북",
      ToID: "G23",
      ToName: "크로바",
      FromToName: "서북-크로바"
    }
  ],
  "104": [
    {
      FromID: "G23",
      FromName: "크로바",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "크로바-수침#1"
    }
  ],
  "105": [
    {
      FromID: "E9",
      FromName: "수침#1",
      ToID: "G9",
      ToName: "목련",
      FromToName: "수침#1-목련"
    }
  ],
  "106": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "동부-수자원"
    }
  ],
  "107": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "K7",
      ToName: "시청#1",
      FromToName: "수자원-시청#1"
    }
  ],
  "108": [
    {
      FromID: "K7",
      FromName: "시청#1",
      ToID: "G25",
      ToName: "행정",
      FromToName: "시청#1-행정"
    }
  ],
  "109": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G9",
      ToName: "목련",
      FromToName: "행정-목련"
    }
  ],
  "110": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "목련-강변#2"
    }
  ],
  "111": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "강변#2-공단#2"
    }
  ],
  "112": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G24",
      ToName: "한신",
      FromToName: "공단#2-한신"
    }
  ],
  "113": [
    {
      FromID: "G24",
      FromName: "한신",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "한신-시청#2"
    }
  ],
  "114": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "E7",
      ToName: "서북",
      FromToName: "시청#2-서북"
    }
  ],
  "115": [
    {
      FromID: "G7",
      FromName: "둔산",
      ToID: "G14",
      ToName: "월평",
      FromToName: "둔산-월평"
    }
  ],
  "116": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "K11",
      ToName: "하나",
      FromToName: "월평-하나"
    }
  ],
  "117": [
    {
      FromID: "G8",
      FromName: "둔유",
      ToID: "G26",
      ToName: "황실",
      FromToName: "둔유-황실"
    }
  ],
  "118": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "F5",
      ToName: "봉명",
      FromToName: "황실-봉명"
    }
  ],
  "119": [
    {
      FromID: "F5",
      FromName: "봉명",
      ToID: "L17",
      ToName: "장대",
      FromToName: "봉명-장대"
    }
  ],
  "120": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "E17",
      ToName: "학연",
      FromToName: "장대-학연"
    }
  ],
  "121": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "G4",
      ToName: "대둔",
      FromToName: "학연-대둔"
    }
  ],
  "122": [
    {
      FromID: "G4",
      FromName: "대둔",
      ToID: "L17",
      ToName: "장대",
      FromToName: "대둔-장대"
    }
  ],
  "123": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "G17",
      ToName: "주공",
      FromToName: "장대-주공"
    }
  ],
  "124": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "G5",
      ToName: "도산",
      FromToName: "목련-도산"
    }
  ],
  "125": [
    {
      FromID: "G5",
      FromName: "도산",
      ToID: "G12",
      ToName: "수정",
      FromToName: "도산-수정"
    }
  ],
  "126": [
    {
      FromID: "G12",
      FromName: "수정",
      ToID: "G6",
      ToName: "동부",
      FromToName: "수정-동부"
    }
  ],
  "127": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "G23",
      ToName: "크로바",
      FromToName: "동부-크로바"
    }
  ],
  "128": [
    {
      FromID: "G23",
      FromName: "크로바",
      ToID: "K7",
      ToName: "시청#1",
      FromToName: "크로바-시청#1"
    }
  ],
  "129": [
    {
      FromID: "K7",
      FromName: "시청#1",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "시청#1-시청#2"
    }
  ],
  "130": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "G25",
      ToName: "행정",
      FromToName: "시청#2-행정"
    }
  ],
  "131": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "E7",
      ToName: "서북",
      FromToName: "행정-서북"
    }
  ],
  "132": [
    {
      FromID: "G10",
      FromName: "문예",
      ToID: "G26",
      ToName: "황실",
      FromToName: "문예-황실"
    }
  ],
  "133": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "F6",
      ToName: "삼천#1",
      FromToName: "황실-삼천#1"
    }
  ],
  "134": [
    {
      FromID: "F6",
      FromName: "삼천#1",
      ToID: "F16",
      ToName: "예술",
      FromToName: "삼천#1-예술"
    }
  ],
  "135": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "예술-공단#2"
    }
  ],
  "136": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "공단#2-삼천#2"
    }
  ],
  "137": [
    {
      FromID: "G12",
      FromName: "수정",
      ToID: "G22",
      ToName: "충청",
      FromToName: "수정-충청"
    }
  ],
  "138": [
    {
      FromID: "G22",
      FromName: "충청",
      ToID: "G5",
      ToName: "도산",
      FromToName: "충청-도산"
    }
  ],
  "139": [
    {
      FromID: "G5",
      FromName: "도산",
      ToID: "G23",
      ToName: "크로바",
      FromToName: "도산-크로바"
    }
  ],
  "140": [
    {
      FromID: "G23",
      FromName: "크로바",
      ToID: "G9",
      ToName: "목련",
      FromToName: "크로바-목련"
    }
  ],
  "141": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "G26",
      ToName: "황실",
      FromToName: "월평-황실"
    }
  ],
  "142": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "G17",
      ToName: "주공",
      FromToName: "황실-주공"
    }
  ],
  "143": [
    {
      FromID: "G17",
      FromName: "주공",
      ToID: "K6",
      ToName: "수연",
      FromToName: "주공-수연"
    }
  ],
  "144": [
    {
      FromID: "K6",
      FromName: "수연",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "수연-삼천#2"
    }
  ],
  "145": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "K11",
      ToName: "하나",
      FromToName: "삼천#2-하나"
    }
  ],
  "146": [
    {
      FromID: "K11",
      FromName: "하나",
      ToID: "K3",
      ToName: "동백#1",
      FromToName: "하나-동백#1"
    }
  ],
  "147": [
    {
      FromID: "K3",
      FromName: "동백#1",
      ToID: "G7",
      ToName: "둔산",
      FromToName: "동백#1-둔산"
    }
  ],
  "148": [
    {
      FromID: "G7",
      FromName: "둔산",
      ToID: "G25",
      ToName: "행정",
      FromToName: "둔산-행정"
    }
  ],
  "149": [
    {
      FromID: "L22",
      FromName: "유성",
      ToID: "L3",
      ToName: "구암",
      FromToName: "유성-구암"
    }
  ],
  "150": [
    {
      FromID: "L3",
      FromName: "구암",
      ToID: "L19",
      ToName: "하기",
      FromToName: "구암-하기"
    }
  ],
  "151": [
    {
      FromID: "L19",
      FromName: "하기",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "하기-계룡"
    }
  ],
  "152": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "L11",
      ToName: "신도#1",
      FromToName: "계룡-신도#1"
    }
  ],
  "153": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "신도#1-덕명"
    }
  ],
  "154": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "L9",
      ToName: "반석",
      FromToName: "덕명-반석"
    }
  ],
  "155": [
    {
      FromID: "L9",
      FromName: "반석",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "반석-연단#2"
    }
  ],
  "156": [
    {
      FromID: "G16",
      FromName: "을지",
      ToID: "F16",
      ToName: "예술",
      FromToName: "을지-예술"
    }
  ],
  "157": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "F17",
      ToName: "전민",
      FromToName: "예술-전민"
    }
  ],
  "158": [
    {
      FromID: "G17",
      FromName: "주공",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "주공-삼천#2"
    }
  ],
  "159": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "G8",
      ToName: "둔유",
      FromToName: "삼천#2-둔유"
    }
  ],
  "160": [
    {
      FromID: "G8",
      FromName: "둔유",
      ToID: "L8",
      ToName: "상대",
      FromToName: "둔유-상대"
    }
  ],
  "161": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "L17",
      ToName: "장대",
      FromToName: "상대-장대"
    }
  ],
  "162": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "E17",
      ToName: "학연",
      FromToName: "장대-학연"
    }
  ],
  "163": [
    {
      FromID: "E17",
      FromName: "학연",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "학연-계룡"
    }
  ],
  "164": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "L15",
      ToName: "이수",
      FromToName: "계룡-이수"
    }
  ],
  "165": [
    {
      FromID: "G19",
      FromName: "청사#2",
      ToID: "G20",
      ToName: "청사#3",
      FromToName: "청사#2-청사#3"
    }
  ],
  "166": [
    {
      FromID: "G20",
      FromName: "청사#3",
      ToID: "G1",
      ToName: "갑천",
      FromToName: "청사#3-갑천"
    }
  ],
  "167": [
    {
      FromID: "G1",
      FromName: "갑천",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "갑천-공단#2"
    }
  ],
  "168": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G19",
      ToName: "청사#2",
      FromToName: "공단#2-청사#2"
    }
  ],
  "169": [
    {
      FromID: "G20",
      FromName: "청사#3",
      ToID: "G1",
      ToName: "갑천",
      FromToName: "청사#3-갑천"
    }
  ],
  "170": [
    {
      FromID: "G1",
      FromName: "갑천",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "갑천-공단#2"
    }
  ],
  "171": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G19",
      ToName: "청사#2",
      FromToName: "공단#2-청사#2"
    }
  ],
  "172": [
    {
      FromID: "G22",
      FromName: "충청",
      ToID: "G12",
      ToName: "수정",
      FromToName: "충청-수정"
    }
  ],
  "173": [
    {
      FromID: "G12",
      FromName: "수정",
      ToID: "G26",
      ToName: "황실",
      FromToName: "수정-황실"
    }
  ],
  "174": [
    {
      FromID: "G23",
      FromName: "크로바",
      ToID: "G9",
      ToName: "목련",
      FromToName: "크로바-목련"
    }
  ],
  "175": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "G24",
      ToName: "한신",
      FromToName: "목련-한신"
    }
  ],
  "176": [
    {
      FromID: "G24",
      FromName: "한신",
      ToID: "K2",
      ToName: "대우",
      FromToName: "한신-대우"
    }
  ],
  "177": [
    {
      FromID: "K2",
      FromName: "대우",
      ToID: "G12",
      ToName: "수정",
      FromToName: "대우-수정"
    }
  ],
  "178": [
    {
      FromID: "G12",
      FromName: "수정",
      ToID: "G5",
      ToName: "도산",
      FromToName: "수정-도산"
    }
  ],
  "179": [
    {
      FromID: "G24",
      FromName: "한신",
      ToID: "D2",
      ToName: "공단",
      FromToName: "한신-공단"
    }
  ],
  "180": [
    {
      FromID: "D2",
      FromName: "공단",
      ToID: "G23",
      ToName: "크로바",
      FromToName: "공단-크로바"
    }
  ],
  "181": [
    {
      FromID: "G23",
      FromName: "크로바",
      ToID: "G25",
      ToName: "행정",
      FromToName: "크로바-행정"
    }
  ],
  "182": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "K2",
      ToName: "대우",
      FromToName: "행정-대우"
    }
  ],
  "183": [
    {
      FromID: "K2",
      FromName: "대우",
      ToID: "G6",
      ToName: "동부",
      FromToName: "대우-동부"
    }
  ],
  "184": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G26",
      ToName: "황실",
      FromToName: "행정-황실"
    }
  ],
  "185": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "G14",
      ToName: "월평",
      FromToName: "황실-월평"
    }
  ],
  "186": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "K2",
      ToName: "대우",
      FromToName: "월평-대우"
    }
  ],
  "187": [
    {
      FromID: "K2",
      FromName: "대우",
      ToID: "F16",
      ToName: "예술",
      FromToName: "대우-예술"
    }
  ],
  "188": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "G24",
      ToName: "한신",
      FromToName: "예술-한신"
    }
  ],
  "189": [
    {
      FromID: "G24",
      FromName: "한신",
      ToID: "K7",
      ToName: "시청#1",
      FromToName: "한신-시청#1"
    }
  ],
  "190": [
    {
      FromID: "K7",
      FromName: "시청#1",
      ToID: "K11",
      ToName: "하나",
      FromToName: "시청#1-하나"
    }
  ],
  "191": [
    {
      FromID: "K11",
      FromName: "하나",
      ToID: "E4",
      ToName: "대원",
      FromToName: "하나-대원"
    }
  ],
  "192": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "K1",
      ToName: "녹원",
      FromToName: "대원-녹원"
    }
  ],
  "193": [
    {
      FromID: "K1",
      FromName: "녹원",
      ToID: "G6",
      ToName: "동부",
      FromToName: "녹원-동부"
    }
  ],
  "194": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "G9",
      ToName: "목련",
      FromToName: "동부-목련"
    }
  ],
  "195": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "목련-시청#2"
    }
  ],
  "196": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "F14",
      ToName: "연서",
      FromToName: "황실-연서"
    }
  ],
  "197": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "연서-공단#2"
    }
  ],
  "198": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G11",
      ToName: "선사",
      FromToName: "공단#2-선사"
    }
  ],
  "199": [
    {
      FromID: "G11",
      FromName: "선사",
      ToID: "F16",
      ToName: "예술",
      FromToName: "선사-예술"
    }
  ],
  "200": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "G22",
      ToName: "충청",
      FromToName: "예술-충청"
    }
  ],
  "201": [
    {
      FromID: "G22",
      FromName: "충청",
      ToID: "G25",
      ToName: "행정",
      FromToName: "충청-행정"
    }
  ],
  "202": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G12",
      ToName: "수정",
      FromToName: "행정-수정"
    }
  ],
  "203": [
    {
      FromID: "G12",
      FromName: "수정",
      ToID: "G10",
      ToName: "문예",
      FromToName: "수정-문예"
    }
  ],
  "204": [
    {
      FromID: "G10",
      FromName: "문예",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "문예-공단#2"
    }
  ],
  "205": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G14",
      ToName: "월평",
      FromToName: "공단#2-월평"
    }
  ],
  "206": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "월평-삼천#2"
    }
  ],
  "207": [
    {
      FromID: "K4",
      FromName: "동백#2",
      ToID: "K3",
      ToName: "동백#1",
      FromToName: "동백#2-동백#1"
    }
  ],
  "208": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "E7",
      ToName: "서북",
      FromToName: "시청#2-서북"
    }
  ],
  "209": [
    {
      FromID: "E7",
      FromName: "서북",
      ToID: "G25",
      ToName: "행정",
      FromToName: "서북-행정"
    }
  ],
  "210": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G9",
      ToName: "목련",
      FromToName: "행정-목련"
    }
  ],
  "211": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "목련-수침#1"
    }
  ],
  "212": [
    {
      FromID: "G29",
      FromName: "한통#2",
      ToID: "K12",
      ToName: "한통#1",
      FromToName: "한통#2-한통#1"
    }
  ],
  "213": [
    {
      FromID: "H1",
      FromName: "강변#1",
      ToID: "I3",
      ToName: "동화",
      FromToName: "강변#1-동화"
    }
  ],
  "214": [
    {
      FromID: "I3",
      FromName: "동화",
      ToID: "I1",
      ToName: "관평",
      FromToName: "동화-관평"
    }
  ],
  "215": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "관평-강변#2"
    }
  ],
  "216": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "I14",
      ToName: "평산",
      FromToName: "강변#2-평산"
    }
  ],
  "217": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "H1",
      ToName: "강변#1",
      FromToName: "강변#2-강변#1"
    }
  ],
  "218": [
    {
      FromID: "H1",
      FromName: "강변#1",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "강변#1-덕진"
    }
  ],
  "219": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "덕진-공단#2"
    }
  ],
  "220": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "D6",
      ToName: "연구원#2",
      FromToName: "공단#2-연구원#2"
    }
  ],
  "221": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "연구원#2-수자원"
    }
  ],
  "222": [
    {
      FromID: "H3",
      FromName: "금님",
      ToID: "H10",
      ToName: "대평",
      FromToName: "금님-대평"
    }
  ],
  "223": [
    {
      FromID: "H10",
      FromName: "대평",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "대평-삼공#2"
    }
  ],
  "224": [
    {
      FromID: "H4",
      FromName: "기병",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "기병-덕진"
    }
  ],
  "225": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "H18",
      ToName: "자운#2",
      FromToName: "덕진-자운#2"
    }
  ],
  "226": [
    {
      FromID: "H18",
      FromName: "자운#2",
      ToID: "H17",
      ToName: "자운#1",
      FromToName: "자운#2-자운#1"
    }
  ],
  "227": [
    {
      FromID: "H5",
      FromName: "기연",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "기연-공단#2"
    }
  ],
  "228": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "공단#2-대덕#2"
    }
  ],
  "229": [
    {
      FromID: "H6",
      FromName: "기초",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "기초-수자원"
    }
  ],
  "230": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "수자원-삼천#2"
    }
  ],
  "231": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "H21",
      ToName: "항공",
      FromToName: "삼천#2-항공"
    }
  ],
  "232": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "대덕#1-대덕#2"
    }
  ],
  "233": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "F15",
      ToName: "연중",
      FromToName: "대덕#2-연중"
    }
  ],
  "234": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "H19",
      ToName: "한국타이어",
      FromToName: "연중-한국타이어"
    }
  ],
  "235": [
    {
      FromID: "H19",
      FromName: "한국타이어",
      ToID: "H22",
      ToName: "해양",
      FromToName: "한국타이어-해양"
    }
  ],
  "236": [
    {
      FromID: "H22",
      FromName: "해양",
      ToID: "H20",
      ToName: "한일합성",
      FromToName: "해양-한일합성"
    }
  ],
  "237": [
    {
      FromID: "H20",
      FromName: "한일합성",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "한일합성-덕진"
    }
  ],
  "238": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "H21",
      ToName: "항공",
      FromToName: "덕진-항공"
    }
  ],
  "239": [
    {
      FromID: "H21",
      FromName: "항공",
      ToID: "F18",
      ToName: "전자",
      FromToName: "항공-전자"
    }
  ],
  "240": [
    {
      FromID: "F18",
      FromName: "전자",
      ToID: "F1",
      ToName: "공단#1",
      FromToName: "전자-공단#1"
    }
  ],
  "241": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "대덕#2-대덕#1"
    }
  ],
  "242": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "F15",
      ToName: "연중",
      FromToName: "대덕#1-연중"
    }
  ],
  "243": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "연중-공단#2"
    }
  ],
  "244": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "H5",
      ToName: "기연",
      FromToName: "공단#2-기연"
    }
  ],
  "245": [
    {
      FromID: "H5",
      FromName: "기연",
      ToID: "F10",
      ToName: "연구원#1",
      FromToName: "기연-연구원#1"
    }
  ],
  "246": [
    {
      FromID: "F10",
      FromName: "연구원#1",
      ToID: "D6",
      ToName: "연구원#2",
      FromToName: "연구원#1-연구원#2"
    }
  ],
  "247": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "연구원#2-엘지#2"
    }
  ],
  "248": [
    {
      FromID: "F9",
      FromName: "엘지#2",
      ToID: "H11",
      ToName: "덕공",
      FromToName: "엘지#2-덕공"
    }
  ],
  "249": [
    {
      FromID: "H11",
      FromName: "덕공",
      ToID: "H20",
      ToName: "한일합성",
      FromToName: "덕공-한일합성"
    }
  ],
  "250": [
    {
      FromID: "H9",
      FromName: "신성",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "신성-홍명"
    }
  ],
  "251": [
    {
      FromID: "H10",
      FromName: "대평",
      ToID: "I1",
      ToName: "관평",
      FromToName: "대평-관평"
    }
  ],
  "252": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "H1",
      ToName: "강변#1",
      FromToName: "관평-강변#1"
    }
  ],
  "253": [
    {
      FromID: "H1",
      FromName: "강변#1",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "강변#1-강변#2"
    }
  ],
  "254": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "강변#2-덕진"
    }
  ],
  "255": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "H3",
      ToName: "금님",
      FromToName: "덕진-금님"
    }
  ],
  "256": [
    {
      FromID: "H3",
      FromName: "금님",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "금님-삼공#2"
    }
  ],
  "257": [
    {
      FromID: "H11",
      FromName: "덕공",
      ToID: "D2",
      ToName: "공단",
      FromToName: "덕공-공단"
    }
  ],
  "258": [
    {
      FromID: "D2",
      FromName: "공단",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "공단-엘지#2"
    }
  ],
  "259": [
    {
      FromID: "F9",
      FromName: "엘지#2",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "엘지#2-대덕#2"
    }
  ],
  "260": [
    {
      FromID: "H12",
      FromName: "덕유",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "덕유-덕진"
    }
  ],
  "261": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "덕진-연단#2"
    }
  ],
  "262": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "연단#2-덕명"
    }
  ],
  "263": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "덕명-계룡"
    }
  ],
  "264": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "J10",
      ToName: "유통",
      FromToName: "계룡-유통"
    }
  ],
  "265": [
    {
      FromID: "J10",
      FromName: "유통",
      ToID: "L15",
      ToName: "이수",
      FromToName: "유통-이수"
    }
  ],
  "266": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "덕진-강변#2"
    }
  ],
  "267": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "H10",
      ToName: "대평",
      FromToName: "강변#2-대평"
    }
  ],
  "268": [
    {
      FromID: "H10",
      FromName: "대평",
      ToID: "H22",
      ToName: "해양",
      FromToName: "대평-해양"
    }
  ],
  "269": [
    {
      FromID: "H22",
      FromName: "해양",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "해양-수자원"
    }
  ],
  "270": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "H18",
      ToName: "자운#2",
      FromToName: "수자원-자운#2"
    }
  ],
  "271": [
    {
      FromID: "H18",
      FromName: "자운#2",
      ToID: "H4",
      ToName: "기병",
      FromToName: "자운#2-기병"
    }
  ],
  "272": [
    {
      FromID: "H4",
      FromName: "기병",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "기병-대덕#1"
    }
  ],
  "273": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "대덕#1-연단#2"
    }
  ],
  "274": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "I13",
      ToName: "테크노",
      FromToName: "삼공#1-테크노"
    }
  ],
  "275": [
    {
      FromID: "I13",
      FromName: "테크노",
      ToID: "I8",
      ToName: "용신",
      FromToName: "테크노-용신"
    }
  ],
  "276": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I2",
      ToName: "광명",
      FromToName: "용신-광명"
    }
  ],
  "277": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "I14",
      ToName: "평산",
      FromToName: "광명-평산"
    }
  ],
  "278": [
    {
      FromID: "I14",
      FromName: "평산",
      ToID: "H16",
      ToName: "에너지",
      FromToName: "평산-에너지"
    }
  ],
  "279": [
    {
      FromID: "H16",
      FromName: "에너지",
      ToID: "A4",
      ToName: "삼양#1",
      FromToName: "에너지-삼양#1"
    }
  ],
  "280": [
    {
      FromID: "A4",
      FromName: "삼양#1",
      ToID: "I11",
      ToName: "첨단",
      FromToName: "삼양#1-첨단"
    }
  ],
  "281": [
    {
      FromID: "I11",
      FromName: "첨단",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "첨단-탑립"
    }
  ],
  "282": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "I4",
      ToName: "송공",
      FromToName: "탑립-송공"
    }
  ],
  "283": [
    {
      FromID: "H15",
      FromName: "삼공#2",
      ToID: "H10",
      ToName: "대평",
      FromToName: "삼공#2-대평"
    }
  ],
  "284": [
    {
      FromID: "H10",
      FromName: "대평",
      ToID: "A2",
      ToName: "공사#2",
      FromToName: "대평-공사#2"
    }
  ],
  "285": [
    {
      FromID: "A2",
      FromName: "공사#2",
      ToID: "A3",
      ToName: "삼공 ",
      FromToName: "공사#2-삼공 "
    }
  ],
  "286": [
    {
      FromID: "A3",
      FromName: "삼공 ",
      ToID: "A1",
      ToName: "공사#1",
      FromToName: "삼공 -공사#1"
    }
  ],
  "287": [
    {
      FromID: "A1",
      FromName: "공사#1",
      ToID: "C3",
      ToName: "월산",
      FromToName: "공사#1-월산"
    }
  ],
  "288": [
    {
      FromID: "H16",
      FromName: "에너지",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "에너지-삼공#1"
    }
  ],
  "289": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "I14",
      ToName: "평산",
      FromToName: "삼공#1-평산"
    }
  ],
  "290": [
    {
      FromID: "H17",
      FromName: "자운#1",
      ToID: "H4",
      ToName: "기병",
      FromToName: "자운#1-기병"
    }
  ],
  "291": [
    {
      FromID: "H4",
      FromName: "기병",
      ToID: "H18",
      ToName: "자운#2",
      FromToName: "기병-자운#2"
    }
  ],
  "292": [
    {
      FromID: "H18",
      FromName: "자운#2",
      ToID: "H17",
      ToName: "자운#1",
      FromToName: "자운#2-자운#1"
    }
  ],
  "293": [
    {
      FromID: "H17",
      FromName: "자운#1",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "자운#1-덕진"
    }
  ],
  "294": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "H4",
      ToName: "기병",
      FromToName: "덕진-기병"
    }
  ],
  "295": [
    {
      FromID: "H4",
      FromName: "기병",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "기병-홍명"
    }
  ],
  "296": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "L16",
      ToName: "유진",
      FromToName: "홍명-유진"
    }
  ],
  "297": [
    {
      FromID: "H19",
      FromName: "한국타이어",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "한국타이어-홍명"
    }
  ],
  "298": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "홍명-대덕#1"
    }
  ],
  "299": [
    {
      FromID: "H20",
      FromName: "한일합성",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "한일합성-대덕#1"
    }
  ],
  "300": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "대덕#1-수자원"
    }
  ],
  "301": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "수자원-대덕#2"
    }
  ],
  "302": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "대덕#2-덕진"
    }
  ],
  "303": [
    {
      FromID: "H21",
      FromName: "항공",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "항공-덕진"
    }
  ],
  "304": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "덕진-홍명"
    }
  ],
  "305": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "홍명-대덕#1"
    }
  ],
  "306": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "F18",
      ToName: "전자",
      FromToName: "대덕#1-전자"
    }
  ],
  "307": [
    {
      FromID: "F18",
      FromName: "전자",
      ToID: "H6",
      ToName: "기초",
      FromToName: "전자-기초"
    }
  ],
  "308": [
    {
      FromID: "H6",
      FromName: "기초",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "기초-홍명"
    }
  ],
  "309": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "F5",
      ToName: "봉명",
      FromToName: "홍명-봉명"
    }
  ],
  "310": [
    {
      FromID: "H22",
      FromName: "해양",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "해양-대덕#1"
    }
  ],
  "311": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "대덕#1-덕진"
    }
  ],
  "312": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "H20",
      ToName: "한일합성",
      FromToName: "수자원-한일합성"
    }
  ],
  "313": [
    {
      FromID: "H20",
      FromName: "한일합성",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "한일합성-덕진"
    }
  ],
  "314": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "F4",
      ToName: "문지",
      FromToName: "덕진-문지"
    }
  ],
  "315": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "문지-강변#2"
    }
  ],
  "316": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "F17",
      ToName: "전민",
      FromToName: "강변#2-전민"
    }
  ],
  "317": [
    {
      FromID: "F17",
      FromName: "전민",
      ToID: "G6",
      ToName: "동부",
      FromToName: "전민-동부"
    }
  ],
  "318": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "G26",
      ToName: "황실",
      FromToName: "동부-황실"
    }
  ],
  "319": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "황실-삼천#2"
    }
  ],
  "320": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "H6",
      ToName: "기초",
      FromToName: "삼천#2-기초"
    }
  ],
  "321": [
    {
      FromID: "J1",
      FromName: "건양",
      ToID: "J3",
      ToName: "구봉",
      FromToName: "건양-구봉"
    }
  ],
  "322": [
    {
      FromID: "J3",
      FromName: "구봉",
      ToID: "J4",
      ToName: "기성",
      FromToName: "구봉-기성"
    }
  ],
  "323": [
    {
      FromID: "J2",
      FromName: "관저",
      ToID: "E8",
      ToName: "서원",
      FromToName: "관저-서원"
    }
  ],
  "324": [
    {
      FromID: "E8",
      FromName: "서원",
      ToID: "B2",
      ToName: "두계",
      FromToName: "서원-두계"
    }
  ],
  "325": [
    {
      FromID: "B2",
      FromName: "두계",
      ToID: "J9",
      ToName: "원내",
      FromToName: "두계-원내"
    }
  ],
  "326": [
    {
      FromID: "J3",
      FromName: "구봉",
      ToID: "J7",
      ToName: "신선",
      FromToName: "구봉-신선"
    }
  ],
  "327": [
    {
      FromID: "J7",
      FromName: "신선",
      ToID: "J5",
      ToName: "동방",
      FromToName: "신선-동방"
    }
  ],
  "328": [
    {
      FromID: "J5",
      FromName: "동방",
      ToID: "J1",
      ToName: "건양",
      FromToName: "동방-건양"
    }
  ],
  "329": [
    {
      FromID: "J1",
      FromName: "건양",
      ToID: "J4",
      ToName: "기성",
      FromToName: "건양-기성"
    }
  ],
  "330": [
    {
      FromID: "J4",
      FromName: "기성",
      ToID: "J12",
      ToName: "진흥",
      FromToName: "기성-진흥"
    }
  ],
  "331": [
    {
      FromID: "J12",
      FromName: "진흥",
      ToID: "J1",
      ToName: "건양",
      FromToName: "진흥-건양"
    }
  ],
  "332": [
    {
      FromID: "J1",
      FromName: "건양",
      ToID: "J3",
      ToName: "구봉",
      FromToName: "건양-구봉"
    }
  ],
  "333": [
    {
      FromID: "J3",
      FromName: "구봉",
      ToID: "E1",
      ToName: "가수원",
      FromToName: "구봉-가수원"
    }
  ],
  "334": [
    {
      FromID: "E1",
      FromName: "가수원",
      ToID: "E18",
      ToName: "흑석",
      FromToName: "가수원-흑석"
    }
  ],
  "335": [
    {
      FromID: "E18",
      FromName: "흑석",
      ToID: "J9",
      ToName: "원내",
      FromToName: "흑석-원내"
    }
  ],
  "336": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "B6",
      ToName: "엄사#1",
      FromToName: "원내-엄사#1"
    }
  ],
  "337": [
    {
      FromID: "B6",
      FromName: "엄사#1",
      ToID: "B2",
      ToName: "두계",
      FromToName: "엄사#1-두계"
    }
  ],
  "338": [
    {
      FromID: "J5",
      FromName: "동방",
      ToID: "J3",
      ToName: "구봉",
      FromToName: "동방-구봉"
    }
  ],
  "339": [
    {
      FromID: "J3",
      FromName: "구봉",
      ToID: "J7",
      ToName: "신선",
      FromToName: "구봉-신선"
    }
  ],
  "340": [
    {
      FromID: "J6",
      FromName: "신남#2",
      ToID: "L8",
      ToName: "상대",
      FromToName: "신남#2-상대"
    }
  ],
  "341": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "J13",
      ToName: "천변",
      FromToName: "상대-천변"
    }
  ],
  "342": [
    {
      FromID: "J13",
      FromName: "천변",
      ToID: "J8",
      ToName: "신유#1",
      FromToName: "천변-신유#1"
    }
  ],
  "343": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "J12",
      ToName: "진흥",
      FromToName: "신유#1-진흥"
    }
  ],
  "344": [
    {
      FromID: "J12",
      FromName: "진흥",
      ToID: "J10",
      ToName: "유통",
      FromToName: "진흥-유통"
    }
  ],
  "345": [
    {
      FromID: "J10",
      FromName: "유통",
      ToID: "J9",
      ToName: "원내",
      FromToName: "유통-원내"
    }
  ],
  "346": [
    {
      FromID: "J7",
      FromName: "신선",
      ToID: "J3",
      ToName: "구봉",
      FromToName: "신선-구봉"
    }
  ],
  "347": [
    {
      FromID: "J3",
      FromName: "구봉",
      ToID: "J5",
      ToName: "동방",
      FromToName: "구봉-동방"
    }
  ],
  "348": [
    {
      FromID: "J5",
      FromName: "동방",
      ToID: "J9",
      ToName: "원내",
      FromToName: "동방-원내"
    }
  ],
  "349": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "J12",
      ToName: "진흥",
      FromToName: "원내-진흥"
    }
  ],
  "350": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "J13",
      ToName: "천변",
      FromToName: "신유#1-천변"
    }
  ],
  "351": [
    {
      FromID: "J13",
      FromName: "천변",
      ToID: "L8",
      ToName: "상대",
      FromToName: "천변-상대"
    }
  ],
  "352": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "L11",
      ToName: "신도#1",
      FromToName: "상대-신도#1"
    }
  ],
  "353": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "L12",
      ToName: "신도#2",
      FromToName: "신도#1-신도#2"
    }
  ],
  "354": [
    {
      FromID: "L12",
      FromName: "신도#2",
      ToID: "J11",
      ToName: "진잠",
      FromToName: "신도#2-진잠"
    }
  ],
  "355": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "J11",
      ToName: "진잠",
      FromToName: "원내-진잠"
    }
  ],
  "356": [
    {
      FromID: "J11",
      FromName: "진잠",
      ToID: "J7",
      ToName: "신선",
      FromToName: "진잠-신선"
    }
  ],
  "357": [
    {
      FromID: "J7",
      FromName: "신선",
      ToID: "J12",
      ToName: "진흥",
      FromToName: "신선-진흥"
    }
  ],
  "358": [
    {
      FromID: "J12",
      FromName: "진흥",
      ToID: "J10",
      ToName: "유통",
      FromToName: "진흥-유통"
    }
  ],
  "359": [
    {
      FromID: "J10",
      FromName: "유통",
      ToID: "J2",
      ToName: "관저",
      FromToName: "유통-관저"
    }
  ],
  "360": [
    {
      FromID: "J2",
      FromName: "관저",
      ToID: "J4",
      ToName: "기성",
      FromToName: "관저-기성"
    }
  ],
  "361": [
    {
      FromID: "J4",
      FromName: "기성",
      ToID: "B5",
      ToName: "아파트",
      FromToName: "기성-아파트"
    }
  ],
  "362": [
    {
      FromID: "J10",
      FromName: "유통",
      ToID: "J11",
      ToName: "진잠",
      FromToName: "유통-진잠"
    }
  ],
  "363": [
    {
      FromID: "J11",
      FromName: "진잠",
      ToID: "J9",
      ToName: "원내",
      FromToName: "진잠-원내"
    }
  ],
  "364": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "H12",
      ToName: "덕유",
      FromToName: "원내-덕유"
    }
  ],
  "365": [
    {
      FromID: "J11",
      FromName: "진잠",
      ToID: "J10",
      ToName: "유통",
      FromToName: "진잠-유통"
    }
  ],
  "366": [
    {
      FromID: "J10",
      FromName: "유통",
      ToID: "J9",
      ToName: "원내",
      FromToName: "유통-원내"
    }
  ],
  "367": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "L8",
      ToName: "상대",
      FromToName: "원내-상대"
    }
  ],
  "368": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "J8",
      ToName: "신유#1",
      FromToName: "상대-신유#1"
    }
  ],
  "369": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "J13",
      ToName: "천변",
      FromToName: "신유#1-천변"
    }
  ],
  "370": [
    {
      FromID: "J13",
      FromName: "천변",
      ToID: "J6",
      ToName: "신남#2",
      FromToName: "천변-신남#2"
    }
  ],
  "371": [
    {
      FromID: "J6",
      FromName: "신남#2",
      ToID: "J12",
      ToName: "진흥",
      FromToName: "신남#2-진흥"
    }
  ],
  "372": [
    {
      FromID: "J12",
      FromName: "진흥",
      ToID: "J9",
      ToName: "원내",
      FromToName: "진흥-원내"
    }
  ],
  "373": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "J7",
      ToName: "신선",
      FromToName: "원내-신선"
    }
  ],
  "374": [
    {
      FromID: "J7",
      FromName: "신선",
      ToID: "J4",
      ToName: "기성",
      FromToName: "신선-기성"
    }
  ],
  "375": [
    {
      FromID: "J4",
      FromName: "기성",
      ToID: "J2",
      ToName: "관저",
      FromToName: "기성-관저"
    }
  ],
  "376": [
    {
      FromID: "J2",
      FromName: "관저",
      ToID: "J11",
      ToName: "진잠",
      FromToName: "관저-진잠"
    }
  ],
  "377": [
    {
      FromID: "J13",
      FromName: "천변",
      ToID: "J11",
      ToName: "진잠",
      FromToName: "천변-진잠"
    }
  ],
  "378": [
    {
      FromID: "J11",
      FromName: "진잠",
      ToID: "J8",
      ToName: "신유#1",
      FromToName: "진잠-신유#1"
    }
  ],
  "379": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "L8",
      ToName: "상대",
      FromToName: "신유#1-상대"
    }
  ],
  "380": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "L12",
      ToName: "신도#2",
      FromToName: "상대-신도#2"
    }
  ],
  "381": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "L11",
      ToName: "신도#1",
      FromToName: "계룡-신도#1"
    }
  ],
  "382": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "신도#1-연단#2"
    }
  ],
  "383": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "H12",
      ToName: "덕유",
      FromToName: "연단#2-덕유"
    }
  ],
  "384": [
    {
      FromID: "H12",
      FromName: "덕유",
      ToID: "L15",
      ToName: "이수",
      FromToName: "덕유-이수"
    }
  ],
  "385": [
    {
      FromID: "L15",
      FromName: "이수",
      ToID: "G17",
      ToName: "주공",
      FromToName: "이수-주공"
    }
  ],
  "386": [
    {
      FromID: "L3",
      FromName: "구암",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "구암-연단#2"
    }
  ],
  "387": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "L22",
      ToName: "유성",
      FromToName: "연단#2-유성"
    }
  ],
  "388": [
    {
      FromID: "L22",
      FromName: "유성",
      ToID: "L7",
      ToName: "밀다원",
      FromToName: "유성-밀다원"
    }
  ],
  "389": [
    {
      FromID: "L7",
      FromName: "밀다원",
      ToID: "L19",
      ToName: "하기",
      FromToName: "밀다원-하기"
    }
  ],
  "390": [
    {
      FromID: "L19",
      FromName: "하기",
      ToID: "L4",
      ToName: "노은",
      FromToName: "하기-노은"
    }
  ],
  "391": [
    {
      FromID: "L4",
      FromName: "노은",
      ToID: "L18",
      ToName: "중앙",
      FromToName: "노은-중앙"
    }
  ],
  "392": [
    {
      FromID: "L4",
      FromName: "노은",
      ToID: "L3",
      ToName: "구암",
      FromToName: "노은-구암"
    }
  ],
  "393": [
    {
      FromID: "L5",
      FromName: "농수",
      ToID: "L18",
      ToName: "중앙",
      FromToName: "농수-중앙"
    }
  ],
  "394": [
    {
      FromID: "L18",
      FromName: "중앙",
      ToID: "L14",
      ToName: "월드",
      FromToName: "중앙-월드"
    }
  ],
  "395": [
    {
      FromID: "L14",
      FromName: "월드",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "월드-덕명"
    }
  ],
  "396": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "B3",
      ToName: "두서",
      FromToName: "덕명-두서"
    }
  ],
  "397": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "L5",
      ToName: "농수",
      FromToName: "덕명-농수"
    }
  ],
  "398": [
    {
      FromID: "L5",
      FromName: "농수",
      ToID: "H12",
      ToName: "덕유",
      FromToName: "농수-덕유"
    }
  ],
  "399": [
    {
      FromID: "H12",
      FromName: "덕유",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "덕유-연단#2"
    }
  ],
  "400": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "L18",
      ToName: "중앙",
      FromToName: "연단#2-중앙"
    }
  ],
  "401": [
    {
      FromID: "L18",
      FromName: "중앙",
      ToID: "L5",
      ToName: "농수",
      FromToName: "중앙-농수"
    }
  ],
  "402": [
    {
      FromID: "L5",
      FromName: "농수",
      ToID: "L15",
      ToName: "이수",
      FromToName: "농수-이수"
    }
  ],
  "403": [
    {
      FromID: "L7",
      FromName: "밀다원",
      ToID: "L3",
      ToName: "구암",
      FromToName: "밀다원-구암"
    }
  ],
  "404": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "G17",
      ToName: "주공",
      FromToName: "상대-주공"
    }
  ],
  "405": [
    {
      FromID: "G17",
      FromName: "주공",
      ToID: "L12",
      ToName: "신도#2",
      FromToName: "주공-신도#2"
    }
  ],
  "406": [
    {
      FromID: "L12",
      FromName: "신도#2",
      ToID: "L11",
      ToName: "신도#1",
      FromToName: "신도#2-신도#1"
    }
  ],
  "407": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "J11",
      ToName: "진잠",
      FromToName: "신도#1-진잠"
    }
  ],
  "408": [
    {
      FromID: "J11",
      FromName: "진잠",
      ToID: "J8",
      ToName: "신유#1",
      FromToName: "진잠-신유#1"
    }
  ],
  "409": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "J13",
      ToName: "천변",
      FromToName: "신유#1-천변"
    }
  ],
  "410": [
    {
      FromID: "L9",
      FromName: "반석",
      ToID: "L19",
      ToName: "하기",
      FromToName: "반석-하기"
    }
  ],
  "411": [
    {
      FromID: "L19",
      FromName: "하기",
      ToID: "L22",
      ToName: "유성",
      FromToName: "하기-유성"
    }
  ],
  "412": [
    {
      FromID: "L22",
      FromName: "유성",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "유성-연단#2"
    }
  ],
  "413": [
    {
      FromID: "L10",
      FromName: "수통",
      ToID: "L20",
      ToName: "학하",
      FromToName: "수통-학하"
    }
  ],
  "414": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "L22",
      ToName: "유성",
      FromToName: "신도#1-유성"
    }
  ],
  "415": [
    {
      FromID: "L22",
      FromName: "유성",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "유성-계룡"
    }
  ],
  "416": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "J8",
      ToName: "신유#1",
      FromToName: "계룡-신유#1"
    }
  ],
  "417": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "L12",
      ToName: "신도#2",
      FromToName: "신유#1-신도#2"
    }
  ],
  "418": [
    {
      FromID: "L12",
      FromName: "신도#2",
      ToID: "J8",
      ToName: "신유#1",
      FromToName: "신도#2-신유#1"
    }
  ],
  "419": [
    {
      FromID: "J8",
      FromName: "신유#1",
      ToID: "L11",
      ToName: "신도#1",
      FromToName: "신유#1-신도#1"
    }
  ],
  "420": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "L8",
      ToName: "상대",
      FromToName: "신도#1-상대"
    }
  ],
  "421": [
    {
      FromID: "L8",
      FromName: "상대",
      ToID: "J13",
      ToName: "천변",
      FromToName: "상대-천변"
    }
  ],
  "422": [
    {
      FromID: "L14",
      FromName: "월드",
      ToID: "G8",
      ToName: "둔유",
      FromToName: "월드-둔유"
    }
  ],
  "423": [
    {
      FromID: "G8",
      FromName: "둔유",
      ToID: "L5",
      ToName: "농수",
      FromToName: "둔유-농수"
    }
  ],
  "424": [
    {
      FromID: "L15",
      FromName: "이수",
      ToID: "L17",
      ToName: "장대",
      FromToName: "이수-장대"
    }
  ],
  "425": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "L16",
      ToName: "유진",
      FromToName: "장대-유진"
    }
  ],
  "426": [
    {
      FromID: "L16",
      FromName: "유진",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "유진-계룡"
    }
  ],
  "427": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "계룡-덕명"
    }
  ],
  "428": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "G17",
      ToName: "주공",
      FromToName: "덕명-주공"
    }
  ],
  "429": [
    {
      FromID: "G17",
      FromName: "주공",
      ToID: "H12",
      ToName: "덕유",
      FromToName: "주공-덕유"
    }
  ],
  "430": [
    {
      FromID: "L16",
      FromName: "유진",
      ToID: "L15",
      ToName: "이수",
      FromToName: "유진-이수"
    }
  ],
  "431": [
    {
      FromID: "L15",
      FromName: "이수",
      ToID: "L17",
      ToName: "장대",
      FromToName: "이수-장대"
    }
  ],
  "432": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "장대-연단#2"
    }
  ],
  "433": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "H18",
      ToName: "자운#2",
      FromToName: "연단#2-자운#2"
    }
  ],
  "434": [
    {
      FromID: "L17",
      FromName: "장대",
      ToID: "L15",
      ToName: "이수",
      FromToName: "장대-이수"
    }
  ],
  "435": [
    {
      FromID: "L15",
      FromName: "이수",
      ToID: "G4",
      ToName: "대둔",
      FromToName: "이수-대둔"
    }
  ],
  "436": [
    {
      FromID: "G4",
      FromName: "대둔",
      ToID: "L16",
      ToName: "유진",
      FromToName: "대둔-유진"
    }
  ],
  "437": [
    {
      FromID: "L16",
      FromName: "유진",
      ToID: "G8",
      ToName: "둔유",
      FromToName: "유진-둔유"
    }
  ],
  "438": [
    {
      FromID: "G8",
      FromName: "둔유",
      ToID: "G17",
      ToName: "주공",
      FromToName: "둔유-주공"
    }
  ],
  "439": [
    {
      FromID: "L18",
      FromName: "중앙",
      ToID: "L4",
      ToName: "노은",
      FromToName: "중앙-노은"
    }
  ],
  "440": [
    {
      FromID: "L4",
      FromName: "노은",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "노은-덕명"
    }
  ],
  "441": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "L5",
      ToName: "농수",
      FromToName: "덕명-농수"
    }
  ],
  "442": [
    {
      FromID: "L5",
      FromName: "농수",
      ToID: "L3",
      ToName: "구암",
      FromToName: "농수-구암"
    }
  ],
  "443": [
    {
      FromID: "L19",
      FromName: "하기",
      ToID: "L9",
      ToName: "반석",
      FromToName: "하기-반석"
    }
  ],
  "444": [
    {
      FromID: "L9",
      FromName: "반석",
      ToID: "L22",
      ToName: "유성",
      FromToName: "반석-유성"
    }
  ],
  "445": [
    {
      FromID: "L22",
      FromName: "유성",
      ToID: "L3",
      ToName: "구암",
      FromToName: "유성-구암"
    }
  ],
  "446": [
    {
      FromID: "L3",
      FromName: "구암",
      ToID: "L21",
      ToName: "한화",
      FromToName: "구암-한화"
    }
  ],
  "447": [
    {
      FromID: "L20",
      FromName: "학하",
      ToID: "L10",
      ToName: "수통",
      FromToName: "학하-수통"
    }
  ],
  "448": [
    {
      FromID: "L21",
      FromName: "한화",
      ToID: "L19",
      ToName: "하기",
      FromToName: "한화-하기"
    }
  ],
  "449": [
    {
      FromID: "L22",
      FromName: "유성",
      ToID: "L3",
      ToName: "구암",
      FromToName: "유성-구암"
    }
  ],
  "450": [
    {
      FromID: "L3",
      FromName: "구암",
      ToID: "L19",
      ToName: "하기",
      FromToName: "구암-하기"
    }
  ],
  "451": [
    {
      FromID: "L19",
      FromName: "하기",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "하기-계룡"
    }
  ],
  "452": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "L11",
      ToName: "신도#1",
      FromToName: "계룡-신도#1"
    }
  ],
  "453": [
    {
      FromID: "L11",
      FromName: "신도#1",
      ToID: "L9",
      ToName: "반석",
      FromToName: "신도#1-반석"
    }
  ],
  "454": [
    {
      FromID: "L9",
      FromName: "반석",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "반석-덕명"
    }
  ],
  "455": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "덕명-연단#2"
    }
  ],
  "456": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "L3",
      ToName: "구암",
      FromToName: "연단#2-구암"
    }
  ],
  "457": [
    {
      FromID: "D1",
      FromName: "공남",
      ToID: "G24",
      ToName: "한신",
      FromToName: "공남-한신"
    }
  ],
  "458": [
    {
      FromID: "D2",
      FromName: "공단",
      ToID: "H11",
      ToName: "덕공",
      FromToName: "공단-덕공"
    }
  ],
  "459": [
    {
      FromID: "D3",
      FromName: "선경#1",
      ToID: "D4",
      ToName: "선경#2",
      FromToName: "선경#1-선경#2"
    }
  ],
  "460": [
    {
      FromID: "D4",
      FromName: "선경#2",
      ToID: "D3",
      ToName: "선경#1",
      FromToName: "선경#2-선경#1"
    }
  ],
  "461": [
    {
      FromID: "D5",
      FromName: "원촌",
      ToID: "D6",
      ToName: "연구원#2",
      FromToName: "원촌-연구원#2"
    }
  ],
  "462": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "G9",
      ToName: "목련",
      FromToName: "연구원#2-목련"
    }
  ],
  "463": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "목련-강변#2"
    }
  ],
  "464": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "연구원#2-강변#2"
    }
  ],
  "465": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "F4",
      ToName: "문지",
      FromToName: "강변#2-문지"
    }
  ],
  "466": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "문지-대덕#2"
    }
  ],
  "467": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "D5",
      ToName: "원촌",
      FromToName: "대덕#2-원촌"
    }
  ],
  "468": [
    {
      FromID: "D5",
      FromName: "원촌",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "원촌-엘지#2"
    }
  ],
  "469": [
    {
      FromID: "F1",
      FromName: "공단#1",
      ToID: "F18",
      ToName: "전자",
      FromToName: "공단#1-전자"
    }
  ],
  "470": [
    {
      FromID: "F18",
      FromName: "전자",
      ToID: "H7",
      ToName: "대덕#1",
      FromToName: "전자-대덕#1"
    }
  ],
  "471": [
    {
      FromID: "H7",
      FromName: "대덕#1",
      ToID: "H21",
      ToName: "항공",
      FromToName: "대덕#1-항공"
    }
  ],
  "472": [
    {
      FromID: "H21",
      FromName: "항공",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "항공-강변#2"
    }
  ],
  "473": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G6",
      ToName: "동부",
      FromToName: "공단#2-동부"
    }
  ],
  "474": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "H11",
      ToName: "덕공",
      FromToName: "동부-덕공"
    }
  ],
  "475": [
    {
      FromID: "H11",
      FromName: "덕공",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "덕공-대덕#2"
    }
  ],
  "476": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "대덕#2-강변#2"
    }
  ],
  "477": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "F14",
      ToName: "연서",
      FromToName: "강변#2-연서"
    }
  ],
  "478": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "G26",
      ToName: "황실",
      FromToName: "연서-황실"
    }
  ],
  "479": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "G10",
      ToName: "문예",
      FromToName: "황실-문예"
    }
  ],
  "480": [
    {
      FromID: "G10",
      FromName: "문예",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "문예-삼천#2"
    }
  ],
  "481": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "G1",
      ToName: "갑천",
      FromToName: "삼천#2-갑천"
    }
  ],
  "482": [
    {
      FromID: "G1",
      FromName: "갑천",
      ToID: "G20",
      ToName: "청사#3",
      FromToName: "갑천-청사#3"
    }
  ],
  "483": [
    {
      FromID: "G20",
      FromName: "청사#3",
      ToID: "G4",
      ToName: "대둔",
      FromToName: "청사#3-대둔"
    }
  ],
  "484": [
    {
      FromID: "F3",
      FromName: "과기원",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "과기원-홍명"
    }
  ],
  "485": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "F4",
      ToName: "문지",
      FromToName: "홍명-문지"
    }
  ],
  "486": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "F14",
      ToName: "연서",
      FromToName: "문지-연서"
    }
  ],
  "487": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "F14",
      ToName: "연서",
      FromToName: "문지-연서"
    }
  ],
  "488": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "F3",
      ToName: "과기원",
      FromToName: "연서-과기원"
    }
  ],
  "489": [
    {
      FromID: "F3",
      FromName: "과기원",
      ToID: "F5",
      ToName: "봉명",
      FromToName: "과기원-봉명"
    }
  ],
  "490": [
    {
      FromID: "F5",
      FromName: "봉명",
      ToID: "H21",
      ToName: "항공",
      FromToName: "봉명-항공"
    }
  ],
  "491": [
    {
      FromID: "H21",
      FromName: "항공",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "항공-수자원"
    }
  ],
  "492": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "수자원-엘지#2"
    }
  ],
  "493": [
    {
      FromID: "F9",
      FromName: "엘지#2",
      ToID: "D6",
      ToName: "연구원#2",
      FromToName: "엘지#2-연구원#2"
    }
  ],
  "494": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "연구원#2-대덕#2"
    }
  ],
  "495": [
    {
      FromID: "F5",
      FromName: "봉명",
      ToID: "F16",
      ToName: "예술",
      FromToName: "봉명-예술"
    }
  ],
  "496": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "F4",
      ToName: "문지",
      FromToName: "예술-문지"
    }
  ],
  "497": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "H21",
      ToName: "항공",
      FromToName: "문지-항공"
    }
  ],
  "498": [
    {
      FromID: "H21",
      FromName: "항공",
      ToID: "F14",
      ToName: "연서",
      FromToName: "항공-연서"
    }
  ],
  "499": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "G8",
      ToName: "둔유",
      FromToName: "연서-둔유"
    }
  ],
  "500": [
    {
      FromID: "F6",
      FromName: "삼천#1",
      ToID: "G10",
      ToName: "문예",
      FromToName: "삼천#1-문예"
    }
  ],
  "501": [
    {
      FromID: "G10",
      FromName: "문예",
      ToID: "F17",
      ToName: "전민",
      FromToName: "문예-전민"
    }
  ],
  "502": [
    {
      FromID: "F17",
      FromName: "전민",
      ToID: "F18",
      ToName: "전자",
      FromToName: "전민-전자"
    }
  ],
  "503": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "삼천#2-수자원"
    }
  ],
  "504": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "H6",
      ToName: "기초",
      FromToName: "수자원-기초"
    }
  ],
  "505": [
    {
      FromID: "H6",
      FromName: "기초",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "기초-공단#2"
    }
  ],
  "506": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G10",
      ToName: "문예",
      FromToName: "공단#2-문예"
    }
  ],
  "507": [
    {
      FromID: "G10",
      FromName: "문예",
      ToID: "F16",
      ToName: "예술",
      FromToName: "문예-예술"
    }
  ],
  "508": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "G4",
      ToName: "대둔",
      FromToName: "예술-대둔"
    }
  ],
  "509": [
    {
      FromID: "G4",
      FromName: "대둔",
      ToID: "G26",
      ToName: "황실",
      FromToName: "대둔-황실"
    }
  ],
  "510": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "G14",
      ToName: "월평",
      FromToName: "황실-월평"
    }
  ],
  "511": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "G11",
      ToName: "선사",
      FromToName: "월평-선사"
    }
  ],
  "512": [
    {
      FromID: "F8",
      FromName: "엘지#1",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "엘지#1-엘지#2"
    }
  ],
  "513": [
    {
      FromID: "F9",
      FromName: "엘지#2",
      ToID: "F15",
      ToName: "연중",
      FromToName: "엘지#2-연중"
    }
  ],
  "514": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "H11",
      ToName: "덕공",
      FromToName: "연중-덕공"
    }
  ],
  "515": [
    {
      FromID: "H11",
      FromName: "덕공",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "덕공-대덕#2"
    }
  ],
  "516": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "D6",
      ToName: "연구원#2",
      FromToName: "대덕#2-연구원#2"
    }
  ],
  "517": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "F4",
      ToName: "문지",
      FromToName: "연구원#2-문지"
    }
  ],
  "518": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "F8",
      ToName: "엘지#1",
      FromToName: "문지-엘지#1"
    }
  ],
  "519": [
    {
      FromID: "F10",
      FromName: "연구원#1",
      ToID: "F14",
      ToName: "연서",
      FromToName: "연구원#1-연서"
    }
  ],
  "520": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "F15",
      ToName: "연중",
      FromToName: "연서-연중"
    }
  ],
  "521": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "연중-대덕#2"
    }
  ],
  "522": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "D6",
      ToName: "연구원#2",
      FromToName: "대덕#2-연구원#2"
    }
  ],
  "523": [
    {
      FromID: "D6",
      FromName: "연구원#2",
      ToID: "D5",
      ToName: "원촌",
      FromToName: "연구원#2-원촌"
    }
  ],
  "524": [
    {
      FromID: "D5",
      FromName: "원촌",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "원촌-강변#2"
    }
  ],
  "525": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "F4",
      ToName: "문지",
      FromToName: "강변#2-문지"
    }
  ],
  "526": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "문지-대덕#2"
    }
  ],
  "527": [
    {
      FromID: "H8",
      FromName: "대덕#2",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "대덕#2-엘지#2"
    }
  ],
  "528": [
    {
      FromID: "F12",
      FromName: "연단#1",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "연단#1-홍명"
    }
  ],
  "529": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "연단#2-홍명"
    }
  ],
  "530": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "H13",
      ToName: "덕진",
      FromToName: "홍명-덕진"
    }
  ],
  "531": [
    {
      FromID: "H13",
      FromName: "덕진",
      ToID: "L16",
      ToName: "유진",
      FromToName: "덕진-유진"
    }
  ],
  "532": [
    {
      FromID: "L16",
      FromName: "유진",
      ToID: "L2",
      ToName: "계룡",
      FromToName: "유진-계룡"
    }
  ],
  "533": [
    {
      FromID: "L2",
      FromName: "계룡",
      ToID: "H12",
      ToName: "덕유",
      FromToName: "계룡-덕유"
    }
  ],
  "534": [
    {
      FromID: "H12",
      FromName: "덕유",
      ToID: "L6",
      ToName: "덕명",
      FromToName: "덕유-덕명"
    }
  ],
  "535": [
    {
      FromID: "L6",
      FromName: "덕명",
      ToID: "L3",
      ToName: "구암",
      FromToName: "덕명-구암"
    }
  ],
  "536": [
    {
      FromID: "L3",
      FromName: "구암",
      ToID: "L9",
      ToName: "반석",
      FromToName: "구암-반석"
    }
  ],
  "537": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "F2",
      ToName: "공단#2",
      FromToName: "연서-공단#2"
    }
  ],
  "538": [
    {
      FromID: "F2",
      FromName: "공단#2",
      ToID: "G26",
      ToName: "황실",
      FromToName: "공단#2-황실"
    }
  ],
  "539": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "F10",
      ToName: "연구원#1",
      FromToName: "황실-연구원#1"
    }
  ],
  "540": [
    {
      FromID: "F10",
      FromName: "연구원#1",
      ToID: "F15",
      ToName: "연중",
      FromToName: "연구원#1-연중"
    }
  ],
  "541": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "F4",
      ToName: "문지",
      FromToName: "연중-문지"
    }
  ],
  "542": [
    {
      FromID: "F4",
      FromName: "문지",
      ToID: "F3",
      ToName: "과기원",
      FromToName: "문지-과기원"
    }
  ],
  "543": [
    {
      FromID: "F3",
      FromName: "과기원",
      ToID: "F5",
      ToName: "봉명",
      FromToName: "과기원-봉명"
    }
  ],
  "544": [
    {
      FromID: "F5",
      FromName: "봉명",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "봉명-홍명"
    }
  ],
  "545": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "F14",
      ToName: "연서",
      FromToName: "연중-연서"
    }
  ],
  "546": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "F10",
      ToName: "연구원#1",
      FromToName: "연서-연구원#1"
    }
  ],
  "547": [
    {
      FromID: "F10",
      FromName: "연구원#1",
      ToID: "F19",
      ToName: "홍명",
      FromToName: "연구원#1-홍명"
    }
  ],
  "548": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "F18",
      ToName: "전자",
      FromToName: "홍명-전자"
    }
  ],
  "549": [
    {
      FromID: "F18",
      FromName: "전자",
      ToID: "F9",
      ToName: "엘지#2",
      FromToName: "전자-엘지#2"
    }
  ],
  "550": [
    {
      FromID: "F9",
      FromName: "엘지#2",
      ToID: "H8",
      ToName: "대덕#2",
      FromToName: "엘지#2-대덕#2"
    }
  ],
  "551": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "F5",
      ToName: "봉명",
      FromToName: "예술-봉명"
    }
  ],
  "552": [
    {
      FromID: "F5",
      FromName: "봉명",
      ToID: "G26",
      ToName: "황실",
      FromToName: "봉명-황실"
    }
  ],
  "553": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "G16",
      ToName: "을지",
      FromToName: "황실-을지"
    }
  ],
  "554": [
    {
      FromID: "G16",
      FromName: "을지",
      ToID: "G25",
      ToName: "행정",
      FromToName: "을지-행정"
    }
  ],
  "555": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G10",
      ToName: "문예",
      FromToName: "행정-문예"
    }
  ],
  "556": [
    {
      FromID: "G10",
      FromName: "문예",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "문예-삼천#2"
    }
  ],
  "557": [
    {
      FromID: "F17",
      FromName: "전민",
      ToID: "G16",
      ToName: "을지",
      FromToName: "전민-을지"
    }
  ],
  "558": [
    {
      FromID: "G16",
      FromName: "을지",
      ToID: "H23",
      ToName: "수자원",
      FromToName: "을지-수자원"
    }
  ],
  "559": [
    {
      FromID: "H23",
      FromName: "수자원",
      ToID: "F18",
      ToName: "전자",
      FromToName: "수자원-전자"
    }
  ],
  "560": [
    {
      FromID: "F18",
      FromName: "전자",
      ToID: "H2",
      ToName: "강변#2",
      FromToName: "전자-강변#2"
    }
  ],
  "561": [
    {
      FromID: "H2",
      FromName: "강변#2",
      ToID: "G11",
      ToName: "선사",
      FromToName: "강변#2-선사"
    }
  ],
  "562": [
    {
      FromID: "G11",
      FromName: "선사",
      ToID: "F6",
      ToName: "삼천#1",
      FromToName: "선사-삼천#1"
    }
  ],
  "563": [
    {
      FromID: "F18",
      FromName: "전자",
      ToID: "F17",
      ToName: "전민",
      FromToName: "전자-전민"
    }
  ],
  "564": [
    {
      FromID: "F17",
      FromName: "전민",
      ToID: "F15",
      ToName: "연중",
      FromToName: "전민-연중"
    }
  ],
  "565": [
    {
      FromID: "F15",
      FromName: "연중",
      ToID: "F7",
      ToName: "삼천#2",
      FromToName: "연중-삼천#2"
    }
  ],
  "566": [
    {
      FromID: "F7",
      FromName: "삼천#2",
      ToID: "F1",
      ToName: "공단#1",
      FromToName: "삼천#2-공단#1"
    }
  ],
  "567": [
    {
      FromID: "F1",
      FromName: "공단#1",
      ToID: "F12",
      ToName: "연단#1",
      FromToName: "공단#1-연단#1"
    }
  ],
  "568": [
    {
      FromID: "F12",
      FromName: "연단#1",
      ToID: "H21",
      ToName: "항공",
      FromToName: "연단#1-항공"
    }
  ],
  "569": [
    {
      FromID: "F19",
      FromName: "홍명",
      ToID: "F12",
      ToName: "연단#1",
      FromToName: "홍명-연단#1"
    }
  ],
  "570": [
    {
      FromID: "F12",
      FromName: "연단#1",
      ToID: "F13",
      ToName: "연단#2",
      FromToName: "연단#1-연단#2"
    }
  ],
  "571": [
    {
      FromID: "F13",
      FromName: "연단#2",
      ToID: "H21",
      ToName: "항공",
      FromToName: "연단#2-항공"
    }
  ],
  "572": [
    {
      FromID: "H21",
      FromName: "항공",
      ToID: "H19",
      ToName: "한국타이어",
      FromToName: "항공-한국타이어"
    }
  ],
  "573": [
    {
      FromID: "H19",
      FromName: "한국타이어",
      ToID: "F3",
      ToName: "과기원",
      FromToName: "한국타이어-과기원"
    }
  ],
  "574": [
    {
      FromID: "F3",
      FromName: "과기원",
      ToID: "F14",
      ToName: "연서",
      FromToName: "과기원-연서"
    }
  ],
  "575": [
    {
      FromID: "F14",
      FromName: "연서",
      ToID: "F10",
      ToName: "연구원#1",
      FromToName: "연서-연구원#1"
    }
  ],
  "576": [
    {
      FromID: "F10",
      FromName: "연구원#1",
      ToID: "H18",
      ToName: "자운#2",
      FromToName: "연구원#1-자운#2"
    }
  ],
  "577": [
    {
      FromID: "H18",
      FromName: "자운#2",
      ToID: "H9",
      ToName: "신성",
      FromToName: "자운#2-신성"
    }
  ],
  "578": [
    {
      FromID: "H9",
      FromName: "신성",
      ToID: "F15",
      ToName: "연중",
      FromToName: "신성-연중"
    }
  ],
  "579": [
    {
      FromID: "A1",
      FromName: "공사#1",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "공사#1-삼공#1"
    }
  ],
  "580": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "삼공#1-삼공#2"
    }
  ],
  "581": [
    {
      FromID: "A2",
      FromName: "공사#2",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "공사#2-삼공#2"
    }
  ],
  "582": [
    {
      FromID: "A3",
      FromName: "삼공 ",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "삼공 -삼공#2"
    }
  ],
  "583": [
    {
      FromID: "A4",
      FromName: "삼양#1",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "삼양#1-삼공#1"
    }
  ],
  "584": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "I8",
      ToName: "용신",
      FromToName: "관평-용신"
    }
  ],
  "585": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I3",
      ToName: "동화",
      FromToName: "용신-동화"
    }
  ],
  "586": [
    {
      FromID: "I3",
      FromName: "동화",
      ToID: "I14",
      ToName: "평산",
      FromToName: "동화-평산"
    }
  ],
  "587": [
    {
      FromID: "I14",
      FromName: "평산",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "평산-탑립"
    }
  ],
  "588": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "H1",
      ToName: "강변#1",
      FromToName: "탑립-강변#1"
    }
  ],
  "589": [
    {
      FromID: "H1",
      FromName: "강변#1",
      ToID: "H10",
      ToName: "대평",
      FromToName: "강변#1-대평"
    }
  ],
  "590": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "I11",
      ToName: "첨단",
      FromToName: "광명-첨단"
    }
  ],
  "591": [
    {
      FromID: "I11",
      FromName: "첨단",
      ToID: "I7",
      ToName: "송팔",
      FromToName: "첨단-송팔"
    }
  ],
  "592": [
    {
      FromID: "I7",
      FromName: "송팔",
      ToID: "I8",
      ToName: "용신",
      FromToName: "송팔-용신"
    }
  ],
  "593": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I13",
      ToName: "테크노",
      FromToName: "용신-테크노"
    }
  ],
  "594": [
    {
      FromID: "I13",
      FromName: "테크노",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "테크노-삼공#1"
    }
  ],
  "595": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "삼공#1-삼공#2"
    }
  ],
  "596": [
    {
      FromID: "H15",
      FromName: "삼공#2",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "삼공#2-탑립"
    }
  ],
  "597": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "I5",
      ToName: "송구",
      FromToName: "탑립-송구"
    }
  ],
  "598": [
    {
      FromID: "I5",
      FromName: "송구",
      ToID: "I6",
      ToName: "송칠",
      FromToName: "송구-송칠"
    }
  ],
  "599": [
    {
      FromID: "I3",
      FromName: "동화",
      ToID: "I8",
      ToName: "용신",
      FromToName: "동화-용신"
    }
  ],
  "600": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I1",
      ToName: "관평",
      FromToName: "용신-관평"
    }
  ],
  "601": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "I14",
      ToName: "평산",
      FromToName: "관평-평산"
    }
  ],
  "602": [
    {
      FromID: "I14",
      FromName: "평산",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "평산-탑립"
    }
  ],
  "603": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "H1",
      ToName: "강변#1",
      FromToName: "탑립-강변#1"
    }
  ],
  "604": [
    {
      FromID: "I4",
      FromName: "송공",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "송공-삼공#1"
    }
  ],
  "605": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "I6",
      ToName: "송칠",
      FromToName: "삼공#1-송칠"
    }
  ],
  "606": [
    {
      FromID: "I6",
      FromName: "송칠",
      ToID: "I5",
      ToName: "송구",
      FromToName: "송칠-송구"
    }
  ],
  "607": [
    {
      FromID: "I5",
      FromName: "송구",
      ToID: "I7",
      ToName: "송팔",
      FromToName: "송구-송팔"
    }
  ],
  "608": [
    {
      FromID: "I5",
      FromName: "송구",
      ToID: "I2",
      ToName: "광명",
      FromToName: "송구-광명"
    }
  ],
  "609": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "I4",
      ToName: "송공",
      FromToName: "광명-송공"
    }
  ],
  "610": [
    {
      FromID: "I4",
      FromName: "송공",
      ToID: "I6",
      ToName: "송칠",
      FromToName: "송공-송칠"
    }
  ],
  "611": [
    {
      FromID: "I6",
      FromName: "송칠",
      ToID: "I2",
      ToName: "광명",
      FromToName: "송칠-광명"
    }
  ],
  "612": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "I8",
      ToName: "용신",
      FromToName: "광명-용신"
    }
  ],
  "613": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "용신-탑립"
    }
  ],
  "614": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "I5",
      ToName: "송구",
      FromToName: "탑립-송구"
    }
  ],
  "615": [
    {
      FromID: "I5",
      FromName: "송구",
      ToID: "I7",
      ToName: "송팔",
      FromToName: "송구-송팔"
    }
  ],
  "616": [
    {
      FromID: "I7",
      FromName: "송팔",
      ToID: "I11",
      ToName: "첨단",
      FromToName: "송팔-첨단"
    }
  ],
  "617": [
    {
      FromID: "I11",
      FromName: "첨단",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "첨단-탑립"
    }
  ],
  "618": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "I2",
      ToName: "광명",
      FromToName: "탑립-광명"
    }
  ],
  "619": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "I4",
      ToName: "송공",
      FromToName: "광명-송공"
    }
  ],
  "620": [
    {
      FromID: "I4",
      FromName: "송공",
      ToID: "I6",
      ToName: "송칠",
      FromToName: "송공-송칠"
    }
  ],
  "621": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I12",
      ToName: "탑립",
      FromToName: "용신-탑립"
    }
  ],
  "622": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "I3",
      ToName: "동화",
      FromToName: "탑립-동화"
    }
  ],
  "623": [
    {
      FromID: "I3",
      FromName: "동화",
      ToID: "I1",
      ToName: "관평",
      FromToName: "동화-관평"
    }
  ],
  "624": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "I2",
      ToName: "광명",
      FromToName: "관평-광명"
    }
  ],
  "625": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "광명-삼공#1"
    }
  ],
  "626": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "I6",
      ToName: "송칠",
      FromToName: "삼공#1-송칠"
    }
  ],
  "627": [
    {
      FromID: "I6",
      FromName: "송칠",
      ToID: "I14",
      ToName: "평산",
      FromToName: "송칠-평산"
    }
  ],
  "628": [
    {
      FromID: "I14",
      FromName: "평산",
      ToID: "I13",
      ToName: "테크노",
      FromToName: "평산-테크노"
    }
  ],
  "629": [
    {
      FromID: "I11",
      FromName: "첨단",
      ToID: "I7",
      ToName: "송팔",
      FromToName: "첨단-송팔"
    }
  ],
  "630": [
    {
      FromID: "I7",
      FromName: "송팔",
      ToID: "I2",
      ToName: "광명",
      FromToName: "송팔-광명"
    }
  ],
  "631": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "광명-삼공#1"
    }
  ],
  "632": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "I13",
      ToName: "테크노",
      FromToName: "삼공#1-테크노"
    }
  ],
  "633": [
    {
      FromID: "I13",
      FromName: "테크노",
      ToID: "I14",
      ToName: "평산",
      FromToName: "테크노-평산"
    }
  ],
  "634": [
    {
      FromID: "I12",
      FromName: "탑립",
      ToID: "I8",
      ToName: "용신",
      FromToName: "탑립-용신"
    }
  ],
  "635": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I3",
      ToName: "동화",
      FromToName: "용신-동화"
    }
  ],
  "636": [
    {
      FromID: "I3",
      FromName: "동화",
      ToID: "I1",
      ToName: "관평",
      FromToName: "동화-관평"
    }
  ],
  "637": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "I6",
      ToName: "송칠",
      FromToName: "관평-송칠"
    }
  ],
  "638": [
    {
      FromID: "I6",
      FromName: "송칠",
      ToID: "I7",
      ToName: "송팔",
      FromToName: "송칠-송팔"
    }
  ],
  "639": [
    {
      FromID: "I7",
      FromName: "송팔",
      ToID: "I2",
      ToName: "광명",
      FromToName: "송팔-광명"
    }
  ],
  "640": [
    {
      FromID: "I2",
      FromName: "광명",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "광명-삼공#1"
    }
  ],
  "641": [
    {
      FromID: "I13",
      FromName: "테크노",
      ToID: "I14",
      ToName: "평산",
      FromToName: "테크노-평산"
    }
  ],
  "642": [
    {
      FromID: "I14",
      FromName: "평산",
      ToID: "I11",
      ToName: "첨단",
      FromToName: "평산-첨단"
    }
  ],
  "643": [
    {
      FromID: "I11",
      FromName: "첨단",
      ToID: "I8",
      ToName: "용신",
      FromToName: "첨단-용신"
    }
  ],
  "644": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "용신-삼공#1"
    }
  ],
  "645": [
    {
      FromID: "I14",
      FromName: "평산",
      ToID: "I8",
      ToName: "용신",
      FromToName: "평산-용신"
    }
  ],
  "646": [
    {
      FromID: "I8",
      FromName: "용신",
      ToID: "I13",
      ToName: "테크노",
      FromToName: "용신-테크노"
    }
  ],
  "647": [
    {
      FromID: "I13",
      FromName: "테크노",
      ToID: "I11",
      ToName: "첨단",
      FromToName: "테크노-첨단"
    }
  ],
  "648": [
    {
      FromID: "I11",
      FromName: "첨단",
      ToID: "I3",
      ToName: "동화",
      FromToName: "첨단-동화"
    }
  ],
  "649": [
    {
      FromID: "I3",
      FromName: "동화",
      ToID: "I1",
      ToName: "관평",
      FromToName: "동화-관평"
    }
  ],
  "650": [
    {
      FromID: "I1",
      FromName: "관평",
      ToID: "H16",
      ToName: "에너지",
      FromToName: "관평-에너지"
    }
  ],
  "651": [
    {
      FromID: "H16",
      FromName: "에너지",
      ToID: "H14",
      ToName: "삼공#1",
      FromToName: "에너지-삼공#1"
    }
  ],
  "652": [
    {
      FromID: "H14",
      FromName: "삼공#1",
      ToID: "H1",
      ToName: "강변#1",
      FromToName: "삼공#1-강변#1"
    }
  ],
  "653": [
    {
      FromID: "B1",
      FromName: "금암",
      ToID: "B8",
      ToName: "왕대",
      FromToName: "금암-왕대"
    }
  ],
  "654": [
    {
      FromID: "B8",
      FromName: "왕대",
      ToID: "B2",
      ToName: "두계",
      FromToName: "왕대-두계"
    }
  ],
  "655": [
    {
      FromID: "B2",
      FromName: "두계",
      ToID: "B4",
      ToName: "두은",
      FromToName: "두계-두은"
    }
  ],
  "656": [
    {
      FromID: "B2",
      FromName: "두계",
      ToID: "B8",
      ToName: "왕대",
      FromToName: "두계-왕대"
    }
  ],
  "657": [
    {
      FromID: "B8",
      FromName: "왕대",
      ToID: "B1",
      ToName: "금암",
      FromToName: "왕대-금암"
    }
  ],
  "658": [
    {
      FromID: "B1",
      FromName: "금암",
      ToID: "B9",
      ToName: "중부#1",
      FromToName: "금암-중부#1"
    }
  ],
  "659": [
    {
      FromID: "B9",
      FromName: "중부#1",
      ToID: "J4",
      ToName: "기성",
      FromToName: "중부#1-기성"
    }
  ],
  "660": [
    {
      FromID: "J4",
      FromName: "기성",
      ToID: "J9",
      ToName: "원내",
      FromToName: "기성-원내"
    }
  ],
  "661": [
    {
      FromID: "J9",
      FromName: "원내",
      ToID: "J2",
      ToName: "관저",
      FromToName: "원내-관저"
    }
  ],
  "662": [
    {
      FromID: "J2",
      FromName: "관저",
      ToID: "B6",
      ToName: "엄사#1",
      FromToName: "관저-엄사#1"
    }
  ],
  "663": [
    {
      FromID: "B3",
      FromName: "두서",
      ToID: "B5",
      ToName: "아파트",
      FromToName: "두서-아파트"
    }
  ],
  "664": [
    {
      FromID: "B5",
      FromName: "아파트",
      ToID: "B11",
      ToName: "중부#3",
      FromToName: "아파트-중부#3"
    }
  ],
  "665": [
    {
      FromID: "B11",
      FromName: "중부#3",
      ToID: "L5",
      ToName: "농수",
      FromToName: "중부#3-농수"
    }
  ],
  "666": [
    {
      FromID: "B4",
      FromName: "두은",
      ToID: "B5",
      ToName: "아파트",
      FromToName: "두은-아파트"
    }
  ],
  "667": [
    {
      FromID: "B5",
      FromName: "아파트",
      ToID: "B1",
      ToName: "금암",
      FromToName: "아파트-금암"
    }
  ],
  "668": [
    {
      FromID: "B1",
      FromName: "금암",
      ToID: "B7",
      ToName: "엄사#2",
      FromToName: "금암-엄사#2"
    }
  ],
  "669": [
    {
      FromID: "B5",
      FromName: "아파트",
      ToID: "B3",
      ToName: "두서",
      FromToName: "아파트-두서"
    }
  ],
  "670": [
    {
      FromID: "B3",
      FromName: "두서",
      ToID: "B11",
      ToName: "중부#3",
      FromToName: "두서-중부#3"
    }
  ],
  "671": [
    {
      FromID: "B11",
      FromName: "중부#3",
      ToID: "B4",
      ToName: "두은",
      FromToName: "중부#3-두은"
    }
  ],
  "672": [
    {
      FromID: "B4",
      FromName: "두은",
      ToID: "B6",
      ToName: "엄사#1",
      FromToName: "두은-엄사#1"
    }
  ],
  "673": [
    {
      FromID: "B6",
      FromName: "엄사#1",
      ToID: "J9",
      ToName: "원내",
      FromToName: "엄사#1-원내"
    }
  ],
  "674": [
    {
      FromID: "B6",
      FromName: "엄사#1",
      ToID: "B7",
      ToName: "엄사#2",
      FromToName: "엄사#1-엄사#2"
    }
  ],
  "675": [
    {
      FromID: "B7",
      FromName: "엄사#2",
      ToID: "B5",
      ToName: "아파트",
      FromToName: "엄사#2-아파트"
    }
  ],
  "676": [
    {
      FromID: "B5",
      FromName: "아파트",
      ToID: "B8",
      ToName: "왕대",
      FromToName: "아파트-왕대"
    }
  ],
  "677": [
    {
      FromID: "B8",
      FromName: "왕대",
      ToID: "B2",
      ToName: "두계",
      FromToName: "왕대-두계"
    }
  ],
  "678": [
    {
      FromID: "B2",
      FromName: "두계",
      ToID: "J4",
      ToName: "기성",
      FromToName: "두계-기성"
    }
  ],
  "679": [
    {
      FromID: "B7",
      FromName: "엄사#2",
      ToID: "B4",
      ToName: "두은",
      FromToName: "엄사#2-두은"
    }
  ],
  "680": [
    {
      FromID: "B4",
      FromName: "두은",
      ToID: "B6",
      ToName: "엄사#1",
      FromToName: "두은-엄사#1"
    }
  ],
  "681": [
    {
      FromID: "B8",
      FromName: "왕대",
      ToID: "B2",
      ToName: "두계",
      FromToName: "왕대-두계"
    }
  ],
  "682": [
    {
      FromID: "B2",
      FromName: "두계",
      ToID: "B1",
      ToName: "금암",
      FromToName: "두계-금암"
    }
  ],
  "683": [
    {
      FromID: "B1",
      FromName: "금암",
      ToID: "B6",
      ToName: "엄사#1",
      FromToName: "금암-엄사#1"
    }
  ],
  "684": [
    {
      FromID: "B9",
      FromName: "중부#1",
      ToID: "B2",
      ToName: "두계",
      FromToName: "중부#1-두계"
    }
  ],
  "685": [
    {
      FromID: "B2",
      FromName: "두계",
      ToID: "B10",
      ToName: "중부#2",
      FromToName: "두계-중부#2"
    }
  ],
  "686": [
    {
      FromID: "B10",
      FromName: "중부#2",
      ToID: "B9",
      ToName: "중부#1",
      FromToName: "중부#2-중부#1"
    }
  ],
  "687": [
    {
      FromID: "B9",
      FromName: "중부#1",
      ToID: "B12",
      ToName: "중부#4",
      FromToName: "중부#1-중부#4"
    }
  ],
  "688": [
    {
      FromID: "B11",
      FromName: "중부#3",
      ToID: "B3",
      ToName: "두서",
      FromToName: "중부#3-두서"
    }
  ],
  "689": [
    {
      FromID: "B3",
      FromName: "두서",
      ToID: "B5",
      ToName: "아파트",
      FromToName: "두서-아파트"
    }
  ],
  "690": [
    {
      FromID: "B12",
      FromName: "중부#4",
      ToID: "B10",
      ToName: "중부#2",
      FromToName: "중부#4-중부#2"
    }
  ],
  "691": [
    {
      FromID: "B10",
      FromName: "중부#2",
      ToID: "B11",
      ToName: "중부#3",
      FromToName: "중부#2-중부#3"
    }
  ],
  "692": [
    {
      FromID: "K1",
      FromName: "녹원",
      ToID: "K7",
      ToName: "시청#1",
      FromToName: "녹원-시청#1"
    }
  ],
  "693": [
    {
      FromID: "K7",
      FromName: "시청#1",
      ToID: "G24",
      ToName: "한신",
      FromToName: "시청#1-한신"
    }
  ],
  "694": [
    {
      FromID: "G24",
      FromName: "한신",
      ToID: "G26",
      ToName: "황실",
      FromToName: "한신-황실"
    }
  ],
  "695": [
    {
      FromID: "G26",
      FromName: "황실",
      ToID: "K2",
      ToName: "대우",
      FromToName: "황실-대우"
    }
  ],
  "696": [
    {
      FromID: "K2",
      FromName: "대우",
      ToID: "G14",
      ToName: "월평",
      FromToName: "대우-월평"
    }
  ],
  "697": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "F16",
      ToName: "예술",
      FromToName: "월평-예술"
    }
  ],
  "698": [
    {
      FromID: "F16",
      FromName: "예술",
      ToID: "K11",
      ToName: "하나",
      FromToName: "예술-하나"
    }
  ],
  "699": [
    {
      FromID: "K11",
      FromName: "하나",
      ToID: "E4",
      ToName: "대원",
      FromToName: "하나-대원"
    }
  ],
  "700": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "G6",
      ToName: "동부",
      FromToName: "대원-동부"
    }
  ],
  "701": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "G9",
      ToName: "목련",
      FromToName: "동부-목련"
    }
  ],
  "702": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "목련-시청#2"
    }
  ],
  "703": [
    {
      FromID: "K2",
      FromName: "대우",
      ToID: "K7",
      ToName: "시청#1",
      FromToName: "대우-시청#1"
    }
  ],
  "704": [
    {
      FromID: "K7",
      FromName: "시청#1",
      ToID: "G25",
      ToName: "행정",
      FromToName: "시청#1-행정"
    }
  ],
  "705": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G23",
      ToName: "크로바",
      FromToName: "행정-크로바"
    }
  ],
  "706": [
    {
      FromID: "G23",
      FromName: "크로바",
      ToID: "G24",
      ToName: "한신",
      FromToName: "크로바-한신"
    }
  ],
  "707": [
    {
      FromID: "K3",
      FromName: "동백#1",
      ToID: "G14",
      ToName: "월평",
      FromToName: "동백#1-월평"
    }
  ],
  "708": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "G27",
      ToName: "동백#2",
      FromToName: "월평-동백#2"
    }
  ],
  "709": [
    {
      FromID: "K4",
      FromName: "동백#2",
      ToID: "K3",
      ToName: "동백#1",
      FromToName: "동백#2-동백#1"
    }
  ],
  "710": [
    {
      FromID: "K5",
      FromName: "무정",
      ToID: "E4",
      ToName: "대원",
      FromToName: "무정-대원"
    }
  ],
  "711": [
    {
      FromID: "E4",
      FromName: "대원",
      ToID: "E3",
      ToName: "갈마",
      FromToName: "대원-갈마"
    }
  ],
  "712": [
    {
      FromID: "K6",
      FromName: "수연",
      ToID: "K11",
      ToName: "하나",
      FromToName: "수연-하나"
    }
  ],
  "713": [
    {
      FromID: "K11",
      FromName: "하나",
      ToID: "E12",
      ToName: "온천",
      FromToName: "하나-온천"
    }
  ],
  "714": [
    {
      FromID: "E12",
      FromName: "온천",
      ToID: "G14",
      ToName: "월평",
      FromToName: "온천-월평"
    }
  ],
  "715": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "G4",
      ToName: "대둔",
      FromToName: "월평-대둔"
    }
  ],
  "716": [
    {
      FromID: "K7",
      FromName: "시청#1",
      ToID: "G28",
      ToName: "시청#2",
      FromToName: "시청#1-시청#2"
    }
  ],
  "717": [
    {
      FromID: "G28",
      FromName: "시청#2",
      ToID: "G25",
      ToName: "행정",
      FromToName: "시청#2-행정"
    }
  ],
  "718": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G6",
      ToName: "동부",
      FromToName: "행정-동부"
    }
  ],
  "719": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "K2",
      ToName: "대우",
      FromToName: "동부-대우"
    }
  ],
  "720": [
    {
      FromID: "K2",
      FromName: "대우",
      ToID: "G9",
      ToName: "목련",
      FromToName: "대우-목련"
    }
  ],
  "721": [
    {
      FromID: "K8",
      FromName: "시청#2",
      ToID: "E7",
      ToName: "서북",
      FromToName: "시청#2-서북"
    }
  ],
  "722": [
    {
      FromID: "E7",
      FromName: "서북",
      ToID: "G25",
      ToName: "행정",
      FromToName: "서북-행정"
    }
  ],
  "723": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "G6",
      ToName: "동부",
      FromToName: "행정-동부"
    }
  ],
  "724": [
    {
      FromID: "G6",
      FromName: "동부",
      ToID: "G9",
      ToName: "목련",
      FromToName: "동부-목련"
    }
  ],
  "725": [
    {
      FromID: "G9",
      FromName: "목련",
      ToID: "E9",
      ToName: "수침#1",
      FromToName: "목련-수침#1"
    }
  ],
  "726": [
    {
      FromID: "K9",
      FromName: "충대#1",
      ToID: "K10",
      ToName: "충대#2",
      FromToName: "충대#1-충대#2"
    }
  ],
  "727": [
    {
      FromID: "K10",
      FromName: "충대#2",
      ToID: "K9",
      ToName: "충대#1",
      FromToName: "충대#2-충대#1"
    }
  ],
  "728": [
    {
      FromID: "K11",
      FromName: "하나",
      ToID: "G14",
      ToName: "월평",
      FromToName: "하나-월평"
    }
  ],
  "729": [
    {
      FromID: "G14",
      FromName: "월평",
      ToID: "G7",
      ToName: "둔산",
      FromToName: "월평-둔산"
    }
  ],
  "730": [
    {
      FromID: "G7",
      FromName: "둔산",
      ToID: "K6",
      ToName: "수연",
      FromToName: "둔산-수연"
    }
  ],
  "731": [
    {
      FromID: "K6",
      FromName: "수연",
      ToID: "G25",
      ToName: "행정",
      FromToName: "수연-행정"
    }
  ],
  "732": [
    {
      FromID: "G25",
      FromName: "행정",
      ToID: "E4",
      ToName: "대원",
      FromToName: "행정-대원"
    }
  ],
  "733": [
    {
      FromID: "K12",
      FromName: "한통#1",
      ToID: "G29",
      ToName: "한통#2",
      FromToName: "한통#1-한통#2"
    }
  ],
  "734": [
    {
      FromID: "K13",
      FromName: "한통#2",
      ToID: "G29",
      ToName: "한통#2",
      FromToName: "한통#2-한통#2"
    }
  ],
  "735": [
    {
      FromID: "C1",
      FromName: "삼부",
      ToID: "E2",
      ToName: "가장",
      FromToName: "삼부-가장"
    }
  ],
  "736": [
    {
      FromID: "C2",
      FromName: "안영",
      ToID: "E14",
      ToName: "유천",
      FromToName: "안영-유천"
    }
  ],
  "737": [
    {
      FromID: "E14",
      FromName: "유천",
      ToID: "E8",
      ToName: "서원",
      FromToName: "유천-서원"
    }
  ],
  "738": [
    {
      FromID: "C3",
      FromName: "월산",
      ToID: "H15",
      ToName: "삼공#2",
      FromToName: "월산-삼공#2"
    }
  ]
};
