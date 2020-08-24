"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Validate = _interopRequireWildcard(require("./validateData.js"));

var _axios = _interopRequireDefault(require("axios"));

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WebSocket = require('ws');

var Errors = {
  invalidField: new Error("Invalid Request Paramater")
};

var ByBit = /*#__PURE__*/function () {
  function ByBit(key, secret) {
    var mainnet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;

    _classCallCheck(this, ByBit);

    this.apiKey = key;
    this.apiSecret = secret;
    this.restUrl = mainnet ? "https://api.bybit.com" : "https://api-testnet.bybit.com";
    this.socketUrl = mainnet ? "wss://stream.bybit.com/realtime" : "wss://stream-testnet.bybit.com/realtime";
    this.axios = _axios["default"].create({
      baseURL: this.restUrl,
      timeout: timeout,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.subscriptions = {};

    this._initWebsocket(); // TODO this.websocket.onclose

  }

  _createClass(ByBit, [{
    key: "_initWebsocket",
    value: function _initWebsocket() {
      var expires = new Date().getTime() + 10000;

      var signature = this._signMessage('GET/realtime' + expires);

      var param = "api_key=".concat(this.apiKey, "&expires=").concat(expires, "&signature=").concat(signature);
      this.websocket = new WebSocket("".concat(this.socketUrl, "?").concat(param));

      this.websocket.onmessage = function (msg) {
        this._handleWebsocketMsg(msg);
      }.bind(this);

      this.websocket.onerror = function (msg) {
        console.log("Websocket Error", msg);
      };
    }
  }, {
    key: "_handleWebsocketMsg",
    value: function _handleWebsocketMsg(msg) {
      var data = JSON.parse(msg.data);

      if (data.success == false) {
        console.log("WS ERROR", msg.data);
        return false;
      }

      if ('request' in data) {// let req = data.request;
        // if ('op' in req && 'args' in req)  {
        //     console.log("> Subscribed to", req.args[0])
        // }
      } else if ('topic' in data) {
        var topic = this.subscriptions[data.topic]; //.split('.')[0]];

        for (var key in topic) {
          topic[key](data.data);
        }
      } else {
        console.log(data);
      }
    } //Returns a HEX HMAC_SHA256 of the message

  }, {
    key: "_signMessage",
    value: function _signMessage(message) {
      return (0, _crypto.createHmac)("sha256", this.apiSecret).update(message).digest("hex");
    } // Calls functions to validate data, create message string, sign message and then submits/waits for response from ByBit API.

  }, {
    key: "_handleRequest",
    value: function _handleRequest() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = arguments.length > 1 ? arguments[1] : undefined;
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "get";
      return new Promise(function (resolve, reject) {
        var timestamp = Date.now();

        var message = _this._createMessage(_objectSpread({}, data, {
          api_key: _this.apiKey,
          timestamp: timestamp
        }));

        var signed = _this._signMessage(message);

        var ordered = _this._sortObj(data);

        var parameters = _objectSpread({
          api_key: _this.apiKey
        }, ordered, {
          timestamp: timestamp,
          sign: signed
        });

        _this.axios({
          method: type,
          url: url,
          params: parameters
        }).then(function (response) {
          resolve(response.data);
        })["catch"](function (error) {
          reject(_this._handleRequestError(error));
        });
      });
    }
  }, {
    key: "_sortObj",
    value: function _sortObj(data) {
      var ordered = {};
      Object.keys(data).sort().forEach(function (key) {
        ordered[key] = data[key];
      });
      return ordered;
    }
  }, {
    key: "_handleRequestError",
    value: function _handleRequestError(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }

      return error;
    }
  }, {
    key: "_createMessage",
    value: function _createMessage(data) {
      return Object.keys(data).map(function (key) {
        return key + "=" + data[key];
      }).sort().join("&");
    }
  }, {
    key: "subscribeTo",
    value: function subscribeTo(args, callback) {
      var key = new Date().getTime();

      if (args in this.subscriptions) {
        this.subscriptions[args][key] = callback;
      } else {
        var subscr = {};
        subscr[key] = callback;
        this.subscriptions[args] = subscr;
        this.websocket.send("{\"op\":\"subscribe\",\"args\":[\"".concat(args, "\"]}"));
      }

      return key;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(args, id) {
      delete this.subscriptions[args][id];
    }
  }, {
    key: "placeActiveOrder",
    value: function placeActiveOrder(data) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.placeActiveOrder(data)) {
          _this2._handleRequest(data, "/open-api/order/create", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getActiveOrders",
    value: function getActiveOrders(data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getActiveOrders(data)) {
          _this3._handleRequest(data, "/open-api/order/list").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "cancelActiveOrder",
    value: function cancelActiveOrder(data) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.cancelActiveOrder(data)) {
          _this4._handleRequest(data, "/open-api/order/cancel", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "placeConditionalOrder",
    value: function placeConditionalOrder(data) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.placeConditionalOrder(data)) {
          _this5._handleRequest(data, "/open-api/stop-order/create", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getConditionalOrders",
    value: function getConditionalOrders(data) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getConditionalOrders(data)) {
          _this6._handleRequest(data, "/open-api/stop-order/list").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "cancelConditionalOrder",
    value: function cancelConditionalOrder(data) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.cancelConditionalOrder(data)) {
          _this7._handleRequest(data, "/open-api/stop-order/cancel", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "cancelConditionalOrdersAll",
    value: function cancelConditionalOrdersAll(data) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.cancelConditionalOrdersAll(data)) {
          _this8._handleRequest(data, "/v2/private/stop-order/cancelAll", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getLeverage",
    value: function getLeverage(data) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getLeverage(data)) {
          _this9._handleRequest(data, "/user/leverage").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "updateLeverage",
    value: function updateLeverage(data) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.updateLeverage(data)) {
          _this10._handleRequest(data, "/user/leverage/save", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getPositions",
    value: function getPositions(data) {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getLeverage(data)) {
          _this11._handleRequest(data, "/position/list").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "updatePositionMargin",
    value: function updatePositionMargin(data) {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.updatePositionMargin(data)) {
          _this12._handleRequest(data, "/position/change-position-margin", "post").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "setTradingStop",
    value: function setTradingStop(data) {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.setTradingStop(data)) {
          _this13._handleRequest(data, "/open-api/position/trading-stop").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getFundingRate",
    value: function getFundingRate(data) {
      var _this14 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getFundingRate(data)) {
          _this14._handleRequest(data, "/open-api/funding/prev-funding-rate").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getPrevFundingRate",
    value: function getPrevFundingRate(data) {
      var _this15 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getPrevFundingRate(data)) {
          _this15._handleRequest(data, "/open-api/funding/prev-funding").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getNextFundingRate",
    value: function getNextFundingRate(data) {
      var _this16 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getNextFundingRate(data)) {
          _this16._handleRequest(data, "/open-api/funding/predicted-funding").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getOrderInfo",
    value: function getOrderInfo(data) {
      var _this17 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getOrderInfo(data)) {
          _this17._handleRequest(data, "/v2/private/execution/list").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getSymbols",
    value: function getSymbols(data) {
      var _this18 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getSymbols(data)) {
          _this18._handleRequest(data, "v2/public/symbols").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getKline",
    value: function getKline(data) {
      var _this19 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getKline(data)) {
          _this19._handleRequest(data, "v2/public/kline/list").then(resolve)["catch"](reject);
        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getTickers",
    value: function getTickers(data) {
      var _this20 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getTickers(data)) {
          _this20._handleRequest({}, "v2/public/tickers").then(resolve)["catch"](reject); //r => {return r.find(d => d.symbol === symbol)}

        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }, {
    key: "getOrderbook",
    value: function getOrderbook(data) {
      var _this21 = this;

      return new Promise(function (resolve, reject) {
        if (Validate.getOrderbook(data)) {
          _this21._handleRequest(data, "v2/public/orderBook/L2").then(resolve)["catch"](reject); //r => {return r.find(d => d.symbol === symbol)}

        } else {
          reject(Errors.invalidField);
        }
      });
    }
  }]);

  return ByBit;
}();

exports["default"] = ByBit;