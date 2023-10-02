import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import './index.scss';

import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import AppContent from './components/AppContent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Router =
  process.env.REACT_APP_GH_PAGES === 'true' ? HashRouter : BrowserRouter;

root.render(
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);
