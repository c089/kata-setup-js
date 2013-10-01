var expect = require('chai').expect,
    romanNumerals = require('../romanNumerals'),
    testCases = [
        { arabicNumeral: 1, romanNumeral: 'I' },
        { arabicNumeral: 2, romanNumeral: 'II' },
        { arabicNumeral: 4, romanNumeral: 'IV' },
        { arabicNumeral: 5, romanNumeral: 'V' },
        { arabicNumeral: 6, romanNumeral: 'VI' },
        { arabicNumeral: 9, romanNumeral: 'IX' },
        { arabicNumeral: 10, romanNumeral: 'X' },
        { arabicNumeral: 20, romanNumeral: 'XX' },
        { arabicNumeral: 30, romanNumeral: 'XXX' },
        { arabicNumeral: 40, romanNumeral: 'XL' },
        { arabicNumeral: 50, romanNumeral: 'L' },
        { arabicNumeral: 90, romanNumeral: 'XC' },
        { arabicNumeral: 100, romanNumeral: 'C' },
        { arabicNumeral: 400, romanNumeral: 'CD' },
        { arabicNumeral: 500, romanNumeral: 'D' },
        { arabicNumeral: 900, romanNumeral: 'CM' },
        { arabicNumeral: 1000, romanNumeral: 'M' },
        { arabicNumeral: 1999, romanNumeral: 'MCMXCIX' },
        { arabicNumeral: 3999, romanNumeral: 'MMMCMXCIX' },
        { arabicNumeral: 42, romanNumeral: 'XLII' }
    ];

describe('the romanNumerals', function () {
    testCases.forEach(function (testCase) {
        it('should return ' + testCase.arabicNumeral + ' for '  + testCase.romanNumeral, function () {
            expect(romanNumerals.arabicToRomanNumeral(testCase.arabicNumeral)).to.equal(testCase.romanNumeral);
        });
    });
});
