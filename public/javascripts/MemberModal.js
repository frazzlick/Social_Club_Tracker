function createModal(){
    //for the modal make all the btn-modal buttons hide the modal
    let btn = document.querySelectorAll('.btn-modal').forEach(item => {
        hideandshow_EditModal(item)
    })

    //What happens when clicking Save
    clickSave();
}

function hideandshow_EditModal(item){
    item.addEventListener('click', function(e){
        hideandshow(modal);
    })
}

function saveDataModal(input_value){
    var member;
    for(let i = 0; i < members.length; i++){
        if(members[i].id == modal_item.member.id){
            members[i].name = input_value
            member = members[i]
        }
    }
    document.getElementById(modal_item.id).childNodes[0].innerHTML = input_value

    saveData('/api/members', [member]);
}

function clickSave(){
    let save = document.getElementById('modal-save')
    save.addEventListener('click', function(e){
        let input_value = document.getElementById('modal-name').value
        saveDataModal(input_value);
    })
}