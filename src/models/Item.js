// src/models/Item.js

/**
 * Class representing an item from the Steam Market.
 * 
 * @class
 */
class Item {
	#name;
	#appId;
	#currencyId;
	#lowestPrice;
	#volume;
	#medianPrice;

	/**
	 * Create an Item.
	 * @param {string} name - The name of the item.
	 * @param {number} appId - The application ID the item belongs to.
	 * @param {number} [currencyId=1] - The currency ID of the item (default is 1).
	 */
	constructor(name, appId, currencyId = 1) {
		this.#setName(name);
		this.#setAppId(appId);
		this.#setCurrencyId(currencyId);
		this.setLowestPrice(null);
		this.setMedianPrice(null);
		this.setVolume(null);
	}

	/**
	 * Set the name of the item. (Private method)
	 * @param {string} name - The name of the item.
	 * @private
	 */
	#setName(name) {
		if (typeof name !== 'string' || name.trim() === '') {
			throw new Error('Invalid name: must be a non-empty string.');
		}

		this.#name = name;
	}

	/**
	 * Get the name of the item.
	 * @return {string} The name of the item.
	 */
	getName() {
		return this.#name;
	}

	/**
	 * Set the application ID of the item. (Private method)
	 * @param {number} appId - The application ID the item belongs to.
	 * @private
	 */
	#setAppId(appId) {
		if (!Number.isInteger(appId) || appId < 0) {
			throw new Error('Invalid appId: must be a non-negative integer.');
		}

		this.#appId = appId;
	}

	/**
	 * Get the name of the item.
	 * @return {string} The name of the item.
	 */
	getAppId() {
		return this.#appId;
	}

	/**
	 * Set the currency ID of the item. (Private method)
	 * @param {number} currencyId - The currency ID of the item.
	 * @private
	 */
	#setCurrencyId(currencyId) {
		if (!Number.isInteger(currencyId) || currencyId <= 0) {
			throw new Error('Invalid currencyId: must be a positive integer.');
		}

		this.#currencyId = currencyId;
	}

	/**
	 * Get the currency ID of the item.
	 * @return {number} The currency ID of the item.
	 */
	getCurrencyId() {
		return this.#currencyId;
	}

	/**
	 * Set the lowest price of the item.
	 * @param {string|null} lowestPrice - The lowest price of the item or null.
	 */
	setLowestPrice(lowestPrice) {
		if (lowestPrice !== null && (typeof lowestPrice !== 'string' || lowestPrice.trim() === '')) {
			throw new Error('Invalid lowest price: must be a non-empty string or null.');
		}

		this.#lowestPrice = lowestPrice;
	}

	/**
	 * Get the lowest price of the item.
	 * @return {string|null} The lowest price of the item, or null if not set.
	 */
	getLowestPrice() {
		return this.#lowestPrice;
	}

	/**
	 * Set the median price of the item.
	 * @param {string|null} medianPrice - The median price of the item or null.
	 */
	setMedianPrice(medianPrice) {
		if (medianPrice !== null && (typeof medianPrice !== 'string' || medianPrice.trim() === '')) {
			throw new Error('Invalid median price: must be a non-empty string or null.');
		}

		this.#medianPrice = medianPrice;
	}

	/**
	 * Get the median price of the item.
	 * @return {string|null} The median price of the item, or null if not set.
	 */
	getMedianPrice() {
		return this.#medianPrice;
	}

	/**
	 * Set the volume of the item.
	 * @param {number|null} volume - The volume of the item or null.
	 */
	setVolume(volume) {
		if (volume !== null && (!Number.isInteger(volume) || volume < 0)) {
			throw new Error('Invalid volume: must be a non-negative integer or null.');
		}

		this.#volume = volume;
	}

	/**
	 * Get the volume of the item.
	 * @return {number|null} The volume of the item, or null if not set.
	 */
	getVolume() {
		return this.#volume;
	}

	/**
	 * Get a string representation of the item.
	 * @return {string} A string representation of the item.
	 */
	toString() {
		return `Item { name: ${this.#name}, appId: ${this.#appId}, currencyId: ${this.#currencyId}, lowestPrice: ${this.#lowestPrice}, medianPrice: ${this.#medianPrice}, volume: ${this.#volume} }`;
	}

	/**
	 * Compare this item to another item for equality.
	 * @param {Item} otherItem - The other item to compare to.
	 * @return {boolean} True if the items are equal, false otherwise.
	 */
	equals(otherItem) {
		if (!(otherItem instanceof Item)) {
			return false;
		}

		return this.#name === otherItem.getName() &&
			   this.#appId === otherItem.getAppId() &&
			   this.#currencyId === otherItem.getCurrencyId() &&
			   this.#lowestPrice === otherItem.getLowestPrice() &&
			   this.#medianPrice === otherItem.getMedianPrice() &&
			   this.#volume === otherItem.getVolume();
	}
}

module.exports = Item;
