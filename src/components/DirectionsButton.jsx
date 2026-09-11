import business from '../config/business'

function DirectionsButton({ label = 'Get Directions', className = '', type = 'button' }) {
  const openDirections = () => {
    if (!('geolocation' in navigator)) {
      window.alert('Location access is not supported in this browser.')
      window.open(business.googleMapsUrl, '_blank', 'noopener,noreferrer')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        const destination = encodeURIComponent(
          `${business.businessName} ${business.landmark} ${business.address}`,
        )

        const mapsUrl = business.latitude && business.longitude
          ? `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${business.latitude},${business.longitude}`
          : `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`

        window.open(mapsUrl, '_blank', 'noopener,noreferrer')
      },
      (error) => {
        const messageMap = {
          1: 'Location access was not enabled.',
          2: 'Location information is unavailable right now.',
          3: 'Location request timed out.',
        }

        window.alert(`${messageMap[error.code] || 'Unable to get your location.'} Open Google Maps instead.`)
        window.open(business.googleMapsUrl, '_blank', 'noopener,noreferrer')
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  return (
    <button type={type} className={className} onClick={openDirections}>
      {label}
    </button>
  )
}

export default DirectionsButton
