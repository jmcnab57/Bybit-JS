"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placeActiveOrder = placeActiveOrder;
exports.getActiveOrders = getActiveOrders;
exports.cancelActiveOrder = cancelActiveOrder;
exports.placeConditionalOrder = placeConditionalOrder;
exports.getConditionalOrders = getConditionalOrders;
exports.cancelConditionalOrder = cancelConditionalOrder;
exports.cancelConditionalOrdersAll = cancelConditionalOrdersAll;
exports.setTradingStop = setTradingStop;
exports.getLeverage = getLeverage;
exports.updateLeverage = updateLeverage;
exports.getPositions = getPositions;
exports.updatePositionMargin = updatePositionMargin;
exports.getFundingRate = getFundingRate;
exports.getPrevFundingRate = getPrevFundingRate;
exports.getNextFundingRate = getNextFundingRate;
exports.getTradeRecords = getTradeRecords;
exports.getPL = getPL;
exports.getOrderInfo = getOrderInfo;
exports.getSymbols = getSymbols;
exports.getWalletRecords = getWalletRecords;
exports.getKline = getKline;
exports.getTickers = getTickers;
exports.getOrderbook = getOrderbook;

var _lodash = require("lodash");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function placeActiveOrder(data) {
  var required = {
    side: "string",
    symbol: "string",
    order_type: "string",
    qty: "number",
    price: typeof data["price"] == "string" ? "string" : "number",
    time_in_force: "string"
  };
  var optional = {
    take_profit: "number",
    stop_loss: "number",
    reduce_only: "boolean",
    close_on_trigger: "boolean",
    order_link_id: "string"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function getActiveOrders(data) {
  var optional = {
    order_id: "string",
    order_link_id: "string",
    symbol: "string",
    sort: "string",
    order: "string",
    page: "number",
    limit: "number",
    order_status: "string"
  };
  return validateOptional(optional, data);
}

function cancelActiveOrder(data) {
  var required = {
    order_id: "string"
  };
  var optional = {
    symbol: "string"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function placeConditionalOrder(data) {
  var required = {
    side: "string",
    symbol: "string",
    order_type: "string",
    qty: "number",
    price: typeof data["price"] == "string" ? "string" : "number",
    base_price: "number",
    stop_px: "number",
    time_in_force: "string"
  };
  var optional = {
    close_on_trigger: "boolean",
    order_link_id: "string"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function getConditionalOrders(data) {
  var optional = {
    stop_order_id: "string",
    order_link_id: "string",
    symbol: "string",
    sort: "string",
    order: "string",
    page: "number",
    limit: "number"
  };
  return validateOptional(optional, data);
}

function cancelConditionalOrder(data) {
  var required = {
    symbol: "string"
  };
  var optional = {
    stop_order_id: "string",
    order_link_id: "string"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function cancelConditionalOrdersAll(data) {
  var required = {
    symbol: "string"
  };
  return validateRequired(required, data);
}

function setTradingStop(data) {
  var required = {
    symbol: "string"
  };
  var optional = {
    take_profit: "number",
    stop_loss: "number",
    trailing_stop: "number",
    new_trailing_active: "number"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function getLeverage(data) {
  return (0, _lodash.isNil)(data) ? true : false;
}

function updateLeverage(data) {
  var required = {
    symbol: "string",
    leverage: "string"
  };
  return validateRequired(required, data);
}

function getPositions(data) {
  return (0, _lodash.isNil)(data) ? true : false;
}

function updatePositionMargin(data) {
  var required = {
    symbol: "string",
    margin: "string"
  };
  return validateRequired(required, data);
}

function getFundingRate(data) {
  var required = {
    symbol: "string"
  };
  return validateRequired(required, data);
}

function getPrevFundingRate(data) {
  var required = {
    symbol: "string"
  };
  return validateRequired(required, data);
}

function getNextFundingRate(data) {
  var required = {
    symbol: "string"
  };
  return validateRequired(required, data);
}

function getTradeRecords(data) {
  var required = {
    symbol: "string"
  };
  var optional = {
    order_id: "string",
    start_time: "number",
    page: "number",
    limit: "number",
    order: "string"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function getPL(data) {
  var required = {
    symbol: "string"
  };
  var optional = {
    start_time: "number",
    end_time: "number",
    exec_type: "string",
    //Trade, AdlTradel, Funding, BustTrade
    page: "number",
    limit: "number"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function getOrderInfo(data) {
  var required = {
    order_id: "string"
  };
  return validateRequired(required, data);
}

function getSymbols(data) {
  return (0, _lodash.isNil)(data) ? true : false;
}

function getWalletRecords(data) {
  var optional = {
    start_date: "string",
    end_date: "string",
    currency: "string",
    coin: "string",
    wallet_fund_type: "string",
    page: "string",
    limit: "number"
  };
  return validateOptional(optional, data);
}

function getKline(data) {
  var required = {
    symbol: "string",
    interval: "string",
    from: "number"
  };
  var optional = {
    limit: "number"
  };
  return validateOptional(optional, data) && validateRequired(required, data);
}

function getTickers(data) {
  return (0, _lodash.isNil)(data) ? true : false;
}

function getOrderbook(data) {
  var required = {
    symbol: "string"
  };
  return validateRequired(required, data);
}

function validateRequired(required, data) {
  if (!(0, _lodash.isNil)(data)) {
    for (var property in required) {
      if (property in data && _typeof(data[property]) == required[property]) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  }

  return false;
}

function validateOptional(optional, data) {
  if (!(0, _lodash.isNil)(data)) {
    for (var property in optional) {
      if (property in data && _typeof(data[property]) != optional[property]) {
        return false;
      } else {
        continue;
      }
    }
  }

  return true;
}