/*----------------
    Literals
----------------*/
const S_ImportButton = "#importBtn"
const S_Overlay = "#overlay"
const S_PopupImport = "#popup-import"

/*----------------
    Listeners
----------------*/
$(S_ImportButton).on(Events.Click, showOverlay)
$(S_Overlay).on(Events.Click, hideOverlay)

/*----------------
    Logic
----------------*/
function showOverlay() {
    toggleOverlay(false)
}

function hideOverlay() {
    toggleOverlay(true)
}

function toggleOverlay(hidden) {
    $(S_Overlay)[addOrRemoveClass(hidden)](DNONE)
    $(S_PopupImport)[addOrRemoveClass(hidden)](DNONE)
}

// TODO: form validation