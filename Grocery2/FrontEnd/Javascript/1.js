var shopping
var listIndex
var dataCategory = ['Other','Beverages', 'Bakery', 'Canned Goods', 'Dairy', 'Baking Goods', 'Frozen Foods', 'Meat', 'Produce', 'Snacks'];
var dataIndex = ['product', 'quantity', 'category'];
var measureCategory = ['Each', 'Lb', 'Oz', 'Fl Oz']
var lst
var catList = []
var cartList = []
var copyNode;
var trigger = false;
var itemIndex;
//var foodInput = document.querySelector("#foodInput");
var list = document.querySelector('#titleList');
var requestUrl = '../Data/grocery.json';
var request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

request.onload = function () {
    shopping = request.response;
    for (x = 0; x < shopping.length; x++) {
        titlePopulate(x,shopping[x]['title']);
    }
    console.log(shopping);
    categoryPopulate();
    addFood();
    getList();
    ModalButtons();
    
};
function updateList(data) {
    var request = new XMLHttpRequest();
    request.open('POST', '../BackEnd/php/1.php');
    request.send(data);
}
//take the list titles from the json file and place them in the drop down box
function titlePopulate(index, title) {
    var list = document.querySelector('#titleList');
    var option = document.createElement('option');
    option.innerHTML = title;
    option.setAttribute('index', x);
    list.appendChild(option);
}
//create the dropdown box for the user input
function categoryPopulate() {
    var list = document.querySelector("#categoryList");
    var modalList = document.getElementById('modalCategoryList');
    var measureList = document.querySelector("#qtyList");
    var modalMeasureList = document.getElementById('modalQtyList')
    for (items in dataCategory) {
        var option = document.createElement('option');
        option.innerHTML = items;
        option.innerHTML = dataCategory[items];
        option.setAttribute('index', items);
        list.append(option);
    }
    for (items in measureCategory) {
        var option = document.createElement('option');
        option.innerHTML = measureCategory[items];
        option.setAttribute('index', items);
        measureList.appendChild(option);
    }
    for (items in dataCategory) {
        var option = document.createElement('option');
        option.innerHTML = items;
        option.innerHTML = dataCategory[items];
        option.setAttribute('index', items);
        modalList.append(option);
    }
    for (items in measureCategory) {
        var option = document.createElement('option');
        option.innerHTML = measureCategory[items];
        option.setAttribute('index', items);
        modalMeasureList.appendChild(option);
    }
}
//add food from the input to the grocery list
function addFood() {
    var foodInput = document.querySelector("#foodInput");
    var categoryList = document.querySelector("#categoryList");
    var qtyInput = document.querySelector("#qtyInput");
    var qtyList = document.querySelector("#qtyList");
    var foodButton = document.querySelector('#foodButton');
    //var lst
    foodButton.addEventListener('click', (event) => {
            var foodCategory = dataCategory[categoryList.selectedIndex];
            var foundBoolean = false;
            if (listIndex == undefined) { alert("please choose a list to add food"); }
            lst = shopping[listIndex].items;
            for (x = 0; x < lst.length; x++) {
                if (lst[x].product == foodInput.value) {
                    lst[x].quantity++;
                    foundBoolean = true;
                    break;
                }
            }
            if (!foundBoolean) {
                lst.push({ product: foodInput.value, quantity: qtyInput.value, category: foodCategory, unit: qtyList.value })
            }
            listPopulate(listIndex);
    })
    var editButton = document.querySelector('#toggleEdit');
    editButton.addEventListener('click', (event) => {
        var hiddenList = document.getElementsByClassName('hiddenColumn');
        for (x = 0; x < hiddenList.length; x++) {
            var column = hiddenList[x];
            console.log(column);
            if (column.style.display == 'none') {
                column.style.display = 'block'
            } else {
                column.style.display = 'none'
        }
    }
        
    })
}
//get the correct list from our data set, based on the list choosen from the drop down box
function getList() {
    var title
    var list = document.querySelector('#titleList');
    var previous = listIndex;
    //console.log(listIndex);
    list.addEventListener('change', (event) => {
        title = event.target.selectedIndex;
        listIndex = title - 1;

        //edit data here

        listPopulate(listIndex);
    })
    
}
//being supplied a list it gets the individual objects from the list, and itterates over them building up the list display
function listPopulate(index) {
    var list = document.querySelector('#list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var listContent = shopping[index].items;
    listContent.sort((a, b) => (a.category > b.category) ? 1 : -1);
    //updateList(listContent);
    for (x = 0; x < listContent.length;x++) {
        listDesign(x,listContent[x]['product'], listContent[x]['category'], listContent[x]['quantity'],listContent[x]['unit']);
    }
}
function listControl() {
    if (this.checked) {
        var parentList = this.parentNode.parentNode.parentNode.parentNode;   
        var activeNode = this.parentNode.parentNode.parentNode;
        copyNode = activeNode.cloneNode(true);
        copyNode.addEventListener('change', cartControl);
        var cart = document.querySelector("#cart");
        if (cart.children.length > 0) {
            for (x = 0; x < cart.children.length; x++) {
                if (parseInt(activeNode.getAttribute("index")) < parseInt(cart.children[x].getAttribute("index"))) {
                    cart.insertBefore(copyNode, cart.children[x]);
                    break;
                } else {
                    cart.append(copyNode);
                }                  
            }
        } else {
            cart.append(copyNode);
        }
    }
    parentList.removeChild(activeNode);
}
function cartToListControl() {
    if (!this.checked) {
        console.log(this);
        activeNode = this;
        copyNode = this.cloneNode(true);
        copyNode.addEventListener('change', cartControl);
        var cart = document.querySelector("#cart");
        console.log(cart);
        if (cart.children.length > 0) {
            for (x = 0; x < cart.children.length; x++) {
                if (parseInt(activeNode.getAttribute("index")) < parseInt(cart.children[x].getAttribute("index"))) {
                    cart.insertBefore(copyNode, cart.children[x]);
                    break;
                } else {
                    cart.append(copyNode);
                }
            }
        } else {
            cart.append(copyNode);
        }
    }
    document.querySelector("#list").removeChild(activeNode);
}

function cartControl() {
    if (!this.checked) {
        activeNode = this;
        copyNode = this.cloneNode(true);
        copyNode.classList.remove("found");
        copyNode.addEventListener('change', cartToListControl);
        var list = document.querySelector("#list");
        if (list.children.length > 0) {
            for (x = 0; x < list.children.length; x++) {
                if (parseInt(activeNode.getAttribute("index")) < parseInt(list.children[x].getAttribute("index"))) {
                    list.insertBefore(copyNode, list.children[x]);
                    break;
                } else {
                    list.append(copyNode);
                }
            }
        }
    } 
    document.querySelector("#cart").removeChild(activeNode);
}
function itemEdit() {
    itemIndex = this.parentNode.parentNode.getAttribute('index');
    console.log(itemIndex);
    var listIndex = document.querySelector('#titleList').selectedIndex-1;
    var list = shopping[listIndex].items[itemIndex];
    document.querySelector("#modalFoodInput").value = list['product'];
    document.querySelector("#modalCategoryList").value=list['category'];
    document.querySelector("#modalQtyInput").value=list['quantity'];
    document.querySelector("#modalQtyList").value = list['unit'];
    var modal = document.getElementById('modal');
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
    document.getElementById('list').style.visibility='hidden';

   

}
function ModalButtons() {
    var modalClose = document.getElementById('cancelModal');
    var modalUpdate = document.getElementById('updateModal')
    modalClose.addEventListener('click', ModalClose);
    modalUpdate.addEventListener('click', () => {

        modalFood = document.getElementById("modalFoodInput").value;
        modalCategory = document.getElementById("modalCategoryList").value;
        modalQty = document.getElementById("modalQtyInput").value;
        modalQtyLst = document.getElementById("modalQtyList").value;

        for (x = 0; x < document.getElementById('list').children.length; x++) {
            if (document.getElementById('list').children[x].getAttribute('index') == itemIndex) {
                document.getElementById('list').children[x].children[1].children[0].innerHTML = modalFood;
                document.getElementById('list').children[x].children[2].children[1].innerHTML = modalQty;
                document.getElementById('list').children[x].children[2].children[0].innerHTML = modalQtyLst;
                shopping[listIndex].items[itemIndex].product = modalFood;
                shopping[listIndex].items[itemIndex].quantity = modalQty;
                shopping[listIndex].items[itemIndex].category = modalCategory;
                shopping[listIndex].items[itemIndex].unit = modalQtyLst;
                if (document.getElementById('list').children[x].children[1].children[1].innerHTML != modalCategory) {
                    listPopulate(listIndex);
                }
            }
        }
        ModalClose();
    })
}
function ModalClose() {
    document.getElementById('modal').classList.remove('visible');
    document.getElementById('list').style.visibility = 'visible';
    document.body.style.overflow = 'auto';
}

//the building of the list display
function listDesign(index,item, category, q,unit) {
    var categoryCreate = false;
    //top level selector
    var list = document.querySelector('#list');
    //top level for each individual entry
    var listItems = document.createElement('div');
    listItems.setAttribute('class', 'items');
    listItems.setAttribute('index', index);
    //the top level control element
    var control = document.createElement('div');
    control.setAttribute('id', 'control');
    //the div for the delete box
    var controlDiv = document.createElement('div');
    //delete box
    var controlSpan = document.createElement('input');
    controlSpan.setAttribute('type', 'checkbox');
    controlSpan.addEventListener('change', listControl);
    //top level for product box
    var object = document.createElement('div');
    object.setAttribute('class', 'object');
    var listObject = document.createElement('div');
    listObject.setAttribute('class', 'product');
    listObject.innerHTML = item;
    //element for the category
    var listProduce = document.createElement('div');
     listProduce.innerHTML = category;
    listProduce.setAttribute('class', 'left category');
    var quantity = document.createElement('div');
    quantity.setAttribute('class', 'quantity');
    var listQuantity = document.createElement('div');
    listQuantity.setAttribute('class', 'quantityValue');
     listQuantity.innerHTML = q;
    var listQuantityType = document.createElement('div');
    listQuantityType.setAttribute('class', 'left quantityType');
    listQuantityType.innerHTML = unit;
    var listEdit = document.createElement('div');
    listEdit.classList.add('hiddenColumn');
    var editButton = document.createElement('button');
    editButton.setAttribute('type', 'button');
    editButton.id = 'editList';
    editButton.classList.add('editButton');
    editButton.innerHTML = 'edit';
    editButton.addEventListener('click', itemEdit);
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.id = 'deleteList';
    deleteButton.classList.add('editButton');
    deleteButton.innerHTML = 'delete';
    listEdit.append(editButton, deleteButton);
    controlDiv.appendChild(controlSpan);
    control.appendChild(controlDiv);
    object.append(listObject, listProduce);
    quantity.append(listQuantity, listQuantityType);

    var listCategoryItems = document.createElement('div');
    var listCategory = document.createElement('div');
    listCategory.setAttribute('class', 'categoryHeader');
    var emptyHolder = document.createElement('div');

    if (catList.length > 0) {
        if (category != catList[catList.length - 1]) {
            listCategoryItems.innerHTML = category;
            listCategory.append(control,listCategoryItems);
            list.append(listCategory);
            categoryCreate = true;
        }  else {
            listItems.append(control, object, quantity, listEdit);
            list.append(listItems);
        }
    } else if (catList.length === 0) {
            listCategoryItems.innerHTML = category;
        listCategory.append(control,listCategoryItems);
            list.append(listCategory);
            categoryCreate = true;
    }
    //the following code is keeping the category headers from displaying a checkbox for full category control
    if (categoryCreate) {
        listItems.append(control, object, quantity, listEdit);
            list.append(listItems);
    }
    catList.push(category);
}