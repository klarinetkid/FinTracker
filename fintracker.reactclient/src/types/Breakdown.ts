import moment from "moment"
import BudgetItem from "./BudgetItem"
import CategoryTotal from "./CategoryTotal"
import Transaction from "./Transaction"

type Breakdown = {
    breakdownRangeStart: Date,
    breakdownRangeEnd: Date,
    totalIn: number,
    totalOut: number,
    categoryTotals: CategoryTotal[],
    effectiveBudgetItems: BudgetItem[],
    transactions: Transaction[],
    title: string
}

export default Breakdown