export default (user, game, mod) => {
  user.balance = user.balance + game.bet * mod;
  return user.balance;
}