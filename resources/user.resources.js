'use strict';

const { User, validate } = require('../models/user.model');
const repository = require('../repositories/user.repository');

/**
 * Create a new user
 *
 * @params User
 *
 * @returns JSON
 */
exports.create = async (req, res) => {

    const { error } = validate(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    let model = new User(req.body);

    await repository.create(model)
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
exports.delete = async (req, res) => {

    let id = req.params.id;

    if (id === undefined || ! id.length) {
        return res.status(404).send({'msg': 'The `id` param is required.'});
    }

    await repository.delete(id)
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
exports.list = async (req, res) => {

    await repository.getAll()
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
exports.show = async (req, res) => {
    
    let id = req.params.id;

    if (id === undefined || id === '') {
        return res.status(404).send({'msg': 'The `id` param is required.'});
    }

    await repository.getById(id)
        .then((result) => {
            if (result === null) {
                return res.status(404).json({'msg': 'User not found.'});
            }

            return res.json(result);
        }).catch((err) => {
            return res.status(500).send({'msg': err.message});
        });
};