const jwt = require("jsonwebtoken");

module.exports = {
  authenticate(req, res, next) {
    console.log(req);
    console.log(req.cookies);

    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if(err) {
          res.status(401).json({ verified: false });
        } else {
          // call the function in the controller that we are supposed
          //    to go to when they requested the data
          // we are a valid / authenticated user!
          next();
        }
      }
    )
  }
}