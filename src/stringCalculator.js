'use strict';

function sumNumberStrings(numbers) {
    var i,
        result = 0;
    for (i = 0; i < numbers.length; i++) {
        result += parseInt(numbers[i], 10);
    }
    return result;
}

function getDelimiters(input) {
    var delimiters = [',', '\n'];
    if (containsCustomDelimiter(input)) {
        delimiters.push(input[2]);
    }
    return delimiters;
}

function getNumberStrings(delimiters, input) {
    return input.split(new RegExp(delimiters.join('|')));
}

function containsCustomDelimiter(input) {
    return input.indexOf('//') === 0;
}

function stripCustomDelimiterLine(input) {
    return input.substr(4);
}

module.exports = function (input) {
    var delimiters = getDelimiters(input),
        numberStrings;

    if (input.length === 0) {
        return 0;
    }

    if (containsCustomDelimiter(input)) {
        input = stripCustomDelimiterLine(input);
    }

    numberStrings = getNumberStrings(delimiters, input);
    return sumNumberStrings(numberStrings);
};
