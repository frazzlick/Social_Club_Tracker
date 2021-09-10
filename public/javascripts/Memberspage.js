//What to do on load

let members = requestData('/api/members');
let item_id = 0;
let modal_item = {id: '', member: ''};

window.onload = function loadPage(){
    //setup the event listeners for the sidebar
    sidebar_EventListeners()
    //create the setup for the page
    createMemberPage()
    //create the members items with names
    createMemberCard(members)
    //setup the modal with event listeners to edit the members
    createModal()
}

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
    document.getElementById('brand-title').innerHTML = 'Members'
    
    document.getElementById('title').innerHTML = 'Social Clubs | Members'
    
    // createModal()
}



function createModal(){
    //for the modal make all the btn-modal buttons hide the modal
    let btn = document.querySelectorAll('.btn-modal').forEach(item => {
        hideandshow_EditModal(item)
    })
}

function hideandshow_EditModal(item){
    item.addEventListener('click', function(e){
        hideandshow(modal);
    })
}


function createMemberCard(members_card)
{
    //create card
    for(let i = 0; i < members_card.length; i++){
        //create the entire card element to content section
        let card = createEl(members_card[i].id, '','div','content-card','content-section')
        //create the users name
        let card_user = createEl('',members_card[i].name, 'div','content-card-name',card.id)
        //add the edit button
        createEditButton(card, members_card[i]);
        createDeleteButton(card, members_card[i])
    }
}

function createEditButton(card, index){
    let edit_btn = createEl('btn-modal', 'Edit', 'button', 'btn-add', card.id)
    edit_btn.addEventListener('click', function(e){
        modal_item.id = card.id;
        modal_item.member = index
        document.getElementById('modal-name').value = modal_item.member.name
    })
    
    hideandshow_EditModal(edit_btn)
}

function addMember(){
    let member = {id: getMaxID(), name: "Name"}
    members.push(member)
    createMemberCard([member])
}

function createDeleteButton(card, item_id){
    let delete_btn = createEl('btn-delete', 'Delete', 'button', 'btn-add', card.id)
    delete_btn.addEventListener('click', function(e){
        
        removeElements(document.getElementById(item_id.id))
        deleteData('/api/members', item_id)
    })
}

function sidebar_EventListeners(){
    //Add event listeners to the sidebar Members button
    let sidebar_Members = document.getElementById('btn-members');
    sidebar_Members.addEventListener('click', function(e){
        removeElements(document.getElementById('grid'));
        createMemberPage();
        createMemberCard(members)
        createModal();
    })

    //Add event listeners to the sidebar Payments button
    let sidebar_Payments = document.getElementById('btn-payments');
    sidebar_Payments.addEventListener('click', function(e){
        removeElements(document.getElementById('grid'));
        document.getElementById('brand-title').innerHTML = 'Transactions'
        document.getElementById('title').innerHTML = 'Social Clubs | Transactions'
        loadPaymentsScreen();
    })

    let sidebar_Coding = document.getElementById('btn-settings')
    sidebar_Coding.addEventListener('click', function(e){
        removeElements(document.getElementById('grid'));
        document.getElementById('brand-title').innerHTML = 'Coding'
        document.getElementById('title').innerHTML = 'Social Clubs | Coding'
        CodingPageLoad()
    })

    
    let sidebar_TransactionMatching = document.getElementById('btn-matching')
    sidebar_TransactionMatching.addEventListener('click', function(e){
        removeElements(document.getElementById('grid'));
        document.getElementById('brand-title').innerHTML = 'Matching'
        document.getElementById('title').innerHTML = 'Social Clubs | Matching'
        TransactionMatchingPageLoad()
    })
}

function getMaxID(){
    var id = 0;
    for(let obj of members){
        if(obj.id >= id){
            id = obj.id+1
        }
    }
    return id
}

function settingsButton(){
    
}