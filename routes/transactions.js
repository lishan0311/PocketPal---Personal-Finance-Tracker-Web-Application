const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const { protect } = require("../middleware/auth")

router.use(protect);

// GET /api/transactions  (arrange by date)
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find( { user: req.user._id}).sort({ date: -1 })
    
    res.status(200).json({
        success:true, 
        count: transactions.length,
        data: transactions
    })
    } catch (error) {
        console.error('Error fetching transactions: ', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// POST /api/transactions  (create new transaction)
router.post("/", async (req, res) => {
  try {
    const { type, amount, category, date, description } = req.body

    // fundemental validate
    if (!type || !amount || !category) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields" 
    })
    }
    
    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      date: date || Date.now(),
      description
    })

    res.status(201).json({
        success: true,
        data: transaction
    })
  } catch (error) {
    console.error('Error creating transtion: ', error)
    res.status(500).json({
        success: false,
        message: error.message
    })
  }
})

// delete transaction
router.delete('/:id', async(req,res) => {
    try{
        const transaction = await Transaction.findById(req.params.id)

        if (!transaction){
            return res.status(404).json ({
                success: false,
                message: 'Transaction not found'
            })
        }

        if (transaction.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this transaction'
            })
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Transaction delete',
            data: {}
        })
    } catch (error) {
        console.error('Error deleting transaction: ', error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
})

// update transaction
router.put('/:id', async(req,res) => {
    try{
        const {type,amount,category,date,description} = req.body;

        let transaction = await Transaction.findById(req.params.id)

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            })
        }

        if (transaction.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: 'Not authorized to updated this transaction'
            })
        }

        transaction.type = type || transaction.type
        transaction.amount = amount || transaction.amount
        transaction.category = category || transaction.category
        transaction.date = date || transaction.date
        transaction.description = description !== undefined ? description : transaction.description

        await transaction.save()

        res.status(200).json({
            success: true,
            data: transaction
        })
    } catch (error){
        console.error('Error updating transaction: ', error)

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router
