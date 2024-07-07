const projects = require('../Models/projectSchema')
//add project logic
exports.addUserProject = async(req,res)=>{
    console.log("Inside AddUserProject");
    //res.status(200).json("add user project request")
    //user id get
    const userId = req.payload
    //add project details
    const {title,language,github,link,overview} = req.body
    //get image
    projectImage=req.file.filename
    console.log(projectImage);

    //logic of adding new user project
    try{
   const existingProect = await projects.findOne({github})
   if(existingProect){
     res.status(406).json("Project alredy exists")
    }
    else{
        const newProject = new projects({title,language,github,link,overview,projectImage,userId})
       await newProject.save()//save new project details intp mogodb
        res.status(200).json(newProject)//send response to clinte
    }
   }
    catch(err){
     res.status(401).json({message:err.message})
    }
}
//get user project
exports.getUserProject = async(req,res)=>{
    //get user id
    const userId=req.payload
    //api request
    try{
        //get project information of perticular user
        const userProject = await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)//send responce to client
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
//get all projects
exports.getAllProjects = async(req,res)=>{
    try{
        const Allprojects = await projects.find()
        res.status(200).json(Allprojects)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
//get home project
exports.getHomeProject = async(req,res)=>{
    try {
        const HomeProject = await projects.find().limit(3)
        res.status(200).json(HomeProject)//send response to the client
    } catch (err) {
        res.status(401).json(err.message)
    }
}
//edit
exports.editProject=async(req,res) => {
    const{title,language,github,link,overview,projectImage}=req.body;
    const uploadImage = req.file?req.file.filename:projectImage;
    const userId = req.payload
    const {id} = req.params
    try{
        //find the particular id in mogodb and add the updated project details
      const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,
        overview,projectImage:uploadImage,userId},{new:true})
        //save the updated project  details
        await updateProject.save()
        //reesponse send back to client
        res.status(200).json(updateProject)
    }
    catch(error){
        res.status(401).json(err)
    }
}

//delete the project details
exports.deleteProject = async(req,res) => {
    const {pid} = req.params
    try{
const deleteData = await projects.findByIdAndDelete({_id:pid})
res.status(200).json(deleteData)
    }
    catch(err){
        res.status(401).json(err)
    }
}