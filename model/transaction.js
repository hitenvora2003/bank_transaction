const mongoose = require('mongoose')
const transactionschema = new mongoose.Schema({
    account_Holdername: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: [true, "please enter your name"],
        
    },
    accountNo : {
        type: Number,
        required: [true, "please enter your account Number"],
        unique: [true, "this account number already exits,please differentOne"],
    },
    trancaction : {
        type : Number,
        required: [true, "please enter your trancaction"],
}, 
     method : {
        type : String,
        enum : ['credit','debit'],
        default : 'credit'
        
}

})
module.exports = mongoose.model('transaction', transactionschema)