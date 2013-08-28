var expect = require('chai').expect,
    add = require('../src/stringCalculator'),
    testData = [
        {result:3,add:'1,1,1'},
        {result: 0, add: ''},
        {result: 23, add: '3,20'},
        {result: 200, add: '100,49,51'},
        {result: 5, add: '5'},
        {result: 15, add: '15'},
        {result: 15, add: '15,0'},

        {result: 1, add: '0\n1'},
        {result: 3, add: '0\n1,2'},
        {result: 3, add: '0,1\n2'},

        {result: 6, add: '//a\n1a2a3'},
    ];

describe('StringCalculator', function () {
    testData.forEach(function (data) {
        it('should return ' + data.result + ' for ' + data.add, function () {
            expect(add(data.add)).to.equals(data.result);
        });
    });

});
