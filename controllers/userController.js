const User = require('../models/User');


const register = async (req, res) => {
try {
const { name, email, password } = req.body;
const result = await User.register(name, email, password );
return res.status(201).send({ success: true,message:"user created successfully", user: result.user });
} catch (err) {
console.error(err);

return res.status(500).send({ success: false,message: err.message || 'Server error' });

}
};


const login = async (req, res) => {
try {
const { email, password } = req.body;
const result = await User.login( email, password );
return res.status(201).send({ success: true,message:"login successfully", token : result.token });
} catch (err) {
console.error(err);
return res.status(500).send({ success: false,message: err.message || 'Server error' });
}
};

module.exports = { register, login };