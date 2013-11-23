var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('the program', function () {
    it('can handle the truth', function () {
        expect(true).to.equal(true);
    });

    it('can spy on things', function () {
        var spy = sinon.spy();
        spy('hello');
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith('hello');
    });

    it('can stub things', function () {
      var stub = sinon.stub();
      stub.returns(5);
      expect(stub()).to.equal(5);
    });

});
