import { isNil } from "lodash";

export function placeActiveOrder(data) {
	let required = {
		side: "string",
		symbol: "string",
		order_type: "string",
		qty: "number",
		price: typeof data["price"] == "string" ? "string" : "number",
		time_in_force: "string"
	};
	let optional = {
		take_profit: "number",
		stop_loss: "number",
		reduce_only: "boolean",
		close_on_trigger: "boolean",
		order_link_id: "string"
	};
	return validateOptional(optional, data) && validateRequired(required, data);
}

export function getActiveOrders(data) {
	let optional = {
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

export function cancelActiveOrder(data) {
	let required = {
		order_id: "string"
	};

	let optional = {
		symbol: "string"
	};
	return validateOptional(optional, data) && validateRequired(required, data);
}

export function placeConditionalOrder(data) {
	let required = {
		side: "string",
		symbol: "string",
		order_type: "string",
		qty: "number",
		price: typeof data["price"] == "string" ? "string" : "number",
		base_price: "number",
		stop_px: "number",
		time_in_force: "string"
	};
	let optional = {
		close_on_trigger: "boolean",
		order_link_id: "string"
	};
	return validateOptional(optional, data) && validateRequired(required, data);
}

export function getConditionalOrders(data) {
	let optional = {
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

export function cancelConditionalOrder(data) {
	let required = {
		stop_order_id: "string"
	};
	return validateRequired(required, data);
}

export function getLeverage(data) {
	return isNil(data) ? true : false;
}

export function updateLeverage(data) {
	let required = {
		symbol: "string",
		leverage: "string"
	};
	return validateRequired(required, data);
}

export function getPositions(data) {
	return isNil(data) ? true : false;
}

export function updatePositionMargin(data) {
	let required = {
		symbol: "string",
		margin: "string"
	};
	return validateRequired(required, data);
}

export function getFundingRate(data) {
	let required = {
		symbol: "string"
	};
	return validateRequired(required, data);
}

export function getPrevFundingRate(data) {
	let required = {
		symbol: "string"
	};
	return validateRequired(required, data);
}

export function getNextFundingRate(data) {
	let required = {
		symbol: "string"
	};
	return validateRequired(required, data);
}

export function getOrderInfo(data) {
	let required = {
		order_id: "string"
	};
	return validateRequired(required, data);
}

function validateRequired(required, data) {
	if (!isNil(data)) {
		for (const property in required) {
			if (property in data && typeof data[property] == required[property]) {
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
	if (!isNil(data)) {
		for (const property in optional) {
			if (property in data && typeof data[property] != optional[property]) {
				return false;
			} else {
				continue;
			}
		}
	}
	return true;
}
