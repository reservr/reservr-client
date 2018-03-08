import React from "react";

const OrgPage = ( { match } ) => {
    return (
        <div>
            <h1>{ match.params.orgId }</h1>
        </div>
    )
};

export default OrgPage;
