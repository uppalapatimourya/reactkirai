import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { customerApiResponseSuccess, customerApiResponseError } from './actions'; // Import your customer action creators
import {
    addCustomer,
    deleteCustomerByIdApi,
    getAllCustomers as getAllCustomersApi,
    getCustomerDetails,
    updateCustomerDetails,
} from 'helpers/api/customer'; // Import your customer API functions
import { CustomerActionTypes } from './constant';

function* getAllCustomers(): SagaIterator {
    try {
        const response = yield call(getAllCustomersApi); // Replace with your customer API function
        const customers = response.data; // Assuming the response contains a list of customers
        yield put(customerApiResponseSuccess(CustomerActionTypes.GET_CUSTOMERS, customers));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.GET_CUSTOMERS, error));
    }
}

function* getCustomerDetailsByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(getCustomerDetails, action.payload); // Replace with your customer API function and payload
        const customerDetails = response.data;
        yield put(customerApiResponseSuccess(CustomerActionTypes.GET_CUSTOMER_DETAILS, customerDetails));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.GET_CUSTOMER_DETAILS, error));
    }
}

function* updateCustomerByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateCustomerDetails, action.payload?.customerData); // Replace with your customer API function and payload
        const updatedCustomerDetails = response.data;
        yield put(customerApiResponseSuccess(CustomerActionTypes.UPDATE_CUSTOMER, updatedCustomerDetails));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.UPDATE_CUSTOMER, error));
    }
}

function* addCustomerSaga(action: any): SagaIterator {
    try {
        const response = yield call(addCustomer, action.payload?.customerData); // Replace with your customer API function and payload
        const updatedCustomerDetails = response.data;
        yield put(customerApiResponseSuccess(CustomerActionTypes.ADD_CUSTOMER, updatedCustomerDetails));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.ADD_CUSTOMER, error));
    }
}

function* deleteCustomerByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(deleteCustomerByIdApi, action.payload); // Pass customerId to the customer API function
        const customerList = response.data; // Assuming the response contains a list of customers
        yield put(customerApiResponseSuccess(CustomerActionTypes.DELETE_CUSTOMER, customerList));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.DELETE_CUSTOMER, 'Failed to delete Customer'));
    }
}

export function* watchDeleteCustomerById() {
    yield takeEvery(CustomerActionTypes.DELETE_CUSTOMER, deleteCustomerByIdSaga);
}

export function* watchAddCustomer() {
    yield takeEvery(CustomerActionTypes.ADD_CUSTOMER, addCustomerSaga);
}

export function* watchUpdateCustomerById() {
    yield takeEvery(CustomerActionTypes.UPDATE_CUSTOMER, updateCustomerByIdSaga);
}

export function* watchGetAllCustomers() {
    yield takeEvery(CustomerActionTypes.GET_CUSTOMERS, getAllCustomers);
}

export function* watchGetCustomerDetailsById() {
    yield takeEvery(CustomerActionTypes.GET_CUSTOMER_DETAILS, getCustomerDetailsByIdSaga);
}

function* customerSaga() {
    yield all([
        fork(watchGetAllCustomers),
        fork(watchGetCustomerDetailsById),
        fork(watchUpdateCustomerById),
        fork(watchAddCustomer),
        fork(watchDeleteCustomerById),
    ]);
}

export default customerSaga;
