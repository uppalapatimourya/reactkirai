import { APICore } from './apiCore';

const api = new APICore();

function getProducts(params: { limit: number; page: number; customerId: number }) {
    const baseUrl = '/products';
    return api.get(`${baseUrl}`, params);
}

export { getProducts };
