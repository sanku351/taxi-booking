import { DirectionDataContext } from '@/context/DirectionDataContext';
import React, { useContext } from 'react';

function DistanceTime() {
  const { directionData } = useContext(DirectionDataContext);

  // directionData now holds a single route object with distance (in meters) and duration (in seconds)
  const distanceMeters = directionData?.distance;
  const durationSeconds = directionData?.duration;

  if (distanceMeters == null || durationSeconds == null) {
    return null;
  }

  // Convert to desired units
  const distanceKm = (distanceMeters / 1000).toFixed(2);
  const durationMin = (durationSeconds / 60).toFixed(2);

  return (
    <div className="bg-yellow-500 p-3">
      <h2 className="text-yellow-100 opacity-80 text-[15px]">
        Distance: <span className="font-bold mr-3 text-black">{distanceKm} km</span>
        Duration: <span className="font-bold text-black">{durationMin} min</span>
      </h2>
    </div>
  );
}

export default DistanceTime;
