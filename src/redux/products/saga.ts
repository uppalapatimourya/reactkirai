import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
// import { APICore, AUTH_SESSION_KEY, setAuthorization } from 'helpers/api/apiCore';
import { getProducts as getProductsApi } from 'helpers';
import { productApiResponseSuccess, productApiResponseError } from './actions';
import { ProductActionTypes } from './constants';

// type UserData = {
//     payload: {
//         username: string;
//         firstname: string;
//         lastname: string;
//         companyName: string;
//         email: string;
//         password: string;
//         baseCurrency: string;
//     };
//     type: string;
// };

// const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* getProducts({ payload: { limit, page, customerId } }: any): SagaIterator {
    try {
        const response = yield call(getProductsApi, { limit, page, customerId });
        const products = response.data?.results;
        yield put(productApiResponseSuccess(ProductActionTypes.GET_PRODUCTS, products));
    } catch (error: any) {
        console.log('coming here err', error);
        yield put(productApiResponseError(ProductActionTypes.GET_PRODUCTS, error));
    }
}

export function* watchGetProducts() {
    yield takeEvery(ProductActionTypes.GET_PRODUCTS, getProducts);
}

function* productSaga() {
    yield all([fork(watchGetProducts)]);
}

export default productSaga;
