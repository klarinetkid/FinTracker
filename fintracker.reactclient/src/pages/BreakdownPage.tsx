import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import IncomeCard from "../components/IncomeCard";
import InOutPills from "../components/InOutPills";
import Spacer from "../components/Spacer";
import SpendingTable from "../components/SpendingTable";
import TransactionTable from "../components/TransactionTable";
import BreakdownService from "../services/BreakdownService";
import Breakdown from "../types/Breakdown";
import { breakdownParamsAreValid } from "../utils/BreakdownHelper";
import CategorySelectionProvider from "../contexts/CategorySelectionContext";

function BreakdownPage() {
    const [searchParams] = useSearchParams()

    const start = useMemo(() => searchParams.get("start") ?? "", [searchParams]);
    const end = useMemo(() => searchParams.get("end") ?? "", [searchParams]);
    const paramsAreValid = breakdownParamsAreValid(moment(start), moment(end))

    const [breakdown, setBreakdown] = useState<Breakdown>()
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        if (!paramsAreValid) return

        (async () => {
            const data = await BreakdownService.getBreakdown(start, end)
            setBreakdown(data)
        })()

    }, [paramsAreValid, start, end, isUpdated])

    return (!paramsAreValid ? 
        <>
            <BackButton />
            <h1>Invalid Parameters</h1>
        </>
        : 
        <div className="container">
            <div className="noselect flex align-centre">

                <BackButton />

                <h1 className="display-4">{breakdown ? breakdown.title : "" }</h1>
            </div>

            {!breakdown ? 
                ""
                :
                <>
                    <InOutPills totalIn={breakdown.totalIn} totalOut={breakdown.totalOut} />

                    <Spacer height={26} />

                    <CategorySelectionProvider>

                        <div style={{ display: "flex" }}>

                            <div style={{ flexGrow: 1, marginRight: 20 }}>
                                <SpendingTable breakdown={breakdown} />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column" }}>

                                {breakdown.categoryTotals.filter(c => c.total > 0).map((c, i) =>
                                    <IncomeCard key={i} categoryTotal={c} />
                                )}

                            </div>
                        </div>

                        <Spacer height={26} />

                        <TransactionTable transactions={breakdown?.transactions} onChange={refreshList} />

                    </CategorySelectionProvider>
                </>
            }
        </div>
    )

    function refreshList() {
        setIsUpdated(!isUpdated)
    }
}

export default BreakdownPage;