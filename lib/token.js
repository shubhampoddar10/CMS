var jwt = require("jsonwebtoken");
const creatToken = async (params) => {
  try {
    const token = jwt.sign(params, "shhhhh", { expiresIn: "1h" });
    console.log('token',token);
    return token;
  } catch (err) {
    throw Error(err);
  }
};

const getToken = async (token) => {
  try {
    const tokenDecode = jwt.verify(token, "shhhhh");
    return tokenDecode;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  creatToken,
  getToken,
};
