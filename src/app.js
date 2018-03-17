import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import mainRoutes from "./routes.react";

class App extends Component {
    componentDidMount() {
        console.log( this );
    }

    render() {
        const routeComponents = mainRoutes.map( route => <Route { ...route } /> );
        return (
            <div className="container">
                <Switch>
                    { routeComponents }
                </Switch>
            </div>
        );
    }
}

export default App;
