
function onChartMouseover(e) {
    let catId = e.dataPoint.categoryId

    if (e.dataPoint.exploded) return

    $(`.categorized-table tr[data-categoryid="${catId}"]`).addClass("highlighted")
    $(`.categorized-table tr:not([data-categoryid="${catId}"])`).removeClass("highlighted")
}

function dataItemClicked(e) {
    let catId = e.dataPoint.categoryId
    $(`.categorized-table tr[data-categoryid="${catId}"]`)[e.dataPoint.exploded ? "addClass" : "removeClass"]("exploded")
}

function onChartMouseout(e) {
    if (e.dataPoint.exploded) return

    $(".categorized-table tr").removeClass("highlighted")
}

function clickChartItem(e) {
    console.log(e)
}

var chart;
function renderChart(dataPoints) {
    chart = new CanvasJS.Chart("chartContainer",
        {
            data: [
                {

                    type: "pie",
                    click: dataItemClicked,
                    mousemove: onChartMouseover,
                    mouseout: onChartMouseout,
                    dataPoints: dataPoints
                }
            ]
        });

    chart.render();
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

$.getJSON(`/Home/BreakdownJson?year=${year}&month=${month}`, function (data) {

    let dataPoints = data.filter(d => d.categoryId != 0 && d.categoryTotal <= 0).map(totalToDataPoint)
    renderChart(dataPoints)

})