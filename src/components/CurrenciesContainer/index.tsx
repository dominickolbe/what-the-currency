import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { ExchangeRatesResponseType } from "../../models/types";
import { CurrencyField } from "../CurrencyField";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const CurrenciesContainer = (props: {
  data: ExchangeRatesResponseType;
}) => {
  const classes = useStyles();
  const { data } = props;

  const [values, setValues] = useState({
    EUR: 0,
    GBP: 0,
    USD: 0,
  });

  const onChange = (symbol: String, value: number) => {
    switch (symbol) {
      case "EUR":
        setValues({
          EUR: value,
          GBP: +(value * data.rates.GBP).toFixed(2),
          USD: +(value * data.rates.USD).toFixed(2),
        });
        break;
      case "GBP":
        setValues({
          EUR: +(value / data.rates.GBP).toFixed(2),
          GBP: value,
          USD: +((value / data.rates.GBP) * data.rates.USD).toFixed(2),
        });
        break;
      case "USD":
        setValues({
          EUR: +(value / data.rates.USD).toFixed(2),
          GBP: +((value / data.rates.USD) * data.rates.GBP).toFixed(2),
          USD: value,
        });
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CurrencyField
            label="EUR"
            symbol="€"
            value={values.EUR}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CurrencyField
            label="GBP"
            symbol="£"
            value={values.GBP}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CurrencyField
            label="USD"
            symbol="$"
            value={values.USD}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};
