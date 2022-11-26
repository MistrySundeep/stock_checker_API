$(document).ready(function (){
    $.get('/show_all_items', function(data, status){
        let $elem = $('body div#append_data');


        for(let i = 0; i < data.length; i++){
            console.log("ITEM " + i)

            $elem.append(
//            Move this incline css out to a stylesheet later
                $('<div/>', {'id': 'item' + i, 'class': 'col-sm-6', 'style': 'margin-bottom: 10px;'}).append(
                    $('<div/>', {'class': 'card'}).append(
                        $('<div/>', {'class': 'card-body'}).append(
                            $('<h5/>', {'id': 'card_title', 'class': 'card-title', 'text': data[i].item_name})
                        )
                        .append($('<p/>', {'id': 'card_location', 'class': 'card-text', 'text': data[i].item_location})
                        )
                        .append($('<p/>', {'id': 'card_amount', 'class': 'card-text', 'text': data[i].item_amount})
                        )
                        .append($('<a/>', {'href': '#', 'class': 'btn btn-primary', 'text': 'Adjust Amount'})
                        )
    //                   Move this inline css out to a stylesheet later
                        .append($('<a/>', {'href': '#', 'id': 'delete_item', 'class': 'btn btn-primary', 'text': 'Delete Item', 'style': 'margin-left: 5px;'})
                        )
                    )
                )
            );
        }
        let elem_text = $("#card_title").text()
        console.log(elem_text)
    });
});
