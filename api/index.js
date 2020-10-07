
import axios from 'axios';

export default axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': "JWT " + localStorage.getItem('token')
    // },
    //xsrfCookieName: 'csrftoken',
    //xsrfHeaderName: 'X-CSRFToken',
    //withCredentials: true
  });