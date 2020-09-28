const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = "Tasks";
const password = 'KUxGwZf2S9Reqy1g';
const dbName = "Tasks";

// const { user, password, dbName } = data; 

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${password}@cluster0.vetwi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Tasks").collection("Todos");
    //   console.log('database connected');
    //   client.close();

    app.post('/addTask', (req, res) => {
        // const task = {heading: 'AMi roky', description: 'I am Roky Das. pade tush thash'}
        const task = req.body;
        collection.insertOne(task)
        .then(result => {
            // console.log(result);
            res.redirect('/');
        })
    })

    app.get('/tasks', (req, res) => {
        // collection.find({}).limit(5)
        collection.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })
    })
});



app.get('/', (req, res) => {
    // res.send('Hello I am your new node js project');
    res.sendFile('index.html' , { root : __dirname});
})

app.listen(3000);