const express = require('express')
const ytdl = require('ytdl-core')
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: 'https://ytdl-shadowwolf.vercel.app',
    credentials: true,
  };

var cors = require("cors");
app.use(cors(corsOptions));

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

app.listen(4000, () => {
    console.log(`Server is running on PORT: 4000`)
})