$(document).ready(function (){
    $.get('/show_all_items', function(data, status){
        for(let i = 0; i < data.length; i++){
            $('tbody').append(
                $('<tr/>').append(
                    $('<td/>', {'text': i+1})
                ).append($('<td/>', {'text': data[i].item_name}))
                .append($('<td/>', {'text': data[i].item_location}))
                .append($('<td/>', {'text': data[i].item_amount}))
                .append(
                    $('<td/>').append(
                        $('<button/>', {'class': 'btn btn-primary', 'text': 'Adjust Amount'})
                        ).append($('<button/>', {'class': 'btn btn-danger', 'text': 'Delete Item', 'style': 'margin-left: 5px;'})
                    )
                )
            )
        }
    });

    $('button').click(function (){
        let parent_id = $(this).parent().parent().parent().attr('id');
        console.log(parent_id);
        $('#'+ parent_id).remove();
    });
});
