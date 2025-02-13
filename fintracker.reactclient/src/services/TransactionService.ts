import Transaction from "../types/Transaction";
import BaseService from "./baseService";


class TransactionService extends BaseService {

    patchTransaction(transaction: Transaction): Promise<void> {
        return this.patch('/Transaction/PatchTransaction', transaction)
    }

}

export default new TransactionService();