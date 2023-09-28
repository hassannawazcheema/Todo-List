const locationList = document.getElementById('locationList');
const locationNameInput = document.getElementById('locationName');
const locationCoordinatesInput = document.getElementById('locationCoordinates');
const popupOverlay = document.getElementById('popupOverlay');
const clearLocalStorageBtn = document.getElementById('clearLocalStorageBtn');
const previousLocationList = document.getElementById('previousLocationList');


let currentLocations = [];
let previousLocations = [];

window.addEventListener('load', () => {
    previousLocations = JSON.parse(localStorage.getItem('previousLocations')) || [];
    previousLocations.forEach((location) => {
        addLocationToPreviousList(location.name, location.coordinates);
    });
});

function openPopup() {
    popupOverlay.style.display = 'flex';
}

function closePopup() {
    popupOverlay.style.display = 'none';
    locationNameInput.value = '';
    locationCoordinatesInput.value = '';
}

function addLocationToList(name, coordinates) {
    const listItem = document.createElement('li');
    listItem.textContent = `📍${name}  ${coordinates}`;
    locationList.appendChild(listItem);
    currentLocations.push({ name, coordinates });
}

function addLocationToPreviousList(name, coordinates) {
    const listItem = document.createElement('li');
    listItem.textContent = `📍${name}  ${coordinates}`;
    previousLocationList.appendChild(listItem);
}

function addLocation() {
    const locationName = locationNameInput.value.trim();
    const locationCoordinates = locationCoordinatesInput.value.trim();

    if (locationName && locationCoordinates) {
        // Create an object to represent the location
        const locationData = {
            name: locationName,
            coordinates: locationCoordinates
        };

        if (currentLocations.length > 0) {
            const removedLocation = currentLocations.shift();
            addLocationToPreviousList(removedLocation.name, removedLocation.coordinates);
        }

        addLocationToList(locationName, locationCoordinates);

        localStorage.setItem('currentLocations', JSON.stringify(currentLocations));
        localStorage.setItem('previousLocations', JSON.stringify(previousLocations));

        closePopup();
    }
}

clearLocalStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    // Clear your task lists or perform any other necessary cleanup
    locationNameInput.value = "";
    locationCoordinatesInput.value = "";
    // Clear both location lists
    locationList.innerHTML = "";
    previousLocationList.innerHTML = "";
    // Clear the current and previous location lists
    currentLocations = [];
    previousLocations = [];
});
