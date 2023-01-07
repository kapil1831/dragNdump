// methods for database operations;

async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases();
    console.log("Databases : ");
    dbList.databases.forEach((db) => {
        console.log(` - ${db.name}`);
    });
}

async function createRecordDB(client, db_name, col_name, record) {
    const result = await client.db(db_name).collection(col_name).insertOne(record);
    console.log(`Successfully added record to database ${db_name}'s collection ${col_name} with id : ${result} `);
}

async function readAllRecords(client, db_name, col_name) {
    const result = await client.db(db_name).collection(col_name).find({}).limit(20).toArray();
    return result;
}

async function readRecordById(client, db_name, col_name, recordId) {
    const result = await client.db(db_name).collection(col_name).find({ _id: recordId });
    if (result) {
        console.log(`record found with id : ${recordId}`);
        return result;
    } else {
        console.log(`No record with Id : ${recordId}`);
    }
}


async function updateRecordById(client, db_name, col_name, oldRecordId, newRecord) {

}

async function deleteRecordById(client, db_name, col_name, recordId) {

}


module.exports = { listDatabases, readAllRecords, createRecordDB, readRecordById, updateRecordById, deleteRecordById };
