$(document).ready(function(){
    
    function timeConverter(timestamp){
        var a = new Date(timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes().toString();
        min.length === 1 ? min ='0'+ min : null;
        var sec = a.getSeconds().toString();
        sec.length === 1 ? sec = '0' + sec : null;
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    };

    console.log(timeConverter(data.granular[2].timestamp));

    var dataP = [1000,2500,1750,2000,1200,600,200];

    var svg = d3.select('svg');

    svg.selectAll('rect')
        .data(dataP).enter()
        .append('rect')
        .attr('x', (d,i)=>i * 50)
        .attr('y', d=> d)
        .attr('width', 50)
        .attr('height', d=> d)
        .attr('fill', 'blue')
        .attr('stroke', 'red');

        console.log(svg);


    var yScale = d3.scaleLinear()
        .domain([0,3000])  //input
        .range([300,0]);  //output
        console.log(yScale);
        // var min = d3.min(data, d => [city]);
        // var max = d3.max(data, d => d[city]);

        // var extent = d3.extent(data, d => d[city]);

        // var yScale = d3.scaleLinear()
        //     .domain(extent)
        //     .range([height,0]);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(40,20)')
        .call(yAxis);






    });
