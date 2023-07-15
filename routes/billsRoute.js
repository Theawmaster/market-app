const express = require("express");
const BillModel = require("../models/billsModel");
const router = express.Router();

router.post("/charge-bill", async (req, res) => {
  try {
    const payment = new BillModel(req.body)
    await payment.save()
    res.send("Payment received successfully!")
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/get-all-bill", async (req, res) => {
  try {
    const payment = await BillModel.find()
    res.send(payment)
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
