import axios from "axios";
import { createErr, createOk } from "option-t/cjs/PlainResult";
import { EXCHANGE_API, EXCHANGE_API_KEY } from "../../contstants";
import { RtExchangeRatesResponse } from "../../models/runtypes";
import { LocalStorageController } from "../../utils";

const EXCHANGE_BASE = "EUR";
const EXCHANGE_SYMBOLS = "GBP,USD";

export const ApiController = {
  get: {
    exchangerates: async () => {
      try {
        const cache = LocalStorageController.get(EXCHANGE_API_KEY);
        if (cache.ok) return createOk(cache.val);

        const response = await axios.get(
          `${EXCHANGE_API}/latest?base=${EXCHANGE_BASE}&symbols=${EXCHANGE_SYMBOLS}`
        );
        const result = RtExchangeRatesResponse.check(response.data);

        LocalStorageController.set(EXCHANGE_API_KEY, result);

        return createOk(result);
      } catch (error) {
        console.error(error);
        return createErr(error);
      }
    },
  },
};
