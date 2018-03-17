import React from "react";

const EventCardFooter = ( props ) => {
    const { seats, waiting } = props;
    return (
        <div>
            { seats > 0 ?
                <div className="rsv-card-footer">
                    <span className="rsv-extra-content">{ seats } seats available</span>
                    <button className="rsv-btn rsv-btn-primary">Reserve seat</button>
                </div>
                :
                <div className="rsv-card-footer">
                    <span className="rsv-extra-content"> { waiting } on waiting list</span>
                    <button className="rsv-btn rsv-btn-primary">Waiting list</button>
                </div>
            }
        </div>
    );
};

export default EventCardFooter;
