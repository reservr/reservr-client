import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Events extends Component {
    constructor() {
        super();
        this.state = {
            organisations: [ ( <li>loading...</li> ) ]
        }
    }
    componentDidMount() {
        this.props.fetchOrgs();
    }

    render() {
        const { orgs } = this.props;
        return (
            <div>
                <h1>These are all the orgs</h1>
                <ol>
                    { orgs.map( org => ( <li><Link to={ `/u/${ org.name }` } >{ org.name }</Link></li> ) ) }
                </ol>
            </div>
        );
    }
}

Events.prefetch = ( { params } ) => fetchOrgs()

const mapStateToProps = ( state ) => ( {
    orgs: state.orgs
} );

const mapDispatchToProps = ( dispatch ) => ( {
    fetchOrgs: ( ...args ) => dispatch( fetchOrgs( ...args ) )
} );

function fetchOrgs() {
    return {
        type: "FETCH_ORGS",
        async: true,
        payload: {
            path: "/orgs",
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Events );
