
// get client object

// import Record Model
const { Record } = require('../models/recordModel');


//get request controller to read records from database
// @desc Get records
// @route GET /api/records
// @access private
const readRecords = async (req, res) => {

    let problems = [];
    try {
        problems = await Record.find().lean();
        // await client.connect();
        // problems = await client.db("db1").collection("dragNdump").find({}).toArray();
        // res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error fetching db1 records!");
    }
    res.json(problems);
};

//post request controller to insert a record in database
// @desc create records
// @route POST /api/records
// @access private
const createRecord = async (req, res) => {
    let problem = {
        question: req.body.question,
        description: req.body.question_desc,
        link: req.body.link,
        solution: req.body.solution,
    };

    //checking for post data if empty show error(custum error Handler)
    if (!req.body.question || !req.body.question_desc || !req.body.link || !req.body.solution) {
        res.status(400).json({ msg: "enter all details" });
    }
    let result;
    try {
        result = await Record.create(problem);
    } catch (e) {
        console.log(e);
        res.status(400).send("Error fetching db1 records!");
    }
    res.status(200).json(result);
}

//put request controller to update records in database
// @desc update record by id
// @route PUT /api/records/:id
// @access private
const updateRecordById = async (req, res) => {
    const id = req.params.id;
    let result;
    try {
        const problem = await Record.findById(id);

        if (!problem) {
            res.status(400);
            throw new Error(`Problem with ${id} not found`);
        }
        result = await Record.findByIdAndUpdate(id, req.body, { new: true });

    } catch (e) {
        console.log(e);
        res.status(400).send("Error fetching db1 records!");
    }

    res.status(200).json({ msg: `record updated with id : ${req.params.id}`, result })
}


//delete request controller to delete records in database
// @desc delete record by id
// @route DELETE /api/records/:id
// @access private
const deleteRecordById = async (req, res) => {
    const id = req.params.id;
    let result;
    try {
        const problem = await Record.findById(id);

        if (!problem) {
            res.status(400);
            throw new Error(`Problem with ${id} not found`);
        }
        result = await problem.remove();
    } catch (e) {
        console.log(e);
        res.status(400).send("Error fetching db1 records!");
    }
    res.status(200).json({ msg: `record deleted with id : ${req.params.id}` })
}

module.exports = {
    readRecords,
    createRecord,
    updateRecordById,
    deleteRecordById,
}