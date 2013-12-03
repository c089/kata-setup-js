var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');
chai.use(sinonChai);

var Checkout = function () {
    this.total = 0;

    this.counts = {
        A: 0,
        B: 0,
        C: 0
    };

    this.prices = {
        A: {limit:3, specialprice:30, price:50},
        B: {limit:2, specialprice:15, price:30},
        C: {price:20},
        D: {price:15}
    }
};

Checkout.prototype = {
    price: function () {
        return this.total;
    },

    shouldChargeSpecialPrice: function(item) {
        var limitReached = this.counts[item] % this.prices[item]['limit'] == 0;
        var hasSpecialPrice = this.prices[item]['specialprice'];
        return hasSpecialPrice && limitReached;
    },

    scan: function (item) {
        this.counts[item]++;
        if (this.shouldChargeSpecialPrice(item)) {
            this.total += this.prices[item]['specialprice'];
        }
        else {
            this.total += this.prices[item]['price'];
        }
    }
};

describe('the program', function () {

    it('should return 0 if empty', function () {
        var checkout = new Checkout();
        expect(checkout.price()).to.equal(0);
    });

    it('should return the regular price for a single item A', function () {
        var checkout = new Checkout();
        checkout.scan('A');
        expect(checkout.price()).to.equal(50);
    });

    it('should return the regular price for a single item B', function () {
        var checkout = new Checkout();
        checkout.scan('B');
        expect(checkout.price()).to.equal(30);
    });

    it('should return the regular price for a single item C', function () {
        var checkout = new Checkout();
        checkout.scan('C');
        expect(checkout.price()).to.equal(20);
    });

    it('should return the regular price for a two items A', function () {
        var checkout = new Checkout();
        checkout.scan('A');
        checkout.scan('A');
        expect(checkout.price()).to.equal(100);
    });

    it('should return the special price for a three items of A', function () {
        var checkout = new Checkout();
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        expect(checkout.price()).to.equal(130);
    });

    it('should return the correct price for a four items of A', function () {
        var checkout = new Checkout();
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        expect(checkout.price()).to.equal(180);
    });

    it('should return the correct price for a six items of A', function () {
        var checkout = new Checkout();
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        expect(checkout.price()).to.equal(260);
    });

    it('should return the correct price for a two items of B', function () {
        var checkout = new Checkout();
        checkout.scan('B');
        checkout.scan('B');
        expect(checkout.price()).to.equal(45);
    });

    it('should return the correct price for a three items of B', function () {
        var checkout = new Checkout();
        checkout.scan('B');
        checkout.scan('B');
        checkout.scan('B');
        expect(checkout.price()).to.equal(75);
    });

    it('should return the correct price for mixed items AB', function () {
        var checkout = new Checkout();
        checkout.scan('A');
        checkout.scan('B');
        expect(checkout.price()).to.equal(80);
    });

});
