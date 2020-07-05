import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';

import Root from 'App/Root';

smoothscroll.polyfill();

ReactDOM.render(<Root />, document.getElementById('root'));
