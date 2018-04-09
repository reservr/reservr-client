import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";

import mainRoutes from "./routes.react";

class App extends Component {
    componentDidMount() {
        console.log( this );

        this.responseFacebook = this.responseFacebook.bind( this );
    }

    responseFacebook( res ) {
        // this.props.sendFacebookToken( res.token );
        console.log( "this is the place" );
        console.log( this );
    }

    render() {
        const routeComponents = mainRoutes.map( route => <Route { ...route } /> );
        return (
            <div className="container">
                <h1>bla</h1>
                <div>
                    <FacebookLogin
                        appId="1691171894466083"
                        autoLoad
                        fields="name,email,picture"
                        onClick={ componentClicked }
                        callback={ this.responseFacebook }
                    />
                </div>
                <Switch>
                    { routeComponents }
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = ( dispatch ) => ( {
    sendFacebookToken: ( ...args ) => dispatch( sendFacebookToken( ...args ) )
} );

export default connect( null, mapDispatchToProps )( App );

function componentClicked() {
    console.log( "component clicked" );
}

function sendFacebookToken( token ) {
    return {
        type: "SEND_FACEBOOK_TOKEN",
        async: true,
        method: "POST",
        payload: {
            path: "/auth/facebook/token",
            access_token: token
        }
    };
}
