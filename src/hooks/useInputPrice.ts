import { useState } from 'react';
import { useFormatPrice } from './useFormatPrice';

export const usePriceInput = () => {
    const { formatPrice } = useFormatPrice();

    const [formattedPrice, setFormattedPrice] = useState('');

    const handleInputPriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value.replace(/\D/g, '');
        const priceLimit = 100000000;
        const inputValueAsNumber = Math.min(Number(inputValue), priceLimit);

        setFormattedPrice(formatPrice(inputValueAsNumber.toString()));
    };

    return { formattedPrice, handleInputPriceChange };
};
