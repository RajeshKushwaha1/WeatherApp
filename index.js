const http = require("http");
const ejs = require("ejs");
const path = require('path');
const https = require('https');
const express = require('express');
const app = express();
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'));
app.get("/", (req, res)=>{
    https.get('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=2ae5e977fef30cf60b520948e8e65afa', (response)=>{
        let body= '';
        response.on('data', (chunck)=>{
            body += chunck;
        });
        response.on('end', ()=>{
            let jsonBody = JSON.parse(body);
            console.log(jsonBody);
            res.render('home', {
                        location: jsonBody.name,
                        country: jsonBody.sys.country,
                        temprature: jsonBody.main.temp,
                        tMin: jsonBody.main.temp_min,
                        tMax: jsonBody.main.temp_max
                    })
        })
    })
})
app.listen(8000, "127.0.0.1", () => {
    console.log(`server is running on port🚀: 8000`)
});