import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import socketio from 'socket.io-client';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const socket = socketio.connect('http://localhost:3001/');
// (() => {
//   socket.emit('init', { name: 'bella' });

//   socket.on('welcome', (msg) => {
//     console.log(msg);
//   });

//   socket.emit('youtube',{videoID : 'give me a videoID'});
//   socket.on('videoID', (msg) => {
//     console.log("id"+msg);
//   });
  
// })();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
