const express = require("express");
const router = express.Router();
const connect = require("../connection/connectMongo");
const mandatoryFields = require("../lib/mandatoryFields");
const ObjectId = require('mongodb').ObjectID;

router.post("/request", async (req, rese, next) => {
  try {
    console.log("calling post api:", req.body);
    if (!mandatoryFields.mandatoryFieldsForlogisticRequest(req.body)) {
      console.log(6);
      rese.status(400).json({ message: "Mandatory fields are missing" });
      return;
    }

    const result = await connect.add("inquieryRequest", req.body);
    console.log(1,result);
    rese.send({ message: "Requested successfully" });
    console.log(2);
  } catch (err) {
    console.log(3,err);
    rese.status(500).json({ message: err.message });
  }
}); 

router.delete("/request/:id", async (req, res) => {
  console.log("calling delete api:", req.params);
    try {
    const id = req.params.id;
    const inquieryResult = await connect.deleteById("inquieryRequest", {'_id': ObjectId(id)})  
    console.log('inquieryResult',inquieryResult); 
    res.json(inquieryResult)
    } catch (err) {
      res.status(500).json({ message: err.message})
    } 
    
})

router.patch('/request/:id', async (req, res) => {
  console.log("calling patch api:", req.params);
  console.log("body",req.body);
  try {
    const id = req.params.id;
    const inquieryResult = await connect.updateOne("inquieryRequest", {$set: req.body}, {'_id': ObjectId(id)})
    res.status(200).json(inquieryResult)
  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
  }
})

router.get("/request", async (req, res, next) => {
  console.log("calling get all api:");
  try {
    const inquieryResult = await connect.get("inquieryRequest", {disable: {$ne: 1}});
    res.json(inquieryResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/request/:id', async(req,res) =>{
  console.log("calling get by id api:", req.params);
  try{
    const id = req.params.id;
    const inquieryResult = await connect.getById("inquieryRequest",{'_id': ObjectId(id)})
    res.json(inquieryResult)
  } catch(err){
    res.status(500).json({ message: err.message })
  }
})

router.post("/mode/transport", async (req, res, next) => {
  try {
    console.log("req", req.body);
    if (!mandatoryFields.mandatoryFieldsForTransportMode(req.body)) {
      res.status(400).json({ message: "Mandatory fields are missing" });
    }

    await connect.add("transportMode", req.body);
    res.json({ message: "Trasnport Mode Added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/mode/transport", async (req, res, next) => {
  try {
    const inquieryResult = await connect.get("transportMode", {});
    res.json(inquieryResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
