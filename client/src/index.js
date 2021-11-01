import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// this will intercept all the requests and will attach a token and base url with them
axios.interceptors.request.use((req) => {
  req.url = "http://3.143.37.165/sb-posts/server/api" + req.url;
  req.headers = {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
  return req;
});

// intercepting response and checking if there is any 401, in that case, redirecting to login
axios.interceptors.response.use(
  function(response) {
    return response;
  }, 
  function(error) {
    if(error.response.status === 401) {
      localStorage.clear();
      window.location = "/login";
    }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <BrowserRouter basename="/sb-posts/client/">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
