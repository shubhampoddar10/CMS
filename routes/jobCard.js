const express = require("express");
const router = express.Router();
const connect = require("../connection/connectMongo");
const mandatoryFields = require("../lib/mandatoryFields");
const ObjectId = require('mongodb').ObjectID;

router.post('/jobcard', async(req, res, next) => {
    try {
        if(!mandatoryFields.mandatoryFieldsForJobCard(req.body)) {
            res.status(500).json('Mandatory Fields are missing!')
            return;
        }
        const result = await connect.add('jobCard', req.body)
        console.log(1,result);
        res.json({ message: "Submitted!", data: result });
        console.log(2);
    }
    catch(err) {
        console.log(3,err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobcard', async(req, res, next) => {
    try {
        const jobCardRes = await connect.get('jobCard', {})
        res.json({result: jobCardRes})
    }
    catch(err) {
        res.json({message: err.message})
    }
})

router.get('/jobcard/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const jobCardRes = await connect.getById('jobCard', {'_id': ObjectId(id)})
        res.status(200).json({message: 'Job Card found!', data: jobCardRes})
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/jobCard/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const jobCardRes = await connect.updateOne('jobCard', {$set: req.body}, {'_id': ObjectId(id)}, {new: true})
        res.status(201).json({
            message: 'Updated Successfully',
            data: jobCardRes
        })
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.delete('/jobcard/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const jobCardRes = await connect.deleteById('jobCard', {'_id': ObjectId(id)})
        res.status(201).json({
            message: 'Deleted!',
            data: jobCardRes
        })
    } catch(err) {
        res.status(500).json({message: err.message})   
    }
})

module.exports = router;