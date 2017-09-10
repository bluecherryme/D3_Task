//make array with all values to allow y-scale to be displayed correctly
// function joinAllValues(dataG, dataType){
//     //dataType is an array of objects
//     let allValues = [];
    
// }

var makeChart = (dataG, dataTypes, chartType) => {
    var width = 800;
    var height = 400;
    var margin = {top: 50, bottom: 40, left: 70, right: 50};

    //scales
    var xExtent = d3.extent(dataG, d => d.timestamp); //finds min and max value
    var xScale = d3.scaleTime()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);
    
    
    var yMax = d3.max(dataG, d => d[dataTypes[0]]);
    var yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - margin.bottom, margin.top]);
    var heightScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([0, height - margin.top - margin.bottom]);

        var svg = d3.select('svg');
        
    //create the rectangles
    if (chartType==='block'){
        svg.selectAll('rect')
            .data(dataG)
            .enter().append('rect')
            .attr('width', 10)
            .attr('height', d => heightScale(d[dataTypes[0]]))
            .attr('x', d => xScale(d.timestamp))
            .attr('y', d => yScale(d[dataTypes[0]]))
            .attr('fill', 'blue')
            .attr('stroke', 'white');
    }

    //create lines
    if (chartType==='line'){

    // var line = d3.svg.line()
    //     .x(d => xScale(d.timestamp))
    //     .y(d => yScale(d[dataTypes[0]]))
    var line;

    for (i in dataTypes){
        line = d3.line()
        .x(d => xScale(d.timestamp))
        .y(d => yScale(d[dataTypes[i]]));
    
        svg.selectAll('line dataset-' + i)
            .data([dataG]).enter().append('path')
            .attr("class", "line dataset-" + i)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', 'blue');
    }}

    // create x and y axis
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%d/%m/%y'));
    var yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append('g')
        .attr('transform', 'translate(' + [10, height - margin.bottom] + ')')
        .attr('stroke','#999')
        .attr('fill','white')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate(' + [margin.left, 0] + ')')
        .attr('stroke','#999')        
        .call(yAxis);
}