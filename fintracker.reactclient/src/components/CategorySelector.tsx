import { useEffect, useState } from "react";
import ApiEndpoints from "../types/apiEndpoints";
import TransactionCategory from "../types/transactionCategory";
import CategoryPill from "./CategoryPill";
import './styles/CategorySelector.css';

interface CategorySelectorProps {
    setValue: React.Dispatch<React.SetStateAction<TransactionCategory | undefined>>
}

function CategorySelector(props: CategorySelectorProps) {

    const [categories, setCategories] = useState<TransactionCategory[]>()

    useEffect(() => {
        getCategories()
    }, [])

    return !categories ? "" : (
        <div className="category-selector-holder">
            <div className="category-selector">
                {categories.map(c =>
                    <div key={c.id}
                        className="category-option"
                        onClick={() => props.setValue(c)}
                    >
                        <CategoryPill category={c} />
                    </div>
                )}
            </div>
        </div>
    )

    async function getCategories() {
        const response = await fetch(ApiEndpoints.GetCategories)
        const data = await response.json()
        setCategories(data)
    }
}

export default CategorySelector;