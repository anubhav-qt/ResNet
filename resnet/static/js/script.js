document.addEventListener('DOMContentLoaded', function() {
    const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu'];
    const cities = {
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
        'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai']
    };
    const emergencyContacts = {
        'Mumbai': {
            'Police': '100',
            'Fire': '101',
            'Ambulance': '102',
            'Disaster Management': '108',
            'Women Helpline': '1091'
        },
        'Bangalore': {
            'Police': '100',
            'Fire': '101',
            'Ambulance': '108',
            'Traffic Help': '103',
            'Child Helpline': '1098'
        },
        'Chennai': {
            'Police': '100',
            'Fire': '101',
            'Ambulance': '108',
            'Disaster Management': '1070',
            'Coast Guard': '1554'
        }
    };
    const weatherInfo = {
        'Mumbai': 'Partly cloudy, 32°C',
        'Bangalore': 'Sunny, 28°C',
        'Chennai': 'Rainy, 30°C'
    };

    function setupDropdown(stateSelectId, citySelectId, infoId, infoData) {
        const stateSelect = document.getElementById(stateSelectId);
        const citySelect = document.getElementById(citySelectId);
        const infoDiv = document.getElementById(infoId);

        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });

        stateSelect.addEventListener('change', function() {
            citySelect.style.display = 'block';
            citySelect.innerHTML = '<option value="">Select a city</option>';
            infoDiv.style.display = 'none';

            if (this.value) {
                cities[this.value].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        });

        citySelect.addEventListener('change', function() {
            infoDiv.style.display = 'block';
            infoDiv.innerHTML = '';

            if (this.value && infoData[this.value]) {
                if (typeof infoData[this.value] === 'string') {
                    infoDiv.innerHTML = `<p>${infoData[this.value]}</p>`;
                } else {
                    Object.keys(infoData[this.value]).forEach(key => {
                        const p = document.createElement('p');
                        p.textContent = `${key}: ${infoData[this.value][key]}`;
                        infoDiv.appendChild(p);
                    });
                }
            } else {
                infoDiv.innerHTML = '<p>No information available for this city.</p>';
            }
        });
    }

    setupDropdown('emergency-state-select', 'emergency-city-select', 'emergency-contacts', emergencyContacts);
    setupDropdown('weather-state-select', 'weather-city-select', 'weather-info', weatherInfo);

    // Sign In and Sign Up Popup functionality
    var signinPopup = document.getElementById('signin-popup');
    var signupPopup = document.getElementById('signup-popup');
    var signinBtn = document.querySelector('.sign-in');
    var signupBtn = document.querySelector('.sign-up');
    var closes = document.getElementsByClassName('close');

    signinBtn.onclick = function() {
        signinPopup.style.display = 'block';
    }

    signupBtn.onclick = function() {
        signupPopup.style.display = 'block';
    }

    for (var i = 0; i < closes.length; i++) {
        closes[i].onclick = function() {
            signinPopup.style.display = 'none';
            signupPopup.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target == signinPopup || event.target == signupPopup) {
            signinPopup.style.display = 'none';
            signupPopup.style.display = 'none';
        }
    }

    document.getElementById('signin-form').onsubmit = function(e) {
        e.preventDefault();
        alert('Sign in functionality would be implemented here.');
        signinPopup.style.display = 'none';
    }

    document.getElementById('signup-form').onsubmit = function(e) {
        e.preventDefault();
        alert('Sign up functionality would be implemented here.');
        signupPopup.style.display = 'none';
    }
});

// Donation and Registration button functionality
document.querySelector('.donate-button').addEventListener('click', function() {
    alert('Donation functionality would be implemented here.');
});

document.querySelector('.register-button').addEventListener('click', function() {
    alert('Home registration functionality would be implemented here.');
});

document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const comments = document.getElementById('comments');

    if (commentInput.value.trim() !== '') {
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = commentInput.value.trim();
        comments.appendChild(newComment);

        commentInput.value = ''; // Clear the input
    }
});

document.getElementById('community-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#comments-section').scrollIntoView({
        behavior: 'smooth'
    });
});

let map;
let markers = [];
let currentMarker = null;
let originalIcon = null;

function initMap() {
    // Default coordinates for India
    const indiaCoords = { lat: 20.5937, lng: 78.9629 };

    // Initialize the map with India view
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: indiaCoords,
    });

    // Try to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                // Center the map on user's location
                map.setCenter(userCoords);
                map.setZoom(12);

                new google.maps.Marker({
                    position: userCoords,
                    map: map,
                    title: "You are here!",
                });

                // Trigger the click event for the "Shelters" button
                document.getElementById('shelters-button').click();
            },
            () => {
                // Handle location access denial
                handleLocationError(true, map, indiaCoords);
                // Trigger the click event for the "Shelters" button
                document.getElementById('shelters-button').click();
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map, indiaCoords);
        // Trigger the click event for the "Shelters" button
        document.getElementById('shelters-button').click();
    }
}

function handleLocationError(browserHasGeolocation, map, pos) {
    // Show a message or handle the error as needed
    const infoWindow = new google.maps.InfoWindow({
        content: browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn’t support geolocation.",
        position: pos,
    });
    infoWindow.open(map);
}

function getNearbyAccommodations(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        console.error('Invalid latitude or longitude values');
        return;
    }

    fetch(`/api/nearby-accommodations/?lat=${lat}&long=${lng}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const positions = data.results.map(place => ({
                    lat: parseFloat(place.geometry.location.lat),
                    lng: parseFloat(place.geometry.location.lng),
                    name: place.name
                })).filter(position => !isNaN(position.lat) && !isNaN(position.lng));

                drawGeofencingRegions(lat, lng);
                showHotelMarkers(positions);
                updateAccommodationList(data.results);
            }
        })
        .catch(error => console.error('Error fetching nearby accommodations:', error));
}

let polygons = [];

function drawGeofencingRegions(lat, lng) {
    // Clear existing polygons
    polygons.forEach(polygon => polygon.setMap(null));
    polygons = [];

    const center = { lat: lat, lng: lng };
    const radius = 30000; // Radius in meters

    // Define the segments with their respective colors
    const segments = [
        { startAngle: 0, endAngle: 240, color: 'green' },   // Safe area
        { startAngle: 240, endAngle: 330, color: 'orange' }, // Moderately safe area
        { startAngle: 330, endAngle: 360, color: 'red' }     // Dangerous area
    ];

    segments.forEach(segment => {
        const segmentCoords = getCircleSegmentCoords(center, radius, segment.startAngle, segment.endAngle);
        const polygon = new google.maps.Polygon({
            paths: segmentCoords,
            strokeColor: segment.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: segment.color,
            fillOpacity: 0.25,
            map: map
        });
        polygons.push(polygon);
    });
}
function getCircleSegmentCoords(center, radius, startAngle, endAngle) {
    const coords = [center];
    const numPoints = 50; // Number of points to define the segment

    for (let i = 0; i <= numPoints; i++) {
        const angle = startAngle + (i * (endAngle - startAngle) / numPoints);
        const angleRad = angle * (Math.PI / 180);
        const lat = center.lat + (radius / 111320) * Math.cos(angleRad);
        const lng = center.lng + (radius / (111320 * Math.cos(center.lat * (Math.PI / 180)))) * Math.sin(angleRad);
        coords.push({ lat: lat, lng: lng });
    }

    return coords;
}

function showHotelMarkers(positions) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    positions.forEach(position => {
        const marker = new google.maps.Marker({
            position: { lat: position.lat, lng: position.lng },
            map: map,
            title: position.name
        });
        markers.push(marker);
    });
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Return distance rounded to 2 decimal places
}

function updateAccommodationList(accommodations) {
    const listContainer = document.getElementById('location-list');
    if (listContainer) {
        listContainer.innerHTML = ''; // Clear the list

        const userCoords = map.getCenter();

        // Calculate distances and sort accommodations by distance
        accommodations.forEach(place => {
            place.distance = calculateDistance(userCoords.lat(), userCoords.lng(), place.geometry.location.lat, place.geometry.location.lng);
        });
        accommodations.sort((a, b) => a.distance - b.distance);

        accommodations.forEach((place, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${place.name}<br><small>${place.distance} km</small>`;
            listItem.addEventListener('click', function() {
                // Center the map on the selected accommodation
                const placeCoords = { lat: place.geometry.location.lat, lng: place.geometry.location.lng };
                map.setCenter(placeCoords);
                map.setZoom(15);

                // Highlight the selected marker
                markers.forEach(marker => {
                    if (marker.getPosition().lat() === placeCoords.lat && marker.getPosition().lng() === placeCoords.lng) {
                        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png'); // Change marker icon
                    } else {
                        marker.setIcon(null); // Reset other markers
                    }
                });
            });
            listContainer.appendChild(listItem);
        });
    } else {
        console.error('Element with ID "location-list" not found.');
    }
}

function updateShelterList(shelters) {
    const listContainer = document.getElementById('location-list');
    if (listContainer) {
        listContainer.innerHTML = ''; // Clear the list

        const userCoords = map.getCenter();

        // Calculate distances and sort shelters by distance
        shelters.forEach(place => {
            place.distance = calculateDistance(userCoords.lat(), userCoords.lng(), place.geometry.location.lat, place.geometry.location.lng);
        });
        shelters.sort((a, b) => a.distance - b.distance);

        shelters.forEach((place, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${place.name}<br><small>${place.distance} km</small>`;
            listItem.addEventListener('click', function() {
                // Center the map on the selected shelter
                const placeCoords = { lat: place.geometry.location.lat, lng: place.geometry.location.lng };
                map.setCenter(placeCoords);
                map.setZoom(15);

                // Highlight the selected marker
                markers.forEach(marker => {
                    if (marker.getPosition().lat() === placeCoords.lat && marker.getPosition().lng() === placeCoords.lng) {
                        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png'); // Change marker icon
                    } else {
                        marker.setIcon(null); // Reset other markers
                    }
                });
            });
            listContainer.appendChild(listItem);
        });
    } else {
        console.error('Element with ID "location-list" not found.');
    }
}

// Ensure the initMap function is called to initialize the map
window.onload = initMap;

// Event listener for the "Airbnbs and Hotels" button


// New functions and event listener for the "Shelters" button
function getNearbyShelters(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        console.error('Invalid latitude or longitude values');
        return;
    }

    fetch(`/api/nearby-shelters/?lat=${lat}&lng=${lng}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const positions = data.results.map(place => ({
                    lat: parseFloat(place.geometry.location.lat),
                    lng: parseFloat(place.geometry.location.lng),
                    name: place.name
                })).filter(position => !isNaN(position.lat) && !isNaN(position.lng));

                drawGeofencingRegions(lat, lng);
                showShelterMarkers(positions);
                updateShelterList(data.results);
            }
        })
        .catch(error => console.error('Error fetching nearby shelters:', error));
}
function showShelterMarkers(positions) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    positions.forEach(position => {
        const marker = new google.maps.Marker({
            position: { lat: position.lat, lng: position.lng },
            map: map,
            title: position.name
        });
        markers.push(marker);
    });
}

// script.js

// Event listener for the "Airbnbs and Hotels" button
const hotelsButton = document.getElementById('hotels-button');
const sheltersButton = document.getElementById('shelters-button');

if (hotelsButton) {
    hotelsButton.addEventListener('click', function() {
        const userCoords = map.getCenter();
        getNearbyAccommodations(userCoords.lat(), userCoords.lng());

        // Toggle active class
        hotelsButton.classList.add('active');
        sheltersButton.classList.remove('active');
    });
}

// Event listener for the "Shelters" button
if (sheltersButton) {
    sheltersButton.addEventListener('click', function() {
        const userCoords = map.getCenter();
        getNearbyShelters(userCoords.lat(), userCoords.lng());

        // Toggle active class
        sheltersButton.classList.add('active');
        hotelsButton.classList.remove('active');
    });
}