<template>
  <!-- 본문컨텐츠 영역 -->
  <div class="dashboard_wrap Users">
    <div class="dashboard_box">
      <div class="info_wrap">
        <table class="data_table center" summary="PEI_U 정보">
          <tbody>
            <tr>
              <th>제품 공급자</th>
              <td>파워이십일</td>
            </tr>
            <tr>
              <th>제품 공급자 주소</th>
              <td>대전유성구 테크노3로 65, 609호</td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>이인응</td>
            </tr>
            <tr>
              <th>고객지원 Tel</th>
              <td>042.336.7242</td>
            </tr>
            <tr>
              <th>고객지원 Fax</th>
              <td>042.336.7245</td>
            </tr>
            <tr>
              <th>유지보수 기간</th>
              <td>2017-12-20 ~ 2018-12-20</td>
            </tr>
            <tr>
              <th>저작권</th>
              <td>
                Copyright &copy; 2018 POWER21 <em>ALL RIGHTS RESERVED</em>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- //본문컨텐츠 영역 -->
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  layout: "softwareInfo",

  components: {},
  head: {
    link: [
      { rel: "stylesheet", href: "/css/jqGrid/ui.jqgrid.css" },
      {
        rel: "stylesheet",
        href:
          "https://cdn.datatables.net/1.10.19/css/dataTables.material.min.css",
      },
      //   {rel : 'stylesheet', href:"//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"},
      //   {rel : 'stylesheet', href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"},
    ],
    script: [
      // {src:"/scripts/table/paginator.js"},
      { src: "//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" },
      //   {src : 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'},
      //   {src : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'}
    ],
  },
  data() {
    return {};
  },
  methods: {
    closeDlg: function (id) {
      document.getElementById(id).style.display = "none";
    },
    openDlg: function (id) {
      document.getElementById(id).style.display = "block";
    },
  },
  middleware: "authenticated",
  mounted() {},
};
</script>

<style>
.Users {
  width: 100%;
  height: 100%;
}
.userContents {
  width: 100%;
  height: 100%;
}
.userList {
  float: left;
  width: 95%;
  height: 80vh;
  border: 1px solid #3b3e47;
  border-radius: 0.3125rem;
  background: #0a1a28;
  margin: 2rem;
}
.table_wrap {
  height: 78vh;
}
#userDetail_wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  display: none;
  background: rgba(2, 19, 35, 0.85);
  top: 0;
  left: 0;
}
.userDetail {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 64rem;
  height: 38rem;
  border: 1px solid #3b3e47;
  border-radius: 0.3125rem;
  background: #0a1a28;
  margin: 2rem;
}
.tableArea_wrap {
  padding: 0.5rem;
  height: 55rem;
}
.detailHeader {
  width: 100%;
  font-size: 2.5rem;
  color: white;
  border-bottom: 1px solid gainsboro;
  padding: 0.5rem 1rem;
}
.detailBody {
  padding: 1rem 2rem;
}
.labelTitle {
  color: white;
  font-size: 1.5rem;
  width: 40%;
  float: left;
}
.labelValue {
  color: black;
  font-size: 1.3rem;
  width: 60%;
  float: right;
}
.labelValue > input[type="text"],
.labelValue > select {
  width: 75%;
  height: 80%;
  box-sizing: border-box;
  padding: 0.2rem 0.1rem;
}
.labelValue .radioValue {
  color: white;
}
.labelValue .radioValue input[type="radio"] {
  width: 1rem;
  height: 1rem;
  color: beige;
}
.valueRow {
  height: 5rem;
  padding: 0.5rem;
}
.tableRow {
  padding: 0.5rem;
  display: inline-block;
}
.valueRow::after {
  clear: both;
}

.btn {
  width: 5.8rem;
  height: 3.125rem;
  border-radius: 0.1875rem;
  font-size: 1.0625rem;
  color: white;
  text-align: center;
  background: #2a75ff;
  float: right;
  margin: 0 1rem;
}
.btn-small {
  width: 5.8rem;
  height: 2.125rem;
  border-radius: 0.1875rem;
  font-size: 1.0625rem;
  color: white;
  text-align: center;
  background: #2a75ff;
  float: right;
  margin: 0 1rem;
}
.saveBtn {
  display: block;
}
.updateBtn {
  display: none;
}
.info_select_user {
  width: 100%;
}
.overlay {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 10000;
  display: none;
}
.del_popup_wrap {
  width: 30%;
  height: 10%;
  padding: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 1%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  position: absolute;
  top: 50%;
  box-shadow: 5px 5px 5px #000;
  z-index: 10001;
}
.del_popup_wrap input {
  cursor: pointer;
}
.btn-primary {
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
}
.btn-primary:hover {
  background-color: #e7e7e7;
}
.btn-cancel {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}
.btn-cancel:hover {
  background-color: #555555;
}
.profile_data_error {
  color: red;
}
#errMsg {
  color: red;
}

.setup_auth_wrap {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
}
.setup_auth {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.setup_label {
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
}
.setup_table_wrap {
  width: 100%;
  height: 58vh;
}
.setup_auth_btn_wrap {
  display: inline;
}
.setup_auth_btn_wrap button {
  float: right;
}
.setup_table_wrap table input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.userAddress_list_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 19, 35, 0.85);
  display: none;
}
.userAddress_list {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.paging-nav {
  text-align: right;
  padding-top: 2px;
}
.paging-nav a {
  margin: auto 1px;
  text-decoration: none;
  display: inline-block;
  padding: 1px 7px;
  background: #91b9e6;
  color: white;
  border-radius: 3px;
}
.paging-nav .selected-page {
  background: #187ed5;
  font-weight: bold;
}

.userDetail input[type="password"],
.userDetail input[type="text"] {
  width: 19rem;
  height: 2.125rem;
  padding: 1.125rem;
}
.userDetail select {
  width: 9.125rem;
  height: 2rem;
  margin: 0.3rem;
}
.userDetail input[type="radio"] {
  width: 1.525rem;
  height: 1.525rem;
}
.userDetail .radioValue {
  margin-bottom: 0.125rem;
}
.td_xy_wrap .user_loc_x_y {
  background: #aaa !important;
  float: left !important;
  width: 10.5rem !important;
  margin: 0 0.125rem;
}
.user_loc_x_y::after {
  clear: both;
}
.td_xy_wrap {
  text-align: center;
  padding: 0 5rem;
}
.disabled {
  background: #aaa !important;
}
.resource_tb_wrap input {
  width: 15rem;
  height: 2.125rem;
  padding: 0.1rem;
}
</style>
