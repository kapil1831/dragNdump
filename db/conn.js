// const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.ATLAS_URI;
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connObj = await mongoose.connect(connectionString);
        console.log(`Successfully connected to mongodb @ : ${connObj.connection.host} `);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB;

// deprecated
//using MongoDB node.js driver

//let db;
// MongoClient.connect(url, (err, client) => {
//     db = client.db('db1');
//     console.log(db);
// });

// const client = new MongoClient(connectionString/*"mongodb+srv://kapil1207310meena:password@dragndump.rmcwtu9.mongodb.net/?retryWrites=true&w=majority"*/, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }); //create client object
//module.exports = client


// module.exports = {
//     // connecting to the data base server with database sampleflix (hardcoded)
//     connectToServer: (callback) => {
//         //connect to default database
//         client.connect((err, db) => {
//             if (err || !db) {
//                 return callback(err);
//             }
//             dbConnection = db.db("db1");
//             console.log("Successfully connected to MongoDB.");
//             return callback(err);
//         });
//     },
//     // connectToOtherDB: (callback, db_name) => {
//     //     client.connect((err, db) => {
//     //         if (err || !db) {
//     //             return callback(err);
//     //         }
//     //         db2Connection = db.db(db_name);
//     //         console.log(`Successfully connected to MongoDB ${db_name} database`);
//     //         return callback(err);
//     //     });
//     // },
//     getDb: () => dbConnection,
//     //getDb2: () => db2Connection,
// };