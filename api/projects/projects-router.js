// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const{checkId, validateProject} = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Error retrieving projects'})
        })
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project =>{
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error adding the project"})
        })
})

router.put('/:id', checkId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error updating project"})
        })
})

router.delete('/:id', checkId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            console.log("Project removed")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error removing project"})
        })
})

router.get('/:id/actions', checkId, (req,res) =>{
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error getting project actions"})
        })
})

module.exports = router;