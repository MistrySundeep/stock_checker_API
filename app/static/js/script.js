$("#sub_btn").click(function (){
    $.get('/show_all_items', function(data, status){
        console.log(`${status}`)
        console.log(`${data.size}`)
        for(let i = 0; i<data.length; i++){
            console.log("ITEM " + i)
            $.each(data[i], function(key, val){
                console.log("Key: " + key + ", Value: " + val);
                $(".appended_data").append("<p>" + key + ": " + val + "</p>");
            });
        }
    });
});