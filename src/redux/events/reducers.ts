import { IEvent } from 'pages/apps/Events/types';
import { EventsActionTypes } from './constants';

const INIT_STATE = {
    Events: {
        results: [],
    },
};

type EventActionType = {
    type:
        | EventsActionTypes.API_RESPONSE_SUCCESS
        | EventsActionTypes.API_RESPONSE_ERROR
        | EventsActionTypes.GET_EVENTS
        | EventsActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: IEvent[] | [];
        error?: string;
    };
};

type State = {
    Events: {
        results: IEvent[];
    };
};

const Events = (state: State = INIT_STATE, action: EventActionType) => {
    switch (action.type) {
        case EventsActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case EventsActionTypes.GET_EVENTS: {
                    return {
                        results: action.payload.data, // Updating results
                    };
                }
                default:
                    return { ...state };
            }

        case EventsActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case EventsActionTypes.GET_EVENTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                }
                default:
                    return { ...state };
            }

        case EventsActionTypes.GET_EVENTS:
            return { ...state, loading: true, userLoggedIn: false };
        case EventsActionTypes.RESET:
            return {
                ...state,
            };
        default:
            return { ...state };
    }
};

export default Events;
