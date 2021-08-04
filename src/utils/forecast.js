const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    encodeURIComponent(latitude) +
    "&lon=" +
    encodeURIComponent(longitude) +
    "&units=imperial&appid=c1f8147b5d4f03bdd8ae191588b6fe03";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forecast service", undefined);
    } else if (body.message) {
      callback("Unable to find location. Try valid coordinate(s).", undefined);
    } else {
      callback(undefined, {
        forecast:
          "It is currently " +
          body.current.temp +
          " degrees." +
          " There is " +
          body.current.humidity +
          "% humidity outside and " +
          body.current.weather[0].description +
          ".",
      });
    }
  });
};

module.exports = forecast;
