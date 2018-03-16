import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import mainRoutes from "./routes.react";

class App extends Component {
    componentDidMount() {
        console.log( this );
    }

    render() {
        const routeComponents = mainRoutes.map( route => <Route { ...route } /> );
        return (
            <div>
                <ul>
                    <li><Link to="/events">Events</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" render={ () => "homepages" } />
                    { routeComponents }
                </Switch>
            </div>
        );
    }
}

export default App;
