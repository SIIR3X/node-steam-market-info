# Steam Market Info - NodeJS

[![npm version](https://img.shields.io/npm/v/steam-market-info.svg)](https://www.npmjs.com/package/steam-market-info)
[![license](https://img.shields.io/npm/l/steam-market-info.svg)](https://github.com/SIIR3X/node-steam-market-info/blob/main/LICENSE)

A module to retrieve item information from the Steam Market.

## Description

Steam Market Info is a Node.js module that allows you to retrieve information about items from the Steam Market, such
as the lowest price, median price, and volume of sales. It provides functionality to read items from a file, update
their information from the Steam Market, print the updated items, and save them back to a file.


## Installation

You can install this module via npm:

```bash
npm install steam-market-info
```


## Dependencies

This project uses the following dependencies:

* `Node.js`: >= 20.11.1
* `axios`: ^1.7.3
* `jest`: (dev dependency): ^29.7.0
* `jsdoc`: (dev dependency): ^4.0.3


## Usage

### Manually creating items

```js
// Single item
async function example() {
    const item = new Item('MP9 | Storm (Minimal Wear)', 730);
    
    await getItemsInfo(item);
    
    printItems(item);
}

// Multiple items
async function example() {
    const items = [
        new Item('MP9 | Storm (Minimal Wear)', 730),
        new Item('AK-47 | Redline (Field-Tested)', 730)
    ];

    await getItemsInfo(item);

    printItems(item);
}
```

### Reading and saving items from a file

```js
// Single item
async function example() {
    const item = await readItemsFromFile('path/to/input/file.txt');
    
    await getItemsInfo(item);
    
    await saveItemsToFile('path/to/output/file.txt');
}

// Multiple items
async function example() {
    const items = await readItemsFromFile('path/to/input/file.txt');

    await getItemsInfo(item);

    await saveItemsToFile('path/to/output/file.txt');
}
```


## Methods

***readItemsFromFile(filePath)***

Reads item(s) from a file.

**Parameters:**

* `fielPath` (string) - The path to the file containing item data.

**Returns:**

* `Promise<Item[]>` - A promise that resolves to an array of `Item` instances.

**Notes:**

* The input file should follow the format: `"name" appId currencyId`.
* Each line represents an item with its name in quotes, the corresponding application ID, and an optional currency ID
  (default is 1 for USD, for more information go to https://partner.steamgames.com/doc/store/pricing/currencies).

***saveItemsToFile(filePath, items)***

Saves item(s) to a file.

**Parameters:**

* `fielPath` (string) - The path to the file where the item data will be saved.
* `items` (Item | Item[]) - The item or list of items to save.

**Returns:**

* `Promise<void>` - A promise that resolves when the file has been written.

**Note:**

* The output file will follow the format: `"name" | lowestPrice | medianPrice | volume`.
* Each item is saved on a new line with its properties separated by pipes (`|`). If a value is not provided, it
  defaults to an empty string.

***getItemsInfo(items)***

Updates item's information from the Steam Market.

**Parameters:**

* `items` (Item | Item[]) - The item or list of items to update.

**Returns:**

* `Promise<void>` - A promise that resolves when all items are updated.

***printItems(items)***

Prints item(s) to the console.

**Parameters:**

* `items` (Item | Item[]) - The item or list of items to print.

**Returns:**

* `void` - This function does not return a value. It prints the items to the console.


## Scripts

**test**

```bash
npm test
```

**docs**

```bash
npm run docs
```

**example**

```bash
npm run example
```


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.