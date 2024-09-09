/*----------------
    Literals
----------------*/
const highlightedClassName = "highlighted"
const explodedClassName = "exploded"
const categoryIdDOMProperty = "data-categoryid"

const rowInCategoryTable = ".categorized-table tr"
const rowInBreakdownTable = ".breakdown-table tr"
const selectRowsWithCategory = (catId) => `${rowInCategoryTable}[data-categoryid="${catId}"]`
const selectRowsWithoutCategory = (catId) => `${rowInCategoryTable}:not([data-categoryid="${catId}"])`


/*----------------
    Listeners
----------------*/
$(rowInBreakdownTable).on("mouseenter", onCategoryRowMouseenter)
$(rowInBreakdownTable).on("mouseleave", onCategoryRowMouseleave)
$(rowInBreakdownTable).on("click", onCategoryRowClick)

/*----------------
    Logic
----------------*/

function onCategoryRowClick(e) {
    let parentRow = $(e.target).parents(TR)
    let catId = parentRow.attr(categoryIdDOMProperty)
    let newState = !parentRow.hasClass(explodedClassName)

    $(selectRowsWithCategory(catId))[addOrRemoveClass(newState)](explodedClassName)
    setDataPointExploded(catId, newState)
}
function onCategoryRowMouseenter(e) {
    let parentRow = $(e.target).parents(TR)

    if (parentRow.hasClass(explodedClassName)) return

    let catId = parentRow.attr(categoryIdDOMProperty)

    $(selectRowsWithCategory(catId)).addClass(highlightedClassName)
}
function onCategoryRowMouseleave(e) {
    let parentRow = $(e.target).parents(TR)

    if (parentRow.hasClass(explodedClassName)) return

    let catId = parentRow.attr(categoryIdDOMProperty)

    $(selectRowsWithCategory(catId)).removeClass(highlightedClassName)
}

function onChartSliceMouseover(e) {
    let catId = e.dataPoint.categoryId

    if (e.dataPoint.exploded) return

    $(selectRowsWithCategory(catId)).addClass(highlightedClassName)
    $(selectRowsWithoutCategory(catId)).removeClass(highlightedClassName)
}
function onChartSliceClicked(e) {
    let catId = e.dataPoint.categoryId

    $(selectRowsWithCategory(catId))[addOrRemoveClass(e.dataPoint.exploded)](explodedClassName)
}
function onChartSliceMouseout(e) {
    if (e.dataPoint.exploded) return

    $(rowInCategoryTable).removeClass(highlightedClassName)
}


// set category exploded in chart and render
function setDataPointExploded(categoryId, exploded) {
    for (let i = 0; i < chart.options.data[0].dataPoints.length; i++) 
        if (chart.options.data[0].dataPoints[i].categoryId == categoryId)
            chart.options.data[0].dataPoints[i].exploded = exploded

    chart.render()
}


// fetch data and render chart
$.getJSON(`/Home/BreakdownJson?start=${rangeStart}&end=${rangeEnd}`, function (data) {

    let dataPoints = data.filter(d => d.category != null && d.category.id != 0 && d.total <= 0).map((total) => {
        return {
            y: total.total / 100,
            indexLabel: total.category.categoryName,
            color: "#" + total.category.colour,
            categoryId: total.category.id,
            label: total.category.categoryName,
        }
    })

    window.chart = new CanvasJS.Chart("chartContainer", {
        data: [{
            type: "pie",
            click: onChartSliceClicked,
            mousemove: onChartSliceMouseover,
            mouseout: onChartSliceMouseout,
            dataPoints: dataPoints
        }]
    });

    window.chart.render()
})