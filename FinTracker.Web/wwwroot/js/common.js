// enum constants
const HttpMethod = { DELETE: "DELETE", GET: "GET", POST: "POST", PATCH: "PATCH" }
const Events = { Click: "click", Submit: "submit", Ready: "ready", Change: "change" }
const Attrs = { Name: "name", Disabled: "disabled", Checked: "checked" }

// string constants
const EMPTY = ""
const SPACE = " "
const NBSP = "&nbsp;"
const DNONE = "d-none"
const TR = "tr"
const TBODY = "tbody"

// common functions
function addOrRemoveClass(value) {
    return value ? "addClass" : "removeClass"
}