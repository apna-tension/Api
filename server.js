const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/weatherapp.html");
});

app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  const units = req.body.units;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=6856910ec9e694f8785c0294b4bc53db&units=" +
    units;

  https.get(url, (response) => {
    // console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;

      res.write("<p>hii this is the weather information </p>");
      res.write(
        "<h2>The temperature in " +
          cityName +
          " is : " +
          temperature +
          " (" +
          weatherDescription +
          ")</h2>"
      );

      res.write("<img src='https://openweathermap.org/img/w/" + img + ".png'>");

      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
