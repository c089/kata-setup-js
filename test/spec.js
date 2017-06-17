const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

class CannotLocateUser extends Error {};
class CannotFindCloseAirport extends Error{};

const findNearestAirportUsingPromise = (locateUser, findAirportCloseTo) => {
    return locateUser().then(findAirportCloseTo).catch(e => {
        if (e instanceof CannotLocateUser) return 'LGW';
        if (e instanceof CannotFindCloseAirport) throw e;
    });
};

const findNearestAirportUsingAsyncAwait = async (locateUser, findAirportCloseTo) => {
    try {
        const location = await locateUser();
        const airport = await findAirportCloseTo(location);

        return airport;
    }
    catch (e) {
        if (e instanceof CannotLocateUser) return 'LGW';
        if (e instanceof CannotFindCloseAirport) throw e;
    }
};

describe('findNearestAirport', function () {
    const findNearestAirport = findNearestAirportUsingPromise;

    it('given we cannot locate the user, assume they are in London', async () => {
        const locateUser = async () => { throw new CannotLocateUser('Cannot locate User'); };
        const findAirportCloseTo = () => {};

        let nearestAirport = await findNearestAirport(locateUser, findAirportCloseTo);

        expect(nearestAirport).to.equal('LGW');
    });

    it('given the nearest airport cannot be located, abort', () => {
        const locateUser = async () => { };
        const findAirportCloseTo = async () => { throw new CannotFindCloseAirport; };
        let nearestAirport = findNearestAirport(locateUser, findAirportCloseTo);

        return expect(nearestAirport).to.be.rejected;
    });

    it('find the airports closest to the user', () => {
        const locateUser = async () => 'Dorking';
        const closestAirports = { Dorking: 'LGW' };
        const findAirportCloseTo = async location => closestAirports[location];

        const nearestAirport = findNearestAirport(locateUser, findAirportCloseTo);

        return expect(nearestAirport).to.eventually.equal('LGW');
    });
});
