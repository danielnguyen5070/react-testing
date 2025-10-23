import Location from '../../examples/location'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
beforeAll(() => {
    // @ts-expect-error -- just for test ---
    global.navigator.geolocation = {
        getCurrentPosition: vi.fn(),
        watchPosition: vi.fn(),
        clearWatch: vi.fn(),
    };
})

vi.mock('react-geolocated')

afterEach(() => {
    vi.clearAllMocks();
});

test('displays the users current location', async () => {
    const fakeGeolocation = {
        latitude: 35,
        longitude: 139,
    };

    // @ts-expect-error -- just for test ---
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) =>
        success({
            coords: {
                latitude: fakeGeolocation.latitude,
                longitude: fakeGeolocation.longitude,
            },
        }),
    )

    render(<Location />)

    await waitFor(() => {
        expect(screen.getByText(/latitude/i)).toHaveTextContent('Latitude: 35')
        expect(screen.getByText(/longitude/i)).toHaveTextContent('Longitude: 139')
    })
})

test('displays loading state when geolocation is not available yet', async () => {
    // @ts-expect-error -- just for test ---
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((success, error) =>
        error({
            code: 1,
            message: 'User denied Geolocation',
        }),
    )

    render(<Location />)

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
})