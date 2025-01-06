import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Customer from './customers/reducers';
import Layout from './layout/reducers';
import User from './users/reducers';

export default combineReducers({
    Auth,
    Layout,
    User,
    Customer,
});
