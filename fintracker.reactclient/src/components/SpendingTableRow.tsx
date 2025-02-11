import { useState } from "react";
import BudgetItem from "../types/BudgetItem";
import CategoryTotal from "../types/CategoryTotal";
import { formatCurrency, toFixed } from "../utils/helper";
import CategoryPill from "./CategoryPill";
import Checkbox from "./Checkbox";

interface BreakdownTableRowProps {
    categoryTotal: CategoryTotal,
    budget?: BudgetItem,
    budgetFactor: number,
    totalSpend: number,
    allowSelect?: boolean,

    spendingCategories: CategoryTotal[],

    // for when implementing selection
    //selectedCategories: CategoryTotal[],
    //setSelectedCategories: React.Dispatch<React.SetStateAction<CategoryTotal[]>>
}

function SpendingTableRow(props: BreakdownTableRowProps) {

    const [isSelected, setIsSelected] = useState(false)

    const monthlyBudgetAmount = !props.budget ? 0 : Math.floor(props.budget.amount * props.budgetFactor)
    const diff = monthlyBudgetAmount + props.categoryTotal.total
    const deviation = diff / monthlyBudgetAmount * 100;

    // add/remove from selection
    //useEffect(() => {
    //    console.log("isSelected changed")
    //    const newSelected = [...props.selectedCategories]

    //    if (!isSelected) {
    //        const index = newSelected.indexOf(props.categoryTotal)
    //        if (index > -1) newSelected.splice(index, 1)
    //    } else {
    //        newSelected.push(props.categoryTotal)
    //    }

    //    //if (newSelected.length !== selectedCategories.length)
    //    //    setSelectedCategories(newSelected)
    //}, [isSelected])

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
                            backgroundColor: "#" + (props.categoryTotal.category?.colour),
                            border: props.categoryTotal.category ? "" : "solid black 1px",
                            width: "100%"
                        }}></div>
                </td>
                <td colSpan={5}>
                    <div
                        className="breakdown-cat-bar"
                        style={{
                            backgroundColor: "#" + (props.categoryTotal.category?.colour),
                            border: props.categoryTotal.category ? "" : "solid black 1px",
                            width: (props.categoryTotal.total / props.spendingCategories[0].total * 100) + "%"
                        }}></div>
                </td>
            </tr>
            <tr className={`breakdown-cat-value-row ${isSelected ? "selected" : ""}`}>

                <td className="lalign">
                    <CategoryPill category={props.categoryTotal.category} />
                </td>
                <td className="ralign">{formatCurrency(props.categoryTotal.total)}</td>
                <td className="ralign">{toFixed(props.categoryTotal.percentOfIncome, 1)}%</td>
                <td className="ralign">{toFixed(props.categoryTotal.total / props.totalSpend * 100, 1)}%</td>
                <td className="ralign">
                    {!props.budget ? "" :
                        formatCurrency(props.budget.isYearly ? props.budget.amount : monthlyBudgetAmount)
                    }
                </td>
                <td className="ralign">
                    {!props.budget ? "" :
                        props.budget.isYearly ?

                            <span className="budget-dev-yearly">
                                {toFixed(Math.abs(props.categoryTotal.total / props.budget.amount * 100), 1)}%
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

export default SpendingTableRow;