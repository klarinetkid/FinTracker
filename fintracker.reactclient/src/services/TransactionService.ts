import BaseService from "./baseService";


class TransactionService extends BaseService {

    updateTransactionCategory(transactionId: number, categoryId: number): Promise<void> {
        return this.patch('/Categories/UpdateTransaction', { transactionId, categoryId })
    }

}

export default new TransactionService();