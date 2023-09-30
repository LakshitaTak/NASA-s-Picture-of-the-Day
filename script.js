// Function to fetch and display the image of the day for the current date
async function getCurrentImageOfTheDay() {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const apiKey = 'wGScm1XT0rWnwXcpjlkNvTRkabvmU0Hd33cSwbUT'; // Replace with your actual NASA API key
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`);
        const data = await response.json();

        // Display the image in the "current-image-container"
        const currentImageContainer = document.getElementById('current-image-container');
        currentImageContainer.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.url}" alt="${data.title}">
            <p>${data.explanation}</p>
        `;
    } catch (error) {
        // Handle errors and display an error message
        console.error('Error:', error);
        alert('Failed to fetch data from NASA API. Please try again later.');
    }
}

// Function to fetch and display the image of the day for a selected date
async function getImageOfTheDay(date) {
    try {
        const apiKey = 'wGScm1XT0rWnwXcpjlkNvTRkabvmU0Hd33cSwbUT'; // Replace with your actual NASA API key
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();

        // Display the image in the "current-image-container"
        const currentImageContainer = document.getElementById('current-image-container');
        currentImageContainer.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.url}" alt="${data.title}">
            <p>${data.explanation}</p>
        `;

        // Save the date to local storage
        saveSearch(date);

        // Add the date to the search history
        addSearchToHistory(date);
    } catch (error) {
        // Handle errors and display an error message
        console.error('Error:', error);
        alert('Failed to fetch data from NASA API. Please try again later.');
    }
}

// Function to save a date to local storage
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add search history to the UI
function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Clear existing list items
    searchHistory.innerHTML = '';

    // Populate the search history list
    searches.forEach((searchDate) => {
        const listItem = document.createElement('li');
        listItem.textContent = searchDate;
        listItem.addEventListener('click', () => getImageOfTheDay(searchDate));
        searchHistory.appendChild(listItem);
    });
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

// Load the current image of the day when the page loads
getCurrentImageOfTheDay();
// Load and display search history
addSearchToHistory();