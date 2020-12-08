/* eslint-disable react-hooks/exhaustive-deps */

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { ApiController } from "./components/ApiController";
import { ExchangeRatesResponseType } from "./models/types";
import { theme } from "./theme";

export const App = () => {
  const [
    exchangeRateData,
    setExchangeRateData,
  ] = useState<ExchangeRatesResponseType | null>(null);

  const [currency_EUR, setCurrency_EUR] = useState(0);
  const [currency_GBP, setCurrency_GBP] = useState(0);
  const [currency_USD, setCurrency_USD] = useState(0);

  const abortCtrl = new AbortController();

  const loadData = async () => {
    const response = await ApiController.get.exchangerates();
    if (abortCtrl.signal.aborted) return;
    if (response.ok) setExchangeRateData(response.val);
  };

  useEffect(() => {
    loadData();

    return () => {
      abortCtrl.abort();
    };
  }, []);

  if (exchangeRateData === null) return <div>Loading ...</div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        maxWidth="sm"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography component="div" variant="h5">
              <Box fontWeight="fontWeightBold">Currency converter</Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>EUR</InputLabel>
              <OutlinedInput
                value={currency_EUR}
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                labelWidth={60}
                onChange={(e) => {
                  const value = parseFloat(e.target.value || "0");
                  setCurrency_EUR(value);
                  setCurrency_GBP(value * exchangeRateData.rates.GBP);
                  setCurrency_USD(value * exchangeRateData.rates.USD);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>GBP</InputLabel>
              <OutlinedInput
                value={currency_GBP}
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                labelWidth={60}
                onChange={(e) => {
                  const value_GBP = parseFloat(e.target.value || "0");
                  const value_EUR = value_GBP / exchangeRateData.rates.GBP;
                  const value_USD = value_EUR * exchangeRateData.rates.USD;
                  setCurrency_GBP(value_GBP);
                  setCurrency_EUR(value_EUR);
                  setCurrency_USD(value_USD);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>USD</InputLabel>
              <OutlinedInput
                value={currency_USD}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={60}
                onChange={(e) => {
                  const value_USD = parseFloat(e.target.value || "0");
                  const value_EUR = value_USD / exchangeRateData.rates.USD;
                  const value_GBP = value_EUR * exchangeRateData.rates.GBP;
                  setCurrency_USD(value_USD);
                  setCurrency_EUR(value_EUR);
                  setCurrency_GBP(value_GBP);
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
