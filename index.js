import * as Validate from "./validateData.js";
import axios from "axios";
import Websocket from "./websocket";
import { createHash } from "crypto";

const Errors = {
	invalidField: new Error("Invalid Request Paramater")
};

export default class ByBit {
	constructor(key, secret, mainnet = false, timeout = 5000) {
		this.apiKey = key;
		this.apiSecret = secret;
		this.url = mainnet ? "https://api.bybit.com" : "https://api-testnet.bybit.com";
		this.axios = axios.create({
			baseURL: this.url,
			timeout: timeout,
			headers: {
				"Content-Type": "application/json"
			}
		});
		this.websocket = null;
	}

	//Returns a HEX HMAC_SHA256 of the message
	_signMessage(message) {
		return Crypto.createHmac("sha256", this.apiSecret)
			.update(message)
			.digest("hex");
	}

	// Calls functions to validate data, create message string, sign message and then submits/waits for response from ByBit API.
	_handleRequest(data, url) {
		return new Promise((resolve, reject) => {
			let message = this._createMessage(data);
			let signed = this._signMessage(message);
			let parameters = { ...data, sign: signed };
			this.axios
				.get(url, { params: parameters })
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(this._handleRequestError(error));
				});
		});
	}

	_handleRequestError(error) {
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

	_createMessage(data) {
		return Object.keys(data)
			.map((key) => key + "=" + data[key])
			.sort()
			.join("&");
	}

	placeActiveOrder(data) {
		return new Promise((resolve, reject) => {
			if (Validate.placeActiveOrder(data)) {
				this._handleRequest(data, "/open-api/order/create")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getActiveOrders() {
		return new Promise((resolve, reject) => {
			if (Validate.getActiveOrders(data)) {
				this._handleRequest(data, "/open-api/order/list")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	cancelActiveOrder() {
		return new Promise((resolve, reject) => {
			if (Validate.cancelActiveOrder(data)) {
				this._handleRequest(data, "/open-api/order/cancel")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	placeConditionalOrder() {
		return new Promise((resolve, reject) => {
			if (Validate.placeConditionalOrder(data)) {
				this._handleRequest(data, "/open-api/stop-order/create")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getConditionalOrders() {
		return new Promise((resolve, reject) => {
			if (Validate.getConditionalOrders(data)) {
				this._handleRequest(data, "/open-api/stop-order/list")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	cancelConditionalOrder() {
		return new Promise((resolve, reject) => {
			if (Validate.cancelConditionalOrder(data)) {
				this._handleRequest(data, "/open-api/stop-order/cancel")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getLeverage() {
		return new Promise((resolve, reject) => {
			this._handleRequest(data, "/user/leverage")
				.then(resolve)
				.catch(reject);
		});
	}

	updateLeverage() {
		return new Promise((resolve, reject) => {
			if (Validate.updateLeverage(data)) {
				this._handleRequest(data, "/user/leverage/save")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getPositions() {
		return new Promise((resolve, reject) => {
			this._handleRequest(data, "/position/list")
				.then(resolve)
				.catch(reject);
		});
	}

	updatePositionMargin() {
		return new Promise((resolve, reject) => {
			if (Validate.updatePositionMargin(data)) {
				this._handleRequest(data, "/position/change-position-margin")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getFundingRate() {
		return new Promise((resolve, reject) => {
			if (Validate.getFundingRate(data)) {
				this._handleRequest(data, "/open-api/funding/prev-funding-rate")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getPrevFundingRate() {
		return new Promise((resolve, reject) => {
			if (Validate.getPrevFundingRate(data)) {
				this._handleRequest(data, "/open-api/funding/prev-funding")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getNextFundingRate() {
		return new Promise((resolve, reject) => {
			if (Validate.getNextFundingRate(data)) {
				this._handleRequest(data, "/open-api/funding/predicted-funding")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}

	getOrderInfo() {
		return new Promise((resolve, reject) => {
			if (Validate.getOrderInfo(data)) {
				this._handleRequest(data, "/v2/private/execution/list")
					.then(resolve)
					.catch(reject);
			} else {
				reject(Errors.invalidField);
			}
		});
	}
}
