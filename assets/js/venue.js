async function initVenue(){
  try {
    const res = await fetch('assets/data/venue.json');
    const venue = await res.json();

    // Update venue information
    updateVenueInfo(venue);
    updateFacilities(venue.facilities);
    updateTransportation(venue.transportation);
    updateNearbyAttractions(venue.nearbyAttractions);
    updateContactInfo(venue.contact);

    // Initialize map if container exists
    initMap(venue.coordinates);

  } catch (error) {
    console.error('Error loading venue data:', error);
  }
}

function updateVenueInfo(venue) {
  const container = document.getElementById('venue-info');
  if (!container) return;

  container.innerHTML = `
    <div class="venue-header">
      <h2>${venue.name}</h2>
      <p class="venue-short-name">${venue.shortName}</p>
    </div>
    <div class="venue-details">
      <div class="venue-address">
        <h3>Location</h3>
        <address>
          ${venue.address.street}<br>
          ${venue.address.city}, ${venue.address.region}<br>
          ${venue.address.country} ${venue.address.postalCode}
        </address>
      </div>
      <div class="venue-description">
        <p>${venue.description}</p>
      </div>
    </div>
  `;
}

function updateFacilities(facilities) {
  const container = document.getElementById('facilities-list');
  if (!container) return;

  container.innerHTML = facilities.map(facility => `
    <div class="facility-card">
      <div class="facility-header">
        <h3>${facility.name}</h3>
        <span class="capacity">Capacity: ${facility.capacity}</span>
      </div>
      <p class="facility-description">${facility.description}</p>
      <div class="facility-amenities">
        ${facility.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function updateTransportation(transportation) {
  const container = document.getElementById('transportation-info');
  if (!container) return;

  container.innerHTML = `
    <div class="transport-section">
      <h3>Airport</h3>
      <div class="transport-item">
        <strong>${transportation.airport.name}</strong><br>
        Distance: ${transportation.airport.distance}<br>
        Travel Time: ${transportation.airport.travelTime}<br>
        Services: ${transportation.airport.services.join(', ')}
      </div>
    </div>
    <div class="transport-section">
      <h3>Public Transport</h3>
      <div class="transport-item">
        <strong>Bus:</strong> ${transportation.publicTransport.bus}<br>
        <strong>Taxi:</strong> ${transportation.publicTransport.taxi}<br>
        <strong>Ride-sharing:</strong> ${transportation.publicTransport.rideSharing}
      </div>
    </div>
    <div class="transport-section">
      <h3>Parking</h3>
      <div class="transport-item">
        <strong>Available:</strong> ${transportation.parking.available ? 'Yes' : 'No'}<br>
        <strong>Description:</strong> ${transportation.parking.description}<br>
        <strong>Cost:</strong> ${transportation.parking.cost}
      </div>
    </div>
  `;
}

function updateNearbyAttractions(attractions) {
  const container = document.getElementById('nearby-attractions');
  if (!container) return;

  container.innerHTML = attractions.map(attraction => `
    <div class="attraction-card">
      <h4>${attraction.name}</h4>
      <p>${attraction.description}</p>
      <span class="distance">${attraction.distance} away</span>
    </div>
  `).join('');
}

function updateContactInfo(contact) {
  const container = document.getElementById('venue-contact');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-item">
      <strong>Venue Manager:</strong> ${contact.venueManager}
    </div>
    <div class="contact-item">
      <strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a>
    </div>
    <div class="contact-item">
      <strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a>
    </div>
    <div class="contact-item">
      <strong>Emergency:</strong> <a href="tel:${contact.emergency}">${contact.emergency}</a>
    </div>
  `;
}

function initMap(coordinates) {
  const mapContainer = document.getElementById('venue-map');
  if (!mapContainer) return;

  // Create a simple map placeholder with coordinates
  mapContainer.innerHTML = `
    <div class="map-placeholder">
      <div class="map-content">
        <h4>Venue Location</h4>
        <p><strong>Coordinates:</strong> ${coordinates.latitude}°N, ${coordinates.longitude}°W</p>
        <p><strong>Address:</strong> University of Mines and Technology, Sekondi-Takoradi, Ghana</p>
        <div class="map-actions">
          <a href="https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}" target="_blank" class="btn btn-primary">View on Google Maps</a>
          <a href="https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}" target="_blank" class="btn btn-secondary">View on OpenStreetMap</a>
        </div>
      </div>
    </div>
  `;
}

// Initialize venue when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('venue-info')) {
    initVenue().catch(console.error);
  }
});
