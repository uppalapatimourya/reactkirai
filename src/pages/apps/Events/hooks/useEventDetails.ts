import { useState } from 'react';
import { useRedux } from 'hooks';
import { IEvent} from '../types';

export default function useEventDetails() {
    const { dispatch, appSelector } = useRedux();
    const [selectedEventImg, setSelectedEventImg] = useState<string>('');
    const { events, totalRecords }: { events: IEvent[]; totalRecords: number } = appSelector((state: any) => ({
        events: state.Events?.results,
        totalRecords: state.Events?.totalRecords,
    }));

    /**
     * Handles the image changes for the event
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedEventImg(selectedImg);
        return false;
    };

    return { selectedEventImg, handleImgChange, events, totalRecords, dispatch };
}
