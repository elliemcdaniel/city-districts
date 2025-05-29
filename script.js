// Initialize the map
const map = L.map('map').setView([28.5383, -81.3792], 12); // Centered on Orlando

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON
fetch('OrlandoPoliticalCommDist_-4068983505677775237.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => {
        if (feature.properties.CommissionerDistrictID === "3") {
          return { color: "green", weight: 2, fillOpacity: 0.5 };
        } else {
          return { color: "gray", weight: 1, fillOpacity: 0.3 };
        }
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`District ${feature.properties.CommissionerDistrictID}<br>${feature.properties.CommissionerName}`);
      }
    }).addTo(map);
  });
