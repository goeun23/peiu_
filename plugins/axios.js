export default function ({ $axios, store, redirect }) {
  $axios.onError((error) => {
    if (error.response && error.response.status === 500) {
      redirect("/login");
    }
  });
  // Request interceptor for API calls
  $axios.interceptors.request.use(
    (request) => {
      console.log(request);
      const keys = JSON.parse(value);

      //console.log(config);
      // config.headers = {
      //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIyNmJhY2NhLThkOWUtNGY0NS05MDc0LWU4MzZjMTZiNDNhMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLsnbTsnbjsnZEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rci93cy8yMDE5LzA5L2lkZW50aXR5L3JvbGVzL3N1cGVydmlzb3IiLCJTaXRlSWRzQnlSY2MiOiIxOjcxLDE6MTM4LDE6MjI3NDQyNzAwLDE6MTAyMDE0MjYwMywxOjExMjY0NjU2MDcsNDoxNjAsNDo2MjIyNDc3MTgsNDoxMzE2MTIyMDIwLDQ6MTMxNjEyMzMxNCw1OjEwNyw1OjEzNyw1OjYyMjI0MDM4Nyw2OjMsNjo5Nyw2OjE2Miw2OjEyMTYxMTM2OTMsNjoxMjE2MTEzNzAwLDY6MTIxNjExMzcxOSw2OjEyMTYxMTUxNzQsNzozMSw3OjMzLDc6MTIzLDc6MzIyMTMxNTU0LDc6MzMzODYzMjcwLDk6MSw5OjIsOToxMzYsOTo3MTAwNTE0NDAsOTo3MTAwNTM2OTgsOTo3MTAwNTQ3MjIsOToxNzE0NzIwNDk3LDk6MTcxNDcyMDUzMCwxMDo2MSwxMDoxMTksMTA6MTUwLDEwOjE2MSwxMDoxMzE2MTE4MDgwLDEwOjEzMTYxMjMzMDUsMTA6MTMxNjEyMzQyMSwxMDoxMzIxOTY1NDA0LDExOjksMTE6OTYsMTE6MTA0LDExOjE0NywxMToxNDgsMTE6MTQ5LDExOjUyNjMwNzIyOCwxMTo1MjYzMDczNzEsMTI6NTI2MzE1NzI3LDEzOjQyMjIwMzExOCwxMzo0MjIyMDMzNzgsMTM6NDIyMjAzNjI2LDEzOjQzMTA5MTAxNiwxNDo3MCwxNTo5NSwxNToxMTYsMTU6MTI5LDE1OjQyMjIwNjk5MCwxNTo5MTcxMDk5NzksMTY6NiIsImV4cCI6MTYzODA4NDg3MywiaXNzIjoiaHR0cHM6Ly93d3cucGVpdS5jby5rciIsImF1ZCI6InBvd2VyMjFAcG93ZXIyMS5jby5rciJ9.9-zc4YyNdhcVdeFgK0vFaOfQF0W9jCLFUI1GidzRFeE`,
      //   Accept: "application/json222222",
      //   "Content-Type": "application/x-www-form-urlencoded",
      // };
      return request;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  $axios.interceptors.response.use((response) => {
    console.log(response.status);
    if (response.status === 200) {
      //if (response.request.responseURL && response.request.responseURL.includes('login')) {
      store.dispatch("setUser", response);
      //}
    }
    return response;
  });
}
