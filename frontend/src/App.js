import React from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import CurrencyConverter from "./components/CurrencyConverter";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app-container">
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Currency Converter Component */}
          <Grid item xs={12} md={6}>
            <Paper className="converter-container" elevation={3}>
              <Typography variant="h4" className="title">
                Currency Converter
              </Typography>
              <CurrencyConverter />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
