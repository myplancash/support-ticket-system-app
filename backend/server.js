const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');
const app = express()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

//connection to the database
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false})) 

app.get('/', (req, res) => {
  res.status(201).json({message: 'Welcome to our support ticket app'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
})