const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
const authHeader = req.header('Authorization');
if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });


const parts = authHeader.split(' ');
if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Token format is Bearer <token>' });


const token = parts[1];
// console.log(token)
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded.user; 
next();
} catch (err) {
return res.status(401).json({ message: 'Token is not valid' });
}
};