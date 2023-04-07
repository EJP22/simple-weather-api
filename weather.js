const express = require('express');
const https = require('https');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/result', function(req, res) {

  const query = req.body.cityName;
  const apiKey = 'e40bd769cc18d983f653241db4b7a12e';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);


    response.on('data', function(data) {
      
     const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      res.write(`<p>The weather currently is ${weatherDescription}.</p>`);
      res.write(`<h1>The temperature in ${query} is ${temp} degree Celsius.</h1>`);
      const icon = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write(`<img src=${imageURL}>`);
      res.send();
  
    })    
  })
})
    app.listen(3000, function() {
        console.log('Server is running ort on 3000');
    });