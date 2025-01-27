import { colourAvgValue } from "../helper";
import TransactionCategory from "../types/transactionCategory";
import './styles/CategoryPills.css';

interface CategoryPillProps {
    category: TransactionCategory | undefined | null
}

function CategoryPill(props: CategoryPillProps) {

    const cat: TransactionCategory = props.category ?? {
        id: -1,
        categoryName: "uncategorized",
        colour: "ffffff"
    }

    return (
        <span className={props.category ? "category-pill" : "category-pill uncategorized"}
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