// src/utils/steam.js

const axios = require('axios');
const Item = require('../models/Item');

/**
 * Searches for an item on the Steam Market and fills the item with the retrieved data.
 * This function is private and should not be exposed directly.
 * 
 * @param {Item} item - The item to search for.
 * @return {Promise<void>} A promise that resolves when the item is updated.
 * 
 * The function performs the following steps:
 * 1. Constructs the URL and query parameters for the Steam Market API request.
 * 2. Sends a GET request to the Steam Market API using Axios.
 * 3. Parses the response and updates the item's lowest price, median price, and volume if the request is successful.
 */
async function searchItem(item) {
	const url = 'http://steamcommunity.com/market/priceoverview'; // Base URL for Steam Market API

	// Construct query parameters
	const params = {
		currency: item.getCurrencyId(),
		appid: item.getAppId(),
		market_hash_name: item.getName()
	};

	try {
		// Send GET request to the Steam Market API
		const response = await axios.get(url, { params });
		const data = response.data;

		if (data.success) {
			// Update the item's properties if the API request is successful
			item.setLowestPrice(data.lowest_price || null);
			item.setMedianPrice(data.median_price || null);
			item.setVolume(data.volume ? parseInt(data.volume) : null);
		}
	}
	catch (error) {
		// Silently ignore any errors
	}
}

/**
 * Retrieves information for an item or a list of items from the Steam Market.
 * 
 * @param {Item|Item[]} items - The item or list of items to retrieve information for.
 * @return {Promise<void>} A promise that resolves when all items are updated.
 * 
 * The function performs the following steps:
 * 1. Ensures the input is an array of items.
 * 2. Creates a list of promises to update each item using the `searchItem` function.
 * 3. Waits for all promises to resolve, indicating that all items have been updated.
 */
async function getItemsInfo(items) {
	// Ensure the input is an array of items
	const itemsArray = Array.isArray(items) ? items : [items];

	// Create a list of promises to update each item
	const promises = itemsArray.map(item => searchItem(item));

	// Wait for all promises to resolve
	await Promise.all(promises);
}

module.exports = { 
	getItemsInfo 
};
