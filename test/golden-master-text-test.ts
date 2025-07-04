import { Item, GildedRose } from '../app/gilded-rose';
import * as fs from 'fs';

const initialItems = [
    new Item('Aged Brie', 10, 30),
    new Item('Aged Brie', 50, 30),
    new Item('Backstage passes to a TAFKAL80ETC concert', 6, 30),
    new Item('Backstage passes to a TAFKAL80ETC concert', 1, 40),
    new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Sulfuras, Hand of Ragnaros', 10, 2),
    new Item('item', 11, 20),
    new Item('item1', 1, 20),
    new Item('item2', 100, 20),
    new Item('item3', 10, 50),
];

const gildedRose = new GildedRose(initialItems.map(item => new Item(item.name, item.sellIn, item.quality)));

const days = 20;
const itemHistories: string[][] = initialItems.map(() => []);

for (let day = 0; day <= days; day++) {
    gildedRose.items.forEach((item, idx) => {
        itemHistories[idx].push(`Day ${day}: ${item.name}, ${item.sellIn}, ${item.quality}`);
    });
    gildedRose.updateQuality();
}

let result = '';
itemHistories.forEach((history, idx) => {
    result += `=== Item ${idx + 1}: ${initialItems[idx].name} ===\n`;
    result += history.join('\n') + '\n\n';
});

fs.writeFileSync('golden-master.txt', result);