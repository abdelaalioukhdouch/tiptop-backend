// test/userController.test.js
const sinon = require('sinon');
const userController = require('../controllers/user');
const ControllerModel = require('../models/User');
const { generateHash } = require('../services/generate_hash');

describe('User Controller - findOne', () => {
  let expect;
  let req, res, next;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
  });

  beforeEach(() => {
    req = {
      params: { id: '1' },
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a user by ID', async () => {
    const fakeUser = { _id: '1', name: 'John Doe', password: 'hashedpassword' };
    sinon.stub(ControllerModel, 'findById').returns({
      select: sinon.stub().resolves(fakeUser),
    });

    await userController.findOne(req, res, next);
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.calledWith(fakeUser)).to.be.true;
  });

  it('should return 500 if user not found', async () => {
    sinon.stub(ControllerModel, 'findById').returns({
      select: sinon.stub().resolves(null),
    });

    await userController.findOne(req, res, next);
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.send.calledOnceWith({
      message: "Failed! No personal information found."
    })).to.be.true;
  });

  it('should return 500 if there is an error', async () => {
    sinon.stub(ControllerModel, 'findById').throws(new Error('Database error'));

    await userController.findOne(req, res, next);
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.send.calledOnceWith({
      message: "Failed! No personal information found."
    })).to.be.true;
  });
});
