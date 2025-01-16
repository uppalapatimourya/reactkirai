import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { APICore, AUTH_SESSION_KEY, setAuthorization } from 'helpers/api/apiCore';
import {
    login as loginApi,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logout as logoutApi,
    signup as signupApi,
    forgotPassword as forgotPasswordApi,
} from 'helpers';
import { authApiResponseSuccess, authApiResponseError } from './actions';
import { AuthActionTypes } from './constants';

type UserData = {
    payload: {
        username: string;
        firstname: string;
        lastname: string;
        companyName: string;
        email: string;
        password: string;
        baseCurrency: string;
    };
    type: string;
};

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password }, type }: UserData): SagaIterator {
    //Mock user
    let response = {
        data: {
            user: {
                id: 1,
                email: 'admin@gmail.com',
                firstname: 'Mourya',
                middlename: null,
                lastname: 'Prasad',
                role: 'APP_ADMIN',
                gender: 'MALE',
                dob: '2024-12-03T18:30:00.000Z',
                isEmailVerified: false,
                phone: null,
                username: 'admin@gmail.com',
                userType: 'CONTACT',
                isActive: true,
                deleted: false,
            },
            tokens: {
                access: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNjk5OTgwNSwiZW50aXR5VHlwZSI6InVzZXIiLCJ0eXBlIjoiQUNDRVNTIiwiZXhwIjoxNzM3MDAzNDA1fQ.VPr_WE0qXD4zTRQJNt9aSCYcMFPWxRnX--u2a1nEfNg',
                    expires: '2025-01-19T03:56:45.601Z',
                },
                refresh: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNjk5OTgwNSwiZW50aXR5VHlwZSI6InVzZXIiLCJ0eXBlIjoiUkVGUkVTSCIsImV4cCI6MTczNzAwMzQwNX0.ckS4Ey8rjOSsp3xSBeiU88VmarnF7pxz1N0luh3nZTs',
                    expires: '2025-02-15T03:56:45.606Z',
                },
            },
        }
    }
    try {
        // response = yield call(loginApi, { email: username, password });
        const user:any = response.data?.user;
        user.token = response.data?.tokens.access?.token;
        api.setLoggedInUser(user);
        setAuthorization(user['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
    try {
        // const user: any = JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY) ?? '');
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        api.setLoggedInUser(null);
        setAuthorization(null);
        // yield call(logoutApi);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({
    payload: { firstname, lastname, companyName, email, password, baseCurrency },
}: UserData): SagaIterator {
    try {
        const response = yield call(signupApi, { firstname, lastname, companyName, email, password, baseCurrency });
        const user = response.data?.user;
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
    try {
        const response = yield call(forgotPasswordApi, { username });
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}
export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup() {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword() {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchForgotPassword)]);
}

export default authSaga;
