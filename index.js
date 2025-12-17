require('dotenv').config()
const express = require('express')
const connectDB = require('./db')

const app = express()

// connect to database
connectDB()

// middleware
app.use(express.json())
app.use(express.static('dist'))

// router
app.use('/api/auth', require('./routes/auth'))
app.use('/api/transactions', require('./routes/transactions'))

app.get('/', (req,res) => {
  res.send('Finance Tracker is running.')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
