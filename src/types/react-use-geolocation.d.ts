declare module 'react-use-geolocation' {
  export function useCurrentPosition(): [
    GeolocationPosition | null,
    GeolocationPositionError | null
  ]
}