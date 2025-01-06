import { useRedux } from 'hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCustomerAction, deleteCustomerByIdAction, getAllCustomers, updateCustomerByIdAction } from 'redux/actions';

export default function useCustomer() {
    const { dispatch, appSelector } = useRedux();
    const { customers, error, loading, customerDetailsById, customerCreated } = appSelector((state: any) => ({
        customers: state.Customer.customers,
        error: state.Customer.error,
        loading: state.Customer.loading,
        customerDetailsById: state.Customer.customerDetailsById,
        customerCreated: state.Customer.customerCreated,
    }));
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState<string>(error);
    const INIT_CUSTOMER_DETAILS = {
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        role: 'USER',
        // Add other customer fields here
    };
    const [customerDetails, setCustomerDetails] = useState(INIT_CUSTOMER_DETAILS);

    /*
     * handle form submission
     */
    const onSubmit = () => {
        if (validateFields()) {
            if (customerDetails?.id) {
                dispatch(updateCustomerByIdAction(customerDetails));
            } else {
                let addCustomerObj = {
                    firstname: customerDetails.firstname,
                    lastname: customerDetails.lastname,
                    email: customerDetails.email,
                };
                dispatch(addCustomerAction(addCustomerObj));
            }
        }
    };

    const validateFields = () => {
        setTimeout(() => {
            setFormErrors('');
        }, 3000);
        if (!(customerDetails?.firstname || customerDetails?.email)) {
            setFormErrors('Name and Email are required');
            return false;
        } else if (customerDetails?.firstname === '') {
            setFormErrors('Enter valid Name');
            return false;
        } else if (
            customerDetails?.email === '' &&
            !(customerDetails?.email.includes('@') && customerDetails?.email.includes('.'))
        ) {
            setFormErrors('Enter valid Email');
            return false;
        } else {
            setFormErrors('');
            return true;
        }
    };

    const handleAddEdit = async (event: any) => {
        const customerId = event?.target?.id;
        if (customerId) {
            navigate(`/apps/customers/${customerId}`);
        }
    };

    const handleDeleteAction = (id: any) => {
        dispatch(deleteCustomerByIdAction(id));
        dispatch(getAllCustomers());
    };

    const handleFormRecord = (event: any) => {
        const field = event.target.id;
        setCustomerDetails({ ...customerDetails, [field]: event.target.value });
    };

    return {
        customers,
        loading,
        error,
        formErrors,
        customerDetailsById,
        customerDetails,
        customerCreated,
        handleFormRecord,
        setCustomerDetails,
        onSubmit,
        dispatch,
        handleAddEdit,
        handleDeleteAction,
    };
}
