import { UserBalances } from "../generated/schema";
import { Transfer } from "../generated/OneRareERC20/OneRareERC20";

export function handleTransfer(event: Transfer): void {
  // UPDATE ::  FROM address user balances
  let from_user_data = UserBalances.load(event.params.from.toHex());

  if (!from_user_data) {
    from_user_data = new UserBalances(event.params.from.toHex());
    from_user_data.balance = event.params.value;
  } else {
    from_user_data.balance = from_user_data.balance.minus(event.params.value);
  }
  from_user_data.save();

  // UPDATE ::  To address user balances
  let to_user_data = UserBalances.load(event.params.from.toHex());

  if (!to_user_data) {
    to_user_data = new UserBalances(event.params.from.toHex());
    to_user_data.balance = event.params.value;
  } else {
    to_user_data.balance = to_user_data.balance.plus(event.params.value);
  }
  to_user_data.save();
}
