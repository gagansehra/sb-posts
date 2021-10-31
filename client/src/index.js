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

ReactDOM.render(
  <BrowserRouter>
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
