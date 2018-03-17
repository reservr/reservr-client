import React, { Component } from "react";
import { connect } from "react-redux";

import EventCard from "./event-card.react";

class OrgPage extends Component {
    componentDidMount() {
        this.props.fetchEvents( this.props.match.params.orgId );
    }
    render() {
        const { events } = this.props;
        const { orgId } = this.props.match.params;

        return (
            <div className="rsv-org-page">
                <div className="rsv-org-logo">
                    <img src="/images/lanima1-white-01.svg" alt="" />
                </div>
                <div className="rsv-cards">
                    { events.map( event => ( <EventCard event={ event } orgId={ orgId } /> ) ) }
                </div>
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
