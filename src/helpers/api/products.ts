import { APICore } from './apiCore';

const api = new APICore();

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
    createdBy: string;
    updatedBy: string;
}

function getProducts(params: { limit: number; page: number; customerId: number }) {
    const baseUrl = '/admin/products';
    return api.get(`${baseUrl}`, params);
}

function addProduct(params: { productDetails: ProductDetails }) {
    const baseUrl = '/admin/products';
    return api.create(`${baseUrl}`, params);
}

export { getProducts, addProduct };
