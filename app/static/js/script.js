$(document).ready(function (){
    $.get('/show_all_items', function(data, status){
        for(let i = 0; i < data.length; i++){
            $('tbody').append(
                $('<tr/>', {'id': 'item'+i}).append(
                    $('<td/>', {'text': i+1})
                ).append($('<td/>', {'id': 'name', 'text': data[i].item_name}))
                .append($('<td/>', {'id': 'location', 'text': data[i].item_location}))
                .append($('<td/>', {'id': 'amount', 'text': data[i].item_amount}))
                .append(
                    $('<td/>', {'style': 'text-align: center;'}).append(
                        $('<button/>', {'id': 'adj'+i ,'class': 'btn btn-primary', 'text': 'Adjust Amount'})
                        ).append($('<button/>', {'id': 'del' ,'class': 'btn btn-danger', 'text': 'Delete Item', 'style': 'margin-left: 5px;'})
                    )
                )
            )
        }
    });
});

$(document).on('click', '#del', function (){
//  ids of the button clicked
    let del_id = $(this).parent().parent().attr('id');
//  get the item name and create a json object to send into delete request
    let name = $('tr#'+del_id).find('td#name').text();

    let json_object = new Object();
    json_object.name = name;

    console.log(json_object)

    $.ajax({
        url: 'http://127.0.0.1:8000/delete_item',
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(json_object),
        success: function(data) {
            console.log(data)
            $('tr#'+del_id).remove()
        },
        error: function(data) {
            console.log(data)
        }
    });

});


$(document).on('click', '#add_item', function (){
//    get the data from the form and add it to the json obj
    let name = $('#item_name').val();
    let location = $('#item_location').val();
    let amount = $('#item_amount').val();

//    create a json obj to hold the necessary data
    let json_object = new Object();
    json_object.name = name;
    json_object.location = location;
    json_object.amount = amount;

    console.log(json_object);

    $.ajax({
        url: 'http://127.0.0.1:8000/insert_item',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(json_object),
        success: function(data){
            console.log(data);
            setInterval('refreshPage()', 1000);
        }
    })

});

function refreshPage() {
    location.reload(true);
}