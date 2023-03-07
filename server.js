const express = require("express")
const bodyParser = require('body-parser')
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
var upload = multer({ storage: storage })

const app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

const model = require("./models/index");

app.get("/user",async function(req, res) { 
    try { 
        const result = await model.User.findAll({ include:{ model: model.Task, attributes:['id','title','desc','done'] }, as:'tasks', attributes:['id','name','email'] })

        res.json({
            message:'success',
            data:result
        })
    } catch(err) { 
        res.json({
            message:JSON.stringify(err),
        })
    }
});

app.get("/task", async function(req, res) { 
    try { 
        const result = await model.Task.findAll({ include:{ model:model.User, attributes:['id','name','email'] } , attributes:['id','title','desc','done'] })

        res.json({
            message:'success',
            data:result
        })
    } catch(err) { 
        res.status(500).json({
            message:JSON.stringify(err),
        })
    }
});

app.get("/task/:id", async function(req, res){
    try { 
        const result = await model.Task.findOne({ include:{ model:model.User, attributes:['id','name','email'] }, attributes:['id','title','desc','done']  })

        res.json({
            message:'success',
            data:result
        })

    } catch(err) { 
        res.status(500).json({
            message:JSON.stringify(err),
        })
    }
});

app.post("/task",  upload.single('picture'), async function(req, res){
    try { 
        console.log(req.body)
        console.log(req.file)
        

        // const uploadManager = new Upload.UploadManager(
        //     new Upload.Configuration({
        //       fetchApi: fetch,
        //       apiKey: "secret_FW25b5CFN135JirXswkDf7PkrHwf" // e.g. "secret_xxxxx"
        //     })
        //   );

        //   uploadManager
        //   .upload({
        
        //     // ---------
        //     // Required:
        //     // ---------
        
        //     accountId: "FW25b5C", // This is your account ID.
        
        //     // Supported types for 'data' field:
        //     // - String
        //     // - Blob
        //     // - Buffer
        //     // - ReadableStream (Node.js), e.g. fs.createReadStream("file.txt")
        //     data: text,
        
        //     // Required when: 'data' is a stream.
        //     // size: 5098,
        
        //     // ---------
        //     // Optional:
        //     // ---------
        
        //     // Required when: 'data' is a stream, buffer, or string.
        //     mime: "text/plain",
        
        //     // Required when: 'data' is a stream, buffer, or string.
        //     originalFileName: "my_file.txt",
        
        //     // Supported when: 'data' is not a stream.
        //     maxConcurrentUploadParts: 4,
        
        //     metadata: {
        //       // Up to 2KB of arbitrary JSON.
        //       productId: 60891
        //     },
        
        //     tags: [
        //       // Up to 25 tags per file.
        //       "example_tag"
        //     ],
        
        //     path: {
        //       // See path variables: https://upload.io/dashboard/docs/path-variables
        //       folderPath: "/uploads/",
        //       fileName: 'hello.txt'
        //     },
        
        //     cancellationToken: {
        //       // Set to 'true' after invoking 'upload' to cancel the upload.
        //       isCancelled: false
        //     }
        //   })
        //   .then(
        //     ({ fileUrl, filePath }) => {
        
        //       // --------------------------------------------
        //       // File successfully uploaded!
        //       // --------------------------------------------
        //       // The 'filePath' uniquely identifies the file,
        //       // and is what you should save to your DB.
        //       // --------------------------------------------
        //       console.log(`File uploaded to: ${fileUrl}`);
        
        //     },
        //     error => console.error(`Upload failed: ${error.message}`, error)
        //   );
          

        const result = await model.Task.create({
            title,
            desc,
            done, 
            user_id,
        })

        res.status(200).json({
            message:JSON.stringify(result),
        }) 

    } catch(err) { 
        res.status(500).json({
            message:JSON.stringify(err),
        }) 
    }
});

const port = 4400
app.listen(port, () => {
    console.log("server run on port : ", port)
})