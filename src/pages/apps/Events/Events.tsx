import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Column } from 'react-table';
import { PageTitle, Table, CellFormatter, PageSize } from 'components';
import { IEvent} from '../Events/types';
import { getEvents } from 'redux/events/actions';
import useEventDetails from './hooks/useEventDetails';

const Events = () => {
    const { dispatch, events } = useEventDetails(); // Assume totalRecords is returned by the server
    console.log(events)
    // Fetch events based on the current page and page size
    useEffect(() => {
        dispatch(getEvents({ limit: 10, page: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: ReadonlyArray<Column<any>> = [
        {
            Header: 'Event',
            accessor: 'eventName',
            defaultCanSort: true,
            Cell: ({ row }: CellFormatter<any>) => (
                <>
                    <p className="m-0 d-inline-block align-middle font-16">
                        <Link to="/apps/events/details" className="text-body">
                            {row.original.eventName}
                        </Link>
                    </p>
                </>
            ),
        },
        {
            Header: 'Location',
            accessor: 'location',
            defaultCanSort: true,
        },
        {
            Header: 'Date',
            accessor: 'date',
            defaultCanSort: true,
        },
        {
            Header: 'Created',
            accessor: 'createdAt',
            defaultCanSort: true,
        },
        {
            Header: 'Rating',
            accessor: 'ratingValue',
            defaultCanSort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }: CellFormatter<any>) => (
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
                    { label: 'Events', path: '/apps/events' },
                    { label: 'Event List', path: '/apps/events', active: true },
                ]}
                title={'Events'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link to="#" className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Event
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
                            {events?.length > 0 ? (
                                <Table<IEvent>
                                    columns={columns}
                                    data={events}
                                    pageSize={10}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                />
                            ) : (
                                <p className="text-center">No events available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Events;
