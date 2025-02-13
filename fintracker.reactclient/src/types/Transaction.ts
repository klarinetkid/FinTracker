import TransactionCategory from "./TransactionCategory"

type Transaction = {
	id: number,
	date: Date,
	amount: number,
	memo: string,
	categoryId: number | null | undefined,
	category: TransactionCategory | null
}

export default Transaction