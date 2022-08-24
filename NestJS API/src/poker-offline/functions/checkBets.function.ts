export const checkBets = (userCoins, bet) => {
  for(let property in userCoins){
    if(userCoins[property] < bet[property]){
      return { error: `You don't have enough ${property} coins`}
    }
  }
  return;
}