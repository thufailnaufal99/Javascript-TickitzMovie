
const jwt = require("jsonwebtoken");
const respone = require("../helpers/respone");

const authValidate = (role) => {
  return (req, res, next) => {
    const { authtoken } = req.headers;
    if (!authtoken) {
      return respone(res, 401, "Silahkan login terlebih dahulu");
    }
    jwt.verify(authtoken, process.env.JWTkey, (error, decode) => {
      if (error) {
        return respone(res, 401, error, true);
      } else if (role.includes(decode.role)) {
        req.decode = decode;
        next();
      } else {
        return respone(res, 401, "Anda tidak memiliki akses ke sini");
      }  
    });
  }
}


module.exports = authValidate
