import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getServices as getServicesApi } from 'helpers';
import { serviceApiResponseSuccess, serviceApiResponseError } from './actions';
import { ServiceActionTypes } from './constants';

/**
 * Fetches services from the API
 * @param {*} payload - limit, page, and tenantId (or other params if needed)
 */
function* getServices({ payload: { limit, page, tenantId } }: any): SagaIterator {
    try {
        const response = yield call(getServicesApi, { limit, page, tenantId });
        const services = response.data?.results;
        yield put(serviceApiResponseSuccess(ServiceActionTypes.GET_SERVICES, services));
    } catch (error: any) {
        console.log('Error fetching services:', error);
        yield put(serviceApiResponseError(ServiceActionTypes.GET_SERVICES, error));
    }
}

/**
 * Watches for GET_SERVICES action
 */
export function* watchGetServices() {
    yield takeEvery(ServiceActionTypes.GET_SERVICES, getServices);
}

/**
 * Root service saga
 */
function* serviceSaga() {
    yield all([fork(watchGetServices)]);
}

export default serviceSaga;
