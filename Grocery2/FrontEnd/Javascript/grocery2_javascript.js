var shopping
var listIndex
var dataCategory = ['Other', 'Beverages', 'Bakery', 'Canned Goods', 'Dairy', 'Baking Goods', 'Frozen Foods', 'Meat', 'Produce', 'Snacks'];
var dataIndex = ['product', 'quantity', 'category'];
var measureCategory = ['Each', 'Lb', 'Oz', 'Fl Oz']
    //var lst
var catList = []
var cartList = []
var copyNode;
var trigger = false;
var itemIndex;
var list = document.querySelector('#titleList');
var newItemName;
var newItemQuantity;
var newItemUnit;
var foodButton;
var cart;
var userName = '';
var userId = '';

window.onload = (event) => {
    NavButtons();
}

function Handler(e) {
    console.log(e.target.parentNode.parentNode);
    if (e.target.type == 'checkbox') {
        cartToListControl(e.target.parentNode.parentNode)
    } else if (e.target.id == 'editList') {
        console.log(e.target.parentNode.parentNode.getAttribute('index'));
        itemEdit(e);
    } else if (e.target.id == 'deleteList') {
        console.log(e.target.parentNode.parentNode.getAttribute('index'));
        deleteListItem(e);
    }
}

function SecondPageShow() {
    document.getElementById('listWelcome').style.visibility = 'hidden';
    document.getElementById('listWelcome').style.display = 'none';
    document.getElementById('listControl').style.visibility = 'visible';
}

function NavButtons() {
    document.getElementById('addList').addEventListener('click', newList);
    document.getElementById('deleteList').addEventListener('click', deleteList);
    document.getElementById('shareList');
    document.getElementById('userLogin').addEventListener('click', checkUser);
}

function checkUser() {
    var name = document.getElementById('userName').value
    if (name != '') {
        const userRequest = new XMLHttpRequest();
        userRequest.open('POST', '../BackEnd/php/grocerylist2_php.php');
        userRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        sendData = [{ 'name': name }];
        sendData = JSON.stringify(sendData);
        userRequest.send(sendData);

        userRequest.onload = function() {
            if (userRequest.status === 200) {
                SecondPageShow();
                //console.log(userRequest.response);
                shopping = JSON.parse(userRequest.response);
                userName = shopping.shift();
                userId = shopping.shift();

                document.getElementById('welcome').append(document.createTextNode(name));
                TitlePopulate();
                cart = document.getElementById('cart');

                categoryPopulate();
                addFood();
                getList();
                ModalButtons();

            } else if (request.status === 400) {
                console.log(request.response);
            }
        }
    } else {
        alert("please enter your name to continue");
    }
}

function updateList(type, data, listIndex) {
    if (!listIndex) {
        console.log(data);
        sendData = [{ 'type': type, 'id': data }]
    } else {
        console.log(shopping);
        console.log(data);
        console.log(listIndex);
        var listId = shopping[listIndex]['listId'];
        sendData = [{ 'type': type, 'id': listId, 'userId': userId, 'data': data }];
    }
    var request = new XMLHttpRequest();
    request.open('POST', '../BackEnd/php/grocerylist2_php.php');
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(listId);

    sendData = JSON.stringify(sendData);
    console.log(sendData);
    request.send(sendData);

    request.onload = function() {
        if (request.status === 200) {
            console.log(request.responseText);
        }
    }
}
//take the list titles from the json file and place them in the drop down box
function TitlePopulate() {
    const titleList = document.getElementById('titleList');
    titleList.options.length = 1;
    for (x = 0; x < shopping.length; x++) {
        var option = document.createElement('option');
        option.innerHTML = shopping[x]['title'];
        option.setAttribute('index', x);
        titleList.appendChild(option);
        console.log(option);

    }
    TitleDesign();

}


//create the dropdown box for the user input
function categoryPopulate() {
    const newItemCategoryList = document.getElementById('newItemCategory');
    const newItemUnitList = document.getElementById('newItemUnit');
    const editItemCategoryList = document.getElementById('editItemCategory');
    const editItemUnitList = document.getElementById('editItemUnit')


    for (items in dataCategory) {
        const option = document.createElement('option');
        option.innerHTML = items;
        option.innerHTML = dataCategory[items];
        option.setAttribute('index', items);
        newItemCategoryList.append(option);
    }
    for (items in measureCategory) {
        const option = document.createElement('option');
        option.innerHTML = measureCategory[items];
        option.setAttribute('index', items);
        newItemUnitList.appendChild(option);
    }
    for (items in dataCategory) {
        const option = document.createElement('option');
        option.innerHTML = items;
        option.innerHTML = dataCategory[items];
        option.setAttribute('index', items);
        editItemCategoryList.append(option);
    }
    for (items in measureCategory) {
        const option = document.createElement('option');
        option.innerHTML = measureCategory[items];
        option.setAttribute('index', items);
        editItemUnitList.appendChild(option);
    }
}
//add food from the input to the grocery list
function addFood() {
    const foodButton = document.getElementById('foodButton');
    foodButton.addEventListener('click', (event) => {
        const newItemName = document.getElementById('newItemName');
        const newItemQuantity = document.getElementById('newItemQuantity');
        const newItemUnit = document.getElementById('newItemUnit');


        const foodCategory = dataCategory[newItemCategory.selectedIndex];
        let foundBoolean = false;
        if (listIndex == undefined) {
            alert("please choose a list to add food");
        } else {
            console.log(shopping);
            console.log(listIndex);
            let lst = shopping[listIndex].items;
            for (x = 0; x < lst.length; x++) {
                if (lst[x].product == newItemName.value) {
                    lst[x].quantity = parseInt(lst[x].quantity) + parseInt(newItemQuantity.value);
                    foundBoolean = true;
                    console.log(lst[x]);
                    updateList('update', lst, listIndex);
                    break;
                }
            }

            if (!foundBoolean) {
                console.log(lst);
                lst.push({ product: newItemName.value, quantity: parseInt(newItemQuantity.value), category: foodCategory, unit: newItemUnit.value })
                updateList('newObject', { product: newItemName.value, quantity: parseInt(newItemQuantity.value), category: foodCategory, unit: newItemUnit.value }, listIndex);
            }
            listPopulate(listIndex);
        }
    })
}
//get the correct list from our data set, based on the list choosen from the drop down box
function newList() {
    title = window.prompt("enter a new list name: ");
    if (title != null) {
        console.log(shopping);
        var requestUrl = '../Data/groceryLists.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestUrl);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var len = request.response.length + 1;
            shopping.push({ 'userId': userId, 'listId': len, 'title': title, 'items': [] });
            index = shopping.length;
            console.log(shopping);
            listIndex = index - 1;
            updateList('new', title, listIndex);
            TitlePopulate();
            console.log(document.querySelector('#titleList'));
            document.querySelector('#titleList').options[index].selected = true;
            console.log("here");
        }
    }
}

function getList() {
    var title
    var list = document.querySelector('#titleList');

    list.addEventListener('change', (event) => {

        title = event.target.selectedIndex;
        listIndex = title - 1;
        listPopulate(listIndex);

    })

}

function deleteList() {
    console.log(shopping);
    var modal = document.getElementById('modal');
    modal.addEventListener('click', ModalClose);
    modal.classList.add('visible');
    document.getElementById('titles').style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
    document.getElementById('list').style.visibility = 'hidden';
    document.getElementById('modalContent').style.visibility = 'hidden';
}

function deleteTitle() {
    //console.log("shopping");
    if (this.checked) {
        title = this.parentNode.nextSibling.firstChild.innerHTML;
        var index = this.parentNode.parentNode.getAttribute('index');
        console.log(index);
        if (window.confirm("Would you like to delete list: " + title + "?")) {
            console.log(shopping[index]);

            updateList('delete', shopping[index]['listId']);
            shopping.splice(index, 1);
            ModalClose();
            TitlePopulate();
        }
    }

}
//being supplied a list it gets the individual objects from the list, and itterates over them building up the list display
function listPopulate(index) {
    if (index < 0) {
        window.alert('please select a list from the drop down to continue.');
    } else {
        var list = document.getElementById('list');
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        var listContent = shopping[index].items;
        if (listContent.length > 1) {
            listContent.sort((a, b) => (a.category > b.category) ? 1 : -1);
        }
        for (x = 0; x < listContent.length; x++) {
            listDesign(x, listContent[x]['product'], listContent[x]['category'], listContent[x]['quantity'], listContent[x]['unit']);
        }
    }
}

function listControl() {
    if (this.checked) {
        var parentList = this.parentNode.parentNode.parentNode;
        var activeNode = this.parentNode.parentNode;
        copyNode = activeNode.cloneNode(true);
        copyNode.addEventListener('change', cartControl);
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

function cartToListControl(e) {
    if (!this.checked) {
        console.log(this);
        console.log(e);
        if (e != null) {
            activeNode = e;
            copyNode = e.cloneNode(true);
        } else {
            activeNode = this;
            copyNode = this.cloneNode(true);
        }
        copyNode.addEventListener('change', cartControl);
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
        copyNode.addEventListener('change', Handler);
        copyNode.addEventListener('click', Handler);
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

function itemEdit(e) {
    if (e != null) {
        itemIndex = e.target.parentNode.parentNode.getAttribute('index');
    } else {
        itemIndex = this.parentNode.parentNode.getAttribute('index');
    }
    console.log(itemIndex);
    var listIndex = document.querySelector('#titleList').selectedIndex - 1;
    var list = shopping[listIndex].items[itemIndex];
    document.getElementById("editItemName").value = list['product'];
    document.getElementById("editItemCategory").value = list['category'];
    document.getElementById("editItemQuantity").value = list['quantity'];
    document.getElementById("editItemUnit").value = list['unit'];
    var modal = document.getElementById('modal');
    modal.classList.add('visible');
    modal.addEventListener('click', ModalClose);
    document.getElementById('modalEditForm').addEventListener('click', e => e.stopPropagation());
    document.body.style.overflow = 'hidden';
    document.getElementById('modalContent').style.visibility = 'visible';
    document.getElementById('list').style.visibility = 'hidden';
    document.getElementById('titles').style.visibility = 'hidden';
}

function ModalButtons() {
    var modalUpdate = document.getElementById('updateEdit');
    modalUpdate.addEventListener('click', updateEditModal);

}

function updateEditModal() {
    modalFood = document.getElementById("editItemName").value;
    modalCategory = document.getElementById("editItemCategory").value;
    modalQty = parseInt(document.getElementById("editItemQuantity").value);
    modalQtyLst = document.getElementById("editItemUnit").value;

    for (x = 0; x < document.getElementById('list').children.length; x++) {
        if (document.getElementById('list').children[x].getAttribute('index') == itemIndex) {
            document.getElementById('list').children[x].children[1].children[0].innerHTML = modalFood;
            document.getElementById('list').children[x].children[2].children[1].innerHTML = modalQty;
            document.getElementById('list').children[x].children[2].children[0].innerHTML = modalQtyLst;
            shopping[listIndex].items[itemIndex].product = modalFood;
            shopping[listIndex].items[itemIndex].quantity = modalQty;
            shopping[listIndex].items[itemIndex].category = modalCategory;
            shopping[listIndex].items[itemIndex].unit = modalQtyLst;

            updateList('update', shopping[listIndex].items, 0);
            if (document.getElementById('list').children[x].children[1].children[1].innerHTML != modalCategory) {
                listPopulate(listIndex);
            }
        }
    }
    ModalClose();
}

function ModalClose() {
    console.log(this);
    document.getElementById('modalContent').style.visibility = 'hidden';
    document.getElementById('titles').style.visibility = 'hidden';
    document.getElementById('modal').classList.remove('visible');
    document.getElementById('list').style.visibility = 'visible';
    document.body.style.overflow = 'auto';
}

function deleteListItem(e) {
    if (e != null) {
        itemIndex = e.target.parentNode.parentNode.getAttribute('index');
    } else {
        itemIndex = this.parentNode.parentNode.getAttribute('index');
    }
    shopping[listIndex].items.splice(itemIndex, 1);
    //console.log(listIndex);
    updateList('deleteItem', itemIndex, listIndex);
    listPopulate(listIndex);
}

function TitleDesign() {
    const list = document.getElementById('titles');
    while (list.firstChild) {
        console.log(list.firstChild);
        list.removeChild(list.firstChild);
    }
    for (x in shopping) {
        title = shopping[x].title;

        const titleItem = document.createElement('div');
        titleItem.setAttribute('class', 'titleItem');
        titleItem.setAttribute('index', x);
        const control = document.createElement('div');
        control.setAttribute('id', 'control');
        const controlSpan = document.createElement('input');
        controlSpan.setAttribute('type', 'checkbox');
        controlSpan.addEventListener('change', deleteTitle);
        const titleObject = document.createElement('div');
        const titleBox = document.createElement('div');
        titleBox.innerHTML = title;
        control.append(controlSpan);
        titleObject.append(titleBox);
        titleItem.append(control, titleObject);
        list.append(titleItem);
    }
}
//the building of the list display
function listDesign(index, item, category, quantity, unit) {
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
    //delete box
    var controlSpan = document.createElement('input');
    controlSpan.setAttribute('type', 'checkbox');
    controlSpan.addEventListener('change', listControl);
    //top level for product box

    var listItem = document.createElement('div');
    listItem.setAttribute('class', 'object');
    var itemName = document.createElement('span');
    itemName.setAttribute('class', 'product');
    itemName.innerHTML = item;
    //element for the category
    var itemQuantity = document.createElement('span');
    itemQuantity.setAttribute('class', 'quantityValue');
    itemQuantity.innerHTML = quantity;
    var itemUnit = document.createElement('span');
    itemUnit.setAttribute('class', 'left quantityType');
    itemUnit.innerHTML = unit;

    var itemControl = document.createElement('div');
    itemControl.classList.add('hiddenColumn');
    var editButton = document.createElement('button');
    editButton.setAttribute('type', 'button');
    editButton.id = 'editList';
    editButton.classList.add('editButton');
    editButton.innerHTML = 'edit';
    editButton.addEventListener('click', itemEdit);
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.id = 'deleteList';
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML = 'delete';
    deleteButton.addEventListener('click', deleteListItem);
    itemControl.append(editButton, deleteButton);
    control.appendChild(controlSpan);
    var linebreak = document.createElement('br');
    listItem.append(itemName, linebreak, itemQuantity, itemUnit);

    var itemCategoryText = document.createElement('div');
    var itemCategory = document.createElement('div');
    itemCategory.setAttribute('class', 'categoryHeader');
    //var emptyHolder = document.createElement('div');

    if (catList.length > 0) {
        if (category != catList[catList.length - 1]) {
            itemCategoryText.innerHTML = category;
            itemCategory.append(control, itemCategoryText);
            list.append(itemCategory);
            categoryCreate = true;
        } else {
            listItems.append(control, listItem, itemControl);
            list.append(listItems);
        }
    } else if (catList.length === 0) {
        itemCategoryText.innerHTML = category;
        itemCategory.append(control, itemCategoryText);
        list.append(itemCategory);
        categoryCreate = true;
    }
    //the following code is keeping the category headers from displaying a checkbox for full category control
    if (categoryCreate) {
        listItems.append(control, listItem, itemControl);
        list.append(listItems);
    }
    catList.push(category);
}