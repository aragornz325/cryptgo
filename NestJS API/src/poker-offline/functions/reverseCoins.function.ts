export const reverseCoins = (coins) => {
  for(let coin in coins){
    coins[coin] = -coins[coin];
  }
  return coins;
}