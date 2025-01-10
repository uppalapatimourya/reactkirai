import { APICore } from './apiCore';

const api = new APICore();

function getEvents(params: { limit: number; page: number }) {
    const baseUrl = '/event';
    return api.get(`${baseUrl}`, params);
}

export { getEvents };
