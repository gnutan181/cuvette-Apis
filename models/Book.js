const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: { type: String ,required: true},
genre: { type: String ,required: true},
price: { type: Number, required: true },
inStock: { type: Boolean, default: true },
}, { timestamps: true });

bookSchema.statics.createBook = async function(bookData) {
const book = new this(bookData);
await book.save();
return book;
}   
bookSchema.statics.getAllBooks = async function () {
const docs = await this.find().sort({ createdAt: -1 });
return { docs };
};


// Get by ID
bookSchema.statics.getById = async function (id) {
const book = await this.findById(id);
if (!book) {
const err = new Error('Book not found');
err.status = 404;
throw err;
}
return book;
};


// Update by ID
bookSchema.statics.updateById = async function (id, updateData) {
const book = await this.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
if (!book) {
const err = new Error('Book not found');
err.status = 404;
throw err;
}
return book;
};


bookSchema.statics.deleteById = async function (id) {
    const book = await this.findByIdAndDelete(id);
if (!book) {
const err = new Error('Book not found');
err.status = 404;
throw err;
}
return book;
};

module.exports = mongoose.model('Book', bookSchema);