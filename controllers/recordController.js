
// get client object
const client = require("../db/conn");
// const dbops = require("./../../db/dbops");
const { createRecordDB } = require('../db/dbops');
const uuid = require("uuid");


// const Record = require('../models/recordModel');


//get request controller to read records from database
// @desc Get records
// @route GET /api/records
// @access private
const readRecords = async (req, res) => {
    // const problems = await Record.find();

    let problems = [];
    try {
        await client.connect();
        problems = await client.db("db1").collection("dragNdump").find({}).toArray();
        // res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error fetching db1 records!");
    } finally {
        await client.close();
    }
    res.json(problems);
};

//post request controller to insert a record in database
// @desc create records
// @route POST /api/records
// @access private
const createRecord = async (req, res) => {
    let problem = {
        //id: uuid.v4(),
        question: req.body.question,
        description: req.body.question_desc,
        link: req.body.link,
        sol: req.body.solution,
    };

    //checking for post data if empty show error(custum error Handler)
    if (!req.body.question || !req.body.question_desc || !req.body.link || !req.body.solution) {
        res.status(400).json({ msg: "enter all details" });
    }
    //console.log(req.body);
    // if (!problem.question || !problem. || !problem.sol) {
    //     return res.status(400).json({ msg: "enter all details" });
    // }



    try {
        await client.connect();
        await createRecordDB(client, "db1", "dragNdump", problem);
        // redirect('/')
    } catch (e) {
        console.log(e);
        res.status(400).send("Error fetching db1 records!");
    } finally {
        await client.close();
    }

    //res.redirect('/');
    res.status(200).json({ msg: "record created" });
    //res.render('/problems', { problems });
}

//put request controller to update records in database
// @desc update record by id
// @route PUT /api/records/:id
// @access private
const updateRecordById = (req, res) => {
    res.status(200).json({ msg: `record updated with id : ${req.params.id}` })
}


//delete request controller to delete records in database
// @desc delete record by id
// @route DELETE /api/records/:id
// @access private
const deleteRecordById = (req, res) => {
    res.status(200).json({ msg: `record deleted with id : ${req.params.id}` })
}

module.exports = {
    readRecords,
    createRecord,
    updateRecordById,
    deleteRecordById,
}