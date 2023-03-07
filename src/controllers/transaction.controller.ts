import Wallet from "../schemas/Wallet.model";
import Transaction from "../schemas/Transaction";

class transactionController {
  sumTotal = async (
    id: string,
    nameWallet: string,
    status: string,
    currentMoney: number,
    moneyTrade: number,
    action: string,
  ) => {
    let wallet = await Wallet.findOne({ idUser: id, walletName: nameWallet });
    let totalMoneyLeft = wallet.totalMoneyLeft;

    if (action == "add") {
      if (status == "income") {
        totalMoneyLeft = Number(totalMoneyLeft) + Number(moneyTrade);
      } else {
        totalMoneyLeft = Number(totalMoneyLeft) - Number(moneyTrade);
      }
    } else if (action == 'remove') {
      if (status == 'income') {
        totalMoneyLeft = Number(totalMoneyLeft) - Number(moneyTrade);
      } else {
        totalMoneyLeft = Number(totalMoneyLeft) + Number(moneyTrade);
      }
    } else if (action == 'update') {
          totalMoneyLeft = totalMoneyLeft - Number(currentMoney) + Number(moneyTrade);
    }

    try {
      let updateTotalMoneyLeft = await Wallet.findOneAndUpdate(
        { idUser: id },
        { $set: { totalMoneyLeft: totalMoneyLeft } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  getTransactionFirstPage = (idUser: string): Promise<Object[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        let transactions = await Transaction.find({ idUser: idUser })
          .skip(0)
          .limit(5);
        if (transactions) {
          resolve(transactions);
        } else {
          reject();
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
}
export default new transactionController();
