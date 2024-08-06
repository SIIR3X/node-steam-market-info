const market = require('steam-market-info');

/**
 * Example 1: Create items manually, update their information, and print them.
 */
async function example1() {
	// Manually create a list of items
	const items = [
		new market.Item('MP9 | Storm (Minimal Wear)', 730),
		new market.Item('AK-47 | Redline (Field-Tested)', 730)
	];

	// Update items' information from the Steam Market
	await market.getItemsInfo(items);
	
	// Print updated items to the console
	market.printItems(items);
}

/**
 * Example 2: Read items from a file, update their information and save them to a new file.
 */
async function example2() {
	// Read items from the input file
	const items = await market.readItemsFromFile('examples/input.txt');
	
	// Update items' information from the Steam Market
	await market.getItemsInfo(items);
	
	// Save updated items to the output file
	await market.saveItemsToFile('examples/output.txt', items);
}

// Execute the example functions
(async () => {
	await example1();
	await example2();
})();
