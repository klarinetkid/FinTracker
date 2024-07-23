
$(".import-row-checkbox").on("change", function (e) {
    let row = $(e.target).parents("tr")
    row[e.target.checked ? "removeClass" : "addClass"]("import-row-inactive")
    row.find("select").attr("disabled", !e.target.checked)

    row.find(".save-default-checkbox").attr("disabled", !e.target.checked)
    if (!e.target.checked)
        row.find(".save-default-checkbox").attr("checked", false)
})

$("select.autofilled").on("change", function (e) {
    $(e.target).removeClass("autofilled")
})

$("#btnHideUnselectedTransactions").on("click", function () {
    $(".import-transactions-table").toggleClass("hide-unselected-transactions")
})