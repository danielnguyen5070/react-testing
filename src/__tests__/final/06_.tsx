import Location from '../../examples/location'
import { render, screen, waitFor } from '@testing-library/react'
import { useGeolocated } from "react-geolocated";
import { vi } from 'vitest'

vi.mock('react-geolocated')

beforeEach(() => {
    vi.clearAllMocks();
});

test('displays the users current location', async () => {
    // @ts-expect-error -- just for test ---
    useGeolocated.mockReturnValue({
        coords: {
            latitude: 35,
            longitude: 139,
        },
    });

    render(<Location />)

    await waitFor(() => {
        expect(screen.getByText(/latitude/i)).toHaveTextContent('Latitude: 35')
        expect(screen.getByText(/longitude/i)).toHaveTextContent('Longitude: 139')
    })
})

test('displays loading state when geolocation is not available yet', async () => {
    // @ts-expect-error -- just for test ---
    useGeolocated.mockReturnValue({
        coords: null,
    });

    render(<Location />)

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
})