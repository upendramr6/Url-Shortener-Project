const express = require("express");

const path = require('path');

const {mongoDbConnect} = require("./connecton")

const urlRouter = require("./routes/url");

const URL = require("./models/url")

const app = express()

const PORT = 8001;


mongoDbConnect("mongodb://localhost:27017/short-url")

app.set("view engine", "ejs");

app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', async(req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls : allUrls
    })
});

app.use("/url", urlRouter);

app.get('/url/:shortid', async(req,res)=>{
    const shortId = req.params.shortid
   const entry = await URL.findOneAndUpdate({shortId},
    {$push : {
        visitHistory: {
            timestamp: Date.now()
        }
    }}
   );
   if(!entry){
    res.status(404).send('URL not found')
   }else {
    res.redirect(entry.redirectURL)
   }
   
})


app.listen(PORT, ()=>[
    console.log(`server started at ${PORT}`)
])