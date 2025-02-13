import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ArrowLeft from '../assets/arrow-left-square.svg?react'
import ArrowRight from '../assets/arrow-right-square.svg?react'
import DashboardIncrementButton from '../components/DashboardIncrementButton'
import InOutPills from '../components/InOutPills'
import MonthSummaryCard from '../components/MonthSummaryCard'
import Spacer from '../components/Spacer'
import BreakdownService from '../services/BreakdownService'
import SummaryService from '../services/MetadataService'
import Breakdown from '../types/Breakdown'
import { getTotalIn, getTotalOut } from '../utils/BreakdownHelper'
import MetadataService from '../services/MetadataService'

function Dashboard() {

    const [searchParams] = useSearchParams()

    const defaultYear = parseInt(searchParams.get("year") ?? "") || undefined

    const [breakdowns, setBreakdowns] = useState<Breakdown[]>()
    const [availableYears, setAvailableYears] = useState<number[]>()
    const [year, setYear] = useState(defaultYear)

    // TODO: years should be kept in a global state. when transactions change (imported)
    // refresh the value. but otherwise it doesn't change and should be globally available.
    useEffect(() => {
        if (availableYears) {
            if (!year && availableYears[0]) setYear(availableYears[0])
            return
        }

        (async () => {
            const data = await SummaryService.getAvailableYears()
            setAvailableYears(data)
        })()
    }, [availableYears, year])


    useEffect(() => {
        (async () => {
            if (!year) return
            const data = await BreakdownService.getYearSummaries(year)
            setBreakdowns(data) // TODO: push history
        })()
    }, [year])


    return (
        <div className="container" style={{ width: 800, margin: "auto" }}>

            <div className="flex justify-btwn align-centre noselect">

                <DashboardIncrementButton
                    button={ArrowLeft}
                    increment={-1}
                    availableYears={availableYears}
                    currentYear={year}
                    setCurrentYear={setYear}
                />

                <h1>Dashboard {year}</h1>

                <DashboardIncrementButton
                    button={ArrowRight}
                    increment={1}
                    availableYears={availableYears}
                    currentYear={year}
                    setCurrentYear={setYear}
                />

            </div>

            {!breakdowns ?
                ""
                :
                <>
                    <InOutPills totalIn={getTotalIn(breakdowns)} totalOut={getTotalOut(breakdowns)} />

                    <Spacer height={26} />

                    <div className="row">
                        {!breakdowns ? "loading..." : breakdowns.filter(s => s.categoryTotals.length > 0).map(s =>
                            <MonthSummaryCard key={s.start.toString()} breakdown={s} />
                        )}
                    </div>
                </>
            }
        </div>
    )
}

export default Dashboard
