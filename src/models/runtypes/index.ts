import * as rt from "runtypes";

// API
export const RtExchangeRatesResponse = rt.Record({
  rates: rt.Record({
    GBP: rt.Number,
    USD: rt.Number,
  }),
  base: rt.String,
  date: rt.String,
});
