// src/utils.io.js

const fs = require('fs');
const Item = require('../models/Item');

/**
 * Reads a file and creates an array of Item instances.
 * The input file should follow the convention:
 * 
 * "name" appId [currencyId]
 *
 * Each line represents an item with its name (in quotes), corresponding appId, and an optional currency ID separated by spaces.
 * If the currency ID is not provided, it defaults to 1.
 * 
 * @param {string} filePath - The path to the file.
 * @return {Promise<Item[]>} A promise that resolves to an array of Item instances.
 */
function readItemsFromFile(filePath) {
	return new Promise((resolve, reject) => {
		// Read the file asynchronously
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				// If there's an error reading the file, reject the promise with the error
				return reject(err);
			}

			const items = [];
			const lines = data.split('\n'); // Split the file content by new lines

			for (const line of lines) {
				if (line.trim() === '') continue; // Skip empty lines

				// Match the line with the format "name" appId [currencyId]
				const match = line.match(/"(.+)" (\d+)(?: (\d+))?/);

				if (!match) {
					// If the line doesn't match the expected format, reject the promise
					return reject(new Error(`Invalid file format: ${line}`));
				}

				const name = match[1];
				const appId = parseInt(match[2]);
				const currencyId = match[3] ? parseInt(match[3]) : 1; // Default to 1 if currencyId is not provided

				// Create a new Item instance and add it to the items array
				const item = new Item(name, appId, currencyId);
				items.push(item);
			}

			// Resolve the promise with the array of items
			resolve(items);
		});
	});
}

/**
 * Saves an item or a list of items to a file.
 * The output file should follow the convention:
 * 
 * name | lowestPrice | medianPrice | volume
 *
 * Each item is saved on a new line with its name, lowest price, median price, and volume separated by pipes (|).
 * If a value is not provided, it defaults to an empty string.
 * 
 * @param {string} filePath - The path to the file.
 * @param {Item|Item[]} items - The item or list of items to save.
 * @return {Promise<void>} A promise that resolves when the file has been written.
 */
function saveItemsToFile(filePath, items) {
	return new Promise((resolve, reject) => {
		const itemsArray = Array.isArray(items) ? items : [items]; // Ensure items is an array

		// Convert each item to a string in the format "name | lowestPrice | medianPrice | volume"
		const data = itemsArray.map(item => {
			const name = item.getName();
			const lowestPrice = item.getLowestPrice() || '';
			const medianPrice = item.getMedianPrice() || '';
			const volume = item.getVolume() !== null ? item.getVolume().toString() : '';

			return `"${name}" | ${lowestPrice} | ${medianPrice} | ${volume}`;
		}).join('\n');

		// Write the data to the file in UTF-8 encoding
		fs.writeFile(filePath, data, 'utf8', (err) => {
			if (err) {
				// If there's an error writing the file, reject the promise with the error
				return reject(err);
			}
			
			// Resolve the promise
			resolve();
		});
	});
}

/**
 * Prints the string representation of the given items.
 * 
 * @param {Item|Item[]} items - The items to be printed. Can be a single item or an array of items.
 * 
 * The function performs the following steps:
 * 1. Ensures that `items` is an array. If `items` is not an array, it wraps it in an array.
 * 2. Iterates over the array of items.
 * 3. Prints the string representation of each item to the console.
 */
function printItems(items) {
	// Ensure items is an array
	const itemsArray = Array.isArray(items) ? items : [items];

	// Iterate over the array of items
	for (const item of itemsArray) {
		// Print the string representation of each item to the console
		console.log(item.toString());
	}
}

module.exports = { 
	readItemsFromFile,
	saveItemsToFile,
	printItems 
};
