import { IEvent } from 'pages/apps/Events/types';
import { EventsActionTypes} from './constants';

export type EventsActionType = {
    type:
        | EventsActionTypes.API_RESPONSE_SUCCESS
        | EventsActionTypes.API_RESPONSE_ERROR
        | EventsActionTypes.GET_EVENTS
        | EventsActionTypes.RESET;
    payload: {} | string;
};

// common success
export const eventApiResponseSuccess = (actionType: string, data: IEvent[] | {}): EventsActionType => ({
    type: EventsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const eventApiResponseError = (actionType: string, error: string): EventsActionType => ({
    type: EventsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getEvents= (params:any): EventsActionType => ({
    type: EventsActionTypes.GET_EVENTS,
    payload: params,
});
