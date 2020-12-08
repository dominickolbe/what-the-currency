import * as rt from "runtypes";
import { RtExchangeRatesResponse } from "../runtypes";

// API
export type ExchangeRatesResponseType = rt.Static<
  typeof RtExchangeRatesResponse
>;
