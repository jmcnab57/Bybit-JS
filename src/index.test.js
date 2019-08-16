import Exchange from "./index.js";
let key = process.env.BYBIT_KEY || null;
let secret = process.env.BYBIT_SECRET || null;

if (key == null || secret == null) {
	console.log("Null BYBIT_KEY or BYBIT_SECRET environment variable.");
	process.exit(1);
}

let ByBit = new Exchange(key, secret);

let id = null;

test("Test Place Active Order", () => {
	return ByBit.placeActiveOrder({
		side: "Sell",
		symbol: "BTCUSD",
		order_type: "Limit",
		qty: 5000,
		price: 100000.0,
		time_in_force: "GoodTillCancel"
	}).then((result) => {
		id = result.result.order_id;
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Active Orders", () => {
	return ByBit.getActiveOrders({ symbol: "BTCUSD" }).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Cancel Active Order", () => {
	return ByBit.cancelActiveOrder({
		order_id: id
	}).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Place Conditional Order", () => {
	return ByBit.placeConditionalOrder({
		side: "Sell",
		symbol: "BTCUSD",
		order_type: "Limit",
		qty: 10000,
		price: 20000,
		base_price: 9975.5,
		stop_px: 19980,
		time_in_force: "GoodTillCancel"
	}).then((result) => {
		id = result.result.stop_order_id;
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Conditional Orders", () => {
	return ByBit.getConditionalOrders().then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Cancel Conditional Order", () => {
	return ByBit.cancelConditionalOrder({
		stop_order_id: id
	}).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Leverage", () => {
	return ByBit.getLeverage().then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Update Leverage", () => {
	return ByBit.updateLeverage({
		symbol: "ETHUSD",
		leverage: `${Math.random() * (100 - 1) + 1}`
	}).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Positions", () => {
	return ByBit.getPositions().then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Update Position Margin", () => {
	return ByBit.updatePositionMargin({
		symbol: "BTCUSD",
		margin: "0.03"
	}).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Funding Rate", () => {
	return ByBit.getFundingRate({ symbol: "BTCUSD" }).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});
test("Test Get Prev Funding Rate", () => {
	return ByBit.getPrevFundingRate({ symbol: "BTCUSD" }).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Next Funding Rate", () => {
	return ByBit.getNextFundingRate({ symbol: "BTCUSD" }).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Order Info", () => {
	return ByBit.getOrderInfo({ order_id: "d854bb13-3fb9-4608-ade4-828f50210778" }).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Symbols", () => {
	return ByBit.getSymbols().then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});

test("Test Get Kline", () => {
	return ByBit.getKline({ symbol: "ETHUSD", interval: "1", from: 1, limit: 200 }).then((result) => {
		expect(result["ret_code"]).toBe(0);
	});
});
