/*----------------
    Literals
----------------*/
const S_UpdateDefaultCatSelect = ".update-default-categorization"
const A_RecordId = "data-recordid"
const S_Spinner = ".spinner"
const C_RequestLoading = "request-loading"

const M_Id = "model[Id]"
const M_CategoryId = "model[CategoryId]"

const _ItemEndpoint = "/Defaults/item"

/*----------------
    Listeners
----------------*/
$(S_UpdateDefaultCatSelect).on(Events.Change, updateCategorization)


/*----------------
    Logic
----------------*/
function updateCategorization(e) {

    let recordId = e.target.getAttribute(A_RecordId)
    let categoryId = e.target.value

    let fd = new FormData();
    fd.append(M_Id, recordId)
    fd.append(M_CategoryId, categoryId)

    toggleLoading(e.target, true)

    $.ajax({
        url: _ItemEndpoint,
        data: fd,
        method: HttpMethod.PATCH,
        contentType: false,
        processData: false,
        success: function () {
            setTimeout(function () {
                toggleLoading(e.target, false)
            }, 100)
        }
    })
}

//function toggleSpinner(target, hidden) {
//    $(target).parents(TR).find(S_Spinner)[addOrRemoveClass(hidden)](DNONE)
//}

function toggleLoading(target, loading) {
    $(target).parents(TR)[addOrRemoveClass(loading)](C_RequestLoading)
}