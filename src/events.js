import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Events extends Component {
    componentDidMount() {
        this.props.fetchOrgs();
    }

    render() {
        const { orgs } = this.props;
        return (
            <div>
                <h1>These are all the orgs</h1>
                <ol>
                    { orgs.length ? orgs.map( org => ( <li><Link to={ `/u/${ org.name }` } >{ org.name }</Link></li> ) ) : ( <li>loading...</li> ) }
                </ol>
            </div>
        );
    }
}

Events.prefetch = () => fetchOrgs();

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
            path: "/orgs"
        }
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Events );
