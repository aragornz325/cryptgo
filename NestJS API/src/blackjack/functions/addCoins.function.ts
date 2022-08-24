export const addCoins = (user,  game, index, mod) => {
  console.log(user.coins);
  console.log(game.bet[index])
  for(let coin in user.coins){
    user.coins[`${coin}`] += game.bet[index][`${coin}`]*mod
  }
  return user.coins;
}

export const multiplyBet = (bet, mult) => {
  for(let property in bet){
    bet[property] *= mult;
  }
  return bet;
}