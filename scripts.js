// Extended scripts.js for CultuRank

// Function to fetch data from a JSON file or API
async function fetchData() {
    try {
        const response = await fetch('data.json'); // Assuming you have a data.json file
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to initialize the chart
async function initializeChart() {
    const data = await fetchData();

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Cultural Preservation Index',
                data: data.values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Preservation Index'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Cultural Heritage Sites'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Function to add interactivity to the chart
function addChartInteractivity() {
    const chartElement = document.getElementById('chart');
    chartElement.addEventListener('click', function(event) {
        const activePoints = myChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (activePoints.length > 0) {
            const firstPoint = activePoints[0];
            const label = myChart.data.labels[firstPoint.index];
            const value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            alert(`You clicked on ${label} with a value of ${value}`);
        }
    });
}

// Function to load additional content dynamically
function loadAdditionalContent() {
    const contentContainer = document.getElementById('additional-content');
    if (contentContainer) {
        contentContainer.innerHTML = `
            <h3>Additional Information</h3>
            <p>This section can be used to provide more detailed information about the cultural preservation efforts.</p>
            <ul>
                <li>Historical Context</li>
                <li>Current Challenges</li>
                <li>Future Plans</li>
            </ul>
        `;
    }
}

// Function to handle form submission
function handleFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            alert(`Thank you, ${name}! Your message has been sent.`);
            // Here you can add code to send the form data to a server
        });
    }
}

// Function to initialize the map
function initializeMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([51.505, -0.09], 13); // Set the initial map view

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A sample location for cultural preservation.')
            .openPopup();
    }
}

// Main function to initialize all scripts
function init() {
    initializeChart();
    addChartInteractivity();
    loadAdditionalContent();
    handleFormSubmission();
    initializeMap();
}

// Run the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
