import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Column } from 'react-table';
import { PageTitle, Table, CellFormatter, PageSize } from 'components';
import { Service } from './types';
import useServiceDetails from './hooks/useServiceDetails';
import { getServices } from 'redux/services/actions';

const Services = () => {
    const { dispatch, services } = useServiceDetails(); // Assume totalRecords is returned by the server
    console.log(services)
    // Fetch services based on the current page and page size
    useEffect(() => {
        dispatch(getServices({ limit: 10, page: 1, tenantId: 'tenant1' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: ReadonlyArray<Column<any>> = [
        {
            Header: 'Service',
            accessor: 'name',
            defaultCanSort: true,
            Cell: ({ row }: CellFormatter<any>) => (
                <>
                    {/* <img
                        src={row.original.imageUrl}
                        alt={row.original.name}
                        className="rounded me-3"
                        height="48"
                    /> */}
                    <p className="m-0 d-inline-block align-middle font-16">
                        <Link to="/apps/services/details" className="text-body">
                            {row.original.name}
                        </Link>
                    </p>
                </>
            ),
        },
        {
            Header: 'Description',
            accessor: 'description',
            defaultCanSort: true,
        },
        {
            Header: 'Price',
            accessor: 'price',
            defaultCanSort: true,
        },
        {
            Header: 'Discount',
            accessor: 'discount',
            defaultCanSort: true,
        },
        {
            Header: 'Reviews',
            accessor: 'reviews',
            defaultCanSort: true,
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            defaultCanSort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }: CellFormatter<Service>) => (
                <>
                    <Link to="#" className="action-icon">
                        <i className="mdi mdi-eye"></i>
                    </Link>
                    <Link to="#" className="action-icon">
                        <i className="mdi mdi-square-edit-outline"></i>
                    </Link>
                    <Link to="#" className="action-icon">
                        <i className="mdi mdi-delete"></i>
                    </Link>
                </>
            ),
        },
    ];

    const sizePerPageList: PageSize[] = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '20', value: 20 },
    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Services', path: '/apps/services' },
                    { label: 'Service List', path: '/apps/services', active: true },
                ]}
                title={'Services'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link to="#" className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Service
                                    </Link>
                                </Col>

                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button variant="success" className="mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button variant="light" className="mb-2 me-1">
                                            Import
                                        </Button>

                                        <Button variant="light" className="mb-2">
                                            Export
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            {services?.length > 0 ? (
                                <Table<Service>
                                    columns={columns}
                                    data={services}
                                    pageSize={10}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                />
                            ) : (
                                <p className="text-center">No services available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Services;
