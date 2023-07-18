import getGiphy from "./giphyApiCalls";
import { getWeather, processWeather } from "./weatherApiCalls";

export default class GiphyWeather {
    constructor() {
      this.icon = "";
      this.conditionText = "";
      this.name = "";
      this.region = "";
      this.country = "";
      this.tempF = "";
      this.tempC = "";
      this.feelsLikeF = "";
      this.feelsLikeC = "";
      this.windMph = "";
      this.windKph = "";
      this.isDay = "";
      this.giphyUrl = "";
      this.fOrC = 0;
    }
  
    setGiphyWeather(data, giphyUrl) {
      this.icon = data.condition.icon;
      this.conditionText = data.condition.text;
      this.name = data.name;
      this.region = data.region;
      this.country = data.country;
      this.tempF = data.temp_f;
      this.tempC = data.temp_c;
      this.feelsLikeF = data.feelslike_f;
      this.feelsLikeC = data.feelslike_c;
      this.windMph = data.wind_mph;
      this.windKph = data.wind_kph;
      this.isDay = data.is_day;
      this.giphyUrl = giphyUrl;
    }
  
    toggleFOrC() {
      if (this.fOrC === 0) {
        this.fOrC = 1;
      } else {
        this.fOrC = 0;
      }

    }
  
    async loadGiphyWeather(location) {
      const weatherResponse = await getWeather(location);
      const weatherData = await processWeather(weatherResponse);
  
      const giphyUrl = await getGiphy(weatherData.condition.text);
  
      this.setGiphyWeather(weatherData, giphyUrl);
    }
  
    getGiphyWeather() {
      return {
        "icon": this.icon,
        "conditionText": this.conditionText,
        "name": this.name,
        "region": this.region,
        "country": this.country,
        "tempF": this.tempF,
        "tempC": this.tempC,
        "feelsLikeF": this.feelsLikeF,
        "feelsLikeC": this.feelsLikeC,
        "windMph": this.windMph,
        "windKph": this.windKph,
        "giphyUrl": this.giphyUrl,
        "isDay": this.isDay,
        "fOrC": this.fOrC
      }
    }
  
  }