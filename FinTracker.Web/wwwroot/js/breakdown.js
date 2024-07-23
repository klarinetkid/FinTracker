/*----------------
    Literals
----------------*/
const C_Highlighted = "highlighted"
const C_Exploded = "exploded"

const S_RowInCategoryTable = ".categorized-table tr"
const S_RowsWithCategory = (catId) => `${S_RowInCategoryTable}[data-categoryid="${catId}"]`
const S_RowsWithoutCategory = (catId) => `${S_RowInCategoryTable}:not([data-categoryid="${catId}"])`

const _ChartDataSource = `/Home/BreakdownJson?year=${year}&month=${month}`
const _ChartContainerId = "chartContainer"
const _ChartType = "pie"

/*----------------
    Listeners
----------------*/



/*----------------
    Logic
----------------*/

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
        y: total.categoryTotal / 100,
        indexLabel: total.categoryName,
        color: "#" + total.categoryColour,
        categoryId: total.categoryId,
        label: total.categoryName,
    }
}

$.getJSON(_ChartDataSource, function (data) {

    let dataPoints = data.filter(d => d.categoryId != 0 && d.categoryTotal <= 0).map(totalToDataPoint)
    renderChart(dataPoints)

})