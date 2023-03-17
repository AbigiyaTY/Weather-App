/* eslint-disable no-console, camelcase, import/no-unresolved */

import API_KEY from './apiKey.js';

const ViewButton = document.getElementById('ViewButton');
const display = document.getElementById('display');

const getWeather = async () => {
  const input = document.getElementById('input').value;
  const BaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const ApiKey = API_KEY;
  const url = `${BaseUrl}${input}&units=metric&appid=${ApiKey}`;

  try {
    const response = await (await fetch(url)).json();
    const {
      name,
      weather,
      main,
      sys,
    } = response;

    const { description, icon } = weather[0];
    const { temp, feels_like } = main;
    const { country } = sys;

    const weatherData = `
                <div class="col-12 row">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col" class="country">
                                    ${name},${country} <img class="col-1 img" src='https://openweathermap.org/img/wn/${icon}@2x.png' alt="weather icon" />
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                    <tr>
                        <th>It's ${description}</th>
                    </tr>
                    <tr>
                        <th>It is ${temp} outside.</th>
                    </tr>
                    <tr>
                        <th>You might feel like ${feels_like}.</th>
                    </tr>
                    </tbody>
                </table> 
            </div>
`;
    display.innerHTML = weatherData;
  } catch (error) {
    console.log(error);
  }
};

ViewButton.addEventListener('click', getWeather);