const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: { 
        type: String, 
        enum: ["income", "expense"], 
        required: [true, 'Type is required']
    },
    amount: { 
        type: Number, 
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be positive']
    },
    category: { 
        type: String, 
        required: [true, 'Category is required'],
        trim: true
    },
    date: { 
        type: Date, 
        default: Date.now() 
    },
    description: { 
        type: String, 
        trim: true,
        default: "" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
