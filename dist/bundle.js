/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let name\nlet lat,lon\nlet lang\nlet textTime = \"Obtained at \"\nlet textAlert = \"Wrong city name\"\nconst apiKey = \"c7d152a407e60b1ff70f5f48a86acc65\"\n\n$(document).ready(function(){\n    $('#search').focus()\n\n    // Tooltips Initialization\n    $(function () {\n        $('[data-toggle=\"tooltip\"]').tooltip()\n     })\n});\n\nwindow.onload = function() {\n    \nlet input = document.querySelector('#search');\n\nname = document.querySelector('.WCName')\nlet temp = document.querySelector('.WCTemp');\nlet desc = document.querySelector('.WCDesc');\n\nlet currentWeather = document.querySelector(\".getCurrentWeather\")\nlet selectedLangEn = document.querySelector(\"#en\")\nlet selectedLangIt = document.querySelector(\"#it\")\n\nlet icon = document.querySelector('#weatherIcon')\n\nlet button= document.querySelector('.submit');\n\nlang = document.documentElement.lang\n\nif (lang == \"it\"){\n    textTime = \"Ottenuto alle \"\n    selectedLangIt.selected = true\n    textAlert = \"Nome città sbagliato\"\n}\nelse if (lang == \"en\"){\n    selectedLangEn.selected = true\n}\n\n\n//----------------- AlgoliaApi - Start ------------------\n\n(function autoComplete() {\n    var placesAutocomplete = places({\n        appId: \"plUKSK5P1V5M\",\n        apiKey: \"751ed7d3cb3a0b3dd60eb14039c2887d\",\n        container: document.querySelector('#search'),\n        templates: {\n            value: function(suggestion) {\n            let name = suggestion.name\n            return name    \n            }\n        }\n    }).configure({\n        type: 'city',\n        aroundLatLngViaIP: false\n    })\n})()\n\n//----------------- AlgoliaApi - End ------------------\n\n//----------------- GeoLocation - Start ------------------\n\ncurrentWeather.addEventListener(\"click\", getLocation)\n\nfunction getLocation() {\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(showPosition);\n        name.innerHTML = \"Loading...\"\n        temp.innerHTML = \"\"\n        desc.innerHTML = \"\"\n    } else { \n        alert(\"Geolocation is not supported\")\n    }\n    }\n\nfunction showPosition(position) {\n    lat = position.coords.latitude;\n    lon = position.coords.longitude;\n    cityWeather()\n    } \ngetLocation()\n\n//----------------- GeoLocation - End ------------------\n    \n//----------------- OpenWeather - Start ------------------\n\nbutton.addEventListener('click', function(){\n    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+ apiKey +'&lang='+lang)\n    .then(response => response.json())\n    .then(data => {\n    \n    let tempValue = data['main']['temp'];\n    tempValue = (tempValue - 273).toFixed(1)\n    let nameValue = data['name'];\n    let descValue = data['weather'][0]['description'];\n    let weatherIcon = data['weather'][0]['icon'];\n\n    let iconLink = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';\n\n    time()\n    icon.src = iconLink\n    name.innerHTML = nameValue;\n    desc.innerHTML = descValue;\n    temp.innerHTML = tempValue + ' &#186C';\n    input.value=\"\"\n\n    })\n\n    .catch(err => alert(textAlert));\n})\n\n//----------------- OpenWeather - End ------------------\n\n}\n\n//----------------- OpenWeather - Start ------------------\n\nfunction cityWeather() {\n    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid='+ apiKey +'&lang=' + lang )\n    .then(response => response.json())\n    .then(data => {\n      \n    let tempValue = data['main']['temp'];\n    tempValue = (tempValue - 273).toFixed(1)\n    let nameValue = data['name'];\n    let descValue = data['weather'][0]['description'];\n    console.log(data)\n    \n    name = document.querySelector('.WCName')\n    let temp = document.querySelector('.WCTemp');\n    let desc = document.querySelector('.WCDesc');\n    let icon = document.querySelector('#weatherIcon')\n\n    let weatherIcon = data['weather'][0]['icon'];\n\n    let iconLink = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';\n\n    name.innerHTML = nameValue;\n    desc.innerHTML = descValue;\n    temp.innerHTML = tempValue + ' &#186C';\n    icon.src = iconLink\n\n    time()\n\n    })\n\n    .catch(err => alert(textAlert));\n}\n\n//----------------- OpenWeather - End ------------------\n\n\nfunction time(){\n    let today = new Date();\n    let getTime = today.getHours() + \":\" + (today.getMinutes() < 10? '0' : '') + today.getMinutes();\n    let localTime = document.querySelector(\"#localTime\");\n    localTime.innerHTML = textTime + getTime;\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });