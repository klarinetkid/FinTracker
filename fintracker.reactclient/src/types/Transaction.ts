import TransactionCategory from "./TransactionCategory"

type Transaction = {
	id: number,
	date: Date, // TODO: should be moment?
	amount: number,
    memo: string,
	category: TransactionCategory
}

export default Transaction