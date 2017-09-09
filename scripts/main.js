$(document).ready(function(){
    
    var state, activeView;

    dataG = data.granular;
    dataG.forEach(d => d.timestamp = new Date(d.timestamp*1000))
    
    state = {
        virality : [{rawDataType:"virality_pimp_unique", display:"Virality Pimp Unique"}, 
                    {rawDataType:"virality_pimp_viral_unique", display:"Virality Pimp Viral Unique"}],
        posts : [{rawDataType:"page_posts", display:"Page Posts"},
                 {rawDataType:"user_posts", display:""},
                 {rawDataType:"user_mentions", display:""},
                 {rawDataType:"post_likes", display:""},
                 {rawDataType:"post_shares", display:""},
                 {rawDataType:"post_comments", display:""}],
        stories: "stories",
        popularity: "new_likes",
        reach: "reach"
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
