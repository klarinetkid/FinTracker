
$("#importBtn").on("click", function () {
    $("#overlay").removeClass("d-none")
    $("#popup-import").removeClass("d-none")
})

$("#overlay").on("click", function () {
    $("#overlay").addClass("d-none")
    $("#popup-import").addClass("d-none")
})

// TODO: form validation