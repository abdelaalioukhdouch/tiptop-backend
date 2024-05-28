// test/userController.test.js
const sinon = require('sinon');
const userController = require('../controllers/user');
const ControllerModel = require('../models/User');
const { generateHash } = require('../services/generate_hash');

describe('User Controller', () => {
  let chai, expect;
  let req, res, next;

  before(async () => {
    chai = await import('chai');
    expect = chai.expect;
  });

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {}
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

  describe('list', () => {
    it('should return a list of users', async () => {
      const fakeUsers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
      sinon.stub(ControllerModel, 'find').returns({
        limit: sinon.stub().returnsThis(),
        skip: sinon.stub().resolves(fakeUsers),
      });
      sinon.stub(ControllerModel, 'count').resolves(2);

      await userController.list(req, res, next);
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.calledWith({
        perPage: 20,
        page: 1,
        count: 2,
        pages: 1,
        data: fakeUsers,
      })).to.be.true;
    });
  });

//   describe('findOne', () => {
//     it('should return a user by ID', async () => {
//       req.params.id = '1';
//       const fakeUser = { _id: '1', name: 'John Doe' };
//       sinon.stub(ControllerModel, 'findById').resolves(fakeUser);

//       await userController.findOne(req, res, next);
//       expect(res.send.calledOnce).to.be.true;
//       expect(res.send.calledWith(fakeUser)).to.be.true;
//     });

//     it('should return 500 if user not found', async () => {
//       req.params.id = '1';
//       sinon.stub(ControllerModel, 'findById').resolves(null);

//       await userController.findOne(req, res, next);
//       expect(res.status.calledOnceWith(500)).to.be.true;
//       expect(res.send.calledOnceWith({
//         message: "Failed! No personal information found."
//       })).to.be.true;
//     });
//   });

//   describe('add', () => {
//     it('should add a new user', async () => {
//       req.body = { name: 'John Doe', password: '12345678' };
//       const fakeUser = { _id: '1', name: 'John Doe' };
//       sinon.stub(generateHash).resolves('hashedpassword');
//       sinon.stub(ControllerModel.prototype, 'save').resolves(fakeUser);

//       await userController.add(req, res, next);
//       expect(res.send.calledOnce).to.be.true;
//       expect(res.send.calledWith(fakeUser)).to.be.true;
//     });

//     it('should return 406 if email is duplicate', async () => {
//       req.body = { name: 'John Doe', email: 'test@test.com' };
//       sinon.stub(generateHash).resolves('hashedpassword');
//       const saveStub = sinon.stub(ControllerModel.prototype, 'save');
//       saveStub.throws(new Error('duplicate key error'));

//       await userController.add(req, res, next);
//       expect(res.status.calledOnceWith(406)).to.be.true;
//       expect(res.send.calledOnceWith({
//         message: "This email already exists",
//         err: sinon.match.any
//       })).to.be.true;
//     });
//   });

//   describe('deleteRecord', () => {
//     it('should delete a user by ID', async () => {
//       req.params.id = '1';
//       const fakeUser = { _id: '1', remove: sinon.stub().resolves() };
//       sinon.stub(ControllerModel, 'findById').resolves(fakeUser);

//       await userController.deleteRecord(req, res, next);
//       expect(fakeUser.remove.calledOnce).to.be.true;
//       expect(res.send.calledOnce).to.be.true;
//     });

//     it('should return 404 if user not found', async () => {
//       req.params.id = '1';
//       sinon.stub(ControllerModel, 'findById').resolves(null);

//       await userController.deleteRecord(req, res, next);
//       expect(res.status.calledOnceWith(404)).to.be.true;
//       expect(res.send.calledOnceWith({
//         message: "Failed! The record doesn't found"
//       })).to.be.true;
//     });
//   });


describe('User Controller - findOne', () => {
    let req, res, next;
  
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
  
});
