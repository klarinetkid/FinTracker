/*----------------
    Literals
----------------*/
const C_Highlighted = "highlighted"
const C_Exploded = "exploded"

const S_RowInCategoryTable = ".categorized-table tr"
const S_RowInBreakdownTable = ".breakdown-table tr"
const S_RowsWithCategory = (catId) => `${S_RowInCategoryTable}[data-categoryid="${catId}"]`
const S_RowsWithoutCategory = (catId) => `${S_RowInCategoryTable}:not([data-categoryid="${catId}"])`

const _ChartDataSource = `/Home/BreakdownJson?year=${year}` + (month > 0 ? `&month=${month}` : "")
const _ChartContainerId = "chartContainer"
const _ChartType = "pie"

/*----------------
    Listeners
----------------*/
$(S_RowInBreakdownTable).on("mouseenter", onRowMouseenter)
$(S_RowInBreakdownTable).on("mouseleave", onRowMouseleave)
$(S_RowInBreakdownTable).on("click", onRowClick)

/*----------------
    Logic
----------------*/

function onRowClick(e) {
    let parentRow = $(e.target).parents(TR)
    let catId = parentRow.attr("data-categoryid")
    let newState = !parentRow.hasClass(C_Exploded)

    $(S_RowsWithCategory(catId))[addOrRemoveClass(newState)](C_Exploded)
    setDataPointExploded(catId, newState)
}

function onRowMouseenter(e) {
    let parentRow = $(e.target).parents(TR)

    if (parentRow.hasClass(C_Exploded)) return

    let catId = parentRow.attr("data-categoryid")

    $(S_RowsWithCategory(catId)).addClass(C_Highlighted)
    //$(S_RowsWithoutCategory(catId)).removeClass(C_Highlighted)
}

function onRowMouseleave(e) {
    let parentRow = $(e.target).parents(TR)

    if (parentRow.hasClass(C_Exploded)) return

    let catId = parentRow.attr("data-categoryid")

    $(S_RowsWithCategory(catId)).removeClass(C_Highlighted)
}

function onChartMouseover(e) {
    let catId = e.dataPoint.categoryId

    if (e.dataPoint.exploded) return

    $(S_RowsWithCategory(catId)).addClass(C_Highlighted)
    $(S_RowsWithoutCategory(catId)).removeClass(C_Highlighted)
}

function dataItemClicked(e) {
    let catId = e.dataPoint.categoryId

    $(S_RowsWithCategory(catId))[addOrRemoveClass(e.dataPoint.exploded)](C_Exploded)
}

function onChartMouseout(e) {
    if (e.dataPoint.exploded) return

    $(S_RowInCategoryTable).removeClass(C_Highlighted)
}

function clickChartItem(e) {
    console.log(e)
}

function renderChart(dataPoints) {
    window.chart = new CanvasJS.Chart(_ChartContainerId,
        {
            data: [
                {
                    type: _ChartType,
                    click: dataItemClicked,
                    mousemove: onChartMouseover,
                    mouseout: onChartMouseout,
                    dataPoints: dataPoints
                }
            ]
        });

    window.chart.render();
}

function totalToDataPoint(total) {
    return {
        y: total.total / 100,
        indexLabel: total.category.categoryName,
        color: "#" + total.category.colour,
        categoryId: total.category.id,
        label: total.category.categoryName,
    }
}

function setDataPointExploded(categoryId, exploded) {
    for (let i = 0; i < chart.options.data[0].dataPoints.length; i++) 
        if (chart.options.data[0].dataPoints[i].categoryId == categoryId)
            chart.options.data[0].dataPoints[i].exploded = exploded

    chart.render()
}


$.getJSON(_ChartDataSource, function (data) {

    let dataPoints = data.filter(d => d.category.id != 0 && d.total <= 0).map(totalToDataPoint)
    renderChart(dataPoints)

})