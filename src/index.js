// src/index.js

const { getItemsInfo } = require('./utils/steam');
const { readItemsFromFile, saveItemsToFile, printItems } = require('./utils/io');
const Item = require('./models/Item');

module.exports = {
	readItemsFromFile,
	saveItemsToFile,
	getItemsInfo,
	printItems,
	Item
};
