/* MongoDB Related Code */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'shutter_requests';
const collectionName = 'requests'
// Create a new MongoClient

/* Mongo DB Ends*/

function readRequests(findParams, callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection= db.collection(collectionName)

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}
function readStats(callback){
     var client = new MongoClient(url);
     client.connect((err)=>{
         assert.equal(null, err);
         //console.log("Connected successfully to server");

         const db = client.db(dbName);
         const collection= db.collection(collectionName)
         collection.countDocuments({},function(err, cnt1) {
             assert.equal(err, null);
             collection.countDocuments({"munkas" : ""},function(erro, cnt2) {
                 assert.equal(erro, null);
                 client.close();
                 callback({allorders:cnt1, unacceptedorders: cnt2})
             });
         });
     })
}

function readAllRequests(callback){
    readRequests({},(result) => {callback(result)})
}

function readRequestsOfStudent(studentId,callback){
    readRequests({"student.studentId" : studentId},(result) => {callback(result)})
}

function createRequest(request,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection= db.collection(collectionName)

        collection.insertOne(request,(err,r)=>{
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
            callback()
        })
    })
}
function acceptRequest(request,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection= db.collection(collectionName)
        var myquery = { sign: request.munkacode };
        var newvalues = { $set: {munkas: request.munkasname } };

       collection.updateOne(myquery, newvalues , function(err, r) {
           assert.equal(null, err);
           assert.equal(1, r.result.nModified);
           client.close();
           callback()
       })
        })
}

module.exports = {
    "createRequest" : createRequest,
    "readRequests" : readAllRequests,
    "readRequestsOfStudent" : readRequestsOfStudent,
    "acceptRequest" : acceptRequest,
    "readStats" : readStats
}