import 'virtual:svg-icons-register';
import React from 'react';
import ReactDOM from 'react-dom';
import '@/common/css/common/_base.scss';
import '@/common/css/common/_layout.scss';
import '@/common/css/common/_shave.scss';
import Home from '@/modules/Home';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root'),
);
