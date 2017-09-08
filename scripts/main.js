$(document).ready(function(){
    
    dataG = data.granular;
    dataG.forEach(d => d.timestamp = new Date(d.timestamp*1000))
    var width = 800;
    var height = 300;
    var margin = {top: 20, bottom: 20, left: 20, right: 20};

    //scales
    var xExtent = d3.extent(dataG, d => d.timestamp); //finds min and max value
    var xScale = d3.scaleTime()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);
    var yMax = d3.max(dataG, d => d.page_posts);
    var yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - margin.bottom, margin.top]);
    var heightScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([0, height - margin.top - margin.bottom]);

    //create the rectangles
    var svg = d3.select('svg');

    svg.selectAll('rect')
        .data(dataG)
        .enter().append('rect')
        .attr('width', 10)
        .attr('height', d => heightScale(d.page_posts))
        .attr('x', d => xScale(d.timestamp))
        .attr('y', d => yScale(d.page_posts))
        .attr('fill', 'blue')
        .attr('stroke', 'white');

    // create x and y axis
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%b $Y'));
    var yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append('g')
        .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate(' + [margin.left, 0] + ')')
        .call(yAxis);



    });
