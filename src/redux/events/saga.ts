import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getEvents as getEventsApi } from 'helpers';
import { EventsActionTypes } from './constants';
import { eventApiResponseSuccess, eventApiResponseError } from './actions';

/**
 * Fetches events from the API
 * @param {*} payload - limit, page, and tenantId (or other params if needed)
 */
function* getEvents({ payload: { limit, page, } }: any): SagaIterator {
    try {
        const response = yield call(getEventsApi, { limit, page});
        const events = response.data?.results;
        yield put(eventApiResponseSuccess(EventsActionTypes.GET_EVENTS, events));
    } catch (error: any) {
        console.log('Error fetching events:', error);
        yield put(eventApiResponseError(EventsActionTypes.GET_EVENTS, error));
    }
}

/**
 * Watches for GET_EVENTS action
 */
export function* watchGetEvents() {
    yield takeEvery(EventsActionTypes.GET_EVENTS, getEvents);
}

/**
 * Root event saga
 */
function* eventSaga() {
    yield all([fork(watchGetEvents)]);
}

export default eventSaga;
