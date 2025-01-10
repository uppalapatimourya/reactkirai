import { login, logout, signup, forgotPassword, forgotPasswordConfirm } from './auth';
import { getAllUsers, updateUserDetails, addUser, deleteUserByIdApi } from './user';
import { getProducts } from './products';
import { getServices } from './services';
import { getEvents } from './events';

export {
    login,
    logout,
    signup,
    forgotPassword,
    forgotPasswordConfirm,
    getAllUsers,
    updateUserDetails,
    addUser,
    deleteUserByIdApi,
    getProducts,
    getServices,
    getEvents
};
