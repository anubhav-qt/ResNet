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
                  for (let [service, number] of Object.entries(infoData[this.value])) {
                      infoDiv.innerHTML += `<p>${service}: ${number}</p>`;
                  }
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
            },
            () => {
                // Handle location access denial
                handleLocationError(true, map, indiaCoords);
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map, indiaCoords);
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

// Event listeners for the list buttons
document.getElementById("shelters-button").addEventListener("click", function() {
    setActiveButton(this);
    showLocations("shelters");
});

document.getElementById("hotels-button").addEventListener("click", function() {
    setActiveButton(this);
    showLocations("hotels");
});

// Function to set the active button (Shelters or Hotels)
function setActiveButton(button) {
    // Remove the 'active' class from any currently active button
    document.querySelector(".list-header button.active").classList.remove("active");
    // Add the 'active' class to the clicked button
    button.classList.add("active");
}

let markers = [];
function showLocations(type) {
    // Clear the existing list
    document.querySelector('.location-list').innerHTML = "";

    // Clear existing markers from the map
    clearMarkers();

    // Fetch locations based on type
    const locations = type === "shelters" ? fetchShelters() : fetchHotels();

    locations.forEach(location => {
        // Create the HTML for the list item as a string
        const listItemHTML = `<li>${location.name}</li>`;

        // Append the list item to the location list
        document.querySelector('.location-list').innerHTML += listItemHTML;

        // Add marker to the map
        addMarker(location);
    });
}
// Sample function to fetch shelter data (replace with your actual data fetching logic)
function fetchShelters() {
    return [
        { name: "Shelter 1", lat: 26.9157, lng: 75.8173 },
        { name: "Shelter 2", lat: 26.9236, lng: 75.8267 },
    ];
}

// Sample function to fetch hotel data (replace with your actual data fetching logic)
function fetchHotels() {
    return [
        { name: "Hotel 1", lat: 26.9157, lng: 75.8173 },
        { name: "Hotel 2", lat: 26.9236, lng: 75.8267 },
    ];
}

// Function to add a marker to the map
function addMarker(location) {
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
    });
    markers.push(marker);
}

// Function to clear all markers from the map
function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
}

showLocations("shelters")