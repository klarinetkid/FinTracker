import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ArrowLeft from '../assets/arrow-left-square.svg?react'
import ArrowRight from '../assets/arrow-right-square.svg?react'
import InOutPills from '../components/InOutPills'
import MonthSummaryCard from '../components/MonthSummaryCard'
import Spacer from '../components/Spacer'
import ApiEndpoints from '../types/apiEndpoints'
import Summary from '../types/Summary'
import { getTotalIn, getTotalOut } from '../utils/SummaryHelper'

function Dashboard() {

    const [searchParams] = useSearchParams()

    const defaultYear = parseInt(searchParams.get("year") ?? "") || undefined

    const [summaries, setSummaries] = useState<Summary[]>()
    const [availableYears, setAvailableYears] = useState<number[]>()
    const [year, setYear] = useState(defaultYear)

    // TODO: refactor API services
    useEffect(() => {
        if (availableYears) {
            if (!year && availableYears[0]) setYear(availableYears[0])

            return
        }
        getAvailableYears()

    }, [availableYears, year])

    // load summaries when year changes
    useEffect(() => {
        if (!year) return

        // TODO: push history
        getSummaries(year)
    }, [year])

    return (
        <div className="container" style={{ width: 800, margin: "auto" }}>

            <div className="flex justify-btwn align-centre noselect">

                <DashboardIncrementButton increment={-1} button={ArrowLeft} />

                <h1>Dashboard {year}</h1>

                <DashboardIncrementButton increment={1} button={ArrowRight} />

            </div>

            <InOutPills totalIn={getTotalIn(summaries)} totalOut={getTotalOut(summaries)} />

            <Spacer height={26} />

            <div className="row">
                {!summaries ? "loading..." : summaries.filter(s => s.categoryTotals.length > 0).map(s =>
                    <MonthSummaryCard key={s.start.toString()} summary={s} />
                )}
            </div>
        </div>
    )

    function navToYear(inc: number) {
        if (year && yearIsAvailable(year + inc)) setYear(year + inc)
    }

    function yearIsAvailable(year: number) {
        return availableYears && availableYears.indexOf(year) > -1
    }

    async function getSummaries(year: number) {
        const response = await fetch(ApiEndpoints.GetYearSummaries + "?year=" + year)
        const data = await response.json()
        setSummaries(data)
    }

    async function getAvailableYears() {
        const response = await fetch(ApiEndpoints.GetAvailableYears)
        const data = await response.json()
        setAvailableYears(data)
    }


    // subcomponent for increment buttons
    interface DashboardIncrementButtonProps {
        button: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
        increment: number
    }
    function DashboardIncrementButton(props: DashboardIncrementButtonProps) {
        return (
            <div className="dash-lr-btn"
                onClick={() => { navToYear(props.increment) }}
                style={{ visibility: year && yearIsAvailable(year + props.increment) ? "visible" : "hidden" }}
            >
                <props.button width="36px" height="36px" />
            </div>
        )
    }
}

export default Dashboard
