
import { useState } from 'react';
import TransactionCategory from '../types/TransactionCategory';
import { CategorySelectionContext } from '../hooks/useCategorySelection';

export default function CategorySelectionProvider({ children }: { children: React.ReactNode }) { // TODO: what type for children

    const [selectedCategories, setSelectedCategories] = useState<TransactionCategory[]>([]);

    const addCategory = (cat: TransactionCategory) => {
        if (!isSelected(cat)) {
            const newCategories = [...selectedCategories]
            newCategories.push(cat)
            setSelectedCategories(newCategories)
        }
    }

    const addCategories = (cats: TransactionCategory[]) => {

        // TODO: learn why this didn't work
        //cats.map(c => addCategory(c))

        const newCategories = [...selectedCategories]
        for (const cat of cats)
            if (!isSelected(cat))
                newCategories.push(cat)

        if (newCategories.length != selectedCategories.length)
            setSelectedCategories(newCategories)
    }

    const removeCategory = (cat: TransactionCategory) => {
        if (isSelected(cat)) {
            const index = selectedCategories.map(c => c.id).indexOf(cat.id)
            const newCategories = [...selectedCategories]
            newCategories.splice(index, 1)
            setSelectedCategories(newCategories)
        }
    }

    const toggleCategory = (cat: TransactionCategory) => {
        if (isSelected(cat)) removeCategory(cat)
        else addCategory(cat)
    }

    const clear = () => {
        setSelectedCategories([])
    }

    const isSelected = (cat: TransactionCategory) => {
        return selectedCategories.map(c => c.id).indexOf(cat.id) > -1
    }

    const value = { selectedCategories, addCategory, addCategories, removeCategory, toggleCategory, clear, isSelected }

    return (
        <CategorySelectionContext.Provider value={value}>
            {children}
        </CategorySelectionContext.Provider>
    )
}