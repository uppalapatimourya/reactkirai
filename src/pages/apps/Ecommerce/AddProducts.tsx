/* eslint-disable react-hooks/exhaustive-deps */
import { FileType, FileUploader, FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { ChangeEvent, Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from 'hooks';
import useProductDetails from './hooks/useProductDetails';
import { addProduct } from 'redux/actions';

const AddProduct = () => {
    interface MediaItem {
        name?: string;
        url: string;
        mediaType: string;
        isPrimary: boolean;
    }

    interface Tier {
        tierType: string;
        actualPrice: number;
        discountPer: number;
        currency?: string;
        priceWithDiscount: number;
        itemsIncluded: string[];
    }

    interface ProductDetails {
        title: string;
        description: string;
        category: string;
        sku: string;
        isPremium: boolean;
        thumbnailUrl: string;
        media: MediaItem[];
        tiers: Tier[]; // Replace `any` with a proper type if known
    }

    const [productDetails, setProductDetails] = useState<ProductDetails>({
        title: '',
        description: '',
        category: '',
        sku: '',
        isPremium: false,
        thumbnailUrl: '',
        media: [],
        tiers: [
            {
                tierType: 'Budget',
                actualPrice: 0,
                discountPer: 0,
                // currency: 'INR',
                priceWithDiscount: 0,
                itemsIncluded: [],
            },
            {
                tierType: 'Standard',
                actualPrice: 0,
                discountPer: 0,
                // currency: 'INR',
                priceWithDiscount: 0,
                itemsIncluded: [],
            },
            {
                tierType: 'Premium',
                actualPrice: 0,
                discountPer: 0,
                // currency: 'INR',
                priceWithDiscount: 0,
                itemsIncluded: [],
            },
        ],
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState<string>('');
    const { dispatch, isProductCreated, createdProduct } = useProductDetails();
    const params = useParams();
    const productId = params.Id ? params.Id : '0'; // todo for edit

    const navigate = useNavigate();
    const loggedInUser = useUser()[0];

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!productDetails.title.trim()) errors.title = 'Title is required.';
        if (!productDetails.description.trim()) errors.description = 'Description is required.';
        if (!productDetails.category.trim()) errors.category = 'Category is required.';
        if (!productDetails.sku.trim()) errors.sku = 'SKU is required.';
        if (!productDetails.thumbnailUrl.trim()) errors.thumbnailUrl = 'Thumbnail URL is required.';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value,
        }));
    };

    const handleImageUpload = (files: FileType[]) => {
        const uploadedImages = files.map((file) => ({
            url: file.preview || URL.createObjectURL(file),
            mediaType: 'IMAGE',
            isPrimary: false,
            // name: file.name,
        }));
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            media: [...prevDetails.media, ...uploadedImages],
        }));
    };

    const setPrimaryImage = (index: number) => {
        setProductDetails((prevDetails) => {
            const updatedMedia = prevDetails.media.map((item, i) => ({
                ...item,
                isPrimary: i === index,
            }));
            return { ...prevDetails, media: updatedMedia, thumbnailUrl: updatedMedia[index].url };
        });
    };

    const removeImage = (index: number) => {
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            media: prevDetails.media.filter((_, i) => i !== index),
        }));
    };

    const openImageModal = (image: string) => {
        setModalImage(image);
        setShowModal(true);
    };

    const handleTierChange = (index: number, field: keyof Tier, value: any) => {
        setProductDetails((prevDetails) => {
            const updatedTiers = [...prevDetails.tiers];
            updatedTiers[index] = {
                ...updatedTiers[index],
                [field]: value,
            };

            if (field === 'actualPrice' || field === 'discountPer') {
                updatedTiers[index].priceWithDiscount =
                    updatedTiers[index].actualPrice -
                    (updatedTiers[index].actualPrice * updatedTiers[index].discountPer) / 100;
            }

            return { ...prevDetails, tiers: updatedTiers };
        });
    };

    const addTierItem = (index: number, item: string) => {
        setProductDetails((prevDetails) => {
            const updatedTiers = [...prevDetails.tiers];
            if (item.trim()) {
                updatedTiers[index].itemsIncluded.push(item);
            }
            return { ...prevDetails, tiers: updatedTiers };
        });
    };

    // Custom Tiertype not included right now
    // const addCustomTier = (customTierType: string) => {
    //     if (customTierType.trim()) {
    //         setProductDetails((prevDetails) => ({
    //             ...prevDetails,
    //             tiers: [
    //                 ...prevDetails.tiers,
    //                 {
    //                     tierType: customTierType,
    //                     actualPrice: 0,
    //                     discountPer: 0,
    //                     currency: 'INR',
    //                     priceWithDiscount: 0,
    //                     itemsIncluded: [],
    //                 },
    //             ],
    //         }));
    //     }
    // };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Add API call logic here
            // console.log('Submitting product details:', productDetails, 'userr', loggedInUser, {
            //     ...productDetails,
            //     createdBy: loggedInUser.email,
            //     updatedBy: loggedInUser.email,
            // });

            dispatch(
                addProduct({
                    productDetails: {
                        ...productDetails,
                        createdBy: loggedInUser.email,
                        updatedBy: loggedInUser.email,
                    },
                })
            );
            navigate('/apps/products');
        } catch (err) {
            console.error('Failed to add product:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('isPrroductcreated', createdProduct, isProductCreated);
    }, [createdProduct]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Products', path: '/apps/products' },
                    {
                        label: 'Add Product',
                        path: '/apps/products/add',
                        active: true,
                    },
                ]}
                title={t('Add Product')}
            />
            {!loading && (
                <>
                    {Object.keys(formErrors).length > 0 && (
                        <Alert variant="danger" className="my-2">
                            Please fix the following errors:
                            <ul>
                                {Object.values(formErrors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <form>
                                        <FormInput
                                            label={t('Title')}
                                            type="text"
                                            name="title"
                                            placeholder={t('Enter product title')}
                                            containerClass={'mb-2'}
                                            value={productDetails.title}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.title && <small className="text-danger">{formErrors.title}</small>}

                                        <FormInput
                                            label={t('Description')}
                                            type="textarea"
                                            name="description"
                                            placeholder={t('Enter product description')}
                                            containerClass={'mb-2'}
                                            value={productDetails.description}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.description && (
                                            <small className="text-danger">{formErrors.description}</small>
                                        )}

                                        <FormInput
                                            label={t('Category')}
                                            type="text"
                                            name="category"
                                            placeholder={t('Enter product category')}
                                            containerClass={'mb-2'}
                                            value={productDetails.category}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.category && (
                                            <small className="text-danger">{formErrors.category}</small>
                                        )}

                                        <FormInput
                                            label={t('SKU')}
                                            type="text"
                                            name="sku"
                                            placeholder={t('Enter product SKU')}
                                            containerClass={'mb-2'}
                                            value={productDetails.sku}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.sku && <small className="text-danger">{formErrors.sku}</small>}

                                        <FormInput
                                            label={t('Thumbnail URL')}
                                            type="text"
                                            name="thumbnailUrl"
                                            placeholder={t('Enter thumbnail URL')}
                                            containerClass={'mb-2'}
                                            value={productDetails.thumbnailUrl}
                                            onChange={handleInputChange}
                                            disabled={true}
                                        />
                                        {formErrors.thumbnailUrl && (
                                            <small className="text-danger">{formErrors.thumbnailUrl}</small>
                                        )}

                                        <FormInput
                                            label={t('Premium Product')}
                                            type="checkbox"
                                            name="isPremium"
                                            containerClass={'mb-2'}
                                            checked={productDetails.isPremium}
                                            onChange={handleInputChange}
                                        />
                                    </form>
                                    {/* <div className="mb-3 mb-0 text-center">
                                            <Button variant="primary" disabled={loading} onClick={handleSubmit}>
                                                {t('Submit')}
                                            </Button>
                                        </div>
                                    </form> */}
                                </Col>

                                <Col md={6}>
                                    <h5>{t('Upload Product Images')}</h5>
                                    <FileUploader showPreview={false} onFileUpload={handleImageUpload} />
                                    <div
                                        className="image-preview-container"
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                            gap: '20px',
                                            paddingTop: '25px',
                                        }}>
                                        {productDetails.media.map((media, index) => (
                                            <div
                                                key={index}
                                                className="image-preview position-relative p-2 shadow-sm rounded"
                                                style={{
                                                    border: media.isPrimary ? '2px solid #28a745' : '1px solid #ddd',
                                                    textAlign: 'center',
                                                    backgroundColor: '#f9f9f9',
                                                }}>
                                                {/* Close Button */}
                                                <button
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                    style={{
                                                        transform: 'translate(50%, -50%)',
                                                        zIndex: 10,
                                                        borderRadius: '50%',
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage(index);
                                                    }}>
                                                    &times;
                                                </button>
                                                {/* Image Preview */}
                                                <img
                                                    src={media.url}
                                                    alt={`Preview ${index}`}
                                                    className="img-thumbnail"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        marginBottom: '10px',
                                                        borderRadius: '8px',
                                                    }}
                                                    onClick={() => openImageModal(media.url)}
                                                />
                                                {/* Image Name */}
                                                <div
                                                    className="text-truncate text-muted"
                                                    style={{ fontSize: '12px', marginBottom: '5px' }}
                                                    title={media.name || `Image ${index + 1}`}>
                                                    {media.name || t(`Image ${index + 1}`)}
                                                </div>
                                                {/* Set as Primary Button */}
                                                <div>
                                                    <Button
                                                        size="sm"
                                                        variant={media.isPrimary ? 'success' : 'secondary'}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPrimaryImage(index);
                                                        }}>
                                                        {media.isPrimary ? t('Primary') : t('Set as Primary')}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h5>{t('Product Tiers')}</h5>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>{t('Tier Type')}</th>
                                                <th>{t('Actual Price')}</th>
                                                <th>{t('Discount %')}</th>
                                                {/* <th>{t('Currency')}</th> */}
                                                <th>{t('Price with Discount')}</th>
                                                <th>{t('Items Included')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productDetails.tiers.map((tier, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {tier.tierType !== 'Custom' ? (
                                                            <Form.Select
                                                                value={tier.tierType}
                                                                onChange={(e) =>
                                                                    handleTierChange(index, 'tierType', e.target.value)
                                                                }>
                                                                <option value="Budget">Budget</option>
                                                                <option value="Standard">Standard</option>
                                                                <option value="Premium">Premium</option>
                                                            </Form.Select>
                                                        ) : (
                                                            <Form.Control
                                                                type="text"
                                                                value={tier.tierType}
                                                                onChange={(e) =>
                                                                    handleTierChange(index, 'tierType', e.target.value)
                                                                }
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="number"
                                                            value={tier.actualPrice}
                                                            onChange={(e) =>
                                                                handleTierChange(
                                                                    index,
                                                                    'actualPrice',
                                                                    parseFloat(e.target.value) || 0
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="number"
                                                            value={tier.discountPer}
                                                            onChange={(e) =>
                                                                handleTierChange(
                                                                    index,
                                                                    'discountPer',
                                                                    parseFloat(e.target.value) || 0
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    {/* For Currency */}
                                                    {/* <td>
                                                        <Form.Select
                                                            value={tier.currency}
                                                            onChange={(e) =>
                                                                handleTierChange(index, 'currency', e.target.value)
                                                            }>
                                                            <option value="INR">INR</option>
                                                            <option value="USD">USD</option>
                                                        </Form.Select>
                                                    </td> */}
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={tier.priceWithDiscount.toFixed(2)}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            {tier.itemsIncluded.map(
                                                                (
                                                                    item:
                                                                        | boolean
                                                                        | ReactChild
                                                                        | ReactFragment
                                                                        | ReactPortal
                                                                        | null
                                                                        | undefined,
                                                                    idx: Key | null | undefined
                                                                ) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="badge bg-primary me-1 mb-1">
                                                                        {item}
                                                                    </span>
                                                                )
                                                            )}
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={t('Add Item')}
                                                                className="me-2 mt-1"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        addTierItem(index, e.currentTarget.value);
                                                                        e.currentTarget.value = '';
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {/* For Custom Tier can be used Later */}
                                    {/* <div className="d-flex align-items-center mt-3">
                                        <Form.Control
                                            type="text"
                                            placeholder={t('Custom Tier Name')}
                                            className="me-2"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addCustomTier(e.currentTarget.value);
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                        />
                                        <Button variant="link" onClick={() => addCustomTier(t('Custom'))}>
                                            {t('Add Tier')}
                                        </Button>
                                    </div> */}
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col className="text-end">
                                    <Button variant="primary" onClick={handleSubmit}>
                                        {t('Submit')}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                        <Modal.Body>
                            <img src={modalImage} alt="Preview" style={{ width: '100%' }} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
};

export default AddProduct;
