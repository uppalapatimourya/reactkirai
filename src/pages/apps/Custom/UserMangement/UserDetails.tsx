/* eslint-disable react-hooks/exhaustive-deps */
import { FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByIdAction } from 'redux/actions';
import useUser from './hooks/useUser';

const UserDetails = () => {
    const {
        loading,
        error,
        formErrors,
        userDetailsById,
        userDetails,
        userCreated,
        setUserDetails,
        dispatch,
        handleFormRecord,
        onSubmit,
    } = useUser();
    const params = useParams();
    const userId = params.Id ? params.Id : '0';
    useEffect(() => {
        if (userId !== '0') {
            dispatch(getUserByIdAction(userId));
        }
    }, []);
    useEffect(() => {
        if (userId !== '0') {
            setUserDetails(userDetailsById);
        }
    }, [userDetailsById]);
    const [errorOccurred, setErrorOccurred] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            setErrorOccurred(error);
            setTimeout(() => {
                setErrorOccurred('');
            }, 3000);
        }
    }, [error]);
    useEffect(() => {
        if (userCreated) {
            navigate(-1);
        }
    }, [userCreated]);
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Users', path: '/apps/users' },
                    {
                        label: 'User Details',
                        path: '/apps/users',
                        active: true,
                    },
                ]}
                title={'User Details'}
            />
            {!loading && (
                <>
                    {formErrors && (
                        <Alert variant="danger" className="my-2">
                            {formErrors}
                        </Alert>
                    )}
                    {errorOccurred && (
                        <Alert variant="danger" className="my-2">
                            {error}
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Col
                                md={6}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}>
                                <form
                                // onSubmit={onSubmit}
                                // resolver={schemaResolver}
                                >
                                    <FormInput
                                        label={t('First Name')}
                                        type="text"
                                        name="firstname"
                                        placeholder={t('Enter First Name')}
                                        containerClass={'mb-2'}
                                        value={userDetails?.firstname}
                                        onChange={handleFormRecord}
                                    />

                                    <FormInput
                                        label={t('Last Name')}
                                        type="text"
                                        name="lastname"
                                        placeholder={t('Enter Last Name')}
                                        containerClass={'mb-2'}
                                        value={userDetails?.lastname}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Phone')}
                                        type="text"
                                        name="phone"
                                        placeholder={t('Enter your phone')}
                                        containerClass={'mb-2'}
                                        value={userDetails?.phone}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Email address')}
                                        type="email"
                                        name="email"
                                        placeholder={t('Enter your email')}
                                        containerClass={'mb-2'}
                                        value={userDetails?.email}
                                        onChange={handleFormRecord}
                                    />
                                    <div className="mb-3 mb-0 text-center">
                                        <Button variant="primary" disabled={loading} onClick={onSubmit}>
                                            {t('Submit')}
                                        </Button>
                                    </div>
                                </form>
                            </Col>
                        </Card.Body>
                    </Card>
                </>
            )}
        </>
    );
};
export default UserDetails;
