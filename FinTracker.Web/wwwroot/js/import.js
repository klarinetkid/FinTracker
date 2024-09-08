/*----------------
    Literals
----------------*/
const inactiveTransactionRowClassName = "import-row-inactive"
const autoFilledClassName = "autofilled"
const hideUnselectedTransactionsClassName = "hide-unselected-transactions"

const importTransactionsTableSelector = ".import-transactions-table"
const importRowCheckboxSelector = ".import-row-checkbox"
const autofilledSelectSelector = "select.autofilled"
const importFormSelector = "#import-form"
const hideUnselectedBtnSelector = "#btnHideUnselectedTransactions"
const saveDefaultCheckboxSelector = ".save-default-checkbox"

/*----------------
    Listeners
----------------*/
$(importRowCheckboxSelector).on(Events.Change, function (e) {
    let row = $(e.target).parents(TR)

    row[addOrRemoveClass(!e.target.checked)](inactiveTransactionRowClassName)
    row.find("select").attr(Attrs.Disabled, !e.target.checked)

    row.find(saveDefaultCheckboxSelector).attr(Attrs.Disabled, !e.target.checked)
    if (!e.target.checked)
        row.find(saveDefaultCheckboxSelector).attr(Attrs.Checked, false)
})

$(autofilledSelectSelector).on(Events.Change, function (e) {
    $(e.target).removeClass(autoFilledClassName)
})

$(hideUnselectedBtnSelector).on(Events.Click, function () {
    $(importTransactionsTableSelector).toggleClass(hideUnselectedTransactionsClassName)
})

$(importFormSelector).on(Events.Submit, function () {

    // don't submit this data
    $("." + inactiveTransactionRowClassName).find("input, select").attr(Attrs.Name, EMPTY)

    // fix the names
    let activeRows = $("tr:not(.import-row-inactive)")
    for (let i = 1; i < activeRows.length; i++) { // start at 1 to skip header row
        $(activeRows[i]).find("input, select").map((_, e) => replaceNumberInName(e, i - 1))
    }

})

/*----------------
    Logic
----------------*/
function replaceNumberInName(element, num) {
    if (element.hasAttribute("name"))
        element.setAttribute("name", element.getAttribute("name").replace(/[0-9]+/, num))
}
