const jwt = require("jsonwebtoken");
const result = require("./result");
const config = require("./config");

function myAuth(req, res, next) {
  const allowedUrls = ["/users/signup", "/users/signin"];
  const url = req.url;
  if (allowedUrls.includes(url)) {
    // If the url is for register and login we dont need to check the token
    next();
  } else {
    // If the url is for other then register and login we need to check the token
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      try {
        //get the payload out of the fetched token
        const payload = jwt.verify(token, config.secret);
        // add the user data in the request object for the further routes
        req.user_id = payload.user_id;
        next();
      } catch (error) {
        res.send(result.createResult("Token is invalid"));
      }
    } else res.send(result.createResult("Token is missing"));
  }
}

module.exports = myAuth;
