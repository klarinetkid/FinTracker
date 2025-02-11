import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutisde";
import '../styles/CategorySelector.css';
import TransactionCategory from "../types/TransactionCategory";
import CategoryPill from "./CategoryPill";
import CategoryService from "../services/CategoryService";

interface CategorySelectorProps {
    onChange?: React.Dispatch<React.SetStateAction<TransactionCategory | undefined>>,
    onClose?: () => void,
    value?: TransactionCategory,
    isOpen?: boolean
}

function CategorySelector(props: CategorySelectorProps) {

    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setIsOpen(false))

    const [selectedValue, setSelectedValue] = useState<TransactionCategory | undefined>(props.value)
    const [categories, setCategories] = useState<TransactionCategory[]>()
    const [isOpen, setIsOpen] = useState(props.isOpen ?? false)


    useEffect(() => {
        if (!isOpen && props.onClose)
            props.onClose()
    }, [isOpen, props])

    useEffect(() => {
        (async () => {
            const data = await CategoryService.getCategories()
            setCategories(data)
        })()
    }, [])

    return !categories ? "" : (
        <div ref={ref} className="category-selector" onClick={ () => setIsOpen(!isOpen) }>
            {!selectedValue ? <span className="category-selector-placeholder">Select category</span> : 
                <CategoryPill category={selectedValue} />
            }
            <div className={`category-selector-menu ${isOpen ? "open" : ""}`}>
                {categories.map(c =>
                    <div key={c.id} className="category-option" onClick={ () => optionClick(c) }>
                        <CategoryPill category={c} />
                    </div>
                )}
            </div>
        </div>
    )

    function optionClick(c: TransactionCategory) {
        setSelectedValue(c)
        if (props.onChange) props.onChange(c)
        setIsOpen(false)
    }
}

export default CategorySelector;