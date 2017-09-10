// make array with all values to allow y-scale to be displayed correctly
function joinAllValues(dataG, dataType){
    //dataType is an array of objects
    let allValues = [];
    dataType.map(type => {
        dataG.map(day => {
            allValues.push(day[type]);
        })
    })
    return allValues;
}

function beautifyDataType(type){
    return type.replace(/_/g,' ')
}

var makeChart = (dataG, dataTypes) => {
    var width = 800,
        height = 400,
        margin = {top: 50, bottom: 40, left: 70, right: 50},
        colors = ['blue','red','green','yellow','grey']

    //scales
    var xExtent = d3.extent(dataG, d => d.timestamp); //finds min and max value
    var xScale = d3.scaleTime()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);
    
    var yMax = d3.max(joinAllValues(dataG,dataTypes));
    var yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - margin.bottom, margin.top]);
    var heightScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([0, height - margin.top - margin.bottom]);

        var svg = d3.select('svg');

    // create x and y axis
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%d/%m/%y'));
    var yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append('g')
        .attr('transform', 'translate(' + [10, height - margin.bottom] + ')')
        .attr('stroke','#999')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate(' + [margin.left, 0] + ')')
        .attr('stroke','#999')        
        .call(yAxis);
        
   //create lines
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
            .attr('stroke', ()=>colors[i]);

        d3.select("svg").append("line")
        .attr("class", "line dataset-" + i)
        .attr("stroke", ()=>colors[i])
        .attr("stroke-width", "2")
        .attr("x1", margin.left + width -40)
        .attr("x2", margin.left + width )
        .attr("y1", 20*i + height/2 -
                    20*dataTypes.length/2 - 6)
        .attr("y2", 20*i + height/2 -
                    20*dataTypes.length/2 - 6);

        d3.select("svg").append("text")
            .attr("transform", "translate(" +
                (margin.left + width + 10) + "," +
                (20*i + height/2 -
                20*dataTypes.length/2) + ")")
            .attr("class", "legend")
            .attr("font-size", "15")
            .attr("text-anchor", "left")
            .attr("fill", "#999")
            .text(beautifyDataType(dataTypes[i]));
    }
}