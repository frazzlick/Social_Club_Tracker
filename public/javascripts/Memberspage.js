//What to do on load

let data = requestData('/api/members');
let modal_item;

function intialisepage(){
    let modal = document.getElementById('modal');
    let btn = document.querySelectorAll('.btn-modal').forEach(item => {
        item.addEventListener('click', function(e){
            hideandshow(modal);
        })
    })

    let name;

    //create the modal event listeners
    // document.getElementById('modal-name').addEventListener('change', function(e){
    //     name = this.value;
    // })

    // document.getElementById('modal-save').addEventListener('click',function(e){
    //     findMember(name)
    // })
}

intialisepage();


//Add event listeners to buttons
let sidebar_Members = document.getElementById('btn-members');
sidebar_Members.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
    createMemberPage();
    intialisepage();
})

let sidebar_Payments = document.getElementById('btn-payments');
sidebar_Payments.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
    intialisepage();
})

createMemberPage();


//Create the Page
function createMemberPage(){
    // let grid = createEl('grid','','div','grid','body');
    let content = createEl('grid-content','','div','grid-content','grid');
    let content_head = createEl('content-head','','div','content-head','grid-content');
    let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
    let content_section = createEl('content-section','','div','content-section','grid-content');

    btn_add.addEventListener('click', function(e){
        addMember();
    })

    createMemberCard(data.members);
}

function createMemberCard(data)
{
    //create card
    for(let i = 0; i < data.length; i++){

        //create the entire card element to content section
        let card = createEl('card_' + i, '','div','content-card','content-section')

        //create the uesrs name
        let card_user = createEl('',data[i].first_name, 'div','content-card-name',card.id)

        //add the edit button

        let edit_btn = createEl('btn-modal', 'Edit', 'button', 'btn-modal btn-add', card.id)
        edit_btn.addEventListener('click', function(e){
            modal_item = card.id;
        })
    }
}

function addMember(){
    let sect = createEl(Math.random(),'','div','content-card','content-section');
    createEl('','','div','content-card-name',sect.id)
    createEl('','Edit','button','btn-modal btn-add', sect.id)
    sect.id = ''
}


function hideandshow(object){
    if(object.style.display == 'block'){
        object.style.display = 'none'
    } else{
        object.style.display = 'block'
    }
}

function findMember(item_find){
    console.log(modal_item);
    for(let i = 0; i < data.members.length; i++){
        if(item_find = data.members[i]){
            return data.members[i]
        }
    }
}