import React, { useState, forwardRef } from "react";
import Form from 'react-bootstrap/Form';
import { usePlacesWidget } from "react-google-autocomplete";
import Map from './Map.jsx'

function LocationSelector(props) {
    const [coordinates, setCoordinates] = useState({
        lat: 41.876,
        lng: -87.640
    });

    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyA2yRQBgLZsUUJZEjyDn5W0TzDkvGaSphs",
        onPlaceSelected: (place) => {
            if (!place || !('geometry' in place)) {
                return;
            }
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setCoordinates({
                lat: lat,
                lng: lng
            });
            props.onMapUpdate(lat,lng);
        },
    });

    return (
        <div>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    ref={bootstrapRef}
                    defaultValue="Chicago, IL, USA"
                />
            </Form.Group>
            <Map center={coordinates} />
        </div>
    );
}

export default LocationSelector;