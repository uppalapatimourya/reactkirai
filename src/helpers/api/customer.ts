import { APICore } from './apiCore';

const api = new APICore();

// Get all customers
function getAllCustomers() {
    const baseUrl = '/customers';
    return api.get(`${baseUrl}`, '');
}

// Get customer details by ID
function getCustomerDetails(params: { customerId: string }) {
    const baseUrl = `/customers/${params?.customerId}`;
    return api.get(`${baseUrl}`, '');
}

// Update customer details
function updateCustomerDetails(params: { id?: string; firstname?: string; lastname?: string; email?: string }) {
    const baseUrl = `/customers/${params.id}`;
    const body = {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        // Add other fields here as needed
    };
    return api.updatePatch(`${baseUrl}`, body);
}

// Add a new customer
function addCustomer(params: { firstname?: string; lastname?: string; email?: string }) {
    const baseUrl = `/customers`;
    return api.create(`${baseUrl}`, params);
}

// Delete customer by ID
function deleteCustomerByIdApi(params: { customerId: string }) {
    const baseUrl = `/customers/${params?.customerId}`;
    return api.delete(`${baseUrl}`);
}

export { getAllCustomers, getCustomerDetails, updateCustomerDetails, addCustomer, deleteCustomerByIdApi };
