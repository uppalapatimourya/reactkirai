import { APICore } from './apiCore';

const api = new APICore();

function getServices(params: { limit: number; page: number; tenantId: number }) {
    const baseUrl = '/service';
    return api.get(`${baseUrl}`, params);
}

export { getServices };
