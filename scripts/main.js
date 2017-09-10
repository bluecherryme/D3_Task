$(document).ready(function(){
    
    var state, activeView;

    dataG = data.granular;
    dataG.forEach(d => d.timestamp = new Date(d.timestamp*1000))
    
    state = {
        virality : ["virality_pimp_unique", "virality_pimp_viral_unique"],
        posts : ["page_posts", "user_posts", "user_mentions", "post_likes", 
                "post_shares", "post_comments"],
        stories: ["people_talking", "stories"],
        popularity: ["new_likes", "clicks"],
        reach: ["page_impressions", "reach"]
    }

    function changeState(activeView){
        $('#chartTitle').html(activeView);
        $("svg").empty();
        makeChart(dataG, state[activeView], 'line');
    }

    //initial view
    changeState('virality');

  
    $('#virality').click(()=>changeState('virality'));
    $('#posts').click(()=>changeState('posts'));
    $('#stories').click(()=>changeState('stories'));
    $('#popularity').click(()=>changeState('popularity'));
    $('#reach').click(()=>changeState('reach'));
    







    });
