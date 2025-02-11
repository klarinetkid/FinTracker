
interface DashboardIncrementButtonProps {
    button: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    increment: number,

    // parent props
    currentYear: number | undefined,
    setCurrentYear: React.Dispatch<React.SetStateAction<number | undefined>>,
    availableYears: number[] | undefined
}
function DashboardIncrementButton(props: DashboardIncrementButtonProps) {

    const targetYear = (props.currentYear ?? 0) + props.increment

    return (
        <div className="dash-lr-btn"
            style={{ visibility: yearIsAvailable() ? "visible" : "hidden" }}
            onClick={() => yearIsAvailable() && props.setCurrentYear(targetYear)}
        >
            <props.button width="36px" height="36px" />
        </div>
    )

    function yearIsAvailable() {
        return props.currentYear &&
            props.availableYears &&
            props.availableYears.indexOf(targetYear) > -1
    }
}

export default DashboardIncrementButton;