// add middlewares here related to projects

const Projects = require('./projects-model');

const checkId = async (req, res, next) =>{
    const {id} = req.params;

    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json({message: "That project does not exist"})
        } else{
            req.project = project;
            next();
        }
    }
    catch(err){
        res.status(500).json({message: "Error finding project"})
    }
}

const validateProject = (req, res, next) =>{
    const{name, description} = req.body;
    if(!name || !description){
        res.status(400).json("Name and description required")
    } else{
        next();
    }
}

module.exports = {
    checkId,
    validateProject
}