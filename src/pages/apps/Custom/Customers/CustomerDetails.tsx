/* eslint-disable react-hooks/exhaustive-deps */
import { FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getCustomerByIdAction } from 'redux/actions'; // Import the appropriate action for fetching customer details
import useCustomer from './hooks/useCustomer'; // Import the appropriate custom hook for managing customer data

const CustomerDetails = () => {
    const {
        loading,
        error,
        formErrors,
        customerDetailsById,
        customerDetails,
        customerCreated,
        setCustomerDetails, // Modify the function name based on your custom hook
        dispatch,
        handleFormRecord,
        onSubmit,
    } = useCustomer(); // Use the appropriate custom hook for customer data
    const params = useParams();
    const customerId = params.Id ? params.Id : '0';

    useEffect(() => {
        if (customerId !== '0') {
            dispatch(getCustomerByIdAction(+customerId)); // Dispatch the appropriate action to fetch customer details
        }
    }, []);

    useEffect(() => {
        if (customerId !== '0') {
            setCustomerDetails(customerDetailsById);
        } // Modify the function name based on your custom hook
    }, [customerDetailsById]);

    const [errorOccurred, setErrorOccurred] = useState('');
    const [customerCreatedStatus, setCustomerCreatedStatus] = useState('');

    useEffect(() => {
        if (error) {
            setErrorOccurred(error);
            setTimeout(() => {
                setErrorOccurred('');
            }, 3000);
        }
    }, [error]);
    useEffect(() => {
        if (customerCreated) {
            setCustomerCreatedStatus('Customer Created');
            setTimeout(() => {
                setCustomerCreatedStatus('');
            }, 30000);
        }
    }, [customerCreated]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Customers', path: '/apps/customers' },
                    {
                        label: 'Customer Details',
                        path: '/apps/customers',
                        active: true,
                    },
                ]}
                title={'Customer Details'}
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
                    {customerCreatedStatus && (
                        <Alert variant="success" className="my-2">
                            {customerCreatedStatus}{' '}
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Col
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}>
                                <form>
                                    <Row>
                                        <Col md={6} xs={12}>
                                            <FormInput
                                                label={t('First Name')}
                                                type="text"
                                                name="firstname"
                                                placeholder={t('Enter First Name')}
                                                containerClass={'mb-2'}
                                                value={customerDetails?.firstname}
                                                onChange={handleFormRecord}
                                            />
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <FormInput
                                                label={t('Last Name')}
                                                type="text"
                                                name="lastname"
                                                placeholder={t('Enter Last Name')}
                                                containerClass={'mb-2'}
                                                value={customerDetails?.lastname}
                                                onChange={handleFormRecord}
                                            />
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <FormInput
                                                label={t('Email address')}
                                                type="email"
                                                name="email"
                                                placeholder={t('Enter Email')}
                                                containerClass={'mb-2'}
                                                value={customerDetails?.email}
                                                onChange={handleFormRecord}
                                            />
                                        </Col>
                                        <div className="mb-3 mb-0 text-center">
                                            <Button variant="primary" disabled={loading} onClick={onSubmit}>
                                                {t('Submit')}
                                            </Button>
                                        </div>
                                    </Row>{' '}
                                </form>
                            </Col>
                        </Card.Body>
                    </Card>
                </>
            )}
        </>
    );
};

export default CustomerDetails;
