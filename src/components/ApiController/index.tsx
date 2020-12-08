import axios from "axios";
import { createErr, createOk } from "option-t/cjs/PlainResult";
import { EXCHANGE_API } from "../../contstants";
import { RtExchangeRatesResponse } from "../../models/runtypes";

const EXCHANGE_BASE = "EUR";
const EXCHANGE_SYMBOLS = "GBP,USD";

export const ApiController = {
  get: {
    exchangerates: async () => {
      try {
        const response = await axios.get(
          `${EXCHANGE_API}/latest?base=${EXCHANGE_BASE}&symbols=${EXCHANGE_SYMBOLS}`
        );
        const result = RtExchangeRatesResponse.check(response.data);
        return createOk(result);
      } catch (error) {
        console.error(error);
        return createErr(error);
      }
    },
  },
};
