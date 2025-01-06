import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import customerSaga from './customers/saga';
import layoutSaga from './layout/saga';
import userSaga from './users/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), userSaga(), customerSaga()]);
}
