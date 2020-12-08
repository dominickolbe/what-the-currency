/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ApiController } from "./components/ApiController";
import { ExchangeRatesResponseType } from "./models/types";

export const App = () => {
  const [
    exchangeRateData,
    setExchangeRateData,
  ] = useState<ExchangeRatesResponseType | null>(null);

  const [currency1, setCurrency1] = useState(0);
  const [currency2, setCurrency2] = useState(0);

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
    <div>
      <label>EUR</label>
      <input
        type="text"
        value={currency1}
        onChange={(e) => {
          const value = parseFloat(e.target.value || "0");

          setCurrency1(value);
          setCurrency2(value * exchangeRateData.rates.GBP);
        }}
      />
      <div>to</div>
      <label>GBP</label>
      <input
        type="text"
        value={currency2}
        onChange={(e) => {
          const value = parseFloat(e.target.value || "0");

          setCurrency2(value);
          setCurrency1(value / exchangeRateData.rates.GBP);
        }}
      />
    </div>
  );
};
