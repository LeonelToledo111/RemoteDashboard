import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MapboxContainer from './components/map';

import BaseLayout from './components/Base';
//import Counter from './components/test'
//import Sidebar from './components/sideNav'
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';

const store =createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
    );
//ReactDOM.render(<MapboxContainer />, document.getElementById('root'));
//ReactDOM.render(<Counter />, document.getElementById('child'));
//ReactDOM.render(<Sidebar />, document.getElementById('List'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
