/*----------------
    Literals
----------------*/
const C_InactiveTransactionRow = "import-row-inactive"
const C_AutoFilled = "autofilled"
const C_HideUnselectedTransactions = "hide-unselected-transactions"

const S_ImportTransactionsTable = ".import-transactions-table"
const S_ImportRowCheckbox = ".import-row-checkbox"
const S_AutofilledSelect = "select.autofilled"
const S_InputsAndSelects = "input, select"
const S_ImportForm = "#import-form"
const S_HideUnselectedTransactionsButton = "#btnHideUnselectedTransactions"
const S_SaveDefaultCheckbox = ".save-default-checkbox"
const S_Select = "select"

/*----------------
    Listeners
----------------*/
$(S_ImportRowCheckbox).on(Events.Change, function (e) {
    let row = $(e.target).parents(TR)

    row[addOrRemoveClass(!e.target.checked)](InactiveTransactionRow)
    row.find(S_Select).attr(Attrs.Disabled, !e.target.checked)

    row.find(S_SaveDefaultCheckbox).attr(Attrs.Disabled, !e.target.checked)
    if (!e.target.checked)
        row.find(S_SaveDefaultCheckbox).attr(Attrs.Checked, false)
})

$(S_AutofilledSelect).on(Events.Change, function (e) {
    $(e.target).removeClass(C_AutoFilled)
})

$(S_HideUnselectedTransactionsButton).on(Events.Click, function () {
    $(S_ImportTransactionsTable).toggleClass(C_HideUnselectedTransactions)
})

$(S_ImportForm).on(Events.Submit, function () {

    // don't submit this data
    $("." + C_InactiveTransactionRow).find(S_InputsAndSelects).attr(Attrs.Name, EMPTY)
})

/*----------------
    Logic
----------------*/

