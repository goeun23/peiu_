var webpack = require('webpack')

module.exports = {
  // loading: true,
  /*
   ** Headers of the page
   */
  build: {
    vendor: ["axios", "babel-polyfill"]
  },

  head: {
    title: "PEI U Project of P21",
    meta: [
   
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Pei U" }
      
    ],
    link: [
      /* peiu_toc */
      { rel: "stylesheet", href: "/css/layout.css" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.5.1/dist/leaflet.css",
        integrity: "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==",
        crossorigin: ""
      },
      { rel: "stylesheet", href: "/css/webfonts.css" },
      { rel: "stylesheet", href: "/css/common.css" },
      { rel: "stylesheet", href: "/css/layout.css" },
      { rel: "stylesheet", href: "/css/cmpt.css" },
      { rel: "stylesheet", href: "/css/contents.css" },
      //  {rel : "stylesheet", href : "/css/jquery-ui.min.css"} ,
      //calendar
      //{ rel: "stylesheet", href: "/css/calendar/fullcalendar.min.css" },
      // {
      //   rel: "stylesheet",
      //   href: "/css/calendar/fullcalendar.print.min.css",
      //   media: "print"
      // }
    ],
    script: [
      // 로드시간 감축을 위해서 일단 주석 처리 스크립트 
      //{ src: "/scripts/jqGrid/p21-custom-paging.js" },
      // main.vue로 이동
      // { src: "/scripts/Chart.bundle.js" },
      // { src : "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"},
      
      // 계통도 관련 스크립트
      //{ src: "https://d3js.org/d3-selection-multi.v1.min.js" },
      //{ src: "/scripts/line/common.js" },
      //{ src: "/scripts/line/rccLine2.js" },
      //{ src: "/scripts/line/sccLine.js" },
      //{ src: "https://d3js.org/d3.v5.min.js" },
      
      // 용도 알수 없는 스크립트 주석처리
      //{ src: "/scripts/colors.js" },
      //{ src: "/scripts/my-ol.map.js" },
      //******************************* */
      // jquery
      
      { src: "https://code.jquery.com/jquery-3.3.1.min.js" },
      {src : "/scripts/jquery/core/jquery-ui.min.js"},
      { src: "/scripts/jquery/core/perfect-scrollbar.js" },
      { src: "/scripts/jquery/core/html5.js" },
      { src: "/scripts/jquery/core/jquery-modernizr.js" },
      { src: "/scripts/jquery/core/jquery.easing.1.3.js" },
      { src: "/scripts/jquery/core/utils.js" },
      // import common script
      // * table
      {src : "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"},
			{src : "/scripts/table/jquery.tablesort.js"},
      // * hashmap
      { src: "/scripts/plugins/hashmap.js" },
      // * cookie
      { src : "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"},
      // * custom common script
      { src: "/scripts/script_common.js" },
      { src: "/scripts/helper.js" },
      { src: "/scripts/utils.js" },
      // signalR(계통지리정보, 설비운영)
      //{ src : "/scripts/signalr/signalr.js" },
      // leaflet 1.5.1(메인, 계통지리로 분리)
      // { src : "https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"},
      // { src: "/scripts/map/leaflet.migrationLayer.js" },
      // { src: "/scripts/my-ol.map.js" },
      // { src: "/scripts/map/leaflet.textpath.js" },
      // { src: "/scripts/map/leaflet-MovingMarker.js" },
      // { src: "/scripts/map/leaflet.bezier.js" },
      // { src: "/scripts/map/p21-ctrlAnimation.js" },
      // { src: "/scripts/map/p21-flowAnimation.js" },
      // { src: "/scripts/map/p21-drawFlowLine.js" },
      // { src: "/scripts/map/leaflet.curve.js" },
      // { src: "/scripts/map/leaflet.contextmenu.min.js" }
      // { src: "/scripts/areaControl/diagram.js" },
      // svg 관련 플러그인(설비운영)
      //{ src: "/scripts/snap.svg-min.js" },
      // (계통지리정보)
      //{ src: "/scripts/data/address.js" },
      //{ src: "/scripts/data/regCode.js" },
    ]
  },
  router: {
    //middleware: ["i18n", "authenticated"]
    //middleware: ['i18n',"authenticated"]
    //middleware : ['authenticated']
    middleware : ['i18n']
  },
  // plugins: ['~/plugins/i18n.js'],
  plugins: [
    "~/plugins/axios.js",
    "~/plugins/i18n.js",
    // '~/plugins/myAuth.js'
  
  ],


  modules: [
    '@nuxtjs/axios',
  ],

  // modules:[ 'cookie-universal-nuxt'],
  // plugins: ['~/plugins/i18n.js', { src: '~/plugins/p21CtrlDlg', ssr: false }],
  /*
   ** Customize the progress bar color
   */
  //loading: { color: '#34dbb4' },
  // loading: "~/components/loading.vue",
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  generate: {
    minify: {
      collapseWhitespace: false
    }
  },
  env: {
    // get selected user assets
    browser: true,
    node: true,
    //www.peiu.co.kr
    // baseURL: (process.env.NODE_ENV === 'test' ? 'http://localhost' : 'http://www.peiu.co.kr'),
    // baseURL : 'http://www.peiu.co.kr',
    //url_user_Asset : 'https://www.peiu.co.kr:3021/api/contract/getAsset',
   
  },
  NODE_ENV : "production"
};
