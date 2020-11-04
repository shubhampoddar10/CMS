const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = require("../config.json").db;

let db;
let client;

const connectDb = async () => {
  try {
    if (db) {
      console.log("already connected");
    }
    client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected correctly to server");
    db = client.db(dbName);
  } catch (err) {
    throw Error(err);
  }
};

const deleteById = async (collectionToDelete, query, projection) => {
  try {
    return await db.collection(collectionToDelete).updateOne(query, {$set: {disable: 1}});
  } catch (err) {
    throw Error(err)
  }
}

const getById = async (collectionToGet, query, projection) => {
  try {
    return await db.collection(collectionToGet).findOne(query,projection);
  } catch (err) {
    throw Error(err);
  }
};

const get = async (collectionToGet, query) => {
  try {
    return await db.collection(collectionToGet).find(query).toArray();
  } catch (err) {
    throw Error(err);
  }
};

const add = async (collectionToAdd, dataToInsert) => {
  try {
    return await db.collection(collectionToAdd).insertOne(dataToInsert);
  } catch (err) {
    throw Error(err);
  } 
};

const updateOne = async (collectionToAdd, dataToUpate, query) => {
  try {
    const result = await db.collection(collectionToAdd).updateOne(query, dataToUpate);
    return result;
  } catch (err) {
    console.log('err1',err);
    throw Error(err);
  }
};

// const delete = async (collectionToDelete, dataToDelete, query) => {
//   try {
//     return await db.collection(collectionToDelete).deleteOne(query, dataToDelete);
//   } catch (err) {
//     throw Error(err); 
//   }
// };

module.exports = {
  connectDb,
  getById,
  get,
  add,
  updateOne,
  deleteById
};
