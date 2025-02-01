
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

export default TransactionCategory;