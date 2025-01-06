import { Navigate, Link } from 'react-router-dom';
import { Button, Alert, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout2 from './AccountLayout2';
import { useRegister } from './hooks';
import './account.scss';
export type UserData = {
    id?: number;
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
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('Already have account?')}{' '}
                <Link to={'/account/login'} className="text-muted ms-1">
                    <b>{t('Log In')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Register2 = () => {
    const { t } = useTranslation();
    const {
        loading,
        userSignUp,
        error,
        selectedCurrency,
        currencyOptions,
        handleCurrencySelect,
        schemaResolver,
        onSubmit,
    } = useRegister();
    return (
        <>
            {userSignUp ? <Navigate to={'/account/confirm2'} /> : null}

            <AccountLayout2 bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('Sign Up Here')}</h4>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={t('First Name')}
                        type="text"
                        name="firstname"
                        placeholder={t('Enter your name')}
                        containerClass={'mb-2'}
                    />

                    <FormInput
                        label={t('Last Name')}
                        type="text"
                        name="lastname"
                        placeholder={t('Enter your name')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Company')}
                        type="text"
                        name="companyName"
                        placeholder={t('Enter your Company')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="email"
                        placeholder={t('Enter your email')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Strong Password')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Confirm Password')}
                        type="password"
                        name="confirmpassword"
                        placeholder={t('Confirm your password')}
                        containerClass={'mb-2'}
                    />
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

                    {/* social links */}
                    <div className="text-center mt-4">
                        <p className="text-muted font-16">{t('Sign up using')}</p>
                        <ul className="social-list list-inline mt-3">
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-primary text-primary">
                                    <i className="mdi mdi-facebook"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-danger text-danger">
                                    <i className="mdi mdi-google"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-info text-info">
                                    <i className="mdi mdi-twitter"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-secondary text-secondary">
                                    <i className="mdi mdi-github"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </VerticalForm>
            </AccountLayout2>
        </>
    );
};

export default Register2;
