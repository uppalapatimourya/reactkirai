import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetAuth, signupUser } from 'redux/actions';
import { useRedux } from 'hooks';
import { UserData } from '../Register';

export default function useRegister() {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    const { loading, userSignUp, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstname: yup.string().required(t('Please enter First Name')),
            lastname: yup.string().required(t('Please enter Last Name')),
            companyName: yup.string().required(t('Please enter your Company')),
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup
                .string()
                .required('Please enter Password'),
            confirmpassword: yup
                .string()
                .required('Please enter confirm Password'),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData | any) => {
        if (formData['password'] === formData['confirmpassword']) {
            dispatch(signupUser(formData['firstname'], formData['lastname'], formData['companyName'], formData['email'], formData['password'], selectedCurrency));
        }
    };

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

    return {
        loading,
        userSignUp,
        error,
        schemaResolver,
        onSubmit,
        selectedCurrency,
        currencyOptions,
        handleCurrencySelect,
    };
}
