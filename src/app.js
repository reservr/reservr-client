import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import Events from "./events.js";
import OrgPage from "./orgPage.js";
import mainRoutes from "./routes.react";

class App extends Component {
    render(){
        const routeComponents = mainRoutes.map( route => <Route { ...route } /> );

        return (
            <div>
                <ul>
                    <li><Link to="/events">Events</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" render={ () => "homepages" }></Route>
                    { routeComponents }
                </Switch>
            </div>
        );
    }
}

export default App;
