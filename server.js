const express = require("express")
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()

app.use(cors())

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get("/download",(req,res)=>{
    var url = req.query.url
    var type = req.query.type
    if(type == undefined||!type){
        type="mp4"
    }
    if(url == undefined||!url){
        res.send("Err")
        return
    }
    res.header("Content-Disposition",`attachment; filename="video.${type}"`)
    ytdl(url,{
        format: type
    }).pipe(res)
})
app.listen(4000, () => {
    console.log("[🎉] API Launched")
})