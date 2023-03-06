import Wallet from "../schemas/Wallet.model";
import Transaction from "../schemas/Transaction";

class transactionController {
  sumTotal = async (
    id: string,
    nameWallet: string,
    status: string,
    moneyTrade: number
  ) => {
    let wallet = await Wallet.findOne({ idUser: id, walletName: nameWallet });
    let totalMoneyLeft = wallet.totalMoneyLeft;
    if (status == "income") {
      totalMoneyLeft = totalMoneyLeft + moneyTrade;
    } else {
      totalMoneyLeft = totalMoneyLeft - moneyTrade;
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
