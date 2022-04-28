const express = require("express")
const cors = require('cors')
const ytdl = require('ytdl-core')
const axios = require('axios')
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
app.get("/instadownload", (req,res) => {
    var instaVid = req.query.vid
    const options = {
        method: 'GET',
        url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
        params: { url: instaVid },
        headers: {'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com',
        'X-RapidAPI-Key': 'bf7e63e44cmsh29d67ebc33fa19bp11cc9bjsnf365962e6d05'}
    };
    axios.request(options).then(function (response) {
        var vid = response.data.video
        console.log(vid)
        axios.get(vid).then(RESPON => {
            console.log(RESPON.request.sws);
            res.json(RESPON.request)
            // res.redirect(vid)
            // console.log(RESPON._currentUrl)
        })
    }).catch(function (error) {
        console.error(error);
    });
})
app.listen(4000, () => {
    console.log("[🎉] API Launched")
})