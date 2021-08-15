// add middlewares here related to actions

const Actions = require("./actions-model");
const Projects = require('../projects/projects-model')

const checkId = async (req, res, next) =>{
    const {id} = req.params;

    try{
        const action = await Actions.get(id)
        if(!action){
            res.status(404).json({message: "That action does not exist"})
        } else{
            req.action = action;
            next();
        }
    }
    catch(err){
        res.status(500).json({message: "Error finding action"})
    }
}


const validateAction = (req, res, next) =>{
    const{notes, description, project_id} = req.body;
    if(!notes || !description || !project_id){
        res.status(400).json("notes, description, and project_id required")
    } 
    else{
        Projects.get(project_id)
            .then(project => {
                if(!project){
                    res.status(400).json({message: "Action cannot be created or updated because project does not exist."})
                } else{
                    next();
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "Error checking for project"})
            })
    }
}

module.exports = {
    checkId,
    validateAction
}