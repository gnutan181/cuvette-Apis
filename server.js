
const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./config/db');


connectDB();

const PORT = process.env.PORT || 8000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});