import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import React from "react";

export const CurrencyField = (props: {
  label: String;
  symbol: String;
  value: number;
  onChange: (label: String, value: number) => void;
}) => {
  const { label, symbol } = props;

  return (
    <TextField
      label={label}
      value={props.value}
      variant="filled"
      fullWidth
      onChange={(e) => {
        const value = parseFloat(e.target.value || "0");
        props.onChange(label, value);
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{symbol}</InputAdornment>,
      }}
    />
  );
};
