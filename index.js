const http = require("http");
const fs = require("fs"); //fs for file system
// const path =  require("path");
var requests = require("requests");
// const express = require('express');
// const app = express();

// app.use(express.static(__dirname + './assets/css'));

// console.log(path.join(__dirname, "./assets"));
// const staticPath = path.join(__dirname, "./assets/css/style.css");
// console.log(staticPath);
//static Files
// app.use(express.static(staticPath));
// app.use('/css',express.static(__dirname + 'assets/css'));
// app.use('/js',express.static(__dirname + 'assets/js'));


// app.get('/',(req, res) =>{
//     res.send("hello world");
// });

//const { clearScreenDown } = require("readline");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    // temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{tempstatus}", orgVal.weather[0].main);
    return temperature;
};

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=2ae5e977fef30cf60b520948e8e65afa",
        )
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrData = [objdata]
                //console.log(arrDta[0].main.temp);
                const realTimeData = arrData.map((val) => replaceVal(homeFile, val))
                    .join("");
                res.write(realTimeData);
                //    console.log(realTimeData); 
                // console.log(val.main);

            })
            .on("end", (err) => {
                if (err) return console.log(`connection close due to errors`, err);
                //console.log("end");
                res.end();

            });
    }

});

server.listen(8000, "127.0.0.1", () => {
    console.log(`server is running on port🚀: 8000`)
});