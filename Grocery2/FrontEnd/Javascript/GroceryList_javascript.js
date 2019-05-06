$(document).ready(function() {
    var AddButton = $("#AddButton");
    var RemoveButton = $("#RemoveButton");
    ListPull();

    //$("#GroceryList").DataTable();


    AddButton.click(function() {

        var Item = $("#GroceryItem").val();
        var ItemData = 'GroceryItem=' + Item + '&GroceryQty=2';
        ListAppend(Item);
        console.log(ItemData);
        ListPush(ItemData);
    });
    $('#list').on('click', '.RemoveButton', function() {
        $(this).closest('tr').remove();
    });
    $('#OpenModal').click(function() {
        //$('.AddModal').slideToggle(500, slidecomplete);
        $('.AddModal').toggleClass('hidden');
        $('.RemoveItem').toggleClass('hidden');
        $('.QtyChange').toggleClass('hidden');

    })
    $('#list').on('click', '.GroceryItem', function() {
        $(this).closest('tr').toggleClass('found');
    })
})

function ListPush(a) {
    $.ajax({
        type: 'post',
        url: '../Back_End/Php/GroceryList_php.php',
        data: a,
        success: function(data) {
            console.log(data)
        }
    })
}

function ListPull() {
    console.log('inside list pull')
    $.ajax({
        url: '../Data/list.json',
        type: 'GET',
        data: 'json',
    }).done((food) => {
        food.forEach(function(item) {
            InitialList(item.product);
        })
    })
}

function InitialList(x) {
    $("#GroceryList").append(
        '<tr>\
    <td class="RemoveItem hidden"><button class="RemoveButton">Remove</button></td>\
    <td class="GroceryItem">' + x + '</td>\
    <td class="GroceryQty">2</td>\
    <td class="QtyChange hidden"><div class="QtyUp "></div><div class="QtyDown"></div></td>\
    </tr>'
    )
}

function ListAppend(x) {
    $("#GroceryList").append(
        '<tr>\
    <td class="RemoveItem"><button class="RemoveButton">Remove</button></td>\
    <td class="GroceryItem">' + x + '</td>\
    <td class="GroceryQty">2</td>\
    <td class="QtyChange"><div class="QtyUp "></div><div class="QtyDown"></div></td>\
    </tr>'
    )
}

function slidecomplete() {
    if ($(this).is(':visible')) {
        $('.RemoveItem').toggleClass('hidden');
        $('.QtyChange').toggleClass('hidden');
    }
}