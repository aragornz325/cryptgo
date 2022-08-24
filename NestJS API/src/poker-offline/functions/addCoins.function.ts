export const addCoins = (user,  game, mod) => {
  for(let coin in user.coins){
    user.coins[`${coin}`] += game.startBet[`${coin}`]*mod
  }
  return user.coins;
}

export const addBetCoins = (user, bet) => {
  for(let coin in user.coins){
    user.coins[coin] += bet[coin];
  }
  return user.coins;
}

export const addBet = (game, mod) => {
  for(let coin in game.startBet){
    game.bet[`${coin}`] += game.startBet[`${coin}`]*mod
  }
  return game.bet;
}
