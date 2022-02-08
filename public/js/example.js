const weatherForm = document.querySelector('form');
const cityField = document.querySelector('.city-input');
const messageArea = document.querySelector('.show__message');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = cityField.value;
    if (location == '') {
        messageArea.classList.add('bg-danger');
        messageArea.innerHTML = '<h1>Error</h1> <h6>Please provide a location</h6>';
    }
    const url = 'http://api.weatherstack.com/current?access_key=1d7a7b85c09aef7334df40d7ac3d9d93&query=' + location + '&units=f';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            messageArea.classList.add('bg-success');
            messageArea.classList.remove('bg-danger');
            console.log(data);
            messageArea.innerHTML = `<h1>Success</h1> <h4>${data.location.country},${data.location.region},${data.location.name} </h4>
            <p>It is ${data.current.weather_descriptions[0]} now. The actual temperature is ${data.current.temperature} and it feels like ${data.current.feelslike} </p>. 
            `;
        })
        .catch((err) => {
            messageArea.classList.add('bg-danger');
            messageArea.innerHTML = '<h1>Error</h1> <h6>Unable to find any location</h6>';
        });
});
