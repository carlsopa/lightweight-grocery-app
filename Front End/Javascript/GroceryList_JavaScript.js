$(document).ready(function() {
    var AddButton = $("#AddButton");
    var RemoveButton = $("#RemoveButton");
    AddButton.click(function() {
        $("#GroceryList").append(
            '<tr><td><button id="RemoveButton">Remove</button></td><td>' + $("#GroceryItem").val() + '</td><td>' + $("#ItemQuantity").val() + '</td></tr>'
        );
    });
    console.log($("#RemoveButton"));
    $('#list').on('click', '#RemoveButton', function() {
        $(this).closest('tr').remove();
    });
})