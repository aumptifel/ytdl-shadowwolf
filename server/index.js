const express = require('express')
const ytdl = require('ytdl-core')

const app = express();

var cors = require("cors");
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://ytdl-shadowwolf.vercel.app'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/download', async (req, res) => {
    try {
        const url = req.query.url
        const videoId = await ytdl.getURLVideoID(url)
        const metaInfo = await ytdl.getInfo(url)
        let data = {
            url: 'https://www.youtube.com/embed/'+videoId,
            info: metaInfo.formats
        }
        return res.send(data)
    } catch(error) {
        return res.status(500)
    }
})

app.use("/", (req, res) => {
    res.send("Server is runing.");
})

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Server is running on PORT: 4000`)
})