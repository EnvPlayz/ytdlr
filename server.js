const express = require("express")
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()

app.use(cors())

app.get("/",(req,res)=>{
    res.status(404)
    res.end()
})
app.get("/download",(req,res)=>{
    var url = req.query.url
    var type = req.query.type
    var name="video"
    if(type=="mp4"){
        name="video"
    }
    if(type=="mp3"){
        name="audio"
    }
    if(type == undefined||!type){
        type="mp4"
    }
    if(url == undefined||!url){
        res.redirect("https://ytdlr.ml/?alt=err")
        return
    }
    res.header("Content-Disposition",`attachment; filename="${name}.${type}"`)
    ytdl(url,{
        format: type
    }).pipe(res)
})
app.listen(4000, () => {
    console.log("[🎉] API Launched")
})