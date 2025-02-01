import TransactionCategory from "./TransactionCategory"

type BudgetItem = {
	id: number,
	category: TransactionCategory,
	amount: number,
	effectiveDate: Date,
	isYearly: boolean
}

export default BudgetItem