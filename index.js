const app = require("express")();
const bodyParser = require("body-parser");
fs = require("fs");

const port = /*process.env.PORT ||*/ 7777;

// parse application/json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", function(req, res) {
  res.send("<h1>Hello Node.js</h1>");
});

app.post("/getlang", function(req, res) {
  const json = req.body;
  console.log(json);
  let filename = "";
  switch (json.lang) {
    case "de":
      filename = "deu-eng.txt";
      break;
    case "fr":
      filename = "fra-eng.txt";
      break;
  }
  fs.readFile(__dirname + "/lang/" + filename, "utf8", function(err, data) {
    if (err) {
      res.send("err: " + err);
    }
    res.send(data);
  });
});
app.listen(port, function() {
  console.log("Starting node.js on port localhost:" + port);
});
