$(document).ready(function() {
    titlelist = [];
    title = "";
    titleindex = "";
    index = "";

    titlepull()
    $("#list_select").on("change", function() {
        $("#content_list").html("");
        title = $("#list_select option:selected").text();
        titleindex = $(list_select).val();
        listpull(title);
    })
    $("#content_list").on("click", "#product", function() {
        OpenToggle();
        quantity = $(this).next('div').text();
        product = $(this).closest('div').text();
        index = $(this).closest('div').attr("index");
        EditObject(product, quantity);
    })
    $("#content_list").on("click", ".item_card", function () {
        $('.item_card').removeClass('flip');
        console.log($(this).attr("class"));
        $(this).addClass('flip');
        console.log($(this).attr("class"));
        product = $(this).find("#product").text();
        quantity = $(this).find("#quantity").text();
        editcard(product, quantity, $(this));

        $('input').on("click", function () {
            console.log("input selected");
        })

    })
    $('input').on("click", function () {
        console.log("input selected");
    })
    $(".arrow").on("click", function() {
            OpenToggle();
        })
        //when you click the confirm button it will send the information to the backend so that the php file can update the actual json file, and close and return you to the shopping list.  Instead of reloading the list again, it will update the actual list withe information provided.
    $("#confirm_circle").on("click", function() {
        product = $("#ItemName").val();
        quantity = $("#qty").val();
        val = 'title=' + titleindex + '&index=' + index + '&product=' + product + '&quantity=' + quantity;
        dataupdate(val);
        listupdate(product, quantity);
    })

    //changes the view to show and not show the edit modal based on button clicks 
    function OpenToggle() {
        $(".edit_modal").toggleClass("open");
    }
    //retrives the titles of the lists from the json file.  This only works with titles.
    function titlepull() {
        $.ajax({
            url: '../Data/grocery.json',
            type: 'GET',
            data: 'json'
        }).done((food) => {
            $.each(food, function(index, food) {
                titlepopulate(index, food.title);
            })
        })
    }
    //this pulls the actual list data from the json file.  It takes as an input the index value of the selected list.
    function listpull(lst) {
        $.ajax({
            url: '../Data/grocery.json',
            type: 'GET',
            data: 'json'
        }).done((food) => {
            $.each(food, function(index, food) {
                if (food.title == lst) {
                    for (x = 0; x < food.items.length; x++) {
                        product = food.items[x].product;
                        quantity = food.items[x].quantity;
                        listpopulate(x, product, quantity);
                    }
                }
            })
        })
    }
    //this sends any updated information from the modal to a backend php script, that will then update the json file according.  
    function dataupdate(a) {
        $.ajax({
            type: 'post',
            url: '../BackEnd/php/grocerylist2_php.php',
            data: a,
            success: function(data) {
                console.log(data);
            }
        })
    }
    //takes the title returned from titlepull and appends a select box with the data
    function titlepopulate(index, x) {
        $("#list_select").append(
            '<option value="' + index + '">' + x + '</option>'
        );
    }
    //takes the data from listpull and appends the content area with the new data.
    function listpopulate(index, product, quantity) {
        $("#content_list").append(
            '<div class="item_card">\
            <div class="front">\
            <div id="remove"><span id="remove_button"></span></div>\
            <div index=' + index + ' id="product">' + product + '</div>\
            <div id="quantity">' + quantity + '</div></div>\
            <div class="back">\
            </div></div>'

        );

    }
    //pre-populates the editing modal with data from the actual list
    function EditObject(product, quantity) {
        $("#ItemName").val(product);
        $("#qty").val(quantity);
    }
    //takes the edited data from the editing modal and passes it back to the actual list of items.  
    function listupdate(product, quantity) {
        OpenToggle();
        line = $("#content_list #product[index=" + index + "]")
        line.html(product);
        line.next('div').html(quantity);
    }

    function editcard(product, quantity, thisElement) {
        $('.back').html('<input type="text" name="Name" class="ItemName" /><br>\
        <input type="number" name="quantity" class="qty" />\
        <input type="number" name="price" id="price />');
        $(thisElement.find('.ItemName')).val(product);
        $(thisElement.find('.qty')).val(quantity);
    }

    function addCard() {
        $("#content_list").append(
            'div class="item_card">\
            <div class="front">\
            <div id="remove"><span id="remove_button"></span></div>\
            </div>\
            </div><div class="back"></div></div>');
    }
})