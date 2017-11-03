
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var id;
var allId = [];

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function uniqueIdMaker() {
    id = Math.floor(Math.random() * 100);
    for (var i = 0; i < allId.length; i++) {
        if (id = allId[i]) {
            uniqueIdMaker();
        } else {
            allId.push(id);
            return id;
        }
    }
}



var seatedTables = [
    {
        routeName: "smith",
        name: "Bob Smith",
        phone: "",
        email: "",
        uniqueId: uniqueIdMaker()
    },
    {
        routeName: "weasley",
        name: "Weasley",
        phone: "",
        email: "",
        uniqueId: uniqueIdMaker()
    },
    {
        routeName: "rambo",
        name: "Rambo",
        phone: "",
        email: "",
        uniqueId: uniqueIdMaker()
    },
    {
        routeName: "kobe",
        name: "Kobe Bryant",
        phone: "",
        email: "",
        uniqueId: uniqueIdMaker()
    },
    {
        routeName: "snow",
        name: "John Snow",
        phone: "",
        email: "",
        uniqueId: uniqueIdMaker()
    },
    {
        routeName: "silver",
        name: "Adam Silver",
        phone: "",
        email: "",
        uniqueId: uniqueIdMaker()
    }
];

var waitList = [];

app.use(express.static('public'));

app.get("/", function (request, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/tables", function (req, res) {
    res.json(seatedTables);
});

app.get("/api/waitList", function (req, res) {
    res.json(waitList);
});

app.get("/api/tables", function (req, res) {
    res.json(seatedTables);
});

app.get("/api/:seatedTables?", function (req,res) {
    var selected = req.params.seatedTables;

    if (selected) {
        console.log(selected);

        for (var i = 0; i < seatedTables.length; i++) {
            if (selected === seatedTables[i].routeName) {
                return res.json(seatedTables[i]);
            }
        }
        return res.json(false);
    }
    return res.json(seatedTables);
});



//  Reserve Button





app.post("/api/newreserve", function (req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    waitList.push(newReservation);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


