import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FeedbackList from './FeedbackList';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';


ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route exact path='/' component={App} />
                <Route exact path='/feedback' component={FeedbackList} />
            </div>
        </BrowserRouter>,
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
