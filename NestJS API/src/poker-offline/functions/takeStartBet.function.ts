export default (user, game) => {
  user.balance -= game.startBet;
  return user.balance;
}