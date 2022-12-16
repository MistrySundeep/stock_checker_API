$(document).ready(function (){
    $.get('/show_all_items', function(data, status){
        for(let i = 0; i < data.length; i++){
            $('tbody').append(
                $('<tr/>', {'id': 'item'+i}).append(
                    $('<td/>', {'text': i+1})
                ).append($('<td/>', {'text': data[i].item_name}))
                .append($('<td/>', {'text': data[i].item_location}))
                .append($('<td/>', {'text': data[i].item_amount}))
                .append(
                    $('<td/>', {'style': 'text-align: center;'}).append(
                        $('<button/>', {'id': 'adj'+i ,'class': 'btn btn-primary', 'text': 'Adjust Amount'})
                        ).append($('<button/>', {'id': 'del'+i ,'class': 'btn btn-danger', 'text': 'Delete Item', 'style': 'margin-left: 5px;'})
                    )
                )
            )
        }
    });
});

$(document).on('click', 'button', function (){
//    list of rows in the table
    let row_list = $('tbody').children();
//    ids of the button clicked
    let del_id = $(this).parent().parent().attr('id');
    console.log(del_id);
    console.log(row_list)
//    prints last character of the string
    console.log(del_id[del_id.length - 1])
});




