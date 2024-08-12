import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ onLocationSelected }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelected(e.latlng);
    },
  });

  return null;
}

export default function MapPicker({ onLocationSelected }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '300px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onLocationSelected={onLocationSelected} />
    </MapContainer>
  );
}