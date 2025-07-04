import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('check name', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0), new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[1].name).to.equal('Backstage passes to a TAFKAL80ETC concert');

    });

    it('check negative', function() {
        const gildedRose = new GildedRose([new Item('foo', 40, 30) ]);

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(29);
    });

    it('check negative sellIn', function() {
        const gildedRose = new GildedRose([new Item('foo', 5, 30) ]);

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(-6);
    });

    it('quality decrease for normal items', function() {
        const gildedRose = new GildedRose([new Item('foo', 20, 30) ]);

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(19);
    });

    it('quality decrease for normal items after sell by date', function() {
        const gildedRose = new GildedRose([new Item('foo', 5, 30) ]);

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(13);
    });

    it('quality always positive', function() {
        const gildedRose = new GildedRose([new Item('foo', 3, 1) ]);

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(0);
    });

    it('aged brie quality', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 15, 20) ]);

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(31);
    });

    it('aged brie quality limit', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 15, 40) ]);

        for (let day = 0; day < 20; day++) {
            gildedRose.updateQuality();
        }
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(50);
    });

});
