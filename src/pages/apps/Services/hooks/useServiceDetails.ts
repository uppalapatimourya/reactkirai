import { useState } from 'react';
import { useRedux } from 'hooks';
import { Service } from '../types';

export default function useServiceDetails() {
    const { dispatch, appSelector } = useRedux();
    const [selectedServiceImg, setSelectedServiceImg] = useState<string>('');
    const { services, totalRecords }: { services: Service[]; totalRecords: number } = appSelector((state: any) => ({
        services: state.Services?.results,
        totalRecords: state.Services?.totalRecords,
    }));

    /**
     * Handles the image changes for the service
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedServiceImg(selectedImg);
        return false;
    };

    return { selectedServiceImg, handleImgChange, services, totalRecords, dispatch };
}
