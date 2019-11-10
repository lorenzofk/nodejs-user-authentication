'use strict';

var userModel = require('../models/user.model').User;
var userRepository = require('../repositories/user.repository');

/**
 * Create a new user
 *
 * @params User
 *
 * @returns JSON
 */
exports.create = (req, res) => {

    let model = new userModel(req.body);

    userRepository.create(model)
        .then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            return res.status(422).send({'msg': err.message});
        });
};

/**
 * Delete an User by id
 *
 * @params id
 *
 * @returns JSON
 */
exports.delete = (req, res) => {

    let id = req.params.id;

    if (id === undefined || ! id.length) {
        return res.status(404).send({'msg': 'The `id` param is required.'});
    }

    userRepository.delete(id)
        .then((result) => {
            return res.json(result);
        }).catch((err) => {
            return res.status(500).send({'msg': err.message});
        });

};

/**
 * Returns all Users
 *
 * @params id
 *
 * @returns JSON
 */
exports.list = (req, res) => {

    userRepository.getAll()
        .then((result) => {
            return res.json(result);
        }).catch((err) => {
            return res.status(500).send({'msg': err.message});
        });

};

/**
 * Return an User by id
 *
 * @params id
 *
 * @returns JSON
 */
exports.show = (req, res) => {
    
    let id = req.params.id;

    if (id === undefined || id === '') {
        return res.status(404).send({'msg': 'The `id` param is required.'});
    }

    userRepository.getById(id)
        .then((result) => {
            if (result === null) {
                return res.status(404).json({'msg': 'User not found.'});
            }

            return res.json(result);
        }).catch((err) => {
            return res.status(500).send({'msg': err.message});
        });
};