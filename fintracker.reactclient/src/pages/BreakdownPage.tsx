import Moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InOutPills from "../components/InOutPills";
import Spacer from "../components/Spacer";
import SpendingTable from "../components/SpendingTable";
import TransactionTable from "../components/TransactionTable";
import ApiEndpoints from "../types/apiEndpoints";
import Breakdown from "../types/Breakdown";
import IncomeCard from "../components/IncomeCard";
import BackButton from "../components/BackButton";

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

    return (

        !paramsAreValid ? <h1>Invalid Parameters</h1> : // TODO: show back button
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
        const response = await fetch(`${ApiEndpoints.GetBreakdown}?start=${start.format("yyyy-MM-DD")}&end=${end.format("yyyy-MM-DD")}`)
        const data = await response.json()
        setBreakdown(data)
    }

    function refreshList() {
        setIsUpdated(!isUpdated)
    }

    //function getBreakdownTitle(): string {

    //    if (!paramsAreValid) return ""

    //    if (end.isSame(Moment(start).add(1, 'months')))
    //        return start.format("MMMM yyyy")

    //    else if (end.isSame(Moment(start).add(1, 'years')))
    //        return "Year " + start.format("yyyy")
    //    else {
    //        if (start.year() == end.year()) {
    //            return start.format("MMMM") + " - " +
    //                Moment(end).add(-1, 'days').format("MMMM yyyy")
    //        }
    //        else {
    //            return start.format("MMMM yyyy") + " - " +
    //                Moment(end).add(-1, 'days').format("MMMM yyyy")
    //        }
    //    }
    //}
}

export default BreakdownPage;