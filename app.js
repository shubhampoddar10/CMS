const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = require('./config.json').port;
const connect = require("./connection/connectMongo");
const cors = require('cors');
const cache = require("./connection/connectRedis");
const token = require("./lib/token");

const user = require("./routes/user");
const inquiery = require("./routes/inquiery");
const jobCard = require("./routes/jobCard")
const logger = require("./lib/logger");

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/users',user);
app.use( async function (req, res, next) {
    try{
        const result = await token.getToken(req.headers.token);
        next();
    } catch(err){
        res.status(401).send({Message: 'unauthorized access'});
    }

} );
app.use('/inquiery',inquiery);
app.use('/enquiry', jobCard);

app.get('/',async (req,res) => {
    logger.log('info',`wrong params`);
    res.status(400).send({Message: 'Invalid End Point'})
})

app.listen(port, async () => {
    await connect.connectDb();
    logger.info(`server started at port : ${port}`);
})

