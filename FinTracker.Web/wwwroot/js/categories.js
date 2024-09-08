/*----------------
    Literals
----------------*/
const invisibleClassName = "invisible"
const newCategoryRowClassName = "new-category-row"

const initialValueAttr = "data-initial"
const hasInitialValueSelector = `input[${initialValueAttr}]`

const categoriesTableSelector = ".system-categories-table"
const saveCategoryButtonSelector = ".save-category-btn"
const colourInputSelector = ".category-colour-input"
const resetCategoryButtonSelector = ".reset-category-btn"
const deleteCategoryButtonSelector = ".delete-category-btn"
const addCategoryButtonSelector = ".add-category-row"

const itemEndpoint = "/categories/item"

/*----------------
    Listeners
----------------*/

// show save/cancel buttons
$(categoriesTableSelector).on([Events.Change, Events.Keyup].join(', '), "input", showSaveCancelBtns)

// preview colour input
$(categoriesTableSelector).on([Events.Change, Events.Keyup].join(', '), colourInputSelector, showColour)

// add new row
$(addCategoryButtonSelector).on(Events.Click, addNewRow)

// item save/cancel/delete
$(categoriesTableSelector).on(Events.Click, saveCategoryButtonSelector, saveRecord)
$(categoriesTableSelector).on(Events.Click, resetCategoryButtonSelector, resetCategory)
$(categoriesTableSelector).on(Events.Click, deleteCategoryButtonSelector, deleteCategory)

/*----------------
    Logic
----------------*/
function showSaveCancelBtns(e, hideBtns = false) {
    $(e.target).parents(TR).find(saveCategoryButtonSelector + ", " + resetCategoryButtonSelector)[addOrRemoveClass(hideBtns)](invisibleClassName)
}

function showColour(e) {
    $(e.target).parents(TD).css("background", e.target.value.length == 6 ? "#" + e.target.value : "white")
}

function saveRecord(e) {

    let parentRow = $(e.target).parents(TR)
    let fd = collectFormData(parentRow)

    let isExistingRecord = fd.get("model[Id]")
    let method = isExistingRecord ? HttpMethod.PATCH : HttpMethod.POST

    $.ajax({
        url: itemEndpoint,
        method: method,
        data: fd,
        processData: false,
        contentType: false,
        success: function (response) {
            showSaveCancelBtns(e, true)
            parentRow.removeClass(newCategoryRowClassName)

            // update initial values
            parentRow.find(hasInitialValueSelector).map(
                (i, e) => e.setAttribute(initialValueAttr, e.value))

            // add ID if is new row
            if (!isExistingRecord && response.id) {
                parentRow.find(`input[name="model[Id]"]`).val(response.id)
            }
        }
    })
}

function resetCategory(e) {

    // check if new category
    let parentRow = $(e.target).parents(TR)
    let itemId = parentRow.find(`input[name="model[Id]"]`).val()

    // if no item ID, cancel new row
    if (!itemId) {
        parentRow.remove()
        return
    }

    $(e.target).parents(TR).find(hasInitialValueSelector)
        .map((i, e) => e.value = e.getAttribute(initialValueAttr))

    showSaveCancelBtns(e, true)
}

function addNewRow() {

    // clone first row
    let row = $(".system-categories-table tbody tr")[0].cloneNode(true)

    // clear values
    $(row).find("input").val("")

    // reset colour preview
    $(row).find(colourInputSelector).parents(TD).css("background", "white")

    // clear row number
    $(row).find(TD)[0].innerText = EMPTY

    // add new row class
    $(row).addClass(newCategoryRowClassName)

    $(row).find("button.invisible").removeClass("invisible")

    // prepend to table
    $(".system-categories-table tbody").prepend(row)
}

function deleteCategory(e) {

    // does row exist? check for id value
    let parentRow = $(e.target).parents(TR)
    let itemId = parentRow.find(`input[name="model[Id]"]`).val()

    // if no item ID, cancel new row
    if (!itemId) {
        parentRow.remove()
        return
    }

    // else check for transaction number
    let transactionNumber = parentRow.find("input.transaction-count").val()
    if (transactionNumber && transactionNumber !== "0") {
        alert("can't delete a category with transactions!")
        return
    }

    let categoryName = parentRow.find(`input[name="model[CategoryName]"]`).attr(initialValueAttr)

    if (!confirm(`Delete category ${categoryName}?`)) return

    $.ajax({
        url: itemEndpoint,
        method: HttpMethod.DELETE,
        data: { Id: itemId },
        //processData: false,
        //contentType: false,
        success: function () {
            parentRow.remove()
        }
    })
}
