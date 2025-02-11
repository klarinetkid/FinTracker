import '../styles/IncomeCard.css';
import CategoryTotal from "../types/CategoryTotal";
import { formatCurrency } from "../utils/helper";
import CategoryPill from "./CategoryPill";

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