import { useGeolocated } from 'react-geolocated'
import Spinner from '../components/spinner'

function Location() {
    const { coords } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        })

    if (!coords) {
        return <Spinner />
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
