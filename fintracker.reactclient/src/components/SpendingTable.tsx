import '../styles/SpendingTable.css';
import Breakdown from "../types/Breakdown";
import { getBreakdownBudgetMonthFactor, getTotalSpend } from '../utils/BreakdownHelper';
import SpendingTableRow from './SpendingTableRow';

interface SpendingTableProps {
    breakdown: Breakdown,
    allowSelect?: boolean
}

function SpendingTable(props: SpendingTableProps) {

    const totalSpend = getTotalSpend(props.breakdown)

    const spendingCategories = props.breakdown.categoryTotals
        .filter(c => c.total < 0)
        .sort((a, b) => Math.abs(b.percentOfIncome) - Math.abs(a.percentOfIncome))

    const budgetFactor = getBreakdownBudgetMonthFactor(props.breakdown)

    return (
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
                    {spendingCategories.map((c, i) =>
                        <SpendingTableRow
                            key={i}
                            categoryTotal={c}
                            budget={props.breakdown.effectiveBudgetItems.filter(b => b.category.id == c.category?.id)[0]}
                            budgetFactor={budgetFactor}
                            spendingCategories={spendingCategories}
                            totalSpend={totalSpend}
                            allowSelect={props.allowSelect}
                            />
                    )}
                    {/*{*/}
                    {/*    selectedCategories.length == 0 ? "" :*/}
                    {/*        <BreakdownTableRow*/}
                    {/*                key={-10}*/}
                    {/*                categoryTotal={aggregateSelectedCategoryTotals()}*/}
                    {/*                //budget={props.breakdown.effectiveBudgetItems.filter(b => selectedCategories.map(c => !c.category ? -20 : c.category.id).indexOf b.category.id) }*/}
                    {/*            />*/}
                    {/*}*/}
                        
                </tbody>
            </table>
        </div>   
    )
}

export default SpendingTable;