$(document).ready(function() {
    var AddButton = $("#AddButton");
    var RemoveButton = $("#RemoveButton");
    AddButton.click(function() {
        $("#GroceryList").append(
            '<tr>\
            <td class="RemoveItem"><button class="RemoveButton">Remove</button></td>\
            <td class="GroceryItem">' + $("#GroceryItem").val() + '</td>\
            <td class="GroceryQty">2</td>\
            <td class="QtyChange"><div class="QtyUp"></div><div class="QtyDown"></div></td>\
            </tr>'
        );
    });
    console.log($("#RemoveButton"));
    $('#list').on('click', '.RemoveButton', function() {
        $(this).closest('tr').remove();
    });
    $('#OpenModal').click(function() {
        $('.AddModal').slideToggle(500);
        $('.RemoveItem').toggle();
        $('.QtyChange').toggle();
    })
    $('#list').on('click', '.GroceryItem', function() {
        $(this).closest('tr').toggleClass('found');
    })
})

function AddGroceryRow() {
    return '</td><td class="GroceryQty">2</td><td class="QtyChange"><div class="QtyUp"></div><div class="QtyDown"></div></td></tr>';
}