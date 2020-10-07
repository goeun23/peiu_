import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var cookieparser = require('cookieparser')


export default function ({ store, redirect, req }) {
  // 로그 기록이 cmd에 찍힘 
  
  // if(req.headers == undefined){
  //   console.log('req.header undefined')
  // }
  // var cookie = cookieparser.parse(req.headers.cookie);
  // // // 아예 쿠키에 토큰이 없으면, 
  // if (cookie.token == undefined) {
  //     return redirect("/");
  // }
}
  


// export default function({ store, redirect, res, query, req }) {
  
//   const token = query.token;
  
//   if (process.client) {
//     console.log("authenticated middlware, " + req + ", client");
//     var cookie = cookieparser.parse(document.cookie);
//   } else {
//     if (process.server) {
//       console.log("authenticated middlware, " + req + ", server");
//       /* 쿠키가 없다면 */
//       if (req.headers.cookie == undefined) {
//         return redirect("/login");
//       }

//       var coo = cookieparser.parse(req.headers.cookie);
      
//       if (
//         coo.userType !== undefined &&
//         coo.Email !== undefined &&
//         coo.UserName !== undefined
//       ) {
//         //go
//       } else {
//         console.log("auth = " + coo);
//         return redirect("/login");
//       }
//     }
//   }
// }
