import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import './css/index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)


// Register the service worker
serviceWorkerRegistration.register();