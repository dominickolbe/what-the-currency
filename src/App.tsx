/* eslint-disable react-hooks/exhaustive-deps */

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { ApiController } from "./components/ApiController";
import { CurrenciesContainer } from "./components/CurrenciesContainer";
import { FullScreenLoader } from "./components/FullScreenLoader";
import { ExchangeRatesResponseType } from "./models/types";
import { theme } from "./theme";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(12),
  },
}));

export const App = () => {
  const classes = useStyles();

  const [
    exchangeRateData,
    setExchangeRateData,
  ] = useState<ExchangeRatesResponseType | null>(null);

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

  if (!exchangeRateData) return <FullScreenLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography component="div" variant="h1">
                <Box fontWeight="fontWeightMedium">Currency converter</Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CurrenciesContainer data={exchangeRateData} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};
