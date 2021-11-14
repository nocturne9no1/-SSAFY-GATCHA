import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import GlbalStyles from './components/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
// import reportWebVitals from './reportWebVitals';

// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'http://j5a402.p.ssafy.io:8000';
//axios.defaults.withCredentials = true

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <GlbalStyles />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
