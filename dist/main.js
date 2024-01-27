/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/api */ \"./src/modules/api.js\");\n/* harmony import */ var _modules_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/view */ \"./src/modules/view.js\");\n/* harmony import */ var _modules_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/utility */ \"./src/modules/utility.js\");\n/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/controller */ \"./src/modules/controller.js\");\n\n\n\n\n\nconst key = '1936e1a1557d4a5f89265100242501'\n\nfunction constructQueryString(cityName) {\n  return `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=3`;\n}\n\nasync function load() {\n  const weatherData = await _modules_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getData('seoul');\n  console.log(weatherData)\n\n  const currentHour = parseInt((weatherData.currentWeatherData.currentTime).split(':')[0]);\n  _modules_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadLocationContainer(weatherData.currentWeatherData)\n  _modules_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadCurrentWeather(weatherData.currentWeatherData, true);\n  _modules_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadHourlyCards(weatherData.hourlyForecastData, true, currentHour);\n  _modules_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadForecastCardText(weatherData.futureForecastData, true);\n}\n\n_modules_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init()\n\n_modules_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"].loadData('london', true)\n\n// controller.updateUnit()\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

/***/ }),

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst api = (() => {\n  const key = '1936e1a1557d4a5f89265100242501';\n  // process data\n  async function processData(data) {\n    const hourlyForecastData = [];\n    const futureForecastData = [];\n\n    /* extract current weather data */\n    const currentWeatherData = {\n      location: data.location.name,\n      country: data.location.country,\n      temp_c: data.current.temp_c,\n      temp_f: data.current.temp_f,\n      condition_text: data.current.condition.text,\n      condition_icon: data.current.condition.icon,\n      feelsLike_c: data.current.feelslike_c,\n      feelsLike_f: data.current.feelslike_f,\n      maxTemp_c: data.forecast.forecastday[0].day.maxtemp_c,\n      maxTemp_f: data.forecast.forecastday[0].day.maxtemp_f,\n      minTemp_c: data.forecast.forecastday[0].day.mintemp_c,\n      minTemp_f: data.forecast.forecastday[0].day.minTemp_f,\n      date: data.location.localtime.split(' ')[0],\n      currentTime: data.location.localtime.split(' ')[1]\n    }\n\n    /* extract hourly data */\n    const forecast = data.forecast.forecastday;\n    let i = 0;\n    forecast.forEach(day => {\n      day.hour.forEach(hourlyData => {\n        hourlyForecastData.push({\n          time: i++,\n          temp_c: hourlyData.temp_c,\n          temp_f: hourlyData.temp_f,\n          condition_text: hourlyData.condition.text,\n          condition_icon: hourlyData.condition.icon \n        });\n      });\n    });\n\n    /* extract future data */\n    const forecastDay = data.forecast.forecastday;\n    for (i=1; i<forecastDay.length; i++) {\n      futureForecastData.push({\n        date: forecastDay[i].date,\n        avgTemp_c: forecastDay[i].day.avgtemp_c,\n        avgTemp_f: forecastDay[i].day.avgtemp_f,\n        condition_text: forecastDay[i].day.condition.text,\n        condition_icon: forecastDay[i].day.condition.icon\n      });\n    }\n    \n    return {\n      currentWeatherData,\n      hourlyForecastData,\n      futureForecastData\n    }\n  }\n\n  // fetch data\n  async function getData(cityName) {\n    try {\n      const response = await fetch(\n        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=3`,\n        { mode: 'cors' },\n      );\n      const rawData = await response.json();\n      return processData(rawData)\n    } catch (error) {\n      alert('invalid city')\n      return { cod: error.name, message: error.message };\n    }\n  }\n\n  return {\n    getData\n  }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n//# sourceURL=webpack://weatherapp/./src/modules/api.js?");

/***/ }),

/***/ "./src/modules/controller.js":
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/modules/api.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ \"./src/modules/utility.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/modules/view.js\");\n\n\n\n\nconst DEFAULT_LOC = 'seoul';\n\nconst controller = (() => {\n  // event functions\n  function updateUnit(e) {\n    const currentUnitBtn = document.querySelector('.activeBtn');\n\n    if (currentUnitBtn.id === e.target.id) return;\n\n    let isCelcius;\n    if (currentUnitBtn.id === 'celciusBtn') {\n      const fahrenBtn = document.querySelector('#fahrenBtn');\n      fahrenBtn.classList.add('activeBtn');\n      isCelcius = false;\n    } else {\n      const celciusBtn = document.querySelector('#celciusBtn');\n      celciusBtn.classList.add('activeBtn');\n      isCelcius = true;\n    }\n    currentUnitBtn.classList.remove('activeBtn');\n\n    // update data\n    const currentWeather = (document.querySelector('.currentCity').innerHTML).toLowerCase();\n    loadData(currentWeather, isCelcius);\n  }\n\n  function isCelcius() {\n    const currentUnitBtn = document.querySelector('.activeBtn');\n    if (currentUnitBtn.id === 'celciusBtn') return true;\n    return false; \n  }\n\n  function handleSearch(e) {\n    const form = document.querySelector('#locationForm');\n    const input = document.querySelector('#locationInput'); // input.value\n    e.preventDefault();\n\n    const cityName = _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].stripIput(input.value);\n\n    loadData(cityName, isCelcius());\n\n    form.reset();\n  }\n\n  async function loadData(city=DEFAULT_LOC, isCelcius=true) {\n    const weatherData = await _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getData(city);\n    console.log(weatherData)\n\n    const currentHour = parseInt((weatherData.currentWeatherData.currentTime).split(':')[0]);\n    _view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].clearData();\n    _view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadLocationContainer(weatherData.currentWeatherData)\n    _view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadCurrentWeather(weatherData.currentWeatherData, isCelcius);\n    _view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadHourlyCards(weatherData.hourlyForecastData, isCelcius, currentHour);\n    _view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadForecastCardText(weatherData.futureForecastData, isCelcius);\n  }\n\n  // event handlers\n  function attatchHandlers() {\n    const fahrenBtn = document.querySelector('#fahrenBtn');\n    const celciusBtn = document.querySelector('#celciusBtn');\n    const searchForm = document.querySelector('#locationForm');\n    \n    fahrenBtn.addEventListener('click', updateUnit);\n    celciusBtn.addEventListener('click', updateUnit);\n    searchForm.addEventListener('submit', handleSearch);\n  }\n\n  function init() {\n    attatchHandlers();\n  }\n\n  return {\n    updateUnit,\n    loadData,\n    init\n  }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controller);\n\n//# sourceURL=webpack://weatherapp/./src/modules/controller.js?");

/***/ }),

/***/ "./src/modules/utility.js":
/*!********************************!*\
  !*** ./src/modules/utility.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst utility = (() => {\n  function convertTime(time24) {\n    // console.log(time24)\n    let time12;\n    let tag;\n    if (time24 == 0) {\n      time12 = 12;\n      tag = 'AM';\n    }\n    // 0 ~ 11\n    else if (time24 < 12) {\n      time12 = time24;\n      tag = 'AM'\n    }\n    else if (time24 == 12) {\n      time12 = 12;\n      tag = 'PM';\n    }\n    // 12 ~ 23\n    else if (time24 < 24) {\n      time12 = time24 - 12;\n      tag = 'PM';\n    }\n    else if (time24 == 24) {\n      time12 = 12;\n      tag = 'AM';\n    }\n    // 24 ~ 27\n    else {\n      time12 = time24 - 24;\n      tag = 'AM'\n    }\n\n    return {\n      time12,\n      tag\n    }\n  }\n\n  function getDayOfWeek(dateString) {\n    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n\n    return days[new Date(dateString).getDay()];\n  }\n\n  function stripIput(input) {\n    return input.toLowerCase().trim();\n  }\n\n  return {\n    convertTime,\n    getDayOfWeek,\n    stripIput\n  }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utility);\n\n//# sourceURL=webpack://weatherapp/./src/modules/utility.js?");

/***/ }),

/***/ "./src/modules/view.js":
/*!*****************************!*\
  !*** ./src/modules/view.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/modules/utility.js\");\n\n\nconst view = (() => {\n  const contentDiv = document.querySelector('.content');\n\n  function loadLocationContainer(data) {\n    // weatherData.currentWeatherData\n    const currentCity = document.querySelector('.currentCity');\n    const currentCountry = document.querySelector('.currentCountry');\n\n    currentCity.innerHTML = data.location;\n    currentCountry.innerHTML = data.country;\n  }\n\n  // for currentWeatherContainer\n  function loadCurrentWeather(data, isCelcius) {\n    // weatherData.currentWeatherData\n    const currentTempText = document.querySelector('#currentTempText');\n    const temp = isCelcius ? data.temp_c : data.temp_f;\n    currentTempText.innerHTML = `${temp}°`;\n\n    const currentConditionText = document.querySelector('#currentConditionText');\n    currentConditionText.innerHTML = data.condition_text;\n\n    const currentConditionIcon = document.querySelector('#currentConditionIcon');\n    currentConditionIcon.src = data.condition_icon;\n  }\n\n  function loadHourlyCards(hourlyForecastData, isCelcius, currentHour) {\n    const hourlyForecastContainer = document.querySelector('.hourlyForecastContainer');\n\n    for (let i=1; i<5; i++) {\n      let idx = i + currentHour;\n      const hourlyCard = generateHourlyCards(hourlyForecastData[idx], isCelcius);\n      hourlyForecastContainer.appendChild(hourlyCard);\n    }\n  } \n\n  function generateHourlyCards(data, isCelcius) {\n    // hourlyForecastData[i]\n    const hourlyForecastCard = document.createElement('div');\n    hourlyForecastCard.classList.add('hourlyForecastCard');\n\n    const currTime = document.createElement('p');\n    currTime.classList.add('currTime');\n    const times = _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].convertTime(parseInt(data.time));\n    currTime.innerHTML = `${times.time12}&nbsp;${times.tag}`;\n\n    const hourlyIconContainer = document.createElement('div');\n    hourlyIconContainer.classList.add('hourlyIconContainer');\n\n    const smallTemp = document.createElement('p');\n    smallTemp.classList.add('smallTemp');\n    const temp = isCelcius ? data.temp_c : data.temp_f;\n    smallTemp.innerHTML = `${temp}°`;\n\n    const icon = document.createElement('img');\n    icon.src = data.condition_icon;\n\n    // attatch\n    hourlyIconContainer.appendChild(smallTemp);\n    hourlyIconContainer.appendChild(icon);\n\n    hourlyForecastCard.appendChild(currTime);\n    hourlyForecastCard.appendChild(hourlyIconContainer);\n\n    return hourlyForecastCard;\n  }\n\n  function loadForecastCardText(data, isCelcius) {\n    // data -> futureForecastData\n    const futureCardContainer = document.querySelector('.futureCardContainer');\n    const d1 = generateForecastCard(data[0], isCelcius);\n    const d2 = generateForecastCard(data[1], isCelcius);\n\n    futureCardContainer.appendChild(d1);\n    futureCardContainer.appendChild(d2);\n  }\n\n  function generateForecastCard(data, isCelcius) {\n    // futureForecastData[i]\n    const futureForecastCard = document.createElement('div');\n    futureForecastCard.classList.add('futureForecastCard');\n\n    const forecastCardText = document.createElement('p');\n    forecastCardText.classList.add('forecastCardText');\n    forecastCardText.innerHTML = _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getDayOfWeek(data.date); \n\n    const bigTemp = document.createElement('p');\n    bigTemp.classList.add('bigTemp');\n    const temp = isCelcius ? data.avgTemp_c : data.avgTemp_f; \n    bigTemp.innerHTML = `${temp}°`;\n\n    const icon = document.createElement('img');\n    icon.src = data.condition_icon;\n    \n    futureForecastCard.appendChild(forecastCardText);\n    futureForecastCard.appendChild(bigTemp);\n    futureForecastCard.appendChild(icon);\n\n    return futureForecastCard;\n  }\n\n  function clearData() {\n    // clear hourly cards\n    const hourlyForecastContainer = document.querySelector('.hourlyForecastContainer');\n    hourlyForecastContainer.innerHTML = '';\n\n    // clear forecast cards\n    const futureCardContainer = document.querySelector('.futureCardContainer');\n    futureCardContainer.innerHTML = '';\n  }\n\n  return {\n    loadLocationContainer,\n    loadCurrentWeather,\n    loadHourlyCards,\n    loadForecastCardText,\n    clearData\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);\n\n//# sourceURL=webpack://weatherapp/./src/modules/view.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;