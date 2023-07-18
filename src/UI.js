import GiphyWeather from './giphyWeather';

export default class UI {
    constructor() {
      this.currentGiphyWeather = new GiphyWeather();
  
      this.input = document.querySelector("input");
      this.submitBtn = document.querySelector("button");
      this.img = document.querySelector("img");
      this.weatherElmt = document.querySelector("#weather");
      this.locationElmt = document.querySelector("#location");
      this.degreesElmt = document.querySelector("#degrees");
      this.feelsLikeElmt = document.querySelector("#feels-like");
      this.windElmt = document.querySelector("#wind");
      this.toggleElmt = document.querySelector("#toggle");
      this.giphyImgElmt = document.querySelector("#gif");
      this.labelGiphyElmt = document.querySelector("#gif-label");
      this.addEventListeners()
      this.loadWeatherData();
    }
  
    addEventListeners() {
      this.submitBtn.addEventListener("click", () => this.handleSearch());
      this.toggleElmt.addEventListener("click", () => this.handleToggle());
    }
  
    async loadWeatherData() {
      await this.currentGiphyWeather.loadGiphyWeather("Seattle");
      this.updateScreen();
    }
  
    updateScreen() {
      const curGiphyData = this.currentGiphyWeather.getGiphyWeather();
      this.img.src = curGiphyData.icon;
      this.weatherElmt.innerHTML = curGiphyData.conditionText;
      if (curGiphyData.name === curGiphyData.region) {
        this.locationElmt.innerHTML = `${curGiphyData.name}, ${curGiphyData.country}`;
      } else {
        this.locationElmt.innerHTML = `${curGiphyData.name}, ${curGiphyData.region}`;
      }
      if (curGiphyData.fOrC === 0) {
        this.degreesElmt.innerHTML = `${curGiphyData.tempF} °F`;
        this.feelsLikeElmt.innerHTML = `FEELS LIKE: ${curGiphyData.feelsLikeF} °F`;
        this.windElmt.innerHTML = `WIND: ${curGiphyData.windMph} MPH`;
      } else {
        this.degreesElmt.innerHTML = `${curGiphyData.tempC} °C`;
        this.feelsLikeElmt.innerHTML = `FEELS LIKE: ${curGiphyData.feelsLikeC} °C`;
        this.windElmt.innerHTML = `WIND: ${curGiphyData.windKph} KPH`;
      }
  
      this.giphyImgElmt.src = curGiphyData.giphyUrl;
    }
  
    async handleSearch() {
      this.submitBtn.focus();
      setTimeout(() => {
        this.submitBtn.blur();
      }, 100);
      if (this.input.value === "") return;
      await this.currentGiphyWeather.loadGiphyWeather(this.input.value);
      this.updateScreen();
    }
  
    handleToggle() {
      this.currentGiphyWeather.toggleFOrC();
      this.updateScreen();
    }
  
  }