$(document).ready(function(){
    
    dataG = data.granular;
    dataG.forEach(d => d.timestamp = new Date(d.timestamp*1000))
    
    makeChart(dataG, 'page_posts');

    $('#chartTitle').html('Page Posts');



    });
