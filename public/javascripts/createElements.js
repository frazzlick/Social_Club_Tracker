
//createEl(id, text, type, el_class, parent)
function createEl(id, text, type, el_class, parent){
    let object = document.createElement(type);
    if(type == 'input'){
        object.value = text;
    } else{
        object.innerHTML = text;
    }
    object.id = id;
    object.classList.add(el_class);
    let elparent = document.getElementById(parent);
    elparent.append(object);

    return object;
}