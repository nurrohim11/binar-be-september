const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(403).json({message:"Access denied."});

        const decoded = jwt.verify(token, 'secret-crud-jwt');
        if (decoded.type == 'refresh_token') {
          return res.status(403).json({message:"Invalid token"});
        }
        req.user = decoded;
        // {
        //     "id":1,
        //     "name":"Sabrina",
        //     "role":"admin"
        // }
        next();
    } catch (error) {
        res.status(401).json({message:error.message});
    }
};
