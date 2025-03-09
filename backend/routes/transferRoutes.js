const express = require("express");
const axios = require("axios");
const Transfer = require("../models/Transfer");

const router = express.Router();

// Fetch exchange rate
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`);
        return response.data.conversion_rates[to];
    } catch (error) {
        console.error("Exchange rate error:", error);
        return null;
    }
};

// Convert currency and save transfer
router.post("/convert", async (req, res) => {
    const { fromCountry, toCountry, amount } = req.body;
    const rate = await getExchangeRate(fromCountry, toCountry);
    
    if (!rate) {
        return res.status(500).json({ error: "Error fetching exchange rate" });
    }

    const convertedAmount = amount * rate;
    const transfer = new Transfer({ fromCountry, toCountry, amount, convertedAmount });

    await transfer.save();
    res.json({ convertedAmount });
});

// Get all transfers
router.get("/transfers", async (req, res) => {
    const transfers = await Transfer.find();
    res.json(transfers);
});

// Delete transfer
router.delete("/transfer/:id", async (req, res) => {
    await Transfer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
