
type TransactionCategory = {
    id: number,
    categoryName: string,
    colour: string
}

export const Uncategorized: TransactionCategory = {
    id: -1,
    categoryName: "uncategorized",
    colour: "ffffff"
}

export const Total: TransactionCategory = {
    id: -2,
    categoryName: "Total",
    colour: "330033"
}

export default TransactionCategory;