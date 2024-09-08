/*----------------
    Literals
----------------*/
const updateDefaultCatSelectSelector = ".update-default-categorization"
const recordIdAttr = "data-recordid"
const spinnerSelector = ".spinner"
const requestLoadingClassName = "request-loading"

const modelIdAttr = "model[Id]"
const modelCategoryIdAttr = "model[CategoryId]"

const itemEndpoint = "/Defaults/item"


/*----------------
    Listeners
----------------*/
$(updateDefaultCatSelectSelector).on(Events.Change, updateCategorization)


/*----------------
    Logic
----------------*/
function updateCategorization(e) {

    let recordId = e.target.getAttribute(recordIdAttr)
    let categoryId = e.target.value

    let fd = new FormData();
    fd.append(modelIdAttr, recordId)
    fd.append(modelCategoryIdAttr, categoryId)

    toggleLoading(e.target, true)

    $.ajax({
        url: itemEndpoint,
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

function toggleLoading(target, loading) {
    $(target).parents(TR)[addOrRemoveClass(loading)](requestLoadingClassName)
}