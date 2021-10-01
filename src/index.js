import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import {selectCount} from "./store/pokemonsStore"

import App from "./App"

import './index.css'
// const store = createStore(rootReducer);
// console.log('### Store', store.getState());
//store.subscribe(() => console.log("### store subscribed:", store.getState().counter.count));

// store.dispatch(plusAction(5));
// store.dispatch(plusAction(3));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

