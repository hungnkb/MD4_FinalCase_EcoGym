import Wallet from "../schemas/Wallet.model";

class transactionController {
  sumTotal = async (id: string, nameWallet: string, status: string, moneyTrade: number) => {
    
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
}
export default new transactionController();
