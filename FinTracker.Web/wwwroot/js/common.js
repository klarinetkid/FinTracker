// enum constants
const HttpMethod = { DELETE: "DELETE", GET: "GET", POST: "POST", PATCH: "PATCH" }
const Events = { Click: "click", Submit: "submit", Ready: "ready", Change: "change", Keyup: "keyup", Keydown: "keydown", Mouseover: "Mouseover" }
const Attrs = { Name: "name", Disabled: "disabled", Checked: "checked" }

// string constants
const EMPTY = ""
const SPACE = " "
const NBSP = "&nbsp;"
const DNONE = "d-none"

// element constants
const TR = "tr"
const TD = "td"
const TBODY = "tbody"
const FORM = "form"


// common functions
function addOrRemoveClass(value) {
    return value ? "addClass" : "removeClass"
}

function isFormValid(formSelector) {

    const C_RequiredField = ".form-required"
    const S_RequiredFields = `input${C_RequiredField}, select${C_RequiredField}`

    return $(formSelector).find(S_RequiredFields).filter((i, e) => !e.value).length === 0
}

function collectFormData(target) {
    let fd = new FormData()
    target.find("[name]").map((_, e) => fd.append(e.name, e.value))
    return fd
}