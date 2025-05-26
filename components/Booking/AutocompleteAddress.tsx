import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import React, { useContext, useEffect, useState } from 'react';

function AutocompleteAddress() {
  const [source, setSource] = useState('');
  const [sourceChange, setSourceChange] = useState(false);
  const [destinationChange, setDestinationChange] = useState(false);

  const { setSourceCordinates } = useContext(SourceCordiContext);
  const { setDestinationCordinates } = useContext(DestinationCordiContext);

  const [addressList, setAddressList] = useState<any[]>([]);
  const [destination, setDistination] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]);
    const query = sourceChange ? source : destination;
    if (!query) return;

    const res = await fetch('/api/search-address?q=' + query, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await res.json();
    setAddressList(result);
  };

  const onSourceAddressClick = (item: any) => {
    setSource(item.display_name);
    setAddressList([]);
    setSourceChange(false);

    setSourceCordinates({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    });

    console.log('Selected Source:', item);
  };

  const onDestinationAddressClick = (item: any) => {
    setDistination(item.display_name);
    setAddressList([]);
    setDestinationChange(false);

    setDestinationCordinates({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    });

    console.log('Selected Destination:', item);
  };

  return (
    <div className=''>
      <div className='relative'>
        <label className='text-gray-400 text-[13px]'>Where From?</label>
        <input
          type="text"
          className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]'
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />

        {addressList?.length > 0 && sourceChange && (
          <div className='shadow-md p-1 rounded-md absolute w-full bg-white z-20 max-h-[200px] overflow-y-auto'>
            {addressList.map((item: any, index: number) => (
              <h2
                key={index}
                className='p-3 hover:bg-gray-100 cursor-pointer'
                onClick={() => onSourceAddressClick(item)}
              >
                {item.display_name}
              </h2>
            ))}
          </div>
        )}
      </div>

      <div className='relative'>
        <label className='text-gray-400 text-[13px]'>Where To?</label>
        <input
          type="text"
          className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]'
          value={destination}
          onChange={(e) => {
            setDistination(e.target.value);
            setDestinationChange(true);
          }}
        />

        {addressList?.length > 0 && destinationChange && (
          <div className='shadow-md p-1 rounded-md absolute w-full bg-white max-h-[200px] overflow-y-auto'>
            {addressList.map((item: any, index: number) => (
              <h2
                key={index}
                className='p-3 hover:bg-gray-100 cursor-pointer'
                onClick={() => onDestinationAddressClick(item)}
              >
                {item.display_name}
              </h2>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AutocompleteAddress;
