import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import isomorphicFetch from "isomorphic-fetch";

const apiService = ( /* store */ ) => ( next ) => ( action ) => {
    const result = next( action );

    if ( !action.async ) {
        return result;
    }

    const baseUrl = "http://localhost:8080";
    const { method = "GET", body, path } = action.payload;

    const url = `${ baseUrl }${ path }`;
    const options = {
        method,
        body: JSON.stringify( body )
    };

    return isomorphicFetch( url, options )
        .then( res => res.json() ).then(
            ( res ) => {
                next( {
                    type: `${ action.type }_COMPLETED`,
                    async: true,
                    payload: res
                } );

                return res;
            },
            ( err ) => {
                next( {
                    type: `${ action.type }_FAILED`,
                    async: true,
                    payload: err
                } );

                return Promise.reject( err );
            }
        );
};

export default function configureStore( initialState ) {
    const rootReducer = combineReducers( {
        orgs: ( state = [], action ) => {
            switch ( action.type ) {
                case "FETCH_ORGS_COMPLETED":
                    return action.payload.orgs;
                default:
                    return state;
            }
        },
        events: ( state = [], action ) => {
            switch ( action.type ) {
                case "FETCH_EVENTS_COMPLETED":
                    return action.payload.events;
                default:
                    return state;
            }
        }
    } );

    return createStore( rootReducer, initialState, applyMiddleware( apiService, thunkMiddleware ) );
}
