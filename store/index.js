import Vuex from 'vuex'


// 스토어 생성 함수 정의
const store = () => new Vuex.Store({
  // store 변수
  state: {
    rccList :  {
      "0"  : "전국",
      "1"  : '경기',
      "2"  : '인천',
      "3"  : '서울',
      "4"  : '대전',
      "5"  : '충남',
      "6"  : '전북',
      "7"  : '전남',
      "8"  : '광주',
      "9"  : '강원',
      "10"  : '충북',
      "11"  : '경북',
      "12"  : '대구',
      "13"  : '울산',
      "14"  : '부산',
      "15"  : '경남',
      "16"  : '제주',
    },
    serviceCode : { // 로그인 권한 별 서비스 코드
      "1" : "스케줄링(전력거래)",
      "2" : "스케줄링(PPA)",    
      "4" : "DR",
      "8" : "Peak-Cut",
      "16" : "전력품질(FR)",
      "32" : "전력품질(VR)"
    },
    deviceCode : {
      '0' : 'PCS',  '1' : 'BMS', '2' : 'PV'
    },
    counter: 0,
    token : null,
    dt : null,
    auth : null,
    nuxtauth : null,
    active_powerMW : null,//globalState.vue - 금월 누적 발전량
    accum_chargingMW : null,//globalState.vue -금월 누적 충전량
    accum_dischargingMW : null, //globalState.vue -금월 누적 방전량
    runGoodCnt : 0, //globalState.vue - 운정상태1
    runBadCnt : 0, //globalState.vue - 운전상태2
    commGoodCnt : 0, //globalState.vue - 통신상태1
    commBadCnt : 0, //globalState.vue - 통신상태2
    // total_active_powerMW : null,//globalState.vue - 누적 발전량
    // accum_chargingMW : null,//globalState.vue - 누적 충전량
    // accum_dischargingMW : null, //globalState.vue - 누적 방전량
    // runGoodCnt : 0, //globalState.vue - 운정상태1
    // runBadCnt : 0, //globalState.vue - 운전상태2
    // commGoodCnt : 0, //globalState.vue - 통신상태1
    // commBadCnt : 0, //globalState.vue - 통신상태2
    locales: ['kr', 'en'],
    locale: 'kr',
    // locales: ['kr', 'en'],
    // locale: 'kr',
    authenticated : false,
    requestedID : 0,
    clickedAreaMarkers : []
  },  
  mutations: {

    // 함수
    setToken(state,token){
      state.token = token;
      state.authenticated = true;
    },
    setClickedAreaMarkers (data){
      state.clickedAreaMarkers.push(data);
    },
    increment (state) {
      state.counter++
    },
    setTime(state, dt){
      state.dt = dt;
    },
    
    setGlobalState(state, total_active_powerMW, 
      accum_chargingMW, accum_dischargingMW, runGoodCnt, runBadCnt, commGoodCnt, commBadCnt)
    {
      state.total_active_powerMW = total_active_powerMW;
      state.accum_chargingMW = accum_chargingMW;
      state.accum_dischargingMW = accum_dischargingMW;
      state.runGoodCnt = runGoodCnt;
      state.runBadCnt = runBadCnt;
      state.commGoodCnt = commGoodCnt;
      state.commBadCnt = commBadCnt;
    },
    SET_LANG(state, locale) {
      console.log('set-lang : ' + locale);
      state.locale = locale;
      // if (state.locales.indexOf(locale) !== -1) {
      //   state.locale = locale  
      // }
    },
    setAuth(state, token){
      state.auth = token;
    },
    nuxtAuth(state, auth){
      state.nuxtauth = auth;
      state.authenticated = true;
    }
  }, 
  // action (비동기처리 => 쓰기 값을 커밋)
  actions : {
    //nuxtServerlnit ({commit},{req}){

      // let auth = null
      // if(req.header.cookie){
      //   const parsed = cookieparser.parse(req.header.cookie);
      //   try{
      //     auth = JSON.parse(parsed.auth)
      //   } catch(err){
      //     // no valid cookie found
      //   }
      // }
      // //commit('nuxtAuth',auth)
      // commit('setAuth',auth)
      
    //}
    // nuxtServerlnit({commit}, {req}){
    //   console.log('is it server? ' + process.server);
    //   let auth = null
    //   console.log(req.headers)
    //   if (req.headers.cookie) {
        
    //     const parsed = cookieparser.parse(req.headers.cookie);
    //     console.log('server header cookie = ' + parsed);
    //     try {
    //       auth = JSON.parse(parsed.auth)
    //     } catch (err) {
    //       // No valid cookie found
    //     }
    //   }
    //   commit('setAuth', auth)
    // },
    
    
  },
  // 읽기 
  getters:{
    // loadedLocalLang(state){
    //   return state.locale;
    // }
    rccList(state){
      return state.rccList;
    }, 
    serviceCode(state){
      return state.serviceCode;
    }, 
    deviceCode(state){
      return state.deviceCode;
    }
  }
})

export default store