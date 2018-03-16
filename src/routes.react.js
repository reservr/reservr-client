import Events from "./events";
import OrgPage from "./orgPage";

const mainRoutes = [
    {
        path: "/events",
        component: Events,
        exact: true
    },
    {
        path: "/u/:orgId",
        component: OrgPage,
        exact: true
    }
];

export default mainRoutes;
