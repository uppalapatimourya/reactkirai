import { Navigate, Link } from 'react-router-dom';
import { Button, Alert, Row, Col, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout from './AccountLayout';
import { useRegister } from './hooks';
import './account.scss';
import { MouseEvent, useState } from 'react';
export type UserData = {
    email: string;
    password: string;
    confirmpassword: string;
    firstname: string;
    lastname: string;
    companyName: string;
};

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Already have account?')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = () => {
    const { t } = useTranslation();
    const { loading, userSignUp, error, schemaResolver, onSubmit } = useRegister();
    const [selectedCurrency, setSelectedCurrency] = useState('GBP'); // Set default value to GBP
    const currencyOptions = [
        'GBP',
        'EUR',
        'USD',
        // 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'SGD', 'HKD'
    ];
    const handleCurrencySelect = (event: MouseEvent, currency: string) => {
        event.preventDefault();
        setSelectedCurrency(currency);
    };
    return (
        <>
            {userSignUp ? <Navigate to={'/account/confirm'}></Navigate> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign Up Here')}</h4>
                    <p className="text-muted mb-4">
                        {t("Don't have an account? Create your account, it takes less than a minute.")}
                    </p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className="px-1" style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                            <FormInput
                                label={t('First Name')}
                                type="text"
                                name="firstname"
                                placeholder={t('Enter your name')}
                                containerClass={'mb-3'}
                            />
                        </div>
                        <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                            <FormInput
                                label={t('Last Name')}
                                type="text"
                                name="lastname"
                                placeholder={t('Enter your name')}
                                containerClass={'mb-3'}
                            />
                        </div>
                        <div className="px-1" style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                            <FormInput
                                label={t('Company')}
                                type="text"
                                name="companyName"
                                placeholder={t('Enter your Company')}
                                containerClass={'mb-3'}
                            />
                        </div>

                        <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                            <FormInput
                                label={t('Email address')}
                                type="email"
                                name="email"
                                placeholder={t('Enter your email')}
                                containerClass={'mb-3'}
                            />
                        </div>
                        <div className="px-1" style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                            <FormInput
                                label={t('Password')}
                                type="password"
                                name="password"
                                placeholder={t('Strong Password')}
                                containerClass={'mb-3'}
                            />
                        </div>
                        <div style={{ flex: '1 1 calc(50% - 0.5rem)' }}>
                            <FormInput
                                label={t('Confirm Password')}
                                type="password"
                                name="confirmpassword"
                                placeholder={t('Confirm your password')}
                                containerClass={'mb-3'}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '1em' }}>
                        <Dropdown
                            style={{
                                display: 'flex',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}>
                            <Dropdown.Toggle className="select-currency" variant="secondary">
                                Selected Currency: {selectedCurrency}{' '}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {currencyOptions.map((currency) => (
                                    <Dropdown.Item
                                        key={currency}
                                        onClick={(event) => handleCurrencySelect(event, currency)}>
                                        {currency}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Register;
