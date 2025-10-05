const Book = require('../models/Book');


const createBook = async (req, res) => {
try {
    // console.log(req.body)
const book = await Book.createBook(req.body);

return res.status(201).send({ success: true,message:"Book created successfully", book: book });

} catch (err) {
// console.error(err);
return res.status(err.status || 500).send({ success: false,message: err.message || 'Server error' });

}
};


const getBooks = async (req, res) => {
try {
const result = await Book.getAllBooks();
// return res.json(result.docs);
return res.status(201).send({ success: true,message:"Books fetches", docs: result.docs });

} catch (err) {
// console.error(err);
return res.status(err.status || 500).send({ success: false,message: err.message || 'Server error' });

}
};


const getBookById = async (req, res) => {
try {
const book = await Book.getById(req.params.id);
// return res.json(book);
return res.status(201).send({ success: true,message:"Books fetches", book: book });

} catch (err) {
// console.error(err);
return res.status(err.status || 500).send({ success: false,message: err.message || 'Server error' });

}
};


const updateBook = async (req, res) => {
try {
const book = await Book.updateById(req.params.id, req.body);

return res.status(200).send({ success: true,message:"Book updated", book: book });

} catch (err) {


return res.status(err.status || 500).send({ success: false,message: err.message || 'Server error' });

}
};


const deleteBook = async (req, res) => {
try {
await Book.deleteById(req.params.id);
return res.status(200).send({ success: true,message:"Book Deleted" });

} catch (err) {
return res.status(err.status || 500).send({ success: false,message: err.message || 'Server error' });

}
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };