// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');
const {checkId, validateAction} = require("./actions-middlware")

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Error retrieving actions'})
        })
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action =>{
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error adding the action"})
        })
})

router.put('/:id', checkId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error updating action"})
        })
})

router.delete('/:id', checkId, (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({message: "action removed"})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error removing action"})
        })
})


module.exports = router;