import Moment from "moment"
import { useEffect, useState } from "react"
import TransactionService from "../services/TransactionService"
import Transaction from "../types/Transaction"
import TransactionCategory from "../types/TransactionCategory"
import { formatCurrency } from "../utils/helper"
import CategoryPill from "./CategoryPill"
import CategorySelector from "./CategorySelector"

interface TransactionTableRowProps {
    transaction: Transaction,
    num: number,
    onChange?: () => void
}

function TransactionTableRow(props: TransactionTableRowProps) {

    const [isEditingCat, setIsEditingCat] = useState(false)
    const [newCategory, setNewCategory] = useState<TransactionCategory>()

    useEffect(() => {
        if (newCategory === undefined) return

        updateTransactionCategoryId()

    }, [newCategory]) // TODO: figure out best way to use async function

    return (
        <tr>
            <td className="bold" title={"Row ID: " + props.transaction.id}>{props.num}</td>
            <td className="nobreak">{Moment(props.transaction.date).format("yyyy-MM-DD")}</td>
            <td className="ellipsis-overflow lalign" style={{ maxWidth: "70%" }}>{props.transaction.memo}</td>
            <td className="ralign">{formatCurrency(props.transaction.amount)}</td>
            <td onDoubleClick={() => setIsEditingCat(true)}>
                {isEditingCat ?

                    <CategorySelector
                        onChange={setNewCategory}
                        value={props.transaction.category}
                        isOpen={true}
                        onClose={() => setIsEditingCat(false)} /> :

                    <CategoryPill category={props.transaction.category} />
                }
            </td>
        </tr>
    )

    async function updateTransactionCategoryId() {

        if (newCategory === undefined) return

        // this just assumes it's successful?
        //await fetch(`${ApiEndpoints.UpdateTransactionCategory}?transactionId=${props.transaction.id}&categoryId=${newCategory.id}`, {
        //    method: "POST"
        //})

        // just assume it's successful?
        await TransactionService.updateTransactionCategory(props.transaction.id, newCategory.id)

        props.transaction.category = newCategory

        setIsEditingCat(false)
        if (props.onChange) props.onChange()
    }
}

export default TransactionTableRow;