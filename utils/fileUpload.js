const multer  = require('multer')
let fs = require('fs') //filesystem
let path = require('path') //file path

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destination = 'public/uploads'
        if(!fs.existsSync(destination)){
            fs.mkdirSync(destination,{recursive:true})
        }
      cb(null, destination)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.orginalname)
      const filename= path.basename(file.orginalname,ext)+ uniqueSuffix + ext
      cb(null, filename)
    }
  })
  
  const fileFilter = (req,file,cb) =>{
    if(!file.orginalname.match(/[.](jpg|png|JPEG|JPG|PNG)$/)){
       return cb(new Error('Invalid File type'),false)
    }else{
        cb(null,true)
    }
  
  }
  const upload = multer({
     storage: storage,
     limits:{
        fileSize:2000000,
     },
     fileFilter:fileFilter,
    
    })

    module.exports = upload