import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, type Mock } from 'vitest'
import { useGeolocated } from 'react-geolocated'
import Location from '../../examples/location'

// ✅ Mock the module using Vitest
vi.mock('react-geolocated', () => {
  return {
    useGeolocated: vi.fn(),
  }
})

type GeolocationReturn = {
  coords: {
    latitude: number
    longitude: number
  } | null
  isGeolocationAvailable: boolean
  isGeolocationEnabled: boolean
}

describe('<Location />', () => {
  const setupMock = (mockValues: Partial<GeolocationReturn>) => {
    ((useGeolocated as unknown) as Mock).mockReturnValue({
      coords: null,
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      ...mockValues,
    })
  }
  test('shows message when geolocation is not available', () => {
    setupMock({ isGeolocationAvailable: false })

    render(<Location />)

    expect(
      screen.getByText(/your browser does not support geolocation/i)
    ).toBeInTheDocument()
  })

  test('shows message when geolocation is not enabled', () => {
    setupMock({ isGeolocationEnabled: false })

    render(<Location />)

    expect(
      screen.getByText(/geolocation is not enabled/i)
    ).toBeInTheDocument()
  })

  test('shows loading message when coordinates are not yet available', () => {
    setupMock({ coords: null })

    render(<Location />)

    expect(
      screen.getByText(/getting the location data/i)
    ).toBeInTheDocument()
  })

  test('shows latitude and longitude when coordinates are available', () => {
    setupMock({
      coords: {
        latitude: 10.1234,
        longitude: 106.5678,
      },
    })

    render(<Location />)
    screen.debug()
    expect(screen.getByText(/latitude/i)).toHaveTextContent('Latitude: 10.1234')
    expect(screen.getByText(/longitude/i)).toHaveTextContent('Longitude: 106.5678')
  })
})
