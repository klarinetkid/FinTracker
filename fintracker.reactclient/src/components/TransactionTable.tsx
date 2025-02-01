import moment from 'moment'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../common/helper'
import ApiEndpoints from '../types/apiEndpoints'
import Transaction from '../types/Transaction'
import TransactionCategory from '../types/TransactionCategory'
import CategoryPill from './CategoryPill'
import CategorySelector from './CategorySelector'
import './styles/TransactionTable.css'

interface TransactionTableProps {
    transactions: Transaction[],
    onChange: () => void
}

function TransactionTable(props: TransactionTableProps) {

    return (
        <div className="transaction-table-holder">
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Memo</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {props.transactions.map((t, i) =>
                        <TransactionTableRow key={t.id} transaction={t} num={i+1} />
                    )}
                </tbody>
            </table>
        </div>
    )

    interface TransactionTableRowProps {
        transaction: Transaction,
        num: number
    }
    function TransactionTableRow(cprops: TransactionTableRowProps) {

        const [isEditingCat, setIsEditingCat] = useState(false)
        const [newCategory, setNewCategory] = useState<TransactionCategory>()

        useEffect(() => {
            if (newCategory === undefined) return

            updateTransactionId()

        }, [newCategory, props])

        return (
            <tr>
                <td className="bold" title={"Row ID: " + cprops.transaction.id}>{cprops.num}</td>
                <td className="nobreak">{moment(cprops.transaction.date).format("yyyy-MM-DD")}</td>
                <td className="ellipsis-overflow lalign" style={{ maxWidth: "70%" }}>{cprops.transaction.memo}</td>
                <td className="ralign">{formatCurrency(cprops.transaction.amount)}</td>
                <td onDoubleClick={ () => setIsEditingCat(true) }>
                    {isEditingCat ?

                        <CategorySelector
                            onChange={setNewCategory}
                            value={cprops.transaction.category}
                            isOpen={true}
                            onClose={() => setIsEditingCat(false)} /> :

                        <CategoryPill category={cprops.transaction.category} />
                    }
                </td>
            </tr>
        )

        async function updateTransactionId() {

            if (newCategory === undefined) return

            await fetch(`${ApiEndpoints.UpdateTransactionCategory}?transactionId=${cprops.transaction.id}&categoryId=${newCategory.id}`, {
                method: "POST"
            })

            cprops.transaction.category = newCategory

            setIsEditingCat(false)
            if (props.onChange) props.onChange()
        }
    }
}

export default TransactionTable