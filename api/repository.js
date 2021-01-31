// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => resource => ({
  index() {
    return $axios.$get(`${resource}`);
  },

  async test() {
    const result = await $axios.$get(`/api/information/v1/owner/sitebyagg`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIyNmJhY2NhLThkOWUtNGY0NS05MDc0LWU4MzZjMTZiNDNhMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLsnbTsnbjsnZEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rci93cy8yMDE5LzA5L2lkZW50aXR5L3JvbGVzL3N1cGVydmlzb3IiLCJTaXRlSWRzQnlSY2MiOiIxOjcxLDE6MTM4LDE6MjI3NDQyNzAwLDE6MTAyMDE0MjYwMywxOjExMjY0NjU2MDcsNDoxNjAsNDo2MjIyNDc3MTgsNDoxMzE2MTIyMDIwLDQ6MTMxNjEyMzMxNCw1OjEwNyw1OjEzNyw1OjYyMjI0MDM4Nyw2OjMsNjo5Nyw2OjE2Miw2OjEyMTYxMTM2OTMsNjoxMjE2MTEzNzAwLDY6MTIxNjExMzcxOSw2OjEyMTYxMTUxNzQsNzozMSw3OjMzLDc6MTIzLDc6MzIyMTMxNTU0LDc6MzMzODYzMjcwLDk6MSw5OjIsOToxMzYsOTo3MTAwNTE0NDAsOTo3MTAwNTM2OTgsOTo3MTAwNTQ3MjIsOToxNzE0NzIwNDk3LDk6MTcxNDcyMDUzMCwxMDo2MSwxMDoxMTksMTA6MTUwLDEwOjE2MSwxMDoxMzE2MTE4MDgwLDEwOjEzMTYxMjMzMDUsMTA6MTMxNjEyMzQyMSwxMDoxMzIxOTY1NDA0LDExOjksMTE6OTYsMTE6MTA0LDExOjE0NywxMToxNDgsMTE6MTQ5LDExOjUyNjMwNzIyOCwxMTo1MjYzMDczNzEsMTI6NTI2MzE1NzI3LDEzOjQyMjIwMzExOCwxMzo0MjIyMDMzNzgsMTM6NDIyMjAzNjI2LDEzOjQzMTA5MTAxNiwxNDo3MCwxNTo5NSwxNToxMTYsMTU6MTI5LDE1OjQyMjIwNjk5MCwxNTo5MTcxMDk5NzksMTY6NiIsImV4cCI6MTYzODA4NDg3MywiaXNzIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rciIsImF1ZCI6InBvd2VyMjFAcG93ZXIyMS5jby5rciJ9.9-zc4YyNdhcVdeFgK0vFaOfQF0W9jCLFUI1GidzRFeE`
      }
    });
    console.log(result);
    // $axios.headers = {
    //   Authorization: `Bearer 'token'`,
    // };
    // this.$axios.setToken(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIyNmJhY2NhLThkOWUtNGY0NS05MDc0LWU4MzZjMTZiNDNhMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLsnbTsnbjsnZEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rci93cy8yMDE5LzA5L2lkZW50aXR5L3JvbGVzL3N1cGVydmlzb3IiLCJTaXRlSWRzQnlSY2MiOiIxOjcxLDE6MTM4LDE6MjI3NDQyNzAwLDE6MTAyMDE0MjYwMywxOjExMjY0NjU2MDcsNDoxNjAsNDo2MjIyNDc3MTgsNDoxMzE2MTIyMDIwLDQ6MTMxNjEyMzMxNCw1OjEwNyw1OjEzNyw1OjYyMjI0MDM4Nyw2OjMsNjo5Nyw2OjE2Miw2OjEyMTYxMTM2OTMsNjoxMjE2MTEzNzAwLDY6MTIxNjExMzcxOSw2OjEyMTYxMTUxNzQsNzozMSw3OjMzLDc6MTIzLDc6MzIyMTMxNTU0LDc6MzMzODYzMjcwLDk6MSw5OjIsOToxMzYsOTo3MTAwNTE0NDAsOTo3MTAwNTM2OTgsOTo3MTAwNTQ3MjIsOToxNzE0NzIwNDk3LDk6MTcxNDcyMDUzMCwxMDo2MSwxMDoxMTksMTA6MTUwLDEwOjE2MSwxMDoxMzE2MTE4MDgwLDEwOjEzMTYxMjMzMDUsMTA6MTMxNjEyMzQyMSwxMDoxMzIxOTY1NDA0LDExOjksMTE6OTYsMTE6MTA0LDExOjE0NywxMToxNDgsMTE6MTQ5LDExOjUyNjMwNzIyOCwxMTo1MjYzMDczNzEsMTI6NTI2MzE1NzI3LDEzOjQyMjIwMzExOCwxMzo0MjIyMDMzNzgsMTM6NDIyMjAzNjI2LDEzOjQzMTA5MTAxNiwxNDo3MCwxNTo5NSwxNToxMTYsMTU6MTI5LDE1OjQyMjIwNjk5MCwxNTo5MTcxMDk5NzksMTY6NiIsImV4cCI6MTYzODA4NDg3MywiaXNzIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rciIsImF1ZCI6InBvd2VyMjFAcG93ZXIyMS5jby5rciJ9.9-zc4YyNdhcVdeFgK0vFaOfQF0W9jCLFUI1GidzRFeE",
    //   "Bearer"
    // );

    return result;
  },

  async Login(params) {
    // 로그인 요청
    //var result = await $axios.$get(`${resource}`);
    var result = {
      status: 200,
      message: "성공",
      data: { level: 2, id: "power21@power21.com", name: "cge" }
    };
    return result;
  },

  async getOwnerSiteNum(type) {
    // 소유한 사이트 번호
    //const result = await $axios.$get(`/api/information/v1/owner/sitebyagg`);
    const result = "type allen";
    return result;
  },

  async InformationOwner(type) {
    // 소유한 사이트 번호
    const result = await $axios.$get(`/api/information/v1/owner/` + type, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIyNmJhY2NhLThkOWUtNGY0NS05MDc0LWU4MzZjMTZiNDNhMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLsnbTsnbjsnZEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rci93cy8yMDE5LzA5L2lkZW50aXR5L3JvbGVzL3N1cGVydmlzb3IiLCJTaXRlSWRzQnlSY2MiOiIxOjcxLDE6MTM4LDE6MjI3NDQyNzAwLDE6MTAyMDE0MjYwMywxOjExMjY0NjU2MDcsNDoxNjAsNDo2MjIyNDc3MTgsNDoxMzE2MTIyMDIwLDQ6MTMxNjEyMzMxNCw1OjEwNyw1OjEzNyw1OjYyMjI0MDM4Nyw2OjMsNjo5Nyw2OjE2Miw2OjEyMTYxMTM2OTMsNjoxMjE2MTEzNzAwLDY6MTIxNjExMzcxOSw2OjEyMTYxMTUxNzQsNzozMSw3OjMzLDc6MTIzLDc6MzIyMTMxNTU0LDc6MzMzODYzMjcwLDk6MSw5OjIsOToxMzYsOTo3MTAwNTE0NDAsOTo3MTAwNTM2OTgsOTo3MTAwNTQ3MjIsOToxNzE0NzIwNDk3LDk6MTcxNDcyMDUzMCwxMDo2MSwxMDoxMTksMTA6MTUwLDEwOjE2MSwxMDoxMzE2MTE4MDgwLDEwOjEzMTYxMjMzMDUsMTA6MTMxNjEyMzQyMSwxMDoxMzIxOTY1NDA0LDExOjksMTE6OTYsMTE6MTA0LDExOjE0NywxMToxNDgsMTE6MTQ5LDExOjUyNjMwNzIyOCwxMTo1MjYzMDczNzEsMTI6NTI2MzE1NzI3LDEzOjQyMjIwMzExOCwxMzo0MjIyMDMzNzgsMTM6NDIyMjAzNjI2LDEzOjQzMTA5MTAxNiwxNDo3MCwxNTo5NSwxNToxMTYsMTU6MTI5LDE1OjQyMjIwNjk5MCwxNTo5MTcxMDk5NzksMTY6NiIsImV4cCI6MTYzODA4NDg3MywiaXNzIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rciIsImF1ZCI6InBvd2VyMjFAcG93ZXIyMS5jby5rciJ9.9-zc4YyNdhcVdeFgK0vFaOfQF0W9jCLFUI1GidzRFeE`
      }
    });
    console.log("api", result);
    return result;

    // const result = await $axios.$get(`/api/information/v1/onwer/${type}`, {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIyNmJhY2NhLThkOWUtNGY0NS05MDc0LWU4MzZjMTZiNDNhMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLsnbTsnbjsnZEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rci93cy8yMDE5LzA5L2lkZW50aXR5L3JvbGVzL3N1cGVydmlzb3IiLCJTaXRlSWRzQnlSY2MiOiIxOjcxLDE6MTM4LDE6MjI3NDQyNzAwLDE6MTAyMDE0MjYwMywxOjExMjY0NjU2MDcsNDoxNjAsNDo2MjIyNDc3MTgsNDoxMzE2MTIyMDIwLDQ6MTMxNjEyMzMxNCw1OjEwNyw1OjEzNyw1OjYyMjI0MDM4Nyw2OjMsNjo5Nyw2OjE2Miw2OjEyMTYxMTM2OTMsNjoxMjE2MTEzNzAwLDY6MTIxNjExMzcxOSw2OjEyMTYxMTUxNzQsNzozMSw3OjMzLDc6MTIzLDc6MzIyMTMxNTU0LDc6MzMzODYzMjcwLDk6MSw5OjIsOToxMzYsOTo3MTAwNTE0NDAsOTo3MTAwNTM2OTgsOTo3MTAwNTQ3MjIsOToxNzE0NzIwNDk3LDk6MTcxNDcyMDUzMCwxMDo2MSwxMDoxMTksMTA6MTUwLDEwOjE2MSwxMDoxMzE2MTE4MDgwLDEwOjEzMTYxMjMzMDUsMTA6MTMxNjEyMzQyMSwxMDoxMzIxOTY1NDA0LDExOjksMTE6OTYsMTE6MTA0LDExOjE0NywxMToxNDgsMTE6MTQ5LDExOjUyNjMwNzIyOCwxMTo1MjYzMDczNzEsMTI6NTI2MzE1NzI3LDEzOjQyMjIwMzExOCwxMzo0MjIyMDMzNzgsMTM6NDIyMjAzNjI2LDEzOjQzMTA5MTAxNiwxNDo3MCwxNTo5NSwxNToxMTYsMTU6MTI5LDE1OjQyMjIwNjk5MCwxNTo5MTcxMDk5NzksMTY6NiIsImV4cCI6MTYzODA4NDg3MywiaXNzIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rciIsImF1ZCI6InBvd2VyMjFAcG93ZXIyMS5jby5rciJ9.9-zc4YyNdhcVdeFgK0vFaOfQF0W9jCLFUI1GidzRFeE`
    //   }
    // });
    // console.log(result);
    //const result = await $axios.$get(`/api/information/v1/onwer/${type}`);
    //return result;
  },

  async getOwnerFaciility(type) {
    // 소유한 설치용량
    const result = await type;
    return result;
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`);
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload);
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload);
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`);
  }
});
