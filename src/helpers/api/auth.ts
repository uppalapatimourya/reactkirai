import { APICore } from './apiCore';

const api = new APICore();

function login(params: { email: string; password: string }) {
    const baseUrl = '/auth/login';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/auth/logout';
    return api.create(`${baseUrl}`, {});
}

function signup(params: {
    firstname: string;
    lastname: string;
    companyName: string;
    email: string;
    password: string;
    baseCurrency: string;
}) {
    const baseUrl = '/auth/register';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { username: string }) {
    const baseUrl = '/auth/forget-password';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: { email: string }) {
    const baseUrl = '/auth/password/reset/confirm';
    return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword, forgotPasswordConfirm };
