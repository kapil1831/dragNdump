const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = require('./db/conn');
const { Record } = require('./models/recordModel');

connectDB();


//create instance of express
const app = express();


// init midlleware body parser 
app.use(express.json()); // built in body parser
app.use(express.urlencoded({ extended: false }));// to handle url encoded data


//middleware
const fetch = (req, res, next) => {
    //console.log(req.path);
    if (req.path === '/') {
        next();
    }
    else res.send("not found");

}

//handlebar route
app.get('/', async (req, res) => {
    // get data for diplaying either direct access to the database or use api;
    let problems = [];

    try {
        problems = await Record.find().lean();
    } catch (e) {
        console.log(e);
        res.status(400).send("Error fetching db1 records!");
    }
    console.log(problems);
    problems.forEach((value) => { console.log(value.question) })
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
    console.log(`Server started at port ${PORT}`);
});