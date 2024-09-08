/*----------------
    Literals
----------------*/
const importButtonSelector = "#importBtn"
const overlaySelector = "#overlay"
const popupImportSelector = "#popup-import"

/*----------------
    Listeners
----------------*/
$(importButtonSelector).on(Events.Click, () => toggleOverlay(false))
$(overlaySelector).on(Events.Click, () => toggleOverlay(true))

/*----------------
    Logic
----------------*/
function toggleOverlay(hidden) {
    $(overlaySelector)[addOrRemoveClass(hidden)](DNONE)
    $(popupImportSelector)[addOrRemoveClass(hidden)](DNONE)
}

// TODO: form validation