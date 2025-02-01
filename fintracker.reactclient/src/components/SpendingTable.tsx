import { useState } from "react";
import { formatCurrency, toFixed } from "../common/helper";
import CategoryTotal from "../types/CategoryTotal";
import CategoryPill from "./CategoryPill";
import Checkbox from "./Checkbox";
import './styles/SpendingTable.css';
import Breakdown from "../types/Breakdown";
import moment from "moment";
import BudgetItem from "../types/BudgetItem";

interface SpendingTableProps {
    breakdown: Breakdown,
    allowSelect?: boolean
}

function SpendingTable(props: SpendingTableProps) {

    const totalSpend = Math.abs(props.breakdown.categoryTotals.filter(c => c.total < 0)
        .map(c => c.total).reduce((sum, i) => sum + i))


    const spendingCategories = props.breakdown.categoryTotals
        .filter(c => c.total < 0)
        .sort((a, b) => Math.abs(b.percentOfIncome) - Math.abs(a.percentOfIncome))

    const budgetEnd = moment(new Date()).isBefore(moment(props.breakdown.breakdownRangeEnd)) ? new Date() : props.breakdown.breakdownRangeEnd
    const effectiveBudgetDays = moment(budgetEnd).diff(props.breakdown.breakdownRangeStart, "days")
    const budgetFactor = 12.0 * effectiveBudgetDays / 365.0; // TODO: leap year?

    return (
        <>
        <div className="breakdown-table">
            <table>
                <thead>
                    <tr>
                        {!props.allowSelect ? "" :
                            <th></th>
                        }
                        <th>Category</th>
                        <th>Total</th>
                        <th>% of in.</th>
                        <th>% of sp.</th>
                        <th>Budget</th>
                        <th></th>
                    </tr>
                    <tr style={{height: "20px"} }></tr>
                </thead>
                <tbody>
                    {spendingCategories.map(c =>
                        <BreakdownTableRow
                            key={c.category?.id}
                            categoryTotal={c}
                            budget={props.breakdown.effectiveBudgetItems.filter(b => b.category.id == c.category?.id)[0] }
                        />
                    )}
                </tbody>
            </table>
        </div>   
        </>
    )

    interface BreakdownTableRowProps {
        categoryTotal: CategoryTotal,
        budget?: BudgetItem
    }

    function BreakdownTableRow(cprops: BreakdownTableRowProps) {

        const [isSelected, setIsSelected] = useState(false)

        const monthlyBudgetAmount = !cprops.budget ? 0 : Math.floor(cprops.budget.amount * budgetFactor)
        const diff = monthlyBudgetAmount + cprops.categoryTotal.total
        const deviation = diff / monthlyBudgetAmount * 100;

        return (
            <>
                <tr className={`breakdown-cat-bar-row ${isSelected ? "selected" : ""}`}>
                    {!props.allowSelect ? "" :
                        <td rowSpan={2}>
                            <Checkbox checked={isSelected} onChange={(val) => setIsSelected(val)} />
                        </td>
                    }
                    <td colSpan={1}>
                        <div
                            className="breakdown-cat-bar-start"
                            style={{
                                backgroundColor: "#" + (cprops.categoryTotal.category?.colour),
                                border: cprops.categoryTotal.category ? "" : "solid black 1px",
                                width: "100%"
                            }}></div>
                    </td>
                    <td colSpan={5}>
                        <div
                            className="breakdown-cat-bar"
                            style={{
                                backgroundColor: "#" + (cprops.categoryTotal.category?.colour),
                                border: cprops.categoryTotal.category ? "" : "solid black 1px",
                                width: (cprops.categoryTotal.total / spendingCategories[0].total * 100) + "%"
                            }}></div>
                    </td>
                </tr>
                <tr className={`breakdown-cat-value-row ${isSelected ? "selected" : ""}`}>
                    
                    <td className="lalign">
                        <CategoryPill category={cprops.categoryTotal.category} />
                    </td>
                    <td className="ralign">{formatCurrency(cprops.categoryTotal.total)}</td>
                    <td className="ralign">{toFixed(cprops.categoryTotal.percentOfIncome, 1)}%</td>
                    <td className="ralign">{toFixed(cprops.categoryTotal.total / totalSpend * 100, 1)}%</td>
                    <td className="ralign">
                        {!cprops.budget ? "" :
                            formatCurrency(cprops.budget.isYearly ? cprops.budget.amount : monthlyBudgetAmount)
                        }
                    </td>
                    <td className="ralign">
                        {!cprops.budget ? "" :
                            cprops.budget.isYearly ?

                                <span className="budget-dev-yearly">
                                    {toFixed(Math.abs(cprops.categoryTotal.total / cprops.budget.amount * 100), 1)}%
                                </span>
                                :
                                <span className={diff < 0 ? "budget-dev-over" : "budget-dev-under"} title={formatCurrency(diff * -1)}>
                                    {(deviation < 0 ? "+" : "-") + toFixed(Math.abs(deviation), 1)}%
                                </span>
                        }
                    </td>
                </tr>
                <tr className="breakdown-cat-spacer-row"></tr>
            </>
        )
    }
}

export default SpendingTable;