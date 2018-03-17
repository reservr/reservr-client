import React from "react";
import { Link } from "react-router-dom";
import marked from "marked";

import EventCardFooter from "./event-card-footer.react";

const EventCard = ( props ) => {
    const { event, orgId } = props;
    const markup = { __html: marked( truncate( event.description, 140, true ) ) };

    return (
        <div className="rsv-card">
            <Link to={ `/u/${ orgId }/${ event.slug }` }>
                <div className="rsv-card-header">
                    <h3>{ event.name }</h3>
                </div>
                <div className="rsv-card-content">
                    <div className="rsv-card-image">
                        <img src="/images/placeholder.png" alt="" />
                    </div>
                    <div className="rsv-content-text" dangerouslySetInnerHTML={ markup } />
                </div>
                <EventCardFooter seats={ event.seats } waiting={ event.waiting } />
            </Link>
        </div>
    );
};

function truncate( string, characters, useWordBoundary ) {
    if ( string.length <= characters ) {
        return string;
    }
    const subString = string.substr( 0, characters - 1 );
    return `${ useWordBoundary
        ? subString.substr( 0, subString.lastIndexOf( " " ) )
        : subString } &hellip;`;
}

export default EventCard;
