import { CustomerActionTypes } from './constant';

interface CustomerInterface {
    id: number;
    name: string;
    email: string;
    role: string;
}

const INIT_STATE = {
    customers: [],
    loading: false,
    customerDetailsById: {},
    customerCreated: false, // Assuming you want to track if a customer was created successfully
    error: '', // Add an error field to store error messages
};

type CustomerActionType = {
    type:
        | CustomerActionTypes.API_RESPONSE_SUCCESS
        | CustomerActionTypes.API_RESPONSE_ERROR
        | CustomerActionTypes.GET_CUSTOMERS
        | CustomerActionTypes.GET_CUSTOMER_DETAILS
        | CustomerActionTypes.UPDATE_CUSTOMER
        | CustomerActionTypes.ADD_CUSTOMER
        | CustomerActionTypes.DELETE_CUSTOMER
        | CustomerActionTypes.CLEAR_CUSTOMERS;
    payload: {
        actionType?: string;
        data?: CustomerInterface | {};
        error?: string;
    };
};

type State = {
    customers: CustomerInterface[]; // Use the appropriate type for your customer data
    customerDetailsById: {};
    loading?: boolean;
    customerCreated: boolean;
    error: string;
};

const Customer = (state: State = INIT_STATE, action: CustomerActionType) => {
    switch (action.type) {
        case CustomerActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CustomerActionTypes.GET_CUSTOMERS: {
                    return {
                        ...state,
                        customers: action.payload.data as CustomerInterface[],
                        loading: false,
                    };
                }
                case CustomerActionTypes.GET_CUSTOMER_DETAILS: {
                    return {
                        ...state,
                        customerDetailsById: action.payload.data,
                        loading: false,
                    };
                }
                case CustomerActionTypes.UPDATE_CUSTOMER: {
                    return {
                        ...state,
                        customerDetailsById: action.payload.data,
                        loading: false,
                    };
                }
                case CustomerActionTypes.ADD_CUSTOMER: {
                    return {
                        ...state,
                        customerDetailsById: action.payload.data,
                        customerCreated: true,
                        loading: false,
                    };
                }
                case CustomerActionTypes.DELETE_CUSTOMER: {
                    return {
                        ...state,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case CustomerActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case CustomerActionTypes.GET_CUSTOMERS: {
                    return {
                        ...state,
                        error: action.payload.error || '', // Store the error message
                        loading: false,
                    };
                }
                case CustomerActionTypes.GET_CUSTOMER_DETAILS: {
                    return {
                        ...state,
                        error: action.payload.error || '',
                        loading: false,
                    };
                }
                case CustomerActionTypes.UPDATE_CUSTOMER: {
                    return {
                        ...state,
                        error: action.payload.error || '',
                        loading: false,
                    };
                }
                case CustomerActionTypes.ADD_CUSTOMER: {
                    return {
                        ...state,
                        error: action.payload.error || '',
                        loading: false,
                    };
                }
                case CustomerActionTypes.DELETE_CUSTOMER: {
                    return {
                        ...state,
                        error: action.payload.error || '',
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case CustomerActionTypes.GET_CUSTOMERS:
        case CustomerActionTypes.GET_CUSTOMER_DETAILS:
        case CustomerActionTypes.UPDATE_CUSTOMER:
        case CustomerActionTypes.ADD_CUSTOMER:
        case CustomerActionTypes.DELETE_CUSTOMER:
            return { ...state, loading: true };
        case CustomerActionTypes.CLEAR_CUSTOMERS: {
            return {
                ...state,
                customers: [],
                customerDetailsById: {},
                customerCreated: false,
            };
        }
        default:
            return { ...state };
    }
};

export default Customer;
