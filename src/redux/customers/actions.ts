import { CustomerActionTypes } from './constant';

export type CustomerActionType = {
    type:
        | CustomerActionTypes.API_RESPONSE_SUCCESS
        | CustomerActionTypes.API_RESPONSE_ERROR
        | CustomerActionTypes.GET_CUSTOMERS
        | CustomerActionTypes.GET_CUSTOMER_DETAILS
        | CustomerActionTypes.ADD_CUSTOMER
        | CustomerActionTypes.UPDATE_CUSTOMER
        | CustomerActionTypes.DELETE_CUSTOMER
        | CustomerActionTypes.CLEAR_CUSTOMERS;
    payload: {} | string;
};

export type Customer = {
    id?: number;
    firstname: string;
    lastname: string;
    role?: string;
    email: string;
    // Add other customer properties here
};

// Common success action for API responses
export const customerApiResponseSuccess = (actionType: string, data: Customer | {}): CustomerActionType => ({
    type: CustomerActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// Common error action for API responses
export const customerApiResponseError = (actionType: string, error: string): CustomerActionType => ({
    type: CustomerActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

// Action to get all customers
export const getAllCustomers = (): CustomerActionType => ({
    type: CustomerActionTypes.GET_CUSTOMERS,
    payload: {},
});

// Action to get a customer by ID
export const getCustomerByIdAction = (customerId: number): CustomerActionType => ({
    type: CustomerActionTypes.GET_CUSTOMER_DETAILS,
    payload: { customerId },
});

// Action to update a customer by ID
export const updateCustomerByIdAction = (customerData: Customer): CustomerActionType => ({
    type: CustomerActionTypes.UPDATE_CUSTOMER,
    payload: { customerData },
});

// Action to add a new customer
export const addCustomerAction = (customerData: Customer): CustomerActionType => ({
    type: CustomerActionTypes.ADD_CUSTOMER,
    payload: { customerData },
});

// Action to delete a customer by ID
export const deleteCustomerByIdAction = (customerId: number): CustomerActionType => ({
    type: CustomerActionTypes.DELETE_CUSTOMER,
    payload: { customerId },
});
export const clearCustomersAction = (): CustomerActionType => ({
    type: CustomerActionTypes.CLEAR_CUSTOMERS,
    payload: {},
});
