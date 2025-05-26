import { DirectionDataContext } from '@/context/DirectionDataContext';
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';
import CarsList from '@/data/CarsList';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

// Exchange rate: 1 USD ≈ 82.5 INR (update as needed)
const USD_TO_INR = 82.5;

function Cars() {
    const [selectedCar, setSelectedCar] = useState<number | null>(null);
    const { directionData } = useContext(DirectionDataContext);
    const {carAmount, setCarAmount} = useContext(SelectedCarAmountContext);

    const getCostInINR = (charges: number): string => {
        if (!directionData?.distance) return '—';
        // Convert meters to miles
        const miles = directionData.distance * 0.000621371192;
        // Cost in USD
        const costUSD = charges * miles;
        // Convert to INR
        const costINR = costUSD * USD_TO_INR;
        // Round to nearest rupee
        const rounded = Math.round(costINR);
        // Format with Indian locale
        return rounded.toLocaleString('en-IN');
    };

    return (
        <div className='mt-3'>
            <h2 className='font-medium text-[14px]'>Select Car</h2>
            <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
                {CarsList.map((item, index) => (
                    <div
                        key={item.id}
                        className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${index === selectedCar ? 'border-yellow-400 border-[2px]' : ''
                            }`}
                        onClick={() => {
                            setSelectedCar(index)
                            setCarAmount(getCostInINR(item.charges))
                        }}

                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={75}
                            height={90}
                            className='w-full'
                        />
                        <h2 className='text-[10px] text-gray-500'>
                            {item.name}
                            {directionData?.distance != null && (
                                <span className='float-right font-medium text-black'>
                                    ₹{getCostInINR(item.charges)}
                                </span>
                            )}
                        </h2>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Cars;
