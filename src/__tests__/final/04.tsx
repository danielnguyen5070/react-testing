// import * as React from 'react'
// import { render, screen } from '@testing-library/react'
// import { vi, type Mock } from 'vitest'
// import { useGeolocated } from 'react-geolocated'
// import Location from '../../examples/location'

// ✅ Mock the module using Vitest
// vi.mock('react-geolocated', () => {
//     return {
//         useGeolocated: vi.fn(),
//     }
// })

// type GeolocationReturn = {
//     coords: {
//         latitude: number
//         longitude: number
//     } | null
//     isGeolocationAvailable: boolean
//     isGeolocationEnabled: boolean
// }

describe('<Location />', () => {
    // const setupMock = (mockValues: Partial<GeolocationReturn>) => {
    //     ((useGeolocated as unknown) as Mock).mockReturnValue({
    //         coords: null,
    //         isGeolocationAvailable: true,
    //         isGeolocationEnabled: true,
    //         ...mockValues,
    //     })
    // }

    test('shows latitude and longitude when coordinates are available', () => {
        // 🐨 set up the mock geolocation hook to return specific coordinates

        // 🐨 render the Location component

        // 🧪 assert that the latitude is displayed correctly

        // 🧪 assert that the longitude is displayed correctly
    })
})
