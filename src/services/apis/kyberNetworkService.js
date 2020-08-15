import ENV from "src/app/configs/env";

export async function fetchTokenPrices() {
  try {
    const response = await fetch(`${ENV.APIS.KN}/change24h`);
    const result = await response.json();

    const knc = extractRateAndChange24h(result.ETH_KNC);
    const eth = extractRateAndChange24h(result.ETH_ETH);

    return { knc, eth };
  } catch (e) {
    return false;
  }
}

function extractRateAndChange24h(token) {
  return {
    rate: token && token.rate_usd_now ? token.rate_usd_now : 0,
    change24h: token && token.change_usd_24h ? token.change_usd_24h : 0
  }
}
