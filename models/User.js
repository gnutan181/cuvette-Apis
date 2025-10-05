const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
name: { type: String ,required: true},
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
}, { timestamps: true });


userSchema.statics.register = async function(name, email, password) {
    console.log(name, email, password);
const existingUser = await this.findOne({ email }); 
if (existingUser) {
throw new Error('Email already in use');
}  
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt); 
  const user = await this.create({ name, email, password: hashedPassword });
return user;
}

userSchema.statics.login = async function(email, password) {
const user = await this.findOne({ email });
if (!user) {
throw new Error('Invalid email or password');
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
throw new Error('Invalid email or password');
}     
const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
return {user,token};  
}
module.exports = mongoose.model('User', userSchema);