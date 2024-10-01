
# WeatherApp - Your Personal Weather Assistant

WeatherApp is your go-to destination for all things weather-related. This sleek and user-friendly weather app is designed to keep you informed about the weather conditions in any location, at any time. Whether you're planning a weekend getaway, a morning jog, or just want to know if you need to carry an umbrella, WeatherNow has you covered.





## Deployment

To deploy this project simply download the zip file of the code form my profile and open **Index.html** file in your browser.








## Tech Stack

**Tech:** Html, CSS, JavaScript



## API Reference

For API we have used **openweathermap** for the weather details

```http
http://openweathermap.org
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `City`      | `string` | **Required**. city name to fetch |


```http
  https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
```



#### Coordinates(Latitude, Longitude)

```http
  https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
```



