import Vue from "vue";
import moment from "moment";

Vue.filter("COMMA", function(won) {
  return numeral(won).format("0,0");
});
