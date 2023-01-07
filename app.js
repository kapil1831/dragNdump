const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { errorHandler } = require('./middleware/errorMiddleware');
//const problems = require('./sample_problems');
const dotenv = require('dotenv');
dotenv.config();

const client = require("./db/conn");


//create instance of express
const app = express();


// init midlleware body parser 
app.use(express.json()); // built in body parser
app.use(express.urlencoded({ extended: false }));// to handle url encoded data

// const api = require('./routes/api/records');
// const { get } = require('http');


//middleware
const fetch = (req, res, next) => {
    //console.log(req.path);
    if (req.path === '/user') {
        next();
    }
    else res.send("not found");

}

//handlebar route
app.get('/', fetch, async (req, res) => {
    // get data for diplaying either direct access to the database or use api;
    let problems = [];

    //   let res =  get('/routes/api/records')
    //   let data =res.body // data

    try {
        await client.connect();
        problems = await require('./db/dbops').readAllRecords(client, "db1", "dragNdump");
    } catch (e) {
        console.log(e);
        res.status(400).send("Error fetching db1 records!");
    } finally {
        await client.close();
    }
    res.render('index', { problems });
});

app.get('/problems', async (req, res) => {
    let data = [];
    res.render('problems', { data });
});

// handlebars middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//api routes
app.use('/api/records', require('./routes/api/records'));


//static pages
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });
    console.log(`Server started at port ${PORT}`);
});