const ControllerModel = require('../models/User');
// const authWare = require('./../middlewares/auth.middleware');
const { generateHash } = require("../services/generate_hash");


module.exports = {
    // Retrieve and return personal information from the database.
    list: async (req, res, next) => {
        let query = {};
        if (req.query.name) {
            query['name'] = new RegExp(req.query.name, "i");
        }
        if (req.query.ids) {
            if (req.query.ids != "all") {
                query['_id'] = { $in: req.query.ids.split(",") };
            }
            let projection = {};
            if (req.query.fields) {
                req.query.fields.split(",").forEach(field => {
                    projection[field] = 1;
                })
            }
            let records = ControllerModel.find(query, projection);
            return res.send(await records);
        } else {
            let perPage = req.query.perPage || 20,
                page = Math.max(0, (req.query.page || 1)),
                count = await ControllerModel.count();
            try { perPage = parseInt(perPage) } catch (err) { }
            /* This is to automate query criterial */
            // delete req.query.perPage;
            // delete req.query.page;
            // delete req.query.apikey;
            Object.keys(req.query).forEach(key => {
                if (ControllerModel.schema.path(key)) {
                    query[key] = new RegExp(req.query[key], "i");
                }
            })
            //////////////////////////////////////////
            ControllerModel.find(query)
                .limit(perPage)
                .skip(perPage * (page - 1))
                .then(async response => {
                    let data = { perPage, page, count, pages: Math.ceil(count / perPage), data: response, };
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: "Failed! No personal information found."
                    });
                });
        }
    },

    // Retrieve and return a personal information from the database.
    findOne: async (req, res, next) => {
        try {
            let response = await ControllerModel.findById({ _id: req.params.id }).select('+password');
            if (response) {
                res.send(response);
            } else {
                return res.status(500).send({
                    message: "Failed! No personal information found."
                });
            }
        } catch (err) {
            return res.status(500).send({
                message: "Failed! No personal information found."
            });
        }
    },

    // Add a personal information to database.
    add: async (req, res, next) => {

        try {
            req.body.password = await generateHash(req.body.password || '12345678');
            let newRecord = new ControllerModel(req.body);
            let response = await newRecord.save();
            delete response._doc.password;
            res.send(response);
        } catch (err) {
            let message = "Failed! record cannot be added!";
            if (err.message.indexOf("duplicate")) message = `This email already exists`;
            res.status(406).send({
                message,
                err
            });
        }
    },

    findOneAndUpdate: async (req, res, next) => {

        delete req.body._id;
        if(req.body.password) {
            req.body.password = await generateHash(req.body.password);
        }
        let found = await ControllerModel.findById(req.params.id);
        if (found) {
            let updated = await found.update({ $set: req.body });
            return res.send(await ControllerModel.findById(req.params.id));
        } else {
            res.status(500).send({
                message: "Failed! not found to be updated"
            });
        }

    },

    // Remove personal information from database.
    deleteRecord: async (req, res, next) => {
        let record = await ControllerModel.findById(req.params.id);
        if (record) {
            try { res.send(await record.remove()); } catch (err) { next(err); }
        } else {
            res.status(404).send({
                message: "Failed! The record doesn't found"
            });
        }
    }
}
