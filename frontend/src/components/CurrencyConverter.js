import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
import { convertCurrency, getTransfers, deleteTransfer } from "../api";
import "../styles/App.css";

const countries = [
  { label: "USA", code: "USD" },
  { label: "Sri Lanka", code: "LKR" },
  { label: "Australia", code: "AUD" },
  { label: "India", code: "INR" }
];

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("LKR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [transfers, setTransfers] = useState([]);

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2); // Limits to 2 decimal places
  };

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const data = { fromCountry: fromCurrency, toCountry: toCurrency, amount };
    const result = await convertCurrency(data);
    setConvertedAmount(formatNumber(result.convertedAmount));
    loadTransfers();
  };

  const loadTransfers = async () => {
    const data = await getTransfers();
    setTransfers(data);
  };

  const handleDelete = async (id) => {
    await deleteTransfer(id);
    loadTransfers();
  };

  return (
    <div className="converter-container">
      <Typography variant="h4" className="title">
        
      </Typography>

      <TextField
        select
        label="From Currency"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        fullWidth
        style={{ marginBottom: "15px" }}
      >
        {countries.map((c) => (
          <MenuItem key={c.code} value={c.code}>
            {c.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="To Currency"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        fullWidth
        style={{ marginBottom: "15px" }}
      >
        {countries.map((c) => (
          <MenuItem key={c.code} value={c.code}>
            {c.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        style={{ marginBottom: "15px" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleConvert}
        className="convert-button"
      >
        Convert
      </Button>

      {convertedAmount !== null && (
        <Typography variant="h6" className="result">
          Converted Amount: {convertedAmount}
        </Typography>
      )}

      {transfers.map((t) => (
        <Typography key={t._id} className="history">
          {t.amount} {t.fromCountry} → {formatNumber(t.convertedAmount)}{" "}
          {t.toCountry}{" "}
          <span className="revoke" onClick={() => handleDelete(t._id)}>
            REVOKE
          </span>
        </Typography>
      ))}
    </div>
  );
};

export default CurrencyConverter;
