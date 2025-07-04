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

    it('Sulfuras - check quality after 10 days', function() {
        const sellIn = 2;
        const quality = 80;
        const daysPassed = 10;

        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Sulfuras, Hand of Ragnaros');
        expect(items[0].sellIn).to.equal(sellIn);
        expect(items[0].quality).to.equal(80);
    });

    it('Backstage passes - check quality 2 weeks before the sell by date', function() {
        const sellIn = 14;
        const quality = 20;
        const daysPassed = 2;

        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(22);
    });

    it('Backstage passes - check quality one week before the sell by date', function() {
        const sellIn = 14;
        const quality = 20;
        const daysPassed = 7;

        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(30);
    });

    it('Backstage passes - check quality 3 days before the sell by date', function() {
        const sellIn = 14;
        const quality = 20;
        const daysPassed = 11;

        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(40);
    });

    it('Backstage passes - check quality one day after the sell by date', function() {
        const sellIn = 14;
        const quality = 20;
        const daysPassed = 15;

        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);

        for (let day = 1; day < daysPassed; day++) {
            gildedRose.updateQuality();
        }

        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(sellIn - daysPassed);
        expect(items[0].quality).to.equal(0);
    });
});