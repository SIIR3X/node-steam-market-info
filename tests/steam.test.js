// test/steam.test.js

const axios = require('axios');
const { getItemsInfo } = require('../src/utils/steam');
const Item = require('../src/models/Item');
const { printItems } = require('../src/utils/io');

// Mock the axios.get function
jest.mock('axios');

describe('Steam Utils', () => {
	describe('getItemsInfo', () => {
		test('should retrieve information for a single item', async () => {
			const item = new Item('MP9 | Storm (Minimal Wear)', 730);
			
			const responseData = {
				success: true,
				lowest_price: '$0.05',
				volume: '108',
				median_price: '$0.03'
			};

			axios.get.mockResolvedValue({ data: responseData });

			await getItemsInfo(item);

			expect(item.getLowestPrice()).toBe('$0.05');
			expect(item.getMedianPrice()).toBe('$0.03');
			expect(item.getVolume()).toBe(108);
		});

		test('should retrieve information for a list of items', async () => {
			const items = [
				new Item('MP9 | Storm (Minimal Wear)', 730),
				new Item('AK-47 | Redline (Field-Tested)', 730)
			];

			const responseData1 = {
				success: true,
				lowest_price: '$0.05',
				volume: '108',
				median_price: '$0.03'
			};
			const responseData2 = {
				success: true,
				lowest_price: '$10.00',
				volume: '1000',
				median_price: '$9.00'
			};

			axios.get.mockResolvedValueOnce({ data: responseData1 });
			axios.get.mockResolvedValueOnce({ data: responseData2 });

			await getItemsInfo(items);

			expect(items[0].getLowestPrice()).toBe('$0.05');
			expect(items[0].getMedianPrice()).toBe('$0.03');
			expect(items[0].getVolume()).toBe(108);

			expect(items[1].getLowestPrice()).toBe('$10.00');
			expect(items[1].getMedianPrice()).toBe('$9.00');
			expect(items[1].getVolume()).toBe(1000);
		});

		test('should handle errors from Steam Market for a single item', async () => {
			const item = new Item('MP9 | Storm (Minimal Wear)', 730);
		
			axios.get.mockResolvedValue({ data: { success: false } });
		
			await expect(getItemsInfo(item)).resolves.not.toThrow();

			expect(item.getLowestPrice()).toBeNull();
			expect(item.getMedianPrice()).toBeNull();
			expect(item.getVolume()).toBeNull();
		});

		test('should handle network errors for a single item', async () => {
			const item = new Item('MP9 | Storm (Minimal Wear)', 730);
		
			axios.get.mockRejectedValue(new Error('Network Error'));
		
			await expect(getItemsInfo(item)).resolves.not.toThrow();

			expect(item.getLowestPrice()).toBeNull();
			expect(item.getMedianPrice()).toBeNull();
			expect(item.getVolume()).toBeNull();
		});
	});
});
