require('dotenv').config()
const express = require('express')
const connectDB = require('./db')

const app = express()

// connect to database
connectDB()

// middleware
app.use(express.json())
<<<<<<< HEAD
=======
app.use(express.static('dist'))
>>>>>>> 6cc2fac74f532a4272a28d9ee16d1d21e6084c62

// router
app.use('/api/auth', require('./routes/auth'))
app.use('/api/transactions', require('./routes/transactions'))

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
