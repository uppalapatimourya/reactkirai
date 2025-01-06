import { yupResolver } from "@hookform/resolvers/yup";
import { useRedux } from "hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addUserAction, deleteUserByIdAction, updateUserByIdAction } from "redux/actions";
import * as yup from 'yup';

export default function useUser() {
    const { dispatch, appSelector } = useRedux();
    const { users, error, loading, userDetailsById, userCreated } = appSelector((state: any) => ({
        users: state.User.users,
        error: state.User.error,
        loading: state.User.loading,
        userDetailsById: state.User.userDetailsById,
        userCreated: state.User.userCreated,
    }));
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState<string>(error)
    const INIT_USER_DETAILS = {
        id: 0,
        email: '',
        firstname: '',
        lastname: '',
        role: 'APP_ADMIN',
        phone: '',
        isEmailVerified: false,
    };
    const [userDetails, setUserDetails] = useState(INIT_USER_DETAILS);
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstname: yup.string().required(t('Please enter First Name')),
            lastname: yup.string().required(t('Please enter Last Name')),
            companyName: yup.string().required(t('Please enter your Company')),
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup.string().required('Please enter Password'),
            confirmpassword: yup.string().required('Please enter confirm Password'),
        })
    );
    /*
     * handle form submission
     */
    const onSubmit = () => {
        if (validateFields()) {
            if (userDetails?.id) {
                dispatch(updateUserByIdAction(userDetails));
            } else {
                dispatch(addUserAction({ ...userDetails }));
            }
        }
    };
    const validateFields = () => {

        setTimeout(() => { setFormErrors(''); }, 3000)
        if (!(userDetails?.firstname || userDetails?.lastname || userDetails?.email)) {
            setFormErrors("First Name, Last Name, Email are required ");
            return false;
        }
        else if (userDetails?.firstname === '') {
            setFormErrors("Enter Valid first name");
            return false;
        }
        else if (userDetails?.lastname === '') {
            setFormErrors("Enter Valid last name");
            return false;
        }
        else if ((userDetails?.email === '' && !(userDetails?.email.includes('@') && userDetails?.email.includes('.')))) {
            setFormErrors("Enter Valid Email");
            return false;

        }
        else {
            setFormErrors('');
            return true;
        }
    }

    const [selectedCurrency, setSelectedCurrency] = useState('GBP'); // Set default value to GBP
    const currencyOptions = [
        'GBP',
        'EUR',
        'USD',
        // 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'SGD', 'HKD'
    ];

    const handleCurrencySelect = (event: any, currency: string) => {
        event.preventDefault();
        setSelectedCurrency(currency);
    };
    const handleAddEdit = async (event: any) => {
        const userId = event?.target?.id
        if (userId) {
            navigate(`/apps/users/${userId}`);
        }
    };
    const handleDeleteAction = (event: any) => {
        dispatch(deleteUserByIdAction(event.target.id));
    }
    const handleFormRecord = (event: any) => {
        const field = event.target.id
        setUserDetails({ ...userDetails, [field]: event.target.value });

    }
    return {
        users,
        loading,
        error,
        formErrors,
        selectedCurrency,
        currencyOptions,
        userDetailsById,
        userDetails,
        userCreated,
        handleFormRecord,
        setUserDetails,
        handleCurrencySelect,
        schemaResolver,
        onSubmit,
        dispatch,
        handleAddEdit,
        handleDeleteAction
    }
}

