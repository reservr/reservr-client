import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class OrgPage extends Component {
    componentDidMount() {
        this.props.fetchEvents( this.props.match.params.orgId );
    }
    render() {
        return (
            <div>
                <h1>{ this.props.match.params.orgId }</h1>
                <ul>
                    { this.props.events.map( event => ( <li><Link to={ `/u/AnimaArt/${ event.slug }` } >{ event.name }</Link></li> ) ) }
                </ul>
            </div>
        );
    }
}

OrgPage.prefetch = ( { params } ) => fetchEvents( params.orgId.toLowerCase() );

const mapStateToProps = ( state ) => ( {
    events: state.events
} );

const mapDispatchToProps = ( dispatch ) => ( {
    fetchEvents: ( ...args ) => dispatch( fetchEvents( ...args ) )
} );

function fetchEvents( id ) {
    return {
        type: "FETCH_EVENTS",
        async: true,
        payload: {
            path: `/events/${ id }`
        }
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( OrgPage );
