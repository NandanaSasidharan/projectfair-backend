const multer = require('multer')

//to store multer data
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //create a new filename from images
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

//filter

const fileFilter = (req,file,callback)=>{
    const allowdMimeTypes =['image/png','image/jpeg','image/jpg'];
    if(allowdMimeTypes.includes(file.mimetype)){
        callback(null,true);
    }
    else{
        callback(null,false);
        return callback(new Error('Invalid file type.... must be image/png or image/jpeg or image/jpg'));
    }
}
const multerConfig = multer({
    storage,fileFilter
})
module.exports = multerConfig