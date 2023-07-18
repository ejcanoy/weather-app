/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _giphyWeather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./giphyWeather */ "./src/giphyWeather.js");

class UI {
  constructor() {
    this.currentGiphyWeather = new _giphyWeather__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
    this.addEventListeners();
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

/***/ }),

/***/ "./src/giphyApiCalls.js":
/*!******************************!*\
  !*** ./src/giphyApiCalls.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getGiphy)
/* harmony export */ });
/* eslint-disable no-alert */
// calls giphy api

async function getGiphy(weather) {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=GEpdyjLE0E10lCL1jkNj7enLQNvbS7ta&s=${weather}`;
  try {
    const response = await fetch(url, {
      mode: "cors"
    });
    const jsonResponse = await response.json();
    return jsonResponse.data.images.original.url;
  } catch {
    return "";
  }
}

/***/ }),

/***/ "./src/giphyWeather.js":
/*!*****************************!*\
  !*** ./src/giphyWeather.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiphyWeather)
/* harmony export */ });
/* harmony import */ var _giphyApiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./giphyApiCalls */ "./src/giphyApiCalls.js");
/* harmony import */ var _weatherApiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherApiCalls */ "./src/weatherApiCalls.js");


class GiphyWeather {
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
    const weatherResponse = await (0,_weatherApiCalls__WEBPACK_IMPORTED_MODULE_1__.getWeather)(location);
    const weatherData = await (0,_weatherApiCalls__WEBPACK_IMPORTED_MODULE_1__.processWeather)(weatherResponse);
    const giphyUrl = await (0,_giphyApiCalls__WEBPACK_IMPORTED_MODULE_0__["default"])(weatherData.condition.text);
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
    };
  }
}

/***/ }),

/***/ "./src/weatherApiCalls.js":
/*!********************************!*\
  !*** ./src/weatherApiCalls.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWeather: () => (/* binding */ getWeather),
/* harmony export */   processWeather: () => (/* binding */ processWeather)
/* harmony export */ });
/* eslint-disable no-alert */
// calls weather
async function getWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=1993af061892439c967172424231207&q=${location}`;
  try {
    const response = await fetch(url, {
      mode: "cors"
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch {
    //   alert("Failed to find a gif for that word!");
    console.log(`Failed to find city ${location}!`);
    return {};
  }
}
function processWeather(weatherData) {
  if (Object.keys(weatherData).length === 0) {
    return weatherData;
  }
  return {
    condition: weatherData.current.condition,
    name: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
    temp_f: weatherData.current.temp_f,
    temp_c: weatherData.current.temp_c,
    feelslike_f: weatherData.current.feelslike_f,
    feelslike_c: weatherData.current.feelslike_c,
    wind_mph: weatherData.current.wind_mph,
    wind_kph: weatherData.current.wind_kph,
    is_day: weatherData.current.is_day
  };
}

// console.log(getWeather("can").then((response) => {if (response) console.log(processWeather(response))}));
//

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    font-family: 'Nunito', sans-serif;
    margin: 0;
    padding: 0;
}

body {
    background-color: #88BDBC;
}

h1 {
    color: #FFFFFF;
    font-weight: 500;
}
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    background-color: #112D32;
    padding-left: 10px;
    padding-right: 10px;
}

#search-items {
    display: flex;
    align-items: center;
}

input[type="text"] {
    width: 50%;
    height: 25px;
    border: 2px solid #112D32;
    border-radius: 5px;
}

button {
    color: #FFFFFF;
    margin-right: 5px;
    height: 30px;
    border: 2px solid #112D32;
    background-color: #88BDBC;
    border-radius: 5px;
}

button:focus {
    background-color: #FFFFFF;
    color: #88BDBC;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .toggle-switch input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 34px;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "°F";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }

  input:checked + .slider {
    background-color: #88BDBC;
  }

  input:checked + .slider:before {
    content: "°C";
    transform: translateX(26px);
  }


  main {
    display: flex;
    justify-content: center;
    margin-top: 10%;
  }

  .weather-container {
    color: #FFFFFF;
    margin-right: 15px;
  }

  h2 {
    font-weight: 500;
    color: #FFFFFF;
  }

  #weather {
    font-size: 2rem;
  }

  #stats {
    display: inline;
  }

  .side-stats {
    display: inline-block;
    margin-left: 10px; /* Adjust the margin as needed */
  }

  #stats {
    display: flex;
    font-size: 0.75rem;
  }

  #location {
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
  }
  
  #degrees {
    font-size: 3rem;
    display: inline-block;
  }

  `, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;IACI,iCAAiC;IACjC,SAAS;IACT,UAAU;AACd;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,cAAc;IACd,gBAAgB;AACpB;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,aAAa;IACb,yBAAyB;IACzB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,YAAY;IACZ,yBAAyB;IACzB,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,iBAAiB;IACjB,YAAY;IACZ,yBAAyB;IACzB,yBAAyB;IACzB,kBAAkB;AACtB;;AAEA;IACI,yBAAyB;IACzB,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;IACX,YAAY;EACd;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,kBAAkB;IAClB,eAAe;IACf,MAAM;IACN,OAAO;IACP,QAAQ;IACR,SAAS;IACT,sBAAsB;IACtB,mBAAmB;IACnB,eAAe;EACjB;;EAEA;IACE,kBAAkB;IAClB,aAAa;IACb,YAAY;IACZ,WAAW;IACX,SAAS;IACT,WAAW;IACX,uBAAuB;IACvB,kBAAkB;IAClB,eAAe;IACf,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,8BAA8B;IAC9B,eAAe;EACjB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,aAAa;IACb,2BAA2B;EAC7B;;;EAGA;IACE,aAAa;IACb,uBAAuB;IACvB,eAAe;EACjB;;EAEA;IACE,cAAc;IACd,kBAAkB;EACpB;;EAEA;IACE,gBAAgB;IAChB,cAAc;EAChB;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,qBAAqB;IACrB,iBAAiB,EAAE,gCAAgC;EACrD;;EAEA;IACE,aAAa;IACb,kBAAkB;EACpB;;EAEA;IACE,iBAAiB;IACjB,sBAAsB;EACxB;;EAEA;IACE,eAAe;IACf,qBAAqB;EACvB","sourcesContent":["* {\n    font-family: 'Nunito', sans-serif;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    background-color: #88BDBC;\n}\n\nh1 {\n    color: #FFFFFF;\n    font-weight: 500;\n}\nheader {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    height: 100px;\n    background-color: #112D32;\n    padding-left: 10px;\n    padding-right: 10px;\n}\n\n#search-items {\n    display: flex;\n    align-items: center;\n}\n\ninput[type=\"text\"] {\n    width: 50%;\n    height: 25px;\n    border: 2px solid #112D32;\n    border-radius: 5px;\n}\n\nbutton {\n    color: #FFFFFF;\n    margin-right: 5px;\n    height: 30px;\n    border: 2px solid #112D32;\n    background-color: #88BDBC;\n    border-radius: 5px;\n}\n\nbutton:focus {\n    background-color: #FFFFFF;\n    color: #88BDBC;\n}\n\n.toggle-switch {\n    position: relative;\n    display: inline-block;\n    width: 60px;\n    height: 34px;\n  }\n\n  .toggle-switch input {\n    display: none;\n  }\n\n  .slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    border-radius: 34px;\n    transition: .4s;\n  }\n\n  .slider:before {\n    position: absolute;\n    content: \"°F\";\n    height: 26px;\n    width: 26px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    border-radius: 50%;\n    transition: .4s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-family: Arial, sans-serif;\n    font-size: 14px;\n  }\n\n  input:checked + .slider {\n    background-color: #88BDBC;\n  }\n\n  input:checked + .slider:before {\n    content: \"°C\";\n    transform: translateX(26px);\n  }\n\n\n  main {\n    display: flex;\n    justify-content: center;\n    margin-top: 10%;\n  }\n\n  .weather-container {\n    color: #FFFFFF;\n    margin-right: 15px;\n  }\n\n  h2 {\n    font-weight: 500;\n    color: #FFFFFF;\n  }\n\n  #weather {\n    font-size: 2rem;\n  }\n\n  #stats {\n    display: inline;\n  }\n\n  .side-stats {\n    display: inline-block;\n    margin-left: 10px; /* Adjust the margin as needed */\n  }\n\n  #stats {\n    display: flex;\n    font-size: 0.75rem;\n  }\n\n  #location {\n    font-size: 1.5rem;\n    letter-spacing: 0.1rem;\n  }\n  \n  #degrees {\n    font-size: 3rem;\n    display: inline-block;\n  }\n\n  "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


const currentUI = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsaUZBQWlGLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFFBQVEsS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVkseUJBQXlCLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLDZCQUE2Qix3Q0FBd0MsZ0JBQWdCLGlCQUFpQixHQUFHLFVBQVUsZ0NBQWdDLEdBQUcsUUFBUSxxQkFBcUIsdUJBQXVCLEdBQUcsVUFBVSxvQkFBb0IsMEJBQTBCLHFDQUFxQyxvQkFBb0IsZ0NBQWdDLHlCQUF5QiwwQkFBMEIsR0FBRyxtQkFBbUIsb0JBQW9CLDBCQUEwQixHQUFHLDBCQUEwQixpQkFBaUIsbUJBQW1CLGdDQUFnQyx5QkFBeUIsR0FBRyxZQUFZLHFCQUFxQix3QkFBd0IsbUJBQW1CLGdDQUFnQyxnQ0FBZ0MseUJBQXlCLEdBQUcsa0JBQWtCLGdDQUFnQyxxQkFBcUIsR0FBRyxvQkFBb0IseUJBQXlCLDRCQUE0QixrQkFBa0IsbUJBQW1CLEtBQUssNEJBQTRCLG9CQUFvQixLQUFLLGVBQWUseUJBQXlCLHNCQUFzQixhQUFhLGNBQWMsZUFBZSxnQkFBZ0IsNkJBQTZCLDBCQUEwQixzQkFBc0IsS0FBSyxzQkFBc0IseUJBQXlCLHNCQUFzQixtQkFBbUIsa0JBQWtCLGdCQUFnQixrQkFBa0IsOEJBQThCLHlCQUF5QixzQkFBc0Isb0JBQW9CLDhCQUE4QiwwQkFBMEIscUNBQXFDLHNCQUFzQixLQUFLLCtCQUErQixnQ0FBZ0MsS0FBSyxzQ0FBc0Msc0JBQXNCLGtDQUFrQyxLQUFLLGNBQWMsb0JBQW9CLDhCQUE4QixzQkFBc0IsS0FBSywwQkFBMEIscUJBQXFCLHlCQUF5QixLQUFLLFVBQVUsdUJBQXVCLHFCQUFxQixLQUFLLGdCQUFnQixzQkFBc0IsS0FBSyxjQUFjLHNCQUFzQixLQUFLLG1CQUFtQiw0QkFBNEIseUJBQXlCLHNDQUFzQyxjQUFjLG9CQUFvQix5QkFBeUIsS0FBSyxpQkFBaUIsd0JBQXdCLDZCQUE2QixLQUFLLGtCQUFrQixzQkFBc0IsNEJBQTRCLEtBQUsseUJBQXlCO0FBQ2xoSDtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ3ZKMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW9HO0FBQ3BHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsdUZBQU87Ozs7QUFJOEM7QUFDdEUsT0FBTyxpRUFBZSx1RkFBTyxJQUFJLHVGQUFPLFVBQVUsdUZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ0E7QUFJdEIsTUFBTVUsU0FBUyxHQUFHLElBQUk5RSwyQ0FBRSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL1VJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dpcGh5QXBpQ2FsbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2lwaHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXJBcGlDYWxscy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHaXBoeVdlYXRoZXIgZnJvbSAnLi9naXBoeVdlYXRoZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRHaXBoeVdlYXRoZXIgPSBuZXcgR2lwaHlXZWF0aGVyKCk7XG4gIFxuICAgICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICAgIHRoaXMuc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcbiAgICAgIHRoaXMuaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcbiAgICAgIHRoaXMud2VhdGhlckVsbXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJcIik7XG4gICAgICB0aGlzLmxvY2F0aW9uRWxtdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XG4gICAgICB0aGlzLmRlZ3JlZXNFbG10ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWdyZWVzXCIpO1xuICAgICAgdGhpcy5mZWVsc0xpa2VFbG10ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmZWVscy1saWtlXCIpO1xuICAgICAgdGhpcy53aW5kRWxtdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2luZFwiKTtcbiAgICAgIHRoaXMudG9nZ2xlRWxtdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9nZ2xlXCIpO1xuICAgICAgdGhpcy5naXBoeUltZ0VsbXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dpZlwiKTtcbiAgICAgIHRoaXMubGFiZWxHaXBoeUVsbXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dpZi1sYWJlbFwiKTtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgICAgdGhpcy5sb2FkV2VhdGhlckRhdGEoKTtcbiAgICB9XG4gIFxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuaGFuZGxlU2VhcmNoKCkpO1xuICAgICAgdGhpcy50b2dnbGVFbG10LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhhbmRsZVRvZ2dsZSgpKTtcbiAgICB9XG4gIFxuICAgIGFzeW5jIGxvYWRXZWF0aGVyRGF0YSgpIHtcbiAgICAgIGF3YWl0IHRoaXMuY3VycmVudEdpcGh5V2VhdGhlci5sb2FkR2lwaHlXZWF0aGVyKFwiU2VhdHRsZVwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2NyZWVuKCk7XG4gICAgfVxuICBcbiAgICB1cGRhdGVTY3JlZW4oKSB7XG4gICAgICBjb25zdCBjdXJHaXBoeURhdGEgPSB0aGlzLmN1cnJlbnRHaXBoeVdlYXRoZXIuZ2V0R2lwaHlXZWF0aGVyKCk7XG4gICAgICB0aGlzLmltZy5zcmMgPSBjdXJHaXBoeURhdGEuaWNvbjtcbiAgICAgIHRoaXMud2VhdGhlckVsbXQuaW5uZXJIVE1MID0gY3VyR2lwaHlEYXRhLmNvbmRpdGlvblRleHQ7XG4gICAgICBpZiAoY3VyR2lwaHlEYXRhLm5hbWUgPT09IGN1ckdpcGh5RGF0YS5yZWdpb24pIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbkVsbXQuaW5uZXJIVE1MID0gYCR7Y3VyR2lwaHlEYXRhLm5hbWV9LCAke2N1ckdpcGh5RGF0YS5jb3VudHJ5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvY2F0aW9uRWxtdC5pbm5lckhUTUwgPSBgJHtjdXJHaXBoeURhdGEubmFtZX0sICR7Y3VyR2lwaHlEYXRhLnJlZ2lvbn1gO1xuICAgICAgfVxuICAgICAgaWYgKGN1ckdpcGh5RGF0YS5mT3JDID09PSAwKSB7XG4gICAgICAgIHRoaXMuZGVncmVlc0VsbXQuaW5uZXJIVE1MID0gYCR7Y3VyR2lwaHlEYXRhLnRlbXBGfSDCsEZgO1xuICAgICAgICB0aGlzLmZlZWxzTGlrZUVsbXQuaW5uZXJIVE1MID0gYEZFRUxTIExJS0U6ICR7Y3VyR2lwaHlEYXRhLmZlZWxzTGlrZUZ9IMKwRmA7XG4gICAgICAgIHRoaXMud2luZEVsbXQuaW5uZXJIVE1MID0gYFdJTkQ6ICR7Y3VyR2lwaHlEYXRhLndpbmRNcGh9IE1QSGA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlZ3JlZXNFbG10LmlubmVySFRNTCA9IGAke2N1ckdpcGh5RGF0YS50ZW1wQ30gwrBDYDtcbiAgICAgICAgdGhpcy5mZWVsc0xpa2VFbG10LmlubmVySFRNTCA9IGBGRUVMUyBMSUtFOiAke2N1ckdpcGh5RGF0YS5mZWVsc0xpa2VDfSDCsENgO1xuICAgICAgICB0aGlzLndpbmRFbG10LmlubmVySFRNTCA9IGBXSU5EOiAke2N1ckdpcGh5RGF0YS53aW5kS3BofSBLUEhgO1xuICAgICAgfVxuICBcbiAgICAgIHRoaXMuZ2lwaHlJbWdFbG10LnNyYyA9IGN1ckdpcGh5RGF0YS5naXBoeVVybDtcbiAgICB9XG4gIFxuICAgIGFzeW5jIGhhbmRsZVNlYXJjaCgpIHtcbiAgICAgIHRoaXMuc3VibWl0QnRuLmZvY3VzKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zdWJtaXRCdG4uYmx1cigpO1xuICAgICAgfSwgMTAwKTtcbiAgICAgIGlmICh0aGlzLmlucHV0LnZhbHVlID09PSBcIlwiKSByZXR1cm47XG4gICAgICBhd2FpdCB0aGlzLmN1cnJlbnRHaXBoeVdlYXRoZXIubG9hZEdpcGh5V2VhdGhlcih0aGlzLmlucHV0LnZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlU2NyZWVuKCk7XG4gICAgfVxuICBcbiAgICBoYW5kbGVUb2dnbGUoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRHaXBoeVdlYXRoZXIudG9nZ2xlRk9yQygpO1xuICAgICAgdGhpcy51cGRhdGVTY3JlZW4oKTtcbiAgICB9XG4gIFxuICB9IiwiLyogZXNsaW50LWRpc2FibGUgbm8tYWxlcnQgKi9cbi8vIGNhbGxzIGdpcGh5IGFwaVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRHaXBoeSh3ZWF0aGVyKSB7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5naXBoeS5jb20vdjEvZ2lmcy90cmFuc2xhdGU/YXBpX2tleT1HRXBkeWpMRTBFMTBsQ0wxamtOajdlbkxRTnZiUzd0YSZzPSR7d2VhdGhlcn1gO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7IG1vZGU6IFwiY29yc1wiIH0pO1xuICAgIGNvbnN0IGpzb25SZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlLmRhdGEuaW1hZ2VzLm9yaWdpbmFsLnVybDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn1cbiIsImltcG9ydCBnZXRHaXBoeSBmcm9tIFwiLi9naXBoeUFwaUNhbGxzXCI7XG5pbXBvcnQgeyBnZXRXZWF0aGVyLCBwcm9jZXNzV2VhdGhlciB9IGZyb20gXCIuL3dlYXRoZXJBcGlDYWxsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaXBoeVdlYXRoZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5pY29uID0gXCJcIjtcbiAgICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9IFwiXCI7XG4gICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgdGhpcy5yZWdpb24gPSBcIlwiO1xuICAgICAgdGhpcy5jb3VudHJ5ID0gXCJcIjtcbiAgICAgIHRoaXMudGVtcEYgPSBcIlwiO1xuICAgICAgdGhpcy50ZW1wQyA9IFwiXCI7XG4gICAgICB0aGlzLmZlZWxzTGlrZUYgPSBcIlwiO1xuICAgICAgdGhpcy5mZWVsc0xpa2VDID0gXCJcIjtcbiAgICAgIHRoaXMud2luZE1waCA9IFwiXCI7XG4gICAgICB0aGlzLndpbmRLcGggPSBcIlwiO1xuICAgICAgdGhpcy5pc0RheSA9IFwiXCI7XG4gICAgICB0aGlzLmdpcGh5VXJsID0gXCJcIjtcbiAgICAgIHRoaXMuZk9yQyA9IDA7XG4gICAgfVxuICBcbiAgICBzZXRHaXBoeVdlYXRoZXIoZGF0YSwgZ2lwaHlVcmwpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGRhdGEuY29uZGl0aW9uLmljb247XG4gICAgICB0aGlzLmNvbmRpdGlvblRleHQgPSBkYXRhLmNvbmRpdGlvbi50ZXh0O1xuICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgdGhpcy5yZWdpb24gPSBkYXRhLnJlZ2lvbjtcbiAgICAgIHRoaXMuY291bnRyeSA9IGRhdGEuY291bnRyeTtcbiAgICAgIHRoaXMudGVtcEYgPSBkYXRhLnRlbXBfZjtcbiAgICAgIHRoaXMudGVtcEMgPSBkYXRhLnRlbXBfYztcbiAgICAgIHRoaXMuZmVlbHNMaWtlRiA9IGRhdGEuZmVlbHNsaWtlX2Y7XG4gICAgICB0aGlzLmZlZWxzTGlrZUMgPSBkYXRhLmZlZWxzbGlrZV9jO1xuICAgICAgdGhpcy53aW5kTXBoID0gZGF0YS53aW5kX21waDtcbiAgICAgIHRoaXMud2luZEtwaCA9IGRhdGEud2luZF9rcGg7XG4gICAgICB0aGlzLmlzRGF5ID0gZGF0YS5pc19kYXk7XG4gICAgICB0aGlzLmdpcGh5VXJsID0gZ2lwaHlVcmw7XG4gICAgfVxuICBcbiAgICB0b2dnbGVGT3JDKCkge1xuICAgICAgaWYgKHRoaXMuZk9yQyA9PT0gMCkge1xuICAgICAgICB0aGlzLmZPckMgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mT3JDID0gMDtcbiAgICAgIH1cblxuICAgIH1cbiAgXG4gICAgYXN5bmMgbG9hZEdpcGh5V2VhdGhlcihsb2NhdGlvbikge1xuICAgICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZ2V0V2VhdGhlcihsb2NhdGlvbik7XG4gICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHByb2Nlc3NXZWF0aGVyKHdlYXRoZXJSZXNwb25zZSk7XG4gIFxuICAgICAgY29uc3QgZ2lwaHlVcmwgPSBhd2FpdCBnZXRHaXBoeSh3ZWF0aGVyRGF0YS5jb25kaXRpb24udGV4dCk7XG4gIFxuICAgICAgdGhpcy5zZXRHaXBoeVdlYXRoZXIod2VhdGhlckRhdGEsIGdpcGh5VXJsKTtcbiAgICB9XG4gIFxuICAgIGdldEdpcGh5V2VhdGhlcigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWNvblwiOiB0aGlzLmljb24sXG4gICAgICAgIFwiY29uZGl0aW9uVGV4dFwiOiB0aGlzLmNvbmRpdGlvblRleHQsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWUsXG4gICAgICAgIFwicmVnaW9uXCI6IHRoaXMucmVnaW9uLFxuICAgICAgICBcImNvdW50cnlcIjogdGhpcy5jb3VudHJ5LFxuICAgICAgICBcInRlbXBGXCI6IHRoaXMudGVtcEYsXG4gICAgICAgIFwidGVtcENcIjogdGhpcy50ZW1wQyxcbiAgICAgICAgXCJmZWVsc0xpa2VGXCI6IHRoaXMuZmVlbHNMaWtlRixcbiAgICAgICAgXCJmZWVsc0xpa2VDXCI6IHRoaXMuZmVlbHNMaWtlQyxcbiAgICAgICAgXCJ3aW5kTXBoXCI6IHRoaXMud2luZE1waCxcbiAgICAgICAgXCJ3aW5kS3BoXCI6IHRoaXMud2luZEtwaCxcbiAgICAgICAgXCJnaXBoeVVybFwiOiB0aGlzLmdpcGh5VXJsLFxuICAgICAgICBcImlzRGF5XCI6IHRoaXMuaXNEYXksXG4gICAgICAgIFwiZk9yQ1wiOiB0aGlzLmZPckNcbiAgICAgIH1cbiAgICB9XG4gIFxuICB9IiwiLyogZXNsaW50LWRpc2FibGUgbm8tYWxlcnQgKi9cbi8vIGNhbGxzIHdlYXRoZXJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MTk5M2FmMDYxODkyNDM5Yzk2NzE3MjQyNDIzMTIwNyZxPSR7bG9jYXRpb259YDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgICAgICAgY29uc3QganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyAgIGFsZXJ0KFwiRmFpbGVkIHRvIGZpbmQgYSBnaWYgZm9yIHRoYXQgd29yZCFcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gZmluZCBjaXR5ICR7bG9jYXRpb259IWApO1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1dlYXRoZXIod2VhdGhlckRhdGEpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMod2VhdGhlckRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gd2VhdGhlckRhdGFcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246IHdlYXRoZXJEYXRhLmN1cnJlbnQuY29uZGl0aW9uLFxuICAgICAgICBuYW1lOiB3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lLFxuICAgICAgICByZWdpb246IHdlYXRoZXJEYXRhLmxvY2F0aW9uLnJlZ2lvbixcbiAgICAgICAgY291bnRyeTogd2VhdGhlckRhdGEubG9jYXRpb24uY291bnRyeSxcbiAgICAgICAgdGVtcF9mOiB3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXBfZixcbiAgICAgICAgdGVtcF9jOiB3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXBfYyxcbiAgICAgICAgZmVlbHNsaWtlX2Y6IHdlYXRoZXJEYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YsXG4gICAgICAgIGZlZWxzbGlrZV9jOiB3ZWF0aGVyRGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jLFxuICAgICAgICB3aW5kX21waDogd2VhdGhlckRhdGEuY3VycmVudC53aW5kX21waCxcbiAgICAgICAgd2luZF9rcGg6IHdlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9rcGgsXG4gICAgICAgIGlzX2RheTogd2VhdGhlckRhdGEuY3VycmVudC5pc19kYXksICAgICAgICBcbiAgICB9O1xufVxuXG5cbi8vIGNvbnNvbGUubG9nKGdldFdlYXRoZXIoXCJjYW5cIikudGhlbigocmVzcG9uc2UpID0+IHtpZiAocmVzcG9uc2UpIGNvbnNvbGUubG9nKHByb2Nlc3NXZWF0aGVyKHJlc3BvbnNlKSl9KSk7XG4vLyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgICBmb250LWZhbWlseTogJ051bml0bycsIHNhbnMtc2VyaWY7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM4OEJEQkM7XG59XG5cbmgxIHtcbiAgICBjb2xvcjogI0ZGRkZGRjtcbiAgICBmb250LXdlaWdodDogNTAwO1xufVxuaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzExMkQzMjtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcbn1cblxuI3NlYXJjaC1pdGVtcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5pbnB1dFt0eXBlPVwidGV4dFwiXSB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgIzExMkQzMjtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbmJ1dHRvbiB7XG4gICAgY29sb3I6ICNGRkZGRkY7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICMxMTJEMzI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg4QkRCQztcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbmJ1dHRvbjpmb2N1cyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgICBjb2xvcjogIzg4QkRCQztcbn1cblxuLnRvZ2dsZS1zd2l0Y2gge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDYwcHg7XG4gICAgaGVpZ2h0OiAzNHB4O1xuICB9XG5cbiAgLnRvZ2dsZS1zd2l0Y2ggaW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAuc2xpZGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICAgIGJvcmRlci1yYWRpdXM6IDM0cHg7XG4gICAgdHJhbnNpdGlvbjogLjRzO1xuICB9XG5cbiAgLnNsaWRlcjpiZWZvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjb250ZW50OiBcIsKwRlwiO1xuICAgIGhlaWdodDogMjZweDtcbiAgICB3aWR0aDogMjZweDtcbiAgICBsZWZ0OiA0cHg7XG4gICAgYm90dG9tOiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHRyYW5zaXRpb246IC40cztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxuXG4gIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODhCREJDO1xuICB9XG5cbiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIsKwQ1wiO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcbiAgfVxuXG5cbiAgbWFpbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAxMCU7XG4gIH1cblxuICAud2VhdGhlci1jb250YWluZXIge1xuICAgIGNvbG9yOiAjRkZGRkZGO1xuICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiAjRkZGRkZGO1xuICB9XG5cbiAgI3dlYXRoZXIge1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgfVxuXG4gICNzdGF0cyB7XG4gICAgZGlzcGxheTogaW5saW5lO1xuICB9XG5cbiAgLnNpZGUtc3RhdHMge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tbGVmdDogMTBweDsgLyogQWRqdXN0IHRoZSBtYXJnaW4gYXMgbmVlZGVkICovXG4gIH1cblxuICAjc3RhdHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICB9XG5cbiAgI2xvY2F0aW9uIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xuICB9XG4gIFxuICAjZGVncmVlcyB7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuXG4gIGAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxpQ0FBaUM7SUFDakMsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixXQUFXO0lBQ1gsWUFBWTtFQUNkOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixNQUFNO0lBQ04sT0FBTztJQUNQLFFBQVE7SUFDUixTQUFTO0lBQ1Qsc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixlQUFlO0VBQ2pCOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixZQUFZO0lBQ1osV0FBVztJQUNYLFNBQVM7SUFDVCxXQUFXO0lBQ1gsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLGVBQWU7RUFDakI7O0VBRUE7SUFDRSx5QkFBeUI7RUFDM0I7O0VBRUE7SUFDRSxhQUFhO0lBQ2IsMkJBQTJCO0VBQzdCOzs7RUFHQTtJQUNFLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGNBQWM7SUFDZCxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsY0FBYztFQUNoQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLGlCQUFpQixFQUFFLGdDQUFnQztFQUNyRDs7RUFFQTtJQUNFLGFBQWE7SUFDYixrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxpQkFBaUI7SUFDakIsc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLHFCQUFxQjtFQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8nLCBzYW5zLXNlcmlmO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODhCREJDO1xcbn1cXG5cXG5oMSB7XFxuICAgIGNvbG9yOiAjRkZGRkZGO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMTJEMzI7XFxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuXFxuI3NlYXJjaC1pdGVtcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogMjVweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzExMkQzMjtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBjb2xvcjogI0ZGRkZGRjtcXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzExMkQzMjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg4QkRCQztcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG5idXR0b246Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICBjb2xvcjogIzg4QkRCQztcXG59XFxuXFxuLnRvZ2dsZS1zd2l0Y2gge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGhlaWdodDogMzRweDtcXG4gIH1cXG5cXG4gIC50b2dnbGUtc3dpdGNoIGlucHV0IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gIC5zbGlkZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgICBib3JkZXItcmFkaXVzOiAzNHB4O1xcbiAgICB0cmFuc2l0aW9uOiAuNHM7XFxuICB9XFxuXFxuICAuc2xpZGVyOmJlZm9yZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY29udGVudDogXFxcIsKwRlxcXCI7XFxuICAgIGhlaWdodDogMjZweDtcXG4gICAgd2lkdGg6IDI2cHg7XFxuICAgIGxlZnQ6IDRweDtcXG4gICAgYm90dG9tOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHRyYW5zaXRpb246IC40cztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgfVxcblxcbiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODhCREJDO1xcbiAgfVxcblxcbiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIsKwQ1xcXCI7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXG4gIH1cXG5cXG5cXG4gIG1haW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMTAlO1xcbiAgfVxcblxcbiAgLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgY29sb3I6ICNGRkZGRkY7XFxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIH1cXG5cXG4gIGgyIHtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgY29sb3I6ICNGRkZGRkY7XFxuICB9XFxuXFxuICAjd2VhdGhlciB7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gIH1cXG5cXG4gICNzdGF0cyB7XFxuICAgIGRpc3BsYXk6IGlubGluZTtcXG4gIH1cXG5cXG4gIC5zaWRlLXN0YXRzIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tbGVmdDogMTBweDsgLyogQWRqdXN0IHRoZSBtYXJnaW4gYXMgbmVlZGVkICovXFxuICB9XFxuXFxuICAjc3RhdHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmb250LXNpemU6IDAuNzVyZW07XFxuICB9XFxuXFxuICAjbG9jYXRpb24ge1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcXG4gIH1cXG4gIFxcbiAgI2RlZ3JlZXMge1xcbiAgICBmb250LXNpemU6IDNyZW07XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIH1cXG5cXG4gIFwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZXMuY3NzJztcbmltcG9ydCBVSSBmcm9tICcuL1VJJztcblxuXG5cbmNvbnN0IGN1cnJlbnRVSSA9IG5ldyBVSSgpO1xuXG5cblxuXG5cbiJdLCJuYW1lcyI6WyJHaXBoeVdlYXRoZXIiLCJVSSIsImNvbnN0cnVjdG9yIiwiY3VycmVudEdpcGh5V2VhdGhlciIsImlucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3VibWl0QnRuIiwiaW1nIiwid2VhdGhlckVsbXQiLCJsb2NhdGlvbkVsbXQiLCJkZWdyZWVzRWxtdCIsImZlZWxzTGlrZUVsbXQiLCJ3aW5kRWxtdCIsInRvZ2dsZUVsbXQiLCJnaXBoeUltZ0VsbXQiLCJsYWJlbEdpcGh5RWxtdCIsImFkZEV2ZW50TGlzdGVuZXJzIiwibG9hZFdlYXRoZXJEYXRhIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVNlYXJjaCIsImhhbmRsZVRvZ2dsZSIsImxvYWRHaXBoeVdlYXRoZXIiLCJ1cGRhdGVTY3JlZW4iLCJjdXJHaXBoeURhdGEiLCJnZXRHaXBoeVdlYXRoZXIiLCJzcmMiLCJpY29uIiwiaW5uZXJIVE1MIiwiY29uZGl0aW9uVGV4dCIsIm5hbWUiLCJyZWdpb24iLCJjb3VudHJ5IiwiZk9yQyIsInRlbXBGIiwiZmVlbHNMaWtlRiIsIndpbmRNcGgiLCJ0ZW1wQyIsImZlZWxzTGlrZUMiLCJ3aW5kS3BoIiwiZ2lwaHlVcmwiLCJmb2N1cyIsInNldFRpbWVvdXQiLCJibHVyIiwidmFsdWUiLCJ0b2dnbGVGT3JDIiwiZ2V0R2lwaHkiLCJ3ZWF0aGVyIiwidXJsIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJqc29uUmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImltYWdlcyIsIm9yaWdpbmFsIiwiZ2V0V2VhdGhlciIsInByb2Nlc3NXZWF0aGVyIiwiaXNEYXkiLCJzZXRHaXBoeVdlYXRoZXIiLCJjb25kaXRpb24iLCJ0ZXh0IiwidGVtcF9mIiwidGVtcF9jIiwiZmVlbHNsaWtlX2YiLCJmZWVsc2xpa2VfYyIsIndpbmRfbXBoIiwid2luZF9rcGgiLCJpc19kYXkiLCJsb2NhdGlvbiIsIndlYXRoZXJSZXNwb25zZSIsIndlYXRoZXJEYXRhIiwiY29uc29sZSIsImxvZyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJjdXJyZW50IiwiY3VycmVudFVJIl0sInNvdXJjZVJvb3QiOiIifQ==