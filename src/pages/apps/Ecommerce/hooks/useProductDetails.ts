import { useState } from 'react';
import productImg1 from 'assets/images/products/product-5.jpg';
import { useRedux } from 'hooks';
import { Product } from '../types';

export default function useProductDetails() {
    const { dispatch, appSelector } = useRedux();
    const [selectedProductImg, setSelectedProductImg] = useState<string>(productImg1);
    const {
        products,
        totalRecords,
        createdProduct,
        isProductCreated,
    }: { products: Product[]; totalRecords: number; createdProduct: Product; isProductCreated: boolean } = appSelector(
        (state: any) => ({
            products: state.Products.results,
            totalRecords: state.Products.totalRecords,
            createdProduct: state.Products.createdProduct,
            isProductCreated: state.Products.isProductCreated,
        })
    );
    /**
     * Handles the image changes
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedProductImg(selectedImg);
        return false;
    };

    return { selectedProductImg, handleImgChange, products, totalRecords, dispatch, createdProduct, isProductCreated };
}
