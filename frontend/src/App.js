import React, { useState, useEffect } from "react";
import { convertCurrency, getTransfers, deleteTransfer } from "./api";
import { Container, TextField, Button, MenuItem, Typography, Card, CardContent } from "@mui/material";

const countries = [
    { label: "USA", code: "USD" },
    { label: "Sri Lanka", code: "LKR" },
    { label: "Australia", code: "AUD" },
    { label: "India", code: "INR" }
];

const App = () => {
    const [fromCountry, setFromCountry] = useState("USD");
    const [toCountry, setToCountry] = useState("LKR");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        loadTransfers();
    }, []);

    const loadTransfers = async () => {
        const data = await getTransfers();
        setTransfers(data);
    };

    const handleConvert = async () => {
        const data = { fromCountry, toCountry, amount };
        const result = await convertCurrency(data);
        setConvertedAmount(result.convertedAmount);
        loadTransfers();
    };

    const handleDelete = async (id) => {
        await deleteTransfer(id);
        loadTransfers();
    };

    return (
        <Container>
            <Typography variant="h4">Currency Converter</Typography>
            <TextField select label="From" value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} fullWidth>
                {countries.map((c) => <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>)}
            </TextField>
            <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth />
            <Button variant="contained" onClick={handleConvert}>Convert</Button>

            {convertedAmount !== null && <Typography variant="h5">Converted Amount: {convertedAmount}</Typography>}

            {transfers.map((t) => (
                <Card key={t._id}>
                    <CardContent>
                        {t.amount} {t.fromCountry} → {t.convertedAmount} {t.toCountry}
                        <Button onClick={() => handleDelete(t._id)}>Revoke</Button>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default App;
