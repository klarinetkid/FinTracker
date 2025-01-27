import { formatCurrency, toFixed } from "../helper";
import CategoryTotal from "../types/categoryTotal";
import CategoryPill from "./CategoryPill";
import './styles/SpendingTable.css';

interface SpendingTableProps {
    categories: CategoryTotal[]
}

function SpendingTable(props: SpendingTableProps) {

    const totalSpend = Math.abs(props.categories.filter(c => c.total < 0)
        .map(c => c.total).reduce((sum, i) => sum + i))

    // TODO: show income somewhere else
    const tableCategories = props.categories
        .filter(c => c.category?.id != 0)
        .sort((a, b) => Math.abs(b.percentOfIncome) - Math.abs(a.percentOfIncome))

    return (
        <>
        <div className="breakdown-table">
            <table>
                <thead>
                    <tr>
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
                    {tableCategories.map(c =>
                        <BreakdownTableRow key={c.category?.id} categoryTotal={c} />
                    )}
                </tbody>
            </table>
        </div>   
        </>
    )

    interface BreakdownTableRowProps {
        categoryTotal: CategoryTotal
    }
    function BreakdownTableRow(props: BreakdownTableRowProps) {
        return (
            <>
                <tr className="breakdown-cat-bar-row">
                    <td colSpan={5}>
                        <div
                            className="breakdown-cat-bar"
                            style={{
                                backgroundColor: "#" + (props.categoryTotal.category?.colour),
                                border: props.categoryTotal.category ? "" : "solid black 1px",
                                width: (props.categoryTotal.total / tableCategories[0].total * 100) + "%"
                            }}></div>
                    </td>
                </tr>
                <tr className="breakdown-cat-value-row">
                    <td className="lalign">
                        <CategoryPill category={props.categoryTotal.category} />
                    </td>
                    <td className="ralign">{formatCurrency(props.categoryTotal.total)}</td>
                    <td className="ralign">{toFixed(props.categoryTotal.percentOfIncome, 1)}%</td>
                    <td className="ralign">{toFixed(props.categoryTotal.total / totalSpend * 100, 1)}%</td>
                    <td className="ralign"></td>
                    <td className="ralign"></td>
                </tr>
                <tr className="breakdown-cat-spacer-row"></tr>
            </>
        )
    }
}

export default SpendingTable;