import moment from "moment";
import Breakdown from "../types/Breakdown";

// this function returns the factor to multiply a monthly
// budget amount for the given breakdown range
export function getBreakdownBudgetMonthFactor(breakdown: Breakdown): number {
    const budgetEnd = moment(new Date()).isBefore(moment(breakdown.breakdownRangeEnd)) ? new Date() : breakdown.breakdownRangeEnd
    const effectiveBudgetDays = moment(budgetEnd).diff(breakdown.breakdownRangeStart, "days")
    return 12.0 * effectiveBudgetDays / 365.0; // TODO: leap year?
}

export function getTotalSpend(breakdown: Breakdown): number {
    return Math.abs(breakdown.categoryTotals.filter(c => c.total < 0)
        .map(c => c.total).reduce((sum, i) => sum + i))
}