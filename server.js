const express = require("express")
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

const model = require("./models/index")

app.get("/user",async function(req, res) { 
    try { 
        const result = await model.User.findAll({ include:model.Task })

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
        const result = await model.Task.findAll({ include:model.User })

        res.json({
            message:'success',
            data:result
        })
    } catch(err) { 
        res.status(500).json({
            message:JSON.stringify(err),
        })
    }
})

app.get("/task/:id", async function(req, res){ 
    try { 
        const result = await model.Task.findOne({ include:model.User })

        res.json({
            message:'success',
            data:result
        })

    } catch(err) { 
        res.status(500).json({
            message:JSON.stringify(err),
        })
    }
})

const port = 4400
app.listen(port, () => {
    console.log("server run on port : ", port)
})