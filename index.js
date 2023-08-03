import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// const { JSDOM } = require("jsdom");
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res)=> {
    res.render("index.ejs", {showName: "", imgSrc: "", summaryOfShow: ""});
});
app.post("/search", async (req, res)=> {
    try {
    const showname = req.body.tvShowSearchBox;
    const result = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${showname}`);
    console.log(showname);
    const response = result.data;   
    // const dom = new JSDOM(response.summary);
    res.render("index.ejs", {showName: response.name, imgSrc: response.image.original, summaryOfShow: response.summary });
    
    console.log(response.summary);
} catch(error) {
    console.log(error.message);
    res.status(500);
}
});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});