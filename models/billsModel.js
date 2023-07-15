const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhoneNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  gst: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  paymentMode: { type: String, required: true },
  cartItems: { type: Array, required: true },
}, {timestamps : true});

const billsModel = mongoose.model("bills", billSchema);

module.exports = billsModel; 
