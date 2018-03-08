import React, { Component } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./app";
import configureStore from "./store";

const reduxStore = configureStore();

const rootHtml = (
    <ReduxProvider store={ reduxStore }>
        <Router>
            <App />
        </Router>
    </ReduxProvider>
)

hydrate( rootHtml, document.getElementById( "app-root" ) );
