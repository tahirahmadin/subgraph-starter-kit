import { UserBalance } from "../generated/schema";
import { Transfer } from "../generated/OneRareERC20/OneRareERC20";

export function handleTransfer(event: Transfer): void {
  // UPDATE ::  FROM address user balances
  let from_user_data = UserBalance.load(event.params.from.toHex());

  if (!from_user_data) {
    from_user_data = new UserBalance(event.params.from.toHex());
    from_user_data.balance = event.params.value;
    from_user_data.tranferCount = 1;
  } else {
    from_user_data.balance = from_user_data.balance.minus(event.params.value);
    from_user_data.tranferCount += 1;
  }
  from_user_data.save();

  // UPDATE ::  To address user balances
  let to_user_data = UserBalance.load(event.params.from.toHex());

  if (!to_user_data) {
    to_user_data = new UserBalance(event.params.from.toHex());
    to_user_data.balance = event.params.value;
    to_user_data.tranferCount = 1;
  } else {
    to_user_data.balance = to_user_data.balance.plus(event.params.value);
    to_user_data.tranferCount += 1;
  }
  to_user_data.save();
}
