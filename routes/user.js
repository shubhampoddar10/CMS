const express = require("express");
const router = express.Router();
const connect = require("../connection/connectMongo");
const mandatoryFields = require("../lib/mandatoryFields");
const token = require("../lib/token");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res, next) => {
  try {
    console.log("req", req.body);
    if (!mandatoryFields.mandatoryFieldsForSignUp(req.body)) {
      res.status(400).json({ message: "Mandatory fields are missing" });
      return;
    }

    const password = await bcrypt.hash(req.body.password, saltRounds);
    console.log("password", password);
    const userToken = await token.creatToken({ email: req.body.email });
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      token: userToken,
    }; 
    if(req.body.userType) {
      userData.userType = req.body.userType;
    } else {
      userData.userType = 'Client';
    }
    await connect.add("user", userData);
    res.json({ token: userToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log('req',req.body);
    if (!mandatoryFields.mandatoryFieldsForLogin(req.body)) {
      return res.status(400).json({ message: "Mandatory fields are missing" });
    }
    const queryToGetUserData = { email: req.body.email };
    const result = await connect.getById("user", queryToGetUserData, {});
    if (!result) {
      res.status(400).json({ message: "Email is incorrect" });
    };

    await bcrypt.compare(req.body.password, result.password);

    const userToken = await token.creatToken({ email: req.body.email });
    const saveUserToken = {
      $set: {
        token: userToken,
      },
    };
    await connect.updateOne("user", saveUserToken, queryToGetUserData);
    const userData = {
      email: result.email,
      firstName: result.firstName,
      userType: result.userType,
      token: userToken
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/token", async (req, res, next) => {
  try {
    if (!req.body.email) {
      res.status(400).json({ message: "Mandatory email is missing" });
    }
    const userToken = await token.creatToken({ email: req.body.email });
    const userData = {
      $set: {
        token: userToken,
      },
    };
    const queryToGetUserData = { email: req.body.email };
    await connect.update("user", userData, queryToGetUserData);
    res.json({ token: userToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/self", async (req, res, next) => {
  try {
    console.log("req", req.headers);
    if (!req.headers.token) {
      res.status(400).json({ message: "Mandatory token is missing" });
    }
    const userToken = await token.getToken(req.headers.token);
    console.log("userToken", userToken);

    const queryToFetchData = { email: userToken.email };
    const projectData = { name: 1, email: 1, token: 1 };
    const result = await connect.getById("user", queryToFetchData, projectData);
    console.log("result", result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
