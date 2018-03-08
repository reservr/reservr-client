import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./src/app.js"
import configureStore from "./src/store";

const PORT = 8081;
const app = express( );

app.use( express.static( __dirname + "/public" ) );

app.get( "/*", ( req, res ) => {
    const reduxStore = configureStore();

    const jsx = (
        <ReduxProvider store={ reduxStore }>
            <StaticRouter location={ req.url }>
                <App />
            </StaticRouter>
        </ReduxProvider>
    );

    const reactDom = renderToString( jsx );

    res.end( `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="app-root">${ reactDom }</div>
        <script src="/js/bundle.js"></script>
    </body>
    </html>` );
} );

app.listen( PORT );
