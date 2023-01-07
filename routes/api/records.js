const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();


//const problems = require('./../../sample_problems');

const mongoClient = mongodb.MongoClient;

//create router
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /problems.
const router = express.Router();



// from the controller
const { readRecords, createRecord, updateRecordById, deleteRecordById } = require('../../controllers/recordController');

//get request to read records from database
router.get('/', readRecords);

//post request to insert a record in database
router.post('/', createRecord);

//put request to update records in database
router.put('/:id', updateRecordById);

//delete request to delete a record from database
router.delete('/:id', deleteRecordById);

// router.get('/db1', async (req, res) => {
//     let data = [];
//     try {
//         await client.connect();
//         data = await client.db("db1").collection("dragNdump").find({}).toArray();
//         res.json(data);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("Error fetching db1 records!");
//     } finally {
//         await client.close();
//     }
// });


module.exports = router;