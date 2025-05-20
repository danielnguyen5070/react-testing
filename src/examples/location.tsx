import * as React from 'react'
import { useGeolocated } from 'react-geolocated'

function Location() {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        })

    if (!isGeolocationAvailable) {
        return (
            <div className="text-red-600 text-center p-4">
                Your browser does not support Geolocation
            </div>
        )
    }

    if (!isGeolocationEnabled) {
        return (
            <div className="text-yellow-600 text-center p-4">
                Geolocation is not enabled
            </div>
        )
    }

    if (!coords) {
        return (
            <div className="text-blue-600 text-center p-4">
                Getting the location data&hellip;
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800 rounded">
            <div className="max-w-md min-w-sm mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-center mt-12">Your Location</h2>
                <p>Latitude: {coords.latitude}</p>
                <p>Longitude: {coords.longitude}</p>
            </div>
        </div>
    )
}


export default Location
