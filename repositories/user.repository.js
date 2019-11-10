'use strict';

var mongoose = require('mongoose');
var userModel = require('../models/user.model').User;
var objectId =  mongoose.Types.ObjectId;

/**
*  This class is used in services to access
 * and manipulate the data
*/
module.exports = new class UserRepository {

    create(data) {
        return userModel.create(data);
    };

    delete(id) {

        if (! objectId.isValid(id)) {
            throw Error('This id is invalid.');
        }

        return userModel.findByIdAndRemove(id)
            .then((res) => {

                if (res === null) {
                    throw Error('Elimination not found.');
                }

                return {_id: res._id};

            }).catch((e) => { throw Error(e.message) } );
    }

    getAll() {
        return userModel.find({});
    };

    getById(id) {

        if (! objectId.isValid(id)) {
            throw Error('This id is invalid.');
        }

        return userModel.findById({ _id: id });
    };

    update(data) {

        if (! objectId.isValid(data.id)) {
            throw Error('This id is invalid.');
        }

        return userModel.findByIdAndUpdate(data.id, { $set: data });
    };

}