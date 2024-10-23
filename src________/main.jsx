import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Redux Provider ko import karein
import App from './App.jsx';
import './styles/index.scss';
import store from './store'; // Apna store import karein

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Provider ko yahaan wrap karein */}
      <App />
    </Provider>
  </React.StrictMode>,
);
