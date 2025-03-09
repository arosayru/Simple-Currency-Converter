import React from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import CurrencyConverter from "./components/CurrencyConverter";
import ExchangeRateChart from "./components/ExchangeRateChart";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app-container">
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Currency Converter */}
          <Grid item xs={12} md={5}>
            <Paper className="converter-container" elevation={3}>
              <Typography variant="h4" className="title">
                Currency Converter
              </Typography>
              <CurrencyConverter />
            </Paper>
          </Grid>

          {/* Right Side - Exchange Rate Chart */}
          <Grid item xs={12} md={7}>
            <Paper className="chart-container" elevation={3}>
              <Typography variant="h5" className="title">
                Today's Exchange Rate
              </Typography>
              <ExchangeRateChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
