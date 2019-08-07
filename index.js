import Static from "./static";
import Websocket from "./websocket";
import Crypto from "crypto";

export default class Exchange {
	constructor(key, secret, mainnet = false) {
		this.apiKey = key;
		this.apiSecret = secret;
		this.mainNet = mainnet;
	}
}
