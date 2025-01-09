import { Product } from 'pages/apps/Ecommerce/types';
import { ServiceActionTypes } from './constants';
import { Service } from 'pages/apps/Services/types';

const INIT_STATE = {
    Services: {
        results: [],
    },
};

type ProductActionType = {
    type:
        | ServiceActionTypes.API_RESPONSE_SUCCESS
        | ServiceActionTypes.API_RESPONSE_ERROR
        | ServiceActionTypes.GET_SERVICES
        | ServiceActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: Product[] | {};
        error?: string;
    };
};

type State = {
    Services: {
        results: Service[];
    };
};

const Services = (state: State = INIT_STATE, action: ProductActionType) => {
    switch (action.type) {
        case ServiceActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ServiceActionTypes.GET_SERVICES: {
                    return {
                        results: action.payload.data, // Updating results
                    };
                }
                default:
                    return { ...state };
            }

        case ServiceActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ServiceActionTypes.GET_SERVICES: {
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                }
                default:
                    return { ...state };
            }

        case ServiceActionTypes.GET_SERVICES:
            return { ...state, loading: true, userLoggedIn: false };
        case ServiceActionTypes.RESET:
            return {
                ...state,
            };
        default:
            return { ...state };
    }
};

export default Services;
