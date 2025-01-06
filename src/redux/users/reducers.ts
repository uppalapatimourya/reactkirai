import { UserActionTypes } from './constants';
interface UserInterface {
    id: number;
    email: string;
    firstname: string;
    middlename?: any;
    lastname: string;
    role: string;
    isEmailVerified: boolean;
    phone?: any;
    username: string;
    userTyoe: string;
    isActive: boolean;
}
const INIT_STATE = {
    users: [],
    loading: false,
    userDetailsById: {}
};
type UserActionType = {
    type:
    | UserActionTypes.API_RESPONSE_SUCCESS
    | UserActionTypes.API_RESPONSE_ERROR
    | UserActionTypes.GET_USERS
    | UserActionTypes.GET_USER_DETAILS
    | UserActionTypes.UPDATE_USER
    | UserActionTypes.ADD_USER
    | UserActionTypes.DELETE_USER
    payload: {
        actionType?: string;
        data?: UserInterface | {};
        error?: string;
    };
};
type State = {
    users: any | [];
    userDetailsById: {};
    loading?: boolean;
}
const User = (state: State = INIT_STATE, action: UserActionType) => {
    switch (action.type) {
        case UserActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case UserActionTypes.GET_USERS: {
                    return {
                        ...state,
                        users: action.payload.data,
                        loading: false,
                    };
                }
                case UserActionTypes.GET_USER_DETAILS: {
                    return {
                        ...state,
                        userDetailsById: action.payload.data,
                        loading: false,
                    };
                }
                case UserActionTypes.UPDATE_USER: {
                    return {
                        ...state,
                        userDetailsById: action.payload.data,
                        loading: false,
                    };
                }
                case UserActionTypes.ADD_USER: {
                    return {
                        ...state,
                        userDetailsById: action.payload.data,
                        userCreated: true,
                        loading: false,
                    };
                }
                case UserActionTypes.DELETE_USER: {
                    return {
                        ...state,
                        users: action.payload.data,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case UserActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case UserActionTypes.GET_USERS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                case UserActionTypes.GET_USER_DETAILS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                case UserActionTypes.UPDATE_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                case UserActionTypes.ADD_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                case UserActionTypes.DELETE_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case UserActionTypes.GET_USERS:
            return { ...state, loading: true };
        case UserActionTypes.GET_USER_DETAILS:
            return { ...state, loading: true };
        case UserActionTypes.UPDATE_USER:
            return { ...state, loading: true };
        case UserActionTypes.DELETE_USER:
            return { ...state, loading: true };
        default:
            return { ...state }
    }
};
export default User;