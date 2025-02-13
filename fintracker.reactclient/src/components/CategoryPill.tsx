import '../styles/CategoryPills.css';
import TransactionCategory, { Uncategorized } from "../types/TransactionCategory";
import { colourAvgValue } from '../utils/ColourHelper';

interface CategoryPillProps {
    category: TransactionCategory | undefined | null
}

function CategoryPill(props: CategoryPillProps) {

    const cat: TransactionCategory = props.category ?? Uncategorized
    const className = (cat.id || cat.id === 0) ? "category-pill" : "category-pill uncategorized"
    const style = {
        backgroundColor: "#" + cat.colour,
        color: colourAvgValue(cat.colour) > (0xff / 2) ? "black" : "white"
    }

    return (
        <span className={className} style={style}>
            {cat.categoryName}
        </span>
    )
}

export default CategoryPill;