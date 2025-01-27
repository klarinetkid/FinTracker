
import CategoryTotal from './CategoryTotal'

type Summary = {
    start: Date,
    end: Date,
    categoryTotals: CategoryTotal[],
    totalIn: number,
    totalOut: number
}

export default Summary;