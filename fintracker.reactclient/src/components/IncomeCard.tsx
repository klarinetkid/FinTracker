import { formatCurrency } from "../common/helper";
import CategoryTotal from "../types/CategoryTotal";
import CategoryPill from "./CategoryPill";
import './styles/IncomeCard.css'

interface IncomeCardProps {
    categoryTotal: CategoryTotal
}

function IncomeCard(props: IncomeCardProps) {

    return (
        <div className="income-card">
            <CategoryPill category={props.categoryTotal.category} />
            <h2>+{formatCurrency(props.categoryTotal.total)}</h2>
        </div>
    )
}

export default IncomeCard;