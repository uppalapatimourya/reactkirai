import { Service } from 'pages/apps/Services/types';
import { ServiceActionTypes } from './constants';

export type ServiceActionType = {
    type:
        | ServiceActionTypes.API_RESPONSE_SUCCESS
        | ServiceActionTypes.API_RESPONSE_ERROR
        | ServiceActionTypes.GET_SERVICES
        | ServiceActionTypes.RESET;
    payload: {} | string;
};

// common success
export const serviceApiResponseSuccess = (actionType: string, data: Service[] | {}): ServiceActionType => ({
    type: ServiceActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const serviceApiResponseError = (actionType: string, error: string): ServiceActionType => ({
    type: ServiceActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getServices = (params:any): ServiceActionType => ({
    type: ServiceActionTypes.GET_SERVICES,
    payload: params,
});
