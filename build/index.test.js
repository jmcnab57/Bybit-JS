"use strict";

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var key = process.env.BYBIT_KEY || null;
var secret = process.env.BYBIT_SECRET || null;

if (key == null || secret == null) {
  console.log("Null BYBIT_KEY or BYBIT_SECRET environment variable.");
  process.exit(1);
}

var ByBit = new _index["default"](key, secret);
var id = null;
test("Test Place Active Order", function () {
  return ByBit.placeActiveOrder({
    side: "Sell",
    symbol: "BTCUSD",
    order_type: "Limit",
    qty: 5000,
    price: 100000.0,
    time_in_force: "GoodTillCancel"
  }).then(function (result) {
    id = result.result.order_id;
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Active Orders", function () {
  return ByBit.getActiveOrders({
    symbol: "BTCUSD"
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Cancel Active Order", function () {
  return ByBit.cancelActiveOrder({
    order_id: id
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Place Conditional Order", function () {
  return ByBit.placeConditionalOrder({
    side: "Sell",
    symbol: "BTCUSD",
    order_type: "Limit",
    qty: 10000,
    price: 20000,
    base_price: 9975.5,
    stop_px: 19980,
    time_in_force: "GoodTillCancel"
  }).then(function (result) {
    id = result.result.stop_order_id;
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Conditional Orders", function () {
  return ByBit.getConditionalOrders().then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Cancel Conditional Order", function () {
  return ByBit.cancelConditionalOrder({
    stop_order_id: id
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Leverage", function () {
  return ByBit.getLeverage().then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Update Leverage", function () {
  return ByBit.updateLeverage({
    symbol: "ETHUSD",
    leverage: "".concat(Math.random() * (100 - 1) + 1)
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Positions", function () {
  return ByBit.getPositions().then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Update Position Margin", function () {
  return ByBit.updatePositionMargin({
    symbol: "BTCUSD",
    margin: "0.03"
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Funding Rate", function () {
  return ByBit.getFundingRate({
    symbol: "BTCUSD"
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Prev Funding Rate", function () {
  return ByBit.getPrevFundingRate({
    symbol: "BTCUSD"
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Next Funding Rate", function () {
  return ByBit.getNextFundingRate({
    symbol: "BTCUSD"
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Order Info", function () {
  return ByBit.getOrderInfo({
    order_id: "d854bb13-3fb9-4608-ade4-828f50210778"
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Symbols", function () {
  return ByBit.getSymbols().then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});
test("Test Get Kline", function () {
  return ByBit.getKline({
    symbol: "ETHUSD",
    interval: "1",
    from: 1,
    limit: 200
  }).then(function (result) {
    expect(result["ret_code"]).toBe(0);
  });
});