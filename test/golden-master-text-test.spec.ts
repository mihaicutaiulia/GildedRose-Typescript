import { Item, GildedRose } from '../app/gilded-rose';
import {expect} from "chai";

describe('Gilded Rose', function () {

    it('Normal item', function() {
        const sellIn = 10;
        const quality = 30;
        const daysPassed = 5;

        const gildedRose = new GildedRose([ new Item('item', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('item');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(Math.max(0, quality - daysPassed));
    });

});

describe('Gilded Rose', function () {

    it('Normal item - check quality limit', function() {
        const sellIn = 10;
        const quality = 2;
        const daysPassed = 5;

        const gildedRose = new GildedRose([ new Item('item', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('item');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(0);
    });

});

describe('Gilded Rose', function () {

    it('Normal item - check quality after sell by date', function() {
        // after sell by date, the quality degrades twice as fast
        const sellIn = 3;
        const quality = 30;
        const daysPassed = 5;

        const gildedRose = new GildedRose([ new Item('item', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('item');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(23);
    });

});

describe('Gilded Rose', function () {

    it('Aged Brie - check quality after 10 days', function() {
        const sellIn = 10;
        const quality = 30;
        const daysPassed = 10;

        const gildedRose = new GildedRose([ new Item('Aged Brie', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(quality + daysPassed);
    });

});

describe('Gilded Rose', function () {

    it('Aged Brie - check quality limit', function() {
        const sellIn = 10;
        const quality = 30;
        const daysPassed = 30;

        const gildedRose = new GildedRose([ new Item('Aged Brie', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(Math.min(quality + daysPassed, 50));
    });

});

