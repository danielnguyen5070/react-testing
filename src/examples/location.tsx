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
                <table className="w-full text-sm border-collapse">
                    <tbody>
                        <TableRow label="Latitude" value={coords.latitude} />
                        <TableRow label="Longitude" value={coords.longitude} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TableRow({ label, value }: { label: string; value: string | number | null }) {
    return (
        <tr className="border-b border-gray-300 dark:border-gray-600">
            <td className="py-2 font-medium">{label}</td>
            <td className="py-2 text-right">{value}</td>
        </tr>
    )
}

export default Location
