import { Product } from 'pages/apps/Ecommerce/types';
import { ProductActionTypes } from './constants';

const INIT_STATE = {
    products: {
        results: [],
    },
};

type ProductActionType = {
    type:
        | ProductActionTypes.API_RESPONSE_SUCCESS
        | ProductActionTypes.API_RESPONSE_ERROR
        | ProductActionTypes.GET_PRODUCTS
        | ProductActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: Product[] | {};
        error?: string;
    };
};

type State = {
    products: {
        results: Product[];
    };
};

const Products = (state: State = INIT_STATE, action: ProductActionType) => {
    switch (action.type) {
        case ProductActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ProductActionTypes.GET_PRODUCTS: {
                    return {
                        results: action.payload.data, // Updating results
                    };
                }
                default:
                    return { ...state };
            }

        case ProductActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ProductActionTypes.GET_PRODUCTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                }
                default:
                    return { ...state };
            }

        case ProductActionTypes.GET_PRODUCTS:
            return { ...state, loading: true, userLoggedIn: false };
        case ProductActionTypes.RESET:
            return {
                ...state,
            };
        default:
            return { ...state };
    }
};

export default Products;
