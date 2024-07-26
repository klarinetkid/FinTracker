/*----------------
    Literals
----------------*/
const C_Invisible = "invisible"
const C_NewCategoryRow = "new-category-row"

const A_InitialValue = "data-initial"
const S_HasInitialValue = `input[${A_InitialValue}]`

const S_CategoriesTable = ".system-categories-table"
const S_SaveCategoryButton = ".save-category-btn"
const S_ColourInput = ".category-colour-input"
const S_ResetCategoryButton = ".reset-category-btn"
const S_Input = "input"
const S_DeleteCategoryButton = ".delete-category-btn"
const S_AddCategoryButton = ".add-category-row"

const _itemEndpoint = "/categories/item"

/*----------------
    Listeners
----------------*/

// show save/cancel buttons
$(S_CategoriesTable).on([Events.Change, Events.Keyup].join(', '), S_Input, showSaveCancelBtns)

// preview colour input
$(S_CategoriesTable).on([Events.Change, Events.Keyup].join(', '), S_ColourInput, showColour)

// add new row
$(S_AddCategoryButton).on(Events.Click, addNewRow)

// item save/cancel/delete
$(S_CategoriesTable).on(Events.Click, S_SaveCategoryButton, saveRecord)
$(S_CategoriesTable).on(Events.Click, S_ResetCategoryButton, resetCategory)
$(S_CategoriesTable).on(Events.Click, S_DeleteCategoryButton, deleteCategory)

/*----------------
    Logic
----------------*/
function showSaveCancelBtns(e, hideBtns = false) {
    $(e.target).parents(TR).find(S_SaveCategoryButton + ", " + S_ResetCategoryButton)[addOrRemoveClass(hideBtns)](C_Invisible)
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
        url: _itemEndpoint,
        method: method,
        data: fd,
        processData: false,
        contentType: false,
        success: function (response) {
            showSaveCancelBtns(e, true)
            parentRow.removeClass(C_NewCategoryRow)

            // update initial values
            parentRow.find(S_HasInitialValue).map(
                (i, e) => e.setAttribute(A_InitialValue, e.value))

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

    $(e.target).parents(TR).find(S_HasInitialValue)
        .map((i, e) => e.value = e.getAttribute(A_InitialValue))

    showSaveCancelBtns(e, true)
}

function addNewRow() {

    // clone first row
    let row = $(".system-categories-table tbody tr")[0].cloneNode(true)

    // clear values
    $(row).find("input").val("")

    // reset colour preview
    $(row).find(S_ColourInput).parents(TD).css("background", "white")

    // clear row number
    $(row).find(TD)[0].innerText = EMPTY

    // add new row class
    $(row).addClass(C_NewCategoryRow)

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

    let categoryName = parentRow.find(`input[name="model[CategoryName]"]`).attr(A_InitialValue)

    if (!confirm(`Delete category ${categoryName}?`)) return

    $.ajax({
        url: _itemEndpoint,
        method: HttpMethod.DELETE,
        data: { Id: itemId },
        //processData: false,
        //contentType: false,
        success: function () {
            parentRow.remove()
        }
    })
}
