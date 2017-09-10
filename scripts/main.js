$(document).ready(function(){
    
    var groups, dataG, dataA;

    dataG = data.granular;
    dataA = data.aggregated;
    //format date to be in the right format for D3
    dataG.forEach(d => d.timestamp = new Date(d.timestamp*1000))
    
    groups = {
        virality : ["virality_pimp_unique", "virality_pimp_viral_unique"],
        posts : ["page_posts", "user_posts", "user_mentions", "post_shares", "post_comments"],
        stories: ["people_talking", "stories"],
        popularity: ["new_likes", "clicks", "post_likes",],
        reach: ["page_impressions", "reach"]
    }

    function changeGroup(activeView){
        $('#chartTitle').html(activeView);
        $("svg").empty();
        makeChart(dataG, groups[activeView]);
    }

    //initial view
    $('#chartTitle').html("New Likes");
    makeChart(dataG, ["new_likes"]);

    //add event listeners for each button
    $('#virality').click(()=>changeGroup('virality'));
    $('#posts').click(()=>changeGroup('posts'));
    $('#stories').click(()=>changeGroup('stories'));
    $('#popularity').click(()=>changeGroup('popularity'));
    $('#reach').click(()=>changeGroup('reach'));
    
    //generate table for aggregated data
    var keys = Object.keys(dataA);
    keys.forEach(key => {
        $( ".headers" ).append( `<th>${beautifyDataType(key)}</th>` );
        $( ".data" ).append( `<th>${dataA[key]}</th>` );
    });
    
    //calculate date range of data provided to be displayed in heading of table
    var startDate = d3.min(dataG, (d) => d.timestamp);
    var endDate = d3.max(dataG, (d) => d.timestamp);
    var formatDate = (d3.timeFormat('%d/%m/%y'));
    
    startDate = formatDate(startDate);
    endDate = formatDate(endDate);

    $('h5').html(`Aggregated &nbsp &nbsp${startDate} to ${endDate}`);


});
