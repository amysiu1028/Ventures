/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allTravelerData": () => (/* binding */ allTravelerData),
/* harmony export */   "allTripsData": () => (/* binding */ allTripsData),
/* harmony export */   "allDestinataionData": () => (/* binding */ allDestinataionData),
/* harmony export */   "tripsByID": () => (/* binding */ tripsByID),
/* harmony export */   "totalCostForNewTrip": () => (/* binding */ totalCostForNewTrip),
/* harmony export */   "selectedDestinationID": () => (/* binding */ selectedDestinationID)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_VentureLogo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _data_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);



//import functions?




//global variables:
let allTravelerData;
let allTripsData;
let allDestinataionData;
let userID;

let tripsByID;
let totalCostForNewTrip;
let duration;
let selectedDestinationID;

//querySelectors:
const submitButton = document.querySelector('.submit-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const serverDownErrorMessage  = document.querySelector('.error-message') 
const yearDropdown = document.querySelector('.year-dropdown');
const startDateInput = document.querySelector('#startDate');
const endDateInput = document.querySelector('#endDate');
const destinationDropdown = document.querySelector('.destination-dropdown');
const travelNumbersInput = document.getElementById('travel-numbers');
const addNewTripButton = document.querySelector('.add-trip-button');

//addEventListeners:
window.addEventListener('DOMContentLoaded', function () {
    Promise.all(_apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchAllPromises)
        .then((values) => {
            allTravelerData = values[0].travelers;
            allTripsData = values[1].trips;
            allDestinataionData = values[2].destinations;
        })
        .catch((error) => {
            console.error("Error occurred:", error.message);
        });
});

submitButton.addEventListener("click",function(event) {
    event.preventDefault() 
    userID = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.getUserID)(usernameInput.value);

    const loginResult = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.handleLogin)(usernameInput.value, passwordInput.value, userID);
    if (loginResult === true) {
        new Promise((resolve,reject) => {
            (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchSingleTravelerPromise)(`http://localhost:3001/api/v1/travelers/${userID}`)
            .then((singleTravelerValue) => {
                serverDownErrorMessage.classList.add('hidden');
                tripsByID = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.getSpecificTravelerTrips)(allTripsData,userID);
                const todaysDate = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.getTodaysDate)();
                const pastTrips = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.travelerPastTrips)(tripsByID,todaysDate);
                const upcomingTrips = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.travelerUpcomingTrips)(tripsByID,todaysDate);
                console.log("upcoming",upcomingTrips)
                const pendingTrips = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.travelerPendingTrips)(tripsByID);
                
                //show single traveler information:
                (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.loadDashboard)();
                (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayUserName)(singleTravelerValue);

                (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayPastTrips)(pastTrips, allDestinataionData);
                (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayUpcomingTrips)(upcomingTrips, allDestinataionData);
                (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayPendingTrips)(pendingTrips, allDestinataionData);

                //Add event listener for year selection:
                yearDropdown.addEventListener('change', function () {
                    const selectedYear = yearDropdown.value;
                    const filterTripsByChosenYear = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.filterTripByYear)(tripsByID, selectedYear);
                    const totalCost = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.getTotalCostPerYear)(filterTripsByChosenYear,allDestinataionData);
                    const addFeeCost = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.costWithFee)(totalCost);
                    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayCostPerYear)(selectedYear,tripsByID,addFeeCost);
                });

                let startDateValue;
                let endDateValue;
                let findDesinationID;
                
                const startDatePicker = datepicker(startDateInput, {
                    minDate: new Date(),
                    onSelect: (instance, dateStr) => {
                        const date = new Date(dateStr);
                        startDateValue = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                        startDateInput.value = startDateValue;
                        return startDateValue;
                    },
                });
            
                const endDatePicker = datepicker(endDateInput, {
                    minDate: new Date(),
                    onSelect: (instance, dateStr) => {
                        const date = new Date(dateStr);
                        endDateValue = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                        endDateInput.value = endDateValue;
                        duration = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.calculateDuration)(startDateValue, endDateValue, startDateInput.value, endDateInput.value);
                        resolve(singleTravelerValue);
                        return endDateValue;
                    },
                });  

                travelNumbersInput.addEventListener('input', function () {
                    const inputValue = travelNumbersInput.value;
                    if (!Number.isInteger(parseFloat(inputValue)) || parseInt(inputValue) < 1) {
                        alert('Please enter a valid whole number greater than zero.');
                        travelNumbersInput.value = ''; // Clear the input field
                    }
                });
                
                (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displaySortedDestinations)(allDestinataionData);
                destinationDropdown.addEventListener('change', function() {
                    selectedDestinationID = parseInt(destinationDropdown.value);
                    findDesinationID = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.getDestinationID)(allDestinataionData,selectedDestinationID)
                })
                
                ///THIS IS WHERE I WILL PUT POST request under an addeventlistener
                addNewTripButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    const travelers = parseInt(travelNumbersInput.value);
                    const currentDate = new Date();
                    console.log("new Date(startDateInput.value) ",new Date(startDateInput.value))
                    console.log("currentDate,",currentDate)
                    if (new Date(startDateInput.value) < currentDate) {
                        alert('Trip date must be greater than current date.');
                        return;
                    }
                    duration = (0,_data_model__WEBPACK_IMPORTED_MODULE_3__.calculateDuration)(startDateValue, endDateValue, startDateInput.value, endDateInput.value);
                    const nextID = allTripsData.length + 1; 
                    
                    // userID = parseInt(userID)

                    const newTripData = {
                        id: nextID,
                        userID: userID,
                        destinationID: findDesinationID,
                        travelers: travelers,
                        date: startDateValue || startDateInput.value,
                        duration: duration,
                        status: 'pending',
                        suggestedActivities: []
                    };

                    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchPosts)(newTripData);
                    resolve(singleTravelerValue);
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    } else if (typeof loginResult === 'string') {
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayLoginErrorMessage)(loginResult)
    }
});


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_pexels_tom_mal_k_3367619_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_pexels_tom_mal_k_3367619_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center; \n  background-repeat: no-repeat;\n  background-size: cover;\n  color: #0E1929;\n  font-family: 'Playfair Display', serif;\n  height: 100vh;\n  width: 100vw;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.login-container,\n.login-box,\n.left-aside,\n.dashboard-header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login {\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  width: 80vw;\n}\n\nh2 {\n  font-size: 28px;\n  font-weight: 300;\n  font-style: italic;\n}\n\n.welcome {\n  display: flex;\n  flex-direction: column;\n}\n\n.login-box {\n  background-color: rgba(255, 255, 255, 0.75);\n  margin: 1% 10%;\n  padding: 3% 8%;\n  border-radius: 8%;\n\n}\n\n.login-container {\n  width: 50vh;\n}\n\n.login-inputs {\n  width: 100%;\n  margin-bottom: 10%;\n  text-align: left;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.inputField {\n  width: 100%;\n  padding: 18px;\n  box-sizing: border-box;\n  margin: 5px 30px;\n}\n\n.submit-button {\n  padding: 20px;\n  margin-top: 10px;\n  font-size: 30px;\n}\n\n.add-trip-button,\n.submit-button  {\n  color: #F4BE74;\n  border-radius: 10px;\n  background-color: #2F486C;\n}\n\n.login-header {\n  margin-bottom: 6%;\n}\n\n.dashboard {\n  display: flex;\n  width: 90vw; \n  height: 80vh;\n}\n\n.dashboard-main {\n  display: flex;\n  flex-direction: column;\n}\n\n.left-aside {\n  border: 2px solid #F4BE74;\n  background-color: rgba(244, 190, 116, 0.95);\n  width: 23%;\n  height: 100%;\n  justify-content: center;\n  text-align: center;\n}\n\n.dashboard-main {\n  border: 2px solid #ffffff;\n  width: 77%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  background-color: rgba(255, 255, 255, 0.75);\n}\n\n.dashboard-header {\n  height: 30%;\n}\n \nh1,\n.username, \n.password,\n.start-journey {\n  font-size: 30px;\n  font-weight: bold;\n  margin: 3% 0%;\n}\n\n.dashboard-header h1 {\n  color: #2F486C;\n  margin-top: 2%;\n  margin-bottom: 2%;\n}\n\n#username,\n#password {\n  font-size: 25px;\n  font-weight: 100;\n  padding: 5%;\n  margin-left: 5%;\n  margin-top: 5%;\n}\n\n.add-spacing-to-headers {\n  margin-top: 10%;\n  margin-bottom: 3%;\n}\n\nh2 {\n  font-size: 30px;\n  margin-top: 0.5%;\n  margin-bottom: 0.5%;\n}\n\n#endDate, \n#startDate {\n  width: 150px;\n}\n\n#travel-numbers,\n.select-year-title,\n#year-dropdown {\n  width: 250px; \n  padding: 3px; \n}\n\n#travel-numbers {\n  width: 248px; \n}\n\n#year-dropdown,\n.destination-dropdown {\n  font-size: 17px;\n  font-weight: 100;\n  width: 180px;\n}\n\n.destination-dropdown {\n  width: 200px;\n}\n\n.trips-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 90%;\n  height: 60%;\n  margin-top: 60px;\n}\n\n.trips, \n.middle-trips {\n  padding: 3%;\n  width: 20vw;\n  text-align: center;\n  background: rgba(244, 190, 116, 0.85);\n  border-radius: 3%;\n  max-height: 90vh;\n  overflow-y: auto;\n  margin-top: 8%;\n}\n\n.middle-trips {\n  margin-top: 8%;\n  margin-left: 3%;\n  margin-right: 3%;\n}\n\n.past-trips,\n.upcoming-trips,\n.pending-trips {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  font-size: 12px;\n}\n\n.trip-box {\n  border: 1px solid #0E1929;\n  padding: 10px;\n  margin: 4.5% 0.1%;\n  color: #0E1929;\n  border-radius: 3%;\n  background: white;\n}\n\n.trip-box h1,\np {\n  font-size: 17px;\n  font-weight: bold;\n}\n\n.total-cost-statement {\n  font-size: 20px;\n  text-align: center;\n  margin: 3%;\n}\n\n.select-year-title {\n  margin-bottom: 10%;\n}\n\n.add-new-trip {\n  display: flex;\n  align-items: center;\n  background-color: rgba(244, 190, 116, 0.90);\n  margin-top: 1%;\n  margin-bottom: 0.5%;\n  padding: 2%;\n}\n\n.add-new-trip-container {\n  width: 62vw;\n  align-items: center;\n\n}\n\n.new-trip-statement {\n  font-size: 20px;\n  font-weight: 100;\n  margin: 0px;\n  text-align: center;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n.image-container {\n  width: 100%;\n  overflow: hidden;\n}\n\n.image-container img {\n  width: 100%;\n  height: auto;\n}\n\n#startDate,\n#endDate,\n#travel-numbers {\n  font-size: 20px;\n}\n\n.login-error-message {\n  color: darkred;\n  font-size: 20px;\n  text-align: center;\n}\n\n.destination-dropdown {\n  color:#F4BE74;\n  background-color: #0E1929;\n  font-weight: bold;\n  padding: 0.55%;\n}\n\n.trip-section-space {\n  margin-left: 0.01%;\n}\n\n.start-date,\n.end-date,\n.number-travelers, \n.destination-label,\n.year-dropdown,\n.select-year {\n  font-size: 25px;\n}\n\n.logo {\n  width: 260px;\n  height: 250px;\n}\n\n.welcome-header {\n  color: #2F486C;\n}\n\n.dropdown-container,\n.number-travelers,\n.destination-label,\n.start-date,\n.end-date,\n.destination-dropdown,\n.add-trip-button,\n.select-year,\n.submit-button,\n.select-year {\n  /* margin: 0.5% 0%; */\n  font-weight: bold;\n  font-family: 'Playfair Display', serif;\n}\n\n.add-trip-button {\n  font-size: 17px;\n  margin-top: 2%;\n  margin-bottom: 0;\n  width: 125px;\n  padding: 3px;\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,wFAAwF;EACxF,yDAAiE;EACjE,2BAA2B;EAC3B,4BAA4B;EAC5B,sBAAsB;EACtB,cAAc;EACd,sCAAsC;EACtC,aAAa;EACb,YAAY;EACZ,SAAS;EACT,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;;;EAIE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,2CAA2C;EAC3C,cAAc;EACd,cAAc;EACd,iBAAiB;;AAEnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,eAAe;AACjB;;AAEA;;EAEE,cAAc;EACd,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;EACzB,2CAA2C;EAC3C,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,UAAU;EACV,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,mBAAmB;EACnB,2CAA2C;AAC7C;;AAEA;EACE,WAAW;AACb;;AAEA;;;;EAIE,eAAe;EACf,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,cAAc;EACd,cAAc;EACd,iBAAiB;AACnB;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;;EAEE,YAAY;AACd;;AAEA;;;EAGE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;;EAEE,eAAe;EACf,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,UAAU;EACV,WAAW;EACX,gBAAgB;AAClB;;AAEA;;EAEE,WAAW;EACX,WAAW;EACX,kBAAkB;EAClB,qCAAqC;EACrC,iBAAiB;EACjB,gBAAgB;EAChB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;;AAEA;;;EAGE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,iBAAiB;EACjB,cAAc;EACd,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;;EAEE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,2CAA2C;EAC3C,cAAc;EACd,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,mBAAmB;;AAErB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,WAAW;EACX,YAAY;EACZ,UAAU;EACV,gBAAgB;EAChB,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;;;EAGE,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;;;;;EAME,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;;;;;;;;;EAUE,qBAAqB;EACrB,iBAAiB;EACjB,sCAAsC;AACxC;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;AACf","sourcesContent":["body {\n  background: radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);\n  background-image: url('../images/pexels-tomáš-malík-3367619.jpg');\n  background-position: center; \n  background-repeat: no-repeat;\n  background-size: cover;\n  color: #0E1929;\n  font-family: 'Playfair Display', serif;\n  height: 100vh;\n  width: 100vw;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.login-container,\n.login-box,\n.left-aside,\n.dashboard-header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login {\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  width: 80vw;\n}\n\nh2 {\n  font-size: 28px;\n  font-weight: 300;\n  font-style: italic;\n}\n\n.welcome {\n  display: flex;\n  flex-direction: column;\n}\n\n.login-box {\n  background-color: rgba(255, 255, 255, 0.75);\n  margin: 1% 10%;\n  padding: 3% 8%;\n  border-radius: 8%;\n\n}\n\n.login-container {\n  width: 50vh;\n}\n\n.login-inputs {\n  width: 100%;\n  margin-bottom: 10%;\n  text-align: left;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.inputField {\n  width: 100%;\n  padding: 18px;\n  box-sizing: border-box;\n  margin: 5px 30px;\n}\n\n.submit-button {\n  padding: 20px;\n  margin-top: 10px;\n  font-size: 30px;\n}\n\n.add-trip-button,\n.submit-button  {\n  color: #F4BE74;\n  border-radius: 10px;\n  background-color: #2F486C;\n}\n\n.login-header {\n  margin-bottom: 6%;\n}\n\n.dashboard {\n  display: flex;\n  width: 90vw; \n  height: 80vh;\n}\n\n.dashboard-main {\n  display: flex;\n  flex-direction: column;\n}\n\n.left-aside {\n  border: 2px solid #F4BE74;\n  background-color: rgba(244, 190, 116, 0.95);\n  width: 23%;\n  height: 100%;\n  justify-content: center;\n  text-align: center;\n}\n\n.dashboard-main {\n  border: 2px solid #ffffff;\n  width: 77%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  background-color: rgba(255, 255, 255, 0.75);\n}\n\n.dashboard-header {\n  height: 30%;\n}\n \nh1,\n.username, \n.password,\n.start-journey {\n  font-size: 30px;\n  font-weight: bold;\n  margin: 3% 0%;\n}\n\n.dashboard-header h1 {\n  color: #2F486C;\n  margin-top: 2%;\n  margin-bottom: 2%;\n}\n\n#username,\n#password {\n  font-size: 25px;\n  font-weight: 100;\n  padding: 5%;\n  margin-left: 5%;\n  margin-top: 5%;\n}\n\n.add-spacing-to-headers {\n  margin-top: 10%;\n  margin-bottom: 3%;\n}\n\nh2 {\n  font-size: 30px;\n  margin-top: 0.5%;\n  margin-bottom: 0.5%;\n}\n\n#endDate, \n#startDate {\n  width: 150px;\n}\n\n#travel-numbers,\n.select-year-title,\n#year-dropdown {\n  width: 250px; \n  padding: 3px; \n}\n\n#travel-numbers {\n  width: 248px; \n}\n\n#year-dropdown,\n.destination-dropdown {\n  font-size: 17px;\n  font-weight: 100;\n  width: 180px;\n}\n\n.destination-dropdown {\n  width: 200px;\n}\n\n.trips-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 90%;\n  height: 60%;\n  margin-top: 60px;\n}\n\n.trips, \n.middle-trips {\n  padding: 3%;\n  width: 20vw;\n  text-align: center;\n  background: rgba(244, 190, 116, 0.85);\n  border-radius: 3%;\n  max-height: 90vh;\n  overflow-y: auto;\n  margin-top: 8%;\n}\n\n.middle-trips {\n  margin-top: 8%;\n  margin-left: 3%;\n  margin-right: 3%;\n}\n\n.past-trips,\n.upcoming-trips,\n.pending-trips {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  font-size: 12px;\n}\n\n.trip-box {\n  border: 1px solid #0E1929;\n  padding: 10px;\n  margin: 4.5% 0.1%;\n  color: #0E1929;\n  border-radius: 3%;\n  background: white;\n}\n\n.trip-box h1,\np {\n  font-size: 17px;\n  font-weight: bold;\n}\n\n.total-cost-statement {\n  font-size: 20px;\n  text-align: center;\n  margin: 3%;\n}\n\n.select-year-title {\n  margin-bottom: 10%;\n}\n\n.add-new-trip {\n  display: flex;\n  align-items: center;\n  background-color: rgba(244, 190, 116, 0.90);\n  margin-top: 1%;\n  margin-bottom: 0.5%;\n  padding: 2%;\n}\n\n.add-new-trip-container {\n  width: 62vw;\n  align-items: center;\n\n}\n\n.new-trip-statement {\n  font-size: 20px;\n  font-weight: 100;\n  margin: 0px;\n  text-align: center;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n.image-container {\n  width: 100%;\n  overflow: hidden;\n}\n\n.image-container img {\n  width: 100%;\n  height: auto;\n}\n\n#startDate,\n#endDate,\n#travel-numbers {\n  font-size: 20px;\n}\n\n.login-error-message {\n  color: darkred;\n  font-size: 20px;\n  text-align: center;\n}\n\n.destination-dropdown {\n  color:#F4BE74;\n  background-color: #0E1929;\n  font-weight: bold;\n  padding: 0.55%;\n}\n\n.trip-section-space {\n  margin-left: 0.01%;\n}\n\n.start-date,\n.end-date,\n.number-travelers, \n.destination-label,\n.year-dropdown,\n.select-year {\n  font-size: 25px;\n}\n\n.logo {\n  width: 260px;\n  height: 250px;\n}\n\n.welcome-header {\n  color: #2F486C;\n}\n\n.dropdown-container,\n.number-travelers,\n.destination-label,\n.start-date,\n.end-date,\n.destination-dropdown,\n.add-trip-button,\n.select-year,\n.submit-button,\n.select-year {\n  /* margin: 0.5% 0%; */\n  font-weight: bold;\n  font-family: 'Playfair Display', serif;\n}\n\n.add-trip-button {\n  font-size: 17px;\n  margin-top: 2%;\n  margin-bottom: 0;\n  width: 125px;\n  padding: 3px;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/pexels-tomáš-malík-3367619.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/VentureLogo.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urls": () => (/* binding */ urls),
/* harmony export */   "fetchAllPromises": () => (/* binding */ fetchAllPromises),
/* harmony export */   "fetchSingleTravelerPromise": () => (/* binding */ fetchSingleTravelerPromise),
/* harmony export */   "fetchPosts": () => (/* binding */ fetchPosts)
/* harmony export */ });
/* harmony import */ var _data_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _scripts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);




//querySelectors:
// const errorMessage = document.querySelector('.error-message');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');
const usernameInput = document.getElementById('username');


//all of them have ids
const urls = [
    `http://localhost:3001/api/v1/travelers`, //get all travelers
    `http://localhost:3001/api/v1/trips`, //get all trips
    `http://localhost:3001/api/v1/destinations` //get all destinations
];

const fetchAllPromises = urls.map((url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error occurred:", error.message);
        });
});

const fetchSingleTravelerPromise = (singleTravelerUrl) => {
    return fetch(singleTravelerUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error occurred:", error.message);
        });
};

//fetchPost request
const fetchPosts = (newTrip) => {
    fetch ('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error (`${response.status}: Failed to fetch data`);
        }
        return response.json();
    })
    .then (newTrip => {
        //1.prevent that, use mock data, set up file and copy first 10... or 2.update local data (issue with that: mostly getting, no limits?)
        //get it to browser, have to do another fetch

        //external server - keep getting data, instead of storing it in local server/data, we'll learn about state. That replaces local..
        //state = 
        fetch('http://localhost:3001/api/v1/trips')
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`);
            }
            return response.json();
        })
        .then((data) => {
            const todaysDate = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.getTodaysDate)();
            const userID = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.getUserID)(usernameInput.value);
            const newTripsByID = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.getSpecificTravelerTrips)(data.trips,userID);
            const updatedTravelerUpcomingTrips = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.travelerUpcomingTrips)(newTripsByID, todaysDate);
            const pendingTrips = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.travelerPendingTrips)(newTripsByID);
    
            pendingTripsBox.innerHTML = "";
            upcomingTripsBox.innerHTML = "";
    
            (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayPendingTrips)(pendingTrips, _scripts_js__WEBPACK_IMPORTED_MODULE_2__.allDestinataionData);
            (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayUpcomingTrips)(updatedTravelerUpcomingTrips, _scripts_js__WEBPACK_IMPORTED_MODULE_2__.allDestinataionData);
            
            const totalCostForNewTrip = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.costForNewTrip)(newTrip.newTrip, _scripts_js__WEBPACK_IMPORTED_MODULE_2__.allDestinataionData);
            const totalCostWithFee = (0,_data_model_js__WEBPACK_IMPORTED_MODULE_0__.costWithFee)(totalCostForNewTrip);
    
            (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.displayNewTripCost)(newTrip.newTrip,totalCostWithFee, _scripts_js__WEBPACK_IMPORTED_MODULE_2__.allDestinataionData, _scripts_js__WEBPACK_IMPORTED_MODULE_2__.selectedDestinationID);
        })
    })
    .catch (error => {
        console.log(error.message);
    });
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserID": () => (/* binding */ getUserID),
/* harmony export */   "handleLogin": () => (/* binding */ handleLogin),
/* harmony export */   "getTodaysDate": () => (/* binding */ getTodaysDate),
/* harmony export */   "getSpecificTravelerTrips": () => (/* binding */ getSpecificTravelerTrips),
/* harmony export */   "travelerPastTrips": () => (/* binding */ travelerPastTrips),
/* harmony export */   "travelerUpcomingTrips": () => (/* binding */ travelerUpcomingTrips),
/* harmony export */   "travelerPendingTrips": () => (/* binding */ travelerPendingTrips),
/* harmony export */   "filterTripByYear": () => (/* binding */ filterTripByYear),
/* harmony export */   "getTotalCostPerYear": () => (/* binding */ getTotalCostPerYear),
/* harmony export */   "costWithFee": () => (/* binding */ costWithFee),
/* harmony export */   "calculateDuration": () => (/* binding */ calculateDuration),
/* harmony export */   "getDestinationID": () => (/* binding */ getDestinationID),
/* harmony export */   "costForNewTrip": () => (/* binding */ costForNewTrip)
/* harmony export */ });
const getUserID = (username) => {
   const pattern = /^traveler([1-9]|[1-4][0-9]|50)$/;
   if (pattern.test(username)) {
      let usernameParts = username.split(/(\d+)/).filter(Boolean);
      if (usernameParts.length === 2) {
         const id = usernameParts[1];
         if (id <= 50 && id >= 1) {
            const idInt = parseInt(id)
            return idInt;
         }
      } 
   } else {
      return 'Please enter a valid username';
   }
};

const handleLogin = (username, password, id) => {
   if (username === '' || password === '') {
      return 'Please provide both username and password.';
   } else if (username !== `traveler${id}` || password !== 'travel') {
      return 'Invalid username and/or password. Please enter correct username and password.';
   } else if (username === `traveler${id}` && password === 'travel') {
      return true;
   }
};

const getTodaysDate = () => {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const date = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}/${month}/${date}`;
   return formattedDate;
};

const getSpecificTravelerTrips = (trips, id) => {
   const filterTripByID = trips.filter((traveler) => parseInt(traveler.userID) === parseInt(id))
   return filterTripByID;
};

const travelerPastTrips = (filteredTrips, date) => {
   const pastTrips = filteredTrips.filter((trip) => {
      return new Date(trip.date) < new Date(date);
   });
   return pastTrips;
};

const travelerUpcomingTrips = (filteredTrips, date) => {
   const upcomingTrips = filteredTrips.filter((trip) => {
      return new Date(trip.date) >= new Date(date);;
   });
   return upcomingTrips;
};

const travelerPendingTrips = (filteredTrips) => {
   const pendingTrips = filteredTrips.filter((trip) => trip.status === 'pending');
   return pendingTrips;
};

const filterTripByYear = (filteredTrips, year) => {
   const filterTripsByChosenYear = filteredTrips.filter((trip) => (new Date(trip.date).getFullYear().toString()) === year);
   return filterTripsByChosenYear;
};

const getTotalCostPerYear = (filterTripsByChosenYear, destinationData) => {
   let costObject = {
      flightCostPerTrip: [],
      totalLodgingCost: []
   };

   destinationData.filter((destination) => {
      filterTripsByChosenYear.forEach((element) => {
         if (destination.id === element.destinationID) {
            costObject.flightCostPerTrip.push(destination.estimatedFlightCostPerPerson * element.travelers);
            costObject.totalLodgingCost.push(destination.estimatedLodgingCostPerDay * element.duration);
         }
      });
   });

   let totalCost = Object.keys(costObject).reduce((cost, value) => {
      costObject[value].forEach((price) => {
         cost += price;
      });
      return cost;
   }, 0);
   return totalCost;
};

const costWithFee = (cost) => {
   const costWithTenPercentFee = cost + (cost * 0.1);
   const roundedCost = costWithTenPercentFee.toFixed(2);
   return roundedCost;
};

function calculateDuration(startDateValue, endDateValue, startDateInput, endDateInput) {
   let startDate, endDate;

   if (startDateInput && endDateInput) {
      startDate = new Date(endDateInput);
      endDate = new Date(startDateInput);
   } else if (startDateValue && endDateValue) {
      startDate = new Date(startDateValue);
      endDate = new Date(endDateValue);
   }

   if (startDate && endDate) {
      if (startDate.toDateString() === endDate.toDateString()) {
         return 1;
      }
      const duration = Math.abs(endDate - startDate);
      const days = Math.ceil(duration / (1000 * 60 * 60 * 24));
      return days;
   }

   return 0;
}

const getDestinationID = (destinationData, userChosenDestination) => {
   const userChosenID = parseInt(userChosenDestination);
   const findID = destinationData.find((place) => {
      return place.id === userChosenID;
   });
   return findID.id;
};

const costForNewTrip = (newTripObject, destinationData) => {
   const tripInfo = destinationData.find((destination) => destination.id === newTripObject.destinationID);
   const costForTotalDays = newTripObject.duration * tripInfo.estimatedLodgingCostPerDay;
   const flightCostForEveryone = newTripObject.travelers * tripInfo.estimatedFlightCostPerPerson;
   const total = costForTotalDays + flightCostForEveryone;
   return total;
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayLoginErrorMessage": () => (/* binding */ displayLoginErrorMessage),
/* harmony export */   "loadDashboard": () => (/* binding */ loadDashboard),
/* harmony export */   "displayUserName": () => (/* binding */ displayUserName),
/* harmony export */   "displayPastTrips": () => (/* binding */ displayPastTrips),
/* harmony export */   "displayUpcomingTrips": () => (/* binding */ displayUpcomingTrips),
/* harmony export */   "displayPendingTrips": () => (/* binding */ displayPendingTrips),
/* harmony export */   "displayCostPerYear": () => (/* binding */ displayCostPerYear),
/* harmony export */   "displaySortedDestinations": () => (/* binding */ displaySortedDestinations),
/* harmony export */   "displayNewTripCost": () => (/* binding */ displayNewTripCost)
/* harmony export */ });
/* harmony import */ var _data_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
// import { handleLogin, getUserID } from './data-model';


//querySelectors:
const loginPage = document.querySelector('.login');
const dashboardPage = document.querySelector('.dashboard');
const loginErrorMessage = document.querySelector('.login-error-message');
const pastTripsBox = document.querySelector('.past-trips');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');
const totalCostStatement = document.querySelector('.total-cost-statement');
const helloUsername = document.querySelector('.hello-username');
const destinationDropdown = document.querySelector('.destination-dropdown');
const newTripCost = document.querySelector('.new-trip-cost');

//show login message errors
const displayLoginErrorMessage = (message) => {
  loginErrorMessage.classList.remove('hidden');
  loginErrorMessage.innerText = message;
};

//load dashboard
const loadDashboard = () => {
  loginPage.classList.add('hidden');
  dashboardPage.classList.remove('hidden');
};

const displayUserName = (singleTravelData) => {
  helloUsername.innerText = `Hello ${singleTravelData.name}!`;
};

const displayPastTrips = (pastTripsData, destinationData) => {
  pastTripsBox.innerHTML += pastTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID);
    if (matchingDestinationByID) {
      return `
        <section class="trip-box">
          <img tabindex="0" class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt} in ${matchingDestinationByID.destination}" />
          <h1 tabindex="0">Destination: ${matchingDestinationByID.destination}</h1>
          <h1 tabindex="0">Date: ${trip.date}</h1>
          <h1 tabindex="0">Duration: ${trip.duration}</h1>
          <h1 tabindex="0">Number of Travelers: ${trip.travelers}</h1>
          <h1 tabindex="0">Trip ID: ${trip.id}</h1>
        </section>
      `;
    };
  });
};

const displayUpcomingTrips = (upcomingTripsData, destinationData) => {
  upcomingTripsBox.innerHTML += upcomingTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID);
    if (matchingDestinationByID) {
      return `
        <section class="trip-box">
          <img tabindex="0" class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt} in ${matchingDestinationByID.destination}"/>
          <h1 tabindex="0">Destination: ${matchingDestinationByID.destination}</h1>
          <h1 tabindex="0">Date: ${trip.date}</h1>
          <h1 tabindex="0">Duration: ${trip.duration}</h1>
          <h1 tabindex="0">Number of Travelers: ${trip.travelers}</h1>
          <h1 tabindex="0">Trip ID: ${trip.id}</h1>
        </section>
      `;
    };
  });
};


const displayPendingTrips = (pendingTripsData, destinationData) => {
  pendingTripsBox.innerHTML += pendingTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID);
    if (matchingDestinationByID) {
      return `
        <section class="trip-box">
          <img tabindex="0" class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt} in ${matchingDestinationByID.destination}"/>
          <h1 tabindex="0">Destination: ${matchingDestinationByID.destination}</h1>
          <h1 tabindex="0">Date: ${trip.date}</h1>
          <h1 tabindex="0">Duration: ${trip.duration}</h1>
          <h1 tabindex="0">Number of Travelers: ${trip.travelers}</h1>
          <h1 tabindex="0">Trip ID: ${trip.id}</h1>
        </section>
      `;
    };
  });
};

const displayCostPerYear = (year, filteredTripData, costWithFee) => {
  console.log("year",year)
  console.log("fiteredTripByYear",_data_model__WEBPACK_IMPORTED_MODULE_0__.filterTripByYear)
  console.log("costWithFee",costWithFee)
  const filteredByYear = (0,_data_model__WEBPACK_IMPORTED_MODULE_0__.filterTripByYear)(filteredTripData, year);
  if (filteredByYear.length > 0) {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerHTML = `<h3 tabindex="0"><strong>${year} Total Cost </strong>: $${costWithFee}</h3>`;
  } else {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerText = `You did not book any trips in this ${year} through Venture Travel`;
  };
};

const displaySortedDestinations = (destinationsData) => {
  const sortedDestinations = destinationsData.sort((a, b) => {
    return a.destination.localeCompare(b.destination);
  });
  let optionsHTML = '<option disabled selected>Select Destination</option>';
  sortedDestinations.forEach(destination => {
    optionsHTML += `<option value="${destination.id}" tabindex="0">${destination.destination}</option>`;
  });
  destinationDropdown.innerHTML = optionsHTML;
};

const displayNewTripCost = (newTrip,totalCostWithFee, destinationData, selectedDestinationID) => {
  newTripCost.classList.remove('hidden');
  const matchingDestinationByID = destinationData.find((destination) => destination.id === selectedDestinationID);
  console.log("matchingDestinationByID,",matchingDestinationByID)
  if (matchingDestinationByID) {
    return newTripCost.innerHTML += `<h1 class="new-trip-statement"><strong>The estimated cost for ${newTrip.duration} days in ${matchingDestinationByID.destination} for ${newTrip.travelers} traveler/s is: </strong> $${totalCostWithFee} </h1>`;
  };
};

/***/ })
/******/ 	]);
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map