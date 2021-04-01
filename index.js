const express = require('express');
const Datastore = require("nedb");
const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/questions', (request, response) => {
    const data = request.body;
    database.insert(data, function (err, newDoc) {
        response.json(newDoc._id);
    });
});

app.post('/getquestions', (request, response) => {
    database.findOne({ _id: request.body.id }, function (err, doc) {
        if(err){
            response.end()
            return;
        }
        console.log(request.body);
        response.json(doc)
      });
});