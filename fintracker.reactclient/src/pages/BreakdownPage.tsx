import Moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import IncomeCard from "../components/IncomeCard";
import InOutPills from "../components/InOutPills";
import Spacer from "../components/Spacer";
import SpendingTable from "../components/SpendingTable";
import TransactionTable from "../components/TransactionTable";
import BreakdownService from "../services/BreakdownService";
import Breakdown from "../types/Breakdown";

function BreakdownPage() {
    const [searchParams] = useSearchParams()

    const start = Moment(searchParams.get("start") ?? "")
    const end = Moment(searchParams.get("end") ?? "")

    const paramsAreValid = start.isValid() && end.isValid() && end.isAfter(start)

    const [breakdown, setBreakdown] = useState<Breakdown>()
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        if (!paramsAreValid || breakdown) return
        getBreakdown();
    }, [paramsAreValid, breakdown])

    useEffect(() => {

        getBreakdown()

    }, [isUpdated])

    return (!paramsAreValid ? 
        <>
            <BackButton />
            <h1>Invalid Parameters</h1>
        </>
        : 
        <div className="container">
            <div className="noselect flex align-centre">

                <BackButton />

                <h1 className="display-4">{breakdown ? breakdown.title : "Loading..." }</h1>
            </div>

            {!breakdown ? "" :
                <>
                    <InOutPills totalIn={breakdown.totalIn} totalOut={breakdown.totalOut} />

                    <Spacer height={26} />

                    <div style={{ display: "flex" }}>

                        <div style={{ flexGrow: 1, marginRight: 20 }}>
                            <SpendingTable
                                breakdown={breakdown}
                                allowSelect={true}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>

                            {breakdown.categoryTotals.filter(c => c.total > 0).map((c, i) =>
                                <IncomeCard key={i} categoryTotal={c} />
                            )}

                        </div>
                    </div>


                    <Spacer height={26} />

                    <TransactionTable transactions={breakdown?.transactions} onChange={refreshList} />
                </>
            }
        </div>
    );

    async function getBreakdown() {
        const data = await BreakdownService.getBreakdown(start, end)
        setBreakdown(data)
    }

    function refreshList() {
        setIsUpdated(!isUpdated)
    }
}

export default BreakdownPage;