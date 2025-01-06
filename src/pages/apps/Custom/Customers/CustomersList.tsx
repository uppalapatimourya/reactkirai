/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { FormInput, PageTitle } from 'components';
import useCustomer from './hooks/useCustomer';
import { useEffect, useState } from 'react';
import { getAllCustomers } from 'redux/actions';
import { Link } from 'react-router-dom';
import { Customer } from './CustomerTypes';
const CustomerList = () => {
    const { customers, dispatch, handleAddEdit, handleDeleteAction } = useCustomer();
    const [deleteCustomerId, setDeleteCustomerId] = useState(null); // Track the customer ID to delete

    useEffect(() => {
        dispatch(getAllCustomers());
    }, []);

    // Function to confirm and delete the customer
    const confirmDelete = () => {
        if (deleteCustomerId) {
            handleDeleteAction(deleteCustomerId);
            setDeleteCustomerId(null);
        }
    };
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Customers', path: '/apps/customers' },
                    { label: 'Customer List', path: '/apps/customers', active: true },
                ]}
                title={'Customer List'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xl={8}>
                                    <Row className="gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <Col xs="auto">
                                            <FormInput type="text" name="search" placeholder="Search..." />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Group as={Row}>
                                                <Form.Label htmlFor="exampleEmail3" column sm={3}>
                                                    Status
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <FormInput
                                                        name="select"
                                                        type="select"
                                                        className="form-select"
                                                        key="select">
                                                        <option>Choose...</option>
                                                        <option>Paid</option>
                                                        <option>Awaiting Authorization</option>
                                                        <option>Payment failed</option>
                                                        <option>Cash On Delivery</option>
                                                        <option>Fulfilled</option>
                                                        <option>Unfulfilled</option>
                                                    </FormInput>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={4}>
                                    <div className="text-xl-end mt-xl-0 mt-2">
                                        <Button variant="primary" className="mb-2 me-2" id="0" onClick={handleAddEdit}>
                                            <i className="mdi mdi-user me-1"></i> Add New Customer
                                        </Button>
                                        <Button variant="light" className="mb-2">
                                            Export
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Table responsive className="table-centered table-nowrap mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: '20px' }}>
                                            <Form>
                                                <Form.Check type="checkbox" id="all" />
                                            </Form>
                                        </th>
                                        <th>Customer ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        {/* <th>Date Order</th>
                    <th>Order Status</th> */}
                                        <th style={{ width: '125px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(customers || []).map((customer: Customer, index: number) => {
                                        return (
                                            <tr key={index.toString()}>
                                                <td>
                                                    <Form>
                                                        <Form.Check type="checkbox" id={customer.id} />
                                                    </Form>
                                                </td>
                                                <td>
                                                    <Link to="#" className="text-body fw-bold">
                                                        {customer.id}
                                                    </Link>
                                                </td>
                                                {/* <td>
                                <div className="d-flex">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <img src={customer.avatar} className="rounded-circle avatar-xs" alt="friend" />
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <h5 className="my-0">{customer.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            </td> */}
                                                <td>
                                                    {customer.firstname} {customer.lastname}
                                                </td>
                                                <td>{customer.email}</td>
                                                {/* <td>
                                <h5 className="my-0">{customer.country}</h5>
                                <p className="mb-0 txt-muted">{customer.city}</p>
                            </td> */}
                                                <td>{customer.role}</td>
                                                {/* <td>
                                <h5 className="my-0">
                                    <Badge
                                        bg=""
                                        className={classNames({
                                            'badge-info-lighten': customer.customerStatus === 'In Progress',
                                            'badge-success-lighten': customer.customerStatus === 'Complete',
                                            'badge-warning-lighten': customer.customerStatus === 'Pending',
                                            'badge-primary-lighten': customer.customerStatus === 'Delivered',
                                        })}>
                                        {customer.customerStatus}
                                    </Badge>
                                </h5>
                            </td> */}
                                                <td>
                                                    <div className="action-icon">
                                                        {' '}
                                                        <i
                                                            className="mdi mdi-eye"
                                                            id={customer.id?.toString()}
                                                            onClick={handleAddEdit}></i>
                                                    </div>
                                                    <div className="action-icon">
                                                        {' '}
                                                        <i
                                                            className="mdi mdi-square-edit-outline"
                                                            id={customer.id?.toString()}
                                                            onClick={handleAddEdit}></i>
                                                    </div>
                                                    <div className="action-icon">
                                                        {' '}
                                                        <i
                                                            className="mdi mdi-delete"
                                                            id={customer.id?.toString()}
                                                            onClick={(customer: any) =>
                                                                setDeleteCustomerId(customer.target.id)
                                                            }></i>
                                                    </div>{' '}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>{' '}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Modal for delete confirmation */}
            <Modal show={!!deleteCustomerId} onHide={() => setDeleteCustomerId(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this customer?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setDeleteCustomerId(null)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomerList;
