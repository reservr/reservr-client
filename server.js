import express from "express";
import path from "path";
import React from "react";
import url from "url";
import favicon from "serve-favicon";

import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./src/app.js";
import mainRoutes from "./src/routes.react";
import configureStore from "./src/store";

const PORT = 8081;
const app = express( );

app.use( express.static( `${ __dirname }/public` ) );
app.use( favicon( path.join( __dirname, "public/images", "favicon.ico" ) ) );

app.get( "/*", ( req, res ) => {
    const reduxStore = configureStore();

    const location = url.parse( req.url );
    const firstMatch = mainRoutes.map( route => ( { route, match: matchPath( location.pathname, route ) } ) )
        .filter( ( { match } ) => match )[ 0 ];

    const { route, match } = firstMatch;

    const promises = [];

    if ( route.component.prefetch ) {
        promises.push( reduxStore.dispatch( route.component.prefetch( match ) ) );
    }

    Promise.all( promises ).then( () => {
        const jsx = (
            <ReduxProvider store={ reduxStore }>
                <StaticRouter location={ req.url }>
                    <App />
                </StaticRouter>
            </ReduxProvider>
        );

        const reactDom = renderToString( jsx );
        const reduxState = JSON.stringify( reduxStore.getState() );

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
            <script type="text/javascript">
                window.REDUX_INITIAL_DATA=${ reduxState };
            </script>
            <script src="/js/bundle.js"></script>
        </body>
        </html>` );
    } ).catch( ( error ) => {
        console.log( "\n\n\n ------------error:" );
        console.log( error );
        console.log( "\n\n\n" );
    } );
} );

app.listen( PORT );
