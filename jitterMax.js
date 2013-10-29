var expect = require('chai').expect;

describe('jitter max', function () {
    function jitters(a, b, c) {
        var jitterTypeA = a < b && b > c,
            jitterTypeB = a > b && b < c;
        return (jitterTypeA || jitterTypeB);
    }

    function jitterMax (sequence) {
        var a,
            b,
            c,
            length = 0,
            endsAt = 0,
            longestJitterLength = 0,
            longestJiggerEndsAt;

        while (c !== -1) {
            endsAt++;

            if (jitters(a, b, c)) {
                length = length ? length+1 : 3;
                if (length >= longestJitterLength) {
                    longestJitterLength = length;
                    longestJiggerEndsAt = endsAt;
                }
            }
            else {
                length = 0;
            }

            a = b;
            b = c;
            c = sequence.shift();
        }

        var startsAt = longestJitterLength ? (longestJiggerEndsAt - longestJitterLength - 1) : 0;
        return { length: longestJitterLength, startsAt: startsAt};
    }

    var testcases = [
        // empty sequnce
        { sequence:[[]], length: 0, startsAt: 0 },

        // no jitter
        { sequence:[0,1,2], length: 0, startsAt: 0 },
        { sequence:[2,1,0], length: 0, startsAt: 0 },

        // two kinds of jitter: low/high/low and high/low/high
        { sequence:[0,1,0], length: 3, startsAt: 0 },
        { sequence:[1,0,1], length: 3, startsAt: 0 },

        // moving the start to the right
        { sequence:[0,0,1,0], length: 3, startsAt: 1 },
        { sequence:[0,0,0,1,0], length: 3, startsAt: 2 },
        { sequence:[0,0,0,0,1,0], length: 3, startsAt: 3 },

        // longer jitter
        { sequence:[1,0,1,0], length: 4, startsAt: 0 },
        { sequence:[1,0,1,0,1], length: 5, startsAt: 0 },
        { sequence:[1,0,1,0,1,0], length: 6, startsAt: 0 },
        { sequence:[0,0,1,0,1], length: 4, startsAt: 1 },
        { sequence:[0,0,0,0,1,0,1], length: 4, startsAt: 3 },

        // short jitter followed by longer jitter
        { sequence:[1,2,1,  0,0,  0,1,0,1], length: 4, startsAt: 5 },
        // long jitter followed by short jitter
        { sequence:[1,0,1,0, 0,0, 0,1,0], length: 4, startsAt: 0 },
    ];

    testcases.forEach(function(testcase) {
        it(JSON.stringify(testcase), function () {
            var actual = jitterMax(testcase.sequence.concat(-1));
            expect(actual).to.deep.equal({
                length: testcase.length,
                startsAt: testcase.startsAt
            });
        });
    });

});
