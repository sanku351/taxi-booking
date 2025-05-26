'use client';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useContext, useEffect } from 'react';
import { UserLocationContext } from '@/context/UserLocationContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import DistanceTime from './DistanceTime';
import 'leaflet/dist/leaflet.css';

// 1) Define your custom icons
const userIcon = L.icon({
    iconUrl: '/pin.png',
    iconSize: [32, 32],      // adjust to your image size
    iconAnchor: [16, 32],    // point of the icon which will correspond to marker's location
});

const sourceIcon = L.icon({
    iconUrl: '/location.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const destIcon = L.icon({
    iconUrl: '/location.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 14, { duration: 2 });
        }
    }, [lat, lng, map]);
    return null;
}

export default function MapboxMap() {
    const { userLocation } = useContext(UserLocationContext);
    const { soruceCordinates } = useContext(SourceCordiContext);
    const { destinationCordinates } = useContext(DestinationCordiContext);
    const { directionData, setDirectionData } = useContext(DirectionDataContext);

    // fetch route from OSRM when both ends are set
    useEffect(() => {
        if (soruceCordinates?.lng && destinationCordinates?.lng) {
            (async () => {
                const resp = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/` +
                    `${soruceCordinates.lng},${soruceCordinates.lat};` +
                    `${destinationCordinates.lng},${destinationCordinates.lat}` +
                    `?overview=full&geometries=geojson`
                );
                const json = await resp.json();
                setDirectionData(json.routes[0]);
            })();
        }
    }, [soruceCordinates, destinationCordinates, setDirectionData]);

    return (
        <div className="p-5">
            <h2 className="text-[20px] font-semibold">Map</h2>
            <DistanceTime/>
            <div className="relative rounded-lg overflow-hidden">
                {userLocation && (
                    <MapContainer
                        center={[userLocation.lat, userLocation.lng]}
                        zoom={14}
                        scrollWheelZoom
                        style={{ height: '500px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />

                        {/* 2) Use your custom icons on each Marker */}
                        <Marker
                            position={[userLocation.lat, userLocation.lng]}
                            icon={userIcon}
                        />

                        {soruceCordinates?.lat && (
                            <Marker
                                position={[soruceCordinates.lat, soruceCordinates.lng]}
                                icon={sourceIcon}
                            />
                        )}

                        {destinationCordinates?.lat && (
                            <Marker
                                position={[destinationCordinates.lat, destinationCordinates.lng]}
                                icon={destIcon}
                            />
                        )}

                        {directionData?.geometry?.coordinates && (
                            <Polyline
                                positions={directionData.geometry.coordinates.map(
                                    ([lng, lat]: [number, number]) => [lat, lng]
                                )}
                                pathOptions={{ color: '#0462d4', weight: 4 }}
                            />
                        )}

                        <FlyToLocation
                            lat={destinationCordinates?.lat ?? soruceCordinates?.lat ?? userLocation.lat}
                            lng={destinationCordinates?.lng ?? soruceCordinates?.lng ?? userLocation.lng}
                        />
                    </MapContainer>
                )}
                {/* <div className="absolute bottom-[40px] right-[20px] z-50">
                    <DistanceTime />
                </div> */}
            </div>


        </div>
    );
}
