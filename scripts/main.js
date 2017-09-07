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

var dataP = [100,250,175,200,120,60,20];

var svg = d3.select('svg');

svg.selectAll('rect')
    .data(dataP)
    .enter().append('rect')
    .attr('x', (d,i)=>i * 50)
    .attr('y', d=> 300-d)
    .attr('width', 50)
    .attr('height', d=> d)
    .attr('fill', 'blue')
    .attr('stroke', 'red');