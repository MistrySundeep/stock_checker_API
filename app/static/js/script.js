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
                        $('<button/>', {'id': 'adj' ,'class': 'btn btn-primary', 'text': 'Adjust Amount', 'type': 'button', 'data-bs-toggle': 'modal', 'data-bs-target': '#adjust_item_modal'})
                        ).append($('<button/>', {'id': 'del' ,'class': 'btn btn-danger', 'text': 'Delete Item', 'style': 'margin-left: 5px;'})
                    )
                )
            )
        }
    });
});

// Change #del to be class not ID
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
    let new_item = new Object();
    new_item.name = name;
    new_item.location = location;
    new_item.amount = amount;

    console.log(new_item);

    $.ajax({
        url: 'http://127.0.0.1:8000/insert_item',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(new_item),
        success: function(data){
            console.log(data);
            setInterval('refreshPage()', 10);
        }
    })

});


//function getNewAmount() {
//    $(document).on('click', '#adjust_item_btn', function() {
//        let new_amount = $(this).parent().siblings().children('#adjust_amount').val();
//        return new_amount;
//    })
//}

const myModalEl = document.getElementById('adjust_item_modal')
myModalEl.addEventListener('show.bs.modal', event => {
    let trigger = event.relatedTarget;
    // Get current item properties
    let current_name = $(trigger).parent().siblings('td#name').text();
    // let current_amount = $(trigger).parent().siblings('td#amount').text();
    let current_location = $(trigger).parent().siblings('td#location').text();

    $(document).on('click', '#adjust_item_btn', function(){
        let new_amount = $(this).parent().siblings().children('#adjust_amount').val();
        // Create new item object
        let updated_data = new Object();

        updated_data.name = current_name;
        updated_data.location = current_location;
        updated_data.amount = new_amount;

        console.log(updated_data)

        $.ajax({
            url: 'http://127.0.0.1:8000/update_item_amount',
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(updated_data),
            success: function(data){
                console.log(data)
                setInterval('refreshPage()', 10);
            }
        })
    })



});


function refreshPage() {
    location.reload(true);
}