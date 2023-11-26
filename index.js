var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://AdvaitChirmule:advait@hospitalmanagement.8bstrrq.mongodb.net/"

const express = require("express");
const bodyParser = require("body-parser")
var deleted = 1;
var index2 = 1;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection('customers').find({}).toArray((err, result) => {
        if (err) return console.log(err);
        var length1 = result.length;
        if (length1 > 0) {
            index2 = result[result.length - 1]['Sr'] + 1
        }
    });
});
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("mydb").collection("customers");
    var length1 = collection.length;
    if (length1 > 0) {
        index2 = collection[collection.length - 1]['Sr'] + 1
    }
});

// New app using express module
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    app.use(express.static(__dirname));
});

app.post('/clicked', (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("mydb").collection("customers");
        collection.find({}).toArray((err, result) => {
            if (err) return console.log(err);
            var length1 = result.length;
            if (length1 > 0) {
                index2 = result[result.length - 1]['Sr'] + 1
            }
            res.send(result);
        });
    });
});

app.post('/clicked2', (req, res) => {
    deleted = 0;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("mydb").collection("customers");
        var myobj = [
            { Sr: index2, Patient: "Ajay Gaitonde", Details: { Floor: 7, Room: 702 }, Illness: "Dialysis", Cost: 700000 },
            { Sr: Number(index2 + 1), Patient: "Parvati Mittal", Details: { Floor: 5, Room: 512 }, Illness: "Thyroid", Cost: 50000 },
            { Sr: Number(index2 + 2), Patient: "Drishya Ganesh", Details: { Floor: 2, Room: 211 }, Illness: "Diabetes", Cost: 200000 }
        ];
        index2 = index2 + 3;
        collection.insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
    });
});

app.post("/", function (req, res) {
    var checkthis = Object.keys(req.body);
    if (req.body.hasOwnProperty("button3")) {
        deleted = 0;
        console.log(checkthis)
        console.log(checkbutton1)
        var name1 = req.body.name1;
        var floor1 = req.body.floor1;
        var room1 = req.body.room1;
        var illness1 = req.body.illness1;
        var cost1 = req.body.cost1;
        var myobj1 = [{ Sr: index2, Patient: name1, Details: { Floor: Number(floor1), Room: Number(room1) }, Illness: illness1, Cost: Number(cost1) }]
        index2 = index2 + 1;
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            const collection = client.db("mydb").collection("customers");
            collection.insertMany(myobj1, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
            });
            res.status(204).send();
        });
    }
    else {
        var checkbutton1 = checkthis[0];
        var checkbutton = checkbutton1.slice(0, 7)
        if (checkbutton == 'dbutton') {
            var srno = checkbutton1.substring(7)
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                const collection = client.db("mydb").collection("customers");
                var myobj2 = { Sr: Number(srno) };
                collection.deleteOne(myobj2, function (err, res) {
                    if (err) throw err;
                    console.log("Document deleted");
                });
                res.status(204).send();
            });
        }
        else {
            var checkbutton1 = checkthis[2];
            var checkbutton = checkbutton1.slice(0, 7)
            console.log(checkthis)
            console.log(checkbutton1)
            if (checkbutton == 'ebutton') {
                var srno = checkbutton1.substring(7)
                console.log(srno)
                const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(err => {
                    const collection = client.db("mydb").collection("customers");
                    var change = req.body.newValue1;
                    var change2 = req.body.newValue2;
                    if (change == 'Floor') {
                        var myobj4 = { $set: { Details: { Floor: Number(change2) } } };
                    }
                    else if (change == 'Room') {
                        var myobj4 = { $set: { Details: { Room: Number(change2) } } };
                    }
                    else if (change == 'Cost') {
                        var myobj4 = { $set: { Cost: Number(change2) } };
                    }
                    else {
                        var myobj4 = { $set: { [change]: change2 } };
                    }
                    var myobj3 = { Sr: Number(srno) };
                    collection.updateOne(myobj3, myobj4, function (err, res) {
                        if (err) throw err;
                        console.log("Document edited");
                    });
                    res.status(204).send();
                });
            }
        }
    }
});

app.post('/clicked4', (req, res) => {
    if (deleted == 0) {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            const collection = client.db("mydb").collection("customers");
            collection.drop(function (err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection deleted");
                index2 = 1;
                deleted = 1;
            });
        });
    }
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
