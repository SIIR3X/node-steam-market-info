// test/io.test.js

const fs = require('fs');
const { readItemsFromFile, saveItemsToFile, printItems } = require('../src/utils/io');
const Item = require('../src/models/Item');

// Mock the fs.readFile and fs.writeFile functions
jest.mock('fs');

// Mock the console.log function
console.log = jest.fn();

describe('IO Utils', () => {
	describe('readItemsFromFile', () => {
		test('should read a file and create an array of Item instances', async () => {
			const fileContent = '"Example Item" 730 1\n"Another Item" 570 2';

			fs.readFile.mockImplementation((filePath, encoding, callback) => {
				callback(null, fileContent);
			});

			const items = await readItemsFromFile('dummyPath');

			expect(items).toHaveLength(2);
			expect(items[0]).toBeInstanceOf(Item);
			expect(items[0].getName()).toBe('Example Item');
			expect(items[0].getAppId()).toBe(730);
			expect(items[0].getCurrencyId()).toBe(1);
			expect(items[1]).toBeInstanceOf(Item);
			expect(items[1].getName()).toBe('Another Item');
			expect(items[1].getAppId()).toBe(570);
			expect(items[1].getCurrencyId()).toBe(2);
		});

		test('should handle file read errors', async () => {
			const errorMessage = 'File not found';

			fs.readFile.mockImplementation((filePath, encoding, callback) => {
				callback(new Error(errorMessage));
			});

			await expect(readItemsFromFile('dummyPath')).rejects.toThrow(errorMessage);
		});

		test('should handle invalid file format errors', async () => {
			const fileContent = '"Example Item" 730\nInvalidLine\n"Another Item" notANumber 1';

			fs.readFile.mockImplementation((filePath, encoding, callback) => {
				callback(null, fileContent);
			});

			await expect(readItemsFromFile('dummyPath')).rejects.toThrow('Invalid file format: InvalidLine');
		});
	});

	describe('saveItemsToFile', () => {
		test('should save a single item to a file', async () => {
			const item = new Item('Example Item', 0);
			item.setLowestPrice('0.05$');
			item.setMedianPrice('0.03$');
			item.setVolume(108);
			const filePath = 'dummyPath';

			fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
				callback(null);
			});

			await expect(saveItemsToFile(filePath, item)).resolves.toBeUndefined();

			expect(fs.writeFile).toHaveBeenCalledWith(filePath, '"Example Item" | 0.05$ | 0.03$ | 108', 'utf8', expect.any(Function));
		});

		test('should save multiple items to a file', async () => {
			const items = [
				new Item('Example Item', 0),
				new Item('Another Item', 0)
			];
			items[0].setLowestPrice('0.05$');
			items[0].setMedianPrice('0.03$');
			items[0].setVolume(108);
			items[1].setLowestPrice('0.10€');
			items[1].setMedianPrice('0.07€');
			items[1].setVolume(200);
			const filePath = 'dummyPath';

			fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
				callback(null);
			});

			await expect(saveItemsToFile(filePath, items)).resolves.toBeUndefined();
			expect(fs.writeFile).toHaveBeenCalledWith(filePath, '"Example Item" | 0.05$ | 0.03$ | 108\n"Another Item" | 0.10€ | 0.07€ | 200', 'utf8', expect.any(Function));

		});

		test('should handle file write errors', async () => {
			const item = new Item('Example Item', 0);
			const filePath = 'dummyPath';
			const errorMessage = 'Unable to write file';

			fs.writeFile.mockImplementation((filePath, data, encoding, callback) => {
				callback(new Error(errorMessage));
			});

			await expect(saveItemsToFile(filePath, item)).rejects.toThrow(errorMessage);
		});
	});

	describe('printItems', () => {
		let item1, item2;
	
		beforeEach(() => {
			item1 = { toString: () => "Item 1" };
			item2 = { toString: () => "Item 2" };
	
			// Mock console.log
			jest.spyOn(console, 'log').mockImplementation(() => {});
		});
	
		afterEach(() => {
			// Restore console.log
			console.log.mockRestore();
		});
	
		test('should print a single item', () => {
			printItems(item1);
	
			expect(console.log).toHaveBeenCalledWith("Item 1");
			expect(console.log).toHaveBeenCalledTimes(1);
		});
	
		test('should print multiple items', () => {
			printItems([item1, item2]);
	
			expect(console.log).toHaveBeenCalledWith("Item 1");
			expect(console.log).toHaveBeenCalledWith("Item 2");
			expect(console.log).toHaveBeenCalledTimes(2);
		});
	
		test('should not print anything if there are no items', () => {
			printItems([]);
	
			expect(console.log).not.toHaveBeenCalled();
		});
	
		test('should handle null items in array', () => {
			const nullItem = { toString: () => "null" };
	
			printItems([item1, nullItem]);
	
			expect(console.log).toHaveBeenCalledWith("Item 1");
			expect(console.log).toHaveBeenCalledWith("null");
			expect(console.log).toHaveBeenCalledTimes(2);
		});
	});
});
