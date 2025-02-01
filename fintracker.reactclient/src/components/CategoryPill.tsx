import { colourAvgValue } from "../common/helper";
import TransactionCategory, { Uncategorized } from "../types/TransactionCategory";
import './styles/CategoryPills.css';

interface CategoryPillProps {
    category: TransactionCategory | undefined | null
}

function CategoryPill(props: CategoryPillProps) {

    const cat: TransactionCategory = props.category ?? Uncategorized

    return (
        <span className={cat.id >= 0 ? "category-pill" : "category-pill uncategorized"}
            style={{
                backgroundColor: "#" + cat.colour,
                color: colourAvgValue(cat.colour) > (0xff/2) ? "black" : "white"
            }}
        >
            {cat.categoryName}
        </span>
    )
}

export default CategoryPill;