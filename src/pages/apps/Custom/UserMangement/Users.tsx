/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { Table, PageTitle, CellFormatter, PageSize } from 'components';
import { useEffect, useState } from 'react';
import { getAllUsers, User } from 'redux/actions';
import { Spinner } from 'components';
import useUser from './hooks/useUser';
import { UserData } from 'pages/account/Register2';
import { useModal } from 'pages/uikit/hooks';

const Users = () => {
    const { users, loading, handleAddEdit, handleDeleteAction, dispatch } = useUser();
    const [columns, setColumns] = useState<any>([]);

    /* name column render */
    const NameColumn = ({ row }: CellFormatter<User>) => {
        return (
            <div className="table-user">
                {/* <img src={row.original.avatar} alt="" className="me-2 rounded-circle" /> */}
                <Link to="#" className="text-body fw-semibold">
                    {row.original.firstname} {row.original.lastname}
                </Link>
            </div>
        );
    };

    /* status column render */
    const StatusColumn = ({ row }: CellFormatter<User>) => {
        return (
            <span
                className={classNames('badge', {
                    'badge-success-lighten': row.original.isEmailVerified === true,
                    'badge-danger-lighten': row.original.isEmailVerified === false,
                })}>
                {row.original.isEmailVerified}
            </span>
        );
    };

    /* action column render */
    const ActionColumn = ({ row }: CellFormatter<UserData>) => {
        const { isOpen, className, scroll, toggleModal } = useModal();

        return (
            <>
                <div className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye" id={row.original.id?.toString()} onClick={handleAddEdit}></i>
                </div>
                <div className="action-icon">
                    {' '}
                    <i
                        className="mdi mdi-square-edit-outline"
                        id={row.original.id?.toString()}
                        onClick={handleAddEdit}></i>
                </div>
                <div className="action-icon">
                    {' '}
                    <i className="mdi mdi-delete" id={row.original.id?.toString()} onClick={toggleModal}></i>
                </div>

                <Modal show={isOpen} onHide={toggleModal} dialogClassName={className} size={'sm'} scrollable={scroll}>
                    <Modal.Header onHide={toggleModal} closeButton>
                        <h4 className="modal-title">Warning</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>
                                Are you sure you want to delete {row.original?.firstname} {row.original?.lastname}?
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            id={row.original?.id?.toString()}
                            key={row.original.firstname}
                            onClick={(event) => {
                                handleDeleteAction(event);
                                toggleModal();
                            }}>
                            Delete
                        </Button>{' '}
                        <Button variant="light" onClick={toggleModal}>
                            Close
                        </Button>{' '}
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    const sizePerPageList: PageSize[] = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
        {
            text: 'All',
            value: users?.length,
        },
    ];
    // Function to update columns based on viewport width
    const updateColumns = () => {
        const mobileColumns = [
            {
                Header: 'Name',
                accessor: 'name',
                defaultCanSort: true,
                Cell: NameColumn,
            },
            {
                Header: 'Email',
                accessor: 'email',
                defaultCanSort: true,
            },
        ];

        const desktopColumns = [
            ...mobileColumns,

            {
                Header: 'Role',
                accessor: 'role',
                defaultCanSort: true,
            },
            {
                Header: 'Email Verified',
                accessor: 'isEmailVerified',
                defaultCanSort: true,
                Cell: StatusColumn,
            },
            {
                Header: 'Action',
                accessor: 'action',
                defaultCanSort: false,
                Cell: ActionColumn,
            },
        ];
        if (window.innerWidth < 768) {
            setColumns(mobileColumns);
        } else {
            setColumns(desktopColumns);
        }
    };
    // Initialize columns on component mount
    useEffect(() => {
        updateColumns();
        // Add a listener for window resize events
        window.addEventListener('resize', updateColumns);
        return () => {
            window.removeEventListener('resize', updateColumns);
        };
    }, []);
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Apps', path: '/apps/users' },
                    {
                        label: 'Users',
                        path: '/apps/users',
                        active: true,
                    },
                ]}
                title={'Users'}
            />
            {loading && (
                <div style={{ textAlign: 'center' }}>
                    <Spinner className="text-primary m-2" color="primary" />
                </div>
            )}
            {!loading && (
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col sm={5}>
                                        <Button className="btn btn-danger mb-2" id="0" onClick={handleAddEdit}>
                                            <i className="mdi mdi-plus-circle me-2"></i> Add Users
                                        </Button>
                                    </Col>

                                    <Col sm={7}>
                                        <div className="text-sm-end">
                                            <Button className="btn btn-success mb-2 me-1">
                                                <i className="mdi mdi-cog"></i>
                                            </Button>

                                            <Button className="btn btn-light mb-2 me-1">Import</Button>

                                            <Button className="btn btn-light mb-2">Export</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Table<UserData>
                                    columns={columns}
                                    data={users}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSelectable={true}
                                    isSearchable={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default Users;
