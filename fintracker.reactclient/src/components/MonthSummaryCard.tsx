
import Moment from 'moment'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { addToColour, dateOnly, formatCurrency, toFixed } from '../helper.js'
import Pages from '../types/pages.js'
import Summary from '../types/summary.js'
import InOutPills from './InOutPills.js'
import './styles/MonthSummaryCard.css'

interface DashboardMonthSummaryProps {
    summary: Summary
}

function MonthSummaryCard(props: DashboardMonthSummaryProps) {

    const navigate = useNavigate()

    // filtered and sorted
    const categoryBands = props.summary.categoryTotals
        .filter(c => c.category != null && c.total < 0)
        .sort((a, b) => a.total - b.total)

    return (
        <div className="row dashboard-month-row" onClick={openBreakdown}>
            <div className="dashboard-month-row-header">
                <h4>{Moment(props.summary.start).format("MMMM")}</h4>

                <InOutPills totalIn={props.summary.totalIn} totalOut={props.summary.totalOut} />
            </div>

            <div className="band-holder">
                {categoryBands.map(categoryTotal => 
                    !categoryTotal.category ? "" : <div key={categoryTotal.category.id}
                        className="band"
                        style={{
                            width: Math.abs(categoryTotal.percentOfIncome) + "%",
                            background: `linear-gradient(#${categoryTotal.category.colour}, #${addToColour(categoryTotal.category.colour, 0x60)})`
                        }}>
                        
                        <div className="band-tooltip">
                            {categoryTotal.category.categoryName}: {formatCurrency(categoryTotal.total, true)} ({toFixed(Math.abs(categoryTotal.percentOfIncome))}%)
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

    function openBreakdown() {
        // TODO: make this helper function
        navigate({
            pathname: Pages.Breakdown,
            search: createSearchParams({
                start: dateOnly(props.summary.start),
                end: dateOnly(props.summary.end)
            }).toString()
        })
    }
}

export default MonthSummaryCard;