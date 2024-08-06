// test/Item.test.js

const Item = require('../src/models/Item');

describe('Item Class', () => {
	test('should create an Item object with name, appId, and default currency', () => {
		const itemName = 'ExampleItem';
		const itemAppId = 730;
		const itemCurrencyId = 1;

		const item = new Item(itemName, itemAppId);

		expect(item.getName()).toBe(itemName);
		expect(item.getAppId()).toBe(itemAppId);
		expect(item.getCurrencyId()).toBe(itemCurrencyId);
		expect(item.getLowestPrice()).toBeNull();
		expect(item.getMedianPrice()).toBeNull();
		expect(item.getVolume()).toBeNull();
	});

	test('should create an Item object with name, appId, and specified currency', () => {
		const itemName = 'ExampleItem';
		const itemAppId = 730;
		const itemCurrencyId = 2;

		const item = new Item(itemName, itemAppId, itemCurrencyId);

		expect(item.getName()).toBe(itemName);
		expect(item.getAppId()).toBe(itemAppId);
		expect(item.getCurrencyId()).toBe(itemCurrencyId);
		expect(item.getLowestPrice()).toBeNull();
		expect(item.getMedianPrice()).toBeNull();
		expect(item.getVolume()).toBeNull();
	});

	test('should set and get the lowest price', () => {
		const item = new Item('ExampleItem', 730);
		const lowestPrice = '0.05$';

		item.setLowestPrice(lowestPrice);

		expect(item.getLowestPrice()).toBe(lowestPrice);
	});

	test('should set and get the median price', () => {
		const item = new Item('ExampleItem', 730);
		const medianPrice = '0.03$';

		item.setMedianPrice(medianPrice);

		expect(item.getMedianPrice()).toBe(medianPrice);
	});

	test('should set and get the volume', () => {
		const item = new Item('ExampleItem', 730);
		const volume = 108;

		item.setVolume(volume);

		expect(item.getVolume()).toBe(volume);
	});

	test('should return correct string representation', () => {
		const item = new Item('ExampleItem', 730, 1);
		item.setLowestPrice('0.05$');
		item.setMedianPrice('0.03$');
		item.setVolume(108);

		const expectedString = 'Item { name: ExampleItem, appId: 730, currencyId: 1, lowestPrice: 0.05$, medianPrice: 0.03$, volume: 108 }';

		expect(item.toString()).toBe(expectedString);
	});

	test('should correctly compare two items for equality', () => {
		const item1 = new Item('ExampleItem', 730, 1);
		item1.setLowestPrice('0.05$');
		item1.setMedianPrice('0.03$');
		item1.setVolume(108);

		const item2 = new Item('ExampleItem', 730, 1);
		item2.setLowestPrice('0.05$');
		item2.setMedianPrice('0.03$');
		item2.setVolume(108);

		const item3 = new Item('AnotherItem', 570, 2);

		expect(item1.equals(item2)).toBe(true);
		expect(item1.equals(item3)).toBe(false);
	});
});
