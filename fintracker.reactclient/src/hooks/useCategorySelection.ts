import { useContext } from "react"
import { createContext } from "react";
import TransactionCategory from "../types/TransactionCategory";

// TODO: figure out best way to structure context, provider, hook, context type

interface CategorySelectionContextProps {
    selectedCategories: TransactionCategory[],
    addCategory: (cat: TransactionCategory) => void,
    addCategories: (cat: TransactionCategory[]) => void,
    removeCategory: (cat: TransactionCategory) => void,
    toggleCategory: (cat: TransactionCategory) => void
    clear: () => void,
    isSelected: (cat: TransactionCategory) => boolean
}

export const CategorySelectionContext = createContext<CategorySelectionContextProps>({
    selectedCategories: [],
    addCategory: () => undefined,
    addCategories: () => undefined,
    removeCategory: () => undefined,
    toggleCategory: () => undefined,
    clear: () => undefined,
    isSelected: () => false
});

export default function useCategorySelection() {
    return useContext(CategorySelectionContext)
}